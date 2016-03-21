package com.fiberhome.smartas.devops.generator.code;

import static com.fiberhome.smartas.devops.generator.util.JavaBeansUtil.getJavaBeansField;
import static com.fiberhome.smartas.devops.generator.util.JavaBeansUtil.getJavaBeansGetter;
import static com.fiberhome.smartas.devops.generator.util.JavaBeansUtil.getJavaBeansSetter;

import java.util.List;

import com.fiberhome.smartas.devops.generator.java.Field;
import com.fiberhome.smartas.devops.generator.java.JavaVisibility;
import com.fiberhome.smartas.devops.generator.java.Method;
import com.fiberhome.smartas.devops.generator.java.TopLevelClass;
import com.fiberhome.smartas.devops.generator.meta.FullyQualifiedJavaType;
import com.fiberhome.smartas.devops.generator.meta.IntrospectedColumn;
import com.fiberhome.smartas.devops.generator.meta.Parameter;

/**
 * 
 * @author Jeff Butler
 * 
 */
public class JavaBeanGenerator extends AbstractJavaGenerator {

  public JavaBeanGenerator() {
    super();
  }

  @Override
  public TopLevelClass getCompilationUnits() {
    // FullyQualifiedTable table = introspectedTable.getFullyQualifiedTable();
    // progressCallback.startTask(getString("Progress.8", table.toString())); //$NON-NLS-1$
    // Plugin plugins = context.getPlugins();

    FullyQualifiedJavaType type = new FullyQualifiedJavaType(introspectedTable.getBaseRecordType());
    TopLevelClass topLevelClass = new TopLevelClass(type);
    topLevelClass.setVisibility(JavaVisibility.PUBLIC);
    commentGenerator.addJavaFileComment(topLevelClass);

    FullyQualifiedJavaType superClass = getSuperClass();
    if (superClass != null) {
      topLevelClass.setSuperClass(superClass);
      topLevelClass.addImportedType(superClass);
    }
    commentGenerator.addModelClassComment(topLevelClass, introspectedTable);

    List<IntrospectedColumn> introspectedColumns = getColumnsInThisClass();

    if (introspectedTable.isConstructorBased()) {
      addParameterizedConstructor(topLevelClass);

      if (!introspectedTable.isImmutable()) {
        addDefaultConstructor(topLevelClass);
      }
    }

    // String rootClass = getRootClass();
    for (IntrospectedColumn introspectedColumn : introspectedColumns) {
      // if (RootClassInfo.getInstance(rootClass, warnings).containsProperty(introspectedColumn)) {
      // continue;
      // }

      Field field = getJavaBeansField(introspectedColumn, commentGenerator, introspectedTable);
      topLevelClass.addField(field);
      topLevelClass.addImportedType(field.getType());

      Method method = getJavaBeansGetter(introspectedColumn, commentGenerator, introspectedTable);
      topLevelClass.addMethod(method);

      method = getJavaBeansSetter(introspectedColumn, commentGenerator, introspectedTable);
      topLevelClass.addMethod(method);
    }
    return topLevelClass;
  }

  private FullyQualifiedJavaType getSuperClass() {
    FullyQualifiedJavaType superClass;
    String rootClass = getRootClass();
    if (rootClass != null) {
      superClass = new FullyQualifiedJavaType(rootClass);
    } else {
      superClass = null;
    }
    return superClass;
  }

  private boolean includePrimaryKeyColumns() {
    // return !introspectedTable.getRules().generatePrimaryKeyClass()
    // && introspectedTable.hasPrimaryKeyColumns();
    return false;
  }

  private boolean includeBLOBColumns() {
    // return !introspectedTable.getRules().generateRecordWithBLOBsClass()
    // && introspectedTable.hasBLOBColumns();
    return false;
  }

  private void addParameterizedConstructor(TopLevelClass topLevelClass) {
    Method method = new Method();
    method.setVisibility(JavaVisibility.PUBLIC);
    method.setConstructor(true);
    method.setName(topLevelClass.getType().getShortName());
    commentGenerator.addGeneralMethodComment(method, introspectedTable);

    List<IntrospectedColumn> constructorColumns = includeBLOBColumns()
        ? introspectedTable.getAllColumns()
        : introspectedTable.getNonBLOBColumns();

    for (IntrospectedColumn introspectedColumn : constructorColumns) {
      method.addParameter(new Parameter(introspectedColumn.getFullyQualifiedJavaType(),
          introspectedColumn.getJavaProperty()));
      topLevelClass.addImportedType(introspectedColumn.getFullyQualifiedJavaType());
    }

    StringBuilder sb = new StringBuilder();

    List<IntrospectedColumn> introspectedColumns = getColumnsInThisClass();

    for (IntrospectedColumn introspectedColumn : introspectedColumns) {
      sb.setLength(0);
      sb.append("this."); //$NON-NLS-1$
      sb.append(introspectedColumn.getJavaProperty());
      sb.append(" = "); //$NON-NLS-1$
      sb.append(introspectedColumn.getJavaProperty());
      sb.append(';');
      method.addBodyLine(sb.toString());
    }

    topLevelClass.addMethod(method);
  }

  private List<IntrospectedColumn> getColumnsInThisClass() {
    List<IntrospectedColumn> introspectedColumns;
    if (includePrimaryKeyColumns()) {
      if (includeBLOBColumns()) {
        introspectedColumns = introspectedTable.getAllColumns();
      } else {
        introspectedColumns = introspectedTable.getNonBLOBColumns();
      }
    } else {
      if (includeBLOBColumns()) {
        introspectedColumns = introspectedTable.getNonPrimaryKeyColumns();
      } else {
        introspectedColumns = introspectedTable.getBaseColumns();
      }
    }

    return introspectedColumns;
  }
}
