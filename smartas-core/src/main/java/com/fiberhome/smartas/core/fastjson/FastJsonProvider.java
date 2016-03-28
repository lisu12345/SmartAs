package com.fiberhome.smartas.core.fastjson;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Reader;
import java.io.Writer;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import javax.ws.rs.ext.MessageBodyReader;
import javax.ws.rs.ext.MessageBodyWriter;
import javax.ws.rs.ext.Provider;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;

/**
 * JAX-RS Provider for fastjson.
 * 
 * @author chenb
 *
 */
@Provider
@Consumes({"application/json", "text/json"})
@Produces({"application/json", "text/json"})
public class FastJsonProvider implements MessageBodyReader<Object>, MessageBodyWriter<Object> {

  public final static Charset UTF8 = Charset.forName("UTF-8");

  private Charset charset = UTF8;

  private SerializerFeature[] features = new SerializerFeature[0];

  public SerializerFeature[] getFeatures() {
    return features;
  }

  public void setFeatures(SerializerFeature... features) {
    this.features = features;
  }

  /**
   * This header is useful on Windows, trying to deal with potential XSS attacks.
   */
  public final static String HEADER_CONTENT_TYPE_OPTIONS = "X-Content-Type-Options";

  /**
   * Since class <code>javax.ws.rs.core.NoContentException</code> only exists in JAX-RS 2.0, but we
   * need 1.1 compatibility, need to (unfortunately!) dynamically load class.
   */
  protected final static String CLASS_NAME_NO_CONTENT_EXCEPTION =
      "javax.ws.rs.core.NoContentException";

  protected final static String NO_CONTENT_MESSAGE = "No content (empty input stream)";

  /**
   * Looks like we need to worry about accidental data binding for types we shouldn't be handling.
   * This is probably not a very good way to do it, but let's start by blacklisting things we are
   * not to handle.
   * <p>
   * (why ClassKey? since plain old Class has no hashCode() defined, lookups are painfully slow)
   */
  protected final static HashSet<ClassKey> DEFAULT_UNTOUCHABLES = new HashSet<ClassKey>();
  static {
    // First, I/O things (direct matches)
    DEFAULT_UNTOUCHABLES.add(new ClassKey(java.io.InputStream.class));
    DEFAULT_UNTOUCHABLES.add(new ClassKey(java.io.Reader.class));
    DEFAULT_UNTOUCHABLES.add(new ClassKey(java.io.OutputStream.class));
    DEFAULT_UNTOUCHABLES.add(new ClassKey(java.io.Writer.class));

    // then some primitive types
    DEFAULT_UNTOUCHABLES.add(new ClassKey(char[].class));

    /*
     * 27-Apr-2012, tatu: Ugh. As per
     * [https://github.com/FasterXML/jackson-jaxrs-json-provider/issues/12] better revert this back,
     * to make them untouchable again.
     */
    DEFAULT_UNTOUCHABLES.add(new ClassKey(String.class));
    DEFAULT_UNTOUCHABLES.add(new ClassKey(byte[].class));
  }

  private boolean addNoSniffHeader = false;

  /**
   * These are classes that we never use for reading (never try to deserialize instances of these
   * types).
   */
  public final static Class<?>[] DEFAULT_UNREADABLES =
      new Class<?>[] {InputStream.class, Reader.class};

  /**
   * These are classes that we never use for writing (never try to serialize instances of these
   * types).
   */
  public final static Class<?>[] DEFAULT_UNWRITABLES = new Class<?>[] {InputStream.class,
      OutputStream.class, Writer.class, StreamingOutput.class, Response.class};


  /**
   * Map that contains overrides to default list of untouchable types: <code>true</code> meaning
   * that entry is untouchable, <code>false</code> that is is not.
   */
  protected HashMap<ClassKey, Boolean> _cfgCustomUntouchables;

  /**
   * Whether we want to actually check that Jackson has a serializer for given type. Since this
   * should generally be the case (due to auto-discovery) and since the call to check availability
   * can be bit expensive, defaults to false.
   */
  protected boolean _cfgCheckCanSerialize = false;

