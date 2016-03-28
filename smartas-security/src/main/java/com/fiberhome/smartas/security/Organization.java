package com.fiberhome.smartas.security;


import com.fiberhome.smartas.core.model.LongIdVO;

public class Organization extends LongIdVO {

  /**
  * 
  */
  private static final long serialVersionUID = -6679836646467088231L;
  private long pId;
  private String orgName;
  private String orgCode;
  private String orgNote;
  private String filed1;
  private String filed2;

  public long getpId() {
    return pId;
  }

  public void setpId(long pId) {
    this.pId = pId;
  }

  public String getOrgName() {
    return orgName;
  }

  public void setOrgName(String orgName) {
    this.orgName = orgName;
  }

  public String getOrgCode() {
    return orgCode;
  }

  public void setOrgCode(String orgCode) {
    this.orgCode = orgCode;
  }

  public String getOrgNote() {
    return orgNote;
  }

  public void setOrgNote(String orgNote) {
    this.orgNote = orgNote;
  }

  public String getFiled1() {
    return filed1;
  }

  public void setFiled1(String filed1) {
    this.filed1 = filed1;
  }

  public String getFiled2() {
    return filed2;
  }

  public void setFiled2(String filed2) {
    this.filed2 = filed2;
  }
}
