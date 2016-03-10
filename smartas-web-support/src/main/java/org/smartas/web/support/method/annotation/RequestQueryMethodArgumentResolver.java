package org.smartas.web.support.method.annotation;

import java.util.Map;

import org.smartas.core.annotation.RequestQuery;
import org.smartas.core.sql.QueryFilter;
import org.springframework.beans.BeanUtils;
import org.springframework.core.MethodParameter;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

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
    return BeanUtils.instantiateClass(
        ClassUtils.getConstructorIfAvailable(QueryFilter.class, Map.class),
        webRequest.getParameterMap());
  }
}
