package com.fiberhome.smartas.core.model;

import java.io.Serializable;

/**
 * 异常信息
 * 
 * @author chenb
 *
 */
public class ErrorVO implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = -3936839995877292488L;


  /**
   * 编码
   */
  private String code;

  /**
   * 消息
   */
  private String message;

  /**
   * 异常栈
   */
  private String stackTrace;

  public ErrorVO() {}

  public ErrorVO(String code, String message) {
    this.code = code;
    this.message = message;
  }



  public ErrorVO(String code, String message, String stackTrace) {
    this.code = code;
    this.message = message;
    this.stackTrace = stackTrace;
  }



  /**
   * @return the code
   */
  public String getCode() {
    return code;
  }

  /**
   * @param code the code to set
   */
  public void setCode(String code) {
    this.code = code;
  }

  /**
   * @return the message
   */
  public String getMessage() {
    return message;
  }

  /**
   * @param message the message to set
   */
  public void setMessage(String message) {
    this.message = message;
  }

  /**
   * @return the stackTrace
   */
  public String getStackTrace() {
    return stackTrace;
  }

  /**
   * @param stackTrace the stackTrace to set
   */
  public void setStackTrace(String stackTrace) {
    this.stackTrace = stackTrace;
  }
}
