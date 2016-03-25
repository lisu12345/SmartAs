/**
 * 
 */
package com.fiberhome.smartas.core.sql;

import com.fiberhome.smartas.core.util.StringUtils;

/**
 * @author chenb
 *
 */
public class Command {

  final String field;
  final Op operator;
  final Object value;


  public Command(String field, Op operator) {
    this(field, operator, null);
  }

  public Command(String field, Op operator, Object value) {
    this.field = StringUtils.convertPropertyNameToUnderscoreName(field);
    this.operator = operator;
    this.value = escape(value);
  }

  private Object escape(Object value) {
    switch (this.operator) {
      case LK:
      case ST:
      case ED:
        if (value != null) {
          return value.toString().replaceAll("[%_]", "\\\\$0");
        }
      default:
        break;
    }
    return value;
  }

  /**
   * @return the field
   */
  public String getField() {
    return field;
  }

  /**
   * @return the value
   */
  public Object getValue() {
    return value;
  }

  public String toSql(String filterName, int i) {
    return operator.toSql(filterName, this, i);
  }
}
