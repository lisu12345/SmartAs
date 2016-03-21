/**
 * 
 */
package org.smartas.web.support.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.smartas.core.Subject;
import org.smartas.core.util.SessionUtils;
import org.smartas.core.util.ThreadContext;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * 单点登录拦截器
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
