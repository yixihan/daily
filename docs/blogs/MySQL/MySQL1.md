---
title: MySQL1
date: 2022-03-09
tags:
 - MySQL
categories:
 - MySQL
---
# MySQL


## 数据库简介



> DB

数据库（database）：存储数据的“仓库”。它保存了一系列有组织的数据



> DBMS

数据库管理系统（Database Management System）。数据库是通过DBMS创 建和操作的容器



> SQL

结构化查询语言（Structure Query Language）：专门用来与数据库通信的语言。



> SQL的优点：

1.  不是某个特定数据库供应商专有的语言,几乎所有 DBMS都支持SQL 
2.  简单易学 
3.  虽然简单,但实际上是一种强有力的语言,灵活使 用其语言元素,可以进行非常复杂和高级的数据库操作。



> DML（Data Manipulation Language) :

数据操纵语句,用于添 加、删除、修改、查询数据库记录,并检查数据完整性



> DDL（Data Definition Language) :

数据定义语句,用于库和 表的创建、修改、删除



> DCL（Data Control Language) :

数据控制语句,用于定义用 户的访问权限和安全级别



### DML



DML用于查询与修改数据记录,包括如下SQL语句：

- INSERT：添加数据到数据库中
- UPDATE：修改数据库中的数据
- DELETE：删除数据库中的数据
- ==SELECT：选择（查询）数据==
    - SELECT是SQL语言的基础,最为重要。



### DDL



DDL用于定义数据库的结构,比如创建、修改或删除 数据库对象,包括如下SQL语句：

- CREATE TABLE：创建数据库表
- ALTER TABLE：更改表结构、添加、删除、修改列长度
- DROP TABLE：删除表
- CREATE INDEX：在表上建立索引
- DROP INDEX：删除索引



### DCL



DCL用来控制数据库的访问,包括如下SQL语句：

- GRANT：授予访问权限
- REVOKE：撤销访问权限
- COMMIT：提交事务处理
- ROLLBACK：事务处理回退
- SAVEPOINT：设置保存点
- LOCK：对数据库的特定部分进行锁定



## MySQL安装



>   window

5.x版本, 看视频 6-8

8.x版本, ...



>   linux

## MySQL基本使用



```sql
# 1. 查看当前所有的数据库
show databases;
# 2. 打开指定的库
use 库名
# 3. 查看当前库的所有表
show tables;
# 4. 查看其它库的所有表
show tables from 库名;
# 5. 创建表
create table 表名(

	列名 列类型,
	列名 列类型,
	。。。
);
# 6. 查看表结构
desc 表名;

# 7. 查看服务器的版本
# 方式一：登录到mysql服务端
select version();
# 方式二：没有登录到mysql服务端
mysql --version
# 或
mysql --V

# 7. 启动 mysql 服务
net start 服务名

# 8. 停止 mysql 服务
net stop 服务名

# 9. 登录 mysql
mysql -h 主机名 -P 端口号 -u 用户名 -p密码

# 10. 退出 mysql
exit
# 或者
ctrl + c
```



### MySQL的语法规范



1.  不区分大小写,但建议关键字大写,表名、列名小写
2.  每条命令最好用分号结尾
3.  每条命令根据需要,可以进行缩进 或换行
4.  注释
      		单行注释：#注释文字
      		单行注释：-- 注释文字
      		多行注释：/* 注释文字  */







## DQL语言的学习



### 进阶一：基础查询



> 语法

```sql
select 
	查询列表 
from 
	表名;
```





> 特点

- 查询列表可以是字段、常量、表达式、函数，也可以是多个
- 查询结果是一个虚拟表



> 示例

- 查询单个字段

    `select 字段名 from 表名;`

- 查询多个字段

    `select 字段名，字段名 from 表名;`

- 查询所有字段

    `select * from 表名;`

- 查询常量

    `select 常量值;`

    注意：字符型和日期型的常量值必须用单引号引起来，数值型不需要

- 查询函数

    `select 函数名(实参列表);`

- 查询表达式

    `select 100/1234;`

- 起别名

    - as
    - 空格

- 去重

    `select distinct 字段名 from 表名;`

- +

    作用：做加法运算

    `select 数值+数值;`

     直接运算

    `select 字符+数值;`

    先试图将字符转换成数值，如果转换成功，则继续运算；否则转换成0，再做运算

    `select null+值;`

- [补充]concat函数

    功能：拼接字符

    `select concat(字符1，字符2，字符3,...);`

- [补充]ifnull函数

    功能：判断某字段或表达式是否为null，如果为null 返回指定的值，否则返回原本的值

    `select ifnull(commission_pct,0) from employees;`

- [补充]isnull函数

    功能：判断某字段或表达式是否为null，如果是，则返回1，否则返回0



#### 代码

```sql
# 进阶一 : 基础查询
/*
SELECT 查询列表
FROM 表名;

特点 : 
	1. 查询列表可以是 : 表中的字段 常量值 表达式 函数
	2. 查询的结果是一个虚拟的表格

*/

# 1. 查询表中的单个字段
SELECT
	last_name 
FROM
	employees;
	
# 2. 查询表中的多个字段
SELECT
	last_name,
	salary,
	email 
FROM
	employees;
	
# 3. 查询表中的所有字段
# 方式一
SELECT
	* 
FROM
	employees;

# 方式二
SELECT
	employees.employee_id,
	employees.first_name,
	employees.last_name,
	employees.email,
	employees.phone_number,
	employees.job_id,
	employees.salary,
	employees.commission_pct,
	employees.manager_id,
	employees.department_id,
	employees.hiredate 
FROM
	employees;
	
# 4. 查询常量值
SELECT
	100;
SELECT
	'john';
	
# 5. 查询表达式
SELECT
	100 % 98;
	
# 6. 查询函数
SELECT
	VERSION();
	
# 7. 起别名
/*
	好处 : 
		1. 便于理解
		2. 如果要查询的字段有重名的情况, 使用别名可以区分开来
	*/# 方式一
SELECT
	100 % 98 AS 结果;
SELECT
	last_name AS 性,
	first_name AS 名 
FROM
	employees;
	
# 方式二
SELECT
	last_name 性,
	first_name 名 
FROM
	employees;
	
# 案例 : 查询 salary, 显示结果为 out put
SELECT
	salary AS "out put" 
FROM
	employees;
	
# 8.去重
# 案例 : 查询员工表中涉及到的所有的部门编号
SELECT DISTINCT
	department_id 
FROM
	employees 
	
# 9. + 号的作用
/*
java 中的 + 号
	1. 运算符, 两个操作数都为数值型
	2. 连接符, 只要有一个操作数为字符串
	
MySQL 中的 + 号
	仅仅只有一个功能 : 运算符
	
	SELECT 100 + 90; 两个操作数都为数值型, 则做加法运算
	SELECT '123' + 90; 其中一方为字符型, 试图将字符型数值转换成数值型
												如果转换成功, 则继续做加法运算
	SELECT 'john' + 90;		如果转换失败, 则将字符型数值转换成 0
	
	SELECT	null + 90; 只要其中一方为 null, 则结构肯定为 null												

*/
SELECT
	100 + 90;
SELECT
	'123' + 90;
SELECT
	'john' + 90;
SELECT NULL
	+ 90;
	
# 案例 : 查询员工名和性连接成为一个字段, 并显示为 姓名
SELECT
	CONCAT(last_name, first_name) 
FROM
	employees;
	
```



#### 练习



```sql
# 练习
# 1. 下面的语句是否可以执行成功
SELECT
	last_name,
	job_id,
	salary AS sal 
FROM
	employees;
	
# 2. 下面的语句是否可以执行成功
SELECT
	* 
FROM
	employees;
	
# 3. 找出下面语句中的错误
SELECT
	employee_id,
	last_name,
	salary * "ANNUAL SALARY" 
FROM
	employees;
	
# 4. 显示表 departments 的结构,并查询其中的全部数据
DESC departments;

# 5. 显示出表 employees 中的全部 job_id（不能重复）
SELECT DISTINCT
	job_id 
FROM
	employees;
	
# 6. 显示出表 employees 的全部列,各个列之间用逗号连接,列头显示成 OUT_PUT
SELECT
	CONCAT(
		employees.employee_id,
		',',
		employees.first_name,
		',',
		employees.last_name,
		',',
	IFNULL( employees.commission_pct, 0 )) 
FROM
	employees;
```



#### 补充

```sql
# 8. 去重
select distinct 字段名 from 表名;

# 9. + 作用：做加法运算
select 数值+数值; 直接运算
select 字符+数值;先试图将字符转换成数值,如果转换成功,则继续运算；否则转换成0,再做运算
select null+值;结果都为null

# 10.[补充]concat函数 功能：拼接字符
select concat(字符1,字符2,字符3,...);

# 11.[补充]ifnull函数 功能：判断某字段或表达式是否为null,如果为null 返回指定的值,否则返回原本的值
select ifnull(commission_pct,0) from employees;

# 12.[补充]isnull函数 功能 : 判断某字段或表达式是否为null,如果是,则返回1,否则返回0
SELECT
	ISNULL( commission_pct ),
	commission_pct 
FROM
	employees
```





### 进阶二 : 条件查询



> 语法

```sql
select 
	查询列表 
from 
	表名 
where 
	筛选条件;
```





> 筛选条件的分类

- 简单条件运算符

    `> < = <> != >= <=  <=> (安全等于)`

- 逻辑运算符

    `&& and`

    `|| or`

    `!  not`

- 模糊查询

    like:一般搭配通配符使用，可以判断字符型或数值型
    通配符：%任意多个字符，_任意单个字符

    between and
    in
    is null /is not null：用于判断null值



#### is null vs <=>



		普通类型的数值		null值		可读性
is null		×								√				√
<=>			√								√				×



#### 代码



