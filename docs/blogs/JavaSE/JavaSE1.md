---
title: JavaSE1
date: 2022-03-09
tags:
 - JavaSE
categories:
 - JavaSE
---

# JavaSE

## 入门

### 尝新

第一个 java 程序

```java
class HelloChina{

	public static void main(String[] args){
		System.out.println("Hello,World!");
	}

}
```



注释

```java

/*
1. java规范的三种注释方式：
单行注释
多行注释
文档注释(java特有)

2.
单行注释和多行注释的作用：
① 对所写的程序进行解释说明，增强可读性。方便自己，方便别人
② 调试所写的代码

3. 特点：单行注释和多行注释，注释了的内容不参与编译。
         换句话说，编译以后生成的.class结尾的字节码文件中不包含注释掉的信息

4. 文档注释的使用：
    注释内容可以被JDK提供的工具 javadoc 所解析，生成一套以网页文件形式体现的该程序的说明文档。

5. 多行注释不可以嵌套使用


*/

/**
文档注释
@author shkstart
@version v1.0
这是我的第一个java程序！非常的开森！

*/
public class HelloJava{
	/*
	多行注释：
	如下的main方法是程序的入口！
	main的格式是固定的！
	*/
	/**
	如下的方式是main()，作用：程序的入口。
	*/
	public static void main(String[] args){
		// 单行注释：如下的语句表示输出到控制台
		// System.out.println("Hello World!")
		System.out.println("Hello World!");
	}
}

```



小结

```java
/*
对第一个java程序进行总结
1. java程序编写-编译-运行的过程
编写：我们将编写的java代码保存在以".java"结尾的源文件中
编译：使用javac.exe命令编译我们的java源文件。格式：javac 源文件名.java
运行：使用java.exe命令解释运行我们的字节码文件。 格式：java 类名

2.
在一个java源文件中可以声明多个class。但是，只能最多有一个类声明为public的。
而且要求声明为public的类的类名必须与源文件名相同。

3. 程序的入口是main()方法。格式是固定的。

4. 输出语句：
System.out.println():先输出数据，然后换行
System.out.print():只输出数据

5.每一行执行语句都以";"结束。

6.编译的过程：编译以后，会生成一个或多个字节码文件。字节码文件的文件名与java源文件中的类名相同。

*/
public class Hello {
	public static void main(String[] args) {// public static void main(String a[]) {// arguments:参数
		System.out.print("Hello World!");
		System.out.println(); // 换行
		System.out.println("Hello World!");
	}
}

class Person{

}

class Animal{
	
}
`
```



### 变量

> 关键字

![image-20211009212813755](/assets/imgs/JavaSE.assets/image-20211009212813755.png)



> 保留字

现 Java 版本尚未使用, 但以后的版本可能作为关键字使用

`goto`  ` const`

#### 标识符

```java
/*
标识符的使用
1.标识符：凡是自己可以起名字的地方都叫标识符。
   比如：类名、变量名、方法名、接口名、包名...

2.标识符的命名规则：--> 如果不遵守如下的规则，编译不通过！需要大家严格遵守

> 由26个英文字母大小写，0-9 ，_或 $ 组成  
> 数字不可以开头。
> 不可以使用关键字和保留字，但能包含关键字和保留字。
> Java中严格区分大小写，长度无限制。
> 标识符不能包含空格。

3. Java中的名称命名规范： --->如果不遵守如下的规范，编译可以通过！建议大家遵守

包名：多单词组成时所有字母都小写：xxxyyyzzz
类名、接口名：多单词组成时，所有单词的首字母大写：XxxYyyZzz
变量名、方法名：多单词组成时，第一个单词首字母小写，第二个单词开始每个单词首字母大写：xxxYyyZzz
常量名：所有字母都大写。多单词时每个单词用下划线连接：XXX_YYY_ZZZ

4.
注意1：在起名字时，为了提高阅读性，要尽量有意义，“见名知意”。
注意2：java采用unicode字符集，因此标识符也可以使用汉字声明，但是不建议使用。 


*/
class IdentifierTest{

	public static void main(String[] args){
		
		// int myNumber = 1001;
		// System.out.println(myNumber);
		int mynumber = 1002;
		System.out.println(mynumber);

		// int 学号 = 1003;
		// System.out.println(学号);
		
	
	}


}

class Hello1_${

}
// class 1Hello{
// }
class staticpublic{
}
class Static{
}

class User{
}

class Account{
}
```



#### 变量的使用

```java
/*
变量的使用
1. java定义变量的格式：数据类型 变量名 = 变量值;

2. 说明：
   ① 变量必须先声明，后使用
   ② 变量都定义在其作用域内。在作用域内，它是有效的。换句话说，出了作用域，就失效了
   ③ 同一个作用域内，不可以声明两个同名的变量

*/
class VariableTest {
	public static void main(String[] args) {
		// 变量的定义
		int myAge = 12;
		// 变量的使用
		System.out.println(myAge);
		
		// 编译错误 ：使用 myNumber 之前并未定义过 myNumber
		// System.out.println(myNumber);

		// 变量的声明
		int myNumber;
		
		// 编译错误 ：使用 myNumber 之前并未赋值过 myNumber
		// System.out.println(myNumber);

		// 变量的赋值
		myNumber = 1001;
		// 编译不通过
		// System.out.println(myClass);

		// 不可以在同一个作用域内定义同名的变量
		// int myAge = 22;
		
	}

	public void method(){
		int myClass = 1;
	}
}

// class VariableTest {} // 逆向思维，反证法
```



##### 基本数据类型

```java
/*
Java定义的数据类型

一、变量按照数据类型来分：

	基本数据类型：
		整型：byte \ short \ int \ long
		浮点型：float \ double
		字符型：char
		布尔型：boolean


	引用数据类型：
		类(class)
		接口(interface)
		数组(array)


二、变量在类中声明的位置：
		成员变量  vs  局部变量
*/
class VariableTest1 {
	public static void main(String[] args) {
		// 1. 整型 ：byte (1字节 = 8bit) \ short (2字节) \ int (4字节) \ long (8字节)
		// ① byte 范围：-128 ~ 127
		//
		byte b1 = 12;
		byte b2 = -128;
		// b2 = 128; // 编译不通过
		System.out.println(b1);
		System.out.println(b2);
		// ② 声明 long 型变量，必须以 "l" 或 "L" 结尾
		// ③ 通常，定义整型变量时，使用 int 型。
		short s1 = 128;
		int i1 = 1234;
		long l1 = 3414234324L;
		System.out.println(l1);

		// 2. 浮点型 ：float (4字节) \ double (8字节)
		// ① 浮点型，表示带小数点的数值
		// ② float 表示数值的范围比 long 还大

		double d1 = 123.3;
		System.out.println(d1 + 1);
		// ③ 定义 float 类型变量时，变量要以 "f" 或 "F" 结尾
		float f1 = 12.3F;
		System.out.println(f1);
		// ④ 通常，定义浮点型变量时，使用 double 型。

		// 3. 字符型 ：char (1字符 = 2字节)
		// ① 定义 char 型变量，通常使用一对'',内部只能写一个字符
		char c1 = 'a';
		// 编译不通过
		// c1 = 'AB';
		System.out.println(c1);

		char c2 = '1';
		char c3 = '中';
		char c4 = 'ス';
		System.out.println(c2);
		System.out.println(c3);
		System.out.println(c4);

		// ② 表示方式 ：1. 声明一个字符 2. 转义字符 3. 直接使用 Unicode 值来表示字符型常量
		char c5 = '\n'; // 换行符
		c5 = '\t'; // 制表符
		System.out.print("hello" + c5);
		System.out.println("world");

		char c6 = '\u0043'; // \u0043 <==> C
		System.out.println(c6);

		// 4. 布尔型 ：boolean
		// ① 只能取两个值之一：true 、 false
		// ② 常常在条件判断、循环结构中使用
		boolean bb1 = true;
		System.out.println(bb1);

		boolean isMarried = true;
		if(isMarried){
			System.out.println("你就不能参加\"单身\"party了！\\n很遗憾");
		}else{
			System.out.println("你可以多谈谈女朋友！");
		}

	}
}

```



> 基本数据类型之间的运算规则

###### 自动类型转换

```java
/*
基本数据类型之间的运算规则

前提 : 不包括 boolean 类型 只是 7 种基本类型变量间做运算

1. 自动类型提升 :

	byte 、 char 、 short --> int --> long --> float --> double 
	
	当容量小的数据类型的变量与容量打的数据类型的变量做运算时, 结果自动提升为容量大的数据类型
	
	特别的 : 当 byte char short 三种类型的变量做运算是, 结果为 int 类型

2. 强制类型转换 :


说明 : 此时的容量大小指的是, 表示数的范围的大和小. ps : float 容量要大于 long 的容量
*/
class VariableTest2 {

    public static void main (String[] args) {
        byte b1 = 2;
        int i1 = 128;
        // 编译不通过
        // byte b2 = b1 + i1;
        int i2 = b1 + i1;
        long l1 = b1 + i1;
        System.out.println(i2);
        System.out.println(l1);
        
        float f1 = b1 + i1;
        System.out.println(f1); // 130.0
        
        short s1 = 123;
        double d1 = s1;
        System.out.println(d1); // 123.0
        
        /*****************************************/
        char c1 = 'a';
        int i3 = 10;
        int i4 = c1 + i3;
        System.out.println(i4); // 107
        
        short s2 = 10;
        // 编译不通过
        // short s3 = c1 + s2;
        
        byte b2 = 10;
        // 编译不通过
        // char = c1 + b2;
        
        // 编译不通过
        // short s4 = b2 + s2;
        
        // 编译不通过
        // short s4 = b2 + b1;
        /*****************************************/
        
        
    }
}

```



###### 强制类型转换

```java
/*
基本数据类型之间的运算规则

前提 : 不包括 boolean 类型 只是 7 种基本类型变量间做运算

2. 强制类型转换 :

	自动类型提升的逆运算
	
	1. 需要使用强转符 ()
	2. 注意点 : 强制类型转换, 可能导致精度损失
*/
class VariableTest3 {

    public static void main (String[] args) {
  
        // 有精度损失
        double d1 = 12.3; // 12.9 强转为 int 类型 仍然为 12 截断操作
        // 编译不通过
        // int i1 = d1;
        int i1 = (int) d1;
        System.out.println(i1); // 12
        
        // 没有精度损失
        long l1 = 123;
        short s1 = (short) l1;
        
        // 有精度损失
        int i2 = 128;
        byte b1 = (byte) i2;
        System.out.println(b1); // -128
           
    }
}
```



###### 两种特殊情况

```java
class VariableTest4 {

    public static void main (String[] args) {
 
        // 1. 编码情况1
        long l1 = 123321; 
        System.out.println(l1); // 不报错 当做 int 类型 存储
        
        // 编译失败 过大的证书
        // long l2 = 123321123456789; 
        long l2 = 123321123456789L; 
        
        // 编译失败 double 比 float 大
        // float f1 = 12.3;
        
        
        // 2. 编码情况2
        // 整型常量, 默认类型为 int 型
        // 浮点型常量, 默认类型为 double 型
        byte b1 = 12;
        // 编译失败
        // byte b2 = b + 1;
        // float f2 = f1 + 12.3
    }
}
```



##### 引用数据类型

###### String

```java
/*
String 类型变量的使用
1. String 属于引用数据类型, 字符串
2. 声名 String 类型变量时, 使用一对 ""
3. String 可以和 8 种基本数据类型变量做运算, 且运算只能是连接运算 : +
4. 运算的结果仍然是 String 类型


*/

class StringTest {
    
    public static void main (String[] args) {
        
        String s1 = "hello world!";
        
        System.out.println(s1);
        
        String s2 = "a";
        String s3 = "";
        
        // 编译不通过
        // char c = ''; 
        
        /*********************************/
        int number = 1001;
        String numberStr = "学号 : ";
        Boolean b1 = true;
        String info = numberStr + number + b1; // + : 连接运算
        System.out.println(info);
        
        /*********************************/
        // 练习一
        char c = 'a';
        int num = 10;
        String str = "hello";
        
        System.out.println(c + num + str); // 107hello
        System.out.println(c + str + num); // ahello10
        System.out.println(c + ( num + str)); // a10hello
        System.out.println((c + num) + str); // 107hello
        System.out.println(str + num + c); // hello10a
        
        /*********************************/
        // 练习二
        // *	*
        System.out.println("*	*"); // *	*
        System.out.println('*' + '\t' + '*'); // 93
        System.out.println('*' + "\t" + '*'); // *	*
        System.out.println('*' + '\t' + "*"); // 51*
        System.out.println('*' + ('\t' + "*")); // *	 *
    }
}
```



##### 进制与进制之间的转换

```java
/*
计算机中不同进制的使用说明

对于整数, 有四种表示方式 : 
	二进制 (binary) : 0, 1 , 满 2 进 1, 以 0B/0b 开头表示
	十进制 (decimal) : 0-9 , 满 10 进 1
	八进制 (octal) : 0-7 , 满 8 进 1, 以数字 0 开头表示
	十六进制 (hex) : 0-9及A-F , 满 16 进 1, 以 0X/0x 开头表示. 此处的 A-F 不区分大小写 
	
	如 : 0x12AF + 1 = 0X12B0
*/

class StringTest {
    
    public static void main (String[] args) {
        
        int num1 = 0b110;
        int num2 = 110;
        int num3 = 0127;
        int num4 = 0x110A;
        
        System.out.println("num1 = " + num1);
        System.out.println("num2 = " + num2);
        System.out.println("num3 = " + num3);
        System.out.println("num4 = " + num4);
    }
}
```



### 运算符

#### 算术运算符

![image-20211009215731244](/assets/imgs/JavaSE.assets/image-20211009215731244.png)

```java
/*
运算符之一 : 算术运算符
	+ : 正号
	- : 负号
	+ : 加
	- : 减
	* : 乘
	/ : 除
	% : 取余
	++ (前) : 
	++ (后) :
	-- (前) :
	-- (后) :
	+ :
	

*/
class AriTest {
    public static void main(String[] args) {

        // 除号 : /
        int num1 = 12;
        int num2 = 5;
        int result1 = num1 / num2;
        System.out.println(result1); // 2

        int result2 = num1 / num2 * num2;
        System.out.println(result2); // 10

        double result3 = num1 / num2;
        System.out.println(result3); // 2.0

        double result4 = (double) (num1 / num2);
        System.out.println(result4); // 2.0

        double result5 = (double) num1 / num2;
        System.out.println(result5); // 2.4

        double result6 =  num1 / (double) num2;
        System.out.println(result6); // 2.4

        double result7 =  num1 / (num2 + 0.0) ;
        System.out.println(result7); // 2.4


        /*********************************************/
        // 取余 : %
        // 结果的符号与被模数的符号相同
        // 开发中, 经常使用 % 来判断是否能被除尽的情况
        int n1 = 12;
        int m1 = 5;
        System.out.println("num3 % num4 = " + n1 % m1); // 2

        int n2 = -12;
        int m2 = 5;
        System.out.println("num3 % num4 = " + n2 % m2); // -2

        int n3 = 12;
        int m3 = -5;
        System.out.println("num3 % num4 = " + n3 % m3); // 2

        int n4 = -12;
        int m4 = -5;
        System.out.println("num3 % num4 = " + n4 % m4); // -2

        /*********************************************/
        // (前) ++  先自增一,再运算
        // (后) ++  先运算,再自增一
        int a1 = 10;
        int b1 = ++a1;
        System.out.println("a1 = " + a1 + ", b1 = " + b1); // a1 = 11, b1 = 11

        int a2 = 10;
        int b2 = a2++;
        System.out.println("a2 = " + a2 + ", b2 = " + b2); // a2 = 11, b2 = 10

        // 注意点
        short s1 = 10;
        // s1 = s1 + 1; // 编译错误
        s1++; // ++ 不会改变变量的数据类型
        System.out.println(s1); // 11

        byte byte1 = 127;
        byte1++;
        System.out.println(byte1); // -128

        byte byte2 = -128;
        byte2--;
        System.out.println(byte2); // 127

        // (前) --  先自减一,再运算
        // (后) --  先运算,再自减一
        int a3 = 10;
        int b3 = --a3;
        System.out.println("a1 = " + a3 + ", b1 = " + b3); // a1 = 9, b1 = 9

        int a4 = 10;
        int b4 = a4--;
        System.out.println("a2 = " + a4 + ", b2 = " + b4); // a2 = 9, b2 = 10
    }
}
```



测试

```java
/*
随意给出一个整数，打印显示它的个位数，十位数，百位数的值。
格式如下：
数字xxx的情况如下：
个位数：
十位数：
百位数：

例如：
数字153的情况如下：
个位数：3
十位数：5
百位数：1
*/
class AriExer {
    public static void main(String[] args) {
        Random random = new Random();

        int max = 999;
        int min = 100;

        int[] wei = new int[3];

        int num = random.nextInt(max - min + 1); // 随机数获取

        System.out.println(num);

        for (int i = 0; num % 10 > 1; i++) { // 取余
            wei[i] = num % 10;
            num = num / 10;
        }

        for (int i = wei.length - 1; i >= 0; i--) { // 输出
            System.out.println(wei[i]);
        }
        
    }
}
```



#### 赋值运算法

`=`   `+=`  `-=`   `*=`  `/=`  `%=`

```java
/*
运算符之二 : 赋值运算符
    =
    +=
    -=
    *=
    /=
    %=
 */
class SetValueTest {

    public static void main(String[] args) {

        // 赋值符号 : =
        int i1 = 10;
        int j1 = 10;
        System.out.println("i1 = " + i1 + ", j1 = " + j1);

        int i2, j2;
        // 连续赋值
        i2 = j2 = 11;
        System.out.println("i2 = " + i2 + ", j2 = " + j2);

        int i3 = 10, j3 = 20;
        System.out.println("i3 = " + i3 + ", j3 = " + j3);

        /******************************/
        int num1 = 10;
        num1 += 2;
        System.out.println(num1); // 12

        int num2 = 10;
        num2 -= 2;
        System.out.println(num2); // 8

        int num3 = 10;
        num3 *= 2;
        System.out.println(num3); // 20

        int num4 = 10;
        num4 /= 2;
        System.out.println(num4); // 5

        int num5 = 10;
        num5 %= 2;
        System.out.println(num5); // 0

        short s1 = 10;
        s1 += 10; // 不会改变变量本身的数据类型
        System.out.println(s1); // 20

        // 在开发中, 如果希望变量出现 +2 的操作, 有几种方式 ?

        // 方式 1 : num = num + 2;
        // 方式 2 : num += 2;
        // 方式 3 : num++; num++;

        short num = 10;
        num++; num++;
        System.out.println(num);

        // 练习 1
        int i = 1;
        i *= 0.1;
        System.out.println(i); // 0
        i++;
        System.out.println(i); // 1

        // 练习 2
        int m = 2;
        int n = 3;
        n *= m++;
        System.out.println("m =" + m); // 3
        System.out.println("n =" + n); // 6

        // 练习 3
        int n2 = 10;
        n2 += (n2++) + (++n2);
        System.out.println(n2); // 32
    }

}
```



#### 比较运算符

![image-20211009225139378](/assets/imgs/JavaSE.assets/image-20211009225139378.png)

```java
/*
运算符之三 : 比较运算符
    ==
    !=
    <
    >
    <=
    >=
    instanceof

    结论 : 比较运算符的结果是布尔类型
 */
class CompareTest {
    public static void main(String[] args) {

        int i1 = 10;
        int j1 = 11;
        System.out.println(i1 == j1); // false
        System.out.println(i1 = j1); // 11

        boolean b1 = true;
        boolean b2 = false;

        System.out.println(b1 == b2); // false
        System.out.println(b2 = b1); // true

    }
}
```



#### 逻辑运算符

![image-20211009225721318](/assets/imgs/JavaSE.assets/image-20211009225721318.png)

```java
/*
运算符之四 :逻辑运算符
    &
    &&
    |
    ||
    !
    ^

    说明 : 逻辑运算符操作的都是布尔类型的变量
 */
