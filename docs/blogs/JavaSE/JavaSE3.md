---
title: JavaSE3
date: 2022-03-09
tags:
 - JavaSE
categories:
 - JavaSE
---

# Java



## 异常



### 异常概述与异常体系结构



在使用计算机语言进行项目开发的过程中，即使程序员把代码写得尽善尽美， 在系统的运行过程中仍然会遇到一些问题，因为很多问题不是靠代码能够避 免的，比如：客户输入数据的格式，读取文件是否存在，网络是否始终保持 通畅等等。



#### 简介

在Java语言中，将程序执行中发生的不正常情况称为“异常” 。 (开发过程中的语法错误和逻辑错误不是异常)



- Java程序在执行过程中所发生的异常事件可分为两类：
  - Error：Java虚拟机无法解决的严重问题。如：JVM系统内部错误、资源 耗尽等严重情况。比如：**StackOverflowError**和**OOM**。一般不编写针对性 的代码进行处理
  - Exception: 其它因编程错误或偶然的外在因素导致的一般性问题，可以使 用针对性的代码进行处理。例如：
    - 空指针访问 
    - 试图读取不存在的文件 
    - 网络连接中断 
    - 数组角标越界
- 对于这些错误，一般有两种**解决方法**：
  - 一是遇到错误就终止程序 的运行
  - 另一种方法是由程序员在编写程序时，就考虑到错误的 检测、错误消息的提示，以及错误的处理
- 捕获错误最理想的是在**编译期间**，但有的错误只有在**运行时**才会发生。 比如：除数为0，数组下标越界等
  - 分类：编译时异常和运行时异常



![image-20211021180921765](/assets/imgs/JavaSE3.assets/image-20211021180921765.png)



![image-20211021183502961](/assets/imgs/JavaSE3.assets/image-20211021183502961.png)

> 运行时异常

- 是指编译器不要求强制处置的异常。一般是指编程时的逻辑错误，是程序 员应该积极避免其出现的异常。**java.lang.RuntimeException**类及它的子 类都是运行时异常。
- 对于这类异常，可以不作处理，因为这类异常很普遍，若全处理可能会对 程序的可读性和运行效率产生影响



> 编译时异常

- 是指编译器要求必须处置的异常。即程序在运行时由于外界因素造成的一 般性异常。==编译器要求Java程序必须捕获或声明所有编译时异常==
- 对于这类异常，如果程序不处理，可能会带来意想不到的结果



### 常见异常



- java.lang.RuntimeException 
  - ClassCastException 
  - ArrayIndexOutOfBoundsException 
  - NullPointerException ArithmeticException 
  - NumberFormatException InputMismatchException 
  - 。。。 
-  java.io.IOExeption 
  -  FileNotFoundException 
  -  EOFException 
-  java.lang.ClassNotFoundException 
-  java.lang.InterruptedException 
-  java.io.FileNotFoundException 
-  java.sql.SQLException



#### Error

```java
package com.yixihan.day2021.errertest;

/**
 * Error :
 *      Java虚拟机无法解决的严重问题。如：JVM系统内部错误、资源 耗尽等严重情况。比如：StackOverflowError和OOM。
 *
 *      一般不编写针对性 的代码进行处理
 */
public class ErrorTest {

    public static void main(String[] args) {

        // 1. 栈溢出 : java.lang.StackOverflowError
        // main(args);

        // 2. 堆溢出 : OutOfMemoryError: Java heap space
        // Integer[] integers = new Integer[1024 * 1024 * 1024];
    }
}
```



#### Exception

```java
package com.yixihan.day2021.exceptiontest;

import org.junit.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;
import java.util.Scanner;

/**
 * 一. 异常体系结构
 *      java.lang.Throwable
 *        |-----java.lang.Error:一般不编写针对性的代码进行处理。
 *        |-----java.lang.Exception:可以进行异常的处理
 *           |------编译时异常(checked)
 *                 |-----IOException
 *                    |-----FileNotFoundException
 *                 |-----ClassNotFoundException
 *           |------运行时异常(unchecked,RuntimeException)
 *                 |-----NullPointerException
 *                 |-----ArrayIndexOutOfBoundsException
 *                 |-----ClassCastException
 *                 |-----NumberFormatException
 *                 |-----InputMismatchException
 *                 |-----ArithmeticException
 *
 * 面试题：常见的异常都有哪些？举例说明
 *
 * @author yixihan
 */
public class ExceptionTest {

    //**************************************以下是运行时异常*********************************************

    /**
     * 空指针异常 : NullPointerException
     */
    @Test
    public void test1 () {
        String str = "abc";
        System.out.println(str);

        str = null;
        // java.lang.NullPointerException
        System.out.println(str.charAt(0));
    }

    /**
     * 数组角标越界 : ArrayIndexOutOfBoundsException
     */
    @Test
    public void test2 () {
        int[] ints = new int[3];

        System.out.println(ints[2]);

        // java.lang.ArrayIndexOutOfBoundsException
        System.out.println(ints[5]);
    }

    /**
     * StringIndexOutOfBoundsException
     */
    @Test
    public void test3 () {
        String str = "abc";
        System.out.println(str.charAt(0));

        // java.lang.StringIndexOutOfBoundsException
        System.out.println(str.charAt(4));
    }

    /**
     * 类型转换异常 : ClassCastException
     */
    @Test
    public void test4 () {

        Object date = new Date();

        // java.lang.ClassCastException
        String str = (String) date;
    }

    /**
     * NumberFormatException
     */
    @Test
    public void test5 () {

        String str = "123";
        System.out.println(Integer.parseInt(str));

        // java.lang.NumberFormatException
        str = "avc";
        System.out.println(Integer.parseInt(str));
    }

    /**
     * InputMismatchException
     */
    @Test
    public void test6 () {
        Scanner sc = new Scanner(System.in);

        // 输入非数字 : java.util.InputMismatchException
        int num = sc.nextInt();
        System.out.println(num);
    }

    /**
     * ArithmeticException
     */
    @Test
    public void test7 () {

        int a = 10;
        int b = 2;

        System.out.println(a / b);

        // java.lang.ArithmeticException
        b = 0;
        System.out.println(a / b);
    }


    //*******************************以下是编译时异常***************************************************

    /**
     * java.io.FileNotFoundException
     */
    @Test
    public void test8 () throws IOException {
        File file = new File("hello.txt");

        // 未处理 异常: java.io.FileNotFoundException
        FileInputStream fileInputStream = new FileInputStream(file);

        int data;
        do {
            // 未处理 异常: java.io.IOException
            data = fileInputStream.read();
            System.out.println((char) data);
        } while (data != -1);


        // 未处理 异常: java.io.IOException
        fileInputStream.close();

    }
}
```



### 异常处理机制



#### 简介

在编写程序时，经常要在可能出现错误的地方加上检测的代码， 如进行x/y运算时，要检测分母为0，数据为空，输入的不是数据 而是字符等。过多的if-else分支会导致程序的代码加长、臃肿， 可读性差。因此采用异常处理机制。



> Java异常处理

Java采用的异常处理机制，是将异常处理的程序代码集中在一起， 与正常的程序代码分开，使得程序简洁、优雅，并易于维护。



> Java异常处理的方式

- 方式一：try-catch-finally
- 方式二：throws + 异常类型



#### 异常处理机制一： try-catch-finally



- Java提供的是异常处理的**抓抛模型**
- Java程序的执行过程中如出现异常，会生成一个==异常类对象==， 该异常对象将被提交给Java运行时系统，这个过程称为==抛出 (throw)异常==
- 异常对象的生成
  - 由虚拟机==自动生成==：程序运行过程中，虚拟机检测到程序发生了问题，如果在当 前代码中没有找到相应的处理程序，就会在后台自动创建一个对应异常类的实例 对象并抛出——自动抛出
  - 由开发人员==手动创建==：Exception exception = new ClassCastException();——创 建好的异常对象不抛出对程序没有任何影响，和创建一个普通对象一样



```java
package com.yixihan.day2021.exceptiontest1;

import org.junit.Test;

/**
 * 异常的处理 : 抓抛模型
 *
 * 过程一 : "抛" : 程序在正常执行的过程中, 一旦出现异常, 就会在异常代码处生成了一个对应异常类的对象
 *                并将此对象抛出
 *                一旦抛出对象以后, 其后的代码就不再执行
 *
 *
 * 过程二 : "抓" : 可以理解为异常处理的方式 :
 *                  1. try-catch-finally
 *                  2. throws
 *
 *
 * try {
 *      // 可能出现异常的代码
 *
 * } catch (异常类型 1 变量名 1) {
 *      // 处理异常的方式 1
 * } catch (异常类型 2 变量名 2) {
 *      // 处理异常的方式 2
 * } catch (异常类型 3 变量名 3) {
 *      // 处理异常的方式 3
 * }
 * ...
 * finally {
 *     // 一定会执行的代码
 * }
 *
 * 说明 :
 *      1. finally 是可选的
 *
 *      2. 使用 try 将可能出现的异常代码包装起来, 在执行过程中, 一旦出现异常, 就会生成一个对应异常类的对象, 根据此对象的类型
 *          用 catch 去进行匹配
 *
 *      3. 一旦 try 中异常类型匹配到某一个 catch 时, 就进入 catch 中进行异常的处理, 一旦处理完成, 就跳出当前的 try-catch
 *          结构 (在没有写 finally的情况下), 继续执行其后的代码
 *
 *      4. catch 中的异常类型, 如果没有子父类关系, 则谁声明在上, 谁声明在下无所谓
 *         catch 中的异常类型, 如果没有子父类关系, 则子类一定要声明在父类的上面, 否则会报错
 *
 *      5. 常用的异常对象处理的方式
 *          1. e.getMessage() (返回字符串类型的异常信息);
 *          2. e.printStackTrace() (停止程序);
 *
 *      6. try 结构中声明的变量, 在出了 try 结构以后, 就不能调用
 *
 *      7. try-catch-finally 结构可以嵌套使用
 *
 *
 * 体会 :
 *      1. 使用 try-catch-finally 处理编译时异常, 使得程序在编译时就不再报错, 但是运行是仍可能报错, 相当于我们使用 try-catch-finally
 *         将一个编译时可能出现的异常, 延迟到运行时出现
 *      2. 开发中, 由于运行时异常比较常见, 所以我们一般不针对运行时异常编写 try-catch-finally 了,
 *         针对于编译时异常, 我们一定要考虑异常的处理
 * @author yixihan
 */
public class ExceptionTest1 {


    /**
     * NumberFormatException
     */
    @Test
    public void test5 () {

        String str = "123";
        System.out.println(Integer.parseInt(str));

        // java.lang.NumberFormatException
        str = "avc";
        try {
            System.out.println("hello --- 1");
            int num = Integer.parseInt(str);

            System.out.println("hello --- 2");
            System.out.println(num);
        }
        /*catch (Exception e) {
            System.out.println("出现异常了, 不要着急哦~");
        } */
        // 已捕捉到异常 'java.lang.NumberFormatException'
        catch (NumberFormatException e) {
            System.out.println("出现数值转换异常了, 不要着急哦~");

            // e.getMessage()
            System.out.println(e.getMessage());

            // e.printStackTrace()
            e.printStackTrace();
        } catch (NullPointerException e) {
            System.out.println("出现空指针异常了, 不要着急哦~");
        } catch (Exception e) {
            System.out.println("出现异常了, 不要着急哦~");
        }

        // try 结构中声明的变量, 在出了 try 结构以后, 就不能调用
        // System.out.println(num);
        System.out.println("hello --- 3");
    }
}
```



##### Finally

```java
package com.yixihan.day2021.exceptiontest1;

import org.junit.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

/**
 *
 * try-catch-finally 结构中 finally 的使用
 *
 * 1. finally 是可选的
 *
 * 2. finally 声明的是一定会被执行的代码, 即使 catch 中又出现异常了, try 中有 return 语句, catch 中有 return 语句等情况
 *
 * 3. 像 数据库连接 输入输出流 网络编程中的 Socket 等资源, JVM 是不能自动回收的, 我们需要自己手动的进行资源的释放,
 *      此时的资源释放, 就需要声明在 finally
 */
public class FinallyTest {

    @Test
    public void test1 () {
        try {
            int a = 10;
            int b = 0;

            System.out.println(a / b);
        } catch (Exception e) {
            // e.printStackTrace();
            // int[] ints = new int[10];
            // System.out.println(ints[10]);
        } finally{
            System.out.println("111");
        }
    }


    public int method1 () {

        try {
            int[] ints = new int[10];
            System.out.println(ints[10]);
            return 1;
        } catch (ArrayIndexOutOfBoundsException e) {
            e.printStackTrace();
            return 2;
        } finally {
            System.out.println("我一定会被执行");
            // return 3
            // return 3;
        }
    }

    @Test
    public void test2 () {
        System.out.println(method1());
    }

    /**
     * java.io.FileNotFoundException
     */
    @Test
    public void test8 (){

        FileInputStream fileInputStream = null;

        try {
            File file = new File("hello.txt");

             fileInputStream = new FileInputStream(file);

            int data;
            do {

                data = fileInputStream.read();
                System.out.print((char) data);
            } while (data != -1);

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fileInputStream != null) {
                    fileInputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}
```



override

```java
package com.yixihan.day2021.exceptiontest2;

import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * 方法重写的规则之一 :
 *      子类重写的方法抛出的异常类型不大于父类被重写的方法抛出的异常类型
 *
 *
 *
 */
public class OverRideTest {

    public static void main(String[] args) {

        display(new SubClass());
    }

    public static void display (SuperClass s) {

        try {
            s.method();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

class SuperClass {

    public void method () throws IOException {

    }
}

class SubClass extends SuperClass {

    // 'com.yixihan.day2021.exceptiontest2.SubClass' 中的 'method()' 与 'com.yixihan.day2021.exceptiontest2.SuperClass' 中的 'method()' 冲突；重写的方法未抛出 'java.lang.Exception'
    // public void method () throws Exception {
    // }

    public void method () throws FileNotFoundException {

    }
}
```



#### 异常处理机制二： throws

声明抛出异常是Java中处理异常的第二种方式

- 如果一个方法(中的语句执行时)可能生成某种异常，但是并不能确定如何处理这 种异常，则此方法应显示地声明抛出异常，表明该方法将不对这些异常进行处理， 而由该方法的调用者负责处理
- 在方法声明中用throws语句可以声明抛出异常的列表，throws后面的异常类型可 以是方法中产生的异常类型，也可以是它的父类。



```java
package com.yixihan.day2021.exceptiontest1;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * 异常处理的方式二 : throw + 异常类型
 *
 * 1. "throws + 异常类型" 写在方法的声明处, 指明此方法执行时, 可能会抛出的异常类型
 *     一旦当方法体执行时, 出现异常, 仍会在异常代码出生成一个异常类的对象, 此对象满足
 *     throws 后异常类型时, 就会被抛出, 异常代码后面的代码就不会被执行了
 *
 * 2. 体会 : try-catch-finally : 真正的将异常给处理掉了
 *          throws 的方式只是将异常抛给了方法的调用者, 并没有真正的将异常处理掉
 *
 * 3. 开发中, 如何选择使用 try-catch-finally, 还是使用 throws
 *      1. 如果父类中被重写的方法没有 throws 方式处理异常, 则子类重写的方法也不能使用 throws
 *         意味着如果子类重写的方法中有异常, 必须使用 try-catch-finally 方式处理
 *
 *      2. 执行的方法 a 中, 先后又调用了几种方法, 这几个方法是递进关系执行的, 我们建议这几个方法
 *      使用 throws 的方式处理, 而执行的方法 a 可以考虑使用 try-catch-finally 方式进行处理
 */
public class ExceptionTest2 {

    public static void main(String[] args) {


        try {
            method2();
        } catch (FileNotFoundException e) {
            System.out.println("文件没找到哦~");
        } catch (IOException e) {
            System.out.println("IO 流异常了哦~");
        }

        method3();


    }

    public static void method1 () throws IOException, FileNotFoundException {
        File file = new File("hello1.txt");

        // 未处理 异常: java.io.FileNotFoundException
        FileInputStream fileInputStream = new FileInputStream(file);

        int data;
        do {
            // 未处理 异常: java.io.IOException
            data = fileInputStream.read();
            System.out.println((char) data);
        } while (data != -1);


        // 未处理 异常: java.io.IOException
        fileInputStream.close();
    }

    public static void method2 () throws IOException {
        // 未处理 异常: java.io.IOException, java.io.FileNotFoundException
        method1();
        System.out.println("hhh");
    }

    public static void method3 () {
        try {
            method2();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
```



#### 手动抛出异常

Java异常类对象除在程序执行过程中出现异常时由系统自动生成并 抛出，也可根据需要使用人工创建并抛出



- 首先要生成异常类对象，然后通过throw语句实现抛出操作(提交给Java运 行环境)。

```java
IOException e = new IOException();
throw e
```



- 可以抛出的异常必须是Throwable或其子类的实例。下面的语句在编译时将 会产生语法错误：

```java
throw new String("want to throw");
```



```java
package com.yixihan.day2021.manualexceptiontest;

import org.junit.Test;

public class StudentTest {

    @Test
    public void test1 () {

        Student student = new Student();



        try {
            student.register(2);

            student.register(-3);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }
}

class Student {
    private int id;

    public void register (int id) throws Exception {
        if (id >0) {
            this.id = id;
        } else {
            throw new Exception("您输入的数据非法~");
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
```



#### 用户自定义异常类

- 一般地，用户自定义异常类都是RuntimeException的子类
- 自定义异常类通常需要编写几个重载的构造器
- 自定义异常需要提供serialVersionUID
- 自定义的异常通过throw抛出
- 自定义异常最重要的是异常类的名字，当异常出现时，可以根据 名字判断异常类型



用户自定义异常类MyException，用于描述数据取值范围错误信息。用户 自己的异常类必须继承现有的异常类。



```java
package com.yixihan.day2021.diyexceptiontest;

/**
 * 如何自定义异常类 :
 *      1. 继承于现有的异常结构 : RuntimeException Exception
 *      2. 提供全局常量 : serialVersionUID
 *      3. 提供重载的构造器
 *
 *
 *
 */
public class MyException extends RuntimeException{

    static final long serialVersionUID = -7034897190743766939L;

    public MyException() { }

    public MyException(String message) {
        super(message);
    }



}
```



```java
package com.yixihan.day2021.diyexceptiontest;

import org.junit.Test;

public class StudentTest {

    @Test
    public void test1 () {

        Student student = new Student();

        student.register(2);

        student.register(-3);

    }
}

class Student {
    private int id;

    public void register (int id) {
        if (id >0) {
            this.id = id;
        } else {
            throw new MyException("您输入的数据非法~");
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
```



#### 总结 : 异常处理5个关键字

![image-20211021212952138](/assets/imgs/JavaSE3.assets/image-20211021212952138.png)



> 一首小悟结束异常处理

世界上最遥远的距离，是我在if里你在else里，似乎一直相伴又永远分离； 

世界上最痴心的等待，是我当case你是switch，或许永远都选不上自己； 

世界上最真情的相依，是你在try我在catch。无论你发神马脾气，我都默 默承受，静静处理。

到那时，再来期待我们的finally。



#### 练习



##### 练习1



```java
package com.yixihan.day2021.exer.test2;

import java.io.FileNotFoundException;

/**
 * 编写应用程序EcmDef.java，接收命令行的两个参数，要求不能输入负数，计算
 * 两数相除。
 * 对 数 据 类 型 不 一 致 (NumberFormatException) 、 缺 少 命 令 行 参 数
 * (ArrayIndexOutOfBoundsException、
 * 除0(ArithmeticException)及输入负数(EcDef 自定义的异常)进行异常处理。
 */
public class EcmDef {

    public int ecm (int a, int b) throws EcDef {

        if (a < 0 || b < 0) {
            throw new EcDef("不能输入负数");
        } else {
            return a / b;
        }

    }

    public static void main(String[] args) {

        try {
            int a = Integer.parseInt(args[0]);
            int b = Integer.parseInt(args[1]);

            EcmDef test = new EcmDef();

            int ecm = test.ecm(a, b);

            System.out.println(ecm);
        } catch (EcDef | ArrayIndexOutOfBoundsException | NumberFormatException | ArithmeticException e) {
            e.printStackTrace();
        }
    }
}


class EcDef extends Exception{

    static final long serialVersionUID = -7033897190743766939L;

    public EcDef() { }

    public EcDef(String message) {
        super(message);
    }


}
```



##### 练习2



```java
package com.yixihan.day2021.exer.test1;

public class ReturnExceptionDemo {

    static void methodA() {
        try {
            System.out.println("进入方法A");
            throw new RuntimeException("制造异常");
        }finally {
            System.out.println("用A方法的finally");
        }
    }
    static void methodB() {
        try {
            System.out.println("进入方法B");
            return;
        } finally {
            System.out.println("调用B方法的finally");
        }
    }

    public static void main(String[] args) {
        try {
            methodA();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        methodB();
    }

    /*
    输出 :
    进入方法A
    用A方法的finally
    制造异常
    进入方法B
    调用B方法的finally
     */
}
```



## project 3



> 目标

![image-20211022171042786](/assets/imgs/JavaSE3.assets/image-20211022171042786.png)



