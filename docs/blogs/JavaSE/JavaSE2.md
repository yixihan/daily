---
title: JavaSE2
date: 2022-03-09
tags:
 - JavaSE
categories:
 - JavaSE
---

# JavaSE



## 面向对象



### 面向对象的特征之二 : 继承性



#### 简介

> 为什么要有继承

多个类中存在相同属性和行为时，将这些内容抽取到单独一个类中， 那么多个类无需再定义这些属性和行为，只要继承那个类即可



此处的多个类称为子类(派生类)，单独的这个类称为父类(基类 或超类)。可以理解为:“子类 is a 父类”



> 类继承语法规则

```java
class Subclass extends SuperClass{ }
```



> 图解

![image-20211015221636344](/assets/imgs/JavaSE2.assets/image-20211015221636344.png)



```java
package com.yixihan.day1015.inherit;

/**
 * 面向对象的特征之二 : 继承性
 *
 * 一. 继承性的好处 :
 *      1. 减少了冗余代码, 提高了代码的复用性
 *      2. 便于功能的拓展
 *      3. 为之后多态性的使用, 提供了前提
 *
 * 二. 继承性的格式 : class A extends B {}
 *      A : 子类, 派生类, subclass
 *      B : 父类, 超类, 基类, superclass
 *
 *
 *      体现 :
 *          1. 一旦子类 A 基础了父类 B 之后, 子类 A 中就获取了父类 B 中声明的所有的属性和方法
 *          特别的, 父类中声明为 private 的属性或方法, 子类基础父类之后, 仍然认为获取了父类中私有的结构
 *          只是因为封装性的影响, 使得子类不能直接调用父类的结构而已
 *
 *          2. 子类基础父类之后, 还可以声明自己特有的属性或方法, 实现功能的扩展
 *          子类和父类的关系, 不同于子集和父集的关系
 *          extends : 延展 扩展
 *
 * 三. Java 中关于继承的规定
 *      1. 一个类可以被多个子类继承
 *      2. Java 中类的单继承性 : 一个类只能有一个直接父类
 *      3. 子父类是相对的概念
 *      4. 子类直接继承的父类, 称为 : 直接父类 间接继承的父类, 称为 : 间接父类
 *      5. 子类继承父类以后, 就获得了直接父类以及所有间接父类中声明的属性和方法
 *
 *
 * 三. Object
 *      1. 如果我们没有显式的声明一个类的父类的话, 则此类继承与 java.lang.Object
 *      2. 所有的 java 类 (除 java.lang.Object) 都直接或间接的继承与 java.lang.Object
 *      3. 意味着, 所有的 java 类都具有 java.lang.Object 声明的功能
 * @author yixihan
 */
public class ExtendsTest {

    public static void main(String[] args) {

        Person p1 = new Person();
        p1.setAge(18);
        p1.eat();

        Student s1 = new Student();
        s1.setAge(16);
        s1.eat();
        s1.setName("李四");
        System.out.println(s1.getName());
        s1.breath();

        Creature creature = new Creature();
        System.out.println(creature.toString());
    }
}
```



#### 练习



##### 练习1



ManKind

```java
package com.yixihan.day1016.inherit.exer.test1;

/**
 * @author yixihan
 */
public class ManKind {

    /**
     * 性别
     */
    private int sex;

    /**
     * 薪资
     */
    private int salary;

    /**
     * 无参构造
     */
    public ManKind() { }

    /**
     * 全参构造
     * @param sex 性别
     * @param salary 薪资
     */
    public ManKind(int sex, int salary) {
        this.sex = sex;
        this.salary = salary;
    }

    /**
     * 判断是男是女
     */
    public void manOrWoman () {
        if (sex == 1) {
            System.out.println("man");
        } else {
            System.out.println("woman");
        }
    }

    /**
     * 判断有无工作
     */
    public void employeed () {

        // 方式一
        /*
        if (salary == 0) {
            System.out.println("no job");
        } else {
            System.out.println("job");
        }
        */


        // 方式二
        String jobInfo = salary == 0 ? "no job" : "job";
        System.out.println(jobInfo);
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }
}
```



Kids

```java
package com.yixihan.day1016.inherit.exer.test1;

/**
 * @author yixihan
 */
public class Kids extends ManKind {

    private int yearsOld;

    public Kids() { }

    public Kids(int yearsOld) {
        this.yearsOld = yearsOld;
    }

    public Kids(int sex, int salary, int yearsOld) {
        super(sex, salary);
        this.yearsOld = yearsOld;
    }

    /**
     * 获取今年多少岁了
     */
    public void yearsOld () {
        System.out.println("我今年" + yearsOld + "岁了");
    }

    public int getYearsOld() {
        return yearsOld;
    }

    public void setYearsOld(int yearsOld) {
        this.yearsOld = yearsOld;
    }
}
```



Test

```java
package com.yixihan.day1016.inherit.exer.test1;

/**
 * @author yixihan
 */
public class KidsTest {

    public static void main(String[] args) {

        Kids k1 = new Kids(12);

        k1.yearsOld();

        k1.setSalary(0);
        k1.setSex(1);

        k1.employeed();
        k1.manOrWoman();

    }
}
```



##### 练习2



Circle

```java
package com.yixihan.day1016.inherit.exer.test2;

/**
 * @author yixihan
 */
public class Circle {

    /**
     * 半径
     */
    private double radius;

    /**
     * 无参构造 默认半径为 1
     */
    public Circle() {
        radius = 1;
    }

    /**
     * 全参构造
     * @param radius 半径
     */
    public Circle(double radius) {
        this.radius = radius;
    }

    /**
     * 获取圆的面积
     * @return 圆的面积
     */
    public double findArea () {
        return radius * radius * Math.PI;
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }
}
```



Cylinder

```java
package com.yixihan.day1016.inherit.exer.test2;

/**
 * @author yixihan
 */
public class Cylinder extends Circle{

    /**
     * 高
     */
    private double length;

    /**
     * 无参构造
     */
    public Cylinder() { }

    /**
     * 全参构造
     * @param radius 半径
     * @param length 高
     */
    public Cylinder(double radius, double length) {
        super(radius);
        this.length = length;
    }

    /**
     * 获取圆柱的体积
     * @return 体积
     */
    public double findVolume () {
        return findArea() * length;
    }

    public double getLength() {
        return length;
    }

    public void setLength(double length) {
        this.length = length;
    }
}
```



Test

```java
package com.yixihan.day1016.inherit.exer.test2;

/**
 * @author yixihan
 */
public class CylinderTest {

    public static void main(String[] args) {

        Cylinder c1 = new Cylinder();

        c1.setRadius(2.1);
        c1.setLength(3.4);

        System.out.println("底面圆的面积 : " + c1.findArea());
        System.out.println("圆柱的体积 : " + c1.findVolume());
    }
}
```



### Debug

![image-20211016134417071](/assets/imgs/JavaSE2.assets/image-20211016134417071.png)



1. 开始/重新运行 debug 程序

2. 修改运行配置, 可以编辑 名称 jdk版本 环境变量等配置

   ![image-20211016134438102](/assets/imgs/JavaSE2.assets/image-20211016134438102.png)

3. 恢复程序, 即取消 debug 该程序, 直接运行

4. 暂停程序

5. 停止程序

6. 查看断点, 可以查看断点个数 断点信息 及发生的异常信息

![image-20211016134554894](/assets/imgs/JavaSE2.assets/image-20211016134554894.png)

7.  断点静音, 顾名思义, 将断点静音了, debug 程序时将不会在断点处暂停 
8.  显示执行点, 会将光标跳转到代码正在执行的地方
9.  步过, 下一步, 且并不会因为该行代码是方法或其他封装而进入更深一层去 debug
10.  步入, 下一步, 如果该行代码是方法或其他封装,则会进入更深一层去 debug, 基础的除外 (如 System.out.println())
11.  强制步入, 下一步, 且强制进入更深一层,  基础的也会进入
12.  步出, 从该方法中直接出来
13.  丢帧, 作用不明
14.  运行到光标处, 顾名思义
15.  变量信息展示处
16.  监视信息展示处, 右键变量即可将其监视

![image-20211016135316958](/assets/imgs/JavaSE2.assets/image-20211016135316958.png)

17.  帧, 告诉你正在哪个类, 多少行中执行

![image-20211016135438573](/assets/imgs/JavaSE2.assets/image-20211016135438573.png)



测试代码

```java
package com.yixihan.day1016.debug;
/**
 * 如何调试程序：
 *     1. System.out.println().
 *     2. idea - Debug调试
 *
 * @author yixihan
 */
public class DebugTest {
   public static void main(String[] args) {
      int i = 10;
      int j = 20;
      System.out.println("i = " + i + ", j = " + j);
      
      DebugTest test = new DebugTest();
      int max = test.getMax(i, j);
      
      System.out.println("max = " + max);
   }

   private int getMax(int k, int m) {
      int max = 0;
      // 此处出错
      if (k < m) {
         max = k;
      } else {
         max = m;
      }
      return max;
   }

}
```



```java
package com.yixihan.day1016.debug;


/**
 * @author yixihan
 */
public class DebugTest1 {
   
   public static void main(String[] args) {
      int[] arr = new int[] {1,2,3,4,5};
      //地址值
      System.out.println(arr);


      char[] arr1 = new char[] {'a','b','c'};
      //abc
      System.out.println(arr1);
   }
   
}
```



### 方法的重写(override/overwrite)



#### 简介

> 定义

在子类中可以根据需要对从父类中继承来的方法进行改造，也称 为方法的重置、覆盖。在程序执行时，子类的方法将覆盖父类的方法



> 要求

* 子类重写的方法必须和父类被重写的方法具有相同的方法名称、参数列表
* 子类重写的方法的返回值类型不能大于父类被重写的方法的返回值类型
* 子类重写的方法使用的访问权限不能小于父类被重写的方法的访问权限
  * 子类不能重写父类中声明为private权限的方法
* 子类方法抛出的异常不能大于父类被重写方法的异常

> 注意

子类与父类中同名同参数的方法必须同时声明为非static的(即为重写)，或者同时声明为 static的（不是重写）。因为static方法是属于类的，子类无法覆盖父类的方法



```java
package com.yixihan.day1016.overwrite;

/**
 * @author yixihan
 */
public class Person {

    /**
     * 姓名
     */
    private String name;

    /**
     * 年龄
     */
    private int age;


    /**
     * 无参构造
     */
    public Person() { }


    /**
     * 全参构造
     * @param name 姓名
     * @param age 年龄
     */
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }


    /**
     * 吃饭
     */
    public void eat () {
        System.out.println("吃饭");
    }


    /**
     * 走路
     * @param distance 走了多远
     */
    public void walk (int distance) {
        System.out.println("走路, 走的距离是 " + distance + "km");
        show();
    }

    private void show () {
        System.out.println("我是人");
    }

    public Object info (String info) {
        return info;
    }

    public double info1 (double info1) {
        return info1;
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
package com.yixihan.day1016.overwrite;

/**
 * @author yixihan
 */
public class Student extends Person{

    /**
     * 专业
     */
    private String major;


    /**
     * 无参构造
     */
    public Student() { }


    /**
     * 有参构造
     * @param major 专业
     */
    public Student(String major) {
        this.major = major;
    }


    /**
     * 全参构造
     * @param name 姓名
     * @param age 年龄
     * @param major 专业
     */
    public Student(String name, int age, String major) {
        super(name, age);
        this.major = major;
    }

    /**
     * 学习
     */
    public void study () {
        System.out.println("学习, 专业是 " + getMajor());
    }

    /**
     * 吃饭, 对父类中的 eat 方法进行了重写
     */
    @Override
    public void eat () {
        System.out.println("学生应该多吃有营养的食物");
    }

    /**
     * 不构成方法重写
     */
    /*
    public void show() {
        System.out.println("我是学生");
    }
     */

    @Override
    public String info (String info) {
        return info;
    }

    @Override
    public double info1 (double info1) {
        return info1;
    }

    /**
     * 不构成方法重写
     */
    /*
    public int info1 (double info1) {
        return (int) info1;
    }
     */

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }
}
```



```java
package com.yixihan.day1016.overwrite;

/**
 * 方法的重写 (override / overwrite)
 *
 * 1. 重写 : 子类继承父类之后, 可以对父类中同名同参数的方法, 进行覆盖操作
 *
 * 2. 应用 : 重写以后, 当创建子类对象以后, 通过子类对象调用子父类中同名同参数的方法是, 实际执行的是子类重写父类的方法
 *
 * 3. 重写的规定 :
 *      1. 方法的声明 : 权限修饰符 返回值类型 方法名 (形参列表) throw 异常的类型{
 *                          方法体
 *                      }
 *                      约定俗称 : 子类中的叫重写的方法, 父类中的叫被重写的方法
 *
 *      2. 子类中重写的方法的方法名和形参列表与父类被重写的方法的方法名和形参列表必须一样
 *      3. 子类中重写的方法的权限修饰符不小于父类被重写的方法的权限修饰符
 *          特殊情况 : 子类不能重写父类中权限修饰符为 private 的方法
 *      4. 返回值类型 :
 *          1. 如果父类被重写的方法的返回值类型是 void, 则子类中重写的方法的返回值类型只能是 void
 *          2. 如果父类被重写的方法的返回值类型是 A 类, 则子类中重写的方法的返回值类型可以是 A 类或者 A 的子类
 *          3. 如果父类被重写的方法的返回值类型是基本数据类型, 则子类中重写的方法的返回值类型必须是相同的基本数据类型
 *      5. 子类中重写的方法抛出的异常类型不大于父类被重写的方法抛出的异常类型
 *
 *
 *      子类和父类中的同名同参数方法, 要么都声明为 非 static (考虑重写), 要么都声明为 static (不是重写)
 *
 *
 * 面试题 : 区分方法重载与重写
 *
 *
 * @author yixihan
 */
public class PersonTest {

    public static void main(String[] args) {


        Student s = new Student("计算机科学与技术");

        s.eat();
        s.walk(10);

        s.study();
    }
}
```



#### 练习



##### 练习一



Kids

```java
package com.yixihan.day1016.overwrite.exer.test1;

/**
 * @author yixihan
 */
public class Kids extends ManKind {

    private int yearsOld;

    public Kids() { }

    public Kids(int yearsOld) {
        this.yearsOld = yearsOld;
    }

    public Kids(int sex, int salary, int yearsOld) {
        super(sex, salary);
        this.yearsOld = yearsOld;
    }

    /**
     * 获取今年多少岁了
     */
    public void yearsOld () {
        System.out.println("我今年" + yearsOld + "岁了");
    }

    /**
     * 修改练习1.2中定义的类Kids，在Kids中重新定义employeed()方法，
     * 覆盖父类ManKind中定义的employeed()方法，输出“Kidsshould study and no job.”
     */
    @Override
    public void employeed () {
        System.out.println("Kids should study and no job.");
    }


    public int getYearsOld() {
        return yearsOld;
    }

    public void setYearsOld(int yearsOld) {
        this.yearsOld = yearsOld;
    }



}
```



ManKind

```java
package com.yixihan.day1016.overwrite.exer.test1;

/**
 * @author yixihan
 */
public class ManKind {

    /**
     * 性别
     */
    private int sex;

    /**
     * 薪资
     */
    private int salary;

    /**
     * 无参构造
     */
    public ManKind() { }

    /**
     * 全参构造
     * @param sex 性别
     * @param salary 薪资
     */
    public ManKind(int sex, int salary) {
        this.sex = sex;
        this.salary = salary;
    }

    /**
     * 判断是男是女
     */
    public void manOrWoman () {
        if (sex == 1) {
            System.out.println("man");
        } else {
            System.out.println("woman");
        }
    }

    /**
     * 判断有无工作
     */
    public void employeed () {

        // 方式一
        /*
        if (salary == 0) {
            System.out.println("no job");
        } else {
            System.out.println("job");
        }
        */


        // 方式二
        String jobInfo = salary == 0 ? "no job" : "job";
        System.out.println(jobInfo);
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }
}
```



Test

```java
package com.yixihan.day1016.overwrite.exer.test1;


/**
 * @author yixihan
 */
public class KidsTest {

    public static void main(String[] args) {

        Kids k1 = new Kids(12);

        k1.yearsOld();

        k1.setSalary(0);
        k1.setSex(1);

        k1.employeed();
        k1.manOrWoman();

    }
}
```



##### 练习2



Circle

```java
package com.yixihan.day1016.overwrite.exer.test2;

/**
 * @author yixihan
 */
public class Circle {

    /**
     * 半径
     */
    private double radius;

    /**
     * 无参构造 默认半径为 1
     */
    public Circle() {
        radius = 1;
    }

    /**
     * 全参构造
     * @param radius 半径
     */
    public Circle(double radius) {
        this.radius = radius;
    }

    /**
     * 获取圆的面积
     * @return 圆的面积
     */
    public double findArea () {
        return radius * radius * Math.PI;
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }
}
```



Cylinder

```java
package com.yixihan.day1016.overwrite.exer.test2;

/**
 * @author yixihan
 */
public class Cylinder extends Circle {

    /**
     * 高
     */
    private double length;

    /**
     * 无参构造
     */
    public Cylinder() { }

    /**
     * 全参构造
     * @param radius 半径
     * @param length 高
     */
    public Cylinder(double radius, double length) {
        super(radius);
        this.length = length;
    }

    /**
     * 获取圆柱的体积
     * @return 体积
     */
    public double findVolume () {
        return super.findArea() * length;
    }


    /**
     * 返回圆柱的表面积
     * @return 圆柱的表面积
     */
    @Override
    public double findArea() {
        double area;
        // 上下圆的面积
        area = Math.PI * getRadius() * getRadius() * 2;

        // 侧面积
        area += 2 * Math.PI * getRadius() * getLength();

        return area;
    }

    public double getLength() {
        return length;
    }

    public void setLength(double length) {
        this.length = length;
    }
}
```



Test

```java
package com.yixihan.day1016.overwrite.exer.test2;

/**
 * @author yixihan
 */
public class CylinderTest {

    public static void main(String[] args) {

        Cylinder c1 = new Cylinder();

        c1.setRadius(2.1);
        c1.setLength(3.4);

        System.out.println("圆柱的表面积 : " + c1.findArea());
        System.out.println("圆柱的体积 : " + c1.findVolume());
    }
}
```



### 再谈四种权限修饰符

![image-20211016150449101](/assets/imgs/JavaSE2.assets/image-20211016150449101.png)



Order

```java
package com.yixihan.day1016.power;

/**
 * @author yixihan
 */
public class Order {

    private int orderPrivate;
    int orderDefault;
    protected int orderProtected;
    public int orderPublic;

    public Order() { }

    public Order(int orderPrivate, int orderDefault, int orderProtected, int orderPublic) {
        this.orderPrivate = orderPrivate;
        this.orderDefault = orderDefault;
        this.orderProtected = orderProtected;
        this.orderPublic = orderPublic;
    }

    private void methodPrivate () {
        orderPrivate = 1;
        orderDefault = 2;
        orderProtected = 3;
        orderPublic = 4;
        System.out.println("private");
    }

    void methodDefault () {
        orderPrivate = 1;
        orderDefault = 2;
        orderProtected = 3;
        orderPublic = 4;
        System.out.println("default");
    }

    protected void methodProtected () {
        orderPrivate = 1;
        orderDefault = 2;
        orderProtected = 3;
        orderPublic = 4;
        System.out.println("protected");
    }

    public void methodPublic () {
        orderPrivate = 1;
        orderDefault = 2;
        orderProtected = 3;
        orderPublic = 4;
        System.out.println("public");
    }

    public int getOrderPrivate() {
        return orderPrivate;
    }

    public void setOrderPrivate(int orderPrivate) {
        this.orderPrivate = orderPrivate;
    }

    public int getOrderDefault() {
        return orderDefault;
    }

    public void setOrderDefault(int orderDefault) {
        this.orderDefault = orderDefault;
    }

    public int getOrderProtected() {
        return orderProtected;
    }

    public void setOrderProtected(int orderProtected) {
        this.orderProtected = orderProtected;
    }

    public int getOrderPublic() {
        return orderPublic;
    }

    public void setOrderPublic(int orderPublic) {
        this.orderPublic = orderPublic;
    }
}
```



