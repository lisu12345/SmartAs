/**
 * 
 */
package com.fiberhome.smartas.core;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.NoSuchMessageException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.support.WebContentGenerator;

import com.fiberhome.smartas.core.model.ErrorVO;

/**
 * 用于处理异常的
 * 
 * @author chenb
 */
public abstract class BaseExceptionAwareResource extends WebContentGenerator {

  protected final Logger logger = LoggerFactory.getLogger(this.getClass());

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
    String message = getMessageSourceAccessor().getMessage("e.core.sys");
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
  @ExceptionHandler({BusinessAccessException.class})
  @ResponseStatus(code = HttpStatus.BAD_REQUEST)
  public ErrorVO exception(BusinessAccessException e) {
    String message;
    try {
      message = getMessageSourceAccessor().getMessage(e.getErrorCode(), e.getArguments());
    } catch (NoSuchMessageException e1) {
      logger.error(e1.getMessage(), e1);
      message = e.getErrorCode();
    }
    logger.error(e.getMessage(), e);
    return new ErrorVO(e.getErrorCode(), message, getStackTrace(e));
  }
}