---
title: MySQL4
date: 2022-03-09
tags:
 - MySQL高级
 - Linux
categories:
 - MySQL
---
# MySQL 高级

## MySQL 锁机制

### 概述

> 定义

锁是计算机协调多个进程或线程并发访问某一资源的机制

在数据库中, 除传统的计算资源 (CPU, RAM, I/O 等) 的争用之外, 数据也是一种供许多用户共享的资源, 如何保证数据并发访问的一致性, 有效性是所有数据库必须解决的一个问题, 锁冲突也是影响数据库并发访问性能的一个重要因素, 从这个角度来说, 锁对数据库而言显得尤其重要, 也更加复杂

&nbsp;

> 锁的分类

- 从数据操作的类型 (读/写) 分
  - 读锁 (共享锁) : 针对同一份数据, 多个读操作可以同时进行而不会互相影响
  - 写锁 (排它锁) : 当前写操作没有完成之前, 它会阻断其他写锁和读锁 
- 从对数据操作的颗粒度分
  - 表锁
  - 行锁
  - 页锁  

&nbsp;

### 三锁

#### 表锁 (偏读)

> 特点

偏向 MyISAM 存储引擎, 开销小, 加锁快, 无死锁, 锁定粒度大, 发生锁冲突的概率最高, 并发最低
&nbsp;

> 语法

```sql
# 手动增加语法
lock table 表 1 read | write, 表 2 read | write, ...;

# 查看表上加过的锁 In_use = 1 --> 被锁  In_use = 0 --> 未被锁
/*
 Database : 数据库名
 Table : 表名
 In_use : 是否被锁
 Name_locked : 锁的名称
 */
show open tables [from 数据库名];

# 释放表锁
unlock tables;
```

&nbsp;

```sql
# 表级锁分析 - 建表 sql
create table mylock (
    id INT not null primary key auto_increment,
    name VARBINARY(20)
)ENGINE = MYISAM;

insert into mylock(name) values ('a');
insert into mylock(name) values ('b');
insert into mylock(name) values ('c');
insert into mylock(name) values ('d');
insert into mylock(name) values ('e');

select * from mylock;
```

##### 加读锁

![1](/assets/imgs/MySQL4.assets/bd1.png)
![1](/assets/imgs/MySQL4.assets/bd2.png)
![1](/assets/imgs/MySQL4.assets/bd3.png)
&nbsp;

##### 加写锁

![1](/assets/imgs/MySQL4.assets/bd1.png)
![1](/assets/imgs/MySQL4.assets/bd2.png)
&nbsp;

##### 表锁结论

MyLASM 在执行查询语句前, 会自动给涉及到的所有表加读锁

MySQL 的表级锁有两种模式

- 表共享读锁 (Table Read Lock)
- 表独占写锁 (TAble Write Lock)

&nbsp;

| 锁类型 | 可否兼容 | 读锁 | 写锁 |
| :---: | :---: | :---: | :---: |
| 读锁 | 是 | 是 | 否 |
| 写锁 | 是 | 否 | 否 |

&nbsp;

结合上表, 所以对 MyLSAM 表进行操作, 会有以下情况

- 对 MyLSAM 表的读操作 (加读锁), 不会阻塞其他进程对同一表的读请求, 但会阻塞对同一表的写请求, 只有当读锁释放以后, 才会执行其他进程的写操作
- 对 MyLSAM 表的写操作 (加写锁), 不会阻塞其他进程对同一表的读和写操作, 只有当写锁释放以后, 才会执行其他进程的读写操作
- 简而言之, 就是读锁会阻塞写, 但是不会阻塞读, 而写锁会把读和写都阻塞

&nbsp;

##### 表锁分析

![1](/assets/imgs/MySQL4.assets/bsfx1.png)
![1](/assets/imgs/MySQL4.assets/bsfx2.png)
![1](/assets/imgs/MySQL4.assets/bsfx3.png)
&nbsp;

#### 写锁 (偏写)

> 特点

偏向 InnoDB 存储引擎, 开销大, 加锁慢, 会出现死锁, 锁定粒度最小, 发生锁冲突的概率最低, 并发度也最高