class LogicTest {
    public static void main(String[] args) {

        // 区分 & 与 &&

        // 相同点1 : 运算结果相同
        // 相同点1 : 当符号左边是 true 时, 二者都会执行符号右边的运算
        // 不同点 : 当符号左边是 false 是, & 会处理, && 不会处理
        boolean b1  = false;
        int num1 = 10;
        if (b1 & (num1++ > 0)) {
            System.out.println(11);
        } else {
            System.out.println(22);
        }

        System.out.println("num = " + num1); // 11

        boolean b2  = false;
        int num2 = 10;
        if (b2 && (num2++ > 0)) {
            System.out.println(11);
        } else {
            System.out.println(22);
        }

        System.out.println("num = " + num2); // 10


        // 区分 | 与 ||
        // 相同点1 : 运算结果相同
        // 相同点1 : 当符号左边是 false 时, 二者都会执行符号右边的运算
        // 不同点 : 当符号左边是 true 是, | 会处理, || 不会处理
        boolean b3  = true;
        int num3 = 10;
        if (b3 | (num3++ > 0)) {
            System.out.println(11);
        } else {
            System.out.println(22);
        }

        System.out.println("num = " + num3); // 11

        boolean b4  = true;
        int num4 = 10;
        if (b4 || (num4++ > 0)) {
            System.out.println(11);
        } else {
            System.out.println(22);
        }

        System.out.println("num = " + num4); // 10


        // 练习 1
        int x = 1;
        int y=1;
        if(x++==2 & ++y==2){
            x =7;
        }
        System.out.println("x="+x+",y="+y); // x=2,y=2

        // 练习 2
        int x2 = 1,y2 = 1;
        if(x2++==2 && ++y2==2){
            x2 =7;
        }
        System.out.println("x="+x2+",y="+y2); // x=2,y=1

        // 练习 3
        int x3 = 1,y3 = 1;
        if(x3++==1 | ++y3==1){
            x3 =7;
        }
        System.out.println("x="+x3+",y="+y3); // x=7,y=2

        // 练习 4
        int x4 = 1,y4 = 1;
        if(x4++==1 || ++y4==1){
            x4 =7;
        }
        System.out.println("x="+x4+",y="+y4); // x=7,y=1
    }
}
```



练习 

```java
class LogicExer {
    public static void main (String [] args) {
         boolean x=true;
         boolean y=false;
         short z=42;

         if ((z++ == 42) && (y = true)) z++;
         if ((x = false) || (++z == 45)) z++;


        System. out.println("z="+z); // 46
    }
}
```



#### 位运算符

![image-20211009232341819](/assets/imgs/JavaSE.assets/image-20211009232341819.png)



```java
/*
运算符之五 : 位运算符
    >>
    <<
    >>>
    &
    |
    ^
    ~

结论 :
1 . 位运算符操作的都是证书的类型
2 . << : 在一定范围内, 每向左移动一位, 相当于 * 2
3 . >> : 在一定范围内, 每向右移动一位, 相当于 / 2
 */
class BitTest {
    public static void main(String[] args) {

        int i = 21;
        int j = -21;

        System.out.println("i << 2 : " + (i << 2)); // i << 2 :84
        System.out.println("i << 3 : " + (i << 3)); // i << 3 :168
        System.out.println("i << 26 : " + (i << 26)); // i << 26 :1409286144
        System.out.println("i << 27 : " + (i << 27)); // i << 27 :-1476395008

        System.out.println("i >> 2 : " + (i >> 2)); // i >> 2 :5
        System.out.println("i >> 3 : " + (i >> 3)); // i >> 3 :2
        System.out.println("i >> 4 : " + (i >> 4)); // i >> 4 :1
        System.out.println("i >> 5 : " + (i >> 5)); // i >> 5 :0

        System.out.println("j >> 2 : " + (j >> 2)); // j >> 2 :-6
        System.out.println("j >> 3 : " + (j >> 3)); // j >> 3 :-3
        System.out.println("j >> 26 : " + (j >> 26)); // j >> 26 :-1
        System.out.println("j >> 27 : " + (j >> 27)); // j >> 27 :-1

        int m = 12;
        int n = 5;

        System.out.println("m & n = " + (m & n)); // 4
        System.out.println("m | n = " + (m | n)); // 13
        System.out.println("m ^ n = " + (m ^ n)); // 9
        System.out.println("~m = " + (~m)); // -13
        System.out.println("~n = " + (~n)); // -6
        System.out.println("~n = " + (~(-n))); // 4


        // 练习, 交换两个变量的值
        int num1 = 10;
        int num2 = 20;
        System.out.println("num1 = " + num1);
        System.out.println("num2 = " + num2);
        System.out.println("================================");


        // 方式一 : 定义临时变量 推荐
        int temp = num1;
        num1 = num2;
        num2 = temp;
        System.out.println("num1 = " + num1);
        System.out.println("num2 = " + num2);
        System.out.println("================================");

        // 方式二 :
        // 好处 : 不用定义临时变量
        // 弊端1 : 相加操作可能超出存储范围 
        // 弊端2 : 有局限性 只能适用于数值类型
        num1 = num1 + num2;
        num2 = num1 - num2;
        num1 = num1 - num2;
        System.out.println("num1 = " + num1);
        System.out.println("num2 = " + num2);
        System.out.println("================================");

        // 方式三 : 使用位运算符
        // 好处 : 相加操作不会超出存储范围
        // 弊端 : 有局限性 只能适用于数值类型
        num1 = num1 ^ num2;
        num2 = num1 ^ num2;
        num1 = num1 ^ num2;
        System.out.println("num1 = " + num1);
        System.out.println("num2 = " + num2);
        System.out.println("================================");

    }
}
```



#### 三元运算符

![image-20211009235721385](/assets/imgs/JavaSE.assets/image-20211009235721385.png)

```java
/*
运算符之六 : 三元运算符
    结构 : (条件表达式)? 表达式1 : 表达式2
    说明 :
        1. 条件表达式的结果为 boolean 类型
        2. 根据条件表达式真或假, 决定执行表达式1, 还是表达式2
            true => 表达式1
            false => 表达式2
        3. 表达式1 和表达式2 需要可以统一为一个类型才行, 不需要一定为一个类型
        4. 三元运算符可以嵌套

    说明 : 凡是可以用三元运算符的地方, 都可以改写为 if-else
          能用 if-else 的, 不一定能用三元运算符
          
    三元 和 if-else 相比, 三元更加高效 简洁
 */
class TernaryTest {
    public static void main(String[] args) {

        // 获取两个整数的较大值
        int m = 15;
        int n = 12;

        int max = (m > n) ? m : n;
        System.out.println(max);

        double num = (m > n) ? 2 : 1.0;
        System.out.println(num);

        // 编译不通过
        // String str = (m > n) ? "2" : 1.0;
        n = 15;
        String str = (m > n) ? "m大" : (m == n) ? "相等" : "n大";
        System.out.println(str);

        // 练习 获取三个数的最大值

        Random random = new Random();

        int maxN = 9;
        int minN = -9;

        int n1 = random.nextInt((maxN - minN) + minN);;
        int n2 = random.nextInt((maxN - minN) + minN);;
        int n3 = random.nextInt((maxN - minN) + minN);;

        System.out.println("n1 = " + n1);
        System.out.println("n2 = " + n2);
        System.out.println("n3 = " + n3);

        // int rs = (n1 > n2) ? ((n1 > n3) ? n1 : n3) : ((n2 > n3) ? n2 : n3);
        int temp = (n1 > n2) ? n1 : n2;
        int rs = (temp > n3) ? temp : n3;

        System.out.println(rs);
    }
}
```



#### 运算符的优先级

![image-20211010001804499](/assets/imgs/JavaSE.assets/image-20211010001804499.png)



### 流程控制

流程控制语句是用来控制程序中各语句执行顺序的语句，可以把语句组 合成能完成一定功能的小逻辑模块。

其流程控制方式采用结构化程序设计中规定的三种基本流程结构，即 :

- 顺序结构 
- 分支结构 
- 循环结构



![image-20211010003254845](/assets/imgs/JavaSE.assets/image-20211010003254845.png)

#### 顺序结构

程序从上到下逐行地执行，中间没有任何判断和跳转



#### 分支结构

根据条件，选择性地执行某段代码



##### if-else 结构

![image-20211010003356460](/assets/imgs/JavaSE.assets/image-20211010003356460.png)

![image-20211010003406658](/assets/imgs/JavaSE.assets/image-20211010003406658.png)

![image-20211010003414236](/assets/imgs/JavaSE.assets/image-20211010003414236.png)

> if-else使用说明

- 条件表达式必须是布尔表达式（关系表达式或逻辑表达式）
- 布尔变量  语句块只有一条执行语句时，一对{}可以省略，但建议保留 
- if-else语句结构，根据需要可以嵌套使用 
-  当if-else结构是“多选一”时，最后的else是可选的，根据需要可以省略 
-  当多个条件是“互斥”关系时，条件判断语句及执行语句间顺序无所谓 当多个条件是“包含”关系时，“小上大下 / 子上父下”

```java
/*
分支结构之一 : if-else (条件判断结构)

一 三 种结构

1.
if (条件表达式) {
    执行表达式
}

2. 二选一
if (条件表达式) {
    执行表达式1
} else {
    执行表达式2
}

3. 多选一
if (条件表达式1) {
    执行表达式1
} else if (条件表达式2){
    执行表达式2
} else if (条件表达式3){
    执行表达式3
} else if (条件表达式4){
    执行表达式4
}
 ...
 else {
    执行表达式n
}

说明 : 
1. else 结构是可选的
2. 针对于条件表达式 :
	如果多个条件表达式之间是 "互斥" 关系 (没有交集的关系), 判断语句和执行语句的顺序无所谓
	如果多个条件表达式之间有交集的关系, 判断语句和执行语句的顺序需要根据实际情况考虑
	如果多个条件表达式之前有包含的关系, 通常关系下, 需要将范围小的写在范围大的上面
3. if-else 可以嵌套使用
4. 如果 if-else 结构中执行语句只有一句时,可以省略{} (不推荐)
 */
import java.util.Scanner;

class IfTest {
    public static void main(String[] args) {

        // 举例1
        int heartBeats = 179;

        if (heartBeats < 60 || heartBeats > 100) {
            System.out.println("寄了 !");
        }

        System.out.println("搞完了");

        // 举例2
        int age = -1900;
        if (age < 18) {
            System.out.println("只能关监狱");
        } else {
            System.out.println("可以判死刑了");
        }

        // 举例3
        if (age < 0) {
            System.out.println("还没生,遭啥急呢~");
        } else if (age > 150 && age <1000) {
            System.out.println("宁搁这儿修仙呢~");
        } else if (age >= 1000){
            System.out.println("宁好,王八~");
        } else {
            System.out.println("还搁这儿看呢,快去卷~");
        }
        
        // 练习
        Scanner sc = new Scanner(System.in);
        
        int score = sc.nextInt();

        if (score < 60 ) {
            System.out.println("r");
        } else if (score < 80) {
            System.out.println("q");
        } else if (score < 100) {
            System.out.println("w");
        } else {
            System.out.println("e");
        }

        sc.close();

    }
}
```



练习

```java
class IfExer {
    public static void main(String[] args) {

        int num = (int)(Math.random() * 90 + 10);

        int shiNum = num % 10;
        int geNum = num / 10 % 10;

        Scanner sc = new Scanner(System.in);

        int i = sc.nextInt();

        int shiI = i % 10;
        int geI = i / 10 % 10;

        if (geI == geNum && shiI == shiNum) {
            System.out.println(10000);
        } else if (geI == shiNum && shiI == geNum) {
            System.out.println(3000);
        } else if (geI == geNum || shiI == shiNum) {
            System.out.println(1000);
        } else if (geI == shiNum || shiI == geNum) {
            System.out.println(500);
        } else {
            System.out.println(0);
        }

    }
}
```

```java
/*
大家都知道，男大当婚，女大当嫁。那么女方家长要嫁女儿，当然要提出
一定的条件：高：180cm以上；富：财富1千万以上；帅：是。
 如果这三个条件同时满足，则：“我一定要嫁给他!!!”
 如果三个条件有为真的情况，则：“嫁吧，比上不足，比下有余。”
 如果三个条件都不满足，则：“不嫁！
 */
class IfExer2 {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("请输入身高 : (cm)");
        int height = sc.nextInt();

        System.out.println("请输入你的钱钱 : (k)");
        double wealth = sc.nextDouble();

        // System.out.println("请输入你是否帅 : (true/false)");
        // boolean isHandsome = sc.nextBoolean();

        System.out.println("请输入你是否帅 : (是/否)");
        String isHandsome = sc.next();

        if (height >= 180 && wealth >= 10000 && isHandsome.equals("是")) {
            System.out.println(1);
        } else if (height >= 180 || wealth >= 10000 || isHandsome.equals("是")) {
            System.out.println(2);
        } else {
            System.out.println(3);
        }

        sc.close();
    }
}
```



##### switch-case

```java
/*
分支结构之二 : switch-case

1. 格式 :
    switch (表达式) {
        case 常量1 :
            执行语句1;
            break;
        case 常量2 :
            执行语句2;
            break;
        case 常量3 :
            执行语句3;
            break;
        ...
        default :
            执行语句n;
            break;
    }

2. 说明 :
    1. 根据 switch 表达式中的值, 依次匹配各个 case 中的常量, 一旦匹配成功, 则进入相应 case 结构中, 调用其执行语句,
    当调用完执行语句之后, 仍然向下执行其他 case 结构中的执行语句, 直到遇到 break 关键字 或 此 switch-case 结构执行完成为止
    2. break, 可以使用在 switch-case 结构中, 一旦遇到 break 关键字, 则会停止执行该结构
    3. switch 结构中的表达式, 只能是如下的六种数据类型之一 : byte, short, char, int, 枚举类型(5.0新增), String(7.0新增)
    4. case 之后只能声明常量, 不能声明变量或表达式或范围
    5. break 关键字可有可无
    6. default 相当于 if-else 中的 else (备胎), 可以是可有可无的
 */
class SwitchCaseTest {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int num = sc.nextInt();

        switch (num) {
            case 0 :
                System.out.println(0);
                break;
            case 1 :
                System.out.println(1);
                break;
            case 2 :
                System.out.println(2);
                break;
            case 3 :
                System.out.println(3);
                break;
            case 4 :
                System.out.println(4);
                break;
            case 5 :
                System.out.println(5);
                break;
            default:
                System.out.println("输入格式错误~");
        }

        String season = sc.next();
        switch (season) {
            case "spring":
                System.out.println("春暖花开");
                break;
            case "summer":
                System.out.println("夏日炎炎");
                break;
            case "autumn":
                System.out.println("秋高气爽");
                break;
            case "winter":
                System.out.println("冬雪皑皑");
                break;
            default:
                System.out.println("季节输入有误");
                break;
        }
    }
}
```



练习

```java 
class SwitchExer {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("请输入年 : ");
        int year = sc.nextInt();
        System.out.println("请输入月 : ");
        int mouth = sc.nextInt();
        System.out.println("请输入日 : ");
        int day = sc.nextInt();

        int[] mouthDay = new int[]{31,28,31,30,31,30,31,31,30,31,30,31};
        int sumDays = 0;


        if (year % 4 == 0 && year % 100 != 0) {
            mouthDay[1] = 29;
        } else if (year % 100 == 0 && year % 400 != 0) {
            mouthDay[1] = 29;
        }

        switch (mouth) {
            case 12 : sumDays += mouthDay[10];
            case 11 : sumDays += mouthDay[9];
            case 10 : sumDays += mouthDay[8];
            case 9 : sumDays += mouthDay[7];
            case 8 : sumDays += mouthDay[6];
            case 7 : sumDays += mouthDay[5];
            case 6 : sumDays += mouthDay[4];
            case 5 : sumDays += mouthDay[3];
            case 4 : sumDays += mouthDay[2];
            case 3 : sumDays += mouthDay[1];
            case 2 : sumDays += mouthDay[0];
            case 1 : sumDays += day; break;
            default:
                System.out.println("输入错误");
        }

        System.out.println(sumDays);
    }
}
```



> switch-case 和 if-else 选择

- 凡是可以用 switch-case 结构的, 都可以用 if-else, 反之不行
- 两者都可以用的话, 优先使用 switch-case (效率较高)

#### Scanner(从键盘中输入)

```java
/*
如何从键盘获取不同类型的变量：需要使用Scanner类

具体实现步骤：
1.导包：import java.util.Scanner;
2.Scanner的实例化:Scanner scan = new Scanner(System.in);
3.调用Scanner类的相关方法（next() / nextXxx()），来获取指定类型的变量

注意：
需要根据相应的方法，来输入指定类型的值。如果输入的数据类型与要求的类型不匹配时，会报异常：InputMisMatchException
导致程序终止。
*/
//1.导包：import java.util.Scanner;
import java.util.Scanner;

class ScannerTest{
	
	public static void main(String[] args){
		//2.Scanner的实例化
		Scanner scan = new Scanner(System.in);
		
		//3.调用Scanner类的相关方法
		System.out.println("请输入你的姓名：");
		String name = scan.next();
		System.out.println(name);

		System.out.println("请输入你的芳龄：");
		int age = scan.nextInt();
		System.out.println(age);

		System.out.println("请输入你的体重：");
		double weight = scan.nextDouble();
		System.out.println(weight);

		System.out.println("你是否相中我了呢？(true/false)");
		boolean isLove = scan.nextBoolean();
		System.out.println(isLove);

		//对于char型的获取，Scanner没有提供相关的方法。只能获取一个字符串
		System.out.println("请输入你的性别：(男/女)");
		String gender = scan.next();//"男"
		char genderChar = gender.charAt(0);//获取索引为0位置上的字符
		System.out.println(genderChar);
		

	}

}
```



#### 循环结构

根据循环条件，重复性的执行某段代码

- for
- while
- do-while

![image-20211010150251245](/assets/imgs/JavaSE.assets/image-20211010150251245.png)

##### for 循环

```java
/*
for 循环结构的使用
1. 循环结构的 4 个要素
    1. 初始化条件
    2. 循环条件 (布尔类型的表达式)
    3. 循环体
    4. 迭代条件

2. for 循环的结构
    for (1; 2; 4) {
        3
    }

    执行过程 : 1 -> 2 -> 3 -> 4 -> 2 -> 3 -> 4 .... -> 2 结束
 */
public class ForTest {
    public static void main(String[] args) {

        // 初识
        for (int i = 3; i >= 0; i--) {
            System.out.println("我是菜鸡");
        }


        // 遍历 100 以内的偶数及 偶数之和 偶数个数
        int sum = 0;
        int count = 0;
        for (int i = 1; i <= 100; i++) {
            if (i % 2 == 0) {
                System.out.println(i);
                sum += i;
                count++;
            }
        }
        System.out.println("sum = " + sum);
        System.out.println("count = " + count);


        // 编写程序从1循环到150，并在每行打印一个值，
        // 另外在每个3的倍数行上打印出“foo”
        // 在每个5的倍数行上打印“biz”
        // 在每个7的倍数行上打印输出“baz”
        for (int i = 1; i <= 150; i++) {
            System.out.print(i);
            if (i % 3 == 0) {
                System.out.print(" foo");
            }
            if (i % 5 == 0) {
                System.out.print(" biz");
            }
            if (i % 7 == 0) {
                System.out.print(" baz");
            }
            System.out.println();
        }
    }
}
```



练习

```java
class ForExer {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("请输入 m : ");
        int m = sc.nextInt();

        System.out.println("请输入 n : ");
        int n = sc.nextInt();