PPT地址 : [ppt](/assets/imgs/JavaSE3.assets/project3.pptx)





### domain 包



#### 外设相关

Equipment

```java
package com.yixihan.project3.domain;

/**
 * Equipment 外设
 *
 * @author yixihan
 */
public interface Equipment {

    /**
     * 返回描述
     * @return 描述
     */
    String getDescription ();
}
```



Pc

```java
package com.yixihan.project3.domain;

import java.util.Objects;

/**
 * pc 电脑
 *
 * @author yixihan
 */
public class Pc implements Equipment{

    /**
     * 机器的型号
     */
    private String model;

    /**
     * 显示器名称
     */
    private String display;


    /**
     * 无参构造
     */
    public Pc() { }


    /**
     * 全参构造
     * @param model 机器的型号
     * @param display 显示器名称
     */
    public Pc(String model, String display) {
        this.model = model;
        this.display = display;
    }


    @Override
    public String getDescription() {
        return model + "(" + display +")";
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getDisplay() {
        return display;
    }

    public void setDisplay(String display) {
        this.display = display;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pc)) {
            return false;
        }
        Pc pc = (Pc) o;
        return Objects.equals(model, pc.model) && Objects.equals(display, pc.display);
    }

    @Override
    public int hashCode() {
        return Objects.hash(model, display);
    }

    @Override
    public String toString() {
        return "Pc{" +
                "model='" + model + '\'' +
                ", display='" + display + '\'' +
                '}';
    }
}
```



NoteBook

```java
package com.yixihan.project3.domain;

import java.util.Objects;

/**
 * NoteBook 笔记本
 *
 * @author yixihan
 */
public class NoteBook implements Equipment{

    /**
     * 机器的型号
     */
    private String model;

    /**
     * 机器的价格
     */
    private double price;


    /**
     * 无参构造
     */
    public NoteBook() { }


    /**
     * 全参构造
     * @param model 机器的型号
     * @param price 机器的价格
     */
    public NoteBook(String model, double price) {
        this.model = model;
        this.price = price;
    }

    /**
     * 返回描述
     * @return 描述
     */
    @Override
    public String getDescription() {
        return model + "(" + price +")";
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NoteBook)) {
            return false;
        }
        NoteBook noteBook = (NoteBook) o;
        return Double.compare(noteBook.price, price) == 0 && Objects.equals(model, noteBook.model);
    }

    @Override
    public int hashCode() {
        return Objects.hash(model, price);
    }

    @Override
    public String toString() {
        return "NoteBook{" +
                "model='" + model + '\'' +
                ", price=" + price +
                '}';
    }
}
```



Printer

```java
package com.yixihan.project3.domain;

import java.util.Objects;

/**
 * Printer 打印机
 *
 * @author yixihan
 */
public class Printer implements Equipment{

    /**
     * 机器的名字
     */
    private String name;

    /**
     * 机器的类型
     */
    private String type;


    /**
     * 无参构造
     */
    public Printer() { }


    /**
     * 全参构造
     * @param name 机器的名字
     * @param type 机器的类型
     */
    public Printer(String name, String type) {
        this.name = name;
        this.type = type;
    }


    @Override
    public String getDescription() {
        return name + "(" + type +")";
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Printer)) {
            return false;
        }
        Printer printer = (Printer) o;
        return Objects.equals(name, printer.name) && Objects.equals(type, printer.type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, type);
    }

    @Override
    public String toString() {
        return "Printer{" +
                "name='" + name + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
```



#### 员工相关



Employee

```java
package com.yixihan.project3.domain;

import java.util.Objects;

/**
 * Employee 员工
 *
 * @author yixihan
 */
public class Employee {

    /**
     * 员工 id
     */
    private int id;

    /**
     * 员工 姓名
     */
    private String name;

    /**
     * 员工 姓名
     */
    private int age;

    /**
     * 员工 工资
     */
    private double salary;


    /**
     * 无参构造
     */
    public Employee() { }


    /**
     * 全参构造
     * @param id 员工 id
     * @param name 员工 姓名
     * @param age 员工 姓名
     * @param salary 员工 工资
     */
    public Employee(int id, String name, int age, double salary) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public String getDetails () {
        return getId() + "\t" + getName() + "\t" + getAge() + "\t" + getSalary();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employee)) {
            return false;
        }
        Employee employee = (Employee) o;
        return id == employee.id && age == employee.age && Double.compare(employee.salary, salary) == 0 && Objects.equals(name, employee.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, age, salary);
    }

    @Override
    public String toString() {
        return getId() + "\t" + getName() + "\t" + getAge() + "\t" + getSalary();
    }
}
```



Programmer

```java
package com.yixihan.project3.domain;

import com.yixihan.project3.service.Status;

import java.util.Objects;

import static com.yixihan.project3.service.Status.FREE;

/**
 * Programmer 程序员
 *
 * @author yixihan
 */
public class Programmer extends Employee{

    /**
     * 在团队中的ID
     */
    private int memberId;

    /**
     * 成员的状态
     */
    private Status status = FREE;

    /**
     * 成员领用的设备
     */
    private Equipment equipment;


    /**
     * 无参构造
     */
    public Programmer() { }


    /**
     * 全参构造
     * @param id 员工 id
     * @param name 员工 姓名
     * @param age 员工 年龄
     * @param salary 员工 工资
     * @param memberId 员工 在团队中的ID
     * @param status 员工 成员的状态
     * @param equipment 员工 成员领用的设备
     */
    public Programmer(int id, String name, int age, double salary, int memberId, Status status, Equipment equipment) {
        super(id, name, age, salary);
        this.memberId = memberId;
        this.status = status;
        this.equipment = equipment;
    }

    /**
     * 有参构造 (equipment)
     * @param id 员工 id
     * @param name 员工 姓名
     * @param age 员工 年龄
     * @param salary 员工 工资
     * @param equipment 员工 成员领用的设备
     */
    public Programmer(int id, String name, int age, double salary, Equipment equipment) {
        super(id, name, age, salary);
        this.equipment = equipment;
    }

    public String getDetailsForTeam () {
        return  getMemberId() + " / " + getId() + "\t\t" + getName() + "\t\t" + getAge() + "\t\t" +
                getSalary() + "\t\t" + "程序员";
    }

    public int getMemberId() {
        return memberId;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Programmer)) {
            return false;
        }
        if (!super.equals(o)) {
            return false;
        }
        Programmer that = (Programmer) o;
        return getMemberId() == that.getMemberId() && Objects.equals(getStatus(), that.getStatus()) && Objects.equals(getEquipment(), that.getEquipment());
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), getMemberId(), getStatus(), getEquipment());
    }

    @Override
    public String toString() {
        return getDetails() + "\t" + "程序员" + "\t" + getStatus() + "\t\t\t\t\t" + getEquipment().getDescription();
    }
}
```



Designer

```java
package com.yixihan.project3.domain;

import com.yixihan.project3.service.Status;

import java.util.Objects;

/**
 * Designer 设计师
 *
 * @author yixihan
 */
public class Designer extends Programmer{

    /**
     * 奖金
     */
    private double bonus;


    /**
     * 无参构造
     */
    public Designer() { }

    /**
     * 有参构造
     * @param id 员工 id
     * @param name 员工 姓名
     * @param age 员工 年龄
     * @param salary 员工 工资
     * @param equipment 员工 成员领用的设备
     * @param bonus 员工的 奖金
     */
    public Designer(int id, String name, int age, double salary, Equipment equipment, double bonus) {
        super(id, name, age, salary, equipment);
        this.bonus = bonus;
    }

    /**
     * 全参构造
     * @param id 员工 id
     * @param name 员工 姓名
     * @param age 员工 年龄
     * @param salary 员工 工资
     * @param memberId 员工 在团队中的ID
     * @param status 员工 成员的状态
     * @param equipment 员工 成员领用的设备
     * @param bonus 员工的 奖金
     */
    public Designer(int id, String name, int age, double salary, int memberId, Status status, Equipment equipment, double bonus) {
        super(id, name, age, salary, memberId, status, equipment);
        this.bonus = bonus;
    }


    @Override
    public String getDetailsForTeam () {
        return  getMemberId() + " / " + getId() + "\t\t" + getName() + "\t\t" + getAge() + "\t\t" +
                getSalary() + "\t\t" + "设计师" + "\t\t" + getBonus();
    }

    public double getBonus() {
        return bonus;
    }

    public void setBonus(double bonus) {
        this.bonus = bonus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Designer)) {
            return false;
        }
        if (!super.equals(o)) {
            return false;
        }
        Designer designer = (Designer) o;
        return Double.compare(designer.bonus, bonus) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), bonus);
    }



    @Override
    public String toString() {
        return getDetails() + "\t" + "设计师" + "\t" + getStatus() + "\t" + getBonus() + "\t\t\t" + getEquipment().getDescription();
    }
}
```



Architect

```java
package com.yixihan.project3.domain;

import com.yixihan.project3.service.Status;

import java.util.Objects;

/**
 * Architect 架构师
 *
 * @author yixihan
 */
public class Architect extends Designer{

    /**
     * 公司奖励的股票数量
     */
    private int stock;


    /**
     * 无参构造
     */
    public Architect() { }


    /**
     * 有参构造
     * @param id 员工 id
     * @param name 员工 姓名
     * @param age 员工 年龄
     * @param salary 员工 工资
     * @param equipment 员工 成员领用的设备
     * @param bonus 员工的 奖金
     * @param stock 公司奖励的股票数量
     */
    public Architect(int id, String name, int age, double salary, Equipment equipment, double bonus, int stock) {
        super(id, name, age, salary, equipment, bonus);
        this.stock = stock;
    }


    /**
     * 全参构造
     * @param id 员工 id
     * @param name 员工 姓名
     * @param age 员工 年龄
     * @param salary 员工 工资
     * @param memberId 员工 在团队中的ID
     * @param status 员工 成员的状态
     * @param equipment 员工 成员领用的设备
     * @param bonus 员工的 奖金
     * @param stock 公司奖励的股票数量
     */
    public Architect(int id, String name, int age, double salary, int memberId, Status status, Equipment equipment, double bonus, int stock) {
        super(id, name, age, salary, memberId, status, equipment, bonus);
        this.stock = stock;
    }


    @Override
    public String getDetailsForTeam () {
        return  getMemberId() + " / " + getId() + "\t\t" + getName() + "\t\t" + getAge() + "\t\t" +
                getSalary() + "\t\t" + "架构师" + "\t\t" + getBonus() + "\t\t" + getStock();
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Architect)) {
            return false;
        }
        if (!super.equals(o)) {
            return false;
        }
        Architect architect = (Architect) o;
        return stock == architect.stock;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), stock);
    }

    @Override
    public String toString() {
        return getDetails() + "\t" + "架构师" + "\t" + getStatus() + "\t" + getBonus() + "\t " +
                getStock() + "\t" + getEquipment().getDescription();
    }
}
```



### util 包



TSUtility

```java
package com.yixihan.project3.util;

import java.util.*;
/**
 * 
 * @Description 项目中提供了TSUtility.java类，可用来方便地实现键盘访问。
 * @author shkstart  Email:shkstart@126.com
 * @version 1.0
 * @date 2019年2月12日上午12:02:58
 *
 */
public class TSUtility {
    private static Scanner scanner = new Scanner(System.in);

    /**
     * 
     * @Description 该方法读取键盘，如果用户键入’1’-’4’中的任意字符，则方法返回。返回值为用户键入字符。
     * @author shkstart
     * @date 2019年2月12日上午12:03:30
     * @return 用户键入字符(1-4)
     */
   public static char readMenuSelection() {
        char c;
        for (; ; ) {
            String str = readKeyBoard(1, false);
            c = str.charAt(0);
            if (c != '1' && c != '2' &&
                c != '3' && c != '4') {
                System.out.print("选择错误，请重新输入：");
            } else break;
        }
        return c;
    }
   /**
    * 
    * @Description 该方法提示并等待，直到用户按回车键后返回。
    * @author shkstart
    * @date 2019年2月12日上午12:03:50
    */
    public static void readReturn() {
        System.out.print("按回车键继续...");
        readKeyBoard(100, true);
    }
    /**
     * 
     * @Description 该方法从键盘读取一个长度不超过2位的整数，并将其作为方法的返回值。
     * @author shkstart
     * @date 2019年2月12日上午12:04:04
     * @return 读入的长度不超过2位的整数
     */
    public static int readInt() {
        int n;
        for (; ; ) {
            String str = readKeyBoard(2, false);
            try {
                n = Integer.parseInt(str);
                break;
            } catch (NumberFormatException e) {
                System.out.print("数字输入错误，请重新输入：");
            }
        }
        return n;
    }
    /**
     * 
     * @Description 从键盘读取‘Y’或’N’，并将其作为方法的返回值。
     * @author shkstart
     * @date 2019年2月12日上午12:04:45
     * @return 返回Y/N
     */
    public static char readConfirmSelection() {
        char c;
        for (; ; ) {
            String str = readKeyBoard(1, false).toUpperCase();
            c = str.charAt(0);
            if (c == 'Y' || c == 'N') {
                break;
            } else {
                System.out.print("选择错误，请重新输入：");
            }
        }
        return c;
    }

    private static String readKeyBoard(int limit, boolean blankReturn) {
        String line = "";

        while (scanner.hasNextLine()) {
            line = scanner.nextLine();
            if (line.length() == 0) {
                if (blankReturn) return line;
                else continue;
            }

            if (line.length() < 1 || line.length() > limit) {
                System.out.print("输入长度（不大于" + limit + "）错误，请重新输入：");
                continue;
            }
            break;
        }

        return line;
    }
}
```



### service 包



Data

```java
package com.yixihan.project3.service;

/**
 * 数据存放类
 *
 * @author : yixihan
 */
public class Data {
    public static final int EMPLOYEE = 10;
    public static final int PROGRAMMER = 11;
    public static final int DESIGNER = 12;
    public static final int ARCHITECT = 13;

    public static final int PC = 21;
    public static final int NOTEBOOK = 22;
    public static final int PRINTER = 23;

    //Employee  :  10, id, name, age, salary
    //Programmer:  11, id, name, age, salary
    //Designer  :  12, id, name, age, salary, bonus
    //Architect :  13, id, name, age, salary, bonus, stock
    public static final String[][] EMPLOYEES = {
        {"10", "1", "马云", "22", "3000"},
        {"13", "2", "马化腾", "32", "18000", "15000", "2000"},
        {"11", "3", "李彦宏", "23", "7000"},
        {"11", "4", "刘强东", "24", "7300"},
        {"12", "5", "雷军", "28", "10000", "5000"},
        {"11", "6", "任志强", "22", "6800"},
        {"12", "7", "柳传志", "29", "10800","5200"},
        {"13", "8", "杨元庆", "30", "19800", "15000", "2500"},
        {"12", "9", "史玉柱", "26", "9800", "5500"},
        {"11", "10", "丁磊", "21", "6600"},
        {"11", "11", "张朝阳", "25", "7100"},
        {"12", "12", "杨致远", "27", "9600", "4800"}
    };
    
    //如下的EQUIPMENTS数组与上面的EMPLOYEES数组元素一一对应
    //PC      :21, model, display
    //NoteBook:22, model, price
    //Printer :23, name, type 
    public static final String[][] EQUIPMENTS = {
        {},
        {"22", "联想T4", "6000"},
        {"21", "戴尔", "NEC17寸"},
        {"21", "戴尔", "三星 17寸"},
        {"23", "佳能 2900", "激光"},
        {"21", "华硕", "三星 17寸"},
        {"21", "华硕", "三星 17寸"},
        {"23", "爱普生20K", "针式"},
        {"22", "惠普m6", "5800"},
        {"21", "戴尔", "NEC 17寸"},
        {"21", "华硕","三星 17寸"},
        {"22", "惠普m6", "5800"}
    };
}
```



Status

```java
package com.yixihan.project3.service;

/**
 * Status 员工状态类 (FREE BUSY VOCATION)
 *
 * @author yixihan
 */
public class Status {

    private final String NAME;
    private Status(String name) {
        this.NAME = name;
    }

    public static final Status FREE = new Status("FREE");

    public static final Status VOCATION = new Status("VOCATION");

    public static final Status BUSY = new Status("BUSY");

    public String getNAME() {
        return NAME;
    }
    @Override
    public String toString() {
        return NAME;
    }

}
```



TeamException

```java
package com.yixihan.project3.service;

/**
 * 自定义异常类
 *
 * @author yixihan
 */
public class TeamException extends Exception{

    static final long serialVersionUID = -7034897190745666939L;

    public TeamException() { }

    public TeamException(String message) {
        super(message);
    }
}
```



NameListService

```java
package com.yixihan.project3.service;

import com.yixihan.project3.domain.*;

import static com.yixihan.project3.service.Data.*;

/**
 * @author yixihan
 */
public class NameListService {

    private Employee[] employees;

    public NameListService() throws TeamException{

        employees = new Employee[EMPLOYEES.length];

        for (int i = 0; i < EMPLOYEES.length; i++) {

            Employee employee;

            int type = Integer.parseInt(EMPLOYEES[i][0]);

            // 员工 id
            int id = Integer.parseInt(EMPLOYEES[i][1]);
            // 员工 姓名
            String name = EMPLOYEES[i][2];
            // 员工 年龄
            int age = Integer.parseInt(EMPLOYEES[i][3]);
            // 员工 工资
            double salary = Double.parseDouble(EMPLOYEES[i][4]);
            // 员工 外设
            Equipment equipment;
            // 员工 奖金
            double bonus;
            // 员工 股票
            int stock;

            switch (type) {
                case EMPLOYEE:
                    employee = new Employee(id, name, age, salary);
                    break;
                case PROGRAMMER:
                    equipment = createEquipment(i);
                    employee = new Programmer(id, name, age, salary, equipment);
                    break;
                case DESIGNER:
                    equipment = createEquipment(i);
                    bonus = Double.parseDouble(EMPLOYEES[i][4]);
                    employee = new Designer(id, name, age, salary, equipment, bonus);
                    break;
                case ARCHITECT:
                    equipment = createEquipment(i);
                    bonus = Double.parseDouble(EMPLOYEES[i][4]);
                    stock = Integer.parseInt(EMPLOYEES[i][5]);
                    employee = new Architect(id, name, age, salary, equipment, bonus, stock);
                    break;
                default:
                    throw new TeamException("信息读取错误!");
            }

            // 将信息写入数组
            employees[i] = employee;
        }
    }

    /**
     * 获取指定 index 位置员工的外设信息
     * @param index index
     * @return 外设信息
     */
    public Equipment createEquipment (int index) throws TeamException{

        int type = Integer.parseInt(EQUIPMENTS[index][0]);

        switch (type) {
            case PC:
                return new Pc(EQUIPMENTS[index][1], EQUIPMENTS[index][2]);
            case NOTEBOOK:
                return new NoteBook(EQUIPMENTS[index][1], Integer.parseInt(EQUIPMENTS[index][2]));
            case PRINTER:
                return new Printer(EQUIPMENTS[index][1], EQUIPMENTS[index][2]);
            default:
                throw new TeamException("信息读取错误!");
        }
    }


    /**
     * 获取当前所有的员工信息
     * @return 所有的员工信息
     */
    public Employee[] getAllEmployees () {
        return employees;
    }


    /**
     * 获取指定 id 的员工信息
     * @param id id
     * @return 指定 id 的员工信息
     */
    public Employee getEmployee (int id) throws TeamException{

        for (Employee employee : employees) {
            if (employee.getId() == id) {
                return employee;
            }
        }

        throw new TeamException("未找到该员工信息");
    }


}
```



TeamService

