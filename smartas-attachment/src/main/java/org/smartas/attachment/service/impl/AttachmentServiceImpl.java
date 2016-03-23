package org.smartas.attachment.service.impl;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.commons.lang3.StringUtils;
import org.smartas.attachment.Attachment;
import org.smartas.attachment.dao.AttachmentDao;
import org.smartas.attachment.service.AttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fiberhome.smartas.core.BusinessAccessException;
import com.fiberhome.smartas.core.Pageable;
import com.fiberhome.smartas.core.service.BaseServiceImpl;
import com.fiberhome.smartas.core.util.SecurityUtils;
import com.fiberhome.smartas.security.User;

@Service
public class AttachmentServiceImpl extends BaseServiceImpl<Attachment>
    implements
      AttachmentService {

  private static Logger logger = (Logger) Logger.getLogger(AttachmentServiceImpl.class.getName());

  @Autowired
  AttachmentDao fileDao;

  @Override
  protected AttachmentDao getDao() {
    return fileDao;
  }

  private final static String TMP_FILE_PATH = System.getProperty("smartas.root");


  public Pageable<Attachment> getAll(int page, int pageSize) throws BusinessAccessException {

    Pageable<Attachment> attachments = super.getAll(page, pageSize);

    for (Attachment attachment : attachments.getData()) {
      handleAttachment(attachment);
    }

    return attachments;
  }

  public void handleAttachment(Attachment attachment) {
    String realFilePath = attachment.getFilePath() + attachment.getFileName();
    java.io.File realFile = new java.io.File(realFilePath);
    // 物理文件不存在，不可下载
    attachment.setFileDownStatus(!realFile.exists() ? 1 : 0);
  }


  @Override
  public String upload(String handleType, Attachment attachment) {
    String uploadResult = "";
    String rootPath = (StringUtils.isNotBlank(TMP_FILE_PATH) && TMP_FILE_PATH.indexOf(":") > 0)
        ? TMP_FILE_PATH.substring(0, TMP_FILE_PATH.indexOf(":") + 1)
        : "";
    MultipartFile myfile = attachment.getFile();
    // 取得当前上传文件的文件名称
    String myFileName = myfile.getOriginalFilename();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Date now = new Date(System.currentTimeMillis());
    if (StringUtils.isNotBlank(myFileName) && StringUtils.isNotBlank(rootPath)) {
      User curUser = (User) SecurityUtils.getSubject().getPrincipal();
      String tmpPath = rootPath + File.separator + sdf.format(now) + File.separator;
      attachment.setFileName(myFileName);
      attachment.setFilePath(tmpPath);
      attachment.setCreateUserId(curUser.getAcount());
      attachment.setLastUpdateUserId(curUser.getAcount());

      // 判断文件目录是否存在
      File dirFile = new File(tmpPath);
      if (!dirFile.isDirectory()) {
        dirFile.mkdir();
      }
      // 定义上传路径
      String filePath = tmpPath + myFileName;
      File localFile = new File(filePath);

      // 保存文件相关信息到数据库
      try {
        fileDao.insert(attachment);
        try {
          myfile.transferTo(localFile);
          uploadResult = String.valueOf(attachment.getId());
        } catch (IllegalStateException e) {
          logger.log(Level.SEVERE, "保存文件到服务器目录出错！", e);
        } catch (IOException e) {
          logger.log(Level.SEVERE, "保存文件到服务器目录出错！", e);
        } catch (Exception e) {
          fileDao.deleteById(attachment.getId());
        }
      } catch (Exception e) {
        uploadResult = "";
        throw e;
      }

    }
    return uploadResult;
  }

}
