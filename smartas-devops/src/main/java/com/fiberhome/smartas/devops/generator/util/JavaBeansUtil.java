 
package com.fiberhome.smartas.devops.generator.util;

import java.util.Locale;

import com.fiberhome.smartas.devops.generator.api.CommentGenerator;
import com.fiberhome.smartas.devops.generator.java.Field;
import com.fiberhome.smartas.devops.generator.java.JavaVisibility;
import com.fiberhome.smartas.devops.generator.java.Method;
import com.fiberhome.smartas.devops.generator.meta.FullyQualifiedJavaType;
import com.fiberhome.smartas.devops.generator.meta.IntrospectedColumn;
import com.fiberhome.smartas.devops.generator.meta.IntrospectedTable;
import com.fiberhome.smartas.devops.generator.meta.Parameter;

/**
 * The Class JavaBeansUtil.
 *
 * @author Jeff Butler
 */
public class JavaBeansUtil {

  /**
   * Instantiates a new java beans util.
   */
  private JavaBeansUtil() {
    super();
  }

  /**
   * JavaBeans rules:
   * 
   * eMail &gt; geteMail() firstName &gt; getFirstName() URL $gt; getURL() XAxis &gt; getXAxis() a
   * &gt; getA() B &gt; invalid - this method assumes that this is not the case. Call
   * getValidPropertyName first. Yaxis &gt; invalid - this method assumes that this is not the case.
   * Call getValidPropertyName first.
   *
   * @param property the property
   * @param fullyQualifiedJavaType the fully qualified java type
   * @return the getter method name
   */
  public static String getGetterMethodName(String property,
      FullyQualifiedJavaType fullyQualifiedJavaType) {
    StringBuilder sb = new StringBuilder();

    sb.append(property);
    if (Character.isLowerCase(sb.charAt(0))) {
      if (sb.length() == 1 || !Character.isUpperCase(sb.charAt(1))) {
        sb.setCharAt(0, Character.toUpperCase(sb.charAt(0)));
      }
    }

    if (fullyQualifiedJavaType.equals(FullyQualifiedJavaType.getBooleanPrimitiveInstance())) {
      sb.insert(0, "is"); //$NON-NLS-1$
    } else {
      sb.insert(0, "get"); //$NON-NLS-1$
    }

    return sb.toString();
  }

  /**
   * JavaBeans rules:
   * 
   * eMail &gt; seteMail() firstName &gt; setFirstName() URL &gt; setURL() XAxis &gt; setXAxis() a
   * &gt; setA() B &gt; invalid - this method assumes that this is not the case. Call
   * getValidPropertyName first. Yaxis &gt; invalid - this method assumes that this is not the case.
   * Call getValidPropertyName first.
   *
   * @param property the property
   * @return the setter method name
   */
  public static String getSetterMethodName(String property) {
    StringBuilder sb = new StringBuilder();

    sb.append(property);
    if (Character.isLowerCase(sb.charAt(0))) {
      if (sb.length() == 1 || !Character.isUpperCase(sb.charAt(1))) {
        sb.setCharAt(0, Character.toUpperCase(sb.charAt(0)));
      }
    }

    sb.insert(0, "set"); //$NON-NLS-1$

    return sb.toString();
  }

  /**
   * Gets the camel case string.
   *
   * @param inputString the input string
   * @param firstCharacterUppercase the first character uppercase
   * @return the camel case string
   */
  public static String getCamelCaseString(String inputString, boolean firstCharacterUppercase) {
    StringBuilder sb = new StringBuilder();

    boolean nextUpperCase = false;
    for (int i = 0; i < inputString.length(); i++) {
      char c = inputString.charAt(i);

      switch (c) {
        case '_':
        case '-':
        case '@':
        case '$':
        case '#':
        case ' ':
        case '/':
        case '&':
          if (sb.length() > 0) {
            nextUpperCase = true;
          }
          break;

        default:
          if (nextUpperCase) {
            sb.append(Character.toUpperCase(c));
            nextUpperCase = false;
          } else {
            sb.append(Character.toLowerCase(c));
          }
          break;
      }
    }

    if (firstCharacterUppercase) {
      sb.setCharAt(0, Character.toUpperCase(sb.charAt(0)));
    }

    return sb.toString();
  }

