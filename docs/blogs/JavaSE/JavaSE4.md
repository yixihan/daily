---
title: JavaSE4
date: 2022-03-09
tags:
 - JavaSE
categories:
 - JavaSE
---

# JavaSE



## Java 常用类



### Java 比较器



在Java中经常会涉及到对象数组的排序问题，那么就涉及到对象之间 的比较问题。



> Java实现对象排序的方式有两种：

- 自然排序：java.lang.Comparable
-  定制排序：java.util.Comparator



#### 方式一：自然排序：java.lang.Comparable



- Comparable接口强行对实现它的每个类的对象进行整体排序。这种排序被称 为类的自然排序



- 实现 Comparable 的类必须实现 compareTo(Object obj) 方法，两个对象即 通过 compareTo(Object obj) 方法的返回值来比较大小。如果当前对象this大 于形参对象obj，则返回正整数，如果当前对象this小于形参对象obj，则返回 负整数，如果当前对象this等于形参对象obj，则返回零。



- 实现Comparable接口的对象列表（和数组）可以通过 Collections.sort 或 Arrays.sort进行自动排序。实现此接口的对象可以用作有序映射中的键或有 序集合中的元素，无需指定比较器。 



- 对于类 C 的每一个 e1 和 e2 来说，当且仅当 e1.compareTo(e2) == 0 与 e1.equals(e2) 具有相同的 boolean 值时，类 C 的自然排序才叫做与 equals 一致。建议（虽然不是必需的）最好使自然排序与 equals 一致。



- Comparable 的典型实现：(默认都是从小到大排列的)
  - String：按照字符串中字符的Unicode值进行比较
  - Character：按照字符的Unicode值来进行比较
  - 数值类型对应的包装类以及BigInteger、BigDecimal：按照它们对应的数值 大小进行比较
  - Boolean：true 对应的包装类实例大于 false 对应的包装类实例
  - Date、Time等：后面的日期时间比前面的日期时间大







#### 方式二：定制排序：java.util.Comparator

- 当元素的类型没有实现java.lang.Comparable接口而又不方便修改代码， 或者实现了java.lang.Comparable接口的排序规则不适合当前的操作，那 么可以考虑使用 Comparator 的对象来排序，强行对多个对象进行整体排 序的比较。
- 重写compare(Object o1,Object o2)方法，比较o1和o2的大小：如果方法返 回正整数，则表示o1大于o2；如果返回0，表示相等；返回负整数，表示 o1小于o2
- 可以将 Comparator 传递给 sort 方法（如 Collections.sort 或 Arrays.sort）， 从而允许在排序顺序上实现精确控制。
- 还可以使用 Comparator 来控制某些数据结构（如有序 set或有序映射）的 顺序，或者为那些没有自然顺序的对象 collection 提供排序。



```java
package com.yixihan.day1024.comparetest;

import org.junit.Test;

import java.util.Arrays;
import java.util.Comparator;

/**
 * 一. 说明 : Java 中的对象, 正常情况下, 只能进行比较 : == 或者 != , 不能使用 > 或者 < 的
 *            但是在开发场景中, 我们需要对多个对象进行排序, 言外之意, 就需要比较对象的大小
 *            如何实现 ? 使用两个接口中的任何一个 : Comparable 或者 Comparator
 *
 * 二. Comparable 接口与 Comparator 接口的简单对比 :
 *      Comparable 接口的方式一旦指定, 保证 Comparable 接口实现类的对象在任何位置都可以比较大小
 *      Comparator 接口属于临时性的比较
 *
 * @author : yixihan
 * @create : 2021-10-24-15:33
 */
public class CompareTest {

    /**
     * Comparable 接口的使用举例 : 自然排序
     *      1. 像 String 包装类等实现了 Comparable 接口, 重写了 compareTo() 方法, 给出了比较两个对象大小的方式
     *      2. 像 String 包装类等实现了 Comparable 接口的 compareTo() 方法以后, 进行了从小到大的排列
     *      2. 重写 compareTo (obj) 的规则
     *          如果当前对象this大于形参对象obj，则返回正整数
     *          如果当前对象this小于形参对象obj，则返回负整数
     *          如果当前对象this等于形参对象obj，则返回零
     *
     *      4. 对于自定义类来说, 如果需要排序, 我们可以让自定义类实现 Comparable 接口, 重写 compareTo(obj) 方法
     *         在 compareTo(obj) 方法中指明如何排序
     */
    @Test
    public void test1 () {
        String[] arr = new String[]{"AA", "CC", "JJ", "MM", "DD", "BB", "ZZ", "MD", "SB", "NMSL", "JK"};


        Arrays.sort(arr);

        System.out.println(Arrays.toString(arr));
    }


    @Test
    public void test2 () {
        Goods[] goods = new Goods[5];
        goods[0] = new Goods("联想鼠标", 100);
        goods[1] = new Goods("罗技鼠标", 500);
        goods[2] = new Goods("雷蛇鼠标", 500);
        goods[3] = new Goods("玩家国度鼠标", 1000);
        goods[4] = new Goods("双飞燕鼠标", 10);

        // com.yixihan.day1024.comparetest.Goods cannot be cast to java.lang.Comparable
        Arrays.sort(goods);

        System.out.println(Arrays.toString(goods));
    }


    /**
     * Comparator 接口的使用 : 定制排序
     *
     * 1. 背景
     *      当元素的类型没有实现java.lang.Comparable接口而又不方便修改代码,
     *      或者实现了java.lang.Comparable接口的排序规则不适合当前的操作，
     *      那 么可以考虑使用 Comparator 的对象来排序，
     *
     * 2. 重写 compare(Object o1, Object o2) 方法, 比较 o1 和 o2 的大小 :
     *      如果方法返回正整数, 则表示 o1 更大
     *      如果方法返回负整数, 则表示 o2 更大
     *      如果方法返回 0, 则表示 o1 o2 一样大
     */
    @Test
    public void test3 () {
        String[] arr = new String[]{"AA", "CC", "JJ", "MM", "DD", "BB", "ZZ", "MD", "SB", "NMSL", "JK"};


        Arrays.sort(arr, new Comparator() {

            // 按照字符串从大到小的顺序排序
            @Override
            public int compare(Object o1, Object o2) {
                if (o1 instanceof String && o2 instanceof String) {
                    String s1 = (String) o1;
                    String s2 = (String) o2;

                    return -s1.compareTo(s2);
                }

                throw new RuntimeException("传入的数据类型不一致");
            }
        });

        System.out.println(Arrays.toString(arr));
    }

    @Test
    public void test4 () {
        Goods[] goods = new Goods[6];
        goods[0] = new Goods("lx联想鼠标", 100);
        goods[1] = new Goods("lj罗技鼠标", 500);
        goods[2] = new Goods("ls雷蛇鼠标", 500);
        goods[3] = new Goods("wjgd玩家国度鼠标", 1000);
        goods[4] = new Goods("sfy双飞燕鼠标", 10);
        goods[5] = new Goods("sfy双飞燕鼠标", 20);


        Arrays.sort(goods, new Comparator() {

            /**
             * 指明商品比较大小的方法 : 按照名称排序从低到高排序, 再按照价格从高到低排序
             */
            @Override
            public int compare(Object o1, Object o2) {
                if (o1 instanceof Goods && o2 instanceof Goods) {
                    Goods g1 = (Goods) o1;
                    Goods g2 = (Goods) o2;

                    if (g1.getName().equals(g2.getName())) {
                        return -Double.compare(g1.getPrice(), g2.getPrice());
                    } else {
                        return g1.getName().compareTo(g2.getName());
                    }

                }
                throw new RuntimeException("传入的数据类型不一致");
            }
        });

        System.out.println(Arrays.toString(goods));
    }
}

```



### System类

- System类代表系统，系统级的很多属性和控制方法都放置在该类的内部。 该类位于java.lang包。



- 由于该类的构造器是private的，所以无法创建该类的对象，也就是无法实 例化该类。其内部的成员变量和成员方法都是static的，所以也可以很方便 的进行调用。



- 成员变量
  - System类内部包含in、out和err三个成员变量，分别代表标准输入流 (键盘输入)，标准输出流(显示器)和标准错误输出流(显示器)



- 成员方法

  - native long currentTimeMillis()： 该方法的作用是返回当前的计算机时间，时间的表达格式为当前计算机时 间和GMT时间(格林威治时间)1970年1月1号0时0分0秒所差的毫秒数。
  - void exit(int status)： 该方法的作用是退出程序。其中status的值为0代表正常退出，非零代表 异常退出。使用该方法可以在图形界面编程中实现程序的退出功能等。
  - void gc()： 该方法的作用是请求系统进行垃圾回收。至于系统是否立刻回收，则 取决于系统中垃圾回收算法的实现以及系统执行时的情况。
  - String getProperty(String key)： 该方法的作用是获得系统中属性名为key的属性对应的值。系统中常见 的属性名以及属性的作用如下表所示：

  ![image-20211024153322825](/assets/imgs/JavaSE4.assets/image-20211024153322825.png)



```java
@Test
public void testSystem () {
    String javaVersion = System.getProperty("java.version");
    System.out.println("java的version:" + javaVersion);

    String javaHome = System.getProperty("java.home");
    System.out.println("java的home:" + javaHome);

    String osName = System.getProperty("os.name");
    System.out.println("os的name:" + osName);

    String osVersion = System.getProperty("os.version");
    System.out.println("os的version:" + osVersion);

    String userName = System.getProperty("user.name");
    System.out.println("user的name:" + userName);

    String userHome = System.getProperty("user.home");
    System.out.println("user的home:" + userHome);

    String userDir = System.getProperty("user.dir");
    System.out.println("user的dir:" + userDir);
}
```



### Math类



java.lang.Math提供了一系列静态方法用于科学计算。其方法的参数和返回 值类型一般为double型。



```java
abs 绝对值
acos,asin,atan,cos,sin,tan 三角函数
sqrt 平方根
pow(double a,doble b) a的b次幂
log 自然对数
exp e为底指数
max(double a,double b)
min(double a,double b)
random() 返回0.0到1.0的随机数
long round(double a) double型数据a转换为long型（四舍五入）
toDegrees(double angrad) 弧度—>角度
toRadians(double angdeg) 角度—>弧度
```



### BigInteger与BigDecimal



#### BigInteger



- Integer类作为int的包装类，能存储的最大整型值为2 31-1，Long类也是有限的， 最大为2 63-1。如果要表示再大的整数，不管是基本数据类型还是他们的包装类 都无能为力，更不用说进行运算了。
- java.math包的BigInteger可以==表示不可变的任意精度的整数==。BigInteger 提供 所有 Java 的基本整数操作符的对应物，并提供 java.lang.Math 的所有相关方法。 另外，BigInteger 还提供以下运算：模算术、GCD 计算、质数测试、素数生成、 位操作以及一些其他操作
- 构造器
  - BigInteger(String val)：根据字符串构建BigInteger对象



> 常用方法
>
> 

```java
// 返回此 BigInteger 的绝对值的 BigInteger。
public BigInteger abs()

// 返回其值为 (this + val) 的 BigInteger    
BigInteger add(BigInteger val)
    
// 返回其值为 (this - val) 的 BigInteger    
BigInteger subtract(BigInteger val)
    
// 返回其值为 (this * val) 的 BigInteger    
BigInteger multiply(BigInteger val)
    
// 返回其值为 (this / val) 的 BigInteger。整数相除只保留整数部分。 
BigInteger divide(BigInteger val)
    
// 返回其值为 (this % val) 的 BigInteger。    
BigInteger remainder(BigInteger val)
    
// 返回包含 (this / val) 后跟(this % val) 的两个 BigInteger 的数组。    
BigInteger[] divideAndRemainder(BigInteger val)

// 返回其值为 (thisexponent) 的 BigInteger。    
BigInteger pow(int exponent)
```



#### BigDecimal



- 一般的Float类和Double类可以用来做科学计算或工程计算，但在商业计算中， 要求数字精度比较高，故用到java.math.BigDecimal类。
- BigDecimal类==支持不可变的、任意精度的有符号十进制定点数==。
- 构造器
  - public BigDecimal(double val)
  -  public BigDecimal(String val)
- 常用方法
  - public BigDecimal add(BigDecimal augend) 
  - public BigDecimal subtract(BigDecimal subtrahend) 
  - public BigDecimal multiply(BigDecimal multiplicand)
  -  public BigDecimal divide(BigDecimal divisor, int scale, int roundingMode)



```java
@Test
public void test2 () {
    BigInteger bi = new BigInteger("12433241123");
    BigDecimal bd = new BigDecimal("12435.351");
    BigDecimal bd2 = new BigDecimal("11");
    System.out.println(bi);
    // Non-terminating decimal expansion; no exact representable decimal result. 除不尽的话, 需要指明保留多少位
    // System.out.println(bd.divide(bd2));
    System.out.println(bd.divide(bd2, BigDecimal.ROUND_HALF_UP));
    System.out.println(bd.divide(bd2, 55, BigDecimal.ROUND_HALF_UP));

}
```



## 枚举类的使用



### 入门



类的对象只有有限个，确定的。举例如下

- 星期：Monday(星期一)、......、Sunday(星期天) 
-  性别：Man(男)、Woman(女) 
-  季节：Spring(春节)......Winter(冬天) 
-  支付方式：Cash（现金）、WeChatPay（微信）、Alipay(支付宝)、BankCard(银 行卡)、CreditCard(信用卡) 
-  就职状态：Busy、Free、Vocation、Dimission 
-  订单状态：Nonpayment（未付款）、Paid（已付款）、Delivered（已发货）、 Return（退货）、Checked（已确认）Fulfilled（已配货）、 
-  线程状态：创建、就绪、运行、阻塞、死亡



**当需要定义一组常量时，强烈建议使用枚举类**



- 枚举类的实现
  - JDK1.5之前需要自定义枚举类
  - JDK 1.5 新增的 ==enum== 关键字用于定义枚举类
- 若枚举只有一个对象, 则可以作为一种单例模式的实现方式。

- 枚举类的属性
  - 枚举类对象的属性不应允许被改动, 所以应该使用 ==private final== 修饰
  - 枚举类的使用 private final 修饰的属性应该在构造器中为其赋值
  - 若枚举类显式的定义了带参数的构造器, 则在列出枚举值时也必须对应的 传入参数



### 自定义枚举类



> 步骤

- 私有化类的构造器，保证不能在类的外部创建其对象
- 在类的内部创建枚举类的实例。声明为：public static final 
- 对象如果有实例变量，应该声明为private final，并在构造器中初始化



```java
class Season{
    private final String SEASONNAME;//季节的名称
    private final String SEASONDESC;//季节的描述
    private Season(String seasonName,String seasonDesc){
        this.SEASONNAME = seasonName;
        this.SEASONDESC = seasonDesc;
    }
    public static final Season SPRING = new Season("春天", "春暖花开");
    public static final Season SUMMER = new Season("夏天", "夏日炎炎");
    public static final Season AUTUMN = new Season("秋天", "秋高气爽");
    public static final Season WINTER = new Season("冬天", "白雪皑皑");
}

```



```java
package com.yixihan.day1026.enumtest;

/**
 * 一. 枚举类的使用 :
 *      1. 枚举类的理解 : 类的对象只有有限个, 确定的 我们称此类为枚举类
 *      2. 当需要定义一组常量是, 强烈建议使用枚举类
 *      3. 如果枚举类中只有一个对象, 则可以作为单例模式的实现方式
 *
 *
 * 二. 如何定义枚举类 :
 *      方式一 : JDK 5.0 之前, 自定义枚举类
 *
 *
 *      方式二 : JDK 5.0 时, 可以使用 enum 关键字定义枚举类
 *
 * @author : yixihan
 * @create : 2021-10-26-14:22
 */
public class SeasonTest {

    public static void main(String[] args) {

        Season spring = Season.SPRING;
        System.out.println(spring);
        System.out.println(spring.getSeasonName());
    }
}

/**
 * 自定义枚举类
 */
class Season {

    // 1. 声明 Season 对象的属性 : private final 修饰
    /**
     * 季节名
     */
    private final String seasonName;

    /**
     * 季节描述
     */
    private final String seasonDesc;


    // 2. 私有化类的构造器
    /**
     * 私有化的构造器
     */
    private Season (String seasonName, String seasonDesc) {
        this.seasonName = seasonName;
        this.seasonDesc = seasonDesc;

    }

    // 3. 提供当前枚举类的多个对象 : public static final
    /**
     * 春天
     */
    public static final Season SPRING = new Season("春天", "春暖花开");

    /**
     * 夏天
     */
    public static final Season SUMMER = new Season("夏天", "夏日炎炎");

    /**
     * 秋天
     */
    public static final Season AUTUMN = new Season("秋天", "秋高气爽");

    /**
     * 冬天
     */
    public static final Season WINTER = new Season("冬天", "冰天雪地");

    // 4. 其他诉求1 : 获取枚举类对象的属性

    /**
     * 获取 seasonName
     */
    public String getSeasonName() {
        return seasonName;
    }

    /**
     * 获取 seasonDesc
     */
    public String getSeasonDesc() {
        return seasonDesc;
    }

    // 4. 其他诉求2 : 提供 toString()
    /**
     * toString
     */
    @Override
    public String toString() {
        return "Season{" +
                "seasonName='" + seasonName + '\'' +
                ", seasonDesc='" + seasonDesc + '\'' +
                '}';
    }
}
```



### 使用enum定义枚举类



> 使用说明

- 使用 enum 定义的枚举类默认继承了 java.lang.Enum类，因此不能再 继承其他类
- 枚举类的构造器只能使用 private 权限修饰符
- 枚举类的所有实例必须在枚举类中显式列出( ==, 分隔    ; 结尾==)。列出的 实例系统会自动添加 public static final 修饰
- **必须在枚举类的第一行声明枚举类对象**



JDK 1.5 中可以在 switch 表达式中使用Enum定义的枚举类的对象作为表达式, case 子句可以直接使用枚举值的名字, 无需添加枚举类作为限定。



```java
public enum SeasonEnum {
    SPRING("春天","春风又绿江南岸"),
    SUMMER("夏天","映日荷花别样红"),
    AUTUMN("秋天","秋水共长天一色"),
    WINTER("冬天","窗含西岭千秋雪");
    private final String seasonName;
    private final String seasonDesc;
    private SeasonEnum(String seasonName, String seasonDesc) {
        this.seasonName = seasonName;
        this.seasonDesc = seasonDesc;
    }
    public String getSeasonName() {
        return seasonName;
    }
    public String getSeasonDesc() {
        return seasonDesc;
    }
}
```



### Enum类的主要方法

![image-20211026132708686](/assets/imgs/JavaSE4.assets/image-20211026132708686.png)





- values()方法：返回枚举类型的对象数组。该方法可以很方便地遍历所有的 枚举值。
- valueOf(String str)：可以把一个字符串转为对应的枚举类对象。要求字符 串必须是枚举类对象的“名字”。如不是，会有运行时异常： IllegalArgumentException。
- toString()：返回当前枚举类对象常量的名称



```java
package com.yixihan.day1026.enumtest;

import java.util.Arrays;

/**
 * 使用 enum 关键字定义枚举类
 *
 * 说明 : 定义的枚举类默认继承于 java.lang.Enum 类
 *
 * 三. ENUM 类中的常用方法
 *
 *      1. values()方法：返回枚举类型的对象数组。该方法可以很方便地遍历所有的枚举值。
 *      2. valueOf(String objName)：可以把一个字符串转为对应的枚举类对象。
 *      要求字符串必须是枚举类对象的“名字”。如不是，会有运行时异常：IllegalArgumentException。
 *      3. toString()：返回当前枚举类对象常量的名称
 * @author : yixihan
 * @create : 2021-10-26-14:36
 */
public class SeasonTest1 {

    public static void main(String[] args) {

        Season summer = Season.SUMMER;

        // toString() 方法
        System.out.println(summer);

        // values()
        Season[] values = Season.values();
        System.out.println(Arrays.toString(values));

        Thread.State[] values1 = Thread.State.values();
        System.out.println(Arrays.toString(values1));

        // valueOf(String objName) : 根据提供的 objName, 返回这个枚举类中对象名是 objName 的对象
        // 如果 objName 的枚举类对象, 会抛异常 : IllegalArgumentException
        Season winter = Season.valueOf("WINTER");
        System.out.println(winter);
        System.out.println(Season.class.getSuperclass());
    }
}


/**
 * 使用 enum 关键字定义枚举类
 */
enum Season {

    // 1. 提供当前枚举类的对象, 多个对象之间用 "," 隔开, 末尾对象 ";"介绍
    /**
     * 春天
     */
    SPRING("春天", "春暖花开"),

    /**
     * 夏天
     */
    SUMMER("夏天", "夏日炎炎"),

    /**
     * 秋天
     */
    AUTUMN("秋天", "秋高气爽"),

    /**
     * 冬天
     */
    WINTER("冬天", "冰天雪地");

    // 2. 声明 Season 对象的属性 : private final 修饰
    /**
     * 季节名
     */
    private final String seasonName;

    /**
     * 季节描述
     */
    private final String seasonDesc;


    // 3. 私有化类的构造器
    /**
     * 私有化的构造器
     */
    private Season (String seasonName, String seasonDesc) {
        this.seasonName = seasonName;
        this.seasonDesc = seasonDesc;

    }


    // 4. 其他诉求1 : 获取枚举类对象的属性

    /**
     * 获取 Season1Name
     */
    public String getSeason1Name() {
        return seasonName;
    }

    /**
     * 获取 Season1Desc
     */
    public String getSeason1Desc() {
        return seasonDesc;
    }

}
```



### 实现接口的枚举类



