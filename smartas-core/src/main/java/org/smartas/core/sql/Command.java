/**
 * 
 */
package org.smartas.core.sql;

/**
 * @author chenb
 *
 */
public class Command {

  private final String field;
  private final Object value;
  private final Operator operator;

  public Command(String field, Object value, String operator) {
    super();
    this.field = field;
    this.value = value;
    this.operator = Operator.valueOf(operator);
  }

  public Command(String field, String operator) {
    super();
    this.field = field;
    this.value = null;
    this.operator = Operator.valueOf(operator);
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

  public String toSql(String filterName) {
    return operator.toSql(filterName, field);
  }

  // <,>,=,<=,>=,in,like
  public enum Operator {
    LT {
      String toSql(String filterName, String field) {
        return String.format("%s.%s < #{item.value}", filterName, field);
        // return new StringBuilder(filterName).append('.').append(field).append(" <
        // #{item.value}").toString();
      }
    },
    GT {
      String toSql(String filterName, String field) {
        return String.format("%s.%s > #{item.value}", filterName, field);
      }
    },
    EQ {
      String toSql(String filterName, String field) {
        return String.format("%s.%s = #{item.value}", filterName, field);
      }
    },
    LE {
      String toSql(String filterName, String field) {
        return String.format("%s.%s <= #{item.value}", filterName, field);
      }
    },
    GE {
      String toSql(String filterName, String field) {
        return String.format("%s.%s >= #{item.value}", filterName, field);
      }
    },
    IN {
      String toSql(String filterName, String field) {
        return String.format("%s.%s in (#{item.value})", filterName, field);
      }
    },
    LK {
      String toSql(String filterName, String field) {
        return String.format("%s.%s like CONCAT('%%',#{item.value},'%%')", filterName, field);
      }
    },
    RLK {
      String toSql(String filterName, String field) {
        return String.format("%s.%s like CONCAT(#{item.value},'%%')", filterName, field);
      }
    };
    abstract String toSql(String filterName, String field);
  }

}