```sql
# 进阶 2 : 条件查询
/*
语法 : 
	
	SELECT
	查询列表
	FROM
	表名
	WHERE
	筛选条件;
	
分类 : 
		1. 按条件表达式筛选
			条件运算符 : > < = !=(<>) >= <=
			
		2. 按逻辑表达式筛选	
			逻辑运算符 : 
				&& || !
				and or not
				
				&& 和 and : 两个条件都为 true, 结果为 true, 反之为 false
				|| 和 or : 只要有一个条件为 true, 结果为 true, 反之为 false
				! 和 not : 如果连接的条件本身为 false, 结果为 true, 反之为 false
				
		3. 模糊查询
					like
					between and
					in
					is null
					
*/

# 一. 按条件表达式筛选
# 案例一 : 查询 工资 > 10000 的员工
SELECT
	* 
FROM
	employees 
WHERE
	salary > 10000;
	
# 案例二 : 查询部门编号不等于 90 号的员工名和部门
SELECT
	employees.last_name,
	employees.department_id 
FROM
	employees 
WHERE
	employees.department_id <> 90;
	
# 二. 按逻辑表达式筛选
# 案例一 : 查询工资在 1w 到 2w 之间的员工名, 工资, 奖金
SELECT
	employees.last_name,
	employees.salary,
	employees.commission_pct 
FROM
	employees 
WHERE
	employees.salary >= 10000 
	AND employees.salary <= 20000; 
	
# 案例二 : 查询部门编号不是在 90 - 110之间, 或者工资高于 1.5w 的员工信息
SELECT * FROM employees WHERE employees.department_id < 90 OR employees.department_id > 110 OR employees.salary > 15000;
SELECT
	* 
FROM
	employees 
WHERE
	NOT ( employees.department_id >= 90 AND employees.department_id <= 110 ) 
	OR employees.salary > 15000;
	
# 三. 模糊插叙
/*
like
BETWEEN and
in
in null | is not null
*/

# 1. LIKE
/*
特点 : 
		1. 一般和通配符搭配使用
			通配符 : 
				% 任意多个字符, 包含 0 个字符
				_ 任意单个字符
		2. 可以判断字符型或数值型		
*/

# 案例一 : 查询员工名中包含字符a的员工信息
SELECT
	* 
FROM
	employees 
WHERE
	employees.last_name LIKE '%a%';
	
# 案例二 : 查询员工名中, 第三个字符为 n 的, 第五个字符为 l 的员工名和工资
SELECT
	employees.last_name,
	employees.salary 
FROM
	employees 
WHERE
	employees.last_name LIKE '__n_l%';
	
# 案例三 : 查询员工名中第二个字符为_的员工名
SELECT
	employees.last_name 
FROM
	employees 
WHERE
	employees.last_name LIKE '_\_%';
SELECT
	employees.last_name 
FROM
	employees 
WHERE
	employees.last_name LIKE '_$_%' ESCAPE '$';
	
# 2. BETWEEN AND
/*

1. 使用 BETWEEN AND 可以提高语句的简洁度
2. 包含临界值
3. 两个临界值不要调换顺序
*/

# 案例一 : 查询员工编号在 100 - 120 之间的员工信息
SELECT
	* 
FROM
	employees 
WHERE
	employees.employee_id BETWEEN 100 
	AND 120;# 3. IN
/*
用于去判断某字段的值是否属于 in 列表中的某一项
特点 : 
	1. 使用 in 提高语句简洁度
	2. in 列表的值类型必须一致或者兼容
			'123' 123
	3. in 里面不支持通配符		
*/

# 案例一 : 查询员工的工种编号是 AD_PRES, AD_VP 中的一个员工名和工种编号
SELECT
	employees.last_name,
	employees.job_id 
FROM
	employees 
WHERE
	employees.job_id IN ( 'AD_PRES', 'AD_VP' );# 4. is null 和 is not null
/*
= 或者 <> 不能用于判断 null 值
is null 或者 is not null 可以用于判断 null 值
*/

# 案例一 : 查询没有奖金的员工名和奖金率
SELECT
	employees.last_name,
	employees.commission_pct 
FROM
	employees 
WHERE
	employees.commission_pct IS NULL;
SELECT
	employees.last_name,
	employees.commission_pct 
FROM
	employees 
WHERE
	employees.commission_pct IS NOT NULL;
	
# 安全等于 : <=>
# 案例一 : 查询没有奖金的员工名和奖金率
SELECT
	employees.last_name,
	employees.commission_pct 
FROM
	employees 
WHERE
	employees.commission_pct <=> NULL;
	
# 案例二 : 查询工资为 12000 的员工信息
SELECT
	employees.last_name,
	employees.salary 
FROM
	employees 
WHERE
	employees.salary <=> 12000;
	
# is null vs <=>
/* 
is null : 仅仅可以判断 null 值, 可读性较高, 建议使用
<=> : 既可以判断 null 值, 又可以判断普通的数值, 可读性较低
*/

```



#### 练习

```sql
# 1. 查询工资大于 12000 的员工姓名和工资
SELECT
	employees.last_name,
	employees.salary 
FROM
	employees 
WHERE
	employees.salary > 12000;
	
# 2. 查询员工号为 176 的员工的姓名和部门号和年薪
SELECT
	employees.last_name,
	employees.department_id,
	employees.salary * 12 * (
	1 + IFNULL( employees.commission_pct, 0 )) AS 年薪 
FROM
	employees 
WHERE
	employees.employee_id = 176;
	
# 3. 选择工资不在 5000 到 12000 的员工的姓名和工资
SELECT
	employees.last_name,
	employees.salary 
FROM
	employees 
WHERE
	employees.salary BETWEEN 5000 
	AND 12000;
	
# 4. 选择在 20 或 50 号部门工作的员工姓名和部门号
SELECT
	employees.last_name,
	employees.department_id 
FROM
	employees 
WHERE
	employees.department_id BETWEEN 20 
	AND 50;
	
# 5. 选择公司中没有管理者的员工姓名及 job_id
SELECT
	employees.last_name,
	employees.job_id 
FROM
	employees 
WHERE
	employees.manager_id IS NULL;
	
# 6. 选择公司中有奖金的员工姓名,工资和奖金级别
SELECT
	employees.last_name,
	employees.salary,
	employees.commission_pct 
FROM
	employees 
WHERE
	employees.commission_pct IS NOT NULL;
	
# 7. 选择员工姓名的第三个字母是 a 的员工姓名
SELECT
	* 
FROM
	employees 
WHERE
	employees.last_name LIKE '__a%';
	
# 8. 选择姓名中有字母 a 和 e 的员工姓名
SELECT
	* 
FROM
	employees 
WHERE
	employees.last_name LIKE '%a%e%' 
	OR employees.last_name LIKE '%e%a%';
	
# 9. 显示出表 employees 表中 first_name 以 'e'结尾的员工信息
SELECT
	* 
FROM
	employees 
WHERE
	employees.first_name LIKE '%e';
	
# 10. 显示出表 employees 部门编号在 80-100 之间 的姓名、职位
SELECT
	employees.last_name,
	employees.job_id 
FROM
	employees 
WHERE
	employees.department_id BETWEEN 80 
	AND 100;
	
# 11. 显示出表 employees 的 manager_id 是 100,101,110 的员工姓名、职位
SELECT
	employees.last_name,
	employees.job_id 
FROM
	employees 
WHERE
	employees.manager_id IN ( 100, 101, 110 );
	
# 查询 	employees 表中, job_id 不为 "IT" 或者 工资 为 12000 的员工信息
SELECT
	* 
FROM
	employees 
WHERE
	job_id <> 'IT' 
	OR salary = 12000;
	
# 查看部门 departments 表的结构
DESC departments;

# 查询部门 departments 表中涉及到了哪些位置编号
SELECT DISTINCT
	location_id 
FROM
	departments;
	
# 面试题
SELECT
	* 
FROM
	employees;
SELECT
	* 
FROM
	employees 
WHERE
	commission_pct LIKE "%%" 
	AND last_name LIKE "%%";	

# 不一样, 改成 or 并且所有字段都写了结果就一样了
```









### 进阶三 : 排序查询



> 语法

```sql
select
	查询列表
from
	表
where
	筛选条件
order by
	排序列表 [ASC | DESC];
```



> 特点

- ASC : 升序

    DESC : 降序

    如果不写, 默认升序

- 排序列表支持 单个字段 多个字段 函数 表达式 别名

- order by 的位置一般放在查询语句的最后 (除 limit 语句之外)



#### 代码



```sql
# 进阶3 : 排序查询

/*
语法：
select 查询列表
from 表名
[where  筛选条件]
order by 排序的字段或表达式;


特点：
1. asc代表的是升序, 可以省略
   desc代表的是降序

2. order by子句可以支持 单个字段 别名 表达式 函数 多个字段

3. order by子句在查询语句的最后面, 除了limit子句

*/

# 案例一 : 查询员工信息, 要求工资从高到低排序
SELECT
	* 
FROM
	employees 
ORDER BY
	salary DESC;
	
SELECT
	* 
FROM
	employees 
ORDER BY
	salary;	
	
# 2. 添加筛选条件再排序
# 案例二 : 查询部门编号 >= 90 的员工信息, 并按员工编号降序
SELECT
	* 
FROM
	employees 
WHERE
	department_id >= 90 
ORDER BY
	employee_id DESC;

# 3. 按表达式排序
# 案例三 : 查询员工信息 按年薪降序 [按表达式排序]
SELECT
	*,
	salary * 12 * (1 + IFNULL(commission_pct, 0)) 年薪
FROM
	employees 
ORDER BY
	salary * 12 *(
	1+IFNULL ( commission_pct, 0 )) DESC;
	
# 案例四 : 	查询员工信息 按年薪降序 [按别名排序]
SELECT
	*,
	salary * 12 * (1 + IFNULL(commission_pct, 0)) 年薪
FROM
	employees 
ORDER BY
	年薪 DESC;
	
# 案例五 : 按姓名的长度显示员工的姓名和工资 [按函数排序]
SELECT
	LENGTH(employees.last_name) 字节长度,
	employees.last_name,
	employees.salary
FROM
	employees
ORDER BY
	字节长度 DESC;
	
# 案例六 : 查询员工信息, 要求先按工资升序, 再按员工编号降序 [按多个字段排序]
SELECT
	*
FROM
	employees
ORDER BY
	employees.salary, employees.employee_id DESC;
```



#### 练习

```sql
# 1. 查询员工的姓名和部门号和年薪，按年薪降序 按姓名升序
SELECT
	employees.last_name,
	employees.department_id,
	employees.salary * 12 * (1 + IFNULL(employees.commission_pct, 0)) AS 年薪
FROM
	employees
ORDER BY 
	年薪 DESC, employees.last_name;

# 2. 选择工资不在 8000 到 17000 的员工的姓名和工资，按工资降序
SELECT
	employees.last_name,
	employees.salary
FROM
	employees
WHERE
	employees.salary NOT BETWEEN 8000 AND 17000
ORDER BY
	employees.salary DESC;


# 3. 查询邮箱中包含 e 的员工信息，并先按邮箱的字节数降序，再按部门号升序
SELECT
	*
FROM
	employees
WHERE
	employees.email LIKE '%e%'
ORDER BY
	LENGTH(employees.email) DESC, employees.department_id;
	

```



### 进阶四 : 常见函数



#### 概念



> 概述

功能：类似于java中的方法
		好处：提高重用性和隐藏实现细节
	

> 调用

```sql
select 函数名(实参列表);
```



```sql
# 进阶四 : 常见函数

/*
概念 : 类似于 Java 的方法, 将一组逻辑语句封装在方法体中, 对外暴露方法名

好处 : 
	1. 隐藏了实现细节
	2. 提高代码的重用性
	
调用 : 
	SELECT 
		函数名(实参列表)
	[FROM 表名]
	
	
特点 :	
	1. 叫什么 (函数名)
	2. 干什么 (函数功能)
	
分裂 :
	1. 单行函数
		如 CONCAT(str1,str2,...), LENGTH(str), IFNULL(expr1,expr2) ...
		
	2. 分组函数 
		功能 : 做统计使用, 又称为 统计函数, 聚合函数, 组函数
		

单行函数 : 
	1. 字符函数
	
	2. 数学函数
	
	3. 日期函数
	
	4. 其他函数 [补充]
	
	4. 流程控制函数 [补充]
	
常见函数 : 
	字符函数 : 
		LENGTH(str)
		CONCAT(str1,str2,...)
		SUBSTR(str,pos) | SUBSTR(str FROM pos FOR len) | SUBSTRING(str FROM pos) | SUBSTRING(str,pos,len)
		INSTR(str,substr)
		TRIM([remstr FROM] str) | TRIM([{BOTH | LEADING | TRAILING} [remstr] FROM] str)
		UPPER(str)
		LOWER(str)
		LPAD(str,len,padstr)
		RPAD(str,len,padstr)
		REPLACE(str,from_str,to_str)
	数学函数 :
		ROUND(X) | ROUND(X,D)
		CEIL(X)
		FLOOR(X)
		TRUNCATE(X,D)
		MOD(N,M)
	日期函数 : 
		NOW()
		CURDATE()
		CURTIME()
		YEAR(date)
		MONTH(date)
		DAY(date)
		HOUR(time)
		MINUTE(time)
		SECOND(time)
		STR_TO_DATE(str,format)
		DATE_FORMAT(date,format)
	其他函数 : 
		VERSION()
		DATABASE()
		USER()
	流程控制函数 : 
		IF(expr1,expr2,expr3)
		CASE	
*/
```



