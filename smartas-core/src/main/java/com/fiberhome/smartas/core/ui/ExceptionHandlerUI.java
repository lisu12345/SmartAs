/**
 * 
 */
package com.fiberhome.smartas.core.ui;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.support.WebContentGenerator;

import com.fiberhome.smartas.core.BusinessAccessException;
import com.fiberhome.smartas.core.model.ErrorVO;

/**
 * 用于处理异常的
 * 
 * @author chenb
 */
public abstract class ExceptionHandlerUI extends WebContentGenerator {

  protected final Logger logger = LoggerFactory.getLogger(this.getClass());

  @Autowired
  private MessageSource messageSource;

  /**
   * 将异常堆栈转换为字符串
   * 
   * @param aThrowable 异常
   * @return String
   */
  protected String getStackTrace(Throwable e) {
    final Writer result = new StringWriter();
    final PrintWriter printWriter = new PrintWriter(result);
    e.printStackTrace(printWriter);
    return result.toString();
  }

  protected ErrorVO sys(Exception e) {
    String message = messageSource.getMessage("e.core.sys", null, null);
    logger.error(e.getMessage(), e);
    return new ErrorVO("e.core.sys", message, getStackTrace(e));
  }

  @ExceptionHandler({RuntimeException.class})
  @ResponseStatus(code = HttpStatus.BAD_REQUEST)
  public ErrorVO exception(RuntimeException e) {
    return sys(e);
  }

  /**
   * 
   * 
   * @return
   */
  @ExceptionHandler({Exception.class})
  @ResponseStatus(code = HttpStatus.BAD_REQUEST)
  public ErrorVO exception(Exception e) {
    return sys(e);
  }

  /**
   * 
   * @return
   */
  @ExceptionHandler({Exception.class})
  @ResponseStatus(code = HttpStatus.BAD_REQUEST)
  public ErrorVO exception(BusinessAccessException e) {
    String message;
    try {
      message = messageSource.getMessage(e.getErrorCode(), e.getArguments(), null);
    } catch (NoSuchMessageException e1) {
      logger.error(e1.getMessage(), e1);
      message = e.getErrorCode();
    }
    logger.error(e.getMessage(), e);
    return new ErrorVO(e.getErrorCode(), message, getStackTrace(e));
  }
}
