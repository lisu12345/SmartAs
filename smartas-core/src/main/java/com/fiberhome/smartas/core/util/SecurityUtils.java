package com.fiberhome.smartas.core.util;

import com.fiberhome.smartas.core.Subject;

public class SecurityUtils {
  public static Subject getSubject() {
    Subject subject = ThreadContext.getSubject();
    if (subject == null) {
      // FIXME:
    }
    return subject;
  }
}