- 和普通 Java 类一样，枚举类可以实现一个或多个接口
- 若每个枚举值在调用实现的接口方法呈现相同的行为方式，则只 要统一实现该方法即可。
- 若需要每个枚举值在调用实现的接口方法呈现出不同的行为方式, 则可以让每个枚举值分别来实现该方法



```java
package com.yixihan.day1026.enumtest;

import java.util.Arrays;

/**
 * 使用 enum 关键字定义枚举类
 *
 * 说明 : 定义的枚举类默认继承于 java.lang.Enum 类
 *
 * 三. ENUM 类中的常用方法
 *
 *      1. values()方法：返回枚举类型的对象数组。该方法可以很方便地遍历所有的枚举值。
 *      2. valueOf(String objName)：可以把一个字符串转为对应的枚举类对象。
 *      要求字符串必须是枚举类对象的“名字”。如不是，会有运行时异常：IllegalArgumentException。
 *      3. toString()：返回当前枚举类对象常量的名称
 *
 * 四. 使用 enum 关键字定义的枚举类实现接口的情况
 *      情况一 : 实现接口, 在 enum 枚举类中实现抽象方法
 *      情况二 : 让枚举类的对象分别去实现接口中的抽象方法
 *
 *
 * @author : yixihan
 * @create : 2021-10-26-14:36
 */
public class SeasonTest1 {

    public static void main(String[] args) {

        Season summer = Season.SUMMER;

        // toString() 方法
        System.out.println(summer);

        // values()
        Season[] values = Season.values();
        System.out.println(Arrays.toString(values));

        Thread.State[] values1 = Thread.State.values();
        System.out.println(Arrays.toString(values1));

        // valueOf(String objName) : 根据提供的 objName, 返回这个枚举类中对象名是 objName 的对象
        // 如果 objName 的枚举类对象, 会抛异常 : IllegalArgumentException
        Season winter = Season.valueOf("WINTER");
        System.out.println(winter);

        System.out.println("*************");
        winter.show();
        summer.show();


        System.out.println(Season.class.getSuperclass());
    }
}

interface  Info {

    void show();
}

/**
 * 使用 enum 关键字定义枚举类
 */
enum Season implements Info{

    // 1. 提供当前枚举类的对象, 多个对象之间用 "," 隔开, 末尾对象 ";"介绍
    /**
     * 春天
     */
    SPRING("春天", "春暖花开"){
        @Override
        public void show() {
            System.out.println("这是春天");
        }
    },

    /**
     * 夏天
     */
    SUMMER("夏天", "夏日炎炎"){
        @Override
        public void show() {
            System.out.println("这是夏天");
        }
    },

    /**
     * 秋天
     */
    AUTUMN("秋天", "秋高气爽"){
        @Override
        public void show() {
            System.out.println("这是秋天");
        }
    },

    /**
     * 冬天
     */
    WINTER("冬天", "冰天雪地"){
        @Override
        public void show() {
            System.out.println("这是冬天");
        }
    };

    // 2. 声明 Season 对象的属性 : private final 修饰
    /**
     * 季节名
     */
    private final String seasonName;

    /**
     * 季节描述
     */
    private final String seasonDesc;


    // 3. 私有化类的构造器
    /**
     * 私有化的构造器
     */
    private Season (String seasonName, String seasonDesc) {
        this.seasonName = seasonName;
        this.seasonDesc = seasonDesc;

    }


    // 4. 其他诉求1 : 获取枚举类对象的属性

    /**
     * 获取 Season1Name
     */
    public String getSeason1Name() {
        return seasonName;
    }

    /**
     * 获取 Season1Desc
     */
    public String getSeason1Desc() {
        return seasonDesc;
    }

//    @Override
//    public void show() {
//        System.out.println("hello");
//    }
}
```





## 注解(Annotation)



### 简介



从 JDK 5.0 开始, Java 增加了对元数据(MetaData) 的支持, 也就是 Annotation(注解)



Annotation 其实就是代码里的**特殊标记**, 这些标记可以在编译, 类加 载, 运行时被读取, 并执行相应的处理。通过使用 Annotation, 程序员 可以在不改变原有逻辑的情况下, 在源文件中嵌入一些补充信息。代 码分析工具、开发工具和部署工具可以通过这些补充信息进行验证 或者进行部署。



Annotation 可以像修饰符一样被使用, 可用于==修饰包,类, 构造器, 方 法, 成员变量, 参数, 局部变量的声明==, 这些信息被保存在 Annotation 的 “name=value” 对中。



在JavaSE中，注解的使用目的比较简单，例如标记过时的功能， 忽略警告等。在JavaEE/Android中注解占据了更重要的角色，例如 用来配置应用程序的任何切面，代替JavaEE旧版中所遗留的繁冗 代码和XML配置等。



未来的开发模式都是基于注解的，JPA是基于注解的，Spring2.5以 上都是基于注解的，Hibernate3.x以后也是基于注解的，现在的 Struts2有一部分也是基于注解的了，注解是一种趋势，一定程度上 可以说：==框架 = 注解 + 反射 + 设计模式==。





### 常见的Annotation示例



使用 Annotation 时要在其前面增加 @ 符号, 并**把该 Annotation 当成 一个修饰符使用**。用于修饰它支持的程序元素



#### 示例一：生成文档相关的注解



```java
@author 标明开发该类模块的作者，多个作者之间使用,分割
@version 标明该类模块的版本
@see 参考转向，也就是相关主题
@since 从哪个版本开始增加的
@param 对方法中某参数的说明，如果没有参数就不能写
@return 对方法返回值的说明，如果方法的返回值类型是void就不能写
@exception 对方法可能抛出的异常进行说明 ，如果方法没有用throws显式抛出的异常就不能写
其中
@param @return 和 @exception 这三个标记都是只用于方法的。
@param的格式要求：@param 形参名 形参类型 形参说明
@return 的格式要求：@return 返回值类型 返回值说明
@exception的格式要求：@exception 异常类型 异常说明
@param和@exception可以并列多个
```



```java
package com.annotation.javadoc;
/**
* @author shkstart
* @version 1.0
* @see Math.java
*/
public class JavadocTest {
    
    
    /**
	 * 程序的主方法，程序的入口
	 * @param args String[] 命令行参数
	 */
    public static void main(String[] args) {
    }
    
    
    /**
 	 * 求圆面积的方法
	 * @param radius double 半径值
	 * @return double 圆的面积
	 */
    public static double getArea(double radius){
        return Math.PI * radius * radius;
    }
}

```



#### 示例二：在编译时进行格式检查(JDK内置的三个基本注解)



- @Override: 限定重写父类方法, 该注解只能用于方法
- @Deprecated: 用于表示所修饰的元素(类, 方法等)已过时。通常是因为 所修饰的结构危险或存在更好的选择
- @SuppressWarnings: 抑制编译器警告



```java
package com.annotation.javadoc;
public class AnnotationTest{
    public static void main(String[] args) {
        @SuppressWarnings("unused")
        int a = 10;
    }
    @Deprecated
    public void print(){
        System.out.println("过时的方法");
    }
    @Override
    public String toString() {
        return "重写的toString方法()";
    }
}
```



#### 示例三：跟踪代码依赖性，实现替代配置文件功能



> Servlet3.0提供了注解(annotation),使得不再需要在web.xml文件中进行Servlet的部署。



```java
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    
    private static final long serialVersionUID = 1L;
    
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws
        ServletException, IOException { 
    }
    
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws
        ServletException, IOException {
        doGet(request, response);
    } 
}

```



```xml
<servlet>
    <servlet-name>LoginServlet</servlet-name>
    <servlet-class>com.servlet.LoginServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>LoginServlet</servlet-name>
    <url-pattern>/login</url-pattern>
</servlet-mapping>
```





> spring框架中关于“事务”的管理



```java
@Transactional(propagation=Propagation.REQUIRES_NEW,
               isolation=Isolation.READ_COMMITTED,readOnly=false,timeout=3)
public void buyBook(String username, String isbn) {
    //1.查询书的单价
    int price = bookShopDao.findBookPriceByIsbn(isbn);
    
    //2. 更新库存
    bookShopDao.updateBookStock(isbn);
    
    //3. 更新用户的余额
    bookShopDao.updateUserAccount(username, price);
}

```



```xml
<!-- 配置事务属性 -->
<tx:advice transaction-manager="dataSourceTransactionManager" id="txAdvice">
    <tx:attributes>
        <!-- 配置每个方法使用的事务属性 -->
        <tx:method name="buyBook" propagation="REQUIRES_NEW"
                   isolation="READ_COMMITTED" read-only="false" timeout="3" />
    </tx:attributes>
</tx:advice>
```



### 自定义 Annotation



- 定义新的 Annotation 类型使用 **@interface** 关键字
- 自定义注解自动继承了**java.lang.annotation.Annotation**接口
- Annotation 的成员变量在 Annotation 定义中以无参数方法的形式来声明。其 方法名和返回值定义了该成员的名字和类型。我们称为配置参数。**类型只能是八种基本数据类型、String类型、Class类型、enum类型、Annotation类型、 以上所有类型的数组**。
- 可以在定义 Annotation 的成员变量时为其指定初始值, **指定成员变量的初始 值可使用 default 关键字**
- 如果只有一个参数成员，建议使用**参数名为value**
- 如果定义的注解含有配置参数，那么使用时必须指定参数值，除非它有默认 值。格式是“参数名 = 参数值” ，如果只有一个参数成员，且名称为value， 可以省略“value=”
- 没有成员定义的 Annotation 称为**标记**; 包含成员变量的 Annotation 称为元数 据 Annotation



**注意 : 自定义注解必须配上注解的信息处理流程才有意义。**



```java
@MyAnnotation(value="尚硅谷")
public class MyAnnotationTest {
    public static void main(String[] args) {
        Class clazz = MyAnnotationTest.class;
        Annotation a = clazz.getAnnotation(MyAnnotation.class);
        MyAnnotation m = (MyAnnotation) a;
        String info = m.value();
        System.out.println(info);
    }
}


@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@interface MyAnnotation{
    String value() default "auguigu";
}

```



```java
package com.yixihan.day1026.annotationtest;

/**
 * 注解的使用
 *
 * 1. 理解 Annotation :
 *      1. jdk 5.0 新增的功能
 *      2. Annotation 其实就是代码里的特殊标记, 这些标记可以在编译, 类加 载, 运行时被读取, 并执行相应的处理。
 *      通过使用 Annotation, 程序员 可以在不改变原有逻辑的情况下, 在源文件中嵌入一些补充信息。
 *      代码分析工具、开发工具和部署工具可以通过这些补充信息进行验证 或者进行部署。
 *      3. 在JavaSE中，注解的使用目的比较简单，例如标记过时的功能， 忽略警告等。
 *      在JavaEE/Android中注解占据了更重要的角色，例如 用来配置应用程序的任何切面，
 *      代替JavaEE旧版中所遗留的繁冗 代码和XML配置等。
 *
 *
 * 2. Annotation 的使用示例 :
 *      1. 示例一 : 生成文档相关的注解
 *
 *      2. 示例二 : 在编译时进行格式检查(JDK内置的三个基本注解)
 *          @Override: 限定重写父类方法, 该注解只能用于方法
 *          @Deprecated: 用于表示所修饰的元素(类, 方法等)已过时。通常是因为 所修饰的结构危险或存在更好的选择
 *          @SuppressWarnings: 抑制编译器警告
 *
 *
 *
 *      3. 示例三 : 跟踪代码依赖性，实现替代配置文件功能
 *
 *
 * 3. 如何自定义注解 : 参照 @SuppressWarnings 定义
 *      1. 注解声明为 @interface
 *      2. 内部定义成员, 通常使用 value 表示
 *      3. 可以指定成员的默认值, 使用 default 定义
 *      4. 如果自定义的注解没有成员, 表示是一个标识作用
 *
 *      如果直接有成员, 在使用注解时, 需要指明成员的值
 *      自定义注解必须配上注解的信息处理流程 (使用反射) 才有意义
 *
 *
 *
 * @author : yixihan
 * @create : 2021-10-26-15:15
 */
public class AnnotationTest {


    public static void main(String[] args) {

        Person p1 = new Student();

        // 抑制编译器警告
        @SuppressWarnings("unused")
        Person zst = new Person("zst", 12);

        p1.walk();
    }
}

@MyAnnotation(values = "hello")
class Person {

    private String name;

    private int age;

    public Person() { }

    @Deprecated
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void walk () {
        System.out.println("走路");
    }

    public void eat () {
        System.out.println("吃饭");
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

interface Info {

    void show ();
}

class Student extends Person implements Info{



    @Override
    public void walk() {
        System.out.println("学生走路");
    }

    @Override
    public void show() {
        System.out.println("show");
    }

}

```



```java
package com.yixihan.day1026.annotationtest;

/**
 * @author : yixihan
 * @create : 2021-10-26-15:29
 */
public @interface MyAnnotation {


    String[] values();
}
```



### JDK 中的元注解



JDK 的元 Annotation 用于修饰其他 Annotation 定义



JDK5.0提供了4个标准的meta-annotation类型，分别是

- Retention 
- Target 
- Documented 
- Inherited



元数据的理解： String name = “atguigu”;



> Retention 

- @Retention: 只能用于修饰一个 Annotation 定义, 用于指定该 Annotation 的生命 周期, @Rentention 包含一个 ==RetentionPolicy== 类型的成员变量, 使用 @Rentention 时必须为该 value 成员变量指定值:
  - RetentionPolicy.SOURCE:在源文件中有效（即源文件保留），编译器直接丢弃这种策略的 注释
  - RetentionPolicy.CLASS:在class文件中有效（即class保留） ， 当运行 Java 程序时, JVM 不会保留注解。 这是默认值
  - RetentionPolicy.RUNTIME:在运行时有效（即运行时保留），**当运行 Java 程序时, JVM 会 保留注释。程序可以通过反射获取该注释**

![image-20211026133635991](/assets/imgs/JavaSE4.assets/image-20211026133635991.png)



```java
public enum RetentionPolicy{
    SOURCE,
    CLASS,
    RUNTIME
}
```



```java
@Retention(RetentionPolicy.SOURCE)
@interface MyAnnotation1{ }
@Retention(RetentionPolicy.RUNTIME)
@interface MyAnnotation2{ }
```





> Target 

- @Target: 用于修饰 Annotation 定义, 用于指定被修饰的 Annotation 能用于 修饰哪些程序元素。 @Target 也包含一个名为 value 的成员变量。

![image-20211026133734232](/assets/imgs/JavaSE4.assets/image-20211026133734232.png)





> Documented 

- @Documented: 用于指定被该元 Annotation 修饰的 Annotation 类将被 javadoc 工具提取成文档。默认情况下，javadoc是不包括注解的。
  - **定义为Documented的注解必须设置Retention值为RUNTIME**





> Inherited

- @Inherited: 被它修饰的 Annotation 将具有==继承性==。如果某个类使用了被 @Inherited 修饰的 Annotation, 则其子类将自动具有该注解
  - 比如：如果把标有@Inherited注解的自定义的注解标注在类级别上，子类则可以 继承父类类级别的注解
  - 实际应用中，使用较少



```java
package com.yixihan.day1026.annotationtest;

import org.junit.Test;

import java.lang.annotation.Annotation;

/**
 * 4. JDK 提供的四个元注解
 *      元注解 : 对现有的注解进行解释说明的注解
 *
 *      Retention : 指定所修饰的 Annotation 的声明周期 : SOURCE/CLASS (默认行为) /RUNTIME
 *                  只有声明为 RUNTIME 声明周期的注解, 才能通过反射获取
 *
 *      Target : 用于修饰 Annotation 定义, 用于指定被修饰的 Annotation 能用于修饰哪些程序元素
 *               TYPE/FIELD/METHOD/PARAMETER/CONSTRUCTOR/LOCAL_VARIABLE/ANNOTATION_TYPE/PACKAGE/TYPE_PARAMETER/TYPE_USE
 *
 *      *****出现的频率较低***
 *      Documented : 用于指定被该元 Annotation 修饰的 Annotation 类将被 javadoc 工具提取成文档。默认情况下，javadoc 是不包括注解的
 *                  比如 @Deprecated
 *
 *      Inherited : 被他修饰的 Annotation 将具有继承性
 *
 *
 * 5. 通过反射获取注解信息
 *
 * @author : yixihan
 * @create : 2021-10-26-15:40
 */
public class MetaAnnotationTest {

    @Test
    public void testGetAnnotation () {
        Class classes = Student.class;

        Annotation[] annotations = classes.getAnnotations();

        for (Annotation annotation : annotations) {
            System.out.println(annotation);
        }

    }
}
```



### 利用反射获取注解信息



JDK 5.0 在 java.lang.reflect 包下新增了 ==AnnotatedElement== 接口, **该接口代表程序中可以接受注解的程序元素**



**当一个 Annotation 类型被定义为运行时 Annotation 后, 该注解才是运行时可见**, 当 class 文件被载入时保存在 class 文件中的 Annotation 才会被虚拟 机读取



程序可以调用 AnnotatedElement对象的如下方法来访问 Annotation 信息



![image-20211026134109173](/assets/imgs/JavaSE4.assets/image-20211026134109173.png)







### JDK8中注解的新特性



Java 8对注解处理提供了两点改进：==可重复的注解==及==可用于类型的注解==。此外， 反射也得到了加强，在Java8中能够得到方法参数的名称。这会简化标注在方法 参数上的注解。



> 可重复注解示例：

![image-20211026134200023](/assets/imgs/JavaSE4.assets/image-20211026134200023.png)





> 类型注解



JDK1.8之后，关于元注解@Target的参数类型ElementType枚举值多了两个： **TYPE_PARAMETER,TYPE_USE**。



在Java 8之前，注解只能是在声明的地方所使用，Java8开始，注解可以应用 在任何地方。

- ElementType.TYPE_PARAMETER 表示该注解能写在类型变量的声明语 句中（如：泛型声明）。
- ElementType.TYPE_USE 表示该注解能写在使用类型的任何语句中。

```java
public class TestTypeDefine<@TypeDefine() U> {
    private U u;
    public <@TypeDefine() T> void test(T t){
    }
}
@Target({ElementType.TYPE_PARAMETER})
@interface TypeDefine{
}
```



```java
@MyAnnotation
public class AnnotationTest<U> {
    @MyAnnotation
    private String name;
    public static void main(String[] args) {
        AnnotationTest<@MyAnnotation String> t = null;
        int a = (@MyAnnotation int) 2L;
        @MyAnnotation
        int b = 10;
    }
    public static <@MyAnnotation T> void method(T t) {
    }
    public static void test(@MyAnnotation String arg) throws @MyAnnotation Exception {
    }
}
@Target(ElementType.TYPE_USE)
@interface MyAnnotation {
}
```



### 代码

```java
package com.yixihan.day1026.annotationtest;

/**
 * 注解的使用
 *
 * 1. 理解 Annotation :
 *      1. jdk 5.0 新增的功能
 *      2. Annotation 其实就是代码里的特殊标记, 这些标记可以在编译, 类加 载, 运行时被读取, 并执行相应的处理。
 *      通过使用 Annotation, 程序员 可以在不改变原有逻辑的情况下, 在源文件中嵌入一些补充信息。
 *      代码分析工具、开发工具和部署工具可以通过这些补充信息进行验证 或者进行部署。
 *      3. 在JavaSE中，注解的使用目的比较简单，例如标记过时的功能， 忽略警告等。
 *      在JavaEE/Android中注解占据了更重要的角色，例如 用来配置应用程序的任何切面，
 *      代替JavaEE旧版中所遗留的繁冗 代码和XML配置等。
 *
 *
 * 2. Annotation 的使用示例 :
 *      1. 示例一 : 生成文档相关的注解
 *
 *      2. 示例二 : 在编译时进行格式检查(JDK内置的三个基本注解)
 *          @Override: 限定重写父类方法, 该注解只能用于方法
 *          @Deprecated: 用于表示所修饰的元素(类, 方法等)已过时。通常是因为 所修饰的结构危险或存在更好的选择
 *          @SuppressWarnings: 抑制编译器警告
 *
 *
 *
 *      3. 示例三 : 跟踪代码依赖性，实现替代配置文件功能
 *
 *
 * 3. 如何自定义注解 : 参照 @SuppressWarnings 定义
 *      1. 注解声明为 @interface
 *      2. 内部定义成员, 通常使用 value 表示
 *      3. 可以指定成员的默认值, 使用 default 定义
 *      4. 如果自定义的注解没有成员, 表示是一个标识作用
 *
 *      如果直接有成员, 在使用注解时, 需要指明成员的值
 *      自定义注解必须配上注解的信息处理流程 (使用反射) 才有意义
 *      自定义注解通常都会指明两个元注解 : Retention  Target
 *
 *
 *
 * @author : yixihan
 * @create : 2021-10-26-15:15
 */
public class AnnotationTest {


    public static void main(String[] args) {

        Person p1 = new Student();

        // 抑制编译器警告
        @SuppressWarnings("unused")
        Person zst = new Person("zst", 12);

        p1.walk();
    }
}

//@MyAnnotation(values = "hello")
//@MyAnnotation(values = "world")
// jdk 8之前的解决方案
// @MyAnnotations({@MyAnnotation(value = "hello"), @MyAnnotation(value = "world")})

// jdk 8 及之后的解决方法
@MyAnnotation(value = "hello")
@MyAnnotation(value = "world")
class Person {

    private String name;

    private int age;

    public Person() { }

    @Deprecated
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void walk () {
        System.out.println("走路");
    }

    public void eat () {
        System.out.println("吃饭");
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

interface Info {

    void show ();
}

class Student extends Person implements Info{



    @Override
    public void walk() {
        System.out.println("学生走路");
    }

    @Override
    public void show() {
        System.out.println("show");
    }

}
```



