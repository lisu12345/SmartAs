package com.fiberhome.smartas.core.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FileUtils {
  
  private static Logger logger = LoggerFactory.getLogger(FileUtils.class);
  
  private static final String ZIPFILE_SURFFIX = ".zip";
  
  /**
   * 压缩下载文件列表中的文件
   * @param files
   * @param outputStream
   * @throws IOException
   * @throws ServletException
   */
  public static void zipFile(List<File> files, ZipOutputStream outputStream) throws IOException,ServletException{
      try {
        int size = files.size();
        //压缩列表中的文件
        for (int i = 0; i < size; i++) {
          File file = (File) files.get(i);
          zipFile(file, outputStream);
        }
    } catch (IOException e) {
        logger.error("将文件列表写入文件压缩输出流失败！");
        throw e;
    }
  }
  
  /**
   * 
   * @param inputFile
   * @param outputstream
   * @throws IOException
   * @throws ServletException
   */
  public static void zipFile(File inputFile, ZipOutputStream outputstream)
      throws IOException, ServletException {
    try {
      if (inputFile.exists()) {
        if (inputFile.isFile()) {
          FileInputStream inStream = new FileInputStream(inputFile);
          BufferedInputStream bInStream = new BufferedInputStream(inStream);
          ZipEntry entry = new ZipEntry(inputFile.getName());
          outputstream.putNextEntry(entry);


          final int MAX_BYTE = 10 * 1024 * 1024; // 最大的流为10M
          long streamTotal = 0; // 接受流的容量
          int streamNum = 0; // 流需要分开的数量
          int leaveByte = 0; // 文件剩下的字符数
          byte[] inOutbyte; // byte数组接受文件的数据


          streamTotal = bInStream.available(); // 通过available方法取得流的最大字符数
          streamNum = (int) Math.floor(streamTotal / MAX_BYTE); // 取得流文件需要分开的数量
          leaveByte = (int) streamTotal % MAX_BYTE; // 分开文件之后,剩余的数量


          if (streamNum > 0) {
            for (int j = 0; j < streamNum; ++j) {
              inOutbyte = new byte[MAX_BYTE];
              // 读入流,保存在byte数组
              bInStream.read(inOutbyte, 0, MAX_BYTE);
              outputstream.write(inOutbyte, 0, MAX_BYTE); // 写出流
            }
          }
          // 写出剩下的流数据
          inOutbyte = new byte[leaveByte];
          bInStream.read(inOutbyte, 0, leaveByte);
          outputstream.write(inOutbyte);
          outputstream.closeEntry(); // Closes the current ZIP entry
          // and positions the stream for
          // writing the next entry
          bInStream.close(); // 关闭
          inStream.close();
        }
      } else {
        throw new ServletException("文件不存在！");
      }
    } catch (IOException e) {
      logger.error("压缩文件失败！");
      throw e;
    }
  }
  
  public static File zipFileToDownload(String tmpZipFilePath , List<File> files) throws IOException, ServletException{
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      String curDate = sdf.format(new Date(System.currentTimeMillis()));
      String tmpZipFileName = curDate + ZIPFILE_SURFFIX;
      createFile(tmpZipFilePath,tmpZipFileName);
      //获取已经创建的zip文件
      File file = new File(tmpZipFilePath+tmpZipFileName);
      //文件输出流
      FileOutputStream outStream = new FileOutputStream(file);
      //压缩流
      ZipOutputStream toClient = new ZipOutputStream(outStream);
      zipFile(files, toClient);
      toClient.close();
      outStream.close();
      return file;
      
  }
  
  /**
   * 创建文件
   * @param path
   * @param fileName
   */
  public static void createFile(String tmpZipFilePath,String tmpZipFileName){
      //path表示你所创建文件的路径
      File f = new File(tmpZipFilePath);
      if(!f.isDirectory()){
        f.mkdir();
      }
      // fileName表示你创建的文件名,为zip类型
      File file = new File(f,tmpZipFileName);
      if(!file.exists()){
      try {
          file.createNewFile();
      } catch (IOException e) {
          logger.error("创建临时ZIP文件失败！");
      }
    }
  }
}
