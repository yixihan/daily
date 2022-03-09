---
title: JavaSE6
date: 2022-03-09
tags:
 - JavaSE
categories:
 - JavaSE
---

# JavaSE



## Java反射机制



### Java反射机制概述



#### Java Reflection



- Reflection（反射）是被视为==动态语言==的关键，反射机制允许程序在执行期 借助于Reflection API取得任何类的内部信息，并能直接操作任意对象的内 部属性及方法。
- 加载完类之后，在堆内存的方法区中就产生了一个Class类型的对象（一个 类只有一个Class对象），这个对象就包含了完整的类的结构信息。我们可 以通过这个对象看到类的结构。==这个对象就像一面镜子，透过这个镜子看 到类的结构，所以，我们形象的称之为：反射。==

![image-20211029172652570](/assets/imgs/JavaSE7.assets/image-20211029172652570.png)





#### 补充：动态语言 vs 静态语言



> 动态语言

是一类在运行时可以改变其结构的语言：例如新的函数、对象、甚至代码可以 被引进，已有的函数可以被删除或是其他结构上的变化。==通俗点说就是在运 行时代码可以根据某些条件改变自身结构。==

主要动态语言：Object-C、C#、JavaScript、PHP、Python、Erlang。



> 静态语言

与动态语言相对应的，运行时结构不可变的语言就是静态语言。

如Java、C、 C++。



Java不是动态语言，但Java可以称之为==“准动态语言”==。即Java有一定的动 态性，我们可以利用反射机制、字节码操作获得类似动态语言的特性。 Java的动态性让编程的时候更加灵活！





#### Java反射机制研究及应用



- Java反射机制提供的功能
  - 在运行时判断任意一个对象所属的类 
  - 在运行时构造任意一个类的对象 
  - 在运行时判断任意一个类所具有的成员变量和方法 
  - 在运行时获取泛型信息 
  - 在运行时调用任意一个对象的成员变量和方法 
  - 在运行时处理注解 
  - 生成动态代理



#### 反射相关的主要API



- java.lang.Class:代表一个类 
- java.lang.reflect.Method:代表类的方法 
- java.lang.reflect.Field:代表类的成员变量 
- java.lang.reflect.Constructor:代表类的构造器
- ...



```java
package com.yixihan.day1029.reflecttest;

import org.junit.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

/**
 * @author : yixihan
 * @create : 2021-10-29-19:42
 */
public class ReflectionTest {


    /**
     * 反射之前, 对于 Person 的操作
     */
    @Test
    public void test1 () {

        // 1. 创建 Person 类的对象
        Person p1 = new Person("Tom", 12);

        // 2. 通过对象, 调用其内部的属性 方法
        p1.name = "Jane";

        p1.show();
        System.out.println(p1.toString());

        // 在 Person 类的外部, 不可以通过 Person 类的对象调用其内部的私有结构
        // 比如 : age, showNation() 以及私有的构造器
    }


    /**
     * 反射之后, 对于 Person 的操作
     */
    @Test
    public void test2 () throws Exception {
        Class<Person> personClass = Person.class;

        // 1. 通过反射, 创建 Person 类的对象
        Constructor<Person> constructor = personClass.getConstructor(String.class, int.class);

        Person p2 = constructor.newInstance("Tom", 12);

        System.out.println(p2);

        // 2. 通过反射, 调用对象指定的属性和方法
        // 调用属性
        Field name = personClass.getDeclaredField("name");
        name.set(p2, "Jane");
        System.out.println(p2);

        // 调用方法
        Method show = personClass.getDeclaredMethod("show");

        show.invoke(p2);


        // 通过反射, 是可以调用 Person 类的私有结构的, 比如 : 私有构造器, 私有属性, 私有方法
        // 私有的构造器
        Constructor<Person> cons1 = personClass.getDeclaredConstructor(String.class);
        cons1.setAccessible(true);
        Person p1 = cons1.newInstance("易曦翰");
        System.out.println(p1);

        // 私有的属性
        Field age = personClass.getDeclaredField("age");
        age.setAccessible(true);
        age.set(p1, 18);
        System.out.println(p1);

        // 私有的方法
        Method showNation = personClass.getDeclaredMethod("showNation", String.class);
        showNation.setAccessible(true);
        // 相当于 p.showNation("中国")
        Object nation = showNation.invoke(p1, "中国");
        System.out.println(nation);

    }

    /* 疑问 :
        1. 通过直接 new 的方式或反射的方式都可以调用公共的结构, 开发中到底用哪个 ?
            建议 : 直接 new 的方式.
            什么时候会使用 : 反射的方式
            放射的特征 : 动态性.
        2. 反射机制与面向对象中的封装性是不是矛盾的 ? 如何看待两个技术 ?
            不矛盾

     */
}
```



### 理解Class类并获取Class的实例



#### Class 类



在Object类中定义了以下的方法，此方法 将被所有子类继承：

- public final Class getClass()



以上的方法返回值的类型是一个Class类， 此类是Java反射的源头，实际上所谓反射 从程序的运行结果来看也很好理解，即： 可以通过对象反射求出类的名称。

![image-20211029173045696](/assets/imgs/JavaSE7.assets/image-20211029173045696.png)



- 对象照镜子后可以得到的信息：某个类的属性、方法和构造器、某个类到底实现了哪些接 口。对于每个类而言，JRE 都为其保留一个不变的 Class 类型的对象。一个 Class 对象包含 了特定某个结构(class/interface/enum/annotation/primitive type/void/[])的有关信息。
  - Class本身也是一个类 
  - Class 对象只能由系统建立对象 
  - 一个加载的类在 JVM 中只会有一个Class实例 
  - 一个Class对象对应的是一个加载到JVM中的一个.class文件 
  - 每个类的实例都会记得自己是由哪个 Class 实例所生成 
  - 通过Class可以完整地得到一个类中的所有被加载的结构 
  - Class类是Reflection的根源，针对任何你想动态加载、运行的类，唯有先获得相应的 Class对象



#### Class类的常用方法

![image-20211029173126299](/assets/imgs/JavaSE7.assets/image-20211029173126299.png)



#### 反射的应用举例



- String str = "test4.Person"; 
- Class clazz = Class.forName(str); 
- Object obj = clazz.newInstance(); 
- Field field = clazz.getField("name"); 
- field.set(obj, "Peter"); 
- Object name = field.get(obj); 
- System.out.println(name);



注：test4.Person是test4包下的Person类



#### 获取Class类的实例(四种方法)



1.  前提：若已知具体的类，通过类的class属性获取，该方法最为安全可靠， 程序性能最高 
    1.  实例：Class clazz = String.class; 
2.  前提：已知某个类的实例，调用该实例的getClass()方法获取Class对象 
    1.  实例：Class clazz = “www.atguigu.com”.getClass(); 
3.  前提：已知一个类的全类名，且该类在类路径下，可通过Class类的静态方 法forName()获取，可能抛出ClassNotFoundException 
    1.  实例：Class clazz = Class.forName(“java.lang.String”); 
4.  其他方式(不做要求)
    1.  ClassLoader cl = this.getClass().getClassLoader();
    2.  Class clazz4 = cl.loadClass(“类的全类名”);



#### 哪些类型可以有Class对象？



- class： 外部类  成员(成员内部类，静态内部类)  局部内部类  匿名内部类 
- interface：接口 
- []：数组 
- enum：枚举
- annotation：注解@interface
- primitive type：基本数据类型
- void



```java
Class c1 = Object.class;
Class c2 = Comparable.class;
Class c3 = String[].class;
Class c4 = int[][].class;
Class c5 = ElementType.class;
Class c6 = Override.class;
Class c7 = int.class;
Class c8 = void.class;
Class c9 = Class.class;
int[] a = new int[10];
int[] b = new int[100];
Class c10 = a.getClass();
Class c11 = b.getClass();
// 只要元素类型与维度一样，就是同一个Class
System.out.println(c10 == c11);

```





### 类的加载 与ClassLoader的理解



#### 了解：类的加载过程



当程序主动使用某个类时，如果该类还未被加载到内存中，则系统会通过 如下三个步骤来对该类进行初始化。

![image-20211029173452869](/assets/imgs/JavaSE7.assets/image-20211029173452869.png)



- 加载：将class文件字节码内容加载到内存中，并将这些静态数据转换成方法区的运行时 数据结构，然后生成一个代表这个类的java.lang.Class对象，作为方法区中类数据的访问 入口（即引用地址）。所有需要访问和使用类数据只能通过这个Class对象。这个加载的 过程需要类加载器参与。

- 链接：将Java类的二进制代码合并到JVM的运行状态之中的过程。

  - 验证：确保加载的类信息符合JVM规范，例如：以cafe开头，没有安全方面的问题 
  - 准备：正式为类变量（static）分配内存并**设置类变量默认初始值**的阶段，这些内存 都将在方法区中进行分配。 
  - 解析：虚拟机常量池内的符号引用（常量名）替换为直接引用（地址）的过程。

- 初始化：

- 执行类**构造器<clinit>()**方法的过程。**类构造器<clinit>()方法是由编译期自动收集类中所有类变量的赋值动作和静态代码块中的语句合并产生的**。（类构造器是构造类信 息的，不是构造该类对象的构造器）。 

- 当初始化一个类的时候，如果发现其父类还没有进行初始化，则需要先触发其父类 的初始化。 

- 虚拟机会保证一个类的()方法在多线程环境中被正确加锁和同步。

  

```java
public class ClassLoadingTest {
    public static void main(String[] args) {
        System.out.println(A.m);
    }
}
class A {
    static {
        m = 300;
    }
    static int m = 100;
}
//第二步：链接结束后m=0
//第三步：初始化后，m的值由<clinit>()方法执行决定
// 这个A的类构造器<clinit>()方法由类变量的赋值和静态代码块中的语句按照顺序合并
产生，类似于
    // <clinit>(){
    // m = 300;
    // m = 100;
    // }

```



#### 了解：什么时候会发生类初始化？



- 类的主动引用（一定会发生类的初始化） 
  - 当虚拟机启动，先初始化main方法所在的类 
  - new一个类的对象  调用类的静态成员（除了final常量）和静态方法 
  - 使用java.lang.reflect包的方法对类进行反射调用 
  - 当初始化一个类，如果其父类没有被初始化，则先会初始化它的父类 
- 类的被动引用（不会发生类的初始化） 
  - 当访问一个静态域时，只有真正声明这个域的类才会被初始化 
  - 当通过子类引用父类的静态变量，不会导致子类初始化
  - 通过数组定义类引用，不会触发此类的初始化 
  - 引用常量不会触发此类的初始化（常量在链接阶段就存入调用类的常 量池中了）



```java
public class ClassLoadingTest {
    public static void main(String[] args) {
        // 主动引用：一定会导致A和Father的初始化
        // A a = new A();
        // System.out.println(A.m);
        // Class.forName("com.atguigu.java2.A");
        // 被动引用
        A[] array = new A[5];//不会导致A和Father的
        初始化
            // System.out.println(A.b);//只会初始化
            Father
            // System.out.println(A.M);//不会导致A和
            Father的初始化
    }
    static {
        System.out.println("main所在的类");
    }
}

class Father {
    static int b = 2;
    static {
        System.out.println("父类被加载");
    }
}

class A extends Father {
    static {
        System.out.println("子类被加载");
        m = 300;
    }
    static int m = 100;
    static final int M = 1;
}

```





> 类加载器的作用

- 类加载的作用：将class文件字节码内容加载到内存中，并将这些静态数据**转换成方 法区的运行时数据结构**，然后在堆中生成一个代表这个类的java.lang.Class对象，作为 方法区中类数据的访问入口
- 类缓存：标准的JavaSE类加载器可以按要求查找类，但一旦某个类被加载到类加载器 中，它将维持加载（缓存）一段时间。不过JVM垃圾回收机制可以回收这些Class对象



![image-20211029173806644](/assets/imgs/JavaSE7.assets/image-20211029173806644.png)



#### 了解：ClassLoader



**类加载器作用是用来把类(class)装载进内存的**。JVM 规范定义了如下类型的 类的加载器。

![image-20211029173854993](/assets/imgs/JavaSE7.assets/image-20211029173854993.png)



```java
//1.获取一个系统类加载器
ClassLoader classloader = ClassLoader.getSystemClassLoader();
System.out.println(classloader);

//2.获取系统类加载器的父类加载器，即扩展类加载器
classloader = classloader.getParent();
System.out.println(classloader);

//3.获取扩展类加载器的父类加载器，即引导类加载器
classloader = classloader.getParent();
System.out.println(classloader);

//4.测试当前类由哪个类加载器进行加载
classloader = Class.forName("exer2.ClassloaderDemo").getClassLoader();
System.out.println(classloader);

//5.测试JDK提供的Object类由哪个类加载器加载
classloader =
Class.forName("java.lang.Object").getClassLoader();
System.out.println(classloader);

//*6.关于类加载器的一个主要方法：getResourceAsStream(String str):获取类路径下的指定文件的输入流
InputStream in = null;
in = this.getClass().getClassLoader().getResourceAsStream("exer2\\test.properties");
System.out.println(in);

```



### 创建运行时类的对象



> 有了Class对象，能做什么？

==创建类的对象==：调用Class对象的newInstance()方法 

要 求： 1）类必须有一个无参数的构造器。 

​			  2）类的构造器的访问权限需要足够。



==难道没有无参的构造器就不能创建对象了吗？==

==不是!== 只要在操作的时候明确的调用类中的构造器，并将参数传递进去之后，才可以实例化操作。 

步骤如下：

​			1）通过Class类的getDeclaredConstructor(Class … parameterTypes)取得本类的指定形参类 型的构造器 

​			2）向构造器的形参中传递一个对象数组进去，里面包含了构造器中所需的各个参数。 

​			3）通过Constructor实例化对象。

![image-20211029174111897](/assets/imgs/JavaSE7.assets/image-20211029174111897.png)



```java
//1.根据全类名获取对应的Class对象
String name = “atguigu.java.Person";
Class clazz = null;
clazz = Class.forName(name);
//2.调用指定参数结构的构造器，生成Constructor的实例
Constructor con = clazz.getConstructor(String.class,Integer.class);
//3.通过Constructor的实例创建对应类的对象，并初始化类属性
Person p2 = (Person) con.newInstance("Peter",20);
System.out.println(p2);
```





### 获取运行时类的完 整结构



#### 通过反射获取运行时类的完整结构



**Field、Method、Constructor、Superclass、Interface、Annotation**



- 实现的全部接口
- 所继承的父类 
- 全部的构造器 
- 全部的方法 
- 全部的Field



> 使用反射可以取得：

1. 实现的全部接口 

   1. public Class[] getInterfaces() 

      确定此对象所表示的类或接口实现的接口

2. 所继承的父类 

   1. public Class getSuperclass() 

      返回表示此 Class 所表示的实体（类、接口、基本类型）的父类的 Class

3. 全部的构造器 

   1. public Constructor[] getConstructors() 

      返回此 Class 对象所表示的类的所有public构造方法。 

   2. public Constructor[] getDeclaredConstructors()

      返回此 Class 对象表示的类声明的所有构造方法。

   3. Constructor类中： 

      1. 取得修饰符: public int getModifiers(); 
      2. 取得方法名称: public String getName(); 
      3. 取得参数的类型：public Class[] getParameterTypes();

4. 全部的方法 

   1. public Method[] getDeclaredMethods() 

      返回此Class对象所表示的类或接口的全部方法 

   2. public Method[] getMethods() 

      返回此Class对象所表示的类或接口的public的方法

   3. Method类中： 

      1. public Class getReturnType()取得全部的返回值 
      2. public Class[] getParameterTypes()取得全部的参数 
      3. public int getModifiers()取得修饰符 
      4. public Class[] getExceptionTypes()取得异常信息