  /**
   * This method ensures that the specified input string is a valid Java property name. The rules
   * are as follows:
   * 
   * 1. If the first character is lower case, then OK 2. If the first two characters are upper case,
   * then OK 3. If the first character is upper case, and the second character is lower case, then
   * the first character should be made lower case
   * 
   * eMail &gt; eMail firstName &gt; firstName URL &gt; URL XAxis &gt; XAxis a &gt; a B &gt; b Yaxis
   * &gt; yaxis
   *
   * @param inputString the input string
   * @return the valid property name
   */
  public static String getValidPropertyName(String inputString) {
    String answer;

    if (inputString == null) {
      answer = null;
    } else if (inputString.length() < 2) {
      answer = inputString.toLowerCase(Locale.US);
    } else {
      if (Character.isUpperCase(inputString.charAt(0))
          && !Character.isUpperCase(inputString.charAt(1))) {
        answer = inputString.substring(0, 1).toLowerCase(Locale.US) + inputString.substring(1);
      } else {
        answer = inputString;
      }
    }

    return answer;
  }

  /**
   * Gets the java beans getter.
   *
   * @param introspectedColumn the introspected column
   * @param context the context
   * @param introspectedTable the introspected table
   * @return the java beans getter
   */
  public static Method getJavaBeansGetter(IntrospectedColumn introspectedColumn, CommentGenerator commentGenerator,
      IntrospectedTable introspectedTable) {
    FullyQualifiedJavaType fqjt = introspectedColumn.getFullyQualifiedJavaType();
    String property = introspectedColumn.getJavaProperty();

    Method method = new Method();
    method.setVisibility(JavaVisibility.PUBLIC);
    method.setReturnType(fqjt);
    method.setName(getGetterMethodName(property, fqjt));
    commentGenerator.addGetterComment(method, introspectedTable, introspectedColumn);

    StringBuilder sb = new StringBuilder();
    sb.append("return "); //$NON-NLS-1$
    sb.append(property);
    sb.append(';');
    method.addBodyLine(sb.toString());

    return method;
  }

  /**
   * Gets the java beans field.
   *
   * @param introspectedColumn the introspected column
   * @param context the context
   * @param introspectedTable the introspected table
   * @return the java beans field
   */
  public static Field getJavaBeansField(IntrospectedColumn introspectedColumn,CommentGenerator commentGenerator,
      IntrospectedTable introspectedTable) {
    FullyQualifiedJavaType fqjt = introspectedColumn.getFullyQualifiedJavaType();
    String property = introspectedColumn.getJavaProperty();

    Field field = new Field();
    field.setVisibility(JavaVisibility.PRIVATE);
    field.setType(fqjt);
    field.setName(property);
    commentGenerator.addFieldComment(field, introspectedTable, introspectedColumn);

    return field;
  }

  /**
   * Gets the java beans setter.
   *
   * @param introspectedColumn the introspected column
   * @param context the context
   * @param introspectedTable the introspected table
   * @return the java beans setter
   */
  public static Method getJavaBeansSetter(IntrospectedColumn introspectedColumn,CommentGenerator commentGenerator,
      IntrospectedTable introspectedTable) {
    FullyQualifiedJavaType fqjt = introspectedColumn.getFullyQualifiedJavaType();
    String property = introspectedColumn.getJavaProperty();

    Method method = new Method();
    method.setVisibility(JavaVisibility.PUBLIC);
    method.setName(getSetterMethodName(property));
    method.addParameter(new Parameter(fqjt, property));
    commentGenerator.addSetterComment(method, introspectedTable, introspectedColumn);

    StringBuilder sb = new StringBuilder();
    if (isTrimStringsEnabled() && introspectedColumn.isStringColumn()) {
      sb.append("this."); //$NON-NLS-1$
      sb.append(property);
      sb.append(" = "); //$NON-NLS-1$
      sb.append(property);
      sb.append(" == null ? null : "); //$NON-NLS-1$
      sb.append(property);
      sb.append(".trim();"); //$NON-NLS-1$
      method.addBodyLine(sb.toString());
    } else {
      sb.append("this."); //$NON-NLS-1$
      sb.append(property);
      sb.append(" = "); //$NON-NLS-1$
      sb.append(property);
      sb.append(';');
      method.addBodyLine(sb.toString());
    }

    return method;
  }

  /**
   * Checks if is trim strings enabled.
   *
   * @param context the context
   * @return true, if is trim strings enabled
   */
  private static boolean isTrimStringsEnabled() {
    // Properties properties = context.getJavaModelGeneratorConfiguration().getProperties();
    // boolean rc = isTrue(properties.getProperty(PropertyRegistry.MODEL_GENERATOR_TRIM_STRINGS));
    // return rc;
    return false;
  }

}
