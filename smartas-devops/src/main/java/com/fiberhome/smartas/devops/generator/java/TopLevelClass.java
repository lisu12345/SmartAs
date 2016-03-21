package com.fiberhome.smartas.devops.generator.java;

import static com.fiberhome.smartas.devops.generator.util.OutputUtilities.calculateImports;
import static com.fiberhome.smartas.devops.generator.util.OutputUtilities.newLine;
import static com.fiberhome.smartas.devops.generator.util.StringUtility.stringHasValue;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import com.fiberhome.smartas.devops.generator.meta.CompilationUnit;
import com.fiberhome.smartas.devops.generator.meta.FullyQualifiedJavaType;

/**
 * The Class TopLevelClass.
 *
 * @author Jeff Butler
 */
public class TopLevelClass extends InnerClass implements CompilationUnit {

  /** The imported types. */
  private Set<FullyQualifiedJavaType> importedTypes;

  /** The static imports. */
  private Set<String> staticImports;

  /** The file comment lines. */
  private List<String> fileCommentLines;

  /**
   * Instantiates a new top level class.
   *
   * @param type the type
   */
  public TopLevelClass(FullyQualifiedJavaType type) {
    super(type);
    importedTypes = new TreeSet<FullyQualifiedJavaType>();
    fileCommentLines = new ArrayList<String>();
    staticImports = new TreeSet<String>();
  }

  /**
   * Instantiates a new top level class.
   *
   * @param typeName the type name
   */
  public TopLevelClass(String typeName) {
    this(new FullyQualifiedJavaType(typeName));
  }

  /**
   * Gets the imported types.
   *
   * @return Returns the importedTypes.
   */
  public Set<FullyQualifiedJavaType> getImportedTypes() {
    return Collections.unmodifiableSet(importedTypes);
  }

  /**
   * Adds the imported type.
   *
   * @param importedType the imported type
   */
  public void addImportedType(String importedType) {
    addImportedType(new FullyQualifiedJavaType(importedType));
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * org.mybatis.generator.api.dom.java.CompilationUnit#addImportedType(org.mybatis.generator.api.
   * dom.java.FullyQualifiedJavaType)
   */
  public void addImportedType(FullyQualifiedJavaType importedType) {
    if (importedType != null && importedType.isExplicitlyImported()
        && !importedType.getPackageName().equals(getType().getPackageName())
        && !importedType.getShortName().equals(getType().getShortName())) {
      importedTypes.add(importedType);
    }
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.mybatis.generator.api.dom.java.CompilationUnit#getFormattedContent()
   */
  public String getFormattedContent() {
    StringBuilder sb = new StringBuilder();

    for (String fileCommentLine : fileCommentLines) {
      sb.append(fileCommentLine);
      newLine(sb);
    }

    if (stringHasValue(getType().getPackageName())) {
      sb.append("package "); //$NON-NLS-1$
      sb.append(getType().getPackageName());
      sb.append(';');
      newLine(sb);
      newLine(sb);
    }

    for (String staticImport : staticImports) {
      sb.append("import static "); //$NON-NLS-1$
      sb.append(staticImport);
      sb.append(';');
      newLine(sb);
    }

    if (staticImports.size() > 0) {
      newLine(sb);
    }

    Set<String> importStrings = calculateImports(importedTypes);
    for (String importString : importStrings) {
      sb.append(importString);
      newLine(sb);
    }

    if (importStrings.size() > 0) {
      newLine(sb);
    }

    sb.append(super.getFormattedContent(0, this));

    return sb.toString();
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.mybatis.generator.api.dom.java.CompilationUnit#isJavaInterface()
   */
  public boolean isJavaInterface() {
    return false;
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.mybatis.generator.api.dom.java.CompilationUnit#isJavaEnumeration()
   */
  public boolean isJavaEnumeration() {
    return false;
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.mybatis.generator.api.dom.java.CompilationUnit#addFileCommentLine(java.lang.String)
   */
  public void addFileCommentLine(String commentLine) {
    fileCommentLines.add(commentLine);
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.mybatis.generator.api.dom.java.CompilationUnit#getFileCommentLines()
   */
  public List<String> getFileCommentLines() {
    return fileCommentLines;
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.mybatis.generator.api.dom.java.CompilationUnit#addImportedTypes(java.util.Set)
   */
  public void addImportedTypes(Set<FullyQualifiedJavaType> importedTypes) {
    this.importedTypes.addAll(importedTypes);
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.mybatis.generator.api.dom.java.CompilationUnit#getStaticImports()
   */
  public Set<String> getStaticImports() {
    return staticImports;
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.mybatis.generator.api.dom.java.CompilationUnit#addStaticImport(java.lang.String)
   */
  public void addStaticImport(String staticImport) {
    staticImports.add(staticImport);
  }

  /*
   * (non-Javadoc)
   * 
   * @see org.mybatis.generator.api.dom.java.CompilationUnit#addStaticImports(java.util.Set)
   */
  public void addStaticImports(Set<String> staticImports) {
    this.staticImports.addAll(staticImports);
  }
}
