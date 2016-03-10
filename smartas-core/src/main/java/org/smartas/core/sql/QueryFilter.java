package org.smartas.core.sql;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

public class QueryFilter {

  private static final Logger logger = LoggerFactory.getLogger(QueryFilter.class);
  /**
   * DAO层的querys Map中filter的key,表示用哪�?��作为查询的条�?
   */
  /*
   * private String filterName = null;
   * 
   * public String getFilterName() { return filterName; }
   * 
   * public void setFilterName(String filterName) { this.filterName = filterName; }
   */

  private Map<String, Object> params = new HashMap<>();

  private List<Command> commands = new ArrayList<>();
  // private List<Object> paramValues = new ArrayList();

  // private Set<String> aliasSet = new HashSet<String>();

  // private PagingBean pagingBean=null;

  // public PagingBean getPagingBean() {
  // return pagingBean;
  // }

  /**
   * 从请求对象获取查询参�?并进行构�?
   * <p>
   * 参数名格式必须为: Q_firstName_S_EQ 其中Q_表示该参数为查询的参数，firstName查询的字段名称， S代表该参数的类型为字符串类型,该位置的其他值有�?
   * D=日期，BD=BigDecimal，FT=float,N=Integer,SN=Short,S=字符�? EQ代表等于�? 该位置的其他值有�?br/>
   * LT，GT，EQ，LE，GE,LK,RLK,IN <br/>
   * 要别代表<,>,=,<=,>=,like的条件查�?
   * <p>
   * 
   * @param request
   */
  public QueryFilter(Map<String, String[]> paramss) {

    for (Map.Entry<String, String[]> param : paramss.entrySet()) {
      if (param.getKey().startsWith("Q_")) {
        addFilter(param.getKey(), param.getValue()[0]);
      } else {
        params.put(param.getKey(), param.getValue()[0]);
      }
    }

    /// String sort = request.getParameter("sort");
    // String dir = request.getParameter("dir");

    // if (StringUtils.isNotEmpty(sort) && StringUtils.isNotEmpty(dir)) {
    // addSorted(sort, dir);
    // }

    // this.pagingBean=new PagingBean(start, limit);
  }

  /**
   * 添加过滤的查询条
   * 
   * @param paramName 过滤的查询参数名�?
   *        <p>
   *        过滤的查询参数名称格式必须为: Q_firstName_S_EQ 其中Q_表示该参数为查询的参数，firstName查询的字段名称，
   *        S代表该参数的类型为字符串类型,该位置的其他值有�? D=日期，BD=BigDecimal，FT=float,N=Integer,SN=Short,L=Long S=字符�?
   *        EQ代表等于�? 该位置的其他值有�?br/> LT，GT，EQ，LE，GE,LK,EMP,NOTEMP,NULL,NOTNULL<br/>
   *        要别代表<,>,=,<=,>=,like,empty,not empty,null,not null的条件查�?
   *        <p>
   * @param paramName
   * @param paramValue
   */
  public void addFilter(String paramName, String paramValue) {
    String[] fieldInfo = paramName.split("[_]");
    if (fieldInfo != null && fieldInfo.length == 4) {
      Object value = convertObject(fieldInfo[2], paramValue);
      if (value != null) {
        Command fieldCommand = new Command(fieldInfo[1], value, fieldInfo[3]);
        commands.add(fieldCommand);
      }
    } else if (fieldInfo != null && fieldInfo.length == 3) {
      Command fieldCommand = new Command(fieldInfo[1], fieldInfo[2]);
      commands.add(fieldCommand);
    } else {
      logger.error("Query param name [" + paramName + "] is not right format.");
    }

  }

  private Object convertObject(String type, String paramValue) {
    if (StringUtils.isEmpty(paramValue)) return null;
    Object value = null;
    try {
      if ("S".equals(type)) {// 大部的查询都是该类型，所以放至在头部
        value = paramValue;
      } else if ("D".equals(type)) {
        value = DateUtils.parseDate(paramValue, "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss");
      } else if ("L".equals(type)) {
        value = new Long(paramValue);
      } else if ("N".equals(type)) {
        value = new Integer(paramValue);
      } else if ("BD".equals(type)) {
        value = new BigDecimal(paramValue);
      } else if ("FT".equals(type)) {
        value = new Float(paramValue);
      } else if ("SN".equals(type)) {
        value = new Short(paramValue);
      } else {
        value = paramValue;
      }
    } catch (Exception ex) {
      logger.error("the data value is not right for the query filed type:" + ex.getMessage());
    }
    return value;
  }

  /*
   * public void addSorted(String orderBy, String ascDesc) { commands.add(new
   * SortCommandImpl(orderBy, ascDesc, this)); }
   */


  public List<Command> getCommands() {
    return commands;
  }

  /**
   * @return the params
   */
  public Map<String, Object> getParams() {
    return params;
  }

  public boolean isEmpty() {
    return commands.isEmpty();
  }

}