#### 单行函数



##### 字符函数



```sql
concat : 连接
substr : 截取子串
upper : 变大写
lower : 变小写
replace : 替换
length : 获取 字节 长度 (汉子占三个字节)
trim : 去前后空格
lpad : 左填充
rpad : 右填充
instr : 获取字段第一次出现的索引(从 1 开始, 找不到返回 0 )
```



```sql
# 一. 字符函数

# 1. LENGTH(str) : 获取参数值的字节个数
SELECT LENGTH('yixihan');
SELECT LENGTH('易曦翰');

# 查看 mysql 的编码格式
SHOW VARIABLES LIKE '%char%';

# 2. CONCAT(str1,str2,...) : 拼接字符串
SELECT
	CONCAT(employees.last_name,'_',employees.first_name) 姓名
FROM
	employees;
	
# 3. UPPER(str) | LOWER(str)
SELECT UPPER('john');	
SELECT LOWER('JOHN');	

# 案例一 : 将姓变大写, 名变小写, 然后拼接
SELECT
	CONCAT(UPPER(employees.last_name),'_', LOWER(employees.first_name))
FROM
	employees;
	
#3. SUBSTR(str FROM pos FOR len) | SUBSTRING(str FROM pos) | SUBSTR(str,pos) | SUBSTRING(str,pos,len) 
# 注意 : 索引从 1 开始

# 截取从指定索引处后面所有字符
SELECT SUBSTR('李莫愁爱上了陆展元',7) out_put;

# 截取从指定索引处截取指定字符长度的字符
SELECT SUBSTR('李莫愁爱上了陆展元', 1, 3) out_put;

# 案例二 : 姓名中首字符大写, 其他字符小写, 然后用 '_' 拼接, 显示出来
SELECT
	CONCAT(SUBSTR(employees.last_name, 1, 1),'_',SUBSTR(employees.last_name, 2))
FROM
	employees;
	
# 5. INSTR(str,substr) 返回 substr 子串在 str 里面首次出现的索引, 如果找不到, 返回 0
SELECT INSTR('杨不悔爱上了殷六侠','殷六侠') out_put;

# 6. TRIM([remstr FROM] str) | TRIM([{BOTH | LEADING | TRAILING} [remstr] FROM] str)
SELECT	LENGTH(TRIM('     张翠山      ')) AS out_put;
SELECT	TRIM('a' FROM 'aaaaaaaaaaaaaaa张aaaaaaaaaaaa翠山aaaaaaaaaaaaaaaaaaaaaa') AS out_put;

# 7. LPAD(str,len,padstr) : 用指定的字符实现左填充指定长度, 若原本长度已够, 则会从右边开始截断
SELECT LPAD('殷素素',10,'*') out_put ;
SELECT LPAD('殷素素',2,'*') out_put ;

# 8. RPAD(str,len,padstr) : 用指定的字符实现右填充指定长度, 若原本长度已够, 则会从右边开始截断
SELECT RPAD('殷素素',10,'ab') out_put ;
SELECT RPAD('殷素素',2,'ab') out_put ;

# 9. REPLACE(str,from_str,to_str) : 替换
SELECT REPLACE('张无忌爱上了周芷若','周芷若','赵敏') AS out_put;
SELECT REPLACE('周芷若爱上了周芷若','周芷若','赵敏') AS out_put;

```



##### 数学函数



```sql
ceil : 向上取整
floor : 向下取整
round : 四舍五入
mod : 取模
truncate : 截断
rand : 获取随机数, 返回 0 - 1 之间的小数
```



```sql
# 二. 数学函数

# 1. ROUND(X) | ROUND(X,D) : 四舍五入
SELECT ROUND(43.98);
SELECT ROUND(-43.58);
SELECT ROUND(43.58573, 2);

# 2. CEIL(X) : 返回大于等于该参数的最小整数
SELECT CEIL(1.25);
SELECT CEIL(1.95);
SELECT CEIL(1.00);
SELECT CEIL(-1.20);

# 3. FLOOR(X) : 返回小于等于该参数的最大整数
SELECT FLOOR(1.25);
SELECT FLOOR(1.95);
SELECT FLOOR(1.00);
SELECT FLOOR(-1.20);

# 4. TRUNCATE(X,D) : 截断
SELECT TRUNCATE(1.685,2);

# 5. MOD(N,M) : 取余 被除数如果为正, 结果为正, 被除数如果为负, 结果为负
/*
MOD(N,M) : a - a / b * b
*/
SELECT MOD(-3,2);
SELECT MOD(3,-2);
SELECT MOD(10,3);
```



##### 日期函数



```sql
now : 返回当前日期 + 时间
curdate : 返回当前日期
curtime : 返回当前时间
year : 返回年
month : 返回月
day : 返回天
hour : 返回小时
minute : 返回分钟
second : 返回秒

str_to_date : 将字符串转换为日期
date_format : 将日期转换为字符串

datediff : 返回两个日期相差的天数
monthname : 以英文方式返回月
```





![image-20211031150030575](/assets/imgs/MySQL基础.assets/image-20211031150030575.png)



```sql
# 三. 日期函数

# 1. NOW() : 返回当前系统日期 + 时间
SELECT NOW();

# 2. CURDATE() : 返回当前系统日期, 不包含时间
SELECT CURDATE();

# 3. CURTIME() : 返回当前系统时间, 不包含日期
SELECT CURTIME();

# 4. 可以获取指定的部分, 年 月 日 小时, 分钟, 秒
SELECT YEAR(NOW());

SELECT MONTH(NOW());

SELECT MONTHNAME(NOW());

SELECT 
	DAY(hiredate)
FROM 
	employees;
	
# 5. STR_TO_DATE(str,format) : 将日期格式的字符转换成指定个数的日期
SELECT STR_TO_DATE('2021-10-31','%Y年%m月%d日');

# 案例一 : 查询入职日期为 1992-4-3 的员工信息
SELECT
	*
FROM
	employees
WHERE
	hiredate = STR_TO_DATE('4-3 1992','%m-%d %Y');

# 6. DATE_FORMAT(date,format) : 将日期转换成字符
SELECT DATE_FORMAT('2021-10-31','%Y-%m-%d');

# 案例二 : 查询有奖金的员工名和入职日期 (xx月/xx日 xx年)
SELECT
	employees.last_name,
	DATE_FORMAT(employees.hiredate,'%m月/%d日 %Y年')
FROM
	employees
WHERE
	employees.commission_pct IS NOT NULL;

```



##### 其它函数



```sql
version : 当前数据库服务器的版本
database :打开当前的数据库
user : 当前用户
password('字符') : 返回该字符的密码形式(加密)
md5('字符') : 以 md5 方式加密该字符
```



```sql
# 四. 其它函数

SELECT VERSION();

SELECT DATABASE();

SELECT USER();

# password
SELECT
	PASSWORD('0815'),
	MD5('123')	
```



##### 流程控制函数



```sql
if(条件表达式, 表达式 1, 表达式 2) : 如果条件表达式成立, 则返回表达式 1, 否则返回表达式 2

case 情况 1
case 变量或者表达式或者字段
when 常量 then 值 1
when 常量 then 值 2
...
else 值 n
end

case 情况 2
case
when 条件 1 then 值 1
when 条件 2 then 值 2
...
else 值 n
end
```



```sql
# 五. 流程控制函数

# 1. IF(expr1,expr2,expr3) 函数 : if else 的效果

SELECT IF(10 > 5,'大','小');

SELECT
	employees.last_name,
	employees.commission_pct,
	IF(employees.commission_pct IS NULL,'没奖金','有奖金')
FROM
	employees	
	
# 2. case 函数的使用一 : switch case 的效果
/*
Java 中
switch (变量或者表达式) {
	case 常量 1 : 语句 1; break;
	case 常量 2 : 语句 2; break;
	case 常量 3 : 语句 3; break;
	...
	default : 语句 n; break;


mysql 中
case 要判断的字段或者表达式
when 常量 1 then 要显示的值 1 或语句 1;
when 常量 2 then 要显示的值 2 或语句 2;
when 常量 3 then 要显示的值 3 或语句 3;
...
else 要显示的值 n 或语句 n;
end

*/	

/*
案例一 : 查询员工的工资, 要求
部门号 = 30, 显示的工资为1.1倍;
部门号 = 40, 显示的工资为1.2倍;
部门号 = 50, 显示的工资为1.3倍;
其他部门号, 显示原工资;
*/
SELECT
	employees.department_id,
	employees.salary 原始工资,
CASE
		employees.department_id 
		WHEN 30 THEN
		employees.salary * 1.1 
		WHEN 40 THEN
		employees.salary * 1.2 
		WHEN 50 THEN
		employees.salary * 1.3 ELSE employees.salary 
	END AS 新工资 
FROM
	employees;
	
	
#  3. case 函数的使用二 : 类似于 多重 if
/*
Java 中
if (条件一) {
	语句一;
} else if (条件二) {
	语句二;
} else if (条件二) {
	语句三;
}
...
else {
	语句 n ;
}

mysql 中
case
when 条件一 then 要显示的值 1 或语句 1;
when 条件二 then 要显示的值 2 或语句 2;
when 条件三 then 要显示的值 3 或语句 3;
...
else 要显示的值 n 或语句 n;
end
*/	
	
# 案例 : 查询员工的工资情况
/*
如果工资大于 2w, 显示 A 级别	
如果工资大于 1.5w, 显示 B 级别	
如果工资大于 1w, 显示 C 级别	
否则, 显示 D 级别
*/	

SELECT
	employees.salary,
CASE
		
		WHEN employees.salary > 20000 THEN
		'A' 
		WHEN employees.salary > 15000 THEN
		'B' 
		WHEN employees.salary > 10000 THEN
		'C' ELSE 'D' 
	END AS 工资级别 
FROM
	employees;

```



##### 练习

```sql
# 1. 显示系统时间(注：日期+时间)
SELECT NOW();

# 2. 查询员工号，姓名，工资，以及工资提高百分之 20%后的结果（new salary）
SELECT
	employees.employee_id,
	employees.last_name,
	employees.salary AS 原工资,
	employees.salary * 1.2 AS 现工资
FROM
	employees;

# 3. 将员工的姓名按首字母排序，并写出姓名的长度（length）
SELECT
	employees.last_name,
	SUBSTR(employees.last_name, 1, 1) 首字符,
	LENGTH(employees.last_name) 字符长度
FROM
	employees
ORDER BY
	SUBSTR(employees.last_name, 1, 1);

/*
做一个查询，产生下面的结果
<last_name> earns <salary> monthly but wants <salary*3>
			Dream Salary
King earns 24000 monthly but wants 72000
*/
SELECT
	CONCAT(employees.last_name,' earns ', employees.salary, ' monthly but wants ', employees.salary * 3) 'Dream Salary'
FROM
	employees
LIMIT
	1;

/*
5. 使用 case-when，按照下面的条件：
job grade
AD_PRES A
ST_MAN B
IT_PROG C
SA_REP D
ST_CLERK E
产生下面的结果
Last_name 	Job_id 		Grade
king 		AD_PRES 	A
*/
SELECT
	employees.last_name, 
	employees.job_id, 
CASE
	WHEN employees.job_id = 'AD_PRES' THEN 'A'
	WHEN employees.job_id = 'ST_MAN' THEN 'B'
	WHEN employees.job_id = 'IT_PROG' THEN 'C'
	WHEN employees.job_id = 'SA_REP' THEN 'D'
	WHEN employees.job_id = 'ST_CLERK' THEN 'E'
	END as 'Grade'
FROM
	employees
WHERE	
	employees.job_id IN('AD_PRES','ST_MAN','IT_PROG','ST_CLERK');
	
```



