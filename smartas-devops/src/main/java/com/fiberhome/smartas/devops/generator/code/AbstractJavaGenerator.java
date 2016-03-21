package com.fiberhome.smartas.devops.generator.code;

import static com.fiberhome.smartas.devops.generator.util.JavaBeansUtil.getGetterMethodName;

import com.fiberhome.smartas.core.model.LongIdVO;
import com.fiberhome.smartas.devops.generator.config.PropertyRegistry;
import com.fiberhome.smartas.devops.generator.java.Field;
import com.fiberhome.smartas.devops.generator.java.JavaVisibility;
import com.fiberhome.smartas.devops.generator.java.Method;
import com.fiberhome.smartas.devops.generator.java.TopLevelClass;

/**
 * 
 * @author Jeff Butler
 * 
 */
public abstract class AbstractJavaGenerator extends AbstractGenerator {
  public abstract TopLevelClass getCompilationUnits();

  public static Method getGetter(Field field) {
    Method method = new Method();
    method.setName(getGetterMethodName(field.getName(), field.getType()));
    method.setReturnType(field.getType());
    method.setVisibility(JavaVisibility.PUBLIC);
    StringBuilder sb = new StringBuilder();
    sb.append("return "); //$NON-NLS-1$
    sb.append(field.getName());
    sb.append(';');
    method.addBodyLine(sb.toString());
    return method;
  }

  public String getRootClass() {
    String rootClass =
        introspectedTable.getTableConfigurationProperty(PropertyRegistry.ANY_ROOT_CLASS);
    if (rootClass == null) {
      // Properties properties = context.getJavaModelGeneratorConfiguration().getProperties();
      rootClass = LongIdVO.class.getName();
    }

    return rootClass;
  }

  protected void addDefaultConstructor(TopLevelClass topLevelClass) {
    Method method = new Method();
    method.setVisibility(JavaVisibility.PUBLIC);
    method.setConstructor(true);
    method.setName(topLevelClass.getType().getShortName());
    method.addBodyLine("super();"); //$NON-NLS-1$
    commentGenerator.addGeneralMethodComment(method, introspectedTable);
    topLevelClass.addMethod(method);
  }
}
