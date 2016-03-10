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
  private final Operator operator;
  private final Object value;

  public Command(String field, String operator) {
    this(field, operator, null);
  }

  public Command(String field, String operator, Object value) {
    this.field = field;
    this.operator = Operator.valueOf(operator);
    this.value = escape(value);
  }

  private Object escape(Object value) {
    switch (this.operator) {
      case LK:
      case RLK:
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

  public String toSql(String filterName) {
    return operator.toSql(filterName, this);
  }

  // <,>,=,<=,>=,in,like
  public enum Operator {
    LT {
      String toSql(String filterName, Command cmd) {
        if (cmd.value != null) {
          return String.format("%s.%s < #{item.value}", filterName, cmd.field);
        }
        return "";
      }
    },
    GT {
      String toSql(String filterName, Command cmd) {
        if (cmd.value != null) {
          return String.format("%s.%s > #{item.value}", filterName, cmd.field);
        }
        return "";
      }
    },
    EQ {
      String toSql(String filterName, Command cmd) {
        if (cmd.value != null) {
          return String.format("%s.%s = #{item.value}", filterName, cmd.field);
        }
        return "";
      }
    },
    LE {
      String toSql(String filterName, Command cmd) {
        if (cmd.value != null) {
          return String.format("%s.%s <= #{item.value}", filterName, cmd.field);
        }
        return "";
      }
    },
    GE {
      String toSql(String filterName, Command cmd) {
        if (cmd.value != null) {
          return String.format("%s.%s >= #{item.value}", filterName, cmd.field);
        }
        return "";
      }
    },
    IN {
      String toSql(String filterName, Command cmd) {
        if (cmd.value != null) {
          return String.format("%s.%s IN (#{item.value})", filterName, cmd.field);
        }
        return "";
      }
    },
    LK {
      String toSql(String filterName, Command cmd) {
        if (cmd.value != null) {
          return String.format("%s.%s LIKE CONCAT('%%',#{item.value},'%%') ESCAPE '\\\\'", filterName,
              cmd.field);
        }
        return "";
      }
    },
    RLK {
      String toSql(String filterName, Command cmd) {
        if (cmd.value != null) {
          return String.format("%s.%s LIKE CONCAT(#{item.value},'%%') ESCAPE '\\\\'", filterName,
              cmd.field);
        }
        return "";
      }
    };
    abstract String toSql(String filterName, Command cmd);
  }

}
