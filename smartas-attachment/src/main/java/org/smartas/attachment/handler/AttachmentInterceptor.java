package org.smartas.attachment.handler;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.smartas.attachment.Attachment;
import org.smartas.core.Pageable;

public class AttachmentInterceptor implements MethodInterceptor{

  @Override
  public Object invoke(MethodInvocation invocation) throws Throwable {
    Method method = invocation.getMethod();
    Object returnObj = invocation.proceed();
    if("getAll".equals(method.getName())){
        
        List<Attachment> attachments = null;
        if(returnObj != null && returnObj instanceof Pageable<?>){
            Pageable<Attachment> pageAttachments = null;
            try{
              pageAttachments = (Pageable<Attachment>) returnObj;
            }catch(ClassCastException e){
              return returnObj;
            }catch(Exception e){
              return returnObj;
            }
            attachments = (ArrayList<Attachment>) pageAttachments.getData();
            
        }else if(returnObj != null && returnObj instanceof List<?>){
            try{
              attachments = (ArrayList<Attachment>) returnObj;
            }catch(ClassCastException e){
              return returnObj;
            }catch(Exception e){
              return returnObj;
            }
        }
        if(attachments != null && !attachments.isEmpty()){
          attachments = queryFilter(attachments);
        }
    }
    return returnObj;
  }
  
  public List<Attachment> queryFilter(List<Attachment> attachments){
      String realFilePath = "";
      for(Attachment attachment : attachments){
        realFilePath = attachment.getFilePath()+attachment.getFileName();
        java.io.File realFile = new java.io.File(realFilePath);
        if(!realFile.exists()){ //物理文件不存在，不可下载
          attachment.setFileDownStatus(1);
        }else{
          attachment.setFileDownStatus(0);
        }
      }
      return attachments;
  }

}