---
title: MySQL2
date: 2022-03-09
tags:
 - MySQL
categories:
 - MySQL
---
# MySQL



## DDL 语言的学习



### 库的管理




> 创建库

```sql
create database [if not exists] 库名[ character set 字符集名];
```



> 修改库

```sql
alter database 库名 character set 字符集名;
```



> 删除库

```sql
drop database [if exists] 库名;
```



### 表的管理



> 创建表

```sql
create table [if not exists] 表名(
	字段名 字段类型 [约束],
	字段名 字段类型 [约束],
	。。。
	字段名 字段类型 [约束] 

)
```



> 修改表

- 添加列

    ```sql
    alter table 表名 add column 列名 类型 [first|after 字段名];
    ```

    

- 修改列的类型或约束

    ```sql
    alter table 表名 modify column 列名 新类型 [新约束];
    ```

    

- 修改列名

    ```sql
    alter table 表名 change column 旧列名 新列名 类型;
    ```

    

- 删除列

    ```sql
    alter table 表名 drop column 列名;
    ```

    

- 修改表名

    ```sql
    alter table 表名 rename [to] 新表名;
    ```

    

> 删除表

```sql
drop table[if exists] 表名;
```



> 复制表

- 复制表的结构

    ```sql
    create table 表名 like 旧表;
    ```

    

- 复制表的结构+数据

    ```sql
    create table 表名
    select 查询列表 from 旧表[where 筛选];
    ```

    


### 代码



```sql
# DDL

/*
数据定义语言

库和表的管理

一. 库的管理
创建, 修改, 删除

二. 表的管理
创建, 修改, 删除

创建 : CREATE 
修改 : ALTER
删除 : DROP
*/

# 一. 库的管理
# 1. 库的创建

/*
CREATE DATABASE [IF NOT EXISTS] 库名;
*/

# 案例一 : 创建库 books
CREATE DATABASE IF NOT EXISTS books;

# 2. 库的修改

#更改库的字符集
ALTER DATABASE books CHARACTER SET utf8;


# 3. 库的删除
DROP DATABASE IF EXISTS books;


# 二. 表的管理

# 1. 表的创建
/*
CREATE TABLE 表名 (
	列名 列的类型 [(长度) 约束],
	列名 列的类型 [(长度) 约束],
	列名 列的类型 [(长度) 约束],
	...
	列名 列的类型 [(长度) 约束]
)	
*/

# 案例 : 创建 book 表
USE books;
CREATE TABLE book (
	id INT, # 编号
	bname VARCHAR(20), # 书名
	price DOUBLE, # 价格
	authorId INT, # 作者 ID
	publishDate DATETIME # 出版日期
)	

DESC book;

# 案例二 : 创建 author 表
CREATE TABLE IF NOT EXISTS author (
	id INT,
	name VARCHAR(20),
	nation VARCHAR(20)
)

DESC author;

# 2. 表的修改
/*
语法 : 
ALTER TABLE 表名 CHANGE | MODIFY | ADD | DROP | RENAME COLUMN 列名 [列类型 约束]

1. 修改列名
2. 修改列的类型或约束
3. 添加新列
4. 删除列
5. 修改表名
*/

# 1. 修改列名
ALTER TABLE book CHANGE COLUMN publishDate pubDate DATATIME;

# 2. 修改列的类型或约束
ALTER TABLE book MODIFY COLUMN pubDate TIMESTAMP

# 3. 添加新列
ALTER TABLE author ADD COLUMN annual DOUBLE;

# 4. 删除列
ALTER TABLE author DROP COLUMN annual;

# 5. 修改表名
ALTER TABLE author RENAME TO book_author;

DESC book_author

# 3. 表的删除

DROP TABLE IF EXISTS book_author;

SHOW TABLES;


# 通用的写法
DROP DATABASE IF EXISTS 旧库名;
CREATE DATABASE 新库名;

DROP TABLE IF EXISTS 旧表名;
CREATE TABLE 表名();

# 4. 表的复制
INSERT INTO 
	book(id, bname, price, authorId)
VALUES 
	(1, '123', 123.4, 1),
	(2, '45', 12.34, 1),
	(3, 'wad', 1.234, 1),
	(4, 'rg', 12.34, 1);
	
# 1. 仅仅复制表的结构
CREATE TABLE copy LIKE book	

# 2. 复制表的结构和数据
CREATE TABLE copy2
SELECT
	*
FROM
	book;
	
# 只复制部分数据
CREATE TABLE copy3
SELECT
	*
FROM
	book
WHERE
	price > 10;
	
# 仅仅复制某些字段
CREATE TABLE copy4
SELECT
	id, bname
FROM
	book
WHERE
	1 = 2;
	
	
```



### 练习



```sql
# 1. 创建表 dept1
/*
name Null? type
id int(7)
name varchar(25)
*/
CREATE TABLE IF NOT EXISTS dept1 (
	id int(7),
	name varchar(25)
);

# 2. 将表 departments 中的数据插入新表 dept2 中
CREATE TABLE IF NOT EXISTS dept2
SELECT
	*
FROM
	departments;


# 3. 创建表 emp5
/*
name Null? type
id int(7)
First_name Varchar (25)
Last_name Varchar(25)
Dept_id int(7)
*/
CREATE TABLE IF NOT EXISTS emp5 (
	id int(7),
	First_name Varchar (25),
	Last_name Varchar(25),
	Dept_id int(7)
);

# 4. 将列 Last_name 的长度增加到 50
ALTER TABLE emp5 MODIFY COLUMN Last_name VARCHAR(50);
DESC emp5;
 
# 5. 根据表 employees 创建 employees2
CREATE TABLE IF NOT EXISTS employees2 LIKE employees;

# 6. 删除表 emp5
DROP TABLE emp5;

# 7. 将表 employees2 重命名为 emp5
ALTER TABLE employees2 RENAME TO emp5;

# 8 在表 dept 和 emp5 中添加新列 test_column，并检查所作的操作
ALTER TABLE dept1 ADD COLUMN test_column VARCHAR(20);
ALTER TABLE emp5 ADD COLUMN test_column VARCHAR(20);
DESC dept1;
DESC emp5;

# 9.直接删除表 emp5 中的列 dept_id
ALTER TABLE emp5 ADD COLUMN dept_id INT;
DESC emp5;
ALTER TABLE emp5 DROP COLUMN  dept_id;
DESC emp5;

```



### 数据类型



#### 数值型



> 整型

tinyint		smallint		mediumint		int/integer		bigint
		1         		2        			3          				4          			  8



> 特点

- 都可以设置无符号和有符号，默认有符号，通过unsigned设置无符号
- 如果超出了范围，会报out or range异常, 不会插入值
- 长度可以不指定，默认会有一个长度
- 长度代表显示的最大宽度，如果不够则左边用0填充，但需要搭配zerofill，并且默认变为无符号整型 (即不能插入负数)



#### 浮点型



> 定点数：

```sql
decimal(M,D)
```

> 浮点数: 

```sql
float(M,D)   4;
double(M,D)  8;
```



> 特点

- M代表整数部位+小数部位的个数，D代表小数部位
- 如果超出范围，则报out or range异常，不会插入值
- M和D都可以省略，但对于定点数，M默认为10，D默认为0
- 如果精度要求较高，则优先考虑使用定点数
- 如果总位数大于 M , 会直接报错
    如果总位数大于 D , 会进行四舍五入
    如果总位数小于 D , 会填充 0



#### 字符型



char		varchar		binary		varbinary		enum		set		text		blob



char : 固定长度的字符，写法为char(M)，最大长度不能超过M，其中M可以省略，默认为1
		varchar : 可变长度的字符，写法为varchar(M)，最大长度不能超过M，其中M不可以省略



#### 日期型



year年
		date日期
		time时间
		datetime 日期+时间          8 

timestamp 日期+时间         4   比较容易受时区、语法模式、版本的影响，更能反映当前时区的真实时间



#### 代码