```java
package com.yixihan.project3.service;

import com.yixihan.project3.domain.Architect;
import com.yixihan.project3.domain.Designer;
import com.yixihan.project3.domain.Employee;
import com.yixihan.project3.domain.Programmer;

import static com.yixihan.project3.service.Status.*;

/**
 * 关于开发团队成员的管理：添加、删除等
 *
 * @author yixihan
 */
public class TeamService {

    /**
     * 用来为开发团队新增成员自动生成团队中的唯一ID，即memberId
     */
    private static int counter = 1;

    /**
     * 表示开发团队最大成员数
     */
    private final int MAX_MEMBER = 5;

    /**
     * 用来保存当前团队中的各成员对象
     */
    private Programmer[] team = new Programmer[MAX_MEMBER];

    /**
     * 记录团队成员的实际人数
     */
    private int total = 0;


    /**
     * 空参构造
     */
    public TeamService() { }


    /**
     * 返回队伍所有成员信息
     * @return 队伍所有成员信息
     */
    public Programmer[] getTeam () {
        Programmer[] team = new Programmer[total];

        System.arraycopy(this.team, 0, team, 0, team.length);

        return team;
    }


    /**
     * 添加成员
     * 失败信息包含以下几种：
     * 成员已满，无法添加
     * 该成员不是开发人员，无法添加
     * 该员工已在本开发团队中
     * 该员工已是某团队成员
     * 该员正在休假，无法添加
     * 团队中至多只能有一名架构师
     * 团队中至多只能有两名设计师
     * 团队中至多只能有三名程序员
     */
    public void addMember (Employee employee) throws TeamException {

        // 成员已满，无法添加
        if (total >= MAX_MEMBER) {
            throw new TeamException("成员已满，无法添加");
        }
        // 该成员不是开发人员，无法添加
        if (! (employee instanceof Programmer)) {
            throw new TeamException("该成员不是开发人员，无法添加");
        }
        // 该员工已在本开发团队中
        if (isExist(employee.getId())) {
            throw new TeamException("该员工已在本开发团队中");
        }

        Programmer programmer = (Programmer) employee;
        // 该员工已是某团队成员
        if (BUSY.equals(programmer.getStatus())) {
            throw new TeamException("该员工已是某团队成员");
        }
        // 该员正在休假，无法添加
        if (VOCATION.equals(programmer.getStatus())) {
            throw new TeamException("该员正在休假，无法添加");
        }
        // 团队中至多只能有一名架构师
        // 团队中至多只能有两名设计师
        // 团队中至多只能有三名程序员

        // 架构师数量
        int architectCount = 0;
        // 设计师数量
        int designerCount = 0;
        // 程序员数量
        int programmerCount = 0;

        for (int i = 0; i < total; i++) {

            if (team[i] instanceof Architect) {
                architectCount++;
            } else if (team[i] instanceof Designer) {
                designerCount++;
            } else {
                programmerCount++;
            }

        }

        if (employee instanceof Architect ) {
            if (architectCount >= 1) {
                throw new TeamException("团队中至多只能有一名架构师");
            }
        } else if (employee instanceof Designer) {
            if (designerCount >= 2) {
                throw new TeamException("团队中至多只能有两名设计师");
            }
        } else {
            if (programmerCount >= 3) {
                throw new TeamException("团队中至多只能有三名程序员");
            }
        }


        // employee 的属性赋值
        programmer.setStatus(BUSY);
        programmer.setMemberId(counter++);

        // 将 employee 添加到现有的 team 中
        team[total++] = programmer;

    }


    /**
     * 判断指定 id 的员工是否在组内
     * @param id id
     * @return true : 在组内 ; false : 不在组内
     */
    public boolean isExist (int id){
        for (int i = 0; i < total; i++) {
            if (team[i].getId() == id) {
                return true;
            }
        }

        return false;
    }




    /**
     * 删除成员
     * @param memberId 成员在组内的id
     */
    public void removeMember (int memberId) throws TeamException {

        int i;
        for ( i = 0; i < total; i++) {
            if (team[i].getMemberId() == memberId) {
                team[i].setStatus(FREE);
                break;
            }
        }

        // 未找到指定 numberId 的情况
        if (i >= total) {
            throw new TeamException("找不到指定memberId的员工，删除失败");
        }

        // 删除元素
        if (total - (i + 1) >= 0) {
            System.arraycopy(team, i + 1, team, i + 1 - 1, total - (i + 1));
            team[--total] = null;
        }
    }
}
```



### view 包



TeamView

```java
package com.yixihan.project3.view;

import com.yixihan.project3.domain.Employee;
import com.yixihan.project3.domain.Programmer;
import com.yixihan.project3.service.NameListService;
import com.yixihan.project3.service.TeamException;
import com.yixihan.project3.service.TeamService;
import com.yixihan.project3.util.TSUtility;

/**
 * @author yixihan
 */
public class TeamView {

    private NameListService listSvc;

    private TeamService teamService;

    public TeamView() throws TeamException {
        listSvc = new NameListService();
        teamService = new TeamService();
    }


    /**
     * 主界面显示及控制方法
     */
    public void enterMainMenu () {

        boolean loopFlag = true;
        char menu = 0;
        while (loopFlag) {

            if (menu != '1') {
                listAllEmployees();
            }
            System.out.println("-----------------------------------------------------------------------------------------");
            System.out.println("1-团队列表  2-添加团队成员  3-删除团队成员 4-退出   请选择(1-4)： _");

            menu = TSUtility.readMenuSelection();

            switch (menu) {
                case '1' :
                    getTeam();
                    break;
                case '2' :
                    addMember();
                    break;
                case '3' :
                    deleteMember();
                    break;
                case '4' :
                    System.out.println("是否要退出(Y/N) : ");
                    char isExit = TSUtility.readConfirmSelection();
                    if ('Y'== isExit) {
                        loopFlag = false;
                    }
                    break;
                default:
                    throw new RuntimeException("输入错误, 请重新输入");
            }
        }


    }


    /**
     * 以表格形式列出公司所有成员
     */
    private void listAllEmployees () {
        System.out.println("-------------------------------------开发团队调度软件--------------------------------------\n");
        System.out.println("ID\t姓名\t年龄\t工资\t职位\t状态\t奖金\t股票\t领用设备");

        Employee[] allEmployees = listSvc.getAllEmployees();

        if (allEmployees == null || allEmployees.length == 0) {
            System.out.println("公司中没有任何员工信息");
        }

        for (Employee employee : allEmployees) {

            System.out.println(employee);
        }


    }


    /**
     * 显示团队成员列表操作
     */
    private void getTeam () {
        System.out.println("---------------------团队成员列表---------------------\n");

        Programmer[] team = teamService.getTeam();

        if (team.length == 0) {
            System.out.println("开发团队中目前没有成员");
        } else {

            System.out.println("TID/ID\t\t姓名\t\t年龄\t工资\t\t职位\t\t奖金\t\t股票\n");
            for (Programmer programmer : team) {
                System.out.println(programmer.getDetailsForTeam());
            }

        }


        System.out.println("----------------------------------------------------\n");


    }


    /**
     * 实现添加成员操作
     */
    private void addMember () {
        System.out.println("---------------------添加成员---------------------");
        System.out.println("请输入要添加的员工ID : ");
        int id = TSUtility.readInt();

        try {
            Employee employee = listSvc.getEmployee(id);

            teamService.addMember(employee);
        } catch (TeamException e) {
            System.out.println("添加失败，原因 : " + e.getMessage());
        }

        System.out.println("添加成功");

        TSUtility.readReturn();
    }


    /**
     * 实现删除成员操作
     */
    private void deleteMember () {
        System.out.println("请输入要删除员工的TID : ");
        int memberId = TSUtility.readInt();
        System.out.println("确认是否删除(Y/N)");
        char isDelete = TSUtility.readConfirmSelection();

        if ('N' == isDelete) {
            return;
        }
        try {
            teamService.removeMember(memberId);
            System.out.println("删除成功");

        } catch (TeamException e) {
            System.out.println("删除失败, 原因 : " + e.getMessage());
        } finally {
            TSUtility.readReturn();
        }

    }

    public static void main(String[] args) {

        try {
            TeamView view = new TeamView();

            view.enterMainMenu();
        } catch (TeamException e) {
            System.out.println(e.getMessage());
        }
    }
}
```





### junit 包



NameListServiceTest

```java
package com.yixihan.project3.junit;

import com.yixihan.project3.domain.Employee;
import com.yixihan.project3.service.NameListService;
import com.yixihan.project3.service.TeamException;
import org.junit.Test;

/**
 * 对 NameListServiceTest 进行测试
 *
 * @author yixihan
 */
public class NameListServiceTest {

    @Test
    public void testGetAllEmployees () {

        try {
            NameListService service = new NameListService();

            Employee[] allEmployees = service.getAllEmployees();

            for (Employee employee : allEmployees) {
                System.out.println(employee);
            }
        } catch (TeamException e) {
            e.printStackTrace();
        }

    }

    @Test
    public void testGetEmployee () {

        try {
            NameListService service = new NameListService();

            Employee employee = service.getEmployee(12);

            System.out.println(employee);
        } catch (TeamException e) {
            e.printStackTrace();
        }
    }
}
```



TeamServiceTest

```java
package com.yixihan.project3.junit;

import com.yixihan.project3.domain.Architect;
import com.yixihan.project3.domain.Programmer;
import com.yixihan.project3.service.NameListService;
import com.yixihan.project3.service.TeamException;
import com.yixihan.project3.service.TeamService;
import org.junit.Test;

/**
 * @author yixihan
 */
public class TeamServiceTest {

    @Test
    public void test1 () {

        Architect architect = new Architect();

        System.out.println(architect.getClass().getName());
    }

    @Test
    public void testAddMember () {

        try {
            NameListService nameListService = new NameListService();

            TeamService teamService = new TeamService();

            teamService.addMember(nameListService.getEmployee(2));
            teamService.addMember(nameListService.getEmployee(7));
            teamService.addMember(nameListService.getEmployee(9));

            teamService.removeMember(1);
            Programmer[] team = teamService.getTeam();

            for (Programmer programmer : team) {
                System.out.println(programmer);
            }



        } catch (TeamException e) {
            System.out.println(e.getMessage());
        }


    }
}
```



## 多线程



### 程序 进程 线程



#### 简介

> 程序(program)

程序(program)是为完成特定任务、用某种语言编写的一组指令的集合。即指一 段静态的代码，静态对象



> 进程(process)

进程(process)是程序的一次执行过程，或是正在运行的一个程序。是一个动态 的过程：有它自身的产生、存在和消亡的过程。——生命周期

- 如：运行中的QQ，运行中的MP3播放器
- 程序是静态的，进程是动态的
- 进程作为资源分配的单位，系统在运行时会为每个进程分配不同的内存区域



> 线程(thread)

线程(thread)，进程可进一步细化为线程，是一个程序内部的一条执行路径

- 若一个进程同一时间并行执行多个线程，就是支持多线程的
- 线程作为调度和执行的单位，每个线程拥有独立的运行栈和程序计数器(pc)，线程切换的开 销小
- 一个进程中的多个线程共享相同的内存单元/内存地址空间它们从同一堆中分配对象，可以 访问相同的变量和对象。这就使得线程间通信更简便、高效。但多个线程操作共享的系统资 源可能就会带来安全的隐患



#### 使用多线程的优点

- 提高应用程序的响应。对图形化界面更有意义，可增强用户体验。
- 提高计算机系统CPU的利用率
- 改善程序结构。将既长又复杂的进程分为多个线程，独立运行，利于理解和 修改



#### 何时需要多线程

- 程序需要同时执行两个或多个任务
- 程序需要实现一些需要等待的任务时，如用户输入、文件读写 操作、网络操作、搜索等
- 需要一些后台运行的程序时



### 线程的创建和使用



Java语言的JVM允许程序运行多个线程，它通过java.lang.Thread 类来体现



> Thread类的特性

- 每个线程都是通过某个特定Thread对象的run()方法来完成操作的，经常 把run()方法的主体称为线程体
- 每个线程都是通过某个特定Thread对象的run()方法来完成操作的，经常 把run()方法的主体称为线程体



#### Thread类



> 构造器

- Thread()：创建新的Thread对象
- Thread(String threadname)：创建线程并指定线程实例名
- Thread(Runnable target)：指定创建线程的目标对象，它实现了Runnable接 口中的run方法
- Thread(Runnable target, String name)：创建新的Thread对象



#### API中创建线程的两种方式



##### JDK1.5之前创建新执行线程有两种方法

- 继承Thread类的方式
- 实现Runnable接口的方式



##### 方式一：继承Thread类

1.  定义子类继承Thread类。 
2.  子类中重写Thread类中的run方法。 
3.  创建Thread子类对象，即创建了线程对象。 
4.   调用线程对象start方法：启动线程，调用run方法。



==注意点 :==

- 如果自己手动调用run()方法，那么就只是普通方法，没有启动多线程模式
- run()方法由JVM调用，什么时候调用，执行的过程控制都有操作系统的CPU 调度决定
- 想要启动多线程，必须调用start方法
- 一个线程对象只能调用一次start()方法启动，如果重复调用了，则将抛出以上 的异常“IllegalThreadStateException”。



##### 方式二：实现Runnable接口

1.  定义子类，实现Runnable接口。 
2.  子类中重写Runnable接口中的run方法。 
3.  通过Thread类含参构造器创建线程对象。 
4.  将Runnable接口的子类对象作为实际参数传递给Thread类的构造器中。 
5.  调用Thread类的start方法：开启线程，调用Runnable子类接口的run方法。



##### 继承方式和实现方式的联系与区别



```java
public class Thread extends Object implements Runnable
```



- 区别
  - 继承Thread：线程代码存放Thread子类run方法中
  - 实现Runnable：线程代码存在接口的子类的run方法
- 实现方式的好处
  - 避免了单继承的局限性
  - 多个线程可以共享同一个接口实现类的对象，非常适合多个相同线 程来处理同一份资源



##### 方式一代码实现



```java
package com.yixihan.day1022.multithreading;

/**
 * 多线程的创建,  方式一 : 继承于 Thread 类
 *
 * 1. 创建一个继承于 Thread 类的子类
 * 2. 重写 Thread 类的 run() 方法 ---> 将此线程执行的操作声明在 run() 中
 * 3. 创建 Thread 类的子类的对象
 * 4. 通过此对象调用 start()
 * <p></p>
 * 例子 : 遍历 100 以内的偶数
 *
 *
 * 问题 :
 *      1. 我们不能通过直接调用 run() 方法的方式启动一个新的线程
 *      2. 不可以还让已经 start() 的线程再去 start() 一次, 会报 IllegalThreadStateException 异常
 *         我们需要重新创建一个线程的对象去 start() 启动新的线程
 * @author : yixihan
 * @create : 2021-10-22-20:23
 */
public class ThreadTest {

    public static void main(String[] args) {

        // 3. 创建 Thread 类的子类的对象
        MyThread myThread = new MyThread();

        // 4. 通过此对象调用 start() : 1. 启动当前线程 2. 调用当前线程的 run() 方法
        myThread.start();

        // 不能直接调 run() 方法
        // myThread.run();

        // myThread.start();

        MyThread myThread1 = new MyThread();
        myThread1.start();


        // 如下的操作仍然是在 main 线程中执行的
        for (int i = 0; i < 100; i++) {

            if (i % 2 != 0) {
                System.out.println(i + " : 1 线程 : " );
            }
        }
    }
}


/**
 * 1. 创建一个继承于 Thread 类的子类
 */
class MyThread extends Thread {

    public MyThread() { }

    /**
     * 2. 重写 run() 方法
     */
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {

            if (i % 2 == 0) {
                System.out.println(i + " 2 线程 : " + Thread.currentThread().getName());
            }
        }
    }


}
```



##### 方式二代码实现



```java
package com.yixihan.day1022.multithreading;

/**
 * 创建多线程的方式二 : 直线 Runnable 接口
 *      1. 创建了一个实现了 Runnable 接口的类
 *      2. 实现类去实现  Runnable 中的抽象方法 : run()
 *      3. 创建实现类的对象
 *      4. 将此对象作为参数传递到 Thread 类的构造器中, 创建 Thread 类的对象
 *      5. 通过 Thread 类的对象调用 start() 方法启动线程
 * @author : yixihan
 * @create : 2021-10-22-21:56
 */
public class ThreadTest1 {

    public static void main(String[] args) {

        // 3. 创建实现类的对象
        MtThread mtThread = new MtThread();

        // 4. 将此对象作为参数传递到 Thread 类的构造器中, 创建 Thread 类的对象
        Thread thread1 = new Thread(mtThread);

        // 5. 通过 Thread 类的对象调用 start() 方法启动线程 : 1. 启动线程 2. 调用当前线程的 run () --->
        // 调用了 Runnable 类型的 target 的 run()
        thread1.setName("线程1");
        thread1.start();

        // 再创建一个进程
        Thread thread2 = new Thread(mtThread);
        thread2.setName("线程2");
        thread2.start();

    }
}

/**
 * 1. 创建了一个实现了 Runnable 接口的类
 */
class MtThread implements Runnable {

    /**
     * 2. 实现类去实现  Runnable 中的抽象方法 : run()
     */
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {

            if (i % 2 == 0) {
                System.out.println(i + " : " + Thread.currentThread().getName() + " : " + Thread.currentThread().getPriority());
            }
        }
    }
}
```



#### Thread类的有关方法



![image-20211022190140209](/assets/imgs/JavaSE3.assets/image-20211022190140209.png)

![image-20211022190222332](/assets/imgs/JavaSE3.assets/image-20211022190222332.png)



```java
package com.yixihan.day1022.multithreading;

/**
 * 测试 Thread 中的常用方法
 *
 * 1. start () : 启动当前线程; 调用当前线程的 run() 方法
 * 2. run () : 通常需要重写 Thread 类中的此方法, 将创建的线程需要执行的操作声明在此方法中
 * 3. currentThread () : 静态方法, 放回执行当前代码的线程
 * 4. getName () : 获取当前线程的名字
 * 5. setName () : 设置当前线程的名字
 * 6. yield () : 释放当前 cpu 的执行权
 * 7. join () : 在线程 A 中, 调用线程 B 的 join() 方法, 此时线程 A 处于阻塞状态, 直到线程 B 完成执行完之后, 线程 A 才结束 阻塞状态
 * 8. stop () : (已过时) 当执行此方法时, 强制结束此线程
 * 9. sleep (long millitime) : 让当前线程 "睡眠" 指定的 milltime 毫秒, 在指定的 milltime 毫秒时间内, 当前线程处于阻塞状态
 * 10. isAlive () : 判断当前线程是否存活
 *
 *
 *
 * @author : yixihan
 * @create : 2021-10-22-20:53
 */
public class ThreadMethodTest {

    public static void main(String[] args) {

        HelloThread helloThread = new HelloThread("线程 : 1");


        helloThread.start();

        Thread.currentThread().setName("主线程");

        for (int i = 0; i < 100; i++) {

            if (i % 2 != 0) {

                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println(i + " : " + Thread.currentThread().getName());
                System.out.println(helloThread.isAlive());

            }

            if (i == 20) {
                try {
                    helloThread.join();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }

        System.out.println(helloThread.isAlive());
    }
}

class HelloThread extends Thread {

    public HelloThread(String name) {
        super(name);
    }

    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {

            if (i % 2 == 0) {
                System.out.println(i + " : " + Thread.currentThread().getName());

                try {
                    sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }

            /*if (i % 20 == 0) {
                yield();
            }*/
        }
    }
}


```



#### 线程的调度



>调度策略

- 时间片![image-20211022212722527](/assets/imgs/JavaSE3.assets/image-20211022212722527.png)

- 抢占式：高优先级的线程抢占CPU



> Java的调度方法

- 同优先级线程组成先进先出队列（先到先服务），使用时间片策略
- 对高优先级，使用优先调度的抢占式策略



##### 线程的优先级

- 线程的优先级等级
  - MAX_PRIORITY：**10**
  - MIN _PRIORITY：**1** 
  - NORM_PRIORITY：**5** 



- 涉及的方法
  - getPriority() ：返回线程优先值
  - setPriority(int newPriority) ：改变线程的优先级



- 说明
  - 线程创建时继承父线程的优先级
  - 低优先级只是获得调度的概率低，并非一定是在高优先级线程之后才被调用



```java
package com.yixihan.day1022.multithreading;

/**
 *
 * 线程的优先级 :
 *      1. 线程的优先级分为 10 个等级
 *          - MAX_PRIORITY：10
 *          - MIN _PRIORITY：1
 *          - NORM_PRIORITY：5 ---> 默认优先级
 *
 *      2. 如何获取和设置当前线程的优先级
 *              getPriority () : 获取线程的优先级
 *              setPriority () : 设置线程的优先级
 *
 *              高优先级的线程要抢占低优先级线程 cpu 的执行权, 但是只是从概率上将, 高优先级的线程高概率的情况下呗执行
 *              并不意味着只有当高优先级的线程执行玩以后, 低优先级的线程才被执行
 * @author : yixihan
 * @create : 2021-10-22-21:33
 */
public class PriorityTest {

    public static void main(String[] args) {

        PriorityThread thread = new PriorityThread("线程 : 1");
        Thread.currentThread().setName("线程 : 2");

        // 设置分线程的优先级
        thread.setPriority(Thread.MAX_PRIORITY);
        Thread.currentThread().setPriority(Thread.MIN_PRIORITY);

        thread.start();

        for (int i = 0; i < 100; i++) {

            if (i % 2 != 0) {
                System.out.println(i + " : " + Thread.currentThread().getName() + " : " + Thread.currentThread().getPriority());
            }
        }
    }
}

class PriorityThread extends Thread {

    public PriorityThread(String name) {
        super(name);
    }

    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {

            if (i % 2 == 0) {
                System.out.println(i + " : " + getName() + " : " + getPriority());
            }
        }
    }
}
```



#### 补充：线程的分类



Java中的线程分为两类：一种是==守护线程==，一种是==用户线程==。



- 它们在几乎每个方面都是相同的，唯一的区别是判断JVM何时离开
- 守护线程是用来服务用户线程的，通过在start()方法前调用 **thread.setDaemon(true)**可以把一个用户线程变成一个守护线程
- Java垃圾回收就是一个典型的守护线程。
- 若JVM中都是守护线程，当前JVM将退出。
- 形象理解：==兔死狗烹，鸟尽弓藏==



#### 总结 

```java
package com.yixihan.day1022.multithreading;

/**
 * 比较创建线程的两种方式
 *      开发中优先选择实现 Runnable 接口的方式
 *      原因 :
 *          1. 实现的方式没有类的单继承性的局限性
 *          2. 实现的方式更适合来处理多个线程有共享数据的情况
 *
 *      联系 :
 *          1. Thread 类本身也是实现了 Runnable 接口
 *          2. 不管是继承 还是 实现, 两种方式都是实现了 run() 方法, 并将线程要执行的逻辑操作放在 run() 方法中
 *
 * @author : yixihan
 * @create : 2021-10-22-22:16
 */
public class EqualThread {
}
```



