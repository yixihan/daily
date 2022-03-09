---
title: JavaSE5
date: 2022-03-09
tags:
 - JavaSE
categories:
 - JavaSE
---

# JavaSE



## IO流



### File类的使用



- java.io.File类：==文件和文件目录路径==的抽象表示形式，与平台无关



- File 能新建、删除、重命名文件和目录，但 File 不能访问文件内容本身。 如果需要访问文件内容本身，则需要使用输入/输出流。



- ==想要在Java程序中表示一个真实存在的文件或目录，那么必须有一个File对 象，但是Java程序中的一个File对象，可能没有一个真实存在的文件或目录。==



- File对象可以作为参数传递给流的构造器



#### 常用构造器



- public File(String pathname)
  - 以pathname为路径创建File对象，可以是绝对路径或者相对路径，如果 pathname是相对路径，则默认的当前路径在系统属性user.dir中存储。
    - 绝对路径：是一个固定的路径,从盘符开始
    - 相对路径：是相对于某个位置开始
- public File(String parent,String child)
  - 以parent为父路径，child为子路径创建File对象。
- public File(File parent,String child)
  - 根据一个父File对象和子文件路径创建File对象



#### 路径分隔符



- 路径中的每级目录之间用一个==路径分隔符==隔开。
- 路径分隔符和系统有关：
  - windows和DOS系统默认使用“\”来表示
  - UNIX和URL使用“/”来表示
- Java程序支持跨平台运行，因此路径分隔符要慎用。
- 为了解决这个隐患，File类提供了一个常量：
  - public static final String separator。根据操作系统，动态的提供分隔符
- 举例：

```java
File file1 = new File("d:\\atguigu\\info.txt");
File file2 = new File("d:" + File.separator + "atguigu" + File.separator + "info.txt");
File file3 = new File("d:/atguigu");
```



#### 常用方法



- File类的获取功能
  - public String getAbsolutePath()：获取绝对路径
  - public String getPath() ：获取路径
  - public String getName() ：获取名称
  - public String getParent()：获取上层文件目录路径。若无，返回null
  - public long length() ：获取文件长度（即：字节数）。不能获取目录的长度。
  - public long lastModified() ：获取最后一次的修改时间，毫秒值
  - public String[] list() ：获取指定目录下的所有文件或者文件目录的名称数组
  - public File[] listFiles() ：获取指定目录下的所有文件或者文件目录的File数组
- File类的重命名功能
  - public boolean renameTo(File dest):把文件重命名为指定的文件路径
- File类的判断功能
  - public boolean isDirectory()：判断是否是文件目录
  - public boolean isFile() ：判断是否是文件
  - public boolean exists() ：判断是否存在
  - public boolean canRead() ：判断是否可读
  - public boolean canWrite() ：判断是否可写
  - public boolean isHidden() ：判断是否隐藏
- File类的创建功能
  - public boolean createNewFile() ：创建文件。若文件存在，则不创建，返回false
  - public boolean mkdir() ：创建文件目录。如果此文件目录存在，就不创建了。 如果此文件目录的上层目录不存在，也不创建。
  - public boolean mkdirs() ：创建文件目录。如果上层文件目录不存在，一并创建
  - ==注意事项：如果你创建文件或者文件目录没有写盘符路径，那么，默认在项目 路径下。==
- File类的删除功能
  - public boolean delete()：删除文件或者文件夹
  - **删除注意事项：**
    - Java中的删除不走**回收站**。
    - 要删除一个文件目录，请注意该文件目录内不能包含文件或者文件目录



```java
package com.yixihan.day1027.filetest;

import org.junit.Test;

import java.io.File;
import java.io.IOException;

/**
 * File 类的使用
 *
 *      1. File 类的一个对象, 代表一个文件或者一个文件目录 (俗称 : 文件夹)
 *      2. File 类声明在 java.io 包下
 *      3. File 类中涉及到关于文件或文件目录的创建 删除 重命名 修改时间 文件大小等方法
 *         并未涉及到写入或读取文件内容的操作, 如果需要读取或写入文件内容, 必须使用 IO 流来完成
 *      4. 后续 File 类的对象常会作为参数传递到流的构造器中, 指明读取或写入的 "终点"
 *
 * @author : yixihan
 * @create : 2021-10-27-22:48
 */
public class FileTest {


    /**
     * 1. 如何创建 File 类的实例
     *      File (String pathname)
     *      File (String parentPath, String childPath)
     *      File (File parentFile, String childPath)
     *
     * 2. 路径问题
     *      相对路径 : 相较于某个路径下 (module/project) , 指明的路径
     *      绝对路径 : 包含盘符在内的文件或文件目录的路径
     *
     * 3. 路径分隔符 :
     *      Window : \\
     *      Linux : /
     */
    @Test
    public void test1 () {

        // 构造器一
        // 相对于当前的 module
        File file1 = new File("hello1.txt");

        File file2 = new File("D:\\JAVA\\code\\code\\JavaSenior\\hello2.txt");


        // 构造器二
        File file3 = new File("D:\\JAVA\\code\\code", "JavaSenior");

        // 构造器三
        File file4 = new File(file3, "hi.txt");

        System.out.println(file1);
        System.out.println(file2);
        System.out.println(file3);
        System.out.println(file4);
    }


    /**
     * File类的获取功能
     *
     * - public String getAbsolutePath()：获取绝对路径
     * - public String getPath() ：获取路径
     * - public String getName() ：获取名称
     * - public String getParent()：获取上层文件目录路径。若无，返回null
     * - public long length() ：获取文件长度（即：字节数）。不能获取目录的长度。
     * - public long lastModified() ：获取最后一次的修改时间，毫秒值
     *
     * 如下的这两个方法适用于文件目录
     * - public String[] list() ：获取指定目录下的所有文件或者文件目录的名称数组
     * - public File[] listFiles() ：获取指定目录下的所有文件或者文件目录的File数组
     */
    @Test
    public void test2 () {
        File file1 = new File("hello.txt");
        File file2 = new File("D:\\io\\hi.txt");


        System.out.println(file1.getAbsolutePath());
        System.out.println(file1.getPath());
        System.out.println(file1.getName());
        System.out.println(file1.getParent());
        System.out.println(file1.length());
        System.out.println(file1.lastModified());

        System.out.println("*********************************");

        System.out.println(file2.getAbsolutePath());
        System.out.println(file2.getPath());
        System.out.println(file2.getName());
        System.out.println(file2.getParent());
        System.out.println(file2.length());
        System.out.println(file2.lastModified());


    }


    @Test
    public void test3 () {

        File file = new File("D:\\JAVA\\code\\code\\JavaSenior");

        String[] list = file.list();
        for (String name : list) {
            System.out.println(name);
        }

        File[] files = file.listFiles();
        for (File f : files) {
            System.out.println(f);
        }
    }


    /**
     * File类的重命名功能
     *
     * - public boolean renameTo(File dest):把文件重命名为指定的文件路径
     *      要想保证返回 true, 需要 file1 在硬盘中是存在的, 且 file2 在硬盘中是不存在的
     */
    @Test
    public void test4 () {
        File file1 = new File("hello.txt");
        File file2 = new File("D:\\io\\hi.txt");

        System.out.println(file2.renameTo(file1));
    }


    /**
     * File类的判断功能
     *
     * - public boolean isDirectory()：判断是否是文件目录
     * - public boolean isFile() ：判断是否是文件
     * - public boolean exists() ：判断是否存在
     * - public boolean canRead() ：判断是否可读
     * - public boolean canWrite() ：判断是否可写
     * - public boolean isHidden() ：判断是否隐藏
     */
    @Test
    public void test5 () {
        File file1 = new File("hello.txt");
        File file2 = new File("D:\\io");
        File file3 = new File("hell1o.txt");
        File file4 = new File("D:\\ixo");

        System.out.println(file1.isDirectory());
        System.out.println(file1.isFile());
        System.out.println(file1.exists());
        System.out.println(file1.canRead());
        System.out.println(file1.canWrite());
        System.out.println(file1.isHidden());

        System.out.println("****************************");

        System.out.println(file2.isDirectory());
        System.out.println(file2.isFile());
        System.out.println(file2.exists());
        System.out.println(file2.canRead());
        System.out.println(file2.canWrite());
        System.out.println(file2.isHidden());

        System.out.println("*****************************");

        System.out.println(file3.isDirectory());
        System.out.println(file3.isFile());
        System.out.println(file3.exists());
        System.out.println(file3.canRead());
        System.out.println(file3.canWrite());
        System.out.println(file3.isHidden());

        System.out.println("****************************");

        System.out.println(file4.isDirectory());
        System.out.println(file4.isFile());
        System.out.println(file4.exists());
        System.out.println(file4.canRead());
        System.out.println(file4.canWrite());
        System.out.println(file4.isHidden());


    }


    /**
     * File类的创建功能
     *
     * - public boolean createNewFile() ：创建文件。若文件存在，则不创建，返回false
     * - public boolean mkdir() ：创建文件目录。如果此文件目录存在，就不创建了。 如果此文件目录的上层目录不存在，也不创建。
     * - public boolean mkdirs() ：创建文件目录。如果上层文件目录不存在，一并创建
     * - 注意事项：如果你创建文件或者文件目录没有写盘符路径，那么，默认在项目 路径下。
     *
     * File类的删除功能
     *
     * - public boolean delete()：删除文件或者文件夹
     * - 删除注意事项：
     *   - Java中的删除不走回收站
     *   - 要删除一个文件目录，请注意该文件目录内不能包含文件或者文件目录
     */
    @Test
    public void test6 () throws IOException {
        File file1 = new File("hello1.txt");

        if (! file1.exists()) {
            file1.createNewFile();
            System.out.println("创建成功~");
        } else {
            file1.delete();
            System.out.println("删除成功~");
        }

    }

    @Test
    public void test7 () {
        // 文件目录的创建
        File file1 = new File("D:\\io\\io1\\io3");

        boolean mkdir1 = file1.mkdir();
        if (mkdir1) {
            System.out.println("创建成功~1");
        } else {
            System.out.println("创建失败~1");
        }

        File file2 = new File("D:\\io\\io1\\io4");

        boolean mkdir2 = file2.mkdirs();
        if (mkdir2) {
            System.out.println("创建成功~2");
        } else {
            System.out.println("创建失败~2");
        }

        // 要想删除成功, io4 文件目录下不能包含文件或者文件目录
        File file3 = new File("D\\io\\io1\\io4");
        System.out.println(file3.delete());
    }
}

```



#### 练习



##### 练习一

```java
package com.yixihan.day1027.filetest.exer.test1;

import org.junit.Test;

import java.io.File;
import java.io.IOException;

/**
 * 1. 利用File构造器，new 一个文件目录file
 * 1)在其中创建多个文件和目录
 * 2)编写方法，实现删除file中指定文件的操作
 *
 *
 * 2. 判断指定目录下是否有后缀名为.jpg的文件，如果有，就输出该文件名称
 *
 *
 * 3. 遍历指定目录所有文件名称，包括子文件目录中的文件。
 * 拓展1：并计算指定目录占用空间的大小
 * 拓展2：删除指定文件目录及其下的所有文件
 * @author : yixihan
 * @create : 2021-10-27-23:23
 */
public class FileTest {

    @Test
    public void test1 () throws IOException {
        File file = new File("D:\\io\\io3\\hello.txt");

        // 创建一个与 file 同目录下的另外一个文件, 文件名为 : haha.txt

        File file1 = new File(file.getParent(), "haha.txt");

        boolean newFile = file1.createNewFile();
        if (newFile) {
            System.out.println("创建成功~");
        }
    }
    
}
```



##### 练习二

```java
package com.yixihan.day1027.filetest.exer.test1;

import org.junit.Test;

import java.io.File;
import java.io.FilenameFilter;
/**
 * 课后练习2：判断指定目录下是否有后缀名为.jpg的文件，如果有，就输出该文件名称
 * @author shkstart 邮箱：shkstart@126.com
 * @version  创建时间：2019年2月23日  上午1:55:59
 *
 */
public class FindJPGFileTest {

   @Test
   public void test1(){
      File srcFile = new File("d:\\code");
      
      String[] fileNames = srcFile.list();
      for(String fileName : fileNames){
         if(fileName.endsWith(".jpg")){
            System.out.println(fileName);
         }
      }
   }
   @Test
   public void test2(){
      File srcFile = new File("d:\\code");
      
      File[] listFiles = srcFile.listFiles();
      for(File file : listFiles){
         if(file.getName().endsWith(".jpg")){
            System.out.println(file.getAbsolutePath());
         }
      }
   }
   /*
    * File类提供了两个文件过滤器方法
    * public String[] list(FilenameFilter filter)
    * public File[] listFiles(FileFilter filter)

    */
   @Test
   public void test3(){
      File srcFile = new File("d:\\code");
      
      File[] subFiles = srcFile.listFiles(new FilenameFilter() {
         
         @Override
         public boolean accept(File dir, String name) {
            return name.endsWith(".jpg");
         }
      });
      
      for(File file : subFiles){
         System.out.println(file.getAbsolutePath());
      }
   }
   
}
```



##### 练习三