```sql
# 常见的数据类型

/*
数值型 : 
	整型
	小数 :
		定点数
		浮点数
		
字符型 : 
			较短的文本 : char VARCHAR
			较长的文本 : text blob(较长的二进制数据)

日期型 :			

*/

# 一. 整型

/*
分类 :
	TINYINT		SMALLINT		MEDIUMINT		INT | INTEGER		BIGINT
	1					2						3						4								8					
	
特点 : 
		1. 如果不设置无符号还是有符号, 默认是有符号, 如果想设置无符号, 需要添加 UNSIGNED 关键字
		2. 如果插入的数组超出了范围, 则直接报错 Out of range value
		3. 如果不设置长度, 会有默认长度
			 长度代表了显示的最大宽度,如果不够会用 0 在左边填充, 但必须搭配 ZEROFILL (使用之后不能插入负数)
*/

# 1. 如何设置无符号和有符号
DROP TABLE IF EXISTS tab_int;

CREATE TABLE tab_int (
	t1 INT,
	t2 INT UNSIGNED,
	t3 INT(7),
	t4 INT(7) ZEROFILL
	# Duplicate column name 't3
	# t3 INT(17)
);

DESC tab_int;

INSERT INTO tab_int
VALUES (-264135, 54684, -123, 123);
SELECT * FROM tab_int;

# 二. 小数

/*
浮点数
FLOAT(M, D)
DOUBLE(M, D)

定点数
DEC(M,D)
DECIMAL(M,D)

特点 : 
	1. M 和 D 可以省略
		 如果是 DECIMAL, 则默认 M 为 10, D 为 0
		 如果是 FLOAT 和 DOUBLE, 则会根据插入的数值的精度来决定精度
		 
		 
		 
	2. M 代表的整数部位 + 小数部位
		 D 代表的是小数部位
		 如果总位数大于 M , 会直接报错
		 如果总位数大于 D , 会进行四舍五入
		 如果总位数小于 D , 会填充 0
		 
	3. 定点型的精确度较高, 如果要求插入数值的精确度较高, 如获取运算等则使用定点型
		 其余使用浮点型即可
*/

# 测试 M 和 D
DROP TABLE tab_float;
CREATE TABLE IF NOT EXISTS tab_float (
	t1 DOUBLE,
	t2 FLOAT(5, 2),
	t3 DECIMAL(5, 2)
);

DESC tab_float;

INSERT INTO tab_float VALUES (123.45, 123.45, 123.45);
INSERT INTO tab_float VALUES (123.456, 123.456, 123.456);
INSERT INTO tab_float VALUES (123.4, 123.4, 123.4);
INSERT INTO tab_float VALUES (12323.45, 123.45, 12323.45);

SELECT
	*
FROM
	tab_float;
	
# 原则
/*
所选择的类型越简单越好, 能保存的数值类型越小越好
*/		

# 三. 字符型

/*
较短的文本 : 
char
varchar
较长的文本
text
blob

其他 : 
binary 和 varbinary 用于保存较短的二进制
enum 用于保存枚举
set 用于保存集合

特点 : 
						写法								M 的意思														特点								空间的耗费			效率
char				char(M)							最大的字符数, 可以省略, 默认为一		固定长度的字符串		比较耗费				高

varchar			varchar(M)					最大的字符数, 不可以省略						可变长度的字符串		比较节省				低


*/

CREATE TABLE IF NOT EXISTS tab_char (
	c1 enum('a', 'b', 'c')

);

INSERT INTO tab_char VALUES ('a');
INSERT INTO tab_char VALUES ('b');
INSERT INTO tab_char VALUES ('c');
INSERT INTO tab_char VALUES ('A');
# Data truncated for column 'c1' at row 1
# INSERT INTO tab_char VALUES ('M');


SELECT * FROM tab_char;


CREATE TABLE IF NOT EXISTS tab_set (
	s1 SET('a', 'b', 'c', 'd')

)

INSERT INTO tab_set VALUES ('a');

# 逗号后面不能加空格
INSERT INTO tab_set VALUES ('a,b,c');
INSERT INTO tab_set VALUES ('A');

SELECT * FROM tab_set;


# 日期型

/*
分类 : 
date : 只保存日期
 
time : 只保存时间

year : 只保存年

datetime : 保存 日期 + 时间

timestamp : 保存 日期 + 时间

特点 : 
	
								字节									范围								时区等的影响
datetime				8											1000-9999						5.7中已受时区影响

timestamp				4											1970-2039						受


*/
DROP TABLE IF EXISTS tab_date;

CREATE TABLE tab_date (
	t1 DATETIME,
	t2 TIMESTAMP
);

INSERT INTO tab_date VALUES(NOW(), NOW());

SELECT * FROM tab_date;

# 查看时区
SHOW VARIABLES LIKE 'time_zone';

SET time_zone = '-8:00';

```



### 约束



#### 常见约束



```sql
NOT NULL : 非空, 该字段的值必填
UNIQUE : 唯一, 该字段的值不可重复
DEFAULT : 默认, 该字段的值不用手动插入有默认值
CHECK : 检查, MySQL 不支持
PRIMARY KEY : 主键, 该字段的值不可重复并且非空, UNIQUE + NOT NULL
FOREIGN KEY : 外键, 该字段的值引用了另外的表的字段
```



> 主键和唯一

- 区别
    - 一个表至多有一个主键, 但可以有多个唯一
    - 主键不允许为空, 唯一可以为空
- 相同点
    - 都具有唯一性
    - 都支持组合键, 但不推荐



> 外键

- 用于限制两个表的关系, 从表的字段值引用了主表的某字段值

- 外键列和主表的被引用列要求类型一致, 意义一样, 名称无要求

- 主表的被引用列要求是一个 key (一般就是主键)

- 插入数据, 先插入主表

    删除数据, 先删除从表

    可以通过以下两种方式来删除主表的记录

    - 方式一 : 级联删除
		```sql
		ALTER TABLE stuinfo ADD CONSTRAINT fk_stu_major FOREIGN KEY(majorid) REFERENCES major(id) ON DELETE CASCADE;
		```
    - 方式二 : 级联置空
		```sql
		ALTER TABLE stuinfo ADD CONSTRAINT fk_stu_major FOREIGN KEY(majorid) REFERENCES major(id) ON DELETE SET NULL;
		```


#### 创建表是添加约束

> 语法

```sql
create table 表名(
	字段名 字段类型 not null, # 非空
	字段名 字段类型 primary key, # 主键
	字段名 字段类型 unique, # 唯一
	字段名 字段类型 default 值, # 默认

	constraint 约束名 foreign key(字段名) references 主表（被引用列）
)
```

> 注意

| 分类 | 支持类型 | 可以起约束名 |
| :----: | :----: | :----: |
| 列级约束 | 除了外键 | 不可以 |
| 表级约束 | 除了非空和默认 | 可以, 但是对主键无效 |

#### 修改表时添加或者删除约束

- 非空
  - 添加非空
    ```sql
	  alter table 表名 modify column 字段名 字段类型 not null;
	  
	- 删除非空
	
	    ```sql
	    alter table 表名 modify column 字段名 字段类型;
	
- 默认
  - 添加默认
	```sql
	alter table 表名 modify column 字段名 字段类型 default 值;
	```
  - 删除默认
	```sql
	alter table 表名 modify column 字段名 字段类型;
	```
- 主键
  - 添加主键
	```sql
	alter table 表名 add [ constraint 约束名] primary key(字段名);
	```
  - 删除主键
	```sql
	alter table 表名 drop primary key;
	```
- 唯一
  - 添加唯一
	```sql
	alter table 表名 add [ constraint 约束名] unique(字段名);
	```
  - 删除唯一
	```sql
	alter table 表名 drop index 索引名;
	```
- 外键
  - 添加外键
	```sql
	alter table 表名 add [ constraint 约束名] foreign key(字段名) references 主表（被引用列）;
	```
  - 删除外键
	```sql
	alter table 表名 drop foreign key 约束名;
	```



#### 自增长列



> 特点

1. 不用手动插入值, 可以自动提供序列值, 默认从 1 开始, 步长为 1
	auto_increment_increment  ---> 步长
	如果要更改起始值 : 手动插入值
	如果要更改步长 : 更改系统变量
	`set auto_increment_increment = 值`
2. 一个表至多有一个自增长列	
3. 自增长列只能支持数值型
4. 自增长列必须为一个 key


- 创建表是设置自增长列
    ```sql
    create table 表(
        字段名 字段类型 约束 auto_increment
    );
    ```
- 修改表时设置自增长列
    ```sql
    alter table 表 modify column 字段名 字段类型 约束 auto_increment;
    ```
- 删除自增长列
    ```sql
    alter table 表 modify column 字段名 字段类型 约束;
    ```



##### 代码