5. 全部的Field 

   1. public Field[] getFields() 

      返回此Class对象所表示的类或接口的public的Field

   2. public Field[] getDeclaredFields()

      返回此Class对象所表示的类或接口的全部Field。

   3. Field方法中： 

      1. public int getModifiers() 以整数形式返回此Field的修饰符 
      2. public Class getType() 得到Field的属性类型 
      3. public String getName() 返回Field的名称。

6. Annotation相关

   1. get Annotation(Class annotationClass) 
   2. getDeclaredAnnotations() 

7. 泛型相关 

   1. 获取父类泛型类型：Type getGenericSuperclass() 
   2. 泛型类型：ParameterizedType 
   3. 获取实际的泛型类型参数数组：getActualTypeArguments()

8. 类所在的包 Package getPackage()



小 结： 

- 在实际的操作中，取得类的信息的操作代码，并不会经常开发。 
- 一定要熟悉java.lang.reflect包的作用，反射机制。
- 如何取得属性、方法、构造器的名称，修饰符等。



#### 代码解释

```java
package com.yixihan.day1029.reflecttest1;

import java.io.Serializable;
import java.util.Objects;

/**
 * @author : yixihan
 * @create : 2021-10-29-21:21
 */
public class Creature<T> implements Serializable {


    private char gender;

    public double weight;

    public Creature() { }

    public Creature(char gender, double weight) {
        this.gender = gender;
        this.weight = weight;
    }

    private void breath () {
        System.out.println("生物呼吸");
    }

    public void eat () {
        System.out.println("生物吃东西");
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Creature)) {
            return false;
        }
        Creature<?> creature = (Creature<?>) o;
        return getGender() == creature.getGender() && Double.compare(creature.getWeight(), getWeight()) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(getGender(), getWeight());
    }

    @Override
    public String toString() {
        return "Creature{" +
                "gender=" + gender +
                ", weight=" + weight +
                '}';
    }
}

```



```java
package com.yixihan.day1029.reflecttest1;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

/**
 * @author : yixihan
 * @create : 2021-10-29-21:27
 */
@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE})
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnnotation {

    String value() default "hello";

}
```



```java
package com.yixihan.day1029.reflecttest1;

/**
 * @author : yixihan
 * @create : 2021-10-29-21:23
 */
public interface MyInterface {

    @MyAnnotation
    void info ();
}
```



```java
package com.yixihan.day1029.reflecttest1;

/**
 * @author : yixihan
 * @create : 2021-10-29-21:21
 */
@MyAnnotation(value = "hi")
public class Person extends Creature<String> implements Comparable<String>, MyInterface{


    private String name;

    int age;

    public int id;

    @MyAnnotation(value = "abc")
    public Person() {
    }

    private Person(String name) {
        this.name = name;
    }

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    private static void showDesc () {
        System.out.println("我是一个可爱的人");
    }

    @MyAnnotation
    private String show (String nation) {
        System.out.println("我的国籍是 : " + nation);
        return nation;
    }

    public String display (String interests, int age) throws NullPointerException, ClassCastException{
        return interests;
    }

    @Override
    public int compareTo(String o) {
        return 0;
    }

    @Override
    public void info() {
        System.out.println("我是一个人");
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", id=" + id +
                '}';
    }
}

```



##### Test

```java
package com.yixihan.day1029.reflecttest1.test;

import com.yixihan.day1029.reflecttest1.Person;
import org.junit.Test;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

/**
 * 获取当前运行时类的属性结构
 *
 *
 *
 * @author : yixihan
 * @create : 2021-10-29-21:30
 */
public class FieldTest {


    /**
     * 获取属性结构
     * getFields() : 获取当前运行时类及其父类中声明为 public 访问权限的属性
     *
     * getDeclaredFields() : 获取当前运行时类中声明的所有的属性 (不包含父类中声明的属性)
     */
    @Test
    public void test1 () {
        Class<Person> clazz = Person.class;

        Field[] fields = clazz.getFields();

        for (Field field : fields) {
            System.out.println(field);
        }

        System.out.println();

        Field[] declaredFields = clazz.getDeclaredFields();

        for (Field declaredField : declaredFields) {
            System.out.println(declaredField);
        }
    }


    /**
     * 权限修饰符 数据类型 变量名
     */
    @Test
    public void test2 () {
        Class<Person> clazz = Person.class;

        Field[] declaredFields = clazz.getDeclaredFields();

        for (Field declaredField : declaredFields) {
            // 1. 权限修饰符
            System.out.print(Modifier.toString(declaredField.getModifiers()) + "\t");

            // 2. 数据类型
            Class<?> type = declaredField.getType();
            System.out.print(type.getName() + "\t");

            // 3. 变量名
            String fName = declaredField.getName();
            System.out.println(fName);
        }
    }

}
```



```java
package com.yixihan.day1029.reflecttest1.test;

import com.yixihan.day1029.reflecttest1.Person;
import org.junit.Test;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

/**
 * 获取运行时类的方法结构
 *
 * @author : yixihan
 * @create : 2021-10-29-21:42
 */
public class MethodTest {


    /**
     * getMethods() : 获取当前运行时类及其所有父类中声明为 public 权限的方法
     *
     * getDeclaredMethods() : 获取当前运行时类中声明的所有方法 (不包含父类声明的方法)
     */
    @Test
    public void test1 () {
        Class<Person> clazz = Person.class;

        Method[] methods = clazz.getMethods();

        for (Method method : methods) {
            System.out.println(method);
        }

        System.out.println();

        Method[] declaredMethods = clazz.getDeclaredMethods();

        for (Method declaredMethod : declaredMethods) {
            System.out.println(declaredMethod);
        }
    }

    /**
     * @Xxx
     * 权限修饰符 返回值类型 方法名(参数类型1 形参名1, ...) throw XxxException {}
     */
    @Test
    public void test2 () {
        Class<Person> clazz = Person.class;

        Method[] declaredMethods = clazz.getDeclaredMethods();

        for (Method declaredMethod : declaredMethods) {
            // 1. 获取方法声明的注解
            Annotation[] annotations = declaredMethod.getAnnotations();
            for (Annotation annotation : annotations) {
                System.out.println(annotation);
            }

            // 2. 获取方法的权限修饰符
            System.out.print(Modifier.toString(declaredMethod.getModifiers()) + "\t");

            // 3. 获取方法的返回值类型
            System.out.print(declaredMethod.getReturnType().getName() + "\t");

            // 4. 获取方法的方法名
            System.out.print(declaredMethod.getName() + "(");

            // 5. 形参列表
            Class<?>[] parameterTypes = declaredMethod.getParameterTypes();
            if (! (parameterTypes == null && parameterTypes.length == 0)) {
                for (int i = 0; i < parameterTypes.length; i++) {
                    System.out.print(parameterTypes[i].getName() + " args_" + i);

                    if (i != parameterTypes.length - 1) {
                        System.out.print(", ");
                    }
                }
            }

            System.out.print(")" + "\t");

            // 6. 抛出的异常
            Class<?>[] exceptionTypes = declaredMethod.getExceptionTypes();
            if (exceptionTypes.length > 0) {
                System.out.print(" throw ");
                for (int i = 0; i < exceptionTypes.length; i++) {
                    System.out.print(exceptionTypes[i].getName() );

                    if (i != exceptionTypes.length - 1) {
                        System.out.print(", ");
                    }
                }
            }

            System.out.println("\n");

        }
    }
}
```



```java
package com.yixihan.day1029.reflecttest1.test;

import com.yixihan.day1029.reflecttest1.Person;
import org.junit.Test;

import java.lang.annotation.Annotation;
import java.lang.reflect.Constructor;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

/**
 *
 * @author : yixihan
 * @create : 2021-10-29-22:00
 */
public class OtherTest {

    /**
     * 获取构造器结构
     * getConstructors() : 获取当前运行时类中声明为 public 权限的构造器
     *
     * getDeclaredConstructors() : 获取当前运行时类中声明的所有的构造器
     */
    @Test
    public void test1 () {

        Class<Person> clazz = Person.class;

        Constructor<?>[] constructors = clazz.getConstructors();

        for (Constructor<?> constructor : constructors) {
            System.out.println(constructor);
        }

        System.out.println();

        Constructor<?>[] declaredConstructors = clazz.getDeclaredConstructors();

        for (Constructor<?> declaredConstructor : declaredConstructors) {
            System.out.println(declaredConstructor);
        }
    }


    /**
     * 获取运行时类的父类
     */
    @Test
    public void test2 () {

        Class<Person> clazz = Person.class;

        Class<? super Person> superclass = clazz.getSuperclass();
        System.out.println(superclass);
    }


    /**
     * 获取运行时类的带泛型的父类
     */
    @Test
    public void test3 () {

        Class<Person> clazz = Person.class;

        Type genericSuperclass = clazz.getGenericSuperclass();
        System.out.println(genericSuperclass);
    }


    /**
     * 获取运行时类的带泛型的父类的泛型
     *
     *
     * 代码 : 逻辑性代码 vs 功能性代码
     */
    @Test
    public void test4 () {

        Class<Person> clazz = Person.class;

        Type genericSuperclass = clazz.getGenericSuperclass();

        ParameterizedType parameterizedType = (ParameterizedType) genericSuperclass;

        // 获取泛型类型
        Type[] types = parameterizedType.getActualTypeArguments();

        for (Type type : types) {
            System.out.println(type.getTypeName());
            System.out.println(((Class) type).getName());
        }
    }


    /**
     * 获取运行时类实现的接口
     */
    @Test
    public void test5 () {
        Class<Person> clazz = Person.class;

        Class<?>[] interfaces = clazz.getInterfaces();

        for (Class<?> anInterface : interfaces) {
            System.out.println(anInterface);
        }

        System.out.println();

        // 获取运行时类父类的接口
        Class<? super Person> superclass = clazz.getSuperclass();

        Class<?>[] interfaces1 = superclass.getInterfaces();

        for (Class<?> anInterface1 : interfaces1) {
            System.out.println(anInterface1);
        }
    }


    /**
     * 获取运行时类所在的包
     */
    @Test
    public void test6 () {

        Class<Person> clazz = Person.class;

        Package aPackage = clazz.getPackage();

        System.out.println(aPackage);
    }


    /**
     * 获取运行类声明的注解
     */
    @Test
    public void test7 () {

        Class<Person> clazz = Person.class;

        Annotation[] annotations = clazz.getAnnotations();

        for (Annotation annotation : annotations) {
            System.out.println(annotation);
        }
    }



}
```



### 调用运行时类的指定结构



#### 调用指定方法



通过反射，调用类中的方法，通过Method类完成。步骤： 

1.  通过Class类的getMethod(String name,Class…parameterTypes)方法取得 一个Method对象，并设置此方法操作时所需要的参数类型。 

2.  之后使用Object invoke(Object obj, Object[] args)进行调用，并向方法中 传递要设置的obj对象的参数信息。

![image-20211029175228019](/assets/imgs/JavaSE7.assets/image-20211029175228019.png)



==Object invoke(Object obj, Object … args)==

说明： 

1.  Object 对应原方法的返回值，若原方法无返回值，此时返回null 
2.  若原方法若为静态方法，此时形参Object obj可为null 
3.  若原方法形参列表为空，则Object[] args为null 
4.  若原方法声明为private,则需要在调用此invoke()方法前，显式调用 方法对象的setAccessible(true)方法，将可访问private的方法。



#### 调用指定属性



在反射机制中，可以直接通过Field类操作类中的属性，通过Field类提供的set()和 get()方法就可以完成设置和取得属性内容的操作。 

- public Field getField(String name) 返回此Class对象表示的类或接口的指定的 public的Field。 
- public Field getDeclaredField(String name)返回此Class对象表示的类或接口的 指定的Field。 



- 在Field中： 
  - public Object get(Object obj) 取得指定对象obj上此Field的属性内容 
  - public void set(Object obj,Object value) 设置指定对象obj上此Field的属性内容





#### 关于setAccessible方法的使用



- Method和Field、Constructor对象都有setAccessible()方法。 
- setAccessible启动和禁用访问安全检查的开关。
- 参数值为true则指示反射的对象在使用时应该取消Java语言访问检查。 
- 提高反射的效率。如果代码中必须用反射，而该句代码需要频繁的被 调用，那么请设置为true。 
- 使得原本无法访问的私有成员也可以访问 
- 参数值为false则指示反射的对象应该实施Java语言访问检查。



#### 代码解释

```java
package com.yixihan.day1029.reflecttest2;

import com.yixihan.day1029.reflecttest1.Person;
import org.junit.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

/**
 * 调用运行时类中指定的结构 : 属性 方法 构造器
 *
 * @author : yixihan
 * @create : 2021-10-29-22:21
 */
public class ReflectionTest {

    /**
     * 不需要掌握
     */
    @Test
    public void testFiled () throws Exception {
        Class<Person> clazz = Person.class;

        // 创建运行时类的对象

        Person p1 = clazz.newInstance();

        // 获取指定的属性 : 要求运行时类中属性声明为 public
        // 通常不采用此方法
        Field id = clazz.getField("id");

        /*
        设置当前属性的值

        set() : 参数一 : 指明设置哪个对象的属性  参数二 : 将次属性值设置为多少
         */
        id.set(p1, 1001);

        /*
        获取当前属性的值

        get() : 参数一 : 获取哪个对象的当前属性值
         */
        int pid = (int) id.get(p1);

        System.out.println(pid);
    }


    /**
     * 如何操作运行时类中指定的属性 --- 需要掌握
     */
    @Test
    public void testField2 () throws Exception {
        Class<Person> clazz = Person.class;

        // 创建运行时类的对象
        Person p1 = clazz.newInstance();

        // 1. getDeclaredField(String filedName) : 获取运行时类的指定变量名的属性
        Field name = clazz.getDeclaredField("name");

        // 2. 保证当前属性是可访问的
        name.setAccessible(true);

        // 3. 获取 设置指定对象的此属性值
        name.set(p1, "Tom");

        String pName = (String) name.get(p1);

        System.out.println(pName);
    }


    /**
     * 如何操作运行时类中指定的方法 --- 需要掌握
     */
    @Test
    public void testMethod () throws Exception {
        Class<Person> clazz = Person.class;

        Person p1 = clazz.newInstance();

        /*
        1. 获取指定的某个方法

        getDeclaredMethod() : 参数一 : 指明获取的方法的名称  参数二 : 指明获取的方法的形参列表
         */
        Method show = clazz.getDeclaredMethod("show", String.class);

        // 2. 保证当前属性是可访问的
        show.setAccessible(true);

        /*
        3. 调用当前方法的 invoke 方法

        invoke() : 参数一 : 方法的调用者  参数二 : 给方法形参赋值的实参
        invoke() 的返回值即为对应类中调用的方法的返回值
         */
        String nation = (String) show.invoke(p1, "中国");

        System.out.println(nation);


        System.out.println("*****************如果调用静态方法*****************");

        Method showDesc = clazz.getDeclaredMethod("showDesc");

        showDesc.setAccessible(true);

        // 如果调用的运行时类中的方法没有返回值, 则此 invoke() 返回 null
        Object returnValue = showDesc.invoke(clazz);
//        Object returnValue = showDesc.invoke(null);
        System.out.println(returnValue);


    }


    /**
     * 如果调用运行时类中指定的构造器
     */
    @Test
    public void testConstructor () throws Exception {
        Class<Person> clazz = Person.class;

        /*
        1. 获取指定的构造器

        getDeclaredConstructor() : 参数 : 指明构造器的参数列表
         */
        Constructor<Person> constructor = clazz.getDeclaredConstructor(String.class);

        // 2. 保证当前属性是可访问的
        constructor.setAccessible(true);

        // 3. 调用此构造器创建此运行时类的对象
        Person tom = constructor.newInstance("Tom");

        System.out.println(tom);


    }


}
```



