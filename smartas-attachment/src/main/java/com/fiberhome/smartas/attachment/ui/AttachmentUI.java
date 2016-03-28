package com.fiberhome.smartas.attachment.ui;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fiberhome.smartas.attachment.Attachment;
import com.fiberhome.smartas.attachment.service.AttachmentService;
import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.ui.BaseResource;
import com.fiberhome.smartas.core.util.FileUtils;

@Path("/attachment")
@Resource(code = 6001, model = "FitOA", desc = "FileUploadAndDown Resource")
public class AttachmentUI extends BaseResource<Attachment> {

  @Autowired
  private AttachmentService attachmentService;

  protected AttachmentService getService() {
    return attachmentService;
  }

  @POST
  @Path(value = "/upLoad/{handleType}")
  public JSONObject upLoad(@PathParam("handleType") String handleType, Attachment attachment) {
    String attachmentId = attachmentService.upload(handleType, attachment);
    if (StringUtils.isNotBlank(attachmentId)) {
      return JSON.parseObject("{\"attachmentId\":\"" + attachmentId + "\"}");
    }
    return null;
  }

  @GET
  @Path(value = "/downLoad/{id}")
  public ResponseEntity<byte[]> downLoad(@PathParam("id") long id) {
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
    List<java.io.File> realFiles = new ArrayList<java.io.File>();
    String tmpFilePath = "";
    String tmpFileName = "";
    //int canDownFileCount = 0;
    List<Attachment> files = new ArrayList<>();
    Attachment _file_ = attachmentService.get(id);
    files.add(_file_);
    // 批量获取物理服务器文件
    for (Attachment downLoadfile : files) {
      tmpFilePath = downLoadfile.getFilePath();
      tmpFileName = downLoadfile.getFileName();
      java.io.File realFile = new java.io.File(tmpFilePath + tmpFileName);
      if (realFile.exists()) {
        realFiles.add(realFile);
        //canDownFileCount++;
      }
    }
    if (!realFiles.isEmpty()) {
      java.io.File file = null;
      Attachment firstFile = files.get(0);
      try {
        if (realFiles.size() > 1) {
          // 在服务器端创建打包下载的临时文件
          String tmpRootPath = firstFile.getFilePath();
          String tmpZipFilePath = tmpRootPath.substring(0, tmpRootPath.indexOf(":") + 1)
              + java.io.File.separator + "tmp" + java.io.File.separator + System.currentTimeMillis()
              + java.io.File.separator;
          file = FileUtils.zipFileToDownload(tmpZipFilePath, realFiles);
        } else {
          file = new java.io.File(firstFile.getFilePath() + firstFile.getFileName());
        }

        if (file.exists()) {
          httpHeaders.setContentDispositionFormData("attachment",
              new String(file.getName().getBytes("UTF-8"), "ISO-8859-1"));
          return new ResponseEntity<byte[]>(
              org.apache.commons.io.FileUtils.readFileToByteArray(file), httpHeaders,
              HttpStatus.CREATED);
        }
      } catch (FileNotFoundException e) {
        e.printStackTrace();
      } catch (IOException e) {
        e.printStackTrace();
      } catch (ServletException e) {
        e.printStackTrace();
      } catch (Exception e) {
        e.printStackTrace();
      }
      // finally{
      // file.delete();
      // file.getParentFile().delete();
      // }
    }
    return null;

  }

}
