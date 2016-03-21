package com.fiberhome.smartas.core.sql.scripting.xmltags;

import java.util.Map;

import org.apache.ibatis.scripting.xmltags.DynamicContext;
import org.apache.ibatis.scripting.xmltags.SqlNode;

import com.fiberhome.smartas.core.sql.Command;
import com.fiberhome.smartas.core.sql.QueryFilter;

public class QuerySqlNode implements SqlNode {
  private String open;
  private String close;
  private String expression;
  private String filterName;

  public QuerySqlNode(String open, String close, String exp, String filterName) {
    this.open = open;
    this.close = close;
    this.expression = exp;
    this.filterName = filterName;
  }

  public boolean apply(DynamicContext context) {

    Map<String, Object> bindings = context.getBindings();

    Map<?, ?> parameterObject = (Map<?, ?>) bindings.get(DynamicContext.PARAMETER_OBJECT_KEY);
    if (parameterObject == null || !parameterObject.containsKey(expression)) {
      return true;
    }
    QueryFilter filter = (QueryFilter) parameterObject.get(expression);
    if (filter == null || filter.isEmpty()) {
      return true;
    }
    applyOpen(context);
    boolean first = true;
    StringBuilder builder = new StringBuilder();
    for (Command command : filter.getCommands()) {
      int uniqueNumber = context.getUniqueNumber();
      context.bind("_fq_item_" + uniqueNumber, command);
      if (!first) {
        builder.append(" AND ");
      }else{
        first = false;
      }
      builder.append(command.toSql(filterName,uniqueNumber));
    }
    context.appendSql(builder.toString());
    applyClose(context);
    return true;
  }


  private void applyOpen(DynamicContext context) {
    if (open != null) {
      context.appendSql(open);
    }
  }

  private void applyClose(DynamicContext context) {
    if (close != null) {
      context.appendSql(close);
    }
  }
}