### 反射的应用：动态代理



#### 代理设计模式的原理



使用一个代理将对象包装起来, 然后用该代理对象取代原始对象。任何对原 始对象的调用都要通过代理。代理对象决定是否以及何时将方法调用转到原 始对象上。



- 之前为大家讲解过代理机制的操作，属于静态代理，特征是代理类和目标 对象的类都是在编译期间确定下来，不利于程序的扩展。同时，每一个代 理类只能为一个接口服务，这样一来程序开发中必然产生过多的代理。**最 好可以通过一个代理类完成全部的代理功能。**

- 动态代理是指客户通过代理类来调用其它对象的方法，并且是在程序运行时 根据需要动态创建目标类的代理对象。

- 动态代理使用场合:

  - 调试
  - 远程方法调用

- 动态代理相比于静态代理的优点：

  抽象角色中（接口）声明的所有方法都被转移到调用处理器一个集中的方法中 处理，这样，我们可以更加灵活和统一的处理众多的方法。



#### Java动态代理相关API



==Proxy== ：专门完成代理的操作类，是所有动态代理类的父类。通过此类为一 个或多个接口动态地生成实现类。



- 提供用于创建动态代理类和动态代理对象的静态方法
- static Class getProxyClass(ClassLoader loader, Class... interfaces) 创建 一个动态代理类所对应的Class对象 
- static Object newProxyInstance(ClassLoader loader, Class[] interfaces, InvocationHandler h) 直接创建一个动态代理对象



ClassLoader loader ---> 类加载器

 Class[] interfaces  ---> 得到被代理类实 现的全部接口

InvocationHandler h ---> 得到InvocationHandler接 口的实现类实例



#### 动态代理步骤



1.  创建一个实现接口InvocationHandler的类，它必须实现invoke方 法，以完成代理的具体操作。

```java
// theProxy 代理类的对象
// method 要调用的方法
// Object[] params  方法调用时所需要的参数
public Object invoke(Object theProxy, Method method, Object[] params)
    throws Throwable{
    try{
        Object retval = method.invoke(targetObj, params);
        // Print out the result
        System.out.println(retval);
        return retval;
    }catch (Exception exc){}
}
```

2.  创建被代理的类以及接口

![image-20211029175953544](/assets/imgs/JavaSE7.assets/image-20211029175953544.png)

3.  通过Proxy的静态方法 newProxyInstance(ClassLoader loader, Class[] interfaces, InvocationHandler h) 创建 一个Subject接口代理

```java
RealSubject target = new RealSubject();
// Create a proxy to wrap the original implementation
DebugProxy proxy = new DebugProxy(target);
// Get a reference to the proxy through the Subject interface
Subject sub = (Subject) Proxy.newProxyInstance(
Subject.class.getClassLoader(),new Class[] { Subject.class }, proxy);

```

4.  通过 Subject代理调用RealSubject实现类的方法

```java
String info = sub.say(“Peter", 24);
System.out.println(info);
```



#### 动态代理与AOP（Aspect Orient Programming)



前面介绍的Proxy和InvocationHandler，很难看出这种动态代理的优势，下 面介绍一种更实用的动态代理机制

![image-20211029180049287](/assets/imgs/JavaSE7.assets/image-20211029180049287.png)



改进后的说明：代码段1、代码段2、代码段3和深色代码段分离开了，但代码段1、2、3又和 一个特定的方法A耦合了！最理想的效果是：代码块1、2、3既可以执行方法A，又无须在程序 中以硬编码的方式直接调用深色代码的方法

![image-20211029180102665](/assets/imgs/JavaSE7.assets/image-20211029180102665.png)





- 使用Proxy生成一个动态代理时，往往并不会凭空产生一个动态代理，这样没有 太大的意义。通常都是为指定的目标对象生成动态代理

- 这种动态代理在AOP中被称为AOP代理，AOP代理可代替目标对象，AOP代理 包含了目标对象的全部方法。但AOP代理中的方法与目标对象的方法存在差异：==AOP代理里的方法可以在执行目标方法之前、之后插入一些通用处理==

  ![image-20211029180139760](/assets/imgs/JavaSE7.assets/image-20211029180139760.png)



#### 代码解释 



##### 静态代理

```java
package com.yixihan.day1030.staticproxytest;

/**
 * @author : yixihan
 * @create : 2021-10-30-10:42
 */
public interface ClothFactory {
    /**
     * 生产衣服
     */
    void produceCloth();
}
```



```java
package com.yixihan.day1030.staticproxytest;

/**
 * @author : yixihan
 * @create : 2021-10-30-10:43
 */
public class NikeClothFactory implements ClothFactory{
    @Override
    public void produceCloth() {
        System.out.println("Nike 工厂生产一批运动服");
    }
}
```



```java
package com.yixihan.day1030.staticproxytest;

/**
 * @author : yixihan
 * @create : 2021-10-30-10:43
 */
public class ProxyClothFactory implements ClothFactory {

    /**
     * 用被代理类的对象进行实例化
     */
    private ClothFactory factory;

    public ProxyClothFactory(ClothFactory factory) {
        this.factory = factory;
    }

    @Override
    public void produceCloth() {
        System.out.println("代理工厂做一些准备工作");

        factory.produceCloth();

        System.out.println("代理工厂做一些后续的收尾工作");
    }
}
```



```java
package com.yixihan.day1030.staticproxytest;

/**
 * 静态代理举例
 *
 * 特点 : 代理类和被代理类在编译期间, 就确定下来了
 *
 * @author : yixihan
 * @create : 2021-10-30-10:16
 */
public class StaticProxyTest {


    public static void main(String[] args) {

        // 创建被代理类的对象
        NikeClothFactory nike = new NikeClothFactory();

        // 创建代理类的对象
        ProxyClothFactory proxyClothFactory = new ProxyClothFactory(nike);

        proxyClothFactory.produceCloth();
    }
}
```



##### 动态代理

```java
package com.yixihan.day1030.proxytest;

/**
 * @author : yixihan
 * @create : 2021-10-30-10:43
 */
public interface Human {

    /**
     * 获取信仰
     * @return 信仰
     */
    String getBelief ();

    /**
     * 吃饭
     * @param food 食物
     */
    void eat (String food);

}
```



```java
package com.yixihan.day1030.proxytest;

/**
 * 被代理类
 * @author : yixihan
 * @create : 2021-10-30-10:44
 */
public class SuperMan implements Human{

    @Override
    public String getBelief() {
        return "I believe I can fly!";
    }

    @Override
    public void eat(String food) {
        System.out.println("我喜欢吃 " + food);
    }
}
```



```java
package com.yixihan.day1030.proxytest;

import java.lang.reflect.Proxy;

/**
 * @author : yixihan
 * @create : 2021-10-30-10:44
 */
public class ProxyFactory {

    /**
     * 调用此方法, 返回一个代理类的对象
     * @param obj 被代理类的对象
     * @return 代理类的对象
     */
    public static Object getProxyInstance (Object obj) {

        MyInvocationHandler handler = new MyInvocationHandler();

        handler.bind(obj);

        return Proxy.newProxyInstance(
                obj.getClass().getClassLoader(),
                obj.getClass().getInterfaces(),
                handler
        );
    }

}
```



```java
package com.yixihan.day1030.proxytest;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

/**
 * @author : yixihan
 * @create : 2021-10-30-10:45
 */
public class MyInvocationHandler implements InvocationHandler {

    /**
     * 需要被代理类的对象进行赋值
     */
    private Object obj;


    public void bind (Object obj) {
        this.obj = obj;
    }

    /**
     * 当我们通过代理类的对象调用方法 a 时, 就会自动的调用如下的方法, invoke()
     * 将被代理类要执行的方法 a 的功能就声明在 invoke 方法中
     * @param proxy 代理类的对象
     * @param method 代理类的对象调用的方法
     * @param args 参数
     */
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        HumanUtil.method1();

        // method() : 即为代理类对象调用的方法, 此方法也就作为了被代理类对象要调用的方法
        // obj 被代理类的对象
        Object invoke = method.invoke(obj, args);

        HumanUtil.method2();

        // 上述对象的返回值就作为当前类的 invoke() 的返回值
        return invoke;

    }
}
```



```java
package com.yixihan.day1030.proxytest;

/**
 * @author : yixihan
 * @create : 2021-10-30-10:52
 */
public class HumanUtil {

    public static void method1 () {
        System.out.println("============ 通用方法一 ============ ");
    }

    public static void method2 () {
        System.out.println("============ 通用方法二 ============ ");
    }
}
```



```java
package com.yixihan.day1030.proxytest;

import com.yixihan.day1030.staticproxytest.ClothFactory;
import com.yixihan.day1030.staticproxytest.NikeClothFactory;

/**
 * 动态代理的举例
 *
 * 要想实现动态代理, 需要解决的问题 ?
 *     问题一 : 如果根据加载到内存中的被代理类, 动态的创建一个代理类及其对象
 *     问题二 : 当通过代理类的对象调用方法 a 时, 如果动态的去调用被代理类中的同名方法 a
 *
 * @author : yixihan
 * @create : 2021-10-30-10:21
 */
public class ProxyTest {

    public static void main(String[] args) {

        SuperMan superMan = new SuperMan();

        // 创建一个代理类的对象, 而非 SuperMan 对象
        Human proxyInstance = (Human) ProxyFactory.getProxyInstance(superMan);

        // 当通过代理类对象调用方法时, 会自动的调用被逮了类中同名的方法
        String belief = proxyInstance.getBelief();
        System.out.println(belief);

        proxyInstance.eat("重庆火锅");


        System.out.println("************************");


        NikeClothFactory nike = new NikeClothFactory();

        ClothFactory proxyInstance1 = (ClothFactory) ProxyFactory.getProxyInstance(nike);

        proxyInstance1.produceCloth();


    }
}
```





## Java8的其它新特性



Java 8 (又称为 jdk 1.8) 是 Java 语言开发的一个主要版本

Java 8 是oracle公司于2014年3月发布，可以**看成是自Java 5 以 来最具革命性的版本**。Java 8为Java语言、编译器、类库、开发 工具与JVM带来了大量新特性。

![Java 8 新特性](/assets/imgs/JavaSE7.assets/jdk8_new.bmp)



> Java 新特性简介

- 速度更快 
- 代码更少(增加了新的语法：Lambda 表达式) 
- 强大的 Stream API 
- 便于并行 
- 最大化减少空指针异常：Optional 
- Nashorn引擎，允许在JVM上运行JS应用



> 并行流与串行流



并行流就是把一个内容分成多个数据块，并用不同的线程分别处理每个数 据块的流。相比较串行的流，**并行的流可以很大程度上提高程序的执行效率。**



 Java 8 中将并行进行了优化，我们可以很容易的对数据进行并行操作。 Stream API 可以声明性地通过 parallel() 与 sequential() 在并行流与顺序流 之间进行切换。



### Lambda表达式



#### 为什么使用 Lambda 表达式



Lambda 是一个==匿名函数==，我们可以把 Lambda 表达式理解为是==一段可以传递的代码==（将代码像数据一样进行传递）。使用它可以写出更简洁、更 灵活的代码。作为一种更紧凑的代码风格，使Java的语言表达能力得到了 提升。



> 举例

![image-20211030094157238](/assets/imgs/JavaSE7.assets/image-20211030094157238.png)



![image-20211030094206528](/assets/imgs/JavaSE7.assets/image-20211030094206528.png)



#### 语法



Lambda 表达式：在Java 8 语言中引入的一种新的语法元素和操 作符。这个操作符为 “==->==” ， 该操作符被称为 **Lambda 操作符** 或箭头操作符。

它将 Lambda 分为两个部分： 

​	**左侧**：指定了 Lambda 表达式需要的**参数列表** 

​	**右侧**：指定了 **Lambda 体**，是抽象方法的实现逻辑，也即 Lambda 表达式要执行的功能。



![image-20211030094328212](/assets/imgs/JavaSE7.assets/image-20211030094328212.png)

![image-20211030094338952](/assets/imgs/JavaSE7.assets/image-20211030094338952.png)



#### 类型推断



上述 Lambda 表达式中的参数类型都是由编译器推断得出的。Lambda 表达式中无需指定类型，程序依然可以编译，这是因为 javac 根据程序 的上下文，在后台推断出了参数的类型。Lambda 表达式的类型依赖于 上下文环境，是由编译器推断出来的。这就是所谓的“**类型推断**”。

![image-20211030094359308](/assets/imgs/JavaSE7.assets/image-20211030094359308.png)



```java
package com.yixihan.day1030.lambdatest;

import org.junit.Test;

import java.util.Comparator;
import java.util.Random;

/**
 * lambda 表达式的使用举例
 *
 * @author : yixihan
 * @create : 2021-10-30-11:13
 */
public class LambdaTest {

    @Test
    public void test1 () {

        Runnable r1 = new Runnable() {
            @Override
            public void run() {
                System.out.println("我爱重庆万州");
            }
        };


        r1.run();

        System.out.println("***************");


        Runnable r2 = () -> System.out.println("我爱四川成都");


        r2.run();
    }


    @Test
    public void test2 () {

        Comparator<Integer> com1 = new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return Integer.compare(o1, o2);
            }
        };

        Random random = new Random();

        int c1 = com1.compare(random.nextInt(10), random.nextInt(10));
        System.out.println(c1);

        System.out.println("***************");

        // lambda 表达式的写法
        Comparator<Integer> com2 = (o1, o2) -> Integer.compare(o1, o2);

        int c2 = com2.compare(random.nextInt(10), random.nextInt(10));
        System.out.println(c2);

        System.out.println("***************");

        // 方法引用
        Comparator<Integer> com3 = Integer::compare;

        int c3 = com3.compare(random.nextInt(10), random.nextInt(10));
        System.out.println(c3);
    }

}
```



### 函数式(Functional)接口



#### 什么是函数式(Functional)接口



- **只包含一个抽象方法的接口，称为函数式接口。**
- 你可以通过 Lambda 表达式来创建该接口的对象。（若 Lambda 表达式 抛出一个受检异常(即：非运行时异常)，那么该异常需要在目标接口的抽 象方法上进行声明）。
- 我们可以在一个接口上使用 ==@FunctionalInterface== 注解，这样做可以检 查它是否是一个函数式接口。同时 javadoc 也会包含一条声明，说明这个 接口是一个函数式接口。
-  ==在java.util.function包下定义了Java 8 的丰富的函数式接口==
- Java从诞生日起就是一直倡导“一切皆对象”，在Java里面面向对象(OOP) 编程是一切。但是随着python、scala等语言的兴起和新技术的挑战，Java不 得不做出调整以便支持更加广泛的技术要求，也即**java不但可以支持OOP还 可以支持OOF（面向函数编程）**
- 在函数式编程语言当中，函数被当做一等公民对待。在将函数作为一等公民的 编程语言中，Lambda表达式的类型是函数。但是在Java8中，有所不同。在 Java8中，Lambda表达式是对象，而不是函数，它们必须依附于一类特别的 对象类型——**函数式接口**。
- 简单的说，在Java8中，**Lambda表达式就是一个函数式接口的实例**。这就是 Lambda表达式和函数式接口的关系。也就是说，只要一个对象是函数式接口 的实例，那么该对象就可以用Lambda表达式来表示。
- **所以以前用匿名实现类表示的现在都可以用Lambda表达式来写。**



#### 函数式接口举例



![image-20211030094604148](/assets/imgs/JavaSE7.assets/image-20211030094604148.png)



#### 自定义函数式接口



![image-20211030094621009](/assets/imgs/JavaSE7.assets/image-20211030094621009.png)



#### 作为参数传递 Lambda 表达式

![image-20211030094635177](/assets/imgs/JavaSE7.assets/image-20211030094635177.png)



#### Java 内置四大核心函数式接口



