---
title: SpringCloud4
date: 2022-02-22
tags:
 - SpringCloud
 - SpringCloud Alibaba
 - Nacos
 - Sentinel
categories:
 - SpringCloud
---

# SpringCloud Allibaba



## 入门简介



### why 会出现 SpringCloud alibaba



#### Spring Cloud Netflix项目进入维护模式

[官网博客](https://spring.io/blog/2018/12/12/spring-cloud-greenwich-rc1-available-now)

![image-20220124094710732](/assets/imgs/SpringCloud4.assets/image-20220124094710732.png)



#### Spring Cloud Netflix Projects Entering Maintenance Mode



##### 什么是维护模式

![image-20220124094801231](/assets/imgs/SpringCloud4.assets/image-20220124094801231.png)

将模块置于维护模式，意味着 Spring Cloud 团队将不会再向模块添加新功能。

我们将修复 block 级别的 bug 以及安全问题，我们也会考虑并审查社区的小型 pull request。



##### 进入维护模式意味着什么呢？

>   Spring Cloud Netflix 将不再开发新的组件

我们都知道Spring Cloud 版本迭代算是比较快的，因而出现了很多重大ISSUE都还来不及Fix就又推另一个Release了。进入维护模式意思就是目前一直以后一段时间Spring Cloud Netflix提供的服务和功能就这么多了，不在开发新的组件和功能了。以后将以维护和Merge分支Full Request为主



>   新组件功能将以其他替代平代替的方式实现

![image-20220124094847669](/assets/imgs/SpringCloud4.assets/image-20220124094847669.png)



### SpringCloud alibaba带来了什么



#### 是什么

 [官网](https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md)



诞生：2018.10.31，Spring Cloud Alibaba 正式入驻了 Spring Cloud 官方孵化器，并在 Maven 中央库发布了第一个版本。

![image-20220124095017130](/assets/imgs/SpringCloud4.assets/image-20220124095017130.png)



#### 能干嘛

服务限流降级：默认支持 Servlet、Feign、RestTemplate、Dubbo 和 RocketMQ 限流降级功能的接入，可以在运行时通过控制台实时修改限流降级规则，还支持查看限流降级 Metrics 监控。

服务注册与发现：适配 Spring Cloud 服务注册与发现标准，默认集成了 Ribbon 的支持。

分布式配置管理：支持分布式系统中的外部化配置，配置更改时自动刷新。

消息驱动能力：基于 Spring Cloud Stream 为微服务应用构建消息驱动能力。

阿里云对象存储：阿里云提供的海量、安全、低成本、高可靠的云存储服务。支持在任何应用、任何时间、任何地点存储和访问任意类型的数据。

分布式任务调度：提供秒级、精准、高可靠、高可用的定时（基于 Cron 表达式）任务调度服务。同时提供分布式的任务执行模型，如网格任务。网格任务支持海量子任务均匀分配到所有 Worker（schedulerx-client）上执行。



#### 下载地址

[下载地址](https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md)



#### 怎么玩

![image-20220124095132211](/assets/imgs/SpringCloud4.assets/image-20220124095132211.png)



#### SpringCloud alibaba学习资料获取

>   官网

[官网](https://spring.io/projects/spring-cloud-alibaba#overview)



>   英文

[github 文档](https://github.com/alibaba/spring-cloud-alibaba)

[spring 官网文档](https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html)



>   中文

[中文文档](https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md)



## SpringCloud Alibaba Nacos服务注册和配置中心



### Nacos简介



#### Nacos 是什么

一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。

Nacos: Dynamic Naming and Configuration Service

**Nacos就是注册中心 + 配置中心的组合**

Nacos = Eureka+Config +Bus



#### 能干嘛

-   替代Eureka做服务注册中心
-   替代Config做服务配置中心



#### 去哪下

[github 官网](https://github.com/alibaba/Nacos)

[官网文档 - 中文](https://nacos.io/zh-cn/index.html)

[官方文档 - 英文](https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html#_spring_cloud_alibaba_nacos_discovery)



#### 各种注册中心比较

![image-20220124101943279](/assets/imgs/SpringCloud4.assets/image-20220124101943279.png)

据说 Nacos 在阿里巴巴内部有超过 10 万的实例运行，已经过了类似双十一等各种大型流量的考验



### 安装并运行Nacos

ps : 本地Java8+Maven环境已经OK



>   下载地址

[github](https://github.com/alibaba/nacos/releases)



>   解压运行

用 nodepad++ 打开 bin 目录下的 startup.cmd, 将 `MODE` 修改为 `standalone`

```cmd
set MODE="standalone"
```



![image-20220124104622105](/assets/imgs/SpringCloud4.assets/image-20220124104622105.png)



>   双击启动

命令运行成功后直接访问

[nacos 控制台](http://localhost:8848/nacos)

账号密码 都是 nacos

![image-20220124104825473](/assets/imgs/SpringCloud4.assets/image-20220124104825473.png)



### Nacos作为服务注册中心演示



#### 官网文档

[spring 文档](https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html#_spring_cloud_alibaba_nacos_config)



#### 基于Nacos的服务提供者



##### 建 module

module 名 : cloudalibaba-provider-payment9001



##### 改 POM

>   父 POM

```xml
<!-- spring cloud alibaba 2.2.7.RELEASE -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-dependencies</artifactId>
    <version>2.2.7.RELEASE</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```



>   模块 POM

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

    <artifactId>cloudalibaba-provider-payment9002</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>

        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
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



##### 写 YAML

```yaml
server:
  port: 9001

spring:
  application:
    name: nacos-payment-provider
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #配置Nacos地址

management:
  endpoints:
    web:
      exposure:
        include: '*'
```



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * @author : yixihan
 * @create : 2022-01-24-11:21
 */
@SpringBootApplication
@EnableDiscoveryClient
public class PaymentMain9001 {

    public static void main(String[] args) {
        SpringApplication.run (PaymentMain9001.class, args);
    }
}

```



##### 业务类

```java
package com.yixihan.springcloud.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : yixihan
 * @create : 2022-01-24-11:22
 */
@RestController
public class PaymentController {

    @Value ("${server.port}")
    private String serverPort;

    @GetMapping(value = "/payment/nacos/{id}")
    public String getPayment(@PathVariable("id") Integer id)
    {
        return "nacos registry, serverPort: "+ serverPort+"\t id"+id;
    }
}

```



##### 测试

[测试接口](http://localhost:9001/payment/nacos/1)

[nacos 控制台](http://localhost:8848/nacos)



>   nacos 控制台

![image-20220124114502039](/assets/imgs/SpringCloud4.assets/image-20220124114502039.png)



>   接口

![image-20220124114512159](/assets/imgs/SpringCloud4.assets/image-20220124114512159.png)



##### 参照 9001 构建 9002

新建cloudalibaba-provider-payment9002

其余省略



或者取巧不想新建重复体力劳动，直接拷贝虚拟端口映射

![image-20220124114641403](/assets/imgs/SpringCloud4.assets/image-20220124114641403.png)

![image-20220124114728253](/assets/imgs/SpringCloud4.assets/image-20220124114728253.png)

![image-20220124114744229](/assets/imgs/SpringCloud4.assets/image-20220124114744229.png)



#### 基于Nacos的服务消费者



##### 建 module

module 名 : cloudalibaba-consumer-nacos-order83



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

    <artifactId>cloudalibaba-consumer-nacos-order83</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.yixihan.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
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



>   为什么nacos支持负载均衡

![image-20220124130438121](/assets/imgs/SpringCloud4.assets/image-20220124130438121.png)



##### 写 YAML

```yaml
server:
  port: 83


spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848


#消费者将要去访问的微服务名称(注册成功进nacos的微服务提供者)
service-url:
  nacos-user-service: http://nacos-payment-provider


```



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * @author : yixihan
 * @create : 2022-01-24-12:47
 */
@SpringBootApplication
@EnableDiscoveryClient
public class OrderNacosMain83 {

    public static void main(String[] args) {
        SpringApplication.run (OrderNacosMain83.class, args);
    }
}

```



##### 业务类

>   config

```java
package com.yixihan.springcloud.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * @author : yixihan
 * @create : 2022-01-24-12:47
 */
@Configuration
public class ApplicationContextBean {

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

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-24-12:48
 */
@RestController
@Slf4j
public class OrderNacosController {

    @Resource
    private RestTemplate restTemplate;

    @Value("${service-url.nacos-user-service}")
    private String serverURL;

    @GetMapping("/consumer/payment/nacos/{id}")
    public String paymentInfo(@PathVariable("id") Long id) {
        return restTemplate.getForObject(serverURL+"/payment/nacos/"+id,String.class);
    }

}

```



##### 测试

[测试接口](http://localhost:83/consumer/payment/nacos/3)

[nacos 控制台](http://localhost:8848/nacos/)



>   nacos 控制台

![image-20220124125548892](/assets/imgs/SpringCloud4.assets/image-20220124125548892.png)



>   测试接口

![image-20220124125621363](/assets/imgs/SpringCloud4.assets/image-20220124125621363.png)

![image-20220124125638143](/assets/imgs/SpringCloud4.assets/image-20220124125638143.png)

![image-20220124125632008](/assets/imgs/SpringCloud4.assets/image-20220124125632008.png)



#### 服务注册中心对比



##### nacos 全景图

![image-20220124125708212](/assets/imgs/SpringCloud4.assets/image-20220124125708212.png)



##### nacos 和 CAP

![image-20220124125756140](/assets/imgs/SpringCloud4.assets/image-20220124125756140.png)

![image-20220124125807346](/assets/imgs/SpringCloud4.assets/image-20220124125807346.png)



##### Nacos 切换

**Nacos 支持AP和CP模式的切换**

**C是所有节点在同一时间看到的数据是一致的；而A的定义是所有的请求都会收到响应。**



>   何时选择使用何种模式？

一般来说，如果不需要存储服务级别的信息且服务实例是通过nacos-client注册，并能够保持心跳上报，那么就可以选择AP模式。当前主流的服务如 Spring cloud 和 Dubbo 服务，都适用于AP模式，AP模式为了服务的可能性而减弱了一致性，因此AP模式下只支持注册临时实例。

如果需要在服务级别编辑或者存储配置信息，那么 CP 是必须，K8S服务和DNS服务则适用于CP模式。

CP模式下则支持注册持久化实例，此时则是以 Raft 协议为集群运行模式，该模式下注册实例之前必须先注册服务，如果服务不存在，则会返回错误。



>   切换命令

```cmd
curl -X PUT '$NACOS_SERVER:8848/nacos/v1/ns/operator/switches?entry=serverMode&value=CP'
```



### Nacos作为服务配置中心演示



#### Nacos作为配置中心-基础配置



##### 建 module

module 名 : cloudalibaba-config-nacos-client3377



##### 改 POM

```xml
```



##### 写 YAML

>   bootstrap

```yaml
# nacos配置
server:
  port: 3377

spring:
  application:
    name: nacos-config-client
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #Nacos服务注册中心地址
      config:
        server-addr: localhost:8848 #Nacos作为配置中心地址
        file-extension: yaml #指定yaml格式的配置


  # ${spring.application.name}-${spring.profile.active}.${spring.cloud.nacos.config.file-extension}
  # nacos-config-client-dev.yaml
```



>   application

```yaml
spring:
  profiles:
    active: dev # 表示开发环境

```



>   why配置两个

Nacos同springcloud-config一样，在项目初始化时，要保证先从配置中心进行配置拉取，拉取配置之后，才能保证项目的正常启动。

springboot中配置文件的加载是存在优先级顺序的，bootstrap优先级高于application



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * @author : yixihan
 * @create : 2022-01-24-13:06
 */
@SpringBootApplication
@EnableDiscoveryClient
public class NacosConfigClientMain3377 {

    public static void main(String[] args) {
        SpringApplication.run (NacosConfigClientMain3377.class, args);
    }
}

```



##### 业务类

```java
package com.yixihan.springcloud.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : yixihan
 * @create : 2022-01-24-13:07
 */
@RestController
@Slf4j
@RefreshScope //在控制器类加入@RefreshScope注解使当前类下的配置支持Nacos的动态刷新功能。
public class ConfigClientController {

    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/config/info")
    public String getConfigInfo() {
        return configInfo;
    }

}

```



>   @RefreshScope

![image-20220124132207521](/assets/imgs/SpringCloud4.assets/image-20220124132207521.png)



##### 在Nacos中添加配置信息

>   Nacos中的匹配规则

[官网信息](https://nacos.io/zh-cn/docs/quick-start-spring-cloud.html)

![image-20220124131021536](/assets/imgs/SpringCloud4.assets/image-20220124131021536.png)



>   最后公式：

```
${spring.application.name}-${spring.profiles.active}.${spring.cloud.nacos.config.file-extension}

spring.application.name 为微服务名, 默认为prefix
spring.profile.active 即为当前环境对应的 profile，可以通过配置项 spring.profile.active 来配置。
file-exetension 为配置内容的数据格式，可以通过配置项 spring.cloud.nacos.config.file-extension 来配置
```



>   小总结

![image-20220124132343881](/assets/imgs/SpringCloud4.assets/image-20220124132343881.png)



>   实操

新增配置

![新增配置](/assets/imgs/SpringCloud4.assets/image-20220124132543544.png)

Data ID 为最后推出来的文件名

![image-20220124132642355](/assets/imgs/SpringCloud4.assets/image-20220124132642355.png)



>   历史配置

Nacos会记录配置文件的历史版本默认保留30天，此外还有一键回滚功能，回滚操作将会触发配置更新



回滚

![image-20220124132813457](/assets/imgs/SpringCloud4.assets/image-20220124132813457.png)



##### 测试

ps : nacos 自带动态刷新

[测试接口](http://localhost:3377/config/info)

[nacos 控制台](http://localhost:8848/nacos/)



![image-20220124132026731](/assets/imgs/SpringCloud4.assets/image-20220124132026731.png)

![image-20220124131510379](/assets/imgs/SpringCloud4.assets/image-20220124131510379.png)







![image-20220124132052483](/assets/imgs/SpringCloud4.assets/image-20220124132052483.png)

![image-20220124131757215](/assets/imgs/SpringCloud4.assets/image-20220124131757215.png)







#### Nacos作为配置中心-分类配置



##### 问题 - 多环境多项目管理

>   问题1：

实际开发中，通常一个系统会准备

dev开发环境

test测试环境

prod生产环境。

如何保证指定环境启动时服务能正确读取到Nacos上相应环境的配置文件呢？



>   问题 2 :

一个大型分布式微服务系统会有很多微服务子项目，每个微服务项目又都会有相应的开发环境、测试环境、预发环境、正式环境......

那怎么对这些微服务配置进行管理呢？



##### Nacos的图形化管理界面

>   配置管理

![image-20220124133156122](/assets/imgs/SpringCloud4.assets/image-20220124133156122.png)



>   命名空间

![image-20220124133221255](/assets/imgs/SpringCloud4.assets/image-20220124133221255.png)



##### Namespace+Group+Data ID三者关系？为什么这么设计？

>   是什么

类似Java里面的package名和类名

最外层的namespace是可以用于区分部署环境的，Group和DataID逻辑上区分两个目标对象。



>   三者情况

![image-20220124133255088](/assets/imgs/SpringCloud4.assets/image-20220124133255088.png)



>   默认情况

Namespace=public，Group=DEFAULT_GROUP, 默认Cluster是DEFAULT



Nacos默认的命名空间是public，Namespace主要用来实现隔离。

比方说我们现在有三个环境：开发、测试、生产环境，我们就可以创建三个Namespace，不同的Namespace之间是隔离的。

Group默认是DEFAULT_GROUP，Group可以把不同的微服务划分到同一个分组里面去

Service就是微服务；一个Service可以包含多个Cluster（集群），Nacos默认Cluster是DEFAULT，Cluster是对指定微服务的一个虚拟划分。

比方说为了容灾，将Service微服务分别部署在了杭州机房和广州机房，这时就可以给杭州机房的Service微服务起一个集群名称（HZ），给广州机房的Service微服务起一个集群名称（GZ），还可以尽量让同一个机房的微服务互相调用，以提升性能。

最后是Instance，就是微服务的实例。



##### DataID方案

指定spring.profile.active和配置文件的DataID来使不同环境下读取不同的配置

默认空间+默认分组+新建dev和test两个DataID



>   新建dev配置DataID

![image-20220124134354110](/assets/imgs/SpringCloud4.assets/image-20220124134354110.png)



>   新建test配置DataID

![image-20220124134413908](/assets/imgs/SpringCloud4.assets/image-20220124134413908.png)



>   通过spring.profile.active属性就能进行多环境下配置文件的读取

![image-20220124134434850](/assets/imgs/SpringCloud4.assets/image-20220124134434850.png)



>   测试

[测试 url](http://localhost:3377/config/info)

active = test

![image-20220124133822926](/assets/imgs/SpringCloud4.assets/image-20220124133822926.png)



active = dev

![image-20220124133859277](/assets/imgs/SpringCloud4.assets/image-20220124133859277.png)



##### Group方案

通过Group实现环境区分



>   新建 Group

![image-20220124135205278](/assets/imgs/SpringCloud4.assets/image-20220124135205278.png)



>   配置如图

![image-20220124135127155](/assets/imgs/SpringCloud4.assets/image-20220124135127155.png)



>   bootstrap+application

application

![image-20220124135228714](/assets/imgs/SpringCloud4.assets/image-20220124135228714.png)



bootstrap

![image-20220124135242877](/assets/imgs/SpringCloud4.assets/image-20220124135242877.png)



>   测试

[测试 url](http://localhost:3377/config/info)

group = TEST_GROUP

![image-20220124135005473](/assets/imgs/SpringCloud4.assets/image-20220124135005473.png)

![image-20220124135019859](/assets/imgs/SpringCloud4.assets/image-20220124135019859.png)



group = DEV_GROUP

![image-20220124135041036](/assets/imgs/SpringCloud4.assets/image-20220124135041036.png)

![image-20220124135054352](/assets/imgs/SpringCloud4.assets/image-20220124135054352.png)



##### Namespace方案

>   新建dev/test的Namespace

![image-20220124140458880](/assets/imgs/SpringCloud4.assets/image-20220124140458880.png)



>   回到服务管理-服务列表查看

![image-20220124140546529](/assets/imgs/SpringCloud4.assets/image-20220124140546529.png)

![image-20220124140621834](/assets/imgs/SpringCloud4.assets/image-20220124140621834.png)



>   按照域名配置填写

![image-20220124140650917](/assets/imgs/SpringCloud4.assets/image-20220124140650917.png)



>   bootstarp 和 application

bootstrap

```yaml
# nacos配置
server:
  port: 3377

spring:
  application:
    name: nacos-config-client
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #Nacos服务注册中心地址
      config:
        server-addr: localhost:8848 #Nacos作为配置中心地址
        file-extension: yaml #指定yaml格式的配置
        group: DEV_GROUP
        namespace: f1201f94-dace-4d11-987b-41d53d01e2d6

  # ${spring.application.name}-${spring.profile.active}.${spring.cloud.nacos.config.file-extension}
  # nacos-config-client-dev.yaml
```



application

```yaml
spring:
  profiles:
#    active: test # 表示测试环境
    active: dev # 表示开发环境
#    active: info # 表示开发环境

```



>   测试

![image-20220124140304590](/assets/imgs/SpringCloud4.assets/image-20220124140304590.png)



### Nacos集群和持久化配置（重要）



#### 官网说明

[官网](https://nacos.io/zh-cn/docs/cluster-mode-quick-start.html)



>   官网架构图

![image-20220124140833332](/assets/imgs/SpringCloud4.assets/image-20220124140833332.png)



>   真实情况

![image-20220124140843811](/assets/imgs/SpringCloud4.assets/image-20220124140843811.png)



##### 说明

默认Nacos使用嵌入式数据库实现数据的存储。所以，如果启动多个默认配置下的Nacos节点，数据存储是存在一致性问题的。

为了解决这个问题，Nacos采用了**集中式存储的方式来支持集群化部署，目前只支持MySQL的存储。**

![image-20220124140927780](/assets/imgs/SpringCloud4.assets/image-20220124140927780.png)

![image-20220124140952896](/assets/imgs/SpringCloud4.assets/image-20220124140952896.png)

按照上述，我们需要mysql数据库



>   官网说明

[官网说明](https://nacos.io/zh-cn/docs/deployment.html)



#### Nacos持久化配置解释



##### Nacos默认自带的是嵌入式数据库derby

[github 源码](https://github.com/alibaba/nacos/blob/develop/config/pom.xml)



##### derby到mysql切换配置步骤

>   在 `nacos\conf` 目录下找到sql脚本

![image-20220124142342297](/assets/imgs/SpringCloud4.assets/image-20220124142342297.png)





>   在nacos\conf目录下找到application.properties

![image-20220124142413918](/assets/imgs/SpringCloud4.assets/image-20220124142413918.png)



最后添加内容

```properties
spring.datasource.platform=mysql
 
db.num=1
db.url.0=jdbc:mysql://localhost:3306/nacos_config?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&serverTimezone=UTC
db.user=root
db.password=123456

```



>   重新启动并访问 nacos

[nacos 控制台](http://localhost:8848/nacos)



>   新建配置文件

![image-20220124144036413](/assets/imgs/SpringCloud4.assets/image-20220124144036413.png)



>   mysql 数据库查看

![image-20220124143924641](/assets/imgs/SpringCloud4.assets/image-20220124143924641.png)



#### Linux版Nacos+MySQL生产环境配置

预计需要，1个Nginx+3个nacos注册中心+1个mysql



##### Nacos下载Linux版

![image-20220124144127195](/assets/imgs/SpringCloud4.assets/image-20220124144127195.png)



[下载地址](https://github.com/alibaba/nacos/releases)

下载后解压安装至 `/opt/nacos/nacos1`



#### 集群配置步骤(重点)

##### Linux服务器上mysql数据库配置

使用 Navicat 连接云服务器 mysql, 建立 `nacos_config` 数据库

![image-20220125103545537](/assets/imgs/SpringCloud4.assets/image-20220125103545537.png)

使用 `/opt/nacos/nacos1/conf` 目录下的 nacos-mysql.sql 文件建表

![image-20220125103824732](/assets/imgs/SpringCloud4.assets/image-20220125103824732.png)

![image-20220125103718179](/assets/imgs/SpringCloud4.assets/image-20220125103718179.png)



##### application.properties 配置

在 `/opt/nacos/nacos1/conf` 下操作

![image-20220125103838092](/assets/imgs/SpringCloud4.assets/image-20220125103838092.png)

application.properties 自带备份文件 application.properties.example, 不需要额外备份

```shell
cd /opt/nacos/nacos1/conf

# 编辑 application.properties
vim application.properties

# 修改内容如下
#*************** Config Module Related Configurations ***************#
### If use MySQL as datasource:
spring.datasource.platform=mysql

### Count of DB:
db.num=1

### Connect URL of DB:
db.url.0=jdbc:mysql://127.0.0.1:1617/nacos_config?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
db.user.0=username
db.password.0=password

```



![image-20220125103950999](/assets/imgs/SpringCloud4.assets/image-20220125103950999.png)



##### Linux服务器上nacos的集群配置cluster.conf

在 `/opt/nacos/nacos1/conf` 下操作

![image-20220125104155352](/assets/imgs/SpringCloud4.assets/image-20220125104155352.png)

```shell
cd /opt/nacos/nacos1/conf

# 备份cluster.conf 文件
cp cluster.conf.example cluster.conf

# 查看内网 IP
hostname -I

# 编辑 cluster.conf
vim cluster.conf

# 添加内容如下
# 内网IP : 端口号
10.0.4.12:3333
10.0.4.12:4444
10.0.4.12:5555

```



![image-20220125104255030](/assets/imgs/SpringCloud4.assets/image-20220125104255030.png)

![image-20220125104313447](/assets/imgs/SpringCloud4.assets/image-20220125104313447.png)



##### 编辑Nacos的启动脚本startup.sh，使它能够接受不同的启动端口

在 `/opt/nacos/nacos1/bin` 下操作

![image-20220125104538905](/assets/imgs/SpringCloud4.assets/image-20220125104538905.png)



```shell
cd /opt/nacos/nacos1/bin

# 备份 startup.sh
cp startup.sh startup.sh.example

# 修改内容之一, 增加端口选择 -y
while getopts ":m:f:s:c:p:y:" opt
do
    case $opt in
        m)
            MODE=$OPTARG;;
        f)
            FUNCTION_MODE=$OPTARG;;
        s)
            SERVER=$OPTARG;;
        c)
            MEMBER_LIST=$OPTARG;;
        p)
            EMBEDDED_STORAGE=$OPTARG;;
        y)
            PORT=$OPTARG;;
        ?)
        echo "Unknown parameter"
        exit 1;;
    esac
done

# 修改内容之二 修改jvm 可选
# 修改 内存大小, 根据自己机器性能选择性修改

# 修改内容之三
# start
echo "$JAVA $JAVA_OPT_EXT_FIX ${JAVA_OPT}" > ${BASE_DIR}/logs/start.out 2>&1 &

if [[ "$JAVA_OPT_EXT_FIX" == "" ]]; then
  nohup "$JAVA" -Dserver.port=${PORT} ${JAVA_OPT} nacos.nacos >> ${BASE_DIR}/logs/start.out 2>&1 &
else
  nohup "$JAVA" -Dserver.port=${PORT} "$JAVA_OPT_EXT_FIX" ${JAVA_OPT} nacos.nacos >> ${BASE_DIR}/logs/start.out 2>&1 &
fi

echo "nacos is starting，you can check the ${BASE_DIR}/logs/start.out"

```



修改内容之一

![image-20220125105152707](/assets/imgs/SpringCloud4.assets/image-20220125105152707.png)



修改内容之二

![image-20220125105250920](/assets/imgs/SpringCloud4.assets/image-20220125105250920.png)



修改内容之三

![image-20220125104902679](/assets/imgs/SpringCloud4.assets/image-20220125104902679.png)



###### 全部配置

```sh
#!/bin/bash

# Copyright 1999-2018 Alibaba Group Holding Ltd.
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

cygwin=false
darwin=false
os400=false
case "`uname`" in
CYGWIN*) cygwin=true;;
Darwin*) darwin=true;;
OS400*) os400=true;;
esac
error_exit ()
{
    echo "ERROR: $1 !!"
    exit 1
}
[ ! -e "$JAVA_HOME/bin/java" ] && JAVA_HOME=$HOME/jdk/java
[ ! -e "$JAVA_HOME/bin/java" ] && JAVA_HOME=/usr/java
[ ! -e "$JAVA_HOME/bin/java" ] && JAVA_HOME=/opt/taobao/java
[ ! -e "$JAVA_HOME/bin/java" ] && unset JAVA_HOME

if [ -z "$JAVA_HOME" ]; then
  if $darwin; then

    if [ -x '/usr/libexec/java_home' ] ; then
      export JAVA_HOME=`/usr/libexec/java_home`

    elif [ -d "/System/Library/Frameworks/JavaVM.framework/Versions/CurrentJDK/Home" ]; then
      export JAVA_HOME="/System/Library/Frameworks/JavaVM.framework/Versions/CurrentJDK/Home"
    fi
  else
    JAVA_PATH=`dirname $(readlink -f $(which javac))`
    if [ "x$JAVA_PATH" != "x" ]; then
      export JAVA_HOME=`dirname $JAVA_PATH 2>/dev/null`
    fi
  fi
  if [ -z "$JAVA_HOME" ]; then
        error_exit "Please set the JAVA_HOME variable in your environment, We need java(x64)! jdk8 or later is better!"
  fi
fi

export SERVER="nacos-server"
export MODE="cluster"
export FUNCTION_MODE="all"
export MEMBER_LIST=""
export EMBEDDED_STORAGE=""
while getopts ":m:f:s:c:p:y:" opt
do
    case $opt in
        m)
            MODE=$OPTARG;;
        f)
            FUNCTION_MODE=$OPTARG;;
        s)
            SERVER=$OPTARG;;
        c)
            MEMBER_LIST=$OPTARG;;
        p)
            EMBEDDED_STORAGE=$OPTARG;;
	y)
	    PORT=$OPTARG;;
        ?)
        echo "Unknown parameter"
        exit 1;;
    esac
