package org.smartas.security.service.impl;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.commons.lang3.StringUtils;
import org.smartas.core.service.BaseServiceImpl;
import org.smartas.security.dao.FileDao;
import org.smartas.security.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl extends BaseServiceImpl<org.smartas.security.File> implements FileService {
  
  private static Logger logger = (Logger) Logger.getLogger(FileServiceImpl.class.getName());
  
  @Autowired
  FileDao fileDao;
  
  @Override
  protected FileDao getDao() {
    return fileDao;
  }
  
  private final static String TMP_FILE_PATH = System.getProperty("smartas.root");

  @Override
  public String fileUpload(String handleType , org.smartas.security.File file) {
    String uploadResult = "FAILURE";
    String rootPath = (StringUtils.isNotBlank(TMP_FILE_PATH) && TMP_FILE_PATH.indexOf(":")>0) 
        ? TMP_FILE_PATH.substring(0,TMP_FILE_PATH.indexOf(":")+1) : "";
    MultipartFile myfile = file.getFile();
    //取得当前上传文件的文件名称  
    String myFileName = myfile.getOriginalFilename();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Date now = new Date(System.currentTimeMillis());
    if(StringUtils.isNotBlank(myFileName) && StringUtils.isNotBlank(rootPath)){
        file.setFileName(myFileName);
        file.setFilePath(rootPath+File.separator+sdf.format(now)+File.separator);
        
        file.setRevision(1);
        file.setCreateUserId("111111111");
        file.setCreateDate(now);
        file.setLastUpdateUserId("111111111");
        file.setLastUpdateDate(now);
        file.setFileUid(UUID.randomUUID().toString());
        
        //定义上传路径
        String filePath = rootPath + File.separator +sdf.format(now)+File.separator + myFileName;  
        File localFile = new File(filePath);  
          
        //保存文件相关信息到数据库
        try{
          fileDao.insert(file);
          try{
            myfile.transferTo(localFile);
            uploadResult = "SUCCESS";
          } catch (IllegalStateException e) {
            logger.log(Level.SEVERE, "保存文件到服务器目录出错！", e);
          } catch (IOException e) {
            logger.log(Level.SEVERE, "保存文件到服务器目录出错！", e);
          } catch (Exception e){
            fileDao.deleteById(file.getId());
          }
        }catch(Exception e){
          uploadResult = "FAILURE";
        }
        
      }  
    return uploadResult;
  }

  @Override
  public List<org.smartas.security.File> getDownLoadFile(org.smartas.security.File file) {
    return null;
  }

}
