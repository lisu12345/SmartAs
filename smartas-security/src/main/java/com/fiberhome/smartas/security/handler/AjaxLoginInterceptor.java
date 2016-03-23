package com.fiberhome.smartas.security.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.fiberhome.smartas.core.util.Constants;
import com.fiberhome.smartas.core.util.SessionUtils;

/**
 * @author chenb
 *
 */
public class AjaxLoginInterceptor extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler) throws Exception {
		//String lookupPath = urlPathHelper.getLookupPathForRequest(req);
		if (!SessionUtils.isLogin(req)) {
			//1.是ajax请求响应头会有，x-requested-with  
			if (StringUtils.equals("XMLHttpRequest", req.getHeader(Constants.X_REQUESTED_WITH))) {
				resp.setHeader(Constants.X_SESSION_STATUS, "timeout");//在响应头设置session状态  
				resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				return false;
			}
		}
		return true;
	}

}