```sql
# 标识列

/*
又称为自增长列

含义 : 可以不用手动的插入值, 系统提供默认的序列值

特点 : 
	1. 标识列必须和主键搭配吗 ? 
		 不一定, 要要求是一个 key
	
	2. 一个表中, 最多只有一个标识列		 
	
	3. 标识列的类型只能是数值类型
	
	4. 标识列可以通过 SET AUTO_INCREMENT_increment = 1; 设置步长
		 也可以通过手动插入值设置起始值
		 

							创建语法的关键字				是否实际占用物理空间																使用
	
	视图				CREATE VIEW							没有(没有为数据开辟空间, 只是保存了 sql 逻辑)			增删改查, 一般不能增删改
	
	表	 				CREATE TABLE						占用(为数据开辟了空间)														增删改查

*/

# 一. 创建表时设置标识列
DROP TABLE IF EXISTS tab_identity;

CREATE TABLE IF NOT EXISTS tab_identity (
	id INT PRIMARY KEY AUTO_INCREMENT,
	`name` VARCHAR(20)
);

TRUNCATE TABLE tab_identity;

INSERT INTO tab_identity(id, `name`) VALUES (10, 'tom');
INSERT INTO tab_identity(id, `name`) VALUES (NULL, 'tom');

SELECT * FROM tab_identity;

SHOW VARIABLES LIKE '%auto_increment%';

SET AUTO_INCREMENT_increment = 1;


# 二. 修改表时设置标识列

DROP TABLE IF EXISTS tab_identity;

CREATE TABLE IF NOT EXISTS tab_identity (
	id INT,
	`name` VARCHAR(20)
);


ALTER TABLE tab_identity MODIFY COLUMN id INT PRIMARY KEY AUTO_INCREMENT;


# 三. 修改表时删除标识列

ALTER TABLE tab_identity MODIFY COLUMN id INT;
```



#### 代码



```sql
# 常见约束

/*

含义 : 一种限制, 用于限制表中的数据,为了保证表中的数据的准确和可靠性(一致性)

分类 : 六大约束
	
	NOT NULL : 非空, 用于保证该字段的值不能为空
	比如 : 姓名, 学号等
	
	DEFAULT : 默认, 用于保证该字段有默认值
	比如 : 性别等
	
	PRIMARY : 主键, 用于保证该字段的值具有唯一性, 且非空
	比如 : 学号, 员工编号等
	
	UNIQUE : 唯一, 用于保证该字段的值具有唯一性, 可以为空
	比如 : 座位号, 身份证号等
	
	CHECK : 检查约束 [MySQL 中不支持], 用于加条件, 符合条件才能插入
	比如 : 性别(男 | 女), 年龄(0 ~ 120)等
	
	
	FOREIGN KEY : 外键, 用于限制两个表的关系, 用于保证该字段的值必须来自于主表的关联列的值
								在从表中添加外键约束, 用于引用主表中某列的值
	比如 : 专业编号, 员工表的部门编号等
	
添加约束的时机 : 
	1. 创建表时
	2. 修改表时
								
约束的添加分类 :
	
	列级约束 :
		1. 六大约束语法上都支持, 但外键约束没有效果
		
	表级约束
		2. 除了非空和默认, 其他的都支持

语法 : 
CREATE TABLE 表名 (
	字段名 字段类型 列级约束,
	字段名 字段类型
	表记约束
)

主键和唯一的大对比 : 
		
							保证唯一性							是否允许为空						一个表中可以有多少个									是否允许组合
	主键				√												x												至多有一个(5.7可以有多个?)						√, 但不推荐
	唯一				√												√												可以有多个														√, 但不推荐
	INSERT into major VALUES(1, 'java');
	INSERT into major VALUES(2, 'h5');
	INSERT into stuinfo VALUES(2, 'join', '男', null , null, 1);
	INSERT into stuinfo VALUES(2, 'join', '男', null , null, 1);
	TRUNCATE TABLE stuinfo;
	
	
外键 :
		1. 要求在从表设置外键关系
		2. 从表的外键列的类型和主表的关联列的类型要求一致或兼容, 名称五要求
		3. 主表的关联列必须是一个key (一般是主键或者唯一键)
		4. 插入数据时, 先插主表的数据, 再插入从表的数据
			 删除数据时, 先删除从表的数据, 再删除主表的数据
			 
			 
							位置										支持的约束类型												是否可以起约束名
	列级约束		列的后面								语法上都支持, 但是外键没有效果				不可以
	表级约束		所有列的后面						默认和非空不支持, 其他都支持					可以(主键没有效果)
*/

# 一. 创建表是添加约束

CREATE DATABASE IF NOT EXISTS students;
USE students;
DROP TABLE IF EXISTS stuinfo;
DROP TABLE IF EXISTS major;


# 1. 添加列级约束

/*

语法 : 

直接在字段名和类型后面追加 约束类型即可

只支持 : 默认 非空 主键 唯一

*/


CREATE TABLE IF NOT EXISTS stuinfo (
	id INT PRIMARY KEY, # 主键
	stuName VARCHAR(20) NOT NULL, # 非空
	gender CHAR(1) CHECK(gender IN ('男', '女')), #检查 
	seat INT UNIQUE, # 唯一约束
	age INT DEFAULT 18, # 默认约束
	majorId INT REFERENCES major(id) # 外键
);

CREATE TABLE IF NOT EXISTS major(
	id INT PRIMARY KEY,
	majorName VARCHAR(20) NOT NULL
);

DESC stuinfo;

# 查看 stuinfo, 包括主键 外键 唯一
SHOW INDEX FROM stuinfo;

# 添加外键
ALTER TABLE stuinfo ADD CONSTRAINT majorId FOREIGN KEY (id)
REFERENCES major (id)
ON DELETE CASCADE ON UPDATE CASCADE


# 2. 添加表级约束

/*

语法 : 在各个字段的最下面
[CONSTRAINT 约束名] 约束类型 (字段名)
*/

CREATE TABLE IF NOT EXISTS stuinfo (
	id INT, # 主键
	stuName VARCHAR(20), # 非空
	gender CHAR(1), #检查 
	seat INT, # 唯一约束
	age INT, # 默认约束
	majorId INT, # 外键
	
	PRIMARY KEY (id, stuName), # 主键
	UNIQUE (seat), # 唯一键
	CHECK (gender IN ('男', '女')), # 检查
	FOREIGN KEY (majorId) REFERENCES major(id) # 外键
	
);

SHOW INDEX FROM stuinfo;

# 通用的写法 : 
CREATE TABLE IF NOT EXISTS stuinfo (
	id INT PRIMARY KEY,
	stuName VARCHAR(20) NOT NULL,
	gender CHAR(1), 
	age INT,
	seat INT UNIQUE,
	majorId INT,
	
	CONSTRAINT fk_stuinfo_major FOREIGN KEY (majorId) REFERENCES major(id)
)

# 二. 修改表时添加约束

/*
1. 添加列级约束
ALTER TABLE 表名 MODIFY COLUMN 字段名 字段类型 新约束

2. 添加表级约束
ALTER TABLE 表名 ADD [CONSTRAINT 约束名] 约束类型(字段名) [外键的引用]

*/

DROP TABLE IF EXISTS stuinfo;

CREATE TABLE IF NOT EXISTS stuinfo (
    id INT,
    stuName VARCHAR(20),
    gender CHAR(1), 
    age INT,
    seat INT,
    majorId INT
);

DESC stuinfo;

# 1. 添加非空约束
ALTER TABLE stuinfo MODIFY COLUMN stuName VARCHAR(20) NOT NULL;


# 2. 添加默认约束
ALTER TABLE stuinfo MODIFY COLUMN age INT DEFAULT 18;

# 3. 添加主键
# 列级约束
ALTER TABLE stuinfo MODIFY COLUMN id INT PRIMARY KEY;
# 表级约束
ALTER TABLE stuinfo ADD PRIMARY KEY (id);

# 4. 添加唯一键
# 列级约束
ALTER TABLE stuinfo MODIFY COLUMN seat INT UNIQUE;
# 表级约束
ALTER TABLE stuinfo ADD UNIQUE (seat);

# 5. 添加外键
ALTER TABLE stuinfo ADD CONSTRAINT fk_stuinfo_major FOREIGN KEY(majorId) REFERENCES major(id);


# 三. 修改表时删除约束

SHOW INDEX FROM stuinfo;

# 1. 删除非空约束
ALTER TABLE stuinfo MODIFY COLUMN stuName VARCHAR(20);

# 2. 删除默认约束
ALTER TABLE stuinfo MODIFY COLUMN age INT;

# 3. 删除主键
# 列级约束
ALTER TABLE stuinfo MODIFY COLUMN id INT;
# 表级约束 (推荐)
ALTER TABLE stuinfo DROP PRIMARY KEY;

# 4. 删除唯一键
# 列级约束
ALTER TABLE stuinfo MODIFY COLUMN seat;
# 表级约束(推荐)
ALTER TABLE stuinfo DROP INDEX seat;

# 5. 删除外键
ALTER TABLE stuinfo DROP FOREIGN KEY fk_stuinfo_major;

```