#### 练习



##### 练习1



```java
package com.yixihan.day1022.multithreading.exer.test1;

/**
 * 创建两个分线程, 其中一个线程遍历 100 以内的偶数, 另一个遍历 100 以内的奇数
 *
 * @author : yixihan
 * @create : 2021-10-22-20:45
 */
public class ThreadDemo {

    public static void main(String[] args) {

        OddThread oddThread = new OddThread();
        EvenThread evenThread = new EvenThread();

        oddThread.start();
        evenThread.start();

        // 创建 Thread 类的非匿名子类的匿名对象的方式
        new OddThread().start();
        new EvenThread().start();

        // 创建 Thread 类的匿名子类的匿名对象的方式
        new Thread(() -> {
            for (int i = 0; i < 100; i++) {
                if (i % 2 != 0) {
                    System.out.println(i + " : " + Thread.currentThread().getName());
                }
            }
        }).start();
    }
}

class OddThread extends Thread {

    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            if (i % 2 != 0) {
                System.out.println(i + " : " + Thread.currentThread().getName());
            }
        }
    }
}

class EvenThread extends Thread {

    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            if (i % 2 == 0) {
                System.out.println(i + " : " + Thread.currentThread().getName());
            }
        }
    }
}
```



##### 练习2



```java
package com.yixihan.day1022.multithreading;

/**
 * 例子 : 创建三个窗口买票, 总票数为 100 张
 * (线程不安全)
 * @author : yixihan
 * @create : 2021-10-22-21:46
 */
public class WindowTest {

    public static void main(String[] args) {

        // 方式一

        Window window1 = new Window("窗口一");
        Window window2 = new Window("窗口二");
        Window window3 = new Window("窗口三");

        window1.start();
        window2.start();
        window3.start();




        // 方式二
        Window1 target = new Window1();

        Thread thread1 = new Thread(target, "窗口一");
        Thread thread2 = new Thread(target, "窗口二");
        Thread thread3 = new Thread(target, "窗口三");

        thread1.start();
        thread2.start();
        thread3.start();


    }
}


/**
 * 方式一 : 继承 Thread 类
 */
class Window extends Thread {

    private static int ticket = 100;

    public Window(String name) {
        super(name);
    }

    @Override
    public void run() {
        while (ticket >= 0) {
            System.out.println(getName() + " : 卖票, 票号为 : " + ticket--);
        }
    }
}

/**
 * 方式二 : 实现 Runnable 接口
 */
class Window1 implements Runnable {

    int ticket = 100;

    @Override
    public void run() {
        while (ticket >= 0) {
            System.out.println(Thread.currentThread().getName() + " : 卖票, 票号为 : " + ticket--);
        }
    }
}
```



### 线程的生命周期



#### 简介



> JDK中用Thread.State类定义了线程的几种状态

要想实现多线程，必须在主线程中创建新的线程对象。Java语言使用Thread类 及其子类的对象来表示线程，在它的一个完整的生命周期中通常要经历如下的五 种状态：

- ==新建==： 当一个Thread类或其子类的对象被声明并创建时，新生的线程对象处于新建 状态
- ==就绪==：处于新建状态的线程被start()后，将进入线程队列等待CPU时间片，此时它已 具备了运行的条件，只是没分配到CPU资源
- ==运行==：当就绪的线程被调度并获得CPU资源时,便进入运行状态， run()方法定义了线 程的操作和功能
- ==阻塞==：在某种特殊情况下，被人为挂起或执行输入输出操作时，让出 CPU 并临时中 止自己的执行，进入阻塞状态
- ==死亡==：线程完成了它的全部工作或线程被提前强制性地中止或出现异常导致结束



**图解**

![image-20211023140302336](/assets/imgs/JavaSE3.assets/image-20211023140302336.png)

![image-20211023140319147](/assets/imgs/JavaSE3.assets/image-20211023140319147.png)







### 线程的同步



> 问题的提出

- 多个线程执行的不确定性引起执行结果的不稳定
- 多个线程对账本的共享，会造成操作的不完整性，会破坏数据

![image-20211023140505553](/assets/imgs/JavaSE3.assets/image-20211023140505553.png)



#### 图解

![image-20211023153343545](/assets/imgs/JavaSE3.assets/image-20211023153343545.png)

![image-20211023153352394](/assets/imgs/JavaSE3.assets/image-20211023153352394.png)



#### Synchronized的使用方法

Java对于多线程的安全问题提供了专业的解决方式：==同步机制==



- 方式一 : ==同步代码块== 

```java
synchronized (对象){
    // 需要被同步的代码；
}
```

- 方式二 : ==同步方法==

```java
public synchronized void show (String name){
    ….
}

```



#### 同步机制中的锁



> 同步锁机制

在《Thinking in Java》中，是这么说的：对于并发工作，你需要某种方式来防 止两个任务访问相同的资源（其实就是共享资源竞争）。 防止这种冲突的方法 就是当资源被一个任务使用时，在其上加锁。第一个访问某项资源的任务必须 锁定这项资源，使其他任务在其被解锁之前，就无法访问它了，而在其被解锁 之时，另一个任务就可以锁定并使用它了。



> synchronized的锁是什么？

- 任意对象都可以作为同步锁。所有对象都自动含有单一的锁（监视器）。 
- 同步方法的锁：静态方法（类名.class）、非静态方法（this） 
-  同步代码块：自己指定，很多时候也是指定为this或类名.class



==注意==

- 必须确保使用同一个资源的==多个线程共用一把锁==，这个非常重要，否则就 无法保证共享资源的安全
- 一个线程类中的所有静态方法共用同一把锁（类名.class），所有非静态方 法共用同一把锁（this），同步代码块（指定需谨慎）



#### 同步的范围



> 如何找问题，即代码是否存在线程安全？（非常重要）

- 明确哪些代码是多线程运行的代码
- 明确多个线程是否有共享数据 
- 明确多线程运行代码中是否有多条语句操作共享数据



> 如何解决呢？（非常重要）

对多条操作共享数据的语句，只能让一个线程都执行完，在执行过程中，其 他线程不可以参与执行。

 即所有操作共享数据的这些语句都要放在同步范围中





> 切记

- 范围太小：没锁住所有有安全问题的代码
- 范围太大：没发挥多线程的功能



#### 释放锁的操作

- 当前线程的同步方法、同步代码块执行结束
- 当前线程在同步代码块、同步方法中遇到break、return终止了该代码块、 该方法的继续执行
- 当前线程在同步代码块、同步方法中出现了未处理的Error或Exception，导 致异常结束
- 当前线程在同步代码块、同步方法中执行了线程对象的==wait()==方法，当前线 程暂停，并释放锁



#### 不会释放锁的操作

- 线程执行同步代码块或同步方法时，程序调用==Thread.sleep()==、 ==Thread.yield()==方法暂停当前线程的执行
- 线程执行同步代码块时，其他线程调用了该线程的suspend()方法将该线程 挂起，该线程不会释放锁（同步监视器）。
  - 应尽量避免使用suspend()和resume()来控制线程





#### 方式一的代码实现



##### 用 Runnable 接口的方式

```java
package com.yixihan.day1023;

/**
 * 例子 : 创建三个窗口买票, 总票数为 100 张, 用 Runnable 接口的方式
 *
 * 1. 问题 : 买票的过程中, 出现了重票, 错票 ---> 出现了线程的安全问题
 * 2. 问题出现的原因 : 当某个线程操作车票的过程中, 尚未操作完成时, 其他线程参与进来, 也操作车票
 * 3. 如何解决 : 当一个线程 A 在操作共享数据的时候, 其他线程不能参与进来, 直到线程 A 操作玩共享数据之后, 其他线程才可以操作共享数据
 *    这种情况, 即使线程 A 出现了阻塞, 也不能改变
 *
 * 4. 在 Java 中, 我们通过同步机制, 来解决线程的安全问题
 *      方式一 : 同步代码块
 *
 *      synchronized (同步监视器) {
 *          // 需要被同步的代码
 *      }
 *
 *      说明 : 操作共享数据的代码即为需要被同步的代码   ---不能包含代码多了, 也不能包含代码少了
 *             共享数据 : 多个线程共同操作的变量, 比如 : ticket
 *             同步监视器, 俗称 : 锁, 任何一个类的对象都可以来充当锁
 *                  要求 : 要求多个线程必须要共用同一把锁
 *
 *             补充 : 在实现 Runnable 接口创建多线程的方式中, 我们可以考虑使用 this 充当同步监视器
 *
 *      方式二 : 同步方法
 *          如果操作共享数据的代码完整的声明在一个方法中, 我们不妨将次方法声明为同步的
 *
 *
 * 5. 同步的方式, 解决了线程的安全问题 --- 好处
 *    操作同步代码时, 只能有一个线程参与, 其他线程等待, 相当于是一个单线程的过程, 效率低 --- 局限性
 * @author : yixihan
 * @create : 2021-10-22-21:46
 */
public class WindowTest {

    public static void main(String[] args) {

        // 方式二
        Window target = new Window();

        Thread thread1 = new Thread(target, "窗口一");
        Thread thread2 = new Thread(target, "窗口二");
        Thread thread3 = new Thread(target, "窗口三");

        thread1.start();
        thread2.start();
        thread3.start();
    }
}


/**
 * 实现 Runnable 接口
 */
class Window implements Runnable {

    int ticket = 100;
    final Object obj = new Object();

    @Override
    public void run() {

        // 用这个 o 不行
        // Object o = new Object();

        // 用当前对象去充当
        while (true) {
            synchronized (Window2.class) {

                if (ticket > 0) {

                    try {
                        Thread.sleep(10);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    System.out.println(Thread.currentThread().getName() + " : 卖票, 票号为 : " + ticket--);
                } else {
                    break;
                }
            }
        }
    }
}
```



##### 用继承 Thread 类的方式

```java
package com.yixihan.day1023;


/**
 * 例子 : 创建三个窗口买票, 总票数为 100 张, 用继承 Thread 类的方式
 *
 * 说明 : 在继承 Thread 类创建多线程的方式中, 慎用 this 充当同步监视器, 可以考试使用当前类充当同步监视器
 *
 *
 *
 * @author : yixihan
 * @create : 2021-10-23-15:01
 */
public class WindowTest2 {

    public static void main(String[] args) {

        // 方式一

        Window2 window1 = new Window2("窗口一");
        Window2 window2 = new Window2("窗口二");
        Window2 window3 = new Window2("窗口三");

        window1.start();
        window2.start();
        window3.start();

    }
}

class Window2 extends Thread {

    private static int ticket = 100;
    // private static Object obj = new Object();

    public Window2(String name) {
        super(name);
    }

    @Override
    public void run() {
        // 错误的, this 代表 window1 window2 window3 三个对象
        // synchronized (this) {
        // 正确的, 类.class 也是对象, 而却 Window2 只会被加载一次
        while (true) {
            synchronized (Window2.class) {

                if (ticket > 0) {

                    try {
                        Thread.sleep(10);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    System.out.println(getName() + " : 卖票, 票号为 : " + ticket--);
                } else {
                    break;
                }
            }
        }
    }
}
```





#### 方式二的代码实现



##### 用 Runnable 接口的方式

```java
package com.yixihan.day1023;

/**
 * 使用同步方法来解决实现 Runnable 接口的方式解决线程安全的问题
 *
 * 关于同步方法的总结 :
 *      1. 同步方法仍然涉及到同步监视器, 只是不需要我们显式的声明
 *      2. 非静态的同步方法, 同步监视器 : this
 *         静态的同步方法, 同步监视器 : 当前类本身 (类.class)
 *
 * @author : yixihan
 * @create : 2021-10-23-15:18
 */
public class WindowTest3 {
    public static void main(String[] args) {

        // 方式二
        Window3 target = new Window3();

        Thread thread1 = new Thread(target, "窗口一");
        Thread thread2 = new Thread(target, "窗口二");
        Thread thread3 = new Thread(target, "窗口三");

        thread1.start();
        thread2.start();
        thread3.start();
    }
}


/**
 * 实现 Runnable 接口
 */
class Window3 implements Runnable {

    int ticket = 10000;

    @Override
    public void run() {

        while (true) {
            show();

            if (ticket <= 0) {
                break;
            }
        }
    }


    /**
     * 同步监视器是 this
     */
    private synchronized void show () {
        if (ticket > 0) {

            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println(Thread.currentThread().getName() + " : 卖票, 票号为 : " + ticket--);
        }
    }
}
```



##### 用继承 Thread 类的方式

```java
package com.yixihan.day1023;

/**
 * 使用同步方法来解决继承 Thread 类的方式解决线程安全的问题
 *
 * @author : yixihan
 * @create : 2021-10-23-15:24
 */
public class WindowTest4 {

    public static void main(String[] args) {
        Window4 window1 = new Window4("窗口一");
        Window4 window2 = new Window4("窗口二");
        Window4 window3 = new Window4("窗口三");

        window1.start();
        window2.start();
        window3.start();
    }
}

class Window4 extends Thread {

    private static int ticket = 100;

    public Window4(String name) {
        super(name);
    }

    @Override
    public void run() {
        do {
            show();

        } while (ticket > 0);

        System.out.println(ticket);
    }

    /**
     * 锁的问题 : 需要更换 将 show 方法更换为 静态方法
     * 同步监视器  :  window1 window2 window3
     * 变成静态方法后, 同步监视器变为了 Window4.class
     */
    private static synchronized void show () {

        if (ticket > 0) {
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + " : 卖票, 票号为 : " + ticket--);
        }
    }
}
```



#### 单例模式懒汉式实现线程不安全的解决之法



```java
package com.yixihan.day1023.singlecasetest;

/**
 * 使用同步机制将单例模式中的懒汉式改写为线程安全的
 *
 * @author : yixihan
 * @create : 2021-10-23-15:46
 */
public class BankTest {
}


class Bank {

    private Bank() {}

    private static Bank instance = null;

    /*
    方式一 : 同步方法 效率较差
    public static synchronized Bank getInstance() {

        if (instance == null) {
            instance = new Bank();
            return instance;
        }
        return instance;
    }
    */

    /**
     * 方式二 : 同步代码块块
     */
    public static Bank getInstance() {

        // 方式一 : 效率较差
//        synchronized (Bank.class) {
//            if (instance == null) {
//                instance = new Bank();
//                return instance;
//            }
//        }
//        return instance;


        // 方式二 : 效率更高
        if (instance == null) {
            synchronized (Bank.class) {
                if (instance == null) {
                    instance = new Bank();
                    return instance;
                }
            }
        }
        return instance;
    }
}
```



#### 线程的死锁问题



> 死锁

- 不同的线程分别占用对方需要的同步资源不放弃，都在等待对方放弃 自己需要的同步资源，就形成了线程的死锁
- 出现死锁后，不会出现异常，不会出现提示，只是所有的线程都处于 阻塞状态，无法继续



> 解决方法

- 专门的算法、原则
- 尽量减少同步资源的定义
- 尽量避免嵌套同步



##### 举例



###### 例子1

```java
package com.yixihan.day1023.deadlock;

/**
 * 演示线程的死锁的问题
 *
 * 1. 死锁的理解 : 不同的线程分别占用对方需要的同步资源不放弃，都在等待对方放弃
 * 自己需要的同步资源，就形成了线程的死锁
 *
 *
 * 2. 说明 :
 *      1. 出现死锁之后, 不会出现异常, 不会出现提示, 只是所有的线程都处于阻塞状态, 无法继续
 *      2. 我们使用同步是, 要避免出现死锁
 *
 *
 * @author : yixihan
 * @create : 2021-10-23-16:00
 */
public class ThreadTest {

    public static void main(String[] args) {

        StringBuilder s1 = new StringBuilder();
        StringBuilder s2 = new StringBuilder();


        new Thread() {
            @Override
            public void run() {

                synchronized (s1) {
                    s1.append("A");
                    s2.append("1");

                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    synchronized (s2) {
                        s1.append("B");
                        s2.append("2");

                        System.out.println(s1);
                        System.out.println(s2);
                    }
                }
            }
        }.start();


        new Thread(new Runnable() {
            @Override
            public void run() {
                synchronized (s2) {
                    s1.append("C");
                    s2.append("3");

                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    synchronized (s1) {
                        s1.append("D");
                        s2.append("4");

                        System.out.println(s1);
                        System.out.println(s2);
                    }
                }
            }
        }).start();
    }
}
```



###### 例子2

```java
package com.yixihan.day1023.deadlock;

class A {
   /**
    * 同步监视器 : A.class
    */
   public synchronized void foo(B b) {
      System.out.println("当前线程名: " + Thread.currentThread().getName()
            + " 进入了A实例的foo方法"); // ①

      try {
         Thread.sleep(200);
      } catch (InterruptedException ex) {
         ex.printStackTrace();
      }

      System.out.println("当前线程名: " + Thread.currentThread().getName()
            + " 企图调用B实例的last方法"); // ③

      b.last();
   }

   /**
    * 同步监视器 : A.class
    */
   public synchronized void last() {
      System.out.println("进入了A类的last方法内部");
   }
}

class B {

   /**
    * 同步监视器 : B.class
    */
   public synchronized void bar(A a) {
      System.out.println("当前线程名: " + Thread.currentThread().getName()
            + " 进入了B实例的bar方法"); // ②

      try {
         Thread.sleep(200);
      } catch (InterruptedException ex) {
         ex.printStackTrace();
      }

      System.out.println("当前线程名: " + Thread.currentThread().getName()
            + " 企图调用A实例的last方法"); // ④

      a.last();
   }

   /**
    * 同步监视器 : B.class
    */
   public synchronized void last() {
      System.out.println("进入了B类的last方法内部");
   }
}

public class DeadLock implements Runnable {
   A a = new A();
   B b = new B();

   public void init() {
      Thread.currentThread().setName("主线程");
      // 调用a对象的foo方法
      a.foo(b);
      System.out.println("进入了主线程之后");
   }

   public void run() {
      Thread.currentThread().setName("副线程");
      // 调用b对象的bar方法
      b.bar(a);
      System.out.println("进入了副线程之后");
   }

   public static void main(String[] args) {
      DeadLock dl = new DeadLock();
      new Thread(dl).start();
      dl.init();
   }
}
```





#### Lock(锁)



##### 简介

从JDK 5.0开始，Java提供了更强大的线程同步机制——通过显式定义同 步锁对象来实现同步。同步锁使用Lock对象充当



java.util.concurrent.locks.Lock接口是控制多个线程对共享资源进行访问的 工具。锁提供了对共享资源的独占访问，每次只能有一个线程对Lock对象 加锁，线程开始访问共享资源之前应先获得Lock对象。



ReentrantLock 类实现了 Lock ，它拥有与 synchronized 相同的并发性和 内存语义，在实现线程安全的控制中，比较常用的是ReentrantLock，可以 显式加锁、释放锁。



例子

```java
// 注意：如果同步代码有异常，要将unlock()写入finally语句块
class A{
    private final ReentrantLock lock = new ReenTrantLock();
    public void m(){
        lock.lock();
        try{
            //保证线程安全的代码;
        }
        finally{
            lock.unlock();
        }
    }
}
```







#### synchronized 与 Lock 的对比



1.  Lock是显式锁（手动开启和关闭锁，别忘记关闭锁），synchronized是 隐式锁，出了作用域自动释放
2.  Lock只有代码块锁，synchronized有代码块锁和方法锁
3.  使用Lock锁，JVM将花费较少的时间来调度线程，性能更好。并且具有 更好的扩展性（提供更多的子类）



> 优先使用顺序：

Lock  ---> 同步代码块（已经进入了方法体，分配了相应资源）  --->  同步方法 （在方法体之外）



```java
package com.yixihan.day1023.locktest;

import java.util.concurrent.locks.ReentrantLock;

/**
 * 解决线程安全问题的方式三 : Lock 锁 --- JDK 5.0 新增
 * 步骤 :
 *      1. 实例化 ReentrantLock
 *      2. 调用 lock() 方法加锁
 *      3. 调用 unlock() 方法解锁
 *
 * synchronized 与 lock 的异同点 :
 *      相同点 :
 *          1. synchronized 与 lock 都能解决线程安全的问题
 *          2. synchronized 与 lock 在加锁范围内都是单线程执行
 *      不同点 :
 *          1. synchronized 机制在执行完想要的同步代码以后, 自动的释放同步监视器
 *             lock 需要手动的启动同步 (lock()) , 同时结束同步也需要手动的实现 (unlock())
 *          2. lock 的性能更高
 *
 * 优先使用顺序 :
 *      Lock  ---> 同步代码块（已经进入了方法体，分配了相应资源）  --->  同步方法 （在方法体之外）
 *
 * 如何解决线程安全问题 ? 有几种方式 ?
 *      三种
 *
 * @author : yixihan
 * @create : 2021-10-23-16:13
 */
public class LockTest {

    public static void main(String[] args) {

        Window window = new Window();

        new Thread(window, "窗口1").start();
        new Thread(window, "窗口2").start();
        new Thread(window, "窗口3").start();
    }
}


class Window implements Runnable {

    private int ticket = 100;

    // 1. 实例化 ReentrantLock
    private ReentrantLock lock = new ReentrantLock(true);

    @Override
    public void run() {
        while (true) {
            try {

                // 2. 调用 lock() 方法加锁
                lock.lock();

                if (ticket > 0) {

                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println(Thread.currentThread().getName() + "售票, 票号为 : " + ticket--);
                } else {
                    break;
                }
            } finally {

                // 3. 调用 unlock() 方法解锁
                lock.unlock();
            }
        }
    }
}
```