        // Math.min(a, b) 获取 a b 中较小的值
        for (int i = Math.min(m, n); i >= 1 ; i--) {

            if (m % i == 0 && n % i == 0) {
                System.out.println(i);
                break;
            }
        }

        // Math.min(a, b) 获取 a b 中较大的值
        for (int i = Math.max(m, n);  ; i++) {

            if (i % m == 0 && i % n == 0) {
                System.out.println(i);
                break;
            }
        }
    }
}
```

```java
// 水仙花
class ForExer2 {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("请输入 num : ");
        int num = sc.nextInt();
        int num1 = num;

        int[] wei = new int[3];

        for (int i = 2; num1 % 10 >= 1; num1 /= 10, i--) {
            wei[i] = num1 % 10;
        }

        int rs = (wei[0] * wei[0] * wei[0]) + (wei[1] * wei[1] * wei[1]) + (wei[2] * wei[2] * wei[2]);
        System.out.println(rs);

        if (rs == num) {
            System.out.println("yes!");
        }
    }
}
```



##### while 循环

```java
/*
while 循环的使用

1. 循环结构的 4 个要素
    1. 初始化条件
    2. 循环条件 (布尔类型的表达式)
    3. 循环体
    4. 迭代条件

2. while 循环的结构

    1;
    while (2) {
        3;
        4;
    }

    执行过程 : 1 -> 2 -> 3 -> 4 -> 2 -> 3 -> 4 .... -> 2 结束

说明 :
1. 写 while 循环需要小心不要丢了迭代条件, 不然可能导致死循环
2. 写程序, 需要避免出现死循环
3. while 循环和 for 循环是可以相互转换的
    区别 : while 和 for 的初始化条件作用范围不一样

 */
class WhileTest {

    public static void main(String[] args) {

        int i = 1;
        while (i <= 100) {

            if (i % 2 == 0) {
                System.out.println(i);
            }

            i++;
        }
        System.out.println(i);
    }
}
```



##### do-while 循环

```java
/*
do-while 循环的使用

1. 循环结构的 4 个要素
    1. 初始化条件
    2. 循环条件 (布尔类型的表达式)
    3. 循环体
    4. 迭代条件

2. while 循环的结构

    1
    do {
        3;
        4;
    } while (2);

    执行过程 : 1 -> 3 -> 4 -> 2 -> 3 -> 4 -> 2 .... -> 2 结束

说明 :
1. do-while 循环至少会执行一次循环体
2. 开发中更多使用 for 和 while


 */
class DoWhileTest {

    public static void main(String[] args) {

        int num = 1;
        int count = 0;
        int sum = 0;

        do {
            if (num % 2 ==0 ) {
                System.out.println(num);
                sum += num;
                count++;
            }

            num++;
        } while (num <= 100);

        System.out.println("count = " + count);
        System.out.println("sum = " + sum);




        int number = 10;
        while (number > 10) {
            System.out.println("hello1");
            number--;
        }

        int number2 = 10;
        do {
            System.out.println("hello2");
            number2--;

        } while (number2 > 10);

    }
}
```



##### 练习

```java
/*
题目：
从键盘读入个数不确定的整数，并判断读入的正数和负数的个数，输入为0时结束程序。

说明：
1. 不在循环条件部分限制次数的结构：for(;;) 或 while(true)
2. 结束循环有几种方式？
     方式一：循环条件部分返回false
	 方式二：在循环体中，执行break
*/
package com.yixihan;

import java.util.Scanner;

public class LoopTest {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int positiveNumberCount = 0;
        int negativeNumberCount = 0;

        for ( ; ; ) {
            int num = sc.nextInt();

            if (num > 0) {
                positiveNumberCount++;
            } else if (num < 0) {
                negativeNumberCount++;
            } else {
                break;
            }
        }

        System.out.println("正数有 : " + positiveNumberCount + " 个");
        System.out.println("负数有 : " + negativeNumberCount + " 个");

        positiveNumberCount = negativeNumberCount = 0;

        while (true) {
            int num = sc.nextInt();

            if (num > 0) {
                positiveNumberCount++;
            } else if (num < 0) {
                negativeNumberCount++;
            } else {
                break;
            }
        }

        System.out.println("正数有 : " + positiveNumberCount + " 个");
        System.out.println("负数有 : " + negativeNumberCount + " 个");


    }
}
```



```java
/*
嵌套循环的使用
1. 将一个循环结构 A 声明在另一个循环结构 B 中,就构成一个嵌套循环

2.
    外层循环 : 循环结构 B
    内层循环 : 循环结构 A

3. 说明:
    1. 内层循环结构遍历一遍 只相当于 外层循环结构遍历一次
    2. 外层循环需要执行 n 次, 内层循环需要执行 m 次, 则总循环完, 内层循环执行 m * n次, 外层循环执行 n 次
 */
class nestedLoopTest {

    public static void main(String[] args) {

        // 输出 : * x 5

        for(int i = 0; i < 5; i++) {
            System.out.print("*");
        }
        System.out.println();

        // 输出 : * x 5 x 5
        /*
         *****
         *****
         *****
         *****
         *****
         */
        for(int i = 0; i < 5; i++) {
            for(int j = 0; j < 5; j++) {
                System.out.print("*");
            }
            System.out.println();
        }

        /*
         *
         **
         ***
         ****
         *****
         */
        for(int i = 0; i <= 6; i++) {
            for(int j = 0; j < i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }

        /*
         ******
         *****
         ****
         ***
         **
         *
         */
        for(int i = 6; i >= 0; i--) {
            for(int j = 0; j < i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }

        /*
            * 
           * *
          * * *
         * * * *
        * * * * *
         * * * *
          * * *
           * *
            *
         */
        for (int i = 0; i <= 8; i++) {
            if (i <= 4) {
                int j = 4 - i;
                for (int k = j; k > 0; k--) {
                    System.out.print(" ");
                }
                for (; j <= 4 + i; j++) {
                    if ((i % 2 == 0 && j % 2 == 0) || (i % 2 != 0 && j % 2 != 0)) {
                        System.out.print("* ");
                    }
                }
            } else {
                int j = i - 4;
                for (int k = 0; k < j; k++) {
                    System.out.print(" ");
                }
                for (j = i - 4; j <= 4; j++) {
                    if (i % 2 != 0) {
                        System.out.print("* ");
                    } else if (j == i - 4){
                        System.out.print("*");
                    } else {
                        System.out.print(" *");
                    }
                }
            }
            System.out.println();
        }

    }
}
```



```java
/*
九九乘法表

 */
class NineNineTable {
    public static void main(String[] args) {

        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(i + " * " + j + " = " + (i * j));

                if (j != i) {
                    System.out.print("   ");
                }
            }
            System.out.println();
        }

    }
}
```



```java
/*
100 以内所有的质数

质数 : 只能被 1 和他本身整除的自然数

包括优化方式
 */
class PrimeNumberTest2 {
    public static void main(String[] args) {

        long start = System.currentTimeMillis();
        int count = 0;

        for (int i = 2; i <= 100000; i++) {
            int j = 2;
            while (j <= Math.sqrt(i)){ // 优化1
                if (i % j == 0) {
                    break; // 优化2
                }
                j++;
            }
            if (j == Math.sqrt(i)) {
                count++; // 优化3
            }
        }

        long end = System.currentTimeMillis();

        System.out.println("count = " + count);
        System.out.println("end - start = " + (end - start)); //   不加 break : 4059       加 break : 1994       加 Math.sqrt(i) 30    删掉输出  24
        System.out.println("start = " + start);
        System.out.println("end = " + end);
    }
}

/*
方式2
*/
class PrimeNumberTest3 {
    public static void main(String[] args) {

        long start = System.currentTimeMillis();
        int count = 0;

        label : for (int i = 2; i <= 100000; i++) {
            int j = 2;
            while (j <= Math.sqrt(i)){
                if (i % j == 0) {
                    continue label;
                }
                j++;
            }
            count++;
        }

        long end = System.currentTimeMillis();

        System.out.println("count = " + count);//  9592   664579
        System.out.println("end - start = " + (end - start)); //   23   664579
        System.out.println("start = " + start);
        System.out.println("end = " + end);
    }
}
```



##### continue 与 break

```java
/*
break和continue关键字的使用
            使用范围         循环中使用的作用(不同点)     相同点
break:       switch-case
            循环结构中        结束当前循环             关键字后面不能声明执行语句

continue:     循环结构中        结束当次循环             关键字后面不能声明执行语句



*/
class BreakContinueTest {
    public static void main(String[] args) {

        for (int i = 1; i < 10; i++) {
            if (i % 4 == 0) {
                break;
            }
            System.out.print(i);
        }

        System.out.println();

        for (int i = 1; i < 10; i++) {
            if (i % 4 == 0) {
                continue;
            }
            System.out.print(i);
        }
        
        label:for(int i = 1;i <= 4;i++){
		
			for(int j = 1;j <= 10;j++){
				
				if(j % 4 == 0){
					//break;//默认跳出包裹此关键字最近的一层循环。
					//continue;

					//break label;//结束指定标识的一层循环结构
					continue label;//结束指定标识的一层循环结构当次循环
				}
				
				System.out.print(j);
			}
			
			System.out.println();
		}
    }
}
```



### 数组

> 概述

![image-20211010195246367](/assets/imgs/JavaSE.assets/image-20211010195246367.png)

#### 一维数组

```java
package com.yixihan.array;

/*
1. 数组的概述
    数组(Array), 是多个相同类型数据按一定顺序排列的集合, 并使用一个名字命名, 并通过编号的方式对这些数据进行统一管理

2. 数组的相关概念
    数组名
    下标 (索引) 从 0 开始
    元素
    数组的长度


3. 数组的特点
    1. 数组是有序排列的
    2. 数组本身是引用数据类型, 但是数组中的元素可以是任何数据类型, 包括基本数据类型和引用数据类型
    3. 创建数组对象会在内存中开辟一整块连续的空间, 而数组名中引用的是这块连续空间的首地址
    4. 数组的长度一旦确定, 就不能修改
    5. 我们可以直接通过下标(或索引)的方式调用指定位置的元素, 速度很快

4. 数组的分类
    1. 按照维数分类 : 一维数组 二维数组(多维数组) ...
    2. 按照元素的数据类型 :  基本数据类型元素的数组 引用数据类型元素的数组

5. 一维数组的使用
    1. 一维数组的声明和初始化
    2. 如何调用数组的指定位置的元素
    3. 如何获取数组的长度
    4. 如何遍历数组
    5. 数组元素的默认初始化值
        > 数组元素是整型 : 默认赋值 0
        > 数组元素是浮点型 : 默认赋值 0.0
        > 数组元素是 char 型 : 默认赋值 0 不是 '0'
        > 数组元素是 boolean 型 : 默认赋值 false
        > 数组元素是 引用数据类型 : 默认赋值 null
    6. 数组的内存解析
 */
public class ArrayTest {

    public static void main(String[] args) {

        // 1.1 静态初始化 : 数组的初始化和数组元素的赋值操作同时进行
        int[] ids = new int[]{1001,1002,1003,1004};

        // 1.2 动态初始化 : 数组的初始化和数组元素的赋值操作分开进行
        String[] names = new String[5];

        // 错误的写法 :
        // int[] arr1 = new int[];
        // int[5] arr2 = new int[5];
        // int[] arr3 = new int[3]{1,2,3};
        
        // 也是正确的写法
        int[] arr4 = {1,2,3,4,5}; // 类型推断

        // 总结 : 数组一旦初始化完成，其长度就确定了

        // 2. 调用数组指定位置的元素 : 通过下标调用
        // 数组的角标（或索引）从 0 开始的, 到数组的长度 -1 结束。
        names[0] = "张三";
        names[1] = "李四";
        names[2] = "王麻子";
        names[3] = "彤彤";
        names[4] = "思思";

        // 3. 获取数组的长度 .length
        System.out.println(names.length);

        // 4. 遍历数组元素
        for (int id : ids) {
            System.out.println(id);
        }
        for (String name : names) {
            System.out.println(name);
        }

        // 5. 数组元素的默认初始化值
        int[] arrInt = new int[4];
        for (int i : arrInt) {
            System.out.println(i);
        }

        double[] arrDouble = new double[4];
        for (double i : arrDouble) {
            System.out.println(i);
        }

        boolean[] arrBoolean = new boolean[4];
        for (boolean b : arrBoolean) {
            System.out.println(b);
        }

        char[] arrChar = new char[4];
        for (char c : arrChar) {
            System.out.println("--" + c + "==");
        }

        String[] arrString = new String[5];
        for (String s : arrString) {
            System.out.println(s);
        }

        // 6. 数组的内存解析
    }
}
```



6. 数组的内存解析

![image-20211010212501250](/assets/imgs/JavaSE.assets/image-20211010212501250.png)

![image-20211010212520828](/assets/imgs/JavaSE.assets/image-20211010212520828.png)

![image-20211010212529921](/assets/imgs/JavaSE.assets/image-20211010212529921.png)



练习

```java
package com.yixihan.array;

import java.util.Scanner;

public class ArrayExer {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        int i = scanner.nextInt();

        if (i == 1) {
            test1();
        } else if (i == 2) {
            test2();
        }
    }

    public static void test1 () {
        int[] arr = new int[]{8,2,1,0,3};
        int[] index = new int[]{2,0,3,2,4,0,1,3,2,3,3};
        StringBuilder tel = new StringBuilder();
        for (int j : index) {
            tel.append(arr[j]);
        }
        System.out.println("联系方式：" + tel); // 18013820100
    }

    public static void test2 () {
        Scanner sc = new Scanner(System.in);

        System.out.println("請輸入學生人數 :");
        int num = sc.nextInt();

        System.out.println("請輸入 " + num + "個學生的成績 : ");

        int[] scores = new int[num];
        int max = 0;

        for (int i = 0; i < scores.length; i++) {
            scores[i] = sc.nextInt();
            if (scores[i] > max) {
                max = scores[i];
            }
        }

        for (int i = 0; i < scores.length; i++) {
            if (max - scores[i] <= 10) {
                System.out.println("student " + i + " score is " + scores[i] + " grade is A");
            } else if (max - scores[i] <= 20) {
                System.out.println("student " + i + " score is " + scores[i] + " grade is B");
            } else if (max - scores[i] <= 30) {
                System.out.println("student " + i + " score is " + scores[i] + " grade is C");
            } else {
                System.out.println("student " + i + " score is " + scores[i] + " grade is D");
            }
        }

    }
}
```



#### 二维数组

![image-20211010205938689](/assets/imgs/JavaSE.assets/image-20211010205938689.png)

```java
package com.yixihan.array;

/*
二维数组的使用

1. 理解 :
    对于二维数组的理解，我们可以看成是一维数组array1又作为另一个一维数组array2的元素而存在。
    其实，从数组底层的运行机制来看，其实没有多维数组。

2. 二维数组的使用:
    1. 二维数组的声明和初始化
    2. 如何调用数组的指定位置的元素
    3. 如何获取数组的长度
    4. 如何遍历数组
    5. 数组元素的默认初始化值
        针对初始化方式1 : ps : String[][] arr2 = new String[3][4];
        外层元素的初始化值 : 地址值
        内层元素的初始化值 : 与一维数组的初始化值相同

        针对初始化方式2 : ps : String[][] arr3 = new String[3][];
        外层元素的初始化值为 : null
        内层元素的初始化值为 : 不能调用, 否则报错
    6. 数组的内存解析

3. 规定
    二维数组分为外层数组的元素，内层数组的元素
       int[][] arr = new int[4][3];
       外层元素：arr[0],arr[1]等
      内层元素：arr[0][0],arr[1][2]等
 */
public class ArrayTest2 {
    public static void main(String[] args) {

        // 1.1 二维数组的 静态初始化
        int[][] arr1 = new int[][]{{1,2,3},{4,5},{6,7,8,9}};

        // 1.2 二维数组的 动态初始化1
        String[][] arr2 = new String[3][4];

        // 二维数组的 动态初始化2
        String[][] arr3 = new String[3][];

        // 错误的情况
        // String[][] arr4 = new String[][4];
        // String[4][3] arr5 = new String[][];
        // int[][] arr6 = new int[4][3]{{1,2,3},{4,5},{6,7,8}};

        //也是正确的写法：
        int[] arr4[] = new int[][]{{1,2,3},{4,5,9,10},{6,7,8}}; // 不推荐
        int arr5[][] = {{1,2,3},{4,5},{6,7,8}}; // 不推荐


        // 2. 如何调用数组的指定位置的元素
        System.out.println(arr1[0][1]); // 2
        System.out.println(arr2[2][2]); // null
        arr3[1] = new String[4]; // 解决报错问题
        System.out.println(arr3[1][0]); // 报错 NullPointerException
        System.out.println(arr4[1]); // arr4[1] 数组的内存位置

        // 3. 获取数组的长度
        System.out.println(arr4.length); // 3

        // 4. 遍历数据
        for (int i = 0; i < arr5.length; i++) {
            for (int j = 0; j < arr5[i].length; j++) {
                System.out.print(arr5[i][j]);

                if (j < arr5[i].length - 1) {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }

        // 5. 数组元素的默认初始化值
        int[][] arr6 = new int[4][3];
        System.out.println(arr6); // arr6 数组的 内存地址   [[I@4554617c
        System.out.println(arr6[0]); // arr6[0] 数组的 内存地址  [I@74a14482
        System.out.println(arr6[0][0]); // 0


        double[][] arr7 = new double[4][3];
        System.out.println(arr7); // arr7 数组的 内存地址   [[D@1540e19d
        System.out.println(arr7[0]); // arr7[0] 数组的 内存地址  [D@677327b6
        System.out.println(arr7[0][0]); // 0.0

        String[][] arr8 = new String[4][3];
        System.out.println(arr8); // arr8 数组的 内存地址   [[Ljava.lang.String;@14ae5a5
        System.out.println(arr8[0]); // arr8[0] 数组的 内存地址  [Ljava.lang.String;@7f31245a
        System.out.println(arr8[0][0]); // null

        short[][] arr9 = new short[4][];
        System.out.println(arr9[1]); // null
        System.out.println(arr9[1][0]); // 报错 NullPointerException
    }
}
```



6. 二维数组的内存解析

![image-20211010212553331](/assets/imgs/JavaSE.assets/image-20211010212553331.png)

![image-20211010212602868](/assets/imgs/JavaSE.assets/image-20211010212602868.png)

![image-20211010212611266](/assets/imgs/JavaSE.assets/image-20211010212611266.png)

![image-20211010212618547](/assets/imgs/JavaSE.assets/image-20211010212618547.png)



练习

```java
package com.yixihan.array;

import java.util.Scanner;

/**
 * @author yixihan
 */
public class ArrayExer2 {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);


        lab : while (true) {

            System.out.println("请输入测试方法的序号 : ");
            int i = sc.nextInt();

            switch (i) {
                case 0 :
                    break lab;
                case 1 :
                    test1(); break;
                case 2 :
                    test2(); break;
                default:
                    System.out.println("输入错误,请重新输入");


            }
        }
    }

    public static void test1 () {

        int[][] arr = new int[][]{{3,5,8},{12,9},{7,0,6,4}};

        int sum = 0;

        for (int[] ints : arr) {
            for (int anInt : ints) {
                sum += anInt;
            }
        }

        System.out.println(sum);
    }

    public static void test2 () {
        Scanner sc = new Scanner(System.in);

        System.out.println("请输入杨辉三角的行数 : ");
        int n = sc.nextInt();

        int[][] yanghui = new int[n][];

        for (int i = 0; i < n; i++) {

            yanghui[i] = new int[i + 1];

            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) {
                    yanghui[i][j] = 1;
                } else {
                    yanghui[i][j] = yanghui[i - 1][j - 1] + yanghui[i - 1][j];
                }
            }
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= i; j++) {
                System.out.print(yanghui[i][j] + "\t");
            }
            System.out.println();
        }
    }
}
```



#### 数组中常用的算法

- 数组元素的赋值(杨辉三角、回形数等)
- 求数值型数组中元素的最大值、最小值、平均数、总和等
- 数组的复制、反转、查找(线性查找、二分法查找)
- 数组元素的排序算法



练习

```java
/*************************************赋值*************************************************/