![image-20211030094651491](/assets/imgs/JavaSE7.assets/image-20211030094651491.png)



> 其它接口

![image-20211030094705524](/assets/imgs/JavaSE7.assets/image-20211030094705524.png)



```java
package com.yixihan.day1030.lambdatest;

import com.yixihan.day1030.functionaltest.MyInterface;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.function.Consumer;

/**
 *
 * Lambda 表达式的使用
 *
 * 1. 举例 : (o1, o2) -> Integer.compare (o1, o2)
 *
 * 2. 格式 :
 *      -> : lambda 操作符 或 箭头操作符
 *      -> 左边 : lambda 形参列表 (其实就是接口中的抽象方法的形参列表)
 *      -> 右边 : lambda 体 (其实就是重写的抽象方法的方法体)
 *
 * 3. lambda 表达式的使用 : 分六种情况
 *
 *      总结 :
 *          -> 左边 : lambda 形参列表的参数类型可以省略 (类型推断)
 *                    如果参数列表只有一个参数, 其 () 可以省略
 *                    如果参数列表没有参数或者有一个以上的参数, 其 () 不可以省略
 *
 *          -> 右边 : lambda 体应该使用一对 {} 包裹
 *                    如果 lambda 体只有一条执行语句 (可能是 return语句), 可以省略这一对 {} 和 return 关键字
 *
 *
 * 4. lambda 表达式的本质 : 作为函数式接口的实例
 *
 * 5. 如果一个接口中, 只声明了一个方法, 就称为函数式接口
 *      我们可以在一个接口上使用 @FunctionalInterface 注解，
 *      这样做可以检查它是否是一个函数式接口。
 *      同时 javadoc 也会包含一条声明，说明这个接口是一个函数式接口。
 *
 * 6. 所以以前用匿名实现类表示的现在都可以用Lambda表达式来写。
 *
 * @author : yixihan
 * @create : 2021-10-30-11:20
 */
public class LambdaTest1 {


    /**
     * 语法格式一 : 无参无返回值
     */
    @Test
    public void test1 () {

        Runnable r1 = new Runnable() {
            @Override
            public void run() {
                System.out.println("我爱重庆万州");
            }
        };
        r1.run();

        System.out.println("***************");

        Runnable r2 = () -> System.out.println("我爱四川成都");
        r2.run();
    }


    /**
     * 语法格式二 : Lambda 需要一个参数, 但是没有返回值
     */
    @Test
    public void test2 () {

        Consumer<String> con1 = new Consumer<String>() {
            @Override
            public void accept(String s) {
                System.out.println(s);
            }
        };
        con1.accept("谎言和誓言的区别是什么呢?");

        System.out.println("***************");

        Consumer<String> con2 = (String s) -> {
            System.out.println(s);
        };

        con2.accept("一个是听的人当真了, 一个是说的人当真了");
    }


    /**
     * 语法格式三 : 数据类型可以省略, 因为可由编译器推断得出, 成为类型推断
     */
    @Test
    public void test3 () {
        Consumer<String> con1 = (String s) -> {
            System.out.println(s);
        };
        con1.accept("谎言和誓言的区别是什么呢?");

        System.out.println("***************");

        Consumer<String> con2 = (s) -> {
            System.out.println(s);
        };
        con2.accept("一个是听的人当真了, 一个是说的人当真了");
    }


    @Test
    public void test4 () {

        // 类型推断
        ArrayList<String> list = new ArrayList<>();

        // 类型推断
        int[] arr = {1, 2, 3};
    }


    /**
     * 语法格式四 : lambda 若只需要一个参数时, 参数的小括号可以省略
     */
    @Test
    public void test5 () {
        Consumer<String> con1 = (s) -> {
            System.out.println(s);
        };
        con1.accept("谎言和誓言的区别是什么呢?");

        System.out.println("***************");

        Consumer<String> con2 = (s) -> System.out.println(s);;
        con2.accept("一个是听的人当真了, 一个是说的人当真了");
    }


    /**
     * 语法格式五 : lambda 需要两个或以上的参数, 多条执行语句, 并且可以有返回值
     */
    @Test
    public void test6 () {

        Comparator<Integer> com1 = new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                System.out.println(o1);
                System.out.println(o2);
                return o1.compareTo(o2);
            }
        };
        System.out.println(com1.compare(12, 21));

        System.out.println("***************");

        Comparator<Integer> com2 = (o1, o2) -> {
            System.out.println(o1);
            System.out.println(o2);
            return o1.compareTo(o2);
        };
        System.out.println(com2.compare(6, 1));
    }


    /**
     * 语法格式六 : 当 lambda 体只有一条执行语句时, return 与 大括号若有, 都可以省略
     */
    @Test
    public void test7 () {
        Comparator<Integer> com1 = (o1, o2) -> {
            return o1.compareTo(o2);
        };
        System.out.println(com1.compare(12, 21));

        System.out.println("***************");

        Comparator<Integer> com2 = (o1, o2) -> o1.compareTo(o2);
        System.out.println(com2.compare(6, 1));
    }


    @Test
    public void test8 () {
        Consumer<String> con1 = (s) -> {
            System.out.println(s);
        };
        con1.accept("谎言和誓言的区别是什么呢?");

        System.out.println("***************");

        Consumer<String> con2 = (s) -> System.out.println(s);
        con2.accept("一个是听的人当真了, 一个是说的人当真了");
    }


    @Test
    public void test9 () {

        Runnable runnable = () -> System.out.println("hello");

        Consumer<String> consumer = s -> System.out.println(s);

        MyInterface myInterface = () -> System.out.println("hello");
    }
}
```



```java
package com.yixihan.day1030.lambdatest;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Predicate;

/**
 * Java 内置的 4 大核心函数式接口
 *
 *      消费型接口 Consumer<T> void accept (T t)
 *      供给型接口 Supplier<T> T get()
 *      函数型接口 Function<T, R> R apply (T t)
 *      断定型接口 Predicate<T> boolean test(T t)
 *
 *
 * @author : yixihan
 * @create : 2021-10-30-11:54
 */
public class LambdaTest2 {

    @Test
    public void test1 () {

        happyTime(500, new Consumer<Double>() {
            @Override
            public void accept(Double aDouble) {
                System.out.println("学习太累了, 去天上人间买了瓶矿泉水, 价格为 : " + aDouble);
            }
        });

        System.out.println("*********");

        happyTime(500, money -> System.out.println("学习太累了, 去天上人间喝了杯⑨, 价格为 : " + money));
    }

    public void happyTime (double money, Consumer<Double> con) {
        con.accept(money);
    }


    @Test
    public void test2 () {

        List<String> list = Arrays.asList("北京", "南京", "天津", "西京", "东京", "普京");

        List<String> filterList1 = filterString(list, new Predicate<String>() {
            @Override
            public boolean test(String s) {

                return s.contains("京");
            }
        });
        System.out.println(filterList1);

        System.out.println("************************");

        List<String> filterList2 = filterString(list, s -> s.contains("京"));
        System.out.println(filterList2);

    }

    /**
     * 根据给定的规则, 过滤集合中的字符串, 此规则由 Predicate 的方法决定
     * @param list 要过滤的集合
     * @param pre 指定的规则
     * @return 过滤完的集合
     */
    public List<String> filterString (List<String> list, Predicate<String> pre) {

        ArrayList<String> filterList = new ArrayList<>();

        for (String s : list) {
            if (pre.test(s)) {
                filterList.add(s);
            }
        }

        return filterList;
    }
}
```



```java
package com.yixihan.day1030.functionaltest;

/**
 * 自定义函数式接口
 * @author : yixihan
 * @create : 2021-10-30-11:47
 */
@FunctionalInterface
public interface MyInterface {

    /**
     * 方式一
     */
    void method1();
}
```



### 方法引用与构造器引用



#### 方法引用(Method References)



- 当要传递给Lambda体的操作，已经有实现的方法了，可以使用方法引用！
- 方法引用可以看做是Lambda表达式深层次的表达。换句话说，方法引用就 是Lambda表达式，也就是函数式接口的一个实例，通过方法的名字来指向 一个方法，可以认为是Lambda表达式的一个语法糖。
- **要求：实现接口的抽象方法的参数列表和返回值类型，必须与方法引用的 方法的参数列表和返回值类型保持一致！**
- 格式：使用操作符 “==::==” 将类(或对象) 与 方法名分隔开来。
- 如下三种主要使用情况：
  - 对象::实例方法名
  - 类::静态方法名
  - 类::实例方法名



> 举例

![image-20211030094821406](/assets/imgs/JavaSE7.assets/image-20211030094821406.png)

![image-20211030094828611](/assets/imgs/JavaSE7.assets/image-20211030094828611.png)



#### 构造器引用



**格式**： ==ClassName::new==



与函数式接口相结合，自动与函数式接口中方法兼容。 可以把构造器引用赋值给定义的方法，

**要求构造器参数列表要与接口中抽象 方法的参数列表一致！且方法的返回值即为构造器对应类的对象。** 



> 举例

![image-20211030094919224](/assets/imgs/JavaSE7.assets/image-20211030094919224.png)



#### 数组引用



**格式**： ==type[] :: new==



> 举例

![image-20211030094950593](/assets/imgs/JavaSE7.assets/image-20211030094950593.png)



```java
package com.yixihan.day1030.referencetest;

/**
 * @author shkstart 邮箱：shkstart@126.com
 */
public class Employee {

   private int id;
   private String name;
   private int age;
   private double salary;

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

   public Employee() {

   }

   public Employee(int id) {

      this.id = id;
   }

   public Employee(int id, String name) {
      this.id = id;
      this.name = name;
   }

   public Employee(int id, String name, int age, double salary) {

      this.id = id;
      this.name = name;
      this.age = age;
      this.salary = salary;
   }

   @Override
   public String toString() {
      return "Employee{" + "id=" + id + ", name='" + name + '\'' + ", age=" + age + ", salary=" + salary + '}';
   }

   @Override
   public boolean equals(Object o) {
      if (this == o) {
         return true;
      }
      if (o == null || getClass() != o.getClass()) {
         return false;
      }

      Employee employee = (Employee) o;

      if (id != employee.id) {
         return false;
      }
      if (age != employee.age) {
         return false;
      }
      if (Double.compare(employee.salary, salary) != 0) {
         return false;
      }
      return name != null ? name.equals(employee.name) : employee.name == null;
   }

   @Override
   public int hashCode() {
      int result;
      long temp;
      result = id;
      result = 31 * result + (name != null ? name.hashCode() : 0);
      result = 31 * result + age;
      temp = Double.doubleToLongBits(salary);
      result = 31 * result + (int) (temp ^ (temp >>> 32));
      return result;
   }
}
```



```java
package com.yixihan.day1030.referencetest;

import java.util.ArrayList;
import java.util.List;
/**
 * 提供用于测试的数据
 * 
 * @author shkstart 邮箱：shkstart@126.com
 *
 */
public class EmployeeData {
   
   public static List<Employee> getEmployees(){
      List<Employee> list = new ArrayList<>();
      
      list.add(new Employee(1001, "马化腾", 34, 6000.38));
      list.add(new Employee(1002, "马云", 12, 9876.12));
      list.add(new Employee(1003, "刘强东", 33, 3000.82));
      list.add(new Employee(1004, "雷军", 26, 7657.37));
      list.add(new Employee(1005, "李彦宏", 65, 5555.32));
      list.add(new Employee(1006, "比尔盖茨", 42, 9500.43));
      list.add(new Employee(1007, "任正非", 26, 4333.32));
      list.add(new Employee(1008, "扎克伯格", 35, 2500.32));
      
      return list;
   }
   
}
```



#### 方法引用代码解释

```java
package com.yixihan.day1030.referencetest;

import org.junit.Test;

import java.io.PrintStream;
import java.util.Comparator;
import java.util.function.BiPredicate;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 * 方法引用的使用
 *
 * 1. 使用情景 : 当要传递给 lambda 体的操作已经有实现的方法了, 可以使用方法引用
 *
 * 2. 方法引用, 本质上就是 lambda 表达式, 而 lambda 表达式作为函数式接口的实例
 *       所以方法引用, 也是函数式接口的实例
 *
 * 3. 使用格式 :   类(或者对象) :: 方法名
 *
 * 4. 具体分为如下的三种情况
 *        对象 :: 非静态方法
 *        类 :: 静态方法
 *
 *        类 :: 非静态方法
 *
 *     5. 方法引用使用的要求 :
 *        要求接口中的 抽象方法的形参列表和返回值类型与 方法引用的方法的形参列表和返回值类型 必须相同 (针对于情况一和情况二)
 *
 *
 * @author yixihan
 */
public class MethodRefTest {


   /**
    * 情况一：对象 :: 实例方法
    * Consumer中的void accept(T t)
    * PrintStream中的void println(T t)
    */
   @Test
   public void test1() {

      Consumer<String> con1 = str -> System.out.println(str);
      con1.accept("成都");

      System.out.println("********************************");

      PrintStream out = System.out;
      Consumer<String> con2 = out::println;
      con2.accept("重庆");
   }
   

   /**
    * Supplier中的T get()
    * Employee中的String getName()
    */
   @Test
   public void test2() {

      Employee tom = new Employee(1001, "Tom", 18, 5600);

      Supplier<String> sup1 = () -> tom.getName();
      System.out.println(sup1.get());

      System.out.println("********************************");

      Supplier<String> sup2 = tom::getName;
      System.out.println(sup2.get());

   }


   /**
    * 情况二：类 :: 静态方法
    * Comparator中的int compare(T t1,T t2)
    * Integer中的int compare(T t1,T t2)
    */
   @Test
   public void test3() {

      Comparator<Integer> com1 = (t1, t2) -> Integer.compare(t1, t2);
      System.out.println(com1.compare(12, 35));

      System.out.println("********************************");

      Comparator<Integer> com2 = Integer::compare;
      System.out.println(com2.compare(587, 99));
   }


   /**
    * Function中的R apply(T t)
    * Math中的Long round(Double d)
    */
   @Test
   public void test4() {

      Function<Double, Long> f1 = d -> Math.round(d);
      System.out.println(f1.apply(12.3));

      System.out.println("********************************");

      Function<Double, Long> f2 = Math::round;
      System.out.println(f2.apply(52.8));

   }


   /**
    * 情况三：类 :: 实例方法
    * Comparator中的int compare(T t1,T t2)
    * String中的int t1.compareTo(t2)
    */
   @Test
   public void test5() {

      Comparator<String> com1 = (t1, t2) -> t1.compareTo(t2);
      System.out.println(com1.compare("hello", "world"));

      System.out.println("********************************");

      Comparator<String> com2 = String::compareTo;
      System.out.println(com2.compare("yixihan", "zengsitong"));

   }


   /**
    * BiPredicate中的boolean test(T t1, T t2);
    *     String中的boolean t1.equals(t2)
    */
   @Test
   public void test6() {

      BiPredicate<String, String> bip1 = (t1, t2) -> t1.equals(t2);
      System.out.println(bip1.test("hello", "hello"));

      System.out.println("********************************");

      BiPredicate<String, String> bip2 = String::equals;
      System.out.println(bip2.test("world", "word"));

   }


   /**
    * Function中的R apply(T t)
    *     Employee中的String getName();
    */
   @Test
   public void test7() {

      Employee tom = new Employee(1001, "Tom", 18, 5600);

      Function<Employee, String> fun1 = emp -> emp.getName();
      System.out.println(fun1.apply(tom));

      System.out.println("********************************");

      Function<Employee, String> fun2 = Employee::getName;
      System.out.println(fun2.apply(tom));
   }

}
```



##### 构造器引用&数组引用代码解释

