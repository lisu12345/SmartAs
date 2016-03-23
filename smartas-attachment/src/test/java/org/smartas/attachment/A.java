package org.smartas.attachment;

class A{
  
     private B b = new B(this);
  
      public A(){
          System.out.println("instance A");
  
      }
   
      public void print(){
          System.out.println("invoke A");
      }
  
      private class B{
  
      public B(A a){
          a.print();
          System.out.println("instance B ");
      }
  
  }
}