/**
 * 造一个杨辉三角
 */
public static void test2 () {
        Scanner sc = new Scanner(System.in);

        System.out.println("请输入杨辉三角的行数 : ");
        int n = sc.nextInt();

        int[][] yanghui = new int[n][];

        for (int i = 0; i < n; i++) {

            yanghui[i] = new int[i + 1];

            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) {
                    yanghui[i][j] = 1;
                } else {
                    yanghui[i][j] = yanghui[i - 1][j - 1] + yanghui[i - 1][j];
                }
            }
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= i; j++) {
                System.out.print(yanghui[i][j] + "\t");
            }
            System.out.println();
        }
    }
}

/**
 * 造一个这样的数组<br>
 * 随机数生成 (1-30) 不重复<br>
 */
public static void test3 () {

    System.out.println("请输入数组的长度 : ");
    int n = sc.nextInt();

    int[] arr = new int[n];

    for (int i = 0; i < arr.length; i++) {
        if (i > 0) {
            do {
                arr[i] = (int) (Math.random() * 30) + 1;
            } while (! compare(arr[i], arr, i));
        } else {
            arr[i] = (int) (Math.random() * 30) + 1;
        }
    }

    for (int i : arr) {
        System.out.print(i + " ");
    }
    System.out.println();
}

/**
 * 造一个这样的数组<br>
 * n = 5<br>
 * 1  2  3  4  5<br>
 * 16 17 18 19 6<br>
 * 15 24 25 20 7<br>
 * 14 23 22 21 8<br>
 * 13 12 11 10 9<br>
 */
public static void test4 () {
    System.out.println("请输入二维数组的行数 : ");
    int n = sc.nextInt();

    int[][] arr = new int[n][n];

    int count = 0;
    int minX = 0;
    int minY = 0;
    int maxX = n - 1;
    int maxY = n - 1;

    while (minX <= maxX) {

        for (int x = minX; x <= maxX; x++) {
            arr[minY][x] = ++count;
        }

        minY++;

        for (int y = minY; y <= maxY; y++) {
            arr[y][maxX] = ++count;
        }

        maxX--;

        for (int x = maxX; x >= minX; x--) {
            arr[maxY][x] = ++count;
        }

        maxY--;

        for (int y = maxY; y >= minY; y--) {
            arr[y][minX] = ++count;
        }

        minX++;

    }

    for (int[] ints : arr) {
        for (int anInt : ints) {
            System.out.print(anInt + "\t\t");
        }
        System.out.println();
    }
}

/*********************************************求xx值********************************************/

/**
 * 随机生成一个数组 (10-99)<br>
 * 求 最大值  最小值  总和  平均数
 */
public static void test5 () {

    System.out.println("请输入数组的长度 : ");
    int n = sc.nextInt();

    int[] arr = new int[n];

    for (int i = 0; i < n; i++) {
        arr[i] = (int) (Math.random() * 90) + 10;
    }

    int max = arr[0];
    int min = arr[0];
    int count = 0;
    double average;

    for (int j : arr) {
        System.out.print(j + "\t");
        if (max < j) {
            max = j;
        }
        if (min > j) {
            min = j;
        }
        count += j;
    }
    System.out.println();

    average = (double) count / n;

    System.out.println("最大值 : " + max);
    System.out.println("最小数 : " + min);
    System.out.println("总和 : " + count);
    System.out.println("平均值 : " + average);


}

/******************************************数组赋值、反转、查找*****************************************************/

/**
 * 数组赋值 ×
 * arr1 和 arr2 的地址值相同, 都指向了唯一的一个数组
 */
public static void test6 () {

    int[] arr1, arr2;
    arr1 = new int[]{2,2,3,7,11,13,17,19};

    for (int j : arr1) {
        System.out.print(j + "\t");
    }
    System.out.println();

    // 这里只能算是将 arr1 的地址给了 arr2  堆里面还是只有一个数组, arr1 arr2都指向了这个数组
    arr2 = arr1;

    for (int i = 0; i < arr2.length; i++) {
        if (i % 2 == 0) {
            arr2[i] = i;
        }
    }

    for (int j : arr1) {
        System.out.print(j + "\t");
    }
    System.out.println();
}

/**
 * 数组赋值 √
 * arr1 和 arr2 的地址值相同, 都指向了唯一的一个数组
 */
public static void test7 () {

    int[] arr1, arr2;
    arr1 = new int[]{2,2,3,7,11,13,17,19};


    for (int j : arr1) {
        System.out.print(j + "\t");
    }
    System.out.println();

    // 真正的数组赋值
    arr2 = new int[arr1.length];

    for (int i = 0; i < arr2.length; i++) {
        arr2[i] = arr1[i];
    }

    for (int i = 0; i < arr2.length; i++) {
        if (i % 2 == 0) {
            arr2[i] = i;
        }
    }

    for (int j : arr2) {
        System.out.print(j + "\t");
    }
    System.out.println();

    for (int j : arr1) {
        System.out.print(j + "\t");
    }
    System.out.println();
}

/**
 * 数组赋值,反转,查找
 */
public static void test8 () {
    String[] arr1 = {"张三", "李四", "王麻子", "思思", "彤彤", "曾曾", "假假"};

    String[] arr2 = new String[arr1.length];

    // 复制
    for (int i = 0; i < arr2.length; i++) {
        arr2[i] = arr1[i];
    }

    // 遍历
    for (String s : arr2) {
        System.out.print(s + " ");
    }
    System.out.println();

    // 反转 操作1
    for (int i = 0; i < arr2.length / 2; i++) {
        String temp = arr2[i];
        arr2[i] = arr2[arr2.length - 1 - i];
        arr2[arr2.length - 1 - i] = temp;
    }

    // 遍历
    for (String s : arr2) {
        System.out.print(s + " ");
    }
    System.out.println();

    // 反转 操作2
    for (int i = 0, j = arr2.length - 1; i < j; i++, j--) {
        String temp = arr2[i];
        arr2[i] = arr2[j];
        arr2[j] = temp;
    }

    // 遍历
    for (String s : arr2) {
        System.out.print(s + " ");
    }
    System.out.println();

}

/**************************************************查找***************************************************/
/**
 * 查找 线性
 */
public static void test9 () {
    String[] arr1 = {"张三", "李四", "王麻子", "思思", "彤彤", "曾曾", "假假"};

    // 查找 线性
    System.out.println("要找啥呢 : ");
    String dest = sc.next();
    boolean isQuery = false;
    for (int i = 0; i < arr1.length; i++) {
        if (dest.equals(arr1[i])) {
            isQuery = true;
            System.out.println("找到了指定的元素, 位置在 : " + i );
            break;
        }
    }

    if (! isQuery) {
        System.out.println("没找到哦~");
    }
}

/**
 * 查找 二分法 (折半查找)   比线性查找 快
 * 前提 : 所要查找的数组必须有序
 */
public static void test10 () {
    // 查找 二分法
    int[] arr2 = new int[] {-98,-84,-48,-42,-24,-14,-8,0,12,41,58,96,123};

    // 要查找的数
    System.out.println("要找啥呢 : ");
    int dest = sc.nextInt();

    // 初始的首索引
    int head = 0;

    // 初始的末索引
    int end = arr2.length - 1;

    //
    boolean isFlag = false;


    while (head <= end) {

        int middle = (head + end) / 2;

        if (arr2[middle] == dest) {
            System.out.println("找到了指定的元素, 位置在 : " + middle );
            isFlag = true;
            break;
        } else if (arr2[middle] > dest) {
            end = middle - 1;
        } else {
            head = middle + 1;
        }
    }

    if (! isFlag) {
        System.out.println("没找到哦~");
    }
}


```

##### 排序

1. 时间复杂度：分析关键字的比较次数和记录的移动次数 

2. 空间复杂度：分析排序算法中需要多少辅助内存

3. 稳定性：若两个记录A和B的关键字值相等，但排序后A、B的先后次序保 持不变，则称这种排序算法是稳定的。



> 排序算法分类：内部排序和外部排序

- 内部排序：整个排序过程不需要借助于外部存储器（如磁盘等），所有排 序操作都在内存中完成

- 外部排序：参与排序的数据非常多，数据量非常大，计算机无法把整个排 序过程放在内存中完成，必须借助于外部存储器（如磁盘）。

  外部排序最 常见的是多路归并排序。可以认为外部排序是由多次内部排序组成。

  

> 十大排序算法

- 选择排序
  - 直接选择排序
  - 堆排序
- 交换排序
  - 冒泡排序
  - 快速排序
- 插入排序
  - 直接插入排序
  - 折半插入排序
  - Shell排序
- 归并排序
- 桶式排序
- 基数排序



###### 冒泡排序

> 介绍

冒泡排序的原理非常简单，它重复地走访过要排序的数列，一次比较两个元 素，如果他们的顺序错误就把他们交换过来。



> 思想

1.  比较相邻的元素。如果第一个比第二个大（升序），就交换他们两个
2.  对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步 做完后，最后的元素会是最大的数
3.  针对所有的元素重复以上的步骤，除了最后一个
4.  持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要 比较为止



```java
package com.yixihan.array;

/**
 * @author yixihan
 */
public class BubbleSortTest {

    public static void main(String[] args) {

        int[] arr = new int[]{5,8,4,1,6,8,9,1,2,4,15,74,2,48,46,185,74,5,4187,1,3548,35,468,5,64,564,813,468,4635,354,835,4,6834,687,61,354,687,41,7486,34,687,351,746,354,687,35,47};

        // 冒泡排序
        // 输出
        for (int j : arr) {
            System.out.print(j + "\t");
        }
        System.out.println();

        // 排序 从小到大
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - i - 1; j++) {

                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                }
            }
        }

        // 输出
        for (int j : arr) {
            System.out.print(j + "\t");
        }
        System.out.println();


        // 排序 从大到小
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - i - 1; j++) {

                if (arr[j] < arr[j + 1]) {
                    int temp = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                }
            }
        }

        // 输出
        for (int j : arr) {
            System.out.print(j + "\t");
        }
        System.out.println();
    }
}

```



###### 快速排序

> 介绍

快速排序通常明显比同为O(nlogn)的其他算法更快，因此常被采用，而且快 排采用了分治法的思想，所以在很多笔试面试中能经常看到快排的影子。可 见掌握快排的重要性。

快速排序（Quick Sort）由图灵奖获得者Tony Hoare发明，被列为20世纪十 大算法之一，是迄今为止所有内排序算法中速度最快的一种。冒泡排序的升 级版，交换排序的一种。快速排序的时间复杂度为O(nlog(n))。



> 排序思想

1.  从数列中挑出一个元素，称为"基准"（pivot） 
2.  重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准 值大的摆在基准的后面（相同的数可以到任一边）。在这个分区结束之后， 该基准就处于数列的中间位置。这个称为分区（partition）操作
3.  递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数 列排序
4.  递归的最底部情形，是数列的大小是零或一，也就是永远都已经被排序好 了。虽然一直递归下去，但是这个算法总会结束，因为在每次的迭代 （iteration）中，它至少会把一个元素摆到它最后的位置去

![image-20211011213724201](/assets/imgs/JavaSE.assets/image-20211011213724201.png)



```java
package com.yixihan.array;

import java.util.Arrays;

/**
 * @author yixihan
 */
public class QuickSortTest {

    public static void main(String[] args) {

        int[] data = new int[]{5,8,4,1,6,8,9,1,2,4,15,73,2,48,46,185,74,5,4187,1,3548,35,468,5,64,564,813,468,4635,354,835,4,6834,687,61,354,687,41,7486,34,687,351,746,354,687,35,47};

        System.out.println("排序之前 : \n" + Arrays.toString(data));

        // 快速排序
        quickSort(data);

        System.out.println("排序之后 : \n" + Arrays.toString(data));

    }

    /**
     * 交换数组中两数的位置
     * @param data 数组
     * @param i 数字 1 的下标
     * @param j 数字 1 的下标
     */
    public static void swap (int[] data, int i, int j) {
        int temp = data[i];
        data[i] = data[j];
        data[j] = temp;
    }


    /**
     * 快速排序 核心代码结构
     * @param data 数组
     * @param start 最小下标
     * @param end 最大下标
     */
    public static void subSort (int[] data, int start, int end) {
        if (start < end) {
            int base = data[start];
            int low = start;
            int high = end + 1;

            while (true) {
                while (low < end && data[++low] - base <= 0) {

                }

                while (high > start && data[--high] - base >= 0) {

                }

                if (low < high) {
                    swap(data, low, high);
                } else {
                    break;
                }
            }

            swap(data, start, high);
 	subSort(data, start, high - 1);//递归调用
			subSort(data, high + 1, end);
        }
    }

    /**
     * 快速排序方法封装
     * @param data 数组
     */
    public static void quickSort (int[] data) {
        subSort(data, 0, data.length - 1);
    }


}

```



##### 各种内部排序方法性能比较

1.  从平均时间而言：快速排序最佳。但在最坏情况下时间性能不如堆排序和归 并排序
2.  从算法简单性看：由于直接选择排序、直接插入排序和冒泡排序的算法比较 简单，将其认为是简单算法。对于Shell排序、堆排序、快速排序和归并排序 算法，其算法比较复杂，认为是复杂排序
3.  从稳定性看：直接插入排序、冒泡排序和归并排序时稳定的；而直接选择排 序、快速排序、 Shell排序和堆排序是不稳定排序
4.  从待排序的记录数n的大小看，n较小时，宜采用简单排序；而n较大时宜采 用改进排序



##### 排序算法的选择

1.  若n较小(如n≤50)，可采用直接插入或直接选择排序
2.  若文件初始状态基本有序(指正序)，则应选用直接插入、冒泡或随机的快速排 序为宜
3.  若n较大，则应采用时间复杂度为O(nlgn)的排序方法：快速排序、堆排序或 归并排序



#### Arrays工具类



常用的 api

![image-20211011220317652](/assets/imgs/JavaSE.assets/image-20211011220317652.png)



```java
package com.yixihan.array;

import java.util.Arrays;

/**
 * java.util.Arrays : 操作数组的工具类, 里面定义了许多操作数组的方法
 *
 * @author yixihan
 */
public class ArraysTest {

    public static void main(String[] args) {

        // 1. boolean equals(int[] a,int[] b) 判断两个数组是否相等
        int[] arr1 = new int[]{1,2,3,4};
        int[] arr2 = new int[]{1,3,4,2};

        boolean isEquals = Arrays.equals(arr1, arr2);

        System.out.println(isEquals);


        // 2. String toString(int[] a) 输出数组信息
        System.out.println(Arrays.toString(arr1));
        System.out.println(Arrays.toString(arr2));


        // 3. void fill(int[] a,int val) 将指定值填充到数组中
        Arrays.fill(arr1, 5);
        System.out.println(Arrays.toString(arr1));

        Arrays.fill(arr1, 1, 3, 6);
        System.out.println(Arrays.toString(arr1));



        // 4. void sort(int[] a) 对数组进行排序
        Arrays.sort(arr2);
        System.out.println(Arrays.toString(arr2));


        // 5. int binarySearch(int[] a,int key) 对数组进行二分查找某个值 当返回数是负数是, 返回负数
        System.out.println(Arrays.binarySearch(arr2, 3));
    }

}

```



#### 数组使用中的常见异常

```java
package com.yixihan.array;

/**
 * 数组常见的异常 :
 * 1. 数组角标越界的异常 : ArrayIndexOutOfBoundsException
 *
 * 2. 空指针异常 : NullPointerException
 *
 * @author yixihan
 */
public class ArrayExceptionTest {

    public static void main(String[] args) {

        // 1. 角标越界
        int[] arr1 = new int[] {1,2,3,4,5,6,7,8,9};


        // for (int i = 0; i <= arr1.length; i++) {
        //    System.out.print(arr1[i] + " ");
        // }
        // System.out.println();
        //

        // System.out.println(arr1[-3]);


        // 2. 空指针异常
        // 情况 1
        int[] arr2 = new int[] {1,2,3};

        // arr2 = null;
        System.out.println(arr2[1]);


        // 情况 2
        int[][] arr3 = new int[4][];


        System.out.println(arr3[2]);
        // System.out.println(arr3[2][2]);

        // 情况 3
        String[] arr4 = {"AA", "BB", "CC"};
        System.out.println(arr4[0].toString());
        arr4[0] = null;
        // System.out.println(arr4[0].toString());
    }
}

```



## 面向对象



### 初识

#### 介绍

Java 面向对象学习的三条主线 : 

1.  Java类及类的成员   属性、方法、构造器; 代码块、内部类
2.  面向对象的三大特征   封装性、继承性、多态性
3.  其它关键字   this  super  static  final  abstract  interface  package  import  等



> 面向过程(POP) 与 面向对象(OOP)

- 二者都是一种思想，面向对象是相对于面向过程而言的。面向过程，强调的 是功能行为，以函数为最小单位，考虑怎么做。面向对象，将功能封装进对 象，强调具备了功能的对象，以类/对象为最小单位，考虑谁来做。
- 面向对象更加强调运用人类在日常的思维逻辑中采用的思想方法与原则，如 抽象、分类、继承、聚合、多态等。



> 面向对象的三大特征

- 封装 (Encapsulation)
- 继承 (Inheritance)
- 多态 (Polymorphism)

![image-20211013091228826](/assets/imgs/JavaSE.assets/image-20211013091228826.png)



> 面向对象的思想概述

- 程序员从面向过程的执行者转化成了面向对象的指挥者
- 面向对象分析方法分析问题的思路和步骤：
  - 根据问题需要，选择问题所针对的现实世界中的实体。
  - 从实体中寻找解决问题相关的属性和功能，这些属性和功能就形成了概念世界中的类。
  - 把抽象的实体用计算机语言进行描述，形成计算机世界中类的定义。即借助某种程序 语言，把类构造成计算机能够识别和处理的数据结构
  - 将类实例化成计算机世界中的对象。对象是计算机世界中解决问题的最终工具
- 类(Class)和对象(Object)是面向对象的核心概念。
  - 类是对一类事物的描述，是抽象的、概念上的定义
  - 对象是实际存在的该类事物的每个个体，因而也称为实例(instance)。
- “万事万物皆对象”
- 可以理解为：类 = 抽象概念的人；对象 = 实实在在的某个人
- 面向对象程序设计的重点是类的设计
- 类的设计，其实就是类的成员的设计



```java
package com.yixihan.day1013;

/**
 * 一. 设计类, 其实就是设计类的成员
 *
 *      属性 = 成员变量 = filed = 域、字段
 *      方法 = 成员方法 = 函数 = method
 *
 *      创建类的对象 = 类的实例化 = 实例化类
 *
 * 二. 类和对象的使用 (面向对象思路落地的实现) :
 *      1. 创建类, 设计类的成员
 *      2. 创建类的对象
 *      3. 通过 "对象.属性" 或 "对象.方法" 调用对象的结构
 *
 *
 * 三. 如果创建了一个类的多个对象, 则每个对象都独立的拥有一套类的属性 (非 static 的)
 *      意味着 : 如果我们修改对象 A 的某个属性, 不会影响对象 B 的对应属性
 *
 *
 * 对象的内存解析 :
 * @author yixihan
 */