  /**
   * Whether we want to actually check that Jackson has a deserializer for given type. Since this
   * should generally be the case (due to auto-discovery) and since the call to check availability
   * can be bit expensive, defaults to false.
   */
  protected boolean _cfgCheckCanDeserialize = false;


  /**
   * View to use for reading if none defined for the end point.
   */
  protected Class<?> _defaultReadView;

  /**
   * View to use for writing if none defined for the end point.
   */
  protected Class<?> _defaultWriteView;

  /*
   * /********************************************************** /* Excluded types
   * /**********************************************************
   */

  public final static HashSet<ClassKey> _untouchables = DEFAULT_UNTOUCHABLES;

  public final static Class<?>[] _unreadableClasses = DEFAULT_UNREADABLES;

  public final static Class<?>[] _unwritableClasses = DEFAULT_UNWRITABLES;



  /*
   * /********************************************************** /* Configuring
   * /**********************************************************
   */

  /**
   * Method for defining whether actual detection for existence of a deserializer for type should be
   * done when {@link #isReadable} is called.
   */
  public void checkCanDeserialize(boolean state) {
    _cfgCheckCanDeserialize = state;
  }

  /**
   * Method for defining whether actual detection for existence of a serializer for type should be
   * done when {@link #isWriteable} is called.
   */
  public void checkCanSerialize(boolean state) {
    _cfgCheckCanSerialize = state;
  }

  /**
   * Method for marking specified type as "untouchable", meaning that provider will not try to read
   * or write values of this type (or its subtypes).
   * 
   * @param type Type to consider untouchable; can be any kind of class, including abstract class or
   *        interface. No instance of this type (including subtypes, i.e. types assignable to this
   *        type) will be read or written by provider
   */
  public void addUntouchable(Class<?> type) {
    if (_cfgCustomUntouchables == null) {
      _cfgCustomUntouchables = new HashMap<ClassKey, Boolean>();
    }
    _cfgCustomUntouchables.put(new ClassKey(type), Boolean.TRUE);
  }

  /**
   * Method for removing definition of specified type as untouchable: usually only
   * 
   * @since 2.2
   */
  public void removeUntouchable(Class<?> type) {
    if (_cfgCustomUntouchables == null) {
      _cfgCustomUntouchables = new HashMap<ClassKey, Boolean>();
    }
    _cfgCustomUntouchables.put(new ClassKey(type), Boolean.FALSE);
  }


  /*
   * /********************************************************** /* Abstract methods sub-classes
   * need to implement /**********************************************************
   */

  /**
   * Helper method used to check whether given media type is supported by this provider for read
   * operations (when binding input data such as POST body).
   * <p>
   * Default implementation simply calls {@link #hasMatchingMediaType}.
   * 
   * @since 2.3
   */
  protected boolean hasMatchingMediaTypeForReading(MediaType mediaType) {
    return hasMatchingMediaType(mediaType);
  }

  /**
   * Helper method used to check whether given media type is supported by this provider for writing
   * operations, such as when converting response object to response body of request (like GET or
   * POST).
   * <p>
   * Default implementation simply calls {@link #hasMatchingMediaType}.
   * 
   * @since 2.3
   */
  protected boolean hasMatchingMediaTypeForWriting(MediaType mediaType) {
    return hasMatchingMediaType(mediaType);
  }

  protected boolean hasMatchingMediaType(MediaType mediaType) {
    /*
     * As suggested by Stephen D, there are 2 ways to check: either being as inclusive as possible
     * (if subtype is "json"), or exclusive (major type "application", minor type "json"). Let's
     * start with inclusive one, hard to know which major types we should cover aside from
     * "application".
     */
    if (mediaType != null) {
      // Ok: there are also "xxx+json" subtypes, which count as well
      String subtype = mediaType.getSubtype();

      // [Issue#14]: also allow 'application/javascript'
      return "json".equalsIgnoreCase(subtype) || subtype.endsWith("+json")
          || "javascript".equals(subtype)
          // apparently Microsoft once again has interesting alternative types?
          || "x-javascript".equals(subtype) || "x-json".equals(subtype) // [Issue#40]
      ;
    }
    /*
     * Not sure if this can happen; but it seems reasonable that we can at least produce JSON
     * without media type?
     */
    return true;
  }

