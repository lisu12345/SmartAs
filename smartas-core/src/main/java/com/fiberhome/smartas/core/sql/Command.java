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

  private final String field;
  private final Operator operator;
  private final Object value;


  public Command(String field, String operator) {
    this(field, operator, null);
  }

  public Command(String field, String operator, Object value) {
    this.field = StringUtils.convertPropertyNameToUnderscoreName(field);
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

  public String toSql(String filterName, int i) {
    return operator.toSql(filterName, this, i);
  }

  // <,>,=,<=,>=,in,like
  public enum Operator {
    LT {
      String toSql(String filterName, Command cmd, int i) {
        if (cmd.value != null) {
          return String.format("%s.%s < #{_fq_item_%d.value}", filterName, cmd.field, i);
        }
        return "";
      }
    },
    GT {
      String toSql(String filterName, Command cmd, int i) {
        if (cmd.value != null) {
          return String.format("%s.%s > #{_fq_item_%d.value}", filterName, cmd.field, i);
        }
        return "";
      }
    },
    EQ {
      String toSql(String filterName, Command cmd, int i) {
        if (cmd.value != null) {
          return String.format("%s.%s = #{_fq_item_%d.value}", filterName, cmd.field, i);
        }
        return "";
      }
    },
    LE {
      String toSql(String filterName, Command cmd, int i) {
        if (cmd.value != null) {
          return String.format("%s.%s <= #{_fq_item_%d.value}", filterName, cmd.field, i);
        }
        return "";
      }
    },
    GE {
      String toSql(String filterName, Command cmd, int i) {
        if (cmd.value != null) {
          return String.format("%s.%s >= #{_fq_item_%d.value}", filterName, cmd.field, i);
        }
        return "";
      }
    },
    IN {
      String toSql(String filterName, Command cmd, int i) {
        if (cmd.value != null) {
          return String.format("%s.%s IN (#{_fq_item_%d.value})", filterName, cmd.field, i);
        }
        return "";
      }
    },
    LK {
      String toSql(String filterName, Command cmd, int i) {
        if (cmd.value != null) {
          return String.format("%s.%s LIKE CONCAT('%%',#{_fq_item_%d.value},'%%') ESCAPE '\\\\'",
              filterName, cmd.field, i);
        }
        return "";
      }
    },
    RLK {
      String toSql(String filterName, Command cmd, int i) {
        if (cmd.value != null) {
          return String.format("%s.%s LIKE CONCAT(#{_fq_item_%d.value},'%%') ESCAPE '\\\\'",
              filterName, cmd.field, i);
        }
        return "";
      }
    };
    abstract String toSql(String filterName, Command cmd, int i);
  }

}