public class PersonTest {
    public static void main(String[] args) {

        // 创建 person 类的对象
        Person person1 = new Person();


        // 调用对象的结构 : 属性 方法
        // 调用属性 : "对象.属性"
        person1.age = 18;
        person1.name = "易曦翰";
        person1.isMale = true;
        System.out.println(person1.name);


        // 调用方法 : "对象.方法"
        person1.eat();
        person1.sleep();
        person1.talk("Chinese");


        //************************************
        Person person2 = new Person();
        System.out.println(person2.name);
        System.out.println(person2.isMale);


        // 将 person1 对象保存的地址值赋给 person3, 导致 person1 和 person3 指向了堆空间的同一个对象实体
        Person person3 = person1;
        System.out.println(person3.name);

        person3.age = 16;
        System.out.println(person1.age);
    }
}


/**
 * 1. 创建类, 设计类的成员
 */

class Person{

    /**
     * 属性
     */
    String name;
    int age = 1;
    boolean isMale;

    /**
     * 方法
     */
    public void eat(){
        System.out.println("人可以吃饭");
    }

    public void sleep(){
        System.out.println("人可以睡觉");
    }

    public void talk(String language){
        System.out.println("人可以说话,使用的是：" + language);
    }

}
```



#### 对象的创建和使用 : 内存解析

![image-20211013131944314](/assets/imgs/JavaSE.assets/image-20211013131944314.png)

![image-20211013132002449](/assets/imgs/JavaSE.assets/image-20211013132002449.png)

![image-20211013132415816](/assets/imgs/JavaSE.assets/image-20211013132415816.png)

![image-20211013132436356](/assets/imgs/JavaSE.assets/image-20211013132436356.png)



#### 类中属性的使用



> 语法格式

修饰符 数据类型 属性名 = 初始化值;

- 说明1: 修饰符
  - 常用的权限修饰符有：private、缺省、protected、public
  - 其他修饰符：static、final 
- 说明2：数据类型
  - 任何基本数据类型(如int、Boolean) 或 任何引用数据类型
- 说明3：属性名
  - 属于标识符，符合命名规则和规范即可



> 变量的分类

* 在方法体外，类体内声明的变量称为成员变量
* 在方法体内部声明的变量称为局部变量



![image-20211013135155732](/assets/imgs/JavaSE.assets/image-20211013135155732.png)



##### 成员变量（属性）和局部变量的区别

![image-20211013135226907](/assets/imgs/JavaSE.assets/image-20211013135226907.png)



```java
package com.yixihan.day1013;

/**
 * 类中属性的使用
 *
 *
 * 属性 (成员变量) vs 局部变量
 *
 *
 * 1. 相同点 :
 *      1. 定义变量的格式都是一样的 : 数据类型 变量名 = 变量值
 *      2. 都是先声明, 后使用
 *      3. 都有其对应的作用域
 *
 *
 * 2. 不同点 :
 *      1. 在类中声明的位置不同 :
 *          属性 : 直接定义在类的一对 {} 中
 *          局部变量 : 声明在方法内 方法形参 代码块内 构造器形参 构造器内部的变量
 *
 *      2. 关于权限修饰符的不同 :
 *          属性 : 可以在声明属性时, 指明其权限, 使用权限修饰符
 *              常用的权限修饰符 : private, public, 缺省, protected  --->封装性
 *          局部变量 : 不可以使用权限修饰符
 *
 *      3. 默认初始化值的情况 :
 *          属性 : 类的属性, 根据其类型, 都有默认初始化值
 *              整形 (byte short int long) ==> 0
 *              浮点型 (float, double) ===> 0.0
 *              字符型 (char) ===> 0
 *              布尔型 (boolean) ===> false
 *              引用数据类型 (类, 数组, 接口) ===> null
 *          局部变量 : 没有默认初始化值
 *              意味着, 我们在调用局部变量之前, 一定要显式赋值
 *              特别地 : 形参在调用时, 我们赋值即可
 *
 *      4. 在内存中加载的位置 :
 *          属性 : 加载到堆空间中 (非 static)
 *          局部变量 : 加载到栈空间中
 *
 * @author yixihan
 */
public class UserTest {

    public static void main(String[] args) {

        User u1 = new User();
        System.out.println(u1.name);
        System.out.println(u1.age);
        System.out.println(u1.isMale);
        System.out.println(u1.weight);

        // 'phone' 在 'com.yixihan.day1013.User' 中具有 private 访问权限
        // System.out.println(u1.phone);


        u1.talk("汉语");

        u1.eat();
    }
}

class User {
    /**
     * 属性
     */
    String name;
    public int age;
    double weight;
    private String phone;
    boolean isMale;

    /**
     * language : 形参 是局部变量
     * @param language 语言
     */
    public void talk(String language){
        System.out.println("我们使用 " + language + " 进行交流");
    }

    /**
     * food 是局部变量
     */
    public void eat () {
        String food = "饺子";
        System.out.println("人人都喜欢吃 " + food);
    }
}
```



#### 类中方法的使用

> 什么是方法(method、函数)

- 方法是类或对象行为特征的抽象，用来完成某个功能操作。在某些语言中 也称为函数或过程
- 将功能封装为方法的目的是，可以实现代码重用，简化代码
- Java里的方法不能独立存在，所有的方法必须定义在类里



> 方法的声明格式

```java
/*
修饰符 : public, 缺省, private, protected等

返回值类型 : 
	没有返回值 : void
	有返回值 : 声明出返回值的类型 与方法体中 "return 返回值" 搭配使用
	
方法名 : 属于标识符,命名时遵循标识符命名规则和规范, "见名知意"

形参列表 : 可以包含零个, 一个或多个参数 多个参数时, 中间用 "," 隔开

返回值 : 方法在执行完毕后返还给调用它的程序的数据

*/
修饰符 返回值类型 方法名 (参数类型 形参1, 参数类型 形参2, ...){
	方法体程序代码
	return 返回值;
}
```



> 方法的分类 : 按照是否有形参及返回值

![image-20211013135622099](/assets/imgs/JavaSE.assets/image-20211013135622099.png)



##### 方法的调用

方法通过方法名被调用，且只有被调用才会执行



> 方法调用的过程分析

![image-20211013135720982](/assets/imgs/JavaSE.assets/image-20211013135720982.png)

**注 意 :**

- 方法被调用一次，就会执行一次
- 没有具体返回值的情况，返回值类型用关键字void表示，那么方法体中可 以不必使用return语句。如果使用，仅用来结束方法。
- 定义方法时，方法的结果应该返回给调用者，交由调用者处理。
- 方法中只能调用方法或属性，不可以在方法内部定义方法。



```java
package com.yixihan.day1013;

/**
 * 类中方法的使用
 *
 * 方法 : 描述类应该具有的功能
 *      比如 : Math 类 : sqrt ()  random () ...
 *            Scanner 类 : nextXxx () ...
 *            Arrays 类 : sort ()  binarySearch ()  toString () equals () ...
 *
 *
 * 1. 举例
 *      public void eat() {}
 *      public void sleep(int hour) {}
 *      public String getName() {}
 *      public String getNation(String nation) {}
 *
 *
 * 2. 方法的声明 : 权限修饰符 返回值类型 方法名 (形参列表) {
 *                  方法体
 *               }
 *               注意 : static final abstract 来修饰的方法, 后面再讲
 *
 *
 * 3. 说明 :
 *      1. 关于权限修饰符 :
 *          Java 规定的 4 中权限修饰符 : private public 缺省 protected ---> 封装性在细说
 *
 *      2. 返回值类型 : 有返回值 vs 无返回值
 *          1. 如果方法有返回值, 则必须在方法声明时指定返回值类型, 同时方法中需要使用 return 关键字来返回指定数据类型的数据
 *             如果方法没有返回值, 则方法声明时, 需要使用关键字 void 来表示
 *             通常没有返回值的方法中, 就不需要使用 return, 但是, 如果使用的话, 只用用 "return;" 表示结束此方法的意思
 *          2. 我们定义方法该不该有返回值 ?
 *              1. 看题目要求
 *              2. 看实际需求
 *              3. 凭自身经验
 *
 *      3. 方法名 : 属于标识符, 遵循标识符的规则和规范, "见名知意"
 *
 *      4. 形参列表 : 方法可以声明 0-n 个形参
 *          1. 格式 : 数据类型1 形参1, 数据类型2 形参2, 数据类型3 形参3, ...
 *          2. 定义方法时该不该有形参 ?
 *              1. 看题目要求
 *              2. 看实际需求
 *              3. 凭自身经验
 *
 *      5. 方法体 : 方法功能的体现
 *
 *
 * 4. return 关键字的使用 :
 *      1. 使用范围 : 使用在方法体重
 *      2. 作用 :
 *          1. 结束方法
 *          2. 针对于有返回值类型的方法, 使用 "return 数据" 方法返回所要的数据
 *      3. 注意点 : return 关键字后面不可以声明执行语句
 *
 *
 * 5. 方法的使用 :
 *      1. 可以调用当前类中的 属性 方法
 *          特殊的 : 方法 A 中又调用了方法 A (递归)
 *      2. 方法中不可以定义方法
 *
 * @author yixihan
 */
public class CustomerTest {

    public static void main(String[] args) {
        Customer customer1 = new Customer();

        customer1.age = 16;
        customer1.isMale = true;

        customer1.eat();
        System.out.println(customer1.getName());
        System.out.println(customer1.getNation("China"));

        customer1.sleep(8);
    }
}


class Customer {

    /**
     * 属性
     */
    String name;
    int age;
    boolean isMale;


    /**
     * 方法
     */
    public void eat(){
        System.out.println("客户吃饭");
        // return; // 'return' 不必要，因为是 ''void'' 方法中的最后一条语句
        // return 后不可以声明表达式
    }

    public void sleep(int hour){
        System.out.println("休息了" + hour + "个小时");
        eat();
        // StackOverflowError
        // sleep(hour);

    }

    public String getName(){
        int adult = 18;
        if (age > adult) {
            return name;
        } else {
            return "小比崽子未成年在这看锤子的 java";
        }
    }

    public String getNation(String nation){
        return "我的国籍是：" + nation;
    }

}
```



#### 练习



> 1

```java
package com.yixihan.day1013.exer;

/**
 * @author yixihan
 */
public class Person {

    /**
     * 属性
     */
    String name;
    int age;
    /**
     * sex = 1 ===> 男性
     * sex = 0 ===> 女性
     */
    int sex;


    /**
     * 方法
     */
    public void study () {
        System.out.println("studying");
    }

    public void showAge () {
        System.out.println("age : " + age);
    }

    public int addAge (int i) {
        age += i;
        return age;
    }
}
```



```java
package com.yixihan.day1013.exer;

/**
 * 要求：(1)创建Person类的对象，设置该对象的name、age和sex属性，
 *         调用study方法，输出字符串“studying”，调用showAge()方法显示age值，
 *         调用addAge()方法给对象的age属性值增加2岁。
 *      (2)创建第二个对象，执行上述操作，体会同一个类的不同对象之间的关系。
 *
 * @author yixihan
 */
public class PersonTest {

    public static void main(String[] args) {

        Person person1 = new Person();

        person1.name = "易曦翰";
        person1.age = 18;
        person1.sex = 1;

        person1.study();

        person1.showAge();

        int newAge1 = person1.addAge(2);
        System.out.println(person1.name + " 的新年龄为 " + newAge1);
        person1.showAge();


        Person person2 = new Person();

        person2.name = "曾思彤";
        person2.sex = 0;

        person2.study();

        person2.showAge();

        int newAge2 = person2.addAge(10);
        System.out.println(person2.name + " 的新年龄为 " + newAge2);
        person2.showAge();
        person1.showAge();
    }
}
```



> 2

```java
package com.yixihan.day1013.exer;

/**
 * 2. 利用面向对象的编程方法, 设计类 Circle 计算圆的面积
 *
 * @author yixihan
 */
public class Circle {
    /**
     * 半径
     */
    double radius;

    /**
     * 面积
     */
    double area;


    /**
     * 面积 方式 1
     */
    public double getCircleArea1 () {
        return radius * radius * Math.PI;
    }

    public void getCircleArea2 () {
        area = radius * radius * Math.PI;
    }
}
```



```java
package com.yixihan.day1013.exer;

/**
 * @author yixihan
 */
public class CircleTest {

    public static void main(String[] args) {

        Circle circle1 = new Circle();

        circle1.radius = 5.5;

        circle1.getCircleArea2();
        System.out.println(circle1.area);

        System.out.println(circle1.getCircleArea1());
    }
}
```



> 3

```java
package com.yixihan.day1013.exer;

/**
 *
 * 3.1 编写程序，声明一个method方法，在方法中打印一个10*8 的*型矩形，在main方法中调用该方法。
 *
 *
 * 3.2 修改上一个程序，在method方法中，除打印一个10*8的*型矩形外，再计算该矩形的面积，并将其作为方法返回值。在main方法中调用该方法，接收返回的面积值并打印。
 *
 *
 * 3.3 修改上一个程序，在method方法提供m和n两个参数，方法中打印一个m*n的*型矩形，并计算该矩形的面积， 将其作为方法返回值。在main方法中调用该方法，接收返回的面积值并打印。
 *
 * @author yixihan
 */
public class Exer3Test {
    public static void main(String[] args) {

        Exer3Test exer3Test = new Exer3Test();

        // 3.1
        exer3Test.method1();

        // 3.2
        double area = exer3Test.method2();
        System.out.println("面积为 : " + area);

        // 3.3
        double area2 = exer3Test.method3(10, 5);
        System.out.println("面积为 : " + area2);
    }

    public void method1 () {
        int column = 8;
        int row = 10;
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < column; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }

    public double method2 () {
        int column = 8;
        int row = 10;
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < column; j++) {
                System.out.print("*");
            }
            System.out.println();
        }

        return row * column;
    }

    public double method3 (int column, int row) {
        for (int i = 0; i < column; i++) {
            for (int j = 0; j < row; j++) {
                System.out.print("*");
            }
            System.out.println();
        }

        return row * column;
    }
}
```



> 4

```java
package com.yixihan.day1013.exer;

/**
 * 4. 对象数组题目：
 * 定义类Student，包含三个属性：学号number(int)，年级state(int)，成绩score(int)。
 * 创建20个学生对象，学号为1到20，年级和成绩都由随机数确定。
 * 问题一：打印出3年级(state值为3）的学生信息。
 * 问题二：使用冒泡排序按学生成绩排序，并遍历所有学生信息
 *
 *
 * @author yixihan
 */
public class Exer4Test {

    /**
     * 学号
     */
    int number;

    /**
     * 年级
     */
    int state;

    /**
     * 成绩
     */
    int score;

    public static void main(String[] args) {

        int num = 20;

        Exer4Test[] tests = new Exer4Test[num];

        for (int i = 0; i < num; i++) {

            // 给数组元素赋值
            tests[i] = new Exer4Test();

            // 学号
            tests[i].number = i + 1;

            // 年级 : [1,6]
            tests[i].state = (int) (Math.random() * (6 - 1 + 1) + 1);

            // 成绩 : [0,100]
            tests[i].score = (int) (Math.random() * (100 + 1));

        }

        // 遍历学生数组
        for (Exer4Test test : tests) {
            // System.out.println(test);  输出地址值
            test.showInfo();
        }

        System.out.println("************************************************");

        for (Exer4Test test : tests) {
            if (test.state == 3) {
                test.showInfo();
            }
        }

        System.out.println("************************************************");
        Exer4Test.sort(tests);
        for (Exer4Test test : tests) {
            test.showInfo();
        }

    }


    /**
     * 显示学生信息的方法
     */
    public void showInfo () {
        System.out.println("学号 : " + number + ", 年级 : " + state + ", 成绩 : " + score);;
    }

    /**
     * 冒泡排序 从高到低排序
     * @param tests 数组
     */
    public static void sort (Exer4Test[] tests) {
        for (int i = 0; i < tests.length - 1; i++) {
            for (int j = 0; j < tests.length - i - 1; j++) {
                if (tests[j].score <= tests[j + 1].score) {
                    swap(tests, j, j + 1);
                }
            }
        }
    }

    /**
     * 交换 数组中的元素 数组对象
     * @param tests 数组
     * @param i i
     * @param j j
     */
    public static void swap(Exer4Test[] tests, int i, int j) {
        Exer4Test temp = tests[i];
        tests[i] = tests[j];
        tests[j] = temp;
    }
}
```



改进 (封装)

```java
package com.yixihan.day1013.exer;

public class Student {


    /**
     * 学号
     */
    int number;

    /**
     * 年级
     */
    int state;

    /**
     * 成绩
     */
    int score;

    /**
     * 显示学生信息的方法
     */
    public void showInfo () {
        System.out.println("学号 : " + number + ", 年级 : " + state + ", 成绩 : " + score);;
    }
}

class StudentTest {

    public static void main(String[] args) {

        int num = 20;

        Student[] students = new Student[num];

        StudentTest test = new StudentTest();

        // 创建数组
        test.creatStudents(students, num);

        // 遍历学生数组
        test.printf(students);


        System.out.println("************************************************");

        // 寻找 3 年级学生
        test.searchState(students, 3);


        System.out.println("************************************************");

        // 排序
        test.sort(students);

        // 遍历学生数组
        test.printf(students);

    }

    /**
     * 冒泡排序 从高到低排序
     * @param tests 数组
     */
    public void sort (Student[] tests) {
        for (int i = 0; i < tests.length - 1; i++) {
            for (int j = 0; j < tests.length - i - 1; j++) {
                if (tests[j].score <= tests[j + 1].score) {
                    swap(tests, j, j + 1);
                }
            }
        }
    }

    /**
     * 交换 数组中的元素 数组对象
     * @param tests 数组
     * @param i i
     * @param j j
     */
    public void swap(Student[] tests, int i, int j) {
        Student temp = tests[i];
        tests[i] = tests[j];
        tests[j] = temp;
    }

    /**
     * 遍历 数组 的所有信息
     * @param tests 数组
     */
    public void printf (Student[] tests) {
        for (Student test : tests) {
            test.showInfo();
        }
    }


    /**
     * 查找 数组 中 指定年级的信息
     * @param tests 数组
     * @param stats 年级
     */
    public void searchState(Student[] tests, int stats) {
        for (Student test : tests) {
            if (test.state == stats) {
                test.showInfo();
            }
        }
    }

    /**
     * 初始化数组
     * @param students 数组
     * @param num 人数
     */
    public void creatStudents (Student[] students, int num) {
        for (int i = 0; i < num; i++) {

            // 给数组元素赋值
            students[i] = new Student();

            // 学号
            students[i].number = i + 1;

            // 年级 : [1,6]
            students[i].state = (int) (Math.random() * (6 - 1 + 1) + 1);

            // 成绩 : [0,100]
            students[i].score = (int) (Math.random() * (100 + 1));

        }
    }

}
```



#### 方法的封装

```java
package com.yixihan.day1014;

/**
 * 自定义数组工具类
 *
 * @author yixihan
 */
public class ArrayUtils {


    /**
     * 初始化数组 随机赋值
     * @param arr 数组
     */
    public void createArr (int[] arr) {

        for (int i = 0; i < arr.length; i++) {
            arr[i] = (int) (Math.random() * (100 - 1 + 1) + 1);
        }

    }