```java
package com.yixihan.day1026.annotationtest;

import org.junit.Test;

import java.lang.annotation.Annotation;
import java.util.ArrayList;

/**
 * 4. JDK 提供的四个元注解
 *      元注解 : 对现有的注解进行解释说明的注解
 *
 *      Retention : 指定所修饰的 Annotation 的声明周期 : SOURCE/CLASS (默认行为) /RUNTIME
 *                  只有声明为 RUNTIME 声明周期的注解, 才能通过反射获取
 *
 *      Target : 用于修饰 Annotation 定义, 用于指定被修饰的 Annotation 能用于修饰哪些程序元素
 *               TYPE/FIELD/METHOD/PARAMETER/CONSTRUCTOR/LOCAL_VARIABLE/ANNOTATION_TYPE/PACKAGE/TYPE_PARAMETER/TYPE_USE
 *
 *      *****出现的频率较低***
 *      Documented : 用于指定被该元 Annotation 修饰的 Annotation 类将被 javadoc 工具提取成文档。默认情况下，javadoc 是不包括注解的
 *                  比如 @Deprecated
 *
 *      Inherited : 被他修饰的 Annotation 将具有继承性
 *
 *
 * 5. 通过反射获取注解信息
 *
 *
 * 6. JDK 8 中注解的新特性 : 可重复注解 类型注解
 *
 *      可重复注解 :
 *          1. 在 MyAnnotation 上声明 @Repeatable(), 成员值为 MyAnnotations.class
 *         
 *          2. MyAnnotation 的 Target Retention 等元注解必须和 MyAnnotations相同
 *
 *      类型注解 : TYPE_PARAMETER/TYPE_USE
 *
 *
 * @author : yixihan
 * @create : 2021-10-26-15:40
 */
public class MetaAnnotationTest {

    @Test
    public void testGetAnnotation () {
        Class classes = Student.class;

        Annotation[] annotations = classes.getAnnotations();

        for (Annotation annotation : annotations) {
            System.out.println(annotation);
        }

    }
}

class Generic<@MyAnnotation(value = "hello") T> {

    public void show () throws @MyAnnotation(value = "hello") RuntimeException{

        ArrayList<@MyAnnotation(value = "hello") String> list = new ArrayList<>();
    }
}

```



```java
package com.yixihan.day1026.annotationtest;

import java.lang.annotation.*;

import static java.lang.annotation.ElementType.*;

/**
 * @author : yixihan
 * @create : 2021-10-26-15:29
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(value={CONSTRUCTOR, FIELD, LOCAL_VARIABLE, METHOD, PACKAGE, PARAMETER, TYPE, TYPE_USE, TYPE_PARAMETER})
@Documented
@Inherited
@Repeatable(MyAnnotations.class)
public @interface MyAnnotation {


    String value();
}
```



```java
package com.yixihan.day1026.annotationtest;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

/**
 * @author : yixihan
 * @create : 2021-10-26-15:59
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(value={CONSTRUCTOR, FIELD, LOCAL_VARIABLE, METHOD, PACKAGE, PARAMETER, TYPE, TYPE_USE, TYPE_PARAMETER})
public @interface MyAnnotations {

    MyAnnotation[] value();
}
```





## Java集合



### Java集合框架概述



一方面， 面向对象语言对事物的体现都是以对象的形式，为了方便对多个对象 的操作，就要对对象进行存储。另一方面，使用Array存储对象方面具有**一些弊 端**，而Java 集合就像一种容器，可以**动态地**把多个对象的引用放入容器中



> 数组在内存存储方面的特点

- 数组初始化以后，长度就确定了
- 数组声明的类型，就决定了进行元素初始化时的类型



> 数组在存储数据方面的弊端

- 数组初始化以后，长度就不可变了，不便于扩展
- 数组中提供的属性和方法少，不便于进行添加、删除、插入等操作，且效率不高。 同时无法直接获取存储元素的个数
- 数组存储的数据是有序的、可以重复的。---->存储数据的特点单一



Java 集合类可以用于存储数量不等的多个==对象==，还可用于保存具有映射关系的 关联数组



> Java 集合可分为 Collection 和 Map 两种体系



- Collection接口：单列数据，定义了存取一组对象的方法的集合
  - List：元素有序、可重复的集合
  - Set：元素无序、不可重复的集合
- Map接口：双列数据，保存具有映射关系“key-value对”的集合



> Collection接口继承树

![image-20211026170711294](/assets/imgs/JavaSE4.assets/image-20211026170711294.png)



> Map接口继承树

![image-20211026170745622](/assets/imgs/JavaSE4.assets/image-20211026170745622.png)





### Collection接口方法



#### 简介

Collection 接口是 List、Set 和 Queue 接口的父接口，该接口里定义的方法 既可用于操作 Set 集合，也可用于操作 List 和 Queue 集合。



JDK不提供此接口的任何直接实现，而是提供更具体的子接口(如：Set和List) 实现



在 Java5 之前，Java 集合会丢失容器中所有对象的数据类型，把所有对象都 当成 Object 类型处理；从 JDK 5.0 增加了==泛型==以后，Java 集合可以记住容 器中对象的数据类型



#### 常用方法

- 添加
  - add(Object obj)
  - addAll(Collection coll)
- 获取有效元素的个数
  - int size()
- 清空集合
  - void clear()
- 是否是空集合
  - boolean isEmpty()
- 是否包含某个元素
  - boolean contains(Object obj)：是通过元素的equals方法来判断是否 是同一个对象
  - boolean containsAll(Collection c)：也是调用元素的equals方法来比 较的。拿两个集合的元素挨个比较
- 删除
  - boolean remove(Object obj) ：通过元素的equals方法判断是否是 要删除的那个元素。只会删除找到的第一个元素
  - boolean removeAll(Collection coll)：取当前集合的差集
- 取两个集合的交集
  - boolean retainAll(Collection c)：把交集的结果存在当前集合中，不 影响c
- 集合是否相等
  - boolean equals(Object obj)
- 转成对象数组
  - Object[] toArray()
- 获取集合对象的哈希值
  - hashCode()
- 遍历
  - iterator()：返回迭代器对象，用于集合遍历



```java
package com.yixihan.day1026.collectiontest;

import org.junit.Test;

import java.util.*;

/**
 * 一. 集合框架的概述
 *
 * 1. 集合 数组都是对多个数据进行存储操作的结构, 简称 Java 容器
 *      说明 : 此时的存储, 主要指定是内存层面的存储, 不涉及到持久化的存储 (.txt, .jpg, .avi, 数据库等)
 *
 *
 * 2. 数组
 *      1. 数组在存储多个数据方面的特点 :
 *          1. 一旦初始化以后, 其长度就确定了
 *          2. 一旦定义好, 其元素的类型也就确定了. 我们也就只能操作指定类型的数据了
 *          比如 : String[] arr; int[] arr1;
 *
 *      2. 数组在存储多个数据方面的缺点 :
 *          1. 一旦数据初始化以后, 其长度就不可修改
 *          2. 数组中提供的方法非常有限, 对于添加 删除 插入数据等操作, 非常不便, 同时效率不高
 *          3. 获取数组中实际元素的个数的需求, 数组没有线程的属性或方法可用
 *          4. 数组存储数据的特点 : 有序, 可重复 对于无序 不可重复的需求, 不能满足
 *
 *
 * 二. 集合框架
 *      |--- Collection 接口 : 单列集合, 用来存储一个一个的对象
 *          |--- List 接口 : 存储有序的 可重复的数据  ---> "动态数组"
 *              |--- ArrayList LinkedList Vector
 *
 *          |--- Set 接口 : 存储无序的 不可重复的数据 ---> 高中讲的 "集合"
 *              |--- HashSet LinkedHashSet TreeSet
 *
 *      |--- Map 接口 : 双列集合, 用来存储一对 (key-value) 一对的数据  ---> 高中函数 : y = f(x)
 *          |--- HashMap LinkedHashMap TreeMap Hashtable Properties
 *
 *
 * 三. Collection 接口中的方法的使用
 *
 *      结论 :
 *          向 Collection 接口的实现类的对象中添加数据 obj 时, 要求 obj 所在类要重写 equals()
 *
 * @author : yixihan
 * @create : 2021-10-26-16:14
 */
public class CollectionTest {

    @Test
    public void test1 () {

        Collection coll = new ArrayList();

        // add (Object e) : 将元素 e 添加到集合 coll 中
        coll.add("AA");
        coll.add("BB");
        coll.add(123);
        coll.add(new Date());

        // size () : 获取添加元素的个数
        System.out.println(coll.size());

        // addAll(Collection coll1) : 将 coll1 集合中的元素添加到当前的集合中
        Collection coll1 = new ArrayList();
        coll1.add(555);
        coll1.add("CC");
        coll.addAll(coll1);

        System.out.println(coll.size());
        System.out.println(coll);

        // clear() : 清空集合元素
        coll.clear();
        System.out.println(coll.size());

        // isEmpty()
        System.out.println(coll.isEmpty());
    }


    @Test
    public void test2 () {

        Collection coll = new ArrayList();
        coll.add("AA");
        coll.add(false);
        coll.add(123);
        coll.add(new Date());
        coll.add(new Person("Tom", 18));
        coll.add(new String("Jane"));

        // 1. contains (Object obj) : 判断当前集合中是否包含 obj
        System.out.println(coll.contains(123));
        System.out.println(coll.contains(false));

        // 我们在判断是会调用 obj 对象所在类的 equals()
        // 判断的是内容 true
        System.out.println(coll.contains(new String("Jane")));

        // 没有重写 Person 的 equals() 方法 : false, 重写之后 : true
        System.out.println(coll.contains(new Person("Tom", 18)));


        // 2. containsAll (Collection coll1) : 判断形参 coll1 中的所有元素是否 都 存在于当前集合中
        Collection coll1 = Arrays.asList(123,false);
        System.out.println(coll.containsAll(coll1));
    }

    @Test
    public void test3 () {
        Collection coll = new ArrayList();
        coll.add("AA");
        coll.add(false);
        coll.add(123);
        coll.add(new Date());
        coll.add(new Person("Tom", 18));
        coll.add(new String("Jane"));

        // 3. remove (Object obj) : 从当前集合中移除 obj 元素
        System.out.println(coll.remove(123));
        System.out.println(coll);
        System.out.println(coll.remove(new Person("Tom", 18)));


        // removeAll (Collection coll1) : 从当前集合中移除 coll1 中所有的元素 ---> 差集
        Collection coll1 = Arrays.asList(123,false);
        coll.removeAll(coll1);
        System.out.println(coll);
    }

    @Test
    public void test4 () {
        Collection coll = new ArrayList();
        coll.add("AA");
        coll.add(false);
        coll.add(123);
        coll.add(new Date());
        coll.add(new Person("Tom", 18));
        coll.add(new String("Jane"));

        Collection coll1 = Arrays.asList(123,false, 789);

        // retainAll(Collection coll1) : 获取当前集合和 coll1 集合的交集, 并返回给当前集合 ---> 交集
        coll.retainAll(coll1);
        System.out.println(coll);


        // equals (Object obj) : 要想返回true, 需要当前集合和形参集合的元素都相同 (包括元素的位置)
        Collection coll2 = Arrays.asList(false, 123);
        Collection coll3 = Arrays.asList(123, false);
        System.out.println(coll.equals(coll2));
        System.out.println(coll.equals(coll3));
    }

    @Test
    public void test5 () {
        Collection coll = new ArrayList();
        coll.add("AA");
        coll.add(false);
        coll.add(123);
        coll.add(new Date());
        coll.add(new Person("Tom", 18));
        coll.add(new String("Jane"));

        // hashCode : 返回当前对象的哈希值
        System.out.println(coll.hashCode());

        // 集合 --> 数组 : toArray()
        Object[] objects = coll.toArray();

        System.out.println(Arrays.toString(objects));

        // 拓展 : 数组 ---> 集合 : Arrays.asList(T... a)
        List<String> asList = Arrays.asList(new String[]{"AA", "BB", "CC"});
        System.out.println(asList);

        // 小陷阱
        // List arr1 = Arrays.asList(new int[]{123, 456, 789}); 这种写法会认为数组是一个元素
        List arr2 = Arrays.asList(new Integer[]{123, 456, 789});
        List arr1 = Arrays.asList(123, 456, 789);
        // [[I@621be5d1]
        System.out.println(arr1);
        System.out.println(arr2);


        // iterator() : 返回 Iterator : 返回 Iterator 接口的实例, 用于遍历集合数组, 后面 Iterator 会专门讲述
    }
}
```



### Iterator迭代器接口



#### 使用 Iterator 接口遍历集合元素



Iterator对象称为迭代器(设计模式的一种)，主要用于遍历 Collection 集合中的元素



==**GOF给迭代器模式的定义为：提供一种方法访问一个容器(container)对象中各个元 素，而又不需暴露该对象的内部细节。迭代器模式，就是为容器而生**==。类似于“公 交车上的售票员”、“火车上的乘务员”、“空姐”。



Collection接口继承了java.lang.Iterable接口，该接口有一个iterator()方法，那么所 有实现了Collection接口的集合类都有一个iterator()方法，用以返回一个实现了 Iterator接口的对象



**Iterator 仅用于遍历集合**，Iterator 本身并不提供承装对象的能力。如果需要创建 Iterator 对象，则必须有一个被迭代的集合。



**集合对象每次调用iterator()方法都得到一个全新的迭代器对象**，默认游标都在集合 的第一个元素之前



#### Iterator接口的方法

![image-20211026171205089](/assets/imgs/JavaSE4.assets/image-20211026171205089.png)



#### 迭代器的执行原理

![image-20211026171224174](/assets/imgs/JavaSE4.assets/image-20211026171224174.png)





#### Iterator接口remove()方法

```java
Iterator iter = coll.iterator();//回到起点
while(iter.hasNext()){
    Object obj = iter.next();
    if(obj.equals("Tom")){
        iter.remove();
    }
}

/*
注意 : 
	1. Iterator可以删除集合的元素，但是是遍历过程中通过迭代器对象的remove方
	法，不是集合对象的remove方法。
	2. 如果还未调用next()或在上一次调用 next 方法之后已经调用了 remove 方法，
	再调用remove都会报IllegalStateException。
*/
```



```java
package com.yixihan.day1026.iteratortest;

import com.yixihan.day1026.collectiontest.Person;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;

/**
 * 集合元素的遍历, 使用迭代器  Iterator 接口
 *
 *      1. 内部的方法 : hasNext() next()
 *      2. 集合对象每次调用 iterator() 方法都得到一个全新的迭代器对象
 *         默认游标都在集合的第一个元素之前
 *      3. 内部定义了 remove() 方法, 可以在遍历的时候, 删除集合中的元素, 此方法不同于集合直接调用 remove()
 *          注意 : 如果还未调用next()或在上一次调用 next 方法之后已经调用了 remove 方法，
 *             再调用remove都会报IllegalStateException
 *
 * @author : yixihan
 * @create : 2021-10-26-18:20
 */
public class IteratorTest {

    @Test
    public void test1 () {
        Collection coll = new ArrayList();
        coll.add("AA");
        coll.add(false);
        coll.add(123);
        coll.add(new Date());
        coll.add(new Person("Tom", 18));
        coll.add(new String("Jane"));

        Iterator iterator = coll.iterator();

//        //  方式一 :
//        System.out.println(iterator.next());
//        System.out.println(iterator.next());
//        System.out.println(iterator.next());
//        System.out.println(iterator.next());
//        System.out.println(iterator.next());
//        System.out.println(iterator.next());
//        // 报异常 : java.util.NoSuchElementException
//        System.out.println(iterator.next());

//        // 方式二
//        for (int i = 0; i < coll.size(); i++) {
//            System.out.println(iterator.next());
//        }

        // 方式三 : 推荐
        // hasNext() : 判断是否还有下一个元素
        while (iterator.hasNext()) {

            // next() : 1. 指针下移 2. 将下移以后集合位置上的元素返回
            System.out.println(iterator.next());
        }

    }

    @Test
    public void test2 () {
        Collection coll = new ArrayList();
        coll.add("AA");
        coll.add(false);
        coll.add(123);
        coll.add(new Date());
        coll.add(new Person("Tom", 18));
        coll.add(new String("Jane"));

        Iterator iterator = coll.iterator();

        // 会少遍历元素并且会抛出异常 : NoSuchElementException
//        while (iterator.next() != null) {
//            System.out.println(iterator.next());
//        }

        // 死循环输出第一个元素
//        while (coll.iterator().hasNext()) {
//            System.out.println(coll.iterator().next());
//        }

    }

    /**
     * 测试 Iterator 中的 remove()
     */
    @Test
    public void test3 () {
        Collection coll = new ArrayList();
        coll.add("AA");
        coll.add(false);
        coll.add(123);
        coll.add(new Date());
        coll.add(new Person("Tom", 18));
        coll.add(new String("Jane"));

        Iterator iterator = coll.iterator();

        while (iterator.hasNext()) {
            Object obj = iterator.next();

            if ("Jane".equals(obj)) {
                iterator.remove();
            }

        }

        Iterator iterator1 = coll.iterator();

        while (iterator1.hasNext()) {
            System.out.println(iterator1.next());
        }

    }
}
```



#### 使用 foreach 循环遍历集合元素

- Java 5.0 提供了 foreach 循环迭代访问 Collection和数组。
- 遍历操作不需获取Collection或数组的长度，无需使用索引访问元素。
- **遍历集合的底层调用Iterator完成操作。**
- foreach还可以用来遍历数组。



![image-20211026171404869](/assets/imgs/JavaSE4.assets/image-20211026171404869.png)



```java
package com.yixihan.day1026.iteratortest;

import com.yixihan.day1026.collectiontest.Person;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

/**
 * JDK 5.0 新增了 foreach 循环, 用于遍历集合和数组
 *
 * @author : yixihan
 * @create : 2021-10-26-19:58
 */
public class ForTest {

    @Test
    public void test1 () {
        Collection coll = new ArrayList();
        coll.add("AA");
        coll.add(false);
        coll.add(123);
        coll.add(new Date());
        coll.add(new Person("Tom", 18));
        coll.add(new String("Jane"));

        // for (集合中元素的类型 局部变量 : 集合对象)
        // 内部仍然调用了迭代器
        for (Object obj : coll) {
            System.out.println(obj);
        }
    }

    @Test
    public void test2 () {
        int[] arr = {1, 2, 3, 4, 5, 6, 7, 8};

        // for (数组中元素的类型 局部变量 : 数组对象)
        for (int i : arr) {
            System.out.println(i);
        }
    }
    
    
    @Test
    public void test3 () {
        String[] arr = new String[]{"MM","MM","MM"};

        // 方式一 : 普通 for 循环赋值 输出为 "GG"
        for (int i = 0; i < arr.length; i++) {
            arr[i] = "GG";
        }
        
        // 方式二 : 增强 for 循环 输出为 "MM"
        for (String s : arr) {
            s = "GG";
        }

        
        for (int i = 0; i < arr.length; i++) {
            System.out.println(arr[i]);
        }
    }
}
```



### Collection子接口之一： List接口



#### List接口概述

- 鉴于Java中数组用来存储数据的局限性，我们通常使用List替代数组
- List集合类中==元素有序==、==且可重复==，集合中的每个元素都有其对应的顺序索引
- List容器中的元素都对应一个整数型的序号记载其在容器中的位置，可以根据 序号存取容器中的元素
- JDK API中List接口的实现类常用的有：ArrayList、LinkedList和Vector。



#### List接口方法

List除了从Collection集合继承的方法外，List 集合里添加了一些根据索引来 操作集合元素的方法

- void add(int index, Object ele):在index位置插入ele元素
- boolean addAll(int index, Collection eles):从index位置开始将eles中 的所有元素添加进来
- Object get(int index):获取指定index位置的元素
- int indexOf(Object obj):返回obj在集合中首次出现的位置
- int lastIndexOf(Object obj):返回obj在当前集合中末次出现的位置
- Object remove(int index):移除指定index位置的元素，并返回此元素
- Object set(int index, Object ele):设置指定index位置的元素为ele
- List subList(int fromIndex, int toIndex):返回从fromIndex到toIndex 位置的子集合



#### List实现类之一：ArrayList



ArrayList 是 List 接口的典型实现类、主要实现类

本质上，ArrayList是对象引用的一个”变长”数组



> ArrayList的JDK1.8之前与之后的实现区别？

- JDK1.7：ArrayList像饿汉式，直接创建一个初始容量为10的数组
- JDK1.8：ArrayList像懒汉式，一开始创建一个长度为0的数组，当添加第一个元 素时再创建一个始容量为10的数组



Arrays.asList(…) 方法返回的 List 集合，既不是 ArrayList 实例，也不是 Vector 实例。 Arrays.asList(…) 返回值是一个固定长度的 List 集合

![image-20211026171707657](/assets/imgs/JavaSE4.assets/image-20211026171707657.png)



##### ArrayList 源码分析

