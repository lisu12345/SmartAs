package org.smartas.attachment.service;

import org.smartas.attachment.Attachment;
import org.smartas.core.BaseService;

public interface AttachmentService extends BaseService<Attachment>{
  
  public String upload( String handleType , Attachment attachment);
 
 //获取下载文件列表，使用GenericService提供的功能即可
 // public List<Attachment> downLoadList(Attachment attachment);

}
