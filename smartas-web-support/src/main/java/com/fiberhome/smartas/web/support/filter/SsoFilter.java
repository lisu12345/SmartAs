/**
 * 
 */
package com.fiberhome.smartas.web.support.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

import com.fiberhome.smartas.core.Subject;
import com.fiberhome.smartas.core.util.SessionUtils;
import com.fiberhome.smartas.core.util.ThreadContext;

/**
 * 单点登录拦截器
<<<<<<< HEAD
 * 
=======
>>>>>>> refs/remotes/upstream/develop
 * @author chenb
 *
 */
public class SsoFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    Subject subject = SessionUtils.getSubject(request);
    ThreadContext.bind(subject);
    try {
      filterChain.doFilter(request, response);
    } finally {
      ThreadContext.unbindSubject();
    }

  }

}