#### 练习



```sql
# 1. 向表 emp2 的 id 列中添加 PRIMARY KEY 约束（my_emp_id_pk）
ALTER TABLE emp2 ADD CONSTRAINT my_emp_id_pk PRIMARY KEY (id);

# 2. 向表 dept2 的 id 列中添加 PRIMARY KEY 约束（my_dept_id_pk）
ALTER TABLE dept2 ADD CONSTRAINT my_dept_id_pk PRIMARY KEY (id);

# 3. 向表 emp2 中添加列 dept_id，并在其中定义 FOREIGN KEY 约束，与之相关联的列是dept2 表中的 id 列。
ALTER TABLE emp2 ADD COLUMN dept_id INT;
ALTER TABLE emp2 ADD CONSTRAINT fk_emp2_dept2 FOREIGN KEY (dept_id) REFERENCES dept2(id);

```



## TCL 语言



### 事务



#### 概念



> 含义

事务 : 一条或多条 sql 语句组成一个执行单位, 一组 sql 语句要么都执行, 要么都不执行



> 特点(ACID)

- 原子性 : 一个事务是不可再分割的整体, 要么都执行, 要么都不执行
- 一致性 : 一个事务可以使数据从一个一致状态切换到另一个一致的状态
- 隔离性 : 一个事务不受其他事务的干扰, 多个事务互相隔离的
- 持久性 : 一个事务一但提交了, 则永久的持久化到本地



#### 事务的使用步骤



> 了解

隐式(自动)事务 : 没有明显的开启和结束, 本身就是一条事务可以自动提交, 比如 insert, update, delete
显式事务 : 具有明显的开启和结束



> 使用显示事务



- 开启事务
	```sql
	set autocommit = 0;
	start transaction; # 可以省略
	```
- 编写一组逻辑 sql 语句
	注意 : sql 语句支持的是 insert update delete

  - 设置回滚点	
	```sql
	savepoint 回滚点名;
	```
- 结束事务
  - 提交 : `commit;`
  - 回滚 : `rollback;`
  - 回滚到指定地方 : `rollback to 回滚点名`



#### 并发事务



> 事务的并发问题是如何发生的 ?

多个事务同时操作同一个数据库的相同数据时



> 并发问题都有哪些 ? 

- 脏读 : 一个事务读取了其他事务还没有提交的数据, 读到的是其他事务 '更新' 的数据
- 不可重复读 : 一个事务多次读取, 结果不一样
- 幻读 : 一个事务读取了其他事务还没有提交的数据, 只是读到的是其他事务 '插入' 的数据



> 如何解决并发问题 ? 

通过设置隔离级别来解决并发问题



> 隔离级别

| 分类 | 脏读 | 不可重复度 | 幻读 |
| :----: | :----: | :----: | :----: |
| read uncommitted : 读未提交 | x | x | x |
| read committed : 读已提交 | √ | x | x |
| repeatable read : 可重复读 | √ | √ | x |
| serializable : 串行化 | √ | √ | √ |



#### 代码



```sql
# TCL

/*
Transaction Control Language 事务控制语言

事务 : 
	一个或者一组 sql 语句组成一个执行单元, 这个执行单元要么全部执行, 要么全部不执行
	
案例 : 转账

张三丰		1000
郭襄			1000
UPDATE 表 SET 张三丰的余额 = 500 WHERE name = '张三丰';	
UPDATE 表 SET 张三丰的余额 = 1500 WHERE name = '张三丰';

事务的特性 :
	ACID
	原子性 : 一个事务不可再分割, 要么都执行, 要么都不执行
	一致性 : 一个事务执行会使数据从一个一致状态切换到另一个一致状态
	隔离性 : 一个事务的执行不收其他事务的干扰
	持久性 : 一个事务一旦提交, 就会永久的改变数据库的数据
	
	
事务的创建
	隐式的事务 : 事务没有明显的开启和结束的标记
	比如 insert update delete 语句
	
	delete from 表 where id = 1;
	
	显式事务 : 事务具有明显的开启和结束的标记
	前提 : 必须先设置自动提交功能为禁用
	
	set autocommit = 0;
	
	开启事务的语句;
	UPDATE 表 SET 张三丰的余额 = 500 WHERE name = '张三丰';	
	UPDATE 表 SET 张三丰的余额 = 1500 WHERE name = '张三丰';
	结束事务的语句;
	
	
	步骤一 : 开始事务
	set autocommit = 0;
	start TRANSACTION; 可选的
	
	步骤二 : 编写事务中的 sql 语句 (select insert update delete)
	语句 1
	语句 2
	语句 3
	...
	
	步骤三 : 结束事务
	commit; 提交事务
	rollback; 回滚事务
	
	
	SAVEPOINT 节点名; : 保存点
	
事务的隔离级别

															脏读				不可重复读				幻读
		read uncommitted :					√							√								√
		read commited :							x							√								√
		repeatable read : 					x							x								√
		serializable : 							x							x								x
		
		mysql 中默认第三个隔离级别 : repeatable read
		oracle 中默认第二个隔离级别 : read commited
		
		
		查看隔离级别 : 
			select @@tx_isolation;
		设置隔离级别 :
			set session | global transaction isolation level 隔离级别;
*/


# 查看数据库引擎
SHOW ENGINES;

# 查看是否开启自动提交
SHOW VARIABLES LIKE '%autocommit%';


# 演示事务的使用步骤

DROP TABLE IF EXISTS account;

CREATE TABLE IF NOT EXISTS account (
	id INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(20),
	balance DOUBLE
);

INSERT INTO 
	account(username, balance)
VALUES 
	('张无忌', 1000), ('赵敏', 1000);
	
SELECT * FROM account;

# 开启事务
SET autocommit = 0;

# 编写一组事务的语句 
UPDATE account SET balance = 1500 WHERE username = '张无忌';
UPDATE account SET balance = 1500 WHERE username = '赵敏';

# 关闭事务;

# 回滚
ROLLBACK;
# 提交
commit;

# 3. 演示 savepoint 的使用
SET autocommit = 0;

DELETE FROM account WHERE id = 25;

SAVEPOINT a; # 设置保存点

DELETE FROM account WHERE id = 28;

ROLLBACK TO a; # 回滚到保存点

# DELETE 和 TRUNCATE 的区别

/*

DELETE 支持回滚
TRUNCATE 不支持回滚
*/

# 演示 DELETE
SET autocommit = 0;
START TRANSACTION;
DELETE FROM account;
ROLLBACK;

# 演示 TRUNCATE
SET autocommit = 0;
START TRANSACTION;
TRUNCATE TABLE account;
ROLLBACK;

```



#### 练习



```sql
# 1. 创建一个表，里面有 id 为主键，stuname 唯一键，seat 座位号，要求将 id 设置成自增
CREATE TABLE tab_1 (
	id INT PRIMARY KEY AUTO_INCREMENT,
	stuname VARCHAR(20) UNIQUE,
	seat INT
);

DESC tab_1;

# 2. 要求用事务的方式插入 3 行数据
SET autocommit = 0;
INSERT INTO tab_1
VALUES
	(NULL, '张三', 1), 
	(NULL, '李四', 2), 
	(NULL, '王麻子', 3);

SELECT
	*
FROM
	tab_1;
COMMIT;	


# 3. 要求用事务的方式删除数据，并回滚
SET autocommit = 0;
DELETE FROM tab_1;
ROLLBACK;
SELECT * FROM tab_1;


# 4. 创建表 Book 表, 字段如下 :
/*
	bid 整型, 要求主键,
	bname 字符型 要求设置唯一键, 并非空,
	price 浮点型 要求有默认值 10,
	btypeId 类型编号, 要求引用 bookType 表的 id 字段
	
	已知 bookType 表, 字段如下
	id
	name
*/
CREATE TABLE Book (
	bid INT PRIMARY KEY AUTO_INCREMENT,
	bname VARCHAR(20) NOT NULL UNIQUE,
	price DOUBLE DEFAULT 10,
	btypeId INT,
	
	CONSTRAINT fk_stuinfo_major FOREIGN KEY (btypeId) REFERENCES bookType(id)
);

CREATE TABLE bookType (
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20)
);

# 5. 开启事务, 向表中插入一行数据, 并结束
SET autocommit = 0;
INSERT INTO 
	Book
VALUES
	(NULL, '白雪公主4', 93, null);
COMMIT;	 
SELECT * FROM Book;

# 6. 创建视图, 实现查询价格大于 100 的书名和类型名
CREATE OR REPLACE VIEW v1
AS
SELECT
	b.bname,
	b.btypeId
FROM
	Book b
JOIN
	bookType bt
ON
	b.btypeId = bt.id
WHERE
	b.price > 100;
SELECT * FROM v1;	

# 7. 修改视图, 实现查询价格在 90 ~ 120 之间的书名和价格
ALTER VIEW v1
AS
SELECT
	bname,
	price
FROM
	Book
WHERE
	price BETWEEN 90 AND 120;
SELECT * FROM v1;

# 7. 删除刚才建的视图
DROP VIEW v1;

```



