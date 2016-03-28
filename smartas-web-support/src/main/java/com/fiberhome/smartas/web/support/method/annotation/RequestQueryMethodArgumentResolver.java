package com.fiberhome.smartas.web.support.method.annotation;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.fiberhome.smartas.core.annotation.RequestQuery;
import com.fiberhome.smartas.core.sql.QueryFilter;
import com.fiberhome.smartas.core.util.QueryUtils;


/**
 * @author chenb
 *
 */
public class RequestQueryMethodArgumentResolver implements HandlerMethodArgumentResolver {


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
    return QueryUtils.parseMultiQuery(webRequest.getParameterMap());
  }
}
