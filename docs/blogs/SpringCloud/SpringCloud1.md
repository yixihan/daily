---
title: SpringCloud1
date: 2022-02-22
tags:
 - SpringCloud
categories:
 - SpringCloud
---

# SpringCloud



## 版本选择



SpringBoot : 2.3.12.RELEASE

SpringCloud : Hoxton.SR12

SpringCloud alibaba : 2.2.7.RELEASE

java : 1.8.0_291

maven : 3.8.1

mysql : 5.7.36

[MindManager2020 64位 下载地址](http://dwnld.mindjet.com/stubs/Builds/MindManager2020/20_0_334/64Bit/MindManager%202020.msi)


[MindManager2020 32位 下载地址](http://dwnld.mindjet.com/stubs/Builds/MindManager2020/20_0_334/32Bit/MindManager%202020.msi)

激活码 : MP20-345-DP56-7778-919A



## 文章选择

[consul + ribbon + openfeign + hystrix](D:\JAVA\tpyora\SpringCloud4.md)

[gateway + config + bus + stream + sleuth](D:\JAVA\tpyora\SpringCloud3.md)

[nacos + sentinel](D:\JAVA\tpyora\SpringCloud4.md)

[Seata](D:\JAVA\tpyora\SpringCloud5.md)



## cloud 升级



### 服务注册中心

![image-20220116102539381](/assets/imgs/SpringCloud1.assets/image-20220116102539381.png)

>   对比

![image-20220116102748121](/assets/imgs/SpringCloud1.assets/image-20220116102748121.png)



### 服务调用

![image-20220116102939916](/assets/imgs/SpringCloud1.assets/image-20220116102939916.png)

![image-20220116102953284](/assets/imgs/SpringCloud1.assets/image-20220116102953284.png)



### 服务降级

![image-20220116103131436](/assets/imgs/SpringCloud1.assets/image-20220116103131436.png)



### 服务网关

![image-20220116103240210](/assets/imgs/SpringCloud1.assets/image-20220116103240210.png)



### 服务配置

![image-20220116103327768](/assets/imgs/SpringCloud1.assets/image-20220116103327768.png)



### 服务总线

![image-20220116103348012](/assets/imgs/SpringCloud1.assets/image-20220116103348012.png)



### 总结

![image-20220116103429075](/assets/imgs/SpringCloud1.assets/image-20220116103429075.png)



### 参考资料



[springcloud官方文档](https://cloud.spring.io/spring-cloud-static/current/reference/htmlsingle/)

[springcloud中文文档](https://www.bookstack.cn/read/spring-cloud-docs/docs-index.md)

[springboot官方文档](https://docs.spring.io/spring-boot/docs/2.6.1/reference/htmlsingle/)



## 微服务架构编码构建



>   永远要记住

约定 > 配置 > 编码



### IDEA新建project工作空间



#### New Project

![image-20220116105427771](/assets/imgs/SpringCloud1.assets/image-20220116105427771.png)



#### 聚合总父工程名字

![image-20220116105513052](/assets/imgs/SpringCloud1.assets/image-20220116105513052.png)



#### Maven 选版本

![image-20220116105539979](/assets/imgs/SpringCloud1.assets/image-20220116105539979.png)



#### 字符编码

![image-20220116104710647](/assets/imgs/SpringCloud1.assets/image-20220116104710647.png)



#### 注解生效激活

![image-20220116104738936](/assets/imgs/SpringCloud1.assets/image-20220116104738936.png)



#### java编译版本选8

![image-20220116105115222](/assets/imgs/SpringCloud1.assets/image-20220116105115222.png)



#### File Type过滤

![image-20220116105244904](/assets/imgs/SpringCloud1.assets/image-20220116105244904.png)



### 父工程 POM



#### 添加 packing

```xml
<packaging>pom</packaging>
```



#### 删除 src 目录

![image-20220116110045969](/assets/imgs/SpringCloud1.assets/image-20220116110045969.png)



#### 修改 pom.xml 文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.yixihan.springcloud</groupId>
    <artifactId>springcloud-learn</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>pom</packaging>

    <!-- 统一管理 jar 包版本 -->
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <junit.version>4.12</junit.version>
        <log4j.version>2.14.1</log4j.version>
        <lombok.version>1.18.22</lombok.version>
        <mysql.version>8.0.27</mysql.version>
        <druid.version>1.2.8</druid.version>
        <mybatis.spring.boot.version>2.2.0</mybatis.spring.boot.version>
    </properties>

    <!-- 子模块继承之后，提供作用：锁定版本 + 子 module 不用写 groupId 和version  -->
    <dependencyManagement>
        <dependencies>
            <!--spring boot 2.3.12.RELEASE -->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>2.3.12.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <!--spring cloud Hoxton.SR12 -->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>Hoxton.SR12</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>

            <!-- spring cloud alibaba 2.2.7.RELEASE -->
            <dependency>
                <groupId>com.alibaba.cloud</groupId>
                <artifactId>spring-cloud-alibaba-dependencies</artifactId>
                <version>2.2.7.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>

            <!-- mysql connector -->
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>${mysql.version}</version>
            </dependency>

            <!-- druid -->
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid</artifactId>
                <version>${druid.version}</version>
            </dependency>

            <!-- springboot start-->
            <dependency>
                <groupId>org.mybatis.spring.boot</groupId>
                <artifactId>mybatis-spring-boot-starter</artifactId>
                <version>${mybatis.spring.boot.version}</version>
            </dependency>

            <!-- 单元测试 -->
            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>${junit.version}</version>
            </dependency>

            <!-- log4j -->
            <dependency>
                <groupId>org.apache.logging.log4j</groupId>
                <artifactId>log4j</artifactId>
                <version>${log4j.version}</version>
            </dependency>

            <!-- lombok -->
            <dependency>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
                <optional>true</optional>
            </dependency>
        </dependencies>
    </dependencyManagement>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <fork>true</fork>
                    <addResources>true</addResources>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```



### DependencyManagement 和 Dependencies

>   dependencyManagement 

Maven 使用 dependencyManagement  元素来提供了一种管理依赖版本号的方式。

**通常会在一个组织或者项目的最顶层的父 POM 中看到 dependencyManagement 元素。** 

使用 pom.xml 中的 dependencyManagement 元素能让所有在子项目中引用一个依赖而不用显式的列出版本号。Maven 会沿着父子层次向上走，直到找到一个拥有dependencyManagement 元素的项目，然后它就会使用这个 dependencyManagement 元素中指定的版本号。 

![image-20220116140743537](/assets/imgs/SpringCloud1.assets/image-20220116140743537.png)

![image-20220116140758439](/assets/imgs/SpringCloud1.assets/image-20220116140758439.png)

这样做的好处就是：如果有多个子项目都引用同一样依赖，则可以避免在每个使用的子项目里都声明一个版本号，这样当想升级或切换到另一个版本时，只需要在顶层父容器里更新，而不需要一个一个子项目的修改 ；另外如果某个子项目需要另外的一个版本，只需要声明 version 就可。

-   **dependencyManagement 里只是声明依赖，==并不实现引入==，因此子项目需要显示的声明需要用的依赖。**

-   **如果不在子项目中声明依赖，是不会从父项目中继承下来的；只有在子项目中写了该依赖项，并且没有指定具体版本，才会从父项目中继承该项，并且 version 和 scope 都读取自父 pom;** 

-   如果子项目中指定了版本号，那么会使用子项目中指定的jar版本。  



### maven中跳过单元测试

![image-20220116141212362](/assets/imgs/SpringCloud1.assets/image-20220116141212362.png)



## Rest微服务工程构建

>   图解

![image-20220116141502917](/assets/imgs/SpringCloud1.assets/image-20220116141502917.png)





### 微服务模块构建 - payment 模块



>   微服务模块构建步骤

1.   建 module
2.   改 POM
3.   写 Yaml
4.   主启动
5.   业务类



#### 建 module

module 名 : cloud-provider-payment8001

![image-20220116142311218](/assets/imgs/SpringCloud1.assets/image-20220116142311218.png)

![image-20220116142443571](/assets/imgs/SpringCloud1.assets/image-20220116142443571.png)



#### 改 POM

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>springcloud-learn</artifactId>
        <groupId>com.yixihan.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>

    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-provider-payment8001</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.2.8</version>
        </dependency>

        <!--mysql-connector-java-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>

        <!--jdbc-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```



#### 写 yaml

```yaml
server:
  port: 8001
spring:
  application:
    name: cloud-provider-service
  datasource:
    # 当前数据源操作类型
    type: com.alibaba.druid.pool.DruidDataSource
    # mysql 驱动包
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://175.24.229.41:1617/springcloud?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: W6YnvKnLzpSFNGuc.

mybatis:
  mapper-locations: classpath:mapper/*.xml
  # 所有 pojo 别名类所在包
  type-aliases-package: com.yixihan.springcloud.pojo


```



#### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author : yixihan
 * @create : 2022-01-16-15:07
 */
@SpringBootApplication
public class PaymentMain8001 {

    public static void main(String[] args) {
        SpringApplication.run (PaymentMain8001.class, args);
    }
}

```



![image-20220116150922986](/assets/imgs/SpringCloud1.assets/image-20220116150922986.png)



#### 业务类

>   图解

![image-20220116151346921](/assets/imgs/SpringCloud1.assets/image-20220116151346921.png)

##### 建表 sql

```sql
CREATE DATABASE IF NOT EXISTS `springcloud`;

CREATE TABLE IF NOT EXISTS `payment`
(
    `id`     bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `serial` varchar(200) DEFAULT '',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8
```



##### pojo

Payment

```java
package com.yixihan.springcloud.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author : yixihan
 * @create : 2022-01-16-15:18
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 流水号
     */
    private String serial;

}

```



```java
package com.yixihan.springcloud.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Json 封装体
 * @author : yixihan
 * @create : 2022-01-16-15:19
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommonResult<T> {

    private Integer code;

    private String message;

    private T data;

    public CommonResult(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}

```





##### mapper

PaymentMapper.java

```java
package com.yixihan.springcloud.mapper;

import com.yixihan.springcloud.pojo.Payment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * @author : yixihan
 * @create : 2022-01-16-15:23
 */
@Mapper
public interface PaymentMapper {

    /**
     * 创建一个订单对象
     * @param payment 订单对象
     * @return 订单对象
     */
    Integer create (Payment payment);


    /**
     * 根据 id 获取订单对象
     * @param id 订单 id
     * @return 订单对象
     */
    Payment getPaymentById (@Param ("id") Long id);
}

```



PaymentMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?><!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.yixihan.springcloud.mapper.PaymentMapper">

    <!--useGeneratedKeys : 是否返回值-->
    <!--keyProperty : 主键-->
    <insert id="create" parameterType="Payment" useGeneratedKeys="true" keyProperty="id">
        insert into springcloud.payment (serial)
        VALUES (#{serial});
    </insert>


    <resultMap id="BaseResultMap" type="Payment">
        <id property="id" column="id" jdbcType="BIGINT"/>
        <result property="serial" column="serial" jdbcType="VARCHAR"/>
    </resultMap>

    <select id="getPaymentById" parameterType="Long" resultMap="BaseResultMap">
        select *
        from springcloud.payment
        where id = #{id};
    </select>
</mapper>
```



##### service

PaymentService

```java
package com.yixihan.springcloud.service;

import com.yixihan.springcloud.pojo.Payment;
import org.apache.ibatis.annotations.Param;

/**
 * @author : yixihan
 * @create : 2022-01-16-15:37
 */
public interface PaymentService {

    /**
     * 创建一个订单对象
     * @param payment 订单对象
     * @return 订单对象
     */
    Integer create (Payment payment);


    /**
     * 根据 id 获取订单对象
     * @param id 订单 id
     * @return 订单对象
     */
    Payment getPaymentById (@Param("id") Long id);


}

```



PaymentServiceImpl

```java
package com.yixihan.springcloud.service;

import com.yixihan.springcloud.mapper.PaymentMapper;
import com.yixihan.springcloud.pojo.Payment;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-16-15:36
 */
@Service
public class PaymentServiceImpl implements PaymentService{

    @Resource
    private PaymentMapper paymentMapper;


    @Override
    public Integer create(Payment payment) {
        return paymentMapper.create (payment);
    }

    @Override
    public Payment getPaymentById(Long id) {
        return paymentMapper.getPaymentById (id);
    }
}

```



##### controller

```java
package com.yixihan.springcloud.controller;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import com.yixihan.springcloud.service.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-16-15:40
 */
@Slf4j
@RestController
public class PaymentController {

    @Resource
    private PaymentService paymentService;

    /**
     * 小坑 : 要加 @RequestBody 这个注解
     */
    @PostMapping("/payment/create")
    public CommonResult<Integer> create(@RequestBody Payment payment) {

        Integer result = paymentService.create (payment);

        log.info ("****插入结果 : {}", result);

        return result > 0 ?
                new CommonResult<> (200, "插入成功", result) :
                new CommonResult<> (444, "插入失败", null);
    }

    @GetMapping("/payment/get/{id}")
    public CommonResult<Payment> getPaymentById(@PathVariable("id") Long id) {

        Payment result = paymentService.getPaymentById (id);

        log.info ("****查询结果 : {}", result);

        return result != null ?
                new CommonResult<> (200, "查询成功", result) :
                new CommonResult<> (444, "没有对应记录, 查询 ID : " + id, null);
    }


}

```



#### 测试

预先插入一条记录

```sql
insert into springcloud.payment (serial) values ('张三');
```

![image-20220116155443843](/assets/imgs/SpringCloud1.assets/image-20220116155443843.png)



>   测试查询接口

[测试查询接口](http://localhost:8001/payment/get/1)

http://localhost:8001/payment/get/id

![image-20220116160642599](/assets/imgs/SpringCloud1.assets/image-20220116160642599.png)



[测试创建接口](http://localhost:8001/payment/create?serial=李四)

http://localhost:8001/payment/create

![image-20220116160401065](/assets/imgs/SpringCloud1.assets/image-20220116160401065.png)

![image-20220116160659639](/assets/imgs/SpringCloud1.assets/image-20220116160659639.png)



#### 总结

就五步

-   建 module
-   改 POM
-   写 YAML
-   主启动
-   业务类



### 热部署 Devtools

**只允许在开发阶段使用**



#### Adding devtools to your project

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```



#### Adding plugin to your pom.xml

```xml
<build>
    <finalName>springcloud-learn</finalName>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <version>2.3.12.RELEASE</version>
            <configuration>
                <fork>true</fork>
                <addResources>true</addResources>
            </configuration>
        </plugin>
    </plugins>
</build>
```



#### Enabling automatic build

![image-20220116161729967](/assets/imgs/SpringCloud1.assets/image-20220116161729967.png)



#### Update the value of

![image-20220116161922877](/assets/imgs/SpringCloud1.assets/image-20220116161922877.png)

![image-20220116162001534](/assets/imgs/SpringCloud1.assets/image-20220116162001534.png)



#### 重启IDEA

即可



### 微服务模块构建 - customer 模块

>   图解

![image-20220116163738577](/assets/imgs/SpringCloud1.assets/image-20220116163738577.png)



#### 建 module

module 名 : cloud-consumer-order80



#### 改 POM

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

    <artifactId>cloud-consumer-order80</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```



#### 写 YAML

```yaml
server:
  port: 80
```



#### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author : yixihan
 * @create : 2022-01-16-16:31
 */
@SpringBootApplication
public class MainApp80 {

    public static void main(String[] args) {
        SpringApplication.run (MainApp80.class, args);
    }
}

```



#### 业务类

##### pojo

同模块 module - cloud-provider-payment8001 

pojo 包里 Payment 和 CommonResult



##### RestTemplate

>   RestTemplate 是什么

RestTemplate提供了多种便捷访问远程Http服务的方法， 是一种简单便捷的访问restful服务模板类，是Spring提供的用于访问Rest服务的客户端模板工具集   



[RestTemplate 官方 API 文档](https://docs.spring.io/spring-framework/docs/5.2.15.RELEASE/javadoc-api/org/springframework/web/client/RestTemplate.html)



>   使用

使用restTemplate访问restful接口非常的简单粗暴无脑。

(url, requestMap, ResponseBean.class)这三个参数分别代表 REST请求地址、请求参数、HTTP响应转换被转换成的对象类型。 



##### config配置类

```java
package com.yixihan.springcloud.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * @author : yixihan
 * @create : 2022-01-16-16:47
 */
@Configuration
public class ApplicationContextConfig {

    @Bean("getRestTemplate")
    public RestTemplate getRestTemplate () {
        return new RestTemplate ();
    }
}

```



##### controller

```java
package com.yixihan.springcloud.controller;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-16-16:36
 */
@RestController
@Slf4j
public class OrderController {

    public static final String PAYMENT_URL = "http://localhost:8001";

    @Resource
    private RestTemplate restTemplate;

    @GetMapping("/consumer/payment/create")
    public CommonResult create (Payment payment) {
        return restTemplate.postForObject (PAYMENT_URL + "/payment/create", payment, CommonResult.class);
    }


    @GetMapping("/consumer/payment/get/{id}")
    public CommonResult getPayment (@PathVariable("id") Long id) {
        return restTemplate.getForObject (PAYMENT_URL + "/payment/get/" + id, CommonResult.class);
    }

}

```



#### 测试

注意 : 开启两个服务需要开启 Run DashBoard(service 服务)

idea 会弹出提示, 同意即可

也可以通过修改 idea 的 workspace.xml 的方式来快速打开 Run Dashboard 窗口

workspace.xml 在项目 ./idea 目录下添加如下内容

```xml
<component name="RunDashboard">
    <option name="configurationTypes">
        <set>
            <option value="SpringBootApplicationConfigurationType" />
        </set>
    </option>
</component>
```



![image-20220116175406722](/assets/imgs/SpringCloud1.assets/image-20220116175406722.png)

或者使用快捷键 alt + 8

[查询测试](http://localhost/consumer/payment/get/1)

![image-20220116165707822](/assets/imgs/SpringCloud1.assets/image-20220116165707822.png)

[插入测试](http://localhost/consumer/payment/create?serial=王麻子)

若插入的值为 null, 则在 payment 模块内 create 函数 payment参数上加 @RequestBody 注解

![image-20220116165747870](/assets/imgs/SpringCloud1.assets/image-20220116165747870.png)

![image-20220116174205571](/assets/imgs/SpringCloud1.assets/image-20220116174205571.png)



### 工程重构

>   问题

系统中有重复部分，重构 (pojo)



#### 微服务模块构建 - commons 模块



##### 建 module

module 名 : cloud-api-commons

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

    <artifactId>cloud-api-commons</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- hutu 工具包-->
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.1.0</version>
        </dependency>
    </dependencies>

</project>
```



##### pojo

同之前两个模块的 pojo 包



##### 打包

执行 maven 指令 clean, install, 打包成可执行的 jar 包

![image-20220116180952885](/assets/imgs/SpringCloud1.assets/image-20220116180952885.png)



#### 改造 Payment 模块 和 customer 模块

>    删除 pojo 类



>   修改 POM



新增如下内容 : 

```xml
<!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
<dependency>
    <groupId>com.yixihan.springcloud</groupId>
    <artifactId>cloud-api-commons</artifactId>
    <version>${project.version}</version>
</dependency>
```



## Eureka 服务注册



### Eureka 基础知识



#### 服务治理

Spring Cloud 封装了 Netflix 公司开发的 Eureka 模块来实现**服务治理**



在传统的rpc远程调用框架中，管理每个服务与服务之间依赖关系比较复杂，管理比较复杂，所以需要使用服务治理，管理服务于服务之间依赖关系，可以实现服务调用、负载均衡、容错等，实现服务发现与注册。



#### 服务注册

Eureka采用了CS的设计架构，Eureka Server 作为服务注册功能的服务器，它是服务注册中心。而系统中的其他微服务，使用 Eureka的客户端连接到 Eureka Server并维持心跳连接。这样系统的维护人员就可以通过 Eureka Server 来监控系统中各个微服务是否正常运行。

在服务注册与发现中，有一个注册中心。当服务器启动的时候，会把当前自己服务器的信息 比如 服务地址通讯地址等以别名方式注册到注册中心上。另一方（消费者|服务提供者），以该别名的方式去注册中心上获取到实际的服务通讯地址，然后再实现本地RPC调用RPC远程调用框架核心设计思想：在于注册中心，因为使用注册中心管理每个服务与服务之间的一个依赖关系(服务治理概念)。在任何rpc远程框架中，都会有一个注册中心(存放服务地址相关信息(接口地址))



>   Eureka系统架构

![image-20220117073320965](/assets/imgs/SpringCloud1.assets/image-20220117073320965.png)



>   Dubbo的架构

![image-20220117073332114](/assets/imgs/SpringCloud1.assets/image-20220117073332114.png)



#### Eureka两组件

>   Eureka Server

**Eureka Server 提供服务注册服务**

各个微服务节点通过配置启动后，会在EurekaServer中进行注册，这样EurekaServer中的服务注册表中将会存储所有可用服务节点的信息，服务节点的信息可以在界面中直观看到。



>   Eureka Client

**EurekaClient 通过注册中心进行访问**

是一个Java客户端，用于简化Eureka Server的交互，客户端同时也具备一个内置的、使用轮询(round-robin)负载算法的负载均衡器。在应用启动后，将会向Eureka Server发送心跳(默认周期为30秒)。如果Eureka Server在多个心跳周期内没有接收到某个节点的心跳，EurekaServer将会从服务注册表中把这个服务节点移除（默认90秒）



### 单机Eureka构建

>   图解

![image-20220117073745234](/assets/imgs/SpringCloud1.assets/image-20220117073745234.png)



#### 单机Eureka构建步骤

##### 建 module

module 名 : cloud-eureka-server7001



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

    <artifactId>cloud-eureka-server7001</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--eureka-server-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.yixihan.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
        <!--boot web actuator-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--一般通用配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>
    </dependencies>


</project>
```



##### 写 YAML

```yaml
server:
  port: 7001

eureka:
  instance:
    # eureka 服务端的实例名称
    hostname: localhost
  client:
    # false 表示不向注册中心注册自己
    register-with-eureka: false
    # false 表示自己端就是注册中心, 职责就是维护服务实例, 并不需要去检索服务
    fetch-registry: false
    service-url:
      # 设置与 Eureka Server 交互的地址查询服务和注册服务都需要依赖这个地址
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/

```



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * @author : yixihan
 * @create : 2022-01-17-7:47
 */
@SpringBootApplication
@EnableEurekaServer
public class EurekaMain7001 {

    public static void main(String[] args) {
        SpringApplication.run (EurekaMain7001.class, args);
    }
}

```



##### 测试

[Eureka 控制台](http://localhost:7001)

![image-20220117075257434](/assets/imgs/SpringCloud1.assets/image-20220117075257434.png)



#### payment8001 模块注册进 EurekaServer

##### 改 POM

新增内容

```xml
<!--eureka-client-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```



##### 写 YAML

```yaml
eureka:
  client:
    # 表示是否将自己注册进 EurekaServer 默认为 true
    register-with-eureka: true
    # 是否从 EurekaServer 抓取已有的注册信息，默认为 true. 单节点无所谓，集群必须设置为 true 才能配合 ribbon 使用负载均衡
    fetch-registry: true
    service-url:
      defaultZone: http://localhost:7001/eureka
```



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

/**
 * @author : yixihan
 * @create : 2022-01-16-15:07
 */
@SpringBootApplication
@EnableEurekaClient
public class PaymentMain8001 {

    public static void main(String[] args) {
        SpringApplication.run (PaymentMain8001.class, args);
    }
}

```



##### 测试

**ps : 先要启动EurekaServer**

[Eureka 控制台](http://localhost:7001)

![image-20220117080453916](/assets/imgs/SpringCloud1.assets/image-20220117080453916.png)



>   微服务注册名配置说明

![image-20220117080605519](/assets/imgs/SpringCloud1.assets/image-20220117080605519.png)



##### Eureka 自我保护机制 (后面会解决)

Eureka 控制台上面的红字警告即 Eureka 自我保护机制的一种体现



默认情况下，如果Eureka Server在一定时间内（默认90秒）没有接收到某个微服务实例的心跳，Eureka Server将会移除该实例。但是当网络分区故障发生时，微服务与Eureka Server之间无法正常通信，而微服务本身是正常运行的，此时不应该移除这个微服务，所以引入了自我保护机制。

自我保护模式正是一种针对网络异常波动的安全保护措施，使用自我保护模式能使Eureka集群更加的健壮、稳定的运行。

自我保护机制的工作机制是如果在15分钟内超过85%的客户端节点都没有正常的心跳，那么Eureka就认为客户端与注册中心出现了网络故障，Eureka Server自动进入自我保护机制



>   自我保护机制时会出现以下几种情况

1.   Eureka Server不再从注册列表中移除因为长时间没收到心跳而应该过期的服务
2.   Eureka Server仍然能够接受新服务的注册和查询请求，但是不会被同步到其它节点上，保证当前节点依然可用
3.   当网络稳定时，当前Eureka Server新的注册信息会被同步到其它节点中



>   解决建议

-   在生产上可以开自注册，部署两个server 

-   在本机器上测试的时候，可以把比值调低，比如0.49

-   把自我保护模式关闭

    ```yaml
    eureka:
    	server:
    		enableSelfPreservation: false
    ```

    

#### order80 模块注册进 EurekaServer

##### 改 POM

新增内容

```xml
<!--eureka-client-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```



##### 写 YAML

```yaml
spring:
  application:
    name: cloud-order-service

eureka:
  client:
    # 表示是否将自己注册进 EurekaServer 默认为 true
    register-with-eureka: true
    # 是否从 EurekaServer 抓取已有的注册信息，默认为 true. 单节点无所谓，集群必须设置为 true 才能配合 ribbon 使用负载均衡
    fetch-registry: true
    service-url:
      defaultZone: http://localhost:7001/eureka
```



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

/**
 * @author : yixihan
 * @create : 2022-01-16-16:31
 */
@SpringBootApplication
@EnableEurekaClient
public class MainApp80 {

    public static void main(String[] args) {
        SpringApplication.run (MainApp80.class, args);
    }
}

```



##### 测试

**ps : 先要启动EurekaServer**

[Eureka 控制台](http://localhost:7001)

[测试接口](http://localhost/consumer/payment/get/31)



>   控制台页面

![image-20220117081427042](/assets/imgs/SpringCloud1.assets/image-20220117081427042.png)



>   测试接口

![image-20220117081454831](/assets/imgs/SpringCloud1.assets/image-20220117081454831.png)



### 集群Eureka构建



#### Eureka集群原理说明

>   原理图

![image-20220117081827677](/assets/imgs/SpringCloud1.assets/image-20220117081827677.png)



>   微服务RPC远程服务调用最核心的是什么

高可用，试想你的注册中心只有一个only one， 它出故障了那就呵呵(￣▽￣)"了，会导致整个为服务环境不可用

解决办法：搭建Eureka注册中心集群 ，实现负载均衡+故障容错



>   图解

![image-20220117085813278](/assets/imgs/SpringCloud1.assets/image-20220117085813278.png)



EurekaServer集群环境构建步骤



#### EurekaServer集群环境构建步骤



##### 建 module

module 名 : cloud-eureka-server7002



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

    <artifactId>cloud-eureka-server7002</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--eureka-server-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.yixihan.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
        <!--boot web actuator-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--一般通用配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>
    </dependencies>

</project>
```



##### 修改映射配置

[文件目录](C:\Windows\System32\drivers\etc)



>   修改映射配置添加进hosts文件

```
# springcloud 学习
127.0.0.1 eureka7001.com
127.0.0.1 eureka7002.com
127.0.0.1 eureka7003.com
```



![image-20220117082706756](/assets/imgs/SpringCloud1.assets/image-20220117082706756.png)

##### 写 YAML

>   单机 eureka 配置

```yaml
server:
  port: 7001

eureka:
  instance:
    hostname: localhost #eureka服务端的实例名称
  client:
    #false表示不向注册中心注册自己。
    register-with-eureka: false
    #false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    fetch-registry: false
    service-url:
    #设置与Eureka Server交互的地址查询服务和注册服务都需要依赖这个地址。
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/ 
```



>   集群 eureka 配置

7001

```yaml
server:
  port: 7001

eureka:
  instance:
    # eureka 服务端的实例名称
    hostname: eureka7001.com
  client:
    # false 表示不向注册中心注册自己。
    register-with-eureka: false
    # false 表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    fetch-registry: false
    service-url:
      defaultZone: http://eureka7002.com:7002/eureka/

```



7002

```yaml
server:
  port: 7002

eureka:
  instance:
    # eureka 服务端的实例名称
    hostname: eureka7002.com
  client:
    # false 表示不向注册中心注册自己。
    register-with-eureka: false
    # false 表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    fetch-registry: false
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka/
```



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * @author : yixihan
 * @create : 2022-01-17-8:29
 */
@SpringBootApplication
@EnableEurekaServer
public class EurekaMain7002 {

    public static void main(String[] args) {
        SpringApplication.run (EurekaMain7002.class, args);
    }
}

```



##### 测试

[eureka 7001 控制台](http://eureka7001.com:7001/)

[eureka 7002 控制台](http://eureka7002.com:7002/)



>   控制台页面

![image-20220117084710150](/assets/imgs/SpringCloud1.assets/image-20220117084710150.png)

![image-20220117084652670](/assets/imgs/SpringCloud1.assets/image-20220117084652670.png)

出现图中所示, 即可证明 eureka 集群搭建成功



#### 将 payment8001 微服务发布到Eureka集群配置中

>   改 yaml - eureka

```yaml
server:
  port: 8001
spring:
  application:
    name: cloud-provider-service
  datasource:
    # 当前数据源操作类型
    type: com.alibaba.druid.pool.DruidDataSource
    # mysql 驱动包
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://175.24.229.41:1617/springcloud?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: W6YnvKnLzpSFNGuc.

mybatis:
  mapper-locations: classpath:mapper/*.xml
  # 所有 pojo 别名类所在包
  type-aliases-package: com.yixihan.springcloud.pojo

eureka:
  client:
    # 表示是否将自己注册进 EurekaServer 默认为 true
    register-with-eureka: true
    # 是否从 EurekaServer 抓取已有的注册信息，默认为 true. 单节点无所谓，集群必须设置为 true 才能配合 ribbon 使用负载均衡
    fetch-registry: true
    service-url:
      # 单机版
      # defaultZone: http://localhost:7001/eureka
      # 集群版
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka
```



#### 将 order80 微服务发布到Eureka集群配置中

>   改 yaml - eureka

```yaml
server:
  port: 80

spring:
  application:
    name: cloud-order-service

eureka:
  client:
    # 表示是否将自己注册进 EurekaServer 默认为 true
    register-with-eureka: true
    # 是否从 EurekaServer 抓取已有的注册信息，默认为 true. 单节点无所谓，集群必须设置为 true 才能配合 ribbon 使用负载均衡
    fetch-registry: true
    service-url:
      # 单机版
      # defaultZone: http://localhost:7001/eureka
      # 集群版
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka
```



#### 测试 eureka 集群

ps : 要先启动 eureka server, 再启动服务提供者 8001. 最后启动消费者 80

[eureka 7001 控制台](http://eureka7001.com:7001/)

[eureka 7002 控制台](http://eureka7002.com:7002/)

[测试接口](http://localhost/consumer/payment/get/1)



>   控制台页面

![image-20220117085504357](/assets/imgs/SpringCloud1.assets/image-20220117085504357.png)

![image-20220117085522326](/assets/imgs/SpringCloud1.assets/image-20220117085522326.png)



>   接口测试

![image-20220117085539832](/assets/imgs/SpringCloud1.assets/image-20220117085539832.png)



#### payment 8001 集群环境构建



##### 建 module

module 名 : cloud-provider-payment8002

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

    <artifactId>cloud-provider-payment8002</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--eureka-client-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.yixihan.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.2.8</version>
        </dependency>

        <!--mysql-connector-java-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>

        <!--jdbc-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
    </dependencies>
    
</project>
```



##### 写 YAML

```yaml
server:
  port: 8002

spring:
  application:
    name: cloud-payment-service
  datasource:
    # 当前数据源操作类型
    type: com.alibaba.druid.pool.DruidDataSource
    # mysql 驱动包
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://175.24.229.41:1617/springcloud?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: W6YnvKnLzpSFNGuc.

mybatis:
  mapper-locations: classpath:mapper/*.xml
  # 所有 pojo 别名类所在包
  type-aliases-package: com.yixihan.springcloud.pojo

eureka:
  client:
    # 表示是否将自己注册进 EurekaServer 默认为 true
    register-with-eureka: true
    # 是否从 EurekaServer 抓取已有的注册信息，默认为 true. 单节点无所谓，集群必须设置为 true 才能配合 ribbon 使用负载均衡
    fetch-registry: true
    service-url:
      # 单机版
      # defaultZone: http://localhost:7001/eureka
      # 集群版
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka
```



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

/**
 * @author : yixihan
 * @create : 2022-01-17-9:03
 */
@SpringBootApplication
@EnableEurekaClient
public class PaymentMain8002 {

    public static void main(String[] args) {
        SpringApplication.run (PaymentMain8002.class, args);
    }
}

```



##### 业务类

同 payment 8001



##### 修改 8001/8002 的 controller

```java
package com.yixihan.springcloud.controller;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import com.yixihan.springcloud.service.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-16-15:40
 */
@Slf4j
@RestController
public class PaymentController {

    @Resource
    private PaymentService paymentService;

    @Value("${server.port}")
    private String serverPort;

    /**
     * 小坑 : 要加 @RequestBody 这个注解
     */
    @PostMapping("/payment/create")
    public CommonResult<Integer> create(@RequestBody Payment payment) {

        Integer result = paymentService.create (payment);

        log.info ("****插入结果 : {}", result);

        return result > 0 ?
                new CommonResult<> (200, "插入成功, serverPort : " + serverPort, result) :
                new CommonResult<> (444, "插入失败, serverPort : " + serverPort, null);
    }

    @GetMapping("/payment/get/{id}")
    public CommonResult<Payment> getPaymentById(@PathVariable("id") Long id) {

        Payment result = paymentService.getPaymentById (id);

        log.info ("****查询结果 : {}", result);

        return result != null ?
                new CommonResult<> (200, "查询成功, serverPort : " + serverPort, result) :
                new CommonResult<> (444, "没有对应记录, 查询 ID : " + id + ", serverPort : " + serverPort, null);
    }


}

```



#### 负载均衡

>   图解

![image-20220117092342579](/assets/imgs/SpringCloud1.assets/image-20220117092342579.png)



##### 修改 order 80 代码

>   controller

```java
package com.yixihan.springcloud.controller;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-16-16:36
 */
@RestController
@Slf4j
public class OrderController {

//    public static final String PAYMENT_URL = "http://localhost:8001";
    /**
     * localhost:8001 -> 微服务名, 即 eureka 控制台上显示的名字 (CLOUD-PAYMENT-SERVICE)
     */
    public static final String PAYMENT_URL = "http://CLOUD-PAYMENT-SERVICE";

    @Resource
    private RestTemplate restTemplate;

    @GetMapping("/consumer/payment/create")
    public CommonResult<Payment> create (Payment payment) {
        return restTemplate.postForObject (PAYMENT_URL + "/payment/create", payment, CommonResult.class);
    }


    @GetMapping("/consumer/payment/get/{id}")
    public CommonResult<Payment> getPayment (@PathVariable("id") Long id) {
        return restTemplate.getForObject (PAYMENT_URL + "/payment/get/" + id, CommonResult.class);
    }

}

```



>   config

```java
package com.yixihan.springcloud.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * @author : yixihan
 * @create : 2022-01-16-16:47
 */
@Configuration
public class ApplicationContextConfig {

    /**
     * 使用 @LoadBalanced 注解赋予 RestTemplate 负载均衡的能力
     */
    @Bean("getRestTemplate")
    @LoadBalanced
    public RestTemplate getRestTemplate () {
        return new RestTemplate ();
    }
}

```



#### 测试 payment 集群

ps : 先启动 eureka server 7001/7002, 再启动服务提供者 8001/8002, 最后启动消费者 80

[eureka 7001 控制台](http://eureka7001.com:7001/)

[eureka 7002 控制台](http://eureka7002.com:7002/)

[测试接口](http://localhost/consumer/payment/get/1)



>   eureka 控制台

![image-20220117093232742](/assets/imgs/SpringCloud1.assets/image-20220117093232742.png)



>   接口测试

![image-20220117093258050](/assets/imgs/SpringCloud1.assets/image-20220117093258050.png)

![image-20220117093306016](/assets/imgs/SpringCloud1.assets/image-20220117093306016.png)



Ribbon和Eureka整合后Consumer可以直接调用服务而不用再关心地址和端口号，且该服务还有负载功能了。O(∩_∩)O





### actuator微服务信息完善



#### 主机名称:服务名称修改

>   当前问题

![image-20220117093616157](/assets/imgs/SpringCloud1.assets/image-20220117093616157.png)



##### 修改 YAML 文件

```yaml
eureka:
  instance:
    # 主机名称 : 服务名称修改
    instance-id: order80
```



#### 访问信息有IP信息提示

>   当前问题

![image-20220117094333350](/assets/imgs/SpringCloud1.assets/image-20220117094333350.png)



##### 修改 YAML 文件

```yaml
eureka:
  instance:
	# 访问路径可以显示 IP 地址
    prefer-ip-address: true
```



#### 测试

![image-20220117094430958](/assets/imgs/SpringCloud1.assets/image-20220117094430958.png)



### 服务发现Discovery



对于注册进eureka里面的微服务，可以通过服务发现来获得该服务的信息



#### 修改 payment controller

```java
package com.yixihan.springcloud.controller;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import com.yixihan.springcloud.service.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author : yixihan
 * @create : 2022-01-16-15:40
 */
@Slf4j
@RestController
public class PaymentController {

    @Resource
    private PaymentService paymentService;

    @Value("${server.port}")
    private String serverPort;

    @Resource
    private DiscoveryClient discoveryClient;

    /**
     * 小坑 : 要加 @RequestBody 这个注解
     */
    @PostMapping("/payment/create")
    public CommonResult<Integer> create(@RequestBody Payment payment) {

        Integer result = paymentService.create (payment);

        log.info ("****插入结果 : {}", result);

        return result > 0 ?
                new CommonResult<> (200, "插入成功, serverPort : " + serverPort, result) :
                new CommonResult<> (444, "插入失败, serverPort : " + serverPort, null);
    }

    @GetMapping("/payment/get/{id}")
    public CommonResult<Payment> getPaymentById(@PathVariable("id") Long id) {

        Payment result = paymentService.getPaymentById (id);

        log.info ("****查询结果 : {}", result);

        return result != null ?
                new CommonResult<> (200, "查询成功, serverPort : " + serverPort, result) :
                new CommonResult<> (444, "没有对应记录, 查询 ID : " + id + ", serverPort : " + serverPort, null);
    }

    @GetMapping ("/payment/getService")
    public CommonResult<List<String>> getServices () {
        List<String> services = discoveryClient.getServices ();

        for (String element : services) {
            System.out.println(element);
        }

        return new CommonResult<> (200, "获取 services 信息成功", services);
    }

    @GetMapping ("/payment/getInstances")
    public CommonResult<List<ServiceInstance>> getInstances () {
        List<ServiceInstance> instances = discoveryClient.getInstances ("CLOUD-PAYMENT-SERVICE");

        for (ServiceInstance element : instances) {
            System.out.println(element.getServiceId() + "\t" + element.getHost() + "\t" + element.getPort() + "\t"
                    + element.getUri());
        }


        return new CommonResult<> (200, "获取 instances 信息成功", instances);
    }

    @GetMapping ("/payment/getDiscovery")
    public CommonResult<DiscoveryClient> getDiscovery () {

        List<String> services = discoveryClient.getServices ();

        for (String element : services) {
            System.out.println(element);
        }

        List<ServiceInstance> instances = discoveryClient.getInstances ("CLOUD-PAYMENT-SERVICE");

        for (ServiceInstance element : instances) {
            System.out.println(element.getServiceId() + "\t" + element.getHost() + "\t" + element.getPort() + "\t"
                    + element.getUri());
        }


        return new CommonResult<> (200, "获取 discovery 信息成功", discoveryClient);
    }
}

```



#### 修改 payment 主启动类

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

/**
 * 注解 @EnableDiscoveryClient => 开启服务发现
 * @author : yixihan
 * @create : 2022-01-17-9:03
 */
@SpringBootApplication
@EnableEurekaClient
@EnableDiscoveryClient
public class PaymentMain8002 {

    public static void main(String[] args) {
        SpringApplication.run (PaymentMain8002.class, args);
    }
}

```



#### 修改 order controller

```java
package com.yixihan.springcloud.controller;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author : yixihan
 * @create : 2022-01-16-16:36
 */
@RestController
@Slf4j
@RequestMapping("/consumer")
public class OrderController {

//    public static final String PAYMENT_URL = "http://localhost:8001";
    /**
     * localhost:8001 -> 微服务名, 即 eureka 控制台上显示的名字 (CLOUD-PAYMENT-SERVICE)
     */
    public static final String PAYMENT_URL = "http://CLOUD-PAYMENT-SERVICE";

    @Resource
    private RestTemplate restTemplate;

    @GetMapping("/payment/create")
    public CommonResult<Payment> create (Payment payment) {
        return restTemplate.postForObject (PAYMENT_URL + "/payment/create", payment, CommonResult.class);
    }


    @GetMapping("/payment/get/{id}")
    public CommonResult<Payment> getPayment (@PathVariable("id") Long id) {
        return restTemplate.getForObject (PAYMENT_URL + "/payment/get/" + id, CommonResult.class);
    }

    @GetMapping ("/payment/getService")
    public CommonResult<List<String>> getServices () {

        return restTemplate.getForObject (PAYMENT_URL + "/payment/getService", CommonResult.class);
    }

    @GetMapping ("/payment/getInstances")
    public CommonResult<List<ServiceInstance>> getInstances () {

        return restTemplate.getForObject (PAYMENT_URL + "/payment/getInstances", CommonResult.class);
    }

    @GetMapping ("/payment/getDiscovery")
    public CommonResult<DiscoveryClient> getDiscovery () {
        return restTemplate.getForObject (PAYMENT_URL + "/payment/getDiscovery", CommonResult.class);
    }

}

```



#### 测试

[测试url](http://localhost/consumer/payment/getDiscovery)

>   log 信息

![image-20220117101148808](/assets/imgs/SpringCloud1.assets/image-20220117101148808.png)



>   游览器信息

![image-20220117101129312](/assets/imgs/SpringCloud1.assets/image-20220117101129312.png)



### eureka 自我保护



#### 故障现象

保护模式主要用于一组客户端和Eureka Server之间存在网络分区场景下的保护。一旦进入保护模式，**Eureka Server将会尝试保护其服务注册表中的信息，不再删除服务注册表中的数据，也就是不会注销任何微服务。**

如果在Eureka Server的首页看到以下这段提示，则说明Eureka进入了保护模式：
EMERGENCY! EUREKA MAY BE INCORRECTLY CLAIMING INSTANCES ARE UP WHEN THEY'RE NOT. RENEWALS ARE LESSER THAN THRESHOLD AND HENCE THE INSTANCES ARE NOT BEING EXPIRED JUST TO BE SAFE 

![image-20220117101335227](/assets/imgs/SpringCloud1.assets/image-20220117101335227.png)



#### 导致原因

>   为什么会产生Eureka自我保护机制？

为了防止EurekaClient可以正常运行，但是 与 EurekaServer网络不通情况下，EurekaServer**不会立刻**将EurekaClient服务剔除



>   什么是自我保护模式？

默认情况下，如果EurekaServer在一定时间内没有接收到某个微服务实例的心跳，EurekaServer将会注销该实例（默认90秒）。但是当网络分区故障发生(延时、卡顿、拥挤)时，微服务与EurekaServer之间无法正常通信，以上行为可能变得非常危险了——因为微服务本身其实是健康的，**此时本不应该注销这个微服务**。Eureka通过“自我保护模式”来解决这个问题——当EurekaServer节点在短时间内丢失过多客户端时（可能发生了网络分区故障），那么这个节点就会进入自我保护模式。



![image-20220117101506418](/assets/imgs/SpringCloud1.assets/image-20220117101506418.png)

**在自我保护模式中，Eureka Server会保护服务注册表中的信息，不再注销任何服务实例。**

==一句话讲解：好死不如赖活着==

综上，自我保护模式是一种应对网络异常的安全保护措施。它的架构哲学是宁可同时保留所有微服务（健康的微服务和不健康的微服务都会保留）也不盲目注销任何健康的微服务。使用自我保护模式，可以让Eureka集群更加的健壮、稳定。



#### 禁止自我保护

出厂默认，自我保护机制是开启的



##### 注册中心 eureka server 端

```yaml
eureka:
  instance:
    # eureka 服务端的实例名称
    hostname: eureka7002.com
  client:
    # false 表示不向注册中心注册自己。
    register-with-eureka: false
    # false 表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    fetch-registry: false
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka/
  server:
    # 关闭自我保护机制，保证不可用服务被及时踢除
    enable-self-preservation: false
    # 最长等待时间
    eviction-interval-timer-in-ms: 2000
```





##### 生产者消费者客户 eureka client 端

```yaml
eureka:
  client:
    # 表示是否将自己注册进 EurekaServer 默认为 true
    register-with-eureka: true
    # 是否从 EurekaServer 抓取已有的注册信息，默认为 true. 单节点无所谓，集群必须设置为 true 才能配合 ribbon 使用负载均衡
    fetch-registry: true
    service-url:
      # 单机版
      # defaultZone: http://localhost:7001/eureka
      # 集群版
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka
  instance:
    # 主机名称 : 服务名称修改
    instance-id: payment8001
    # 访问路径可以显示 IP 地址
    prefer-ip-address: true
    # Eureka 客户端向服务端发送心跳的时间间隔，单位为秒(默认是30秒)
    lease-expiration-duration-in-seconds: 1
    # Eureka服务端在收到最后一次心跳后等待时间上限，单位为秒(默认是90秒)，超时将剔除服务
    lease-renewal-interval-in-seconds: 2
```



## Zookeeper 服务注册

>   Eureka停止更新了你怎么办

[官网说明](https://github.com/Netflix/eureka/wiki)





解决方法之一 : SpringCloud整合Zookeeper代替Eureka

>   图解

![image-20220117103602963](/assets/imgs/SpringCloud1.assets/image-20220117103602963.png)



### 注册中心 Zookeeper 简述

zookeeper是一个分布式协调工具，可以实现注册中心功能

关闭Linux服务器防火墙后启动zookeeper服务器

zookeeper服务器取代Eureka服务器，zk作为服务注册中心



### 服务提供者



#### 微服务模块构建



##### 建module

module 名 : cloud-provider-payment8004



##### 改POM

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

    <artifactId>cloud-provider-payment8004</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
		<!-- zookeeper -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
        </dependency>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.yixihan.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.2.8</version>
        </dependency>

        <!--mysql-connector-java-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>

        <!--jdbc-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
    </dependencies>

</project>
```



##### 写YAML

```yaml
server:
  port: 8004

# 需要写数据库配置, 不然会报错
spring:
  application:
    # 服务别名----注册 zookeeper 到注册中心名称
    name: cloud-provider-payment
  cloud:
    zookeeper:
      # zookeeper 主机 : 端口号
      connect-string: 175.24.229.41:2181
  datasource:
    # 当前数据源操作类型
    type: com.alibaba.druid.pool.DruidDataSource
    # mysql 驱动包
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://175.24.229.41:1617/springcloud?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: W6YnvKnLzpSFNGuc.

mybatis:
  mapper-locations: classpath:mapper/*.xml
  # 所有 pojo 别名类所在包
  type-aliases-package: com.yixihan.springcloud.pojo
```



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * @author : yixihan
 * @create : 2022-01-17-14:17
 */
@SpringBootApplication
@EnableDiscoveryClient
public class Payment8004 {

    public static void main(String[] args) {
        SpringApplication.run (Payment8004.class, args);
    }
}

```



##### 业务类

>   controller

```java
package com.yixihan.springcloud.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

/**
 * @author : yixihan
 * @create : 2022-01-17-14:18
 */
@RestController
@Slf4j
public class PaymentController {

    @Value("${server.port}")
    private String serverPort;

    @RequestMapping(value = "/payment/zk")
    public String paymentZk() {
        return "springcloud with zookeeper: "+serverPort+"\t"+ UUID.randomUUID().toString();
    }

}

```



#### 测试

>   启动后有有概率出现的问题

1.   未配置数据库连接

2.   服务器 Zookeeper 版本与导入的 Zookeeper 版本不一致
     解决方法 : 

     ```xml
     <!-- SpringBoot整合zookeeper客户端 -->
     <dependency>
         <groupId>org.springframework.cloud</groupId>
         <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
         <!--先排除自带的zookeeper3.5.3-->
         <exclusions>
             <exclusion>
                 <groupId>org.apache.zookeeper</groupId>
                 <artifactId>zookeeper</artifactId>
             </exclusion>
         </exclusions>
     </dependency>
     <!--添加zookeeper3.4.9版本 自己 Zookeeper 的版本-->
     <dependency>
         <groupId>org.apache.zookeeper</groupId>
         <artifactId>zookeeper</artifactId>
         <version>3.4.9</version>
     </dependency>
     
     ```



>   测试接口

[测试url](http://localhost:8004/payment/zk)

![image-20220117180628492](/assets/imgs/SpringCloud1.assets/image-20220117180628492.png)



>   查看 Zookeeper 信息

![image-20220117181547422](/assets/imgs/SpringCloud1.assets/image-20220117181547422.png)







>   查看 json 字符串

![image-20220117181533952](/assets/imgs/SpringCloud1.assets/image-20220117181533952.png)

[json 字符串格式化网站](https://tool.lu/json/)

![image-20220117181633392](/assets/imgs/SpringCloud1.assets/image-20220117181633392.png)



##### 总结

服务节点是临时节点

![image-20220117180700687](/assets/imgs/SpringCloud1.assets/image-20220117180700687.png)



### 服务消费者



#### 建 module

module 名 : cloud-consumerzk-order80


#### 改 POM

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

    <artifactId>cloud-consumerzk-order80</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!-- zookeeper -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.yixihan.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```



#### 写 YAML

```yaml
server:
  port: 80

spring:
  application:
    # 服务别名----注册 zookeeper 到注册中心名称
    name: cloud-comsumer-order
  cloud:
    zookeeper:
      # zookeeper 主机 : 端口号
      connect-string: 175.24.229.41:2181

```



#### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * @author : yixihan
 * @create : 2022-01-17-18:23
 */
@SpringBootApplication
@EnableDiscoveryClient
public class OrderZkMain80 {

    public static void main(String[] args) {
        SpringApplication.run (OrderZkMain80.class, args);
    }
}

```



#### 业务类

>   config

```java
package com.yixihan.springcloud.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * @author : yixihan
 * @create : 2022-01-17-18:23
 */
@Configuration
public class ApplicationContextConfig {

    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate () {
        return new RestTemplate ();
    }
}

```



>   controller

```java
package com.yixihan.springcloud.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-17-18:24
 */
@RestController
@RequestMapping("/consumer")
public class OrderZkController {

    public static final String INVOKE_URL = "http://cloud-provider-payment";

    @Resource
    private RestTemplate restTemplate;

    @GetMapping("/payment/zk")
    public String paymentInfo () {

        return restTemplate.getForObject (INVOKE_URL + "/payment/zk", String.class);
    }

}

```



#### 测试

>   测试接口

[测试url](http://localhost/consumer/payment/zk)

![image-20220117183448165](/assets/imgs/SpringCloud1.assets/image-20220117183448165.png)



>   Zookeeper 控制台

![image-20220117183518523](/assets/imgs/SpringCloud1.assets/image-20220117183518523.png)

