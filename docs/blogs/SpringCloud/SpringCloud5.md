---
title: SpringCloud5
date: 2022-02-22
tags:
 - SpringCloud
 - SpringCloud Alibaba
 - Seata
categories:
 - SpringCloud
---

# SpringCloud Alibaba



## SpringCloud Alibaba Seata处理分布式事务



### 分布式事务问题

>   分布式前

单机单库没这个问题

从1：1  ->  1：N  ->  N：N



>   分布式之后

单体应用被拆分成微服务应用，原来的三个模块被拆分成**三个独立的应用**，分别使用**三个独立的数据源**，业务操作需要调用三个服务来完成。此时**每个服务内部的数据一致性由 ==本地== 事务来保证，但是 ==全局== 的数据一致性问题没法保证。**

![image-20220128094328105](/assets/imgs/SpringCloud5.assets/image-20220128094328105.png)



>   一句话

一次业务操作需要跨多个数据源或需要跨多个系统进行远程调用，就会产生分布式事务问题



### Seata简介



#### 是什么

Seata是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。



>   官网

[官网](http://seata.io/zh-cn/)



#### 能干嘛

一个典型的分布式事务过程



##### 分布式事务处理过程的一ID+三组件模型

Transaction ID XID ==> 全局唯一的事务ID



>   3组件概念

-   Transaction Coordinator (TC)
    事务协调器，维护全局事务的运行状态，负责协调并驱动全局事务的提交或回滚；
-   Transaction Manager (TM)
    控制全局事务的边界，负责开启一个全局事务，并最终发起全局提交或全局回滚的决议；
-   Resource Manager (RM)
    控制分支事务，负责分支注册、状态汇报，并接收事务协调器的指令，驱动分支（本地）事务的提交和回滚



##### 处理过程

1.   TM 向 TC 申请开启一个全局事务，全局事务创建成功并生成一个全局唯一的 XID；
2.   XID 在微服务调用链路的上下文中传播；
3.   RM 向 TC 注册分支事务，将其纳入 XID 对应全局事务的管辖；
4.   TM 向 TC 发起针对 XID 的全局提交或回滚决议；
5.   TC 调度 XID 下管辖的全部分支事务完成提交或回滚请求。



![image-20220128094825866](/assets/imgs/SpringCloud5.assets/image-20220128094825866.png)



#### 去哪下

[下载地址](https://github.com/seata/seata/releases)



#### 怎么玩

本地@Transactional

全局@GlobalTransactional



>   SEATA 的分布式交易解决方案

![image-20220128094920105](/assets/imgs/SpringCloud5.assets/image-20220128094920105.png)



### Seata-Server安装

>   官网地址

[官网](http://seata.io/zh-cn/)



>   下载地址

[下载地址](https://github.com/seata/seata/releases)

下载 1.0 版本



#### 解压到指定目录并修改conf目录下的file.conf配置文件



#### 修改 file.conf 和 registry.conf 文件

##### 先备份原始file.conf文件 和 registry.conf 文件

![image-20220128110621027](/assets/imgs/SpringCloud5.assets/image-20220128110621027.png)



主要修改：自定义事务组名称+事务日志存储模式为db+数据库连接信息



##### file.conf

###### service模块

```shell
service {
  #transaction service group mapping
  # 1
  vgroup_mapping.my_test_tx_group = "fsp_tx_group"
  #only support when registry.type=file, please don't set multiple addresses
  default.grouplist = "127.0.0.1:8091"
  #disable seata
  disableGlobalTransaction = false
  
}
```



###### store模块

```shell
## transaction log store, only used in seata-server
store {
  ## store mode: file、db
  # 2
  mode = "db"

  ## file store property
  file {
    ## store location dir
    dir = "sessionStore"
  }

  ## database store property
  db {
    ## the implement of javax.sql.DataSource, such as DruidDataSource(druid)/BasicDataSource(dbcp) etc.
    datasource = "dbcp"
    ## mysql/oracle/h2/oceanbase etc.
    db-type = "mysql"
    driver-class-name = "com.mysql.jdbc.Driver"
	# 3 mysql 数据库版本需 5.7 版本
    url = "jdbc:mysql://175.24.229.41:1617/seata"
    user = "user"
    password = "password"
  }
}
```



##### registry.conf

```shell
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  # 1
  type = "nacos"

  # 2
  nacos {
    serverAddr = "175.24.229.41:8848"
    namespace = ""
    cluster = "default"
  }
}
```



目的是：指明注册中心为nacos，及修改nacos连接信息



#### 数据库准备



##### mysql5.7数据库新建库seata

![image-20220128110713687](/assets/imgs/SpringCloud5.assets/image-20220128110713687.png)



##### 在seata库里建表

>   建表 sql

```sql
-- -------------------------------- The script used when storeMode is 'db' --------------------------------
-- the table to store GlobalSession data
CREATE TABLE IF NOT EXISTS `global_table`
(
    `xid`                       VARCHAR(128) NOT NULL,
    `transaction_id`            BIGINT,
    `status`                    TINYINT      NOT NULL,
    `application_id`            VARCHAR(32),
    `transaction_service_group` VARCHAR(32),
    `transaction_name`          VARCHAR(128),
    `timeout`                   INT,
    `begin_time`                BIGINT,
    `application_data`          VARCHAR(2000),
    `gmt_create`                DATETIME,
    `gmt_modified`              DATETIME,
    PRIMARY KEY (`xid`),
    KEY `idx_gmt_modified_status` (`gmt_modified`, `status`),
    KEY `idx_transaction_id` (`transaction_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- the table to store BranchSession data
CREATE TABLE IF NOT EXISTS `branch_table`
(
    `branch_id`         BIGINT       NOT NULL,
    `xid`               VARCHAR(128) NOT NULL,
    `transaction_id`    BIGINT,
    `resource_group_id` VARCHAR(32),
    `resource_id`       VARCHAR(256),
    `branch_type`       VARCHAR(8),
    `status`            TINYINT,
    `client_id`         VARCHAR(64),
    `application_data`  VARCHAR(2000),
    `gmt_create`        DATETIME,
    `gmt_modified`      DATETIME,
    PRIMARY KEY (`branch_id`),
    KEY `idx_xid` (`xid`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- the table to store lock data
CREATE TABLE IF NOT EXISTS `lock_table`
(
    `row_key`        VARCHAR(128) NOT NULL,
    `xid`            VARCHAR(96),
    `transaction_id` BIGINT,
    `branch_id`      BIGINT       NOT NULL,
    `resource_id`    VARCHAR(256),
    `table_name`     VARCHAR(32),
    `pk`             VARCHAR(36),
    `gmt_create`     DATETIME,
    `gmt_modified`   DATETIME,
    PRIMARY KEY (`row_key`),
    KEY `idx_branch_id` (`branch_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

```



![image-20220128110750995](/assets/imgs/SpringCloud5.assets/image-20220128110750995.png)



#### 启动 seata-server



##### 先启动Nacos



##### 再启动seata-server

`seata\bin` 目录下的 seata-server.bat



### 订单/库存/账户业务数据库准备

ps : 以下演示都需要先启动Nacos后启动Seata，保证两个都OK



#### 分布式事务业务说明

>   业务说明


这里我们会创建三个服务，一个订单服务，一个库存服务，一个账户服务。

**当用户下单时，会在订单服务中创建一个订单，然后通过远程调用库存服务来扣减下单商品的库存，再通过远程调用账户服务来扣减用户账户里面的余额，最后在订单服务中修改订单状态为已完成。**

该操作跨越三个数据库，有两次远程调用，很明显会有分布式事务问题。

下订单--->扣库存--->减账户(余额)



#### 创建业务数据库

```sql
CREATE DATABASE seata_order;
 
CREATE DATABASE seata_storage;
 
CREATE DATABASE seata_account;
```



-   seata_order：存储订单的数据库；
-   seata_storage：存储库存的数据库；
-   seata_account：存储账户信息的数据库。

![image-20220128111507768](/assets/imgs/SpringCloud5.assets/image-20220128111507768.png)



#### 3库分别建对应业务表

##### seata_order库下建t_order表

```sql
CREATE TABLE t_order (
    `id` BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT(11) DEFAULT NULL COMMENT '用户id',
    `product_id` BIGINT(11) DEFAULT NULL COMMENT '产品id',
    `count` INT(11) DEFAULT NULL COMMENT '数量',
    `money` DECIMAL(11,0) DEFAULT NULL COMMENT '金额',
    `status` INT(1) DEFAULT NULL COMMENT '订单状态：0：创建中；1：已完结' 
) ENGINE=INNODB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

SELECT * FROM t_order;

```



##### seata_storage库下建t_storage

```sql
CREATE TABLE t_storage (
    `id` BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `product_id` BIGINT(11) DEFAULT NULL COMMENT '产品id',
    `total` INT(11) DEFAULT NULL COMMENT '总库存',
    `used` INT(11) DEFAULT NULL COMMENT '已用库存',
    `residue` INT(11) DEFAULT NULL COMMENT '剩余库存'
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


INSERT INTO seata_storage.t_storage(`id`, `product_id`, `total`, `used`, `residue`)
VALUES ('1', '1', '100', '0', '100');

SELECT * FROM t_storage;

```



##### seata_account库下建t_account

```sql
CREATE TABLE t_account (
    `id` BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'id',
    `user_id` BIGINT(11) DEFAULT NULL COMMENT '用户id',
    `total` DECIMAL(10,0) DEFAULT NULL COMMENT '总额度',
    `used` DECIMAL(10,0) DEFAULT NULL COMMENT '已用余额',
    `residue` DECIMAL(10,0) DEFAULT '0' COMMENT '剩余可用额度'
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO seata_account.t_account(`id`, `user_id`, `total`, `used`, `residue`)  VALUES ('1', '1', '1000', '0', '1000');

SELECT * FROM t_account;
```



#### 3库分别建对应的回滚日志表

订单-库存-账户3个库下都需要建各自的回滚日志表

\seata-server-0.9.0\seata\conf目录下的db_undo_log.sql

```sql
-- the table to store seata xid data
-- 0.7.0+ add context
-- you must to init this sql for you business databese. the seata server not need it.
-- 此脚本必须初始化在你当前的业务数据库中，用于AT 模式XID记录。与server端无关（注：业务数据库）
-- 注意此处0.3.0+ 增加唯一索引 ux_undo_log
DROP TABLE IF EXISTS `undo_log`;

CREATE TABLE IF NOT EXISTS `undo_log` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `branch_id` BIGINT(20) NOT NULL,
    `xid` VARCHAR(100) NOT NULL,
    `context` VARCHAR(128) NOT NULL,
    `rollback_info` LONGBLOB NOT NULL,
    `log_status` INT(11) NOT NULL,
    `log_created` DATETIME NOT NULL,
    `log_modified` DATETIME NOT NULL,
    `ext` VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;




```



#### 最终效果

![image-20220128112313493](/assets/imgs/SpringCloud5.assets/image-20220128112313493.png)



### 订单/库存/账户业务微服务准备

>   业务需求

下订单->减库存->扣余额->改(订单)状态



#### 新建订单Order-Module

##### 建 module

module 名 : seata-order-service2001

##### 改 POM

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>springcloud-learn</artifactId>
        <groupId>com.yixihan.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>seata-order-service2001</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--nacos-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!--seata-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
            <exclusions>
                <exclusion>
                    <groupId>io.seata</groupId>
                    <artifactId>seata-all</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>io.seata</groupId>
            <artifactId>seata-spring-boot-starter</artifactId>
            <version>1.0.0</version>
        </dependency>
        <dependency>
            <groupId>io.seata</groupId>
            <artifactId>seata-all</artifactId>
            <version>1.0.0</version>
        </dependency>
        <!--feign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <!--web-actuator-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--mysql-druid-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.10</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.0.0</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
    </dependencies>

</project>

```



##### 写 YAML

```yaml
server:
  port: 2001

spring:
  application:
    name: seata-order-service
  cloud:
    alibaba:
      seata:
        #自定义事务组名称需要与seata-server中的对应
        tx-service-group: fsp_tx_group
    nacos:
      discovery:
        server-addr: 175.24.229.41:8848
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://175.24.229.41:1617/seata_order
    username: root
    password: W6YnvKnLzpSFNGuc.

feign:
  hystrix:
    enabled: false
  client:
    config:
      default:
        connect-timeout: 300000
        read-timeout: 300000

logging:
  level:
    io:
      seata: info

mybatis:
  mapperLocations: classpath:mapper/*.xml
  type-aliases-package: com.yixihan.springcloud.pojo

```



##### file.conf

```shell
transport {
  # tcp udt unix-domain-socket
  type = "TCP"
  #NIO NATIVE
  server = "NIO"
  #enable heartbeat
  heartbeat = true
  #thread factory for netty
  thread-factory {
    boss-thread-prefix = "NettyBoss"
    worker-thread-prefix = "NettyServerNIOWorker"
    server-executor-thread-prefix = "NettyServerBizHandler"
    share-boss-worker = false
    client-selector-thread-prefix = "NettyClientSelector"
    client-selector-thread-size = 1
    client-worker-thread-prefix = "NettyClientWorkerThread"
    # netty boss thread size,will not be used for UDT
    boss-thread-size = 1
    #auto default pin or 8
    worker-thread-size = 8
  }
  shutdown {
    # when destroy server, wait seconds
    wait = 3
  }
  serialization = "seata"
  compressor = "none"
}

service {

  vgroup_mapping.fsp_tx_group = "default" #修改自定义事务组名称

  default.grouplist = "127.0.0.1:8091"
  enableDegrade = false
  disable = false
  max.commit.retry.timeout = "-1"
  max.rollback.retry.timeout = "-1"
  disableGlobalTransaction = false
}


client {
  async.commit.buffer.limit = 10000
  lock {
    retry.internal = 10
    retry.times = 30
  }
  report.retry.count = 5
  tm.commit.retry.count = 1
  tm.rollback.retry.count = 1
}

## transaction log store
store {
  ## store mode: file、db
  mode = "db"

  ## file store
  file {
    dir = "sessionStore"

    # branch session size , if exceeded first try compress lockkey, still exceeded throws exceptions
    max-branch-session-size = 16384
    # globe session size , if exceeded throws exceptions
    max-global-session-size = 512
    # file buffer size , if exceeded allocate new buffer
    file-write-buffer-cache-size = 16384
    # when recover batch read size
    session.reload.read_size = 100
    # async, sync
    flush-disk-mode = async
  }

  ## database store
  db {
    ## the implement of javax.sql.DataSource, such as DruidDataSource(druid)/BasicDataSource(dbcp) etc.
    datasource = "dbcp"
    ## mysql/oracle/h2/oceanbase etc.
    db-type = "mysql"
    driver-class-name = "com.mysql.jdbc.Driver"
    url = "jdbc:mysql://175.24.229.41:1617/seata"
    user = "root"
    password = "W6YnvKnLzpSFNGuc."
    min-conn = 1
    max-conn = 3
    global.table = "global_table"
    branch.table = "branch_table"
    lock-table = "lock_table"
    query-limit = 100
  }
}
lock {
  ## the lock store mode: local、remote
  mode = "remote"

  local {
    ## store locks in user's database
  }

  remote {
    ## store locks in the seata's server
  }
}
recovery {
  #schedule committing retry period in milliseconds
  committing-retry-period = 1000
  #schedule asyn committing retry period in milliseconds
  asyn-committing-retry-period = 1000
  #schedule rollbacking retry period in milliseconds
  rollbacking-retry-period = 1000
  #schedule timeout retry period in milliseconds
  timeout-retry-period = 1000
}

transaction {
  undo.data.validation = true
  undo.log.serialization = "jackson"
  undo.log.save.days = 7
  #schedule delete expired undo_log in milliseconds
  undo.log.delete.period = 86400000
  undo.log.table = "undo_log"
}

## metrics settings
metrics {
  enabled = false
  registry-type = "compact"
  # multi exporters use comma divided
  exporter-list = "prometheus"
  exporter-prometheus-port = 9898
}

support {
  ## spring
  spring {
    # auto proxy the DataSource bean
    datasource.autoproxy = false
  }
}

```



##### registry.conf

```shell
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "nacos"

  nacos {
    serverAddr = "175.24.229.41:8848"
    namespace = ""
    cluster = "default"
  }
  eureka {
    serviceUrl = "http://localhost:8761/eureka"
    application = "default"
    weight = "1"
  }
  redis {
    serverAddr = "localhost:6379"
    db = "0"
  }
  zk {
    cluster = "default"
    serverAddr = "127.0.0.1:2181"
    session.timeout = 6000
    connect.timeout = 2000
  }
  consul {
    cluster = "default"
    serverAddr = "127.0.0.1:8500"
  }
  etcd3 {
    cluster = "default"
    serverAddr = "http://localhost:2379"
  }
  sofa {
    serverAddr = "127.0.0.1:9603"
    application = "default"
    region = "DEFAULT_ZONE"
    datacenter = "DefaultDataCenter"
    cluster = "default"
    group = "SEATA_GROUP"
    addressWaitTime = "3000"
  }
  file {
    name = "file.conf"
  }
}

config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "file"

  nacos {
    serverAddr = "localhost"
    namespace = ""
  }
  consul {
    serverAddr = "127.0.0.1:8500"
  }
  apollo {
    app.id = "seata-server"
    apollo.meta = "http://192.168.1.204:8801"
  }
  zk {
    serverAddr = "127.0.0.1:2181"
    session.timeout = 6000
    connect.timeout = 2000
  }
  etcd3 {
    serverAddr = "http://localhost:2379"
  }
  file {
    name = "file.conf"
  }
}


```



##### 业务类

###### pojo

>   CommonResult

```java
package com.yixihan.springcloud.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author : yixihan
 * @create : 2022-01-28-11:49
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonResult<T> implements Serializable {

    private Integer code;

    private String message;

    private T data;

    public CommonResult(Integer code, String message) {
        this (code, message, null);
    }
}

```



>   Order

```java
package com.yixihan.springcloud.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @author : yixihan
 * @create : 2022-01-28-11:50
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order implements Serializable {

    private Long id;

    private Long userId;

    private Long productId;

    private Integer count;

    private BigDecimal money;

    /**
     * 订单状态：0：创建中；1：已完结
     */
    private Integer status;
}

```



###### Mapper

>   Mapper.java

```java
package com.yixihan.springcloud.mapper;

import com.yixihan.springcloud.pojo.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * @author : yixihan
 * @create : 2022-01-28-11:59
 */
@Mapper
public interface OrderMapper {

    /**
     * 创建订单
     */
    void create(Order order);

    /**
     * 修改订单金额
     */
    void update(@Param("userId") Long userId, @Param("status") Integer status);

}

```



>   Mapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.yixihan.springcloud.mapper.OrderMapper">

    <resultMap id="BaseResultMap" type="com.yixihan.springcloud.pojo.Order">
        <id column="id" property="id" jdbcType="BIGINT"/>
        <result column="user_id" property="userId" jdbcType="BIGINT"/>
        <result column="product_id" property="productId" jdbcType="BIGINT"/>
        <result column="count" property="count" jdbcType="INTEGER"/>
        <result column="money" property="money" jdbcType="DECIMAL"/>
        <result column="status" property="status" jdbcType="INTEGER"/>
    </resultMap>

    <insert id="create">
        insert into seata_order.t_order(user_id, product_id, count, money, status)
        VALUES (#{userId}, #{productId}, #{count}, #{money}, 0);

    </insert>

    <update id="update">
        update seata_order.t_order
        set status = 1
        where user_id = #{userId}
          and status = #{status};
    </update>
</mapper>
```



###### Service

>   OrderService

```java
package com.yixihan.springcloud.service;

import com.yixihan.springcloud.pojo.Order;

/**
 * @author : yixihan
 * @create : 2022-01-28-12:11
 */
public interface OrderService {

    /**
     * 创建订单
     */
    void create(Order order);
}

```



>   OrderServiceImpl

```java
package com.yixihan.springcloud.service.impl;

import com.yixihan.springcloud.mapper.OrderMapper;
import com.yixihan.springcloud.pojo.Order;
import com.yixihan.springcloud.service.AccountService;
import com.yixihan.springcloud.service.OrderService;
import com.yixihan.springcloud.service.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-28-12:12
 */
@Service
@Slf4j
public class OrderServiceImpl implements OrderService {

    @Resource
    private OrderMapper orderMapper;

    @Resource
    private AccountService accountService;

    @Resource
    private StorageService storageService;

    /**
     * 创建订单->调用库存服务扣减库存->调用账户服务扣减账户余额->修改订单状态
     * 简单说：
     * 下订单->减库存->减余额->改状态
     */
    @Override
    public void create(Order order) {

        // 1. 新建订单
        log.info (" ---> 开始新建订单 ---start");
        orderMapper.create (order);

        // 2. 扣减库存
        log.info (" ---> 订单微服务开始调用库存, 做扣减 ---start");
        storageService.decrease (order.getProductId (), order.getCount ());
        log.info (" ---> 订单微服务开始调用库存, 做扣减 ---end");

        // 3. 扣减账户
        log.info (" ---> 订单微服务开始调用账号, 做扣减 Money ---start");
        accountService.decrease (order.getUserId (), order.getMoney ());
        log.info (" ---> 订单微服务开始调用账号, 做扣减 Money ---end");

        // 4. 修改订单的状态, 0 -> 1 (1 代表已经完成)
        log.info ("---> 修改订单状态 ---start");
        orderMapper.update (order.getUserId (), 0);
        log.info ("---> 修改订单状态 ---end");

        log.info ("---> 下订单, 结束啦~ ---end");
    }
}

```



>   StorageService

```java
package com.yixihan.springcloud.service;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.service.fallback.StorageServiceFallback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @author : yixihan
 * @create : 2022-01-28-12:13
 */
@FeignClient(value = "seata-storage-service", fallback = StorageServiceFallback.class)
public interface StorageService {

    /**
     * 扣减库存
     */
    @PostMapping(value = "/storage/decrease")
    CommonResult decrease(@RequestParam("productId") Long productId, @RequestParam("count") Integer count);
}

```



>   StorageServiceFallback

```java
package com.yixihan.springcloud.service.fallback;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.service.StorageService;
import org.springframework.stereotype.Component;

/**
 * @author : yixihan
 * @create : 2022-01-28-12:25
 */
@Component
public class StorageServiceFallback implements StorageService {

    @Override
    public CommonResult decrease(Long productId, Integer count) {
        return new CommonResult (4444, "服务器繁忙, 请稍后再试");
    }
}

```



>   AccountService

```java
package com.yixihan.springcloud.service;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.service.fallback.AccountServiceFallback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;

/**
 * @author : yixihan
 * @create : 2022-01-28-12:13
 */
@FeignClient(value = "seata-account-service", fallback = AccountServiceFallback.class)
public interface AccountService {

    /**
     * 扣减账户
     */
    @PostMapping(value = "/account/decrease")
    CommonResult decrease(@RequestParam("userId") Long userId, @RequestParam("money") BigDecimal money);
}

```



>   AccountServiceFallback

```java
package com.yixihan.springcloud.service.fallback;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.service.AccountService;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * @author : yixihan
 * @create : 2022-01-28-12:34
 */
@Component
public class AccountServiceFallback implements AccountService {

    @Override
    public CommonResult decrease(Long userId, BigDecimal count) {
        return new CommonResult (4444, "服务器繁忙, 请稍后再试");
    }
}

```



###### Controller

```java
package com.yixihan.springcloud.controller;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Order;
import com.yixihan.springcloud.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-28-12:40
 */
@RestController
@Slf4j
public class OrderController {

    @Resource
    private OrderService orderService;

    @GetMapping("/order/create")
    public CommonResult create (Order order) {
        orderService.create (order);
        return new CommonResult (200, "订单创建完成~");
    }
}

```



###### Config

>   MyBatisConfig

```java
package com.yixihan.springcloud.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

/**
 * @author : yixihan
 * @create : 2022-01-28-12:42
 */
@Configuration
@MapperScan("com.yixihan.springcloud.mapper")
public class MyBatisConfig {
}

```



>   DataSourceProxyConfig

```java
package com.yixihan.springcloud.config;

import com.alibaba.druid.pool.DruidDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.transaction.SpringManagedTransactionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import javax.sql.DataSource;

/**
 * @author : yixihan
 * @create : 2022-01-28-12:42
 */
@Configuration
public class DataSourceProxyConfig {

    @Value("${mybatis.mapperLocations}")
    private String mapperLocations;

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource druidDataSource() {
        return new DruidDataSource ();
    }

    @Bean
    public SqlSessionFactory sqlSessionFactoryBean(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        sqlSessionFactoryBean.setMapperLocations(new PathMatchingResourcePatternResolver ().getResources(mapperLocations));
        sqlSessionFactoryBean.setTransactionFactory(new SpringManagedTransactionFactory ());
        return sqlSessionFactoryBean.getObject();
    }
}

```



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * @author : yixihan
 * @create : 2022-01-28-12:44
 */
@EnableDiscoveryClient
@EnableFeignClients
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)//取消数据源的自动创建
public class SeataOrderMainApp2001 {

    public static void main(String[] args) {
        SpringApplication.run(SeataOrderMainApp2001.class, args);
    }

}

```



#### 新建库存Storage-Module

##### 建 module



module 名 : seata-storage-service2002



##### 改 POM

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>springcloud-learn</artifactId>
        <groupId>com.yixihan.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>seata-storage-service2002</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--nacos-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!--seata-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
            <exclusions>
                <exclusion>
                    <artifactId>seata-all</artifactId>
                    <groupId>io.seata</groupId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>io.seata</groupId>
            <artifactId>seata-spring-boot-starter</artifactId>
            <version>1.0.0</version>
        </dependency>
        <dependency>
            <groupId>io.seata</groupId>
            <artifactId>seata-all</artifactId>
            <version>1.0.0</version>
        </dependency>
        <!--feign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.0.0</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.10</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
    </dependencies>

</project>

```



##### 写 YAML

```yaml
server:
  port: 2002

spring:
  application:
    name: seata-storage-service
  cloud:
    alibaba:
      seata:
        #自定义事务组名称需要与seata-server中的对应
        tx-service-group: fsp_tx_group
    nacos:
      discovery:
        server-addr: 175.24.229.41:8848
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://175.24.229.41:1617/seata_storage
    username: root
    password: W6YnvKnLzpSFNGuc.

feign:
  hystrix:
    enabled: false
  client:
    config:
      default:
        connect-timeout: 300000
        read-timeout: 300000

logging:
  level:
    io:
      seata: info

mybatis:
  mapperLocations: classpath:mapper/*.xml
  type-aliases-package: com.yixihan.springcloud.pojo


```



##### file.conf

```shell
transport {
  # tcp udt unix-domain-socket
  type = "TCP"
  #NIO NATIVE
  server = "NIO"
  #enable heartbeat
  heartbeat = true
  #thread factory for netty
  thread-factory {
    boss-thread-prefix = "NettyBoss"
    worker-thread-prefix = "NettyServerNIOWorker"
    server-executor-thread-prefix = "NettyServerBizHandler"
    share-boss-worker = false
    client-selector-thread-prefix = "NettyClientSelector"
    client-selector-thread-size = 1
    client-worker-thread-prefix = "NettyClientWorkerThread"
    # netty boss thread size,will not be used for UDT
    boss-thread-size = 1
    #auto default pin or 8
    worker-thread-size = 8
  }
  shutdown {
    # when destroy server, wait seconds
    wait = 3
  }
  serialization = "seata"
  compressor = "none"
}

service {
  #vgroup->rgroup
  vgroup_mapping.fsp_tx_group = "default"
  #only support single node
  default.grouplist = "127.0.0.1:8091"
  #degrade current not support
  enableDegrade = false
  #disable
  disable = false
  #unit ms,s,m,h,d represents milliseconds, seconds, minutes, hours, days, default permanent
  max.commit.retry.timeout = "-1"
  max.rollback.retry.timeout = "-1"
  disableGlobalTransaction = false
}

client {
  async.commit.buffer.limit = 10000
  lock {
    retry.internal = 10
    retry.times = 30
  }
  report.retry.count = 5
  tm.commit.retry.count = 1
  tm.rollback.retry.count = 1
}

transaction {
  undo.data.validation = true
  undo.log.serialization = "jackson"
  undo.log.save.days = 7
  #schedule delete expired undo_log in milliseconds
  undo.log.delete.period = 86400000
  undo.log.table = "undo_log"
}

support {
  ## spring
  spring {
    # auto proxy the DataSource bean
    datasource.autoproxy = false
  }
}


```



##### registry.conf

```shell
registry {
  # file 、nacos 、eureka、redis、zk
  type = "nacos"

  nacos {
    serverAddr = "175.24.229.41:8848"
    namespace = ""
    cluster = "default"
  }
  eureka {
    serviceUrl = "http://localhost:8761/eureka"
    application = "default"
    weight = "1"
  }
  redis {
    serverAddr = "localhost:6381"
    db = "0"
  }
  zk {
    cluster = "default"
    serverAddr = "127.0.0.1:2181"
    session.timeout = 6000
    connect.timeout = 2000
  }
  file {
    name = "file.conf"
  }
}

config {
  # file、nacos 、apollo、zk
  type = "file"

  nacos {
    serverAddr = "localhost"
    namespace = ""
    cluster = "default"
  }
  apollo {
    app.id = "fescar-server"
    apollo.meta = "http://192.168.1.204:8801"
  }
  zk {
    serverAddr = "127.0.0.1:2181"
    session.timeout = 6000
    connect.timeout = 2000
  }
  file {
    name = "file.conf"
  }
}



```



##### 业务类

###### pojo

>   Storage

```java
package com.yixihan.springcloud.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : yixihan
 * @create : 2022-01-28-13:15
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Storage {

    private Long id;

    /**
     * 产品id
     */
    private Long productId;

    /**
     * 总库存
     */
    private Integer total;

    /**
     * 已用库存
     */
    private Integer used;

    /**
     * 剩余库存
     */
    private Integer residue;

}

```



>   CommonResult

```java
package com.yixihan.springcloud.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author : yixihan
 * @create : 2022-01-28-11:49
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonResult<T> implements Serializable {

    private Integer code;

    private String message;

    private T data;

    public CommonResult(Integer code, String message) {
        this (code, message, null);
    }
}

```



###### mapper

>   StorageMapper.java

```java
package com.yixihan.springcloud.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * @author : yixihan
 * @create : 2022-01-28-13:15
 */
@Mapper
public interface StorageMapper {

    /**
     * 扣减库存
     */
    void decrease(@Param("productId") Long productId, @Param("count") Integer count);

}

```



>   StorageMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.yixihan.springcloud.mapper.StorageMapper">

    <resultMap id="BaseResultMap" type="com.yixihan.springcloud.pojo.Storage">
        <id column="id" property="id" jdbcType="BIGINT"/>
        <result column="product_id" property="productId" jdbcType="BIGINT"/>
        <result column="total" property="total" jdbcType="INTEGER"/>
        <result column="used" property="used" jdbcType="INTEGER"/>
        <result column="residue" property="residue" jdbcType="INTEGER"/>
    </resultMap>
    
    <update id="decrease">
        update seata_storage.t_storage
        set used = used + #{count}, residue = residue - #{count}
        where product_id = #{productId};
    </update>
</mapper>
```



###### service

>   StorageService

```java

package com.yixihan.springcloud.service;

/**
 * @author : yixihan
 * @create : 2022-01-28-13:21
 */
public interface StorageService {
    /**
     * 扣减库存
     */
    void decrease(Long productId, Integer count);
}

```



>   StorageServiceImpl

```java
package com.yixihan.springcloud.service.impl;

import com.yixihan.springcloud.mapper.StorageMapper;
import com.yixihan.springcloud.service.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-28-13:21
 */
@Service
@Slf4j
public class StorageServiceImpl implements StorageService {

    private static final Logger LOGGER = LoggerFactory.getLogger (StorageServiceImpl.class);

    @Resource
    private StorageMapper storageMapper;

    @Override
    public void decrease(Long productId, Integer count) {
        LOGGER.info ("------->storage-service中扣减库存开始");
        storageMapper.decrease (productId, count);
        LOGGER.info ("------->storage-service中扣减库存结束");

    }
}

```



###### controller

```java
package com.yixihan.springcloud.controller;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.service.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-28-13:23
 */
@RestController
@Slf4j
public class StorageController {

    @Resource
    private StorageService storageService;

    /**
     * 扣减库存
     */
    @RequestMapping("/storage/decrease")
    public CommonResult decrease(Long productId, Integer count) {
        storageService.decrease(productId, count);
        return new CommonResult(200,"扣减库存成功！");
    }

}

```



###### config

>   DataSourceProxyConfig

```java
package com.yixihan.springcloud.config;

import com.alibaba.druid.pool.DruidDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.transaction.SpringManagedTransactionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import javax.sql.DataSource;

/**
 * @author : yixihan
 * @create : 2022-01-28-12:42
 */
@Configuration
public class DataSourceProxyConfig {

    @Value("${mybatis.mapperLocations}")
    private String mapperLocations;

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource druidDataSource() {
        return new DruidDataSource ();
    }


    @Bean
    public SqlSessionFactory sqlSessionFactoryBean(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        sqlSessionFactoryBean.setMapperLocations(new PathMatchingResourcePatternResolver ().getResources(mapperLocations));
        sqlSessionFactoryBean.setTransactionFactory(new SpringManagedTransactionFactory ());
        return sqlSessionFactoryBean.getObject();
    }
}

```



>   MybatisConfig

```java
package com.yixihan.springcloud.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

/**
 * @author : yixihan
 * @create : 2022-01-28-13:23
 */
@Configuration
@MapperScan("com.yixihan.springcloud.mapper")
public class MyBatisConfig {
}

```



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * @author : yixihan
 * @create : 2022-01-28-13:32
 */
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
@EnableDiscoveryClient
@EnableFeignClients
public class SeataStorageServiceApplication2002 {

    public static void main(String[] args) {
        SpringApplication.run(SeataStorageServiceApplication2002.class, args);
    }
}

```



#### 新建账户Account-Module

##### 建 module



module 名 : seata-account-service2003



##### 改 POM

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>springcloud-learn</artifactId>
        <groupId>com.yixihan.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>seata-account-service2003</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--nacos-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!--seata-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
            <exclusions>
                <exclusion>
                    <artifactId>seata-all</artifactId>
                    <groupId>io.seata</groupId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>io.seata</groupId>
            <artifactId>seata-spring-boot-starter</artifactId>
            <version>1.0.0</version>
        </dependency>
        <dependency>
            <groupId>io.seata</groupId>
            <artifactId>seata-all</artifactId>
            <version>1.0.0</version>
        </dependency>
        <!--feign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.0.0</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.10</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
    </dependencies>

</project>
```



##### 写 YAML

```yaml
server:
  port: 2003

spring:
  application:
    name: seata-account-service
  cloud:
    alibaba:
      seata:
        #自定义事务组名称需要与seata-server中的对应
        tx-service-group: fsp_tx_group
    nacos:
      discovery:
        server-addr: 175.24.229.41:8848
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://175.24.229.41:1617/seata_account
    username: root
    password: W6YnvKnLzpSFNGuc.

feign:
  hystrix:
    enabled: false
  client:
    config:
      default:
        connect-timeout: 300000
        read-timeout: 300000

logging:
  level:
    io:
      seata: info

mybatis:
  mapperLocations: classpath:mapper/*.xml
  type-aliases-package: com.yixihan.springcloud.pojo


```



##### file.conf

```shell
transport {
  # tcp udt unix-domain-socket
  type = "TCP"
  #NIO NATIVE
  server = "NIO"
  #enable heartbeat
  heartbeat = true
  #thread factory for netty
  thread-factory {
    boss-thread-prefix = "NettyBoss"
    worker-thread-prefix = "NettyServerNIOWorker"
    server-executor-thread-prefix = "NettyServerBizHandler"
    share-boss-worker = false
    client-selector-thread-prefix = "NettyClientSelector"
    client-selector-thread-size = 1
    client-worker-thread-prefix = "NettyClientWorkerThread"
    # netty boss thread size,will not be used for UDT
    boss-thread-size = 1
    #auto default pin or 8
    worker-thread-size = 8
  }
  shutdown {
    # when destroy server, wait seconds
    wait = 3
  }
  serialization = "seata"
  compressor = "none"
}

service {
  #vgroup->rgroup
  vgroup_mapping.fsp_tx_group = "default"
  #only support single node
  default.grouplist = "127.0.0.1:8091"
  #degrade current not support
  enableDegrade = false
  #disable
  disable = false
  #unit ms,s,m,h,d represents milliseconds, seconds, minutes, hours, days, default permanent
  max.commit.retry.timeout = "-1"
  max.rollback.retry.timeout = "-1"
  disableGlobalTransaction = false
}

client {
  async.commit.buffer.limit = 10000
  lock {
    retry.internal = 10
    retry.times = 30
  }
  report.retry.count = 5
  tm.commit.retry.count = 1
  tm.rollback.retry.count = 1
}

transaction {
  undo.data.validation = true
  undo.log.serialization = "jackson"
  undo.log.save.days = 7
  #schedule delete expired undo_log in milliseconds
  undo.log.delete.period = 86400000
  undo.log.table = "undo_log"
}

support {
  ## spring
  spring {
    # auto proxy the DataSource bean
    datasource.autoproxy = false
  }
}


```



##### registry.conf

```shell
registry {
  # file 、nacos 、eureka、redis、zk
  type = "nacos"

  nacos {
    serverAddr = "175.24.229.41:8848"
    namespace = ""
    cluster = "default"
  }
  eureka {
    serviceUrl = "http://localhost:8761/eureka"
    application = "default"
    weight = "1"
  }
  redis {
    serverAddr = "localhost:6381"
    db = "0"
  }
  zk {
    cluster = "default"
    serverAddr = "127.0.0.1:2181"
    session.timeout = 6000
    connect.timeout = 2000
  }
  file {
    name = "file.conf"
  }
}

config {
  # file、nacos 、apollo、zk
  type = "file"

  nacos {
    serverAddr = "localhost"
    namespace = ""
    cluster = "default"
  }
  apollo {
    app.id = "fescar-server"
    apollo.meta = "http://192.168.1.204:8801"
  }
  zk {
    serverAddr = "127.0.0.1:2181"
    session.timeout = 6000
    connect.timeout = 2000
  }
  file {
    name = "file.conf"
  }
}



```



##### 业务类

###### pojo

>   Account

```java
package com.yixihan.springcloud.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * @author : yixihan
 * @create : 2022-01-28-14:00
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Account {

    private Long id;

    /**
     * 用户id
     */
    private Long userId;

    /**
     * 总额度
     */
    private BigDecimal total;

    /**
     * 已用额度
     */
    private BigDecimal used;

    /**
     * 剩余额度
     */
    private BigDecimal residue;

}

```



>   CommonResult

```java
package com.yixihan.springcloud.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : yixihan
 * @create : 2022-01-28-14:07
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonResult<T> {

    private Integer code;
    private String message;
    private T data;

    public CommonResult(Integer code, String message) {
        this (code, message, null);
    }

}

```



###### mapper

>   AccountMapper.java

```java
package com.yixihan.springcloud.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;

/**
 * @author : yixihan
 * @create : 2022-01-28-14:01
 */
@Mapper
public interface AccountMapper {

    /**
     * 扣减账户余额
     */
    void decrease(@Param("userId") Long userId, @Param("money") BigDecimal money);
}

```



>   AccountMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.yixihan.springcloud.mapper.AccountMapper">

    <resultMap id="BaseResultMap" type="com.yixihan.springcloud.pojo.Account">
        <id column="id" property="id" jdbcType="BIGINT"/>
        <result column="user_id" property="userId" jdbcType="BIGINT"/>
        <result column="total" property="total" jdbcType="DECIMAL"/>
        <result column="used" property="used" jdbcType="DECIMAL"/>
        <result column="residue" property="residue" jdbcType="DECIMAL"/>
    </resultMap>

    <update id="decrease">
        UPDATE seata_account.t_account
        SET residue = residue - #{money},
            used    = used + #{money}
        WHERE user_id = #{userId};
    </update>

</mapper>
```



###### service

>   AccountService

```java
package com.yixihan.springcloud.service;

import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;

/**
 * @author : yixihan
 * @create : 2022-01-28-14:03
 */
public interface AccountService {

    /**
     * 扣减账户余额
     *
     * @param userId 用户id
     * @param money  金额
     */
    void decrease(@RequestParam("userId") Long userId, @RequestParam("money") BigDecimal money);
}

```



>   AccountServiceImpl

```java
package com.yixihan.springcloud.service.impl;

import com.yixihan.springcloud.mapper.AccountMapper;
import com.yixihan.springcloud.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigDecimal;

/**
 * @author : yixihan
 * @create : 2022-01-28-14:03
 */
@Service
@Slf4j
public class AccountServiceImpl implements AccountService {

    @Resource
    private AccountMapper accountMapper;

    private static final Logger LOGGER = LoggerFactory.getLogger (AccountServiceImpl.class);

    @Override
    public void decrease(Long userId, BigDecimal money) {
        LOGGER.info ("------->account-service中扣减账户余额开始");
        //模拟超时异常，全局事务回滚
        //暂停几秒钟线程
        //try { TimeUnit.SECONDS.sleep(30); } catch (InterruptedException e) { e.printStackTrace(); }
        accountMapper.decrease (userId, money);
        LOGGER.info ("------->account-service中扣减账户余额结束");
    }

}

```



###### controller

```java
package com.yixihan.springcloud.controller;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.math.BigDecimal;

/**
 * @author : yixihan
 * @create : 2022-01-28-14:04
 */
@RestController
@Slf4j
public class AccountController {

    @Resource
    private AccountService accountService;

    /**
     * 扣减账户余额
     */
    @RequestMapping("/account/decrease")
    public CommonResult decrease(@RequestParam("userId") Long userId, @RequestParam("money") BigDecimal money) {
        accountService.decrease (userId, money);
        return new CommonResult (200, "扣减账户余额成功！");
    }
}

```



###### config

>   DataSourceProxyConfig

```java
package com.yixihan.springcloud.config;

import com.alibaba.druid.pool.DruidDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.transaction.SpringManagedTransactionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import javax.sql.DataSource;

/**
 * @author : yixihan
 * @create : 2022-01-28-12:42
 */
@Configuration
public class DataSourceProxyConfig {

    @Value("${mybatis.mapperLocations}")
    private String mapperLocations;

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource druidDataSource() {
        return new DruidDataSource ();
    }


    @Bean
    public SqlSessionFactory sqlSessionFactoryBean(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean ();
        sqlSessionFactoryBean.setDataSource (dataSource);
        sqlSessionFactoryBean.setMapperLocations (new PathMatchingResourcePatternResolver ().getResources (mapperLocations));
        sqlSessionFactoryBean.setTransactionFactory (new SpringManagedTransactionFactory ());
        return sqlSessionFactoryBean.getObject ();
    }
}

```



>   MyBatisConfig

```java

package com.yixihan.springcloud.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

/**
 * @author : yixihan
 * @create : 2022-01-28-13:23
 */
@Configuration
@MapperScan("com.yixihan.springcloud.mapper")
public class MyBatisConfig {
}

```



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * @author : yixihan
 * @create : 2022-01-28-14:05
 */
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
@EnableDiscoveryClient
@EnableFeignClients
public class SeataAccountMainApp2003 {
    public static void main(String[] args) {
        SpringApplication.run (SeataAccountMainApp2003.class, args);
    }
}
```



### 测试

下订单->减库存->扣余额->改(订单)状态

![image-20220128094920105](/assets/imgs/SpringCloud5.assets/image-20220128094920105.png)

>   数据库初始情况

```sql
SELECT *
FROM `seata_order`.`t_order`;

SELECT *
FROM `seata_storage`.`t_storage`;

SELECT *
FROM `seata_account`.`t_account`;
```



![image-20220128152323998](/assets/imgs/SpringCloud5.assets/image-20220128152323998.png)

![image-20220128152343015](/assets/imgs/SpringCloud5.assets/image-20220128152343015.png)

![image-20220128152405030](/assets/imgs/SpringCloud5.assets/image-20220128152405030.png)



#### 正常下单

[测试接口](http://localhost:2001/order/create?userId=1&productId=1&count=10&money=100)



>   接口返回情况

![image-20220128143253490](/assets/imgs/SpringCloud5.assets/image-20220128143253490.png)



>   数据库情况

```sql
SELECT *
FROM `seata_order`.`t_order`;

SELECT *
FROM `seata_storage`.`t_storage`;

SELECT *
FROM `seata_account`.`t_account`;
```

![image-20220128153021463](/assets/imgs/SpringCloud5.assets/image-20220128153021463.png)

![image-20220128153036317](/assets/imgs/SpringCloud5.assets/image-20220128153036317.png)

![image-20220128153043623](/assets/imgs/SpringCloud5.assets/image-20220128153043623.png)



#### 超时异常，没加@GlobalTransactional

>    修改 AccountServiceImpl

模拟超时异常

```java
package com.yixihan.springcloud.service.impl;

import com.yixihan.springcloud.mapper.AccountMapper;
import com.yixihan.springcloud.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.concurrent.TimeUnit;

/**
 * @author : yixihan
 * @create : 2022-01-28-14:03
 */
@Service
@Slf4j
public class AccountServiceImpl implements AccountService {

    @Resource
    private AccountMapper accountMapper;

    private static final Logger LOGGER = LoggerFactory.getLogger (AccountServiceImpl.class);

    @Override
    public void decrease(Long userId, BigDecimal money) {
        LOGGER.info ("------->account-service中扣减账户余额开始");
        //模拟超时异常，全局事务回滚
        //暂停几秒钟线程
        try { TimeUnit.SECONDS.sleep(30); } catch (InterruptedException e) { e.printStackTrace(); }
        accountMapper.decrease (userId, money);
        LOGGER.info ("------->account-service中扣减账户余额结束");
    }

}

```



>   故障情况

![image-20220128151526188](/assets/imgs/SpringCloud5.assets/image-20220128151526188.png)



当库存和账户金额扣减后，订单状态并没有设置为已经完成，没有从零改为1

而且由于feign的重试机制，账户余额还有可能被多次扣减



![image-20220128153304292](/assets/imgs/SpringCloud5.assets/image-20220128153304292.png)

![image-20220128153323423](/assets/imgs/SpringCloud5.assets/image-20220128153323423.png)

![image-20220128153332337](/assets/imgs/SpringCloud5.assets/image-20220128153332337.png)



#### 超时异常，添加@GlobalTransactional

AccountServiceImpl添加超时

```java
package com.yixihan.springcloud.service.impl;

import com.yixihan.springcloud.mapper.OrderMapper;
import com.yixihan.springcloud.pojo.Order;
import com.yixihan.springcloud.service.AccountService;
import com.yixihan.springcloud.service.OrderService;
import com.yixihan.springcloud.service.StorageService;
import io.seata.spring.annotation.GlobalTransactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-28-12:12
 */
@Service
@Slf4j
public class OrderServiceImpl implements OrderService {

    @Resource
    private OrderMapper orderMapper;

    @Resource
    private AccountService accountService;

    @Resource
    private StorageService storageService;

    /**
     * 创建订单->调用库存服务扣减库存->调用账户服务扣减账户余额->修改订单状态
     * 简单说：
     * 下订单->减库存->减余额->改状态
     */
    @Override
    @GlobalTransactional(name = "fsp-create-order",rollbackFor = Exception.class)
    public void create(Order order) {

        // 1. 新建订单
        log.info (" ---> 开始新建订单 ---start");
        orderMapper.create (order);

        // 2. 扣减库存
        log.info (" ---> 订单微服务开始调用库存, 做扣减 ---start");
        storageService.decrease (order.getProductId (), order.getCount ());
        log.info (" ---> 订单微服务开始调用库存, 做扣减 ---end");

        // 3. 扣减账户
        log.info (" ---> 订单微服务开始调用账号, 做扣减 Money ---start");
        accountService.decrease (order.getUserId (), order.getMoney ());
        log.info (" ---> 订单微服务开始调用账号, 做扣减 Money ---end");

        // 4. 修改订单的状态, 0 -> 1 (1 代表已经完成)
        log.info ("---> 修改订单状态 ---start");
        orderMapper.update (order.getUserId (), 0);
        log.info ("---> 修改订单状态 ---end");

        log.info ("---> 下订单, 结束啦~ ---end");
    }
}

```



下单后数据库数据并没有任何改变, 记录都添加不进来

![image-20220128153507047](/assets/imgs/SpringCloud5.assets/image-20220128153507047.png)

![image-20220128153514090](/assets/imgs/SpringCloud5.assets/image-20220128153514090.png)

![image-20220128153520561](/assets/imgs/SpringCloud5.assets/image-20220128153520561.png)



### seata 原理

![image-20220128154124048](/assets/imgs/SpringCloud5.assets/image-20220128154124048.png)



#### Seata

2019年1月份蚂蚁金服和阿里巴巴共同开源的分布式事务解决方案

Simple Extensible Autonomous Transaction Architecture，简单可扩展自治事务框架

2020起始，参加工作后用1.0以后的版本

![image-20220128153648246](/assets/imgs/SpringCloud5.assets/image-20220128153648246.png)



#### TC/TM/RM三大组件

>   图解

![image-20220128153706918](/assets/imgs/SpringCloud5.assets/image-20220128153706918.png)



>   分布式事务的执行流程

1.   TM 开启分布式事务（TM 向 TC 注册全局事务记录）；
2.   按业务场景，编排数据库、服务等事务内资源（RM 向 TC 汇报资源准备状态 ）；
3.   TM 结束分布式事务，事务一阶段结束（TM 通知 TC 提交/回滚分布式事务）；
4.   TC 汇总事务信息，决定分布式事务是提交还是回滚；
5.   TC 通知所有 RM 提交/回滚 资源，事务二阶段结束。



#### AT模式如何做到对业务的无侵入

##### 是什么

![image-20220128153816357](/assets/imgs/SpringCloud5.assets/image-20220128153816357.png)



##### 一阶段加载

在一阶段，Seata 会拦截“业务 SQL”，

1.   解析 SQL 语义，找到“业务 SQL”要更新的业务数据，在业务数据被更新前，将其保存成“before image”，
2.   执行“业务 SQL”更新业务数据，在业务数据更新之后，
3.   其保存成“after image”，最后生成行锁。
     以上操作全部在一个数据库事务内完成，这样保证了一阶段操作的原子性。

![image-20220128153848452](/assets/imgs/SpringCloud5.assets/image-20220128153848452.png)



##### 二阶段提交

二阶段如是顺利提交的话，因为“业务 SQL”在一阶段已经提交至数据库，所以Seata框架只需将**一阶段保存的快照数据和行锁删掉，完成数据清理即可**。

![image-20220128153925732](/assets/imgs/SpringCloud5.assets/image-20220128153925732.png)



##### 二阶段回滚

二阶段回滚：

二阶段如果是回滚的话，Seata 就需要回滚一阶段已经执行的“业务 SQL”，还原业务数据。

回滚方式便是用“before image”还原业务数据；但在还原前要首先要校验脏写，对比“数据库当前业务数据”和 “after image”，

如果两份数据完全一致就说明没有脏写，可以还原业务数据，如果不一致就说明有脏写，出现脏写就需要转人工处理。

![image-20220128153953498](/assets/imgs/SpringCloud5.assets/image-20220128153953498.png)



#### 补充

![image-20220128154007217](/assets/imgs/SpringCloud5.assets/image-20220128154007217.png)