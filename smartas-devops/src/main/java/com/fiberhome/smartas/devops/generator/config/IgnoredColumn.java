package com.fiberhome.smartas.devops.generator.config;

import static com.fiberhome.smartas.devops.generator.util.Messages.getString;
import static com.fiberhome.smartas.devops.generator.util.StringUtility.stringContainsSpace;
import static com.fiberhome.smartas.devops.generator.util.StringUtility.stringHasValue;

import java.util.List;

import com.fiberhome.smartas.devops.generator.api.dom.xml.Attribute;
import com.fiberhome.smartas.devops.generator.api.dom.xml.XmlElement;

/**
 * The Class IgnoredColumn.
 *
 * @author Jeff Butler
 */
public class IgnoredColumn {

  /** The column name. */
  private String columnName;

  /** The is column name delimited. */
  private boolean isColumnNameDelimited;

  /** The configured delimited column name. */
  private String configuredDelimitedColumnName;

  /**
   * Instantiates a new ignored column.
   *
   * @param columnName the column name
   */
  public IgnoredColumn(String columnName) {
    super();
    this.columnName = columnName;
    isColumnNameDelimited = stringContainsSpace(columnName);
  }

  /**
   * Gets the column name.
   *
   * @return the column name
   */
  public String getColumnName() {
    return columnName;
  }

  /**
   * Checks if is column name delimited.
   *
   * @return true, if is column name delimited
   */
  public boolean isColumnNameDelimited() {
    return isColumnNameDelimited;
  }

  /**
   * Sets the column name delimited.
   *
   * @param isColumnNameDelimited the new column name delimited
   */
  public void setColumnNameDelimited(boolean isColumnNameDelimited) {
    this.isColumnNameDelimited = isColumnNameDelimited;
    configuredDelimitedColumnName = isColumnNameDelimited ? "true" : "false"; //$NON-NLS-1$ //$NON-NLS-2$
  }

  /*
   * (non-Javadoc)
   * 
   * @see java.lang.Object#equals(java.lang.Object)
   */
  public boolean equals(Object obj) {
    if (obj == null || !(obj instanceof IgnoredColumn)) {
      return false;
    }

    return columnName.equals(((IgnoredColumn) obj).getColumnName());
  }

  /*
   * (non-Javadoc)
   * 
   * @see java.lang.Object#hashCode()
   */
  public int hashCode() {
    return columnName.hashCode();
  }

  /**
   * To xml element.
   *
   * @return the xml element
   */
  public XmlElement toXmlElement() {
    XmlElement xmlElement = new XmlElement("ignoreColumn"); //$NON-NLS-1$
    xmlElement.addAttribute(new Attribute("column", columnName)); //$NON-NLS-1$

    if (stringHasValue(configuredDelimitedColumnName)) {
      xmlElement.addAttribute(new Attribute("delimitedColumnName", configuredDelimitedColumnName)); //$NON-NLS-1$
    }

    return xmlElement;
  }

  /**
   * Validate.
   *
   * @param errors the errors
   * @param tableName the table name
   */
  public void validate(List<String> errors, String tableName) {
    if (!stringHasValue(columnName)) {
      errors.add(getString("ValidationError.21", //$NON-NLS-1$
          tableName));
    }
  }
}
