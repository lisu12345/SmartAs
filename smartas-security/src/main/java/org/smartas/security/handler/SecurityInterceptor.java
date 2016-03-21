package org.smartas.security.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.smartas.core.Subject;
import org.smartas.core.annotation.Operation;
import org.smartas.core.annotation.Resource;
import org.smartas.core.util.Constants;
import org.smartas.core.util.SessionUtils;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.util.Assert;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class SecurityInterceptor extends HandlerInterceptorAdapter {
  // private UrlPathHelper urlPathHelper = new UrlPathHelper();

  @Override
  public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler)
      throws java.lang.Exception {

    // .非注解UI直接返回
    if (!(handler instanceof HandlerMethod)) {
      return true;
    }

    // .查询方法的操作注解
    HandlerMethod handlerMethod = (HandlerMethod) handler;
    Operation opt = AnnotationUtils.findAnnotation(handlerMethod.getMethod(), Operation.class);

    // .普通方法,直接返回
    if (opt == null) {
      return true;
    }

    // .方法对应的资源定义
    Resource res = AnnotationUtils.findAnnotation(handlerMethod.getBeanType(), Resource.class);
    Assert.notNull(res, handlerMethod.getBeanType() + " need @Resource");

    // 受控服务必须登录状态
    Subject subject = SessionUtils.getSubject(req);
    if (subject == null) {
      resp.setHeader(Constants.X_SESSION_STATUS, "timeout");// 在响应头设置session状态
      resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      return false;
    }
    if(subject.isPermitted(res.code() + "." + opt.code())){
      return true;
    }
    resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
    return false;
  }

}
