/**
 * 
 */
package com.fiberhome.smartas.core.util;

import static com.fiberhome.smartas.core.util.StringUtils.convertList;
import static com.fiberhome.smartas.core.util.StringUtils.convertObject;

import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import com.fiberhome.smartas.core.BusinessAccessException;
import com.fiberhome.smartas.core.sql.Command;
import com.fiberhome.smartas.core.sql.Op;
import com.fiberhome.smartas.core.sql.QueryFilter;

/**
 * @author chenb
 *
 */
public class QueryUtils {
  private static final Logger logger = LoggerFactory.getLogger(QueryUtils.class);


  public static QueryFilter parseMultiQuery(MultivaluedMap<String, String> query)
      throws BusinessAccessException {
    QueryFilter queryFilter = new QueryFilter();
    query.forEach((key, value) -> {
      String singleValue = StringUtils.trimWhitespace(value.get(0));
      if (key.startsWith("Q_")) {
        queryFilter.addCommand(parseCommand(key, singleValue));
      } else {
        logger.warn("Query param name [{}] is not Command Query.", key);
        // queryFilter.addParams(key, singleValue);
      }
    });

    return queryFilter;
  }

  public static QueryFilter parseMultiQuery(Map<String, String[]> query)
      throws BusinessAccessException {
    QueryFilter queryFilter = new QueryFilter();
    query.forEach((key, value) -> {
      String singleValue = StringUtils.trimWhitespace(value[0]);
      if (key.startsWith("Q_")) {
        queryFilter.addCommand(parseCommand(key, singleValue));
      } else {
        logger.warn("Query param name [{}] is not Command Query.", key);
        // queryFilter.addParams(key, singleValue);
      }
    });

    return queryFilter;
  }

  public static QueryFilter parseQuery(Map<String, String> query) throws BusinessAccessException {
    QueryFilter queryFilter = new QueryFilter();
    query.forEach((key, value) -> {
      value = StringUtils.trimWhitespace(value);
      if (key.startsWith("Q_")) {
        queryFilter.addCommand(parseCommand(key, value));
      } else {
        logger.warn("Query param name [{}] is not Command Query.", key);
        // queryFilter.addParams(key, value);
      }
    });

    return queryFilter;
  }

  public static Command parseCommand(String key, String value) throws BusinessAccessException {
    String[] fieldInfo = StringUtils.tokenizeToStringArray(key, "_");
    Object convertValue = null;
    if (fieldInfo.length == 4 || fieldInfo.length == 3) {
      String name = fieldInfo[1];
      String type = fieldInfo.length == 4 ? fieldInfo[2] : "S";
      Op op = Op.toOp(fieldInfo[fieldInfo.length - 1]);
      if (op.needValue()) {
        convertValue = op.isMultiple() ? convertList(type, value) : convertObject(type, value);
        return new Command(name, op, convertValue);
      } else {
        return new Command(name, op);
      }
    } else {
      logger.error("Query param name [{}] is not right format[Q_field(_T)?_OP].", key);
      throw new BusinessAccessException("", key);
    }
  }
}