```java
package com.yixihan.day1030.referencetest;

import org.junit.Test;

import java.util.Arrays;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 * 一、构造器引用
 *      和方法引用类似, 函数式接口的抽象方法的形参列表和构造器的形参列表一直
 *      抽象方法的返回值类型即为构造器所属的类的类型
 *
 * 二、数组引用
 *      可以把数组看作一个特殊的类, 则写法与构造器引用一致了
 *
 * @author yixihan
 */
public class ConstructorRefTest {


    /**
     * 构造器引用
     * Supplier中的T get()
     * Employee 的空参构造器 Employee()
     */
    @Test
    public void test1(){
        Supplier<Employee> sup1 = () -> new Employee();
        Employee employee = sup1.get();
        System.out.println(employee);

        System.out.println("************************");

        Supplier<Employee> sup2 = Employee::new;
        Employee employee1 = sup2.get();
        System.out.println(employee1);
    }


    /**
     * Function中的R apply(T t)
     */
    @Test
    public void test2(){

        Function<Integer, Employee> fun1 = id -> new Employee(id);
        Employee employee1 = fun1.apply(1001);
        System.out.println(employee1);

        System.out.println("************************");

        Function<Integer, Employee> fun2 = Employee::new;
        Employee employee2 = fun2.apply(1002);
        System.out.println(employee2);

    }

    /**
     * BiFunction中的R apply(T t,U u)
     */
    @Test
    public void test3(){

        BiFunction<Integer, String, Employee> bif1 = (id, name) -> new Employee(id, name);
        Employee employee1 = bif1.apply(1001, "Tom");
        System.out.println(employee1);

        System.out.println("************************");

        BiFunction<Integer, String, Employee> bif2 = Employee::new;
        Employee employee2 = bif2.apply(1002, "Jane");
        System.out.println(employee2);
    }

    /**
     * 数组引用
     * Function中的R apply(T t)
     */
    @Test
    public void test4(){

        Function<Integer, String[]> fun1 = length -> new String[length];
        String[] string1 = fun1.apply(12);
        System.out.println(Arrays.toString(string1));

        System.out.println("************************");

        Function<Integer, String[]> fun2 = String[]::new;
        Function<String[], String> fun3 = Arrays::toString;

        String[] string2 = fun2.apply(20);
        System.out.println(fun3.apply(string2));
    }
}
```



### 强大的Stream API



#### Stream API说明



- Java8中有两大最为重要的改变。第一个是 ==Lambda 表达式==；另外一个则 是 ==Stream API==。
- ==Stream API ( java.util.stream)== 把真正的函数式编程风格引入到Java中。这 是目前为止对Java类库最好的补充，因为Stream API可以极大提供Java程 序员的生产力，让程序员写出高效率、干净、简洁的代码。
- Stream 是 Java8 中处理集合的关键抽象概念，它可以指定你希望对集合进 行的操作，可以执行非常复杂的查找、过滤和映射数据等操作。 **使用 Stream API 对集合数据进行操作，就类似于使用 SQL 执行的数据库查询**。 也可以使用 Stream API 来并行执行操作。简言之，Stream API 提供了一种 高效且易于使用的处理数据的方式。



#### 为什么要使用Stream API



- 实际开发中，项目中多数数据源都来自于Mysql，Oracle等。但现在数据源可以更多了，有MongDB，Radis等，而这些NoSQL的数据就需要 Java层面去处理。
- Stream 和 Collection 集合的区别：**Collection 是一种静态的内存数据 结构，而 Stream 是有关计算的**。前者是主要面向内存，存储在内存中， 后者主要是面向 CPU，通过 CPU 实现计算。



#### 什么是 Stream



Stream到底是什么呢？

是数据渠道，用于操作数据源（集合、数组等）所生成的元素序列。 

**“集合讲的是数据，Stream讲的是计算！”**



==注意：==

- Stream 自己不会存储元素。 
- Stream 不会改变源对象。相反，他们会返回一个持有结果的新Stream。 
- Stream 操作是延迟执行的。这意味着他们会等到需要结果的时候才执行。



#### Stream 的操作三个步骤



- 1- 创建 Stream

  一个数据源（如：集合、数组），获取一个流

- 2- 中间操作

  一个中间操作链，对数据源的数据进行处理

- 3- 终止操作(终端操作)

  一旦执行终止操作，就**执行中间操作链**，并产生结果。之后，不会再被使用

![image-20211030095236219](/assets/imgs/JavaSE7.assets/image-20211030095236219.png)



#### 创建 Stream方式一：通过集合



Java8 中的 Collection 接口被扩展，提供了两个获取流 的方法： 

- default Stream stream() : 返回一个顺序流 
- default Stream parallelStream() : 返回一个并行流



#### 创建 Stream方式二：通过数组



Java8 中的 Arrays 的静态方法 stream() 可以获取数组流： 

- static  Stream stream(T[] array): 返回一个流 



重载形式，能够处理对应基本类型的数组： 

- public static IntStream stream(int[] array) 
- public static LongStream stream(long[] array) 
- public static DoubleStream stream(double[] array)



#### 创建 Stream方式三：通过Stream的of()



可以调用Stream类静态方法 of(), 通过显示值创建一个 流。它可以接收任意数量的参数。

- public static Stream of(T... values) : 返回一个流



#### 创建 Stream方式四：创建无限流



可以使用静态方法 Stream.iterate() 和 Stream.generate(), 创建无限流。



- 迭代 

  public static Stream iterate(final T seed, final UnaryOperator f) 

- 生成 

  public static Stream generate(Supplier s) 



```java
// 方式四：创建无限流
@Test
public void test4() {
    // 迭代
    // public static<T> Stream<T> iterate(final T seed, final
    // UnaryOperator<T> f)
    Stream<Integer> stream = Stream.iterate(0, x -> x + 2);
    stream.limit(10).forEach(System.out::println);
    // 生成
    // public static<T> Stream<T> generate(Supplier<T> s)
    Stream<Double> stream1 = Stream.generate(Math::random);
    stream1.limit(10).forEach(System.out::println);
}
```



#### Stream 的中间操作



多个**中间操作**可以连接起来形成一个**流水线**，除非流水线上触发终止 操作，否则**中间操作不会执行任何的处理**！而在**终止操作时一次性全 部处理，称为“惰性求值”。**



##### 1-筛选与切片

![image-20211030095556690](/assets/imgs/JavaSE7.assets/image-20211030095556690.png)



##### 2-映 射

![image-20211030095612333](/assets/imgs/JavaSE7.assets/image-20211030095612333.png)



##### 3-排序

![image-20211030095625930](/assets/imgs/JavaSE7.assets/image-20211030095625930.png)



#### Stream 的终止操作



- 终端操作会从流的流水线生成结果。其结果可以是任何不是流的值，例 如：List、Integer，甚至是 void 。 
- 流进行了终止操作后，不能再次使用。



##### 1-匹配与查找

![image-20211030095701300](/assets/imgs/JavaSE7.assets/image-20211030095701300.png)

![image-20211030095712476](/assets/imgs/JavaSE7.assets/image-20211030095712476.png)



##### 2-归约

![image-20211030095725877](/assets/imgs/JavaSE7.assets/image-20211030095725877.png)



##### 3-收集

![image-20211030095740448](/assets/imgs/JavaSE7.assets/image-20211030095740448.png)



#### Collectors

![image-20211030095757449](/assets/imgs/JavaSE7.assets/image-20211030095757449.png)

![image-20211030095807362](/assets/imgs/JavaSE7.assets/image-20211030095807362.png)















### Optional类



- 到目前为止，臭名昭著的空指针异常是导致Java应用程序失败的最常见原因。 以前，为了解决空指针异常，Google公司著名的Guava项目引入了Optional类， Guava通过使用检查空值的方式来防止代码污染，它鼓励程序员写更干净的代 码。受到Google Guava的启发，Optional类已经成为Java 8类库的一部分。
- **Optional 类(java.util.Optional) 是一个容器类，它可以保存类型T的值，代表 这个值存在。或者仅仅保存null，表示这个值不存在。原来用 null 表示一个值不 存在，现在 Optional 可以更好的表达这个概念。并且可以避免空指针异常。**
- Optional类的Javadoc描述如下：这是一个可以为null的容器对象。如果值存在 则isPresent()方法会返回true，调用get()方法会返回该对象。
- **Optional提供很多有用的方法，这样我们就不用显式进行空值检测**
- 创建Optional类对象的方法 :
  - Optional.of(T t) : 创建一个 Optional 实例，t必须非空； 
  - Optional.empty() : 创建一个空的 Optional 实例 
  - Optional.ofNullable(T t)：t可以为null
- 判断Optional容器中是否包含对象：
  - boolean isPresent() : 判断是否包含对象 
  - void ifPresent(Consumer consumer) ：如果有值，就执行Consumer 接口的实现代码，并且该值会作为参数传给它。
- 获取Optional容器的对象： 
  - T get(): 如果调用对象包含值，返回该值，否则抛异常 
  - T orElse(T other) ：如果有值则将其返回，否则返回指定的other对象。 
  - T orElseGet(Supplier other) ：如果有值则将其返回，否则返回由 Supplier接口实现提供的对象。 
  - T orElseThrow(Supplier exceptionSupplier) ：如果有值则将其返 回，否则抛出由Supplier接口实现提供的异常。



```java
@Test
public void test1() {
    Boy b = new Boy("张三");
    Optional<Girl> opt = Optional.ofNullable(b.getGrilFriend());
    // 如果女朋友存在就打印女朋友的信息
    opt.ifPresent(System.out::println);
}
@Test
public void test2() {
    Boy b = new Boy("张三");
    Optional<Girl> opt = Optional.ofNullable(b.getGrilFriend());
    // 如果有女朋友就返回他的女朋友，否则只能欣赏“嫦娥”了
    Girl girl = opt.orElse(new Girl("嫦娥"));
    System.out.println("他的女朋友是：" + girl.getName());
}
@Test
public void test3(){
    Optional<Employee> opt = Optional.of(new Employee("张三", 8888));
    //判断opt中员工对象是否满足条件，如果满足就保留，否则返回空
    Optional<Employee> emp = opt.filter(e -> e.getSalary()>10000);
    System.out.println(emp);
}
@Test
public void test4(){
    Optional<Employee> opt = Optional.of(new Employee("张三", 8888));
    //如果opt中员工对象不为空，就涨薪10%
    Optional<Employee> emp = opt.map(e ->
                                     {e.setSalary(e.getSalary()%1.1);return e;});
    System.out.println(emp);
}
```





```java
package com.yixihan.day1030.optionaltest;

import java.util.Objects;

/**
 * @author : yixihan
 * @create : 2021-10-30-14:57
 */
public class Boy {

    private Girl girl;

    public Boy() { }

    public Boy(Girl girl) {
        this.girl = girl;
    }

    public Girl getGirl() {
        return girl;
    }

    public void setGirl(Girl girl) {
        this.girl = girl;
    }

    @Override
    public String toString() {
        return "Boy{" +
                "girl=" + girl +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Boy)) {
            return false;
        }
        Boy boy = (Boy) o;
        return Objects.equals(getGirl(), boy.getGirl());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getGirl());
    }
}
```



```java
package com.yixihan.day1030.optionaltest;

import java.util.Objects;

/**
 * @author : yixihan
 * @create : 2021-10-30-14:57
 */
public class Girl {

    private String name;

    public Girl() { }

    public Girl(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Girl)) {
            return false;
        }
        Girl girl = (Girl) o;
        return Objects.equals(getName(), girl.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName());
    }

    @Override
    public String toString() {
        return "Girl{" +
                "name='" + name + '\'' +
                '}';
    }
}
```



```java
package com.yixihan.day1030.optionaltest;

import org.junit.Test;

import java.util.Optional;

/**
 * Optional 类 : 为了在程序中避免出现空指针异常而创建的
 *
 * 常用的方法 : ofNullable (T t)
 *             ofElse(T t)
 *
 *
 * @author : yixihan
 * @create : 2021-10-30-14:58
 */
public class OptionalTest {

    /**
     * 创建Optional类对象的方法 :
     *
     * - Optional.of(T t) : 创建一个 Optional 实例，t必须非空；
     * - Optional.empty() : 创建一个空的 Optional 实例
     * - Optional.ofNullable(T t)：t可以为null
     */
    @Test
    public void test1 () {

        Girl girl = new Girl();
        // java.lang.NullPointerException
//        girl = null;
        // of(T t) : 保证 t 是非空的
        Optional<Girl> optionalGirl = Optional.of(girl);
    }

    @Test
    public void test2 () {
        Girl girl = new Girl();
        girl = null;
        // ofNullable(T t) :  t 可以是非空的
        Optional<Girl> optionalGirl = Optional.ofNullable(girl);
        System.out.println(optionalGirl);

        // orElse(T t) : 如果当前的 Optional 内部封装的 t 是非空的, 则返回内部的 t,
        // 如果内部的 t 是空的, 则返回 orElse() 方法中的参数 t1
        Girl girl1 = optionalGirl.orElse(new Girl("小丽"));
        System.out.println(girl1);

    }


    /**
     * 优化之前的
     * @param boy
     * @return
     */
    public String getGirlName1 (Boy boy) {

        return boy.getGirl().getName();
    }

    /**
     * 优化之后的
     */
    public String getGirlName2 (Boy boy) {

        if (boy != null) {
            if (boy.getGirl() != null) {
                return boy.getGirl().getName();
            }
        }
        return null;
    }

    /**
     * 使用 Optional 再次优化
     */
    public String getGirlName3 (Boy boy) {
        Optional<Boy> optionalBoy = Optional.ofNullable(boy);

        // orElse(T t) : 如果当前的 Optional 内部封装的 t 是非空的, 则返回内部的 t,
        // 如果内部的 t 是空的, 则返回 orElse() 方法中的参数 t1
        Boy boy1 = optionalBoy.orElse(new Boy(new Girl("小美")));

        Girl girl = boy1.getGirl();
        Optional<Girl> girlOptional = Optional.ofNullable(girl);
        Girl girl1 = girlOptional.orElse(new Girl("小娜"));


        return girl1.getName();

    }


    @Test
    public void test3 () {
        Boy boy = new Boy();
        boy = null;

        String girlName = getGirlName1(boy);
        System.out.println(girlName);
    }

    @Test
    public void test4 () {
        Boy boy = new Boy();
        boy = null;

        String girlName = getGirlName2(boy);
        System.out.println(girlName);
    }

    @Test
    public void test5 () {
        Boy boy = new Boy();
        boy = null;

        String girlName = getGirlName3(boy);
        System.out.println(girlName);
    }

    @Test
    public void test6 () {
        Boy boy = new Boy();

        String girlName = getGirlName3(boy);
        System.out.println(girlName);
    }


    @Test
    public void test7 () {
        Boy boy = new Boy(new Girl("小燕"));

        String girlName = getGirlName3(boy);
        System.out.println(girlName);
    }
}
```



## Java9&Java10& Java11新特性



### Java 9 的新特性



#### JDK 9 的发布



- 经过4次跳票，历经曲折的Java 9 终于终于在2017年9月21日发布。
- 从Java 9 这个版本开始，Java 的计划发布周期是 6 个月，下一个 Java 的主版 本将于 2018 年 3 月发布，命名为 Java 18.3，紧接着再过六个月将发布 Java 18.9。
- 这意味着Java的更新从传统的以特性驱动的发布周期，转变为以时间驱动的 （6 个月为周期）发布模式，并逐步的将 Oracle JDK 原商业特性进行开源。
- 针对企业客户的需求，Oracle 将以三年为周期发布长期支持版本（long term support）。
- Java 9 提供了超过150项新功能特性，包括备受期待的模块化系统、可交互 的 REPL 工具：jshell，JDK 编译工具，Java 公共 API 和私有代码，以及安 全增强、扩展提升、性能管理改善等。可以说Java 9是一个庞大的系统工程， 完全做了一个整体改变。



#### Java 9 中有哪些不得不说的新特性？



