 
package com.fiberhome.smartas.devops.generator.meta;

import java.sql.Types;
import java.util.Properties;

import com.fiberhome.smartas.devops.generator.util.StringUtility;

/**
 * This class holds information about an introspected column. The class has utility methods useful
 * for generating iBATIS objects.
 * 
 * @author Jeff Butler
 */
public class IntrospectedColumn {
  protected String actualColumnName;

  protected int jdbcType;

  protected String jdbcTypeName;

  protected boolean nullable;

  protected int length;

  protected int scale;

  protected boolean identity;

  protected boolean isSequenceColumn;

  protected String javaProperty;

  protected FullyQualifiedJavaType fullyQualifiedJavaType;

  protected String tableAlias;

  protected String typeHandler;

  protected boolean isColumnNameDelimited;

  protected Properties properties;

  // any database comment associated with this column. May be null
  protected String remarks;

  protected String defaultValue;

  /**
   * Constructs a Column definition. This object holds all the information about a column that is
   * required to generate Java objects and SQL maps;
   */
  public IntrospectedColumn() {
    super();
    properties = new Properties();
  }

  public int getJdbcType() {
    return jdbcType;
  }

  public void setJdbcType(int jdbcType) {
    this.jdbcType = jdbcType;
  }

  public int getLength() {
    return length;
  }

  public void setLength(int length) {
    this.length = length;
  }

  public boolean isNullable() {
    return nullable;
  }

  public void setNullable(boolean nullable) {
    this.nullable = nullable;
  }

  public int getScale() {
    return scale;
  }

  public void setScale(int scale) {
    this.scale = scale;
  }

  /*
   * This method is primarily used for debugging, so we don't externalize the strings
   */
  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();

    sb.append("Actual Column Name: "); //$NON-NLS-1$
    sb.append(actualColumnName);
    sb.append(", JDBC Type: "); //$NON-NLS-1$
    sb.append(jdbcType);
    sb.append(", Nullable: "); //$NON-NLS-1$
    sb.append(nullable);
    sb.append(", Length: "); //$NON-NLS-1$
    sb.append(length);
    sb.append(", Scale: "); //$NON-NLS-1$
    sb.append(scale);
    sb.append(", Identity: "); //$NON-NLS-1$
    sb.append(identity);

    return sb.toString();
  }

  public void setActualColumnName(String actualColumnName) {
    this.actualColumnName = actualColumnName;
    isColumnNameDelimited = StringUtility.stringContainsSpace(actualColumnName);
  }

  /**
   * @return Returns the identity.
   */
  public boolean isIdentity() {
    return identity;
  }

  /**
   * @param identity The identity to set.
   */
  public void setIdentity(boolean identity) {
    this.identity = identity;
  }

  public boolean isBLOBColumn() {
    String typeName = getJdbcTypeName();

    return "BINARY".equals(typeName) || "BLOB".equals(typeName) //$NON-NLS-1$ //$NON-NLS-2$
        || "CLOB".equals(typeName) || "LONGNVARCHAR".equals(typeName) //$NON-NLS-1$ //$NON-NLS-2$
        || "LONGVARBINARY".equals(typeName) || "LONGVARCHAR".equals(typeName) //$NON-NLS-1$ //$NON-NLS-2$
        || "NCLOB".equals(typeName) || "VARBINARY".equals(typeName); //$NON-NLS-1$ //$NON-NLS-2$
  }

  public boolean isStringColumn() {
    return fullyQualifiedJavaType.equals(FullyQualifiedJavaType.getStringInstance());
  }

  public boolean isJdbcCharacterColumn() {
    return jdbcType == Types.CHAR || jdbcType == Types.CLOB || jdbcType == Types.LONGVARCHAR
        || jdbcType == Types.VARCHAR || jdbcType == Types.LONGNVARCHAR || jdbcType == Types.NCHAR
        || jdbcType == Types.NCLOB || jdbcType == Types.NVARCHAR;
  }

  public String getJavaProperty() {
    return getJavaProperty(null);
  }

  public String getJavaProperty(String prefix) {
    if (prefix == null) {
      return javaProperty;
    }

    StringBuilder sb = new StringBuilder();
    sb.append(prefix);
    sb.append(javaProperty);

    return sb.toString();
  }

  public void setJavaProperty(String javaProperty) {
    this.javaProperty = javaProperty;
  }

  public boolean isJDBCDateColumn() {
    return fullyQualifiedJavaType.equals(FullyQualifiedJavaType.getDateInstance())
        && "DATE".equalsIgnoreCase(jdbcTypeName); //$NON-NLS-1$
  }

  public boolean isJDBCTimeColumn() {
    return fullyQualifiedJavaType.equals(FullyQualifiedJavaType.getDateInstance())
        && "TIME".equalsIgnoreCase(jdbcTypeName); //$NON-NLS-1$
  }

  public String getTypeHandler() {
    return typeHandler;
  }

  public void setTypeHandler(String typeHandler) {
    this.typeHandler = typeHandler;
  }

  public String getActualColumnName() {
    return actualColumnName;
  }

  public void setColumnNameDelimited(boolean isColumnNameDelimited) {
    this.isColumnNameDelimited = isColumnNameDelimited;
  }

  public boolean isColumnNameDelimited() {
    return isColumnNameDelimited;
  }

  public String getJdbcTypeName() {
    if (jdbcTypeName == null) {
      return "OTHER"; //$NON-NLS-1$
    }

    return jdbcTypeName;
  }

  public void setJdbcTypeName(String jdbcTypeName) {
    this.jdbcTypeName = jdbcTypeName;
  }

  public FullyQualifiedJavaType getFullyQualifiedJavaType() {
    return fullyQualifiedJavaType;
  }

  public void setFullyQualifiedJavaType(FullyQualifiedJavaType fullyQualifiedJavaType) {
    this.fullyQualifiedJavaType = fullyQualifiedJavaType;
  }

  public String getTableAlias() {
    return tableAlias;
  }

  public void setTableAlias(String tableAlias) {
    this.tableAlias = tableAlias;
  }


  public Properties getProperties() {
    return properties;
  }

  public void setProperties(Properties properties) {
    this.properties.putAll(properties);
  }

  public String getRemarks() {
    return remarks;
  }

  public void setRemarks(String remarks) {
    this.remarks = remarks;
  }

  public String getDefaultValue() {
    return defaultValue;
  }

  public void setDefaultValue(String defaultValue) {
    this.defaultValue = defaultValue;
  }

  public boolean isSequenceColumn() {
    return isSequenceColumn;
  }

  public void setSequenceColumn(boolean isSequenceColumn) {
    this.isSequenceColumn = isSequenceColumn;
  }

  public String getTitle() {
    return this.remarks != null ? this.remarks : this.actualColumnName;
  }
}