```java
package com.yixihan.day1027.filetest.exer.test1;

import java.io.File;
/**
 * 3. 遍历指定目录所有文件名称，包括子文件目录中的文件。
   拓展1：并计算指定目录占用空间的大小
   拓展2：删除指定文件目录及其下的所有文件

 * @author shkstart 邮箱：shkstart@126.com
 * @version  创建时间：2019年2月23日  上午1:55:31
 *
 */
public class ListFilesTest {

   public static void main(String[] args) {
      // 递归:文件目录
      /** 打印出指定目录所有文件名称，包括子文件目录中的文件 */

      // 1.创建目录对象
      File dir = new File("E:\\teach\\01_javaSE\\_尚硅谷Java编程语言\\3_软件");

      // 2.打印目录的子文件
      printSubFile(dir);
   }

   public static void printSubFile(File dir) {
      // 打印目录的子文件
      File[] subfiles = dir.listFiles();

      for (File f : subfiles) {
         if (f.isDirectory()) {// 文件目录
            printSubFile(f);
         } else {// 文件
            System.out.println(f.getAbsolutePath());
         }

      }
   }

   // 方式二：循环实现
   // 列出file目录的下级内容，仅列出一级的话
   // 使用File类的String[] list()比较简单
   public void listSubFiles(File file) {
      if (file.isDirectory()) {
         String[] all = file.list();
         for (String s : all) {
            System.out.println(s);
         }
      } else {
         System.out.println(file + "是文件！");
      }
   }

   // 列出file目录的下级，如果它的下级还是目录，接着列出下级的下级，依次类推
   // 建议使用File类的File[] listFiles()
   public void listAllSubFiles(File file) {
      if (file.isFile()) {
         System.out.println(file);
      } else {
         File[] all = file.listFiles();
         // 如果all[i]是文件，直接打印
         // 如果all[i]是目录，接着再获取它的下一级
         for (File f : all) {
            listAllSubFiles(f);// 递归调用：自己调用自己就叫递归
         }
      }
   }

   // 拓展1：求指定目录所在空间的大小
   // 求任意一个目录的总大小
   public long getDirectorySize(File file) {
      // file是文件，那么直接返回file.length()
      // file是目录，把它的下一级的所有大小加起来就是它的总大小
      long size = 0;
      if (file.isFile()) {
         size += file.length();
      } else {
         File[] all = file.listFiles();// 获取file的下一级
         // 累加all[i]的大小
         for (File f : all) {
            size += getDirectorySize(f);// f的大小;
         }
      }
      return size;
   }

   // 拓展2：删除指定的目录
   public void deleteDirectory(File file) {
      // 如果file是文件，直接delete
      // 如果file是目录，先把它的下一级干掉，然后删除自己
      if (file.isDirectory()) {
         File[] all = file.listFiles();
         // 循环删除的是file的下一级
         for (File f : all) {// f代表file的每一个下级
            deleteDirectory(f);
         }
      }
      // 删除自己
      file.delete();
   }

}
```



### IO流原理及流的分类



#### Java IO原理



- I/O是Input/Output的缩写， I/O技术是非常实用的技术，用于 ==处理设备之间的数据传输==。如读/写文件，网络通讯等
- Java程序中，对于数据的输入/输出操作以==“流(stream)”== 的 方式进行。
- java.io包下提供了各种“流”类和接口，用以获取不同种类的 数据，并通过==标准的方法==输入或输出数据。



- 输入input：读取外部数据（磁 盘、光盘等存储设备的数据）到 程序（内存）中。
- 输出output：将程序（内存） 数据输出到磁盘、光盘等存储设 备中。

![image-20211028122810355](/assets/imgs/JavaSE5.assets/image-20211028122810355.png)



#### 流的分类



- 按操作==数据单位==不同分为：字节流(8 bit)，字符流(16 bit)
- 按数据流的==流向==不同分为：输入流，输出流
- 按流的==角色==的不同分为：节点流，处理流
  - Java的IO流共涉及40多个类，实际上非常规则，都是从如下4个 抽象基类派生的。
  - 由这四个类派生出来的子类名称都是以其父类名作为子类名后缀。

![image-20211028114514446](/assets/imgs/JavaSE5.assets/image-20211028114514446.png)

![image-20211028114524123](/assets/imgs/JavaSE5.assets/image-20211028114524123.png)

![image-20211028114531916](/assets/imgs/JavaSE5.assets/image-20211028114531916.png)



> IO 流体系

![image-20211028114547687](/assets/imgs/JavaSE5.assets/image-20211028114547687.png)



#### 节点流和处理流



- 节点流：直接从数据源或目的地读写数据

![image-20211028114617636](/assets/imgs/JavaSE5.assets/image-20211028114617636.png)

- 处理流：不直接连接到数据源或目的地，而是“连接”在已存 在的流（节点流或处理流）之上，通过对数据的处理为程序提 供更为强大的读写功能。

![image-20211028114633804](/assets/imgs/JavaSE5.assets/image-20211028114633804.png)



#### InputStream & Reader



- InputStream 和 Reader 是所有输入流的基类。
- InputStream（典型实现：==FileInputStream==）
  - int read()
  - int read(byte[] b)
  - int read(byte[] b, int off, int len)
- Reader（典型实现：==FileReader==）
  - int read()
  - int read(char [] c)
  - int read(char [] c, int off, int len)
- 程序中打开的文件 IO 资源不属于内存里的资源，垃圾回收机制无法回收该资 源，所以应该**显式关闭文件 IO 资源。**
- FileInputStream 从文件系统中的某个文件中获得输入字节。FileInputStream 用于读取非文本数据之类的原始字节流。要读取字符流，需要使用 FileReader



##### InputStream



- int read()

  从输入流中读取数据的下一个字节。返回 0 到 255 范围内的 int 字节值。如果因 为已经到达流末尾而没有可用的字节，则返回值 -1。

- int read(byte[] b)

  从此输入流中将最多 b.length 个字节的数据读入一个 byte 数组中。如果因为已 经到达流末尾而没有可用的字节，则返回值 -1。否则以**整数形式返回实际读取 的字节数。**

- int read(byte[] b, int off,int len)

  将输入流中最多 len 个数据字节读入 byte 数组。尝试读取 len 个字节，但读取 的字节也可能小于该值。以整数形式返回实际读取的字节数。如果因为流位于 文件末尾而没有可用的字节，则返回值 -1。

- public void close() throws IOException

  关闭此输入流并释放与该流关联的所有系统资源。



##### Reader



-  int read()

  读取单个字符。作为整数读取的字符，范围在 0 到 65535 之间 (0x00-0xffff)（2个 字节的Unicode码），如果已到达流的末尾，则返回 -1

- int read(char[] cbuf)

  将字符读入数组。如果已到达流的末尾，则返回 -1。否则返回本次读取的字符数。

- int read(char[] cbuf,int off,int len)

  将字符读入数组的某一部分。存到数组cbuf中，从off处开始存储，最多读len个字 符。如果已到达流的末尾，则返回 -1。否则返回本次读取的字符数。

- public void close() throws IOException

  关闭此输入流并释放与该流关联的所有系统资源。



#### OutputStream & Writer



- OutputStream 和 Writer 也非常相似
  - void write(int b/int c);
  - void write(byte[] b/char[] cbuf);
  - void write(byte[] b/char[] buff, int off, int len);
  - void flush();
  - void close(); 需要先刷新，再关闭此流
- 因为字符流直接以字符作为操作单位，所以 Writer 可以用字符串来替换字符数组， 即以 String 对象作为参数
  - void write(String str);
  - void write(String str, int off, int len);
- FileOutputStream 从文件系统中的某个文件中获得输出字节。FileOutputStream 用于写出非文本数据之类的原始字节流。要写出字符流，需要使用 FileWriter



##### OutputStream



- void write(int b)

  将指定的字节写入此输出流。write 的常规协定是：向输出流写入一个字节。要写 入的字节是参数 b 的八个低位。b 的 24 个高位将被忽略。 即写入0~255范围的。

- void write(byte[] b)

  将 b.length 个字节从指定的 byte 数组写入此输出流。write(b) 的常规协定是：应该 与调用 write(b, 0, b.length) 的效果完全相同。

- void write(byte[] b,int off,int len)

  将指定 byte 数组中从偏移量 off 开始的 len 个字节写入此输出流。

- public void flush()throws IOException

  刷新此输出流并强制写出所有缓冲的输出字节，调用此方法指示应将这些字节立 即写入它们预期的目标。

- public void close() throws IOException

  关闭此输出流并释放与该流关联的所有系统资源。



##### Writer



- void write(int c)

  写入单个字符。要写入的字符包含在给定整数值的 16 个低位中，16 高位被忽略。 即 写入0 到 65535 之间的Unicode码。

- void write(char[] cbuf)

  写入字符数组

- void write(char[] cbuf,int off,int len)

  写入字符数组的某一部分。从off开始，写入len个字符

- void write(String str)

  写入字符串。

- void write(String str,int off,int len)

  写入字符串的某一部分。

- void flush()

  刷新该流的缓冲，则立即将它们写入预期目标

- public void close() throws IOException

  关闭此输出流并释放与该流关联的所有系统资源。



### 节点流(或文件流)



#### 读取文件

- FileReader fr = new FileReader(new File(“Test.txt”));

  建立一个流对象，将已存在的一个文件加载进流

- char[] ch = new char[1024];

  创建一个临时存放数据的数组

-  fr.read(ch);

  调用流对象的读取方法将流中的数据读入到数组中。

- fr.close();

  关闭资源



```java
FileReader fr = null;
try {
    fr = new FileReader(new File("c:\\test.txt"));
    char[] buf = new char[1024];
    int len;
    while ((len = fr.read(buf)) != -1) {
        System.out.print(new String(buf, 0, len));
    }
} catch (IOException e) {
    System.out.println("read-Exception :" + e.getMessage());
} finally {
    if (fr != null) {
        try {
            fr.close();
        } catch (IOException e) {
            System.out.println("close-Exception :" + e.getMessage());
        }
    }
}

```



#### 写入文件



- FileWriter fw = new FileWriter(new File(“Test.txt”));

  创建流对象，建立数据存放文件

- fw.write(“atguigu-songhongkang”);

  调用流对象的写入方法，将数据写入流

- fw.close();

  关闭流资源，并将流中的数据清空到文件中



```java
FileWriter fw = null;
try {
    fw = new FileWriter(new File("Test.txt"));
    fw.write("atguigu-songhongkang");
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (fw != null)
        try {
            fw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
}
```



#### 注意点



- 定义文件路径时，注意：可以用“/”或者“\\”。
- 在==写入==一个文件时，如果使用构造器FileOutputStream(file)，则**目录下有同名文 件将被覆盖。**
- 如果使用构造器FileOutputStream(file,true)，则目录下的同名文件不会被覆盖， **在文件内容末尾追加内容。**
- 在==读取==文件时，必须保证该文件已存在，否则报异常。
- 字节流操作字节，比如：.mp3，.avi，.rmvb，mp4，.jpg，.doc，.ppt
- 字符流操作字符，只能操作普通文本文件。最常见的文本文 件：.txt，.java，.c，.cpp 等语言的源代码。尤其注意.doc,excel,ppt这些不是文 本文件。





### 缓冲流



- ==为了提高数据读写的速度==，Java API提供了带缓冲功能的流类，在使用这些流类 时，会创建一个内部缓冲区数组，缺省使用**8192个字节(8Kb)的缓冲区。**

![image-20211028120209526](/assets/imgs/JavaSE5.assets/image-20211028120209526.png)

- 缓冲流要“套接”在相应的节点流之上，根据数据操作单位可以把缓冲流分为：
  - BufferedInputStream 和 BufferedOutputStream
  - BufferedReader 和 BufferedWriter
- 当读取数据时，数据按块读入缓冲区，其后的读操作则直接访问缓冲区
- 当使用BufferedInputStream读取字节文件时，BufferedInputStream会一次性从 文件中读取8192个(8Kb)，存在缓冲区中，直到缓冲区装满了，才重新从文件中 读取下一个8192个字节数组
- 向流中写入字节时，不会直接写到文件，先写到缓冲区中直到缓冲区写满， BufferedOutputStream才会把缓冲区中的数据一次性写到文件里。使用方法 **flush()可以强制将缓冲区的内容全部写入输出流**
- 关闭流的顺序和打开流的顺序相反。只要关闭最外层流即可，关闭最外层流也 会相应关闭内层节点流
- flush()方法的使用：手动将buffer中内容写入文件
- 如果是带缓冲区的流对象的close()方法，不但会关闭流，还会在关闭流之前刷 新缓冲区，关闭后不能再写出

![image-20211028120304170](/assets/imgs/JavaSE5.assets/image-20211028120304170.png)



```java
BufferedReader br = null;
BufferedWriter bw = null;
try {
    // 创建缓冲流对象：它是处理流，是对节点流的包装
    br = new BufferedReader(new FileReader("d:\\IOTest\\source.txt"));
    bw = new BufferedWriter(new FileWriter("d:\\IOTest\\dest.txt"));
    String str;
    while ((str = br.readLine()) != null) { // 一次读取字符文本文件的一行字符
        bw.write(str); // 一次写入一行字符串
        bw.newLine(); // 写入行分隔符
    }
    bw.flush(); // 刷新缓冲区
} catch (IOException e) {
    e.printStackTrace();
} finally {
    // 关闭IO流对象
    try {
        if (bw != null) {
            bw.close(); // 关闭过滤流时,会自动关闭它所包装的底层节点流
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
    try {
        if (br != null) {
            br.close();
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```





### 转换流



- 转换流提供了在字节流和字符流之间的转换

- Java API提供了两个转换流：

  - InputStreamReader：将InputStream转换为Reader
  - OutputStreamWriter：将Writer转换为OutputStream

- 字节流中的数据都是字符时，转成字符流操作更高效

- 很多时候我们使用转换流来处理文件乱码问题。实现编码和 解码的功能



#### InputStreamReader



- **实现将字节的输入流按指定字符集转换为字符的输入流。**
- 需要和InputStream“套接”。
- 构造器
  - public InputStreamReader(InputStream in)
  - public InputSreamReader(InputStream in,String charsetName)
  - 如： Reader isr = new InputStreamReader(System.in,”gbk”);



#### OutputStreamWriter



- **实现将字符的输出流按指定字符集转换为字节的输出流。**
- 需要和OutputStream“套接”。
- 构造器
  - public OutputStreamWriter(OutputStream out)
  - public OutputSreamWriter(OutputStream out,String charsetName)



![image-20211028120625239](/assets/imgs/JavaSE5.assets/image-20211028120625239.png)



```java
public void testMyInput() throws Exception {
    FileInputStream fis = new FileInputStream("dbcp.txt");
    FileOutputStream fos = new FileOutputStream("dbcp5.txt");
    InputStreamReader isr = new InputStreamReader(fis, "GBK");
    OutputStreamWriter osw = new OutputStreamWriter(fos, "GBK");
    BufferedReader br = new BufferedReader(isr);
    BufferedWriter bw = new BufferedWriter(osw);
    String str = null;
    while ((str = br.readLine()) != null) {
        bw.write(str);
        bw.newLine();
        bw.flush();
    }
    bw.close();
    br.close();
}
```



#### 补充：字符编码



> 编码表的由来

计算机只能识别二进制数据，早期由来是电信号。为了方便应用计算机，让它可以识 别各个国家的文字。就将各个国家的文字用数字来表示，并一一对应，形成一张表。 这就是编码表。



> 常见的编码表

- ASCII：美国标准信息交换码
  - 用一个字节的7位可以表示。
- ISO8859-1：拉丁码表。欧洲码表
  - 用一个字节的8位表示。
- GB2312：中国的中文编码表。最多两个字节编码所有字符
- GBK：中国的中文编码表升级，融合了更多的中文文字符号。最多两个字节编码
- Unicode：国际标准码，融合了目前人类使用的所有字符。为每个字符分配唯一的 字符码。所有的文字都用两个字节来表示
- UTF-8：变长的编码方式，可用1-4个字节来表示一个字符。