```java
package com.yixihan.day1026.listTest;

/**
 *
 * 1. List 接口框架
 * |--- Collection 接口 : 单列集合, 用来存储一个一个的对象
 *          |--- List 接口 : 存储有序的 可重复的数据  ---> "动态数组"
 *              |--- ArrayList : 作为 List 接口的主要实现类, 线程不安全的, 效率高
 *              |--- LinkedList : 对于频繁的插入 删除操作, 使用此类效率比 ArrayList 高
 *              |--- Vector : 作为 List 接口的古老实现类, 线程安全的, 效率低
 *
 *
 * 2. ArrayList 的源码分析 :
 *      1. JDK 7 情况如下
 *
 *          空参构造 :
 *          ArrayList list = new ArrayList();  // 底层创建了长度是 10 的 Object[] 数组 elementData
 *
 *          添加操作 :
 *          list.add(123); // elementData[0] = new Integer(123);
 *          ...
 *          list.add(11); // 如果此次的添加导致底层 elementData 数组容量不够, 则扩容
 *          默认情况下, 扩容为原来容量的 1.5 倍, 同时需要将原有数组中的数据复制到新的数组中
 *
 *
 *          
 *
 *
 *          结论 : 推荐不用空参构造器, 使用带参的构造器 ArrayList list = new ArrayList(int initialCapacity)
 *
 *      2. JDK 8 中 ArrayList 的变化 :
 *
 *          空参构造 :
 *          ArrayList list = new ArrayList(); // 底层 Object[] elementData 初始化为 {}, 并没有创建长度为 10 的数组
 *
 *          添加操作 :
 *          list.add(123); // 第一次调用 add() 是, 底层才创建了长度为 10 的数组, 并将数据 123 添加到 elementData 数组中
 *          ...
 *          后续的添加和扩容操作和 JDK 7 相同
 *
 *
 *
 *      3. 小结 : JDK 7 中的 ArrayList 的对象的创建类似于单例的饿汉式
 *               JDK 8 中的 ArrayList 的对象的创建类似于单例的懒汉式, 延迟了数组的创建, 节省内存
 *
 *
 *
 *
 *
 *
 *
 * 面试题 : 比较 ArrayList LinkedList Vector 的异同
 *      相同点 : 三个类都实现了 List 的接口, 存储数据的特点相同
 *      不同点 :
 *          1. ArrayList 作为 List 接口的主要实现类, 线程不安全的, 效率高
 *             ArrayList 底层使用 Object[] elementData 存储
 *
 *          2. Vector 作为 List 接口的古老实现类, 线程安全的, 效率低
 *             Vector 底层使用 Object[] elementData 存储
 *
 *          3. LinkedList 对于频繁的插入 删除操作, 使用此类效率比 ArrayList 高
 *             LinkedList 底层使用的双向链表存储
 * @author : yixihan
 * @create : 2021-10-26-20:07
 */
public class ListTest {
}

// JDK 7底层源码 :
public ArrayList() {this(10);}

public boolean add(E e) {
    // Increments modCount!! 判断 elementData 是否还有剩余空间
    ensureCapacityInternal(size + 1);
    elementData[size++] = e;
    return true;
}

private void ensureCapacityInternal(int minCapacity) {
    // 此列表在结构上被修改的次数。
    modCount++; 
    // overflow-conscious code
    // 判断是否还有剩余空间
    if (minCapacity - elementData.length > 0) {
        // 扩容操作
        grow(minCapacity);
    }
}

private void grow(int minCapacity) {
    // overflow-conscious code
    // 获取原来数组的长度
    int oldCapacity = elementData.length;
    // 将其扩容为原来数组长度的 1.5 倍
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    // 如果还是比现需要的长度小, 则直接将现需要的长度拿来作为新数组长度
    if (newCapacity - minCapacity < 0) {
        newCapacity = minCapacity;
    }
    // 如果新的长度比 ArrayList 中默认最大长度还长, 则取 Integer 最大长度作为数组长度, 若还是不够, 则抛出异常 OutOfMemoryError()
    if (newCapacity - MAX_ARRAY_SIZE > 0) {
        newCapacity = hugeCapacity(minCapacity);
    }
    // minCapacity is usually close to size, so this is a win:
    elementData = Arrays.copyOf(elementData, newCapacity);
}

// JDK 8 底层源码 :
           
public ArrayList() {this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;}
private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};
private static final int DEFAULT_CAPACITY = 10;

public boolean add(E e) {
    // Increments modCount!! 仍然是调用这个方法判断数组长度是否符合要求
    ensureCapacityInternal(size + 1);
    elementData[size++] = e;
    return true;
}

// 这里大改, 先调用 calculateCapacity 方法判断是否是刚创建的数组, 再调用 ensureExplicitCapacity 方法进行数组长度判断
private void ensureCapacityInternal(int minCapacity) {
    ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
}

// 首先判断 elementData 是否为 DEFAULTCAPACITY_EMPTY_ELEMENTDATA
// 如果是, 则返回 minCapacity 和 DEFAULTCAPACITY_EMPTY_ELEMENTDATA 数组的长度 DEFAULT_CAPACITY 中较长的一个
// 如果不是, 则返回 minCapacity
private static int calculateCapacity(Object[] elementData, int minCapacity) {
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        return Math.max(DEFAULT_CAPACITY, minCapacity);
    }
    return minCapacity;
}

// 后面的判断操作和 JDK 7 相同
private void ensureExplicitCapacity(int minCapacity) {
    modCount++;

    // overflow-conscious code
    if (minCapacity - elementData.length > 0)
        grow(minCapacity);
}

private void grow(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    // minCapacity is usually close to size, so this is a win:
    elementData = Arrays.copyOf(elementData, newCapacity);
}
```





#### List实现类之二：LinkedList



对于==频繁的插入或删除元素的操作==，建议使用LinkedList类，效率较高



新增方法

- void addFirst(Object obj)
- void addLast(Object obj)
- Object getFirst()
- Object getLast()
- Object removeFirst()
- Object removeLast()



LinkedList：==双向链表==，内部没有声明数组，而是定义了Node类型的first和last， 用于记录首末元素。同时，定义内部类Node，作为LinkedList中保存数据的基 本结构。Node除了保存数据，还定义了两个变量：

- prev变量记录前一个元素的位置
- next变量记录下一个元素的位置



```java
private static class Node<E> {
    E item;
    Node<E> next;
    Node<E> prev;
    Node(Node<E> prev, E element, Node<E> next) {
        this.item = element;
        this.next = next;
        this.prev = prev;
    }
}
```



![image-20211026171844288](/assets/imgs/JavaSE4.assets/image-20211026171844288.png)



##### LinkedList 源码分析

```java
package com.yixihan.day1026.listTest;

import org.junit.Test;

import java.util.LinkedList;

/**
 *
 * 3. LinkedList 的源码分析
 *
 *      实例化
 *      new LinkedList = new LinkedList(); // 内部声明了 Node 类型的 first 和 last属性, 默认值为 null
 *
 *      添加操作
 *      list.add(123); // 将 123 封装到 Note 中, 创建了 Node 对象
 *
 *      其中, Node 定义为 : 体现了 LinkedList 的双向链表的说法
 *      private static class Node<E> {
 *         E item;
 *         Node<E> next;
 *         Node<E> prev;
 *
 *         Node(Node<E> prev, E element, Node<E> next) {
 *             this.item = element;
 *             this.next = next;
 *             this.prev = prev;
 *         }
 *     }
 *
 *
 * @author : yixihan
 * @create : 2021-10-26-21:11
 */
public class LinkedListTest {
}

// 源码 :

// 空参构造 :
public LinkedList() {}

// 添加方法 :
public boolean add(E e) {
    // 添加操作
    linkLast(e);
    return true;
}

void linkLast(E e) {
    // 获取 last
    final Node<E> l = last;
    // 创建一个新的 Node 对象, 其前指针指向 last, 后指针指向 null
    final Node<E> newNode = new Node<>(l, e, null);
    // last 替换为 newNode
    last = newNode;
    // 如果添加之前的 last 为空, 则 newNode 作为 first, 否则 last 的后指针指向 newNode
    if (l == null)
        first = newNode;
    else
        l.next = newNode;
    size++;
    modCount++;
}

private void linkFirst(E e) {
    // 获取 first
    final Node<E> f = first;
    // 创建一个新的 Node 对象, 其前指针指向 null, 后指针指向 last
    final Node<E> newNode = new Node<>(null, e, f);
    // first 替换为 newNode
    first = newNode;
    // 如果添加之前的 first 为空, 则 newNode 作为 last, 否则 first 的后指针指向 newNode
    if (f == null)
        last = newNode;
    else
        f.prev = newNode;
    size++;
    modCount++;
}

// Node 类的声明
private static class Node<E> {
    E item;
    Node<E> next;
    Node<E> prev;

    Node(Node<E> prev, E element, Node<E> next) {
        this.item = element;
        this.next = next;
        this.prev = prev;
    }
}
```



#### List 实现类之三：Vector

Vector 是一个古老的集合，JDK1.0就有了。大多数操作与ArrayList 相同，区别之处在于==Vector是线程安全的==。



在各种list中，最好把ArrayList作为缺省选择。当插入、删除频繁时， 使用LinkedList；Vector总是比ArrayList慢，所以尽量避免使用。



新增方法

- void addElement(Object obj)
- void insertElementAt(Object obj,int index)
- void setElementAt(Object obj,int index)
- void removeElement(Object obj)
- void removeAllElements()



##### Vector 源码分析

```java
package com.yixihan.day1026.listTest;

/**
 *
 * 4. Vector 源码分析 :
 *      JDK 7 和 JDK 8 中通过 Vector() 构造器创建对象时, 底层都创建了长度为 10 的数组
 *      在扩容方面, 默认扩容为原来的数组长度的 2 倍
 *
 *
 *      源码 :
 *      public Vector() {
 *          this(10);
 *      }
 *
 *      private void grow(int minCapacity) {
 *         // overflow-conscious code
 *         int oldCapacity = elementData.length;
 *         int newCapacity = oldCapacity + ((capacityIncrement > 0) ?
 *                                          capacityIncrement : oldCapacity);
 *         if (newCapacity - minCapacity < 0)
 *             newCapacity = minCapacity;
 *         if (newCapacity - MAX_ARRAY_SIZE > 0)
 *             newCapacity = hugeCapacity(minCapacity);
 *         elementData = Arrays.copyOf(elementData, newCapacity);
 *     }
 *
 *
 * @author : yixihan
 * @create : 2021-10-26-21:38
 */
public class VectorTest {
}
```



#### List常用方法小总结 : 

```java
package com.yixihan.day1026.listTest;

import com.yixihan.day1026.collectiontest.Person;
import org.junit.Test;

import java.util.*;

/**
 * 5. List 接口中的常用方法
 *
 *      void add(int index, Object ele):在index位置插入ele元素
 *      boolean addAll(int index, Collection eles):从index位置开始将eles中 的所有元素添加进来
 *      Object get(int index):获取指定index位置的元素
 *      int indexOf(Object obj):返回obj在集合中首次出现的位置
 *      int lastIndexOf(Object obj):返回obj在当前集合中末次出现的位置
 *      Object remove(int index):移除指定index位置的元素，并返回此元素
 *      Object set(int index, Object ele):设置指定index位置的元素为ele
 *      List subList(int fromIndex, int toIndex):返回从fromIndex到toIndex 位置的子集合
 *
 *
 * 总结常用方法 :
 *      增 : add(Object obj) / addAll(Collection coll)
 *      删 : remove(int index) / remove(Object obj)
 *      改 : set(int index, Object ele)
 *      查 : get(int index)
 *      插 : add(index, Object ele)
 *      长度 : size()
 *      遍历 :
 *          1. Iterator 迭代器方式
 *          2. 增强 for 循环
 *          3. 普通的 for 循环
 *
 * @author : yixihan
 * @create : 2021-10-26-21:51
 */
public class ListMethodTest {

    @Test
    public void test1 () {
        ArrayList list = new ArrayList();
        list.add(123);
        list.add("ABC");
        list.add(new Date());
        list.add(new Person("Tom", 18));
        list.add(new String("Jane"));
        list.add(false);
        list.add(123);

        System.out.println(list);

        // 1. void add(int index, Object ele) : 在index位置插入ele元素
        list.add(1, "BB");

        System.out.println(list);

        // 2. boolean addAll(int index, Collection eles) : 从index位置开始将eles中 的所有元素添加进来
        List list1 = Arrays.asList(1, 2, 3);

        System.out.println("添加之前 : size = " + list.size());
        list.addAll(list1);
        System.out.println("添加之后 : size = " + list.size());
        System.out.println(list);


        // 3. Object get(int index) : 获取指定index位置的元素
        System.out.println(list.get(5));
    }

    @Test
    public void test2 () {
        ArrayList list = new ArrayList();
        list.add(123);
        list.add("ABC");
        list.add(new Date());
        list.add(new Person("Tom", 18));
        list.add(new String("Jane"));
        list.add(false);
        list.add(123);

        // 4. int indexOf(Object obj) : 返回obj在集合中首次出现的位置, 如果不存在, 返回 -1

        int index = list.indexOf("ABC");
        System.out.println(index);

        int index1 = list.lastIndexOf(123);
        System.out.println(index1);


        // 5. Object remove(int index) : 移除指定index位置的元素，并返回此元素
        Object remove = list.remove(0);
        System.out.println(remove);
        System.out.println(list);


        // 6. Object set(int index, Object ele):设置指定index位置的元素为ele
        list.set(1, 35);
        System.out.println(list);

        // 7. List subList(int fromIndex, int toIndex):返回从fromIndex到toIndex 位置的左闭右开的子集合
        List list1 = list.subList(1, 5);
        System.out.println(list1);
    }

    @Test
    public void test3 () {
        ArrayList list = new ArrayList();
        list.add(123);
        list.add("ABC");
        list.add(new Date());
        list.add(new Person("Tom", 18));
        list.add(new String("Jane"));
        list.add(false);
        list.add(123);

        Iterator iterator = list.iterator();

        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }

        System.out.println("**********************");

        for (Object obj : list) {
            System.out.println(obj);
        }

        System.out.println("**********************");

        for (int i = 0; i < list.size(); i++) {
            System.out.println(list.get(i));
        }
    }
}
```



#### 面试题

```java
面试题 : 比较 ArrayList LinkedList Vector 的异同
     相同点 : 三个类都实现了 List 的接口, 存储数据的特点相同
     不同点 :
          1. ArrayList 作为 List 接口的主要实现类, 线程不安全的, 效率高
             ArrayList 底层使用 Object[] elementData 存储

          2. Vector 作为 List 接口的古老实现类, 线程安全的, 效率低
             Vector 底层使用 Object[] elementData 存储

          3. LinkedList 对于频繁的插入 删除操作, 使用此类效率比 ArrayList 高
             LinkedList 底层使用的双向链表存储
```



```java
package com.yixihan.day1026.listTest.exer.test1;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * @author : yixihan
 * @create : 2021-10-26-22:08
 */
public class ListExer {
    @Test
    public void testListRemove() {
        List list = new ArrayList();
        list.add(1);
        list.add(2);
        list.add(3);
        updateList(list);
        // 1, 2
        System.out.println(list);
    }
    private static void updateList(List list) {
        // 删除 index = 2 的元素
        list.remove(2);
        // 删除元素 2
        // list.remove(new Integer(2));
    }
}
```



```java
请问ArrayList/LinkedList/Vector的异同？谈谈你的理解？ArrayList底层
是什么？扩容机制？Vector和ArrayList的最大区别?

ArrayList和LinkedList的异同
	二者都线程不安全，相对线程安全的Vector，执行效率高。
	此外，ArrayList是实现了基于动态数组的数据结构，LinkedList基于链表的数据结构。对于
	随机访问get和set，ArrayList觉得优于LinkedList，因为LinkedList要移动指针。对于新增
	和删除操作add(特指插入)和remove，LinkedList比较占优势，因为ArrayList要移动数据。
    
    
ArrayList和Vector的区别
	Vector和ArrayList几乎是完全相同的,唯一的区别在于Vector是同步类(synchronized)，属于
	强同步类。因此开销就比ArrayList要大，访问要慢。正常情况下,大多数的Java程序员使用
	ArrayList而不是Vector,因为同步完全可以由程序员自己来控制。Vector每次扩容请求其大
	小的2倍空间，而ArrayList是1.5倍。Vector还有一个子类Stack。

```





### Collection子接口之二： Set接口



#### Set 接口概述

Set接口是Collection的子接口，set接口没有提供额外的方法



Set 集合不允许包含相同的元素，如果试把两个相同的元素加入同一个 Set 集合中，则添加操作失败。



Set 判断两个对象是否相同不是使用 == 运算符，而是根据 equals() 方法





#### Set实现类之一：HashSet



HashSet 是 Set 接口的典型实现，大多数时候使用 Set 集合时都使用这个实现类。

HashSet 按 Hash 算法来存储集合中的元素，因此具有很好的存取、查找、删除 性能。





> HashSet 具有以下特点

- 不能保证元素的排列顺序
- HashSet 不是线程安全的
- 集合元素可以是 null



**HashSet 集合判断两个元素相等的标准**：两个对象通过 hashCode() 方法比较相 等，并且两个对象的 equals() 方法返回值也相等。



对于存放在Set容器中的对象，==对应的类一定要重写equals()和hashCode(Object obj)方法，以实现对象相等规则。即：“相等的对象必须具有相等的散列码”。==



> 向HashSet中添加元素的过程

- 当向 HashSet 集合中存入一个元素时，HashSet 会调用该对象的 hashCode() 方法 来得到该对象的 hashCode 值，然后根据 hashCode 值，通过某种散列函数决定该对象 在 HashSet 底层数组中的存储位置。（这个散列函数会与底层数组的长度相计算得到在 数组中的下标，并且这种散列函数计算还尽可能保证能均匀存储元素，越是散列分布， 该散列函数设计的越好）
- 如果两个元素的hashCode()值相等，会再继续调用equals方法，如果equals方法结果 为true，添加失败；如果为false，那么会保存该元素，但是该数组的位置已经有元素了， 那么会通过链表的方式继续链接。



如果两个元素的 equals() 方法返回 true，但它们的 hashCode() 返回值不相 等，hashSet 将会把它们存储在不同的位置，但依然可以添加成功。



![image-20211026172306990](/assets/imgs/JavaSE4.assets/image-20211026172306990.png)



##### 重写 hashCode() 方法的基本原则



- 在程序运行时，同一个对象多次调用 hashCode() 方法应该返回相同的值
- 当两个对象的 equals() 方法比较返回 true 时，这两个对象的 hashCode() 方法的返回值也应相等。
- 对象中用作 equals() 方法比较的 Field，都应该用来计算 hashCode 值。



##### 重写 equals() 方法的基本原则

- 当一个类有自己特有的“逻辑相等”概念,当改写equals()的时候，总是 要改写hashCode()，根据一个类的equals方法（改写后），两个截然不 同的实例有可能在逻辑上是相等的，但是，根据Object.hashCode()方法， 它们仅仅是两个对象
- 因此，==违反了“相等的对象必须具有相等的散列码”==。
- 结论：复写equals方法的时候一般都需要同时复写hashCode方法。**通 常参与计算hashCode的对象的属性也应该参与到equals()中进行计算**



##### Eclipse/IDEA工具里hashCode()的重写



以Eclipse/IDEA为例，在自定义类中可以调用工具自动重写equals和hashCode。 问题：为什么用Eclipse/IDEA复写hashCode方法，有31这个数字？



- 选择系数的时候要选择尽量大的系数。因为如果计算出来的hash地址越大，所谓的 “冲突”就越少，查找起来效率也会提高。（减少冲突）
- 并且31只占用5bits,相乘造成数据溢出的概率较小。
- 31可以 由i*31== (i<<5)-1来表示,现在很多虚拟机里面都有做相关优化。（提高算法效 率）
- 31是一个素数，素数作用就是如果我用一个数字来乘以这个素数，那么最终出来的结 果只能被素数本身和被乘数还有1来整除！(减少冲突)



```java
package com.yixihan.day1026.settest;

import org.junit.Test;

import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

/**
 * 1. Set 接口的框架结构
 *      |--- Collection 接口 : 单列集合, 用来存储一个一个的对象
 *          |--- Set 接口 : 存储无序的 不可重复的数据 ---> 高中讲的 "集合"
 *              |--- HashSet : 作为 Set 接口的主要实现类; 线程不安全的; 可以存储 null 值
 *                  |--- LinkedHashSet : 作为 HashSet 的子类; 遍历其内部数据是, 可以按照添加的顺序遍历
 *										 优点 : 对于频繁的遍历操作, LinkedHashSet 效率高于 HashSet
 *              |--- TreeSet : 可以按照添加对象的指定属性进行排序; 采用红黑树实现
 *
 *
 * 2. Set接口中没有额外定义新的方法, 使用的都是 Collection 接口中定义过的方法
 *
 * 3. 要求 : 向 Set 中添加的数据, 其所在的类一定要重写 hashcode() 方法和 equals() 方法
 *    要求 : 重写的 hashcode() 方法和 equals() 方法尽可能保持一致性 : 相等的对象必须具有相等的散列码
 *      重写两个方法的小技巧 : 对象中用作 equals() 方法比较的 Field，都应该用来计算 hashCode 值。
 *
 * @author : yixihan
 * @create : 2021-10-26-22:12
 */
public class SetTest {

    /*
    一. Set : 存储无序的, 不可重复的数据
    以 HashSet 为例说明 :
    1. 无序性 : 不等于随机性. 存储的数据在底层数组中并非按照数组索引的顺序添加, 而是根据数据的哈希值添加

    2. 不可重复性 : 保证添加的元素按照 equals() 判断时, 不能返回 true, 即相同的元素只能添加一个, 需要 hashcode() 函数协助

    二. 添加元素的过程 : 以 HashSet 为例
        我们向 HashSet 中添加元素 a, 首先调用元素 a 所在类的 hashCode() 方法, 计算元素 a 的哈希值,
        此哈希值接着通过某种算法 (暂时不讲) 及计算出在 HashSet 底层数组中的存放位置 (即为 : 索引位置), 判断
        数组此位置上是否已经有元素
        如果此位置上没有其他元素 : 则元素 a 添加成功  ---> 情况 A
        如果此位置上有其他元素 b (或以链表形式存在的多个元素), 则比较元素 a 与 元素 b 的 hash 值
            如果 hash 值不同, 则元素 a 添加成功  ---> 情况 B
            如果 hash 值相同, 进而需要调用元素 a 所在类的 equals() 方法 :
                equals() 返回 true, 元素 a 添加失败
                equals() 返回 false, 元素 a 添加成功  ---> 情况 C

        对于添加成功的情况 B 和情况 C 来说 : 元素 a 与已经存在指定索引位置上数据以链表的方式存储
            jdk 7 : 元素 a 放到数组中, 指向原来的元素
            jdk 8 : 原来的元素在数组中, 指向元素 a
            总结 : 七上八下


        HashSet 底层 : 数组 + 链表的组合

     */

    @Test
    public void test1 () {
        Set set = new HashSet();
        set.add(123);
        set.add("ABC");
        set.add(new Date());
        set.add(new User("Tom", 18));
        set.add(new User("Tom", 18));
        set.add(new String("Jane"));
        set.add(129);
        set.add(129);

        Iterator iterator = set.iterator();

        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
}
```