## 其他



### 视图



> 含义

mysql 5.1 版本出现的新特性, 本身是一个虚拟表, 它的数据来自于表, 通过执行时动态生成

==好处 :==
- 简化了 sql 语句
- 提高了 sql 的重用性
- 保护基表的数据, 提高了安全性



#### 使用视图



> 创建视图

```sql
create view 视图名
as
查询语句;
```

> 修改视图

- 方式一 : 
	```sql
	create or replace view 视图名
	as
	查询语句;
	```

- 方式二 : 
	```sql
	alter view 视图名
	as
	查询语句;
	```

> 删除视图

```sql
drop view 视图名;
```

> 查看视图

```sql
desc 视图名;
show create view 视图名;
```

> 使用视图

- 插入 : 
	`insert`
- 修改 : 	
	`update`
- 删除 : 	
	`delete`
- 查看 : 	
	`select`

**注意 : 视图一般用于查询的, 而不是更新的, 所以具备以下特点的视图都不允许更新**
- 包含分组函数, group by, distinct, having, union
- join
- 常量视图
- where 后的子查询用到了 from 中的表
- 用到了不可更新的视图



#### 视图和表的对比

| 分类 | 关键字 | 占用物理空间大小 | 使用 |
| :----: | :----: | :----: | :----: |
| 视图 | view | 占用很小, 只保存 sql 逻辑 | 一般用于查询 |
| 表 | table | 保存实际的数据, 占用较大 | 增删改查 |



#### 代码



```sql
# 视图

/*
含义 : 虚拟表, 和普通表一样使用

mysql 5.1 版本出现的新特性, 是通过动态表生成的数据

比如 : 关于舞蹈班和普通班的区别

特点 : 
	1. 临时性

*/

USE students;

# 案例 : 查询姓张的学生名和专业名
SELECT
	stuName, 
	majorName
FROM
	stuinfo s
JOIN
	major m
ON
	m.id = s.majorId
WHERE
	s.stuName LIKE '张%';
	
# 封装成视图
CREATE VIEW v1
AS
SELECT
	stuName, 
	majorName
FROM
	stuinfo s
JOIN
	major m
ON
	m.id = s.majorId
WHERE
	s.stuName LIKE '张%';	
	
SELECT
	*
FROM
	v1	
WHERE
	stuName LIKE '张%';
	
# 一. 创建视图

/*

语法 :
CREATE VIEW 视图名
AS
查询语句;

*/	

# 案例一 : 查询邮箱中包含 'a' 字符的员工名 部门名和工种信息
CREATE VIEW v1
AS
SELECT
	e.last_name,
	d.department_name,
	j.job_title,
	e.email
FROM
	employees e
JOIN
	departments d
ON
	e.department_id = d.department_id
JOIN
	jobs j
ON
	j.job_id = e.job_id
WHERE
	e.email LIKE '%a%';
	
	
# 案例二 : 查询各部门的平均工资级别
CREATE VIEW v2
AS
SELECT
	avg_s.avgSalary,
	j.grade_level,
	avg_s.department_id
FROM
	(
	SELECT
		AVG(e.salary) avgSalary,
		e.department_id
	FROM
		employees e
	GROUP BY
		e.department_id
		) avg_s
JOIN
	job_grades j
ON
	avg_s.avgSalary BETWEEN j.lowest_sal AND j.highest_sal;


# 案例三 : 查询平均工资最低的部门信息
CREATE VIEW v3
AS
SELECT
	d.*,
	minAvg.avgSalary
FROM
	departments d
JOIN
	(
	SELECT
		AVG(e.salary) avgSalary,
		e.department_id
	FROM
		employees e
	GROUP BY
		e.department_id
	ORDER BY
		avgSalary
	limit
		1
	) minAvg
ON
	d.department_id = minAvg.department_id;	
		

# 案例四 : 查询平均工资最低的部门名和工资
CREATE VIEW v4
AS
SELECT
	d.department_name,
	minAvg.avgSalary
FROM
	departments d
JOIN
	(
	SELECT
		AVG(e.salary) avgSalary,
		e.department_id
	FROM
		employees e
	GROUP BY
		e.department_id
	ORDER BY
		avgSalary
	limit
		1
	) minAvg
ON
	d.department_id = minAvg.department_id;	
	

# 二. 视图的修改

# 方式一 :

/*

CREATE OR REPLACE VIEW 视图名
AS
查询语句;

*/	


# 方式二 :
/*

ALTER VIEW 视图名
AS
查询语句;

*/

# 三. 删除视图

/*

语法 :
DROP VIEW 视图名 1, 视图名 2, ....;
*/
DROP VIEW v1, v2, v3;


# 四. 查看视图

DESC v4;

SHOW CREATE VIEW v4;

# 五. 视图的更新

CREATE OR REPLACE VIEW myv1
AS
SELECT
	Last_name,
	email
FROM
	employees;
	
# 1. 插入	
INSERT INTO myv1
VALUES ('张飞', 'zf@qq.com')

# 2. 修改
UPDATE
	myv1
SET
	last_name = '张无忌'
WHERE
	last_name = '张飞';
	
# 3. 删除
DELETE FROM myv1
WHERE last_name = '张无忌'	

# 具备以下特点的视图是不允许更新的

/*
1. 包含以下关键字的 sql 语句 : 分组函数, DISTINCT, GROUP BY, HAVING, UNION, UNION ALL

2. 常量视图

3. SELECT 中包含子查询的

4. JOIN

5. FROM 一个不能更新的视图

6. WHERE 子句的子查询引用了 FROM 子句中的表

*/


# 1. 包含以下关键字的sql语句：分组函数、distinct、group  by、having、union或者union all

CREATE OR REPLACE VIEW myv1
AS
SELECT MAX(salary) m,department_id
FROM employees
GROUP BY department_id;

SELECT * FROM myv1;

#更新
UPDATE myv1 SET m=9000 WHERE department_id=10;

# 2. 常量视图
CREATE OR REPLACE VIEW myv2
AS

SELECT 'john' NAME;

SELECT * FROM myv2;

#更新
UPDATE myv2 SET NAME='lucy';





# 3. Select中包含子查询

CREATE OR REPLACE VIEW myv3
AS

SELECT department_id,(SELECT MAX(salary) FROM employees) 最高工资
FROM departments;

#更新
SELECT * FROM myv3;
UPDATE myv3 SET 最高工资=100000;


# 4. join
CREATE OR REPLACE VIEW myv4
AS

SELECT last_name,department_name
FROM employees e
JOIN departments d
ON e.department_id  = d.department_id;

#更新

SELECT * FROM myv4;
# 这个可以
UPDATE myv4 SET last_name  = '张飞' WHERE last_name='Whalen';
# 这个不行
INSERT INTO myv4 VALUES('陈真','xxxx');



# 5. from一个不能更新的视图
CREATE OR REPLACE VIEW myv5
AS

SELECT * FROM myv3;

#更新

SELECT * FROM myv5;

UPDATE myv5 SET 最高工资=10000 WHERE department_id=60;



# 6. where子句的子查询引用了from子句中的表

CREATE OR REPLACE VIEW myv6
AS

SELECT last_name,email,salary
FROM employees
WHERE employee_id IN(
	SELECT  manager_id
	FROM employees
	WHERE manager_id IS NOT NULL
);

#更新
SELECT * FROM myv6;
UPDATE myv6 SET salary=10000 WHERE last_name = 'k_ing';

```



#### 练习



