/**
 * 
 */
package org.smartas.core.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.smartas.core.Subject;

/**
 * @author chenb
 *
 */
public class SessionUtil {

  public static boolean isLogin(HttpServletRequest req) {
    return getSubject(req) != null;
  }

  public static Subject getSubject(HttpServletRequest req) {
    HttpSession session = req.getSession(false);
    if (session == null) {
      return null;
    }
    return (Subject) session.getAttribute(Subject.SUBJECT);
  }
}