#### Set实现类之二：LinkedHashSet



- LinkedHashSet 是 HashSet 的子类

- LinkedHashSet 根据元素的 hashCode 值来决定元素的存储位置， 但它同时使用双向链表维护元素的次序，这使得元素看起来是以插入 顺序保存的。

- ==LinkedHashSet插入性能略低于 HashSet==，但在迭代访问 Set 里的全 部元素时有很好的性能。

- LinkedHashSet 不允许集合元素重复



> LinkedHashSet底层结构

![image-20211026172617844](/assets/imgs/JavaSE4.assets/image-20211026172617844.png)



```java
package com.yixihan.day1026.settest;

import org.junit.Test;

import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * LinkedHashSet
 *
 * LinkedHashSet 作为 HashSet 的子类, 在添加数据的同时, 每个数据还维护了两个引用, 记录此数据前一个数据和后一个数据
 *
 *      优点 : 对于频繁的遍历操作, LinkedHashSet 效率高于 HashSet
 *
 * @author : yixihan
 * @create : 2021-10-26-22:57
 */
public class LinkedHashSetTest {

    @Test
    public void test1 () {
        Set set = new LinkedHashSet();
        set.add(123);
        set.add("ABC");
        set.add(new Date());
        set.add(new User("Tom", 18));
        set.add(new String("Jane"));
        set.add(129);

        Iterator iterator = set.iterator();

        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
}
```



#### Set实现类之三：TreeSet



- TreeSet 是 SortedSet 接口的实现类，TreeSet 可以确保集合元素处于排序状态。
- TreeSet底层使用==红黑树==结构存储数据
- 新增的方法如下
  - Comparator comparator()
  - Object first()
  - Object last()
  - Object lower(Object e)
  - Object higher(Object e)
  - SortedSet subSet(fromElement, toElement)
  - SortedSet headSet(toElement)
  - SortedSet tailSet(fromElement)
- TreeSet 两种排序方法：==自然排序==和==定制排序==。默认情况下，TreeSet 采用自然排序。

![image-20211026172750726](/assets/imgs/JavaSE4.assets/image-20211026172750726.png)



##### 排 序—自然排序

- ==自然排序==：TreeSet 会调用集合元素的 compareTo(Object obj) 方法来比较元 素之间的大小关系，然后将集合元素按升序(默认情况)排列
- ==如果试图把一个对象添加到 TreeSet 时，则该对象的类必须实现 Comparable 接口。==
  - 实现 Comparable 的类必须实现 compareTo(Object obj) 方法，两个对象即通过 compareTo(Object obj) 方法的返回值来比较大小。
- Comparable 的典型实现
  - BigDecimal、BigInteger 以及所有的数值型对应的包装类：按它们对应的数值大小 进行比较
  - Character：按字符的 unicode值来进行比较
  - Boolean：true 对应的包装类实例大于 false 对应的包装类实例
  - String：按字符串中字符的 unicode 值进行比较
  - Date、Time：后边的时间、日期比前面的时间、日期大
- 向 TreeSet 中添加元素时，只有第一个元素无须比较compareTo()方法，后面添 加的所有元素都会调用compareTo()方法进行比较。
- ==因为只有相同类的两个实例才会比较大小，所以向 TreeSet 中添加的应该是同 一个类的对象==
- 对于 TreeSet 集合而言，它**判断两个对象是否相等的唯一标准**是：两个对象通 过 compareTo(Object obj) 方法比较返回值。
- 当需要把一个对象放入 TreeSet 中，重写该对象对应的 equals() 方法时，应保 证该方法与 compareTo(Object obj) 方法有一致的结果：如果两个对象通过 equals() 方法比较返回 true，则通过 compareTo(Object obj) 方法比较应返回 0。 否则，让人难以理解



##### 排 序—定制排序

- TreeSet的自然排序要求元素所属的类实现Comparable接口，如果元素所属的类没 有实现Comparable接口，或不希望按照升序(默认情况)的方式排列元素或希望按照 其它属性大小进行排序，则考虑使用定制排序。定制排序，通过Comparator接口来 实现。需要重写compare(T o1,T o2)方法。
- 利用int compare(T o1,T o2)方法，比较o1和o2的大小：如果方法返回正整数，则表 示o1大于o2；如果返回0，表示相等；返回负整数，表示o1小于o2。
- 要实现定制排序，需要将实现Comparator接口的实例作为形参传递给TreeSet的构 造器
- 此时，==仍然只能向TreeSet中添加类型相同的对象==。否则发生ClassCastException异 常。
- 使用定制排序==判断两个元素相等的标准==是：通过Comparator比较两个元素返回了0。



```java
package com.yixihan.day1026.settest;

import org.junit.Test;

import java.util.Comparator;
import java.util.Iterator;
import java.util.Set;
import java.util.TreeSet;

/**
 * TreeSet 的使用
 * @author : yixihan
 * @create : 2021-10-26-23:02
 */
public class TreeSetTest {

    /*
    1. 向 TreeSet 中添加的数据, 要求是向同类的对象
    2. 两种排序方式 : 自然排序 (实现 Comparable 接口) 和 定制排序 (实现 Comparator 接口)

    3. 自然排序中, 比较两个对象是否相同的标准为 : compareTO() 返回 0, 不再是 equals()

    4. 定制排序中, 比较两个对象是否相同的标准为 : compare() 放回 0, 不再是 equals()
     */

    @Test
    public void test1 () {
        Set set = new TreeSet();
        set.add(123);
        // 失败 : 不能添加不同类的对象
//        set.add("ABC");
//        set.add(new Date());
//        set.add(new User("Tom", 18));
//        set.add(new String("Jane"));
        set.add(129);
        set.add(12);
        set.add(19);
        set.add(29);

        Iterator iterator = set.iterator();

        // 从小到大遍历
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }

        // 举例二 : 使用自定义类 需要实现 Comparable 接口
        Set set1 = new TreeSet();

        set1.add(new User("Tom", 18));
        set1.add(new User("Jane", 18));
        set1.add(new User("Jack", 18));
        set1.add(new User("Jim", 18));
        set1.add(new User("Mike", 18));
        set1.add(new User("Jerry", 18));
        set1.add(new User("Jerry", 56));

        iterator = set1.iterator();

        // 从小到大遍历
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }


    }

    @Test
    public void test2 () {
        Comparator comparator = new Comparator() {
            @Override
            public int compare(Object o1, Object o2) {
                if (o1 instanceof User && o2 instanceof User) {
                    User u1 = (User) o1;
                    User u2 = (User) o2;

                    int compare =  u1.getName().compareTo(u2.getName());

                    if (compare != 0) {
                        return compare;
                    } else {
                        return Integer.compare(u1.getAge(), u2.getAge());
                    }

                } else {
                    throw new RuntimeException("传入的数据类型不匹配");
                }
            }

        };

        Set set = new TreeSet(comparator);
        set.add(new User("Tom", 18));
        set.add(new User("Jane", 18));
        set.add(new User("Jack", 18));
        set.add(new User("Jim", 18));
        set.add(new User("Mike", 18));
        set.add(new User("Jerry", 18));
        set.add(new User("Jerry", 56));
        set.add(new User("Jerry", 56));


        Iterator iterator = set.iterator();

        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
}
```





#### 实验

定义一个 Employee 类。 

该类包含：private 成员变量 name,age,birthday，其中 birthday 为 MyDate 类的对象； 

并为每一个属性定义 getter, setter 方法； 

并重写 toString 方法输出 name, age, birthday 



MyDate 类包含: private 成员变量 year,month,day；

并为每一个属性定义 getter, setter 方法； 



创建该类的 5 个对象，并把这些对象放入 TreeSet 集合中（下一章： TreeSet 需使用泛型来定义） 分别按以下两种方式对集合中的元素进行排序，并遍历输出： 

1). 使 Employee 实现 Comparable 接口，并按 name 排序

2). 创建 TreeSet 时传入 Comparator 对象，按生日日期的先后排序。



Employee

```java
package com.yixihan.day1027.collectiontest.exer.test2;

import java.util.Objects;

/**
 * @author : yixihan
 * @create : 2021-10-27-13:23
 */
public class Employee implements Comparable{

    /**
     * 姓名
     */
    private String name;

    /**
     * 年龄
     */
    private int age;

    /**
     * 生日
     */
    private MyDate birthday;


    /**
     * 无参构造
     */
    public Employee() { }


    /**
     * 全参构造
     * @param name 姓名
     * @param age 年龄
     * @param birthday 生日
     */
    public Employee(String name, int age, MyDate birthday) {
        this.name = name;
        this.age = age;
        this.birthday = birthday;
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
        return getAge() == employee.getAge() && Objects.equals(getName(), employee.getName()) && Objects.equals(getBirthday(), employee.getBirthday());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName(), getAge(), getBirthday());
    }

    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", birthday=" + birthday +
                '}';
    }

    @Override
    public int compareTo(Object o) {
        if (o instanceof Employee) {
            Employee employee = (Employee) o;

            return this.name.compareTo(employee.name);
        } else {
            throw new RuntimeException("传入的数据类型不匹配");
        }
    }
}
```



MyDate

```java
package com.yixihan.day1027.collectiontest.exer.test2;

import java.util.Objects;

/**
 * @author : yixihan
 * @create : 2021-10-27-13:23
 */
public class MyDate implements Comparable{

    /**
     * 年
     */
    private Integer year;

    /**
     * 月
     */
    private Integer month;

    /**
     * 日
     */
    private Integer day;


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
    public MyDate(Integer year, Integer month, Integer day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getDay() {
        return day;
    }

    public void setDay(Integer day) {
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
        return getYear().equals(myDate.getYear()) && getMonth().equals(myDate.getMonth()) && getDay().equals(myDate.getDay());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getYear(), getMonth(), getDay());
    }

    @Override
    public String toString() {
        return "MyDate{" +
                "year=" + year +
                ", month=" + month +
                ", day=" + day +
                '}';
    }

    @Override
    public int compareTo(Object o) {
        if (o instanceof MyDate) {

            MyDate m = (MyDate) o;
            // 比较年
            int minusYear = this.getYear().compareTo(m.getYear());

            if (minusYear != 0) {
                return minusYear;
            }

            // 比较月
            int minusMonth = this.getMonth().compareTo(m.getMonth());

            if (minusMonth != 0) {
                return minusMonth;
            }

            // 比较日
            return this.getDay().compareTo(m.getDay());
        }

        throw new RuntimeException("传入的数据类型不匹配");
    }
}
```



Test

```java
package com.yixihan.day1027.collectiontest.exer.test2;

import org.junit.Test;

import java.util.Comparator;
import java.util.TreeSet;

/**
 * @author : yixihan
 * @create : 2021-10-27-13:28
 */
public class EmployeeTest {

    @Test
    public void testComparable () {

        TreeSet set = new TreeSet();

        set.add(new Employee("Jane", 24, new MyDate(1997, 5 , 20)));
        set.add(new Employee("Tom", 29, new MyDate(1992, 10 , 1)));
        set.add(new Employee("Jack", 23, new MyDate(1998, 5 , 1)));
        set.add(new Employee("Duck", 25, new MyDate(1996, 9 , 9)));
        set.add(new Employee("Jane", 26, new MyDate(1995, 8 , 8)));
        set.add(new Employee("Uer", 27, new MyDate(1994, 6 , 7)));

        set.forEach(System.out::println);
    }

    @Test
    public void testComparator () {

        Comparator comparator = new Comparator() {
            @Override
            public int compare(Object o1, Object o2) {
                if (o1 instanceof Employee && o2 instanceof Employee) {
                    Employee e1 = (Employee) o1;
                    Employee e2 = (Employee) o2;

                    MyDate b1 = e1.getBirthday();
                    MyDate b2 = e2.getBirthday();

                    // 方式一 : 在 Comparator 类的匿名对象里实现比较方法
//                    // 比较年
//                    int minusYear = b1.getYear().compareTo(b2.getYear());
//
//                    if (minusYear != 0) {
//                        return minusYear;
//                    }
//
//                    // 比较月
//                    int minusMonth = b1.getMonth().compareTo(b2.getMonth());
//
//                    if (minusMonth != 0) {
//                        return minusMonth;
//                    }
//
//                    // 比较日
//                    return b1.getDay().compareTo(b2.getDay());

                    // 方式二 : 在 MyDate 类中实现 Comparable 接口中的 CompareTo() 方法, 直接调用
                    return b1.compareTo(b2);


                } else {
                    throw new RuntimeException("传入的数据类型不匹配");
                }
            }
        };

        TreeSet set = new TreeSet(comparator);


        set.add(new Employee("Jane", 24, new MyDate(1997, 5 , 20)));
        set.add(new Employee("Tom", 29, new MyDate(1992, 10 , 1)));
        set.add(new Employee("Jack", 23, new MyDate(1998, 5 , 1)));
        set.add(new Employee("Duck", 25, new MyDate(1996, 9 , 9)));
        set.add(new Employee("Jane", 26, new MyDate(1995, 8 , 8)));
        set.add(new Employee("Uer", 26, new MyDate(1995, 7 , 8)));
        set.add(new Employee("Duck", 26, new MyDate(1995, 7 , 8)));
        set.add(new Employee("Uer", 27, new MyDate(1994, 6 , 7)));

        set.forEach(System.out::println);

    }
}
```



#### 练习



```java
package com.yixihan.day1027.collectiontest.exer.test3;

import org.junit.Test;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;

/**
 * 在List内去除重复数字值，要求尽量简单
 *
 * 用 set
 *
 * @author : yixihan
 * @create : 2021-10-27-13:52
 */
public class SetTest {

    public static List duplicateList(List list) {
        HashSet set = new HashSet();
        set.addAll(list);
        return new ArrayList(set);
    }

    @Test
    public void test() {
        List list = new ArrayList();
        list.add(new Integer(1));
        list.add(new Integer(2));
        list.add(new Integer(2));
        list.add(new Integer(4));
        list.add(new Integer(4));

        List list2 = duplicateList(list);

        for (Object integer : list2) {
            System.out.println(integer);
        }
    }

    @Test
    public void test2 () {
        HashSet set = new HashSet();
        Person p1 = new Person(1001,"AA");
        Person p2 = new Person(1002,"BB");
        set.add(p1);
        set.add(p2);
        p1.name = "CC";

        // remove 的时候, hashcode 算的是 Person(1001, "CC"), set 里面这个hashcode对应的索引位置没有值, 所有删除是没有效果的
        set.remove(p1);

        // 输出 (1001, "CC") (1002, "BB")
        System.out.println(set);

        // add 的时候, hashcode 算的是 Person(1001, "CC"), set 里面这个hashcode对应的索引位置没有值, 所以添加成功
        set.add(new Person(1001,"CC"));

        // 输出 (1001, "CC") (1002, "BB") (1001, "CC")
        System.out.println(set);

        // add 的时候, hashcode 算的是 Person(1001, "CC"), set 里面这个hashcode对应的索引位置有值
        // 但值为 (1001, "CC"), 调用 equals() 方法的时候为 false (想要添加进去的是(1001, "AA"), 所以也添加成功
        set.add(new Person(1001,"AA"));

        // 输出 (1001, "CC") (1002, "BB") (1001, "CC") (1001, "AA")
        System.out.println(set);

    }
}

class Person {

    String name;

    int id;

    public Person() {
    }

    public Person(int id, String name) {
        this.name = name;
        this.id = id;
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
        return id == person.id && Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, id);
    }
}
```





### Map接口



#### Map接口继承树

![image-20211026231900920](/assets/imgs/JavaSE4.assets/image-20211026231900920.png)





#### Map接口概述



- Map与Collection并列存在。用于保存具有映射关系的数据:key-value
- Map 中的 key 和 value 都可以是任何引用类型的数据
- Map 中的==key 用Set来存放，不允许重复==，即同一个 Map 对象所对应 的类，须重写hashCode()和equals()方法
- 常用String类作为Map的“键”
- key 和 value 之间存在单向一对一关系，即通过指定的 key 总能找到 唯一的、确定的 value
- Map接口的常用实现类：HashMap、TreeMap、LinkedHashMap和 Properties。其中，==HashMap是 Map 接口使用频率最高的实现类==



![image-20211026232015168](/assets/imgs/JavaSE4.assets/image-20211026232015168.png)

```java
package com.yixihan.day1027.maptest;

import org.junit.Test;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

/**
 * 一. Map 实现类的体系结构
 * |--- Map : 双列数据, 存储 key-value 对的数据  --- 类似于高中的函数 : y = f(x)
 *      |--- HashMap : 作为 Map 的主要实现类; 线程不安全的, 效率高; 可以存储 null 的 key 和 value, 健壮性强
 *          |--- LinkedHashMap : 保证在遍历 map 元素时, 可以按照添加的顺序实现遍历
 *                              原因 : 在原有的 HashMap 底层结构基础上, 添加了一对指针, 指向前一个和后一个元素
 *                              对于频繁的遍历操作, 此类执行效率高于 HashMap
 *      |---- TreeMap : 可以按照添加的 key-value 对进行排序, 实现排序遍历 (此时考虑 key 的自然排序或者定制排序)
 *                      底层使用 红黑树
 *      |--- Hashtable : 作为古老的实现类; 线程安全, 效率低; 不可以存储 null 的 key 和 value, 健壮性弱
 *          |--- Properties : 常用来处理配置文件; key 和 value 都是 String 类型
 *
 * 2. HashMap 底层 :
 *      JDK 7 及之前 : 数组 + 链表
 *      JDK 8 : 数组 + 链表 + 红黑树
 *
 * 面试题 :
 *      1. HashMap 的底层实现原理
 *      2. HashMap 和 Hashtable 的异同
 *      3. CurrentHashMap 与 Hashtable 的异同
 *
 *
 * 二. Map 结构的理解
 *      Map 中的 key : 无序的, 不可重复的, 使用 Set 存储所有的 key  ---> key 所在的类要重写 equals() 和 hashCode() 方法 (以 HashMap 为例)
 *      Map 中的 value : 无序的, 可重复的, 使用 Collection 存储所有的 value  --> value 所在的类要重写 equals() 方法
 *      一个键值对 : key-value 构成了一个 Entry 对象
 *      Map 中的 entry : 无序的, 不可重复的, 使用 Set 存储所有的 entry
 * @author : yixihan
 * @create : 2021-10-27-14:19
 */
public class MapTest {

    @Test
    public void test1 () {
        Map map = new HashMap(16);
        map.put(null, 123);
        map.put(null, null);

        Map hashtable = new Hashtable();
        // NullPointerException
//        hashtable.put(null, 123);
//        hashtable.put(null, null);
    }
}
```





#### 常用方法



- 添加 删除 修改操作
  - Object put(Object key,Object value)：将指定key-value添加到(或修改)当前map对象中
  - void putAll(Map m):将m中的所有key-value对存放到当前map中
  - Object remove(Object key)：移除指定key的key-value对，并返回value
  - void clear()：清空当前map中的所有数据
- 元素查询的操作
  - Object get(Object key)：获取指定key对应的value
  - boolean containsKey(Object key)：是否包含指定的key
  - boolean containsValue(Object value)：是否包含指定的value
  - int size()：返回map中key-value对的个数
  - boolean isEmpty()：判断当前map是否为空
  - boolean equals(Object obj)：判断当前map和参数对象obj是否相等
- 元视图操作的方法
  - Set keySet()：返回所有key构成的Set集合
  - Collection values()：返回所有value构成的Collection集合
  - Set entrySet()：返回所有key-value对构成的Set集合



```java
Map map = new HashMap();
//map.put(..,..)省略
System.out.println("map的所有key:");
Set keys = map.keySet();// HashSet
for (Object key : keys) {
    System.out.println(key + "->" + map.get(key));
}
System.out.println("map的所有的value：");
Collection values = map.values();
Iterator iter = values.iterator();
while (iter.hasNext()) {
    System.out.println(iter.next());
}
System.out.println("map所有的映射关系：");
// 映射关系的类型是Map.Entry类型，它是Map接口的内部接口
Set mappings = map.entrySet();
for (Object mapping : mappings) {
    Map.Entry entry = (Map.Entry) mapping;
    System.out.println("key是：" + entry.getKey() + "，value是：" + entry.getValue());
}
```



#### Map实现类之一：HashMap



- ==HashMap是 Map 接口使用频率最高的实现类==
- 允许使用null键和null值，与HashSet一样，不保证映射的顺序
- 所有的key构成的集合是Set:无序的、不可重复的。所以，key所在的类要重写： equals()和hashCode()
- 所有的value构成的集合是Collection:无序的、可以重复的。所以，value所在的类 要重写：equals()
- 一个key-value构成一个entry
- 所有的entry构成的集合是Set:无序的、不可重复的
- HashMap ==判断两个 key 相等的标准是==：两个 key 通过 equals() 方法返回 true， hashCode 值也相等。
- HashMap 判断两个 value相等的标准是：两个 value 通过 equals() 方法返回 true。



##### HashMap 的储存结构

![image-20211026232417081](/assets/imgs/JavaSE4.assets/image-20211026232417081.png)



![image-20211026232428169](/assets/imgs/JavaSE4.assets/image-20211026232428169.png)



##### HashMap源码中的重要常量



