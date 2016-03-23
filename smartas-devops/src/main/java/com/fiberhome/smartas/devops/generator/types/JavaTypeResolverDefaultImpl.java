 
package com.fiberhome.smartas.devops.generator.types;

import java.math.BigDecimal;
import java.sql.Types;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import com.fiberhome.smartas.devops.generator.api.JavaTypeResolver;
import com.fiberhome.smartas.devops.generator.meta.FullyQualifiedJavaType;
import com.fiberhome.smartas.devops.generator.meta.IntrospectedColumn;

/**
 * 
 * @author Jeff Butler
 */
public class JavaTypeResolverDefaultImpl implements JavaTypeResolver {

  protected List<String> warnings;

  protected Properties properties;

  protected boolean forceBigDecimals;

  protected Map<Integer, JdbcTypeInformation> typeMap;

  public JavaTypeResolverDefaultImpl() {
    super();
    properties = new Properties();
    typeMap = new HashMap<Integer, JdbcTypeInformation>();

    typeMap.put(Types.ARRAY, new JdbcTypeInformation("ARRAY", //$NON-NLS-1$
        new FullyQualifiedJavaType(Object.class.getName())));
    typeMap.put(Types.BIGINT, new JdbcTypeInformation("BIGINT", //$NON-NLS-1$
        new FullyQualifiedJavaType(long.class.getName())));
    typeMap.put(Types.BINARY, new JdbcTypeInformation("BINARY", //$NON-NLS-1$
        new FullyQualifiedJavaType("byte[]"))); //$NON-NLS-1$
    typeMap.put(Types.BIT, new JdbcTypeInformation("BIT", //$NON-NLS-1$
        new FullyQualifiedJavaType(boolean.class.getName())));
    typeMap.put(Types.BLOB, new JdbcTypeInformation("BLOB", //$NON-NLS-1$
        new FullyQualifiedJavaType("byte[]"))); //$NON-NLS-1$
    typeMap.put(Types.BOOLEAN, new JdbcTypeInformation("BOOLEAN", //$NON-NLS-1$
        new FullyQualifiedJavaType(boolean.class.getName())));
    typeMap.put(Types.CHAR, new JdbcTypeInformation("CHAR", //$NON-NLS-1$
        new FullyQualifiedJavaType(String.class.getName())));
    typeMap.put(Types.CLOB, new JdbcTypeInformation("CLOB", //$NON-NLS-1$
        new FullyQualifiedJavaType(String.class.getName())));
    typeMap.put(Types.DATALINK, new JdbcTypeInformation("DATALINK", //$NON-NLS-1$
        new FullyQualifiedJavaType(Object.class.getName())));
    typeMap.put(Types.DATE, new JdbcTypeInformation("DATE", //$NON-NLS-1$
        new FullyQualifiedJavaType(Date.class.getName())));
    typeMap.put(Types.DISTINCT, new JdbcTypeInformation("DISTINCT", //$NON-NLS-1$
        new FullyQualifiedJavaType(Object.class.getName())));
    typeMap.put(Types.DOUBLE, new JdbcTypeInformation("DOUBLE", //$NON-NLS-1$
        new FullyQualifiedJavaType(double.class.getName())));
    typeMap.put(Types.FLOAT, new JdbcTypeInformation("FLOAT", //$NON-NLS-1$
        new FullyQualifiedJavaType(double.class.getName())));
    typeMap.put(Types.INTEGER, new JdbcTypeInformation("INTEGER", //$NON-NLS-1$
        new FullyQualifiedJavaType(int.class.getName())));
    typeMap.put(Types.JAVA_OBJECT, new JdbcTypeInformation("JAVA_OBJECT", //$NON-NLS-1$
        new FullyQualifiedJavaType(Object.class.getName())));
    typeMap.put(Types.LONGNVARCHAR, new JdbcTypeInformation("LONGNVARCHAR", //$NON-NLS-1$
        new FullyQualifiedJavaType(String.class.getName())));
    typeMap.put(Types.LONGVARBINARY, new JdbcTypeInformation("LONGVARBINARY", //$NON-NLS-1$
        new FullyQualifiedJavaType("byte[]"))); //$NON-NLS-1$
    typeMap.put(Types.LONGVARCHAR, new JdbcTypeInformation("LONGVARCHAR", //$NON-NLS-1$
        new FullyQualifiedJavaType(String.class.getName())));
    typeMap.put(Types.NCHAR, new JdbcTypeInformation("NCHAR", //$NON-NLS-1$
        new FullyQualifiedJavaType(String.class.getName())));
    typeMap.put(Types.NCLOB, new JdbcTypeInformation("NCLOB", //$NON-NLS-1$
        new FullyQualifiedJavaType(String.class.getName())));
    typeMap.put(Types.NVARCHAR, new JdbcTypeInformation("NVARCHAR", //$NON-NLS-1$
        new FullyQualifiedJavaType(String.class.getName())));
    typeMap.put(Types.NULL, new JdbcTypeInformation("NULL", //$NON-NLS-1$
        new FullyQualifiedJavaType(Object.class.getName())));
    typeMap.put(Types.OTHER, new JdbcTypeInformation("OTHER", //$NON-NLS-1$
        new FullyQualifiedJavaType(Object.class.getName())));
    typeMap.put(Types.REAL, new JdbcTypeInformation("REAL", //$NON-NLS-1$
        new FullyQualifiedJavaType(float.class.getName())));
    typeMap.put(Types.REF, new JdbcTypeInformation("REF", //$NON-NLS-1$
        new FullyQualifiedJavaType(Object.class.getName())));
    typeMap.put(Types.SMALLINT, new JdbcTypeInformation("SMALLINT", //$NON-NLS-1$
        new FullyQualifiedJavaType(Short.class.getName())));
    typeMap.put(Types.STRUCT, new JdbcTypeInformation("STRUCT", //$NON-NLS-1$
        new FullyQualifiedJavaType(Object.class.getName())));
    typeMap.put(Types.TIME, new JdbcTypeInformation("TIME", //$NON-NLS-1$
        new FullyQualifiedJavaType(Date.class.getName())));
    typeMap.put(Types.TIMESTAMP, new JdbcTypeInformation("TIMESTAMP", //$NON-NLS-1$
        new FullyQualifiedJavaType(Date.class.getName())));
    typeMap.put(Types.TINYINT, new JdbcTypeInformation("TINYINT", //$NON-NLS-1$
        new FullyQualifiedJavaType(Byte.class.getName())));
    typeMap.put(Types.VARBINARY, new JdbcTypeInformation("VARBINARY", //$NON-NLS-1$
        new FullyQualifiedJavaType("byte[]"))); //$NON-NLS-1$
    typeMap.put(Types.VARCHAR, new JdbcTypeInformation("VARCHAR", //$NON-NLS-1$
        new FullyQualifiedJavaType(String.class.getName())));

  }