![image-20211028120759164](/assets/imgs/JavaSE5.assets/image-20211028120759164.png)



Unicode不完美，这里就有三个问题，

一个是，我们已经知道，英文字母只用 一个字节表示就够了，

第二个问题是如何才能区别Unicode和ASCII？计算机 怎么知道两个字节表示一个符号，而不是分别表示两个符号呢？

第三个，如果 和GBK等双字节编码方式一样，用最高位是1或0表示两个字节和一个字节， 就少了很多值无法用于表示字符，不够表示所有字符。

Unicode在很长一段时 间内无法推广，直到互联网的出现。



- 面向传输的众多 UTF（UCS Transfer Format）标准出现了，顾名思义，**UTF8就是每次8个位传输数据，而UTF-16就是每次16个位**。这是为传输而设计的 编码，并使编码无国界，这样就可以显示全世界上所有文化的字符了。
- **Unicode只是定义了一个庞大的、全球通用的字符集，并为每个字符规定了唯 一确定的编号，具体存储成什么样的字节流，取决于字符编码方案。**推荐的 Unicode编码是UTF-8和UTF-16。



![image-20211028120905438](/assets/imgs/JavaSE5.assets/image-20211028120905438.png)

![image-20211028120914762](/assets/imgs/JavaSE5.assets/image-20211028120914762.png)



- 编码：字符串 -> 字节数组
- 解码：字节数组 -> 字符串
- 转换流的编码应用
  - 可以将字符按指定编码格式存储
  - 可以对文本数据按指定编码格式来解读
  - 指定编码表的动作由构造器完成





### 标准输入、输出流



- ==System.in==和==System.out==分别代表了系统标准的输入和输出设备
- 默认输入设备是：键盘，输出设备是：显示器
-  System.in的类型是InputStream
- System.out的类型是PrintStream，其是OutputStream的子类
- 重定向：通过System类的setIn，setOut方法对默认设备进行改变。
  - public static void setIn(InputStream in)
  - public static void setOut(PrintStream out)



```java
System.out.println("请输入信息(退出输入e或exit):");
// 把"标准"输入流(键盘输入)这个字节流包装成字符流,再包装成缓冲流
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
String s = null;
try {
    while ((s = br.readLine()) != null) { // 读取用户输入的一行数据 --> 阻塞程序
        if ("e".equalsIgnoreCase(s) || "exit".equalsIgnoreCase(s)) {
            System.out.println("安全退出!!");
            break;
        }
        // 将读取到的整行字符串转成大写输出
        System.out.println("-->:" + s.toUpperCase());
        System.out.println("继续输入信息");
    }
} catch (IOException e) {
    e.printStackTrace();
} finally {
    try {
        if (br != null) {
            br.close(); // 关闭过滤流时,会自动关闭它包装的底层节点流
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```



### 打印流



- 实现将==基本数据类型==的数据格式转化为==字符串==输出
- 打印流：==PrintStream==和==PrintWriter==
  - 提供了一系列重载的print()和println()方法，用于多种数据类型的输出
  - PrintStream和PrintWriter的输出不会抛出IOException异常
  - PrintStream和PrintWriter有自动flush功能
  - PrintStream 打印的所有字符都使用平台的默认字符编码转换为字节。 在需要写入字符而不是写入字节的情况下，应该使用 PrintWriter 类。
  - System.out返回的是PrintStream的实例



```java
PrintStream ps = null;
try {
    FileOutputStream fos = new FileOutputStream(new File("D:\\IO\\text.txt"));
    // 创建打印输出流,设置为自动刷新模式(写入换行符或字节 '\n' 时都会刷新输出缓冲区)
    ps = new PrintStream(fos, true);
    if (ps != null) {// 把标准输出流(控制台输出)改成文件
        System.setOut(ps);
    }
    for (int i = 0; i <= 255; i++) { // 输出ASCII字符
        System.out.print((char) i);
        if (i % 50 == 0) { // 每50个数据一行
            System.out.println(); // 换行
        }
    }
} catch (FileNotFoundException e) {
    e.printStackTrace();
} finally {
    if (ps != null) {
        ps.close();
    }
}
```





### 数据流



- 为了方便地操作Java语言的基本数据类型和String的数据，可以使用数据流。