```java
DEFAULT_INITIAL_CAPACITY : HashMap的默认容量，16
    
MAXIMUM_CAPACITY ： HashMap的最大支持容量，2^30
    
DEFAULT_LOAD_FACTOR：HashMap的默认加载因子
    
TREEIFY_THRESHOLD：Bucket中链表长度大于该默认值，转化为红黑树
    
UNTREEIFY_THRESHOLD：Bucket中红黑树存储的Node小于该默认值，转化为链表
    
MIN_TREEIFY_CAPACITY：桶中的Node被树化时最小的hash表容量。（当桶中Node的数量大到需要变红黑树时，若hash表容量小于MIN_TREEIFY_CAPACITY时，此时应执行resize扩容操作这个MIN_TREEIFY_CAPACITY的值至少是TREEIFY_THRESHOLD的4倍。）
    
table：存储元素的数组，总是2的n次幂
    
entrySet：存储具体元素的集
    
size：HashMap中存储的键值对的数量
    
modCount：HashMap扩容和结构改变的次数。
    
threshold：扩容的临界值，=容量*填充因子
    
loadFactor：填充因子
```



##### HashMap的存储结构：JDK 1.8之前

- HashMap的内部存储结构其实是==数组和链表的结合==。当实例化一个HashMap时， 系统会创建一个长度为Capacity的Entry数组，这个长度在哈希表中被称为容量 (Capacity)，在这个数组中可以存放元素的位置我们称之为“桶”(bucket)，每个 bucket都有自己的索引，系统可以根据索引快速的查找bucket中的元素
- 每个bucket中存储一个元素，即一个Entry对象，但每一个Entry对象可以带一个引 用变量，用于指向下一个元素，因此，在一个桶中，就有可能生成一个Entry链。 而且==新添加的元素作为链表的head==。
- ==添加元素的过程：==
  - 向HashMap中添加entry1(key，value)，需要首先计算entry1中key的哈希值(根据 key所在类的hashCode()计算得到)，此哈希值经过处理以后，得到在底层Entry[]数 组中要存储的位置i。如果位置i上没有元素，则entry1直接添加成功。如果位置i上 已经存在entry2(或还有链表存在的entry3，entry4)，则需要通过循环的方法，依次 比较entry1中key和其他的entry。如果彼此hash值不同，则直接添加成功。如果 hash值不同，继续比较二者是否equals。如果返回值为true，则使用entry1的value 去替换equals为true的entry的value。如果遍历一遍以后，发现所有的equals返回都 为false,则entry1仍可添加成功。entry1指向原有的entry元素。
- HashMap的扩容
  - 当HashMap中的元素越来越多的时候，hash冲突的几率也就越来越高，因为数组的 长度是固定的。所以为了提高查询的效率，就要对HashMap的数组进行扩容，**而在 HashMap数组扩容之后，最消耗性能的点就出现了：原数组中的数据必须重新计算 其在新数组中的位置，并放进去，这就是resize**
- HashMap什么时候进行扩容呢？
  - 当HashMap中的元素个数超过数组大小(数组总大小length,不是数组中个数 size)*loadFactor 时 ， 就 会 进 行 数 组 扩 容 ， loadFactor 的默认 值 (DEFAULT_LOAD_FACTOR)为0.75，这是一个折中的取值。也就是说，默认情况 下，数组大小(DEFAULT_INITIAL_CAPACITY)为16，那么当HashMap中元素个数 超过16*0.75=12（这个值就是代码中的threshold值，也叫做临界值）的时候，就把 数组的大小扩展为 2*16=32，即扩大一倍，然后重新计算每个元素在数组中的位置， 而这是一个非常消耗性能的操作，**所以如果我们已经预知HashMap中元素的个数， 那么预设元素的个数能够有效的提高HashMap的性能**



##### HashMap的存储结构：JDK 1.8

- HashMap的内部存储结构其实是==数组+链表+树的结合==。当实例化一个 HashMap时，会初始化initialCapacity和loadFactor，在put第一对映射关系 时，系统会创建一个长度为initialCapacity的Node数组，这个长度在哈希表 中被称为容量(Capacity)，在这个数组中可以存放元素的位置我们称之为 “桶”(bucket)，每个bucket都有自己的索引，系统可以根据索引快速的查 找bucket中的元素
- **每个bucket中存储一个元素，即一个Node对象，**但每一个Node对象可以带 一个引用变量next，用于指向下一个元素，因此，**在一个桶中，就有可能 生成一个Node链。也可能是一个一个TreeNode对象 **，每一个TreeNode对象 可以有两个叶子结点left和right，因此，在一个桶中，就有可能生成一个 TreeNode树。而新添加的元素作为链表的last，或树的叶子结点。
- HashMap什么时候进行扩容和树形化呢？
  - 当HashMap中的元素个数超过数组大小(数组总大小length,不是数组中个数 size)*loadFactor 时 ， 就会进行数组扩容 ， loadFactor 的默认 值 (DEFAULT_LOAD_FACTOR)为0.75，这是一个折中的取值。也就是说，默认 情况下，数组大小(DEFAULT_INITIAL_CAPACITY)为16，那么当HashMap中 元素个数超过16*0.75=12（这个值就是代码中的threshold值，也叫做临界值） 的时候，就把数组的大小扩展为 2*16=32，即扩大一倍，然后重新计算每个元 素在数组中的位置，而这是一个非常消耗性能的操作，所以如果我们已经预知 HashMap中元素的个数，那么预设元素的个数能够有效的提高HashMap的性能
  - ==当HashMap中的其中一个链的对象个数如果达到了8个，此时如果capacity没有 达到64，那么HashMap会先扩容解决，如果已经达到了64，那么这个链会变成 树，结点类型由Node变成TreeNode类型。当然，如果当映射关系被移除后， 下次resize方法时判断树的结点个数低于6个，也会把树再转为链表==
- 关于映射关系的key是否可以修改？answer：不要修改
  - 映射关系存储到HashMap中会存储key的hash值，这样就不用在每次查找时重新计算 每一个Entry或Node（TreeNode）的hash值了，因此如果已经put到Map中的映射关 系，再修改key的属性，而这个属性又参与hashcode值的计算，那么会导致匹配不上。
- 总结 : JDK 1.8 相较于之前的变化 : 
  - ==HashMap map = new HashMap();//默认情况下，先不创建长度为16的数组==
  - ==当首次调用map.put()时，再创建长度为16的数组==
  - ==数组为Node类型，在jdk7中称为Entry类型==
  - ==形成链表结构时，新添加的key-value对在链表的尾部（七上八下）==
  - ==当数组指定索引位置的链表长度>8时，且map中的数组的长度> 64时，此索引位置 上的所有key-value对使用红黑树进行存储==



```java
package com.yixihan.day1027.hashmaptest;

import org.junit.Test;

import java.util.*;

/**
 * 三. HashMap 的底层实现原理
 *  JDK 7 :
 *      HashMap = new HashMap(); // 在实例化以后, 底层创建了长度是 16 的一维数组 Entry[] table
 *      ...可能已经执行过多次 put...
 *      map.put (key1, value1);
 *      首先, 调用 key1 所在类的 hashCode () 方法, 计算 key1 哈希值, 此哈希值通过某种算法计算以后, 得到在 Entry 数组中的存放位置
 *      如果此位置上的数据为空, 此时的 key1-value1 就添加成功  --- 情况 1
 *      如果此位置上的数据不为空 (意味着此位置上存在一个或多个数据 (以链表形式存在)), 比较 key1 和已经存在的一个或多个数据的 hash 值
 *          如果 key1 的哈希值与已经存在的数据的哈希值都不相同, 此时 key1-value1 就添加成功  --- 情况 2
 *          如果 key1 的哈希值与已经存在的某一个数据 (key2-value2) 的哈希值相同, 继续比较 : 调用 key1 存在类的 equals() 方法, 比较
 *              如果 equals() 返回 false : 此时 key1-value1 就添加成功  ---情况3
 *              如果 equals() 返回 true : 使用 value1 替换 value2
 *
 *      补充 : 关
 *          于情况 2 和 情况 3 : 此时 key1-value1 和原来的数据以链表的方式存储
 *
 *      在不断的添加过程中, 会涉及到扩容的问题, 当超出临界值 (且要存放的位置非空时) 就会进行扩容操作
 *      默认的扩容方式 : 扩容为原来容量的 2 倍, 并将原有的数据复制过来
 *
 *
 * JDK 8 : 相较于 JDK 7 在底层实现方面的不同
 *      1. new HashMap() : 底层没有创建一个长度为 16 的数组
 *      2. JDK 8 底层的数组是 : Node[], 而非 Entry
 *      3. 首次调用 put 方法时, 底层去创建长度为 16 的数组
 *      4. JDK 7 底层结构只有 :数组 + 链表
 *         JDK 8 底层结构 : 数组 + 链表 + 红黑树
 *         当数组的某一个索引位置上的元素以链表形式存在的数据个数 > 8 且当前数组的长度 > 64,
 *         此时此索引位置上的所有数据改为使用红黑树存储
 *
 *
 *      DEFAULT_INITIAL_CAPACITY : HashMap的默认容量，16
 *      DEFAULT_LOAD_FACTOR：HashMap的默认加载因子  0.75
 *      threshold：扩容的临界值，=容量*填充因子 16 * 0.75 => 12
 *      TREEIFY_THRESHOLD：Bucket中链表长度大于该默认值，转化为红黑树 8
 *      MIN_TREEIFY_CAPACITY：桶中的Node被树化时最小的hash表容量。64
 *
 *
 * 四. LinkedHashMap 的底层实现原理 (了解)
 *      源码中 :
 *      static class Entry<K,V> extends HashMap.Node<K,V> {
 *          // 能够记录添加的元素的先后顺序
 *         Entry<K,V> before, after;
 *         Entry(int hash, K key, V value, Node<K,V> next) {
 *             super(hash, key, value, next);
 *         }
 *     }
 *
 * 五. Map 中定义的常用方法 :
 *      - 添加 删除 修改操作
 *          - Object put(Object key,Object value)：将指定key-value添加到(或修改)当前map对象中
 *          - void putAll(Map m):将m中的所有key-value对存放到当前map中
 *          - Object remove(Object key)：移除指定key的key-value对，并返回value
 *          - void clear()：清空当前map中的所有数据
 *      - 元素查询的操作
 *          - Object get(Object key)：获取指定key对应的value
 *          - boolean containsKey(Object key)：是否包含指定的key
 *          - boolean containsValue(Object value)：是否包含指定的value
 *          - int size()：返回map中key-value对的个数
 *          - boolean isEmpty()：判断当前map是否为空
 *          - boolean equals(Object obj)：判断当前map和参数对象obj是否相等
 *      - 元视图操作的方法
 *          - Set keySet()：返回所有key构成的Set集合
 *          - Collection values()：返回所有value构成的Collection集合
 *          - Set entrySet()：返回所有key-value对构成的Set集合
 *
 *
 * 总结 : 常用方法
 *      增 : put (Object key, Object value)
 *      删 : remove (Object key)
 *      改 : put (Object key, Object value)
 *      查 : get (Object key)
 *      长度 : size ()
 *      遍历 : keySet() / values()  / entrySet()
 *
 * @author : yixihan
 * @create : 2021-10-27-14:43
 */
public class HashMapTest {

    @Test
    public void test1 () {
        Map map = new HashMap();

        map.put("123", 123);
        map.put(456, "456");
        map.put("ABC", new Date());

        System.out.println(map);
    }

    @Test
    public void test2 () {
        Map map = new LinkedHashMap();

        map.put("123", 123);
        map.put(456, "456");
        map.put("ABC", new Date());

        System.out.println(map);
    }


    /**
     * - 添加 删除 修改操作
     *      - Object put(Object key,Object value)：将指定key-value添加到(或修改)当前map对象中
     *      - void putAll(Map m):将m中的所有key-value对存放到当前map中
     *      - Object remove(Object key)：移除指定key的key-value对，并返回value
     *      - void clear()：清空当前map中的所有数据
     */
    @Test
    public void test3 () {
        Map map = new HashMap();

        // 1. Object put(Object key,Object value) : 将指定key-value添加到(或修改)当前map对象中
        // 添加
        map.put("AA", 123);
        map.put(123, "123");
        map.put("CC", new Date());
        // 修改
        map.put("AA", 84);

        System.out.println(map);
        System.out.println("*******************");


        Map map1 = new HashMap();
        map1.put("DD", 368);
        map1.put("AA", 382);

        // 2. void putAll(Map m) : 将m中的所有key-value对存放到当前map中
        map.putAll(map1);

        System.out.println(map);
        System.out.println("*******************");


        // 3. Object remove(Object key) : 移除指定key的key-value对，并返回value
        // map 中没有这个 key 就是返回 null
        Object value = map.remove("DD");
        System.out.println(value);
        System.out.println(map);
        System.out.println("*******************");


        // 3. void clear()：清空当前map中的所有数据, 并不是将 map 置为 null
        map.clear();

        System.out.println(map.size());
        System.out.println(map);
        System.out.println("*******************");
    }


    /**
     * - 元素查询的操作
     *     - Object get(Object key)：获取指定key对应的value
     *     - boolean containsKey(Object key)：是否包含指定的key
     *     - boolean containsValue(Object value)：是否包含指定的value
     *     - int size()：返回map中key-value对的个数
     *     - boolean isEmpty()：判断当前map是否为空
     *     - boolean equals(Object obj)：判断当前map和参数对象obj是否相等
     */
    @Test
    public void test4 () {
        Map map = new HashMap();

        map.put("AA", 123);
        map.put(123, "123");
        map.put("123", "123");
        map.put("CC", new Date());

        // 4. Object get(Object key) : 获取指定key对应的value, 没找到返回 null
        Object value1 = map.get("AA");
        System.out.println(value1);
        Object value2 = map.get("DD");
        System.out.println(value2);
        System.out.println("*******************");


        // 5. boolean containsKey(Object key) : 是否包含指定的key
        System.out.println(map.containsKey(123));
        System.out.println(map.containsKey("EE"));
        System.out.println("*******************");


        // 6. boolean containsValue(Object value) : 是否包含指定的value
        System.out.println(map.containsValue(123));
        System.out.println(map.containsValue("123"));
        System.out.println("*******************");


        // 7. int size() : 返回map中key-value对的个数
        System.out.println(map.size());
        System.out.println("*******************");


        // 8. boolean isEmpty() : 判断当前map是否为空
        System.out.println(map.isEmpty());
        map.clear();
        System.out.println(map.isEmpty());
        System.out.println("*******************");


        // 9. boolean equals(Object obj) : 判断当前map和参数对象obj是否相等
    }


    /**
     * - 元视图操作的方法
     *      - Set keySet()：返回所有key构成的Set集合
     *      - Collection values()：返回所有value构成的Collection集合
     *      - Set entrySet()：返回所有key-value对构成的Set集合
     */
    @Test
    public void test5 () {
        Map map = new HashMap();

        map.put("AA", 123);
        map.put(123, "123");
        map.put("1234", "1234");
        map.put("CC", new Date());

        // 10. Set keySet() : 返回所有key构成的Set集合
        Set set = map.keySet();

        set.forEach(System.out::println);
        System.out.println("*******************");


        // 11. Collection values() : 返回所有value构成的Collection集合
        Collection values = map.values();

        for (Object value : values) {
            System.out.println(value);
        }
        System.out.println("*******************");


        // 12. Set entrySet() : 返回所有key-value对构成的Set集合
        Set set1 = map.entrySet();

        Iterator iterator = set1.iterator();
        while (iterator.hasNext()) {
            Object obj = iterator.next();
            // entrySet 集合中元素都 entry
            Map.Entry entry = (Map.Entry) obj;
            System.out.println(entry.getKey() + " ===> " + entry.getValue());
        }
        System.out.println("*******************");

        // 方式二 :
        Set keySet = map.keySet();

        for (Object key : keySet) {
            // 通过 key 获取 value
            Object value = map.get(key);
            System.out.println(key + " ===> " + value);
        }
        System.out.println("*******************");
    }
}
```



#### Map实现类之二：LinkedHashMap



- LinkedHashMap 是 HashMap 的子类
- 在HashMap存储结构的基础上，使用了一对双向链表来记录添加 元素的顺序
- 与LinkedHashSet类似，LinkedHashMap 可以维护 Map 的迭代 顺序：迭代顺序与 Key-Value 对的插入顺序一致



> HashMap中的内部类：Node

```java
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;
}

```



> LinkedHashMap中的内部类：Entry

```java
static class Entry<K,V> extends HashMap.Node<K,V> {
    Entry<K,V> before, after;
    Entry(int hash, K key, V value, Node<K,V> next) {
        super(hash, key, value, next);
    }
}

```





#### Map实现类之三：TreeMap



- TreeMap存储 Key-Value 对时，需要根据 key-value 对进行排序。 TreeMap 可以保证所有的 Key-Value 对处于==有序==状态。
- TreeSet底层使用==红黑树==结构存储数据
- TreeMap 的 Key 的排序
  - ==自然排序==：TreeMap 的所有的 Key 必须实现 Comparable 接口，而且所有 的 Key 应该是同一个类的对象，否则将会抛出 ClasssCastException
  - ==定制排序==：创建 TreeMap 时，传入一个 Comparator 对象，该对象负责对 TreeMap 中的所有 key 进行排序。此时不需要 Map 的 Key 实现 Comparable 接口
- TreeMap判断==两个key相等的标准==：两个key通过compareTo()方法或 者compare()方法返回0。



```java
package com.yixihan.day1027.treemaptest;

import org.junit.Test;

import java.util.*;

/**
 * TreeMap 的使用 :
 *      向 TreeMap 中添加 key-value, 要求 key 必须是有同一个类创建的对象
 *      因为要按照 key 进行排序 : 自然排序, 定制排序
 * @author : yixihan
 * @create : 2021-10-27-18:42
 */
public class TreeMapTest {

    /**
     * 自然排序
     */
    @Test
    public void test1 () {

        TreeMap map = new TreeMap();

        map.put(new User("Tom", 17), 61);
        map.put(new User("Jack", 16), 99);
        map.put(new User("Rose", 18), 78);
        map.put(new User("Jane", 17), 100);
        map.put(new User("Michelle", 15), 91);
        map.put(new User("Rafael", 19), 36);
        map.put(new User("Cassiel", 18), 59);
        map.put(new User("Ulrica", 20), 89);
        map.put(new User("Quella", 19), 48);
        map.put(new User("Cecilia", 18), 61);
        map.put(new User("Claudia", 17), 95);


        Set set = map.entrySet();

        Iterator iterator = set.iterator();
        while (iterator.hasNext()) {
            Object obj = iterator.next();
            // entrySet 集合中元素都 entry
            Map.Entry entry = (Map.Entry) obj;
            System.out.println(entry.getKey() + " ===> " + entry.getValue());
        }
    }

    /**
     * 定制排序
     */
    @Test
    public void test2 () {

        Comparator comparator = new Comparator() {
            @Override
            public int compare(Object o1, Object o2) {
                if (o1 instanceof User && o2 instanceof User) {
                    User u1 = (User) o1;
                    User u2 = (User) o2;

                    int minusAge = Integer.compare(u1.getAge(), u2.getAge());

                    if (minusAge != 0) {
                        return minusAge;
                    }

                    return u1.getName().compareTo(u2.getName());
                }

                throw new RuntimeException("传入的数据类型不匹配");
            }
        };


        TreeMap map = new TreeMap(comparator);

        map.put(new User("Tom", 17), 61);
        map.put(new User("Jack", 16), 99);
        map.put(new User("Rose", 18), 78);
        map.put(new User("Jane", 17), 100);
        map.put(new User("Michelle", 15), 91);
        map.put(new User("Rafael", 19), 36);
        map.put(new User("Cassiel", 18), 59);
        map.put(new User("Ulrica", 20), 89);
        map.put(new User("Quella", 19), 48);
        map.put(new User("Cecilia", 18), 61);
        map.put(new User("Claudia", 17), 95);

        Set set = map.entrySet();

        Iterator iterator = set.iterator();
        while (iterator.hasNext()) {
            Object obj = iterator.next();
            // entrySet 集合中元素都 entry
            Map.Entry entry = (Map.Entry) obj;
            System.out.println(entry.getKey() + " ===> " + entry.getValue());
        }
    }
}
```



#### Map实现类之四：Hashtable



- Hashtable是个古老的 Map 实现类，JDK1.0就提供了。不同于HashMap， Hashtable是线程安全的
- Hashtable实现原理和HashMap相同，功能相同。底层都使用哈希表结构，查询 速度快，很多情况下可以互用
- 与HashMap不同，Hashtable 不允许使用 null 作为 key 和 value
- 与HashMap一样，Hashtable 也不能保证其中 Key-Value 对的顺序
- Hashtable判断两个key相等、两个value相等的标准，与HashMap一致







#### Map实现类之五：Properties



- Properties 类是 Hashtable 的子类，该对象用于处理属性文件
- 由于属性文件里的 key、value 都是字符串类型，所以 ==Properties 里的 key 和 value 都是字符串类型==
- 存取数据时，建议使用setProperty(String key,String value)方法和 getProperty(String key)方法

```java
Properties pros = new Properties();
pros.load(new FileInputStream("jdbc.properties"));
String user = pros.getProperty("user");
System.out.println(user);
```















### Collections工具类



- Collections 是一个操作 Set、List 和 Map 等集合的工具类
- Collections 中提供了一系列静态的方法对集合元素进行排序、查询和修改等操作， 还提供了对集合对象设置不可变、对集合对象实现同步控制等方法
- ==排序操作==：**（均为static方法）**
  - reverse(List)：反转 List 中元素的顺序
  - shuffle(List)：对 List 集合元素进行随机排序
  - sort(List)：根据元素的自然顺序对指定 List 集合元素按升序排序
  - sort(List，Comparator)：根据指定的 Comparator 产生的顺序对 List 集合元素进行排序
  - swap(List，int， int)：将指定 list 集合中的 i 处元素和 j 处元素进行交换
