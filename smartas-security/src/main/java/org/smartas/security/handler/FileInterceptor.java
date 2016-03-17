package org.smartas.security.handler;

import java.lang.reflect.Method;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;

public class FileInterceptor implements MethodInterceptor {

  @Override
  public Object invoke(MethodInvocation invocation) throws Throwable {
    Object[] object = invocation.getArguments();
    Method method = invocation.getMethod();
    method.
    try{
       String date1 = (new Date()).toLocaleString();
       System.out.println("信息：[MethodInterceptor ]["+date1+"]用户 "+object[0]+" 正在尝试登录陆系统...");
      
       Object returnObject = invo.proceed();
      
       String date2 = (new Date()).toLocaleString();
       System.out.println("信息：[MethodInterceptor ]["+date2+"]用户 "+object[0]+" 成功登录系统.");
      
       return returnObject;
    }catch(Throwable throwable){
       if(object[0].equals("Jessery")){
        throw new Exception("信息：[MethodInterceptor ]不允许黑名单中用户 "+object[0]+" 登录系统");
       }
    }
    return object;
  }

}