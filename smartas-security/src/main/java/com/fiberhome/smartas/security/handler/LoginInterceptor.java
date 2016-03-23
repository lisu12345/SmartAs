package com.fiberhome.smartas.security.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.UrlPathHelper;

import com.fiberhome.smartas.core.util.SessionUtils;

public class LoginInterceptor extends HandlerInterceptorAdapter {
	private UrlPathHelper urlPathHelper = new UrlPathHelper();

	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler) throws Exception {
		//String lookupPath = urlPathHelper.getLookupPathForRequest(req);
		if (!SessionUtils.isLogin(req)) {
			//1.首页请求
			resp.sendRedirect(urlPathHelper.getContextPath(req) + "/login.html");
			return false;
		}
		return true;
	}

}