done

export JAVA_HOME
export JAVA="$JAVA_HOME/bin/java"
export BASE_DIR=`cd $(dirname $0)/..; pwd`
export CUSTOM_SEARCH_LOCATIONS=file:${BASE_DIR}/conf/

#===========================================================================================
# JVM Configuration
#===========================================================================================
if [[ "${MODE}" == "standalone" ]]; then
    JAVA_OPT="${JAVA_OPT} -Xms512m -Xmx512m -Xmn256m"
    JAVA_OPT="${JAVA_OPT} -Dnacos.standalone=true"
else
    if [[ "${EMBEDDED_STORAGE}" == "embedded" ]]; then
        JAVA_OPT="${JAVA_OPT} -DembeddedStorage=true"
    fi
    JAVA_OPT="${JAVA_OPT} -server -Xms512m -Xmx512m -Xmn512m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m"
    JAVA_OPT="${JAVA_OPT} -XX:-OmitStackTraceInFastThrow -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=${BASE_DIR}/logs/java_heapdump.hprof"
    JAVA_OPT="${JAVA_OPT} -XX:-UseLargePages"

fi

if [[ "${FUNCTION_MODE}" == "config" ]]; then
    JAVA_OPT="${JAVA_OPT} -Dnacos.functionMode=config"
elif [[ "${FUNCTION_MODE}" == "naming" ]]; then
    JAVA_OPT="${JAVA_OPT} -Dnacos.functionMode=naming"