- 数据流有两个类：(用于读取和写出基本数据类型、String类的数据）

  - ==DataInputStream 和 DataOutputStream==
  - ==分别“套接”在 InputStream 和 OutputStream 子类的流上==

- DataInputStream中的方法

  boolean readBoolean() 					byte readByte() 

  char readChar() 								 float readFloat()

  double readDouble()						 short readShort() 

  long readLong() 								 int readInt() 

  String readUTF() 								void readFully(byte[] b)

- DataOutputStream中的方法

  - 将上述的方法的read改为相应的write即可



```java
DataOutputStream dos = null;
try { // 创建连接到指定文件的数据输出流对象
    dos = new DataOutputStream(new FileOutputStream("destData.dat"));
    dos.writeUTF("我爱北京天安门"); // 写UTF字符串
    dos.writeBoolean(false); // 写入布尔值
    dos.writeLong(1234567890L); // 写入长整数
    System.out.println("写文件成功!");
} catch (IOException e) {
    e.printStackTrace();
} finally { // 关闭流对象
    try {
        if (dos != null) {
            // 关闭过滤流时,会自动关闭它包装的底层节点流
            dos.close();
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```



```java
DataInputStream dis = null;
try {
    dis = new DataInputStream(new FileInputStream("destData.dat"));
    String info = dis.readUTF();
    boolean flag = dis.readBoolean();
    long time = dis.readLong();
    System.out.println(info);
    System.out.println(flag);
    System.out.println(time);
} catch (Exception e) {
    e.printStackTrace();
} finally {
    if (dis != null) {
        try {
            dis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```





### 对象流



- ==ObjectInputStream和OjbectOutputSteam==

  - 用于存储和读取**基本数据类型**数据或对象的处理流。它的强大之处就是可 以把Java中的对象写入到数据源中，也能把对象从数据源中还原回来。

- 序列化：用ObjectOutputStream类**保存**基本类型数据或对象的机制

- 反序列化：用ObjectInputStream类**读取**基本类型数据或对象的机制

- ObjectOutputStream和ObjectInputStream不能序列化static和transient修 饰的成员变量

  

#### 对象的序列化



- ==对象序列化机制==允许把内存中的Java对象转换成平台无关的二进制流，从 而允许把这种二进制流持久地保存在磁盘上，或通过网络将这种二进制流传 输到另一个网络节点。//当其它程序获取了这种二进制流，就可以恢复成原 来的Java对象
- 序列化的好处在于可将任何实现了Serializable接口的对象转化为==字节数据==， 使其在保存和传输时可被还原
- 序列化是 RMI（Remote Method Invoke – 远程方法调用）过程的参数和返 回值都必须实现的机制，而 RMI 是 JavaEE 的基础。因此序列化机制是 JavaEE 平台的基础
- 如果需要让某个对象支持序列化机制，则必须让对象所属的类及其属性是可 序列化的，为了让某个类是可序列化的，该类必须实现如下两个接口之一。 否则，会抛出NotSerializableException异常
  - ==Serializable==
  - Externalizable
- 凡是实现Serializable接口的类都有一个表示序列化版本标识符的静态变量：
  - ==private static final long serialVersionUID;==
  - serialVersionUID用来表明类的不同版本间的兼容性。简言之，其目的是以序列化对象 进行版本控制，有关各版本反序列化时是否兼容
  - 如果类没有显示定义这个静态常量，它的值是Java运行时环境根据类的内部细节自 动生成的。**若类的实例变量做了修改，serialVersionUID 可能发生变化**。故建议， 显式声明
- 简单来说，Java的序列化机制是通过在运行时判断类的serialVersionUID来验 证版本一致性的。在进行反序列化时，JVM会把传来的字节流中的 serialVersionUID与本地相应实体类的serialVersionUID进行比较，如果相同 就认为是一致的，可以进行反序列化，否则就会出现序列化版本不一致的异 常。(InvalidCastException)



#### 使用对象流序列化对象



- 若某个类实现了 Serializable 接口，该类的对象就是可序列化的：
  - 创建一个 ObjectOutputStream
  - 调用 ObjectOutputStream 对象的 writeObject(对象) 方法输出可序列化对象
  - 注意写出一次，操作flush()一次
- 反序列化
  - 创建一个 ObjectInputStream
  - 调用 readObject() 方法读取流中的对象
- 强调：如果某个类的属性不是基本数据类型或 String 类型，而是另一个 引用类型，那么这个引用类型必须是可序列化的，否则拥有该类型的 Field 的类也不能序列化



```java
//序列化：将对象写入到磁盘或者进行网络传输。
//要求对象必须实现序列化
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(“data.txt"));
Person p = new Person("韩梅梅", 18, "中华大街", new Pet());
oos.writeObject(p);
oos.flush();
oos.close();

//反序列化：将磁盘中的对象数据源读出。
ObjectInputStream ois = new ObjectInputStream(new FileInputStream(“data.txt"));
Person p1 = (Person)ois.readObject();
System.out.println(p1.toString());
ois.close();
```



> 谈谈你对java.io.Serializable接口的理解，我们知道它用于序列化， 是空方法接口，还有其它认识吗？



- 实现了Serializable接口的对象，可将它们转换成一系列字节，并可在以后 完全恢复回原来的样子。==这一过程亦可通过网络进行。这意味着序列化机 制能自动补偿操作系统间的差异==。换句话说，可以先在Windows机器上创 建一个对象，对其序列化，然后通过网络发给一台Unix机器，然后在那里 准确无误地重新“装配”。不必关心数据在不同机器上如何表示，也不必 关心字节的顺序或者其他任何细节。
- 由于大部分作为参数的类如String、Integer等都实现了 java.io.Serializable的接口，也可以利用多态的性质，作为参数使接口更 灵活





### 随机存取文件流



#### RandomAccessFile 类



- RandomAccessFile 声明在java.io包下，但直接继承于java.lang.Object类。并 且它实现了DataInput、DataOutput这两个接口，也就意味着这个类既可以读也 可以写
- RandomAccessFile 类支持 “随机访问” 的方式，程序可以直接跳到文件的任意 地方来**读、写**文件
  - 支持只访问文件的部分内容
  - 可以向已存在的文件后追加内容
- RandomAccessFile 对象包含一个记录指针，用以标示当前读写处的位置。 RandomAccessFile 类对象可以自由移动记录指针
  - long getFilePointer()：获取文件记录指针的当前位置
  - void seek(long pos)：将文件记录指针定位到 pos 位置
- 构造器
  - public RandomAccessFile(File file, String mode) 
  - public RandomAccessFile(String name, String mode)
- 创建 RandomAccessFile 类实例需要指定一个 mode 参数，该参数指 定 RandomAccessFile 的访问模式：
  - ==r: 以只读方式打开==
  - ==rw：打开以便读取和写入==
  - ==rwd:打开以便读取和写入；同步文件内容的更新==
  -  ==rws:打开以便读取和写入；同步文件内容和元数据的更新==
- 如果模式为只读r。则不会创建文件，而是会去读取一个已经存在的文件， 如果读取的文件不存在则会出现异常。 如果模式为rw读写。如果文件不 存在则会去创建文件，如果存在则不会创建



我们可以用RandomAccessFile这个类，来实现一个多线程断点下载的功能， 用过下载工具的朋友们都知道，下载前都会建立两个临时文件，一个是与 被下载文件大小相同的空文件，另一个是记录文件指针的位置文件，每次 暂停的时候，都会保存上一次的指针，然后断点下载的时候，会继续从上 一次的地方下载，从而实现断点下载或上传的功能，有兴趣的朋友们可以 自己实现下。



#### 读取文件内容



```java
RandomAccessFile raf = new RandomAccessFile(“test.txt”, “rw”）;
raf.seek(5);
byte [] b = new byte[1024];
int off = 0;
int len = 5;
raf.read(b, off, len);
String str = new String(b, 0, len);
System.out.println(str);
raf.close();
```



#### 写入文件内容



```java
RandomAccessFile raf = new RandomAccessFile("test.txt", "rw");
raf.seek(5);
//先读出来
String temp = raf.readLine();
raf.seek(5);
raf.write("xyz".getBytes());
raf.write(temp.getBytes());
raf.close();

```



```java
RandomAccessFile raf1 = new RandomAccessFile("hello.txt", "rw");
raf1.seek(5);
//方式一：
//StringBuilder info = new StringBuilder((int) file.length());
//byte[] buffer = new byte[10];
//int len;
//while((len = raf1.read(buffer)) != -1){
////info += new String(buffer,0,len);
//info.append(new String(buffer,0,len));
//}
//方式二：
ByteArrayOutputStream baos = new ByteArrayOutputStream();
byte[] buffer = new byte[10];
int len;
while((len = raf1.read(buffer)) != -1){
    baos.write(buffer, 0, len);
}

raf1.seek(5);
raf1.write("xyz".getBytes());
raf1.write(baos.toString().getBytes());
baos.close();
raf1.close();

```



### 流的基本应用小节



- 流是用来处理数据的。
- 处理数据时，一定要先明确==数据源==，与==数据目的地==
  - 数据源可以是文件，可以是键盘
  - 数据目的地可以是文件、显示器或者其他设备
- 而流只是在帮助数据进行传输,并对传输的数据进行处理，比如过滤处理、 转换处理等





### NIO.2中Path、 Paths、Files类的使用



#### Java NIO 概述



- Java NIO (New IO，Non-Blocking IO)是从Java 1.4版本开始引入的一套新 的IO API，可以替代标准的Java IO API。NIO与原来的IO有同样的作用和目 的，但是使用的方式完全不同，NIO支持面向缓冲区的(IO是面向流的)、基于 通道的IO操作。==NIO将以更加高效的方式进行文件的读写操作。==
- Java API中提供了两套NIO，**一套是针对标准输入输出NIO**，**另一套就是网 络编程NIO。**
  - |-----java.nio.channels.Channel
    - |-----FileChannel:处理本地文件
    - |-----SocketChannel：TCP网络编程的客户端的Channel
    - |-----ServerSocketChannel:TCP网络编程的服务器端的Channel
    - |-----DatagramChannel：UDP网络编程中发送端和接收端的Channel



#### NIO. 2



随着 JDK 7 的发布，Java对NIO进行了极大的扩展，增强了对 文件处理和文件系统特性的支持，以至于我们称他们为 NIO.2。 因为 NIO 提供的一些功能，NIO已经成为文件处理中越来越重要 的部分





#### Path、Paths和Files核心API



- 早期的Java只提供了一个File类来访问文件系统，但File类的功能比较有限，所 提供的方法性能也不高。而且，**大多数方法在出错时仅返回失败，并不会提供异 常信息。**

- NIO. 2为了弥补这种不足，引入了Path接口，代表一个平台无关的平台路径，描 述了目录结构中文件的位置。**Path可以看成是File类的升级版本，实际引用的资 源也可以不存在。**

- 在以前IO操作都是这样写的:

  ```java
  import java.io.File;
  File file = new File("index.html");
  ```

- 但在Java7 中，我们可以这样写：

  ```java
  import java.nio.file.Path;
  import java.nio.file.Paths;
  Path path = Paths.get("index.html");
  ```

- 同时，NIO.2在java.nio.file包下还提供了Files、Paths工具类，Files包含 了大量静态的工具方法来操作文件；Paths则包含了两个返回Path的静态 工厂方法。

- Paths 类提供的静态 get() 方法用来获取 Path 对象：

  - static Path get(String first, String … more) : 用于将多个字符串串连成路径
  - static Path get(URI uri): 返回指定uri对应的Path路径



#### Path接口



> Path 常用方法：

- String toString() ： 返回调用 Path 对象的字符串表示形式
- boolean startsWith(String path) : 判断是否以 path 路径开始
- boolean endsWith(String path) : 判断是否以 path 路径结束
- boolean isAbsolute() : 判断是否是绝对路径
- Path getParent() ：返回Path对象包含整个路径，不包含 Path 对象指定的文件路径
- Path getRoot() ：返回调用 Path 对象的根路径
- Path getFileName() : 返回与调用 Path 对象关联的文件名
- int getNameCount() : 返回Path 根目录后面元素的数量
- Path getName(int idx) : 返回指定索引位置 idx 的路径名称
- **Path toAbsolutePath() : 作为绝对路径返回调用 Path 对象**
- Path resolve(Path p) :合并两个路径，返回合并后的路径对应的Path对象
- **File toFile(): 将Path转化为File类的对象**



#### Files 类



java.nio.file.Files 用于操作文件或目录的工具类



> Files常用方法：

- Path copy(Path src, Path dest, CopyOption … how) : 文件的复制
- **Path createDirectory(Path path, FileAttribute … attr) : 创建一个目录**
- **Path createFile(Path path, FileAttribute … arr) : 创建一个文件**
- void delete(Path path) : 删除一个文件/目录，如果不存在，执行报错
- **void deleteIfExists(Path path) : Path对应的文件/目录如果存在，执行删除**
- Path move(Path src, Path dest, CopyOption…how) : 将 src 移动到 dest 位置
- **long size(Path path) : 返回 path 指定文件的大小**



> Files常用方法：用于判断



- boolean exists(Path path, LinkOption … opts) : 判断文件是否存在
- boolean isDirectory(Path path, LinkOption … opts) : 判断是否是目录 
- boolean isRegularFile(Path path, LinkOption … opts) : 判断是否是文件
-  boolean isHidden(Path path) : 判断是否是隐藏文件 
-  boolean isReadable(Path path) : 判断文件是否可读 
- boolean isWritable(Path path) : 判断文件是否可写 
- boolean notExists(Path path, LinkOption … opts) : 判断文件是否不存在



> Files常用方法：用于操作内容



- SeekableByteChannel newByteChannel(Path path, OpenOption…how) : 获取与指定文件的连 接，how 指定打开方式。 
-  DirectoryStream newDirectoryStream(Path path) : 打开 path 指定的目录 
-  InputStream newInputStream(Path path, OpenOption…how):获取 InputStream 对象 
-  OutputStream newOutputStream(Path path, OpenOption…how) : 获取 OutputStream 对象



### 代码解释



#### FileReadWriteTest

```java
package com.yixihan.day1028.filereadwritetest;

import org.junit.Test;

import java.io.*;

/**
 * 一. 流的分类
 *      1. 操作数据单位 : 字节流 字符流
 *      2. 数据的流向 : 输入流 输出流
 *      3. 流的角色 : 节点流 处理流
 *
 *
 * 流的体系结构 :
 *      抽象基类        节点流 (或文件流)                              缓冲流(处理流的一种)
 *      InputStream     FileInputStream (read(byte[] b)              BufferedInputStream (read(byte[] b)
 *      OutputStream    FileOutputStream (write(byte[] b, 0, len)    BufferedOutputStream (write(byte[] b, 0, len) /flush()
 *      Reader          FIleReader (read(char[] b)                   BufferedReader (read(char[] b) /readLine()
 *      Writer          FileWriter (write(char[] b, 0, len)          BufferedWriter (write(char[] b, 0, len) /flush()
 *
 *
 *
 *
 * @author : yixihan
 * @create : 2021-10-28-13:13
 */
public class FileReadWriteTest {


    /**
     * 实现指定路径下的文件的复制操作
     */
    public void copyFile (String scrPath, String destPath) {
        FileInputStream fis = null;
        FileOutputStream fos = null;

        try {
            File srcFile = new File(scrPath);
            File destFile = new File(destPath);

            fis = new FileInputStream(srcFile);
            fos = new FileOutputStream(destFile, true);

            byte[] byteBuffer = new byte[1024];
            int len;

            while ((len = fis.read(byteBuffer)) != -1) {

                fos.write(byteBuffer, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fis != null) {
                    fis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (fos != null) {
                    fos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


    /**
     * 利用缓冲流实现指定路径下文件的复制操作
     */
    public void copyFileWithBuffered (String scrPath, String destPath) {

        FileInputStream fis = null;
        FileOutputStream fos = null;
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;

        try {

            // 1. 造文件
            File scrFile = new File(scrPath);
            File destFile = new File(destPath);

            // 2.1.  造节点流
            fis = new FileInputStream(scrFile);
            fos = new FileOutputStream(destFile);

            // 2.2. 造缓冲流
            bis = new BufferedInputStream(fis);
            bos = new BufferedOutputStream(fos);

            // 3. 复制的细节 : 读取 写入
            byte[] byteBuffer = new byte[1024];
            int len;

            while ((len = bis.read(byteBuffer)) != -1) {
                bos.write(byteBuffer, 0, len);

                // 刷新缓存区
//                bos.flush();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            // 4. 资源关闭
            // 先关闭外层的流, 再关闭内层的流
            try {
                if (bos != null) {
                    bos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (bis != null) {
                    bis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }

    @Test
    public void testCopyFile () {

        long start = System.currentTimeMillis();

        String srcPath = "C:\\Users\\31137\\Desktop\\test\\driver.mp4";
        String destPath = "C:\\Users\\31137\\Desktop\\test\\driver1.mp4";

//        String srcPath = "hello.txt";
//        String destPath = "hello1.txt";
        copyFile(srcPath, destPath);

        long end = System.currentTimeMillis();

        // 54581
        System.out.println("文件复制用了 : " + (end - start));
    }

    @Test
    public void testCopyFileWithBuffered () {

        long start = System.currentTimeMillis();

        String srcPath = "C:\\Users\\31137\\Desktop\\test\\driver.mp4";
        String destPath = "C:\\Users\\31137\\Desktop\\test\\driver2.mp4";

        copyFileWithBuffered(srcPath, destPath);

        long end = System.currentTimeMillis();

        // 20708
        System.out.println("文件复制用了 : " + (end - start));
    }

}
```



#### 字节流

```java
package com.yixihan.day1028.filereadwritetest.charactertest;

import org.junit.Test;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

/**
 * 字节流 (字符流)
 *
 *
 * 注意点 : 如果在 main 方法里面写 new File(xxx) 相对路径是相对于 project, 而非 module
 * @author : yixihan
 * @create : 2021-10-28-13:18
 */
public class CharacterTest {

    /**
     * 将 JavaSenior 下的 hello.txt 文件内容读入程序中, 并输出到控制台
     *
     * 说明点 :
     *      1. read() 的理解 : 返回读入的一个字符, 如果到达文件末尾, 返回 -1
     *      2. 异常的处理 : 为了保证流资源一定可以执行关闭操作, 需要使用 try-catch-finally 进行处理
     *      3. 读入的文件一定要存在, 否则就会报 FileNotFoundException
     */
    @Test
    public void testFileReader1 (){
        FileReader reader = null;

        try {
            // 1. 实例化 File 类对象, 指明要操作的文件
            File file = new File("hello.txt");

            // 2. 提供具体的流 (流的实例化)
            reader = new FileReader(file);

            // 3. 数据的读入过程
            // read() 返回读入的一个字符, 如果达到文件末尾, 返回 -1
            // 方式一
//        int data = reader.read();
//
//        while (data != -1) {
//            System.out.print((char) data);
//            data = reader.read();
//        }
//        System.out.println();

            // 方式二
            int data;
            while ((data = reader.read()) != -1) {
                System.out.print((char) data);
            }
            System.out.println();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 4. 流的关闭操作
            try {
                if (reader != null) {
                    reader.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


    /**
     * 对 read() 操作升级 : 使用 read 的重载方法
     */
    @Test
    public void testFileReader2 () {
        FileReader fr = null;

        try {
            // 1. File 类的实例化
            File file = new File("hello.txt");

            // 2. 流 (FileReader) 的实例化
            fr = new FileReader(file);

            // 3. 读入的操作
            // read(char charBuffer) : 返回每次读入 charBuffer 数组中字符的个数, 如果达到文件末尾, 返回 -1
            char[] charBuffer = new char[5];

            int len;
            while ((len = fr.read(charBuffer)) != -1) {
                // 方式一
                // i < charBuffer x
                // i < len        √
//                for (int i = 0; i < len; i++) {
//                    System.out.print(charBuffer[i]);
//                }

                // 方式二
                // 错误的写法 : 同 i < charBuffer
//                String str = new String(charBuffer);
//                System.out.println(str);

                String s = new String(charBuffer, 0, len);
                System.out.print(s);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 4. 资源的关闭
            try {
                if (fr != null) {
                    fr.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


    /**
     * 从内存中写出数据到硬盘的文件里
     *
     * 说明 :
     *      1. 输出操作, 对应的 File 是可以不存在的, 并不会报异常
     *
     *      2.  如果不存在 : 在输出的过程中, 会自动创建此文件
     *          如果存在 :
     *              如果流使用的构造器是 : FileWriter(file, false) / FileWriter(file) : 对原有文件进行覆盖
     *              如果流使用的构造器是 : FileWriter(file, true) : 不对原有文件进行覆盖, 而是在原有文件基础上继续写
     *
     */
    @Test
    public void testFileWriter () {
        FileWriter fw = null;

        try {
            // 1. 提供 File 类的对象, 指明写出到文件
            File file = new File("hello2.txt");

            // 2. 提供 FileWriter 的对象, 用于数据的写出
            fw = new FileWriter(file, true);

            // 3. 写出的操作
            fw.write("\n易曦翰 是 超级大废物\n");
            fw.write("\n曾思彤 是 超级大废物\n");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 4. 资源流的关闭
            try {
                if (fw != null) {
                    fw.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


    @Test
    public void testFileReaderWriter () {
        FileReader fr = null;
        FileWriter fw = null;

        try {

            // 1. 创建 File 类的对象, 指明读入和写出的文件
            File srcFile = new File("hello.txt");
            File destFile = new File("hello2.txt");

            // 不能使用字符流来处理图片等字节数据
//            File srcFile = new File("1.png");
//            File destFile = new File("2.png");

            // 2. 创建输入流和输出流的对象
            fr = new FileReader(srcFile);
            fw = new FileWriter(destFile);

            // 3. 数据的读入和写出操作
            char[] charBuffer = new char[5];
            int len;

            while ((len = fr.read(charBuffer)) != -1) {

                // 每次写出 len 个字符
                fw.write(charBuffer, 0, len);
            }


        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            // 4. 关闭资源流
            try {
                if (fr != null) {
                    fr.close();
                }
                if (fw != null) {
                    fw.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }




    }
}
```



```java
package com.yixihan.day1028.filereadwritetest.bytetest;

import org.junit.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * 测试 FileInputStream 和 FIleOutputStream
 *
 * 结论 :
 *      1. 对于文本文件(.txt, .cpp, .java, .c ...), 使用字符流处理
 *      2. 对于非文本文件(.doc, .png, .avi, .mp3, .ppt, .mp4, ...), 使用字节流处理
 *
 *
 * @author : yixihan
 * @create : 2021-10-28-18:48
 */
public class ByteTest {


    /**
     * 使用字节流 FileInputStream 处理文本文件, 可能出现乱码
     */
    @Test
    public void testFileInputStream () {
        FileInputStream fis = null;

        try {
            // 1. 造文件
            File file = new File("hello.txt");

            // 2. 造流
            fis = new FileInputStream(file);

            // 3. 读入操作
            byte[] byteBuffer = new byte[5];
            int len;

            while ((len = fis.read(byteBuffer)) != -1) {
                String str = new String(byteBuffer, 0, len);

                System.out.print(str);
            }
            System.out.println();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fis != null) {
                try {
                    // 关闭流
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }


    /**
     * 实现对图片的复制操作
     */
    @Test
    public void testInputOutPutStream () {

        FileInputStream fis = null;
        FileOutputStream fos = null;

        try {
            File srcFile = new File("1.png");
            File destFile = new File("2.png");

            fis = new FileInputStream(srcFile);
            fos = new FileOutputStream(destFile, true);

            byte[] byteBuffer = new byte[5];
            int len;

            while ((len = fis.read(byteBuffer)) != -1) {

                fos.write(byteBuffer, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fis != null) {
                    fis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (fos != null) {
                    fos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


}
```



#### 缓冲流

```java
package com.yixihan.day1028.filereadwritetest.bufferstreamtest;

import org.junit.Test;

import java.io.*;

/**
 * 处理流之一 : 缓冲流的使用
 * 1. 缓冲流
 *      BufferedInputStream
 *      BufferedOutputStream
 *      BufferedReader
 *      BufferedWriter
 *
 *
 * 2. 作用 : 提升流的读取 写入的速度
 *      能提高读写速度的原因,
 *
 *
 * @author : yixihan
 * @create : 2021-10-28-19:13
 */
public class BufferStreamTest {

    /**
     * 实现非文件的复制
     */
    @Test
    public void testBufferedStream () {

        FileInputStream fis = null;
        FileOutputStream fos = null;
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;

        try {

            // 1. 造文件
            File scrFile = new File("1.png");
            File destFile = new File("3.png");

            // 2.1.  造节点流
            fis = new FileInputStream(scrFile);
            fos = new FileOutputStream(destFile);

            // 2.2. 造缓冲流
            bis = new BufferedInputStream(fis);
            bos = new BufferedOutputStream(fos);

            // 3. 复制的细节 : 读取 写入
            byte[] byteBuffer = new byte[1024];
            int len;

            while ((len = bis.read(byteBuffer)) != -1) {
                bos.write(byteBuffer, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            // 4. 资源关闭
            // 先关闭外层的流, 再关闭内层的流
            try {
                if (bos != null) {
                    bos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (bis != null) {
                    bis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            // 说明 : 在关闭外层的流时, 内层的流也会自动关闭, 我们可以省略
//            fos.close();
//            fis.close();
        }



    }


    /**
     * 使用 BufferedReader 和 BufferedWriter 实现文本文件的复制
     */
    @Test
    public void testBufferedReaderWriter () {
        BufferedReader br = null;
        BufferedWriter bw = null;

        try {

            // 1. 创建文件和流
            br = new BufferedReader(new FileReader(new File("dbcp.txt")));
            bw = new BufferedWriter(new FileWriter(new File("dbcp1.txt")));

            // 读写操作
            // 方式一 : 使用 char[] 数组
//            char[] charBuffer = new char[1024];
//            int len;
//
//            while ((len = br.read(charBuffer)) != -1) {
//                bw.write(charBuffer, 0, len);
//    //            bw.flush();
//            }

            // 方式二 :
            String data;
            while ((data = br.readLine()) != null) {
                // data 中不包含换行符
                bw.write(data);
                // 方法一 : 手动加
                bw.write("\n");

                // 方法二 : 使用 newLine() 提供换行的操作
                bw.newLine();
            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (bw != null) {
                try {
                    bw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }

    }

}
```



#### 转换流

```java
package com.yixihan.day1028.filereadwritetest.conversionflowtest;

import org.junit.Test;

import java.io.*;
import java.nio.charset.StandardCharsets;

/**
 * 处理流之二 : 转换流的使用
 *
 * 1. 转换流 : 属于字符流
 *      InputStreamReader : 将一个字节的输入流转换为字符的输入流
 *      OutputStreamWriter : 将一个字符的输出流转换为字节的输出流
 *
 * 2. 作用 : 提供字节流与字符流之间的转换
 *
 * 3. 解码 : 字节 字节数组 ---> 字符数组 字符串
 *    编码 : 字符数组 字符串 ---> 字节 字节数组
 *
 * 4. 字符集
 *      常见的编码表
 *          - ASCII：美国标准信息交换码
 *             用一个字节的7位可以表示。
 *          - ISO8859-1：拉丁码表。欧洲码表
 *             用一个字节的8位表示。
 *          - GB2312：中国的中文编码表。最多两个字节编码所有字符
 *          - GBK：中国的中文编码表升级，融合了更多的中文文字符号。最多两个字节编码
 *          - Unicode：国际标准码，融合了目前人类使用的所有字符。为每个字符分配唯一的字符码。所有的文字都用两个字节来表示
 *          - UTF-8：变长的编码方式，可用1-4个字节来表示一个字符。
 *
 * @author : yixihan
 * @create : 2021-10-28-20:10
 */
public class InputStreamReaderTest {


    /**
     * InputStreamReader 的使用, 实现字节的输入到到字符的输入流的转换
     */
    @Test
    public void test1 () {

        InputStreamReader isr = null;
        try {
            FileInputStream fis = new FileInputStream("hello.txt");
            // 不写参数二就默认为系统默认的字符集
            // 参数二指明了字符集 : 具体使用哪个字符集, 取决于文件保存时使用的字符集
            isr = new InputStreamReader(fis);

            char[] charBuffer = new char[20];
            int len;

            while ((len = isr.read(charBuffer)) != -1) {
                String str = new String(charBuffer, 0, len);
                System.out.print(str);
            }
            System.out.println();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (isr != null) {
                try {
                    isr.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }


    }


    /**
     * 综合使用 InputStreamReader 和 OutputStreamWriter
     */
    @Test
    public void test2 () {

        InputStreamReader isr = null;
        OutputStreamWriter osr = null;
        try {

            // 造 文件 流
            File file1 = new File("dbcp.txt");
            File file2 = new File("dbcp_gbk.txt");

            isr = new InputStreamReader(new FileInputStream(file1), StandardCharsets.UTF_8);
            osr = new OutputStreamWriter(new FileOutputStream(file1), "gbk");


            // 具体操作, 读 写
            char[] charBuffer = new char[20];
            int len;

            while ((len = isr.read(charBuffer)) != -1) {

                osr.write(charBuffer, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            // 关闭流
            try {
                if (osr != null) {
                    osr.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (isr != null) {
                    isr.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}
```



#### 对象流

```java
package com.yixihan.day1029.objectstreamtest;

import org.junit.Test;

import java.io.*;

/**
 * 对象流的使用 :
 *      1. ObjectInputStream 和 ObjectOutputStream
 *
 *      2. 作用 : 用于存储和读取基本数据类型数据或对象的处理流。
 *      它的强大之处就是可 以把Java中的对象写入到数据源中，也能把对象从数据源中还原回来
 *
 *
 *      3. 要想一个 java 对象是可序列化的, 需要满足相应的要求, 见 Person 类
 *
 * @author : yixihan
 * @create : 2021-10-29-11:28
 */
public class ObjectStreamTest {


    /**
     * 序列化过程 : 将内存中的 java 对象保存到磁盘中或者通过网络传输出去
     * 使用 ObjectOutputStream 实现
     */
    @Test
    public void testObjectOutputStream () {

        ObjectOutputStream oos = null;
        try {
            oos = new ObjectOutputStream(new FileOutputStream("object.dat"));


            oos.writeObject(new Person("曾思彤", 18));
            oos.writeObject(new Person("易曦翰", 18, 58, new Account(1000)));

            oos.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (oos != null) {
                    oos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


    /**
     * 反序列化的过程 : 将磁盘文件中的对象还原为内存中的一个 java 对象
     * 使用 ObjectInputStream 实现
     */
    @Test
    public void testObjectInputStream () {

        ObjectInputStream ois = null;
        try {
            ois = new ObjectInputStream(new FileInputStream("object.dat"));

            Object object1 = ois.readObject();
            Object object2 = ois.readObject();

            Person str1 = (Person) object1;
            Person str2 = (Person) object2;
            System.out.println(str1);
            System.out.println(str2);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            try {
                if (ois != null) {
                    ois.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}
```



```java
package com.yixihan.day1029.objectstreamtest;

import java.io.Serializable;
import java.util.Objects;

/**
 * Person 类需要满足如下的要求
 *      1. 需要实现接口, Serializable
 *          不实现 Serializable 接口会抛 : java.io.NotSerializableException
 *      2. 需要当前类提供一个全局常量 : serialVersionUID
 *          serialVersionUID用来表明类的不同版本间的兼容性。
 *          简言之，其目的是以序列化对象 进行版本控制，有关各版本反序列化时是否兼容
 *          如果类没有显示定义这个静态常量，它的值是Java运行时环境根据类的内部细节自 动生成的。
 *          若类的实例变量做了修改，serialVersionUID 可能发生变化。故建议, 显式声明
 *
 *      3. 除了当前 Person 类需要实现 Serializable 接口, 还需要保证其内部所有属性也必须是可序列化的
 *         (默认情况下, 基本数据类型可序列号)
 *
 *
 * 补充 : ObjectOutputStream和ObjectInputStream不能序列化static和transient修 饰的成员变量
 *
 * @author : yixihan
 * @create : 2021-10-29-11:35
 */
public class Person implements Serializable {

    public static final long serialVersionUID = 158957452548L;

    private String name;

    private int age;

    private int id;

    private Account account;

    public Person() {
    }

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Person(String name, int age, int id, Account account) {
        this.name = name;
        this.age = age;
        this.id = id;
        this.account = account;
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Person)) {
            return false;
        }
        Person person = (Person) o;
        return getAge() == person.getAge() && getId() == person.getId() && Objects.equals(getName(), person.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName(), getAge(), getId());
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", id=" + id +
                ", account=" + account +
                '}';
    }
}
```



```java
package com.yixihan.day1029.objectstreamtest;

import java.io.Serializable;
import java.util.Objects;

/**
 * @author : yixihan
 * @create : 2021-10-29-11:50
 */
public class Account implements Serializable {

    public static final long serialVersionUID = 158957452549L;

    private double balance;

    public Account() { }

    public Account(double balance) {
        this.balance = balance;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "Account{" +
                "balance=" + balance +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Account)) {
            return false;
        }
        Account account = (Account) o;
        return Double.compare(account.getBalance(), getBalance()) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(getBalance());
    }
}
```



#### 随机存取文件流

```java
package com.yixihan.day1029.randomaccessfiletest;

import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.charset.StandardCharsets;

/**
 * RandomAccessFile 的使用 :
 *      1. RandomAccessFile 直接继承于 java.lang. object, 实现了 DataInput 和 DataOutput
 *      2. RandomAccessFile 既可以作为一个输入流, 又可以作为一个输出流
 *
 *      3. 如果 RandomAccessFile 作为输出流时, 写出到的文件如果不存在, 则在执行过程中自动创建
 *         如果写出到的文件存在, 则会对原有文件内容进行覆盖 (默认情况下, 从头覆盖)
 *
 * @author : yixihan
 * @create : 2021-10-29-12:00
 */
public class RandomAccessFileTest {

    @Test
    public void test1 () {

        RandomAccessFile raf1 = null;
        RandomAccessFile raf2 = null;
        try {
            raf1 = new RandomAccessFile(new File("hello.txt"), "r");
            raf2 = new RandomAccessFile(new File("hello2.txt"), "rw");

            byte[] byteBuffer = new byte[1024];
            int len;

            while ((len = raf1.read(byteBuffer)) != -1) {
                raf2.write(byteBuffer, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (raf1 != null) {
                    raf1.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (raf2 != null) {
                    raf2.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }

    @Test
    public void test2 () {
        RandomAccessFile raf1 = null;
        try {
            raf1 = new RandomAccessFile("test.txt", "rw");

            // 将指针调到角标为 3 的位置
            raf1.seek(3);
            // 有数据的话, 是覆盖的效果
            // 无数据的话, 就是创建再写入
            raf1.write("xyz".getBytes(StandardCharsets.UTF_8));
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (raf1 != null) {
                    raf1.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }

    /**
     * 使用 RandomAccessFile 实现数据的插入效果
     */
    @Test
    public void test3 () {

        RandomAccessFile raf1 = null;
        try {
            File file = new File("test.txt");
            raf1 = new RandomAccessFile(file, "rw");

            // 将指针调到角标为 3 的位置
            raf1.seek(3);

            byte[] buffer = new byte[20];
            int len;
            StringBuilder builder = new StringBuilder((int) file.length());
            while ((len = raf1.read(buffer)) != -1) {
                builder.append(new String(buffer, 0, len));
            }

            // 调回指针, 写入数据
            raf1.seek(3);

            // 有数据的话, 是覆盖的效果
            // 无数据的话, 就是创建再写入
            raf1.write("xyz".getBytes(StandardCharsets.UTF_8));
            raf1.write(builder.toString().getBytes(StandardCharsets.UTF_8));

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (raf1 != null) {
                    raf1.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        // 思考 : 将 StringBuilder 替换为 ByteArrayOutputStream
    }
}
```



ByteArrayOutputStreamTest

```java
package com.yixihan.day1029.randomaccessfiletest;

import org.junit.Test;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * @author yixihan
 */
public class ByteArrayOutputStreamTest {

   @Test
   public void test1() throws Exception {
      FileInputStream fis = new FileInputStream("abc.txt");
      String info = readStringFromInputStream(fis);
      System.out.println(info);
   }

   private String readStringFromInputStream(FileInputStream fis) throws IOException {
      // 方式一：可能出现乱码
      // String content = "";
      // byte[] buffer = new byte[1024];
      // int len;
      // while((len = fis.read(buffer)) != -1){
      // content += new String(buffer);
      // }
      // return content;

      // 方式二：BufferedReader
      BufferedReader reader = new BufferedReader(new InputStreamReader(fis));
      char[] buf = new char[10];
      int len;
      String str = "";
      while ((len = reader.read(buf)) != -1) {
         str += new String(buf, 0, len);
      }
      return str;

      // 方式三：避免出现乱码
      // ByteArrayOutputStream baos = new ByteArrayOutputStream();
      // byte[] buffer = new byte[10];
      // int len;
      // while ((len = fis.read(buffer)) != -1) {
      // baos.write(buffer, 0, len);
      // }
      //
      // return baos.toString();
   }
}
```



#### Path

```java
package com.yixihan.day1029.filesandpaths;

import org.junit.Test;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * 1. jdk 7.0 时，引入了 Path、Paths、Files三个类。
 * 2.此三个类声明在：java.nio.file包下。
 * 3.Path可以看做是java.io.File类的升级版本。也可以表示文件或文件目录，与平台无关
 * <p>
 * 4.如何实例化Path:使用Paths.
 * static Path get(String first, String … more) : 用于将多个字符串串连成路径
 * static Path get(URI uri): 返回指定uri对应的Path路径
 *
 * @author shkstart
 * @create 2019 下午 2:44
 */
public class PathTest {

    //如何使用Paths实例化Path
    @Test
    public void test1() {
        Path path1 = Paths.get("d:\\nio\\hello.txt");//new File(String filepath)

        Path path2 = Paths.get("d:\\", "nio\\hello.txt");//new File(String parent,String filename);

        System.out.println(path1);
        System.out.println(path2);

        Path path3 = Paths.get("d:\\", "nio");
        System.out.println(path3);
    }

    //Path中的常用方法
    @Test
    public void test2() {
        Path path1 = Paths.get("d:\\", "nio\\nio1\\nio2\\hello.txt");
        Path path2 = Paths.get("hello.txt");

//    String toString() ： 返回调用 Path 对象的字符串表示形式
        System.out.println(path1);

//    boolean startsWith(String path) : 判断是否以 path 路径开始
        System.out.println(path1.startsWith("d:\\nio"));
//    boolean endsWith(String path) : 判断是否以 path 路径结束
        System.out.println(path1.endsWith("hello.txt"));
//    boolean isAbsolute() : 判断是否是绝对路径
        System.out.println(path1.isAbsolute() + "~");
        System.out.println(path2.isAbsolute() + "~");
//    Path getParent() ：返回Path对象包含整个路径，不包含 Path 对象指定的文件路径
        System.out.println(path1.getParent());
        System.out.println(path2.getParent());
//    Path getRoot() ：返回调用 Path 对象的根路径
        System.out.println(path1.getRoot());
        System.out.println(path2.getRoot());
//    Path getFileName() : 返回与调用 Path 对象关联的文件名
        System.out.println(path1.getFileName() + "~");
        System.out.println(path2.getFileName() + "~");
//    int getNameCount() : 返回Path 根目录后面元素的数量
//    Path getName(int idx) : 返回指定索引位置 idx 的路径名称
        for (int i = 0; i < path1.getNameCount(); i++) {
            System.out.println(path1.getName(i) + "*****");
        }

//    Path toAbsolutePath() : 作为绝对路径返回调用 Path 对象
        System.out.println(path1.toAbsolutePath());
        System.out.println(path2.toAbsolutePath());
//    Path resolve(Path p) :合并两个路径，返回合并后的路径对应的Path对象
        Path path3 = Paths.get("d:\\", "nio");
        Path path4 = Paths.get("nioo\\hi.txt");
        path3 = path3.resolve(path4);
        System.out.println(path3);

//    File toFile(): 将Path转化为File类的对象
        File file = path1.toFile();//Path--->File的转换

        Path newPath = file.toPath();//File--->Path的转换

    }


}
```



#### Files

```java
package com.yixihan.day1029.filesandpaths;

import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.channels.SeekableByteChannel;
import java.nio.file.*;
import java.util.Iterator;

/**
 * Files工具类的使用：操作文件或目录的工具类
 * @author shkstart
 * @create 2019 下午 2:44
 */
public class FilesTest {

   @Test
   public void test1() throws IOException{
      Path path1 = Paths.get("d:\\nio", "hello.txt");
      Path path2 = Paths.get("atguigu.txt");
      
//    Path copy(Path src, Path dest, CopyOption … how) : 文件的复制
      //要想复制成功，要求path1对应的物理上的文件存在。path1对应的文件没有要求。
//    Files.copy(path1, path2, StandardCopyOption.REPLACE_EXISTING);
      
//    Path createDirectory(Path path, FileAttribute<?> … attr) : 创建一个目录
      //要想执行成功，要求path对应的物理上的文件目录不存在。一旦存在，抛出异常。
      Path path3 = Paths.get("d:\\nio\\nio1");
//    Files.createDirectory(path3);
      
//    Path createFile(Path path, FileAttribute<?> … arr) : 创建一个文件
      //要想执行成功，要求path对应的物理上的文件不存在。一旦存在，抛出异常。
      Path path4 = Paths.get("d:\\nio\\hi.txt");
//    Files.createFile(path4);
      
//    void delete(Path path) : 删除一个文件/目录，如果不存在，执行报错
//    Files.delete(path4);
      
//    void deleteIfExists(Path path) : Path对应的文件/目录如果存在，执行删除.如果不存在，正常执行结束
      Files.deleteIfExists(path3);
      
//    Path move(Path src, Path dest, CopyOption…how) : 将 src 移动到 dest 位置
      //要想执行成功，src对应的物理上的文件需要存在，dest对应的文件没有要求。
//    Files.move(path1, path2, StandardCopyOption.ATOMIC_MOVE);
      
//    long size(Path path) : 返回 path 指定文件的大小
      long size = Files.size(path2);
      System.out.println(size);

   }

   @Test
   public void test2() throws IOException{
      Path path1 = Paths.get("d:\\nio", "hello.txt");
      Path path2 = Paths.get("atguigu.txt");
//    boolean exists(Path path, LinkOption … opts) : 判断文件是否存在
      System.out.println(Files.exists(path2, LinkOption.NOFOLLOW_LINKS));

//    boolean isDirectory(Path path, LinkOption … opts) : 判断是否是目录
      //不要求此path对应的物理文件存在。
      System.out.println(Files.isDirectory(path1, LinkOption.NOFOLLOW_LINKS));

//    boolean isRegularFile(Path path, LinkOption … opts) : 判断是否是文件

//    boolean isHidden(Path path) : 判断是否是隐藏文件
      //要求此path对应的物理上的文件需要存在。才可判断是否隐藏。否则，抛异常。
//    System.out.println(Files.isHidden(path1));

//    boolean isReadable(Path path) : 判断文件是否可读
      System.out.println(Files.isReadable(path1));
//    boolean isWritable(Path path) : 判断文件是否可写
      System.out.println(Files.isWritable(path1));
//    boolean notExists(Path path, LinkOption … opts) : 判断文件是否不存在
      System.out.println(Files.notExists(path1, LinkOption.NOFOLLOW_LINKS));
   }

   /**
    * StandardOpenOption.READ:表示对应的Channel是可读的。
    * StandardOpenOption.WRITE：表示对应的Channel是可写的。
    * StandardOpenOption.CREATE：如果要写出的文件不存在，则创建。如果存在，忽略
    * StandardOpenOption.CREATE_NEW：如果要写出的文件不存在，则创建。如果存在，抛异常
    *
    * @author shkstart 邮箱：shkstart@126.com
    * @throws IOException
    */
   @Test
   public void test3() throws IOException{
      Path path1 = Paths.get("d:\\nio", "hello.txt");

//    InputStream newInputStream(Path path, OpenOption…how):获取 InputStream 对象
      InputStream inputStream = Files.newInputStream(path1, StandardOpenOption.READ);

//    OutputStream newOutputStream(Path path, OpenOption…how) : 获取 OutputStream 对象
      OutputStream outputStream = Files.newOutputStream(path1, StandardOpenOption.WRITE,StandardOpenOption.CREATE);


//    SeekableByteChannel newByteChannel(Path path, OpenOption…how) : 获取与指定文件的连接，how 指定打开方式。
      SeekableByteChannel channel = Files.newByteChannel(path1, StandardOpenOption.READ,StandardOpenOption.WRITE,StandardOpenOption.CREATE);

//    DirectoryStream<Path>  newDirectoryStream(Path path) : 打开 path 指定的目录
      Path path2 = Paths.get("e:\\teach");
      DirectoryStream<Path> directoryStream = Files.newDirectoryStream(path2);
      Iterator<Path> iterator = directoryStream.iterator();
      while(iterator.hasNext()){
         System.out.println(iterator.next());
      }


   }
}
```



### 练习



#### 练习一 : 加密图片



```java
package com.yixihan.day1028.filereadwritetest.exer.test1;

import org.junit.Test;

import java.io.*;

/**
 * @author : yixihan
 * @create : 2021-10-28-19:54
 */
public class PicTest {

    /**
     * 图片的加密
     */
    @Test
    public void test1 () {

        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        try {
            bis = new BufferedInputStream(new FileInputStream("1.png"));
            bos = new BufferedOutputStream(new FileOutputStream("4.png"));

            byte[] byteBuffer = new byte[20];
            int len;

            while ((len = bis.read(byteBuffer)) != -1) {

                // 对字节数据进行修改
                for (int i = 0; i < len; i++) {
                    byteBuffer[i] = (byte) (byteBuffer[i] ^ 5);
                }

                bos.write(byteBuffer, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (bis != null) {
                    bis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (bos != null) {
                    bos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }


    /**
     * 图片的解密
     */
    @Test
    public void test2 () {
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        try {
            bis = new BufferedInputStream(new FileInputStream("4.png"));
            bos = new BufferedOutputStream(new FileOutputStream("5.png"));

            byte[] byteBuffer = new byte[20];
            int len;

            while ((len = bis.read(byteBuffer)) != -1) {

                // 对字节数据进行修改
                for (int i = 0; i < len; i++) {
                    byteBuffer[i] = (byte) (byteBuffer[i] ^ 5);
                }

                bos.write(byteBuffer, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (bis != null) {
                    bis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (bos != null) {
                    bos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

```



#### 练习二 : 统计每个字符出现的次数



```java
package com.yixihan.day1028.filereadwritetest.exer.test2;

import org.junit.Test;

import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;


/**
 * 练习3:获取文本上字符出现的次数,把数据写入文件
 *
 * 思路：
 * 1.遍历文本每一个字符
 * 2.字符出现的次数存在Map中
 *
 * Map<Character,Integer> map = new HashMap<Character,Integer>();
 * map.put('a',18);
 * map.put('你',2);
 *
 * 3.把map中的数据写入文件
 *
 * @author shkstart
 * @create 2019 下午 3:47
 */
public class WordCount {
    /*
    说明：如果使用单元测试，文件相对路径为当前module
          如果使用main()测试，文件相对路径为当前工程
     */
    @Test
    public void testWordCount() {
        FileReader fr = null;
        BufferedWriter bw = null;
        try {
            //1.创建Map集合
            Map<Character, Integer> map = new HashMap<Character, Integer>();

            //2.遍历每一个字符,每一个字符出现的次数放到map中
            fr = new FileReader("hello.txt");
            int c = 0;
            while ((c = fr.read()) != -1) {
                //int 还原 char
                char ch = (char) c;
                // 判断char是否在map中第一次出现
                if (map.get(ch) == null) {
                    map.put(ch, 1);
                } else {
                    map.put(ch, map.get(ch) + 1);
                }
            }

            //3.把map中数据存在文件count.txt
            //3.1 创建Writer
            bw = new BufferedWriter(new FileWriter("wordcount.txt"));

            //3.2 遍历map,再写入数据
            Set<Map.Entry<Character, Integer>> entrySet = map.entrySet();
            for (Map.Entry<Character, Integer> entry : entrySet) {
                switch (entry.getKey()) {
                    case ' ':
                        bw.write("空格=" + entry.getValue());
                        break;
                    case '\t'://\t表示tab 键字符
                        bw.write("tab键=" + entry.getValue());
                        break;
                    case '\r'://
                        bw.write("回车=" + entry.getValue());
                        break;
                    case '\n'://
                        bw.write("换行=" + entry.getValue());
                        break;
                    default:
                        bw.write(entry.getKey() + "=" + entry.getValue());
                        break;
                }
                bw.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            //4.关流
            if (fr != null) {
                try {
                    fr.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }
            if (bw != null) {
                try {
                    bw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }
        }

    }
}
```



#### 练习三 : MyInput

```java
package com.yixihan.day1028.filereadwritetest.exer.test3;

import java.io.*;

/**
 * MyInput.java: Contain the methods for reading int, double, float, boolean, short, byte and
 * string values from the keyboard
 * @author yixihan
 */
public class MyInput {

    /**
     * Read a string from the keyboard
     */
    public static String readString() {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // Declare and initialize the string
        String string = "";

        // Get the string from the keyboard
        try {
            string = br.readLine();

        } catch (IOException ex) {
            System.out.println(ex.getMessage());
        }

        // Return the string obtained from the keyboard
        return string;
    }

    /**
     * Read an int value from the keyboard
     * @return int value
     */
    public static int readInt() {
        return Integer.parseInt(readString());
    }


    /**
     * Read a double value from the keyboard
     * @return double value
     */
    public static double readDouble() {
        return Double.parseDouble(readString());
    }


    /**
     * Read a byte value from the keyboard
     * @return byte value
     */
    public static double readByte() {
        return Byte.parseByte(readString());
    }


    /**
     * Read a short value from the keyboard
     * @return short value
     */
    public static double readShort() {
        return Short.parseShort(readString());
    }


    /**
     * Read a long value from the keyboard
     * @return long value
     */
    public static double readLong() {
        return Long.parseLong(readString());
    }


    /**
     * Read a float value from the keyboard
     * @return float value
     */
    public static double readFloat() {
        return Float.parseFloat(readString());
    }
}
```





## 网络编程



### 网络编程概述



Java是 Internet 上的语言，它从语言级上提供了对网络应用程 序的支持，程序员能够很容易开发常见的网络应用程序。



Java提供的网络类库，可以实现无痛的网络连接，联网的底层 细节被隐藏在 Java 的本机安装系统里，由 JVM 进行控制。并 且 Java 实现了一个跨平台的网络库，**程序员面对的是一个统一 的网络编程环境。**



#### 网络基础



> 计算机网络

把分布在不同地理区域的计算机与专门的外部设备用通信线路互连成一个规 模大、功能强的网络系统，从而使众多的计算机可以方便地互相传递信息、 共享硬件、软件、数据信息等资源。



> 网络编程的目的

直接或间接地通过网络协议与其它计算机实现数据交换，进行通讯



> 网络编程中有两个主要的问题

- 如何准确地定位网络上一台或多台主机；定位主机上的特定的应用
- 找到主机后如何可靠高效地进行数据传输





### 网络通信要素概述



#### 如何实现网络中的主机互相通信



- 通信双方地址
  - IP
  - 端口号
- 一定的规则（即：网络通信协议。有两套参考模型）
  - OSI参考模型：模型过于理想化，未能在因特网上进行广泛推广
  - TCP/IP参考模型(或TCP/IP协议)：事实上的国际标准



#### 网络通信协议

![image-20211029143758013](/assets/imgs/JavaSE5.assets/image-20211029143758013.png)

![image-20211029143809110](/assets/imgs/JavaSE5.assets/image-20211029143809110.png)



### 通信要素1： IP和端口号



> IP 地址：InetAddress

- 唯一的标识 Internet 上的计算机（通信实体）
- 本地回环地址(hostAddress)：127.0.0.1 主机名(hostName)：localhost
- IP地址分类方式1：==IPV4== 和 ==IPV6==
  - IPV4：4个字节组成，4个0-255。大概42亿，30亿都在北美，亚洲4亿。2011年初已 经用尽。以点分十进制表示，如192.168.0.1
  - IPV6：128位（16个字节），写成8个无符号整数，每个整数用四个十六进制位表示， 数之间用冒号（：）分开，如：3ffe:3201:1401:1280:c8ff:fe4d:db39:1984
- IP地址分类方式2：==公网地址(万维网使用==)和==私有地址(局域网使用==)。192.168. 开头的就是私有址址，范围即为192.168.0.0--192.168.255.255，专门为组织机 构内部使用
- 特点：不易记忆



> 端口号标识正在计算机上运行的进程（程序）

- 不同的进程有不同的端口号
- 被规定为一个 16 位的整数 0~65535。
- 端口分类：
  - ==公认端口==：0~1023。被预先定义的服务通信占用（如：HTTP占用端口 80，FTP占用端口21，Telnet占用端口23）
  - ==注册端口==：1024~49151。分配给用户进程或应用程序。（如：Tomcat占 用端口8080，MySQL占用端口3306，Oracle占用端口1521等）。
  - ==动态/私有端口==：49152~65535。
- **端口号与IP地址的组合得出一个网络套接字：Socket。**



![image-20211029144015492](/assets/imgs/JavaSE5.assets/image-20211029144015492.png)



#### InetAddress类



- Internet上的主机有两种方式表示地址：

  - 域名(hostName)：www.atguigu.com
  - IP 地址(hostAddress)：202.108.35.210
- InetAddress类主要表示IP地址，两个子类：Inet4Address、Inet6Address。
- InetAddress 类 对 象 含 有 一 个 Internet 主 机 地 址 的 域 名 和 IP 地 址 ： www.atguigu.com 和 202.108.35.210。
- 域名容易记忆，当在连接网络时输入一个主机的域名后，域名服务器(DNS) 负责将域名转化成IP地址，这样才能和主机建立连接。 **-------域名解析**



![image-20211029144127037](/assets/imgs/JavaSE5.assets/image-20211029144127037.png)



- InetAddress类没有提供公共的构造器，而是提供了如下几个静态方法来获取 InetAddress实例
  - public static InetAddress getLocalHost()
  - public static InetAddress getByName(String host)
- InetAddress提供了如下几个常用的方法
  - public String getHostAddress()：返回 IP 地址字符串（以文本表现形式）。
  - public String getHostName()：获取此 IP 地址的主机名
  - public boolean isReachable(int timeout)：测试是否可以达到该地址



> 代码实例

![image-20211029144223354](/assets/imgs/JavaSE5.assets/image-20211029144223354.png)

### 通信要素2：网络协议



> 网络通信协议

计算机网络中实现通信必须有一些约定，即**通信协议，对速率、传输代码、代 码结构、传输控制步骤、出错控制等制定标准**



> 问题：网络协议太复杂

计算机网络通信涉及内容很多，比如指定源地址和目标地址，加密解密，压缩 解压缩，差错控制，流量控制，路由控制，如何实现如此复杂的网络协议呢？



> 通信协议分层的思想

在制定协议时，把复杂成份分解成一些简单的成份，再将它们复合起来。最常 用的复合方式是层次方式，**即同层间可以通信、上一层可以调用下一层，而与 再下一层不发生关系**。各层互不影响，利于系统的开发和扩展。



#### TCP/IP协议簇



- 传输层协议中有两个非常重要的协议：
  - 传输控制协议TCP(Transmission Control Protocol)
  - 用户数据报协议UDP(User Datagram Protocol)。
- **TCP/IP 以其两个主要协议：传输控制协议(TCP)和网络互联协议(IP)**而得 名，实际上是一组协议，包括多个具有不同功能且互为关联的协议。
- IP(Internet Protocol)协议是网络层的主要协议，支持网间互连的数据通信。
- TCP/IP协议模型从更实用的角度出发，形成了高效的四层体系结构，即 **物理链路层、IP层、传输层和应用层。**



#### TCP 和 UDP



> TCP协议：

- 使用TCP协议前，须先建立TCP连接，形成传输数据通道
- 传输前，采用==“三次握手”==方式，点对点通信，==是可靠的==
- TCP协议进行通信的两个应用进程：客户端、服务端。
- 在连接中可进行==大数据量的传输==
- 传输完毕，==需释放已建立的连接，效率低==



> UDP协议：

- 将数据、源、目的封装成数据包，==不需要建立连接==
- 每个数据报的大小限制在64K内
- 发送不管对方是否准备好，接收方收到也不确认，故是不可靠的
- 可以广播发送
- 发送数据结束时==无需释放资源，开销小，速度快==

![image-20211029144553900](/assets/imgs/JavaSE5.assets/image-20211029144553900.png)



![image-20211029144605849](/assets/imgs/JavaSE5.assets/image-20211029144605849.png)





#### Socket



- 利用套接字(Socket)开发网络应用程序早已被广泛的采用，以至于成为事实 上的标准。
- ==网络上具有唯一标识的IP地址和端口号组合在一起才能构成唯一能识别的标 识符套接字。==
- 通信的两端都要有Socket，是两台机器间通信的端点。
- 网络通信其实就是Socket间的通信
- Socket允许程序把网络连接当成一个流，数据在两个Socket间通过IO传输
- 一般主动发起通信的应用程序属**客户端**，等待通信请求的为**服务端**
- Socket分类：
  - ==流套接字（stream socket）：使用TCP提供可依赖的字节流服务==
  - ==数据报套接字（datagram socket）：使用UDP提供“尽力而为”的数据报服务==



- Socket类的常用构造器：
  - public Socket(InetAddress address,int port)创建一个流套接字并将其连接到指定 IP 地址的指定端口号。 
  - public Socket(String host,int port)创建一个流套接字并将其连接到指定主机上的指定端口号。
- Socket类的常用方法：
  - public InputStream getInputStream()返回此套接字的输入流。可以用于接收网络消息 
  - public OutputStream getOutputStream()返回此套接字的输出流。可以用于发送网络消息 
  - public InetAddress getInetAddress()此套接字连接到的远程 IP 地址；如果套接字是未连接的，则返回 null。 
  - public InetAddress getLocalAddress()获取套接字绑定的本地地址。 即本端的IP地址 
  - public int getPort()此套接字连接到的远程端口号；如果尚未连接套接字，则返回 0。 
  - public int getLocalPort()返回此套接字绑定到的本地端口。 如果尚未绑定套接字，则返回 -1。即本端的 端口号。 
  - public void close()关闭此套接字。套接字被关闭后，便不可在以后的网络连接中使用（即无法重新连接 或重新绑定）。需要创建新的套接字对象。 关闭此套接字也将会关闭该套接字的 InputStream 和 OutputStream。 
  - public void shutdownInput()如果在套接字上调用 shutdownInput() 后从套接字输入流读取内容，则流将 返回 EOF（文件结束符）。 即不能在从此套接字的输入流中接收任何数据。 
  - public void shutdownOutput()禁用此套接字的输出流。对于 TCP 套接字，任何以前写入的数据都将被发 送，并且后跟 TCP 的正常连接终止序列。 如果在套接字上调用 shutdownOutput() 后写入套接字输出流， 则该流将抛出 IOException。 即不能通过此套接字的输出流发送任何数据。



### TCP网络编程



#### 基于Socket的TCP编程



Java语言的基于套接字编程分为服务端编程和客户端编程，其通信模 型如图所示：

![image-20211029144842690](/assets/imgs/JavaSE5.assets/image-20211029144842690.png)



> 客户端Socket的工作过程包含以下四个基本的步骤：

- **创建 Socket**：根据指定服务端的 IP 地址或端口号构造 Socket 类对象。若服务器端 响应，则建立客户端到服务器的通信线路。若连接失败，会出现异常。
- **打开连接到 Socket 的输入/出流**： 使用 getInputStream()方法获得输入流，使用 getOutputStream()方法获得输出流，进行数据传输
- **按照一定的协议对 Socket 进行读/写操作**：通过输入流读取服务器放入线路的信息 （但不能读取自己放入线路的信息），通过输出流将信息写入线程。
- **关闭 Socket**：断开客户端到服务器的连接，释放线路



#### 客户端创建Socket对象



- 客户端程序可以使用Socket类创建对象，**创建的同时会自动向服务器方发起连 接**。Socket的构造器是：
  - Socket(String host,int port)throws UnknownHostException,IOException：向服务器(域名是 host。端口号为port)发起TCP连接，若成功，则创建Socket对象，否则抛出异常。
  - Socket(InetAddress address,int port)throws IOException：根据InetAddress对象所表示的 IP地址以及端口号port发起连接
- 客户端建立socketAtClient对象的过程就是向服务器发出套接字连接请求

```java
Socket s = new Socket(“192.168.40.165”,9999);
OutputStream out = s.getOutputStream();
out.write(" hello".getBytes());
s.close();

```



> 服务器程序的工作过程包含以下四个基本的步骤：

- **调用 ServerSocket(int port)** ：创建一个服务器端套接字，并绑定到指定端口 上。用于监听客户端的请求。
- **调用 accept()**：监听连接请求，如果客户端请求连接，则接受连接，返回通信 套接字对象。
- **调用 该Socket类对象的 getOutputStream() 和 getInputStream ()**：获取输出 流和输入流，开始网络数据的发送和接收。
- **关闭ServerSocket和Socket对象**：客户端访问结束，关闭通信套接字。



#### 服务器建立 ServerSocket 对象



- ServerSocket 对象负责等待客户端请求建立套接字连接，类似邮局某个窗口 中的业务员。也就是说，**服务器必须事先建立一个等待客户请求建立套接字 连接的ServerSocket对象。**
- 所谓“接收”客户的套接字请求，就是accept()方法会返回一个 Socket 对象

```java
ServerSocket ss = new ServerSocket(9999);
Socket s = ss.accept ();
InputStream in = s.getInputStream();
byte[] buf = new byte[1024];
int num = in.read(buf);
String str = new String(buf,0,num);
System.out.println(s.getInetAddress().toString()+”:”+str);
s.close();
ss.close();
```



#### 小例题



##### 一

```java
package com.yixihan.day1029.internettest.tcptest;

import org.junit.Test;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

/**
 * 实现 TCP 的网络编程
 *
 * 例子一 : 客户端发送信息给服务端, 服务的将数据显示在控制台上
 * @author : yixihan
 * @create : 2021-10-29-15:42
 */
public class TcpTest1 {

    /**
     * 客户端
     */
    @Test
    public void client (){

        Socket socket = null;
        OutputStream os = null;

        try {

            // 1. 创建 Socket 对象, 指明服务器端的 ip 和端口号
            InetAddress server = InetAddress.getByName("192.168.187.1");
            socket = new Socket(server, 8889);

            // 2. 获取一个输出流, 用于输出数据
            os = socket.getOutputStream();

            // 3. 输出数据的具体操作
            os.write("你好, 我是客户端gg".getBytes(StandardCharsets.UTF_8));
            os.flush();

        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            // 关闭资源
            try {
                if (os != null) {
                    os.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (socket != null) {
                    socket.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }


    /**
     * 服务端
     */
    @Test
    public void server () {

        ServerSocket serverSocket = null;
        Socket socket = null;
        InputStream is = null;
        ByteArrayOutputStream baos = null;

        try {

            // 1. 创建服务器端的 ServerSocket, 指明自己的端口号
            serverSocket = new ServerSocket(8889);

            // 2. 调用 accept() 表明可以接收来自客户端的 socket
            socket = serverSocket.accept();

            // 3. 获取输入流
            is = socket.getInputStream();

            // 不建议这样写, 可能会有乱码
//            byte[] buffer = new byte[5];
//            int len;
//
//            while ((len = is.read(buffer)) != -1) {
//                String str = new String(buffer, 0, len);
//                System.out.print(str);
//            }
//            System.out.println();

            // 4. 读取输入流的数据
            baos = new ByteArrayOutputStream();
            byte[] buffer = new byte[5];
            int len;

            while ((len = is.read(buffer)) != -1) {
                baos.write(buffer, 0, len);
            }

            System.out.println(baos.toString());

            System.out.println("收到了来自于 : " + socket.getInetAddress().getHostAddress() + " 的数据");

        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            // 5. 关闭资源
            try {
                if (baos != null) {
                    baos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (is != null) {
                    is.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (socket != null) {
                    socket.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (serverSocket != null) {
                    serverSocket.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}
```



##### 二

```java
package com.yixihan.day1029.internettest.tcptest;

import org.junit.Test;

import java.io.*;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * 例题二 : 客户端发送文件给服务端，服务端将文件保存在本地。
 * @author : yixihan
 * @create : 2021-10-29-16:06
 */
public class TcpTest2 {


    @Test
    public void client (){

        Socket socket = null;
        OutputStream os = null;
        BufferedInputStream bis = null;

        try {

            // 1.
            InetAddress inetAddress = InetAddress.getByName("127.0.0.1");
            socket = new Socket(inetAddress, 8889);

            // 2.
            os = socket.getOutputStream();

            // 3.
            bis = new BufferedInputStream(new FileInputStream("driver.mp4"));

            // 4.
            byte[] buffer = new byte[1024];
            int len;

            while ((len = bis.read(buffer)) != -1) {
                os.write(buffer, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            // 5.
            try {
                if (bis != null) {
                    bis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (os != null) {
                    os.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (socket != null) {
                    socket.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }


    @Test
    public void server () {

        ServerSocket serverSocket = null;
        Socket socket = null;
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;

        try {

            // 1.
            serverSocket = new ServerSocket(8889);

            // 2.
            socket = serverSocket.accept();

            // 3.
            bis = new BufferedInputStream(socket.getInputStream());

            // 4.
            bos = new BufferedOutputStream(new FileOutputStream("driver2.mp4"));

            // 5.
            byte[] buffer = new byte[1024];
            int len;

            while ((len = bis.read(buffer)) != -1) {
                bos.write(buffer, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            // 6.
            try {
                if (bos != null) {
                    bos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (bis != null) {
                    bis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (socket != null) {
                    socket.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (serverSocket != null) {
                    serverSocket.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }
}
```



```java
package com.yixihan.day1029.internettest.tcptest;

import org.junit.Test;

import java.io.*;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

/**
 * 例题三 : 从客户端发送文件给服务端，服务端保存到本地。
 * 并返回“发送成功”给客户端。并关闭相应的连接。
 *
 * @author : yixihan
 * @create : 2021-10-29-16:21
 */
public class TcpTest3 {

    @Test
    public void client (){

        Socket socket = null;
        OutputStream os = null;
        BufferedInputStream bis = null;
        InputStream is = null;
        ByteArrayOutputStream baos = null;

        try {

            // 1.
            InetAddress inetAddress = InetAddress.getByName("127.0.0.1");
            socket = new Socket(inetAddress, 8889);

            // 2.
            os = socket.getOutputStream();

            // 3.
            bis = new BufferedInputStream(new FileInputStream("driver.mp4"));

            // 4.
            byte[] buffer = new byte[1024];
            int len;

            while ((len = bis.read(buffer)) != -1) {
                os.write(buffer, 0, len);
            }

            // 关闭数据的输出
            socket.shutdownOutput();

            // 5. 接收来自于服务器端的数据, 并显示到控制台上
            is = socket.getInputStream();

            baos = new ByteArrayOutputStream();
            byte[] buffer1 = new byte[1024];
            int len1;

            while ((len1 = is.read(buffer1)) != -1) {
                baos.write(buffer1, 0, len1);
            }

            System.out.println(baos.toString());


        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            // 6.
            try {
                if (is != null) {
                    is.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (baos != null) {
                    baos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (bis != null) {
                    bis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (os != null) {
                    os.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (socket != null) {
                    socket.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }


    @Test
    public void server () {

        ServerSocket serverSocket = null;
        Socket socket = null;
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        OutputStream os = null;

        try {

            // 1.
            serverSocket = new ServerSocket(8889);

            // 2.
            socket = serverSocket.accept();

            // 3.
            bis = new BufferedInputStream(socket.getInputStream());

            // 4.
            bos = new BufferedOutputStream(new FileOutputStream("driver2.mp4"));

            // 5.
            byte[] buffer = new byte[1024];
            int len;

            while ((len = bis.read(buffer)) != -1) {
                bos.write(buffer, 0, len);
            }



            // 6. 服务器端给与客户端反馈
            os = socket.getOutputStream();
            os.write("你好, 美女, 小视频我已经收到, 弟弟已经吐了".getBytes(StandardCharsets.UTF_8));



        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            // 7.
            try {
                if (os != null) {
                    os.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (bos != null) {
                    bos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (bis != null) {
                    bis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (socket != null) {
                    socket.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (serverSocket != null) {
                    serverSocket.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }
}
```





#### 客户端—服务端



- 客户端
  - 自定义 
  - 浏览器
- 服务端：
  - 自定义 
  - Tomcat服务器





### UDP网络编程



- 类 DatagramSocket 和 DatagramPacket 实现了基于 UDP 协议网络程序
- UDP数据报通过数据报套接字 DatagramSocket 发送和接收，**系统不保证 UDP数据报一定能够安全送到目的地，也不能确定什么时候可以抵达。**
- DatagramPacket 对象封装了UDP数据报，在数据报中包含了发送端的IP 地址和端口号以及接收端的IP地址和端口号。
- UDP协议中每个数据报都给出了完整的地址信息，因此无须建立发送方和 接收方的连接。如同发快递包裹一样。



#### DatagramSocket 类的常用方法



- public DatagramSocket(int port)创建数据报套接字并将其绑定到本地主机上的指定端口。套接字将被 绑定到通配符地址，IP 地址由内核来选择。 
- public DatagramSocket(int port,InetAddress laddr)创建数据报套接字，将其绑定到指定的本地地址。 本地端口必须在 0 到 65535 之间（包括两者）。如果 IP 地址为 0.0.0.0，套接字将被绑定到通配符地 址，IP 地址由内核选择。 
- public void close()关闭此数据报套接字。 
- public void send(DatagramPacket p)从此套接字发送数据报包。DatagramPacket 包含的信息指示：将 要发送的数据、其长度、远程主机的 IP 地址和远程主机的端口号。 
- public void receive(DatagramPacket p)从此套接字接收数据报包。当此方法返回时，DatagramPacket 的缓冲区填充了接收的数据。数据报包也包含发送方的 IP 地址和发送方机器上的端口号。 此方法 在接收到数据报前一直阻塞。数据报包对象的 length 字段包含所接收信息的长度。如果信息比包的 长度长，该信息将被截短。 
- public InetAddress getLocalAddress()获取套接字绑定的本地地址。 
- public int getLocalPort()返回此套接字绑定的本地主机上的端口号。 
- public InetAddress getInetAddress()返回此套接字连接的地址。如果套接字未连接，则返回 null。 
- public int getPort()返回此套接字的端口。如果套接字未连接，则返回 -1。
- public DatagramPacket(byte[] buf,int length)构造 DatagramPacket，用来接收长 度为 length 的数据包。 length 参数必须小于等于 buf.length。 
- public DatagramPacket(byte[] buf,int length,InetAddress address,int port)构造数 据报包，用来将长度为 length 的包发送到指定主机上的指定端口号。length 参数必须小于等于 buf.length。 
- public InetAddress getAddress()返回某台机器的 IP 地址，此数据报将要发往该 机器或者是从该机器接收到的。 
- public int getPort()返回某台远程主机的端口号，此数据报将要发往该主机或 者是从该主机接收到的。 
- public byte[] getData()返回数据缓冲区。接收到的或将要发送的数据从缓冲区 中的偏移量 offset 处开始，持续 length 长度。 
- public int getLength()返回将要发送或接收到的数据的长度。



#### UDP网络通信



> 流 程



1.  DatagramSocket与DatagramPacket
2.  建立发送端，接收端
3.  建立数据包
4.  调用Socket的发送、接收方法
5.  关闭Socke



**发送端与接收端是两个独立的运行程序**



> 发送端

```java

DatagramSocket ds = null;
try {
    ds = new DatagramSocket();
    byte[] by = "hello,atguigu.com".getBytes();
    DatagramPacket dp = new DatagramPacket(
        by, 0, by.length, InetAddress.getByName("127.0.0.1"), 10000
    );
    ds.send(dp);
} catch (Exception e) {
    e.printStackTrace();
} finally {
    if (ds != null)
        ds.close();
}

```



> 接收端 (在接收端，要指定监听的端口。)

```java
DatagramSocket ds = null;
try {
    ds = new DatagramSocket(10000);
    byte[] by = new byte[1024];
    DatagramPacket dp = new DatagramPacket(by, by.length);
    ds.receive(dp);
    String str = new String(dp.getData(), 0, dp.getLength());
    System.out.println(str + "--" + dp.getAddress());
} catch (Exception e) {
    e.printStackTrace();
} finally {
    if (ds != null)
        ds.close();
}
```



#### 小例子

```java
package com.yixihan.day1029.internettest.udptest;

import org.junit.Test;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.nio.charset.StandardCharsets;

/**
 * UDP 协议的网络编程
 * @author : yixihan
 * @create : 2021-10-29-16:48
 */
public class UdpTest {


    /**
     * 发送端
     */
    @Test
    public void sender () throws IOException {

        DatagramSocket socket = new DatagramSocket();

        String str = "我是 UDP 方式发送的导弹";
        byte[] data = str.getBytes(StandardCharsets.UTF_8);

        InetAddress address = InetAddress.getByName("127.0.0.1");
        DatagramPacket packet = new DatagramPacket(data, 0, data.length, address, 8889);

        socket.send(packet);

        socket.close();

    }


    /**
     * 接收端
     */
    @Test
    public void receiver () throws IOException {

        DatagramSocket socket = new DatagramSocket(8889);

        byte[] data = new byte[1024];

        DatagramPacket packet = new DatagramPacket(data, 0, data.length);

        socket.receive(packet);

        System.out.println(new String(packet.getData(), 0, packet.getLength()));

        socket.close();
    }
}
```



### URL编程



- ==URL(Uniform Resource Locator)==：统一资源定位符，它表示 Internet 上==某一 资源==的地址

- 它是一种具体的URI，即URL可以用来标识一个资源，而且还指明了如何locate 这个资源

- 通过 URL 我们可以访问 Internet 上的各种网络资源，比如最常见的 www，ftp 站点。浏览器通过解析给定的 URL 可以在网络上查找相应的文件或其他资源

- URL的基本结构由5部分组成 :

  - <传输协议>://<主机名>:<端口号>/<文件名>#片段名?参数列表

    例如: http://192.168.1.100:8080/helloworld/index.jsp#a?username=shkstart&password=123

    \#片段名：即锚点，例如看小说，直接定位到章节

    参数列表格式：参数名=参数值&参数名=参数值...

- 为了表示URL，java.net 中实现了类 URL。我们可以通过下面的构造器来初 始化一个 URL 对象：

  - public URL (String spec)：通过一个表示URL地址的字符串可以构造一个URL对象。例 如：URL url = new URL ("http://www. atguigu.com/"); 
  - public URL(URL context, String spec)：通过基 URL 和相对 URL 构造一个 URL 对象。 例如：URL downloadUrl = new URL(url, “download.html")
  - public URL(String protocol, String host, String file); 例如：new URL("http", "www.atguigu.com", “download. html")
  - public URL(String protocol, String host, int port, String file); 例如: URL gamelan = new URL("http", "www.atguigu.com", 80, “download.html");

- URL类的构造器都声明抛出非运行时异常，必须要对这一异常进行处理，通 常是用 try-catch 语句进行捕获



#### URL类常用方法



- 一个URL对象生成后，其属性是不能被改变的，但可以通过它给定的 方法来获取这些属性：

  - public String getProtocol( ) 获取该URL的协议名 
  - public String getHost( ) 获取该URL的主机名 
  - public String getPort( ) 获取该URL的端口号 
  - public String getPath( ) 获取该URL的文件路径 
  - public String getFile( ) 获取该URL的文件名
  - public String getQuery( ) 获取该URL的查询名

  ```java
  URL url = new URL("http://localhost:8080/examples/myTest.txt");
  System.out.println("getProtocol() :"+url.getProtocol());
  System.out.println("getHost() :"+url.getHost());
  System.out.println("getPort() :"+url.getPort());
  System.out.println("getPath() :"+url.getPath());
  System.out.println("getFile() :"+url.getFile());
  System.out.println("getQuery() :"+url.getQuery());
  ```



#### URLConnection类



##### 针对HTTP协议的URLConnection类



- ==URL的方法 openStream()：能从网络上读取数据==
- 若希望输出数据，例如向服务器端的 CGI （公共网关接口-Common Gateway Interface-的简称，是用户浏览器和服务器端的应用程序进行连接的接口）程序发送一 些数据，则必须先与URL建立连接，然后才能对其进行读写，此时需要使用 URLConnection 。
- URLConnection：表示到URL所引用的远程对象的连接。当与一个URL建立连接时， 首先要在一个 URL 对象上通过方法 ==openConnection()== 生成对应的 URLConnection 对象。如果连接过程失败，将产生IOException.
  - URL netchinaren = new URL ("http://www.atguigu.com/index.shtml"); 
  - URLConnectonn u = netchinaren.openConnection( ); 
- 通过URLConnection对象获取的输入流和输出流，即可以与现有的CGI 程序进行交互。
  - public Object getContent( ) throws IOException 
  - public int getContentLength( ) 
  - public String getContentType( ) 
  - public long getDate( ) 
  - public long getLastModified( ) 
  - public InputStream getInputStream( )throws IOException 
  - public OutputSteram getOutputStream( )throws IOException



##### URI、URL和URN的区别



==URI，是uniform resource identifier，统一资源标识符==，用来唯一的标识一个 资源。而URL是uniform resource locator，统一资源定位符，它是一种具体 的URI，即URL可以用来标识一个资源，而且还指明了如何locate这个资源。 而==URN，uniform resource name==，统一资源命名，是通过名字来标识资源， 比如mailto:java-net@java.sun.com。也就是说，URI是以一种抽象的，高层 次概念定义统一资源标识，而URL和URN则是具体的资源标识的方式。URL 和URN都是一种URI。



在Java的URI中，一个URI实例可以代表绝对的，也可以是相对的，只要它符 合URI的语法规则。而URL类则 不仅符合语义，还包含了定位该资源的信息， 因此它不能是相对的。



#### 小例题 

```java
package com.yixihan.day1029.internettest.urltest;

import java.net.MalformedURLException;
import java.net.URL;

/**
 * URL 网络编程
 *      1. URL : 统一资源定位符, 对应着互联网上某一资源地址
 *
 *      2. 格式 :
 *      https://localhost:8080/examples/hello.txt?username=Tom
 *      协议     主机名   端口号  具体资源地址         参数列表
 *
 *      3
 * @author : yixihan
 * @create : 2021-10-29-17:03
 */
public class UrlTest {

    public static void main(String[] args) {

        try {
            URL url = new URL("https://localhost:8080/examples/hello.txt");

            // public String getProtocol( ) 获取该URL的协议名
            System.out.println(url.getProtocol());

            // public String getHost( ) 获取该URL的主机名
            System.out.println(url.getHost());

            // public String getPort( ) 获取该URL的端口号
            System.out.println(url.getPort());

            // public String getPath( ) 获取该URL的文件路径
            System.out.println(url.getPath());

            // public String getFile( ) 获取该URL的文件名
            System.out.println(url.getFile());

            // public String getQuery( ) 获取该URL的查询名
            System.out.println(url.getQuery());


        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }

}
```



```java
package com.yixihan.day1029.internettest.urltest;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 *
 * @author : yixihan
 * @create : 2021-10-29-17:10
 */
public class UrlTest1 {


    public static void main(String[] args) {

        HttpURLConnection urlConnection = null;
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        try {

            URL url = new URL("http://localhost:8080/examples/driver.mp4");

            urlConnection = (HttpURLConnection) url.openConnection();

            urlConnection.connect();

            bis = new BufferedInputStream(urlConnection.getInputStream());

            bos = new BufferedOutputStream(new FileOutputStream("JavaSenior\\driver.mp4"));

            byte[] buffer = new byte[1024];
            int len;

            while ((len = bis.read(buffer)) != -1) {
                bos.write(buffer, 0, len);
            }

            System.out.println("下载完成~");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            // 关闭资源
            try {
                if (bis != null) {
                    bis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (bos != null) {
                    bos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            if (urlConnection != null) {
                urlConnection.disconnect();
            }
        }



    }
}
```



### 小 结



- 位于网络中的计算机具有唯一的IP地址，这样不同的主机可以互相区分。
- ==客户端－服务器==是一种最常见的网络应用程序模型。服务器是一个为其客户端提供某种特定 服务的硬件或软件。客户机是一个用户应用程序，用于访问某台服务器提供的服务。端口号 是对一个服务的访问场所，它用于区分同一物理计算机上的多个服务。套接字用于连接客户 端和服务器，客户端和服务器之间的每个通信会话使用一个不同的套接字。TCP协议用于实 现面向连接的会话。
- Java 中有关网络方面的功能都定义在 java.net 程序包中。Java 用 InetAddress 对象表示 ==IP 地址==，该对象里有两个字段：主机名(String) 和 IP 地址(int)。
- 类 Socket 和 ServerSocket 实现了基于TCP协议的客户端－服务器程序。Socket是客户端 和服务器之间的一个连接，连接创建的细节被隐藏了。这个连接提供了一个安全的数据传输 通道，这是因为 TCP 协议可以解决数据在传送过程中的丢失、损坏、重复、乱序以及网络 拥挤等问题，它保证数据可靠的传送。
- 类 URL 和 URLConnection 提供了最高级网络应用。URL 的网络资源的位置来同一表示 Internet 上各种网络资源。通过URL对象可以创建当前应用程序和 URL 表示的网络资源之 间的连接，这样当前程序就可以读取网络资源数据，或者把自己的数据传送到网络上去。

