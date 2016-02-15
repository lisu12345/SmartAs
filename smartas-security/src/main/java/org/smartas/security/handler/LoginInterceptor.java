package org.smartas.security.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.UrlPathHelper;

public class LoginInterceptor extends HandlerInterceptorAdapter {
	private UrlPathHelper urlPathHelper = new UrlPathHelper();

	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler) throws Exception {
		//String lookupPath = urlPathHelper.getLookupPathForRequest(req);
		HttpSession session = req.getSession(false);
		if (session == null || session.getAttribute("user") == null) {
			//1.首页请求
			resp.sendRedirect(urlPathHelper.getContextPath(req) + "/login.html");
			return false;
		}
		return true;
	}

}