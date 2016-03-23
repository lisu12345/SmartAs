package org.smartas.attachment;

import org.smartas.core.model.LongIdVO;
import org.springframework.web.multipart.MultipartFile;

public class Attachment extends LongIdVO{

  private static final long serialVersionUID = 8565107762409481819L;

  private MultipartFile file;
  
  private String batchNo;
  
  private String filePath;
  
  private String fileName;
  
  private String fileUid;
  
  private int fileDownStatus;

  public int getFileDownStatus() {
    return fileDownStatus;
  }

  public void setFileDownStatus(int fileDownStatus) {
    this.fileDownStatus = fileDownStatus;
  }

  public String getFilePath() {
    return filePath;
  }

  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }

  public String getFileName() {
    return fileName;
  }

  public void setFileName(String fileName) {
    this.fileName = fileName;
  }

  public String getFileUid() {
    return fileUid;
  }

  public void setFileUid(String fileUid) {
    this.fileUid = fileUid;
  }

  public String getBatchNo() {
    return batchNo;
  }

  public void setBatchNo(String batchNo) {
    this.batchNo = batchNo;
  }

  public MultipartFile getFile() {
    return file;
  }

  public void setFile(MultipartFile file) {
    this.file = file;
  }
  
}