fi

JAVA_OPT="${JAVA_OPT} -Dnacos.member.list=${MEMBER_LIST}"

JAVA_MAJOR_VERSION=$($JAVA -version 2>&1 | sed -E -n 's/.* version "([0-9]*).*$/\1/p')
if [[ "$JAVA_MAJOR_VERSION" -ge "9" ]] ; then
  JAVA_OPT="${JAVA_OPT} -Xlog:gc*:file=${BASE_DIR}/logs/nacos_gc.log:time,tags:filecount=10,filesize=102400"
else
  JAVA_OPT_EXT_FIX="-Djava.ext.dirs=${JAVA_HOME}/jre/lib/ext:${JAVA_HOME}/lib/ext"
  JAVA_OPT="${JAVA_OPT} -Xloggc:${BASE_DIR}/logs/nacos_gc.log -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=100M"
fi

JAVA_OPT="${JAVA_OPT} -Dloader.path=${BASE_DIR}/plugins/health,${BASE_DIR}/plugins/cmdb,${BASE_DIR}/plugins/selector"
JAVA_OPT="${JAVA_OPT} -Dnacos.home=${BASE_DIR}"
JAVA_OPT="${JAVA_OPT} -jar ${BASE_DIR}/target/${SERVER}.jar"
JAVA_OPT="${JAVA_OPT} ${JAVA_OPT_EXT}"
JAVA_OPT="${JAVA_OPT} --spring.config.additional-location=${CUSTOM_SEARCH_LOCATIONS}"
JAVA_OPT="${JAVA_OPT} --logging.config=${BASE_DIR}/conf/nacos-logback.xml"
JAVA_OPT="${JAVA_OPT} --server.max-http-header-size=524288"

