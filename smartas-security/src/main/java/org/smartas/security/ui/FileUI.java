package org.smartas.security.ui;

import org.smartas.core.BaseService;
import org.smartas.core.annotation.Resource;
import org.smartas.core.ui.BaseUI;
import org.smartas.security.File;
import org.smartas.security.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

@RestController()
@RequestMapping("/file")
@Resource(code = 6001, model = "FitOA", desc = "FileUploadAndDown UI")
public class FileUI extends BaseUI<File>{
    
    @Autowired
    private FileService fileService;
    
    protected BaseService<File> getService() {
      return (BaseService<File>) fileService;
    }
    
    @RequestMapping(value = "/upLoad/{handleType}" , method = RequestMethod.POST)
    public JSONObject upLoad(@PathVariable("handleType") String handleType , org.smartas.security.File file){
      String saveResult = fileService.fileUpload(handleType, file);
      if("SUCCESS".equals(saveResult)){
        return JSON.parseObject("{\"result\":\"success\"}");
      }
      return null;
    }

//    @RequestMapping(value = "/downLoad" , method = RequestMethod.POST)
//    public JSONObject downLoad(org.smartas.security.File file){
//      String saveResult = fileService.getDownLoadFile(file);
//      if("SUCCESS".equals(saveResult)){
//        return JSON.parseObject("{\"result\":\"success\"}");
//      }
//      return null;
//    }

}