#### 练习



##### 练习1

```java
package com.yixihan.day1023.exer.test1;

import java.util.concurrent.locks.ReentrantLock;

/**
 *
 * 银行有一个账户。
 * 有两个储户分别向同一个账户存3000元，每次存1000，存3次。每次存完打印账户余额。
 *
 * 分析 :
 *      1. 是否是多线程问题 : 是, 两个储户线程
 *      2. 是否有共享数据 : 有, 账户 (账户余额)
 *      3. 是否有线程安全问题 : 有
 *      4. 需要考虑如何解决线程安全问题 : 同步机制 三种
 * @author : yixihan
 * @create : 2021-10-23-16:24
 */
public class AccountTest {

    public static void main(String[] args) {

        // 创建一个 account 对象
        Account account = new Account(0);

        // 创建一个 customer 对象 (实现了 Runnable 接口的 run 方法)
        Customer customer = new Customer(account);

        // 开启两个线程
        new Thread(customer, "张三").start();
        new Thread(customer, "李四").start();


    }
}

class Account{

    /**
     * 余额
     */
    private double balance;

    /**
     * 创建 lock 对象
     */
    private ReentrantLock lock = new ReentrantLock(true);


    /**
     * 全参构造, 初始化 余额
     * @param balance 余额
     */
    public Account(double balance) {
        this.balance = balance;
    }


    /**
     * 对于存钱这一操作, 进行加锁
     * @param money 存入的金额
     */
    public void deposit (double money) {
        try {

            // 加锁
            lock.lock();

            // 线程阻塞 1 秒
            Thread.sleep(1000);

            balance += money;
            System.out.println(Thread.currentThread().getName() + " 已存入 " + money + " 元, 现余额 " + balance + " 元");
        } catch (InterruptedException e) {
            System.out.println(e.getMessage());
        } finally {

            // 解锁
            lock.unlock();
        }
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}

class Customer implements Runnable {

    /**
     * 银行账户
     */
    private Account account;


    /**
     * 全参构造, 需确保传入的 Account 是同一个对象
     * @param account 银行账户
     */
    public Customer(Account account) {
        this.account = account;
    }

    /**
     * 重写 run 方法, 每个线程 进行三次存钱操作
     */
    @Override
    public void run() {
        for (int i = 0; i < 3; i++) {
            account.deposit(1000);
        }
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
```



### 线程的通信



- wait() 与 notify() 和 notifyAll()
  - wait()：令当前线程挂起并放弃CPU、同步资源并等待，使别的线程可访问并修改共享资源，而当 前线程排队等候其他线程调用notify()或notifyAll()方法唤醒，唤醒后等待重新获得对监视器的所有 权后才能继续执行
  - notify()：唤醒正在排队等待同步资源的线程中优先级最高者结束等待
  - notifyAll ()：唤醒正在排队等待资源的所有线程结束等待
- 这三个方法只有在synchronized方法或synchronized代码块中才能使用，否则会报 ==java.lang.IllegalMonitorStateException==异常。
- 因为这三个方法必须有锁对象调用，而任意对象都可以作为synchronized的同步锁， 因此这三个方法只能在Object类中声明。



#### wait() 方法



- 在当前线程中调用方法： 对象名.wait()
- 使当前线程进入等待（某对象）状态 ，直到另一线程对该对象发出 notify (或notifyAll) 为止
- 调用方法的必要条件：当前线程必须具有对该对象的监控权（加锁）
- ==调用此方法后，当前线程将释放对象监控权 ，然后进入等待==
- 在当前线程被notify后，要重新获得监控权，然后从断点处继续代码的执行



#### notify()/notifyAll()



- 在当前线程中调用方法： 对象名.notify()
- 功能：唤醒等待该对象监控权的一个/所有线程。
- 调用方法的必要条件：当前线程必须具有对该对象的监控权（加锁）



```java
package com.yixihan.day1023.signalcommunication;

import java.util.concurrent.locks.ReentrantLock;

/**
 * 线程通信的例子 : 使用两个线程打印 1-100 线程1, 线程2 交替打印
 *
 *
 * 涉及到的三个方法 :
 *      wait() : 一旦执行此方法, 当前线程就会进入阻塞状态, 并释放同步监视器
 *      notify() : 一档执行此方法, 就会唤醒被 wait 的一个线程, 如果有多个线程被 wait, 就唤醒优先级更高的那个线程
 *      notifyAll() : 一档执行此方法, 就会唤醒被 wait 的所有线程
 *
 *
 * 说明 :
 *      1. wait(), notify(), notifyAll() 这三个方法都必须使用在同步代码块或者同步方法中
 *      2. wait(), notify(), notifyAll() 这三个方法都是继承于 java.lang.Object 类
 *      3. wait(), notify(), notifyAll() 这三个方法的调用者必须是同步代码块或同步方法的同步监视器, 否则会出现 IllegalMonitorStateException 异常
 *
 *
 * 面试题 : sleep() 方法和 wait() 方法的异同
 *      1. 相同点 : 一旦执行这两个任一方法, 都会使得当前线程进入阻塞状态
 *      2. 不同点 :
 *              1. 两个方法声明的位置不同
 *                  Thread 类中声明 sleep()
 *                  Object 类中声明 wait()
 *              2. 调用的要求不同 :
 *                  sleep() 可以在任何需要的场景下调用
 *                  wait() 必须使用在同步代码块或者同步方法中
 *              3. 关于是否释放同步监视器的问题 : 如果两个方法都使用在同步代码块或同步方法中
 *                  sleep() 不会释放同步监视器
 *                  wait() 会释放同步监视器
 *
 *
 * @author : yixihan
 * @create : 2021-10-23-16:45
 */
public class CommunicationTest {

    public static void main(String[] args) {

        Number number = new Number();

        new Thread(number, "线程一").start();
        new Thread(number, "线程二").start();
    }
}


class Number implements Runnable {

    private int number = 1;

    private static final int MAX_NUMBER = 100;

    private ReentrantLock lock = new ReentrantLock();


    @Override
    public void run() {
        while (true) {


            synchronized (this) {
                notify();

                if (number <= MAX_NUMBER) {

                    try {
                        Thread.sleep(1000);

                        System.out.println(Thread.currentThread().getName() + " : " + number);
                        number++;

                        // 使得调用如下 wait() 方法的线程进入阻塞状态
                        wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                } else {
                    break;
                }
            }

        }
    }
}
```



#### 面试题(生产者/消费者)



##### 使用 Runnable 接口的方式

```java
package com.yixihan.day1023.signalcommunication;

/**
 * 线程通信的应用 : 经典例题, 生产者/消费者问题
 *
 * 生产者(Producer)将产品交给店员(Clerk)，而消费者(Customer)从店员处取走产品，店员一次只能持有固定数量的产品(比如:20），
 * 如果生产者试图生产更多的产品，店员会叫生产者停一下，如果店中有空位放产品了再通知生产者继续生产；
 * 如果店中没有产品了，店员会告诉消费者等一下，如果店中有产品了再通知消费者来取走产品。
 *
 * 这里可能出现两个问题：
 *      生产者比消费者快时，消费者会漏掉一些数据没有取到
 *      消费者比生产者快时，消费者会取相同的数据。
 *
 * 分析 :
 *      1. 是否是多线程问题 : 是, 生产者线程, 消费者线程
 *      2. 是否有共享数据 : 有, 店员 (产品的数量)
 *      3. 是否有线程安全问题 : 有
 *      4. 如何来解决线程安全的问题 : 同步机制, 有三种方法
 *      5. 是否涉及到线程的通信 : 是
 *
 *
 * @author : yixihan
 * @create : 2021-10-23-17:08
 */
public class ProductTest {

    public static void main(String[] args) {

        Clerk clerk = new Clerk();

        Producer producer = new Producer(clerk);
        Customer customer = new Customer(clerk);

        new Thread(producer, "生产者1").start();
        new Thread(customer, "消费者1").start();
        new Thread(customer, "消费者2").start();
        new Thread(customer, "消费者3").start();
        new Thread(customer, "消费者4").start();
        new Thread(customer, "消费者5").start();
    }
}


/**
 * 生产者
 */
class Producer implements Runnable{

    private Clerk clerk;

    public Producer(Clerk clerk) {
        this.clerk = clerk;
    }

    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + " : 开始生产产品");

        while (true) {

            try {
                Thread.sleep(20);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            clerk.produceProduct();
        }
    }

}


/**
 * 消费者
 */
class Customer implements Runnable {


    private Clerk clerk;

    public Customer(Clerk clerk) {
        this.clerk = clerk;
    }

    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + " : 开始消费产品");

        while (true) {

            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            clerk.consumeProduct();
        }
    }


}


/**
 * 店员
 */
class Clerk {

    private int productCount = 0;


    /**
     * 生产产品
     */
    public synchronized void produceProduct() {
        if (productCount < 20) {
            System.out.println(Thread.currentThread().getName() + " : 开始生产第 " + ++productCount + "个产品");

            notify();
        } else {
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }


    /**
     * 消费产品
     */
    public synchronized void consumeProduct() {
        if (productCount > 0) {
            System.out.println(Thread.currentThread().getName() + " : 开始消费第 " + productCount-- + "个产品");

            notify();
        } else {
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```



使用继承 Thread 类的方式

```java
package com.atguigu.java2;

/**
 * 线程通信的应用：经典例题：生产者/消费者问题
 *
 * 生产者(Productor)将产品交给店员(Clerk)，而消费者(Customer)从店员处取走产品，
 * 店员一次只能持有固定数量的产品(比如:20），如果生产者试图生产更多的产品，店员
 * 会叫生产者停一下，如果店中有空位放产品了再通知生产者继续生产；如果店中没有产品
 * 了，店员会告诉消费者等一下，如果店中有产品了再通知消费者来取走产品。
 *
 * 分析：
 * 1. 是否是多线程问题？是，生产者线程，消费者线程
 * 2. 是否有共享数据？是，店员（或产品）
 * 3. 如何解决线程的安全问题？同步机制,有三种方法
 * 4. 是否涉及线程的通信？是
 *
 * @author shkstart
 * @create 2019-02-15 下午 4:48
 */
class Clerk{

    private int productCount = 0;
    //生产产品
    public synchronized void produceProduct() {

        if(productCount < 20){
            productCount++;
            System.out.println(Thread.currentThread().getName() + ":开始生产第" + productCount + "个产品");

            notify();

        }else{
            //等待
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

    }
    //消费产品
    public synchronized void consumeProduct() {
        if(productCount > 0){
            System.out.println(Thread.currentThread().getName() + ":开始消费第" + productCount + "个产品");
            productCount--;

            notify();
        }else{
            //等待
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

    }
}

class Producer extends Thread{//生产者

    private Clerk clerk;

    public Producer(Clerk clerk) {
        this.clerk = clerk;
    }

    @Override
    public void run() {
        System.out.println(getName() + ":开始生产产品.....");

        while(true){

            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            clerk.produceProduct();
        }

    }
}

class Consumer extends Thread{//消费者
    private Clerk clerk;

    public Consumer(Clerk clerk) {
        this.clerk = clerk;
    }

    @Override
    public void run() {
        System.out.println(getName() + ":开始消费产品.....");

        while(true){

            try {
                Thread.sleep(20);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            clerk.consumeProduct();
        }
    }
}

public class ProductTest {

    public static void main(String[] args) {
        Clerk clerk = new Clerk();

        Producer p1 = new Producer(clerk);
        p1.setName("生产者1");

        Consumer c1 = new Consumer(clerk);
        c1.setName("消费者1");
        Consumer c2 = new Consumer(clerk);
        c2.setName("消费者2");

        p1.start();
        c1.start();
        c2.start();

    }
}

```



### JDK 5.0 新增线程创建方式



#### 新增方式一：实现Callable接口



- 与使用Runnable相比， Callable功能更强大些
  - 相比run()方法，可以有返回值
  - 方法可以抛出异常
  - 支持泛型的返回值
  - 需要借助FutureTask类，比如获取返回结果
- Future接口
  - 可以对具体Runnable、Callable任务的执行结果进行取消、查询是 否完成、获取结果等
  - **FutrueTask是Futrue接口的唯一的实现类**
  - FutureTask 同时实现了Runnable, Future接口。它既可以作为 Runnable被线程执行，又可以作为Future得到Callable的返回值



```java
package com.yixihan.day1023.newway;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

/**
 * 创建线程的方式三 : 实现 Callable 接口 --- JDK 5.0 新增
 *
 *      1. 创建一个实现类去 Callable 接口
 *      2. 实现 call() 方法, 将此线程需要执行的操作声明在 call() 方法中, 并且 call() 方法可以有返回值
 *      3. 创建 Callable 实现类的对象
 *      4. 将此 Callable 实现类的对象 作为参数传递到 FutureTask 的构造器中, 去创建 FutureTask 的对象
 *      5. 将 FutureTask 的对象作为参数, 传入 Thread 类的构造器中, 创建 Thread 的对象
 *      6. 使用 FutureTask 的对象.get() 获取实现 call() 方法的返回值
 *
 *
 *
 * 如何理解实现 Callable 接口的方式比实现 Runnable 接口创建多线程的方式强大 ?
 *      1. call() 方法是有返回值的
 *      2. call() 方法是可以抛出异常的
 *      3. Callable 支持泛型
 *
 * @author : yixihan
 * @create : 2021-10-23-17:36
 */
public class ThreadNew {

    public static void main(String[] args) {

        // 创建 Callable 实现类的对象
        NumberThread thread = new NumberThread();

        // 创建 FutureTask 的对象, 将 Callable 实现类的对象 作为参数传入 FutureTask 的构造器
        FutureTask futureTask = new FutureTask(thread);

        new Thread(futureTask).start();

        try {

            // get() 方法的返回值即为 FutureTask 构造器参数 Callable 实现类重写的 call() 方法的返回值
            int count = (int) futureTask.get();

            System.out.println(count);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }


    }
}


class NumberThread implements Callable {


    @Override
    public Object call() throws Exception {

        int count = 0;

        for (int i = 1; i < 100; i++) {

            if (i % 2 == 0) {
                count += i;
                System.out.println(i);
            }
        }
        return count;
    }
}
```



#### 新增方式二：使用线程池



> 背景

经常创建和销毁、使用量特别大的资源，比如并发情况下的线程， 对性能影响很大



> 思路

提前创建好多个线程，放入线程池中，使用时直接获取，使用完 放回池中。可以避免频繁创建销毁、实现重复利用。类似生活中的公共交 通工具。



> 好处



- 提高响应速度（减少了创建新线程的时间）
- 降低资源消耗（重复利用线程池中线程，不需要每次都创建）
- 便于线程管理
  - corePoolSize：核心池的大小
  - maximumPoolSize：最大线程数
  - keepAliveTime：线程没有任务时最多保持多长时间后会终止
  - ...



##### 线程池相关 API



- JDK 5.0起提供了线程池相关API：==ExecutorService== 和 ==Executors==
- ExecutorService：真正的线程池接口。常见子类ThreadPoolExecutor
  - void execute(Runnable command) ：执行任务/命令，没有返回值，一般用来执行 Runnable
  -  Future submit(Callable task)：执行任务，有返回值，一般又来执行 Callable
  - void shutdown() ：关闭连接池
- Executors：工具类、线程池的工厂类，用于创建并返回不同类型的线程池
  - Executors.newCachedThreadPool()：创建一个可根据需要创建新线程的线程池
  - Executors.newFixedThreadPool(n); 创建一个可重用固定线程数的线程池
  - Executors.newSingleThreadExecutor() ：创建一个只有一个线程的线程池
  - Executors.newScheduledThreadPool(n)：创建一个线程池，它可安排在给定延迟后运 行命令或者定期地执行。



```java
package com.yixihan.day1023.newway;

import java.util.concurrent.*;

/**
 * 创建线程的方式四 : 使用线程池
 *
 *
 * 好处 :
 *      1. 提高响应速度 (减少了创建新线程的时间)
 *      2. 降低资源消耗 (重复利用线程池中线程，不需要每次都创建)
 *      3. 便于线程管理
 *          corePoolSize : 设置核心池的大小
 *          maximumPoolSize : 设置最大线程数
 *          keepAliveTime : 设置线程没有任务时最多保存多长时间会终止
 *
 * 面试题 : 创建多线程有多少中方式 : 四种
 * @author : yixihan
 * @create : 2021-10-23-17:56
 */
public class ThreadPool {

    public static void main(String[] args) {

        // 1. 提供指定线程数量的线程池
        ExecutorService executorService = Executors.newFixedThreadPool(10);

        ThreadPoolExecutor poolExecutor = (ThreadPoolExecutor) executorService;

        // 设置核心池的大小
        poolExecutor.setCorePoolSize(100);

        // 设置最大线程数
        poolExecutor.setMaximumPoolSize(1000);

        // 设置线程没有任务时最多保存多长时间会终止
        // poolExecutor.setKeepAliveTime()

        // 2. 执行指定的线程的操作, 需要提供实现 Runnable 接口 或者 Callable 接口实现类的对象
        // 适合使用与 Runnable 接口
        executorService.execute(new NumberThread2());
        executorService.execute(new NumberThread3());

        // 适合适用于 Callable 接口
        Future submit = executorService.submit(new NumberThread1());

        try {
            System.out.println(submit.get());
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        // 关闭连接池
        executorService.shutdown();
    }
}

class NumberThread1 implements Callable {

    @Override
    public Object call() throws Exception {

        int count = 0;

        for (int i = 1; i <= 100; i++) {

            if (i % 2 == 0) {
                System.out.println(Thread.currentThread().getName() + " : " + i);
                count += i;
            }
        }

        return count;
    }
}

class NumberThread2 implements Runnable {

    @Override
    public void run(){
        for (int i = 1; i <= 100; i++) {

            if (i % 2 == 0) {
                System.out.println(Thread.currentThread().getName() + " : " + i);
            }
        }
    }
}

class NumberThread3 implements Runnable {

    @Override
    public void run(){
        for (int i = 1; i <= 100; i++) {

            if (i % 2 != 0) {
                System.out.println(Thread.currentThread().getName() + " : " + i);
            }
        }
    }
}
```



## Java 常用类



### 字符串相关的类



#### String的特性



##### 简介

==String类：代表字符串==。Java 程序中的所有字符串字面值（如 "abc" ）都作 为此类的实例实现



String是一个==final==类，代表不可变的字符序列



字符串是常量，用双引号引起来表示。它们的值在创建之后不能更改



String对象的字符内容是存储在一个字符数组value[]中的。



```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage. */
    private final char value[];
    /** Cache the hash code for the string */
    private int hash; // Default to 0
```



##### 图解

![image-20211023185842087](/assets/imgs/JavaSE3.assets/image-20211023185842087.png)



```java
/**
 *
 * String : 字符串, 使用一对 "" 引起来表示
 *      1. String 声明为 final 的, 不可被继承
 *      2. String 实现了 Serializable 接口 : 表示字符串是支持序列化的
 *         String 实现了 Comparable 接口 : 表示字符串是可以比较大小的
 *         String 实现了 CharSequence 接口 : 表示 String 是一个字符串  (CharSequence描述的就是一个字符串)
 *      3. String 内部定义了 final char[] value 用于存储字符串数据
 *      4. String : 代表不可变的字符串序列, 简称 : 不可变性
 *          体现 :
 *              1. 当对现有的字符串重新赋值时, 需要重写指定内存区域赋值, 不能使用原有的 value 进行赋值
 *              2. 当对现有的字符串进行连接操作时, 也需要重新指定内存区域赋值, 不能使用原有的 value 进行赋值
 *              3. 当对现有的字符串进行修改操作时, 也需要重新指定内存区域赋值, 不能使用原有的 value 进行赋值
 *
 *      5. 通过字面量的方式 (区别于 new 的方式) 给一个字符串赋值, 此时的字符串值声明在字符串常量池中
 *      6. 字符串常量池是不会存储相同内容的字符串的
 */
@Test
public void test1 () {
    // 字面量
    String s1 = "abc";
    String s2 = "abc";

    // true
    System.out.println(s1 == s2);

    s1 = "hello";

    // false
    System.out.println(s1 == s2);

    // hello
    System.out.println(s1);

    // abc
    System.out.println(s2);

    System.out.println("************");

    String s3 = "abc";
    s3 += "def";

    // abc
    System.out.println(s2);

    // abcdef
    System.out.println(s3);

    System.out.println("************");

    String s4 = "abc";

    String s5 = s4.replace('a', 'm');

    // abc
    System.out.println(s4);

    // mbc
    System.out.println(s5);
}
```



##### String对象的创建



```java
String str = "hello";
//本质上this.value = new char[0];
String s1 = new String();
//this.value = original.value;
String s2 = new String(String original);
//this.value = Arrays.copyOf(value, value.length);
String s3 = new String(char[] a);
String s4 = new String(char[] a,int startIndex,int count);
```



> String str1 = “abc”;与String str2 = new String(“abc”);的区别？

