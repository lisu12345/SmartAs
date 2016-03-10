package org.smartas.core.sql.scripting.xmltags;

import java.util.Map;

import org.apache.ibatis.scripting.xmltags.DynamicContext;
import org.apache.ibatis.scripting.xmltags.SqlNode;
import org.smartas.core.sql.Command;
import org.smartas.core.sql.QueryFilter;

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
      context.bind("item", command);
      if (!first) {
        builder.append("AND ");
        first = false;
      }
      builder.append(command.toSql(filterName));
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
