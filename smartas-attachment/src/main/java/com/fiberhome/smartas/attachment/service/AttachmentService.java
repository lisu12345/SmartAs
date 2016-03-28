package com.fiberhome.smartas.attachment.service;

import com.fiberhome.smartas.attachment.Attachment;
import com.fiberhome.smartas.core.BaseService;

public interface AttachmentService extends BaseService<Attachment> {

  public String upload(String handleType, Attachment attachment);

  // 获取下载文件列表，使用GenericService提供的功能即可
  // public List<Attachment> downLoadList(Attachment attachment);

}