![image-20211023190009066](/assets/imgs/JavaSE3.assets/image-20211023190009066.png)



> 字符串对象是如何存储的

![image-20211023190032526](/assets/imgs/JavaSE3.assets/image-20211023190032526.png)

![image-20211023190058086](/assets/imgs/JavaSE3.assets/image-20211023190058086.png)



```java
/**
 * String 的实例化方式
 *      方式一 : 通过字面量的方式定义
 *      方式二 : 通过 new + 构造器的方式
 *
 * 面试题 : String s = new String ("abc"); 方式创建对象, 在内存中创建了几个对象?
 *      两个 : 一个是堆空间中的 new 结构, 另一个是 char[] 对应的常量池中的数据 : "abc"
 */
@Test
public void test2 () {

    // 通过字面量定义的方式 : 此时的 s1 和 s2 的数据 JavaSE 声明在方法区的字符串常量池中
    String s1 = "JavaSE";
    String s2 = "JavaSE";

    // 通过 new + 构造器的方式 : 此时的 s3 和 s4 保存的地址值, 是数据在堆空间中开辟空间以后的对应地址值
    String s3 = new String("JavaSE");
    String s4 = new String("JavaSE");

    // true
    System.out.println(s1 == s2);

    // false
    System.out.println(s1 == s3);

    // false
    System.out.println(s1 == s4);

    // false
    System.out.println(s3 == s4);

    Person p1 = new Person("Tom", 12);
    Person p2 = new Person("Tom", 12);

    // true
    System.out.println(p1.getName().equals(p2.getName()));

    // true
    System.out.println(p1.getName() == p2.getName());

    p1.setName("Jane");

    // Tom
    System.out.println(p2.getName());

    // Jane
    System.out.println(p1.getName());

}
```



##### 字符串的特性结论



![image-20211023201958814](/assets/imgs/JavaSE3.assets/image-20211023201958814.png)

- 常量与常量的拼接结果在常量池。且常量池中不会存在相同内容的常量
- 只要其中有一个是变量，结果就在堆中
- 如果拼接的结果调用intern()方法，返回值就在常量池中



```java
    /**
     * 结论 :
     * s1 - s3 是通过字面量的方式定义
     * s4 - s7 是通过 new + 构造器的方式定义
     *
     *      1. 常量与常量的拼接结果在常量池, 且常量池中不会存在相同内容的常量
     *      2. 只要其中有一个是变量, 结果就在堆中
     *      3. 如果拼接的结果调用intern()方法, 返回值就在常量池中
     */
    @Test
    public void test3 () {
        String s1 = "JavaEE";
        String s2 = "Hadoop";
        String s3 = "JavaEEHadoop";
        String s4 = "JavaEE" + "Hadoop";
        String s5 = s1 + "Hadoop";
        String s6 = "JavaEE" + s2;
        String s7 = s1 + s2;
        // 返回值得到的 s8 是使用的常量池中已经存在的 "JavaEEHadoop" 字面量声明的
        String s8 = s5.intern();

        // true
        System.out.println(s3 == s4);

        // false
        System.out.println(s3 == s5);

        // false
        System.out.println(s3 == s6);

        // false
        System.out.println(s3 == s7);

        // true
        System.out.println(s3 == s8);

        // false
        System.out.println(s5 == s6);

        // false
        System.out.println(s5 == s7);
    }
}

@Test
    public void test4 () {
        String s1 = "JavaEEHadoop";
        String s2 = "JavaEE";
        String s3 = s2 + "Hadoop";

        final String s4 = "JavaEE";
        String s5 = s4 + "Hadoop";

        // false
        System.out.println(s1 == s3);

        // true
        System.out.println(s1 == s5);

    }
```



##### String使用陷阱



```java
// 说明：在字符串常量池中创建了一个字面量为"a"的字符串。
String s1 = "a";

// 说明：实际上原来的“a”字符串对象已经丢弃了，现在在堆空间中产生了一个字符串s1+"b"（也就是"ab")。
// 如果多次执行这些改变串内容的操作，会导致大量副本字符串对象存留在内存中，降低效率。
// 如果这样的操作放到循环中，会极大影响程序的性能。
s1 = s1 + "b";

// 说明：直接在字符串常量池中创建一个字面量为"ab"的字符串。
String s2 = "ab";

// 说明：s3指向字符串常量池中已经创建的"ab"的字符串。
String s3 = "a" + "b";

// 说明：堆空间的s1对象在调用intern()之后，会将常量池中已经存在的"ab"字符串赋值给s4。
String s4 = s1.intern();
```



#### String常用方法



```java
// 返回字符串的长度： return value.length
int length()
    
// 返回某索引处的字符return value[index]    
char charAt(int index)
   
// 判断是否是空字符串：return value.length == 0    
boolean isEmpty()
    
// 使用默认语言环境，将 String 中的所有字符转换为小写    
String toLowerCase()
    
// 使用默认语言环境，将 String 中的所有字符转换为大写    
String toUpperCase()
    
// 返回字符串的副本，忽略前导空白和尾部空白    
String trim()
    
// 比较字符串的内容是否相同    
boolean equals(Object obj)
    
// 与equals方法类似，忽略大小写    
boolean equalsIgnoreCase(String anotherString)
    
// 将指定字符串连接到此字符串的结尾。 等价于用“+”    
String concat(String str)
    
// 比较两个字符串的大小    
int compareTo(String anotherString)
    
// 返回一个新的字符串，它是此字符串的从beginIndex开始截取到最后的一个子字符串。    
String substring(int beginIndex)
    
// 返回一个新字符串，它是此字符串从beginIndex开始截取到endIndex(不包含)的一个子字符串。    
String substring(int beginIndex, int endIndex) 
    
    
// 测试此字符串是否以指定的后缀结束    
boolean endsWith(String suffix)
    
// 测试此字符串是否以指定的前缀开始    
boolean startsWith(String prefix)
    
// 测试此字符串从指定索引开始的子字符串是否以指定前缀开始    
boolean startsWith(String prefix, int toffset)

    
// 当且仅当此字符串包含指定的 char 值序列时，返回 true    
boolean contains(CharSequence s)
   
// 返回指定子字符串在此字符串中第一次出现处的索引    
int indexOf(String str)
    
// 返回指定子字符串在此字符串中第一次出现处的索引，从指定的索引开始    
int indexOf(String str, int fromIndex)
    
// 返回指定子字符串在此字符串中最右边出现处的索引    
int lastIndexOf(String str)
    
// 返回指定子字符串在此字符串中最后一次出现处的索引，从指定的索引开始反向搜索    
// 注：indexOf和lastIndexOf方法如果未找到都是返回-1    
int lastIndexOf(String str, int fromIndex)
    
// 返回一个新的字符串，它是通过用 newChar 替换此字符串中出现的所有 oldChar 得到的。    
String replace(char oldChar, char newChar)
    
// 使用指定的字面值替换序列替换此字符串所有匹配字面值目标序列的子字符串。    
String replace(CharSequence target, CharSequence replacement)
    
// 使用给定的replacement 替换此字符串所有匹配给定的正则表达式的子字符串。    
String replaceAll(String regex, String replacement)
    
// 使用给定的replacement 替换此字符串匹配给定的正则表达式的第一个子字符串。    
String replaceFirst(String regex, String replacement)
    
// 告知此字符串是否匹配给定的正则表达式。    
boolean matches(String regex)
    
// 根据给定正则表达式的匹配拆分此字符串。    
String[] split(String regex)
   
// 根据匹配给定的正则表达式来拆分此字符串，最多不超过limit个，如果超过了，剩下的全部都放到最后一个元素中。    
String[] split(String regex, int limit)
    
    
String str = "12hello34world5java7891mysql456";
//把字符串中的数字替换成,，如果结果中开头和结尾有，的话去掉
String string = str.replaceAll("\\d+", ",").replaceAll("^,|,$", "");
System.out.println(string);
    

String str = "12345";
//判断str字符串中是否全部有数字组成，即有1-n个数字组成
boolean matches = str.matches("\\d+");
System.out.println(matches);
String tel = "0571-4534289";


//判断这是否是一个杭州的固定电话
boolean result = tel.matches("0571-\\d{7,8}");
System.out.println(result);

String str = "hello|world|java";
String[] strs = str.split("\\|");
for (int i = 0; i < strs.length; i++) {
    System.out.println(strs[i]);
}
System.out.println();
String str2 = "hello.world.java";
String[] strs2 = str2.split("\\.");
for (int i = 0; i < strs2.length; i++) {
    System.out.println(strs2[i]);
}
```



```java
package com.yixihan.day1023.stringtest;

import org.junit.Test;

/**
 * @author : yixihan
 * @create : 2021-10-23-20:33
 */
public class StringMethodTest {


    /**
     * // 返回字符串的长度： return value.length
     * int length()
     *
     * // 返回某索引处的字符return value[index]
     * char charAt(int index)
     *
     * // 判断是否是空字符串：return value.length == 0
     * boolean isEmpty()
     *
     * // 使用默认语言环境，将 String 中的所有字符转换为小写
     * String toLowerCase()
     *
     * // 使用默认语言环境，将 String 中的所有字符转换为大写
     * String toUpperCase()
     *
     * // 返回字符串的副本，忽略前导空白和尾部空白
     * String trim()
     *
     */
    @Test
    public void test1 () {

        String s1 = "helloWorld";

        // 10
        System.out.println(s1.length());

        // h
        System.out.println(s1.charAt(0));

        // d
        System.out.println(s1.charAt(9));

        // String index out of range: 10
        // System.out.println(s1.charAt(10));

        // false
        System.out.println(s1.isEmpty());

        // s1 = "";
        // true
        // System.out.println(s1.isEmpty());

        // s1 本身是不变的
        // HELLOWORLD
        System.out.println(s1.toUpperCase());

        // helloworld
        System.out.println(s1.toLowerCase());

        String s3 = "   h  e l l o  w o rl d     ";
        String s4 = s3.trim();

        // ---   h  e l l o  w o rl d     ---
        System.out.println("---" + s3 + "---");

        // ----h  e l l o  w o rl d----
        System.out.println("----" + s4 + "----");
    }


    /**
     * // 比较字符串的内容是否相同
     * boolean equals(Object obj)
     *
     * // 与equals方法类似，忽略大小写
     * boolean equalsIgnoreCase(String anotherString)
     *
     * // 将指定字符串连接到此字符串的结尾。 等价于用“+”
     * String concat(String str)
     *
     * // 比较两个字符串的大小
     * int compareTo(String anotherString)
     *
     * // 返回一个新的字符串，它是此字符串的从beginIndex开始截取到最后的一个子字符串。
     * String substring(int beginIndex)
     *
     * // 返回一个新字符串，它是此字符串从beginIndex开始截取到endIndex(不包含)的一个子字符串。
     * String substring(int beginIndex, int endIndex)
     */
    @Test
    public void test2 () {
        String s1 = "helloWorld";
        String s2 = "helloworld";

        // false
        System.out.println(s1.equals(s2));

        // true
        System.out.println(s1.equalsIgnoreCase(s2));

        String s3 = "abc";
        String s4 = s3.concat("def");

        // abcdef
        System.out.println(s4);

        String s5 = "abc";
        String s6 = "abf";

        // 涉及到字符串排序
        // -3
        System.out.println(s5.compareTo(s6));

        // 3
        System.out.println(s6.compareTo(s5));

        String s7 = "中国重庆万州";
        String s8 = s7.substring(2);

        // 中国重庆万州
        System.out.println(s7);

        // 重庆万州
        System.out.println(s8);

        // 左闭右开
        String s9 = s7.substring(2, 4);

        // 重庆
        System.out.println(s9);

    }


    /**
     * // 测试此字符串是否以指定的后缀结束
     * boolean endsWith(String suffix)
     *
     * // 测试此字符串是否以指定的前缀开始
     * boolean startsWith(String prefix)
     *
     * // 测试此字符串从指定索引开始的子字符串是否以指定前缀开始
     * boolean startsWith(String prefix, int toffset)
     *
     * // 当且仅当此字符串包含指定的 char 值序列时，返回 true
     * boolean contains(CharSequence s)
     *
     * // 返回指定子字符串在此字符串中第一次出现处的索引
     * int indexOf(String str)
     *
     * // 返回指定子字符串在此字符串中第一次出现处的索引，从指定的索引开始
     * int indexOf(String str, int fromIndex)
     *
     * // 返回指定子字符串在此字符串中最右边出现处的索引
     * int lastIndexOf(String str)
     *
     * // 返回指定子字符串在此字符串中最后一次出现处的索引，从指定的索引开始反向搜索
     * // 注：indexOf和lastIndexOf方法如果未找到都是返回-1
     * int lastIndexOf(String str, int fromIndex)
     *
     */
    @Test
    public void test3 () {
        String s1 = "helloWorld";

        // true
        System.out.println(s1.endsWith("rld"));

        // true
        System.out.println(s1.startsWith("he"));

        // false
        System.out.println(s1.startsWith("He"));

        // true
        System.out.println(s1.startsWith("ll", 2));

        String s2 = "wo";

        // true (大小写严格要求)
        System.out.println(s1.contains(s2));

        // 3
        System.out.println(s1.indexOf("lo"));

        // -1
        System.out.println(s1.indexOf("x"));

        // 8
        System.out.println(s1.indexOf("l", 5));

        // 2
        System.out.println(s1.indexOf("l"));

        // 8
        System.out.println(s1.lastIndexOf("l"));

        // 3
        System.out.println(s1.lastIndexOf("l", 5));
    }


    /**
     * // 返回一个新的字符串，它是通过用 newChar 替换此字符串中出现的所有 oldChar 得到的。
     * String replace(char oldChar, char newChar)
     *
     * // 使用指定的字面值替换序列替换此字符串所有匹配字面值目标序列的子字符串。
     * String replace(CharSequence target, CharSequence replacement)
     *
     * // 使用给定的replacement 替换此字符串所有匹配给定的正则表达式的子字符串。
     * String replaceAll(String regex, String replacement)
     *
     * // 使用给定的replacement 替换此字符串匹配给定的正则表达式的第一个子字符串。
     * String replaceFirst(String regex, String replacement)
     *
     * // 告知此字符串是否匹配给定的正则表达式。
     * boolean matches(String regex)
     *
     * // 根据给定正则表达式的匹配拆分此字符串。
     * String[] split(String regex)
     *
     * // 根据匹配给定的正则表达式来拆分此字符串，最多不超过limit个，如果超过了，剩下的全部都放到最后一个元素中。
     * String[] split(String regex, int limit)
     */
    @Test
    public void test4 () {
        String s1 = "中国重庆万州万县市";

        String s2 = s1.replace('万', '达');

        // 中国重庆万州万县市
        System.out.println(s1);

        // 中国重庆达州达县市
        System.out.println(s2);

        String s3 = s1.replace("重庆", "四川");

        // 中国四川万州万县市
        System.out.println(s3);


        
        String str1 = "12hello34world5java7891mysql456";
        
        //把字符串中的数字替换成,，如果结果中开头和结尾有，的话去掉
        String string = str1.replaceAll("\\d+", ",").replaceAll("^,|,$", "");
        
        // hello,world,java,mysql
        System.out.println(string);


        
        String str2 = "12345";
        
        //判断str字符串中是否全部有数字组成，即有1-n个数字组成
        boolean matches = str2.matches("\\d+");
        
        // true
        System.out.println(matches);
        
        
        
        String tel = "0571-4534289";
        
        //判断这是否是一个杭州的固定电话
        boolean result = tel.matches("0571-\\d{7,8}");
        
        // true
        System.out.println(result);

        
        
        String str3 = "hello|world|java";
        String[] strs = str3.split("\\|");
        for (String str : strs) {
            // hello    world   java
            System.out.println(str);
        }
        System.out.println();
        
        
        
        String str4 = "hello.world.java";
        String[] strs4 = str4.split("\\.");
        for (String s : strs4) { 
            // hello   world   java
            System.out.println(s);
        }
    }
}
```



#### String与其他数据类型转换



> 字符串 --> 基本数据类型、包装类

- Integer包装类的public static int ==parseInt(String s)==：可以将由“数字”字 符组成的字符串转换为整型
- 类似地,使用java.lang包中的Byte、Short、Long、Float、Double类调相应 的类方法可以将由==“数字”字符==组成的字符串，转化为相应的基本数据类型



> 基本数据类型、包装类 --> 字符串

- 调用String类的public String ==valueOf(int n)==可将int型转换为字符串
- 相应的valueOf(byte b)、valueOf(long l)、valueOf(float f)、valueOf(double d)、valueOf(boolean b)可由参数的相应类型到字符串的转换



```java
/**
 * String 与基本数据类型, 包装类之间的转换
 * String ---> 基本数据类型 包装类 : 调用包装类的静态方法 : parseXxx (String str)
 * 基本数据类型 包装类 ---> String : 调用 String 类重载的静态方法 : valueOf (Xxx xxx)
 *                                 调用连接字符串;
 */
@Test
public void test1 () {

    String s1 = "123";

    int num1 = Integer.parseInt(s1);

    // 123
    System.out.println(num1);

    // 方式一
    String s2 = String.valueOf(num1);

    // "123"
    System.out.println(s2);

    // 方式二
    String s3 = num1 + "";

    // "123"
    System.out.println(s3);

    // false
    System.out.println(s2 == s3);
}
```



> 字符数组 --> 字符串

- String 类的构造器：String(char[]) 和 String(char[]，int offset，int length) 分别用字符数组中的全部字符和部分字符创建字符串对象



> 字符串 --> 字符数组

- public char[] toCharArray()：将字符串中的全部字符存放在一个字符数组 中的方法
- public void getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin)：提供了将指定索引范围内的字符串存放到数组中的方法



```java
/**
 * String 与 字符数组 (char[]) 之间的转换
 *
 * String ---> char[] : 调用 String 的 toCharArray 方法
 * char[] ---> String : 调用 String 的构造器
 */
@Test
public void test2 () {
    String s1 = "abc123";

    char[] chars = s1.toCharArray();

    for (char aChar : chars) {
        System.out.print(aChar + " ");
    }
    System.out.println();

    String s2 = new String(chars);

    System.out.println(s2);
}
```



> 字节数组  --> 字符串

- String(byte[])：通过使用平台的默认字符集解码指定的 byte 数组，构 造一个新的 String。
- String(byte[]，int offset，int length) ：用指定的字节数组的一部分， 即从数组起始位置offset开始取length个字节构造一个字符串对象



> 字符串  --> 字节数组

- public byte[] getBytes() ：使用平台的默认字符集将此 String 编码为 byte 序列，并将结果存储到一个新的 byte 数组中。
- public byte[] getBytes(String charsetName) ：使用指定的字符集将 此 String 编码到 byte 序列，并将结果存储到新的 byte 数组。



```java
/**
 * String 与 字节数组 (byte[]) 之间的转换
 *
 * String ---> byte[] : 使用 String 的 getBytes() 方法  (编码)
 * byte[] ---> String : 调用 String 的构造器 (解码)
 *
 * 编码 : 字符串 ---> 字节 : (看得懂 ---> 看不懂的二进制数据)
 * 解码 : 字节 ---> 字符串 : (看不懂的二进制数据 ---> 看得懂)
 *
 * 说明 : 在解码时, 要求解码使用的字符集必须与编码是使用的字符集一致, 否则就会出现乱码问题
 */
@Test
public void test3 () throws UnsupportedEncodingException {
    String s1 = "abc123";

    byte[] bytes = s1.getBytes();

    System.out.println(Arrays.toString(bytes));

    String s2 = "abc123中国";

    // 使用默认的字符集(UTF-8), 进行转换
    byte[] bytes1 = s2.getBytes(StandardCharsets.UTF_8);
    System.out.println(Arrays.toString(bytes1));



    // 使用 ASCII 进行转换
    byte[] bytes2 = s2.getBytes(StandardCharsets.US_ASCII);
    System.out.println(Arrays.toString(bytes2));

    // 使用 GBK 进行转换

    byte[] bytes3 = s2.getBytes("gbk");
    System.out.println(Arrays.toString(bytes3));


    // // 使用默认的字符集(UTF-8), 进行转换
    String s3 = new String(bytes1);
    System.out.println(s3);


    String s4 = new String(bytes3);
    // 出现乱码, 原因 : 编码集和解码集不一致
    System.out.println(s4);

    String s5 = new String(bytes3, "gbk");
    System.out.println(s5);

}
```



#### StringBuffer 与 StringBuilder



- java.lang.StringBuffer代表==可变的字符序列==，JDK1.0中声明，可以对字符 串内容进行增删，此时不会产生新的对象。
- StringBuilder 和 StringBuffer 非常类似，均代表可变的字符序列，而且 提供相关功能的方法也一样, 在 JDK 5.0 中声明

- 很多方法与String相同

- 作为参数传递时，方法内部可以改变值
- StringBuffer类不同于String，其对象必须使用构造器生成。有三个构造器
  - StringBuffer()：初始容量为16的字符串缓冲区
  - StringBuffer(int size)：构造指定容量的字符串缓冲区
  - StringBuffer(String str)：将内容初始化为指定字符串内容



