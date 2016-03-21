/*
 * 
 * 创建日期：2010-4-16 上午11:28:52
 *
 * 创 建 人 ：chenjpu
 * 
 * 版权所有：J.Bob
 */

package org.smartas.core.model;

import java.util.Date;

import org.smartas.core.POJO;
import org.smartas.core.util.BeanContext;
import org.smartas.core.util.SecurityUtils;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * @author chenb
 *
 */
public abstract class BaseVO implements POJO {

  /**
   * 
   */
  private static final long serialVersionUID = 3617220118055104348L;
  
  

  protected String tenantId;// 多租户
  protected String scope;//
  protected int revision = 1;// 版本

  protected String createUserId;
  protected Date createDate;
  protected String lastUpdateUserId;
  protected Date lastUpdateDate;


  public String getAppName() {
    return BeanContext.getAppEnv().getAppName();
  }

  /**
   * @return the tenantId
   */
  public String getTenantId() {
    return tenantId;
  }

  /**
   * @param tenantId the tenantId to set
   */
  public void setTenantId(String tenantId) {
    this.tenantId = tenantId;
  }

  /**
   * @return the scope
   */
  public String getScope() {
    return scope;
  }

  /**
   * @param scope the scope to set
   */
  public void setScope(String scope) {
    this.scope = scope;
  }

  /**
   * @return the revision
   */
  public int getRevision() {
    return revision;
  }

  /**
   * @return the createUserId
   */
  public String getCreateUserId() {
    return createUserId;
  }

  /**
   * @param createUserId the createUserId to set
   */
  public void setCreateUserId(String createUserId) {
    this.createUserId = createUserId;
  }

  /**
   * @return the createDate
   */
  public Date getCreateDate() {
    return createDate;
  }

  /**
   * @param createDate the createDate to set
   */
  public void setCreateDate(Date createDate) {
    this.createDate = createDate;
  }

  /**
   * @return the lastUpdateUserId
   */
  public String getLastUpdateUserId() {
    return lastUpdateUserId;
  }

  /**
   * @param lastUpdateUserId the lastUpdateUserId to set
   */
  public void setLastUpdateUserId(String lastUpdateUserId) {
    this.lastUpdateUserId = lastUpdateUserId;
  }

  /**
   * @return the lastUpdateDate
   */
  public Date getLastUpdateDate() {
    return lastUpdateDate;
  }

  /**
   * @param lastUpdateDate the lastUpdateDate to set
   */
  public void setLastUpdateDate(Date lastUpdateDate) {
    this.lastUpdateDate = lastUpdateDate;
  }

  /**
   * @param revision the revision to set
   */
  public void setRevision(int revision) {
    this.revision = revision;
  }

  @JSONField(serialize = false)
  public int getRevisionNext() {
    return revision + 1;
  }

  @JSONField(serialize = false)
  public Object getCurrentUser() {
    return SecurityUtils.getSubject().getPrincipal();
  }
  @JSONField(serialize = false)
  public long getCurrentUserId() {
    return SecurityUtils.getSubject().getUserId();
  }
}