- ==查找、替换==
  - Object max(Collection)：根据元素的自然顺序，返回给定集合中的最大元素
  - Object max(Collection，Comparator)：根据 Comparator 指定的顺序，返回 给定集合中的最大元素
  - Object min(Collection)
  - Object min(Collection，Comparator)
  - int frequency(Collection，Object)：返回指定集合中指定元素的出现次数
  - void copy(List dest,List src)：将src中的内容复制到dest中
  - boolean replaceAll(List list，Object oldVal，Object newVal)：使用新值替换 List 对象的所有旧值



#### Collections常用方法：同步控制



Collections 类中提供了多个 synchronizedXxx() 方法，该方法可使将指定集 合包装成线程同步的集合，从而可以解决多线程并发访问集合时的线程安全 问题



![image-20211027125516429](/assets/imgs/JavaSE4.assets/image-20211027125516429.png)



```java
package com.yixihan.day1027.collectionstest;

import com.yixihan.day1026.listTest.scr7.ArrayList;
import org.junit.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Collections : 操作 Collection 和 Map 的工具类
 *
 *
 * 面试题 : Collection 和 Collections 的区别
 *      Collection 是接口
 *      Collections 是工具类
 *
 *
 * - 排序操作 ：（均为static方法）
 *   - reverse(List)：反转 List 中元素的顺序
 *   - shuffle(List)：对 List 集合元素进行随机排序
 *   - sort(List)：根据元素的自然顺序对指定 List 集合元素按升序排序
 *   - sort(List，Comparator)：根据指定的 Comparator 产生的顺序对 List 集合元素进行排序
 *   - swap(List，int， int)：将指定 list 集合中的 i 处元素和 j 处元素进行交换
 * - 查找、替换
 *   - Object max(Collection)：根据元素的自然顺序，返回给定集合中的最大元素
 *   - Object max(Collection，Comparator)：根据 Comparator 指定的顺序，返回 给定集合中的最大元素
 *   - Object min(Collection)
 *   - Object min(Collection，Comparator)
 *   - int frequency(Collection，Object)：返回指定集合中指定元素的出现次数
 *   - void copy(List dest,List src)：将src中的内容复制到dest中
 *   - boolean replaceAll(List list，Object oldVal，Object newVal)：使用新值替换 List 对象的所有旧值
 *
 * @author : yixihan
 * @create : 2021-10-27-19:04
 */
public class CollectionsTest {


    /**
     * 排序操作：（均为static方法）
     *      - reverse(List) : 反转 List 中元素的顺序
     *      - shuffle(List) : 对 List 集合元素进行随机排序
     *      - sort(List) : 根据元素的自然顺序对指定 List 集合元素按升序排序
     *      - sort(List，Comparator) : 根据指定的 Comparator 产生的顺序对 List 集合元素进行排序
     *      - swap(List，int， int) : 将指定 list 集合中的 i 处元素和 j 处元素进行交换
     */
    @Test
    public void test1 () {

        List list = new ArrayList();

        list.add(123);
        list.add(13);
        list.add(23);
        list.add(12);
        list.add(1253);
        list.add(1273);
        list.add(1523);

        System.out.println(list);
        System.out.println("*******************");


        // 1. reverse(List) : 反转 List 中元素的顺序
        Collections.reverse(list);
        System.out.println(list);
        System.out.println("*******************");


        // 2. shuffle(List) : 对 List 集合元素进行随机排序
        Collections.shuffle(list);
        System.out.println(list);
        System.out.println("*******************");


        // 3. sort(List) : 根据元素的自然顺序对指定 List 集合元素按升序排序
        Collections.sort(list);
        System.out.println(list);
        System.out.println("*******************");


        // 4. swap(List，int， int) : 将指定 list 集合中的 i 处元素和 j 处元素进行交换
        Collections.swap(list, 1, 3);
        System.out.println(list);
        System.out.println("*******************");

    }


    /**
     * - 查找、替换
     *
     *      - Object max(Collection) : 根据元素的自然顺序，返回给定集合中的最大元素
     *      - Object max(Collection，Comparator) : 根据 Comparator 指定的顺序，返回 给定集合中的最大元素
     *      - Object min(Collection)
     *      - Object min(Collection，Comparator)
     *      - int frequency(Collection，Object) : 返回指定集合中指定元素的出现次数
     *      - void copy(List dest,List src) : 将src中的内容复制到dest中
     *      - boolean replaceAll(List list，Object oldVal，Object newVal) : 使用新值替换 List 对象的所有旧值
     */
    @Test
    public void test2 () {
        List list = new ArrayList();

        list.add(123);
        list.add(13);
        list.add(23);
        list.add(12);
        list.add(1253);
        list.add(1273);
        list.add(1523);
        list.add(1523);
        list.add(1523);

        // 1. Object max(Collection) : 根据元素的自然顺序，返回给定集合中的最大元素
        Comparable max = Collections.max(list);
        System.out.println(max);

        // 2. Object min(Collection) : 根据元素的自然顺序，返回给定集合中的最小元素
        Comparable min = Collections.min(list);
        System.out.println(min);
        System.out.println("*******************");


        // 3. int frequency(Collection，Object) : 返回指定集合中指定元素的出现次数
        int count = Collections.frequency(list, 1523);
        System.out.println(count);
        System.out.println("*******************");


        // 4. void copy(List dest,List src) : 将src中的内容复制到dest中
//        // 错误的 报异常 : Source does not fit in dest
//        List dest = new ArrayList();
//        Collections.copy(list, dest);
//        // Source does not fit in dest
//        System.out.println(dest);

        List dest = Arrays.asList(new Object[list.size()]);
        Collections.copy(dest, list);
        System.out.println(dest);
        System.out.println("*******************");


        // 5. boolean replaceAll(List list，Object oldVal，Object newVal) : 使用新值替换 List 对象的所有旧值
        Collections.replaceAll(list, 1523, 1588);
        System.out.println(list);
        System.out.println("*******************");
    }


    /**
     * Collections 类中提供了多个 synchronizedXxx() 方法，该方法可使将指定集 合包装成线程同步的集合，
     * 从而可以解决多线程并发访问集合时的线程安全 问题
     */
    @Test
    public void test3 () {
        List list = new ArrayList();

        list.add(123);
        list.add(13);
        list.add(23);
        list.add(12);
        list.add(1253);
        list.add(1273);

        // 返回的 list1 即为线程安全的 list
        List list1 = Collections.synchronizedList(list);

    }
}
```



#### 补充：Enumeration



Enumeration 接口是 Iterator 迭代器的 “古老版本”

![image-20211027125532664](/assets/imgs/JavaSE4.assets/image-20211027125532664.png)



```java
Enumeration stringEnum = new StringTokenizer("a-b*c-d-e-g", "-");
while(stringEnum.hasMoreElements()){
    Object obj = stringEnum.nextElement();
    System.out.println(obj);
}
```



### 练习









## 泛型



### 简介



- 泛型：标签
- 泛型的设计背景
  - 集合容器类在设计阶段/声明阶段不能确定这个容器到底实际存的是什么类型的 对象，所以在**JDK1.5之前只能把元素类型设计为Object，JDK1.5之后使用泛型来 解决**。因为这个时候除了元素的类型不确定，其他的部分是确定的，例如关于 这个元素如何保存，如何管理等是确定的，因此==此时把元素的类型设计成一个 参数，这个类型参数叫做泛型==。Collection，List，ArrayList 这个就 是类型参数，即泛型。



> 泛型的概念

- ==所谓泛型，就是允许在定义类、接口时通过一个标识表示类中某个属性的类 型或者是某个方法的返回值及参数类型。这个类型参数将在使用时（例如， 继承或实现这个接口，用这个类型声明变量、创建对象时）确定（即传入实 际的类型参数，也称为类型实参）==
- 从JDK1.5以后，Java引入了“参数化类型（Parameterized type）”的概念， 允许我们在创建集合时再指定集合元素的类型，正如：List，这表明 该List只能保存字符串类型的对象
- JDK1.5改写了集合框架中的全部接口和类，为这些接口、类增加了泛型支持， 从而可以在声明集合变量、创建集合对象时传入类型实参



> 为什么要有泛型(Generic)



那么为什么要有泛型呢，直接Object不是也可以存储数据吗?

1.  解决元素存储的安全性问题，好比商品、药品标签，不会弄错。
2.  解决获取数据元素时，需要类型强制转换的问题，好比不用每回拿商品、药 品都要辨别

![image-20211027195151760](/assets/imgs/JavaSE4.assets/image-20211027195151760.png)

![image-20211027195203478](/assets/imgs/JavaSE4.assets/image-20211027195203478.png)



### 在集合中使用泛型



```java
ArrayList<Integer> list = new ArrayList<>();//类型推断
list.add(78);
list.add(88);
list.add(77);
list.add(66);
//遍历方式一：
//for(Integer i : list){
//不需要强转
//System.out.println(i);
//}
//遍历方式二：
Iterator<Integer> iterator = list.iterator();
while(iterator.hasNext()){
    System.out.println(iterator.next());
}

```



```java
Map<String,Integer> map = new HashMap<String,Integer>();
map.put("Tom1",34);
map.put("Tom2",44);
map.put("Tom3",33);
map.put("Tom4",32);
//添加失败
//map.put(33, "Tom");
Set<Entry<String,Integer>> entrySet = map.entrySet();
Iterator<Entry<String,Integer>> iterator = entrySet.iterator();
while(iterator.hasNext()){
    Entry<String,Integer> entry = iterator.next();
    System.out.println(entry.getKey() + "--->" + entry.getValue());
}

```



```java
package com.yixihan.day1027.genericitytest;

import com.yixihan.day1026.listTest.scr7.ArrayList;
import org.junit.Test;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 * 泛型的使用
 * 1. JDK 5.0 新增的特性
 *
 * 2. 在集合中使用泛型
 *      总结 :
 *          1. 集合接口或集合类在 JDK 5.0 都修改为带泛型的结构
 *          2. 在实例化集合类时, 可以指明具体的泛型类型
 *          3. 指明完以后, 在集合类或接口中凡是定义类或接口时, 内部结构 (比如 : 方法, 构造器, 属性等) 使用到类的泛型的位置,
 *             都指定为实例化时泛型的类型
 *             比如 : add(E e) ---> 实例化以后 : add(Integer e)
 *          4. 注意点 : 泛型的类型必须是类, 不能是数据类型, 需要用到基本数据类型的位置, 拿包装类去替换
 *          5. 如果实例化时, 没有指明泛型的类型, 默认类型为 java.lang.Object
 *          6. JDK 7 新特性 : 泛型的简化操作：ArrayList list = new ArrayList<>();
 *
 * 3. 如何自定义泛型结构 : 泛型类, 泛型接口, 泛型方法  --> GenericTest1.java
 * @author : yixihan
 * @create : 2021-10-27-20:25
 */
public class GenericTest {


    /**
     * 在集合中使用泛型之前的情况 :
     */
    @Test
    public void test1 () {

        ArrayList list = new ArrayList();

        // 需求 : 存放学生的成绩
        list.add(78);
        list.add(88);
        list.add(98);
        list.add(100);

        // 问题一 : 类型不安全
//        list.add("Tom");

        // 问题二 : 强转时, 可能会出现 ClassCastException 异常
        for (Object score : list) {
            int studentScore = (int) score;
            System.out.println(studentScore);
        }
    }


    /**
     * 在集合中使用泛型的情况 : 以 ArrayList 为例
     */
    @Test
    public void test2 () {
        ArrayList<Integer> list = new ArrayList<>();

        // 需求 : 存放学生的成绩
        list.add(78);
        list.add(88);
        list.add(98);
        list.add(100);

        // 编译时, 就会进行类型检查, 保证数据安全
//        list.add("Tom");


        // 方式一
        for (Integer score : list) {
            // 避免了强转操作
            System.out.println(score);
        }
        System.out.println("************");


        // 方式二
        Iterator<Integer> iterator = list.iterator();
        while (iterator.hasNext()) {
            Integer score = iterator.next();
            System.out.println(score);
        }
    }


    /**
     * 在集合中使用泛型的情况 : 以 HashMap 为例
     */
    @Test
    public void test3 () {
        Map<String, Integer> map = new HashMap<>(32);

        map.put("小美", 59);
        map.put("Tom", 100);
        map.put("Jack", 60);
        map.put("Jane", 86);
        map.put("Rose", 94);

//        map.put(123, 123);

        // 泛型的嵌套
        Set<Map.Entry<String, Integer>> entries = map.entrySet();

        Iterator<Map.Entry<String, Integer>> iterator = entries.iterator();

        while (iterator.hasNext()) {

            Map.Entry<String, Integer> entry = iterator.next();
            System.out.println(entry.getKey() + " ===> " + entry.getValue());
        }
    }
}
```



### 自定义泛型结构



#### 泛型的声明



interface List 和 class GenTest 其中，T,K,V不代表值，而是表示类型。这里使用任意字母都可以。 常用T表示，是Type的缩写。



#### 泛型的实例化



一定要在类名后面指定类型参数的值（类型）。如： 

List strList = new ArrayList(); 

Iterator iterator = customers.iterator();



- T只能是类，不能用基本数据类型填充。但可以使用包装类填充
- 把一个集合中的内容限制为一个特定的数据类型，这就是generics背后 的核心思想

![image-20211027195402400](/assets/imgs/JavaSE4.assets/image-20211027195402400.png)



#### 泛型类、泛型接口



- 泛型类可能有多个参数，此时应将多个参数一起放在尖括号内。比如：
- 泛型类的构造器如下：public GenericClass(){}。 
- 而下面是错误的：public GenericClass(){}
- 实例化后，操作原来泛型位置的结构必须与指定的泛型类型一致。
- 泛型不同的引用不能相互赋值。
  - 尽管在编译时ArrayList<String>和ArrayList<Integer>是两种类型，但是，在运行时只有 一个ArrayList被加载到JVM中。
- 泛型如果不指定，将被擦除，泛型对应的类型均按照Object处理，但不等价 于Object。
  - **经验：泛型要使用一路都用。要不用，一路都不要用。**
- 如果泛型结构是一个接口或抽象类，则不可创建泛型类的对象。
- jdk1.7，泛型的简化操作：ArrayList flist = new ArrayList<>();
- 泛型的指定中不能使用基本数据类型，可以使用包装类替换。
- 在类/接口上声明的泛型，在本类或本接口中即代表某种类型，可以作为非静态 属性的类型、非静态方法的参数类型、非静态方法的返回值类型。但在==静态方法 中不能使用类的泛型==
- 异常类不能是泛型的
- 不能使用new E[]。但是可以：E[] elements = (E[])new Object[capacity]; 
  - 参考：ArrayList源码中声明：Object[] elementData，而非泛型参数类型数组。
- 父类有泛型，子类可以选择保留泛型也可以选择指定泛型类型：
  - 子类不保留父类的泛型：按需实现
    - 没有类型 擦除
    - 具体类型
  - 子类保留父类的泛型：泛型子类
    - 全部保留
    - 部分保留



==结论：子类必须是“富二代”，子类除了指定或保留父类的泛型，还可以增加自 己的泛型==



```java

class GenericTest {
    public static void main(String[] args) {
        // 1、使用时：类似于Object，不等同于Object
        ArrayList list = new ArrayList();
        // list.add(new Date());//有风险
        list.add("hello");
        test(list);// 泛型擦除，编译不会类型检查
        // ArrayList<Object> list2 = new ArrayList<Object>();
        // test(list2);//一旦指定Object，编译会类型检查，必须按照Object处理
    }
    public static void test(ArrayList<String> list) {
        String str = "";
        for (String s : list) {
            str += s + ",";
        }
        System.out.println("元素:" + str);
    }
}
```



```java
class Father<T1, T2> {
}
// 子类不保留父类的泛型
// 1)没有类型 擦除
class Son1 extends Father {// 等价于class Son extends Father<Object,Object>{
}
// 2)具体类型
class Son2 extends Father<Integer, String> {
}
// 子类保留父类的泛型
// 1)全部保留
class Son3<T1, T2> extends Father<T1, T2> {
}
// 2)部分保留
class Son4<T2> extends Father<Integer, T2> {
}
```



```java
class Father<T1, T2> {
}
// 子类不保留父类的泛型
// 1)没有类型 擦除
class Son<A, B> extends Father{//等价于class Son extends Father<Object,Object>{
}
// 2)具体类型
class Son2<A, B> extends Father<Integer, String> {
}
// 子类保留父类的泛型
// 1)全部保留
class Son3<T1, T2, A, B> extends Father<T1, T2> {
}
// 2)部分保留
class Son4<T2, A, B> extends Father<Integer, T2> {
}
```



```java
class Person<T> {
    // 使用T类型定义变量
    private T info;
    // 使用T类型定义一般方法
    public T getInfo() {
        return info;
    }
    public void setInfo(T info) {
        this.info = info;
    }
    // 使用T类型定义构造器
    public Person() {
    }
    public Person(T info) {
        this.info = info;
    }
    // static的方法中不能声明泛型
    //public static void show(T t) {
    //
    //}
    // 不能在try-catch中使用泛型定义
    //public void test() {
    //try {
    //
    //} catch (MyException<T> ex) {
    //
    //}
    //}
}
```





#### 泛型方法



- 方法，也可以被泛型化，不管此时定义在其中的类是不是泛型类。在泛型 方法中可以定义泛型参数，此时，参数的类型就是传入数据的类型。
- 泛型方法的格式 :
  - [访问权限] <泛型> 返回类型 方法名([泛型标识 参数名称]) 抛出的异常
- 泛型方法声明泛型时也可以指定上限(在12.5中讲)



```java
public class DAO {
    public <E> E get(int id, E e) {
        E result = null;
        return result;
    }
}
```



```java
public static <T> void fromArrayToCollection(T[] a, Collection<T> c) {
    for (T o : a) {
        c.add(o);
    }
}
public static void main(String[] args) {
    Object[] ao = new Object[100];
    Collection<Object> co = new ArrayList<Object>();
    fromArrayToCollection(ao, co);
    String[] sa = new String[20];
    Collection<String> cs = new ArrayList<>();
    fromArrayToCollection(sa, cs);
    Collection<Double> cd = new ArrayList<>();
    // 下面代码中T是Double类，但sa是String类型，编译错误。
    // fromArrayToCollection(sa, cd);
    // 下面代码中T是Object类型，sa是String类型，可以赋值成功。
    fromArrayToCollection(sa, co);
}

```



```java
class Creature{}
class Person extends Creature{}
class Man extends Person{}
class PersonTest {
    public static <T extends Person> void test(T t){
        System.out.println(t);
    }
    public static void main(String[] args) {
        test(new Person());
        test(new Man());
        //The method test(T) in the type PersonTest is not
        //applicable for the arguments (Creature)
        test(new Creature());
    }
}
```



#### 代码解释

```java
package com.yixihan.day1027.genericitytest;

import com.yixihan.day1026.listTest.scr7.ArrayList;
import org.junit.Test;

import java.util.List;

/**
 * 3. 如何自定义泛型结构 : 泛型类, 泛型接口, 泛型方法
 *
 *      1. 关于自定义泛型类 泛型接口
 *
 * @author : yixihan
 * @create : 2021-10-27-20:58
 */
public class GenericTest1 {

    @Test
    public void test1 () {

        // 如果定义了泛型类, 实例化没有指明类的泛型, 则认为此泛型类型为 Object
        // 要求 : 如果大家定义了类是带泛型的, 建议在实例化时要指明类的泛型
        Order order = new Order();
        order.setOrderT(123);
        order.setOrderT("ABC");

        // 建议 : 实例化时指明类的泛型
        Order<String> order1 = new Order<String>("orderAA", 1001, "order : AA");

        order1.setOrderT("AA : Hello");

    }

    @Test
    public void test2 () {
        SubOrder sub1 = new SubOrder();

        // 由于子类在继承带泛型的父类时, 指明了泛型类型, 则实例化子类对象时, 不再需要指明泛型
        sub1.setOrderT(123);
//        sub1.setOrderT("ABC");

        SubOrder1<String> sub2 = new SubOrder1<>();

        sub2.setOrderT("order2 ...");

    }


    /**
     * 泛型不同的引用不能相互赋值。
     */
    @Test
    public void test3 () {
        ArrayList<String> list1 = new ArrayList<>();
        ArrayList<Integer> list2 = new ArrayList<>();

        // 泛型不同的引用不能相互赋值
//        list1 = list2;

        Person p1 = new Person();
        Person p2 = new Person();

        p1 = p2;
    }


    @Test
    public void test4 () {
        Order<String> order = new Order<>();

        Integer[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9};

        // 泛型方法在调用时, 指明泛型参数的类型
        List<Integer> list = Order.copyFromArrayToList(arr);

        System.out.println(list);
    }
}

// 异常类不能是泛型的
// 泛型类不能扩展 ''java.lang.Throwable''
// class MyException<T> extends Exception {
//
// }
```