    /**
     * 求数组的最大值
     * @param arr 数组
     * @return max
     */
    public int getMax (int[] arr) {

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
    public int getMin (int[] arr) {

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
    public int getSum (int[] arr) {

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
    public int getAverage (int[] arr) {

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
    public void reverse (int[] arr) {

        for (int i = 0, j = arr.length - 1; i < j; i++, j--) {
            swap(arr, i, j);
        }

    }


    /**
     * 复制数组
     * @param arr 数组
     * @return 新数组
     */
    public int[] copy (int[] arr) {

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
    public void sortAsc (int[] arr) {

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
    public void sortDesc (int[] arr) {

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
    public void printf (int[] arr) {

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
    public int search (int[] arr, int dest) {

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
    public static void swap (int[] data, int i, int j) {
        int temp = data[i];
        data[i] = data[j];
        data[j] = temp;
    }
}
```



测试 

```java
package com.yixihan.day1014;

import java.util.Scanner;

/**
 * 测试 ArrayUtil
 *
 * @author yixihan
 */
public class ArrayExer {

    public static void main(String[] args) {

        ArrayUtils arrayUtils = new ArrayUtils();

        Scanner sc = new Scanner(System.in);

        System.out.println("请输入数组大小");

        int[] arr = new int[sc.nextInt()];

        // 初始化数组 (随机赋值)
        arrayUtils.createArr(arr);

        // 遍历数组
        arrayUtils.printf(arr);

        // 获取数组最大值
        System.out.println("最大值为 : " + arrayUtils.getMax(arr));

        // 获取数组最小值
        System.out.println("最小值为 : " + arrayUtils.getMin(arr));

        // 获取数组总和
        System.out.println("总和为 : " + arrayUtils.getSum(arr));

        // 获取数组平均值
        System.out.println("平均值为 : " + arrayUtils.getAverage(arr));
        System.out.println("********************************************************");

        // 给数组排序 升序
        arrayUtils.sortAsc(arr);

        // 遍历数组
        arrayUtils.printf(arr);
        System.out.println("********************************************************");

        // 给数组排序 降序
        arrayUtils.sortDesc(arr);

        // 遍历数组
        arrayUtils.printf(arr);
        System.out.println("********************************************************");

        // 反转数组
        arrayUtils.reverse(arr);

        // 遍历数组
        arrayUtils.printf(arr);
        System.out.println("********************************************************");

        // 查找数组中指定值
        System.out.println("请输入要查找的指定值 : ");
        int dest = sc.nextInt();
        int search = arrayUtils.search(arr, dest);
        if (dest == -1) {
            System.out.println("抱歉, 未找到你想找的值~");
        } else {
            System.out.println("找到啦~, 你要找的值下标为 : " + search);
        }

        System.out.println("********************************************************");

        // 复制数组
        int[] arr2 = arrayUtils.copy(arr);
        System.out.println("arr2 数组即将输出啦~");
        arrayUtils.printf(arr2);

    }
}
```



#### 匿名对象

```java
package com.yixihan.day1014;


/**
 * 一. 理解 "万事万物皆对象"
 *
 *      1. 在 Java 语言范畴中, 我们都将功能 结构等封装到类中, 通过类的实例化, 来调用具体的功能结构
 *          > Scanner String ...
 *          > 文件 : file
 *          > 网络资源 :URL
 *
 *      2. 涉及到 Java 语言与前端 html 后端的数据库交互时, 前后端的结构在 Java 层面交互时, 都体现为 类 对象
 *
 * 二. 内存解析的说明
 *      1. 引用类型的变量. 只可能储存两类值 : null 或 地址值
 *
 * 三. 匿名对象的使用
 *      1. 理解 : 我们创建的对象没有显式的赋给一个变量名, 即为匿名对象
 *      2. 特征 : 匿名对象只能调用一次
 *      3. 使用 : 如下
 *
 * @author yixihan
 */
public class InstanceTest {

    public static void main(String[] args) {

        Phone phone = new Phone();

        System.out.println(phone);

        phone.price = 1000;
        phone.sendEmail();
        phone.playGame();

        // 匿名对象
        new Phone().sendEmail();
        new Phone().playGame();

        new Phone().price = 1000;
        new Phone().watchMovie();

        //*************************************
        PhoneMall phoneMall = new PhoneMall();
        phoneMall.show(phone);
        phoneMall.show(new Phone());
    }

}

class Phone {
    /**
     * 价格
     */
    double price;

    public void sendEmail () {
        System.out.println("发送邮件");
    }

    public void playGame () {
        System.out.println("van游戏");
    }

    public void watchMovie () {
        System.out.println(price + "的手机看电影就这?");
    }
}

class PhoneMall {

    public void show (Phone phone) {
        phone.sendEmail();
        phone.watchMovie();
    }
}
```



#### 再述方法

##### 方法的重载

> 概念

在同一个类中，允许存在一个以上的同名方法，只要它们的参数个数或者参数 类型不同即可



> 特点

与返回值类型无关，只看参数列表，且参数列表必须不同。(参数个数或参数类 型)。调用时，根据方法参数列表的不同来区别



```java
package com.yixihan.day1014;


/**
 * 方法的重载 :(overLord) loading ...
 *
 * 1. 定义 : 在同一个类中, 允许存在一个以上的同名方法, 只要同名的 参数个数 或者 参数类型 不同即可
 *
 *      "两同一不同" : 同一个类 同样的方法名
 *                    参数列表不同 : 参数类型不同 参数个数不同
 * 2. 举例
 *      Arrays 类中重载的 sort() / binarySearch () ...
 *
 * 3. 判断是否是重载 :
 *      跟方法的权限修饰符 返回值类型 形参变量名 方法体 都没有关系
 *
 * 4. 在通过对象调用方法是, 要如何确定某一个指定的方法 :
 *      方法名 ---> 参数列表
 *
 *
 *
 * @author yixihan
 */
public class OverLoadTest {

    public static void main(String[] args) {

        OverLoadTest test = new OverLoadTest();

        // 1
        test.getSum(1, 3);

        // 2
        test.getSum(1.0, 5.0);
    }

    public void getSum (int i, int j) {
        System.out.println(1);
    }

    public void getSum (double i, double j) {
        System.out.println(2);
    }

    public void getSum (String s, int j) {
        System.out.println(3);
    }

    public void getSum (int i, String s) {
        System.out.println(4);
    }

    // 错误示范
    /*
    public int getSum (int i, int j) {
        System.out.println(i + j);
        return i + j;
    }
    */

    /*
    public void getSum (int m, int n) {
        System.out.println(m + n);
    }
    */

    /*
    private void getSum (int q, int p) {
        System.out.println(p + q);
    }
    */
}
```



练习

```java
package com.yixihan.day1014;

/**
 * 练习
 *
 * 2.编写程序，定义三个重载方法并调用。方法名为mOL。
 * 三个方法分别接收一个int参数、两个int参数、一个字符串参数。分别执行平方运算并输出结果，相乘并输出结果，输出字符串信息。
 * 在主类的main ()方法中分别用参数区别调用三个方法。
 * 3.定义三个重载方法max()，
 * 第一个方法求两个int值中的最大值，
 * 第二个方法求两个double值中的最大值，
 * 第三个方法求三个double值中的最大值，并分别调用三个方法。
 *
 * @author yixihan
 */
public class OverLordExer {

    public static void main(String[] args) {

        OverLordExer test = new OverLordExer();

        test.mOl(5);
        System.out.println("************************************");

        test.mOl(4, 6);
        System.out.println("************************************");

        test.mOl("hello");
        System.out.println("************************************");

        test.max(4, 7);
        System.out.println("************************************");

        test.max(5.7, 9,8);
        System.out.println("************************************");

        test.max(4.7, 9, 5);
        System.out.println("************************************");
    }



    public void mOl (int i) {
        System.out.println(i * i);
    }

    public void mOl (int i, int j) {
        System.out.println(i * j);
    }

    public void mOl (String str) {
        System.out.println(str);
    }

    public void max (int i, int j) {
        System.out.println(Math.max(i, j));
    }

    public void max (double i, double j) {
        System.out.println(Math.max(i, j));
    }

    public void max (double i, double j, double k) {
        double max = Math.max(i, j);

        System.out.println(Math.max(max, k));
    }


}
```



##### 可变个数形参

JavaSE 5.0 中提供了Varargs(variable number of arguments)机制，允许直接定 义能和多个实参相匹配的形参。从而，可以用一种更简单的方式，来传递个数可 变的实参。



```java
package com.yixihan.day1014;

/**
 * 可变个数形参的方法
 *
 * 1. jdk 5.0 新增的内容
 *
 * 2. 具体使用 :
 *      1. 可变个数形参的个数 : 数据类型 ... 变量名
 *      2. 当调用可变个数形参的方法时, 传入的参数可以是 0-n 个
 *      3. 可变个数形参的方法与本类中方法名相同, 形参不同的方法之间构成重载
 *      4. 可变个数形参的方法与本类中方法名相同, 形参类型也相同的数组之前不够成重载, 换句话说, 二者不能共存
 *      5. 可变个数形参在方法的形参中, 必须声明在末尾
 *      6. 可变个数形参在方法的形参中, 最多只能声明一个可变形参
 *
 * @author yixihan
 */
public class MethodArgsTest {

    public static void main(String[] args) {

        MethodArgsTest t = new MethodArgsTest();

        t.show(12);
        System.out.println("********************************");

        t.show();
        t.show("hello");
        t.show("hello","world");
        System.out.println("********************************");
    }


    public void show(int i){
        System.out.println(i);
    }

    /*
    public void show(String s){
        System.out.println("show(String)");
    }
    */

    public void show(String ... strs){
        System.out.println("show(String ... strs)");

        for (String str : strs) {
            System.out.println(str);
        }
    }

    // 与可变个数形参方法不能同时定义
    /*
    public void show(String[] strs){
        System.out.println("show(String ... strs)");

        for (String str : strs) {
            System.out.println(str);
        }
    }
    */

    // Vararg 参数必须为列表中的最后一项
    /*
    public void show (String ... strs, int i) {

    }
    */
}
```



##### 方法的形参的传递机制

必须由其所在类或对象调用才有意义。若方法含有参数 : 

- 形参：方法声明时的参数
- 实参：方法调用时实际传给形参的参数值



> Java的实参值如何传入方法呢?

Java里方法的参数传递方式只有一种：==值传递==。 即将实际参数值的副本 （复制品）传入方法内，而参数本身不受影响。

- 形参是基本数据类型：将实参基本数据类型变量的“数据值”传递给形参
- 形参是引用数据类型：将实参引用数据类型变量的“地址值”传递给形参



> 关于变量的赋值

```java
package com.yixihan.day1014;

/**
 * 关于变量的赋值
 *
 * 1. 如果变量是基本数据类型, 此时赋值的是变量所保存的数据值
 * 2. 如果变量是引用数据类型, 此时赋值的是变量所保存数据的地址值
 *
 * @author yixihan
 */
public class ValueTransferTest {

    public static void main(String[] args) {

        // 基本数据类型
        int m = 10;
        int n = m;

        System.out.println("m = " + m + " , n = " + n);

        n = 20;
        System.out.println("m = " + m + " , n = " + n);
        System.out.println("***********************************************");

        // 引用数据类型
        Order order1 = new Order();
        order1.id = 1005;

        // 赋值以后, order1 和 order2 的地址值相同, 都指向了堆空间中同一个对象实体
        Order order2 = order1;

        System.out.println("order1.id = " + order1.id + " , order2.id = " + order2.id);

        order2.id = 1002;
        System.out.println("order1.id = " + order1.id + " , order2.id = " + order2.id);


    }
}

class Order {
    int id;



}
```



###### 形参是基本数据类型

```java
package com.yixihan.day1014;

/**
 * 方法的形参的传递机制 : 值传递
 *
 * 一. 形参与实参
 *      1. 形参 : 方法定义是, 声明的小括号内的参数
 *      2. 实参 : 方法调用时, 实际传递给形参的数据
 *
 * 二. 值传递机制 :
 *      如果参数是基本数据类型, 此时实参赋给形参的是实参真实存储的数据值
 *      如果参数是引用数据类型, 此时实参赋给形参的是实参存储数据的地址值
 *
 * @author yixihan
 */
public class ValueTransferTest1 {

    public static void main(String[] args) {

        ValueTransferTest1 test = new ValueTransferTest1();

        int m = 10;
        int n = 20;

        System.out.println("m = " + m + " , n = " + n);

        // 交换两个变量的值的操作
        int temp = m;
        m = n;
        n = temp;

        System.out.println("m = " + m + " , n = " + n);

        // 用方法尝试 (形参是基本数据类型)
        test.swap(m, n);
        System.out.println("m = " + m + " , n = " + n);

    }

    public void swap (int m, int n) {
        int temp = m;
        m = n;
        n = temp;
    }
}
```



###### 形参是引用数据类型

```java
package com.yixihan.day1014;

/**
 * 方法的形参的传递机制 : 值传递
 *
 * 一. 形参与实参
 *      1. 形参 : 方法定义是, 声明的小括号内的参数
 *      2. 实参 : 方法调用时, 实际传递给形参的数据
 *
 * 二. 值传递机制 :
 *      如果参数是基本数据类型, 此时实参赋给形参的是实参真实存储的数据值
 *      如果参数是引用数据类型, 此时实参赋给形参的是实参存储数据的地址值
 *
 * @author yixihan
 */
public class ValueTransferTest2 {

    public static void main(String[] args) {

        Data data = new Data();
        ValueTransferTest2 test = new ValueTransferTest2();

        data.m = 10;
        data.n = 20;

        System.out.println("m = " + data.m + " , n = " + data.n);

        // 交换两个变量的值的操作
        int temp = data.m;
        data.m = data.n;
        data.n =  temp;

        System.out.println("m = " + data.m + " , n = " + data.n);

        // 用方法尝试 (形参是引用数据类型)
        test.swap(data);
        System.out.println("m = " + data.m + " , n = " + data.n);

    }

    public void swap (Data data) {
        int temp = data.m;
        data.m = data.n;
        data.n =  temp;
    }
}


class Data {
    int m;
    int n;
}
```



###### 图解

![image-20211014223016481](/assets/imgs/JavaSE.assets/image-20211014223016481.png)



![image-20211014223024061](/assets/imgs/JavaSE.assets/image-20211014223024061.png)



![image-20211014223031402](/assets/imgs/JavaSE.assets/image-20211014223031402.png)



###### 练习

```java
package com.yixihan.day1014.exer;

/**
 * @author yixihan
 */
public class Circle {

    /**
     * 半径
     */
    double radius;

    public double findArea () {
        return radius * radius * Math.PI;
    }
}
```



```java
package com.yixihan.day1014.exer;

/**
 * 定义一个类 PassObject，在类中定义一个方法printAreas()，该方法的定义如下：
 * public void printAreas(Circle c, int time)
 * 在printAreas方法中打印输出1到time之间的每个整数半径值，以及对应的面积。
 * 例如，times为5，则输出半径1，2，3，4，5，以及对应的圆面积。
 *
 * @author yixihan
 */
public class PassObject {

    public static void main(String[] args) {

        PassObject passObject = new PassObject();

        Circle circle = new Circle();

        System.out.println("new radius is " + circle.radius);

        passObject.printAreas(circle, 1000);

        System.out.println("new radius is " + circle.radius);

    }
    
    public void printAreas (Circle c, int time) {

        System.out.println("Radius\t\t\tArea");

        for (int i = 0; i <= time; i++) {

            // 设置圆的半径
            c.radius = i;

            // 输出
            System.out.println(c.radius + "\t\t\t" + c.findArea());
        }

        c.radius++;
    }


}
```





##### 递归方法

一个方法体内调用它自身。

- 方法递归包含了一种隐式的循环，它会重复执行某段代码，但这种重复执 行无须循环控制
- 递归一定要向已知方向递归，否则这种递归就变成了无穷递归，类似于死 循环



```java
//计算1-100之间所有自然数的和
public int sum(int num){
    if(num == 1){
        return 1;
    }else{
        return num + sum(num - 1);
    }
}
```



###### 练习

```java
package com.yixihan.day1014.exer;

/**
 * @author yixihan
 */
public class RecursionExer {

    public static void main(String[] args) {

        RecursionExer exer = new RecursionExer();

        int test1 = exer.test1(10);
        System.out.println(test1);

        int test2 = exer.test2(10);
        System.out.println(test2);

        System.out.println("*******************");
        for (int i = 1; i < 20; i++) {
            System.out.print(exer.test3(i) + " ");
        }
        System.out.println();
    }

    /**
     * 已知有一个数列：f(0) = 1,f(1) = 4,f(n+2)=2*f(n+1) + f(n),其中n是大于0的整数，求f(10)的值。
     */
    public int test1 (int n) {
        if (n == 0) {
            return 1;
        } else if (n == 1) {
            return 4;
        } else {
            return (2 * test1(n - 1)) + test1(n - 2);
        }
    }


    /**
     * 已知一个数列：f(20) = 1,f(21) = 4,f(n+2) = 2*f(n+1)+f(n),其中n是大于0的整数，求f(10)的值
     */
    public int test2 (int n) {
        if (n == 20) {
            return 1;
        } else if (n == 21) {
            return 4;
        } else {
            return test2(n + 2) - (2 * test2(n + 1));
        }
    }


    /**
     * 输入一个数据n，计算斐波那契数列(Fibonacci)的第n个值
     * 1 1 2 3 5 8 13 21 34 55
     * 规律：一个数等于前两个数之和
     * 要求：计算斐波那契数列(Fibonacci)的第n个值，并将整个数列打印出来
     */
    public int test3 (int n) {
        if (n == 1 || n == 2) {
            return 1;
        } else {
            return test3(n - 1) + test3(n - 2);
        }
    }

}
```



##### 练习

```java
package com.yixihan.day1014;

/**
 * @author yixihan
 */
public class ArrayPrintfTest {

    public static void main(String[] args) {

        int[] arr1 = new int[]{1,2,3};
        // 输出地址值
        System.out.println(arr1);

        char[] arr2 = new char[]{'a','v','b'};
        // 遍历 char[] 数组
        System.out.println(arr2);
    }
}
```



![image-20211014222942872](/assets/imgs/JavaSE.assets/image-20211014222942872.png)

```java
package com.yixihan.day1014;

import java.io.PrintStream;

/**
 * @author yixihan
 */
public class Exer {

    public static void main(String[] args) {
        int a = 10;
        int b = 10;

        // 需要在 method 方法被调用之后, 仅打印出 a = 100, b = 200
        method(a, b);
        System.out.println("a = " + a);
        System.out.println("b = " + b);
    }

    /**
     * 方式 1
     */
    /*
    public static void method (int a, int b) {
        System.out.println("a = " + (a * 10));
        System.out.println("b = " + (b * 20));
        //
        System.exit(1);
    }
    */

    /**
     * 方式二
     */
    public static void method (int a, int b) {

        PrintStream printStream = new PrintStream(System.out) {
            final String a = "a = 10";
            final String b = "b = 10";

            @Override
            public void println(String x) {

                if (a.equals(x)) {
                    x = "a = 100";
                } else if (b.equals(x)) {
                    x = "b = 200";
                }

                super.println(x);
            }
        };

        System.setOut(printStream);
    }
}
```



![image-20211014222933316](/assets/imgs/JavaSE.assets/image-20211014222933316.png)



### 面向对象的特征之一 : 封装与隐藏



#### 封装与测试

>我们程序设计追求“高内聚，低耦合”

- 高内聚 ：类的内部数据操作细节自己完成，不允许外部干涉
- 低耦合 ：仅对外暴露少量的方法用于使用



隐藏对象内部的复杂性，只对外公开简单的接口。便于外界调用，从而提 高系统的可扩展性、可维护性。通俗的说，把该隐藏的隐藏起来，该暴露 的暴露出来。这就是封装性的设计思想。



>  访问权限修饰符

![image-20211015150423390](/assets/imgs/JavaSE.assets/image-20211015150423390.png)



```java
package com.yixihan.day1015;

/**
 * 面向对象的特征一 : 封装与隐藏
 *
 * 一. 问题的引入 :
 *      当我们创建一个类的对象以后, 我们可以通过 "对象.属性" 的方式, 对对象的属性赋值
 *      这里, 赋值操作收到属性的数据类型和存储范围的制约, 除此之外, 没有其他制约条件
 *      但是, 在实际问题中, 我们往往需要给属性赋值加入额外的限制条件 这个条件就不能在
 *      属性声明时体现, 我们只能通过方法进行限制条件的添加. (比如 : setXxx () )
 *      同时, 我们需要避免用户再使用 "对象.属性" 的方式对属性进行赋值, 则需要将属性声明为私有的 (private)
 *      ---> 此时, 针对属性就体现了封装性
 *
 * 二. 封装性的体现 :
 *      我们将类的属性 xxx 私有化 (private), 同时, 提供公共的 (public) 方法来获取(getXxx ()) 和设置 (setXxx ()) 此属性的属性值
 *
 *      拓展 : 封装性的体现 :
 *          1. 如上
 *          2. 不对外暴露的私有的方法
 *          3. 单例模式
 *          ...
 *
 * 三. 封装性的体现, 需要权限修饰符来配合
 *      1. Java 规定的 4 中权限 (从小到大排序) : private 缺省 protected public
 *      2. 4 中权限可以用来修饰类级类的内部结构 : 属性 方法 构造器 内部类
 *      3. 具体的 : 4 中权限都可以用来修饰类的内部结构 : 属性 方法 构造器 内部类
 *                 修饰类的话, 只能使用 : 缺省 public
 *
 * @author yixihan
 */
public class AnimalTest {

    public static void main(String[] args) {

        Animal a = new Animal();

        //a.name = "大黄";
        //a.age = 1;
        // 'legs' 在 'com.yixihan.day1015.Animal' 中具有 private 访问权限
        // a.legs = 4;
        a.setAge(1);
        a.setName("大黄");

        a.eat();

        a.setLegs(6);
        a.show();

        a.setLegs(-6);
        System.out.println(a.getLegs());
        a.show();
        System.out.println(a.toString());
    }
}


class Animal {

    /**
     * 名字
     */
    private String name;

    /**
     * 年龄
     */
    private int age;

    /**
     * 腿的个数
     */
    private int legs;

    /**
     * 对属性的设置
     * @param legs 腿的个数
     */
    public void setLegs (int legs) {

        if (legs >= 0) {
            this.legs = legs;
        } else {
            this.legs = 0;
            // 抛出一个异常
        }
    }

    /**
     * 对属性的获取
     * @return legs
     */
    public int getLegs () {
        return legs;
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

    public void eat () {
        System.out.println("进食");
    }

    public void show () {
        System.out.println("name = " + name + ", age = " + age + ", leg = " + legs);
    }

    @Override
    public String toString() {
        return "Animal{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", legs=" + legs +
                '}';
    }
}
```



##### 测试

```java
package com.yixihan.day1015;

/**
 * @author yixihan
 */
public class Order {

    private int orderPrivate;

    int orderDefault;

    public int orderPublic;

    private void methodPrivate () {
        orderPrivate = 1;
        orderDefault = 2;
        orderPublic = 3;
        System.out.println("这是 private 方法");
    }

    void methodDefault () {
        orderPrivate = 1;
        orderDefault = 2;
        orderPublic = 3;
        System.out.println("这是 default 方法");
    }

    public void methodPublic () {
        orderPrivate = 1;
        orderDefault = 2;
        orderPublic = 3;
        System.out.println("这是 public 方法");
    }
}
```



同一个包下 : 

```java
package com.yixihan.day1015;

/**
 * @author yixihan
 */
public class OrderTest {

    public static void main(String[] args) {

        Order order = new Order();

        order.orderPublic = 2;
        order.orderDefault = 3;
        // 'orderPrivate' 在 'com.yixihan.day1015.Order' 中具有 private 访问权限
        // order.orderPrivate = 1;

        order.methodDefault();
        order.methodPublic();
        // 'methodPrivate()' 在 'com.yixihan.day1015.Order' 中具有 private 访问权限
        // order.methodPrivate();
    }
}
```



不同包下 : 

```java
package com.yixihan.day1015.exer;

import com.yixihan.day1015.Order;

/**
 * @author yixihan
 */
public class OrderTest {

    public static void main(String[] args) {

        Order order = new Order();

        order.orderPublic = 2;
        //'orderDefault' 在 'com.yixihan.day1015.Order' 中不为 public。无法从外部包访问
        // order.orderDefault = 3;
        // 'orderPrivate' 在 'com.yixihan.day1015.Order' 中具有 private 访问权限
        // order.orderPrivate = 1;

        // 'methodDefault()' 在 'com.yixihan.day1015.Order' 中不为 public。无法从外部包访问
        // order.methodDefault();
        order.methodPublic();
        // 'methodPrivate()' 在 'com.yixihan.day1015.Order' 中具有 private 访问权限
        // order.methodPrivate();
    }
}
```



##### 练习

```java
package com.yixihan.day1015.exer;

/**
 *
 * 1.创建程序,在其中定义两个类：Person和PersonTest类。定义如下：
 * 用setAge()设置人的合法年龄(0~130)，用getAge()返回人的年龄。
 *
 * @author yixihan
 */
public class Person {

    private int age;

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        int maxAge = 130;
        int minAge = 0;

        if (age < maxAge && age > minAge) {
            this.age = age;
        } else {
            System.out.println("传入的数据非法");
            throw new RuntimeException("传入的数据非法");
        }
    }
}
```



```java
package com.yixihan.day1015.exer;

/**
 * 在 PersonTest 类 中实例化 Person 类的对象 b ， 调 用 setAge() 和getAge()方法，体会Java的封装性。
 *
 * @author yixihan
 */
public class PersonTest {

    public static void main(String[] args) {

        Person person = new Person();

        person.setAge(12);
        System.out.println("年龄为 " + person.getAge());

        //person.setAge(140);
        //System.out.println("年龄为 " + person.getAge());

        //person.setAge(-9);
        //System.out.println("年龄为 " + person.getAge());
    }
}
```



#### 构造器(构造方法)



> 构造器的特征

- 它具有与类相同的名称
- 它不声明返回值类型。（与声明为void不同）
- 不能被static、final、synchronized、abstract、native修饰，不能有 return语句返回值



> 构造器的作用 : ==创建对象；给对象进行初始化==

- 如：Order o = new Order(); Person p = new Person(“Peter”,15);
- 如同我们规定每个“人”一出生就必须先洗澡，我们就可以在“人”的 构造器中加入完成“洗澡”的程序代码，于是每个“人”一出生就会自 动完成“洗澡”，程序就不必再在每个人刚出生时一个一个地告诉他们 要“洗澡”了。



> 语法格式

```java
修饰符 类名 (参数列表) {
	初始化语句；
} 
```



根据参数不同，构造器可以分为如下两类

- 隐式无参构造器（系统默认提供）
- 显式定义一个或多个构造器（无参、有参）



==注意 :== 

- Java语言中，每个类都至少有一个构造器
- 默认构造器的修饰符与所属类的修饰符一致
- 一个类可以创建多个重载的构造器
- 一旦显式定义了构造器，则系统不再提供默认构造器
- 父类的构造器不可被子类继承



```java
package com.yixihan.day1015;

/**
 * 类的结构之二 : 构造器 (构造方法 constructor) 的使用
 * constructor : 建设 建造 construction : CCB constructor : 建设者
 *
 * 一. 构造器的作用
 *      1. 创建对象
 *      2. 初始化对象的属性 (信息)
 *
 * 二. 说明 :
 *      1. 如果没有显式的定义类的构造器的话, 则系统默认提供一个空参的构造器
 *      2. 定义构造器的个数 : 权限修饰符 类名 (形参列表) {
 *                              代码体
 *                          }
 *      3. 一个类中定义的多个构造器, 彼此构成重载
 *      4. 一旦我们显式的定义了类的构造器之后, 系统就不再提供默认的空参构造器
 *      5. 一个类中, 至少会有一个构造器
 *
 * @author yixihan
 */
public class PersonTest {

    public static void main(String[] args) {

        // 创建类的对象 : new + 构造器
        Person p = new Person();
        Person yixihan = new Person("yixihan");


        System.out.println(yixihan.getName());
        p.eat();
    }
}

class Person {
    /**
     * 属性
     */
    private String name;
    private int age;

    /**
     * 构造器
     */
    public Person () {
        System.out.println("new Person () ...");
    }

    public Person (String name) {
        this.name = name;
    }

    public Person (String name, int age) {
        this.name = name;
        this.age = age;
    }


    /**
     * 方法
     */
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void eat () {
        System.out.println("eat");
    }

    public void study () {
        System.out.println("study");
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```



##### 练习



>1

```java
package com.yixihan.day1015.exer;

/**
 *
 * 1.创建程序,在其中定义两个类：Person和PersonTest类。定义如下：
 * 用setAge()设置人的合法年龄(0~130)，用getAge()返回人的年龄。
 *
 * 2. 在前面定义的Person类中添加构造器，利用构造器设置所有人的age属性初始值都为18。
 *
 * 3. 修改上题中类和构造器，增加name属性,使得每次创建Person对象的同时初始化对象的age属性值和name属性值。
 * @author yixihan
 */
public class Person {

    private String name;
    private int age;

    public Person () {
        this.age = 18;
    }

    public Person (int age) {
        this.age = age;
    }

    public Person (int age, String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        int maxAge = 130;
        int minAge = 0;

        if (age < maxAge && age > minAge) {
            this.age = age;
        } else {
            System.out.println("传入的数据非法");
            throw new RuntimeException("传入的数据非法");
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```





```java
package com.yixihan.day1015.exer;

/**
 * 在 PersonTest 类 中实例化 Person 类的对象 b ， 调 用 setAge() 和getAge()方法，体会Java的封装性。
 *
 * @author yixihan
 */
public class PersonTest {

    public static void main(String[] args) {

        Person person = new Person();

        System.out.println("年龄为 " + person.getAge());

        person.setAge(12);
        System.out.println("年龄为 " + person.getAge());

        Person person1 = new Person(20, "曾思彤");

        System.out.println("年龄为 " + person1.getAge());
        System.out.println("姓名为 " + person1.getName());

        //person.setAge(140);
        //System.out.println("年龄为 " + person.getAge());

        //person.setAge(-9);
        //System.out.println("年龄为 " + person.getAge());
    }
}
```



> 2

```java
package com.yixihan.day1015.exer;

/**
 * 编写两个类，TriAngle和TriAngleTest，
 * 其中TriAngle类中声明私有的底边长base和高height，同时声明公共方法访问私有变量。此外，提供类必要的构造器。
 * 另一个类中使用这些公共方法，计算三角形的面积
 *
 * @author yixihan
 */
public class TriAngle {

    private double base;

    private double height;

    public TriAngle () {}

    public TriAngle (double base, double height) {
        this.base = base;
        this.height = height;
    }

    public double getArea () {
        return base * height / 2;
    }


    public double getBase() {
        return base;
    }

    public void setBase(double base) {
        this.base = base;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    @Override
    public String toString() {
        return "TriAngle{" +
                "base=" + base +
                ", height=" + height +
                '}';
    }
}
```



```java
package com.yixihan.day1015.exer;

/**
 * @author yixihan
 */
public class TriAngleTest {

    public static void main(String[] args) {

        TriAngle triAngle = new TriAngle();

        System.out.println(triAngle.toString());

        triAngle.setBase(2.5);
        triAngle.setHeight(8);
        System.out.println(triAngle.toString());

        System.out.println("面积为 : " + triAngle.getArea());
        System.out.println("****************************");

        TriAngle triAngle1 = new TriAngle(5.6, 3.7);
        System.out.println(triAngle1.toString());

        System.out.println("面积为 : " + triAngle1.getArea());

    }
}
```



#### 总结 : 属性赋值的前后顺序



```java
package com.yixihan.day1015;

/**
 * 总结属性赋值的前后顺序
 *
 *
 * 1. 默认初始化
 * 2. 显式初始化
 * 3. 构造器中初始化
 * 
 * 4. 通过 "对象.setXxx ()" 或者 "对象.属性" 赋值
 * 
 * 1 2 3 都执行一次
 * 4 可以执行 n 次
 *
 *
 * 以上操作的先后顺序 : 1 - 2 - 3 - 4
 *
 * @author yixihan
 */
public class UserTest {

    public static void main(String[] args) {

        User u1 = new User();
        System.out.println(u1.age);

        System.out.println("***************************************");

        User u2 = new User(2);
        System.out.println(u2.age);

        System.out.println("***************************************");
        
        User u3 = new User(2);
        u3.setAge(3);
        System.out.println(u3.age);
    }

}

class User {

    String name;
    int age = 1;

    public User () {
    }

    public User (int age) {
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
}
```



#### JavaBean

JavaBean是一种Java语言写成的可重用组件



> 所谓javaBean，是指符合如下标准的Java类：

- 类是公共的
- 有一个无参的公共的构造器
- 有属性，且有对应的get、set方法



用户可以使用JavaBean将功能、处理、值、数据库访问和其他任何可以 用Java代码创造的对象进行打包，并且其他的开发者可以通过内部的JSP 页面、Servlet、其他JavaBean、applet程序或者应用来使用这些对象。用 户可以认为JavaBean提供了一种随时随地的复制和粘贴的功能，而不用关 心任何改变



```java
package com.yixihan.day1015;

/**
 *
 * JavaBean是一种Java语言写成的可重用组件
 *
 *      所谓javaBean，是指符合如下标准的Java类：
 *          - 类是公共的
 *          - 有一个无参的公共的构造器
 *          - 有属性，且有对应的get、set方法
 *
 * 
 * 注意点 : 系统提供的默认构造器权限和类的权限是相同的
 * @author yixihan
 */
public class Customer {
    
    private int id;

    private String name;

    public Customer() { }

    public Customer(int id, String name) {
        this.id = id;
        this.name = name;
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
}
```



#### 拓展 : UML 类图

![image-20211015161702452](/assets/imgs/JavaSE.assets/image-20211015161702452.png)



#### this 关键字



##### 介绍

> this是什么？

- 在Java中，this关键字比较难理解，它的作用和其词义很接近
  - 它在方法内部使用，即这个方法所属对象的引用
  - 它在构造器内部使用，表示该构造器正在初始化的对象
- this 可以调用类的属性、方法和构造器
- 什么时候使用this关键字呢？
  - 当在方法内需要用到调用该方法的对象时，就用this。
  - 具体的：我们可以用this来区分属性和局部变量。 比如 : this.name = name;



```java
package com.yixihan.day1015.thisTest;

/**
 * this 关键字的使用 :
 *
 * 1. this 可以用来修饰 或 调用 属性 方法 构造器
 *
 *
 * 2. this 修饰属性 和 方法 :
 *      this 理解为当前对象 或 当前正在创建的对象
 *
 *      1. 在类的方法中, 我们可以使用 "this.属性" 或 "this.方法" 的方式, 调用当前对象的属性或方法,
 *      但是, 通常情况下, 我们都选择省略 "this." .
 *      特殊情况下, 如果方法的形参和类的属性名同名时, 我们必须显式的使用 "this.变量" 的方式, 表示此变量是属性, 而非形参
 *
 *      2. 在类的构造器中中, 我们可以使用 "this.属性" 或 "this.方法" 的方式, 调用当前正在创建的对象的属性或方法,
 *      但是, 通常情况下, 我们都选择省略 "this." .
 *      特殊情况下, 如果方法的形参和类的属性名同名时, 我们必须显式的使用 "this.变量" 的方式, 表示此变量是属性, 而非形参
 *
 * 3. this 修饰或调用构造器 :
 *      1. 我们在类的构造器中, 可以显式的使用 "this(形参列表)" 方式, 来调用本类中指定的其他构造器
 *      2. 构造器中, 不能通过 "this(形参列表)" 方式调用自己
 *      3. 如果一个类中有 n 个构造器, 最多有 n - 1 个构造器使用了 "this(形参列表)" 方式
 *      4. 规定 : "this(形参列表)" 必须声明在当前构造器的首行
 *      5. 构造器内部, 只能使用一次 "this(形参列表)" 用来调用其他的构造器
 *
 * @author yixihan
 */
public class PersonTest {

    public static void main(String[] args) {

        Person person = new Person();

        person.setAge(12);

        System.out.println(person.getAge());
        person.eat();

        Person person1 = new Person("心意", 20);
        System.out.println(person1.getAge());

    }
}

class Person {

    private String name;

    private int age;

    public Person() {
        System.out.println("正在创建对象哦~");
        //Person初始化时，需要考虑如下的1,2,3,4...(共40行代码)
    }

    public Person(String name) {
        this();
        this.name = name;
        //Person初始化时，需要考虑如下的1,2,3,4...(共40行代码) 调用 this() 即可省略
    }

    public Person(int age) {
        this();
        this.age = age;
        //Person初始化时，需要考虑如下的1,2,3,4...(共40行代码) 调用 this() 即可省略
    }

    public Person(String name, int age) {
        this(age);
        this.name = name;
        // this.age = age;  调用 this(age) 即可省略
        //Person初始化时，需要考虑如下的1,2,3,4...(共40行代码) 调用 this(age) 即可省略
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

    public void eat () {
        System.out.println("吃饭");
        this.study();
    }

    public void study () {
        System.out.println("学习");

    }
}
```



##### 练习

```java
package com.yixihan.day1015.thisTest.exer;

/**
 * @author yixihan
 */
public class Boy {

    private String name;
    private int age;

    public Boy() {
    }

    public Boy(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void marry (Girl girl) {
        System.out.println("我想娶 " + girl.getName());
    }

    public void shout () {
        if (age >= 22) {
            System.out.println("可以登記結婚了");
        } else {
            System.out.println("還需要再等等");
        }
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
        return "Boy{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```



```java
package com.yixihan.day1015.thisTest.exer;

/**
 * @author yixihan
 */
public class Girl {

    private String name;
    private int age;

    public Girl() {
    }

    public Girl(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void marry (Boy boy) {
        System.out.println("我想嫁個 " + boy.getName());
        boy.marry(this);
    }

    /**
     * 比較兩個對象的大小
     * @param girl 要比较的那个对象
     * @return >0 : 當前對象大 ; <0 当前对象小 ; =0 一样大
     */
    public int compare (Girl girl) {
        return this.getAge() - girl.getAge();
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
        return "Girl{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```



```java
package com.yixihan.day1015.thisTest.exer;

/**
 * @author yixihan
 */
public class BoyGirlTest {

    public static void main(String[] args) {
        Boy boy = new Boy("罗密欧", 23);
        boy.shout();

        Girl girl = new Girl("朱丽叶", 18);
        girl.marry(boy);

        Girl girl1 = new Girl("祝英台", 17);
        int compare = girl.compare(girl1);
        if (compare > 0) {
            System.out.println(girl.getName() + " 比 " + girl1.getName() + " 大 " + compare + " 岁");
        } else if (compare < 0) {
            System.out.println(girl.getName() + " 比 " + girl1.getName() + "小" + compare + " 岁");
        } else {
            System.out.println(girl.getName() + " 和 " + girl1.getName() + "一样大");
        }


    }
}
```



#### 实验

##### 实验 1

![image-20211015185058515](/assets/imgs/JavaSE.assets/image-20211015185058515.png)



Account

```java
package com.yixihan.day1015.thisTest.exer;

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
    public Account() { }

    /**
     * 全参构造
     * @param id 账号 id
     * @param balance 余额
     * @param annualInterestRate 年利率
     */
    public Account(int id, double balance, double annualInterestRate) {
        this.id = id;
        this.balance = balance;
        this.annualInterestRate = annualInterestRate;
    }

    /**
     * 取钱
     * @param amount 取出金额
     */
    public void withdraw (double amount) {
        if (amount > balance) {
            System.out.println("抱歉~, 您的余额不足哦~");
        } else {
            balance -= amount;
            System.out.println("您已取出 " + amount + " 元, 现账户余额 " + balance + " 元");
        }
    }

   /**
     * 存钱
     * @param amount 存入金额
     */
    public void deposit (double amount) {
        balance += amount;
        System.out.println("您已存入 " + amount + " 元, 现账户余额 " + balance + " 元");
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
        return "Account{" +
                "id=" + id +
                ", balance=" + balance +
                ", annualInterestRate=" + (annualInterestRate * 100) + "%" +
                '}';
    }
}

```



Customer

```java
package com.yixihan.day1015.thisTest.exer;

/**
 * @author yixihan
 */
public class Customer {

    private String firstName;

    private String lastName;

    private Account account;

    public Customer() { }

    /**
     * 构造器
     * @param firstName 名字
     * @param lastName 性
     */
    public Customer(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", account=" + account.toString() +
                '}';
    }
}
```



Test

```java
package com.yixihan.day1015.thisTest.exer;

/**
 * @author yixihan
 */
public class CustomerAccountTest {

    public static void main(String[] args) {

        // 创建名为 Jane Smith 的对象
        Customer customer = new Customer("Jane", "Smith");

        // 创建 customer 的 account 
        customer.setAccount(new Account(1000, 2000, 0.0123));

        // 存入 100
        customer.getAccount().deposit(100);

        // 取出 960
        customer.getAccount().withdraw(960);

        // 取出 2000
        customer.getAccount().withdraw(2000);

        // 输出 customer 的信息
        System.out.println(customer.toString());


    }
}
```



##### 实验2

<img src="/assets/imgs/JavaSE.assets/image-20211015192007136.png" alt="image-20211015192007136" style="zoom:150%;" />



Account

```java
package com.yixihan.day1015.experiment2;

/**
 * @author yixihan
 */
public class Account {

    /**
     * 余额
     */
    private double balance;

    public Account() {
    }

    /**
     * 全参构造
     * @param balance 余额
     */
    public Account(double balance) {
        this.balance = balance;
    }

    /**
     * 取钱
     * @param amount 取出金额
     */
    public void withdraw (double amount) {
        if (amount > balance) {
            System.out.println("抱歉~, 您的余额不足哦~");
        } else {
            balance -= amount;
            System.out.println("您已取出 " + amount + " 元, 现账户余额 " + balance + " 元");
        }
    }

    /**
     * 存钱
     * @param amount 存入金额
     */
    public void deposit (double amount) {
        balance += amount;
        System.out.println("您已存入 " + amount + " 元, 现账户余额 " + balance + " 元");
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
}

```



Customer

```java
package com.yixihan.day1015.experiment2;


/**
 * @author yixihan
 */
public class Customer {

    private String firstName;

    private String lastName;

    private Account account;

    public Customer() { }

    /**
     * 构造器
     * @param firstName 名字
     * @param lastName 性
     */
    public Customer(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", account=" + account.toString() +
                '}';
    }
}
```



Bank

```java
package com.yixihan.day1015.experiment2;

/**
 * @author yixihan
 */
public class Bank {

    private Customer[] customers;

    private int numberOfCustomer;

    public Bank() {
        customers = new Customer[100000];
        numberOfCustomer = 0;
    }

    public void addCustomer (String firstName, String lastName) {
        Customer customer = new Customer(firstName, lastName);
        customers[numberOfCustomer++] = customer;

    }

    public Customer[] getCustomers() {
        return customers;
    }

    public Customer getCustomer (int index) {

        if (index >= numberOfCustomer || index < 0) {
            System.out.println("找不到哦~");
            throw new RuntimeException("找不到哦~");
        } else {
            return customers[index];
        }

    }

    public int getNumberOfCustomer() {
        return numberOfCustomer;
    }
}
```



Test

```java
package com.yixihan.day1015.experiment2;


import java.util.Random;
import java.util.Scanner;

/**
 * @author yixihan
 */
public class BankTest {

    public static void main(String[] args) {

        Bank bank = new Bank();

        bank.addCustomer("Jane", "Smith");

        bank.getCustomer(0).setAccount(new Account(1000));

        System.out.println(bank.getNumberOfCustomer());

        System.out.println(bank.getCustomer(0).toString());

        Scanner sc = new Scanner(System.in);

        int n = (int) (Math.random() * (100000 - 1000 + 1000) + 1000);
        for (int i = 0; i < n; i++) {
            bank.addCustomer(getRandomString(5), getRandomString(5));
            bank.getCustomer(i + 1).setAccount(new Account(Math.random() * 100000000));
            System.out.println(bank.getCustomer(i + 1).toString());
        }

        System.out.println("该银行现在有 " + bank.getNumberOfCustomer() + " 名会员");



    }

    //length用户要求产生字符串的长度
    public static String getRandomString(int length){
        String str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random=new Random();
        StringBuffer sb=new StringBuffer();
        for(int i=0;i<length;i++){
            int number=random.nextInt(62);
            sb.append(str.charAt(number));
        }
        return sb.toString();
    }
}
```



#### 关键字 : package import 的使用



##### package

> 包的作用

- 包帮助管理大型软件系统：将功能相近的类划分到同一个包中。比如：MVC的设计模式
- 包可以包含类和子包，划分项目层次，便于管理
- 解决类命名冲突的问题
- 控制访问权限



![image-20211015192753531](/assets/imgs/JavaSE.assets/image-20211015192753531.png)



##### MVC设计模式

MVC是常用的设计模式之一，将整个程序分为三个层次：视图模型层，控制器层，与 数据模型层。这种将程序输入输出、数据处理，以及数据的展示分离开来的设计模式 使程序结构变的灵活而且清晰，同时也描述了程序各个对象间的通信方式，降低了程 序的耦合性。



> 模型层 model 主要处理数据

- 数据对象封装 model.bean/domain
- 数据库操作类 model.dao
- 数据库 model.db



> 控制层 controller 处理业务逻辑

- 应用界面相关 controller.activity
- 存放fragment controller.fragment
- 显示列表的适配器 controller.adapter
- 服务相关的 controller.service

- 抽取的基类 controller.base



> 视图层 view 显示数据

- 相关工具类 view.utils
- 自定义view view.ui



![image-20211015193137122](/assets/imgs/JavaSE.assets/image-20211015193137122.png)



##### import

为使用定义在不同包中的Java类，需用import语句来引入指定包层次下所需要的类 或全部类(.*)。

==import语句告诉编译器到哪里去寻找类==



> 语法格式

import 包名. 类名;



> 注意

- 在源文件中使用import显式的导入指定包下的类或接口
- 声明在包的声明和类的声明之间
- 如果需要导入多个类或接口，那么就并列显式多个import语句即可
- 举例：可以使用java.util.*的方式，一次性导入util包下所有的类或接口
- 如果导入的类或接口是java.lang包下的，或者是当前包下的，则可以省略此import语句
- 如果在代码中使用不同包下的同名的类。那么就需要使用类的全类名的方式指明调用的 是哪个类
- 如果已经导入java.a包下的类。那么如果需要使用a包的子包下的类的话，仍然需要导入
- import static组合的使用：调用指定类或接口下的静态的属性或方法



```java
package com.yixihan.day1015;

import com.yixihan.day1015.experiment1.Account;

/**
 * 一. package 关键字的使用 :
 *      1. 为了更好的实现项目中类的管理, 提供包的概念
 *      2. 使用 package 声明类或接口所属的包, 声明在源文件的首行
 *      3. 包, 属于标识符, 遵循标识符的命名规则 规范 (xxxyyyzzz) "见名知意"
 *      4. 每 "." 一次, 就代表一层文件目录
 *
 *      补充 : 同一个包下, 不能命名同名的接口 类
 *            不同的包下, 可以命名同名的接口 类
 *
 *
 * 二. import 关键字的使用
 *      import : 导入
 *      1. 在源文件中显式的使用 import 结构导入指定包下的类 接口
 *      2. 声明在 package 和 类的声明 之间
 *      3. 多个 import 语句并列书写即可
 *      4. 可以使用 "xxx.*" 的方式, 表示可以导入 xxx 包下的所有结构
 *      5. 如果使用的类或接口是 java.lang 下的,则可以省略 import 结构
 *      6. 如果使用的类或接口是 本包 下的,也可以省略 import 结构
 *      7. 如果在源文件中, 使用了不同包下的同名类, 则必须至少有一个类需要用全类名的方式显示
 *      8. 如果我们使用 "xxx.*" 的方法, 表明可以调用 xxx 包下的所有结构
 *         但是如果要使用 xxx 包子包的结构, 则仍需要显式使用 import 结构
 *
 *      9. import static : 导入指定类或接口中的静态结构 : 属性或者方法
 *
 * @author yixihan
 */
public class PackageImportTest {

    public static void main(String[] args) {

        Account account = new Account();

        // 全类名的方式显示
        com.yixihan.day1015.experiment2.Account account1 = new com.yixihan.day1015.experiment2.Account();
    }
}
```

 

#### project2



Customer

```java
package com.yixihan.project2.bean;

/**
 * 用来封装客户信息
 *
 * @author yixihan
 */
public class Customer {

    /**
     * 姓名
     */
    private String name;

    /**
     * 性别
     */
    private char gender;

    /**
     * 年龄
     */
    private int age;

    /**
     * 电话
     */
    private String phone;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 全参构造
     * @param name 姓名
     * @param gender 性别
     * @param age 年龄
     * @param phone 电话
     * @param email 邮箱
     */
    public Customer(String name, char gender, int age, String phone, String email) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.phone = phone;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "name='" + name + '\'' +
                ", gender='" + gender + '\'' +
                ", age=" + age +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
```



CustomerList

```java
package com.yixihan.project2.service;

import com.yixihan.project2.bean.Customer;

import java.util.Arrays;

/**
 * @author yixihan
 */
public class CustomerList {

    private final Customer[] customers;

    private int total;

    /**
     * 初始化 CustomerList 并动态定义 Customers
     * @param totalCustomer Customers数组的最大长度
     */
    public CustomerList(int totalCustomer) {
        customers = new Customer[totalCustomer];
    }

    /**
     * 添加客户信息
     * @param customer 客户
     * @return true : 添加成功; false : 添加失败
     */
    public boolean addCustomer(Customer customer) {

        if (total >= customers.length) {
            return false;
        } else {
            customers[total++] = customer;
            return true;
        }
    }

    /**
     * 修改指定索引位置的客户信息
     * @param index 指定索引位置
     * @param customer 客户
     * @return true : 修改成功; false : 修改失败
     */
    public boolean replaceCustomer(int index, Customer customer) {

        if (index >= total || index < 0) {
            return false;
        } else {
            customers[index] = customer;
            return true;
        }
    }

    /**
     * 删除指定索引位置的客户信息
     * @param index 指定索引位置
     * @return true : 删除成功; false : 删除失败
     */
    public boolean deleteCustomer(int index) {
        if (index >= total || index < 0) {
            return false;
        } else {
            if (total - 1 - index >= 0) {
                System.arraycopy(customers, index - 1, customers, index, total - 1 - index);
            }
            customers[--total] = null;
            return true;
        }
    }

    /**
     * 获取指定索引位置的客户信息
     * @param index 指定索引位置
     * @return 客户信息
     */
    public Customer getCustomer(int index) {
        if (index >= total || index < 0) {
            return null;
        } else {
            return customers[index];
        }
    }

    /**
     * 获取所有的客户信息
     * @return 所有的客户信息
     */
    public Customer[] getCustomers() {
        Customer[] customers = new Customer[total];
        if (total >= 0) {
            System.arraycopy(this.customers, 0, customers, 0, total);
        }
        return customers;
    }


    public int getTotal() {
        return total;
    }


    @Override
    public String toString() {
        return "CustomerList{" +
                "customers=" + Arrays.toString(customers) +
                ", total=" + total +
                '}';
    }
}
```



CustomerView

```java
package com.yixihan.project2.view;

import com.yixihan.project2.bean.Customer;
import com.yixihan.project2.service.CustomerList;
import com.yixihan.project2.util.CmUtility;

/**
 * @author yixihan
 */
public class CustomerView {

    private final CustomerList customerList = new CustomerList(100);

    public CustomerView () {
        Customer customer = new Customer("张三", '男', 23, "13212341234", "44hangman.qq.com");
        customerList.addCustomer(customer);
    }

    /**
     * 显示主菜单，响应用户输入，根据用户操作分别调用其他相应的成员方法（如addNewCustomer），以完成客户信息处理
     */
    public void enterMainMenu() {

        boolean isFlag = true;

        while (isFlag) {
            System.out.println("-----------------客户信息管理软件-----------------");
            System.out.println();
            System.out.println("                 1 添 加 客 户                   ");
            System.out.println("                 2 修 改 客 户                   ");
            System.out.println("                 3 删 除 客 户                   ");
            System.out.println("                 4 客 户 列 表                   ");
            System.out.println("                 5 退       出                   ");
            System.out.println();
            System.out.println("                 请选择(1-5): _                  ");


            char menu = CmUtility.readMenuSelection();

            switch (menu) {
                case '1' : {
                    addNewCustomer();
                    break;
                }
                case '2' : {
                    modifyCustomer();
                    break;
                }
                case '3' : {
                    deleteCustomer();
                    break;
                }
                case '4' : {
                    listAllCustomers();
                    break;
                }
                case '5' : {
                    System.out.println("确认是否退出(Y/N) : ");
                    char isExit = CmUtility.readConfirmSelection();

                    if (isExit == 'Y') {
                        isFlag = false;
                    }
                    break;
                }
                default: {
                    System.out.println("输入错误!请重新输入~");
                    break;
                }
            }

        }
    }


    /**
     * 添加客户
     */
    private void addNewCustomer() {
        System.out.println("这是是添加客户哟~");

        System.out.println("---------------------添加客户---------------------");

        System.out.println("姓名 : ");
        String name = CmUtility.readString(10);

        System.out.println("性别 : ");
        char gender = CmUtility.readChar();

        System.out.println("年龄 : ");
        int age = CmUtility.readInt();

        System.out.println("电话 : ");
        String phone = CmUtility.readString(13);

        System.out.println("邮箱 : ");
        String email = CmUtility.readString(30);

        // 将上述数据封装到对象中
        Customer customer = new Customer(name, gender, age, phone, email);

        boolean isSuccess = customerList.addCustomer(customer);
        if (isSuccess) {
            System.out.println("---------------------添加完成---------------------");
        } else {
            System.out.println("---------------------添加失败---------------------");
        }

    }


    /**
     * 修改客户
     */
    private void modifyCustomer() {
        System.out.println("这是是修改客户哟~");
        int number;
        while (true) {
            System.out.println("请选择待修改客户编号(-1退出) : ");

            number = CmUtility.readInt();
            if (number == -1) {
                return;
            } else if (customerList.getCustomer(number - 1) == null) {
                System.out.println("无法找到指定的客户,请重新输入~");
            } else {
                break;
            }
        }

        int index = number - 1;

        Customer customer = customerList.getCustomer(index);
        System.out.println("姓名(" + customer.getName() + ")：");
        customer.setName(CmUtility.readString(10, customer.getName()));

        System.out.println("性别(" + customer.getGender() + ")：");
        customer.setGender(CmUtility.readChar(customer.getGender()));

        System.out.println("年龄(" + customer.getAge() + ")：");
        customer.setAge(CmUtility.readInt(customer.getAge()));

        System.out.println("电话(" + customer.getPhone() + ")：");
        customer.setPhone(CmUtility.readString(11,customer.getPhone()));

        System.out.println("邮箱(" + customer.getEmail() + ")：");
        customer.setEmail(CmUtility.readString(30,customer.getEmail()));

        boolean replace = customerList.replaceCustomer(index, customer);
        if (replace) {
            System.out.println("---------------------修改完成---------------------");
        } else {
            System.out.println("---------------------修改失败---------------------");
        }


    }


    /**
     * 删除客户
     */
    private void deleteCustomer() {
        System.out.println("这是是删除客户哟~");
        System.out.println("---------------------删除客户---------------------");

        System.out.println("请选择待删除客户编号(-1退出) : ");
        int index = CmUtility.readInt();

        System.out.println("确认是否删除(Y/N) : ");
        char isDeleted = CmUtility.readConfirmSelection();

        char y = 'Y';
        if (isDeleted == y) {
            boolean b = customerList.deleteCustomer(index - 1);

            if (b) {
                System.out.println("---------------------删除完成---------------------");
            } else {
                System.out.println("---------------------删除失败---------------------");
            }
        }


    }


    /**
     * 客户列表
     */
    private void listAllCustomers() {
        System.out.println("这是是客户列表哟~");

        System.out.println("---------------------------客户列表---------------------------");
        System.out.println("编号\t姓名\t性别\t年龄\t电话\t\t\t邮箱");

        if (customerList.getTotal() != 0) {

            Customer[] customers = customerList.getCustomers();
            int i = 1;
            for (Customer customer : customers) {

                System.out.println(i + "\t\t" + customer.getName() + "\t" + customer.getGender() + "\t\t" +
                        customer.getAge() + "\t\t" + customer.getPhone() + "\t\t" + customer.getEmail());

                i++;
            }
        } else {
            System.out.println("没有客户记录哦~");
        }
        System.out.println("-------------------------客户列表完成-------------------------");

    }


    /**
     * main方法
     */
    public static void main(String[] args) {

        CustomerView customerView = new CustomerView();

        customerView.enterMainMenu();
    }



}
```



CmUtility

```java
package com.yixihan.project2.util;

import java.util.*;
/**
 * CMUtility工具类：
 * 将不同的功能封装为方法，就是可以直接通过调用方法使用它的功能，而无需考虑具体的功能实现细节。
 * @author yixihan
 */
public class CmUtility {

    private static final Scanner SCANNER = new Scanner(System.in);

    /**
     用于界面菜单的选择。该方法读取键盘，如果用户键入’1’-’5’中的任意字符，则方法返回。返回值为用户键入字符。
     */
    public static char readMenuSelection() {
        char c;
        for (; ; ) {
            String str = readKeyBoard(1, false);
            c = str.charAt(0);
            if (c != '1' && c != '2' &&
                    c != '3' && c != '4' && c != '5') {
                System.out.print("选择错误，请重新输入：");
            } else {
                break;
            }
        }
        return c;
    }
    /**
     从键盘读取一个字符，并将其作为方法的返回值。
     */
    public static char readChar() {
        String str = readKeyBoard(1, false);
        return str.charAt(0);
    }
    /**
     从键盘读取一个字符，并将其作为方法的返回值。
     如果用户不输入字符而直接回车，方法将以defaultValue 作为返回值。
     */
    public static char readChar(char defaultValue) {
        String str = readKeyBoard(1, true);
        return (str.length() == 0) ? defaultValue : str.charAt(0);
    }
    /**
     从键盘读取一个长度不超过2位的整数，并将其作为方法的返回值。
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
     从键盘读取一个长度不超过2位的整数，并将其作为方法的返回值。
     如果用户不输入字符而直接回车，方法将以defaultValue 作为返回值。
     */
    public static int readInt(int defaultValue) {
        int n;
        for (; ; ) {
            String str = readKeyBoard(2, true);
            if ("".equals(str)) {
                return defaultValue;
            }

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
     从键盘读取一个长度不超过limit的字符串，并将其作为方法的返回值。
     */
    public static String readString(int limit) {
        return readKeyBoard(limit, false);
    }
    /**
     从键盘读取一个长度不超过limit的字符串，并将其作为方法的返回值。
     如果用户不输入字符而直接回车，方法将以defaultValue 作为返回值。
     */
    public static String readString(int limit, String defaultValue) {
        String str = readKeyBoard(limit, true);
        return "".equals(str)? defaultValue : str;
    }
    /**
     用于确认选择的输入。该方法从键盘读取‘Y’或’N’，并将其作为方法的返回值。
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

        while (SCANNER.hasNextLine()) {
            line = SCANNER.nextLine();
            if (line.length() == 0) {
                if (blankReturn) {
                    return line;
                } else {
                    continue;
                }
            }

            if (line.length() > limit) {
                System.out.print("输入长度（不大于" + limit + "）错误，请重新输入：");
                continue;
            }
            break;
        }

        return line;
    }
}
```



> 项目简图

![image-20211015215932119](/assets/imgs/JavaSE.assets/image-20211015215932119.png)

