package com.fiberhome.smartas.core.sql;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 过滤的查询条件
 * <p>
 * 过滤的查询参数名称格式必须为: Q_field_T_OP/Q_field_OP <br/>
 * 其中Q_表示该参数为查询的参数，field查询的字段名称， T代表该参数的类型(不出现则表示字符串类型S),OP代表操作. <br/>
 * field 按驼峰命名，firstName 会编译成 first_name <br/>
 * 
 * T位置值有<br/>
 * <pre>
 *        Z boolean
 *        B byte
 *        I int
 *        L long
 *        F float
 *        J double
 *        S String *
 *        D Date * "yyyy-MM-dd" or "yyyy-MM-dd HH:mm:ss"
 *        T Time * "HH:mm:ss"
 * </pre> <br/>
 * OP位置值有<br/>
 * <pre>
 *         LT <
 *         LE <=
 *         GT >
 *         GE >=
 *         EQ =
 *         NE !=
 *         IN in
 *         LK like %aa%
 *         ST like aa%
 *         ED like %aa
 *         NL null
 *         NN not null
 * </pre> <br/>
 * 通用样例 <br/>
 * <pre>
 *  Q_fieldName_T_LT=value -> field_name <  value
 *  Q_firstName_T_LE=value -> field_name <= value
 *  Q_firstName_T_GT=value -> field_name >  value
 *  Q_firstName_T_GE=value -> field_name >= value
 *  Q_firstName_T_EQ=value -> field_name =  value
 *  Q_firstName_T_NE=value -> field_name != value
 *  Q_firstName_T_IN=v1,v2 -> field_name in (v1,v2)
 *  Q_firstName_LK=value -> field_name like '%value%'
 *  Q_firstName_ST=value -> field_name like 'value%'
 *  Q_firstName_ED=value -> field_name like '%value'
 *  Q_firstName_NL         -> field_name is null
 *  Q_firstName_NN         -> field_name is not null
 * </pre>
 * 
 * @author chenb
 */
public class QueryFilter {

  private List<Command> commands = new ArrayList<>(10);

  /**
   * 非Q打头的查询参数
   */
  private Map<String, Object> params = new HashMap<>();

  public List<Command> getCommands() {
    return commands;
  }

  /**
   * @return the params
   */
  public Map<String, Object> getParams() {
    return params;
  }

  public void addCommand(Command e) {
    commands.add(e);
  }

  public void addParams(String key, Object value) {
    params.put(key, value);
  }

  public boolean isEmpty() {
    return commands.isEmpty();
  }

}