#### 分组函数



> 分类

```sql
max : 最大值
min : 最小值
avg : 平均值
count : 计算个数
sum : 和
```



> 语法

```sql
select
	max(字段)
from
	表名;
```



> 特点

- 支持的类型

    - sum 和 avg 一般用于处理数值型
    - max min count 可以处理任何数据类型

- 以上分组函数都忽略 null

- 都可以搭配 distinct 使用, 实现去重的统计

    `select sum(distinct 字段) from 表;`

- count 函数

    count(字段) : 统计该字段非空值的个数

    count(*) : 统计结果集的行数

    count(1) : 统计结果集的行数

    - 效率上 :

        MyISAM 存储引擎，count(*)最高

        InnoDB 存储引擎，count(* ) 和count(1)效率>count(字段)

- 和分组函数一同查询的字段, 要求是 group by 后出现的字段



##### 代码



```sql
# 二. 分组函数

/*
功能 : 用作统计使用, 又称为聚合函数, 或统计函数或组函数

分类 : 
	sum : 求和
	avg : 平均值
	max : 最大值
	min : 最小值
	count : 计算个数
	
特点 : 
		1. sum, avg 一般用于处理数值型
		   max, min, count 可以处理任何数据类型
		
		2. 以上分组函数都忽略 null 值	 
		3. 可以和 DISTINCT 搭配实现去重
		4. count 函数的单独介绍
			一般用 COUNT(*) 用作统计行数
		5. 和分组函数一同查询的字段要求是 GROUP BY 后的字段
*/

# 1. 简单使用
SELECT 
	SUM(employees.salary) 总和,
	MAX(employees.salary) 最大值,
	MIN(employees.salary) 最小值,
	AVG(employees.salary) 平均数,
	COUNT(employees.salary) 总个数
FROM
	employees;
	
SELECT 
	SUM(employees.salary) 总和,
	MAX(employees.salary) 最大值,
	MIN(employees.salary) 最小值,
	ROUND(AVG(employees.salary), 2) 平均数,
	COUNT(employees.salary) 总个数
FROM
	employees;
	

# 2. 参数支持哪些类型

SELECT 
	SUM(last_name), 
	AVG(hiredate),
	MAX(last_name),
	MIN(hiredate),
	COUNT(employees.commission_pct),
	COUNT(employees.salary),
FROM
	employees;
	
# 3. 是否忽略 null 值

SELECT
		SUM(commission_pct),
		AVG(commission_pct),
		MAX(commission_pct),
		MIN(commission_pct),
		COUNT(commission_pct)
FROM
		employees;
		
# 5. 和 DISTINCT 搭配
SELECT
			SUM(DISTINCT employees.salary),
			SUM(employees.salary),
			COUNT(DISTINCT employees.salary),
			COUNT(employees.salary)
FROM
			employees;
			
# 6. count 函数的详细介绍
SELECT
	COUNT( employees.salary ) 
FROM
	employees;
SELECT
	COUNT(*) 
FROM
	employees;
	
SELECT
	COUNT(1)
FROM
	employees;
	
/*
 效率问题 : 
	INNODB : count(*) 和 COUNT(1) 的效率最高, 比 COUNT(字段) 高
	MYISAM : count(*) 的效率最高
 */
 
 # 6. 和分组函数一同查询的字段有要求
  
 /*
 错误的
 SELECT 
	AVG(employees.salary), employees.employee_id
 FROM	
	employees;
	*/
```



##### 练习

```sql
# 6. 查询公司员工工资的最大值, 最小值, 平均值, 总和
SELECT
	MAX(employees.salary) 最大值,
	MIN(employees.salary) 最小值,
	AVG(employees.salary) 平均值,
	SUM(employees.salary) 总和
FROM
	employees;
	
# 7. 查询员工表中的最大入职时间与最小入职时间的相差天数
SELECT
	DATEDIFF(MAX(employees.hiredate), MIN(employees.hiredate)) DIFFERENCE
FROM
	employees
	
# 8. 查询部门编号为 90 的员工个数
SELECT
	COUNT(*) 个数
FROM
	employees
WHERE
	employees.department_id = 90;
```



### 进阶五 : 分组查询



> 语法

```sql
select
	查询列表
from
	表名
[where
	筛选条件]
group by
	分组的字段
[having
	分组后的筛选条件]
[order by
	排序列表]
[limit
	限制子句];
```



> 特点

							使用关键字					筛选的表					位置

分组前筛选		 where							原始表						group by的前面
		分组后筛选		 having						   分组后的结果			 group by 的后面



#### 代码

```sql
# 进阶五 : 分组查询

/*
语法 : 
SELECT 分组函数 , 列 (要求出现在 GROUP BY 后面)
FROM 表名
[WHERE 筛选条件]
GROUP BY 分组的列表
[ORDER BY 子句]

注意 : 查询列表必须特殊, 要求是分组函数和 GROUP BY 后出现的字段

特点 :
	1. 分组查询中的筛选条件可以分为两类
			
										筛选源						位置										关键字
			分组前筛选		原始表						GROUP BY 子句的前面			WHERE
			分组后筛选		分组后的结果集		GROUP BY 子句的后面			HAVING
			
				1. 分组函数做条件肯定是放在 HAVING 子句中
				2. 能用分组前筛选的, 优先考虑使用分组前筛选
				
	2. GROUP BY 子句支持单个字段分组, 也支持多个字段分组, 多个字段之间用逗号隔开, 没有顺序要求
		 表达式或函数也支持(用的较少)
	3. 也可以添加排序, 排序放在整个分组查询的最后	 
*/

# 引入 : 查询每个部门的平均工资
SELECT
 AVG(employees.salary)
FROM
 employees;
 
 # 案例一 : 查询每个工种的最高工资 简单的分组查询
SELECT
	MAX(employees.salary),
	employees.job_id
FROM
	employees
GROUP BY
	employees.job_id;
	
# 案例二 : 查询每个位置上的部门个数
SELECT
	COUNT(*),
	locations.location_id
FROM
	locations
GROUP BY
	locations.location_id;
	
# 添加筛选条件(分组前的筛选)
# 案例三 : 查询邮箱中包含 a 字符的, 每个部门的平均工资	
SELECT
	AVG(employees.salary),
	employees.department_id
FROM
	employees
WHERE
	employees.email LIKE '%a%'
GROUP BY
	employees.department_id;
	
# 案例四 : 查询有奖金的每个领导收下员工的最高工资
SELECT
	MAX(employees.salary),
	employees.manager_id
FROM
	employees
WHERE
	employees.commission_pct IS NOT NULL
GROUP BY
	employees.manager_id;
	
# 添加复杂的筛选条件 (分组后的筛选)	
# 案例五 : 	查询哪个部门的员工个数 > 2

# 1. 查询每个部门的员工个数
# 2. 根据 1 的结果进行筛选, 查询哪个部门的员工个数 > 2
SELECT
	COUNT(*) count,
	employees.department_id
FROM
	employees
GROUP BY
	employees.department_id
HAVING
	count > 2;

# 案例六 : 查询每个工种有奖金的员工的最高工资 > 12000 的工种编号和最高工资
SELECT
	MAX(employees.salary) MAX_salary,
	employees.job_id
FROM
	employees
WHERE
	employees.commission_pct IS NOT NULL
GROUP BY
	employees.job_id
HAVING
	MAX_salary > 12000;
	
# 案例七 : 	查询领导编号 > 102 的每个领导手下的最低工资 > 5000 的领导编号是哪个, 以及其最低工资
SELECT
	MIN(employees.salary) minSalary,
	employees.manager_id
FROM
	employees
WHERE
	employees.manager_id > 120
GROUP BY
	employees.manager_id
HAVING
	minSalary > 5000;
	
# 按表达式 或 函数 进行分组

# 案例八 : 	按员工姓名的长度分组, 查询每一组的员工个数, 筛选员工个数 > 5 的有哪些, 并按员工个数排序
SELECT
	COUNT(*),
	LENGTH(employees.last_name)
FROM	
	employees
GROUP BY
	LENGTH(employees.last_name)
HAVING
	COUNT(*) > 5
ORDER BY
	COUNT(*) DESC;
	
SELECT
	COUNT(*) c,
	LENGTH(employees.last_name) l
FROM	
	employees
GROUP BY
	l
HAVING
	c
ORDER BY
	c DESC;	
	
# 按多个字段分组

# 案例一 : 查询每个部门每个工种的员工的平均工资(顺序无所谓)
SELECT
	AVG(employees.salary),
	employees.manager_id,
	employees.job_id
FROM
	employees
GROUP BY
	employees.manager_id,
	employees.job_id;
	
# 添加排序

# 	案例一 : 查询每个部门每个工种的员工的平均工资(顺序无所谓), 并且按平均工资的高低显示
SELECT
	AVG(employees.salary),
	employees.manager_id,
	employees.job_id
FROM
	employees
WHERE
		employees.department_id IS NOT NULL 
		and employees.manager_id IS NOT NULL
GROUP BY
	employees.manager_id,
	employees.job_id
HAVING
	AVG(employees.salary) > 10000	
ORDER BY
	AVG(employees.salary) DESC;
	
```



#### 练习



```sql
# 1. 查询各 job_id 的员工工资的最大值，最小值，平均值，总和，并按 job_id 升序
SELECT
	MAX(employees.salary) 最大值,
	MIN(employees.salary) 最小值,
	AVG(employees.salary) 平均值,
	SUM(employees.salary) 总和,
	employees.job_id
FROM
	employees
GROUP BY
	employees.job_id	
ORDER BY
	employees.job_id;

# 2. 查询员工最高工资和最低工资的差距（DIFFERENCE）
SELECT
	MAX(employees.salary) - MIN(employees.salary) DIFFERENCE
FROM
	employees;

# 3. 查询各个管理者手下员工的最低工资，其中最低工资不能低于 6000，没有管理者的员工不计算在内
SELECT
	MIN(employees.salary) minSalary,
	employees.manager_id
FROM
	employees
WHERE
	employees.manager_id IS NOT NULL
GROUP BY
	employees.manager_id
HAVING
	minSalary >= 6000
ORDER BY
	minSalary DESC;

# 4. 查询所有部门的编号，员工数量和工资平均值,并按平均工资降序
SELECT
	COUNT(*),
	AVG(employees.salary) avgSalary,
	employees.department_id
FROM
	employees
WHERE
	employees.department_id IS NOT NULL
GROUP BY
	employees.department_id
ORDER BY
	avgSalary;
	

# 5. 选择具有各个 job_id 的员工人数
SELECT
	COUNT(*),
	employees.job_id
FROM
	employees
GROUP BY
	employees.job_id;
	
```



### 进阶六 : 连接查询



#### 概念



> 含义

当查询中涉及到了多个表的字段，需要使用多表连接



```sql
select 
	字段1，字段2
from 
	表1，表2,...;
```



笛卡尔乘积：当查询多个表时，没有添加有效的连接条件，导致多个表所有行实现完全连接

如何解决：添加有效的连接条件



> 分类 : 按年代分类

- sql 92

    - 等值

    - 非等值

    - 自连接

        也支持一部分外连接 (用于 oracle, SqlServer, 但是 MySQL不支持)

- sql 99 [推荐使用]

    - 内连接
        - 等值
        - 非等值
        - 自连接
    - 外连接
        - 左外
        - 右外
        - 全外(MySQL 不支持)
    - 交叉连接(笛卡尔乘积)