  public void addConfigurationProperties(Properties properties) {
    this.properties.putAll(properties);
    forceBigDecimals = true;
  }

  public FullyQualifiedJavaType calculateJavaType(IntrospectedColumn introspectedColumn) {
    FullyQualifiedJavaType answer;
    JdbcTypeInformation jdbcTypeInformation = typeMap.get(introspectedColumn.getJdbcType());

    if (jdbcTypeInformation == null) {
      switch (introspectedColumn.getJdbcType()) {
        case Types.DECIMAL:
        case Types.NUMERIC:
          if (introspectedColumn.getScale() > 0 || introspectedColumn.getLength() > 18
              || forceBigDecimals) {
            answer = new FullyQualifiedJavaType(BigDecimal.class.getName());
          } else if (introspectedColumn.getLength() > 9) {
            answer = new FullyQualifiedJavaType(Long.class.getName());
          } else if (introspectedColumn.getLength() > 4) {
            answer = new FullyQualifiedJavaType(Integer.class.getName());
          } else {
            answer = new FullyQualifiedJavaType(Short.class.getName());
          }
          break;

        default:
          answer = null;
          break;
      }
    } else {
      answer = jdbcTypeInformation.getFullyQualifiedJavaType();
    }

    return answer;
  }

  public String calculateJdbcTypeName(IntrospectedColumn introspectedColumn) {
    String answer;
    JdbcTypeInformation jdbcTypeInformation = typeMap.get(introspectedColumn.getJdbcType());

    if (jdbcTypeInformation == null) {
      switch (introspectedColumn.getJdbcType()) {
        case Types.DECIMAL:
          answer = "DECIMAL"; //$NON-NLS-1$
          break;
        case Types.NUMERIC:
          answer = "NUMERIC"; //$NON-NLS-1$
          break;
        default:
          answer = null;
          break;
      }
    } else {
      answer = jdbcTypeInformation.getJdbcTypeName();
    }

    return answer;
  }

  public void setWarnings(List<String> warnings) {
    this.warnings = warnings;
  }


  public static class JdbcTypeInformation {
    private String jdbcTypeName;

    private FullyQualifiedJavaType fullyQualifiedJavaType;

    public JdbcTypeInformation(String jdbcTypeName, FullyQualifiedJavaType fullyQualifiedJavaType) {
      this.jdbcTypeName = jdbcTypeName;
      this.fullyQualifiedJavaType = fullyQualifiedJavaType;
    }

    public String getJdbcTypeName() {
      return jdbcTypeName;
    }

    public FullyQualifiedJavaType getFullyQualifiedJavaType() {
      return fullyQualifiedJavaType;
    }
  }
}