  /*
   * /********************************************************** /* Partial MessageBodyWriter impl
   * /**********************************************************
   */

  /**
   * Method that JAX-RS container calls to try to figure out serialized length of given value. Since
   * computation of this length is about as expensive as serialization itself, implementation will
   * return -1 to denote "not known", so that container will determine length from actual serialized
   * output (if needed).
   */
  @Override
  public long getSize(Object value, Class<?> type, Type genericType, Annotation[] annotations,
      MediaType mediaType) {
    /*
     * In general figuring output size requires actual writing; usually not worth it to write
     * everything twice.
     */
    return -1;
  }

  /**
   * Method that JAX-RS container calls to try to check whether given value (of specified type) can
   * be serialized by this provider. Implementation will first check that expected media type is
   * expected one (by call to {@link #hasMatchingMediaType}); then verify that type is not one of
   * "untouchable" types (types we will never automatically handle), and finally that there is a
   * serializer for type (iff {@link #checkCanSerialize} has been called with true argument --
   * otherwise assumption is there will be a handler)
   */
  @Override
  public boolean isWriteable(Class<?> clazz, Type type, Annotation[] anns, MediaType mediaType) {
    if (!hasMatchingMediaType(mediaType)) {
      return false;
    }
    Boolean customUntouchable = _findCustomUntouchable(clazz);
    if (customUntouchable != null) {
      // negation: Boolean.TRUE means untouchable -> can not write
      return !customUntouchable.booleanValue();
    }
    /*
     * Ok: looks like we must weed out some core types here; ones that make no sense to try to bind
     * from JSON:
     */
    if (_isIgnorableForWriting(new ClassKey(clazz))) {
      return false;
    }
    // but some are interface/abstract classes, so
    for (Class<?> cls : _unwritableClasses) {
      if (cls.isAssignableFrom(clazz)) {
        return false;
      }
    }
    // Also: if we really want to verify that we can deserialize, we'll check:
    if (_cfgCheckCanSerialize) {
      // FIXME:
    }
    return true;
  }

  /**
   * Method that JAX-RS container calls to serialize given value.
   */
  @Override
  public void writeTo(Object value, Class<?> type, Type genericType, Annotation[] annotations,
      MediaType mediaType, MultivaluedMap<String, Object> httpHeaders, OutputStream out)
      throws IOException {

    // Any headers we should write?
    _modifyHeaders(value, type, genericType, annotations, httpHeaders);
    String text = JSON.toJSONString(value, features);
    byte[] bytes = text.getBytes(charset);
    out.write(bytes);
  }

  /**
   * Helper method to use for determining desired output encoding. For now, will always just use
   * UTF-8...
   */
  protected Charset findEncoding(MediaType mediaType, MultivaluedMap<String, Object> httpHeaders) {
    return UTF8;
  }

  /**
   * Overridable method used for adding optional response headers before serializing response
   * object.
   */
  protected void _modifyHeaders(Object value, Class<?> type, Type genericType,
      Annotation[] annotations, MultivaluedMap<String, Object> httpHeaders) throws IOException {
    // [Issue#6]: Add "nosniff" header?
    if (addNoSniffHeader) {
      httpHeaders.add(HEADER_CONTENT_TYPE_OPTIONS, "nosniff");
    }
  }

  /*
   * /********************************************************** /* MessageBodyReader impl
   * /**********************************************************
   */

  /**
   * Method that JAX-RS container calls to try to check whether values of given type (and media
   * type) can be deserialized by this provider. Implementation will first check that expected media
   * type is a JSON type (via call to {@link #hasMatchingMediaType}); then verify that type is not
   * one of "untouchable" types (types we will never automatically handle), and finally that there
   * is a deserializer for type (iff {@link #checkCanDeserialize} has been called with true argument
   * -- otherwise assumption is there will be a handler)
   */
  @Override
  public boolean isReadable(Class<?> type, Type genericType, Annotation[] annotations,
      MediaType mediaType) {
    if (!hasMatchingMediaType(mediaType)) {
      return false;
    }
    Boolean customUntouchable = _findCustomUntouchable(type);
    if (customUntouchable != null) {
      // negation: Boolean.TRUE means untouchable -> can not write
      return !customUntouchable.booleanValue();
    }
    /*
     * Ok: looks like we must weed out some core types here; ones that make no sense to try to bind
     * from JSON:
     */
    if (_isIgnorableForReading(new ClassKey(type))) {
      return false;
    }
    // and there are some other abstract/interface types to exclude too:
    for (Class<?> cls : _unreadableClasses) {
      if (cls.isAssignableFrom(type)) {
        return false;
      }
    }
    // Finally: if we really want to verify that we can serialize, we'll check:
    if (_cfgCheckCanDeserialize) {
      if (_isSpecialReadable(type)) {
        return true;
      }
    }
    return true;
  }

