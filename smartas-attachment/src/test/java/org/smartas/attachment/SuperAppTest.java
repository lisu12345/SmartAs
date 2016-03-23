package org.smartas.attachment;

public class SuperAppTest {
   
  public SuperAppTest(){
    System.out.println("now is instance super class");
  }
  
  public void superThis(){
    this.saySuper();
  }
  
  public static void testSuperStatic(){
     System.out.println("test super class's static method call");
  }
  
  public void saySuper(){
    System.out.println("this is super class , but the 'this' word is :"+ this.getClass().getName() );
  }
}