if [ ! -d "${BASE_DIR}/logs" ]; then
  mkdir ${BASE_DIR}/logs
fi

echo "$JAVA $JAVA_OPT_EXT_FIX ${JAVA_OPT}"

if [[ "${MODE}" == "standalone" ]]; then
    echo "nacos is starting with standalone"
else
    echo "nacos is starting with cluster"
fi

# check the start.out log output file
if [ ! -f "${BASE_DIR}/logs/start.out" ]; then
  touch "${BASE_DIR}/logs/start.out"
fi
# start
echo "$JAVA $JAVA_OPT_EXT_FIX ${JAVA_OPT}" > ${BASE_DIR}/logs/start.out 2>&1 &

if [[ "$JAVA_OPT_EXT_FIX" == "" ]]; then
  nohup "$JAVA" -Dserver.port=${PORT} ${JAVA_OPT} nacos.nacos >> ${BASE_DIR}/logs/start.out 2>&1 &
else
  nohup "$JAVA" -Dserver.port=${PORT} "$JAVA_OPT_EXT_FIX" ${JAVA_OPT} nacos.nacos >> ${BASE_DIR}/logs/start.out 2>&1 &
fi

echo "nacos is starting，you can check the ${BASE_DIR}/logs/start.out"

```



##### 复制三份 nacos 文件

```shell
cd /opt/nacos
cp -r nacos1 nacos2
cp -r nacos2 nacos3
```



##### Nginx的配置，由它作为负载均衡器



>   查看 nginx 是否有 stream 模块

```shell
cd /usr/local/nginx/sbin
./nginx -V
```



![image-20220125110020060](/assets/imgs/SpringCloud4.assets/image-20220125110020060.png)

若没有 stream 模块则需要安装

###### nginx 需要安装 stream 模块

>   备份原来的 nginx 目录

```shell
cd /usr/local/
cp -r nginx/ nginx-noStream/
```



![image-20220125105933450](/assets/imgs/SpringCloud4.assets/image-20220125105933450.png)



转到 nginx 安装目录 `/opt/nginx-1.20.1/`

```shell
cd /opt/nginx-1.20.1/

# 下载 stream 模块
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-stream

# 安装
make && make install

# 查看是否安装完成
cd /usr/local/nginx/sbin
./nginx -V
```



![image-20220125110020060](/assets/imgs/SpringCloud4.assets/image-20220125110020060.png)



###### 修改nginx的配置文件

在 `/usr/local/nginx/conf` 目录下操作

```shell
cd /usr/local/nginx/conf

vim nginx.conf

# http 均衡负载 写在 http 模块最后面
upstream nacos-server {
        server 10.0.4.12:3333;
        server 10.0.4.12:4444;
        server 10.0.4.12:5555;
}
server {
	listen 8848;
	location / {
	proxy_pass http://nacos-server/;
}

# tcp 转发 写在 http 模块外面
stream {
    upstream NACOS_ADDR_9848 {
        server 10.0.4.12:4333;
        server 10.0.4.12:5444;
        server 10.0.4.12:6555;
    }

    server {
        listen 9848 so_keepalive=on;
        proxy_connect_timeout 3s;
        proxy_pass NACOS_ADDR_9848;
        tcp_nodelay on;
        proxy_buffer_size 32k;
    }
}

```



![image-20220125110523478](/assets/imgs/SpringCloud4.assets/image-20220125110523478.png)



###### 完整配置

```shell

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    #upstream NACOS {
    #    server 127.0.0.1:3333 max_fails=3 fail_timeout=5s;
    #    server 127.0.0.1:4444 max_fails=3 fail_timeout=5s;
    #    server 127.0.0.1:5555 max_fails=3 fail_timeout=5s;
    #}

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
            #proxy_pass http://NACOS;
	    #proxy_connect_timeout 75;
            #proxy_read_timeout 400;
            #proxy_send_timeout 400;
            #client_max_body_size 100m;
            #proxy_set_header Host $host;
            #proxy_set_header X-Real-IP $remote_addr;
            #proxy_set_header X-Forwarded-For $remote_addr;
     	}	

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    upstream nacos-server {
        server 10.0.4.12:3333;
        server 10.0.4.12:4444;
        server 10.0.4.12:5555;
    }
    server {
        listen 8848;
        location / {
            proxy_pass http://nacos-server/;
        }
    }
}

stream {
    upstream NACOS_ADDR_9848 {
	server 10.0.4.12:4333;
	server 10.0.4.12:5444;
	server 10.0.4.12:6555;
    }

    server {
	listen 9848 so_keepalive=on;
	proxy_connect_timeout 3s; 
	proxy_pass NACOS_ADDR_9848;
	tcp_nodelay on;
	proxy_buffer_size 32k;
    }
}


```



##### 启动 nacos 集群

```shell
# 启动 MySQL
systemctl start mysqld.service

# 启动 nacos
cd /opt/nacos

./nacos1/bin/startup.sh -y 3333
./nacos2/bin/startup.sh -y 4444
./nacos3/bin/startup.sh -y 5555

# 启动 nginx
cd /usr/local/nginx/sbin
./nginx
```



##### 测试

>   访问 nacos 控制台

[nacos 控制台](http://175.24.229.41:8848/nacos)

![image-20220125110855829](/assets/imgs/SpringCloud4.assets/image-20220125110855829.png)



>   新建一个配置测试

![image-20220125110929604](/assets/imgs/SpringCloud4.assets/image-20220125110929604.png)

![image-20220125111013074](/assets/imgs/SpringCloud4.assets/image-20220125111013074.png)



>   将微服务注册进 nacos 集群

yaml 配置 - 客户端

```yaml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 175.24.229.41:8848
```



yaml 配置 - 配置端

```yaml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 175.24.229.41:8848 #Nacos服务注册中心地址
      config:
        server-addr: 175.24.229.41:8848 #Nacos作为配置中心地址
        file-extension: yaml #指定yaml格式的配置
```



![image-20220125111148204](/assets/imgs/SpringCloud4.assets/image-20220125111148204.png)



#### 高可用小总结

![image-20220125111214063](/assets/imgs/SpringCloud4.assets/image-20220125111214063.png)





## SpringCloud Alibaba Sentinel实现熔断与限流



### Sentinel



#### 官网

[github 官网](https://github.com/alibaba/Sentinel)

[github 中文网站](https://github.com/alibaba/Sentinel/wiki/%E4%BB%8B%E7%BB%8D)



#### 是什么

![image-20220125135904674](/assets/imgs/SpringCloud4.assets/image-20220125135904674.png)

一句话解释，之前我们讲解过的 Hystrix



>   图解

![image-20220125140056469](/assets/imgs/SpringCloud4.assets/image-20220125140056469.png)

#### 下载地址

[下载地址](https://github.com/alibaba/Sentinel/releases)



#### 能干嘛

![image-20220125140113184](/assets/imgs/SpringCloud4.assets/image-20220125140113184.png)



#### 怎么玩

[教程](https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html#_spring_cloud_alibaba_sentinel)



>   服务使用中的各种问题

-   服务雪崩
-   服务降级
-   服务熔断
-   服务限流



### 安装Sentinel控制台



>   sentinel组件由2部分构成

![image-20220125140306685](/assets/imgs/SpringCloud4.assets/image-20220125140306685.png)

后台

前台8080



#### 安装步骤

>   下载

[下载地址](https://github.com/alibaba/Sentinel/releases)



>   运行命令

前提 :

-   java 8 环境
-   8080 端口不能被占用



```cmd
java -jar sentinel-dashboard-1.7.0.jar
```



>   访问sentinel管理界面

[sentinel 控制台](http://localhost:8080)



用户名和密码都是 : sentinel



### 初始化演示工程

>   前提准备

启动 nacos 集群 或本地 nacos

[nacos 集群](http://175.24.229.41:8848/nacos/)

[nacos 本地](http://localhost:8848/nacos)



启动 sentinel 

[sentinel 控制台](http://localhost:8080/)



#### 创建测试模块

##### 建 module

module 名 : cloudalibaba-sentinel-service8401



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

    <artifactId>cloudalibaba-sentinel-service8401</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!--SpringCloud ailibaba sentinel-datasource-nacos 后续做持久化用到-->
        <dependency>
            <groupId>com.alibaba.csp</groupId>
            <artifactId>sentinel-datasource-nacos</artifactId>
        </dependency>
        <!--SpringCloud ailibaba sentinel -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>
        <!--openfeign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <!-- SpringBoot整合Web组件+actuator -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>4.6.3</version>
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



##### 写 YAML

```yaml
server:
  port: 8401