InnoDB 与 MyISAM 的最大不同有两点 :

1. 支持事务 (TRANSACTION)
2. 是采用了行级锁
&nbsp;

> 老知识复习

事务 (TRANSACTION) 及其 ACID 属性

事务是有一组 sql 语句组成的逻辑处理单元, 事务具有以下 4 个属性, 通常简称为事务的 ACID 属性

- 原子性 : 一个事务是不可再分割的整体, 要么都执行, 要么都不执行
- 一致性 : 一个事务可以使数据从一个一致状态切换到另一个一致的状态
- 隔离性 : 一个事务不受其他事务的干扰, 多个事务互相隔离的
- 持久性 : 一个事务一但提交了, 则永久的持久化到本地

&nbsp;

并发事务处理带来的问题 :

- 更新丢失
    ![1](/assets/imgs/MySQL4.assets/gxds.png)
    &nbsp;
- 脏读
    ![1](/assets/imgs/MySQL4.assets/zd.png)
    &nbsp;
- 不可重复读
    ![1](/assets/imgs/MySQL4.assets/bkcfd.png)
    &nbsp;
- 幻读
    ![1](/assets/imgs/MySQL4.assets/hd.png)
    &nbsp;

事务隔离级别
    ![1](/assets/imgs/MySQL4.assets/swgljb.png)
    &nbsp;

##### 案例分析

> 建表 sql

```sql
# 建表 sql
# 行锁
drop table if exists test_innodb_lock;

create table test_innodb_lock(
    a INT(11),
    b VARBINARY(16)
)ENGINE = INNODB;

insert into test_innodb_lock(a, b) VALUES (1, 'b2');
insert into test_innodb_lock(a, b) VALUES (3, '3');
insert into test_innodb_lock(a, b) VALUES (4, '4000');
insert into test_innodb_lock(a, b) VALUES (5, '5000');
insert into test_innodb_lock(a, b) VALUES (6, '6000');
insert into test_innodb_lock(a, b) VALUES (7, '7000');
insert into test_innodb_lock(a, b) VALUES (8, '8000');
insert into test_innodb_lock(a, b) VALUES (9, '9000');
insert into test_innodb_lock(a, b) VALUES (1, 'b1');

create index test_innodb_a_ind on test_innodb_lock(a);

create index test_innodb_lock_b_ind on test_innodb_lock(b);

```

##### 行锁定基本演示

![1](/assets/imgs/MySQL4.assets/hsd.png)
&nbsp;

> 五索引升级为表锁

varchar 不用 '' 导致系统自动转换类型, 行锁变表锁
&nbsp;

> 间歇锁危害

![1](/assets/imgs/MySQL4.assets/jxs1.png)
![1](/assets/imgs/MySQL4.assets/jxs2.png)
&nbsp;

> 面试题 : 如何锁定一行

使用 `select xxx for update`, 然后不 `commit` 即可
![1](/assets/imgs/MySQL4.assets/sdyh.png)

&nbsp;

##### 行锁结论

InnoDB 存储引擎由于实现了表级锁定, 虽然在锁定机制的实现方面所带来的性能损耗可能比表级锁定会更高一些, 但是在整体并发处理能力上要远远优于 MyLSAM 的表级锁定的, 当系统并发量比较高的时候, InnoDB 的整体性能和 MyLSAM 相比就会有为明显的优势了

但是, InnoDB 的航迹锁定同样也有其脆弱的一面, 当我们使用不当时, 可能会让 InnoDB 的整体性能不仅不能比 MyLSAM 高, 甚至可能会更差
&nbsp;

##### 行锁分析

![1](/assets/imgs/MySQL4.assets/hsfx1.png)
![1](/assets/imgs/MySQL4.assets/hsfx1.png)
&nbsp;

##### 优化建议

- 尽可能让所有数据检索都通过索引来完成, 避免无索引行锁升级为表锁
- 合理设计索引, 尽量缩小锁的范围
- 尽可能较少检索条件, 避免间隙锁
- 尽量控制事务大小, 减少锁定资源量和时间长度
- 尽可能低级别事务隔离

