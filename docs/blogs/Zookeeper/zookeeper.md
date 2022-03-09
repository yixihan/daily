---
title: zookeeper
date: 2022-03-09
tags:
 - Linux
 - Zookeeper
categories:
 - Zookeeper
---
# Zookeeper



## Zookeeper 入门



### 概述

Zookeeper 是一个开源的分布式的，为分布式框架提供协调服务的 Apache 项目。



>   工作机制

![image-20220117104538099](/assets/imgs/zookeeper.assets/image-20220117104538099.png)



### 特点

-   Zookeeper：一个领导者（Leader），多个跟随者（Follower）组成的集群。

-   集群中只要有**半数以上**节点存活，Zookeeper集群就能正常服务。所以Zookeeper适合安装奇数台服务器
-   全局数据一致：每个Server保存一份相同的数据副本，Client无论连接到哪个Server，数据都是一致的。
-   更新请求顺序执行，来自同一个Client的更新请求按其发送顺序依次执行
-   数据更新原子性，一次数据更新要么成功，要么失败。
-   实时性，在一定时间范围内，Client能读到最新数据。



### 数据结构

ZooKeeper 数据模型的结构与 **Unix 文件系统很类似**，整体上可以看作是一棵树，每个节点称做一个 ZNode。每一个 ZNode 默认能够存储 **1MB** 的数据，每个 ZNode 都可以**通过其路径唯一标识**。

![image-20220117104729715](/assets/imgs/zookeeper.assets/image-20220117104729715.png)



### 应用场景

提供的服务包括：

*   统一命名服务
*   统一配置管理
*   统一集群管理
*   服务器节点动态上下线
*   软负载均衡
*   ...



>   统一命名服务

![image-20220117104843417](/assets/imgs/zookeeper.assets/image-20220117104843417.png)



>   统一配置管理

![image-20220117104852760](/assets/imgs/zookeeper.assets/image-20220117104852760.png)



>   统一集群管理

![image-20220117104901399](/assets/imgs/zookeeper.assets/image-20220117104901399.png)



>   服务器节点动态上下线

![image-20220117104908572](/assets/imgs/zookeeper.assets/image-20220117104908572.png)



>   软负载均衡

![image-20220117104918057](/assets/imgs/zookeeper.assets/image-20220117104918057.png)



### 下载地址

>   官网首页

[官网地址](https://zookeeper.apache.org/)



>   下载地址

[下载地址](https://archive.apache.org/dist/zookeeper/zookeeper-3.5.7/)

下载 



## Zookeeper 安装



### 单机模式安装



#### 安装前准备

1.   安装 JDK
2.   拷贝安装包到 Linux 系统下

3.   解压到指定目录

     ```shell
     tar -zxvf apache-zookeeper-3.5.7-bin.tar.gz -C /opt/
     
     ```

4.   修改名称

     ```shell
     mv apache-zookeeper-3.5.7-bin /opt/zookeeper-3.5.7
     
     ```

     

#### 配置修改

>   进入 Zookeeper 目录里, 修改 conf 目录下的 zoo_sample.cfg

```shell
cd /opt/zookeeper-3.5.7/conf
mv zoo_sample.cfg zoo.cfg

```



>   进入 zoo.cfg, 修改内容

```shell
vim zoo.cfg

dataDir=/opt/zookeeper-3.5.7/zkData
```



>   在 Zookeeper 目录里创建 zkData 目录

```shell
mkdir zkData
```



### Zookeeper 常用命令

所有命令全在  `/opt/zookeeper-3.5.7` 下进行

```shell
# 启动 Zookeeper
./bin/zkServer.sh start

# 查看进程是否启动
jps

# 查看 Zookeeper 状态
./bin/zkServer.sh status
 
# 启动 Zookeeper 客户端
./bin/zkCli.sh
 
# 退出 Zookeeper 客户端
quit
 
 # 停止 Zookeeper
./bin/zkServer.sh stop
```



>   查看进程是否启动

![image-20220117135703631](/assets/imgs/zookeeper.assets/image-20220117135703631.png)



### Zookeeper 配置参数解读



>   tickTime

tickTime = 2000：通信心跳时间，Zookeeper服务器与客户端心跳时间，单位毫秒

![image-20220117135854712](/assets/imgs/zookeeper.assets/image-20220117135854712.png)



>   initLimit

initLimit = 10：LF初始通信时限

![image-20220117135908277](/assets/imgs/zookeeper.assets/image-20220117135908277.png)



>   syncLimit

syncLimit = 5：LF同步通信时限

![image-20220117135923981](/assets/imgs/zookeeper.assets/image-20220117135923981.png)



>   dataDir

dataDir：保存Zookeeper中的数据

注意：默认的tmp目录，容易被Linux系统定期删除，所以一般不用默认的tmp目录



>   clientPort

clientPort = 2181：客户端连接端口，**通常不做修改**



## Zookeeper 集群操作



### 集群安装



#### 集群规划

在 master(175.24.229.41), slave1(175.24.163.161), slave2(110.42.138.132) 三台服务器上部署 Zookeeper 集群



#### 解压安装

方法同 Zookeeper 单机安装



#### 配置服务器编号

在  `/opt/zookeeper-3.5.7/` 这个目录下创建 zkData

在 zkData 目录下创建 myid 文件

文件中添加与 server 对应的编号(1, 2, 3)

```shell
cd /opt/zookeeper-3.5.7/
mkdir zkData
vim zkData/myid
```

>   注意点

1.   上下不要有空行，左右不要有空格
2.   编号不能相同
3.   最好从 1 开始, 依次编号



![image-20220117190137065](/assets/imgs/zookeeper.assets/image-20220117190137065.png)



#### 配置 zoo.cfg

```shell
datadir=/opt/zookeeper-3.5.7/zkData
#######################cluster##########################
server.1=175.24.229.41:2888:3888
server.2=175.24.163.161:2888:3888
server.3=110.42.138.132:2888:3888
```



>   配置参数解读

```shell
server.A=B:C:D
```

A 是一个数字，表示这个是第几号服务器；

集群模式下配置一个文件 myid，这个文件在 dataDir 目录下，这个文件里面有一个数据 就是 A 的值，Zookeeper 启动时读取此文件，拿到里面的数据与 zoo.cfg 里面的配置信息比 较从而判断到底是哪个 server。

B 是这个服务器的地址；

C 是这个服务器 Follower 与集群中的 Leader 服务器交换信息的端口；

D 是万一集群中的 Leader 服务器挂了，需要一个端口来重新进行选举，选出一个新的 Leader，而这个端口就是用来执行选举时服务器相互通信的端口。



>   小坑

若用云服务器, 则需要把自己的 ip 地址修改为 `0.0.0.0`

```shell
#######################cluster##########################
server.1=0.0.0.0:2888:3888
server.2=175.24.163.161:2888:3888
server.3=110.42.138.132:2888:3888
```



![image-20220117190401704](/assets/imgs/zookeeper.assets/image-20220117190401704.png)



### 集群操作

```shell
# 启动 Zookeeper
./bin/zkServer.sh start

# 查看 Zookeeper 状态
./bin/zkServer.sh status
```

![image-20220117190836868](/assets/imgs/zookeeper.assets/image-20220117190836868.png)

![image-20220117190814352](/assets/imgs/zookeeper.assets/image-20220117190814352.png)

![image-20220117190822642](/assets/imgs/zookeeper.assets/image-20220117190822642.png)