- 模块化系统 
- jShell命令 
- 多版本兼容jar包 
- 接口的私有方法 
- 钻石操作符的使用升级 
- 语法改进：try语句 
- String存储结构变更 
- 便利的集合特性：of() 
- 增强的Stream API 
- 全新的HTTP客户端API 
- Deprecated的相关API 
- javadoc的HTML 5支持 
- Javascript引擎升级：Nashorn 
- java的动态编译器



- 官方提供的新特性列表：

  https://docs.oracle.com/javase/9/whatsnew/toc.htm#JSNEW-GUID-C23AFD78-C777-460B-8ACE-58BE5EA681F6

- 参考 Open JDK

  http://openjdk.java.net/projects/jdk9/

- 在线Oracle JDK 9 Documentation

  https://docs.oracle.com/javase/9/



#### JDK 和 JRE 目录结构的改变

![image-20211030151802724](/assets/imgs/JavaSE7.assets/image-20211030151802724.png)

![image-20211030151814137](/assets/imgs/JavaSE7.assets/image-20211030151814137.png)



#### 模块化系统: Jigsaw -> Modularity



- ==谈到 Java 9 大家往往第一个想到的就是 Jigsaw 项目==。众所周知，Java 已经 发展超过 20 年（95 年最初发布），Java 和相关生态在不断丰富的同时也越 来越暴露出一些问题：
  - ==Java 运行环境的膨胀和臃肿==。每次JVM启动的时候，至少会有30～60MB的内存 加载，主要原因是JVM需要加载rt.jar，不管其中的类是否被classloader加载，第 一步整个jar都会被JVM加载到内存当中去（而模块化可以根据模块的需要加载程 序运行需要的class）
  - ==当代码库越来越大，创建复杂，盘根错节的“意大利面条式代码”的几率呈指数级的增长==。不同版本的类库交叉依赖导致让人头疼的问题，这些都阻碍了 Java 开发和 运行效率的提升。
  - 很难真正地对代码进行封装, 而系统并没有对不同部分（也就是 JAR 文件）之间 的依赖关系有个明确的概念。==每一个公共类都可以被类路径之下任何其它的公共 类所访问到，这样就会导致无意中使用了并不想被公开访问的 API==。
- ==本质上讲==也就是说，用模块来管理各个package，通过声明某个package 暴露，==模块(module)的概念，其实就是package外再裹一层==，不声明默 认就是隐藏。因此，模块化使得代码组织上**更安全**，因为它可以**指定哪 些部分可以暴露，哪些部分隐藏**。
- 实现目标
  - 模块化的主要目的在于减少内存的开销 
  - 只须必要模块，而非全部jdk模块，可简化各种类库和大型应用的开 发和维护 
  - 改进 Java SE 平台，使其可以适应不同大小的计算设备 
  - 改进其安全性，可维护性，提高性能



模块将由通常的类和新的模块声明文件（module-info.java）组成。该文件是位于 java代码结构的顶层，该模块描述符明确地定义了我们的**模块需要什么依赖关系， 以及哪些模块被外部使用**。在exports子句中未提及的所有包默认情况下将封装在 模块中，不能在外部使用。



![image-20211030152055696](/assets/imgs/JavaSE7.assets/image-20211030152055696.png)



要想在java9demo模块中调用java9test模块下包中的结构，需要在java9test 的module-info.java中声明：

```java
/**
 * exports：控制着哪些包可以被其它模块访问到。所有不被导出的包默认 都被封装在模块里面。
 * @author songhongkang
 * @create 2019 下午 11:57
 */
module java9test {
    //package we export
    exports com.atguigui.bean;
}
```

对应在java 9demo 模块的src 下创建module-info.java文件：

```java
/**
 * requires：指明对其它模块的依赖。
 * @author songhongkang
 * @create 2019 下午 11:51
 */
module java9demo {
    requires java9test;
}
```



```java
package com.atguigu.bean;

/**
 * @author shkstart
 * @create 2019 上午 11:59
 */
public class Person {

    private String name;
    private int age;

    @Override
    public String toString() {
        return "Person{" +
            "name='" + name + '\'' +
            ", age=" + age +
            '}';
    }

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Person() {
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
}

```





```java
package com.atguigu.java;

import com.atguigu.bean.Person;

/**
 * @author shkstart
 * @create 2019 上午 11:59
 */
public class ModuleTest {

    public static void main(String[] args) {
        Person p = new Person("Tom",12);
        System.out.println(p);
    }

}

```





#### Java的REPL工具： jShell命令



> 产生背景

像Python 和 Scala 之类的语言早就有交互式编程环境 REPL (read - evaluate - print - loop)了，以交互式的方式对语句和表达式进行求值。开发者只需要输入一些代码， 就可以在编译前获得对程序的反馈。而之前的Java版本要想执行代码，必须创建文 件、声明类、提供测试方法方可实现。



> 设计理念

**即写即得、快速运行**



> 实现目标

- Java 9 中终于拥有了 REPL工具：jShell。让Java可以像脚本语言一样运行，从 控制台启动jShell，利用jShell在没有创建类的情况下直接声明变量，计算表达式， 执行语句。即开发时可以在命令行里直接运行Java的代码，而无需创建Java文 件，无需跟人解释”public static void main(String[] args)”这句废话。 
- jShell也可以从文件中加载语句或者将语句保存到文件中。 
- jShell也可以是tab键进行自动补全和自动添加分号。

![image-20211030152406834](/assets/imgs/JavaSE7.assets/image-20211030152406834.png)

![image-20211030152416905](/assets/imgs/JavaSE7.assets/image-20211030152416905.png)

![image-20211030152422989](/assets/imgs/JavaSE7.assets/image-20211030152422989.png)

![image-20211030152429707](/assets/imgs/JavaSE7.assets/image-20211030152429707.png)

![image-20211030152436620](/assets/imgs/JavaSE7.assets/image-20211030152436620.png)



#### 语法改进：接口的私有方法



Java 8中规定接口中的方法除了抽象方法之外，还可以定义静态方法 和默认的方法。一定程度上，扩展了接口的功能，此时的接口更像是 一个抽象类。



在Java 9中，接口更加的灵活和强大，==连方法的访问权限修饰符都可 以声明为private的了==，此时方法将不会成为你对外暴露的API的一部分。



```java
interface MyInterface {
    void normalInterfaceMethod();
    default void methodDefault1() {
        init();
    }
    public default void methodDefault2() {
        init();
    }
    // This method is not part of the public API exposed by MyInterface
    private void init() {
        System.out.println("默认方法中的通用操作");
    }
}
class MyInterfaceImpl implements MyInterface {
    @Override
    public void normalInterfaceMethod() {
        System.out.println("实现接口的方法");
    }
}
public class MyInterfaceTest {
    public static void main(String[] args) {
        MyInterfaceImpl impl = new MyInterfaceImpl();
        impl.methodDefault1();
        // impl.init();//不能调用
    }
}

```







```java
package com.atguigu.java;

/**
 * @author shkstart
 * @create 2019 下午 2:25
 */
public interface MyInterface {
    //如下的三个方法的权限修饰符都是public
    void methodAbstract();

    static void methodStatic(){
        System.out.println("我是接口中的静态方法");
    }

    default void methodDefault(){
        System.out.println("我是接口中的默认方法");

        methodPrivate();
    }
    //jdk 9中允许接口中定义私有的方法
    private void methodPrivate(){
        System.out.println("我是接口中的私有方法");
    }
}

```



```java
package com.atguigu.java;

/**
 * @author shkstart
 * @create 2019 下午 2:29
 */
public class MyInterfaceImpl implements MyInterface {


    @Override
    public void methodAbstract() {

    }

    //    @Override
    public void methodDefault() {
        System.out.println("实现类重写了接口中的默认方法");
    }

    public static void main(String[] args) {
        //接口中的静态方法只能由接口自己调用
        MyInterface.methodStatic();
        //接口的实现类不能调用接口的静态方法
        //        MyInterfaceImpl.methodStatic();

        MyInterfaceImpl impl = new MyInterfaceImpl();
        impl.methodDefault();
        //接口的私有方法，不能在接口外部调用
        //        impl.methodPrivate();
    }
}

```





#### 语法改进:钻石操作符使用升级



我们将能够**与匿名实现类共同使用钻石操作符（diamond operator）**在Java 8 中如下的操作是会报错的：



```java
// 编译报错信息：Cannot use “<>” with anonymous inner classes.
Comparator<Object> com = new Comparator<>(){
    @Override
    public int compare(Object o1, Object o2) {
        return 0;
    }
};
```



```java
// anonymous classes can now use type inference
// Java 9中如下操作可以正常执行通过：
Comparator<Object> com = new Comparator<>(){
    @Override
    public int compare(Object o1, Object o2) {
        return 0;
    }
};
```



#### 语法改进：try语句



Java 8 中，可以实现资源的**自动关闭**，但是**要求执行后必须关闭的所有资源必 须在try子句中初始化**，否则编译不通过。如下例所示：



```java
try(InputStreamReader reader = new InputStreamReader(System.in)){
    //读取数据细节省略
}catch (IOException e){
    e.printStackTrace();
}
```



```java
InputStreamReader reader = new InputStreamReader(System.in);
OutputStreamWriter writer = new OutputStreamWriter(System.out);
try (reader; writer) {
    //reader是final的，不可再被赋值
    //reader = null;
    //具体读写操作省略
} catch (IOException e) {
    e.printStackTrace();
}
```



```java
package com.atguigu.java;

import org.junit.Test;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Comparator;

/**
 * @author shkstart
 * @create 2019 下午 2:20
 */
public class Java9Test {

    //
    @Test
    public void test1() {
        try {
            URL url = new URL("http://www.atguigu.com");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }

    //java9特性五：钻石操作符的升级
    @Test
    public void test2() {
        //钻石操作符与匿名内部类在java 8中不能共存。在java9可以。
        Comparator<Object> com = new Comparator<>() {
            @Override
            public int compare(Object o1, Object o2) {
                return 0;
            }
        };

        //jdk7中的新特性：类型推断
        ArrayList<String> list = new ArrayList<>();

    }

    //java9 特性六：try操作的升级
    public static void main(String[] args) {
        //java 8之前的资源关闭的操作
        //        InputStreamReader reader = null;
        //        try {
        //            reader = new InputStreamReader(System.in);
        //            char[] cbuf = new char[20];
        //            int len;
        //            if((len = reader.read(cbuf) )!= -1){
        //                String str = new String(cbuf,0,len);
        //                System.out.println(str);
        //            }
        //        } catch (IOException e) {
        //            e.printStackTrace();
        //        } finally {
        //            if(reader != null){
        //                try {
        //                    reader.close();
        //                } catch (IOException e) {
        //                    e.printStackTrace();
        //                }
        //
        //            }
        //        }

        //java 8中资源关闭操作: Java 8 中，可以实现资源的自动关闭
        //要求自动关闭的资源的实例化必须放在try的一对小括号中
        //        try(InputStreamReader reader = new InputStreamReader(System.in)){
        //            char[] cbuf = new char[20];
        //            int len;
        //            if((len = reader.read(cbuf) )!= -1){
        //                String str = new String(cbuf,0,len);
        //                System.out.println(str);
        //            }
        //        } catch (IOException e) {
        //            e.printStackTrace();
        //        }

        //java9中资源关闭操作：需要自动关闭的资源的实例化可以放在try的一对小括号外。
        //此时的资源属性是常量，声明为final的，不可修改
        InputStreamReader reader = new InputStreamReader(System.in);
        try (reader) {

            char[] cbuf = new char[20];
            int len;
            if((len = reader.read(cbuf) )!= -1){
                String str = new String(cbuf,0,len);
                System.out.println(str);
            }

            //            reader = null;
        } catch (IOException e) {
            e.printStackTrace();
        }


    }
}
```





#### String存储结构变更

![image-20211030152814247](/assets/imgs/JavaSE7.assets/image-20211030152814247.png)

![image-20211030152821246](/assets/imgs/JavaSE7.assets/image-20211030152821246.png)



#### 集合工厂方法：快速创建只读集合



要创建一个只读、不可改变的集合，必须构造和分配它，然后添加元素，最后 包装成一个不可修改的集合

```java
// 缺点：我们一下写了五行。即：它不能表达为单个表达式。
List<String> namesList = new ArrayList <>();
namesList.add("Joe");
namesList.add("Bob");
namesList.add("Bill");
namesList = Collections.unmodifiableList(namesList);
System.out.println(namesList);
```



```java
List<String> list = Collections.unmodifiableList(Arrays.asList("a", "b", "c"));
Set<String> set = Collections.unmodifiableSet(new HashSet<>(Arrays.asList("a",
                                                                          "b", "c")));
// 如下操作不适用于jdk 8 及之前版本,适用于jdk 9
Map<String, Integer> map = Collections.unmodifiableMap(new HashMap<>() {
    {
        put("a", 1);
        put("b", 2);
        put("c", 3);
    }
});
map.forEach((k, v) -> System.out.println(k + ":" + v));

```

![image-20211030152915788](/assets/imgs/JavaSE7.assets/image-20211030152915788.png)



List firsnamesList = List.of(“Joe”,”Bob”,”Bill”); 调用集合中静态方法of()，可以将不同数量的参数传输到此工厂方法中。此功能 可用于Set和List，也可用于Map的类似形式。此时得到的集合，是不可变的：在 创建后，继续添加元素到这些集合会导致 “UnsupportedOperationException” 。 由于Java 8中接口方法的实现，可以直接在List，Set和Map的接口内定义这些方法， 便于调用。



```java
List<String> list = List.of("a", "b", "c");
Set<String> set = Set.of("a", "b", "c");
Map<String, Integer> map1 = Map.of("Tom", 12, "Jerry", 21, "Lilei", 33,
                                   "HanMeimei", 18);
Map<String, Integer> map2 = Map.ofEntries(Map.entry("Tom", 89),
                                          Map.entry("Jim", 78), Map.entry("Tim", 98));

```





#### InputStream 加强



InputStream 终于有了一个非常有用的方法：==transferTo==，可以用来将数据直接 传输到 OutputStream，这是在处理原始数据流时非常常见的一种用法，如下 示例。



```java
ClassLoader cl = this.getClass().getClassLoader();
try (InputStream is = cl.getResourceAsStream("hello.txt");
     OutputStream os = new FileOutputStream("src\\hello1.txt")) {
    is.transferTo(os); // 把输入流中的所有数据直接自动地复制到输出流中
} catch (IOException e) {
    e.printStackTrace();
}
```



```java
package com.atguigu.java;

import org.junit.Test;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.*;

/**
 * @author shkstart
 * @create 2019 下午 3:12
 */
public class Java9Test1 {


    //java8中的写法：
    @Test
    public void test1() {
        List<String> namesList = new ArrayList<>();
        namesList.add("Joe");
        namesList.add("Bob");
        namesList.add("Bill");
        //返回的namesList是一个只读的集合
        namesList = Collections.unmodifiableList(namesList);
        namesList.add("Tom");

        System.out.println(namesList);

    }

    @Test
    public void test2() {
        List<String> list = Collections.unmodifiableList(Arrays.asList("a", "b", "c"));
        Set<String> set = Collections.unmodifiableSet(new HashSet<>(Arrays.asList("a", "b", "c")));
        // 如下操作不适用于jdk 8 及之前版本,适用于jdk 9
        Map<String, Integer> map = Collections.unmodifiableMap(new HashMap<>() {
            {
                put("a", 1);
                put("b", 2);
                put("c", 3);
            }
        });
        map.forEach((k, v) -> System.out.println(k + ":" + v));

    }

    @Test
    public void test3() {
        //此时得到的集合list也是一个只读集合。
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
        //报异常
        list.add(6);

    }

    //java9新特性八：集合工厂方法：创建只读集合
    @Test
    public void test4() {
        List<Integer> list1 = List.of(1, 2, 3, 4, 5);
        //不能添加
        //        list1.add(6);
        System.out.println(list1);

        Set<Integer> set1 = Set.of(23, 3, 54, 65, 43, 76, 87, 34, 46);
        //不能添加
        //        set1.add(4);
        System.out.println(set1);

        Map<String, Integer> map1 = Map.of("Tom", 23, "Jerry", 54, "HanMeimei", 12);
        //不能添加
        //map1.put("Lilei",34);

        System.out.println(map1);

        Map<String, Integer> map2 = Map.ofEntries(Map.entry("Tom", 34), Map.entry("Jerry", 21));
        //        map2.put("Lilei",34);
        System.out.println(map2);


    }

    //java9新特性九：InputStream的新方法:tranferTo()
    @Test
    public void test5() {
        ClassLoader cl = this.getClass().getClassLoader();
        try (InputStream is = cl.getResourceAsStream("hello.txt");
             OutputStream os = new FileOutputStream("src\\hello1.txt")) {
            is.transferTo(os); // 把输入流中的所有数据直接自动地复制到输出流中
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}

```