```java
/**
 * String StringBuffer StringBuilder 三者的异同
 *
 * String :
 *      1. 不可变的字符串序列
 *      2. 底层使用 char[] 型数组进行存储
 *
 *
 * StringBuffer :
 *      1. 可变的字符串序列
 *      2. 线程安全的, 效率偏低
 *      3. 底层使用 char[] 型数组进行存储
 *
 *
 * StringBuilder :
 *      1. 可变的字符串序列
 *      2. 线程不安全, 效率偏高
 *      3. JDK 5.0 新增的
 *      4. 底层使用 char[] 型数组进行存储
 *
 *
 * 源码分析 :
 * String str = new String(); // char[] value = new char[0];
 * String str1 = new String("abc"); // char[] value = new char[]{'a','b','c'}
 *
 * StringBuffer sb1 = new StringBuffer(); // char[] value = new char[16]; 底层创建了一个长度是 16 的数组
 * sb1.append('a'); // value[0] = 'a';
 * sb1.append('b'); // value[0] = 'b';
 *
 * StringBuffer sb2 = new StringBuffer("abc"); // char[] value = new char["abc".length + 16]; 底层创建了一个长度是 初始化字符串长度 + 16 的数组
 *
 *      问题 1. System.out.println(sb2.length); // 3
 *      问题 2. 扩容问题 : 如果要添加的数组, 底层数组存不下了, 那就需要扩容底层的数组
 *                  默认情况下, 扩容为原来容量的 2 倍 + 2, 同时将原有数组中的元素复制到新的数组
 *
 *                  底层源码 :   int newCapacity = (value.length << 1) + 2;
 *                              if (newCapacity - minCapacity < 0) {
 *                                  newCapacity = minCapacity;
 *                              }
 *                              return (newCapacity <= 0 || MAX_ARRAY_SIZE - newCapacity < 0)
 *                                  ? hugeCapacity(minCapacity)
 *                                  : newCapacity;
 *                  在开发中, 推荐使用 StringBuffer(int capacity) 构造器 或者 StringBuilder(int capacity)
 */
@Test
public void test1 () {
    StringBuilder builder = new StringBuilder("abc");
    builder.setCharAt(0, 'm');

    // mbc
    System.out.println(builder);

    // 3
    System.out.println(builder.length());
}
```



##### StringBuffer/StringBuilder 类的常用方法

```java
// 提供了很多的append()方法，用于进行字符串拼接
StringBuffer append(xxx)

// 删除指定位置的内容    
StringBuffer delete(int start,int end)
    
// 把[start,end)位置替换为str    
StringBuffer replace(int start, int end, String str)

// 在指定位置插入xxx    
StringBuffer insert(int offset, xxx)

// 把当前字符序列逆转    
StringBuffer reverse() 
    
    
    
// 其他常用方法
public int indexOf(String str)
public String substring(int start,int end)
public int length()
public char charAt(int n )
public void setCharAt(int n ,char ch)
```



- 当append和insert时，如果原来value数组长度不够，可扩容。
- 如上这些方法支持方法链操作
- 方法链的原理

```java
@Override
public StringBuilder append(String str) {
    super.append(str);
    return this;
}
```



```java
/**
 * StringBuffer 和 StringBuilder 的常用方法
 *
 * // 提供了很多的append()方法，用于进行字符串拼接
 * StringBuffer append(xxx)
 *
 * // 删除指定位置的内容
 * StringBuffer delete(int start,int end)
 *
 * // 把[start,end)位置替换为str
 * StringBuffer replace(int start, int end, String str)
 *
 * // 在指定位置插入xxx
 * StringBuffer insert(int offset, xxx)
 *
 * // 把当前字符序列逆转
 * StringBuffer reverse()
 *
 *
 *
 * // 其他常用方法
 * // 返回这个字符串 (str) 在 StringBuffer 中首次出现的位置
 * public int indexOf(String str)
 *
 * // 返回一个从 start 开始, 到 end 索引结束的左闭右开区间的子字符串
 * public String substring(int start,int end)
 *
 * // 返回字符串的长度
 * public int length()
 *
 * // 返回指定索引位置的数据
 * public char charAt(int n )
 *
 * // 设置指定索引位置的数据
 * public void setCharAt(int n ,char ch)
 *
 *
 * 总结 :
 *      1. 增 : append(Xxx xxx)
 *      2. 删 : delete(int start,int end)
 *      3. 改 : replace(int start, int end, String str) /  setCharAt(int n ,char ch)
 *      4. 查 : charAt(int n)
 *      5. 插 : insert(int offset, Xxx xxx)
 *      6. 长度 : length()
 *      7. 遍历 : for + charAt()
 */
@Test
public void test2 () {
    StringBuffer sb = new StringBuffer("abc");

    sb.append(123);
    sb.append("%^&");
    sb.append(12.57);

    System.out.println(sb);

    sb.delete(6, 9);
    System.out.println(sb);

    sb.replace(3, 6, "esv");
    System.out.println(sb);

    sb.insert(3, false);
    System.out.println(sb);
    System.out.println(sb.length());

    sb.reverse();
    System.out.println(sb);

    String s1 = sb.substring(3);
    System.out.println(s1);


}
```



##### 三者的效率测试



```java
/**
 * 对比 String StringBuffer StringBuilder 的执行效率
 *
 * 从高到底排列 : StringBuilder > StringBuffer > String
 */
@Test
public void test3 () {
    //初始设置
    long startTime = 0L;
    long endTime = 0L;
    String text = "";
    StringBuffer buffer = new StringBuffer("");
    StringBuilder builder = new StringBuilder("");
    //开始对比
    startTime = System.currentTimeMillis();
    for (int i = 0; i < 20000; i++) {
        buffer.append(String.valueOf(i));
    }
    endTime = System.currentTimeMillis();
    System.out.println("StringBuffer的执行时间：" + (endTime - startTime));
    startTime = System.currentTimeMillis();
    for (int i = 0; i < 20000; i++) {
        builder.append(String.valueOf(i));
    }
    endTime = System.currentTimeMillis();
    System.out.println("StringBuilder的执行时间：" + (endTime - startTime));
    startTime = System.currentTimeMillis();
    for (int i = 0; i < 20000; i++) {
        text = text + i;
    }
    endTime = System.currentTimeMillis();
    System.out.println("String的执行时间：" + (endTime - startTime));
}
```



![image-20211023222625985](/assets/imgs/JavaSE3.assets/image-20211023222625985.png)



#### 练习



##### 练习1



```java
package com.yixihan.day1023.stringtest.exer.test1;

/**
 * @author : yixihan
 * @create : 2021-10-23-20:20
 */
public class StringExer {

    String str = new String("good");
    char[] ch = { 't', 'e', 's', 't' };

    public void change(String str, char[] ch) {
        // 这里不会改变 str 的值 (String 具有不可变性)
        str = "test ok";

        // 这里会改变 (char[] 数组没有不可变性)
        ch[0] = 'b';
    }
    public static void main(String[] args) {
        StringExer ex = new StringExer();
        ex.change(ex.str, ex.ch);
        System.out.print(ex.str + " and ");//
        System.out.println(ex.ch);
        
        /*
        输出 : good and best
         */
    }

}
```



##### 练习二(算法题)

```java
package com.yixihan.day1024.stringtest;

import org.junit.Assert;
import org.junit.Test;

import java.util.Arrays;

/**
 * @author : yixihan
 * @create : 2021-10-24-11:00
 */
public class StringTest {

    /**
     * 1. 模拟一个trim方法，去除字符串两端的空格
     */
    @Test
    public void testTrim () {
        //     548 a4d
        String s1 = "     548 a4d       ";

        // 将 String 字符串转为 char[] 数组
        char[] chars = s1.toCharArray();

        int start = 0;
        int end = s1.length();

        // 从前往后遍历, 获取第一个不是 " " 的下标位置
        for (char aChar : chars) {
            if (aChar == ' ') {
                start++;
            } else {
                break;
            }
        }

        // 从后往前遍历, 获取最后一个不是 " " 的下标位置
        for (int i = chars.length - 1; i >= 0; i--) {
            if (chars[i] == ' ') {
                end--;
            } else {
                break;
            }
        }

        // 利用 new String(char[], int start, int count) 构造器重新生成 String 字符串
        String rs = new String(chars, start, end - start);

        // 利用 Assert 自动判断是否正确
        Assert.assertEquals("548 a4d", rs);
    }


    /**
     * 2. 将一个字符串进行反转。将字符串中指定部分进行反转。比如“ab cdef g”反转为”ab fedc g”
     */
    @Test
    public void testReversal () {

        String s1 = "abcdefg";

        int start = 2;
        int end = 5;

        String rs = reversal(s1, start, end);

        Assert.assertEquals("abfedcg", rs);

        String rs1 = reversal1(s1, start, end);

        Assert.assertEquals("abfedcg", rs1);
    }

    /**
     * 方式一 : char[] 数组处理
     * @param str 字符串
     * @param startIndex 开始的下标位置
     * @param endIndex 结束的下标位置
     * @return 反转之后的 String 数组
     */
    public String reversal (String str, int startIndex, int endIndex) {
        if (str != null) {
            // 利用 toCharArray 方法将 str 转为 char[] 数组
            char[] chars = str.toCharArray();

            // 从起始位置到结束位置, 倒转
            for (int i = startIndex, j = endIndex; i < j; i++, j--) {
                char temp = chars[i];
                chars[i] = chars[j];
                chars[j] = temp;
            }

            // 返回
            return new String(chars);
        }
        return null;
    }


    /**
     * 方式二 : 使用 StringBuilder 拼接, 也可以使用 String StringBuffer 实现
     * @param str 字符串
     * @param startIndex 开始的下标位置
     * @param endIndex 结束的下标位置
     * @return 反转之后的 String 数组
     */
    public String reversal1 (String str, int startIndex, int endIndex) {

        if (str != null) {

            // 声明 StringBuilder 长度为 str 的长度 (提升效率)
            StringBuilder reversalStr = new StringBuilder(str.length());

            // 将反转分为三部分, 反转部分前面的字符串, 反转部分字符串, 反转部分后面的字符串
            // 将第一部分放入 reversalStr
            reversalStr.append(str, 0, startIndex);

            // 利用 for 循环, 将第二部分反转之后, 放入 reversalStr
            for (int i = endIndex; i >= startIndex; i--) {
                reversalStr.append(str.charAt(i));
            }

            // 将第三部分放入 reversalStr
            reversalStr.append(str.substring(endIndex + 1));

            // 返回
            return reversalStr.toString();
        }

        return null;

    }


    /**
     * 获取一个字符串在另一个字符串中出现的次数。
     * 比如：获取“ ab”在 “abkkcadkabkebfkabkskab” 中出现的次数
     */
    @Test
    public void test3 () {
        String s1 = "abshweiabcaifjiaabiefjaivabefjqbaefrijwpfbvafdoavjaevpaegjeiahvavabaaefea";
        String s2 = "abc";

        char[] chars1 = s1.toCharArray();
        char[] chars2 = s2.toCharArray();

        int count = 0;

        for (int i = 0; i < chars1.length; i++) {

            int j = 0;
            for (; j < chars2.length; j++) {

                if ((i + j) >= chars1.length || chars1[i + j] != chars2[j] ) {
                    break;
                }
            }

            if (j >= chars2.length) {
                count++;
            }
        }

        Assert.assertEquals(1, count);
    }


    /**
     * 获取一个字符串在另一个字符串中出现的次数
     * @param mainStr mainStr
     * @param subStr subStr
     * @return 出现的次数
     */
    public int getCount (String mainStr, String subStr) {

        int count = 0;
        int index = 0;

        // 方式一
//        while ((index = mainStr.indexOf(subStr)) != -1) {
//
//            count++;
//            mainStr = mainStr.substring(index + subStr.length());
//
//        }

        while ((index = mainStr.indexOf(subStr, index)) != -1) {
            count++;
            index += subStr.length();
        }
        return count;
    }



    @Test
    public void test4 () {
        String mainStr = "abkkcadkabkebfkabkskab";
        String subStr = "ab";

        int count = getCount(mainStr, subStr);

        Assert.assertEquals(count, 4);
    }



    /**
     * 获取两个字符串中最大相同子串。比如：
     * str1 = "abcwerthelloyuiodef“;str2 = "cvhellobnm"
     * 提示：将短的那个串进行长度依次递减的子串与较长的串比较。
     */
    @Test
    public void testEquals () {
        String s1 = "abcwerthello1yuiodef";
        String s2 = "cvhello1bnm";

        String rs = getEquals(s1, s2);


        Assert.assertEquals("hello1", rs);
    }


    public String getEquals (String str1, String str2) {
        if (str1 != null && str2 != null) {
            String maxStr = (str1.length() >= str2.length()) ? str1 : str2;
            String minStr = (str1.length() < str2.length()) ? str1 : str2;

            int length = minStr.length();

            for (int i = 0; i < length; i++) {

                for (int x = 0, y = length - i; y <= length; x++, y++) {
                    String subStr = minStr.substring(x, y);
                    if (maxStr.contains(subStr)) {
                        return subStr;
                    }
                }
            }
        }

        return null;
    }


    /**
     * 对字符串中字符进行自然顺序排序。
     * 提示：
     * 1）字符串变成字符数组。
     * 2）对数组排序，选择，冒泡，Arrays.sort();
     * 3）将排序后的数组变成字符串。
     */
    @Test
    public void testSort () {
        String s1 = "abshweiabcaifjiaabiefjaivabefjqbaefrijwpfbvafdoavjaevpaegjeiahvavabaaefea";

        char[] chars = s1.toCharArray();


        Arrays.sort(chars);

        String rs = new String(chars);

        System.out.println(rs);

        Assert.assertEquals("aaaaaaaaaaaaaaaaaabbbbbbbcdeeeeeeeeefffffffghhiiiiiiijjjjjjoppqrsvvvvvvww", rs);

    }

	/**
	 * debug 调试
	 *
	 */
    @Test
    public void testDebug () {
        String str = null;
        StringBuffer sb = new StringBuffer();
        sb.append(str);

        // 4
        System.out.println(sb.length());

        // "null"
        System.out.println(sb);

        // NullPointerException
        StringBuffer sb1 = new StringBuffer(str);

        //
        System.out.println(sb1);
    }
    
}
```



##### 练习二标准答案

```java
package com.atguigu.java;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.Test;

/*
 * 1.模拟一个trim方法，去除字符串两端的空格。
 * 
 * 2.将一个字符串进行反转。将字符串中指定部分进行反转。比如将“abcdefg”反转为”abfedcg”
 * 
 * 3.获取一个字符串在另一个字符串中出现的次数。
      比如：获取“ab”在 “cdabkkcadkabkebfkabkskab”    
      中出现的次数
      
4.获取两个字符串中最大相同子串。比如：
   str1 = "abcwerthelloyuiodef“;str2 = "cvhellobnm"//10
   提示：将短的那个串进行长度依次递减的子串与较长  
   的串比较。

5.对字符串中字符进行自然顺序排序。"abcwerthelloyuiodef"
提示：
1）字符串变成字符数组。
2）对数组排序，选择，冒泡，Arrays.sort(str.toCharArray());
3）将排序后的数组变成字符串。

 */
public class StringExer {

	// 第1题
	public String myTrim(String str) {
		if (str != null) {
			int start = 0;// 用于记录从前往后首次索引位置不是空格的位置的索引
			int end = str.length() - 1;// 用于记录从后往前首次索引位置不是空格的位置的索引

			while (start < end && str.charAt(start) == ' ') {
				start++;
			}

			while (start < end && str.charAt(end) == ' ') {
				end--;
			}
			if (str.charAt(start) == ' ') {
				return "";
			}

			return str.substring(start, end + 1);
		}
		return null;
	}

	// 第2题
	// 方式一：
	public String reverse1(String str, int start, int end) {// start:2,end:5
		if (str != null) {
			// 1.
			char[] charArray = str.toCharArray();
			// 2.
			for (int i = start, j = end; i < j; i++, j--) {
				char temp = charArray[i];
				charArray[i] = charArray[j];
				charArray[j] = temp;
			}
			// 3.
			return new String(charArray);

		}
		return null;

	}

	// 方式二：
	public String reverse2(String str, int start, int end) {
		// 1.
		String newStr = str.substring(0, start);// ab
		// 2.
		for (int i = end; i >= start; i--) {
			newStr += str.charAt(i);
		} // abfedc
			// 3.
		newStr += str.substring(end + 1);
		return newStr;
	}

	// 方式三：推荐 （相较于方式二做的改进）
	public String reverse3(String str, int start, int end) {// ArrayList list = new ArrayList(80);
		// 1.
		StringBuffer s = new StringBuffer(str.length());
		// 2.
		s.append(str.substring(0, start));// ab
		// 3.
		for (int i = end; i >= start; i--) {
			s.append(str.charAt(i));
		}

		// 4.
		s.append(str.substring(end + 1));

		// 5.
		return s.toString();

	}

	@Test
	public void testReverse() {
		String str = "abcdefg";
		String str1 = reverse3(str, 2, 5);
		System.out.println(str1);// abfedcg

	}

	// 第3题
	// 判断str2在str1中出现的次数
	public int getCount(String mainStr, String subStr) {
		if (mainStr.length() >= subStr.length()) {
			int count = 0;
			int index = 0;
			// while((index = mainStr.indexOf(subStr)) != -1){
			// count++;
			// mainStr = mainStr.substring(index + subStr.length());
			// }
			// 改进：
			while ((index = mainStr.indexOf(subStr, index)) != -1) {
				index += subStr.length();
				count++;
			}

			return count;
		} else {
			return 0;
		}

	}

	@Test
	public void testGetCount() {
		String str1 = "cdabkkcadkabkebfkabkskab";
		String str2 = "ab";
		int count = getCount(str1, str2);
		System.out.println(count);
	}

	@Test
	public void testMyTrim() {
		String str = "   a   ";
		// str = " ";
		String newStr = myTrim(str);
		System.out.println("---" + newStr + "---");
	}

	// 第4题
	// 如果只存在一个最大长度的相同子串
	public String getMaxSameSubString(String str1, String str2) {
		if (str1 != null && str2 != null) {
			String maxStr = (str1.length() > str2.length()) ? str1 : str2;
			String minStr = (str1.length() > str2.length()) ? str2 : str1;

			int len = minStr.length();

			for (int i = 0; i < len; i++) {// 0 1 2 3 4 此层循环决定要去几个字符

				for (int x = 0, y = len - i; y <= len; x++, y++) {

					if (maxStr.contains(minStr.substring(x, y))) {

						return minStr.substring(x, y);
					}

				}

			}
		}
		return null;
	}

	// 如果存在多个长度相同的最大相同子串
	// 此时先返回String[]，后面可以用集合中的ArrayList替换，较方便
	public String[] getMaxSameSubString1(String str1, String str2) {
		if (str1 != null && str2 != null) {
			StringBuffer sBuffer = new StringBuffer();
			String maxString = (str1.length() > str2.length()) ? str1 : str2;
			String minString = (str1.length() > str2.length()) ? str2 : str1;

			int len = minString.length();
			for (int i = 0; i < len; i++) {
				for (int x = 0, y = len - i; y <= len; x++, y++) {
					String subString = minString.substring(x, y);
					if (maxString.contains(subString)) {
						sBuffer.append(subString + ",");
					}
				}
				System.out.println(sBuffer);
				if (sBuffer.length() != 0) {
					break;
				}
			}
			String[] split = sBuffer.toString().replaceAll(",$", "").split("\\,");
			return split;
		}

		return null;
	}
	// 如果存在多个长度相同的最大相同子串：使用ArrayList
//	public List<String> getMaxSameSubString1(String str1, String str2) {
//		if (str1 != null && str2 != null) {
//			List<String> list = new ArrayList<String>();
//			String maxString = (str1.length() > str2.length()) ? str1 : str2;
//			String minString = (str1.length() > str2.length()) ? str2 : str1;
//
//			int len = minString.length();
//			for (int i = 0; i < len; i++) {
//				for (int x = 0, y = len - i; y <= len; x++, y++) {
//					String subString = minString.substring(x, y);
//					if (maxString.contains(subString)) {
//						list.add(subString);
//					}
//				}
//				if (list.size() != 0) {
//					break;
//				}
//			}
//			return list;
//		}
//
//		return null;
//	}

	@Test
	public void testGetMaxSameSubString() {
		String str1 = "abcwerthelloyuiodef";
		String str2 = "cvhellobnmiodef";
		String[] strs = getMaxSameSubString1(str1, str2);
		System.out.println(Arrays.toString(strs));
	}

	// 第5题
	@Test
	public void testSort() {
		String str = "abcwerthelloyuiodef";
		char[] arr = str.toCharArray();
		Arrays.sort(arr);

		String newStr = new String(arr);
		System.out.println(newStr);
	}
}

```





### JDK8之前日期时间API

![image-20211023222725458](/assets/imgs/JavaSE3.assets/image-20211023222725458.png)



#### java.lang.System类

System类提供的public static long currentTimeMillis()用来返回当前时 间与1970年1月1日0时0分0秒之间以毫秒为单位的时间差。



==此方法适于计算时间差==



- 计算世界时间的主要标准有
  - UTC(Coordinated Universal Time)
  - GMT(Greenwich Mean Time)
  - CST(Central Standard Time)



