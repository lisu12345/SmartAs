/**
 * 
 */
package com.fiberhome.smartas.core.util;

import static org.springframework.util.StringUtils.isEmpty;
import static org.springframework.util.StringUtils.tokenizeToStringArray;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author chenb
 *
 */
public class StringUtils {
  private static final Logger logger = LoggerFactory.getLogger(StringUtils.class);

  public static String convertPropertyNameToUnderscoreName(String name) {
    return name.replaceAll("[A-Z]", "\\_$0");
  }

  public static List<Object> convertList(String type, String paramValues) {
    List<Object> list = new ArrayList<>(10);
    for (String paramValue : tokenizeToStringArray(paramValues, ",")) {
      list.add(convertObject(type, paramValue));
    }
    return list;
  }

  public static Object convertObject(String type, String paramValue) {
    if (isEmpty(paramValue)) {
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

  /*
   * public static void main(String[] args) {
   * System.out.println(convertPropertyNameToUnderscoreName("convertPropertyNameToUnderscoreName"));
   * }
   */
}