#### 增强的 Stream API



- Java 的 Steam API 是java标准库最好的改进之一，让开发者能够快速运算， 从而能够有效的利用数据并行计算。Java 8 提供的 Steam 能够利用多核架构 实现声明式的数据处理。
- 在 Java 9 中，Stream API 变得更好，Stream 接口中添加了 4 个新的方法： takeWhile, dropWhile, ofNullable，还有个 iterate 方法的新重载方法，可以 让你提供一个 Predicate (判断条件)来指定什么时候结束迭代。
- 除了对 Stream 本身的扩展，Optional 和 Stream 之间的结合也得到了改进。 现在可以通过 Optional 的新方法 stream() 将一个 Optional 对象转换为一个 (可能是空的) Stream 对象。



> takeWhile()的使用

用于从 Stream 中获取一部分数据，接收一个 Predicate 来进行选择。在有序的 Stream 中，==takeWhile 返回从开头开始的尽量多的元素==。



```java
List<Integer> list = Arrays.asList(45, 43, 76, 87, 42, 77, 90, 73, 67, 88);
list.stream().takeWhile(x -> x < 50).forEach(System.out::println);
System.out.println();
list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8);
list.stream().takeWhile(x -> x < 5).forEach(System.out::println);
```



> dropWhile()的使用

dropWhile 的行为与 takeWhile 相反，==返回剩余的元素==。

```java
List<Integer> list = Arrays.asList(45, 43, 76, 87, 42, 77, 90, 73, 67, 88);
list.stream().dropWhile(x -> x < 50).forEach(System.out::println);
System.out.println();
list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8);
list.stream().dropWhile(x -> x < 5).forEach(System.out::println);
```



> ofNullable()的使用

==Java 8 中 Stream 不能完全为nul==l，否则会报空指针异常。而==Java 9 中的 ofNullable 方 法允许我们创建一个单元素 Stream==，可以包含一个非空元素，也可以创建一个空 Stream。



```java
// 报NullPointerException
// Stream<Object> stream1 = Stream.of(null);
// System.out.println(stream1.count());
// 不报异常，允许通过
Stream<String> stringStream = Stream.of("AA", "BB", null);
System.out.println(stringStream.count());// 3
// 不报异常，允许通过
List<String> list = new ArrayList<>();
list.add("AA");
list.add(null);
System.out.println(list.stream().count());// 2
// ofNullable()：允许值为null
Stream<Object> stream1 = Stream.ofNullable(null);
System.out.println(stream1.count());// 0
Stream<String> stream = Stream.ofNullable("hello world");
System.out.println(stream.count());// 1

```



> iterate()重载的使用

这个 iterate 方法的新重载方法，可以让你提供一个 Predicate (判断条件)来指定什 么时候结束迭代。



```java
// 原来的控制终止方式：
Stream.iterate(1, i -> i + 1).limit(10).forEach(System.out::println);
// 现在的终止方式：
Stream.iterate(1, i -> i < 100, i -> i + 1).forEach(System.out::println);
```



#### Optional获取Stream的方法



> Optional类中stream()的使用

```java
List<String> list = new ArrayList<>();
list.add("Tom");
list.add("Jerry");
list.add("Tim");
Optional<List<String>> optional = Optional.ofNullable(list);
Stream<List<String>> stream = optional.stream();
stream.flatMap(x -> x.stream()).forEach(System.out::println);
```



##### Optional 的增强

```java
package com.atguigu.java;

import org.junit.Test;

import java.util.Optional;

/**
 * @author shkstart
 * @create 2019 上午 11:01
 */
public class OptionalTest {

    @Test
    public void test1(){
        //empty():创建的Optional对象内部的value = null
        Optional<Object> op1 = Optional.empty();
        if(!op1.isPresent()){//Optional封装的数据是否包含数据
            System.out.println("数据为空");

        }
        System.out.println(op1);
        System.out.println(op1.isPresent());
        //如果Optional封装的数据value为空，则get()报错。否则，value不为空时，返回value.
        //        System.out.println(op1.get());

    }

    @Test
    public void test2(){
        String str = "hello";
        //        str = null;
        //of(T t):封装数据t生成Optional对象。要求t非空，否则报错。
        Optional<String> op1 = Optional.of(str);
        //get()通常与of()方法搭配使用。用于获取内部的封装的数据value
        String str1 = op1.get();
        System.out.println(str1);

    }

    @Test
    public void test3(){
        String str = "beijing";
        str = null;
        //ofNullable(T t) ：封装数据t赋给Optional内部的value。不要求t非空
        Optional<String> op1 = Optional.ofNullable(str);
        //orElse(T t1):如果Optional内部的value非空，则返回此value值。如果
        //value为空，则返回t1.
        String str2 = op1.orElse("shanghai");

        System.out.println(str2);//


    }

}

```





#### Javascript引擎升级：Nashorn



- Nashorn 项目在 JDK 9 中得到改进，它为 Java 提供轻量级的 Javascript 运行时。 Nashorn 项目跟随 Netscape 的 Rhino 项目，目的是为了在 Java 中实现一个高 性能但轻量级的 Javascript 运行时。Nashorn 项目使得 Java 应用能够嵌入 Javascript。它在 JDK 8 中为 Java 提供一个 Javascript 引擎。
- JDK 9 包含一个用来解析 Nashorn 的 ECMAScript 语法树的 API。这个 API 使得 IDE 和服务端框架不需要依赖 Nashorn 项目的内部实现类，就能够分析 ECMAScript 代码

![image-20211030153300296](/assets/imgs/JavaSE7.assets/image-20211030153300296.png)



```java
package com.atguigu.java;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

/**
 * @author shkstart
 * @create 2019 下午 3:32
 */
public class Java9Test2 {

    //java9新特性十：Stream API的加强
    @Test
    public void test1(){
        List<Integer> list = Arrays.asList(23, 43, 45, 55, 61, 54, 32, 2, 45, 89, 7);
        //takeWhile 返回从开头开始的按照指定规则尽量多的元素
        //        list.stream().takeWhile(x -> x < 60).forEach(System.out::println);
        //dropWhile():与 takeWhile 相反，返回剩余的元素。
        list.stream().dropWhile(x -> x < 60).forEach(System.out::println);
    }

    @Test
    public void test2(){
        //of()参数中的多个元素，可以包含null值
        Stream<Integer> stream1 = Stream.of(1, 2, 3,null);
        stream1.forEach(System.out::println);
        //of()参数不能存储单个null值。否则，报异常
        //        Stream<Object> stream2 = Stream.of(null);
        //        stream2.forEach(System.out::println);
        Integer i = 10;
        i = null;
        //ofNullable()：形参变量是可以为null值的单个元素
        Stream<Integer> stream3 = Stream.ofNullable(i);
        long count = stream3.count();
        System.out.println(count);
    }

    @Test
    public void test3(){

        Stream.iterate(0,x -> x + 1).limit(10).forEach(System.out::println);


        //java9中新增的重载的方法
        Stream.iterate(0,x -> x < 100,x -> x + 1).forEach(System.out::println);
    }

    //java9新特性十一：Optional提供了新的方法stream()
    @Test
    public void test4(){
        List<String> list = new ArrayList<>();
        list.add("Tom");
        list.add("Jerry");
        list.add("Tim");

        Optional<List<String>> optional = Optional.ofNullable(list);
        Stream<List<String>> stream = optional.stream();
        //        long count = stream.count();
        //        System.out.println(count);
        stream.flatMap(x -> x.stream()).forEach(System.out::println);

    }

}

```





### Java 10 新特性



- 2018年3月21日，Oracle官方宣布Java10正式发布。
- 需要注意的是 Java 9 和 Java 10 都不是 LTS (Long-Term-Support) 版本。和 过去的 Java 大版本升级不同，这两个只有半年左右的开发和维护期。而未 来的 Java 11，也就是 18.9 LTS，才是 Java 8 之后第一个 LTS 版本。
- JDK10一共定义了109个新特性，其中包含12个JEP（对于程序员来讲，真 正的新特性其实就一个），还有一些新API和JVM规范以及JAVA语言规范上 的改动。
- JDK10的12个JEP（JDK Enhancement Proposal特性加强提议）参阅官方 文档：http://openjdk.java.net/projects/jdk/10/

![image-20211030155102537](/assets/imgs/JavaSE7.assets/image-20211030155102537.png)



#### 局部变量类型推断



> 产生背景

开发者经常抱怨Java中引用代码的程度。局部变量的显示类型声明，常常被认为 是不必须的，给一个好听的名字经常可以很清楚的表达出下面应该怎样继续。



> 好处

==减少了啰嗦和形式的代码，避免了信息冗余，而且对齐了变量名，更容易阅读！==



> 举例如下：

场景一：类实例化时 

作为 Java开发者，在声明一个变量时，我们总是习惯了敲打两次变量类型，第 一次用于声明变量类型，第二次用于构造器。

```java
LinkedHashSet<Integer> set = new LinkedHashSet<>();
```



场景二：返回值类型含复杂泛型结构 

变量的声明类型书写复杂且较长，尤其是加上泛型的使用 

```java
Iterator<Map.Entry<Integer, Student>> iterator = set.iterator();
```



场景三：

我们也经常声明一种变量，它只会被使用一次，而且是用在下一行代码中， 比如：

```java
URL url = new URL("http://www.atguigu.com");
URLConnection connection = url.openConnection();
Reader reader = new BufferedReader(new
InputStreamReader(connection.getInputStream()));
```



尽管 IDE可以帮我们自动完成这些代码，但当变量总是跳来跳去的时候，可读 性还是会受到影响，因为变量类型的名称由各种不同长度的字符组成。而且， 有时候开发人员会尽力避免声明中间变量，因为==太多的类型声明只会分散注意 力，不会带来额外的好处==。



> 适用于以下情况：

```java
//1.局部变量的初始化
var list = new ArrayList<>();
//2.增强for循环中的索引
for(var v : list) {
    System.out.println(v);
}
//3.传统for循环中
for(var i = 0;i < 100;i++) {
    System.out.println(i);
}

```



> 在局部变量中使用时，如下情况不适用：

![image-20211030155332466](/assets/imgs/JavaSE7.assets/image-20211030155332466.png)



> 不适用以下的结构中：

![image-20211030155345145](/assets/imgs/JavaSE7.assets/image-20211030155345145.png)





> 工作原理

在处理 var时，编译器先是查看表达式右边部分，并根据右边变量值的类型进行 推断，作为左边变量的类型，然后将该类型写入字节码当中。



 >注 意

- var不是一个关键字

  你不需要担心变量名或方法名会与 var发生冲突，因为 var实际上并不是一个关键字， 而是一个类型名，只有在编译器需要知道类型的地方才需要用到它。除此之外，它 就是一个普通合法的标识符。也就是说，除了不能用它作为类名，其他的都可以， 但极少人会用它作为类名。

  

- 这不是JavaScript

  首先我要说明的是，var并不会改变Java是一门静态类型语言的事实。编译器负责推 断出类型，并把结果写入字节码文件，就好像是开发人员自己敲入类型一样。 下面是使用 IntelliJ（实际上是 Fernflower的反编译器）反编译器反编译出的代码：



```java
var url = new URL("http://www.atguigu.com");
var connection = url.openConnection();
var reader = new BufferedReader(
new InputStreamReader(connection.getInputStream()));
```

反编译后

```java
URL url = new URL("http://www.atguigu.com");
URLConnection connection = url.openConnection();
BufferedReader reader = new BufferedReader(
new InputStreamReader(connection.getInputStream()));
```



从代码来看，就好像之前已经声明了这些类型一样。事实上，这一特性只发 生在编译阶段，与运行时无关，所以对运行时的性能不会产生任何影响。所 以请放心，这不是 JavaScript。



#### 集合新增创建不可变集合的方法



自 Java 9 开始，Jdk 里面为集合（List / Set / Map）都添加了 of (jdk9新增)和 copyOf (jdk10新增)方法，它们两个都用来创建不可变的集合，来看下它们的 使用和区别。

```java
//示例1：
var list1 = List.of("Java", "Python", "C");
var copy1 = List.copyOf(list1);
System.out.println(list1 == copy1); // true
//示例2：
var list2 = new ArrayList<String>();
var copy2 = List.copyOf(list2);
System.out.println(list2 == copy2); // false
//示例1和2代码基本一致，为什么一个为true,一个为false?
```



从 源 码 分 析 ， 可 以 看 出 copyOf 方 法 会 先 判 断 来 源 集 合 是 不 是 AbstractImmutableList 类型的，如果是，就直接返回，如果不是，则调用 of 创 建一个新的集合。 

示例2因为用的 new 创建的集合，不属于不可变 AbstractImmutableList 类的子类， 所以 copyOf 方法又创建了一个新的实例，所以为false。 

注意：使用of和copyOf创建的集合为不可变集合，不能进行添加、删除、替换、 排序等操作，不然会报 java.lang.UnsupportedOperationException 异常。 

上面演示了 List 的 of 和 copyOf 方法，Set 和 Map 接口都有。



```java
package com.atguigu.java1;

import org.junit.Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

/**
 * @author shkstart
 * @create 2019 下午 4:24
 */
public class Java10Test {

    /*
    java10新特性一：局部变量的类型推断

     */
    @Test
    public void test1() {
        //1.声明变量时，根据所附的值，推断变量的类型
        var num = 10;

        var list = new ArrayList<Integer>();
        list.add(123);

        //2.遍历操作
        for (var i : list) {
            System.out.println(i);
            System.out.println(i.getClass());
        }

        //3.普通的遍历操作
        for (var i = 0; i < 100; i++) {
            System.out.println(i);
        }

    }

    @Test
    public void test2() {
        //1.局部变量不赋值，就不能实现类型推断
        //        var num ;

        //2.lambda表示式中，左边的函数式接口不能声明为var
        //        Supplier<Double> sup = () -> Math.random();

        //        var sup = () -> Math.random();

        //3.方法引用中，左边的函数式接口不能声明为var
        //        Consumer<String> con = System.out::println;

        //        var con = System.out::println;

        //4.数组的静态初始化中，注意如下的情况也不可以
        int[] arr = {1, 2, 3, 4};
        //        var arr = {1,2,3,4};
    }

    @Test
    public void test3() {
        //        情况1：没有初始化的局部变量声明
        //        var s = null;


        //        情况6：catch块
        //        try{
        //
        //        }catch(var e){
        //            e.printStackTrace();
        //        }


    }
    //情况2：方法的返回类型
    //    public var method1(){
    //
    ////        return 0;
    //    }
    // 情况3：方法的参数类型
    //    public void method2(var num){
    //
    //    }

    //情况4：构造器的参数类型
    //    public Java10Test(var i){
    //
    //    }

    //情况5：属性
    //    var num;


    @Test
    public void test4() {
        try {
            var url = new URL("http://www.atguigu.com");
            var connection = url.openConnection();
            var reader = new BufferedReader(
                new InputStreamReader(connection.getInputStream()));
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
    //java10的新特性二：集合中新增的copyOf()，用于创建一个只读的集合
    @Test
    public void test5(){
        //示例1：
        var list1 = List.of("Java", "Python", "C");
        var copy1 = List.copyOf(list1);
        System.out.println(list1 == copy1); // true

        //示例2：
        var list2 = new ArrayList<String>();
        list2.add("aaa");
        var copy2 = List.copyOf(list2);
        System.out.println(list2 == copy2); // false

        //示例1和2代码基本一致，为什么一个为true,一个为false?
        //结论：copyOf(Xxx coll):如果参数coll本身就是一个只读集合，则copyOf()返回值即为当前的coll
        //如果参数coll不是一个只读集合，则copyOf()返回一个新的集合，这个集合是只读的。

    }
}

```





