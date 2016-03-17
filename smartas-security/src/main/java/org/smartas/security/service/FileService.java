package org.smartas.security.service;

import java.util.List;

import org.smartas.security.File;

public interface FileService {
  
  public String fileUpload( String handleType , org.smartas.security.File file);
  
  public List<File> getDownLoadFile(File file);

}