Test

```java
package com.yixihan.day1016.power;

/**
 * @author yixihan
 */
public class OrderTest {

    public static void main(String[] args) {

        Order order = new Order();
        order.orderDefault = 1;
        order.orderProtected = 2;
        order.orderPublic = 3;
        // 'orderPrivate' 在 'com.yixihan.day1016.power.Order' 中具有 private 访问权限
        // order.orderPrivate = 4;

        order.methodDefault();
        order.methodProtected();
        order.methodPublic();
        // 'methodPrivate()' 在 'com.yixihan.day1016.power.Order' 中具有 private 访问权限
        // order.methodPrivate();
    }
}
```



SubOrder

```java
package com.yixihan.day1016.power.test;

import com.yixihan.day1016.power.Order;

/**
 * 在不同包的子类中,  不可以调用 Order 类中声明为 private 缺省 权限的属性或方法
 *
 * @author yixihan
 */
public class SubOrder extends Order{

    @Override
    protected void methodProtected() {
        orderProtected = 1;
        orderPublic = 2;
        // 'orderDefault' 在 'com.yixihan.day1016.power.Order' 中不为 public。无法从外部包访问
        // orderDefault = 3;
        // 'orderPrivate' 在 'com.yixihan.day1016.power.Order' 中具有 private 访问权限
        // orderPrivate = 4;
        super.methodProtected();
    }

    @Override
    public void methodPublic() {
        super.methodPublic();
    }

    /**
     * 不构成方法重写
     */
    void methodDefault () {

    }

    /**
     * 不构成方法重写
     */
    private void methodPrivate () {

    }
}
```



Test

```java
package com.yixihan.day1016.power.test;

import com.yixihan.day1016.power.Order;

/**
 * 不同包的普通类(非子类), 要使用 Order 类的话, 不可以调用声明为 private 缺省 protected 权限的属性或方法
 * @author yixihan
 */
public class OrderTest {

    public static void main(String[] args) {

        Order order = new Order();
        // 'orderDefault' 在 'com.yixihan.day1016.power.Order' 中不为 public。无法从外部包访问
        // order.orderDefault = 1;
        // 'orderProtected' 在 'com.yixihan.day1016.power.Order' 中具有 protected 访问权限
        // order.orderProtected = 2;
        order.orderPublic = 3;
        // 'orderPrivate' 在 'com.yixihan.day1016.power.Order' 中具有 private 访问权限
        // order.orderPrivate = 4;


        // 'methodDefault()' 在 'com.yixihan.day1016.power.Order' 中不为 public。无法从外部包访问
        // order.methodDefault();
        // 'methodProtected()' 在 'com.yixihan.day1016.power.Order' 中具有 protected 访问权限
        // order.methodProtected();
        order.methodPublic();
        // 'methodPrivate()' 在 'com.yixihan.day1016.power.Order' 中具有 private 访问权限
        // order.methodPrivate();
    }
}
```



### super 关键字



#### 简介

在Java类中使用super来调用父类中的指定操作

- super可用于访问父类中定义的属性
- super可用于调用父类中定义的成员方法
- super可用于在子类构造器中调用父类的构造器



> 注意

- 尤其当子父类出现同名成员时，可以用super表明调用的是父类中的成员
- super的追溯不仅限于直接父类
- super和this的用法相像，this代表本类对象的引用，super代表父类的内存 空间的标识



#### this 和 super 的区别

![image-20211016155644256](/assets/imgs/JavaSE2.assets/image-20211016155644256.png)



```java
package com.yixihan.day1016.supertest;

/**
 * @author yixihan
 */
public class Person {

    /**
     * 姓名
     */
    private String name;

    /**
     * 年龄
     */
    private int age;

    /**
     * 身份证号
     */
    int id = 1001;


    /**
     * 无参构造
     */
    public Person() {
        System.out.println("正在无参构造 Person 哦~");
    }


    /**
     * 全参构造
     * @param name 姓名
     * @param age 年龄
     * @param id 身份证号
     */
    public Person(String name, int age, int id) {
        this.name = name;
        this.age = age;
        this.id = id;
    }


    /**
     * eat 方法
     */
    public void eat () {
        System.out.println("吃饭");
    }


    /**
     * walk 方法
     */
    public void walk () {
        System.out.println("走路");
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



```java
package com.yixihan.day1016.supertest;

/**
 * @author yixihan
 */
public class Student extends Person{

    /**
     * 专业
     */
    private String major;

    /**
     * 学号
     */
    int id;


    /**
     * 无参构造
     */
    public Student() {
        this.id = 1002;
    }


    /**
     * 有参构造 (仅子类中属性)
     * @param major 专业
     * @param id 学号
     */
    public Student(String major, int id) {
        this.major = major;
        this.id = id;
    }



    /**
     * 全参构造
     * @param name 姓名
     * @param age 年龄
     * @param id 身份证号
     * @param major 专业
     * @param id1 学号
     */
    public Student(String name, int age, int id, String major, int id1) {
        super(name, age, id);
        this.major = major;
        this.id = id1;
    }


    /**
     * 重写 eat 方法
     */
    @Override
    public void eat() {
        super.eat();
        System.out.println("学生应该多吃有营养的食物");
    }

    /**
     * study 方法
     */
    public void study () {
        System.out.println("学习");
    }

    /**
     * show 方法
     */
    public void show () {
        System.out.println("name : " + super.getName() + ", age : " + this.getAge());
        System.out.println("学号 : " + this.id + ", 身份证号 : " + super.id);
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    @Override
    public String toString() {
        return "Student{" +
                "major='" + major + '\'' +
                ", id=" + id +
                '}';
    }

}
```



```java
package com.yixihan.day1016.supertest;

/**
 * super 关键字的使用 :
 *      1. super 理解为 : 父类的
 *      2. super 可以用来调用 : 属性 方法 构造器
 *
 *      3. super 的使用
 *          1. 格式 : super.属性   super.方法
 *          2. 我们可以在子类的方法或者构造器中, 可以使用 "super.属性" 或 "super.方法" 的方法, 显式的调用父类中的属性或方法
 *          但是, 通常情况下, 我们习惯省略 "super"
 *
 *          3. 特殊情况下, 当子类和父类中定义了同名的属性时, 我们想要在子类中调用父类的属性, 则必须显式的使用 "super.属性" 的方式,
 *          表明调用的是父类中声明的属性
 *
 *          4. 特殊情况 : 当子类重写了父类的方法之后, 我们想在子类中调用父类中被重写的方法是, 则必须显式的使用 "super.方法" 的方式,
 *          表明调用的是父类中声明的方法
 *
 *      4. super调用构造器
 *          1. 格式 : super(形参列表);
 *          2. 我们可以在子类构造器中, 显式的使用 "super(形参列表)" 的方式, 调用父类中声明的指定的构造器
 *          3. "super(形参列表)" 的使用, 必须声明在子类构造器的首行
 *          4. 我们在类的构造器中, 针对于 "this(形参列表)" 或 "super(形参列表)" ,只能二选一, 不能同时出现
 *          5. 在构造器的首行, 没有显式的声明 "this(形参列表)" 或 "super(形参列表)", 则默认调用的是父类中的空参的构造器, 即 "super()"
 *          6. 在类的多个构造器中, 至少有一个类的构造器使用了 "super(形参列表)", 调用父类中的构造器
 *
 *
 * @author yixihan
 */
public class SuperTest {

    public static void main(String[] args) {

        Student student = new Student();

        student.show();
    }
}
```



### 子类对象实例化的过程



![image-20211016155702291](/assets/imgs/JavaSE2.assets/image-20211016155702291.png)

![image-20211016163601568](/assets/imgs/JavaSE2.assets/image-20211016163601568.png)

![image-20211016163610934](/assets/imgs/JavaSE2.assets/image-20211016163610934.png)





```java
package com.yixihan.day1016.instantiation;

/**
 * 子类对象实例化的全过程
 *
 * 1. 从结果上看 : (继承性)
 *      1. 子类继承父类以后, 就获取了父类中声明的属性或方法
 *      2. 创建子类的对象, 在堆空间中, 就会加载所有父类中声明的方法
 *
 * 2. 从过程上看 :
 *      1. 当我们通过子类的构造器创建子类对象时, 我们一定会直接或间接的调用父类的构造器, 今儿调用父类的父类的构造器, ...
 *      直到调用了 java.lang.Object 类中空参的构造器为止, 正因为加载过所有的父类的结构, 所有才可以看到内存中有父类中的结构
 *      子类对象才可以考虑进行调用
 *
 *      2. 虽然创建子类对象时, 调用了父类的构造器, 但是自始至终, 都只创建了一个对象, 即为 new 的子类对象
 * @author yixihan
 */
public class InstanceTest {
}
```



### 实验1



Account

```java
package com.yixihan.day1016.experiment;

/**
 * @author yixihan
 */
public class Account {

    /**
     * 账号 id
     */
    private int id;

    /**
     * 余额
     */
    private double balance;

    /**
     * 年利率
     */
    private double annualInterestRate;


    /**
     * 无参构造
     */
    public Account() {
    }


    /**
     * 全参构造
     * @param id 账户 id
     * @param balance 余额
     * @param annualInterestRate 年龄
     */
    public Account(int id, double balance, double annualInterestRate) {
        this.id = id;
        this.balance = balance;
        this.annualInterestRate = annualInterestRate;
    }

    /**
     * 获取月利率
     * @return 月利率
     */
    public double getMonthlyInterest() {
        return annualInterestRate / 12 * 100;
    }

    /**
     * 取钱
     * @param amount 要取出的金额
     */
    public void withdraw (double amount) {
        if (amount > balance) {
            System.out.println("抱歉, 您的余额不足哦~");
        } else {
            balance -= amount;
            System.out.println("您已成功取出 " + amount + " 元, 现余额 " + balance + " 元");
        }
    }

    /**
     * 存钱
     * @param amount 要存入的金额
     */
    public void deposit (double amount) {
        balance += amount;
        System.out.println("您已成功存入 " + amount + " 元, 现余额 " + balance + " 元");
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public double getAnnualInterestRate() {
        return annualInterestRate;
    }

    public void setAnnualInterestRate(double annualInterestRate) {
        this.annualInterestRate = annualInterestRate;
    }

    @Override
    public String toString() {
        return "您的账户 id 为 : " + getId() +
                " 您的余额为 : " + getBalance() +
                " 您的年利率为 : " + getAnnualInterestRate() + " %" +
                " 您的月利率为 : " + getMonthlyInterest() + " %" ;
    }
}
```



Test

```java
package com.yixihan.day1016.experiment;

/**
 * @author yixihan
 */
public class AccountTest {

    public static void main(String[] args) {

        Account account = new Account(1122, 20000, 0.0045);

        account.withdraw(30000);
        account.withdraw(2500);
        account.deposit(3000);
        System.out.println(account.toString());


    }
}
```



CheckAccount

```java
package com.yixihan.day1016.experiment;

/**
 * @author yixihan
 */
public class CheckAccount extends Account{

    /**
     * 可透支金额
     */
    private double overdraft;

    /**
     * 无参构造
     */
    public CheckAccount() { }


    /**
     * 有参构造 (子类中的属性)
     * @param overdraft 可透支金额
     */
    public CheckAccount(double overdraft) {
        this.overdraft = overdraft;
    }


    /**
     * 全参构造
     * @param id 账号 id
     * @param balance 余额
     * @param annualInterestRate 年利率
     * @param overdraft 可透支金额
     */
    public CheckAccount(int id, double balance, double annualInterestRate, int overdraft) {
        super(id, balance, annualInterestRate);
        this.overdraft = overdraft;
    }

    /**
     * 取钱
     * @param amount 要取出的金额
     */
    @Override
    public void withdraw(double amount) {
        if (amount > getBalance()) {
            if (amount < getBalance() + getOverdraft()) {

                setOverdraft(getOverdraft() - (amount - getBalance()));
                setBalance(0);
                System.out.println("您已成功取出 " + amount + " 元, 现余额 " + getBalance() + " 元, 可透支余额 " + getOverdraft() + " 元");
            } else {
                System.out.println("抱歉, 您的可透支金额不足哦~");
            }
        } else {
            setBalance(getBalance() - amount);
            System.out.println("您已成功取出 " + amount + " 元, 现余额 " + getBalance() + " 元, 可透支余额 " + getOverdraft() + " 元");
        }
    }

    public double getOverdraft() {
        return overdraft;
    }

    public void setOverdraft(double overdraft) {
        this.overdraft = overdraft;
    }

    @Override
    public String toString() {
        return "您的账户 id 为 : " + getId() +
                " 您的余额为 : " + getBalance() +
                " 您的年利率为 : " + getAnnualInterestRate() + " %" +
                " 您的月利率为 : " + getMonthlyInterest() + " %" +
                " 您的可透支金额为 : " + getOverdraft();
    }
}
```



Test

```java
package com.yixihan.day1016.experiment;

/**
 * @author yixihan
 */
public class CheckAccountTest {

    public static void main(String[] args) {

        CheckAccount account = new CheckAccount(1122, 20000, 0.0045, 5000);

        System.out.println(account.toString());

        account.withdraw(5000);
        System.out.println(account.toString());

        account.withdraw(18000);
        System.out.println(account.toString());

        account.withdraw(3000);
        System.out.println(account.toString());
    }
}
```



### 面向对象的特征之三 : 多态性



#### 简介

多态性，是面向对象中最重要的概念，在Java中的体现：

​	对象的多态性：父类的引用指向子类的对象, 可以直接应用在抽象类和接口上



> Java引用变量有两个类型：编译时类型和运行时类型。

- 编译时类型由声明 该变量时使用的类型决定，

- 运行时类型由实际赋给该变量的对象决定。

- 简 称：编译时，看左边；运行时，看右边。
- 若编译时类型和运行时类型不一致，就出现了对象的多态性(Polymorphism)
- 多态情况下 : 
  -  “看左边” ：看的是父类的引用（父类中不具备子类特有的方法）
  -  “看右边” ：看的是子类的对象（实际运行的是子类重写父类的方法）



==一个引用类型变量如果声明为父类的类型，但实际引用的是子类 对象，那么该变量就不能再访问子类中添加的属性和方法==



```java
/*
属性是在编译时确定的，编译时e为Person类型，没有school成员变量，因而编 译错误。
*/
Student m = new Student();
m.school = “pku”; //合法,Student类有school成员变量
Person e = new Student();
e.school = “pku”; //非法,Person类没有school成员变量
```



Person

```java
package com.yixihan.day1016.Polymorphism;

/**
 * @author yixihan
 */
public class Person {

    /**
     * 姓名
     */
    private String name;

    /**
     * 年龄
     */
    private int age;

    /**
     * 无参构造
     */
    public Person() { }


    /**
     * 全参构造
     * @param name 姓名
     * @param age 年龄
     */
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void eat () {
        System.out.println("吃饭");
    }

