package com.fiberhome.smartas.devops.generator.java;

import java.util.ArrayList;
import java.util.List;

import com.fiberhome.smartas.devops.generator.meta.CompilationUnit;
import com.fiberhome.smartas.devops.generator.meta.FullyQualifiedJavaType;
import com.fiberhome.smartas.devops.generator.util.OutputUtilities;

/**
 * The Class JavaElement.
 *
 * @author Jeff Butler
 */
public abstract class JavaElement {

  /** The java doc lines. */
  private List<String> javaDocLines;

  /** The visibility. */
  private JavaVisibility visibility = JavaVisibility.DEFAULT;

  /** The is static. */
  private boolean isStatic;

  /** The is final. */
  private boolean isFinal;

  /** The annotations. */
  private List<String> annotations;

  /**
   * Instantiates a new java element.
   */
  public JavaElement() {
    super();
    javaDocLines = new ArrayList<String>();
    annotations = new ArrayList<String>();
  }

  /**
   * Copy Constructor.
   *
   * @param original the original
   */
  public JavaElement(JavaElement original) {
    this();
    this.annotations.addAll(original.annotations);
    this.isFinal = original.isFinal;
    this.isStatic = original.isFinal;
    this.javaDocLines.addAll(original.javaDocLines);
    this.visibility = original.visibility;
  }

  /**
   * Gets the java doc lines.
   *
   * @return Returns the javaDocLines.
   */
  public List<String> getJavaDocLines() {
    return javaDocLines;
  }

  /**
   * Adds the java doc line.
   *
   * @param javaDocLine the java doc line
   */
  public void addJavaDocLine(String javaDocLine) {
    javaDocLines.add(javaDocLine);
  }

  /**
   * Gets the annotations.
   *
   * @return the annotations
   */
  public List<String> getAnnotations() {
    return annotations;
  }

  /**
   * Adds the annotation.
   *
   * @param annotation the annotation
   */
  public void addAnnotation(String annotation) {
    annotations.add(annotation);
  }

  /**
   * Gets the visibility.
   *
   * @return Returns the visibility.
   */
  public JavaVisibility getVisibility() {
    return visibility;
  }

  /**
   * Sets the visibility.
   *
   * @param visibility The visibility to set.
   */
  public void setVisibility(JavaVisibility visibility) {
    this.visibility = visibility;
  }

  /**
   * Adds the suppress type warnings annotation.
   */
  public void addSuppressTypeWarningsAnnotation() {
    addAnnotation("@SuppressWarnings(\"unchecked\")"); //$NON-NLS-1$
  }

  /**
   * Adds the formatted javadoc.
   *
   * @param sb the sb
   * @param indentLevel the indent level
   */
  public void addFormattedJavadoc(StringBuilder sb, int indentLevel) {
    for (String javaDocLine : javaDocLines) {
      OutputUtilities.javaIndent(sb, indentLevel);
      sb.append(javaDocLine);
      OutputUtilities.newLine(sb);
    }
  }

  /**
   * Adds the formatted annotations.
   *
   * @param sb the sb
   * @param indentLevel the indent level
   */
  public void addFormattedAnnotations(StringBuilder sb, int indentLevel) {
    for (String annotation : annotations) {
      OutputUtilities.javaIndent(sb, indentLevel);
      sb.append(annotation);
      OutputUtilities.newLine(sb);
    }
  }

  /**
   * Checks if is final.
   *
   * @return true, if is final
   */
  public boolean isFinal() {
    return isFinal;
  }

  /**
   * Sets the final.
   *
   * @param isFinal the new final
   */
  public void setFinal(boolean isFinal) {
    this.isFinal = isFinal;
  }

  /**
   * Checks if is static.
   *
   * @return true, if is static
   */
  public boolean isStatic() {
    return isStatic;
  }

  /**
   * Sets the static.
   *
   * @param isStatic the new static
   */
  public void setStatic(boolean isStatic) {
    this.isStatic = isStatic;
  }

  /**
   * Helper method to resolve type names.
   * 
   * @param sb the string buffer
   * @param compilationUnit the compilation unit
   * @param fqjt the type
   */
  public static final void addTypeName(StringBuilder sb, CompilationUnit compilationUnit,
      FullyQualifiedJavaType fqjt) {
    if (fqjt != null) {
      if (!fqjt.isExplicitlyImported() || compilationUnit == null
          || fqjt.getPackageName().equals(compilationUnit.getType().getPackageName())
          || compilationUnit.getImportedTypes().contains(fqjt)) {
        sb.append(fqjt.getShortName());
      } else {
        sb.append(fqjt.getFullyQualifiedName());
      }
    }
  }
}
