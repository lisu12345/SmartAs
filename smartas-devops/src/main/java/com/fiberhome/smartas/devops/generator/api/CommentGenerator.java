package com.fiberhome.smartas.devops.generator.api;

import java.util.Properties;

import com.fiberhome.smartas.devops.generator.api.dom.xml.XmlElement;
import com.fiberhome.smartas.devops.generator.java.Field;
import com.fiberhome.smartas.devops.generator.java.InnerClass;
import com.fiberhome.smartas.devops.generator.java.InnerEnum;
import com.fiberhome.smartas.devops.generator.java.Method;
import com.fiberhome.smartas.devops.generator.java.TopLevelClass;
import com.fiberhome.smartas.devops.generator.meta.CompilationUnit;
import com.fiberhome.smartas.devops.generator.meta.IntrospectedColumn;
import com.fiberhome.smartas.devops.generator.meta.IntrospectedTable;

/**
 * Implementations of this interface are used to generate comments for the various artifacts.
 * 
 * @author Jeff Butler
 */
public interface CommentGenerator {

  /**
   * Adds properties for this instance from any properties configured in the CommentGenerator
   * configuration.
   * 
   * This method will be called before any of the other methods.
   * 
   * @param properties All properties from the configuration
   */
  void addConfigurationProperties(Properties properties);

  /**
   * This method should add a Javadoc comment to the specified field. The field is related to the
   * specified table and is used to hold the value of the specified column.
   * <p>
   * 
   * <b>Important:</b> This method should add a the nonstandard JavaDoc tag "@mbggenerated" to the
   * comment. Without this tag, the Eclipse based Java merge feature will fail.
   *
   * @param field the field
   * @param introspectedTable the introspected table
   * @param introspectedColumn the introspected column
   */
  public void addFieldComment(Field field, IntrospectedTable introspectedTable,
      IntrospectedColumn introspectedColumn);

  /**
   * Adds the field comment.
   *
   * @param field the field
   * @param introspectedTable the introspected table
   */
  public void addFieldComment(Field field, IntrospectedTable introspectedTable);

  /**
   * Adds a comment for a model class. The Java code merger should be notified not to delete the
   * entire class in case any manual changes have been made. So this method will always use the
   * "do not delete" annotation.
   * 
   * Because of difficulties with the Java file merger, the default implementation of this method
   * should NOT add comments. Comments should only be added if specifically requested by the user
   * (for example, by enabling table remark comments).
   *
   * @param topLevelClass the top level class
   * @param introspectedTable the introspected table
   */
  public void addModelClassComment(TopLevelClass topLevelClass,
      IntrospectedTable introspectedTable);

  /**
   * Adds the inner class comment.
   *
   * @param innerClass the inner class
   * @param introspectedTable the introspected table
   */
  public void addClassComment(InnerClass innerClass, IntrospectedTable introspectedTable);

  /**
   * Adds the inner class comment.
   *
   * @param innerClass the inner class
   * @param introspectedTable the introspected table
   * @param markAsDoNotDelete the mark as do not delete
   */
  public void addClassComment(InnerClass innerClass, IntrospectedTable introspectedTable,
      boolean markAsDoNotDelete);

  /**
   * Adds the enum comment.
   *
   * @param innerEnum the inner enum
   * @param introspectedTable the introspected table
   */
  public void addEnumComment(InnerEnum innerEnum, IntrospectedTable introspectedTable);

  /**
   * Adds the getter comment.
   *
   * @param method the method
   * @param introspectedTable the introspected table
   * @param introspectedColumn the introspected column
   */
  public void addGetterComment(Method method, IntrospectedTable introspectedTable,
      IntrospectedColumn introspectedColumn);

  /**
   * Adds the setter comment.
   *
   * @param method the method
   * @param introspectedTable the introspected table
   * @param introspectedColumn the introspected column
   */
  public void addSetterComment(Method method, IntrospectedTable introspectedTable,
      IntrospectedColumn introspectedColumn);

  /**
   * Adds the general method comment.
   *
   * @param method the method
   * @param introspectedTable the introspected table
   */
  public void addGeneralMethodComment(Method method, IntrospectedTable introspectedTable);

  /**
   * This method is called to add a file level comment to a generated java file. This method could
   * be used to add a general file comment (such as a copyright notice). However, note that the Java
   * file merge function in Eclipse does not deal with this comment. If you run the generator
   * repeatedly, you will only retain the comment from the initial run.
   * <p>
   * 
   * The default implementation does nothing.
   *
   * @param compilationUnit the compilation unit
   */
  public void addJavaFileComment(CompilationUnit compilationUnit);

  /**
   * This method should add a suitable comment as a child element of the specified xmlElement to
   * warn users that the element was generated and is subject to regeneration.
   *
   * @param xmlElement the xml element
   */
  public void addComment(XmlElement xmlElement);

  /**
   * This method is called to add a comment as the first child of the root element. This method
   * could be used to add a general file comment (such as a copyright notice). However, note that
   * the XML file merge function does not deal with this comment. If you run the generator
   * repeatedly, you will only retain the comment from the initial run.
   * <p>
   * 
   * The default implementation does nothing.
   *
   * @param rootElement the root element
   */
  public void addRootComment(XmlElement rootElement);
}