&nbsp;

#### 页锁 (了解)

开销和加锁时间界于表锁和行锁之间：会出现死锁；锁定粒度界于表锁和行锁之间，并发度一般
了解即可
&nbsp;

## 主从复制

没做过, 可以参考这个视频 [尚硅谷 MySQL 高级 - 主从复制配置](https://www.bilibili.com/video/BV1KW411u7vy?p=61)
&nbsp;

### 复制的基本原理

slave会从master读取binlog来进行数据同步
&nbsp;

三步骤 :

- master 将改变记录到二进制日志 (binary log). 这些记录过程叫做二进制日志时间, binary log events
- slave 将 master 的 binary log ebents 拷贝到它的中继日志 (relay log)
- slave 重做中继日志中的时间, 将改变应用到自己的数据库中. MySQL 复制是异步的且串行化的

&nbsp;

原理 :
![1](/assets/imgs/MySQL4.assets/zcfzyl.png)
&nbsp;

### 复制的基本原则

- 每个 slave 只有一个 master
- 每个 slave 只能有一个唯一的服务器 ID
- 每个 master 可以有多个 salve

&nbsp;

### 复制的最大问题

延时
&nbsp;

### 配置详解

> 前提

mysql版本一致且后台以服务运行
&nbsp;

主从都配置在 [mysqld] 结点下, 都是小写

> 修改主机配置文件

1. 增加主服务器唯一 ID (必须)
    `server-id=1`
    &nbsp;
2. 启动二进制文件 (必须)
    `log-bin=自己本地的路径/mysqlbin`
    `log-bin=D:/devSoft/MySQLServer5.5/mysqlbin`
    &nbsp;
3. 启动错误日志 (可选)
    `log-err=自己本地的路径/mysqlerr`
    `log-err=D:/devSoft/MySQLServer5.5/data/mysqlerr`
    &nbsp;
4. 根目录 (可选)
    `basedir="自己本地的路径"`
    `basedir="D：/devSoft/MySQLService5.5/"`
    &nbsp;
5. 临时目录 (可选)
    `tmpdir="自己本地的路径"`
    `tmpdir="D：/devSoft/MySQLService5.5/"`
    &nbsp;
6. 数据目录 (可选)
    `datadir="自己本地的路径/Data"`
    `datadir="D：/devSoft/MySQLService5.5/Data/"`
    &nbsp;
7. 主机, 读写都可以 (可选)
    `read-only = 0`
    &nbsp;
8. 设置不要复制的数据库 (可选)
    `binlog-lgnore-db=mysql`
    &nbsp;
9. 设置需要复制的数据库 (可选)
    `binlog-do-db=需要复制的主数据库名字`
    &nbsp;

> 修改从机配置

1. 从服务器唯一 ID (必须)

    ```shell
    [mysqld]
    server-id=2
    ```

    &nbsp;

2. 启用二进制未见 (可选)

&nbsp;

> 重启主机和从机的 MySQL 服务 并关闭防火墙

windows 主机 :

```shell
net stop 服务名
net start 服务名
```

&nbsp;

linux 从机 :

```shell
systemctl restart mysqld.service
systemctl stop firewalld
```

&nbsp;

> 在Windows主机上简历账户并授权slave

```sql
GRANT REPLICATION SLAVE  ON*.* TO 'username'@'slave IP' IDENTIFIED BY 'password';
flush privileges;

# 查询 master 的状态, 并记录下 file 和 position 的位置
show master status;

# 执行完此步骤后不再执行主服务器MySQL，防止主服务器状态值变化
```

&nbsp;

> 在Linux从机上配置需要复制的主机

```sql
MASTER_HOST = 'master IP', MASTER_USER = 'username', MASTER_PASSWORD = 'password', MASTER_LOG_FILE = 'File 名字', MASTER_LOG_POS = Position 数字;

# 启动从服务器复制功能
start slave;

# 查看是否配置成功, 下面两个参数都是 YES, 则说明主从配置成功
Slave_IO_Running : Yes
Slave_SQL_Running : Yes
```

> 停止从服务器复制功能

```sql
stop slave;
```