spring:
  application:
    name: cloudalibaba-sentinel-service
  cloud:
    nacos:
      discovery:
        #Nacos服务注册中心地址
        server-addr: 175.24.229.41:8848
    sentinel:
      transport:
        #配置Sentinel dashboard地址
        dashboard: localhost:8080
        #默认8719端口，假如被占用会自动从8719开始依次+1扫描,直至找到未被占用的端口
        port: 8719

management:
  endpoints:
    web:
      exposure:
        include: '*'





```



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * @author : yixihan
 * @create : 2022-01-25-14:11
 */
@SpringBootApplication
@EnableDiscoveryClient
public class MainApp8401 {

    public static void main(String[] args) {
        SpringApplication.run (MainApp8401.class, args);
    }
}

```



##### 业务类

```java
package com.yixihan.springcloud.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : yixihan
 * @create : 2022-01-25-14:11
 */
@RestController
@Slf4j
public class FlowLimitController {

    @GetMapping("/testA")
    public String testA() {
        return "------testA";
    }

    @GetMapping("/testB")
    public String testB() {
        return "------testB";
    }
}

```



#### 测试

启动 8401 微服务



访问 sentinel 控制台

[sentinel 控制台](http://localhost:8080/)

![image-20220125141951184](/assets/imgs/SpringCloud4.assets/image-20220125141951184.png)

空空如也，啥都没有

原因 : Sentinel采用的懒加载说明, 只需要访问一次 8401 微服务的接口即可



[接口1](http://localhost:8401/testA)

[接口2](http://localhost:8401/testB)



访问之后再刷新即可看到 8401 微服务

![image-20220125142106999](/assets/imgs/SpringCloud4.assets/image-20220125142106999.png)



### 流控规则



#### 基本介绍

![image-20220125142237001](/assets/imgs/SpringCloud4.assets/image-20220125142237001.png)



>   进一步解释说明

![image-20220125142252119](/assets/imgs/SpringCloud4.assets/image-20220125142252119.png)



#### 流控模式



##### 直接(默认)

###### 是什么

直接->快速失败 为系统默认的流控方式



###### 配置及说明

表示1秒钟内查询1次就是OK，若超过次数1，就直接-快速失败，报默认错误

![image-20220125142418132](/assets/imgs/SpringCloud4.assets/image-20220125142418132.png)

![image-20220125142842290](/assets/imgs/SpringCloud4.assets/image-20220125142842290.png)



###### 测试

快速点击访问

[testA](http://localhost:8401/testA)

>   结果

![image-20220125142521424](/assets/imgs/SpringCloud4.assets/image-20220125142521424.png)



>   思考

直接调用默认报错信息，技术方面OK, but,是否应该有我们自己的后续处理?

类似有个fallback的兜底方法？



###### QPS 和 线程数 的区别

![image-20220125143812513](/assets/imgs/SpringCloud4.assets/image-20220125143812513.png)

QPS 类似于银行门

线程数类似于银行服务窗口

![image-20220125143550387](/assets/imgs/SpringCloud4.assets/image-20220125143550387.png)



##### 关联

###### 是什么

当关联的资源达到阈值时，就限流自己

当与A关联的资源B达到阀值后，就限流A自己

一句话总结 : B惹事，A挂了



###### 配置

![image-20220125150604291](/assets/imgs/SpringCloud4.assets/image-20220125150604291.png)



###### 测试

>   apiPost 模拟并发密集访问testB

http://localhost:8401/testB

![image-20220125150653580](/assets/imgs/SpringCloud4.assets/image-20220125150653580.png)



>   运行之后访问 testA

[testA](http://localhost:8401/testA)

![image-20220125144739812](/assets/imgs/SpringCloud4.assets/image-20220125144739812.png)

![image-20220125144735571](/assets/imgs/SpringCloud4.assets/image-20220125144735571.png)



##### 链路

###### 是什么

多个请求调用了同一个微服务



#### 流控效果

##### 直接->快速失败(默认的流控处理)

直接失败，抛出异常 Blocked by Sentinel (flow limiting)



###### 源码

com.alibaba.csp.sentinel.slots.block.flow.controller.DefaultController



##### 预热

###### 说明

公式：阈值除以coldFactor(默认值为3),经过预热时长后才会达到阈值



###### 官网

[官网](https://github.com/alibaba/Sentinel/wiki/%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6)

![image-20220125153103668](/assets/imgs/SpringCloud4.assets/image-20220125153103668.png)

默认coldFactor为3，即请求 QPS 从 threshold / 3 开始，经预热时长逐渐升至设定的 QPS 阈值。

 [限流 冷启动](https://github.com/alibaba/Sentinel/wiki/%E9%99%90%E6%B5%81---%E5%86%B7%E5%90%AF%E5%8A%A8)



###### 源码

com.alibaba.csp.sentinel.slots.block.flow.controller.WarmUpController

![image-20220125153126311](/assets/imgs/SpringCloud4.assets/image-20220125153126311.png)



###### WarmUp配置

默认 coldFactor 为 3，即请求QPS从(threshold / 3) 开始，经多少预热时长才逐渐升至设定的 QPS 阈值。

案例，阀值为10+预热时长设置5秒。
系统初始化的阀值为10 / 3 约等于3,即阀值刚开始为3；然后过了5秒后阀值才慢慢升高恢复到10

![image-20220125153251852](/assets/imgs/SpringCloud4.assets/image-20220125153251852.png)



###### 测试

多次点击 [testA](http://localhost:8401/testA)

刚开始不行，后续慢慢OK



###### 应用场景

如：秒杀系统在开启的瞬间，会有很多流量上来，很有可能把系统打死，预热方式就是把为了保护系统，可慢慢的把流量放进来，慢慢的把阀值增长到设置的阀值。



##### 排队等待

匀速排队，让请求以均匀的速度通过，阀值类型必须设成QPS，否则无效。

设置含义：/testA每秒1次请求，超过的话就排队等待，等待的超时时间为20000毫秒。



###### 官网

[官网](https://github.com/alibaba/Sentinel/wiki/%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6)



###### 源码

com.alibaba.csp.sentinel.slots.block.flow.controller.RateLimiterController



###### 测试

![image-20220125153635431](/assets/imgs/SpringCloud4.assets/image-20220125153635431.png)

![image-20220125153644964](/assets/imgs/SpringCloud4.assets/image-20220125153644964.png)



### 降级规则



#### 官网

[官网](https://github.com/alibaba/Sentinel/wiki/%E7%86%94%E6%96%AD%E9%99%8D%E7%BA%A7)



#### 基本介绍

![image-20220125153856069](/assets/imgs/SpringCloud4.assets/image-20220125153856069.png)

-   RT（平均响应时间，秒级）
    -   平均响应时间   **超出阈值**  且   **在时间窗口内通过的请求>=5**，两个条件同时满足后触发降级
    -   窗口期过后关闭断路器 
        RT最大4900（更大的需要通过-Dcsp.sentinel.statistic.max.rt=XXXX才能生效）

-   异常比列（秒级）
    -   QPS >= 5 且异常比例（秒级统计）超过阈值时，触发降级；时间窗口结束后，关闭降级

-   异常数（分钟级）
    -   异常数（分钟统计）超过阈值时，触发降级；时间窗口结束后，关闭降级



##### 进一步说明

Sentinel 熔断降级会在调用链路中某个资源出现不稳定状态时（例如调用超时或异常比例升高），对这个资源的调用进行限制，让请求快速失败，避免影响到其它的资源而导致级联错误。

当资源被降级后，在接下来的降级时间窗口之内，对该资源的调用都自动熔断（默认行为是抛出 DegradeException）。



##### Sentinel的断路器是没有半开状态的

半开的状态系统自动去检测是否请求有异常，

没有异常就关闭断路器恢复使用，

有异常则继续打开断路器不可用。

具体可以参考Hystrix



#### 降级策略实战



##### 慢调用比例



###### 是什么

![image-20220126093113514](/assets/imgs/SpringCloud4.assets/image-20220126093113514.png)

![image-20220126091513729](/assets/imgs/SpringCloud4.assets/image-20220126091513729.png)



###### 测试

>   代码

```java
@GetMapping("/testC")
public String testC() {
    //暂停几秒钟线程
    try { TimeUnit.SECONDS.sleep(1); } catch (InterruptedException e) { e.printStackTrace(); }
    log.info("testC 测试RT");
    return "------testC 测试RT";
}
```



>   配置

![image-20220126093636338](/assets/imgs/SpringCloud4.assets/image-20220126093636338.png)

>   Jmeter 压测

![image-20220126093608604](/assets/imgs/SpringCloud4.assets/image-20220126093608604.png)

>   结论

按照上述配置，永远一秒钟打进来10个线程（大于5个了）调用testD，我们希望200毫秒处理完本次任务，

如果超过200毫秒还没处理完，在未来1秒钟的时间窗口内，断路器打开(保险丝跳闸)微服务不可用，保险丝跳闸断电了

后续我停止jmeter，没有这么大的访问量了，断路器关闭(保险丝恢复)，微服务恢复OK



##### 异常比例



###### 是什么

![image-20220126091645065](/assets/imgs/SpringCloud4.assets/image-20220126091645065.png)

![image-20220126091652627](/assets/imgs/SpringCloud4.assets/image-20220126091652627.png)



###### 测试

>   代码

```java
@GetMapping("/testD")
public String testD() {
    log.info("testD 测试 异常比例");
    int age = 10/0;
    return "------testD 测试 异常比例";
}

```



>   配置

![image-20220126093901798](/assets/imgs/SpringCloud4.assets/image-20220126093901798.png)



>   Jmeter 压测

![image-20220126094436602](/assets/imgs/SpringCloud4.assets/image-20220126094436602.png)



>   结论

按照上述配置，单独访问一次，必然来一次报错一次(int age  = 10/0)，调一次错一次；

![image-20220126091907551](/assets/imgs/SpringCloud4.assets/image-20220126091907551.png)

开启jmeter后，直接高并发发送请求，多次调用达到我们的配置条件了。

断路器开启(保险丝跳闸)，微服务不可用了，不再报错error而是服务降级了。



##### 异常数



###### 是什么

![image-20220126091701373](/assets/imgs/SpringCloud4.assets/image-20220126091701373.png)

时间窗口一定要大于等于60秒。

![image-20220126091713417](/assets/imgs/SpringCloud4.assets/image-20220126091713417.png)



**异常数是按照分钟统计的**



###### 测试

>   代码

```java
@GetMapping("/testE")
public String testE() {
    log.info("testE 测试 异常数");
    int age = 10/0;
    return "------testE 测试 异常数";
}
```



>   配置

![image-20220126094555574](/assets/imgs/SpringCloud4.assets/image-20220126094555574.png)



>   结论

[testE](http://localhost:8401/testE)，第一次访问绝对报错，因为除数不能为零，我们看到error窗口，但是达到5次报错后，进入熔断后降级。



### 热点key限流



#### 基本介绍

![image-20220126094840818](/assets/imgs/SpringCloud4.assets/image-20220126094840818.png)

>   何为热点

热点即经常访问的数据，很多时候我们希望统计或者限制某个热点数据中访问频次最高的TopN数据，并对其访问进行限流或者其它操作



>   官网

[官网](https://github.com/alibaba/Sentinel/wiki/%E7%83%AD%E7%82%B9%E5%8F%82%E6%95%B0%E9%99%90%E6%B5%81)



>   承上启下复习start

兜底方法分为系统默认和客户自定义，两种

之前的case，限流出问题后，都是用sentinel系统默认的提示：Blocked by Sentinel (flow limiting)

我们能不能自定?类似hystrix，某个方法出问题了，就找对应的兜底降级方法？

结论 : 从 `@HystrixCommand` 到 `@SentinelResource`



#### 实战

##### controller

```java
@GetMapping("/testHotKey")
@SentinelResource(value = "testHotKey",blockHandler = "dealHandler_testHotKey")
public String testHotKey(
    @RequestParam(value = "p1",required = false) String p1,
    @RequestParam(value = "p2",required = false) String p2) {
    return "------testHotKey";
}


public String dealHandler_testHotKey(String p1, String p2, BlockException exception) {
    return "-----dealHandler_testHotKey";
}
```



##### 配置

![image-20220126095644374](/assets/imgs/SpringCloud4.assets/image-20220126095644374.png)



>   代码配置一

`@SentinelResource(value = "testHotKey")`

异常打到了前台用户界面看到，不友好



>   代码配置二

`@SentinelResource(value = "testHotKey",blockHandler = "dealHandler_testHotKey")`

方法testHotKey里面第一个参数只要QPS超过每秒1次，马上降级处理

兜底方法用了我们自己定义的, 比较友好



![image-20220126095504327](/assets/imgs/SpringCloud4.assets/image-20220126095504327.png)

限流模式只支持QPS模式，固定写死了。（这才叫热点）

@SentinelResource注解的方法参数索引，0代表第一个参数，1代表第二个参数，以此类推

单机阀值以及统计窗口时长表示在此窗口时间超过阀值就限流。

上面的抓图就是第一个参数有值的话，1秒的QPS为1，超过就限流，限流后调用dealHandler_testHotKey支持方法。



##### 测试

[error1](http://localhost:8401/testHotKey?p1=abc)

[error2](http://localhost:8401/testHotKey?p1=abc&p2=33)

[right](http://localhost:8401/testHotKey?p2=abc)

QPS 大于一时则触发热点 key 限流



#### 参数例外项

上述案例演示了第一个参数p1，当QPS超过1秒1次点击后马上被限流



##### 特例情况

>   普通

超过1秒钟一个后，达到阈值1后马上被限流

我们期望p1参数当它是某个特殊值时，它的限流值和平时不一样



>   特例

假如当p1的值等于5时，它的阈值可以达到200



##### 配置

![image-20220126100636873](/assets/imgs/SpringCloud4.assets/image-20220126100636873.png)

ps : 添加按钮不能忘



##### 测试

[p1 = 5](http://localhost:8401/testHotKey?p1=5)

[p1 != 5](http://localhost:8401/testHotKey?p1=3)

当p1等于5的时候，阈值变为200

当p1不等于5的时候，阈值就是平常的1



>   前提条件

**热点参数的注意点，参数必须是基本类型或者String**



##### 异常

>   @SentinelResource

处理的是Sentinel控制台配置的违规情况，有blockHandler方法配置的兜底处理；

>   RuntimeException

int age = 10/0,这个是java运行时报出的运行时异常RunTimeException，@SentinelResource不管



>   总结

 @SentinelResource主管配置出错，运行出错该走异常走异常



### 系统规则

#### 是什么

[官网](https://github.com/alibaba/Sentinel/wiki/%E7%B3%BB%E7%BB%9F%E8%87%AA%E9%80%82%E5%BA%94%E9%99%90%E6%B5%81)



#### 各项配置参数说明

![image-20220126100917979](/assets/imgs/SpringCloud4.assets/image-20220126100917979.png)

#### 配置全局QPS

![image-20220126102026363](/assets/imgs/SpringCloud4.assets/image-20220126102026363.png)



### @SentinelResource



#### 按资源名称限流+后续处理

>   启动 nacos

[nacos 控制台](http://175.24.229.41:8848/nacos/)



>   启动 sentinel

```cmd
java -jar sentinel-dashboard-1.7.0.jar
```

[sentinel 控制台](http://localhost:8080/)



##### Module

更改 module : cloudalibaba-sentinel-service8401



###### POM

```xml
<!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
<dependency>
    <groupId>com.yixihan.springcloud</groupId>
    <artifactId>cloud-api-commons</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```



###### YAML

```yaml
server:
  port: 8401

spring:
  application:
    name: cloudalibaba-sentinel-service
  cloud:
    nacos:
      discovery:
        #Nacos服务注册中心地址
        server-addr: 175.24.229.41:8848
    sentinel:
      transport:
        #配置Sentinel dashboard地址
        dashboard: localhost:8080
        #默认8719端口，假如被占用会自动从8719开始依次+1扫描,直至找到未被占用的端口
        port: 8719

management:
  endpoints:
    web:
      exposure:
        include: '*'

```



###### 业务类

```java
package com.yixihan.springcloud.controller;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : yixihan
 * @create : 2022-01-26-12:21
 */
@RestController
@Slf4j
public class RateLimitController {

    @GetMapping("/byResource")
    @SentinelResource(value = "byResource",blockHandler = "handleException")
    public CommonResult byResource() {
        return new CommonResult(200,"按资源名称限流测试OK",new Payment (2021L,"serial001"));
    }

    public CommonResult handleException(BlockException exception) {
        return new CommonResult(444,exception.getClass().getCanonicalName()+"\t 服务不可用");
    }
}

```



###### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * @author : yixihan
 * @create : 2022-01-25-14:11
 */
@SpringBootApplication
@EnableDiscoveryClient
public class MainApp8401 {

    public static void main(String[] args) {
        SpringApplication.run (MainApp8401.class, args);
    }
}

```



##### 配置流控规则

>   配置步骤

![image-20220126122458538](/assets/imgs/SpringCloud4.assets/image-20220126122458538.png)



>   图形配置和代码关系

![image-20220126122241184](/assets/imgs/SpringCloud4.assets/image-20220126122241184.png)



表示1秒钟内查询次数大于1，就跑到我们自定义的处流，限流



##### 测试

[测试接口](http://localhost:8401/byResource)

1秒钟点击1下，OK

超过上述，疯狂点击，返回了自己定义的限流处理信息，限流发生



##### 额外问题

此时关闭问服务8401看看, Sentinel控制台，流控规则消失了？？？？？

得出 => 这并不是持久的



#### 按照Url地址限流+后续处理

通过访问的URL来限流，会返回Sentinel自带默认的限流处理信息



##### Module

###### 业务类

```java
package com.yixihan.springcloud.controller;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : yixihan
 * @create : 2022-01-26-12:21
 */
@RestController
@Slf4j
public class RateLimitController {

    @GetMapping("/byResource")
    @SentinelResource(value = "byResource",blockHandler = "handleException")
    public CommonResult byResource() {
        return new CommonResult(200,"按资源名称限流测试OK",new Payment (2021L,"serial001"));
    }

    public CommonResult handleException(BlockException exception) {
        return new CommonResult(444,exception.getClass().getCanonicalName()+"\t 服务不可用");
    }

    @GetMapping("/rateLimit/byUrl")
    @SentinelResource(value = "byUrl")
    public CommonResult byUrl()
    {
        return new CommonResult(200,"按url限流测试OK",new Payment(2021L,"serial002"));
    }
}

```



##### 配置流控规则

![image-20220126122755768](/assets/imgs/SpringCloud4.assets/image-20220126122755768.png)



##### 测试

[测试接口](http://localhost:8401/rateLimit/byUrl)

1秒钟点击1下，OK

超过上述，疯狂点击，返回了默认的限流处理信息，限流发生



#### 上面兜底方案面临的问题

-   系统默认的，没有体现我们自己的业务要求。
-   依照现有条件，我们自定义的处理方法又和业务代码耦合在一块，不直观。
-   每个业务方法都添加一个兜底的，那代码膨胀加剧。
-   全局统一的处理方法没有体现。



#### 客户自定义限流处理逻辑



##### 自定义限流处理类



###### CustomerBlockHandler

```java
package com.yixihan.springcloud.handle;

import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.yixihan.springcloud.pojo.CommonResult;
import org.springframework.stereotype.Component;

/**
 * @author : yixihan
 * @create : 2022-01-26-12:35
 */
@Component
public class CustomerBlockHandler {

    public static CommonResult handleException1(BlockException exception) {
        return new CommonResult(2021,"自定义的限流处理信息......CustomerBlockHandler---1");
    }

    public static CommonResult handleException2(BlockException exception) {
        return new CommonResult(2021,"自定义的限流处理信息......CustomerBlockHandler---2");
    }
}

```



###### RateLimitController

```java
package com.yixihan.springcloud.controller;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.yixihan.springcloud.handle.CustomerBlockHandler;
import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : yixihan
 * @create : 2022-01-26-12:21
 */
@RestController
@Slf4j
public class RateLimitController {

    @GetMapping("/byResource")
    @SentinelResource(value = "byResource",blockHandler = "handleException")
    public CommonResult byResource() {
        return new CommonResult(200,"按资源名称限流测试OK",new Payment (2021L,"serial001"));
    }

    public CommonResult handleException(BlockException exception) {
        return new CommonResult(444,exception.getClass().getCanonicalName()+"\t 服务不可用");
    }

    @GetMapping("/rateLimit/byUrl")
    @SentinelResource(value = "byUrl")
    public CommonResult byUrl() {
        return new CommonResult(200,"按url限流测试OK",new Payment(2021L,"serial002"));
    }

    /**
     * 自定义通用的限流处理逻辑，
     *      blockHandlerClass = CustomerBlockHandler.class
     *      blockHandler = handleException2
     *      上述配置：找CustomerBlockHandler类里的handleException2方法进行兜底处理
     * 自定义通用的限流处理逻辑
     */
    @GetMapping("/rateLimit/customerBlockHandler")
    @SentinelResource(value = "customerBlockHandler",
            blockHandlerClass = CustomerBlockHandler.class, blockHandler = "handleException2")
    public CommonResult customerBlockHandler() {
        return new CommonResult(200,"按客户自定义限流处理逻辑", new Payment(2021L,"serial003"));
    }

}

```



##### sentinel 控制台配置

![image-20220126124001436](/assets/imgs/SpringCloud4.assets/image-20220126124001436.png)



##### 测试

[测试接口](http://localhost:8401/rateLimit/customerBlockHandler)



##### 进一步说明

![image-20220126123503633](/assets/imgs/SpringCloud4.assets/image-20220126123503633.png)



#### 更多注解属性说明

![image-20220126124628307](/assets/imgs/SpringCloud4.assets/image-20220126124628307.png)

![image-20220126124411172](/assets/imgs/SpringCloud4.assets/image-20220126124411172.png)

所有的代码都要用try-catch-finally方式进行处理



##### Sentinel主要有三个核心Api

-   SphU定义资源
-   Tracer定义统计
-   ContextUtil定义了上下文



### 服务熔断功能

sentinel整合ribbon+openFeign+fallback



#### Ribbon系列

启动nacos和sentinel



##### 提供者9003/9004

###### 建 module

module 名 : 

cloudalibaba-provider-payment9003

cloudalibaba-provider-payment9004



###### 改POM

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

    <artifactId>cloudalibaba-provider-payment9003</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.yixihan.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
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



###### 写YAML

```yaml
server:
  port: 9003

spring:
  application:
    name: nacos-payment-provider
  cloud:
    nacos:
      discovery:
        server-addr: 175.24.229.41:8848 #配置Nacos地址

management:
  endpoints:
    web:
      exposure:
        include: '*'
```



###### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * @author : yixihan
 * @create : 2022-01-26-12:55
 */
@SpringBootApplication
@EnableDiscoveryClient
public class PaymentMain9003 {

    public static void main(String[] args) {
        SpringApplication.run (PaymentMain9003.class, args);
    }
}

```



###### 业务类

```java
package com.yixihan.springcloud.controller;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

/**
 * @author : yixihan
 * @create : 2022-01-26-12:56
 */
@RestController
@Slf4j
public class PaymentController {

    @Value("${server.port}")
    private String serverPort;

    public static HashMap<Long, Payment> hashMap = new HashMap<> ();

    static {
        hashMap.put(1L,new Payment(1L,"28a8c1e3bc2742d8848569891fb42181"));
        hashMap.put(2L,new Payment(2L,"bba8c1e3bc2742d8848569891ac32182"));
        hashMap.put(3L,new Payment(3L,"6ua8c1e3bc2742d8848569891xt92183"));
    }


    @GetMapping(value = "/paymentSQL/{id}")
    public CommonResult<Payment> paymentSQL(@PathVariable("id") Long id) {
        Payment payment = hashMap.get(id);
        CommonResult<Payment> result = new CommonResult (200,"from mysql,serverPort:  "+serverPort,payment);
        return result;
    }
}

```



##### 消费者 84

###### 建 module

module 名 : cloudalibaba-consumer-nacos-order84



###### 改 POM

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

    <artifactId>cloudalibaba-consumer-nacos-order84</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!--SpringCloud ailibaba sentinel -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.yixihan.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
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



###### 写 YAML

```yaml
server:
  port: 84


spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: 175.24.229.41:8848
    sentinel:
      transport:
        #配置Sentinel dashboard地址
        dashboard: localhost:8080
        #默认8719端口，假如被占用会自动从8719开始依次+1扫描,直至找到未被占用的端口
        port: 8719


#消费者将要去访问的微服务名称(注册成功进nacos的微服务提供者)
service-url:
  nacos-user-service: http://nacos-payment-provider


```



###### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * @author : yixihan
 * @create : 2022-01-26-13:16
 */
@SpringBootApplication
@EnableDiscoveryClient
public class OrderNacosMain84 {

    public static void main(String[] args) {
        SpringApplication.run (OrderNacosMain84.class, args);
    }
}

```



###### 业务类

>   ApplicationContextConfig

```java
package com.yixihan.springcloud.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * @author : yixihan
 * @create : 2022-01-26-13:16
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



##### CircleBreakerController

>   修改后请重启微服务

热部署对java代码级生效及时, 对@SentinelResource注解内属性，有时效果不好



>   目的

fallback管运行异常

blockHandler管配置违规



>   测试地址

[测试接口](http://localhost:84/consumer/fallback/1)



###### 没有任何配置

>   controller

```java
package com.yixihan.springcloud.controller;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-26-13:17
 */
@RestController
@Slf4j
public class CircleBreakerController {

    public static final String SERVICE_URL = "http://nacos-payment-provider";

    @Resource
    private RestTemplate restTemplate;

    @RequestMapping("/consumer/fallback/{id}")
	@SentinelResource(value = "fallback") // 没有配置
    exceptionsToIgnore = {IllegalArgumentException.class})
    public CommonResult<Payment> fallback(@PathVariable Long id) {
        CommonResult<Payment> result = restTemplate.getForObject(SERVICE_URL + "/paymentSQL/"+id, CommonResult.class,id);

        if (id == 4) {
            throw new IllegalArgumentException ("IllegalArgumentException,非法参数异常....");
        }else if (result.getData() == null) {
            throw new NullPointerException ("NullPointerException,该ID没有对应记录,空指针异常");
        }

        return result;
    }
}

```



>   sentinel 控制台

无任何配置



>   测试

给客户error页面，不友好



###### 只配置fallback

>   controller

```java
package com.yixihan.springcloud.controller;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-26-13:17
 */
@RestController
@Slf4j
public class CircleBreakerController {

    public static final String SERVICE_URL = "http://nacos-payment-provider";

    @Resource
    private RestTemplate restTemplate;

    @RequestMapping("/consumer/fallback/{id}")
	@SentinelResource(value = "fallback", fallback = "handlerFallback") // fallback 只负责业务异常

    exceptionsToIgnore = {IllegalArgumentException.class})
    public CommonResult<Payment> fallback(@PathVariable Long id) {
        CommonResult<Payment> result = restTemplate.getForObject(SERVICE_URL + "/paymentSQL/"+id, CommonResult.class,id);

        if (id == 4) {
            throw new IllegalArgumentException ("IllegalArgumentException,非法参数异常....");
        }else if (result.getData() == null) {
            throw new NullPointerException ("NullPointerException,该ID没有对应记录,空指针异常");
        }

        return result;
    }

    /**
     * fallback
     */
    public CommonResult handlerFallback(@PathVariable  Long id,Throwable e) {
        Payment payment = new Payment(id,"null");
        return new CommonResult<>(444,"兜底异常handlerFallback,exception内容  "+e.getMessage(),payment);
    }
}

```



>   图说

![image-20220126135959348](/assets/imgs/SpringCloud4.assets/image-20220126135959348.png)



>   sentinel 控制台

无任何配置



>   测试

![image-20220126134534796](/assets/imgs/SpringCloud4.assets/image-20220126134534796.png)

![image-20220126134514248](/assets/imgs/SpringCloud4.assets/image-20220126134514248.png)

![image-20220126134523232](/assets/imgs/SpringCloud4.assets/image-20220126134523232.png)



###### 只配置blockHandler

>   controller

```java
package com.yixihan.springcloud.controller;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-26-13:17
 */
@RestController
@Slf4j
public class CircleBreakerController {

    public static final String SERVICE_URL = "http://nacos-payment-provider";

    @Resource
    private RestTemplate restTemplate;

    @RequestMapping("/consumer/fallback/{id}")
    @SentinelResource(value = "fallback", blockHandler = "blockHandler") // blockHandler 只负责 sentinel 控制台配置违规
    public CommonResult<Payment> fallback(@PathVariable Long id) {
        CommonResult<Payment> result = restTemplate.getForObject(SERVICE_URL + "/paymentSQL/"+id, CommonResult.class,id);

        if (id == 4) {
            throw new IllegalArgumentException ("IllegalArgumentException,非法参数异常....");
        }else if (result.getData() == null) {
            throw new NullPointerException ("NullPointerException,该ID没有对应记录,空指针异常");
        }

        return result;
    }

    /**
     * blockHandler
     */
    public CommonResult blockHandler(@PathVariable  Long id, BlockException blockException) {
        Payment payment = new Payment(id,"null");
        return new CommonResult<>(445,"blockHandler-sentinel限流,无此流水: blockException  "+blockException.getMessage(),payment);
    }
}

```



>   图说

![image-20220126140025038](/assets/imgs/SpringCloud4.assets/image-20220126140025038.png)



>   sentinel 控制台

![image-20220126134939072](/assets/imgs/SpringCloud4.assets/image-20220126134939072.png)



>   测试

![image-20220126135513386](/assets/imgs/SpringCloud4.assets/image-20220126135513386.png)

![image-20220126135531177](/assets/imgs/SpringCloud4.assets/image-20220126135531177.png)



###### 配置 fallback 和 blockHandler

>   controller

```java
package com.yixihan.springcloud.controller;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-26-13:17
 */
@RestController
@Slf4j
public class CircleBreakerController {

    public static final String SERVICE_URL = "http://nacos-payment-provider";

    @Resource
    private RestTemplate restTemplate;

    @RequestMapping("/consumer/fallback/{id}")
    @SentinelResource(value = "fallback", fallback = "handlerFallback", blockHandler = "blockHandler")
    public CommonResult<Payment> fallback(@PathVariable Long id) {
        CommonResult<Payment> result = restTemplate.getForObject(SERVICE_URL + "/paymentSQL/"+id, CommonResult.class,id);

        if (id == 4) {
            throw new IllegalArgumentException ("IllegalArgumentException,非法参数异常....");
        }else if (result.getData() == null) {
            throw new NullPointerException ("NullPointerException,该ID没有对应记录,空指针异常");
        }

        return result;
    }

    /**
     * fallback
     */
    public CommonResult handlerFallback(@PathVariable  Long id,Throwable e) {
        Payment payment = new Payment(id,"null");
        return new CommonResult<>(444,"兜底异常handlerFallback,exception内容  "+e.getMessage(),payment);
    }

    /**
     * blockHandler
     */
    public CommonResult blockHandler(@PathVariable  Long id, BlockException blockException) {
        Payment payment = new Payment(id,"null");
        return new CommonResult<>(445,"blockHandler-sentinel限流,无此流水: blockException  "+blockException.getMessage(),payment);
    }
}

```



>   图说

![image-20220126140040597](/assets/imgs/SpringCloud4.assets/image-20220126140040597.png)



>   sentinel 控制台

![image-20220126135702066](/assets/imgs/SpringCloud4.assets/image-20220126135702066.png)



>   测试

![image-20220126135859043](/assets/imgs/SpringCloud4.assets/image-20220126135859043.png)

![image-20220126135913309](/assets/imgs/SpringCloud4.assets/image-20220126135913309.png)

若 blockHandler 和 fallback 都进行了配置，则被限流降级而抛出 BlockException 时只会进入 blockHandler 处理逻辑。



###### 忽略属性

>   controller

```java
package com.yixihan.springcloud.controller;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-26-13:17
 */
@RestController
@Slf4j
public class CircleBreakerController {

    public static final String SERVICE_URL = "http://nacos-payment-provider";

    @Resource
    private RestTemplate restTemplate;

    @RequestMapping("/consumer/fallback/{id}")
    @SentinelResource(value = "fallback", fallback = "handlerFallback", blockHandler = "blockHandler", 
            exceptionsToIgnore = {IllegalArgumentException.class})
    public CommonResult<Payment> fallback(@PathVariable Long id) {
        CommonResult<Payment> result = restTemplate.getForObject(SERVICE_URL + "/paymentSQL/"+id, CommonResult.class,id);

        if (id == 4) {
            throw new IllegalArgumentException ("IllegalArgumentException,非法参数异常....");
        }else if (result.getData() == null) {
            throw new NullPointerException ("NullPointerException,该ID没有对应记录,空指针异常");
        }

        return result;
    }

    /**
     * fallback
     */
    public CommonResult handlerFallback(@PathVariable  Long id,Throwable e) {
        Payment payment = new Payment(id,"null");
        return new CommonResult<>(444,"兜底异常handlerFallback,exception内容  "+e.getMessage(),payment);
    }

    /**
     * blockHandler
     */
    public CommonResult blockHandler(@PathVariable  Long id, BlockException blockException) {
        Payment payment = new Payment(id,"null");
        return new CommonResult<>(445,"blockHandler-sentinel限流,无此流水: blockException  "+blockException.getMessage(),payment);
    }
}

```



>   图说

![image-20220126140128392](/assets/imgs/SpringCloud4.assets/image-20220126140128392.png)



>   sentinel 控制台

无



>   测试

![image-20220126140342965](/assets/imgs/SpringCloud4.assets/image-20220126140342965.png)



#### Feign系列

修改84模块

84消费者调用提供者9003

Feign组件一般是消费侧



##### POM

ps : 未整合 devtool

原因 : 整合 devtool 会抛 `class org.springframework.cloud.openfeign.HystrixTargeter$$EnhancerBySpringCGLIB$$979eb77 cannot access its superclass org.springframework.cloud.openfeign.HystrixTargeter` 异常

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

    <artifactId>cloudalibaba-consumer-nacos-order84</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--SpringCloud openfeign -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>

        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!--SpringCloud ailibaba sentinel -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.yixihan.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
<!--        <dependency>-->
<!--            <groupId>org.springframework.boot</groupId>-->
<!--            <artifactId>spring-boot-devtools</artifactId>-->
<!--            <scope>runtime</scope>-->
<!--            <optional>true</optional>-->
<!--        </dependency>-->
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



##### YAML

```yaml
server:
  port: 84


spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: 175.24.229.41:8848
    sentinel:
      transport:
        #配置Sentinel dashboard地址
        dashboard: localhost:8080
        #默认8719端口，假如被占用会自动从8719开始依次+1扫描,直至找到未被占用的端口
        port: 8719


#消费者将要去访问的微服务名称(注册成功进nacos的微服务提供者)
service-url:
  nacos-user-service: http://nacos-payment-provider

management:
  endpoints:
    web:
      exposure:
        include: '*'


# 激活Sentinel对Feign的支持
feign:
  sentinel:
    enabled: true

```



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * 使用 fallback 方式是无法获取异常信息的，
 * 如果想要获取异常信息，可以使用 fallbackFactory参数
 * @author : yixihan
 * @create : 2022-01-26-13:16
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class OrderNacosMain84 {

    public static void main(String[] args) {
        SpringApplication.run (OrderNacosMain84.class, args);
    }
}


```



##### 业务类

###### service

>   PaymentService

```java
package com.yixihan.springcloud.service;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author : yixihan
 * @create : 2022-01-26-14:14
 */
@FeignClient(value = "nacos-payment-provider", fallback = PaymentFallbackService.class)//调用中关闭9003服务提供者
public interface PaymentService {

    @GetMapping(value = "/paymentSQL/{id}")
    CommonResult<Payment> paymentSQL(@PathVariable("id") Long id);
}

```



>   PaymentFallbackService

```java
package com.yixihan.springcloud.service;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import org.springframework.stereotype.Component;

/**
 * @author : yixihan
 * @create : 2022-01-26-14:14
 */
@Component
public class PaymentFallbackService implements PaymentService {

    @Override
    public CommonResult<Payment> paymentSQL(Long id) {
        return new CommonResult<>(44444,"服务降级返回,---PaymentFallbackService",new Payment(id, "errorSerial......"));
    }
}

```



###### controller

```java
//==================OpenFeign
@Resource
private PaymentService paymentService;

@GetMapping(value = "/consumer/openfeign/{id}")
public CommonResult<Payment> paymentSQL(@PathVariable("id") Long id) {
    if(id == 4) {
        throw new RuntimeException("没有该id");
    }
    return paymentService.paymentSQL(id);
}
```



##### 测试

[测试接口](http://localhost:84/consumer/paymentSQL/1)

测试84调用9003，此时故意关闭9003微服务提供者，看84消费侧自动降级，不会被耗死



>   9003 未关闭

![image-20220126162809728](/assets/imgs/SpringCloud4.assets/image-20220126162809728.png)



>   9003 已关闭

![image-20220126162828472](/assets/imgs/SpringCloud4.assets/image-20220126162828472.png)



#### 熔断框架对比

![image-20220126163329149](/assets/imgs/SpringCloud4.assets/image-20220126163329149.png)



### 规则持久化



#### 是什么

一旦我们重启应用，sentinel规则将消失，生产环境需要将配置规则进行持久化



#### 怎么玩

将限流配置规则持久化进Nacos保存，只要刷新8401某个rest地址，sentinel控制台的流控规则就能看到，只要Nacos里面的配置不删除，针对8401上sentinel上的流控规则持续有效



#### 步骤

修改cloudalibaba-sentinel-service8401



##### POM

```xml
 <!--SpringCloud ailibaba sentinel-datasource-nacos -->
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-datasource-nacos</artifactId>
</dependency>
```



##### YAML

```yaml
server:
  port: 8401

spring:
  application:
    name: cloudalibaba-sentinel-service
  cloud:
    nacos:
      discovery:
        #Nacos服务注册中心地址
        server-addr: 175.24.229.41:8848
    sentinel:
      transport:
        #配置Sentinel dashboard地址
        dashboard: localhost:8080
        #默认8719端口，假如被占用会自动从8719开始依次+1扫描,直至找到未被占用的端口
        port: 8719
      datasource:
        ds1:
          nacos:
            server-addr: 175.24.229.41:8848
            dataId: cloudalibaba-sentinel-service
            groupId: DEFAULT_GROUP
            data-type: json
            rule-type: flow

management:
  endpoints:
    web:
      exposure:
        include: '*'

# 添加 OpenFeign 则需删除 devtool 热部署
#feign:
#  sentinel:
#    enabled: true # 激活Sentinel对Feign的支持
```



##### Nacos 业务规则配置

![image-20220126163848819](/assets/imgs/SpringCloud4.assets/image-20220126163848819.png)



>   内容解析

-   resource：资源名称；

-   limitApp：来源应用；

-   grade：阈值类型，0表示线程数，1表示QPS；

-   count：单机阈值；

-   strategy：流控模式，0表示直接，1表示关联，2表示链路；

-   controlBehavior：流控效果，0表示快速失败，1表示Warm Up，2表示排队等待；

-   clusterMode：是否集群。





##### 测试

>   启动8401后刷新sentinel发现业务规则有了

![image-20220126164702165](/assets/imgs/SpringCloud4.assets/image-20220126164702165.png)



>   快速访问测试接口

[测试接口](http://localhost:8401/rateLimit/byUrl)

![image-20220126164952864](/assets/imgs/SpringCloud4.assets/image-20220126164952864.png)



>   停止8401再看sentinel

![image-20220126164648136](/assets/imgs/SpringCloud4.assets/image-20220126164648136.png)



>   重新启动8401再看sentinel

乍一看还是没有，稍等一会儿

多次调用 [测试接口](http://localhost:8401/rateLimit/byUrl)

重新配置出现了，持久化验证通过

![image-20220126164702165](/assets/imgs/SpringCloud4.assets/image-20220126164702165.png)

