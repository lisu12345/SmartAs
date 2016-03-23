package org.smartas.attachment.ui;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;

import org.apache.commons.lang3.StringUtils;
import org.smartas.attachment.Attachment;
import org.smartas.attachment.service.AttachmentService;
import org.smartas.core.annotation.FileProcess;
import org.smartas.core.annotation.Resource;
import org.smartas.core.ui.BaseUI;
import org.smartas.core.util.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

@RestController()
@RequestMapping("/attachment")
@Resource(code = 6001, model = "FitOA", desc = "FileUploadAndDown UI")
@FileProcess
public class AttachmentUI extends BaseUI<Attachment>{
    
    @Autowired
    private AttachmentService attachmentService;
    
    protected AttachmentService getService() {
      return  attachmentService;
    }
    
    @RequestMapping(value = "/upLoad/{handleType}" , method = RequestMethod.POST)
    public JSONObject upLoad(@PathVariable("handleType") String handleType , Attachment attachment){
      String attachmentId = attachmentService.upload(handleType, attachment);
      if(StringUtils.isNotBlank(attachmentId)){
        return JSON.parseObject("{\"attachmentId\":\""+attachmentId+"\"}");
      }
      return null;
    }

    @RequestMapping(value = "/downLoad/{id}")
    public ResponseEntity<byte[]> downLoad(@PathVariable("id") long id){
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        List<java.io.File> realFiles = new ArrayList<java.io.File>();
        String tmpFilePath = "";
        String tmpFileName = "";
        int canDownFileCount = 0;
        List<Attachment> files = new ArrayList<>();
        Attachment _file_ = attachmentService.get(id);
        files.add(_file_);
        //批量获取物理服务器文件
        for(Attachment downLoadfile : files){
          tmpFilePath = downLoadfile.getFilePath();
          tmpFileName = downLoadfile.getFileName();
          java.io.File realFile = new java.io.File(tmpFilePath+tmpFileName);
          if(realFile.exists()){
            realFiles.add(realFile);
            canDownFileCount++;
          }
        }
        if(!realFiles.isEmpty()){
          java.io.File file = null;
          Attachment firstFile = files.get(0);
          try {
              if(realFiles.size() > 1){
                    //在服务器端创建打包下载的临时文件
                    String tmpRootPath = firstFile.getFilePath();
                    String tmpZipFilePath = tmpRootPath.substring(0, tmpRootPath.indexOf(":")+1) + java.io.File.separator + "tmp"+java.io.File.separator + System.currentTimeMillis() + java.io.File.separator;
                    file = FileUtils.zipFileToDownload(tmpZipFilePath , realFiles);
              }else{
                  file = new java.io.File(firstFile.getFilePath()+ firstFile.getFileName());
              }
              
              if(file.exists()){
                httpHeaders.setContentDispositionFormData("attachment", new String(file.getName().getBytes("UTF-8"), "ISO-8859-1"));
                return new ResponseEntity<byte[]>(org.apache.commons.io.FileUtils.readFileToByteArray(file), httpHeaders, HttpStatus.CREATED);
              }
          } catch (FileNotFoundException e) {
            e.printStackTrace();
          } catch (IOException e) {
              e.printStackTrace();
          } catch (ServletException e) {
            e.printStackTrace();
          } catch (Exception e){
            e.printStackTrace();
          }
//          finally{
//            file.delete();
//            file.getParentFile().delete();
//          }
        }
        return null;
        
    }

}