  /**
   * Method that JAX-RS container calls to deserialize given value.
   */
  @Override
  public Object readFrom(Class<Object> clazz, Type genericType, Annotation[] annotations,
      MediaType mediaType, MultivaluedMap<String, String> httpHeaders, InputStream in)
      throws IOException {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    byte[] buf = new byte[1024];
    for (;;) {
      int len = in.read(buf);
      if (len == -1) {
        break;
      }

      if (len > 0) {
        baos.write(buf, 0, len);
      }
    }

    byte[] bytes = baos.toByteArray();
    return JSON.parseObject(bytes, 0, bytes.length, charset.newDecoder(), clazz);
  }

  /**
   * Overridable helper method used to allow handling of somewhat special types for reading
   * 
   * @since 2.2
   */
  protected boolean _isSpecialReadable(Class<?> type) {
    // return JsonParser.class == type;
    return false;
  }

  /**
   * Overridable helper method called to check whether given type is a known "ignorable type" (in
   * context of reading), values of which are not bound from content.
   *
   * @since 2.6
   */
  protected boolean _isIgnorableForReading(ClassKey typeKey) {
    return _untouchables.contains(typeKey);
  }

  /**
   * Overridable helper method called to check whether given type is a known "ignorable type" (in
   * context of reading), values of which can not be written out.
   *
   * @since 2.6
   */
  protected boolean _isIgnorableForWriting(ClassKey typeKey) {
    return _untouchables.contains(typeKey);
  }

  /*
   * /********************************************************** /* Private/sub-class helper methods
   * /**********************************************************
   */

  protected static boolean _containedIn(Class<?> mainType, HashSet<ClassKey> set) {
    if (set != null) {
      ClassKey key = new ClassKey(mainType);
      // First: type itself?
      if (set.contains(key)) return true;
      // Then supertypes (note: will not contain Object.class)
      for (Class<?> cls : findSuperTypes(mainType, null)) {
        key.reset(cls);
        if (set.contains(key)) return true;
      }
    }
    return false;
  }

  protected Boolean _findCustomUntouchable(Class<?> mainType) {
    if (_cfgCustomUntouchables != null) {
      ClassKey key = new ClassKey(mainType);
      // First: type itself?
      Boolean b = _cfgCustomUntouchables.get(key);
      if (b != null) {
        return b;
      }
      // Then supertypes (note: will not contain Object.class)
      for (Class<?> cls : findSuperTypes(mainType, null)) {
        key.reset(cls);
        b = _cfgCustomUntouchables.get(key);
        if (b != null) {
          return b;
        }
      }
    }
    return null;
  }

  protected static List<Class<?>> findSuperTypes(Class<?> cls, Class<?> endBefore) {
    return findSuperTypes(cls, endBefore, new ArrayList<Class<?>>(8));
  }

  protected static List<Class<?>> findSuperTypes(Class<?> cls, Class<?> endBefore,
      List<Class<?>> result) {
    _addSuperTypes(cls, endBefore, result, false);
    return result;
  }

  protected static void _addSuperTypes(Class<?> cls, Class<?> endBefore,
      Collection<Class<?>> result, boolean addClassItself) {
    if (cls == endBefore || cls == null || cls == Object.class) {
      return;
    }
    if (addClassItself) {
      if (result.contains(cls)) { // already added, no need to check supers
        return;
      }
      result.add(cls);
    }
    for (Class<?> intCls : cls.getInterfaces()) {
      _addSuperTypes(intCls, endBefore, result, true);
    }
    _addSuperTypes(cls.getSuperclass(), endBefore, result, true);
  }

}