    public void walk () {
        System.out.println("走路");
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

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

```



Man

```java
package com.yixihan.day1016.Polymorphism;

/**
 * @author yixihan
 */
public class Man extends Person{

    /**
     * 是否抽烟
     */
    boolean isSmoking;


    /**
     * 无参构造
     */
    public Man() { }


    /**
     * 有参构造
     * @param isSmoking 是否抽烟
     */
    public Man(boolean isSmoking) {
        this.isSmoking = isSmoking;
    }


    /**
     * 全参构造
     * @param name 姓名
     * @param age 年龄
     * @param isSmoking 是否抽烟
     */
    public Man(String name, int age, boolean isSmoking) {
        super(name, age);
        this.isSmoking = isSmoking;
    }


    /**
     * 挣钱
     */
    public void earnMoney () {
        System.out.println("男人负责挣钱养家");
    }


    /**
     * 男人走路
     */
    @Override
    public void walk() {
        System.out.println("男人霸气的走路");
    }


    /**
     * 男人吃饭
     */
    @Override
    public void eat() {
        System.out.println("男人多吃肉, 长肌肉");
    }

    public boolean isSmoking() {
        return isSmoking;
    }

    public void setSmoking(boolean smoking) {
        isSmoking = smoking;
    }

    @Override
    public String toString() {
        return "Man{" +
                "isSmoking=" + isSmoking +
                '}';
    }
}
```



Woman

```java
package com.yixihan.day1016.Polymorphism;

/**
 * @author yixihan
 */
public class Woman extends Person{

    /**
     * 是否漂亮
     */
    private boolean isBeauty;


    /**
     * 无参构造
     */
    public Woman() { }


    /**
     * 有参构造
     * @param isBeauty 是否漂亮
     */
    public Woman(boolean isBeauty) {
        this.isBeauty = isBeauty;
    }

    /**
     * 全参构造
     * @param name 姓名
     * @param age 年龄
     * @param isBeauty 是否漂亮
     */
    public Woman(String name, int age, boolean isBeauty) {
        super(name, age);
        this.isBeauty = isBeauty;
    }


    /**
     * 购物
     */
    public void goShopping () {
        System.out.println("女人喜欢购物");
    }


    /**
     * 女人走路
     */
    @Override
    public void walk() {
        System.out.println("女人苗条的走路");
    }


    /**
     * 女人吃饭
     */
    @Override
    public void eat() {
        System.out.println("女人少吃肉, 为了减肥");
    }


    public boolean isBeauty() {
        return isBeauty;
    }

    public void setBeauty(boolean beauty) {
        isBeauty = beauty;
    }


    @Override
    public String toString() {
        return "Woman{" +
                "isBeauty=" + isBeauty +
                '}';
    }
}
```



Test

```java
package com.yixihan.day1016.Polymorphism;

/**
 * 面向对象的特征之三 : 多态性
 *
 *
 * 1. 理解多态性, 可以理解为一个事物的多种形态
 * 2. 何为多态性 :
 *      1. 对象的多态性 : 父类的引用指向子类的对象 (或子类的对象赋给父类的引用)
 *
 *
 * 3. 多态的使用 :
 *      1. 有了对象的多态性以后, 我们在编译期, 只能调用父类中声明的方法,
 *      但在运行期, 我们实际执行的是子类重写父类的方法
 *
 *      总结 : 编译, 看左边; 运行, 看右边
 *
 *
 * 4. 多态的使用前提 :
 *      1. 类的继承关系
 *      2. 方法的重写
 *
 * 5. 对象的多态性, 只适用于方法, 不适用与属性
 * @author yixihan
 */
public class PersonTest {

    public static void main(String[] args) {

        Person p1 = new Person();
        p1.eat();

        Man man = new Man();
        man.eat();
        man.setAge(25);
        man.earnMoney();

        //************************************************************
        System.out.println("************************************************************");
        // 多态性 : 子类对象的多态性 父类的引用指向子类的对象
        Person p2 = new Man();
        Person p3 = new Woman();

        Object p4 = new Woman();

        // 多态的使用 : 当调用子父类同名同参数的方法时, 实际执行的是子类重写父类的方法  ---  虚拟方法调用
        p2.eat();
        // 无法解析 'Person' 中的方法 'earnMoney'
        // p2.earnMoney();
        p3.eat();

        System.out.println(p4.toString());

    }
}

```



#### 多态性举例

```java
package com.yixihan.day1016.Polymorphism;


import java.sql.Connection;

/**
 * 多态性的使用 : 举例 1
 * @author yixihan
 */
public class AnimalTest {

    public static void main(String[] args) {

        AnimalTest test = new AnimalTest();

        test.func(new Dog());

        System.out.println("*************************************");

        test.func(new Cat());
    }

    public void func (Animal animal) {
        animal.eat();
        animal.shout();
    }
}

class Animal {


    /**
     * 进食
     */
    public void eat () {
        System.out.println("动物 : 进食");
    }


    /**
     * 叫
     */
    public void shout () {
        System.out.println("动物 : 叫");
    }
}

class Dog extends Animal{


    /**
     * 进食
     */
    @Override
    public void eat() {
        System.out.println("狗 : 吃骨头");
    }


    /**
     * 叫
     */
    @Override
    public void shout() {
        System.out.println("狗 : 汪汪汪");
    }
}

class Cat extends Animal {


    /**
     * 进食
     */
    @Override
    public void eat() {
        System.out.println("猫 : 吃鱼");
    }


    /**
     * 叫
     */
    @Override
    public void shout() {
        System.out.println("猫 : 喵喵喵");
    }
}

/**
 * 举例二
 */
class Order {
    public void method (Object obj) {
        System.out.println(obj);
    }
}

/**
 * 举例三
 */
class Driver {
    public void doData (Connection connection) { // conn = new MysqlConnection ();  / conn = new OracleConnection ();

        // 规范的步骤去操作数据
        // connection.method1();
        // connection.method2();
        // connection.method3();
    }
}
```



#### 虚拟方法调用(Virtual Method Invocation)



> 正常的方法调用

```java
Person e = new Person();
e.getInfo();
Student e = new Student();
e.getInfo();
```



> 虚拟方法调用(多态情况下)

```java
/*
子类中定义了与父类同名同参数的方法，在多态情况下，将此时父类的方法称为虚拟方法，父
类根据赋给它的不同子类对象，动态调用属于子类的该方法。这样的方法调用在编译期是无法
确定的。
*/
Person e = new Student();
e.getInfo(); //调用Student类的getInfo()方法
```



> 编译时类型和运行时类型

编译时e为Person类型，而方法的调用是在运行时确定的，所以调用的是Student类 的getInfo()方法。——动态绑定



##### 图解

![image-20211016212903399](/assets/imgs/JavaSE2.assets/image-20211016212903399.png)



##### 举例

```java
package com.atguigu.test;

import java.util.Random;

//面试题：多态是编译时行为还是运行时行为？
//证明如下：
class Animal  {
 
	protected void eat() {
		System.out.println("animal eat food");
	}
}

class Cat  extends Animal  {
 
	protected void eat() {
		System.out.println("cat eat fish");
	}
}

class Dog  extends Animal  {
 
	public void eat() {
		System.out.println("Dog eat bone");

	}

}

class Sheep  extends Animal  {
 

	public void eat() {
		System.out.println("Sheep eat grass");

	}

 
}

public class InterviewTest {

	public static Animal  getInstance(int key) {
		switch (key) {
		case 0:
			return new Cat ();
		case 1:
			return new Dog ();
		default:
			return new Sheep ();
		}

	}

	public static void main(String[] args) {
		int key = new Random().nextInt(3);

		System.out.println(key);

		Animal  animal = getInstance(key);
		
		animal.eat();
		 
	}

}

```



#### 多态小结



> 多态作用

提高了代码的通用性，常称作接口重用



> 前提

- 需要存在继承或者实现关系
- 有方法的重写



> 成员方法

- 编译时：要查看引用变量所声明的类中是否有所调用的方法。
- 运行时：调用实际new的对象所属的类中的重写方法。



> 成员变量

不具备多态性，只看引用变量所声明的类。



#### instanceof 操作符

x instanceof A：检验x是否为类A的对象，返回值为**boolean型**。

- 要求x所属的类与类A必须是子类和父类的关系，否则编译错误。
- 如果x属于类A的子类B，x instanceof A值也为true。

```java
public class Person extends Object {…}
public class Student extends Person {…}
public class Graduate extends Person {…}
-------------------------------------------------------------------
public void method1(Person e) {
    if (e instanceof Person) {
    	// 处理Person类及其子类对象
    }
    if (e instanceof Student) {
        //处理Student类及其子类对象
    }
    if (e instanceof Graduate) {
        //处理Graduate类及其子类对象
    }
}


```



Person

```java
package com.yixihan.day1017.Polymorphism;

/**
 * @author yixihan
 */
public class Person {

    /**
     * 姓名
     */
    private String name;

    /**
     * 年龄
     */
    private int age;

    /**
     * 无参构造
     */
    public Person() { }


    /**
     * 全参构造
     * @param name 姓名
     * @param age 年龄
     */
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void eat () {
        System.out.println("吃饭");
    }

    public void walk () {
        System.out.println("走路");
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

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```



Man

```java
package com.yixihan.day1017.Polymorphism;

/**
 * @author yixihan
 */
public class Man extends Person {

    /**
     * 是否抽烟
     */
    private boolean isSmoking;


    /**
     * 无参构造
     */
    public Man() { }


    /**
     * 有参构造
     * @param isSmoking 是否抽烟
     */
    public Man(boolean isSmoking) {
        this.isSmoking = isSmoking;
    }


    /**
     * 全参构造
     * @param name 姓名
     * @param age 年龄
     * @param isSmoking 是否抽烟
     */
    public Man(String name, int age, boolean isSmoking) {
        super(name, age);
        this.isSmoking = isSmoking;
    }


    /**
     * 挣钱
     */
    public void earnMoney () {
        System.out.println("男人负责挣钱养家");
    }


    /**
     * 男人走路
     */
    @Override
    public void walk() {
        System.out.println("男人霸气的走路");
    }


    /**
     * 男人吃饭
     */
    @Override
    public void eat() {
        System.out.println("男人多吃肉, 长肌肉");
    }

    public boolean isSmoking() {
        return isSmoking;
    }

    public void setSmoking(boolean smoking) {
        isSmoking = smoking;
    }

    @Override
    public String toString() {
        return "Man{" +
                "isSmoking=" + isSmoking +
                '}';
    }
}
```



Woman

```java
package com.yixihan.day1017.Polymorphism;

/**
 * @author yixihan
 */
public class Woman extends Person {

    /**
     * 是否漂亮
     */
    private boolean isBeauty;


    /**
     * 无参构造
     */
    public Woman() { }


    /**
     * 有参构造
     * @param isBeauty 是否漂亮
     */
    public Woman(boolean isBeauty) {
        this.isBeauty = isBeauty;
    }

    /**
     * 全参构造
     * @param name 姓名
     * @param age 年龄
     * @param isBeauty 是否漂亮
     */
    public Woman(String name, int age, boolean isBeauty) {
        super(name, age);
        this.isBeauty = isBeauty;
    }


    /**
     * 购物
     */
    public void goShopping () {
        System.out.println("女人喜欢购物");
    }


    /**
     * 女人走路
     */
    @Override
    public void walk() {
        System.out.println("女人苗条的走路");
    }


    /**
     * 女人吃饭
     */
    @Override
    public void eat() {
        System.out.println("女人少吃肉, 为了减肥");
    }


    public boolean isBeauty() {
        return isBeauty;
    }

    public void setBeauty(boolean beauty) {
        isBeauty = beauty;
    }


    @Override
    public String toString() {
        return "Woman{" +
                "isBeauty=" + isBeauty +
                '}';
    }
}
```



Test

```java
package com.yixihan.day1017.Polymorphism;

import java.util.Date;

/**
 * 面向对象的特征之三 : 多态性
 *
 *
 * 1. 理解多态性, 可以理解为一个事物的多种形态
 * 2. 何为多态性 :
 *      1. 对象的多态性 : 父类的引用指向子类的对象 (或子类的对象赋给父类的引用)
 *
 *
 * 3. 多态的使用 :
 *      1. 有了对象的多态性以后, 我们在编译期, 只能调用父类中声明的方法,
 *      但在运行期, 我们实际执行的是子类重写父类的方法
 *
 *      总结 : 编译, 看左边; 运行, 看右边
 *
 *
 * 4. 多态的使用前提 :
 *      1. 类的继承关系
 *      2. 方法的重写
 *
 * 5. 对象的多态性, 只适用于方法, 不适用与属性 (编译和运行都看左边)
 *
 * ***************************************************************
 *
 *
 * @author yixihan
 */
public class PersonTest {

    public static void main(String[] args) {

        Person p1 = new Person();
        p1.eat();

        Man man = new Man();
        man.eat();
        man.setAge(25);
        man.earnMoney();

        //************************************************************
        System.out.println("************************************************************");
        // 多态性 : 子类对象的多态性 父类的引用指向子类的对象
        Person p2 = new Man();
        Person p3 = new Woman();

        Object p4 = new Woman();

        // 多态的使用 : 当调用子父类同名同参数的方法时, 实际执行的是子类重写父类的方法  ---  虚拟方法调用
        p2.eat();
        // 无法解析 'Person' 中的方法 'earnMoney'
        // p2.earnMoney();
        p3.eat();

        System.out.println(p4.toString());


        System.out.println("*************************************************************");

        // 不能调用子类所特有的方法和属性 : 编译时, p2 是 Person 类型
        p2.setName("Tom");
        // p2.setSmoking(true);
        // p2.earnMoney();

        // 有了对象的多态性以后, 内存中实际上是加载了子类特有的属性和方法的, 但是由于变量声明为父类类型, 导致
        // 编译时, 只能调用父类声明的属性和方法, 子类特有的属性和方法不能调用

        // 如何才能调用子类特有的属性和方法?

        // 使用强制类型转换符 : 向下转型
        Man m1 = (Man) p2;
        m1.setSmoking(true);
        m1.earnMoney();

        System.out.println(m1.toString());

        // 使用强转是, 可能出现 ClassCastException 异常
        // Woman w1 = (Woman) p2;
        // Exception in thread "main" java.lang.ClassCastException: com.yixihan.day1017.Polymorphism.Man cannot be cast to com.yixihan.day1017.Polymorphism.Woman
        // w1.goShopping();

        /*
         instanceof 关键字 :
         a instanceof A : 判断对象 a 是否是类 A 的实例, 如果是, 返回 true, 如果不是, 返回 false

         使用情景 : 为力避免在向下转型时出现 ClassCastException 的异常, 我们在向下转型之前, 先进行 instanceof 的判断
         如果返回 true, 就进行向下转型
         如果返回 false, 就不进行向下转型

         如果 a instanceof A 返回 true, 且 a instanceof B 也返回 true
         则类 B 和类 A 是子父类的关系

         如果 a instanceof A 返回 true, 且 类 B 是类 A 的父类
         则 a instanceof B 也返回 true
         */

        if (p2 instanceof Woman) {
            Woman w1 = (Woman) p2;
            w1.goShopping();
            System.out.println("****************Woman*****************");
        }

        if (p2 instanceof Man) {
            Man m2 = (Man) p2;
            m2.earnMoney();
            System.out.println("****************Man*****************");
        }

        if (p2 instanceof Person) {
            System.out.println("****************Person***************");
        }

        if (p2 instanceof Object) {
            System.out.println("****************Object***************");
        }

        // 练习
        // 问题一 : 编译时通过, 运行时不通过

        // Person p5 = new Woman();
        // Man m3 = (Man) p5;

        // Person p6 = new Person();
        // Man m4 = (Man) p6;

        // 问题二 : 编译时通过, 运行时也通过
        Object obj = new Woman();
        Person p7 = (Person) obj;

        // 问题三 : 编译不通过
        // Man m5 = new Woman();
        // String str = new Date();
    }
}
```



#### 练习



##### 练习1



Base

```java
package com.yixihan.day1017.Polymorphism.exer.test1;

/**
 * @author yixihan
 */
public class Base {

    int count = 10;
    public void display() {
        System.out.println(this.count);
    }
}
```



```java
package com.yixihan.day1017.Polymorphism.exer.test1;

/**
 * @author yixihan
 */
class Sub extends Base {
    int count = 20;


    @Override
    public void display() {
        System.out.println(this.count);
    }
}
```



Test

```java
package com.yixihan.day1017.Polymorphism.exer.test1;

/**
 * 子类继承父类
 *      1. 若子类重写了父类方法，就意味着子类里定义的方法彻底覆盖了父类里的
 * 同名方法，系统将不可能把父类里的方法转移到子类中。
 *      2.对于实例变量则不存在这样的现象，即使子类里定义了与父类完全相同的
 * 实例变量，这个实例变量依然不可能覆盖父类中定义的实例变量
 *
 * @author yixihan
 */
public class FieldMethodTest {

    public static void main(String[] args){
        Sub s = new Sub();
        System.out.println(s.count);
        s.display();
        Base b = s;
        System.out.println(b == s);
        System.out.println(b.count);
        b.display();
    }

}
```



##### 练习2



Person

```java
package com.yixihan.day1017.Polymorphism.exer.test2;

/**
* @author yixihan
*/
public class Person {

    protected String name="person";
    protected int age=50;

    public String getInfo() {
        return "Name: "+ name + "\n" +"age: "+ age;
    }

}
```



Student

```java
package com.yixihan.day1017.Polymorphism.exer.test2;

/**
 * @author yixihan
 */
public class Student extends Person{

    protected String school="pku";

    @Override
    public String getInfo() {
        return "Name: "+ name + "\nage: "+ age
                + "\nschool: "+ school;
    }
}
```



Graduate

```java
package com.yixihan.day1017.Polymorphism.exer.test2;

/**
 * @author yixihan
 */
public class Graduate extends Student{

    public String major="IT";

    @Override
    public String getInfo() {
        return "Name: "+ name + "\nage: "+ age
                + "\nschool: "+ school+"\nmajor:"+major;
    }
}
```



Test

```java
package com.yixihan.day1017.Polymorphism.exer.test2;

/**
 * 建立InstanceTest 类，在类中定义方法method(Person e);
 *     在method中:
 *         (1)根据e的类型调用相应类的getInfo()方法。
 *         (2)根据e的类型执行：
 *              如果e为Person类的对象，输出：
 *                  “a person”;
 *              如果e为Student类的对象，输出：
 *                  “a student”
 *                  “a person ”
 *              如果e为Graduate类的对象，输出：
 *                  “a graduated student”
 *                  “a student”
 *                  “a person”
 *
 * @author yixihan
 */

public class InstanceTest {

    public static void main(String[] args) {

        InstanceTest test = new InstanceTest();

        test.method(new Graduate());
        test.method(new Student());
        test.method(new Person());

    }

    public void method (Person person) {

        String info = person.getInfo();
        System.out.println(info);

        if (person instanceof Graduate) {
            System.out.println("a graduated student");
            System.out.println("a student");
            System.out.println("a person");
        } else if (person instanceof Student) {
            System.out.println("a student");
            System.out.println("a person");
        } else {
            System.out.println("a person");
        }
    }
}
```



##### 练习3



GeometricObject

```java
package com.yixihan.day1017.Polymorphism.exer.test3;

/**
 * @author yixihan
 */
public class GeometricObject {

    /**
     * 颜色
     */
    protected String color;

    /**
     * 重量
     */
    protected double weight;


    /**
     * 无参构造
     */
    public GeometricObject() { }


    /**
     * 全参构造
     * @param color 颜色
     * @param weight 重量
     */
    public GeometricObject(String color, double weight) {
        this.color = color;
        this.weight = weight;
    }


    /**
     * 求面积
     * @return 面积
     */
    public double findArea () {
        return 0.0;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    @Override
    public String toString() {
        return "GeometricObject{" +
                "color='" + color + '\'' +
                ", weight=" + weight +
                '}';
    }
}
```



Circle

```java
package com.yixihan.day1017.Polymorphism.exer.test3;

/**
 * @author yixihan
 */
public class Circle extends GeometricObject{

    /**
     * 半径
     */
    private double radius;


    /**
     * 无参构造
     */
    public Circle() { }


    /**
     * 全参构造
     * @param color 颜色
     * @param weight 重量
     * @param radius 半径
     */
    public Circle(String color, double weight, double radius) {
        super(color, weight);
        this.radius = radius;
    }

    /**
     * 求圆的面积
     * @return 圆的面积
     */
    @Override
    public double findArea() {
        return radius * radius * Math.PI;
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    @Override
    public String toString() {
        return "Circle{" +
                "radius=" + radius +
                ", color='" + color + '\'' +
                ", weight=" + weight +
                '}';
    }
}
```



MyRectangle

```java
package com.yixihan.day1017.Polymorphism.exer.test3;

/**
 * @author yixihan
 */
public class MyRectangle extends GeometricObject{

    /**
     * 宽
     */
    private double width;

    /**
     * 高
     */
    private double height;


    /**
     * 无参构造
     */
    public MyRectangle() { }


    /**
     * 全参构造
     * @param color 颜色
     * @param weight 重量
     * @param width 宽
     * @param height 高
     */
    public MyRectangle(String color, double weight, double width, double height) {
        super(color, weight);
        this.width = width;
        this.height = height;
    }

    @Override
    public double findArea() {
        return width * height;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    @Override
    public String toString() {
        return "MyRectangle{" +
                "color='" + color + '\'' +
                ", weight=" + weight +
                ", width=" + width +
                ", height=" + height +
                '}';
    }
}
```



Test

```java
package com.yixihan.day1017.Polymorphism.exer.test3;

/**
 * 定义三个类，父类GeometricObject代表几何形状，子类Circle代表圆形，MyRectangle代表矩形。
 * 定义一个测试类GeometricTest，编写 equalsArea 方法测试两个对象的面积是否相等（注意方法的参数类型，利用动态绑定技术），
 * 编写 displayGeometricObject 方法显示对象的面积（注意方法的参数类型，利用动态绑定技术）
 *
 * @author yixihan
 */
public class GeometricTest {

    public static void main(String[] args) {

        GeometricTest test = new GeometricTest();

        Circle circle1 = new Circle("white", 2.5, 3);
        Circle circle2 = new Circle("white", 2.5, 3);
        MyRectangle rectangle = new MyRectangle("black", 3.5, 4, 5);

        test.displayGeometricObject(circle1);
        test.displayGeometricObject(rectangle);
        System.out.println("两个面积是否相等 : " + test.equalsArea(circle1, circle2));
    }


    /**
     * 比较两个对象的面积是否相等
     * @param g1 对象 A
     * @param g2 对象 B
     * @return true : 面积相等; false : 面积不相等
     */
    public boolean equalsArea (GeometricObject g1, GeometricObject g2) {
        return g1.findArea() == g2.findArea();
    }


    /**
     * 显示对象的面积
     * @param geometricObject 对象
     */
    public void  displayGeometricObject (GeometricObject geometricObject) {
        System.out.println("面积为 : " + geometricObject.findArea());
    }
}
```



##### 笔试题 

```java
package com.yixihan.day1017.Polymorphism.exer;
/**
 * 考查多态的笔试题目：
 *
 * @author yixihan
 */
public class InterviewTest {

    public static void main(String[] args) {
        Base base = new Sub();
        // sub_1
        base.add(1, 2, 3);

      Sub s = (Sub)base;
      // sub_2
      s.add(1,2,3);
    }
}

class Base {
    public void add(int a, int... arr) {
        System.out.println("base");
    }
}

class Sub extends Base {

    @Override
    public void add(int a, int[] arr) {
        System.out.println("sub_1");
    }

    public void add(int a, int b, int c) {
        System.out.println("sub_2");
    }

}
```



### 小结 : 方法的重载与重写

 

- 二者的定义细节：略

- 从编译和运行的角度看

  - 重载，是指允许存在多个同名方法，而这些方法的参数不同。编译器根据方法不 同的参数表，对同名方法的名称做修饰。对于编译器而言，这些同名方法就成了 不同的方法。**它们的调用地址在编译期就绑定了**。Java的重载是可以包括父类 和子类的，即子类可以重载父类的同名不同参数的方法。
  - 所以：对于重载而言，在方法调用之前，编译器就已经确定了所要调用的方法， 这称为“==早绑定==”或“==静态绑定==”；

  

  - 而对于多态，只有等到方法调用的那一刻，解释运行器才会确定所要调用的具体 方法，这称为“==晚绑定==”或“==动态绑定==”。



小结 :==不要犯傻，如果它不是晚绑定，它就不是多态==



### 区分方法的重写与重载

1. 二者的概念

   1.  重载 : 在同一个类中，允许存在一个以上的同名方法，只要它们的参数个数或者参数 类型不同即可
   2.  重写 : 在子类中可以根据需要对从父类中继承来的方法进行改造，也称 为方法的重置、覆盖。在程序执行时，子类的方法将覆盖父类的方法

2. 重载和重写的具体规则

   1. 重载 : 

      1. 

   2. 重写 : 

      1. 方法的声明 : 权限修饰符 返回值类型 方法名 (形参列表) throw 异常的类型{

         ​								方法体

         ​						}

         约定俗称 : 子类中的叫重写的方法, 父类中的叫被重写的方法

      2. 子类中重写的方法的方法名和形参列表与父类被重写的方法的方法名和形参列表必须一样

      3. 子类中重写的方法的权限修饰符不小于父类被重写的方法的权限修饰符

         ​	特殊情况 : 子类不能重写父类中权限修饰符为 private 的方法

      4. 返回值类型 :

         1.  如果父类被重写的方法的返回值类型是 void, 则子类中重写的方法的返回值类型只能是 void
         2.  如果父类被重写的方法的返回值类型是 A 类, 则子类中重写的方法的返回值类型可以是 A 类或者 A 的子类
         3.  如果父类被重写的方法的返回值类型是基本数据类型, 则子类中重写的方法的返回值类型必须是相同的基本数据类型
         4.  子类中重写的方法抛出的异常类型不大于父类被重写的方法抛出的异常类型

      5. 子类和父类中的同名同参数方法, 要么都声明为 非 static (考虑重写), 要么都声明为 static (不是重写)

3. 从多态性上看 : 

   1.  重载 : 不表现为多态性
   2.  重写 : 表现为多态性

4. 从编译和运行角度上看 :

   1.  重载在方法调用之前, 编译器就已经确定了要调用的方法, 称之为 "早绑定" 或者 "静态绑定"
   2.  重写只有等到方法调用的那一刻, 解释运行器才会确定所要调用的具体方法, 称之为 "晚绑定" 或者 "动态绑定"



### Object 类的使用



#### 简介

- Object类是所有Java类的根父类

- 如果在类的声明中未使用extends关键字指明其父类，则默认父类 为java.lang.Object类



```java
public class Person {
...
}
等价于：
public class Person extends Object {
...
}

```



#### Object类的使用

![image-20211017172219881](JavaSE2.assets/image-20211017172219881.png)



#### == 操作符与 equals () 方法

- equals()：所有类都继承了Object，也就获得了equals()方法。还可以重写
  - 只能比较引用类型，其作用与“==”相同,比较是否指向同一个对象
  - 格式:obj1.equals(obj2)
- 特例：当用equals()方法进行比较时，对类File、String、Date及包装类 （Wrapper Class）来说，是比较类型及内容而不考虑引用的是否是同一个对 象；
  - **原因：在这些类中重写了Object类的equals()方法。**
- 当自定义使用equals()时，可以重写。用于比较两个对象的“内容”是否都 相等



> 重写equals()方法的原则
>
> 

- ==对称性==：如果x.equals(y)返回是“true” ，那么y.equals(x)也应该返回是 “true”。
- ==自反性==：x.equals(x)必须返回是“true”。
- ==传递性==：如果x.equals(y)返回是“true” ，而且y.equals(z)返回是“true” ， 那么z.equals(x)也应该返回是“true”
- ==一致性==：如果x.equals(y)返回是“true” ，只要x和y内容一直不变，不管你 重复x.equals(y)多少次，返回都是“true”。
- 任何情况下，x.equals(null)，永远返回是“false” 
-  x.equals(和x不同类型的对象)永远返回是“false”。



##### 面试题 : == 操作符与 equals () 方法的区别



- == 既可以比较基本类型也可以比较引用类型。对于基本类型就是比较值，对于引用类型 就是比较内存地址
- equals的话，它是属于java.lang.Object类里面的方法，如果该方法没有被重写过默认也 是==;我们可以看到String等类的equals方法是被重写过的，而且String类在日常开发中 用的比较多，久而久之，形成了equals是比较值的错误观点。
- 具体要看自定义类里有没有重写Object的equals方法来判断。
- 通常情况下，重写equals方法，会比较类中的相应属性是否都相等



```java
package com.yixihan.day1017.objectstudy;

/**
 * 面试题 : == 和 equals () 的区别
 *
 * 一. 回顾 == 的使用 :
 *      == : 运算符
 *          1. 可以使用在 基本数据类型变量 和 引用数据变量 中
 *          2. 如果比较的基本数据类型变量 : 比较两个变量保存的数据是否相等 (不一定类型要相同)
 *          3. 如果比较的引用数据类型变量 : 比较两个变量保存的地址值是否相等, 即两个引用是否指向同一个对象实体
 *
 *      补充 : == 符号使用时, 必须保证两边数据类型一致
 *
 * 二. equals () 方法的使用 :
 *      1. 是一个方法, 而非运算符
 *      2. 只能适用于引用数据类型
 *      3. Object 类中 equals () 的定义 :
 *          public boolean equals(Object obj) {
 *              return (this == obj);
 *          }
 *          说明 : Object 类中定义的 equals () 方法和 == 的作用是相同的, 比较两个对象的地址值是否相等
 *
 *      4. 像 String Date File 包装类等都重写了 Object 类中的 equals () 方法
 *          重写以后, 比较的不是两个引用的地址是否相同, 而是比较两个对象的 "实体内容" 是否相同
 *
 *
 *      5. 通常情况下, 我们自定义类如果使用 equals () 的话, 也通常是比较两个对象的 "实体内容" 是否相同
 *          那么, 我们就不需要对 Object 类中的 equals () 方法进行重写
 *
 *
 * 三. == 和 equals () 的区别
 *
 * @author yixihan
 */
public class EqualsTest {

    public static void main(String[] args) {


        int i = 10;
        int j = 10;
        double d = 10.0;

        // true
        System.out.println(i == j);
        // true
        System.out.println(i == d);

        boolean b = true;
        // System.out.println(i == b);

        char c = 10;
        // true
        System.out.println(i == c);

        System.out.println("***************************************");

        Customer c1 = new Customer("Tom", 21);
        Customer c2 = new Customer("Tom", 21);
        // false
        System.out.println(c1 == c2);
        // false ( 使用的是 Object 类中的 equals)
        System.out.println(c1.equals(c2));


        String str1 = new String("yixihan");
        String str2 = new String("yixihan");
        // false
        System.out.println(str1 == str2);
        // true
        System.out.println(str1.equals(str2));

    }

}

```



##### 重写 equals () 方法 



 alt + ins, 选择 equals () 和 hashcode ()



```java
package com.yixihan.day1017.objectstudy;

import java.util.Objects;

/**
 * @author yixihan
 */
public class Customer {

    private String name;
    private int age;

    public Customer() { }

    public Customer(String name, int age) {
        this.name = name;
        this.age = age;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Customer)) {
            return false;
        }
        Customer customer = (Customer) o;
        return getAge() == customer.getAge() && getName().equals(customer.getName());
    }



    @Override
    public String toString() {
        return "Customer{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```



##### 练习



###### 练习1



Order

```java
package com.yixihan.day1017.objectstudy.exer.test1;

import java.util.Objects;

/**
 * @author yixihan
 */
public class Order {

    private int orderId;

    private String orderName;


    public Order() { }

    public Order(int orderId) {
        this.orderId = orderId;
    }

    public Order(String orderName) {
        this.orderName = orderName;
    }

    public Order(int orderId, String orderName) {
        this.orderId = orderId;
        this.orderName = orderName;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public String getOrderName() {
        return orderName;
    }

    public void setOrderName(String orderName) {
        this.orderName = orderName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        Order order = (Order) o;
        // 注意 : 不能用 orderName == order.orderName 
        return orderId == order.orderId && orderName.equals(order.orderName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, orderName);
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderId=" + orderId +
                ", orderName='" + orderName + '\'' +
                '}';
    }
}
```



Test

```java
package com.yixihan.day1017.objectstudy.exer.test1;

/**
 * 编写Order类，有int型的orderId，String型的orderName，相应的getter()和setter()方法，两个参数的构造器，
 * 重写父类的equals()方法：public boolean equals(Object obj)，并判断测试类中创建的两个对象是否相等
 *
 * @author yixihan
 */
public class OrderTest {

    public static void main(String[] args) {

        Order order1 = new Order(4, "易曦翰");
        Order order2 = new Order(4, "易曦翰");
        Order order3 = new Order(4, "花开亦花散");

        System.out.println(order1.equals(order2));
        System.out.println(order1.equals(order3));
    }

}
```



###### 练习2



MyDate

```java
package com.yixihan.day1017.objectstudy.exer.test2;

import java.util.Objects;

/**
 * @author yixihan
 */
public class MyDate {

    private int year;

    private int mouth;

    private int day;

    public MyDate() { }

    public MyDate(int year, int mouth, int day) {
        this.year = year;
        this.mouth = mouth;
        this.day = day;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMouth() {
        return mouth;
    }

    public void setMouth(int mouth) {
        this.mouth = mouth;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MyDate)) {
            return false;
        }
        MyDate myDate = (MyDate) o;
        return year == myDate.year && mouth == myDate.mouth && day == myDate.day;
    }

    @Override
    public int hashCode() {
        return Objects.hash(year, mouth, day);
    }

    @Override
    public String toString() {
        return "MyDate{" +
                "year=" + year +
                ", mouth=" + mouth +
                ", day=" + day +
                '}';
    }
}
```



MyDateTest

```java
package com.yixihan.day1017.objectstudy.exer.test2;

/**
 * 请根据以下代码自行定义能满足需要的MyDate类,在MyDate类中覆盖equals方法，
 * 使其判断当两个MyDate类型对象的年月日都相同时，结果为true，否则为false。
 * public boolean equals(Object o)
 *
 * @author yixihan
 */
public class MyDateTest {

    public static void main(String[] args) {

        MyDate date1 = new MyDate(2001, 6, 17);
        MyDate date2 = new MyDate(2001, 6, 17);
        MyDate date3 = new MyDate(1949, 10, 1);

        System.out.println(date1.equals(date2));
        System.out.println(date1.equals(date3));
    }
}
```



#### toString



##### 简介

toString()方法在Object类中定义，其返回值是String类型，返回类名和它 的引用地址。



- 在进行String与其它类型数据的连接操作时，自动调用toString()方法

```java
Date now=new Date();
System.out.println(“now=”+now); 相当于
System.out.println(“now=”+now.toString());
```



- 可以根据需要在用户自定义类型中重写toString()方法 如String 类重写了toString()方法，返回字符串的值。

```java
s1=“hello”;
System.out.println(s1);//相当于System.out.println(s1.toString());
```



- 基本类型数据转换为String类型时，调用了对应包装类的toString()方法

```java
int a=10; 
System.out.println(“a=”+a);
```



##### 练习



###### 练习1



GeometricObject

```java
package com.yixihan.day1017.objectstudy.exer.test3;

import java.util.Objects;

/**
 * @author yixihan
 */
public class GeometricObject {

    /**
     * 颜色
     */
    protected String color;

    /**
     * 重量
     */
    protected double weight;


    /**
     * 无参构造
     */
    public GeometricObject() { }


    /**
     * 全参构造
     * @param color 颜色
     * @param weight 重量
     */
    public GeometricObject(String color, double weight) {
        this.color = color;
        this.weight = weight;
    }


    /**
     * 求面积
     * @return 面积
     */
    public double findArea () {
        return 0.0;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
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
        if (!(o instanceof GeometricObject)) {
            return false;
        }
        GeometricObject that = (GeometricObject) o;
        return Double.compare(that.getWeight(), getWeight()) == 0 && Objects.equals(getColor(), that.getColor());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getColor(), getWeight());
    }

    @Override
    public String toString() {
        return "GeometricObject{" +
                "color='" + color + '\'' +
                ", weight=" + weight +
                '}';
    }
}
```



Circle

```java
package com.yixihan.day1017.objectstudy.exer.test3;

import java.util.Objects;

/**
 * @author yixihan
 */
public class Circle extends GeometricObject {

    /**
     * 半径
     */
    private double radius;


    /**
     * 无参构造
     */
    public Circle() {
        super("white", 1.0);
        this.radius = 1.0;
    }


    /**
     * 有参构造 (仅子类属性)
     * @param radius 半径
     */
    public Circle(double radius) {
        super("white", 1.0);
        this.radius = radius;
    }

    /**
     * 全参构造
     * @param color 颜色
     * @param weight 重量
     * @param radius 半径
     */
    public Circle(String color, double weight, double radius) {
        super(color, weight);
        this.radius = radius;
    }

    /**
     * 求圆的面积
     * @return 圆的面积
     */
    @Override
    public double findArea() {
        return radius * radius * Math.PI;
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Circle)) {
            return false;
        }
        if (!super.equals(o)) {
            return false;
        }
        Circle circle = (Circle) o;
        return Double.compare(circle.getRadius(), getRadius()) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), getRadius());
    }

    @Override
    public String toString() {
        return "Circle{" +
                "radius=" + radius +
                ", color='" + color + '\'' +
                ", weight=" + weight +
                '}';
    }
}
```



CircleTest

```java
package com.yixihan.day1017.objectstudy.exer.test3;

/**
 * @author yixihan
 */
class CircleTest {

    public static void main(String[] args) {

        Circle circle1 = new Circle();
        Circle circle2 = new Circle();

        if (circle1.getColor().equals(circle2.getColor())) {
            System.out.println("两个圆的颜色相等");
        } else {
            System.out.println("两个圆的颜色不相等");
        }

        if (circle1.getRadius() == (circle2.getRadius())) {
            System.out.println("两个圆的半径相等");
        } else {
            System.out.println("两个圆的半径不相等");
        }

        System.out.println(circle1.toString());
        System.out.println(circle2.toString());

    }
}
```



###### 面试题



```java
package com.yixihan.day1017.objectstudy.exer.test3;

/**
 * 面试题
 *
 * @author yixihan
 */
public class InstanceTest {

    public static void main(String[] args) {
        test();
    }

    public static void test() {
        char[] arr = new char[] { 'a', 'b', 'c' };
        // abc
        System.out.println(arr);
        int[] arr1 = new int[] { 1, 2, 3 };
        // 地址值
        System.out.println(arr1);
        double[] arr2 = new double[] { 1.1, 2.2, 3.3 };
        // 地址值
        System.out.println(arr2);
    }
}
```



### 单元测试



导入步骤 : 随便建个类, 写个 @Test 然后根据提示导入就行

![image-20211017181006842](JavaSE2.assets/image-20211017181006842.png)

```java
package com.yixihan.day1017.unittesting;


import com.yixihan.day1017.objectstudy.Customer;
import org.junit.Test;

/**
 * Java 中的 Junit 单元测试
 *
 * 1. 步骤 : 随便建个类, 写个 @Test 然后根据提示导入就行
 *
 *
 * 2. 创建 Java 类, 进行单元测试
 *      此时的 Java 类要求
 *          1. 此类是 public 的
 *          2. 此类提供公共的无参构造器
 *
 *
 * 3. 此类中声明单元测试方法
 *      此时的单元测试方法
 *          1. 方法的权限是 public
 *          2. 方法没有返回值
 *          3. 方法没有形参
 *          4. 次单元测试方法上需要声明注解 : @Test, 并在单元测试类中导入 import org.junit.Test;
 *
 *
 * 4. 声明好单元测试方法以后, 就可以在方法体内测试相关的代码
 *
 *
 * 5. 写完代码之后, 直接点击方法名那行左边的启动键就可以启动了
 *
 *
 * 说明 : 如果执行结果没有任何异常 : 绿条
 *       如果执行结果出现了异常 : 红条
 * @author yixihan
 */
public class JunitTest {

    int num = 10;

    @Test
    public void test1 () {
        System.out.println("hello");
    }

    @Test
    public void equalsTest () {
        String str1 = "妹妹";
        String str2 = "妹妹";

        System.out.println(str1.equals(str2));

    }

    public void show () {
        System.out.println(num);
        System.out.println("show () ...");
    }

    @Test
    public void toStringTest () {

        Customer customer = new Customer("妹妹", 18);

        System.out.println(customer.toString());
    }


}
```



### 包装类的使用 (Wrapper)



#### 简介

针对八种基本数据类型定义相应的引用类型—包装类（封装类）

有了类的特点，就可以调用类中的方法，Java才是真正的面向对象



![image-20211017181934799](JavaSE2.assets/image-20211017181934799.png)



- 基本数据类型包装成包装类的实例 ---装箱

  - 通过包装类的构造器实现：

  ```java
  int i = 500; 
  Integer t = new Integer(i);
  ```

  

  - 还可以通过字符串参数构造包装类对象

  ```java
  Float f = new Float(“4.56”);
  Long l = new Long(“asdf”); //NumberFormatException
  ```

  

- 获得包装类对象中包装的基本类型变量 ---拆箱

  - 调用包装类的.xxxValue()方法：

  ```java
  boolean b = bObj.booleanValue();
  ```



-  JDK1.5之后，支持自动装箱，自动拆箱。但类型必须匹配



> 字符串转换成基本数据类型

- 通过包装类的构造器实现：

```java
int i = new Integer(“12”);
```



- 通过包装类的parseXxx(String s)静态方法：

```java
Float f = Float.parseFloat(“12.1”);
```



> 基本数据类型转换成字符串

- 调用字符串重载的valueOf()方法

```java
String fstr = String.valueOf(2.34f);
```



- 更直接的方式：

```java
String intStr = 5 + “”
```



#### 总结 : 基本类型、包装类与String类间的转换

![image-20211017182250196](JavaSE2.assets/image-20211017182250196.png)



```java
package com.yixihan.day1017.wrapper;

import org.junit.Test;

/**
 * 包装类的使用
 *      1. Java 提供了 8 中 基本数据类型对应的 包装类, 使得基本数据类型的变量具有类的特征
 *
 *      2. 掌握的 : 基本数据类型 包装类 String 三者之类的相互转化
 *
 * @author yixihan
 */
public class WrapperTest {


    /**
     * 基本数据类型 ---> 包装类 : 调用包装类的构造器
     */
    @Test
    public void test1 () {
        int num1 = 10;
        // System.out.println(num1.toString);

        Integer in1 = new Integer(num1);
        // 10
        System.out.println(in1.toString());

        Integer in2 = new Integer("123");
        // 123
        System.out.println(in2.toString());

        System.out.println("*********************************");

        // 错误
        // Integer in3 = new Integer("123abc");
        // System.out.println(in3.toString());

        Float f1 = new Float(12.3f);
        Float f2 = new Float(12.3);
        // 12.3
        System.out.println(f1);
        // 12.3
        System.out.println(f2);

        System.out.println("*********************************");

        Boolean b1 = new Boolean(true);
        Boolean b2 = new Boolean("true");
        Boolean b3 = new Boolean("true123");
        // true
        System.out.println(b1);
        // true
        System.out.println(b2);
        // false
        System.out.println(b3);

        System.out.println("*********************************");

        Order order = new Order();
        // false
        System.out.println(order.isMale);
        // true
        System.out.println(order.isFemale);
    }


    /**
     * 包装类 ---> 基本数据类型 : 调用包装类的 xxxValue ()
     */
    @Test
    public void test2 () {

        Integer in1 = new Integer(12);
        int i1 = in1.intValue();
        // 13
        System.out.println(i1 + 1);

        System.out.println("******************************");

        Float f1 = new Float(12.3);
        float f2 = f1.floatValue();
        // 12.3
        System.out.println(f2);
    }



    public void method (Object obj) {
        System.out.println(obj);
    }


    /**
     * JDK 5.0 新特性 : 自动装箱 与 自动拆箱
     */
    @Test
    public void test3 () {
        int num1 = 10;

        // 自动装箱
        method(num1);

        // 手动装箱
        Integer in1 = new Integer(num1);
        method(in1);

        // 自动装箱
        int num2 = 10;
        Integer in2 = num2;

        boolean b1 = true;
        Boolean b2 = b1;

        //*****************************************

        System.out.println(in1.toString());

        // 自动拆箱
        int num3 = in1;

        // 自动拆箱
        boolean b3 = b2;
    }


    /**
     * 基本数据类型 包装类 ---> String 类型 : 调用String 重载的 valueOf (xxx, xxx)
     */
    @Test
    public void test4 () {
        int num1 = 10;
        // String str1 = num1;
        // 方式一 : 连接运算
        String str1 = num1 + "";
        System.out.println(str1);

        // 方式二 :
        float f1= 12.3f;
        String str2 = String.valueOf(f1);
        System.out.println(str2);

        Double d1 = new Double(12.4);
        String str3 = String.valueOf(d1);
        System.out.println(str3);

    }


    /**
     * String 类型 ---> 基本数据类型 包装类 : 调用包装类的 parseXxx (String str)
     *
     * 可能会报 NumberFormatException 异常, 需要注意
     */
    @Test
    public void test5 () {
        String str1 = "132";
        // 强转不可以 没有子父类的关系
        // int num1 = (int) str1;
        // Integer in1 = (Integer) str1;

        int i1 = Integer.parseInt(str1);
        System.out.println(i1);

        System.out.println("*************************");

        String str2 = "true";
        boolean b1 = Boolean.parseBoolean(str2);
        // true
        System.out.println(b1);

        String str3 = "true1";
        boolean b2 = Boolean.parseBoolean(str3);
        // false
        System.out.println(b2);


    }

}

class Order {
    boolean isMale;
    Boolean isFemale;
}
```



#### 练习



##### 面试题

```java
package com.yixihan.day1017.wrapper.exer.test1;

import org.junit.Test;

/**
 * @author yixihan
 */
public class InstanceTest {


    /*
    如下两个题目输出结果相同吗？各是什么：
    */
    @Test
    public void test1 () {
        // Integer 和 Double 会统一成为一个类型 (三元运算符特性)
        Object o1 = true ? new Integer(1) : new Double(2.0);

        // 1.0
        System.out.println(o1);
    }

    @Test
    public void test2 () {
        Object o2;
        if (true) {
            o2 = new Integer(1);
        } else {
            o2 = new Double(2.0);
        }

        // 1
        System.out.println(o2);
    }

    @Test
    public void test3() {
        Integer i = new Integer(1);
        Integer j = new Integer(1);

        // false
        System.out.println(i == j);

        Integer m = 1;
        Integer n = 1;

        // true
        System.out.println(m == n);



        /*
        IntegerCache 缓存的原因 Integer 声明的时候 , -128 - 127 不需要 new, 直接从 IntegerCache 拿就行

        Integer 内部定义了 IntegerCache, IntegerCache 中定义了 Integer[], 保存了 -128 - 127范围内的整数
        如果我们使用自动装箱的方式, 给 Integer 赋值的范围 在 Integer[] 数组范围之内, 就可以直接使用数据中的元素
        而不需要去 new 了, 而在这个范围之外的数, 则需要去 new ,所有下面输出 false
         */

        // 相当于 new 了一个 Integer 对象
        Integer x = 128;
        Integer y = 128;

        // false
        System.out.println(x == y);
    }


    @Test
    public void test4() {
        Integer i = new Integer(1);
        Integer j = new Integer(1);

        // true
        System.out.println(i.equals(j));

        Integer m = 1;
        Integer n = 1;

        // true
        System.out.println(m.equals(n));

        Integer x = 128;
        Integer y = 128;


        // true
        System.out.println(x.equals(y));
    }


}

```





##### 练习2



```java
package com.yixihan.day1017.wrapper.exer.test2;

import org.junit.Test;

import java.util.Scanner;
import java.util.Vector;

/**
 * 利用Vector代替数组处理：从键盘读入学生成绩（以负数代表输入结束），找出最高分，并输出学生成绩等级。
 * 提示：数组一旦创建，长度就固定不变，所以在创建数组前就需要知道它的长度。而向量类java.util.Vector可以根据需要动态伸缩。
 * 创建Vector对象：Vector v=new Vector();
 * 给向量添加元素：v.addElement(Object obj); //obj必须是对象
 * 取出向量中的元素：Object obj=v.elementAt(0);
 * 注意第一个元素的下标是0，返回值是Object类型的。
 * 计算向量的长度：v.size();
 * 若与最高分相差10分内：A等；20分内：B等；
 * 30分内：C等；其它：D等
 *
 * @author yixihan
 */
public class ScoreTest {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        Vector<Integer> vector = new Vector<>();

        while (true) {
            System.out.println("请输入学生成绩 (当输入的是负数的时候表示输入结束):");
            int score = sc.nextInt();

            if (score < 0) {
                break;
            }
            vector.addElement(score);
        }

        int max = vector.get(0);
        for (Integer integer : vector) {
            if (max < integer) {
                max = integer;
            }
        }

        for (int i = 0; i < vector.size(); i++) {
            String  level;
            if (max - vector.get(i) <= 10) {
                level = "A";
            } else if (max - vector.get(i) <= 20) {
                level = "B";
            } else if (max - vector.get(i) <= 30) {
                level = "C";
            } else {
                level = "D";
            }

            System.out.println("student - " + i + " score is " + vector.get(i) + " ,level is " + level);
        }


    }
}
```



### static 关键字



#### 简介

当我们编写一个类时，其实就是在描述其对象的属性和行为，而并没有产生实质上 的对象，只有通过new关键字才会产生出对象，这时系统才会分配内存空间给对象， 其方法才可以供外部调用



> static 关键字用处

我们有时候希望无论是否产生了对象或无论产生了多少 对象的情况下，==某些特定的数据在内存空间里只有一份==

例如 : 所有的中国人都有个 国家名称，每一个中国人都共享这个国家名称，不必在每一个中国人的实例对象中 都单独分配一个用于代表国家名称的变量。



> 使用范围

- 在Java类中，可用static修饰属性、方法、代码块、内部类



> 被修饰后的成员具备以下特点

- 随着类的加载而加载
- 优先于对象存在
- 修饰的成员，被所有对象所共享
- 访问权限允许时，可不创建对象，直接被类调用



#### 类属性、类方法的设计思想

- 类属性作为该类各个对象之间共享的变量。在设计类时,分析哪 些属性==不因对象的不同而改变==，将这些属性设置为类属性。相应 的方法设置为类方法。
- 如果方法与调用者无关，则这样的方法通常被声明为类方法，由 于==不需要创建对象就可以调用类方法==，从而简化了方法的调用



#### 内存图解

![image-20211019140053507](JavaSE2.assets/image-20211019140053507.png)

![image-20211019135606852](JavaSE2.assets/image-20211019135606852.png)



```java
package com.yixihan.day1018.statictest;

/**
 * static 关键字的使用
 *
 * 1. static : 静态的
 *
 *
 * 2. static 可以用来修饰 : 属性 方法 代码块 内部类
 *
 *
 * 3. static 修饰属性 : 静态变量 (类变量)
 *      1. 属性 : 按是否使用 static 修饰, 又分为 : 静态属性 (类变量) vs 非静态属性 (实例变量)
 *         实例变量 : 我们创建了一个类的多个对象, 每个对象都独立拥有一套类中的非静态属性,
 *         当修改了其中一个对象中的非静态属性时, 不会导致其他对象中同样的属性值的修改
 *
 *         静态变量 : 我们创建了一个类的多个对象, 多个对象共享同一个静态变量,
 *         当通过某一个对象修改静态变量时, 会导致其他对象调用次静态变量时, 是修改过了的
 *
 *      2. static 修饰属性的其他说明 :
 *          1. 静态变量随着类的加载而加载, 可以通过 "类.静态变量" 的方式进行调用
 *          2. 静态变量的加载要早于对象的创建
 *          3. 由于类只加载一次, 则静态变量在内存中也会只存在一份 : 存在方法区的静态域中
 *
 *          4.          类变量         实例变量
 *          类           yes           no
 *          对象         yes           yes
 *
 *      3. 静态属性举例 : System.out Math.PI ...
 *
 *
 * 4. static 修饰方法 :
 *      1. 随着类的加载而加载, 可以通过 "类.静态方法" 的方式进行调用
 *      2. 可以通过 "对象.静态方法" 的方式进行调用, 但是不推荐
 *      3.          静态方法        非静态方法
 *         类        yes            no
 *         对象      yes            yes
 *
 *      4. 静态方法中, 只能调用静态的方法或属性
 *         非静态方法中, 既可以调用静态的方法或属性, 也可以调用非静态的方法或属性
 *
 *
 * 5. static 注意点 :
 *      1. 在静态方法中, 不能使用 this super 关键字
 *      2. 在静态方法中, 不能调用非静态的方法, 属性
 *      3. 关于静态方法和静态变量的使用, 都可以从生命周期去解释
 *
 *
 * 6. 总结 :
 *      1. 在开发中, 如何确定一个属性是否要声明为 static ?
 *          1. 属性是可以被多个对象所共享的, 不会随着对象的不同而不同的
 *
 *      2. 在开发中, 如何确定一个方法是否要声明为 static ?
 *          1. 操作静态属性的方法, 通常设置为 static
 *          2. 工具类中的方法, 习惯上声明为 static 的, 比如 Math Arrays Collections
 *
 * @author yixihan
 */
public class StaticTest {

    public static void main(String[] args) {


        Chinese.setNation("中国");
        Chinese.show();

        // ps : 不应该通过类实例访问静态成员, 而是通过 "类.静态变量" 访问静态成员
        Chinese c1 = new Chinese();
        System.out.println(c1.getNation());
        c1.setAge(40);
        c1.setName("姚明");
        c1.setNation("CHN");
        c1.eat();
        c1.show();

        Chinese c2 = new Chinese();
        c2.setAge(30);
        c2.setName("张继科");

        System.out.println(c1.getNation());
        c2.setNation("CHINA");
        System.out.println(c1.getNation());

        // 不能调用 (编译不通过)
        // Chinese.setName("马龙");
        // Chinese.eat();

    }
}

/**
 * 中国人
 */
class Chinese {

    private String name;
    private int age;
    private static String nation;

    public Chinese() { }

    public Chinese(String name, int age) {
        this.name = name;
        this.age = age;
    }

    /**
     * Chinese.nation √ <br>
     * this.nation x
     */
    public void eat () {
        // 能调用静态的结构
        System.out.println(name + " 吃 " + Chinese.nation + " 菜");
        show();
    }

    public static void show () {
        // 不能调用非静态的结构
        System.out.println("我是 " + nation + " 人!");
        // 无法从 static 上下文引用非 static 方法 'getName()'
        // System.out.println(getName() +  "是 " + nation + " 人!");
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

    public static String getNation() {
        return nation;
    }

    public static void setNation(String nation) {
        Chinese.nation = nation;
    }

}
```



#### 练习



##### 练习1



ArrayUtils

```java
package com.yixihan.day1018.statictest.exer.test1;

/**
 * 自定义数组工具类
 *
 * @author yixihan
 */
public class ArrayUtils {


    /**
     * 求数组的最大值
     * @param arr 数组
     * @return max
     */
    public static int getMax (int[] arr) {

        int max = arr[0];

        for (int j : arr) {
            if (max < j) {
                max = j;
            }
        }
        return max;
    }


    /**
     * 求数组的最小值
     * @param arr 数组
     * @return min
     */
    public static int getMin (int[] arr) {

        int min = arr[0];

        for (int j : arr) {
            if (min > j) {
                min = j;
            }
        }
        return min;
    }


    /**
     * 求数组的总和
     * @param arr 数组
     * @return sum
     */
    public static int getSum (int[] arr) {

        int sum = 0;

        for (int j : arr) {
            sum += j;
        }

        return sum;
    }


    /**
     * 求数组的平均值
     * @param arr 数组
     * @return average
     */
    public static int getAverage (int[] arr) {

        int sum = 0;


        for (int j : arr) {
            sum += j;
        }

        return sum / arr.length;
    }


    /**
     * 反转数组
     * @param arr 数组
     */
    public static void reverse (int[] arr) {

        for (int i = 0, j = arr.length - 1; i < j; i++, j--) {
            swap(arr, i, j);
        }

    }


    /**
     * 复制数组
     * @param arr 数组
     * @return 新数组
     */
    public static int[] copy (int[] arr) {

        int[] copyArr = new int[arr.length];

        for (int i = 0; i < arr.length; i++) {
            copyArr[i] = arr[i];
        }

        return copyArr;
    }


    /**
     * 数组排序 升序
     * @param arr 数组
     */
    public static void sortAsc (int[] arr) {

        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    swap(arr, j, j + 1);
                }
             }
        }
    }


    /**
     * 数组排序 降序
     * @param arr 数组
     */
    public static void sortDesc (int[] arr) {

        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] < arr[j + 1]) {
                    swap(arr, j, j + 1);
                }
            }
        }
    }


    /**
     * 遍历数组
     * @param arr 数组
     */
    public static void printf (int[] arr) {

        for (int i : arr) {
            System.out.print(i + "\t");
        }

        System.out.println();
    }


    /**
     * 查找指定元素
     * @param arr 数组
     * @param dest 指定元素
     * @return 元素下标
     */
    public static int search (int[] arr, int dest) {

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == dest) {
                return i;
            }
        }

        return -1;
    }

    /**
     * 交换数组中两数的位置
     * @param data 数组
     * @param i 数字 1 的下标
     * @param j 数字 2 的下标
     */
    private static void swap (int[] data, int i, int j) {
        int temp = data[i];
        data[i] = data[j];
        data[j] = temp;
    }
}
```



Test

```java
package com.yixihan.day1018.statictest.exer.test1;

import java.util.Scanner;

/**
 * 测试 ArrayUtil
 *
 * @author yixihan
 */
public class ArrayExer {

    public static void main(String[] args) {


        Scanner sc = new Scanner(System.in);

        System.out.println("请输入数组大小");

        int[] arr = new int[sc.nextInt()];

        // 初始化数组 (随机赋值)
        for (int i = 0; i < arr.length; i++) {
            arr[i] = (int) (Math.random() * (100 - 1 + 1) + 1);
        }


        // 遍历数组
        ArrayUtils.printf(arr);

        // 获取数组最大值
        System.out.println("最大值为 : " + ArrayUtils.getMax(arr));

        // 获取数组最小值
        System.out.println("最小值为 : " + ArrayUtils.getMin(arr));

        // 获取数组总和
        System.out.println("总和为 : " + ArrayUtils.getSum(arr));

        // 获取数组平均值
        System.out.println("平均值为 : " + ArrayUtils.getAverage(arr));
        System.out.println("********************************************************");

        // 给数组排序 升序
        ArrayUtils.sortAsc(arr);

        // 遍历数组
        ArrayUtils.printf(arr);
        System.out.println("********************************************************");

        // 给数组排序 降序
        ArrayUtils.sortDesc(arr);

        // 遍历数组
        ArrayUtils.printf(arr);
        System.out.println("********************************************************");

        // 反转数组
        ArrayUtils.reverse(arr);

        // 遍历数组
        ArrayUtils.printf(arr);
        System.out.println("********************************************************");

        // 查找数组中指定值
        System.out.println("请输入要查找的指定值 : ");
        int dest = sc.nextInt();
        int search = ArrayUtils.search(arr, dest);
        if (dest == -1) {
            System.out.println("抱歉, 未找到你想找的值~");
        } else {
            System.out.println("找到啦~, 你要找的值下标为 : " + search);
        }

        System.out.println("********************************************************");

        // 复制数组
        int[] arr2 = ArrayUtils.copy(arr);
        System.out.println("arr2 数组即将输出啦~");
        ArrayUtils.printf(arr2);

    }
}
```



##### 练习2



Circle

```java
package com.yixihan.day1018.statictest.exer.test2;

import java.util.Objects;

/**
 * @author yixihan
 */
public class Circle {

    /**
     * 半径
     */
    private double radius;

    /**
     * id
     */
    private int id;

    /**
     * 创建圆的总数
     */
    private static int total;

    /**
     * id初始化值
     */
    private static int init = 1001;


    /**
     * 无参构造
     * total++
     * init 赋值给 id 并 init++
     */
    public Circle() {
        total++;
        id = init++;
    }


    /**
     * 全参构造
     * @param radius 半径
     */
    public Circle(double radius) {
        this();
        this.radius = radius;
    }


    /**
     * 求圆的面积
     * @return 圆的面积
     */
    public double findArea () {
        return radius * radius * Math.PI;
    }


    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    public int getId() {
        return id;
    }

    public static int getTotal() {
        return total;
    }

    public static int getInit() {
        return init;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Circle)) {
            return false;
        }
        Circle circle = (Circle) o;
        return Double.compare(circle.radius, radius) == 0 && id == circle.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(radius, id);
    }

    @Override
    public String toString() {
        return "Circle{" +
                "radius=" + radius +
                ", id=" + id +
                ", area=" + findArea() +
                '}';
    }
}
```



Test

```java
package com.yixihan.day1018.statictest.exer.test2;

import org.junit.Test;

import java.util.Random;
import java.util.Scanner;

import static org.junit.Assert.*;

/**
 * @author yixihan
 */
public class CircleTest {

    @Test
    public void findArea() {

        Random random = new Random();

        int num = 100;

        for (int i = 0; i < num; i++) {
            Circle c = new Circle(random.nextDouble() * 100);
            System.out.println(c.toString());
        }

        System.out.println("init : " + Circle.getInit());
        System.out.println("total : " + Circle.getTotal());
    }


}
```



练习3



Account

```java
package com.yixihan.day1018.statictest.exer.test3;

import java.util.Objects;

/**
 * @author yixihan
 */
public class Account {

    /**
     * 账户
     */
    private int id;

    /**
     * 密码
     */
    private String password;

    /**
     * 余额
     */
    private double balance;

    /**
     * 利率
     */
    private static double interestRate;

    /**
     * 最小余额
     */
    private static double minMoney = 1.0;

    /**
     * 用于自动生成 id
     */
    private static int init = 1001;


    /**
     * 无参构造
     */
    public Account() {
        password = "000000";
        id = init++;
    }


    /**
     * 全参构造
     * @param password 密码
     * @param balance 余额
     */
    public Account(String password, double balance) {
        this();
        this.password = password;
        this.balance = balance;
    }


    /**
     * 有参构造 (余额)
     * @param balance 余额
     */
    public Account(double balance) {
        this();
        this.balance = balance;
    }


    public int getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public double getBalance() {
        return balance;
    }

    public static double getInterestRate() {
        return interestRate;
    }

    public static double getMinMoney() {
        return minMoney;
    }

    public static int getInit() {
        return init;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public static void setInterestRate(double interestRate) {
        Account.interestRate = interestRate;
    }

    public static void setMinMoney(double minMoney) {
        Account.minMoney = minMoney;
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
        return id == account.id && Double.compare(account.balance, balance) == 0 && Objects.equals(password, account.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, password, balance);
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", password='" + password + '\'' +
                ", balance=" + balance +
                '}';
    }
}
```



Test

```java
package com.yixihan.day1018.statictest.exer.test3;

import org.junit.Test;

/**
 * @author yixihan
 */
public class AccountTest {

    @Test
    public void test () {
        Account ac1 = new Account(489452);
        Account ac2 = new Account("123456", 5974842);

        Account.setInterestRate(0.012);
        Account.setInterestRate(100);

        System.out.println(ac1.toString());
        System.out.println(ac2.toString());

        printfInit();
        printfInterestRate();
        printfMinMoney();

    }


    @Test
    public void printfInit () {
        System.out.println("init = " + Account.getInit());
    }


    @Test
    public void printfMinMoney () {
        System.out.println("minMoney = " + Account.getMinMoney());
    }


    @Test
    public void printfInterestRate () {
        System.out.println("interestRate = " + Account.getInterestRate() * 100 + "%");
    }

}
```



### 单例 (Singleton)设计模式



#### 设计模式简介

设计模式 是**在大量的实践中总结和理论化之后优选的代码结构、编程风格、 以及解决问题的思考方式**。设计模免去我们自己再思考和摸索。就像是经典 的棋谱，不同的棋局，我们用不同的棋谱。”==套路==”



#### 23种设计模式



> 创建型模式

工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式



> 结构性模式

适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式



> 行为型模式

策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式



#### 单例设计模式简介

所谓类的单例设计模式，就是采取一定的方法保证在整个的软件系统中，对 某个类只能存在一个对象实例，并且该类只提供一个取得其对象实例的方法。 如果我们要让类在一个虚拟机中==只能产生一个对象==，我们首先必须**将类的构 造器的访问权限设置为private**，这样，就不能用new操作符在类的外部产生 类的对象了，但在类内部仍可以产生该类的对象。因为在类的外部开始还无 法得到类的对象，只能**调用该类的某个静态方法**以返回类内部创建的对象， 静态方法只能访问类中的静态成员变量，所以，**指向类内部产生的该类对象 的变量也必须定义成静态的**。



#### 饿汉式实现方法

```java
package com.yixihan.day1018.singleton;

/**
 * 单例设计模式 :
 * 1. 所谓类的单例设计模式, 就是采取一定的方法保证在整个的软件系统中, 对某个类只能存在一个对象实例
 *
 * 2. 如何实现 ?
 *      饿汉式实现方法 :
 *          1. 私有化类的构造器
 *          2. 内部创建类的对象
 *          3.提供公共的静态的方法, 返回类的对象
 *          4. 要求此对象也必须声明为静态的
 *
 *
 * 3. 区分饿汉式 和 懒汉式
 *
 *      懒汉式 :
 *          好处 :
 *              1. 延迟对象的创建
 *          坏处 :
 *              1. 懒汉式线程不安全 ---> 到多线程内容时, 再修改
 *
 *      饿汉式 :
 *          好处 :
 *              1. 饿汉式线程是安全的
 *
 *          坏处 :
 *              1. 对象加载时间过长
 *
 * @author yixihan
 */
public class SingletonTest1 {

    public static void main(String[] args) {

        // 'Bank()' 在 'com.yixihan.day1018.singleton.Bank' 中具有 private 访问权限
        // Bank bank = new Bank();

        Bank instance1 = Bank.getInstance();
        Bank instance2 = Bank.getInstance();

        System.out.println(instance1 == instance2);

    }
}

/**
 * 饿汉式
 */
class Bank {


    /**
     * 1. 私有化类的构造器
     */
    private Bank () {

    }

    /**
     * 2. 内部创建类的对象
     * 4. 要求此对象也必须声明为静态的
     */
    private static Bank instance = new Bank();


    /**
     * 3.提供公共的静态的方法, 返回类的对象
     */
    public static Bank getInstance () {
        return instance;
    }
}
```



#### 懒汉式实现方法

```java
package com.yixihan.day1018.singleton;

/**
 * 单例模式的懒汉式实现 : (目前此方法存在线程不安全的问题)
 *      1. 私有化类的构造器
 *      2. 声明当前类的对象, 没有初始化
 *      3. 声明 public static 的返回当前类的对象的方法
 *      4. 此对象也必须声明为 static
 *
 * @author yixihan
 */
public class SingletonTest2 {

    public static void main(String[] args) {

        Order instance1 = Order.getInstance();
        Order instance2 = Order.getInstance();

        System.out.println(instance1 == instance2);
    }
}

class Order {


    /**
     * 1. 私有化类的构造器
     */
    private Order () {

    }

    /**
     * 2. 声明当前类的对象, 没有初始化
     * 4. 此对象也必须声明为 static
     * 主要区别
     */
    private static Order instance = null;

    /**
     * 3. 声明 public static 的返回当前类的对象的方法
     */
    public static Order getInstance () {

        if (instance == null) {
            instance = new Order();
        }
        return instance;
    }
}
```



#### 使用场景

- 网站的计数器，一般也是单例模式实现，否则难以同步
- 应用程序的日志应用，一般都使用单例模式实现，这一般是由于共享的日志 文件一直处于打开状态，因为只能有一个实例去操作，否则内容不好追加。
- 数据库连接池的设计一般也是采用单例模式，因为数据库连接是一种数据库 资源。
- 项目中，读取配置文件的类，一般也只有一个对象。没有必要每次使用配置 文件数据，都生成一个对象去读取。
- Application 也是单例的典型应用
- Windows的Task Manager (任务管理器)就是很典型的单例模式
- Windows的Recycle Bin (回收站)也是典型的单例应用。在整个系统运行过程 中，回收站一直维护着仅有的一个实例。



### 理解main方法的语法

由于Java虚拟机需要调用类的main()方法，所以该方法的访问权限必须是 public，又因为Java虚拟机在执行main()方法时不必创建对象，所以该方法必须 是static的，该方法接收一个String类型的数组参数，该数组中保存执行Java命令 时传递给所运行的类的参数



又因为main() 方法是静态的，我们不能直接访问该类中的非静态成员，必须创 建该类的一个实例对象后，才能通过这个对象去访问类中的非静态成员，这种情 况，我们在之前的例子中多次碰到



```java
package com.yixihan.day1018.maintest;

/**
 * main () 方法的使用说明 :
 *
 * 1. main () 方法作为程序的入口
 * 2. main () 方法也是一个普通的静态方法
 * 3. main () 方法可以作为我们与控制台交互的方式 (之前 : Scanner)
 *
 *
 *
 *
 * @author yixihan
 */
public class MainTest {

    public static void main(String[] args) {
        System.out.println("hello");
        Main.main(new String[100]);
    }
}

class Main {
    public static void main(String[] args) {

        for (int a = 0; a < args.length; a++) {
            args[a] = "arg_" + a;
            System.out.println(args[a]);
        }
    }
}
```



```java
package com.yixihan.day1018.maintest;

/**
 * @author yixihan
 */
public class MainDemo {

    public static void main(String[] args) {

        for (String arg : args) {
            int score = Integer.parseInt(arg);
            System.out.println(score);
        }
    }
}
```



#### 面试题

```java
/**
 * 可以运行 (main () 方法这句话只有 args 可以被改变)
 * @author yixihan
 */
class Something {
    public static void main(String[] something_to_do) {
        System.out.println("Do something ...");
    }
}
```



### 类的成员之四 : 代码块



#### 简介

> 代码块(或初始化块)的作用

对Java类或对象进行初始化



> 代码块(或初始化块)的分类

一个类中代码块若有修饰符，则只能被static修饰，称为静态代码块 (static block)，

没有使用static修饰的，为非静态代码块



> 静态代码块和非静态代码块的不同点

![image-20211019163822119](JavaSE2.assets/image-20211019163822119.png)



#### 总结：程序中成员变量赋值的执行顺序

![image-20211019164625979](JavaSE2.assets/image-20211019164625979.png)

```java
package com.yixihan.day1018.codeblock;

/**
 *
 * 属性乐意赋值的位置 :
 *      1. 默认初始化
 *      2. 显示初始化
 *      3. 构造器中初始化
 *      4. 有了对象以后, 可以通过 "对象.属性" 或者 "对象.setXxx ()" 的方式赋值
 *      5. 在代码块中赋值
 *
 *      执行的先后顺序 1 - 2 / 5 - 3 - 4
 *
 *      2 和 5 的执行顺序, 看书写的顺序, 谁在上面, 谁先执行
 * @author yixihan
 */
public class OrderTest {

    public static void main(String[] args) {

        Order order = new Order();
        System.out.println(order.id);
        System.out.println(order.str);
    }
}

class Order {

    int id = 3;

    {
        id = 4;
    }

    

    {
        str = 4;
    }

    int str = 3;

}

```





```java
package com.yixihan.day1018.codeblock;

import com.sun.istack.internal.Nullable;

import java.util.Objects;

/**
 * 类的成员之四 : 代码块 (初始化块)
 *
 * 1. 代码块的作用 :
 *      1. 初始化当前的类或者对象
 *
 * 2. 代码块如果有修饰的话, 只能用 static
 *
 * 3. 分类 : 静态代码块 vs 非静态代码块
 *
 *
 * 4. 静态代码块 :
 *      1. 内部可以有输出语句
 *      2. 随着类的加载而执行
 *      3. 静态代码块只会执行一次, 在类的加载的时候执行一次
 *      4. 作用 :
 *          1. 初始化类的信息
 *
 *      5. 如果一个类中定义了多个代码块, 则按照声明的先后顺序执行
 *      6. 静态代码块的执行, 优先于非静态代码块的执行
 *      7. 静态代码块内只能调用静态的属性或方法, 不能调用非静态的结构
 *
 * 5. 非静态代码块 :
 *      1. 内部可以有输出语句
 *      2. 随着对象的创建而执行
 *      3. 每创建一个对象, 就执行一次非静态代码块
 *      4. 作用 :
 *          1. 可以在创建对象时, 对对象的属性等进行初始化
 *
 *      5. 如果一个类中定义了多个代码块, 则按照声明的先后顺序执行
 *      6. 非静态代码块的执行, 晚于静态代码块的执行
 *      7. 非静态代码块内静态的和非静态的结构都可以调用
 *
 *
 *
 * 属性乐意赋值的位置 :
 *      1. 默认初始化
 *      2. 显示初始化
 *      3. 构造器中初始化
 *      4. 有了对象以后, 可以通过 "对象.属性" 或者 "对象.setXxx ()" 的方式赋值
 *      5. 在代码块中赋值
 *
 * @author yixihan
 */
public class BlockTest {

    public static void main(String[] args) {

        String desc = Person.getDesc();

        Person person1 = new Person();
        Person person2 = new Person();



        Person.walk();

    }
}

class Person {

    /**
     * 属性
     */
    private String name;

    private int age;

    private static String desc = "我是一个人";


    /**
     * 构造器
     */
    public Person() { }

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }


    /**
     * 代码块
     */
    // 非 static 代码块
    {
        System.out.println("hello no static block");
        // 调用非静态结构
        eat();
        // 调用静态结构
        walk();
    }

    // static 代码块
    static {
        System.out.println("hello static block-1");
        System.out.println(desc);

    }

    static {
        // 调用静态结构
        desc = "我是一个爱学习的人";
        walk();
    }

    static {
        System.out.println("hello static block-2");
        System.out.println(desc);
    }



    /**
     * 方法
     */
    public void eat () {
        System.out.println("吃饭");
    }

    public static void walk () {
        System.out.println("走路");
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

    public static String getDesc() {
        return desc;
    }

    public static void setDesc(String desc) {
        Person.desc = desc;
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
        return age == person.age && Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```



#### 练习 

##### 练习1

```java
package com.yixihan.day1018.codeblock.exer.text1;

/**
 * 总结 : 由父及子, 静态先行
 */
class Root{

   static{
      System.out.println("Root的静态初始化块");
   }

   {
      System.out.println("Root的普通初始化块");
   }
   public Root(){
      System.out.println("Root的无参数的构造器");
   }
}

class Mid extends Root{

   static{
      System.out.println("Mid的静态初始化块");
   }

   {
      System.out.println("Mid的普通初始化块");
   }


   public Mid(){
      System.out.println("Mid的无参数的构造器");
   }


   public Mid(String msg){
      //通过this调用同一类中重载的构造器
      this();
      System.out.println("Mid的带参数构造器，其参数值："
         + msg);
   }
}

class Leaf extends Mid{

   static{
      System.out.println("Leaf的静态初始化块");
   }

   {
      System.out.println("Leaf的普通初始化块");
   }


   public Leaf(){
      //通过super调用父类中有一个字符串参数的构造器
      super("尚硅谷");
      System.out.println("Leaf的构造器");
   }
}

/**
 * @author yixihan
 */
public class LeafTest{
   public static void main(String[] args){
      new Leaf(); 
      //new Leaf();
      
      /*
      输出为 :
      
      Root的静态初始化块
      Mid的静态初始化块
      Leaf的静态初始化块
      Root的普通初始化块
      Root的无参数的构造器
      Mid的普通初始化块
      Mid的无参数的构造器
      Mid的带参数构造器，其参数值：尚硅谷
      Leaf的普通初始化块
      Leaf的构造器

       */
   }
}
```



##### 练习2

```java
package com.yixihan.day1018.codeblock.exer.text1;

/**
 *
 */
class Father {

   static {
      System.out.println("11111111111");
   }

   {
      System.out.println("22222222222");
   }


   public Father() {
      System.out.println("33333333333");

   }

}

/**
 * @author yixihan
 */
public class Son extends Father {

   static {
      System.out.println("44444444444");
   }

   {
      System.out.println("55555555555");
   }


   public Son() {
      System.out.println("66666666666");
   }


   public static void main(String[] args) { // 由父及子 静态先行
      System.out.println("77777777777");
      System.out.println("************************");
      new Son();
      System.out.println("************************");

      new Son();
      System.out.println("************************");
      new Father();

      /*
      输出为 :
      11111111111
      44444444444
      77777777777
      ************************
      22222222222
      33333333333
      55555555555
      66666666666
      ************************
      22222222222
      33333333333
      55555555555
      66666666666
      ************************
      22222222222
      33333333333
       */
   }

}
```



### final 关键字



#### 简介

在Java中声明类、变量和方法时，可使用关键字final来修饰,表示“最终的”



- final标记的类不能被继承。**提高安全性，提高程序的可读性**
  - String类、System类、StringBuffer类
- final标记的方法不能被子类重写
  - 比如：Object类中的getClass()。
- final标记的变量(成员变量或局部变量)即称为常量。名称大写，且只 能被赋值一次。
  - final标记的成员变量必须在声明时或在每个构造器中或代码块中显式赋 值，然后才能使用。
  - final double MY_PI = 3.14



```java
package com.yixihan.day1018.finaltest;

/**
 * final : 最终的
 *
 * 1. final 可以用来修饰的结构 : 类, 方法, 变量
 *
 *
 * 2. final 用来修饰一个类 : 此类不能被其他类所基础
 *         比如 : String System StringBuffer 类等
 *
 *
 * 3. final 用来修饰一个方法 : 表明此方法不可以被重写
 *          比如 : Object 类中的 getClass () 方法
 *
 *
 * 4. final 用来修饰变量 : 此时的 "变量" 就称为一个常量
 *      1. final 修饰属性 : 可以考虑赋值的位置有 :
 *          1. 显式初始化
 *          2. 代码块中初始化
 *          3. 构造器中初始化, 每个构造器中必须都有初始化, 或者用 this()
 *
 *      2. final 修饰局部变量 :
 *          1. 当使用 final 修饰形参是, 表明次形参是几个常量, 当我们调用此方法是, 给常量形参赋给一个实参, 一但赋值以后,
 *          就只能在方法体内使用此形参, 但是不能重新赋值
 *
 *
 * 5. static final
 *      用来修饰属性 : 全局常量
 *      用来修饰方法 : 静态方法, 且不能被重写 (情况很少)
 *
 * @author yixihan
 */
public class FinalTest {

    private final int WITDH = 10;

    // 变量 'length' 可能尚未初始化
    // private final int length;

    private final int LEFT;
    private final int RIGHT;
    // private final int DOWN;

    {
        LEFT = 10;
    }

    public FinalTest () {
        RIGHT = 20;
    }

    public FinalTest (int n) {
        // 方式 1 不可共存
        // this();

        // 方式 2 不可共存
        RIGHT = 20;
    }

    public void doWidth () {
        // 无法将值赋给 final 变量 'width'
        // width = 20;
    }

    public void setDOWN (int n) {
        // 无法将值赋给 final 变量 'DOWN'
        // DOWN = n;
    }

    public void show () {
        // 表示为一个常量
        final int NUM = 10;

        // NUM += 20;
    }

    public void show (final int NUM) {

        // 无法将值赋给 final 变量 'NUM'
        // NUM = 11;
        System.out.println(NUM);
    }

    public static void main(String[] args) {
        FinalTest test = new FinalTest();

        // test.setDOWN(10);
        test.show(10);

    }
}


final class FinalA { }


// 无法从final 'com.yixihan.day1018.finaltest.FinalA' 继承
//class B extends FinalA {
//
//}

class AA {

    public final void show () {
        System.out.println("AA");
    }

}

class BB extends AA {

    // 'show()' 无法重写 'com.yixihan.day1018.finaltest.AA' 中的 'show()'；重写的方法为 final
    // @Override
    // public void show () {
    //    System.out.println("BB");
    // }
}
```



#### 练习题



##### 面试题1

```java
package com.yixihan.day1018.finaltest.exer.test1;

/**
 * @author yixihan
 */
public class Something {
    public int addOne(final int x) {
        // 编译不通过
        // return ++x;
        
        // 可以运行
        return x + 1;
    }

}
```



##### 面试题2

```java
package com.yixihan.day1018.finaltest.exer.test2;

/**
 * @author yixihan
 */
public class Something {

    public static void main(String[] args) {

        Other o = new Other();
        new Something().addOne(o);

    }

    public void addOne(final Other o) {
        // 编译不通过
        // o = new Other();
        
        // 运行通过
        // o.i++;
    }
}

class Other {
    public int i;
}
```



### 抽象类与抽象方法



#### 简介 

随着继承层次中一个个新子类的定义，类变得越来越具体，而父类则更一 般，更通用。类的设计应该保证父类和子类能够共享特征。有时将一个父 类设计得非常抽象，以至于它没有具体的实例，这样的类叫做**抽象类**。



- 用abstract关键字来修饰一个类，这个类叫做抽象类
- 用abstract来修饰一个方法，该方法叫做抽象方法
  - 抽象方法：只有方法的声明，没有方法的实现。以分号结束
  - ps : public abstract void talk();
- 含有抽象方法的类必须被声明为抽象类
- 抽象类不能被实例化。抽象类是用来被继承的，抽象类的子类必须重 写父类的抽象方法，并提供方法体。若没有重写全部的抽象方法，仍 为抽象类
- ==不能用abstract修饰变量、代码块、构造器==
- ==不能用abstract修饰私有方法、静态方法、final的方法、final的类==



#### 抽象类应用

抽象类是用来模型化那些父类无法确定全部实现，而是由其子类提 供具体实现的对象的类。

![image-20211020140004788](JavaSE2.assets/image-20211020140004788.png)





```java
package com.yixihan.day1020.abstracttest;

import java.util.Objects;

/**
 *
 * abstract 关键字的使用
 *
 * 1. abstract : 抽象的
 * 2. abstract 可以用来修饰的结构 : 类 方法
 *
 *
 * 3. abstract 修饰类 : 抽象类
 *      1. 此类不能实例化
 *      2. 抽象类中一定有构造器, 便于子类实例化时调用 (涉及 : 子类对象实例化的全过程)
 *      3. 在开发中, 都会提供抽象类的子类, 让子类实例化, 完成相关的操作
 *
 *
 * 4. abstract 修饰方法 : 抽象方法
 *      1. 抽象方法, 只有方法的声明, 没有方法体
 *      2. 包含抽象方法的类, 一定是个抽象类
 *      3. 抽象类中不一定有抽象方法
 *      4. 若子类重写了父类中的所有的方法以后, 此子类方可实例化
 *      5. 若子类没有重写了父类中的所有的方法, 此子类就必须声明为抽象类
 *
 *
 * @author yixihan
 */
public class AbstractTest {

    public static void main(String[] args) {

        // 'Person' 为 abstract；无法实例化
        // 一旦 Person 类抽象了, 就不可以实例化
        // Person p1 = new Person();

        // p1.eat();

        Student student = new Student();
        student.talk();
        student.breath();
    }

}

/**
 * 生物
 */
abstract class Creature {

    /**
     * 呼吸
     */
    public abstract void breath ();
}

/**
 * 人
 */
abstract class Person extends Creature{

    /**
     * 名字
     */
    private String name;

    /**
     * 年龄
     */
    private int age;

    /**
     * 空参构造
     */
    public Person() { }


    /**
     * 全参构造
     * @param name 名字
     * @param age 年龄
     */
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }


    /**
     * walk
     */
    public void walk () {
        System.out.println("走路");
    }


    /**
     * eat
     */
    public void eat () {
        System.out.println("吃饭");
    }

    /**
     * 说话
     */
    public abstract void talk ();

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Person)) {
            return false;
        }
        Person person = (Person) o;
        return age == person.age && Objects.equals(name, person.name);
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

/**
 * 学生
 */
class Student extends Person {

    private String major;

    public Student() {
    }

    @Override
    public void talk() {
        System.out.println("学生走路");
    }

    public Student(String major) {
        this.major = major;
    }

    public Student(String name, int age, String major) {
        super(name, age);
        this.major = major;
    }

    @Override
    public void breath() {
        System.out.println("只有学生会患上肺炎");
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Student)) {
            return false;
        }
        if (!super.equals(o)) {
            return false;
        }
        Student student = (Student) o;
        return Objects.equals(major, student.major);
    }

    @Override
    public String toString() {
        return "Student{" +
                "major='" + major + '\'' +
                '}';
    }
}
```





#### 抽象类的匿名子类



实操

```java
package com.yixihan.day1020.abstracttest;

/**
 * @author yixihan
 */
public class PersonTest {

    public static void main(String[] args) {

        // 匿名对象
        method(new Student());

        Worker worker = new Worker();

        // 非匿名的类 非匿名的对象
        method1(worker);

        // 非匿名的类 匿名的对象
        method1(new Worker());

        System.out.println("********************************************");

        // 创建了一个匿名子类的对象
        Person p = new Person() {
            @Override
            public void talk() {
                System.out.println("不知道是谁在走路1");
            }

            @Override
            public void breath() {
                System.out.println("不知道是谁在呼吸1");
            }
        };
        method1(p);

        System.out.println("********************************************");
        
        // 创建匿名子类的匿名对象
        method1(new Person() {
            @Override
            public void talk() {
                System.out.println("不知道是谁在走路2");
            }

            @Override
            public void breath() {
                System.out.println("不知道是谁在呼吸2");
            }
        });
    }

    public static void method (Student student) {

    }

    public static void method1 (Person person) {
        person.talk();
        person.breath();
    }
}


class Worker extends Person {

    @Override
    public void breath() {
        System.out.println("打工人在呼吸");
    }

    @Override
    public void talk() {
        System.out.println("打工人在走路");
    }
}
```



#### 模板方法设计模式 (TemplateMethod)



抽象类体现的就是一种模板模式的设计，抽象类作为多个子类的通用模 板，子类在抽象类的基础上进行扩展、改造，但子类总体上会保留抽象 类的行为方式。



> 解决的问题

- 当功能内部一部分实现是确定的，一部分实现是不确定的。这时可以 把不确定的部分暴露出去，让子类去实现。
- 换句话说，在软件开发中实现一个算法时，整体步骤很固定、通用， 这些步骤已经在父类中写好了。但是某些部分易变，易变部分可以抽 象出来，供不同子类实现。这就是一种模板模式。



#### 练习



##### 练习1

GeometricObject

```java
package com.yixihan.day1020.abstracttest.exer.test1;

import java.util.Objects;

/**
 * @author yixihan
 */
public abstract class GeometricObject {

    /**
     * 颜色
     */
    protected String color;

    /**
     * 重量
     */
    protected double weight;


    /**
     * 无参构造
     */
    public GeometricObject() { }


    /**
     * 全参构造
     * @param color 颜色
     * @param weight 重量
     */
    public GeometricObject(String color, double weight) {
        this.color = color;
        this.weight = weight;
    }


    /**
     * 求面积
     * @return 面积
     */
    public abstract double findArea ();

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
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
        if (!(o instanceof GeometricObject)) {
            return false;
        }
        GeometricObject that = (GeometricObject) o;
        return Double.compare(that.getWeight(), getWeight()) == 0 && Objects.equals(getColor(), that.getColor());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getColor(), getWeight());
    }

    @Override
    public String toString() {
        return "GeometricObject{" +
                "color='" + color + '\'' +
                ", weight=" + weight +
                '}';
    }
}
```



Circle

```java
package com.yixihan.day1020.abstracttest.exer.test1;

import java.util.Objects;

/**
 * @author yixihan
 */
public class Circle extends GeometricObject {

    /**
     * 半径
     */
    private double radius;


    /**
     * 无参构造
     */
    public Circle() {
        super("white", 1.0);
        this.radius = 1.0;
    }


    /**
     * 有参构造 (仅子类属性)
     * @param radius 半径
     */
    public Circle(double radius) {
        super("white", 1.0);
        this.radius = radius;
    }

    /**
     * 全参构造
     * @param color 颜色
     * @param weight 重量
     * @param radius 半径
     */
    public Circle(String color, double weight, double radius) {
        super(color, weight);
        this.radius = radius;
    }

    /**
     * 求圆的面积
     * @return 圆的面积
     */
    @Override
    public double findArea() {
        return radius * radius * Math.PI;
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Circle)) {
            return false;
        }
        if (!super.equals(o)) {
            return false;
        }
        Circle circle = (Circle) o;
        return Double.compare(circle.getRadius(), getRadius()) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), getRadius());
    }

    @Override
    public String toString() {
        return "Circle{" +
                "radius=" + radius +
                ", color='" + color + '\'' +
                ", weight=" + weight +
                '}';
    }
}
```



Test

```java
package com.yixihan.day1020.abstracttest.exer.test1;

/**
 * @author yixihan
 */
class CircleTest {

    public static void main(String[] args) {

        Circle circle1 = new Circle();
        Circle circle2 = new Circle();

        if (circle1.getColor().equals(circle2.getColor())) {
            System.out.println("两个圆的颜色相等");
        } else {
            System.out.println("两个圆的颜色不相等");
        }

        if (circle1.getRadius() == (circle2.getRadius())) {
            System.out.println("两个圆的半径相等");
        } else {
            System.out.println("两个圆的半径不相等");
        }

        System.out.println(circle1.toString());
        System.out.println(circle2.toString());

    }
}
```



##### 练习2



Employee

```java
package com.yixihan.day1020.abstracttest.exer.test2;

/**
 *
 * 编写一个Employee类，声明为抽象类，
 * 包含如下三个属性：name，id，salary。
 * 提供必要的构造器和抽象方法：work()。
 * 对于 Manager 类来说，他既是员工，还具有奖金( bonus )的属性。
 * 请使用继承的思想，设计 CommonEmployee 类和Manager类，要求类
 * 中提供必要的方法进行属性访问。
 * @author yixihan
 */
public abstract class Employee {

    private String name;
    private int id;
    private double salary;

    public Employee() { }



    public Employee(String name, int id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }

    /**
     * 工作
     */
    public abstract void work ();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }
}
```



Manager

```java
package com.yixihan.day1020.abstracttest.exer.test2;

import java.util.Objects;

/**
 * @author yixihan
 */
public class Manager extends Employee{

    private double bonus;

    public Manager() { }

    public Manager(double bonus) {
        this.bonus = bonus;
    }

    public Manager(String name, int id, double salary, double bonus) {
        super(name, id, salary);
        this.bonus = bonus;
    }

    @Override
    public void work() {
        System.out.println("管理员工, 提高公司的运行效率");
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
        if (!(o instanceof Manager)) {
            return false;
        }
        Manager manager = (Manager) o;
        return Double.compare(manager.getBonus(), getBonus()) == 0;
    }

    @Override
    public int hashCode() {
        return Objects.hash(getBonus());
    }

    @Override
    public String toString() {
        return "Manager{" +
                "bonus=" + bonus +
                '}';
    }
}
```



CommonEmployee

```java
package com.yixihan.day1020.abstracttest.exer.test2;

/**
 * @author yixihan
 */
public class CommonEmployee extends Employee{

    public CommonEmployee() {
    }

    public CommonEmployee(String name, int id, double salary) {
        super(name, id, salary);
    }



    @Override
    public void work() {
        System.out.println("苦命打工人");
    }
}
```



Test

```java
package com.yixihan.day1020.abstracttest.exer.test2;

import org.junit.Test;

import static org.junit.Assert.*;

/**
 * @author yixihan
 */
public class EmployeeTest {

    @Test
    public void test1 () {

        Manager manager = new Manager("库克", 1001, 1000000, 200000);

        manager.work();
    }

    @Test
    public void test2 () {
        Employee employee = new CommonEmployee("农民工", 1000, 0);

        employee.work();
    }

}
```



##### 练习3



```java
package com.yixihan.day1020.abstracttest.exer.test3;

import java.util.Objects;

/**
 *
 * （1）定义一个Employee类，该类包含：
 * private成员变量name,number,birthday，其中birthday 为MyDate类的对象；
 * abstract方法earnings()；
 * toString()方法输出对象的name,number和birthday。
 * @author yixihan
 */
public abstract class Employee {

    private String name;

    private int number;

    private MyDate birthday;

    public Employee() { }

    public Employee(String name, int number, MyDate birthday) {
        this.name = name;
        this.number = number;
        this.birthday = birthday;
    }

    /**
     * 月工资
     * @return 工资
     */
    public abstract double earning ();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public MyDate getBirthday() {
        return birthday;
    }

    public void setBirthday(MyDate birthday) {
        this.birthday = birthday;
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
        return number == employee.number && Objects.equals(name, employee.name) && Objects.equals(birthday, employee.birthday);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, number, birthday);
    }

    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", number=" + number +
                ", birthday=" + birthday +
                '}';
    }
}
```



```java
package com.yixihan.day1020.abstracttest.exer.test3;

import java.util.Objects;

/**
 *
 * （2）MyDate类包含:
 * private成员变量year,month,day ；
 * toDateString()方法返回日期对应的字符串：xxxx年xx月xx日
 *
 * @author yixihan
 */
public class MyDate {

    /**
     * 年
     */
    private int year;

    /**
     * 月
     */
    private int month;

    /**
     * 日
     */
    private int day;


    /**
     * 无参构造
     */
    public MyDate() { }


    /**
     * 全参构造
     * @param year 年
     * @param month 月
     * @param day 日
     */
    public MyDate(int year, int month, int day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MyDate)) {
            return false;
        }
        MyDate myDate = (MyDate) o;
        return month == myDate.month;
    }

    @Override
    public int hashCode() {
        return Objects.hash(year, month, day);
    }

    @Override
    public String toString() {
        return "您的生日是 " + year + " 年 " + month + " 月 " + day + " 日";
    }
}
```



```java
package com.yixihan.day1020.abstracttest.exer.test3;

/**
 *
 * 定义SalariedEmployee类继承Employee类，实现按月计算工资的员工处
 * 理。该类包括：private成员变量 monthlySalary；
 * 实现父类的抽象方法earnings(),该方法返回monthlySalary值；toString()方法输
 * 出员工类型信息及员工的 name，number,birthday。
 * @author yixihan
 */
public class SalariedEmployee extends Employee{

    private double monthlySalary;


    /**
     * 无参构造
     */
    public SalariedEmployee() { }

    /**
     * 全参构造
     * @param name 姓名
     * @param number 编号
     * @param birthday 生日
     * @param monthlySalary 工资
     */
    public SalariedEmployee(String name, int number, MyDate birthday, double monthlySalary) {
        super(name, number, birthday);
        this.monthlySalary = monthlySalary;
    }

    @Override
    public double earning() {
        return monthlySalary;
    }

    public double getMonthlySalary() {
        return monthlySalary;
    }

    public void setMonthlySalary(double monthlySalary) {
        this.monthlySalary = monthlySalary;
    }

    @Override
    public String toString() {
        return "SalariedEmployee{" +
                "name = " + getName() +
                " , number = " + getNumber() +
                " , birthday = " + getBirthday() +
                " , monthlySalary = " + getMonthlySalary() +
                '}';
    }
}
```



```java
package com.yixihan.day1020.abstracttest.exer.test3;

import java.util.Objects;

/**
 * 参照SalariedEmployee类定义HourlyEmployee类，实现按小时计算工资的
 * 员工处理。该类包括：
 * private成员变量wage和hour；
 * 实现父类的抽象方法earnings(),该方法返回wage*hour值；
 *
 * @author yixihan
 */
public class HourlyEmployee extends Employee{

    /**
     * 单位小时的工资
     */
    private double wage;

    /**
     * 月工作的小时数
     */
    private int hour;


    /**
     * 无参构造
     */
    public HourlyEmployee() { }


    /**
     * 全参构造
     * @param name 姓名
     * @param number 编号
     * @param birthday 生日
     * @param wage 单位小时的工资
     * @param hour 月工作的小时数
     */
    public HourlyEmployee(String name, int number, MyDate birthday, double wage, int hour) {
        super(name, number, birthday);
        this.wage = wage;
        this.hour = hour;
    }

    @Override
    public double earning() {
        return wage * hour;
    }

    public double getWage() {
        return wage;
    }

    public void setWage(double wage) {
        this.wage = wage;
    }

    public int getHour() {
        return hour;
    }

    public void setHour(int hour) {
        this.hour = hour;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HourlyEmployee)) {
            return false;
        }
        if (!super.equals(o)) {
            return false;
        }
        HourlyEmployee that = (HourlyEmployee) o;
        return Double.compare(that.wage, wage) == 0 && hour == that.hour;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), wage, hour);
    }

    @Override
    public String toString() {
        return "HourlyEmployee{" +
                "name = " + getName() +
                " , number = " + getNumber() +
                " , birthday = " + getBirthday() +
                ", hour =" + getHour() +
                ", wage =" + getWage() +
                ", earn =" + earning() +
                '}';
    }
}
```



```java
package com.yixihan.day1020.abstracttest.exer.test3;

import java.util.Random;
import java.util.Scanner;

/**
 * @author yixihan
 */
public abstract class PayrollSystem extends Employee{



    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        Employee[] employees = new Employee[sc.nextInt()];

        Random random = new Random();

        for (int i = 0; i < employees.length; i++) {

            if (i % 2 == 0) {
                employees[i] = new SalariedEmployee("张" + i, i, new MyDate(2001, 6, i),20000 );
            } else {
                employees[i] = new HourlyEmployee("王" + i, i, new MyDate(2002, 7, i), 100, 200);
            }
        }

        System.out.println("输入当前月份");
        MyDate nowMonth = new MyDate(0, sc.nextInt(), 0);

        for (Employee employee : employees) {

            double salary = 0;

            if (nowMonth.equals(employee.getBirthday())) {
                salary = employee.earning() + 100;
            } else {
                salary = employee.earning();
            }
            System.out.println(employee);
            System.out.println("工资 : " + salary);
        }
    }
}
```



### 接口 (interface)



#### 简介

接口(interface)是抽象方法和常量值定义的集合



- 一方面，有时必须从几个类中派生出一个子类，继承它们所有的属性和方 法。但是，Java不支持多重继承。有了接口，就可以得到多重继承的效果
- 另一方面，有时必须从几个类中抽取出一些共同的行为特征，而它们之间又 没有is-a的关系，仅仅是具有相同的行为特征而已。例如：鼠标、键盘、打 印机、扫描仪、摄像头、充电器、MP3机、手机、数码相机、移动硬盘等都 支持USB连接
- 接口就是规范，定义的是一组规则，体现了现实世界中“如果你是/要...则 必须能...”的思想。==继承是一个"是不是"的关系，而接口实现则是 "能不能" 的关系。==
- ==接口的本质是契约，标准，规范==，就像我们的法律一样。制定好后大家都 要遵守。



> 特点

- 用interface来定义
- 接口中的所有成员变量都默认是由public static final修饰的
- 接口中的所有抽象方法都默认是由public abstract修饰的
- ==接口中没有构造器==
- 接口采用多继承机制



>接口定义举例



```java
public interface Runner {
    int ID = 1;
    void start();
    public void run();
    void stop();
}

// 等同于

public interface Runner {
    public static final int ID = 1;
    public abstract void start();
    public abstract void run();
    public abstract void stop();
}

```



> 书写规范

* 定义Java类的语法格式：先写extends，后写implements
  *  class SubClass extends SuperClass implements InterfaceA{ } 
*  一个类可以实现多个接口，接口也可以继承其它接口。
* 实现接口的类中必须提供接口中所有方法的具体实现内容，方可实 例化。否则，仍为抽象类。
* 接口的主要用途就是被实现类实现。==（面向接口编程）==
*  与继承关系类似，接口与实现类之间存在多态性 
* 接口和类是并列关系，或者可以理解为一种特殊的类。从本质上讲， 接口是一种特殊的抽象类，这种抽象类中==只包含常量和方法的定义 (JDK7.0及之前)==，而没有变量和方法的实现。



```java
package com.yixihan.day1020.interfacetest;


/**
 *
 * 接口的使用 :
 *      1. 接口使用 interface
 *
 *      2. 在 Java 中, 接口 和 类 是并列的两个结构
 *
 *      3. 如果定义接口 : 定义接口中的成员
 *
 *          1. JDK7及以前 : 只能定义全局常量和抽象方法
 *                  1. 全局常量 : public static final 的, 但是书写时可以省略不写, 编译之后仍是存在的, 只是省略了(懒)
 *                  2. 抽象方法 : public abstract 的
 *
 *          2. JDK8及以后 : 除了定义全局常量和抽象方法之外, 还可以定义静态方法, 默认方法
 *
 *      4. 接口中不能定义构造器, 意味着接口不可以实例化
 *
 *      5. 在 java 开发中, 接口通过让类去实现 (implements) 的方式来使用
 *          如果实现类覆盖了接口中的所有抽象方法, 则此实现类就可以实例化
 *          如果实现类没有覆盖了接口中的所有抽象方法, 则此实现类仍为抽象类
 *
 *      6. Java 类可以实现多个接口 ---> 弥补了 Java 单继承的局限性
 *         格式 : class A extends B implements C, D, E {
 *
 *              }
 *
 *      7. 接口与接口之间可以继承, 且可以多继承
 *
 * ****************************************************************************
 *      8. 接口的使用, 体现多态性
 *
 *      9. 接口实际上可以看做是一种规范
 *
 *
 *
 * 面试题 : 抽象类和接口有哪些异同 ?
 *
 * @author yixihan
 */
public class InterfaceTest {

    public static void main(String[] args) {

        System.out.println(Flyable.MAX_SPEED);
        System.out.println(Flyable.MIN_SPEED);
        // Flyable.MAX_SPEED = 500;
    }
}

/**
 * 飞
 */
interface Flyable {

    // 全局常量
    /**
     * 第一宇宙速度 (最快速度)
     */
    int MAX_SPEED = 7900;

    /**
     * 最慢速度
     */
    int MIN_SPEED = 1;


    // 抽象方法
    /**
     * 飞
     */
    void fly ();

    /**
     * 停止飞
     */
    void stop ();
}

/**
 * 攻击性
 */
interface AttackAble {

    /**
     * 攻击
     */
    void attack ();
}


class Plane implements Flyable {

    @Override
    public void fly() {
        System.out.println("通过引擎起飞");
    }

    @Override
    public void stop() {
        System.out.println("驾驶员减速停止");
    }
}


abstract class Kite implements Flyable {

    @Override
    public void fly() {
        System.out.println("通过拍动翅膀起飞");
    }
}

class Bullet extends Object implements Flyable, AttackAble, C {

    @Override
    public void fly() {
        System.out.println("通过弹出飞行");
    }

    @Override
    public void stop() {
        System.out.println("动能没了就停");
    }

    @Override
    public void attack() {
        System.out.println("具有巨大的伤害性");
    }

    @Override
    public void method1() {

    }

    @Override
    public void method2() {

    }
}


//***************************************

interface A {
    /**
     * 方法一
     */
    void method1 ();
}

interface B {
    /**
     * 方法二
     */
    void method2 ();
}

interface C extends A, B {
    @Override
    void method1();

    @Override
    void method2();
}
```



#### 接口的使用



```java
package com.yixihan.day1020.interfacetest;

/**
 * 接口的使用
 *
 * 1. 接口在使用上体现了多态性
 *
 * 2. 实际上接口就是定义了一种规范
 *
 * 3. 开发中, 体会面向接口编程
 *
 * @author yixihan
 */
public class USBTest {

    public static void main(String[] args) {

        System.out.println("USB.LENGTH : " + USB.LENGTH);
        System.out.println("USB.WIDTH : " + USB.WIDTH);

        Computer computer = new Computer();

        // 1. 创建了接口的非匿名实现类的非匿名对象
        Flash flash = new Flash();
        computer.transferDate(flash);

        System.out.println("***************************************");

        // 2. 创建了接口的非匿名实现类的匿名对象
        computer.transferDate(new Printer());

        System.out.println("***************************************");

        USB phone = new USB() {
            @Override
            public void start() {
                System.out.println("手机开启工作");
            }

            @Override
            public void stop() {
                System.out.println("手机结束工作");
            }
        };
        computer.transferDate(phone);

        System.out.println("***************************************");

        // 4. 创建了接口的匿名实现类的匿名对象
        computer.transferDate(new USB() {
            @Override
            public void start() {
                System.out.println("未知事物开启工作");
            }

            @Override
            public void stop() {
                System.out.println("未知事物结束工作");
            }
        });
    }
}

interface USB {

    int LENGTH = 10;
    int WIDTH = 2;

    /**
     * 开启
     */
    void start ();

    /**
     * 终止
     */
    void stop ();
}

class Flash implements USB {

    @Override
    public void start() {
        System.out.println("U盘开启工作");
    }

    @Override
    public void stop() {
        System.out.println("U盘结束工作");
    }
}

class Printer implements USB {

    @Override
    public void start() {
        System.out.println("打印机开启工作");
    }

    @Override
    public void stop() {
        System.out.println("打印机结束工作");
    }
}

class Computer {

    public void transferDate (USB usb) {

        usb.start();

        System.out.println("具体细节");

        usb.stop();
    }
}
```





#### 代理模式 (Proxy)

> 简介

代理模式是Java开发中使用较多的一种设计模式。代理设计就是为其 他对象提供一种代理以控制对这个对象的访问。



> 应用场景

- 安全代理：屏蔽对真实角色的直接访问
- 远程代理：通过代理类处理远程方法调用（RMI）
- 延迟加载：先加载轻量级的代理对象，真正需要再加载真实对象 比如你要开发一个大文档查看软件，大文档中有大的图片，有可能一个图片有 100MB，在打开文件时，不可能将所有的图片都显示出来，这样就可以使用代理 模式，当需要查看图片时，用proxy来进行大图片的打开



> 分类

- 静态代理（静态定义代理类）
- 动态代理（动态生成代理类）
  - JDK自带的动态代理，需要反射等知识



```java
package com.yixihan.day1020.proxy;

/**
 * 接口的应用 : 代理模式
 */
public class NetWorkTest {

    public static void main(String[] args) {

        Server server = new Server();

        ProxyServer proxyServer = new ProxyServer(server);

        proxyServer.browse();
    }
}

interface NetWork {

    void browse ();
}

/**
 * 被代理类
 */
class Server implements NetWork {

    @Override
    public void browse() {

        System.out.println("真实的服务器来访问网络");
    }
}

/**
 * 代理类
 */
class ProxyServer implements NetWork {

    private NetWork work;

    public ProxyServer() { }

    public ProxyServer(NetWork work) {
        this.work = work;
    }

    public void check () {
        System.out.println("联网之前的检查工作");
    }

    @Override
    public void browse() {
        check();

        work.browse();

    }

    public NetWork getWork() {
        return work;
    }

    public void setWork(NetWork work) {
        this.work = work;
    }
} 
```



##### 举例



```java
package com.yixihan.day1020.proxy;

public class StaticProxyTest {

   public static void main(String[] args) {
      Star s = new Proxy(new RealStar());
      s.confer();
      s.signContract();
      s.bookTicket();
      s.sing();
      s.collectMoney();
   }
}

interface Star {
   void confer();// 面谈

   void signContract();// 签合同

   void bookTicket();// 订票

   void sing();// 唱歌

   void collectMoney();// 收钱
}

class RealStar implements Star {

   public void confer() {
   }

   public void signContract() {
   }

   public void bookTicket() {
   }

   public void sing() {
      System.out.println("明星：歌唱~~~");
   }

   public void collectMoney() {
   }
}

class Proxy implements Star {
   private Star real;

   public Proxy(Star real) {
      this.real = real;
   }

   public void confer() {
      System.out.println("经纪人面谈");
   }

   public void signContract() {
      System.out.println("经纪人签合同");
   }

   public void bookTicket() {
      System.out.println("经纪人订票");
   }

   public void sing() {
      real.sing();
   }

   public void collectMoney() {
      System.out.println("经纪人收钱");
   }
}
```



#### 工厂模式





#### 接口和抽象类之间的对比

![image-20211020193659816](JavaSE2.assets/image-20211020193659816.png)





#### 练习 



##### 面试题1



```java
package com.yixihan.day1020.exer.test1;


interface A {
    int x = 0;
    int x1 = 2;
}
class B {
    int x = 1;
    int x2 = 3;
}
public class C extends B implements A {
    public void pX() {
        // 对 'x' 的引用不明确，'B.x' 和 'A.x' 均匹配
        // System.out.println(x);
        System.out.println(A.x);
        System.out.println(super.x);
        System.out.println(x1);
        System.out.println(x2);
    }
    public static void main(String[] args) {
        new C().pX();
    }
}
```



##### 面试题2



```java
package com.yixihan.day1020.exer.test1;

public class Ball implements Rollable{
    
    private String name;

    @Override
    public void play() {
        // 无法将值赋给 final 变量 'ball'
        // ball = new Ball("Football");
        System.out.println(ball.getName());
    }

    public String getName() {
        return name;
    }
    public Ball(String name) {
        this.name = name;
    }
}

interface Playable {
    void play();
}
interface Bounceable {
    void play();
}
interface Rollable extends Playable,
        Bounceable {
    Ball ball = new Ball("PingPang");
}
```



##### 练习题1



CompareObject

```java
package com.yixihan.day1020.exer.test2;

/**
 *
 * 定义一个接口用来实现两个对象的比较。
 * interface CompareObject{
 * public int compareTo(Object o); //若返回值是 0 , 代表相等; 若为正数，代表当
 * 前对象大；负数代表当前对象小
 * }
 *
 * @author yixihan
 */
public interface CompareObject {

    /**
     * 比较大小
     * @param o 比较的对象
     * @return 若返回值是 0 , 代表相等; 若为正数，代表当前对象大；负数代表当前对象小
     */
    int compareTo(Object o);
}
```



Circle

```java
package com.yixihan.day1020.exer.test2;

/**
 * 定义一个Circle类，声明redius属性，提供getter和setter方法
 *
 * @author yixihan
 */
public class Circle {

    private Double radius;

    public Circle() { }

    public Circle(Double radius) {
        this.radius = radius;
    }

    public Double getRadius() {
        return radius;
    }

    public void setRadius(Double radius) {
        this.radius = radius;
    }

    @Override
    public String toString() {
        return "Circle{" +
                "radius=" + radius +
                '}';
    }
}
```



ComparableCircle

```java
package com.yixihan.day1020.exer.test2;

/**
 * 定义一个ComparableCircle类，继承Circle类并且实现CompareObject接口。在
 * ComparableCircle类中给出接口中方法compareTo的实现体，用来比较两个圆的半
 * 径大小。
 *
 * @author yixihan
 */
public class ComparableCircle extends Circle implements  CompareObject{

    public ComparableCircle() { }

    public ComparableCircle(Double radius) {
        super(radius);
    }

    @Override
    public int compareTo(Object o) {
        if (this == o) {
            return 0;
        }
        if (o instanceof ComparableCircle) {
            ComparableCircle circle = (ComparableCircle) o;

            // 当属性 radius 声明为 Double 类型时, 可以调用包装类的方法;
            return getRadius().compareTo(circle.getRadius());

            // 方式二
            /*if (getRadius() - circle.getRadius() > 0) {
                return 1;
            } else if (getRadius() - circle.getRadius() < 0) {
                return -1;
            } else {
                return 0;
            }*/
        } else {
            // return 0;
            throw new RuntimeException("传入的数据类型不匹配");
        }
    }


}
```



InterfaceTest

```java
package com.yixihan.day1020.exer.test2;

import org.junit.Test;

import java.util.Date;

/**
 * 定义一个测试类InterfaceTest，创建两个ComparableCircle对象，调用compareTo
 * 方法比较两个类的半径大小。
 */
public class InterfaceTest {

    @Test
    public void test () {
        ComparableCircle circle1 = new ComparableCircle(3.4);
        ComparableCircle circle2 = new ComparableCircle(3.4);
        ComparableCircle circle3 = new ComparableCircle(3.0);
        Date date = new Date();

        printfResult(circle1.compareTo(circle2));

        System.out.println("******************");

        printfResult(circle1.compareTo(circle3));

        System.out.println("******************");

        printfResult(circle1.compareTo(date));
    }

    public void printfResult (int compareValue) {
        if (compareValue > 0) {
            System.out.println("c1 对象大");
        } else if (compareValue < 0){
            System.out.println("c1 对象小");
        } else {
            System.out.println("两个对象一样大");
        }
    }
}
```



#### jdk8 接口新特性

Java 8中，你可以为接口添加静态方法和默认方法。从技术角度来说，这是完 全合法的，只是它看起来违反了接口作为一个抽象定义的理念。



> 静态方法

使用 ==static== 关键字修饰。==可以通过接口直接调用静态方法==，并执行 其方法体。我们经常在相互一起使用的类中使用静态方法。你可以在标准库中 找到像Collection/Collections或者Path/Paths这样成对的接口和类



> 默认方法

默认方法使用 ==default== 关键字修饰。可以通过实现类对象来调用。 我们在已有的接口中提供新方法的同时，还保持了与旧版本代码的兼容性。 比如：java 8 API中对Collection、List、Comparator等接口提供了丰富的默认 方法。



##### 接口中的默认方法

- 若一个接口中定义了一个默认方法，而另外一个接口中也定义了一个同名同 参数的方法（不管此方法是否是默认方法），在实现类同时实现了这两个接 口时，会出现：==接口冲突==。
  - 解决办法：实现类必须覆盖接口中同名同参数的方法，来解决冲突
- 若一个接口中定义了一个默认方法，而父类中也定义了一个同名同参数的非 抽象方法，则不会出现冲突问题。因为此时遵守：==类优先原则==。接口中具有 相同名称和参数的默认方法会被忽略



```java
package com.yixihan.day1020.jdk8;

/**
 * JDK8及以后 : 除了定义全局常量和抽象方法之外, 还可以定义静态方法, 默认方法
 *
 * @author yixihan
 */
public interface CompareA {

    // 静态方法
    /**
     * 方法一
     */
    static void method1 () {
        System.out.println("哇哦, 真尼玛帅 : static");
    }

    // 默认方法
    /**
     * 方法二
     */
    default void method2 () {
        System.out.println("哇哦, 真尼玛帅 : default");
    }

    default void method3 () {
        System.out.println("哇哦, 真尼玛帅 : CompareA");
    }
}
```



```java
package com.yixihan.day1020.jdk8;

public interface CompareB {


    default void method3 () {
        System.out.println("哇哦, 我好几把帅 : compareB");
    }
}
```



```java
package com.yixihan.day1020.jdk8;

public class SuperClass {

    public void method3 () {
        System.out.println("SuperClass : method3");
    }
}
```



```java
package com.yixihan.day1020.jdk8;

/**
 *
 * 1. 接口中定义的静态方法, 只能通过接口来调用
 * 2. 通过实现类的对象, 可以调用接口中的静态方法
 *      如果实现类重写了接口中的默认方法, 调用时, 仍然调用的是重写以后的方法
 *
 * 3. 如果实现类(或子类)继承的父类和实现的接口中声明了同名同参数的默认方法
 *    那么子类在没有重写此方法的情况下, 默认调用的是父类中的同名同参的方法 --- 类优先原则
 *
 * 4. 如果实现类实现了多个接口, 而这多个接口中定义了同名同参数的默认方法
 *    那么子类在没有重写此方法的情况下, 会编译不通过 --- 接口冲突
 *    这就需要我们必须在接口类中重写此方法
 *
 * 5. 如何在子类(或实现类)的方法中调用接口里的默认方法
 * @author yixihan
 */
public class SubClassTest {

    public static void main(String[] args) {

        SubClass subClass = new SubClass();

        subClass.method3();

        subClass.method2();

        //只能在包含接口类时调用 static 方法
        //subClass.method1();

        // 只能在包含接口类时调用 static 方法
        // SubClass.method1();

        CompareA.method1();

        System.out.println("***********************");

        SubClass1 subClass1 = new SubClass1();

        subClass.method3();

    }
}


class SubClass extends SuperClass implements CompareA, CompareB{

    @Override
    public void method2() {
        System.out.println("哇哦, 我重写了耶! : default");
    }

    @Override
    public void method3() {
        System.out.println("被我重写啦");
    }

    public void myMethod () {
        // 调用自己定义的重写的方法
        method3();

        // 调用父类的方法
        super.method3();

        // 调用接口的默认方法
        CompareA.super.method3();

        CompareB.super.method3();

    }
}

// com.yixihan.day1020.jdk8.SubClass1 从类型 com.yixihan.day1020.jdk8.CompareA 和 com.yixihan.day1020.jdk8.CompareB 继承 method3() 的不相关默认值
class SubClass1 implements CompareA, CompareB{

    @Override
    public void method2() {
        System.out.println("哇哦, 我重写了耶! : default");
    }

    @Override
    public void method3() {
        System.out.println("被我重写啦");
    }

}

// 这样就不会报错
class SubClass2 extends SuperClass implements CompareA, CompareB{

    @Override
    public void method2() {
        System.out.println("哇哦, 我重写了耶! : default");
    }

}
```



##### 练习

```java
package com.yixihan.day1020.jdk8.exer.test1;

import org.junit.Test;

class Man  implements Filial, Spoony{


    @Override
    public void help() {
        System.out.println("媳妇儿算个屁, 快去救妈");
    }
}

interface Filial {// 孝顺的
    default void help() {
        System.out.println("老妈，我来救你了");
    }
}

interface Spoony {// 痴情的
    default void help() {
        System.out.println("媳妇，别怕，我来了");
    }
}

class Father {
    public void help (){
        System.out.println("儿子, 救我媳妇儿");
    }
}

public class HelpTest {

    @Test
    public void test1 () {
        Man man = new Man();
        man.help();
    }
}
```



### 类的部成员之五： 内部类



#### 简介

- 当一个事物的内部，还有一个部分需要一个完整的结构进行描述，而这个内 部的完整的结构又只为外部事物提供服务，那么整个内部的完整结构最好使 用内部类。
- 在Java中，允许一个类的定义位于另一个类的内部，前者称为**内部类**，后者 称为**外部类**。
- Inner class一般用在定义它的类或语句块之内，在外部引用它时必须给出完 整的名称。
  - Inner class的名字不能与包含它的外部类类名相同；
- 分类
  - 成员内部类（static成员内部类和非static成员内部类）
  - 局部内部类（不谈修饰符）、匿名内部类



> 成员内部类作为类的成员的角色

- 和外部类不同，Inner class还可以声明为private或protected；
- 可以调用外部类的结构 
-  Inner class 可以声明为static的，但此时就不能再使用外层类的非static的成员 变量；



> 成员内部类作为类的角色

- 可以在内部定义属性、方法、构造器等结构 
- 可以声明为abstract类 ，因此可以被其它的内部类继承 
-  可以声明为final的 
- 编译以后生成OuterClass$InnerClass.class字节码文件（也适用于局部内部类）



> 注意

1.  非static的成员内部类中的成员不能声明为static的，只有在外部类或static的成员 内部类中才可声明static成员。 
2.  外部类访问成员内部类的成员，需要“内部类.成员”或“内部类对象.成员”的方式 
3.  成员内部类可以直接使用外部类的所有成员，包括私有的数据 
4.  当想要在外部类的静态成员部分使用内部类时，可以考虑内部类声明为静态的



#### 局部内部类



##### 如何声明局部内部类

```java
class 外部类{
    方法(){
        class 局部内部类{
        }
    }
    {
        class 局部内部类{
        }
    }
}
```



##### 如何使用局部内部类

- 只能在声明它的方法或代码块中使用，而且是先声明后使用。除此之外的任何地方 都不能使用该类 
- 但是它的对象可以通过外部方法的返回值返回使用，返回值类型只能是局部内部类 的父类或父接口类型



##### 局部内部类的特点

- 内部类仍然是一个独立的类，在编译之后内部类会被编译成独立的.class文件，但 是前面冠以外部类的类名和$符号，以及数字编号。 
-  只能在声明它的方法或代码块中使用，而且是先声明后使用。除此之外的任何地方 都不能使用该类。 
-  局部内部类可以使用外部类的成员，包括私有的。 
-  **局部内部类可以使用外部方法的局部变量，但是必须是final的**。由局部内部类和局 部变量的声明周期不同所致。 
-  局部内部类和局部变量地位类似，不能使用public,protected,缺省,private 
-  局部内部类不能使用static修饰，因此也不能包含静态成员



#### 匿名内部类

匿名内部类不能定义任何静态成员、方法和类，只能创建匿名内部类的一 个实例。一个匿名内部类一定是在new的后面，用其隐含实现一个接口或 实现一个类。



##### 如何声明匿名内部类

```java
new 父类构造器（实参列表）|实现接口(){
    //匿名内部类的类体部分
}
```



##### 匿名内部类的特点

- 匿名内部类必须继承父类或实现接口 
-  匿名内部类只能有一个对象 
-  匿名内部类对象只能使用多态形式引用



```java
package com.yixihan.day1020.innerclasstest;

/**
 *
 * 类的内部成员之五 : 内部类
 *
 * 1. Java 中允许将一个类 A 声明在另一个类 B 中, 则类 A 就是内部类, 类 B 就是外部类
 *
 * 2. 内部类的分类 : 成员内部类 (static, 非static) vs 局部内部类 (方法内, 代码块内, 构造器内)
 *
 * 3. 成员内部类 :
 *      一方面 : 作为外部内的成员
 *          1. 可以调用外部类的结构
 *          2. 可以被 static 修饰
 *          3. 可以被 4 中权限修饰符修饰
 *
 *      另一方面 : 作为一个类
 *          1. 可以定义属性, 方法, 构造器, 代码块等
 *          2. 可以被 final 修饰, 表示此类不能被继承, 言外之意, 不适用 final, 就可以被继承
 *          3. 可以被 abstract 修饰, 表示此类不能被实例化
 *
 *
 * 4. 关注如下的三个问题 :
 *      1. 如何实例化成员内部类的对象
 *      2. 如何去在成员内部类中区分调用外部类的结构
 *      3. 开发中, 局部内部类的使用
 *
 *
 * @author yixihan
 */
public class InnerClassTest {

    public static void main(String[] args) {

        // 创建 Dog 实例 (静态的成员内部类)
        Person.Dog dog = new Person.Dog();
        dog.show();

        // 创建 Bird 实例 (非静态的成员内部类)
        // 错误的 'com.yixihan.day1020.innerclasstest.Person' 不是封闭类
        // Person.Bird bird1 = new Person.Bird();
        Person person = new Person();
        Person.Bird bird = person.new Bird();
        bird.sing();
        bird.display("yixihan");
    }
}


class Person {

    private String name = "小明";
    private int age;

    // 成员内部类 (static)
    static class Dog {

        private String name;
        private int age;

        public Dog() {
        }

        public Dog(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public void show () {
            System.out.println("卡拉是条狗");
            // eat();
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

    // 成员内部类 (非static)
    class Bird {
        private String name = "杜鹃";

        public Bird() {
        }

        public Bird(String name) {
            this.name = name;
        }

        public void sing () {
            System.out.println("我是一只小小小小小鸟");
            // this.eat();
            Person.this.eat();
            walk();
        }

        public void display (String name) {
            System.out.println("形参 : " + name);
            System.out.println("内部类的属性 : " + this.name);
            System.out.println("外部类的属性 : " + Person.this.name);
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public void eat () {
        System.out.println("eat");
    }

    public void walk () {
        System.out.println("walk");
    }

    public void method () {

        // 局部内部类 (方法内)
        class AA {

        }
    }

    {
        // 局部内部类 (代码块内)
        class BB {

        }
    }

    public Person () {

        // 局部内部类 (构造方法内)
        class CC {

        }
    }
}
```



```java
package com.yixihan.day1020.innerclasstest;

/**
 * 在开发中使用内部类
 *
 * @author yixihan
 */
public class InnerClassTest1 {

    // 开发中很少见
    public void method () {

        // 局部内部类 (方法内)
        class AA {

        }
    }

    // 返回一个实现了 Comparable 接口的类的对象
    public Comparable getComparable () {

        // 创建一个实现了 Comparable 接口的类 : 局部内部类
        class MyComparable implements Comparable {

            @Override
            public int compareTo(Object o) {
                return 0;
            }
        }

        return new MyComparable();

        // 方式二
        /*return new Comparable() {
            @Override
            public int compareTo(Object o) {
                return 0;
            }
        }; */
    }
}
```



#### 补充

```java
package com.yixihan.day2021.innerclasstest;

import com.sun.glass.ui.View;

/**
 * 1. 在局部内部类的方法中 (比如 : show) 如果调用局部内部类所声明的方法 (比如 : method) 中的局部变量的话,
 *    要求此局部变量声明为 final 的
 *
 *    在 JDK 7 及之前的版本, 要求此局部变量显式声明为 final 的
 *    在 JDK 8 及之后的版本, 可以省略 final 的声明
 */
public class InnerClassTest {
    
    public void method () {

        // 局部变量
        int num = 10;

        class AA {

            
            public void show () {

                // 变量 'num' 从内部类中访问，需要为 final 或有效 final
                // num = 10;
                System.out.println(num);
            }
            
        }

    }
}
```