```sql
# 进阶六 : 连接查询

/*
含义 : 又称为多表查询, 当查询的字段来着多个表时, 就会用到连接查询

笛卡尔乘积现象 : 表一有 m 行, 表二有 n 行, 结果 = m * n 行
发生原因 : 没有有效的连接条件
解决原因 : 添加有效的连接条件

分类 : 
	按年代分类
		sql 92 标准 : 仅仅支持内连接
		sql 99 标准 [推荐] : 只是不支持全外连接, 其余均支持
		
	按功能分类
		内连接 :
			等值连接
			非等值连接
			自连接
			
		外连接 :
			左外连接
			右外连接
			全外连接
			
		交叉分类	

*/
```



#### sql 92



##### 等值连接

> 语法

```sql
select
	查询列表
from
	表 1 别名, 表 2 别名
where
	连接条件 (表 1.key = 表 2.key)
[and
	筛选条件]
[group by
	分组列表]
[having
	分组后的筛选条件]
[order by
	排序列表]
[limit
	限制子句];
```



> 特点

- 一般为表起别名
- 多表的顺序可以调换
- n 表连接至少需要 n - 1 个连接条件
- 等值连接的结果是多表的交集部分



##### 非等值连接



> 语法

```sql
select
	查询字段
from
	表 1 别名, 表 2 别名
where
	非等值的连接条件(IN | NOT IN | ANY | ALL)
[and
	筛选列表]
[group by
	分组列表]
[having
	分组后的筛选条件]
[order by
	排序列表]
[limit
	限制子句];
```



##### 自连接



> 语法

```sql
select
	查询列表
from
	表 1 别名, 表 2 别名
where
	等值的连接条件
[and
	筛选列表]
[group by
	分组列表]
[having
	分组后的筛选条件]
[order by
	排序列表]
[limit
	限制子句];
```



##### 代码



```sql
# 一. sql 92 标准

# 1. 等值连接 

/*
1. 多表等值连接的结果为多表的交集部分
2. n 表连接, 至少需要 n - 1 个连接条件
3. 多表的顺序没有要求
4. 一般需要为表取别名
5. 可以搭配签名介绍的所有子句使用, 如 排序, 分组, 筛选等
*/
# 案例一 : 查询女神名和对应的男神名
SELECT
	beauty.`name`,
	boys.boyName
FROM
	beauty,
	boys
WHERE
	beauty.boyfriend_id = boys.id;

# 案例二 : 查询员工名和对应的部门名
SELECT
	employees.last_name,
	departments.department_name
FROM
	employees,
	departments
WHERE
	employees.department_id = departments.department_id;
	
# 2. 为表起别名	

/*
1. 提高语句的简介度
2. 区分多个重名的字段

注意 : 如果为表起了别名, 则查询的字段就不能使用原来的表名去限定

*/
# 案例三 :	查询员工名 工种号 工种名
SELECT
	e.last_name,
	e.job_id,
	j.job_title
FROM
	employees e,
	jobs j
WHERE
	j.job_id = e.job_id;
	
# 3. 两个表的顺序是否可用调换 ? 可以
SELECT
	e.last_name,
	e.job_id,
	j.job_title
FROM
	jobs j,
	employees e
WHERE
	e.job_id = j.job_id;
	
# 4. 可以加筛选吗 ? 可以	

# 案例四 : 查询有奖金的员工名, 部门名
SELECT
	employees.last_name,
	departments.department_name,
	employees.commission_pct
FROM
	employees,
	departments
WHERE
	departments.department_id = employees.department_id
	AND employees.commission_pct IS NOT NULL;
	
# 案例五 : 查询城市中第二个字符为 'o' 的, 对应的部门名和城市名	
SELECT
	d.department_name,
	l.city
FROM
	locations l,
	departments d
WHERE
	d.location_id = l.location_id
	AND l.city LIKE '_o%';
	
# 5. 可以加分组吗 ? 可以	

# 案例一 : 查询每个城市的部门个数
SELECT
	COUNT(*),
	locations.city
FROM
	locations,
	departments
WHERE
	locations.location_id = departments.location_id
GROUP BY
	locations.city
ORDER BY
	COUNT(*) DESC;
	
# 案例二 : 查询有奖金的每个部门的部门名和部门的领导编号和该部门的最低工资
SELECT
	departments.department_name,
	departments.manager_id,
	MIN(employees.salary) minSalary
FROM
	employees,
	departments
WHERE
	employees.department_id = departments.department_id
	AND employees.commission_pct IS NOT NULL
GROUP BY
	employees.department_id,
	departments.manager_id
ORDER BY
	minSalary DESC;
	
# 6. 可以加排序吗 ? 可以

# 案例三 : 查询每个工种的工种名和员工的个数, 并且按员工个数降序
SELECT
	jobs.job_title,
	COUNT(*)
FROM
	jobs,
	employees
WHERE
	employees.job_id = jobs.job_id
GROUP BY
	jobs.job_id
ORDER BY
	COUNT(*) DESC;
	
# 7. 是否可以实现三表连接 ? 可以

# 案例四 : 	查询员工名 部门名 和所在的城市, 并按照工资降序
SELECT
	employees.last_name,
	departments.department_name,
	employees.salary,
	locations.city
FROM
	locations,
	employees,
	departments
WHERE
	departments.department_id = employees.department_id 
	AND departments.location_id = locations.location_id
ORDER BY
	locations.city,
	employees.salary DESC,
	departments.department_name;
	
# 2. 非等值连接


# 案例一 : 查询员工的工资和工资级别
SELECT
	employees.salary,
	job_grades.grade_level
FROM
	job_grades,
	employees
WHERE
	employees.salary BETWEEN job_grades.lowest_sal AND job_grades.highest_sal
	AND job_grades.grade_level = 'A';


# 3. 自连接

# 案例一 : 查询员工名和上级的名称
SELECT
	e.employee_id,
	e.last_name,
	m.employee_id,
	m.last_name
FROM
	employees e,
	employees m
WHERE
	e.manager_id = m.employee_id;	
```



##### 练习



```sql
# 1. 显示所有员工的姓名，部门号和部门名称。
SELECT
	employees.last_name,
	employees.department_id,
	departments.department_name
FROM
	employees,
	departments
WHERE
	departments.department_id = employees.department_id;

# 2. 查询 90 号部门员工的 job_id 和 90 号部门的 location_id
SELECT
	employees.job_id,
	departments.location_id,
	departments.department_id
FROM
	employees,
	departments
WHERE
	departments.department_id = employees.department_id
	AND departments.department_id = 90;

# 3. 选择所有有奖金的员工的 last_name , department_name , location_id , city
SELECT
	employees.last_name,
	departments.department_name,
	departments.location_id,
	locations.city
FROM
	employees,
	departments,
	locations
WHERE
	employees.commission_pct IS NOT NULL
	AND departments.department_id = employees.department_id
	AND departments.location_id = locations.location_id;

# 4. 选择city在 Toronto 工作的员工的 last_name , job_id , department_id , department_name
SELECT
	employees.last_name,
	employees.job_id,
	employees.department_id,
	departments.department_name,
	locations.city
FROM
	employees,
	departments,
	locations
WHERE
	departments.department_id = employees.department_id
	AND departments.location_id = locations.location_id
	AND locations.city = 'Toronto';

# 5.查询每个工种、每个部门的部门名、工种名和最低工资
SELECT
	employees.job_id,
	departments.department_name,
	jobs.job_title,
	MIN(employees.salary)
FROM
	employees,
	jobs,
	departments
WHERE
	departments.department_id = employees.department_id
	AND jobs.job_id = employees.job_id
GROUP BY
	employees.job_id,
	departments.department_name
ORDER BY
	MIN(employees.salary) DESC;

# 6.查询每个国家下的部门个数大于 2 的国家编号
SELECT
	locations.country_id,
	COUNT(*)
FROM
	locations,
	departments
GROUP BY
	locations.country_id
HAVING
	COUNT(*) > 2
ORDER BY
	COUNT(*) DESC;

# 7、选择指定员工的姓名，员工号，以及他的管理者的姓名和员工号，结果类似于下面的格式
# employees Emp# manager Mgr#
# kochhar 101 king 100
SELECT
	e.last_name AS 'employees',
	e.employee_id AS 'Emp#',
	m.last_name AS 'manager',
	m.manager_id AS 'Mgr#'
FROM
	employees e,
	employees m
WHERE
	e.manager_id = m.employee_id
	AND m.employee_id = 100
	AND e.employee_id = 101;
	
```





#### sql 99



```sql
# 二. sql 99 语法

/*
语法 :
	select 查询列表
	from 表一 别名 [连接类型]
	join 表二 别名 
	on 连接条件
	[where 筛选条件]
	[group by 分组子句]
	[having 筛选条件]
	[order by 排序条件]

内连接 (*) : inner
外连接
	左外(*) : letf [outer]
	右外(*) : right [outer]
	全外 : full [outer]
交叉连接 : cross	


# sql 92 和 sql 99
 
功能 : sql 99 支持的较多
可读性 : sql 99 实现连接条件和筛选条件的分离, 可读性较高
*/

```



##### 内连接



> 语法

```sql
select
	查询列表
from
	表 1 别名
[inner] join
	表 2 别名
on
	连接条件
[where
	筛选条件]
[group by
	分组列表]
[having
	分组后的筛选条件]
[order by
	排序列表]
[limit
	限制子句];
```



> 特点

- 表的顺序可以调换
- 内连接的结果 = 多表的交集
- n 表连接至少需要 n - 1 个连接条件
- 一般为表取别名



> 分类

- 等值连接
- 非等值连接
- 自连接



```sql
# 1. 内连接

/*
语法 : 
	select 查询列表
	from 表一 别名
	inner join 表二 别名
	on 连接条件
	[where 筛选条件]
	[group by 分组子句]
	[having 筛选条件]
	[order by 排序条件]
	
分类 : 
		等值
		非等值
		自连接
		
特点 : 
	1. 添加排序 分组 筛选
	2. inner 可以省略
	3. 筛选条件放在 where 后面, 连接条件放在 on 后面, 提高分离线, 便于阅读
	4. inner join 连接 和 sql 92 语法中的等值连接效果是一样的, 都是查询多表的交集
*/

# 等值连接

# 案例一 : 查询员工名 部门名
SELECT 
	e.last_name, 
	e.`department_id`, 
	d.`department_name`
FROM 
	`employees` e
INNER JOIN 
	`departments` d
ON 
	e.`department_id` = d.`department_id`;

# 案例二 : 查询名字中包含 e 的员工名和工种名
SELECT
	e.`last_name`,
	j.`job_title`
FROM
	employees e
INNER JOIN
	jobs j
ON
	e.`job_id` = j.`job_id`
WHERE
	e.`last_name` LIKE '%e%';

# 案例三 : 查询部门个数 > 3 的城市名和部门个数
SELECT
	city,
	COUNT(*)
FROM
	departments d
INNER JOIN
	locations l
ON
	d.`location_id` = l.`location_id`
GROUP BY
	city
HAVING
	COUNT(*) > 3;
	
# 案例四 : 查询哪个部门的部门员工个数 > 3 的部门名和员工个数, 并按个数降序
SELECT
	COUNT(*),
	department_name
FROM
	departments d
INNER JOIN
	employees e
ON
	e.`department_id` = d.`department_id`
GROUP BY
	d.`department_id`
HAVING
	COUNT(*) > 3
ORDER BY
	COUNT(*) DESC; 
	
# 案例五 : 查询员工名 部门名 工种名 并按部门名排序
SELECT
	last_name,
	department_name,
	job_title
FROM
	employees e
INNER JOIN
	departments d
ON
	d.`department_id` = e.`department_id`
INNER JOIN	
	jobs j
ON
	j.`job_id` = e.`job_id`
ORDER BY
	d.`department_name`;
	
# 非等值连接

# 案例一 : 查询员工的工资级别
SELECT
	salary,
	grade_level
FROM
	employees e
JOIN
	job_grades j
ON
	e.`salary` BETWEEN j.`lowest_sal` AND j.`highest_sal`;
	
# 查询每个工资级别的个数大于 > B 的个数, 并降序
SELECT
	j.grade_level,
	COUNT(*)
FROM
	employees e
JOIN
	job_grades j
ON
	e.`salary` BETWEEN j.`lowest_sal` AND j.`highest_sal`
GROUP BY
	j.grade_level
HAVING
	j.grade_level >= 'B'
ORDER BY
	COUNT(*) DESC
	
# 查询员工的名字和上级的名字
SELECT
	e.`last_name`,
	m.`last_name`
FROM
	employees e
JOIN
	employees m
ON
	m.`employee_id` = e.`manager_id`;

# 查询姓名中包含 k 的员工的名字和上级的名字
SELECT
	e.`last_name`,
	m.`last_name`
FROM
	employees e
JOIN
	employees m
ON
	m.`employee_id` = e.`manager_id`	
WHERE
	e.`last_name` LIKE '%k%';
	
```



