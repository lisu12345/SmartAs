/**
 * 
 */
package org.smartas.core.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * @author chenb
 *
 */
public class SessionUtil {

	public static boolean isLogin(HttpServletRequest req) {
		HttpSession session = req.getSession(false);
		return session != null && session.getAttribute("user") != null;
	}
}