```sql
# 1、创建视图 emp_v1,要求查询电话号码以‘011’开头的员工姓名和工资、邮箱
CREATE VIEW emp_v1
AS
SELECT
	e.last_name,
	e.salary,
	e.email,
	e.phone_number
FROM
	employees e
WHERE
	e.phone_number LIKE '011%';

# 2、要求将视图 emp_v1 修改为查询电话号码以‘011’开头的并且邮箱中包含 e 字符的员工姓名和邮箱、电话号码
ALTER VIEW emp_v1
AS
SELECT
	e.last_name,
	e.email,
	e.phone_number
FROM
	employees e
WHERE
	e.phone_number LIKE '011%'
	AND e.email LIKE '%e%';

 
# 3、向 emp_v1 插入一条记录，是否可以？ 可以
INSERT INTO emp_v1
VALUES ('Javk', '31134rt@gamil.com', '011.43.1344.429268')


# 4、修改刚才记录中的电话号码为‘0119’



# 5、删除刚才记录


# 6、创建视图 emp_v2，要求查询部门的最高工资高于 12000 的部门信息
CREATE VIEW emp_v2
AS
SELECT
	e.department_id,
	MAX(e.salary)	max
FROM
	employees e
GROUP BY
	e.department_id
HAVING
	max > 12000;
	
SELECT
	d.*
FROM
	departments d
JOIN
	emp_v2 e
ON
	d.department_id = e.department_id;

# 7、向 emp_v2 中插入一条记录，是否可以？


# 8、删除刚才的 emp_v2 和 emp_v1
DROP VIEW emp_v2, emp_v1;
```



### 变量



#### 系统变量



> 说明

变量由系统提供的, 不用自定义



> 语法

- 查看系统变量
	```sql
	show [global|session ]variables like ''; # 如果没有显式声明global还是session，则默认是session
	```
- 查看指定的系统变量的值
	```sql
	select @@[global|session ].变量名; # 如果没有显式声明global还是session，则默认是session
	```
- 为系统变量赋值
  - 方式一 :
	```sql
	set [global|session ] 变量名=值; # 如果没有显式声明global还是session，则默认是session
	```

  - 方式二 :	
	```sql
	set @@global.变量名=值;
	set @@变量名=值；
	```
	
	

> 全局变量

服务器层面上的, 必须拥有 supper 权限才能为系统变量赋值, 作用域为整个服务器, 也就是针对所有连接 (会话) 有效



> 会话变量

服务器为每一个连接的客户端都提供了系统变了, 作用域为当前的连接 (会话)



#### 自定义变量



##### 用户变量



> 说明

- 用户变量
  - 作用域 : 针对于当前连接 (会话) 有效
  - 位置 : begin end 里面, 也可以放在外面

> 使用

- 声明并赋值 : 
	```sql
	set @变量名 = 值;
	set @变量名 := 值;
	select @变量名 := 值;
	```
- 更新值 : 
  - 方式一 : 同声明并赋值
	```sql
	set @变量名 = 值;
	set @变量名 := 值;
	select @变量名 := 值;
	```
  - 方式二 : 
	```sql
	select xx into @变量名 from 表;
	```
- 使用	
	```sql
	select @变量名;
	```



##### 局部变量



> 说明

- 局部变量
  - 作用域 : 仅仅在定义它的 begin end 中有效
  - 位置 : 只能放在 begin end 中, 而且只能放在第一句

> 使用

- 声明
	```sql
	declare 变量名 类型 [default 值];
	```
- 赋值或更新
  - 方式一 : 
	```sql
	set @变量名 = 值;
	set @变量名 := 值;
	select @变量名 := 值;
	```
  - 方式二 : 
	```sql
	select xx into 变量名 from 表;
	```
- 使用
	```sql
	select 变量名;
	```



#### 代码



```sql
# 变量

/*
 系统变量 :
    全局变量
    会话变量

 自定义变量
    用户变量
    局部变量

 */

# 一. 系统变量
/*
 说明 : 变量是由系统提供的, 不是用户定义, 属于服务器层面

 注意 :
    如果是全局级别, 则需要加 global
    如果是会话级别, 则需要加 session
    如果不写, 则默认 session

 使用的语法 :
    1. 查看所有的系统变量
    show global | [session] variables;

    2. 查看满足条件的部分系统变量
    show global | [session] variables like '%char%';

    3. 查看某个指定的某个系统变量的值
    select @@global | [session].系统变量名;

    4. 为某个具体的系统变量赋值
    方式一 :
    set global | [session] .系统变量名 = 值;
    方式二 :
    set @@global | [session] .系统变量名 = 值;

 */

# 1. 全局变量

/*
 作用域 : 服务器每次启动会将所有的全局变量赋初始值, 针对于所有的会话 (连接) 有效, 但不能跨重启
 */

# 查看所有的全局变量
show global variables;

# 查看部分的全局变量
show global variables like '%char%';

# 查看指定的全局变量的值
select @@global.autocommit;

select @@tx_isolation;

# 为某个指定的全局变量赋值
set @@global.autocommit = 0;


# 2. 会话变量
/*
 作用域 : 仅仅针对于当前会话 (连接) 有效
 */

# 查看所有的会话变量
show session variables;
show variables;

# 查看部分的会话变量
show variables like '%char%';
show session variables like '%char%';

# 查看指定的某个会话变量
select @@tx_isolation;
select @@session.tx_isolation;

# 为某个会话变量赋值
# 方式一
set @@session.tx_isolation = 'read-uncommitted';
# 方式二
set session tx_isolation = 'read-committed';


# 二. 自定义变量

/*
 说明 : 变量是用户自定义的, 不是由系统的

 使用步骤 :
    声明
    赋值
    使用 (查看 比较 运算等)

 */

# 1. 用户变量

/*
 作用域 : 针对于当前会话 (连接) 有效, 同于会话变量的作用域
 应用在任何地方, 也就是 begin end 里面或者 begin end 外面
 */

# 1. 声明并初始化

/*
    set @用户变量名 = 值;
    set @用户变量名 := 值;
    select @用户变量名 := 值;
 */


# 2. 赋值 (更新用户变量的值)

/*
 方式一 : 通过 set 或者 select
        set @用户变量名 = 值;
        set @用户变量名 := 值;
        select @用户变量名 := 值;

 方式二 : 通过 select into
        select 字段 into @用户变量名
        form 表;
 */


# 3. 使用 (查看用户变量的值)
/*
 select @用户变量名;
 */


# 案例 :
# 声明并初始化
set @name = 'join';
set @name = 100;
set @count = 1;

# 赋值
select count(*)
into @count
from employees;

# 查看
select @count;


# 2. 局部变量
/*
 作用域 : 仅仅在定义它的 begin end 中

 步骤 :
    声明
        declare 变量名 类型;
        declare 变量名 类型 default 值;
    赋值 :
        方式一 : 通过 set 或者 select
                set 局部变量名 = 值;
                set 局部变量名 := 值;
                select @局部变量名 := 值;

        方式二 : 通过 select into
                select 字段 into 局部变量名
                form 表;

    使用 :
        select 局部变量名

    应用在 begin end 中的第一句话
 */

# 对比用户变量和局部变量
/*
                    作用域                 定义和使用的位置                            语法
 用户变量           当前会话                会话中的任何地方                        必须加 @ 符号, 不用限定类型
 局部变量           begin end 中           只能在 begin end 中, 且为第一句话        一般不用加 @ 符号, 需要限定类型

 */

# 案例 : 声明两个变量并赋处置, 求和, 并打印
set @m = 1;
set @n = 2;
set @sum = @m + @n;
select @sum;

# 局部变量
declare m int default 1;
declare n int default 2;
declare sum int;
set sum = m + n;
select sum;

```



### 存储过程和函数



> 说明

都类似于 Java 中的方法, 将一组完成特定功能的逻辑语句包装起来, 对外暴露名字



> 好处

- 提高重用性
- sql 语句简单
- 减少了和数据库服务器之间的连接次数, 提高了效率



#### 存储过程



##### 语法



> 创建

```sql
create procedure 存储过程名(参数模式 参数名 参数类型)
begin
	存储过程体;
end;	
```

**注意 :**
- 参数模式 : in, out, inout, 其中 in 可以省略
- 存储过程体的每一条 sql 语句都需要用分好结尾

> 调用

```sql
call 存储过程名(是参类型);
```

举例 : 
```sql
# 调用 in 模式的参数
call sp1（'值'）;

# 调用 out 模式的参数
set @name; 
call sp1(@name);
select @name;

# 调用 inout 模式的参数
set @name=值;
call sp1(@name); 
select @name;
```