##### 外连接



> 语法

```sql
select
	查询列表
from
	表 1 别名
left | right | full [outer] join
	表 2 别名
on
	连接条件
[where
	筛选条件]
[group by
	分组列表]
[having
	分组后的筛选条件]
[order by
	排序列表]
[limit
	限制子句];
```



> 特点

- 查询的结果 = 主表中所有的行, 如果从表和它屁屁额的将显示匹配行, 如果从表没有匹配的则显示 null

- left join 左边的就是主表

    right join 右边的就是主表

    full join 两边都是主表

- 一般用于查询除了交集部分的剩余不匹配的行



```sql
# 二. 外连接

/*
应用场景 : 用于查询一个表中有, 另一个表中没有的记录

特点 : 
	1. 外连接的查询结果为主表中的所有记录
			如果从表中有和它匹配的, 则显示匹配的值
			如果从表中没有和它匹配的, 则显示 null
			外连接查询结果 = 内连接结果 + 主表中有而从表没有的记录
			
	2. 左外连接中, left join左边的是主表
		 右外连接中, right join 右边的是主表
		 
	3. 左外和右外交换两个表的顺序, 可以实现同样的效果	 
	4. 全外连接 = 内连接结果 + 表一有但表二没有的 + 表二有但表一没有的
*/

# 引入 : 查询男朋友不在男神表的女神名
SELECT
	*
FROM
	boys;
	
SELECT	
	*
FROM
	beauty;	

# 1. 左外连接
SELECT
	b.`name`,
	bo.*
FROM
	beauty b
LEFT JOIN
	boys bo
ON
	b.boyfriend_id = bo.id
WHERE
	bo.id IS NULL;
	
SELECT
	b.*,
	bo.*
FROM
	boys bo
LEFT JOIN
	beauty b
ON
	b.boyfriend_id = bo.id;

# 右外连接
SELECT
	b.`name`,
	bo.*
FROM
	boys bo
RIGHT JOIN
	beauty b
ON
	b.boyfriend_id = bo.id
WHERE
	bo.id IS NULL;

# 案例一 : 查询哪个部门没有员工
# 左外
SELECT
	d.*,
	e.employee_id
FROM
	departments d
LEFT JOIN
	employees e
on
	e.department_id = d.department_id
WHERE
	e.employee_id IS NULL;
	
# 右外
SELECT
	d.*,
	e.employee_id
FROM
	employees e
RIGHT JOIN
	departments d
on
	e.department_id = d.department_id
WHERE
	e.employee_id IS NULL;	
	
# 全外
SELECT
	b.*,
	bo.*
FROM
	beauty b
FULL OUTER JOIN
	boys bo
ON
	bo.id = b.boyfriend_id	
	
```





##### 交叉连接



> 语法

```sql
select
	查询列表
from
	表 1 别名
cross join
	表 2 别名;
```



> 特点

- 类似于笛卡尔乘积



```sql
# 交叉连接 就是笛卡尔乘积

SELECT
	b.*,
	bo.*
FROM
	beauty b
CROSS JOIN
	boys bo;
	
```



##### 练习



```sql
# 1. 查询编号>3 的女神的男朋友信息，如果有则列出详细，如果没有，用 null 填充
SELECT
	beauty.id 女神id,
	beauty.name 女神名字,
	boys.*
FROM
	beauty
LEFT JOIN
	boys
ON
	boys.id = beauty.boyfriend_id
WHERE
	beauty.id > 3
ORDER BY
	beauty.id;
	

# 2. 查询哪个城市没有部门
SELECT
	city,
	department_id
FROM
	departments
RIGHT JOIN
	locations
ON
	locations.location_id = departments.location_id
WHERE
	departments.location_id IS NULL;

# 3. 查询部门名为 SAL 或 IT 的员工信息
SELECT
	employees.*,
	departments.department_name
FROM
	employees
RIGHT JOIN
	departments
ON
	departments.department_id = employees.department_id
WHERE
	departments.department_name IN ('SAL', 'IT');
	
```



#### 连接总结



![image-20211101203227609](/assets/imgs/MySQL基础.assets/image-20211101203227609.png)

![image-20211101203221732](/assets/imgs/MySQL基础.assets/image-20211101203221732.png)



### 进阶七 : 子查询



#### 概念



> 含义

嵌套在其他语句内部的 select 语句称为子查询或内查询

外面的语句可以是 insert update delete ==select== 等, 一般 select 作为外面语句较多

外面如果为 select 语句 ,则称此语句为外查询或主查询



> 分类

按出现位置分类

- select 后面
    - 仅仅支持表两只查询
- from 后面
    - 表子查询
- ==where 或者 having 后面==
    - ==标量子查询==
    - ==列子查询==
    - 行子查询
- exists 后面
    - 标量子查询
    - 列子查询
    - 行子查询
    - 表子查询



按结果集的行列

- ==标量子查询 (单行子查询) : 结果集为一行一列==
- ==列子查询 (多行子查询) : 结果集为多行一列==
- 行子查询 : 结果集为多行多列
- 表子查询 : 结果集为多行多列



#### 代码



```sql
# 进阶七 : 子查询

/*
含义 : 出现在其他语句的 SELECT 语句, 成为子查询或内查询

外部的查询语句, 成为主查询或外查询

分类 :
	1. 按子查询出现的位置 : 
		1. SELECT 后面
				仅仅支持标量子查询
		2. FROM 后面
				支持表子查询
		3. WHERE 或 HAVING 后面 ☆
				标量子查询 (单行) √
				列子查询 	 (多行) √
				行子查询 (用的较少)
		4. EXISTS 后面 (相关子查询)
				表子查询
		
	2. 按结果集的行列数不同 : 
		1. 标量子查询 (结果集只有一行一列)
		2. 列子查询 (结果集只有一列多行)
		3. 行子查询 (结果集有一行多列)
		4. 表子查询 (结果集一般为多行多列)	
*/


# 一. WHERE 或 HAVING 后面

/*
1. 标量子查询 (单行子查询)

2. 列子查询 (多行子查询)

3. 行子查询 (多列多行)

特点 :
	1. 子查询放在小括号内
	2. 一般放在条件的右侧
	3. 标量子查询, 一般搭配着单行操作符使用
			> < >= <= = <>
	4. 列子查询, 一般搭配着多行操作符使用
			IN / NOT IN   ANY / SOME   ALL	
	5. 子查询的执行优先于主查询执行, 主查询的条件用到了子查询的结果	
*/

# 1. 标量子查询 (单行子查询)

# 案例一 : 谁的工资比 'Abel' 高 ?
SELECT
	employees.last_name,
	employees.salary 
FROM
	employees 
WHERE
	employees.salary > ( SELECT employees.salary FROM employees WHERE employees.last_name = 'Abel' );
	
# 案例二 : 返回 job_id 与 141 号员工相同, salary 比 143号员工多的员工, 姓名, job_id, 工资
SELECT
	employees.last_name,
	employees.job_id,
	employees.salary 
FROM
	employees 
WHERE
	employees.job_id = ( SELECT employees.job_id FROM employees WHERE employees.employee_id = 141 ) 
	AND employees.salary > ( SELECT employees.salary FROM employees WHERE employees.employee_id = 143 ) 
ORDER BY
	employees.salary DESC;
	
# 案例三 : 返回公司中工资最少的员工的 last_name, job_id, salary
SELECT
	employees.last_name,
	employees.job_id,
	employees.salary 
FROM
	employees 
WHERE
	employees.salary = ( SELECT MIN( employees.salary ) FROM employees );
	
# 案例四 : 查询最低工资大于	50 号部门最低工资的部门 id 和其最低工资
SELECT
	employees.department_id,
	MIN( employees.salary ) 
FROM
	employees 
GROUP BY
	employees.department_id 
HAVING
	MIN( employees.salary ) > ( SELECT MIN( employees.salary ) FROM employees WHERE employees.department_id = 50 ) 
ORDER BY
	MIN( employees.salary ) DESC;
	
# 非法使用标量子查询 是错误的
SELECT
	departments.department_id,
	MIN( employees.salary ) 
FROM
	employees
	JOIN departments ON departments.department_id = employees.department_id 
GROUP BY
	departments.department_id 
HAVING
	MIN( employees.salary ) > ( SELECT employees.salary FROM employees JOIN departments WHERE departments.department_id = 250 ) 
ORDER BY
	MIN( employees.salary ) DESC;
	
# 2. 列子查询 (多行子查询)

# 案例一 : 返回 location_id 是 1400 或者 1700 的部门中的所有员工姓名
SELECT
	employees.last_name,
	employees.department_id,
	departments.location_id 
FROM
	employees
	JOIN departments ON departments.department_id = employees.department_id 
WHERE
	departments.location_id IN ( '1400', '1700' );
SELECT
	employees.last_name 
FROM
	employees 
WHERE
	employees.department_id IN ( SELECT DISTINCT departments.department_id FROM departments WHERE departments.location_id IN ( '1400', '1700' ) );
	
# 案例二 : 	返回其他工种中比 job_id 为 'IT_PROG' 工种任一工资低的员工的 : 工号 姓名 job_id salary
# 方式一 : 使用 ANY
SELECT
	employees.employee_id,
	employees.last_name,
	employees.job_id,
	employees.salary 
FROM
	employees 
WHERE
	employees.salary < ANY ( SELECT DISTINCT employees.salary FROM employees WHERE employees.job_id = 'IT_PROG' ) 
	AND employees.job_id <> 'IT_PROG' 
ORDER BY
	employees.salary DESC;

# 方式二 : 使用 MAX
SELECT
	employees.employee_id,
	employees.last_name,
	employees.job_id,
	employees.salary 
FROM
	employees 
WHERE
	employees.salary < ( SELECT MAX( employees.salary ) FROM employees WHERE employees.job_id = 'IT_PROG' ) 
	AND employees.job_id <> 'IT_PROG' 
ORDER BY
	employees.salary DESC;
	
# 案例三 : 	返回其他工种中比 job_id 为 'IT_PROG' 工种所有工资低的员工的 : 工号 姓名 job_id salary
# 方式一 : 使用 ALL
SELECT
	employees.employee_id,
	employees.last_name,
	employees.job_id,
	employees.salary 
FROM
	employees 
WHERE
	employees.salary < ALL ( SELECT DISTINCT employees.salary FROM employees WHERE employees.job_id = 'IT_PROG' ) 
	AND employees.job_id <> 'IT_PROG' 
ORDER BY
	employees.salary DESC;

# 方式二 : 使用 MIN
SELECT
	employees.employee_id,
	employees.last_name,
	employees.job_id,
	employees.salary 
FROM
	employees 
WHERE
	employees.salary < ( SELECT MIN( employees.salary ) FROM employees WHERE employees.job_id = 'IT_PROG' ) 
	AND employees.job_id <> 'IT_PROG' 
ORDER BY
	employees.salary DESC;
	
# 3. 行子查询 (多列多行)
# 案例一 : 查询员工编号最小且工资最高的员工信息
SELECT
	* 
FROM
	employees 
WHERE
	employees.employee_id = ( SELECT MIN( employees.employee_id ) FROM employees ) 
	AND employees.salary = ( SELECT MAX( employees.salary ) FROM employees );
SELECT
	* 
FROM
	employees 
WHERE
	( employees.employee_id, employees.salary ) = ( SELECT MIN( employees.employee_id ), MAX( employees.salary ) FROM employees ) 
	
	
	
# 二. 放在 SELECT 后面
# 仅仅支持标量子查询

# 案例一 : 查询每个部门的员工个数
SELECT
	departments.*,
	( SELECT COUNT(*) FROM employees WHERE employees.department_id = departments.department_id ) 
FROM
	departments;
	
# 案例二 : 查询员工号 = 102 的部门名
SELECT
	(
	SELECT 
		departments.department_name 
	FROM 
		employees, departments 
	WHERE 
		employees.employee_id = 102 
	AND 
		employees.department_id = departments.department_id
);


# 三. 放在 from 后面 

/*
要求将子查询结果充当一张表, 要求必须起别名
*/

# 案例一 : 查询每个部门的平均工资的工资等级
SELECT
	ag_dep.*,
	g.grade_level 
FROM
	( SELECT AVG( employees.salary ) ag, employees.department_id FROM employees GROUP BY employees.department_id ) ag_dep
JOIN 
	job_grades g 
ON 
	ag 
BETWEEN g.lowest_sal AND g.highest_sal;
 

 # 四. EXISTS 后面 (相关子查询)
 
 /*
 语法 :
 EXISTS (完整的查询语句)
 
 结果 :
 1 或 0
 */
SELECT
 EXISTS(SELECT employees.employee_id FROM employees WHERE employees.salary = 30000);
	 
# 案例一 : 查询有员工部门名
SELECT
	d.department_name
FROM
	departments d
WHERE
	EXISTS( SELECT * FROM employees e WHERE e.department_id = d.department_id)
	
SELECT
	d.department_name
FROM
	departments d
WHERE
	d.department_id IN ( SELECT e.department_id FROM employees e )
	
# 案例二 : 查询没有女朋友的男神信息
SELECT
	bo.*
FROM
	boys bo
WHERE
	NOT EXISTS ( SELECT * FROM beauty b WHERE b.boyfriend_id = bo.id );
	
SELECT
	bo.*
FROM
	boys bo
WHERE
	bo.id NOT IN ( SELECT b.boyfriend_id FROM beauty b ) ;
	
```



