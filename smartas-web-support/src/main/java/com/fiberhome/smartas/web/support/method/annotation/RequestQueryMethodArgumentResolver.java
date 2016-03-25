package com.fiberhome.smartas.web.support.method.annotation;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.MethodParameter;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.fiberhome.smartas.core.annotation.RequestQuery;
import com.fiberhome.smartas.core.sql.Command;
import com.fiberhome.smartas.core.sql.Op;
import com.fiberhome.smartas.core.sql.QueryFilter;


/**
 * @author chenb
 *
 */
public class RequestQueryMethodArgumentResolver implements HandlerMethodArgumentResolver {
  private static final Logger logger =
      LoggerFactory.getLogger(RequestQueryMethodArgumentResolver.class);

  @Override
  public boolean supportsParameter(MethodParameter parameter) {
    RequestQuery requestQuery = parameter.getParameterAnnotation(RequestQuery.class);
    if (requestQuery != null) {
      if (QueryFilter.class == parameter.getParameterType()) {
        return true;
      }
    }
    return false;
  }

  @Override
  public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
      NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
    QueryFilter queryFilter = new QueryFilter();
    webRequest.getParameterNames().forEachRemaining(key -> {
      String value = StringUtils.trimWhitespace(webRequest.getParameter(key));
      if (key.startsWith("Q_")) {
        String[] fieldInfo = StringUtils.tokenizeToStringArray(key, "_");

        Object convertValue = null;
        if (fieldInfo.length == 4 || fieldInfo.length == 3) {
          String name = fieldInfo[1];
          String type = fieldInfo.length == 4 ? fieldInfo[2] : "S";
          Op op = Op.toOp(fieldInfo[fieldInfo.length - 1]);
          if (op.needValue()) {
            convertValue = op.isMultiple() ? convertList(type, value) : convertObject(type, value);
            if (convertValue != null) {
              queryFilter.addCommand(new Command(name, op, convertValue));
            }
          } else {
            queryFilter.addCommand(new Command(name, op));
          }
        } else {
          logger.error("Query param name [{}] is not right format[Q_field(_T)?_OP].", key);
        }
      } else {
        logger.warn("Query param name [{}] is not Command Query.", key);
        queryFilter.addParams(key, value);
      }
    });
    return queryFilter;
  }

  private List<Object> convertList(String type, String paramValues) {
    List<Object> list = new ArrayList<>(10);
    for (String paramValue : StringUtils.tokenizeToStringArray(paramValues, ",")) {
      list.add(convertObject(type, paramValue));
    }
    return list;
  }

  private Object convertObject(String type, String paramValue) {
    if (StringUtils.isEmpty(paramValue)) {
      return null;
    }
    Object value = null;
    try {
      switch (type) {
        case "S":
          return paramValue;
        case "Z":
          return Boolean.valueOf(paramValue);
        case "B":
          return Byte.valueOf(paramValue);
        case "I":
          return Integer.valueOf(paramValue);
        case "L":
          return Long.valueOf(paramValue);
        case "F":
          return Float.valueOf(paramValue);
        case "J":
          return Double.valueOf(paramValue);
        case "D":
          return DateUtils.parseDate(paramValue, "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss");
        case "T":
          return DateUtils.parseDate(paramValue, "HH:mm:ss");
        default:
          logger.warn("the data type '{}' is not right for the query filed type[SZBILFJDT]", type);
          return null;
      }
    } catch (Exception ex) {
      logger.error("the data value '{}' is not right for the type {}", paramValue, type);
    }
    return value;
  }
}