> 查看

```sql
show create procedure 存储过程名;
```

> 删除

```sql
drop procedure 存储过程名;
```



##### 代码



```sql
# 存储过程和函数

/*
 存储过程和函数 : 类似于 Java 中的方法

 好处 :
    1. 提高代码的重用性
    2. 简化操作


 */

# 存储操作

/*
 含义 : 一组预先编译好的 sql 语句的集合, 理解成批处理语句

 好处 :
    1. 提高代码的重用性
    2. 简化操作
    3. 减少了编译次数, 并且减少了和数据库服务器的连接器, 提高了效率

 */

# 一. 创建语法

/*
 create procedure 存储过程名 (参数列表)
 begin
    存储过程体 (一组合法的 sql语句);
 end

 注意 :
    1. 参数列表包含三部分
        参数模式    参数名     参数类型
    举例  IN      stuName    varchar(20)
    2. 参数模式
        in : 改参数可以作为输入. 也就是说该参数需要调用方传入值
        out : 该参数可以作为输出, 也就是该参数可以作为返回值
        inout : 该参数既可以作为输入, 也可以作为输出, 也就是该参数既需要传入值, 也可以返回值

    3. 如果存储过程体仅仅只有一句话, begin and 可以省略
       存储过程体重的每条 sql 语句的结尾要求必须加分好
       存储过程的结尾可以使用 delimiter 重新设置
        语法 :
        delimiter $
 */

# 二. 调用语法
/*
 call 存储过程名(实参列表);
 */

# 1. 空参列表
# 案例 : 插入到 admin 表中五条记录
select * from admin;

create procedure mypl()
begin

    insert into admin(username, password)
    values
           ('john', 001),
           ('rose', 002),
           ('tom', 003),
           ('jack', 004),
           ('jerry', 005);

end;

# 调用
call mypl();

# 2. 创建带 in 模式参数的存储过程
# 案例一 : 创建存储过程实现, 根据女神名, 查询对应男神的信息
create procedure myp2 (in beautyName varchar(20))
begin

    select  *
    from    boys bo
    right join beauty b on b.boyfriend_id = bo.id
    where b.name = beautyName;

end;


call myp2 ('周芷若');

# 案例二 : 创建存储过程实现, 用户是否登录成功
create procedure myp3 (in username varchar(20), in password varchar(20))
begin

    declare result INT default 0; # 声明并初始化

    select count(*) into result # 赋值
    from admin a
    where username = a.username
    AND password = a.password;

    select if(result > 0, '登录成功', '登录失败'); # 使用

end;

call myp3('john', '8888');

# 3. 创建带 out 模式的存储过程
# 案例一 : 根据女神名返回对应的男神名
create procedure myp4 (in beautyName varchar(20), out boyName varchar(20))
begin

    select bo.boyName into boyName
    from boys bo
    join beauty b on b.boyfriend_id = bo.id
    where b.name = beautyName;

end;


call myp4 ('小昭', @boyName);
select @boyName;

# 案例二 : 根据女神名, 返回对应的男神名和男神魅力值
create procedure myp5 (in beautyName varchar(20), out boyName varchar(20), out userCp INT)
begin
    select
           bo.boyName, bo.userCp into boyName, userCp
    from boys bo
    join beauty b on b.boyfriend_id = bo.id
    where b.name = beautyName;
end;

call myp5('小昭', @bName, @bUserCp);
select @bName, @bUserCp;

# 4. 创建带 inout 模式参数的存储过程
# 案例一 : 传入 a, b 两个值, 最终 a, b 都翻倍并返回
create procedure myp7(inout a INT, inout  b INT)
begin
    set a = a * 2;
    set b = b * 2;
end;

# 调用
set @m = 2;
set @n = 4;

call myp7(@m, @n);
select @m, @n;

# 二. 删除存储过程

/*
 语法 :
    drop procedure 存储过程名称;
 */
drop procedure mypl;

# 三. 查看存储过程的信息
show create procedure myp3;

```



##### 练习



```sql
# 1、创建存储过程或函数实现传入用户名和密码，插入到 admin 表中
create procedure m1 (in userName varchar(20), in pwd varchar(20))
begin
    insert into
        admin(username, password)
    values
        (userName, pwd);
end;

call m1('yixihan', '123456');

select * from admin;

# 2、创建存储过程或函数实现传入女神编号，返回女神名称和女神电话
create procedure m2 (in beautyId INT, out beautyName varchar(20), out beautyPhone varchar(20))
begin
    select b.name, b.phone into beautyName, beautyPhone
    from beauty b
    where b.id = beautyId;
end;

call m2 (2, @beautyName, @beautyPhone);
select @beautyName, @beautyPhone;

# 3、创建存储存储过程或函数实现歘人两个女神生日，返回大小
create procedure m3 (in beautyBirth1 datetime, in beautyBirth2 datetime, out diff INT)
begin
    select datediff(beautyBirth1, beautyBirth2) into diff;
end;

call m3 ('1998-1-1', now(), @res);

select @res;

# 4、创建存储过程或函数实现传入一个日期，格式化成 xx 年 xx 月 xx 日并返回
create procedure m4 (in date datetime, out formatDate varchar(20))
begin
    select date_format(date, '%Y 年 %m 月 %d 日') into formatDate;
end;

call m4(now(), @date);
select @date;

# 5、创建存储过程或函数实现传入女神名称，返回：女神 and 男神 格式的字符串  如 传入 ：小昭  返回： 小昭 and 张无忌
create procedure m5 (in beautyName varchar(20), out result varchar(20))
begin
    select concat(b.name, ' and ', bo.boyName) into result
    from beauty b
    join boys bo on b.boyfriend_id = bo.id
    where b.name = beautyName;
end;

call m5 ('小昭', @result);
select @result;

# 6、创建存储过程或函数，根据传入的条目数和起始索引，查询 beauty 表的记录
create procedure m6 (in offset INT, in size INT)
begin
    select *
    from beauty
    limit offset, size;
end;

call m6(0, 5);

```



#### 函数



##### 语法



> 创建

```sql
create function 函数名 (参数名 参数类型) returns 返回类型
begin
	函数体;
	return 返回值;
end;
```

**注意 : 函数体中肯定需要有 return 语句**

> 调用

```sql
select 函数名 (实参列表);
```

> 查看

```sql
show create function 函数名;
```

> 删除

```sql
drop function 函数名;
```



##### 代码



```sql
# 函数

/*
 含义 : 一组预先编译好的 sql 语句的集合, 理解成批处理语句

 好处 :
    1. 提高代码的重用性
    2. 简化操作
    3. 减少了编译次数, 并且减少了和数据库服务器的连接器, 提高了效率

 区别 :
    存储过程 : 可以有零个返回, 也可以有多个返回, 适合做批量的插入 批量更新
    函数 : 有且仅有一个返回, 适合做处理数据后返回一个结果


 */

# 一. 创建语法
/*
 create function 函数名 (参数列表) returns 返回类型
 begin
    函数体;
    return 值;
 end;

注意 :
    1. 参数列表 包含两部分
        参数名 参数类型

    2. 函数体 :
        肯定会有 return 语句, 如果没有不会报错
        如果 return 语句没有放在函数体的最后也不报错, 但不建议

    3. 当函数体重仅有一句话, 则可以省略 begin end

    4. 使用 delimiter 语句设置结束标记 (没必要)

    5. 使用 select 调用函数

 */

# 二. 调用方法
/*
 select  函数名 (参数列表)

 */

# 案例演示 : ----------------------------------------------------------------

# 1. 无参有返回的
# 案例 : 返回公司的员工个数
create function myf1 () returns INT
begin
    declare res INT;
    select count(*) into res
    from employees;

    return res;

end;

select myf1();

# 2. 有参有返回的
# 案例一 : 根据员工名返回他的工资
create function myf2 (empName varchar(20)) returns DOUBLE
begin
    declare res DOUBLE;
    select salary into res
    from employees
    where last_name = empName;

    return res;
end;

select myf2('Popp');

# 案例二 : 根据部门名, 返回该部门的平均工资
drop function myf3;

create function myf3 (depName varchar(20)) returns DOUBLE
begin
    declare res DOUBLE;

    select AVG(e.salary) into res
    from employees e
    join departments d on d.department_id = e.department_id
    where d.department_name = depName
    group by d.department_id, d.department_name;

    return res;

end;

select myf3 ('Fin');

# 三. 查看函数

/*
 show create function 函数名;
 */
show create function myf3;

# 四. 删除函数

/*
 drop function 函数名;
 */
drop function myf3;

# 案例 : 创建函数, 实现传入两个 float, 返回二者之和
create function sumF (f1 FLOAT, f2 FLOAT) returns FLOAT
begin
    declare res FLOAT;

    select f1 + f2 into res;

    return res;
end;

select sumF(12.3, 58.9);
```