### Java 11 新特性



北京时间 2018年9 月 26 日， Oracle 官方宣布 Java 11 正式发 布。这是 Java 大版本周期变化 后的第一个长期支持版本，非 常值得关注。从官网即可下载, 最新发布的 Java11 将带来 ZGC、 Http Client 等重要特性，一共包 含 17 个 JEP（JDK Enhancement Proposals，JDK 增强提案）。其 实，总共更新不止17个，只是 我们更关注如下的17个JEP更新。

![image-20211030155605979](/assets/imgs/JavaSE7.assets/image-20211030155605979.png)



JDK 11 将是一个 企业不可忽视的版本。从时间节点来看，JDK 11 的发布正 好处在 JDK 8 免费更新到期的前夕，同时 JDK 9、10 也陆续成为“历史版 本” ，下面是 Oracle JDK 支持路线图：

![image-20211030155619220](/assets/imgs/JavaSE7.assets/image-20211030155619220.png)



#### JDK 11 是一个长期支持版本（LTS, Long-Term-Support）



- 对于企业来说，选择 11 将意味着长期的、可靠的、可预测的技术路线图。 其中免费的OpenJDK11 确定将得到 OpenJDK 社区的长期支持， LTS 版本将 是可以放心选择的版本。
- 从 JVM GC 的角度，JDK11 引入了两种新的 GC，其中包括也许是划时代意义 的 ZGC，虽然其目前还是实验特性，但是从能力上来看，这是 JDK 的一个巨 大突破，为特定生产环境的苛刻需求提供了一个可能的选择。例如，对部 分企业核心存储等产品，如果能够保证不超过 10ms 的 GC 暂停，可靠性会 上一个大的台阶，这是过去我们进行 GC 调优几乎做不到的，是能与不能的 问题。

按照官方的说法，新的发布周 期会严格遵循时间点，将于每 年的3月份和9月份发布。所 以 Java 11 的版本号是 18.9(LTS)。 

不过与 Java 9 和 Java 10 这 两个被称为“功能性的版本” 不同（两者均只提供半年的技 术支持），Java 11 不仅提供 了长期支持服务，还将作为 Java 平台的参考实现。 Oracle 直到2023年9月都会为 Java 11 提供技术支持，而补 丁和安全警告等扩展支持将持 续到2026年。

![image-20211030155709586](/assets/imgs/JavaSE7.assets/image-20211030155709586.png)





#### 官网公开的 17 个 JEP（JDK Enhancement Proposal 特性增强提议）

```java
181: Nest-Based Access Control（基于嵌套的访问控制）
309: Dynamic Class-File Constants（动态的类文件常量）
315: Improve Aarch64 Intrinsics（改进 Aarch64 Intrinsics）
318: Epsilon: A No-Op Garbage Collector（Epsilon 垃圾回收器，又被称为"No-Op（无操作）"回收器）
320: Remove the Java EE and CORBA Modules（移除 Java EE 和 CORBA 模块，JavaFX也已被移除）
321: HTTP Client (Standard)
323: Local-Variable Syntax for Lambda Parameters（用于 Lambda 参数的局部变量语法）
324: Key Agreement with Curve25519 and Curve448（采用 Curve25519 和 Curve448 算法实现的密钥协议）
327: Unicode 10
328: Flight Recorder（飞行记录仪）
329: ChaCha20 and Poly1305 Cryptographic Algorithms（实现 ChaCha20 和 Poly1305 加密算法）
330: Launch Single-File Source-Code Programs（启动单个 Java 源代码文件的程序）
331: Low-Overhead Heap Profiling（低开销的堆分配采样方法）
332: Transport Layer Security (TLS) 1.3（对 TLS 1.3 的支持）
333: ZGC: A Scalable Low-Latency Garbage Collector (Experimental)（ZGC：可伸缩的低延迟垃圾回收器，处于实验性阶段）
335: Deprecate the Nashorn JavaScript Engine（弃用 Nashorn JavaScript 引擎）
336: Deprecate the Pack200 Tools and API（弃用 Pack200 工具及其 API）    
```



#### 新增了一系列字符串处理方法

![image-20211030155825071](/assets/imgs/JavaSE7.assets/image-20211030155825071.png)



#### Optional 加强



Optional 也增加了几个非常酷的方法，现在可以很方便的将一个 Optional 转换 成一个 Stream, 或者当一个空 Optional 时给它一个替代的。



![image-20211030155842676](/assets/imgs/JavaSE7.assets/image-20211030155842676.png)



#### 局部变量类型推断升级



在var上添加注解的语法格式，在jdk10中是不能实现的。在JDK11中加入了这样 的语法。



```java
//错误的形式: 必须要有类型, 可以加上var
//Consumer<String> con1 = (@Deprecated t) ->
System.out.println(t.toUpperCase());
//正确的形式:
//使用var的好处是在使用lambda表达式时给参数加上注解。
Consumer<String> con2 = (@Deprecated var t) ->
System.out.println(t.toUpperCase());
```



#### 全新的HTTP 客户端API



- HTTP，用于传输网页的协议，早在1997年就被采用在目前的1.1版本中。直 到2015年，HTTP2才成为标准。

  ![image-20211030155920930](/assets/imgs/JavaSE7.assets/image-20211030155920930.png)

- HTTP/1.1和HTTP/2的主要区别是如何在客户端和服务器之间构建和传输数据。 HTTP/1.1依赖于请求/响应周期。 HTTP/2允许服务器“push”数据：它可以发 送比客户端请求更多的数据。这使得它可以优先处理并发送对于首先加载 网页至关重要的数据。

- 这是 Java 9 开始引入的一个处理 HTTP 请求的的 HTTP Client API，该 API 支持同步和异步，而在 Java 11 中已经为正式可用状态，你可以在 java.net 包中找到这个 API。

- 它 将 替 代 仅 适 用 于 blocking 模式的 HttpURLConnection （HttpURLConnection是在HTTP 1.0的时代创建的，并使用了协议无关的 方法），并提供对WebSocket 和 HTTP/2的支持。



```java
HttpClient client = HttpClient.newHttpClient();
HttpRequest request =
HttpRequest.newBuilder(URI.create("http://127.0.0.1:8080/test/")).build();
BodyHandler<String> responseBodyHandler = BodyHandlers.ofString();
HttpResponse<String> response = client.send(request, responseBodyHandler);
String body = response.body();
System.out.println(body);

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder(URI.create("http://127.0.0.1:8080/test/")).build();
BodyHandler<String> responseBodyHandler = BodyHandlers.ofString();
CompletableFuture<HttpResponse<String>> sendAsync =
client.sendAsync(request, responseBodyHandler);
sendAsync.thenApply(t -> t.body()).thenAccept(System.out::println);
//HttpResponse<String> response = sendAsync.get();
//String body = response.body();
//System.out.println(body);

```



#### 更简化的编译运行程序



看下面的代码。

```java
// 编译 
javac Javastack.java 
// 运行 
java Javastack
```

 

在我们的认知里面，要运行一个 Java 源代码必须先编译，再运行，两步执行动作。 而在未来的 Java 11 版本中，通过一个 java 命令就直接搞定了，如以下所示： java Javastack.java



**一个命令编译运行源代码的注意点：** 

- 执行源文件中的第一个类, 第一个类必须包含主方法。 
- 并且不可以使用其它源文件中的自定义类, 本文件中的自定义类是可以使用的。



#### 废弃Nashorn引擎



废除Nashorn javascript引擎，在后续版本准备移除掉，有需要的 可以考虑使用GraalVM。



#### ZGC



- GC是java主要优势之一。 然而, 当GC停顿太长, 就会开始影响应用的响应时 间。消除或者减少GC停顿时长, java将对更广泛的应用场景是一个更有吸引力 的平台。此外, 现代系统中可用内存不断增长,用户和程序员希望JVM能够以高 效的方式充分利用这些内存, 并且无需长时间的GC暂停时间。
- ZGC, A Scalable Low-Latency Garbage Collector(Experimental) ZGC, 这应该是JDK11最为瞩目的特性, 没有之一。 但是后面带了Experimental, 说明这还不建议用到生产环境。
- ZGC是一个并发, 基于region, 压缩型的垃圾收集器, 只有root扫描阶段会 STW(stop the world), 因此GC停顿时间不会随着堆的增长和存活对象的增长 而变长。
- 优势： 
  - GC暂停时间不会超过10ms 
  - 既能处理几百兆的小堆, 也能处理几个T的大堆(OMG) 
  - 和G1相比, 应用吞吐能力不会下降超过15% 
  - 为未来的GC功能和利用colord指针以及Load barriers优化奠定基础 
  - 初始只支持64位系统
- ZGC的设计目标是：支持TB级内存容量，暂停时间低（<10ms），对整个 程序吞吐量的影响小于15%。 将来还可以扩展实现机制，以支持不少令人 兴奋的功能，例如多层堆（即热对象置于DRAM和冷对象置于NVMe闪存）， 或压缩堆。



#### 其它新特性



- Unicode 10 
- Deprecate the Pack200 Tools and API 
- 新的Epsilon垃圾收集器 
- 完全支持Linux容器（包括Docker） 
- 支持G1上的并行完全垃圾收集 
- 最新的HTTPS安全协议TLS 1.3 
- Java Flight Recorder



```java
package com.atguigu.java2;

import org.junit.Test;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.function.Consumer;

/**
 * @author shkstart
 * @create 2019 下午 5:09
 */
public class Java11Test {

    //java 11新特性一：String中新增的方法
    @Test
    public void test1(){
        //        isBlank():判断字符串是否为空白
        System.out.println("  \t  \t  \n  ".isBlank());
        //        strip():去除首尾空白
        System.out.println("-----" + "  \t abc \t  \n  ".strip() + "-------");
        System.out.println("-----" + "  \t abc \t  \n  ".trim() + "-------");
        //        stripTrailing():去除尾部空格
        System.out.println("-----" + "  \t abc \t  \n  ".stripTrailing() + "-------");
        //        stripLeading():去除首部空格
        System.out.println("-----" + "  \t abc \t  \n  ".stripLeading() + "-------");
        //        repeat(int count):复制字符串
        String str1 = "abc";
        String str2 = str1.repeat(5);
        System.out.println(str2);

        //        lines().count():行数统计
        String str3 = "abc\ndef\ng";
        System.out.println(str3.lines().count());


    }


    //java11新特性二：Optional新增的方法
    @Test
    public void test2(){

        var op = Optional.empty();
        System.out.println(op.isPresent());//判断内部的value是否存在
        System.out.println(op.isEmpty());//判断内部的value是否为空

        op = Optional.of("abc");
        //orElseThrow():value非空，返回value；否则抛异常NoSuchElementException
        var obj = op.orElseThrow();
        System.out.println(obj);

        Optional<String> op1 = Optional.of("hello");
        //        op = Optional.empty();
        //or:value非空，返回对应的Optional；value为空，返回形参封装的Optional
        Optional<Object> op2 = op.or(() -> op1);
        System.out.println(op2);//

    }

    //java11新特性三：局部变量类型推断的升级
    @Test
    public void test3(){
        //错误的形式: 必须要有类型, 可以加上var
        //        Consumer<String> con1 = (@Deprecated t) -> System.out.println(t.toUpperCase());
        // 正确的形式:
        // 使用var的好处是在使用lambda表达式时给参数加上注解。
        Consumer<String> con2 = (@Deprecated var t) -> System.out.println(t.toUpperCase());

    }
    //java11新特性四：HttpClient替换原有的HttpURLConnection。
    @Test
    public void test4(){
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder(URI.create("http://127.0.0.1:8080/test/")).build();
            HttpResponse.BodyHandler<String> responseBodyHandler = HttpResponse.BodyHandlers.ofString();
            HttpResponse<String> response = client.send(request, responseBodyHandler);
            String body = response.body();
            System.out.println(body);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Test
    public void test5(){
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder(URI.create("http://127.0.0.1:8080/test/")).build();
        HttpResponse.BodyHandler<String> responseBodyHandler = HttpResponse.BodyHandlers.ofString();
        CompletableFuture<HttpResponse<String>> sendAsync = client.sendAsync(request, responseBodyHandler);
        sendAsync.thenApply(t -> t.body()).thenAccept(System.out::println);
        //HttpResponse<String> response = sendAsync.get();
        //String body = response.body();
        //System.out.println(body);


    }

}

```





### 在当前JDK中看不到什么？



> 一个标准化和轻量级的JSON API

==一个标准化和轻量级的JSON API==被许多Java开发人员所青睐。但是由于资金问 题无法在Java当前版本中见到，但并不会削减掉。Java平台首席架构师Mark Reinhold在JDK 9邮件列中说：“**这个JEP将是平台上的一个有用的补充，但是在 计划中，它并不像Oracle资助的其他功能那么重要，可能会重新考虑JDK 10或 更高版本中实现。** 



> 新的货币 API

- 对许多应用而言货币价值都是一个关键的特性，但JDK对此却几乎没有任何支持。 严格来讲，现有的java.util.Currency类只是代表了当前ISO 4217货币的一个数据结构， 但并==没有关联的值或者自定义货币==。JDK对货币的运算及转换也没有内建的支持， 更别说有一个能够代表货币值的标准类型了。
- 此前，==Oracle 公布的JSR 354定义了一套新的Java货币API：JavaMoney==，计划会在Java 9中正式引入。但是目前没有出现在JDK 新特性 中。
- 不过，如果你用的是Maven的话，可以做如下的添加，即可使用相关的API处理货币：

```xml
<dependency>
    <groupId>org.javamoney</groupId>
    <artifactId>moneta</artifactId>
    <version>0.9</version>
</dependency>
```



### 展 望

- 随着云计算和 AI 等技术浪潮，当前的计算模式和场景正在发生翻天覆地的变 化，不仅对 Java 的发展速度提出了更高要求，也深刻影响着 Java 技术的发展 方向。==传统的大型企业或互联网应用，正在被云端、容器化应用、模块化的微 服务甚至是函数(FaaS， Function-as-a-Service)所替代。==
- Java虽然标榜面向对象编程，却毫不顾忌的==加入面向接口编程思想==，又扯出==匿名对象==之概念，每增加一个新的东西，对Java的根本所在的面向对象思想的一 次冲击。反观Python，抓住面向对象的本质，又能在函数编程思想方面游刃有 余。==Java对标C/C++，以抛掉内存管理为卖点，却又陷入了JVM优化的噩梦==。选 择比努力更重要，选择Java的人更需要对它有更清晰的认识。
- ==Java 需要在新的计算场景下，改进开发效率==。这话说的有点笼统，我谈一些自 己的体会，Java 代码虽然进行了一些类型推断等改进，更易用的集合 API 等， 但仍然给开发者留下了过于刻板、形式主义的印象，这是一个长期的改进方向