#### 练习



```sql
# 1. 查询和 Zlotkey 相同部门的员工姓名和工资
SELECT
	e.last_name,
	e.salary,
	e.department_id
FROM
	(SELECT z.department_id FROM employees z WHERE z.last_name = 'Zlotkey' ) zl,
	employees e
WHERE
	zl.department_id = e.department_id;
	
# 2. 查询工资比公司平均工资高的员工的员工号，姓名和工资。
SELECT
	e.employee_id,
	e.last_name,
	e.salary
FROM
	employees e
WHERE
	e.salary > ( SELECT AVG(m.salary) FROM employees m )
ORDER BY
	e.salary DESC;

# 3. 查询各部门中工资比本部门平均工资高的员工的员工号, 姓名和工资
SELECT
	e.employee_id,
	e.last_name,
	e.salary,
	e.department_id
FROM	
	employees e,
 (SELECT AVG(m.salary) avg, m.department_id FROM employees m GROUP BY m.department_id ) avg_s
WHERE
	e.salary > avg
	AND e.department_id	= avg_s.department_id;
	
SELECT
	e.employee_id,
	e.last_name,
	e.salary,
	e.department_id
FROM	
	employees e
JOIN	
 (SELECT AVG(m.salary) avg, m.department_id FROM employees m GROUP BY m.department_id ) avg_s
ON 
	e.department_id	= avg_s.department_id
WHERE
	e.salary > avg;
	
# 4. 查询和姓名中包含字母 u 的员工在相同部门的员工的员工号和姓名
SELECT
	e.employee_id,
	e.last_name,
	e.department_id
FROM
	employees e,
	( SELECT DISTINCT m.department_id FROM employees m WHERE m.last_name LIKE '%u%' ) u
WHERE
	u.department_id = e.department_id;

# 5. 查询在部门的 location_id 为 1700 的部门工作的员工的员工号
SELECT
	e.employee_id,
	e.department_id
FROM
	employees e
WHERE
	e.department_id IN (SELECT DISTINCT d.department_id FROM departments d WHERE d.location_id = 1700 );

# 6. 查询管理者是 King 的员工姓名和工资
SELECT
	e.last_name,
	e.salary
FROM
	( SELECT k.employee_id FROM employees k WHERE k.last_name = 'K_ing' ) king,
	employees e
WHERE
	e.manager_id = king.employee_id;
	
# 7. 查询工资最高的员工的姓名，要求 first_name 和 last_name 显示为一列，列名为 姓.名
SELECT
	CONCAT(e.last_name,'.',e.first_name),
	e.salary
FROM
	employees e
WHERE
	e.salary = ( SELECT MAX(m.salary) FROM employees m );
	
```



```sql
# 1. 查询工资最低的员工信息: last_name, salary
SELECT
	e.last_name,
	e.salary
FROM
	employees e
WHERE
	e.salary = (
	SELECT
		MIN(salary)
	FROM
		employees
	);	
	
# 2. 查询平均工资最低的部门信息
SELECT
	d.*,
	avgSalary
FROM
	departments d
JOIN
	(
	SELECT
		department_id,
		AVG(salary) avgSalary
	FROM
		employees
	GROUP BY
		department_id
	ORDER BY
		avgSalary
	LIMIT 1	
	)	avg_m
ON
	d.department_id = avg_m.department_id;


# 3. 查询平均工资最低的部门信息和该部门的平均工资
SELECT
	d.*,
	avgSalary
FROM
	departments d
JOIN
	(
	SELECT
		department_id,
		AVG(salary) avgSalary
	FROM
		employees
	GROUP BY
		department_id
	ORDER BY
		avgSalary
	LIMIT 1	
	)	avg_m
ON
	d.department_id = avg_m.department_id;
	

# 4. 查询平均工资最高的 job 信息
SELECT
	j.*
FROM
	jobs j
JOIN
	( SELECT
		e.job_id,
		AVG(e.salary) avgSalary
	FROM
		employees e
	GROUP BY
		e.job_id
	ORDER BY
		avgSalary DESC
	LIMIT
		1 ) avg_j
ON
	j.job_id = avg_j.job_id	;

# 5. 查询平均工资高于公司平均工资的部门有哪些?
SELECT
	e.department_id,
	AVG(e.salary) avg_m
FROM
	employees e
GROUP BY
	e.department_id
HAVING
	avg_m > (
	SELECT
		AVG(salary)
	FROM
		employees
	);	
	


# 6. 查询出公司中所有 manager 的详细信息.
SELECT
	m.*
FROM
	employees m
WHERE
	m.employee_id IN (
	SELECT
		DISTINCT e.manager_id
	FROM
		employees e
	WHERE
		e.manager_id IS NOT NULL
	);
	
# 7. 各个部门中 最高工资中最低的那个部门的 最低工资是多少
SELECT
	e.salary,
	e.department_id
FROM
	employees e
JOIN
	(
	SELECT
		MAX(salary) maxSalary,
		department_id
	FROM
		employees
	GROUP BY
		department_id
	ORDER BY
		maxSalary
	limit 
		1
	) min_m
ON
	min_m.department_id = e.department_id
ORDER BY
	e.salary
LIMIT
	1;
	
	
	

# 8. 查询平均工资最高的部门的 manager 的详细信息: last_name, department_id, email,salary
SELECT
	m.last_name,
	m.department_id,
	m.email,
	m.salary 
FROM
	employees m
	JOIN departments d ON m.employee_id = d.manager_id 
WHERE
	d.department_id = ( SELECT department_id FROM employees GROUP BY department_id ORDER BY AVG( salary ) DESC LIMIT 1 );
	
```





### 进阶八 : 分页查询



> 语法

```sql
select
	查询列表
from
	表
limit [offset], size;

# 注意 : offset 代表的是其实的条目索引. 默认从 0 开始
# 		size 代表的是显示的条目数
```



> 应用场景

当要查询的条目数太多, 一页显示不全



> 公式

加入要显示的页数为 page, 每一页条目数为 size

```sql
select
	查询列表
from
	表
limit
	(page - 1) * size, size;
```



#### 代码



```sql
# 进阶八 : 分页查询

/*
应用场景 : 当要显示的数据, 一页显示不全, 需要分页提交 sql 请求

语法 : 
	SELECT 查询列表
	FROM 表名一
	[join type JOIN 表名二		
	ON 连接条件
	WHERE 筛选条件
	GROUP BY 分组字段
	HAVING 分组后的筛选
	ORDER BY 排序的字段]
	LIMIT [offset,] size;
	
	offset 要显示条目的起始索引 (起始索引从 0 开始)
	size 要显示的条目个数
	
特点 : 
	1. LIMIT 语句放在查询语句的最后
	2. 公式 :
		要显示的页数 page, 每页的条目数 size
		SELECT 查询列表
		FROM 表
		LIMIT (page - 1) * size,size;
		
		size = 10
		page 
		1				0
		2				10
		3				20
*/

# 案例一 : 查询前五条员工信息
SELECT
	*
FROM
	employees
LIMIT
	0, 5;
	
SELECT
	*
FROM
	employees
LIMIT
	5;	
	
# 查询第十一条到第二十五条
SELECT
	*
FROM
	employees
LIMIT
	10, 15;
	
# 查询有奖金的员工信息, 并且工资较高的前十名显示出来
SELECT
	*
FROM
	employees
WHERE
	employees.commission_pct IS NOT NULL
ORDER BY
	employees.salary DESC
LIMIT
	10;
	
```



### 进阶九 : 联合查询



> 语法

```sql
查询语句 1
union [all]
查询语句 2
union [all]
...
```



> 含义

union : 合并, 联合, 将多次查询结果合并成为一个结果



> 意义

- 将一条比较复杂的查询语句拆分成为多条语句
- 适用于查询多个表的时候, 查询的列基本是一致



> 特点

- 要求多条查询语句的查询列数必须一致
- 要求多条查询语句的查询各列类型, 顺序最好一致
- union 去重, union all 包含重复项



#### 代码



```sql
# 进阶九 : 联合查询

/*
UNION 联合 合并 : 将多条查询语句的结构合并成为一个结果

语法 : 
	查询语句一
	UNION
	查询语句而
	UNION
	...

应用场景 : 要查询的结果来自于多个表, 且多个表没有直接的连接关系, 但查询的信息一致时

特点 : 
	1. 要求多条查询语句的查询列数是一致的
	2. 要求多条查询语句的查询的每一列的类型和顺序最好一致
	3. 使用 UNION 关键字默认去重
		 使用 UNION ALL 可以包含重复项
*/

# 引入案例 : 查询部门编号 > 90 或 邮箱包含 a 的员工信息
SELECT
	*
FROM
	employees
WHERE
	employees.email LIKE '%a%' 
	OR employees.department_id > 90;
	
SELECT
	*
FROM
	employees
WHERE
	employees.email LIKE '%a%' 
UNION
SELECT
	*
FROM
	employees
WHERE
	employees.department_id > 90;		
	
```