### 流程控制语句



> 说明

- 顺序结构 : 程序从上往下一次执行
- 分支结构 : 程序按条件进行选择执行, 从两条或多条路径中选择一条执行
- 循环结构 : 程序满足一定条件下, 重复执行一组语句



#### 分支结构



> if 函数

- 功能 : 实现简单的双分支
- 语法 : 
	```sql
	if (条件, 值 1, 值 2);
	```
- 位置 : 可以作为表达式放在任何位置	

> case 结构

- 功能 : 实现多分支
- 语法 1 :
	```sql
	case 表达式或字段
	when 值 1 then 语句 1;
	when 值 2 then 语句 2;
	...
	else 语句 n;
	end [case];
	```
- 语法 2 :
	```sql
	case 
	when 条件 1 then 语句 1;
	when 条件 2 then 语句 2;
	..
	else 语句 n;
	end [case];
	```
- 位置 : 可以放在任何位置
		如果放在 begin end 外面, 作为表达式结合着其他语句使用
		如果放在 begin end 里面, 一般作为独立的语句使用

> if 结构

- 功能 : 实现多分支
- 语法 : 
	```sql
	if 条件 1 then 语句 1;
	elseif 条件 2 then 语句 2;
	...
	else 语句 n;
	end if; 
	```
- 位置 : 只能放在 begin end 中	



#### 循环结构



> while

```sql
[名称 : ] while 循环条件 do
	循环体;
end while [名称];	
```

> loop

```sql
[名称 : ] loop
	循环体;
end loop [名称];	
```

> repeat

```sql
[名称 : ] repeat
	循环体;
until 结束条件;	
end repeat [名称];
```

> 循环控制语句

- leave : 类似于 break, 用于跳出所在循环
- iterate : 类似于 continue, 用户结束本次循环, 继续下一次

- 位置 : 只能放在 begin end 中
- 特点 : 都能实现循环结构
- 对比 : 
  - 这三种循环都能省略名称, 但如果循环中添加了循环控制语句 (leave 或者 iterate) 则必须添加名称
  - loop 一般用于实现简单的死循环
	while 先判断后执行
	repeat 先执行后判断, 无条件至少执行一次



#### 代码



```sql
# 流程控制结构

/*
 顺序结构 : 程序从上往下一次执行
 分支结构 : 程序从两条或多条路径中选择一条去执行
 循环结构 : 程序在满足一定条件的基础上, 重复执行一段代码

 */

# 一. 分支结构

# 1. if函数

/*
功能 : 实现简单的双分支
语法 :
    IF(表达式 1, 表达式 2, 表达式 3)

    执行顺序 :
        如果表达式 1 成立, 则 if 函数返回表达式 2 的值, 否则返回表达式 3 的值

    应用场景 : 任何地方
 */

# 2. case 结构

/*
 情况 1 : 类似于 Java 中的 switch 语句, 一般用于实现等值判断

 语法 :
    case 变量 | 表达式 | 字段
    when 要判断的值 then 返回的值 1 或语句 1;
    when 要判断的值 then 返回的值 2 或语句 2;
    ...
    else 要返回的值 n 或语句 n;
    end case;


 情况 2 : 类似于 Java 中的多重 if 语句, 一般用于实现区间判断

 语法 :
    case
    when 条件 1 then 返回的值 1 或语句 1;
    when 条件 2 then 返回的值 2 或语句 2;
    ...
    else 要返回的值 n 或语句 n;
    end case;


 特点 :
    1. 可以作为表达式, 签到在其他语句中使用, 可以放在任何地方, begin end 中或 begin end 外面
       可以作为独立的语句去使用, 只能放在 begin end 中

    2. 如果 when 中的值满足或条件成立, 则执行对应的 then 后面的语句或者值, 并且结束 case
       如果都不满足, 则执行 else 中的语句或值

    3. else 可以省略, 如果 else 省略了, 并且所有的 when 条件都不满足, 则返回 null
 */

# 案例 : 创建存储过程, 根据传入的成绩, 显示等级 90 - 100 -> A 80 - 90 -> B 60 - 80 -> C else -> D

create procedure test_case (in score INT)
begin
    case
        when score between 90 and 100 then select 'A';
        when score between 80 and 90 then select 'B';
        when score between 60 and 80 then select 'C';
        else select 'D';
    end case ;
end;

call test_case(59);


# 3. if 结构

/*
 功能 : 实现多重分支

 语法 :
    if 条件 1 then 语句 1;
    elseif 条件 2 then 语句 2;
    elseif 条件 3 then 语句 3;
    ...
    [else 语句 n;]
    end if;

 应用在 begin end 中
 */

# 案例 : 创建存储过程, 根据传入的成绩, 返回等级 90 - 100 -> A 80 - 90 -> B 60 - 80 -> C else -> D
create function test_if (score INT) returns CHAR(1)
begin
    declare res CHAR(1);
    if score between 90 and 100 then select 'A' into res;
    elseif score between 80 and 90 then select 'B' into res;
    elseif score between 60 and 80 then select 'B' into res;
    else select 'D' into res;
    end if;

    return res;

end;

select test_if(69);

# 二. 循环结构

/*
分类 :
    while
    loop
    repeat

循环控制 :
    iterate 类似于 continue, 继续, 结束本次循环, 继续下一次
    leave 类似于 break, 跳出, 结束当前所在的循环
 */

# 1. while

/*
 语法 :
    [标签 :] while 循环条件 do
        循环体;
    end while [标签];

 联想 :
    while (循环条件) {
    }
 */

# 2. loop

/*
 语法 :
    [标签 : ] loop
        循环体
    end loop [标签];

 可以用来模拟简单的死循环
 */

# 3. repeat

/*
 语法 :
    [标签 : ] repeat
        循环体
    until 结束循环的条件
    end repeat [标签];
 */

# 不添加循环控制语句
# 案例一 : 批量插入, 根据次数插入到 admin 表中多条数据
drop procedure pro_while1;

create procedure pro_while1 (in insertCount INT)
begin
    declare i INT default 1;
    while i <= insertCount do
        insert into admin(username, password) VALUES (concat('yxh', i), '666');
        set i = i + 1;
        end while;
end;

call pro_while1(100000);

# 案例二 : 添加 leave 语句, 如果次数大于 50 则停止
truncate table admin;

create procedure pro_while2 (in insertCount INT)
begin
    declare i INT default 1;
    a: while i <= insertCount do
        insert into admin(username, password) VALUES (concat('zst', i), '666');
        if i >= 20 then leave a;
        end if;
        set i = i + 1;
        end while a;
end;

call pro_while2(100);

# 案例三 : 添加 iterate 语句 只插入偶数数据
truncate table admin;

create procedure pro_while3 (in insertCount INT)
begin
    declare i INT default 0;
    a: while i <= insertCount do
        set i = i + 1;
        if MOD(i, 2) != 0 then iterate a;
        end if;

        insert into admin(username, password) VALUES (concat('zst', i), '666');
        end while a;
end;


call pro_while3(1000);

select * from admin;

```



#### 练习



```sql
/*
 一. 已知表 stringcontent
 其中字段 :
 id 自增长
 content varchar(20)

 向该表插入指定个数的, 随机的支付串
 */
 create table stringcontent (
     id INT primary key auto_increment,
     content varchar(20)
 );

create procedure test_randomStr_insert(in insertCount INT)
begin

    declare i INT default 1; # 定义一个循环变量, 表示插入次数
    declare defaultStr CHAR(26) default 'abcdefghijklmnopqrstuvwxyz';
    declare startIndex INT default 1; # 代表起始索引
    declare len INT default  1; # 代表截取的字符的长度


    while i <= insertCount do

        set startIndex = FLOOR(RAND() * 26 + 1); # 产生一个随机的整数, 代表起始索引 1 - 26
        set len = FLOOR(RAND() * (20 - startIndex + 1) + 1); # 产生一个随机的整数, 代表截取长度, 1 - (26 - startIndex + 1)

        insert into stringcontent(content)
        values (SUBSTR(defaultStr,startIndex, len));

        set  i = i + 1;
        end while;
end;

call test_randomStr_insert(100);

select * from stringcontent;

```