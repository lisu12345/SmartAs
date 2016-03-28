package com.fiberhome.smartas.attachment;

/**
 * Unit test for simple App.
 */
public class AppTest 
    extends SuperAppTest
{
  
  public void superThis2(){
     super.superThis();
     this.sayThis();
  }
  
  public static void testStatic(){
    System.out.println("test sub class's static method call");
  }
  
  public void sayThis(){
    System.out.println("this is the sub class , 'this' word is :" + this.getClass().getName());
  }
  
  public static void main(String [] args){
    new A();
    SuperAppTest.testSuperStatic();
    AppTest.testStatic();
    AppTest at = new AppTest();
    at.superThis();
    
  }
  
}