### 总结



> 语法

```sql
select
	查询列表				7
from
	表 1 别名				1
连接类型 join
	表 2 别名				2
on		
	连接条件				3
where
	筛选条件				4
group by
	分组列表				5
having
	分组之后的筛选条件		6
order by	
	排序列表				8	
limit
	起始条目索引, 条目数		9
```







## DML 语言的学习



### 插入



> 方式一

- 语法：

    ```sql
    insert into 
    	表名(字段名,...) 
    values
    	(值,...);
    ```

    

- 特点：

    - 要求值的类型和字段的类型要一致或兼容
    - 字段的个数和顺序不一定与原始表中的字段个数和顺序一致
        但必须保证值和字段一一对应
    - 假如表中有可以为null的字段，注意可以通过以下两种方式插入null值
        - 字段和值都省略
        - 字段写上，值使用null
    - 字段和值的个数必须一致
    - 字段名可以省略，默认所有列



> 方式二

- 语法：

    ```sql
    insert into 
    	表名 
    set 
    	字段=值,字段=值,...;
    ```

    



> 两种方式 的区别：

- 方式一支持一次插入多行，语法如下：

    ```sql
    insert into 
    	表名[(字段名,..)] 
    values
    	(值，..),(值，...),...;
    ```

    

- 方式一支持子查询，语法如下：

    ```sql
    insert into 
    	表名
    查询语句;
    ```

    



### 修改



> **==修改单表的记录==**

- 语法：

    ```sql
    update 
    	表名 
    set 
    	字段=值,字段=值 
    [where 
     筛选条件];
    ```

    



> 修改多表的记录[补充]

- 语法 :

    ```sql
    update 
    	表1 别名 
    left|right|inner join 
    	表2 别名 
    on 
    	连接条件  
    set 
    	字段=值,字段=值 
    [where 
     筛选条件];
    ```

    



> 方式一：使用delete

- 语法 : 

    ```sql
    delete 
    	别名1,别名2 
    from 
    	表1 别名 
    inner|left|right join 
    	表2 别名 
    on 
    	连接条件
    [where 
    	筛选条件];
    ```

    



> 方式二：使用truncate

- 语法 : 

    ```sql
    truncate table 表名;
    ```

    



> ==两种方式的区别[面试题]==

1.  truncate删除后，如果再插入，标识列从1开始
     delete删除后，如果再插入，标识列从断点开始
2.  delete可以添加筛选条件
    truncate不可以添加筛选条件
3.  truncate效率较高
4.  truncate没有返回值
    delete可以返回受影响的行数
5.  truncate不可以回滚
    delete可以回滚



### 代码

```sql
# DML 语言

/*
数据操作语言 : 
	插入 INSERT
	删除 UPDATE
	修改 DELETE
	
	
*/

# 一. 插入 INSERT
# 方式一 : 经典插入
/*

语法 : 
	INSERT INTO 表名(列名, ...)
	VALUES(值 1, ...);

*/

# 1. 插入的值的类型要与列的类型一致或兼容


# 2. 不可以为 null 的值必须插入值, 可以为 null 的列如何插入值 ?

# 方式一 : 
INSERT INTO beauty(id,`name`,sex,borndate,phone,photo, boyfriend_id)
VALUES (13, '小橘', '女', '2001-08-08', '12345678999', NULL, 2);

# 方式二 : 
INSERT INTO beauty(id,`name`,sex,borndate,phone, boyfriend_id)
VALUES (14, '裙裙', '女', '2001-08-08', '12345678999', 2);

# 3. 列的顺序是否可以调换
INSERT INTO beauty(`name`, sex, id, phone)
VALUES ('蒋欣', '女', 16, '110');

# 4. 列数和值的个数必须一致
# Column count doesn't match value count at row 1
INSERT INTO beauty(`name`, sex, id, phone, boyfriend_id)
VALUES ('关晓彤', '女', 17, '110');

#5. 可以省略列名, 默认所有列, 而且列的顺序和表中列的顺序一致
INSERT INTO beauty
VALUES (18, '张飞', '男', NULL, '119', NULL, 2);

# 方式二 
/*
语法 :
INSERT INTO 表名
SET 列名 = 值, 列名 = 值 ...
*/

# 案例一 
INSERT INTO beauty
SET id = 19, `name` = '刘涛', phone = '999';

# 两种方式大 pk
/*
1. 方式一支持插入多行, 方式二不支持
2. 方式一支持子查询, 方式二不支持'

so, 一般用方式一比较多
*/

INSERT INTO beauty
VALUES (20, '小橘1', '女', '2001-08-08', '12345678999', NULL, 2),
(21, '小橘2', '女', '2001-08-08', '12345678999', NULL, 2),
(22, '小橘3', '女', '2001-08-08', '12345678999', NULL, 2),
(23, '小橘4', '女', '2001-08-08', '12345678999', NULL, 2);

INSERT INTO beauty(id, `name`, phone)
SELECT
	26, '宋玺', '11185766';
	
	
	
# 二. 修改语句

/*
1. 修改单表的记录

语法
	UPDATE 表名
	set 列 = 新值, 列 = 新值, ...
	WHERE 筛选条件;
	
2. 修改多表的记录

语法
sql 92
	UPDATE 表一 别名, 表二 别名
	SET 列 = 值, ...
	WHERE 连接条件
	AND 筛选条件
	
sql 99
	UPDATE 表一 别名
	INNER| LEFT | RIGHT JOIN 表二 别名
	ON 连接条件
	SET 列 = 值, ...
	WHERE 筛选条件;
*/
	
# 1. 修改单表的记录
# 案例一 : 修改beauty 表中姓小的女神的电话为 13899888899
UPDATE 
	beauty
SET 
	phone = '13899888899'
WHERE
	`name` LIKE '小%';

# 案例二 : 把二号男神名改成我自己
UPDATE
	boys
SET
	boyName = '易曦翰', userCP = 1000
WHERE
	id = 2;
	
	
# 2. 修改多表的记录

# 修改张无忌的女朋友手机号为 	11799888899
UPDATE
	boys b
INNER JOIN
	beauty be
ON
	b.id = be.boyfriend_id
SET
	be.phone = '11799888899'
WHERE
	b.boyName = '张无忌';
	
# 修改没有男朋友的女神的男朋友编号都为 2 号
UPDATE
	beauty b
SET
	b.boyfriend_id = 2
WHERE
	b.boyfriend_id NOT IN (
	SELECT
		bo.id
	FROM
		boys bo
	) OR b.boyfriend_id IS NULL;
		
UPDATE
	boys bo
RIGHT JOIN 
	beauty b
ON
	bo.id = b.boyfriend_id
SET
	b.boyfriend_id = 2
WHERE
	bo.id IS NULL;
	

# 三. 删除

/*
方式一 : DELETE

1. 单表的删除
语法 :
	DELETE FROM 表名 WHERE 筛选条件

2. 多表的删除
sql 92
DELETE 表一的别名 , 表一的别名 
FROM 表一 别名, 表二 别名
WHERE 连接条件
AND 筛选条件;

sql 99
DELETE 表一的别名 , 表一的别名 
FROM 表一
INNER | LEFT | RIGHT JOIN 表二 别名
ON 连接条件
WHERE 筛选条件

方式二 : TRUNCATE
语法 : 
	TRUNCATE TABLE 表名

*/

# 方式一 : DELETE
# 1. 单表的删除
# 案例一 : 删除手机号以 9 结尾的女神信息
DELETE FROM
	beauty
WHERE
	phone LIKE '%9';
	
# 2. 多表的删除
# 案例二 : 删除张无忌的女朋友信息
DELETE 
	b
FROM
	beauty b
JOIN
	boys bo
ON
	b.boyfriend_id = bo.id
WHERE
	bo.id = 1;

# 案例三 : 删除黄晓明的信息以及他女朋友的信息
DELETE 
	b, bo
FROM
	beauty b
JOIN
	boys bo
ON
	bo.id = b.boyfriend_id
WHERE
	bo.boyName = '黄晓明';
	
# 方式二 : TRUNCATE

# 案例一 : 将所有男神信息删除
TRUNCATE TABLE boys	
	
# DELETE vs TRUNCATE
/*
1. DELETE 可以加 WHERE 条件, TRUNCATE 不能加
2. TRUNCATE 删除, 效率更高
3. 假如要删除的表有自增长列, 
	 如果使用 DELETE 删除后, 再插入数据, 自增长列的值从断点开始
	 如果使用 TRUNCATE 删除后, 再插入数据, 自增长列的值从 1 开始
4. TRUNCATE 删除没有返回值, DELETE 删除有返回值
5. TRUNCATE 删除不能回滚, DELETE 可以回滚
*/	
DELETE FROM boys;

INSERT INTO boys(boyName, userCP)
VALUES('张飞', 10),
('刘备', 20),
('关羽', 30);

TRUNCATE TABLE boys	;

INSERT INTO boys(boyName, userCP)
VALUES('张飞', 10),
('刘备', 20),
('关羽', 30);

	
```



### 练习



```sql
# 1. 运行以下脚本创建表 my_employees
Create table my_employees(
Id int(10),
First_name varchar(10),
Last_name varchar(10),
Userid varchar(10),
Salary double(10,2)
);
create table users(
id int,
userid varchar(10),
department_id int
);

# 2. 显示表 my_employees 的结构
DESC my_employees;

# 3. 向 my_employees 表中插入下列数据 
/*
ID FIRST_NAME LAST_NAME USERID SALARY
1 patel Ralph Rpatel 895
2 Dancs Betty Bdancs 860
3 Biri Ben Bbiri 1100
4 Newman Chad Cnewman 750
5 Ropeburn Audrey Aropebur 1550
*/
INSERT INTO
	my_employees

	(1, 'patel', 'Ralph', 'Rpatel', 895),
	(2, 'Dancs', 'Betty', 'Bdancs', 860),
	(3, 'Biri', 'Ben', 'Bbiri', 1100),
	(4, 'Newman', 'Chad', 'Cnewman', 750),
	(5, 'Ropeburn', 'Audrey', 'Aropebur', 1550);

# 4. 向 users 表中插入数据
/*
1 Rpatel 10
2 Bdancs 10
3 Bbiri 20
4 Cnewman 30
5 Aropebur 40
*/
INSERT INTO
	users
VALUES
	(1, 'Rpatel', 10),
	(2, 'Bdancs', 10),
	(3, 'Bbiri', 20),
	(4, 'Cnewman', 30),
	(5, 'Aropebur', 40);

# 5. 将 3 号员工的 last_name 修改为“drelxer”
UPDATE
	my_employees
SET
	last_name = 'drelxer'
WHERE
	Id = 3;

# 6. 将所有工资少于 900 的员工的工资修改为 1000
UPDATE
	my_employees
SET
	Salary = 1000
WHERE
	Salary < 900;

# 7. 将 userid 为 biri 的 user 表和 my_employees 表的记录全部删除
DELETE 
	u, m
FROM
	users u
JOIN
	my_employees m
ON
	u.userid = 	m.Userid
WHERE
	u.userid = 	'Bbiri';
	
	
# 8. 删除所有数据
TRUNCATE TABLE my_employees;
TRUNCATE TABLE users;

# 9. 检查所作的修正
SELECT * FROM my_employees;
SELECT * FROM users;

# 10. 清空表 my_employees
TRUNCATE TABLE my_employees

```