```java
/**
 * 1. System 类中的 currentTimeMillis() 方法
 */
@Test
public void test1 () {

    // 返回当前时 间与1970年1月1日0时0分0秒之间以毫秒为单位的时间差, 称为时间戳
    long l = System.currentTimeMillis();
    System.out.println(l);
}
```



#### java.util.Date类

表示特定的瞬间，精确到毫秒



> 构造器

- Date()：使用无参构造器创建的对象可以获取本地当前时间。

- Date(long date)

  

> 常用方法

- getTime():返回自 1970 年 1 月 1 日 00:00:00 GMT 以来此 Date 对象 表示的毫秒数。
- toString():把此 Date 对象转换为以下形式的 String： dow mon dd hh:mm:ss zzz yyyy 其中： dow 是一周中的某一天 (Sun, Mon, Tue, Wed, Thu, Fri, Sat)，zzz是时间标准。
- 其它很多方法都过时了



```java
 /**
     * 2. Java.util.Date 类
     *      |--- java.sql.Date 类
     *
     * 1. 两个构造器的使用
     *      1. 构造器一 : 创建一个对应当前时间的 Date 对象
     *      2. 构造器二 : 创建指定毫秒数的 Date 对象
     * 2. 两个方法的使用
     *      1. toString() : 显示当前的年 月 日 时 分 秒
     *      2. getTime() : 获取当前 Date 对象对应的毫秒数 (时间戳)
     *
     * 3. java.sql.Date 对应数据库中的日期类型的变量
     *      1. 如果实例化
     *      2. java.sql.Date 对象 ---> java.util.Date 对象 : 多态
     *      3. java.util.Date 对象 ---> java.sql.Date 对象
     */
    @Test
    public void test2 () {

        // 构造器二 : 创建一个对应当前时间的 Date 对象
        Date d1 = new Date();

        System.out.println(d1.toString());

        System.out.println(d1.getTime());

        // 构造器二 : 创建指定毫秒数的 Date 对象
        Date d2 = new Date(1535000053003L);

        System.out.println(d2.toString());


        // 创建 java.sql.Date 的对象
        java.sql.Date d3 = new java.sql.Date(1535000053003L);

        System.out.println(d3);
        System.out.println(d3.getTime());


        // java.util.Date 对象 ---> java.sql.Date 对象
        // 情况 1
//        Date d4 = new java.sql.Date(1535000053003L);
//        java.sql.Date d5 = (java.sql.Date) d4;

        // 情况 2
        Date d6 = new Date();
        System.out.println(d6);
        // 直接强转会报错
//        java.sql.Date d7 = (java.sql.Date) d6;

        java.sql.Date d7 = new java.sql.Date(d6.getTime());
        System.out.println(d7);
    }
```



#### java.text.SimpleDateFormat类

- Date类的API不易于国际化，大部分被废弃了，java.text.SimpleDateFormat 类是一个不与语言环境有关的方式来格式化和解析日期的具体类。
- 它允许进行格式化：日期 -> 文本、解析：文本 -> 日期



- 格式化
  - SimpleDateFormat() ：默认的模式和语言环境创建对象
  - public SimpleDateFormat(String pattern)：该构造方法可以用参数pattern 指定的格式创建一个对象，该对象调用：
  - public String format(Date date)：方法格式化时间对象date
- 解析
- public Date parse(String source)：从给定字符串的开始解析文本，以生成 一个日期

![image-20211023223111822](/assets/imgs/JavaSE3.assets/image-20211023223111822.png)

```java
/**
 * SimpleDateFormat 的使用 : SimpleDateFormat 对日期 Date 类进行格式化和解析
 *
 * 1. 两个操作
 *      1. 格式化 : 日期 ---> 字符串
 *      2. 解析 : 格式化的逆过程, 字符串 ---> 日期
 */
@Test
public void testSimpleDateFormat () throws ParseException {

    // 实例化 SimpleDateFormat : 使用默认的构造器
    SimpleDateFormat sdf = new SimpleDateFormat();

    // 格式化 日期 --- 字符串
    Date date = new Date();

    System.out.println(date);

    String format = sdf.format(date);

    System.out.println(format);

    // 解析 : 格式化的逆过程, 字符串 ---> 日期
    String str = "22-10-24 下午2:03";
    Date date1 = sdf.parse(str);
    System.out.println(date1);


    // 按照指定的方式格式化和解析 : 使用带参的构造器
    SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    // 格式化
    System.out.println(format1.format(date));

    // 要求字符串必须是符合 SimpleDateFormat 识别的格式 (通过构造器参数体现), 否则就会抛异常
    String str1 = "1949-10-24 14:08:41";
    Date date2 = format1.parse(str1);
    System.out.println(date2);
}

/**
 * 练习 1 : 字符串 "2020-09-08" 转换为 java.sql.Date
 */
@Test
public void test1 () throws ParseException {

    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

    String str = "2020-09-08";

    Date parse = format.parse(str);

    System.out.println(parse);

    java.sql.Date date = new java.sql.Date(parse.getTime());

    System.out.println(date);

}

/**
 * 练习 2 : "三天打鱼两天晒网"  1990-01-01 xxxx-xx-xx  打鱼 ? 晒网?
 *
 * 举例 : 2021-10-24 ? 总天数
 *
 * 总天数 % 5 == 1, 2, 3 : 打鱼
 * 总天数 % 5 == 4, 0 : 打鱼
 *
 * 总天数计算 ?
 *
 * 方式一 : 计算毫秒数
 *          date1.getTime() date2.getTime() / (int) (1000 * 60 * 60 * 24) + 1
 *
 * 方式二 : 1990-01-01 ---> 2021-12-31 + 2021-01-01 ---> 2021-10-24
 */
@Test
public void test2 () throws ParseException {
    System.out.println("请输入当前时间(格式 : xxxx-xx-xx) :");

    Scanner sc = new Scanner(System.in);
    String str1 = sc.next();

    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

    Date parse = simpleDateFormat.parse(str1);

    // 方式一
    //        long nowTime = parse.getTime();
    //
    //        String str2 = "1990-01-01";
    //        Date parse2 = simpleDateFormat.parse(str2);
    //        long startTime = parse2.getTime();
    //
    //        int day = (int) ((nowTime - startTime ) / (1000 * 60 * 60 * 24));
    //
    //        System.out.println("day = " + day);
    //        int x = day % 5;
    //        System.out.println(x);
    //
    //        if (x == 1 || x == 2|| x == 3) {
    //            System.out.println("在打渔");
    //        } else {
    //            System.out.println("在晒网");
    //        }

    // 方式二



}
```



#### java.util.Calendar(日历)类



- Calendar是一个抽象基类，主用用于完成日期字段之间相互操作的功能。
- 获取Calendar实例的方法
  - 使用Calendar.getInstance()方法
  - 调用它的子类GregorianCalendar的构造器



- 一个Calendar的实例是系统时间的抽象表示，通过get(int field)方法来取得想 要的时间信息。比如YEAR、MONTH、DAY_OF_WEEK、HOUR_OF_DAY 、 MINUTE、SECOND
  - public void set(int field,int value)
  - public void add(int field,int amount)
  - public final Date getTime()
  - public final void setTime(Date date)
- 注意
  - 获取月份时：一月是0，二月是1，以此类推，12月是11
  - 获取星期时：周日是1，周二是2 ， 。。。。周六是7



```java
    /**
     * Calendar 日历类 (抽象类) 的使用
     */
    @Test
    public void test () {
        // 1. 实例化
        // 方式一 : 创建其子类 (GregorianCalendar) 的对象
        // 方式二 : 调用其静态方法

        Calendar instance = Calendar.getInstance();

//        System.out.println(instance.getClass());

        // 2. 常用方法

        // get()
        int day = instance.get(Calendar.DAY_OF_MONTH);
        System.out.println(day);
        System.out.println(instance.get(Calendar.DAY_OF_YEAR));

        // set()
        instance.set(Calendar.DAY_OF_MONTH, 22);
        System.out.println(instance.get(Calendar.DAY_OF_MONTH));

        // add()
        instance.add(Calendar.DAY_OF_MONTH, 5);
        System.out.println(instance.get(Calendar.DAY_OF_MONTH));
        instance.add(Calendar.DAY_OF_MONTH, -7);
        System.out.println(instance.get(Calendar.DAY_OF_MONTH));

        // getTime()
        Date time = instance.getTime();
        System.out.println(time);

        // setTime()
        Date date = new Date();
        instance.setTime(date);
        System.out.println(instance.get(Calendar.DAY_OF_MONTH));
    }
```



### JDK8中新日期时间API



> 新日期时间API出现的背景

如果我们可以跟别人说：“我们在1502643933071见面，别晚了！”那么就再简单不 过了。但是我们希望时间与昼夜和四季有关，于是事情就变复杂了。JDK 1.0中包含了 一个java.util.Date类，但是它的大多数方法已经在JDK 1.1引入Calendar类之后被弃用 了。而Calendar并不比Date好多少。它们面临的问题是：

- 可变性：像日期和时间这样的类应该是不可变的
- 偏移性：Date中的年份是从1900开始的，而月份都从0开始。
- 格式化：格式化只对Date有用，Calendar则不行。
- 此外，它们也不是线程安全的；不能处理闰秒等。
- 总结：对日期和时间的操作一直是Java程序员最痛苦的地方之一



#### 新时间日期API

第三次引入的API是成功的，并且Java 8中引入的java.time API 已经纠正了 过去的缺陷，将来很长一段时间内它都会为我们服务。



Java 8 吸收了 Joda-Time 的精华，以一个新的开始为 Java 创建优秀的 API。 新的 **java.time** 中包含了所有关于==本地日期（LocalDate）==、==本地时间 （LocalTime）==、==本地日期时间（LocalDateTime）==、==时区（ZonedDateTime）== 和==持续时间（Duration）==的类。历史悠久的 Date 类新增了 toInstant() 方法， 用于把 Date 转换成新的表示形式。这些新增的本地化时间日期 API 大大简 化了日期时间和本地化的管理



```java
// 说明：大多数开发者只会用到基础包和format包，也可能会用到temporal包。因此，尽管有68个新的公开类型，大多数开发者，大概将只会用到其中的三分之一。
java.time – 包含值对象的基础包
java.time.chrono – 提供对不同的日历系统的访问
java.time.format – 格式化和解析时间和日期
java.time.temporal – 包括底层框架和扩展特性
java.time.zone – 包含时区支持的类
```



#### LocalDate、LocalTime、LocalDateTime

 LocalDate、LocalTime、LocalDateTime 类是其中较重要的几个类，它们的实例 ==是不可变的对象==，分别表示使用 ISO-8601日历系统的日期、时间、日期和时间。 它们提供了简单的本地日期或时间，并不包含当前的时间信息，也不包含与时区 相关的信息。

- LocalDate代表IOS格式（yyyy-MM-dd）的日期,可以存储 生日、纪念日等日期
- LocalTime表示一个时间，而不是日期
- LocalDateTime是用来表示日期和时间的，这是一个最常用的类之一
- 注：ISO-8601日历系统是国际标准化组织制定的现代公民的日期和时间的表示 法，也就是公历



> 常用方法  

![image-20211024103856315](/assets/imgs/JavaSE3.assets/image-20211024103856315.png)



```java
/**
 * LocalDate LocalTime LocalDateTime
 *
 * 说明 :
 *      1. LocalDateTime 相较于 LocalDate 和 LocalTime 使用的频率更高
 *      2. 类似于 Calendar 类
 */
@Test
public void test1 () {

    // now() : 获取当前的日期 时间 时期+时间
    LocalDate now1 = LocalDate.now();
    LocalTime now2 = LocalTime.now();
    LocalDateTime now3 = LocalDateTime.now();

    System.out.println(now1);
    System.out.println(now2);
    System.out.println(now3);

    // of() : 设置指定的 年 月 日 时 分 秒 (无偏移量)
    LocalDateTime localDateTime = LocalDateTime.of(2021, 11, 11, 11, 11, 11);
    System.out.println(localDateTime);

    // getXxx()
    System.out.println(localDateTime.getDayOfMonth());
    System.out.println(localDateTime.getDayOfWeek());
    System.out.println(localDateTime.getDayOfYear());
    System.out.println(localDateTime.getHour());


    // withXxx() : 设置相关的属性, 体现了不可变性
    LocalDateTime localDateTime1 = localDateTime.withDayOfMonth(22);
    System.out.println(localDateTime);
    System.out.println(localDateTime1);

    // plusXxx() : 在当前对象的基础上加xxx
    LocalDateTime localDateTime2 = localDateTime.plusYears(11);
    System.out.println(localDateTime2);

    // minusXxx() : 在当前对象的基础上减xxx
    LocalDateTime localDateTime3 = localDateTime.minusYears(12);
    System.out.println(localDateTime3);

}
```



#### 瞬时：Instant



- Instant：时间线上的一个瞬时点。 这可能被用来记录应用程序中的事件时间 戳。



- 在处理时间和日期的时候，我们通常会想到年,月,日,时,分,秒。然而，这只是 时间的一个模型，是面向人类的。第二种通用模型是面向机器的，或者说是连 续的。在此模型中，时间线中的一个点表示为一个很大的数，这有利于计算机 处理。在UNIX中，这个数从1970年开始，以秒为的单位；同样的，在Java中， 也是从1970年开始，但以毫秒为单位。



- java.time包通过值类型Instant提供机器视图，不提供处理人类意义上的时间 单位。Instant表示时间线上的一点，而不需要任何上下文信息，例如，时区。 概念上讲，它只是简单的表示自1970年1月1日0时0分0秒（UTC）开始的秒 数。因为java.time包是基于纳秒计算的，所以Instant的精度可以达到纳秒级



- (1 ns = 10-9 s) 1秒 = 1000毫秒 =10^6微秒=10^9纳秒



> 常用方法

![image-20211024104010497](/assets/imgs/JavaSE3.assets/image-20211024104010497.png)



```java
/**
 * Instant 的使用
 * 类似于 java.util.Date
 */
@Test
public void testInstant () {
    // 1. 实例化
    // 1. now() : 计算的本初子午线的时间
    Instant now = Instant.now();

    // 2021-10-24T07:01:52.682Z
    System.out.println(now);

    // 添加时间的偏移量
    OffsetDateTime offsetDateTime = now.atOffset(ZoneOffset.ofHours(8));

    // 2021-10-24T15:01:52.682+08:00
    System.out.println(offsetDateTime);

    // 获取对应的毫秒数 (自1970年1月1日0时0分0秒（UTC）开始的毫秒数) ---> Date 类的 getTime()
    long l = now.toEpochMilli();
    System.out.println(l);

    // ofEpochMilli() : 通过给定的毫秒数, 获取 Instant 实例 ---> Date(long millis)
    Instant instant = Instant.ofEpochMilli(1635059055143L);
    System.out.println(instant);
}
```



#### 格式化与解析日期或时间



java.time.format.DateTimeFormatter 类：该类提供了三种格式化方法：

- 预定义的标准格式。如： ISO_LOCAL_DATE_TIME;ISO_LOCAL_DATE;ISO_LOCAL_TIME
- 本地化相关的格式。如：ofLocalizedDateTime(FormatStyle.LONG)
- 自定义的格式。如：ofPattern(“yyyy-MM-dd hh:mm:ss”)

![image-20211024104312204](/assets/imgs/JavaSE3.assets/image-20211024104312204.png)



```java
/**
 * DateTimeFormatter : 格式化或解析 日期 时间
 * 类似于 SimpleDateFormat
 */
@Test
public void testDateTimeFormatter () {

    // 实例化

    // 方式一 : 预定义的标准格式。如： ISO_LOCAL_DATE_TIME;ISO_LOCAL_DATE;ISO_LOCAL_TIME
    DateTimeFormatter isoLocalDateTime = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    // 格式化 日期 ---> 字符串
    LocalDateTime now = LocalDateTime.now();
    String str1 = isoLocalDateTime.format(now);
    System.out.println(str1);

    // 解析 : 字符串 ---> 日期
    TemporalAccessor parse1 = isoLocalDateTime.parse("2021-12-24T15:08:44.545");
    System.out.println(parse1);


    // 方式二 : 本地化相关的格式。如：ofLocalizedDateTime()
    // FormatStyle.SHORT FormatStyle.LONG FormatStyle.MEDIUM (适用于 LocalDateTime)
    DateTimeFormatter dateTimeFormatter1 = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.LONG);
    DateTimeFormatter dateTimeFormatter3 = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM);
    DateTimeFormatter dateTimeFormatter4 = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT);
    // 格式化
    String format1 = dateTimeFormatter1.format(now);
    String format2 = dateTimeFormatter3.format(now);
    String format3 = dateTimeFormatter4.format(now);

    System.out.println(format1);
    System.out.println(format2);
    System.out.println(format3);
    // System.out.println(format4);

    // 本地化相关的格式  如 : ofLocalizedDate()
    // FormatStyle.SHORT FormatStyle.LONG FormatStyle.FULL FormatStyle.MEDIUM (适用于 LocalDate)
    DateTimeFormatter dateTimeFormatter2 = DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL);
    String format4 = dateTimeFormatter2.format(LocalDate.now());
    System.out.println(format4);

    // 解析类似于方式一

    // 方式三 : 自定义的格式。如：ofPattern(“yyyy-MM-dd hh:mm:ss”) (重点)
    DateTimeFormatter pattern = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    // 格式化
    String str4 = pattern.format(now);
    System.out.println(str4);

    // 解析
    TemporalAccessor parse = pattern.parse("2021-10-24 15:22:03");
    System.out.println(parse);


}
```



#### 其它API



- ZoneId：该类中包含了所有的时区信息，一个时区的ID，如 Europe/Paris

- ZonedDateTime：一个在ISO-8601日历系统时区的日期时间，如 2007-12-03T10:15:30+01:00 Europe/Paris。
  - 其中每个时区都对应着ID，地区ID都为“{区域}/{城市}”的格式，例如：Asia/Shanghai等

- Clock：使用时区提供对当前即时、日期和时间的访问的时钟。
  - 持续时间：Duration，用于计算两个“时间”间隔
  - 日期间隔：Period，用于计算两个“日期”间隔

- TemporalAdjuster : 时间校正器。有时我们可能需要获取例如：将日期调整到“下一个工作日”等操作。

- TemporalAdjusters : 该类通过静态方法(firstDayOfXxx()/lastDayOfXxx()/nextXxx())提供了大量的常用TemporalAdjuster 的实现。



```java
//ZoneId:类中包含了所有的时区信息
// ZoneId的getAvailableZoneIds():获取所有的ZoneId
Set<String> zoneIds = ZoneId.getAvailableZoneIds();
for (String s : zoneIds) {
    System.out.println(s);
}
// ZoneId的of():获取指定时区的时间
LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of("Asia/Tokyo"));
System.out.println(localDateTime);
//ZonedDateTime:带时区的日期时间
// ZonedDateTime的now():获取本时区的ZonedDateTime对象
ZonedDateTime zonedDateTime = ZonedDateTime.now();
System.out.println(zonedDateTime);
// ZonedDateTime的now(ZoneId id):获取指定时区的ZonedDateTime对象
ZonedDateTime zonedDateTime1 = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
System.out.println(zonedDateTime1);


//Duration:用于计算两个“时间”间隔，以秒和纳秒为基准
LocalTime localTime = LocalTime.now();
LocalTime localTime1 = LocalTime.of(15, 23, 32);
//between():静态方法，返回Duration对象，表示两个时间的间隔
Duration duration = Duration.between(localTime1, localTime);
System.out.println(duration);
System.out.println(duration.getSeconds());
System.out.println(duration.getNano());
LocalDateTime localDateTime = LocalDateTime.of(2016, 6, 12, 15, 23, 32);
LocalDateTime localDateTime1 = LocalDateTime.of(2017, 6, 12, 15, 23, 32);
Duration duration1 = Duration.between(localDateTime1, localDateTime);
System.out.println(duration1.toDays());


//Period:用于计算两个“日期”间隔，以年、月、日衡量
LocalDate localDate = LocalDate.now();
LocalDate localDate1 = LocalDate.of(2028, 3, 18);
Period period = Period.between(localDate, localDate1);
System.out.println(period);
System.out.println(period.getYears());
System.out.println(period.getMonths());
System.out.println(period.getDays());
Period period1 = period.withYears(2);
System.out.println(period1);


// TemporalAdjuster:时间校正器
// 获取当前日期的下一个周日是哪天？
TemporalAdjuster temporalAdjuster = TemporalAdjusters.next(DayOfWeek.SUNDAY);
LocalDateTime localDateTime = LocalDateTime.now().with(temporalAdjuster);
System.out.println(localDateTime);
// 获取下一个工作日是哪天？
LocalDate localDate = LocalDate.now().with(new TemporalAdjuster() {
    @Override
    public Temporal adjustInto(Temporal temporal) {
        LocalDate date = (LocalDate) temporal;
        if (date.getDayOfWeek().equals(DayOfWeek.FRIDAY)) {
            return date.plusDays(3);
        } else if (date.getDayOfWeek().equals(DayOfWeek.SATURDAY)) {
            return date.plusDays(2);
        } else {
            return date.plusDays(1);
        }
    }
});
System.out.println("下一个工作日是：" + localDate);
```





#### 参考：与传统日期处理的转换

![image-20211024104534043](/assets/imgs/JavaSE3.assets/image-20211024104534043.png)

