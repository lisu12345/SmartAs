package com.fiberhome.smartas.core.sql;

import java.util.List;

/**
 * 操作的封装
 * 
 * @author chenb
 *
 */
public enum Op {

  LT {
    String toSql(String filterName, Command cmd, int i) {
      return String.format("%s.%s < #{_fq_item_%d.value}", filterName, cmd.field, i);
    }
  },
  GT {
    String toSql(String filterName, Command cmd, int i) {
      return String.format("%s.%s > #{_fq_item_%d.value}", filterName, cmd.field, i);
    }
  },
  EQ {
    String toSql(String filterName, Command cmd, int i) {
      return String.format("%s.%s = #{_fq_item_%d.value}", filterName, cmd.field, i);
    }
  },
  NE {
    String toSql(String filterName, Command cmd, int i) {
      return String.format("%s.%s != #{_fq_item_%d.value}", filterName, cmd.field, i);
    }
  },
  LE {
    String toSql(String filterName, Command cmd, int i) {
      return String.format("%s.%s <= #{_fq_item_%d.value}", filterName, cmd.field, i);
    }
  },
  GE {
    String toSql(String filterName, Command cmd, int i) {
      return String.format("%s.%s >= #{_fq_item_%d.value}", filterName, cmd.field, i);
    }
  },
  IN {
    String toSql(String filterName, Command cmd, int i) {
      List<?> list = (List<?>) cmd.value;
      StringBuilder builder = new StringBuilder(30 * list.size());
      for (int j = 0, length = list.size(); j < length; j++) {
        builder.append(String.format("#{_fq_item_%d.value[%d]},", i, j));
      }
      builder.deleteCharAt(builder.length() - 1);
      return String.format("%s.%s IN (%s)", filterName, cmd.field, builder.toString());
    }

    public boolean isMultiple() {
      return true;
    }
  },
  LK {
    String toSql(String filterName, Command cmd, int i) {
      return String.format("%s.%s LIKE CONCAT('%%',#{_fq_item_%d.value},'%%') ESCAPE '\\\\'",
          filterName, cmd.field, i);
    }
  },
  ST {
    String toSql(String filterName, Command cmd, int i) {
      return String.format("%s.%s LIKE CONCAT(#{_fq_item_%d.value},'%%') ESCAPE '\\\\'", filterName,
          cmd.field, i);
    }
  },
  ED {
    String toSql(String filterName, Command cmd, int i) {
      return String.format("%s.%s LIKE CONCAT('%%',#{_fq_item_%d.value}) ESCAPE '\\\\'", filterName,
          cmd.field, i);
    }
  },
  NL {
    String toSql(String filterName, Command cmd, int i) {
      return String.format("%s.%s is null", filterName, cmd.field, i);
    }

    public boolean needValue() {
      return false;
    }
  },
  NN {
    String toSql(String filterName, Command cmd, int i) {
      return String.format("%s.%s is not null", filterName, cmd.field, i);
    }

    public boolean needValue() {
      return false;
    }
  };
  abstract String toSql(String filterName, Command cmd, int i);

  /**
   * 比较的值是否是多值情况，IN
   * 
   * @return
   */
  public boolean isMultiple() {
    return false;
  }

  /**
   * 是否需要关注左值 is null，not null 两个不关注
   * 
   * @return
   */
  public boolean needValue() {
    return true;
  }

  /**
   * 需要校验参数的有效性 FIXME：
   * 
   * @param operatorName
   * @return
   */
  public static Op toOp(String operatorName) {
    return Op.valueOf(operatorName);
  }
}
