package org.smartas.core.util;

import org.smartas.core.Subject;

public class SecurityUtils {
  public static Subject getSubject() {
    Subject subject = ThreadContext.getSubject();
    if (subject == null) {
      // FIXME:
    }
    return subject;
  }
}