```java
package com.yixihan.day1027.genericitytest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * @author : yixihan
 * @create : 2021-10-27-20:55
 */
public class Order<T> {

    String orderName;

    int orderId;

    /**
     * 类的内部结构就可以使用类的泛型
     */
    T orderT;


    public Order() {
        // 编译不通过
        // 类型参数 'T' 不能直接实例化
//        T[] arr = new T[10];

        // 编译可通过
        T[] arr = (T[]) new Object[15];
    }


    public Order(String orderName, int orderId, T orderT) {
        this.orderName = orderName;
        this.orderId = orderId;
        this.orderT = orderT;
    }

    public String getOrderName() {
        return orderName;
    }

    public void setOrderName(String orderName) {
        this.orderName = orderName;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    // 下面的三个方法都不是泛型方法

    public T getOrderT() {
        return orderT;
    }

    public void setOrderT(T orderT) {
        this.orderT = orderT;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        Order<?> order = (Order<?>) o;
        return Objects.equals(getOrderName(), order.getOrderName()) && Objects.equals(getOrderId(), order.getOrderId()) && Objects.equals(getOrderT(), order.getOrderT());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getOrderName(), getOrderId(), getOrderT());
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderName='" + orderName + '\'' +
                ", orderId='" + orderId + '\'' +
                ", orderT=" + orderT +
                '}';
    }

    // 在静态方法中不能使用类的泛型
    // 无法从 static 上下文引用 'com.yixihan.day1027.genericitytest.Order.this'
//    public static void show (T orderT) {
//        System.out.println(orderT);
//    }

    public void show () {
        // 编译不通过
//        try {
//            System.out.println("");
//        } catch (T t) {
//
//        }
    }

    /**
     * 泛型方法 : 在方法中出现了泛型的结构, 泛型的参数与类的泛型参数没有任何关系
     * 换句话说, 泛型方法所属的类是不是泛型类都没有关系
     * 泛型方法, 是可以声明为静态的, 原因 : 泛型参数是在调用方法时确定的, 并非在实例化类时确定的
     */
    public static <E> List<E> copyFromArrayToList(E[] arr) {

        ArrayList<E> list = new ArrayList<>();

        Collections.addAll(list, arr);

        return list;
    }
}
```



```java
package com.yixihan.day1027.genericitytest;

/**
 * @author : yixihan
 * @create : 2021-10-27-21:10
 */
public class Person {
}
```



```java
package com.yixihan.day1027.genericitytest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * SubOrder 不再是泛型类
 * @author : yixihan
 * @create : 2021-10-27-21:03
 */
public class SubOrder extends Order<Integer>{



    public static <E> List<E> copyFromArrayToList (E[] arr) {

        ArrayList<E> list = new ArrayList<>();

        Collections.addAll(list, arr);

        return list;
    }
}
```



```java
package com.yixihan.day1027.genericitytest;

/**
 * SubOrder1<T> 仍然是泛型类
 * @author : yixihan
 * @create : 2021-10-27-21:03
 */
public class SubOrder1<T> extends Order<T>{



}
```



### 实际应用举例



```java
package com.yixihan.day1027.genericitytest1;

import java.util.List;

/**
 * DAO : data(base) access object
 *
 * 表的共性操作的 DAO
 * @author : yixihan
 * @create : 2021-10-27-21:31
 */
public class DAO<T> {


    /**
     * 添加一条记录
     */
    public void add (T t) {
        System.out.println("添加成功");
    }


    /**
     * 删除一条记录
     */
    public boolean delete (int index) {
        System.out.println("删除成功");
        return true;
    }


    /**
     * 修改一条记录
     */
    public boolean update (int index, T t) {
        System.out.println("修改成功");
        return true;
    }


    /**
     * 查询一条记录
     */
    public T query (int index) {
        System.out.println("添加成功");
        return null;
    }


    /**
     * 查询多条记录
     */
    public List<T> queryByList () {
        System.out.println("添加成功");
        return null;
    }


    /**
     * 泛型方法
     */
    public <E> E getValue () {

        return null;
    }

}
```



```java
package com.yixihan.day1027.genericitytest1;

/**
 * 此类对应数据库中的 Customer 表
 * @author : yixihan
 * @create : 2021-10-27-21:34
 */
public class Customer {
}
```



```java
package com.yixihan.day1027.genericitytest1;

/**
 * 只能操作 Customer 表的 DAO
 * @author : yixihan
 * @create : 2021-10-27-21:35
 */
public class CustomerDAO extends DAO<Customer>{
}
```



```java
package com.yixihan.day1027.genericitytest1;

/**
 * @author : yixihan
 * @create : 2021-10-27-21:39
 */
public class Student {
}
```



```java
package com.yixihan.day1027.genericitytest1;

/**
 * 只能操作 Student 表的 DAO
 *
 * @author : yixihan
 * @create : 2021-10-27-21:39
 */
public class StudentDAO extends DAO<Student>{
}
```



```java
package com.yixihan.day1027.genericitytest1;

import org.junit.Test;

/**
 * @author : yixihan
 * @create : 2021-10-27-21:38
 */
public class DAOTest {

    @Test
    public void test () {
        CustomerDAO customerDAO = new CustomerDAO();

        customerDAO.add(new Customer());

        StudentDAO studentDAO = new StudentDAO();

        studentDAO.update(2, new Student());
    }
}
```



### 泛型在继承上的体现



如果B是A的一个子类型（子类或者子接口），而G是具有泛型声明的 类或接口，G<B>并不是G<A>的子类型！

比如：String是Object的子类，但是List<String>并不是List <Object>的子类。



![image-20211027200026118](/assets/imgs/JavaSE4.assets/image-20211027200026118.png)





```java
public void testGenericAndSubClass() {
    Person[] persons = null;
    Man[] mans = null;
    // 而 Person[] 是 Man[] 的父类.
    persons = mans;
    Person p = mans[0];
    // 在泛型的集合上
    List<Person> personList = null;
    List<Man> manList = null;
    // personList = manList;(报错)
}

```



### 通配符的使用



1.  使用类型通配符：？

   比如：List<?> ，Map<?,?>
   List<?>是List<String>、List<Object>等各种泛型List的父类。



2.  读取List<?>的对象list中的元素时，永远是安全的，因为不管list的真实类型
是什么，它包含的都是Object。 



3.   写入list中的元素时，不行。因为我们不知道c的元素类型，我们不能向其中
    添加对象。
    1.  唯一的例外是null，它是所有类型的成员



- 将任意元素加入到其中不是类型安全的：

  ```java
  // 因为我们不知道c的元素类型，我们不能向其中添加对象。add方法有类型参数E作为集
  // 合的元素类型。我们传给add的任何参数都必须是一个未知类型的子类。因为我们不知
  // 道那是什么类型，所以我们无法传任何东西进去。
  Collection<?> c = new ArrayList<String>();
  c.add(new Object()); // 编译时错误
  ```

- 唯一的例外的是null，它是所有类型的成员。

- 另一方面，我们可以调用get()方法并使用其返回值。返回值是一个未知的 类型，但是我们知道，它总是一个Object。



```java
public static void main(String[] args) {
    List<?> list = null;
    list = new ArrayList<String>();
    list = new ArrayList<Double>();
    // list.add(3);//编译不通过
    list.add(null);
    List<String> l1 = new ArrayList<String>();
    List<Integer> l2 = new ArrayList<Integer>();
    l1.add("尚硅谷");
    l2.add(15);
    read(l1);
    read(l2);
}
public static void read(List<?> list) {
    for (Object o : list) {
        System.out.println(o);
    }
}

```



#### 注意点



```java
//注意点1：编译错误：不能用在泛型方法声明上，返回值类型前面<>不能使用?
public static <?> void test(ArrayList<?> list){
}
//注意点2：编译错误：不能用在泛型类的声明上
class GenericTypeClass<?>{
}
//注意点3：编译错误：不能用在创建对象上，右边属于创建集合对象
ArrayList<?> list2 = new ArrayList<?>();

```





#### 有限制的通配符

- <?>
	- 允许所有泛型的引用调用
-  通配符指定上限
	- 上限extends：使用时指定的类型必须是继承某个类，或者实现某个接口，即<=
- 通配符指定下限
	- 下限super：使用时指定的类型不能小于操作的类，即>=
- 举例：
	-  <? extends Number> (无穷小 , Number]
	只允许泛型为Number及Number子类的引用调用
	-  <? super Number> [Number , 无穷大)
	只允许泛型为Number及Number父类的引用调用
	- <? extends Comparable>
	只允许泛型为实现Comparable接口的实现类的引用调用



```java
public static void printCollection3(Collection<? extends Person> coll) {
    //Iterator只能用Iterator<?>或Iterator<? extends Person>.why?
    Iterator<?> iterator = coll.iterator();
    while (iterator.hasNext()) {
        System.out.println(iterator.next());
    }
}
public static void printCollection4(Collection<? super Person> coll) {
    //Iterator只能用Iterator<?>或Iterator<? super Person>.why?
    Iterator<?> iterator = coll.iterator();
    while (iterator.hasNext()) {
        System.out.println(iterator.next());
    }
}
```



```java
package com.yixihan.day1027.genericitytest2;

import org.junit.Test;

import java.util.*;

/**
 * 1. 泛型在继承方面的体现
 *
 *
 *
 * 2. 通配符的使用
 *
 * @author : yixihan
 * @create : 2021-10-27-21:48
 */
public class GenericTest {


    /**
     * 1. 泛型在继承方面的体现
     *      类 A 是 类 B 的父类
     *      G<A> 和 G<B> 二者不具备子父类关系, 是并列关系
     *
     *      补充 类 A 是 类 B 的父类, A<G> 是 B<G> 的父类
     *
     */
    @Test
    public void test1 () {

        Object obj = null;
        String str = null;
        obj = str;

        Object[] arr1 = null;
        String[] arr2 = null;
        arr1 = arr2;

        List<Object> list1 = null;
        List<String> list2 = new ArrayList<>();
        // 此时的 list1 和 list2 的类型不具有子父类关系
        // 编译不通过
//        list1 = list2;

        Date date = new Date();
        // 编译不通过
//        str = date;


        /*
        反证法 :
        假设 list1 = list2;

        list1.add(123); 导致混入非 String 的数据, 出错

         */

        // 编译不通过
//        show(list2);
        // 这样就可以
        show1(list2);
        show1(list1);
    }

    public <T> void show1 (List<T> list) {

    }

    public void show (List<Object> list) {

    }


    @Test
    public void test2 () {
        AbstractList<String> list1 = null;
        List<String> list2 = null;
        ArrayList<String> list3 = null;

        list1 = list3;
        list2 = list3;

        List<String> list4 = new ArrayList<>();


    }


    /**
     * 2. 通配符的使用
     *      通配符 : ?
     *      类 A 是 类 B 的父类
     *       G<A> 和 G<B> 二者不具备子父类关系, 是并列关系, 二者共同的父类是 : G<?>
     */
    @Test
    public void test3 () {

        List<Object> list1 = null;
        List<String> list2 = null;

        List<?> list = null;

        list = list1;
        list = list2;

        // 编译通过, 但是上面赋值为 null, 会报 空指针异常
//        printf(list);
//        printf(list1);
//        printf(list2);


        //
        List<String> list3 = new ArrayList<>();
        list3.add("ABC");
        list3.add("DEF");
        list3.add("GHI");
        list3.add("JKL");

        list = list3;

        // 添加 (写入), 对于 List<?> 就不能向其内部添加数据, 除了添加 null 之外
//        list.add("DD");
        list.add(null);


        // 获取 (读取)
        Object value = list.get(0);
        System.out.println(value);

        printf(list);

    }

    public void printf (List<?> list) {
        // 方式一
        // list.forEach(System.out::println);

        // 方式二
        Iterator<?> iterator = list.iterator();

        while (iterator.hasNext()) {
            Object next = iterator.next();
            System.out.println(next);
        }
    }


    /**
     * 3. 有限制条件的通配符的使用
     *      ? extends A :
     *          G<? extends A> 可以作为 G<A> 和 G<B> 的父类的, 其中 B 是 A 的子类
     *      ? super A :
     *          G<? super A> 可以作为 G<A> 和 G<B> 的父类的, 其中 B 是 A 的父类
     */
    @Test
    public void test4 () {

        // <=
        List<? extends Person> list1 = null;

        // >=
        List<? super Person> list2 = null;

        List<Student> list3 = new ArrayList<>();
        List<Person> list4 = new ArrayList<>();
        List<Object> list5 = new ArrayList<>();

        list1 = list3;
        list1 = list4;

        // 编译不通过
//        list1 = list5;


        // 编译不通过
//        list2 = list3;
        list2 = list4;

        list2 = list5;

        //***************************************************

        // 读取数据
        list1 = list3;

        // 编译不通过
//        Student p = list1.get(0);
        Person p = list1.get(0);

        //***************************************************

        list2 = list4;

        // 编译不通过
//        Person p2 = list2.get(0);
        Object obj = list2.get(0);


        // 写数据
        // 编译不通过
//        list1.add(new Person());

        // 编译通过
        list2.add(new Person());
        list2.add(new Student());


    }
}
```



### 泛型应用举例



#### 泛型嵌套



```java
public static void main(String[] args) {
    HashMap<String, ArrayList<Citizen>> map = new HashMap<String, ArrayList<Citizen>>();
    ArrayList<Citizen> list = new ArrayList<Citizen>();
    list.add(new Citizen("刘恺威"));
    list.add(new Citizen("杨幂"));
    list.add(new Citizen("小糯米"));
    map.put("刘恺威", list);
    Set<Entry<String, ArrayList<Citizen>>> entrySet = map.entrySet();
    Iterator<Entry<String, ArrayList<Citizen>>> iterator = entrySet.iterator();
    while (iterator.hasNext()) {
        Entry<String, ArrayList<Citizen>> entry = iterator.next();
        String key = entry.getKey();
        ArrayList<Citizen> value = entry.getValue();
        System.out.println("户主：" + key);
        System.out.println("家庭成员：" + value);
    }
}
```



#### 实际案例



用户在设计类的时候往往会使用类的关联关系，例如，一个人中可以定义一个信息 的属性，但是一个人可能有各种各样的信息（如联系方式、基本信息等），所以此信 息属性的类型就可以通过泛型进行声明，然后只要设计相应的信息类即可。

![image-20211027200643913](/assets/imgs/JavaSE4.assets/image-20211027200643913.png)





### 练习



#### 练习一



Employee

```java
package com.yixihan.day1027.genericitytest.exer.test1;

import java.util.Objects;

/**
 * @author : yixihan
 * @create : 2021-10-27-13:23
 */
public class Employee implements Comparable{

    /**
     * 姓名
     */
    private String name;

    /**
     * 年龄
     */
    private int age;

    /**
     * 生日
     */
    private MyDate birthday;


    /**
     * 无参构造
     */
    public Employee() { }


    /**
     * 全参构造
     * @param name 姓名
     * @param age 年龄
     * @param birthday 生日
     */
    public Employee(String name, int age, MyDate birthday) {
        this.name = name;
        this.age = age;
        this.birthday = birthday;
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
        return getAge() == employee.getAge() && Objects.equals(getName(), employee.getName()) && Objects.equals(getBirthday(), employee.getBirthday());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName(), getAge(), getBirthday());
    }

    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", birthday=" + birthday +
                '}';
    }

    @Override
    public int compareTo(Object o) {
        if (o instanceof Employee) {
            Employee employee = (Employee) o;

            return this.name.compareTo(employee.name);
        } else {
            throw new RuntimeException("传入的数据类型不匹配");
        }
    }
}
```



MyDate

```java
package com.yixihan.day1027.genericitytest.exer.test1;

import java.util.Objects;

/**
 * @author : yixihan
 * @create : 2021-10-27-13:23
 */
public class MyDate implements Comparable<MyDate>{

    /**
     * 年
     */
    private Integer year;

    /**
     * 月
     */
    private Integer month;

    /**
     * 日
     */
    private Integer day;


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
    public MyDate(Integer year, Integer month, Integer day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getDay() {
        return day;
    }

    public void setDay(Integer day) {
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
        return getYear().equals(myDate.getYear()) && getMonth().equals(myDate.getMonth()) && getDay().equals(myDate.getDay());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getYear(), getMonth(), getDay());
    }

    @Override
    public String toString() {
        return "MyDate{" +
                "year=" + year +
                ", month=" + month +
                ", day=" + day +
                '}';
    }

    @Override
    public int compareTo (MyDate m) {

        // 比较年
        int minusYear = this.getYear().compareTo(m.getYear());

        if (minusYear != 0) {
            return minusYear;
        }

        // 比较月
        int minusMonth = this.getMonth().compareTo(m.getMonth());

        if (minusMonth != 0) {
            return minusMonth;
        }

        // 比较日
        return this.getDay().compareTo(m.getDay());

    }

}
```



Test

```java
package com.yixihan.day1027.genericitytest.exer.test1;

import org.junit.Test;

import java.util.Comparator;
import java.util.TreeSet;

/**
 * @author : yixihan
 * @create : 2021-10-27-13:28
 */
public class EmployeeTest {

    @Test
    public void testComparable () {

        TreeSet<Employee> set = new TreeSet<>();

        set.add(new Employee("Jane", 24, new MyDate(1997, 5 , 20)));
        set.add(new Employee("Tom", 29, new MyDate(1992, 10 , 1)));
        set.add(new Employee("Jack", 23, new MyDate(1998, 5 , 1)));
        set.add(new Employee("Duck", 25, new MyDate(1996, 9 , 9)));
        set.add(new Employee("Jane", 26, new MyDate(1995, 8 , 8)));
        set.add(new Employee("Uer", 27, new MyDate(1994, 6 , 7)));

        set.forEach(System.out::println);
    }

    @Test
    public void testComparator () {

        Comparator<Employee> comparator = new Comparator<Employee>() {
            @Override
            public int compare(Employee e1, Employee e2) {

                MyDate b1 = e1.getBirthday();
                MyDate b2 = e2.getBirthday();
                return b1.compareTo(b2);
            }

        };

        TreeSet<Employee> set = new TreeSet<Employee>(comparator);


        set.add(new Employee("Jane", 24, new MyDate(1997, 5 , 20)));
        set.add(new Employee("Tom", 29, new MyDate(1992, 10 , 1)));
        set.add(new Employee("Jack", 23, new MyDate(1998, 5 , 1)));
        set.add(new Employee("Duck", 25, new MyDate(1996, 9 , 9)));
        set.add(new Employee("Jane", 26, new MyDate(1995, 8 , 8)));
        set.add(new Employee("Uer", 26, new MyDate(1995, 7 , 8)));
        set.add(new Employee("Duck", 26, new MyDate(1995, 7 , 8)));
        set.add(new Employee("Uer", 27, new MyDate(1994, 6 , 7)));

        set.forEach(System.out::println);

    }
}
```



#### 练习二



DAO

```java
package com.yixihan.day1027.exer.test1;

import java.util.*;

/**
 * 定义个泛型类 DAO<T>，在其中定义一个 Map 成员变量，Map 的键为 String 类型，值为 T 类型。
 * 分别创建以下方法：
 * public void save(String id,T entity)： 保存 T 类型的对象到 Map 成员变量中
 * public T get(String id)：从 map 中获取 id 对应的对象
 * public void update(String id,T entity)：替换 map 中 key 为 id 的内容,改为 entity 对象
 * public List<T> list()：返回 map 中存放的所有 T 对象
 * public void delete(String id)：删除指定 id 对象
 * @author : yixihan
 * @create : 2021-10-27-22:27
 */
public class DAO<T> {

    private Map<String, T> map;

    public DAO() {
        map = new HashMap<>();
    }

    public DAO(Map<String, T> map) {
        this.map = map;
    }

    /**
     * 保存 T 类型的对象到 Map 成员变量中
     */
    public void save(String id, T entity) {
        map.put(id, entity);
    }


    /**
     * 从 map 中获取 id 对应的对象
     */
    public T get(String id) {
        return map.get(id);
    }


    /**
     * 替换 map 中 key 为 id 的内容,改为 entity 对象
     */
    public void update(String id,T entity) {
        if (map.containsKey(id)) {
            map.put(id, entity);
        }
    }


    /**
     * 返回 map 中存放的所有 T 对象
     */
    public List<T> list() {
        // 错误的
//        Collection<T> values = map.values();
//        return (List<T>) values;

        Collection<T> values = map.values();

        return new ArrayList<>(values);
    }


    /**
     * 删除指定 id 对象
     */
    public void delete(String id) {
        map.remove(id);
    }

    public Map<String, T> getMap() {
        return map;
    }

    public void setMap(Map<String, T> map) {
        this.map = map;
    }
}

```



User

```java
package com.yixihan.day1027.exer.test1;

import java.util.Objects;

/**
 * 定义一个 User 类：
 * 该类包含：private 成员变量（int 类型） id，age；（String 类型）name。
 * @author : yixihan
 * @create : 2021-10-27-22:36
 */
public class User {

    private int id;

    private int age;

    private String name;


    public User() { }


    public User(int id, int age, String name) {
        this.id = id;
        this.age = age;
        this.name = name;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
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
        if (!(o instanceof User)) {
            return false;
        }
        User user = (User) o;
        return getId() == user.getId() && getAge() == user.getAge() && Objects.equals(getName(), user.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getAge(), getName());
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", age=" + age +
                ", name='" + name + '\'' +
                '}';
    }
}
```



Test

```java
package com.yixihan.day1027.exer.test1;

import org.junit.Test;

import java.util.List;

/**
 * 定义一个测试类：
 * 创建 DAO 类的对象， 分别调用其 save、get、update、list、delete 方
 * 法来操作 User 对象，
 * 使用 Junit 单元测试类进行测试。
 * @author : yixihan
 * @create : 2021-10-27-22:36
 */
public class UserTest {

    @Test
    public void test1 () {
        DAO<User> userDAO = new DAO<>();

        userDAO.save("1001", new User(1001, 18, "易曦翰"));
        userDAO.save("1002", new User(1002, 20, "yixihan"));
        userDAO.save("1003", new User(1003, 16, "曾思彤"));

        List<User> list = userDAO.list();

        list.forEach(System.out::println);
        System.out.println("***********");

        userDAO.update("1003", new User(1003, 48, "老曾"));

        User user = userDAO.get("1003");
        System.out.println(user);
        System.out.println("***********");

        userDAO.delete("1002");
        list = userDAO.list();
        list.forEach(System.out::println);
        System.out.println("***********");

    }
}
```

