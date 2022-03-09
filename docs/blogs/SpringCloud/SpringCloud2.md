---
title: SpringCloud2
date: 2022-02-22
tags:
 - SpringCloud
categories:
 - SpringCloud
---

# SpringCloud



## Consul服务注册与发现



### Consul简介

>   consul 是什么

[consul 官网](https://www.consul.io/docs/intro)

Consul 是一套开源的分布式服务发现和配置管理系统，由 HashiCorp 公司用 **Go 语言**开发。

提供了微服务系统中的**服务治理**、**配置中心**、**控制总线**等功能。这些功能中的每一个都可以根据需要单独使用，也可以一起使用以构建全方位的服务网格，总之Consul提供了一种完整的服务网格解决方案。

它具有很多优点。包括： 

-   基于 raft 协议，比较简洁； 
-   支持健康检查, 同时支持 HTTP 和 DNS 协议 
-   支持跨数据中心的 WAN 集群 提供图形界面 
-   跨平台，支持 Linux、Mac、Windows



>   consul 功能

-   服务发现
    提供HTTP和DNS两种发现方式。
-   健康检测
    支持多种方式，HTTP、TCP、Docker、Shell脚本定制化监控
-   KV存储
    Key、Value的存储方式
-   多数据中心
    Consul支持多数据中心
-   可视化 Web 界面



>   consul 下载地址

[下载地址](https://www.consul.io/downloads.html)



>   consul 教程

[中文文档](https://www.springcloud.cc/spring-cloud-consul.html)

[官方文档](https://www.consul.io/docs)



### 安装并运行Consul

>   官网安装说明

[官网安装说明](https://learn.hashicorp.com/consul/getting-started/install.html)



>   查看版本号

下载完成解压后只有一个 exe 文件

cmd 输入 `consul --version` 查看版本号

![image-20220118073441926](/assets/imgs/SpringCloud2.assets/image-20220118073441926.png)

>   使用开发模式启动

cmd 输入`consul agent -dev` 使用开发模式启动 consul



>   consul 首页

[consul 首页](http://localhost:8500)

![image-20220118073552694](/assets/imgs/SpringCloud2.assets/image-20220118073552694.png)



### 服务提供者



#### 建 module

module 名 : cloud-providerconsul-payment8006

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

    <artifactId>cloud-providerconsul-payment8006</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--SpringCloud consul-server -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-consul-discovery</artifactId>
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



#### 写 YAML

```yaml
server:
  port: 8006

spring:
  application:
    name: consul-provider-payment
  # consul注册中心地址
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        # hostname: 127.0.0.1
        service-name: ${spring.application.name}
```



#### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * @author : yixihan
 * @create : 2022-01-18-7:38
 */
@SpringBootApplication
@EnableDiscoveryClient
public class PaymentMain8006 {

    public static void main(String[] args) {
        SpringApplication.run (PaymentMain8006.class, args);
    }
}

```



#### 业务类

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
 * @create : 2022-01-18-7:39
 */
@RestController
@Slf4j
public class PaymentController {

    @Value("${server.port}")
    private String serverPort;

    @RequestMapping(value = "/payment/consul")
    public String paymentConsul() {
        return "springcloud with consul: "+serverPort+"\t"+ UUID.randomUUID().toString();
    }
}

```



#### 测试

[consul 控制台](http://localhost:8500)

[测试 url](http://localhost:8006/payment/consul)



>   consul 控制台

![image-20220118075013577](/assets/imgs/SpringCloud2.assets/image-20220118075013577.png)



>   测试接口

![image-20220118075029026](/assets/imgs/SpringCloud2.assets/image-20220118075029026.png)



### 服务消费者



#### 建 module

module 名 : cloud-consumerconsul-order80



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

    <artifactId>cloud-consumerconsul-order80</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--SpringCloud consul-server -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-consul-discovery</artifactId>
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



#### 写 YAML

```yaml
server:
  port: 80

spring:
  application:
    name: cloud-consumer-order
  # consul注册中心地址
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        # hostname: 127.0.0.1
        service-name: ${spring.application.name}
```



#### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * @author : yixihan
 * @create : 2022-01-18-7:43
 */
@SpringBootApplication
@EnableDiscoveryClient
public class OrderConsulMain80 {

    public static void main(String[] args) {
        SpringApplication.run (OrderConsulMain80.class, args);
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



>   controller

```java
package com.yixihan.springcloud.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-16-16:36
 */
@RestController
@Slf4j
@RequestMapping("/consumer")
public class OrderController {

    public static final String PAYMENT_URL = "http://consul-provider-payment";

    @Resource
    private RestTemplate restTemplate;

    @GetMapping("/payment/consul")
    public String create () {
        return restTemplate.getForObject (PAYMENT_URL + "/payment/consul", String.class);
    }


}

```



#### 测试

[consul 控制台](http://localhost:8500)

[测试 url](http://localhost/consumer/payment/consul)



>   consul 控制台

![image-20220118075305987](/assets/imgs/SpringCloud2.assets/image-20220118075305987.png)



>   测试接口

![image-20220118075314436](/assets/imgs/SpringCloud2.assets/image-20220118075314436.png)



### 三个注册中心异同点

>   图解

![image-20220118075447552](/assets/imgs/SpringCloud2.assets/image-20220118075447552.png)



#### CAP

>   C

C:Consistency（强一致性）



>   A

A:Availability（可用性）



>   P

P:Partition tolerance（分区容错性）



CAP理论关注粒度是数据，而不是整体系统设计的策略



#### 经典 CAP 图

![image-20220118075522992](/assets/imgs/SpringCloud2.assets/image-20220118075522992.png)



**最多只能同时较好的满足两个。**

 CAP理论的核心是：**一个分布式系统不可能同时很好的满足一致性，可用性和分区容错性这三个需求，**

因此，根据 CAP 原理将 NoSQL 数据库分成了满足 CA 原则、满足 CP 原则和满足 AP 原则三 大类：

CA - 单点集群，满足一致性，可用性的系统，通常在可扩展性上不太强大。

CP - 满足一致性，分区容忍必的系统，通常性能不是特别高。

AP - 满足可用性，分区容忍性的系统，通常可能对一致性要求低一些。



>   AP(Eureka)

当网络分区出现后，为了保证可用性，系统B**可以返回旧值**，保证系统的可用性。

**结论：违背了一致性C的要求，只满足可用性和分区容错，即AP**

![image-20220118075816730](/assets/imgs/SpringCloud2.assets/image-20220118075816730.png)

>   CP(Zookeeper/Consul)

当网络分区出现后，为了保证一致性，就必须拒接请求，否则无法保证一致性

**结论：违背了可用性A的要求，只满足一致性和分区容错，即CP**

![image-20220118075834863](/assets/imgs/SpringCloud2.assets/image-20220118075834863.png)



## Ribbon负载均衡服务调用



### 概述

Spring Cloud Ribbon是基于Netflix Ribbon实现的一套**客户端负载均衡**的工具。

简单的说，Ribbon是Netflix发布的开源项目，主要功能是提供**客户端的软件负载均衡算法和服务调用**。Ribbon客户端组件提供一系列完善的配置项如连接超时，重试等。简单的说，就是在配置文件中列出Load Balancer（简称LB）后面所有的机器，Ribbon会自动的帮助你基于某种规则（如简单轮询，随机连接等）去连接这些机器。我们很容易使用Ribbon实现自定义的负载均衡算法。



>   官网

[官网](https://github.com/Netflix/ribbon/wiki/Getting-Started)



>   目前状态

Ribbon目前也进入维护模式

![image-20220118081042839](/assets/imgs/SpringCloud2.assets/image-20220118081042839.png)



>   未来替换方案

![image-20220118081120095](/assets/imgs/SpringCloud2.assets/image-20220118081120095.png)



#### 功能

LB（负载均衡）



>   LB负载均衡(Load Balance)是什么

简单的说就是将用户的请求平摊的分配到多个服务上，从而达到系统的HA（高可用）。
常见的负载均衡有软件Nginx，LVS，硬件 F5等。



>   Ribbon本地负载均衡客户端 VS Nginx服务端负载均衡区别

Nginx是服务器负载均衡，客户端所有请求都会交给nginx，然后由nginx实现转发请求。即负载均衡是由服务端实现的。

 Ribbon本地负载均衡，在调用微服务接口时候，会在注册中心上获取注册信息服务列表之后缓存到JVM本地，从而在本地实现RPC远程服务调用技术。



>   集中式 LB

即在服务的消费方和提供方之间使用独立的LB设施(可以是硬件，如F5, 也可以是软件，如nginx), 由该设施负责把访问请求通过某种策略转发至服务的提供方；



>   进程内 LB

将LB逻辑集成到消费方，消费方从服务注册中心获知有哪些地址可用，然后自己再从这些地址中选择出一个合适的服务器。

**Ribbon就属于进程内LB**，它只是一个类库，**集成于消费方进程**，消费方通过它来获取到服务提供方的地址。



一句话 : **负载均衡 + RestTemplate调用**



### Ribbon负载均衡演示



#### 架构

![image-20220118082617187](/assets/imgs/SpringCloud2.assets/image-20220118082617187.png)

Ribbon在工作时分成两步

第一步先选择 EurekaServer ,它优先选择在同一个区域内负载较少的server.

第二步再根据用户指定的策略，在从server取到的服务注册列表中选择一个地址。

其中Ribbon提供了多种策略：比如轮询、随机和根据响应时间加权。



>   总结

总结：Ribbon其实就是一个软负载均衡的客户端组件，他可以和其他所需请求的客户端结合使用，和eureka结合只是其中的一个实例。



#### POM

引入 eureka-client 包会自动导入 ribbon

![image-20220118083031012](/assets/imgs/SpringCloud2.assets/image-20220118083031012.png)



#### RestTemplate 的使用

>   官网

[RestTemplate 官方 API 文档](https://docs.spring.io/spring-framework/docs/5.2.15.RELEASE/javadoc-api/org/springframework/web/client/RestTemplate.html)



>   getForObject方法

getForObject方法返回对象为响应体中数据转化成的对象，基本上可以理解为Json

![image-20220118084249190](/assets/imgs/SpringCloud2.assets/image-20220118084249190.png)



>   getForEntity方法

getForEntity方法返回对象为ResponseEntity对象，包含了响应中的一些重要信息，比如响应头、响应状态码、响应体等

```java
@GetMapping("/payment/getForEntity/get/{id}")
public CommonResult<Payment> getPayment2 (@PathVariable("id") Long id) {
    ResponseEntity<CommonResult> entity = restTemplate.getForEntity (PAYMENT_URL + "/payment/get/" + id, CommonResult.class);

    if (entity.getStatusCode ().is2xxSuccessful ()) {
        log.info (entity.getStatusCode () + "\t" + entity.getHeaders () + "\t" + entity.getBody ());
        return entity.getBody ();
    } else {
        return new CommonResult<> (444, "操作失败");
    }
}
```



![image-20220118084232488](/assets/imgs/SpringCloud2.assets/image-20220118084232488.png)



>   postForObject 方法

![image-20220118084241660](/assets/imgs/SpringCloud2.assets/image-20220118084241660.png)



>   postForEntity 方法

```java
@GetMapping("/payment/createForEntity")
public CommonResult<Payment> createForEntity (Payment payment) {
    ResponseEntity<CommonResult> entity = restTemplate.postForEntity (PAYMENT_URL + "/payment/create", payment, CommonResult.class);

    if (entity.getStatusCode ().is2xxSuccessful ()) {
        log.info (entity.getStatusCode () + "\t" + entity.getHeaders () + "\t" + entity.getBody ());
        return entity.getBody ();
    } else {
        return new CommonResult<> (444, "操作失败");
    }
}
```



![image-20220118084222005](/assets/imgs/SpringCloud2.assets/image-20220118084222005.png)



>   GET请求方法

```java
<T> T getForObject(String url, Class<T> responseType, Object... uriVariables);
 

<T> T getForObject(String url, Class<T> responseType, Map<String, ?> uriVariables);
 
<T> T getForObject(URI url, Class<T> responseType);
 
<T> ResponseEntity<T> getForEntity(String url, Class<T> responseType, Object... uriVariables);
 
<T> ResponseEntity<T> getForEntity(String url, Class<T> responseType, Map<String, ?> uriVariables);
 
<T> ResponseEntity<T> getForEntity(URI var1, Class<T> responseType);
```



>   POST请求方法

```java
<T> T postForObject(String url, @Nullable Object request, Class<T> responseType, Object... uriVariables);
 
<T> T postForObject(String url, @Nullable Object request, Class<T> responseType, Map<String, ?> uriVariables);
 
<T> T postForObject(URI url, @Nullable Object request, Class<T> responseType);
 
<T> ResponseEntity<T> postForEntity(String url, @Nullable Object request, Class<T> responseType, Object... uriVariables);
 
<T> ResponseEntity<T> postForEntity(String url, @Nullable Object request, Class<T> responseType, Map<String, ?> uriVariables);
 
<T> ResponseEntity<T> postForEntity(URI url, @Nullable Object request, Class<T> responseType);

```



### Ribbon核心组件IRule



#### IRule 简介

IRule：根据特定算法中从服务列表中选取一个要访问的服务



>   UML 图

![image-20220118084551256](/assets/imgs/SpringCloud2.assets/image-20220118084551256.png)



#### 常用实现类

>   com.netflix.loadbalancer.RoundRobinRule

轮询



>   com.netflix.loadbalancer.RandomRule

随机



>   com.netflix.loadbalancer.RetryRule

先按照RoundRobinRule的策略获取服务，如果获取服务失败则在指定时间内会进行重试，获取可用的服务



>   WeightedResponseTimeRule

对RoundRobinRule的扩展，响应速度越快的实例选择权重越大，越容易被选择



>   BestAvailableRule

会先过滤掉由于多次访问故障而处于断路器跳闸状态的服务，然后选择一个并发量最小的服务



>   AvailabilityFilteringRule

先过滤掉故障实例，再选择并发较小的实例



>   ZoneAvoidanceRule

默认规则,复合判断server所在区域的性能和server的可用性选择服务器



#### 如何替换



##### 配置细节

官方文档明确给出了警告：

这个自定义配置类不能放在@ComponentScan所扫描的当前包下以及子包下，否则我们自定义的这个配置类就会被所有的Ribbon客户端所共享，达不到特殊化定制的目的了。

即不能放在 @SpringBootApplication 这个注解所在类的包下即子包下



##### 新建 package

package 名 : com.yixihan.myrule



##### 新建 config 类

```java
package com.yixihan.myrule;

import com.netflix.loadbalancer.IRule;
import com.netflix.loadbalancer.RandomRule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author : yixihan
 * @create : 2022-01-18-8:51
 */
@Configuration
public class MyselfRule {

    @Bean
    public IRule myRule () {
        // 定义为随机
        return new RandomRule ();
    }
}

```



##### 主启动类添加注解

添加 @RibbonClient 注解

```java
package com.yixihan.springcloud;

import com.yixihan.myrule.MyselfRule;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.ribbon.RibbonClient;

/**
 * @author : yixihan
 * @create : 2022-01-16-16:31
 */
@SpringBootApplication
@EnableEurekaClient
@RibbonClient(name = "CLOUD-PAYMENT-SERVICE", configuration = MyselfRule.class)
public class MainApp80 {

    public static void main(String[] args) {
        SpringApplication.run (MainApp80.class, args);
    }
}

```



>   测试

[测试 url](http://localhost/consumer/payment/get/6)



### Ribbon负载均衡算法



#### 原理

**负载均衡算法：rest接口第几次请求数 % 服务器集群总数量 = 实际调用服务器位置下标  ，每次服务重启动后rest接口计数从1开始。**

```java
List<ServiceInstance> instances = discoveryClient.getInstances("CLOUD-PAYMENT-SERVICE");
```

如：   List [0] instances = 127.0.0.1:8002
　　　List [1] instances = 127.0.0.1:8001

8001+ 8002 组合成为集群，它们共计2台机器，集群总数为2， 按照轮询算法原理：

当总请求数为1时： 1 % 2 =1 对应下标位置为1 ，则获得服务地址为127.0.0.1:8001

当总请求数位2时： 2 % 2 =0 对应下标位置为0 ，则获得服务地址为127.0.0.1:8002

当总请求数位3时： 3 % 2 =1 对应下标位置为1 ，则获得服务地址为127.0.0.1:8001

当总请求数位4时： 4 % 2 =0 对应下标位置为0 ，则获得服务地址为127.0.0.1:8002

如此类推......



#### 源码

```java
private AtomicInteger nextServerCyclicCounter;

public RoundRobinRule() {
    nextServerCyclicCounter = new AtomicInteger(0);
}

public Server choose(ILoadBalancer lb, Object key) {
    if (lb == null) {
        log.warn("no load balancer");
        return null;
    }

    Server server = null;
    int count = 0;
    while (server == null && count++ < 10) {
        // 获取所有正在运行的 servers
        List<Server> reachableServers = lb.getReachableServers();
        // 获取所有的 server
        List<Server> allServers = lb.getAllServers();
        int upCount = reachableServers.size();
        int serverCount = allServers.size();

        if ((upCount == 0) || (serverCount == 0)) {
            log.warn("No up servers available from load balancer: " + lb);
            return null;
        }

        int nextServerIndex = incrementAndGetModulo(serverCount);
        server = allServers.get(nextServerIndex);

        if (server == null) {
            /* Transient. */
            Thread.yield();
            continue;
        }

        if (server.isAlive() && (server.isReadyToServe())) {
            return (server);
        }

        // Next.
        server = null;
    }

    if (count >= 10) {
        log.warn("No available alive servers after 10 tries from load balancer: "
                 + lb);
    }
    return server;
}

/**
 * Inspired by the implementation of {@link AtomicInteger#incrementAndGet()}.
 *
 * @param modulo The modulo to bound the value of the counter.
 * @return The next value.
 */
private int incrementAndGetModulo(int modulo) {
    for (;;) {
        int current = nextServerCyclicCounter.get();
        int next = (current + 1) % modulo;
        if (nextServerCyclicCounter.compareAndSet(current, next))
            return next;
    }
}
```



#### 手写本地负载均衡



##### 服务端改造

>   controller

```java
@GetMapping(value = "/payment/lb")
public String getPaymentLB() {
    return serverPort;
}
```



##### ApplicationContextBean去掉注解@LoadBalanced

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

    /**
     * 使用 @LoadBalanced 注解赋予 RestTemplate 负载均衡的能力
     */
    @Bean("getRestTemplate")
//    @LoadBalanced
    public RestTemplate getRestTemplate () {
        return new RestTemplate ();
    }
}

```





##### LoadBalancer接口

```java
package com.yixihan.springcloud.lb;

import org.springframework.cloud.client.ServiceInstance;

import java.util.List;

/**
 * @author : yixihan
 * @create : 2022-01-18-13:44
 */
public interface LoadBalancer {

    ServiceInstance instances(List<ServiceInstance> serviceInstances);
}

```



##### MyLB

```java
package com.yixihan.springcloud.lb;

import org.springframework.cloud.client.ServiceInstance;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @author : yixihan
 * @create : 2022-01-18-13:44
 */
@Component
public class MyLb implements LoadBalancer {

    private AtomicInteger atomicInteger = new AtomicInteger (0);

    public final int getAndIncrement() {
        int current;
        int next;
        do {
            current = this.atomicInteger.get ();
            next = current >= 2147483647 ? 0 : current + 1;
        } while (!this.atomicInteger.compareAndSet (current, next));
        System.out.println ("*****next: " + next);
        return next;
    }


    @Override
    public ServiceInstance instances(List<ServiceInstance> serviceInstances) {
        int index = getAndIncrement () % serviceInstances.size ();
        return serviceInstances.get (index);
    }

}

```



##### controller

```java
@Resource
private DiscoveryClient discoveryClient;

@Resource
private LoadBalancer loadBalancer;

@GetMapping("/payment/lb")
public String getPaymentLB() {
    List<ServiceInstance> instances = discoveryClient.getInstances ("CLOUD-PAYMENT-SERVICE");

    if (instances == null || instances.size () <= 0) {
        return null;
    }
    ServiceInstance serviceInstance = loadBalancer.instances (instances);
    URI uri = serviceInstance.getUri ();

    return restTemplate.getForObject (uri + "/payment/lb", String.class);
}
```



##### 启动类

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
//@RibbonClient(name = "CLOUD-PAYMENT-SERVICE", configuration = MyselfRule.class)
public class MainApp80 {

    public static void main(String[] args) {
        SpringApplication.run (MainApp80.class, args);
    }
}

```



##### 测试

[测试 url](http://localhost/consumer/payment/lb)

![image-20220118094243970](/assets/imgs/SpringCloud2.assets/image-20220118094243970.png)

![image-20220118094322290](/assets/imgs/SpringCloud2.assets/image-20220118094322290.png)

![image-20220118094258878](/assets/imgs/SpringCloud2.assets/image-20220118094258878.png)



## OpenFeign服务接口调用



### 概述



#### OpenFeign是什么

[官方描述](https://cloud.spring.io/spring-cloud-static/Hoxton.SR1/reference/htmlsingle/#spring-cloud-openfeign)

Feign是一个声明式WebService客户端。使用Feign能让编写Web Service客户端更加简单。

它的使用方法是**定义一个服务接口然后在上面添加注解**。

Feign也支持可拔插式的编码器和解码器。Spring Cloud对Feign进行了封装，使其支持了Spring MVC标准注解和HttpMessageConverters。Feign可以与Eureka和Ribbon组合使用以支持负载均衡



>   官网

[官网地址](https://spring.io/projects/spring-cloud-openfeign)

[github 地址](https://github.com/spring-cloud/spring-cloud-openfeign)



#### OpenFeign 功能

>   Feign能干什么

Feign旨在使编写Java Http客户端变得更容易。

前面在使用Ribbon+RestTemplate时，利用RestTemplate对http请求的封装处理，形成了一套模版化的调用方法。但是在实际开发中，由于对服务依赖的调用可能不止一处，**往往一个接口会被多处调用，所以通常都会针对每个微服务自行封装一些客户端类来包装这些依赖服务的调用**。所以，Feign在此基础上做了进一步封装，由他来帮助我们定义和实现依赖服务接口的定义。在Feign的实现下，**我们只需创建一个接口并使用注解的方式来配置它(以前是Dao接口上面标注Mapper注解,现在是一个微服务接口上面标注一个Feign注解即可)**，即可完成对服务提供方的接口绑定，简化了使用Spring cloud Ribbon时，自动封装服务调用客户端的开发量。



>   Feign集成了Ribbon

利用Ribbon维护了Payment的服务列表信息，并且通过轮询实现了客户端的负载均衡。而与Ribbon不同的是，**通过feign只需要定义服务绑定接口且以声明式的方法**，优雅而简单的实现了服务调用



#### Feign和OpenFeign两者区别

| Feign                                                        |                          OpenFeign                           |
| ------------------------------------------------------------ | :----------------------------------------------------------: |
| Feign是Spring Cloud组件中的一个轻量级RESTful的HTTP服务客户端<br>Feign内置了Ribbon，用来做客户端负载均衡，去调用服务注册中心的服务。Feign的使用方式是：使用Feign的注解定义接口，调用这个接口，就可以调用服务注册中心的服务 | OpenFeign是Spring Cloud 在Feign的基础上支持了SpringMVC的注解，如@RequesMapping等等。OpenFeign的@FeignClient可以解析SpringMVC的@RequestMapping注解下的接口，并通过动态代理的方式产生实现类，实现类中做负载均衡并调用其他服务。 |
| <dependency><br/>    <groupId>org.springframework.cloud</groupId><br/>    <artifactId>spring-cloud-starter-feign</artifactId><br/></dependency> | <dependency><br/>    <groupId>org.springframework.cloud</groupId><br/>    <artifactId>spring-cloud-starter-openfeign</artifactId><br/></dependency> |



### OpenFeign使用步骤

>   图解

![image-20220118102807689](/assets/imgs/SpringCloud2.assets/image-20220118102807689.png)



#### 建 module

module 名 : cloud-consumer-feign-order80



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

    <artifactId>cloud-consumer-feign-order80</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--openfeign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <!--eureka client-->
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
        <!--web-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--一般基础通用配置-->
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

eureka:
  client:
    register-with-eureka: false
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka/,http://eureka7002.com:7002/eureka/
```



#### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * @author : yixihan
 * @create : 2022-01-18-10:38
 */
@SpringBootApplication
@EnableEurekaClient
@EnableDiscoveryClient
@EnableFeignClients
public class OrderFeignMain80 {

    public static void main(String[] args) {
        SpringApplication.run (OrderFeignMain80.class, args);
    }
}

```



#### 业务类

>   service

```java
package com.yixihan.springcloud.service;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.cloud.openfeign.FeignClient;

/**
 * @author : yixihan
 * @create : 2022-01-18-10:40
 */
@Component
@FeignClient(value = "CLOUD-PAYMENT-SERVICE")
public interface PaymentFeignService {

    @GetMapping("/payment/get/{id}")
    CommonResult<Payment> getPaymentById (@PathVariable("id") Long id);
}

```



>   controller

```java
package com.yixihan.springcloud.controller;

import com.yixihan.springcloud.pojo.CommonResult;
import com.yixihan.springcloud.pojo.Payment;
import com.yixihan.springcloud.serivce.PaymentFeignService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-18-10:44
 */
@RestController
@RequestMapping("/consumer")
@Slf4j
public class OrderFeignController {

    @Resource
    private PaymentFeignService paymentFeignService;


    @GetMapping("/payment/get/{id}")
    public CommonResult<Payment> getPaymentById (@PathVariable("id") Long id) {
        return paymentFeignService.getPaymentById (id);
    }
}

```



#### 测试

ps : Feign自带负载均衡配置项

[测试 url](http://localhost/consumer/payment/get/3)

![image-20220118110550588](/assets/imgs/SpringCloud2.assets/image-20220118110550588.png)

![image-20220118110644488](/assets/imgs/SpringCloud2.assets/image-20220118110644488.png)



#### 总结

![image-20220118110901339](/assets/imgs/SpringCloud2.assets/image-20220118110901339.png)



### OpenFeign超时控制

  默认Feign客户端只等待一秒钟，但是服务端处理需要超过1秒钟，导致Feign客户端不想等待了，直接返回报错。

为了避免这样的情况，有时候我们需要设置Feign客户端的超时控制。



#### 超时出错情况



##### 服务提供者

```java
@GetMapping("/payment/feign/timeout")
public String paymentFeignTimeout () {

    // 暂停三秒钟
    try {
        TimeUnit.SECONDS.sleep (3);
    } catch (InterruptedException e) {
        e.printStackTrace ();
    }

    return serverPort;
}
```



##### 服务消费者

>   service

```java
@GetMapping("/payment/feign/timeout")
String paymentFeignTimeout ();
```



>   controller

```java
@GetMapping("/payment/feign/timeout")
public String paymentFeignTimeout () {
    // openfeign - ribbon, 客户端一般默认等待一秒钟
    return paymentFeignService.paymentFeignTimeout ();
}
```



##### 测试

[服务端测试 url](http://localhost:8001/payment/feign/timeout)

[客户端测试 url](http://localhost/consumer/payment/feign/timeout)



>   服务端

![image-20220118113133538](/assets/imgs/SpringCloud2.assets/image-20220118113133538.png)



>   客户端

![image-20220118113144683](/assets/imgs/SpringCloud2.assets/image-20220118113144683.png)



#### 配置超时控制

```yaml
#设置feign客户端超时时间(OpenFeign默认支持ribbon)
ribbon:
#指的是建立连接所用的时间，适用于网络状况正常的情况下,两端连接所用的时间
  ReadTimeout: 5000
#指的是建立连接后从服务器读取到可用资源所用的时间
  ConnectTimeout: 5000
```



>   测试

![image-20220118113307141](/assets/imgs/SpringCloud2.assets/image-20220118113307141.png)



### OpenFeign日志打印功能



#### 概述

Feign 提供了日志打印功能，我们可以通过配置来调整日志级别，从而了解 Feign 中 Http 请求的细节。

说白了就是**对Feign接口的调用情况进行监控和输出**



#### OpenFeign 日志级别

-   NONE：默认的，不显示任何日志；

-   BASIC：仅记录请求方法、URL、响应状态码及执行时间；

-   HEADERS：除了 BASIC 中定义的信息之外，还有请求和响应的头信息；

-   FULL：除了 HEADERS 中定义的信息之外，还有请求和响应的正文及元数据。



#### 配置 OpenFeign 日志



##### 配置日记 bean

```java
package com.yixihan.springcloud.config;

import feign.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author : yixihan
 * @create : 2022-01-18-11:35
 */
@Configuration
public class FeignConfig {

    @Bean
    Logger.Level feignLoggerLevel () {
        return Logger.Level.FULL;
    }
}

```



##### 配置 YAML 文件

```yaml
logging:
  level:
    # feign 日志以什么级别监控那个接口
    com.yixihan.springcloud.serivce.PaymentFeignService: debug
```



##### 测试

![image-20220118113951197](/assets/imgs/SpringCloud2.assets/image-20220118113951197.png)



## hystrix断路器



### 概述



#### 分布式系统面临的问题

复杂分布式体系结构中的应用程序有数十个依赖关系，每个依赖关系在某些时候将不可避免地失败。

![image-20220118141900801](/assets/imgs/SpringCloud2.assets/image-20220118141900801.png)



>   服务雪崩

多个微服务之间调用的时候，假设微服务A调用微服务B和微服务C，微服务B和微服务C又调用其它的微服务，这就是所谓的**“扇出”**。如果扇出的链路上某个微服务的调用响应时间过长或者不可用，对微服务A的调用就会占用越来越多的系统资源，进而引起系统崩溃，所谓的“雪崩效应”.

对于高流量的应用来说，单一的后端依赖可能会导致所有服务器上的所有资源都在几秒钟内饱和。比失败更糟糕的是，这些应用程序还可能导致服务之间的延迟增加，备份队列，线程和其他系统资源紧张，导致整个系统发生更多的级联故障。这些都表示需要对故障和延迟进行隔离和管理，以便单个依赖关系的失败，不能取消整个应用程序或系统。

所以，通常当你发现一个模块下的某个实例失败后，这时候这个模块依然还会接收流量，然后这个有问题的模块还调用了其他的模块，这样就会发生级联故障，或者叫雪崩。



#### hystrix 概念

Hystrix是一个用于处理分布式系统的**延迟**和**容错**的开源库，在分布式系统里，许多依赖不可避免的会调用失败，比如超时、异常等，Hystrix能够保证在一个依赖出问题的情况下，**不会导致整体服务失败，避免级联故障，以提高分布式系统的弹性。**

断路器”本身是一种开关装置，当某个服务单元发生故障之后，通过断路器的故障监控（类似熔断保险丝），**向调用方返回一个符合预期的、可处理的备选响应（FallBack），而不是长时间的等待或者抛出调用方无法处理的异常**，这样就保证了服务调用方的线程不会被长时间、不必要地占用，从而避免了故障在分布式系统中的蔓延，乃至雪崩。



#### hystrix 功能

-   服务降级
-   服务熔断
-   接近实时的监控
-   ...



#### hystrix 官网资料

[hystrix github](https://github.com/Netflix/Hystrix)

[hystrix 教程](https://github.com/Netflix/Hystrix/wiki/How-To-Use)

ps : Hystrix已经停更进维



### Hystrix 重要概念



#### 服务降级

服务器忙，请稍后再试，不让客户端等待并立刻返回一个友好提示，fallback



>   哪些情况会触发降级

-   程序运行异常
-   超时
-   服务熔断触发服务降级
-   线程池/信号量打满



#### 服务熔断

类比保险丝达到最大服务访问后，直接拒绝访问，拉闸限电，然后调用服务降级的方法并返回友好提示

**就是保险丝**

服务的降级->进而熔断->恢复调用链路



#### 服务限流

秒杀高并发等操作，严禁一窝蜂的过来拥挤，大家排队，一秒钟N个，有序进行



### 构建服务端

(可搭建服务端集群)

#### 建 module

module 名 : cloud-provider-hystrix-payment8001

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

    <artifactId>cloud-provider-hystrix-payment8001</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--hystrix-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        </dependency>
        <!--eureka client-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <!--web-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency><!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
            <groupId>com.yixihan.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
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
  port: 8001

spring:
  application:
    name: cloud-provider-hystrix-payment

eureka:
  client:
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka

```



#### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;

/**
 * @author : yixihan
 * @create : 2022-01-18-14:38
 */
@SpringBootApplication
@EnableEurekaClient
@EnableHystrix
@EnableDiscoveryClient
public class PaymentHystrixMain8001 {

    public static void main(String[] args) {
        SpringApplication.run (PaymentHystrixMain8001.class, args);
    }
}

```



#### 业务类



##### service

>   接口

```java
package com.yixihan.springcloud.service;

/**
 * @author : yixihan
 * @create : 2022-01-18-14:39
 */
public interface PaymentService {

    String paymentInfoOk (Integer id);

    public String paymentTimeout (Integer id);
}

```



>   实现类

```java
package com.yixihan.springcloud.service;

import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

/**
 * @author : yixihan
 * @create : 2022-01-18-14:39
 */
@Service
public class PaymentServiceImpl implements PaymentService{

    /**
     * 正常访问, 肯定 ok
     * @param id id
     * @return info
     */
    @Override
    public String paymentInfoOk(Integer id) {
        return "线程池 : " + Thread.currentThread ().getName () + " paymentInfoOk, id : " + id  + "\t hhhh";
    }

    /**
     * 超时访问
     * @param id id
     * @return info
     */
    @Override
    public String paymentTimeout(Integer id) {
        int timeNumber = 5;
        try {
            TimeUnit.SECONDS.sleep (timeNumber);
        } catch (InterruptedException e) {
            e.printStackTrace ();
        }
        return "线程池 : " + Thread.currentThread ().getName () + " paymentTimeout, id : " + id  + "\t hhhh, 耗时 " + timeNumber + " s";
    }


}

```



##### controller

```java
package com.yixihan.springcloud.controller;

import com.yixihan.springcloud.service.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-18-14:44
 */
@RestController
@Slf4j
@RequestMapping("/payment")
public class PaymentController {

    @Resource
    private PaymentService paymentService;

    @Value ("${server.port")
    private String serverPort;

    @GetMapping("/hystrix/ok/{id}")
    String paymentInfoOk (@PathVariable ("id") Integer id) {
        String result = paymentService.paymentInfoOk (id);

        log.info (result);
        return result;
    }

    @GetMapping("/hystrix/timeout/{id}")
    public String paymentTimeout (@PathVariable ("id")Integer id) {
        String result = paymentService.paymentTimeout (id);

        log.info (result);
        return result;
    }

}

```



#### 测试

[测试url - ok](http://localhost:8001/payment/hystrix/ok/2)

[测试 url - timeout](http://localhost:8001/payment/hystrix/timeout/3)



>   ok

![image-20220118145750092](/assets/imgs/SpringCloud2.assets/image-20220118145750092.png)



>   timeout

![image-20220118145755316](/assets/imgs/SpringCloud2.assets/image-20220118145755316.png)

### 高并发测试 (Jmeter压测测试)



#### 启动 Jmeter 测试

[Jmeter 下载地址](https://jmeter.apache.org/download_jmeter.cgi)



双击 apache-jmeter-5.4.3\bin 目录下 jmeter.bat 文件启动 Jmeter



>   新建一个线程组

![image-20220118152434638](/assets/imgs/SpringCloud2.assets/image-20220118152434638.png)



>   修改线程数和循环次数(适当即可)

![image-20220118152519231](/assets/imgs/SpringCloud2.assets/image-20220118152519231.png)



>   ctrl + s 保存



>   新建 http 请求

![image-20220118152458240](/assets/imgs/SpringCloud2.assets/image-20220118152458240.png)



>   配置参数

![image-20220118152605082](/assets/imgs/SpringCloud2.assets/image-20220118152605082.png)



>   开始运行

![image-20220118152627753](/assets/imgs/SpringCloud2.assets/image-20220118152627753.png)



>   访问url

[测试url - ok](http://localhost:8001/payment/hystrix/ok/2)

[测试 url - timeout](http://localhost:8001/payment/hystrix/timeout/3)

![image-20220118151853653](/assets/imgs/SpringCloud2.assets/image-20220118151853653.png)



>   结论

两个都在自己转圈圈

原因 : tomcat的默认的工作线程数被打满 了，没有多余的线程来分解压力和处理。



#### Jmeter压测结论

上面还是**服务提供者8001自己测试**，假如此时外部的消费者80也来访问，
那**消费者**只能干等，最终导致消费端80不满意，服务端8001直接被拖死



#### 添加客户端 80



##### 建 module

module 名 : cloud-consumer-feign-hystrix-order80



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

    <artifactId>cloud-consumer-feign-hystrix-order80</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--openfeign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <!--hystrix-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        </dependency>
        <!--eureka client-->
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
        <!--web-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--一般基础通用配置-->
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
  port: 80

eureka:
  client:
    register-with-eureka: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka/,http://eureka7002.com:7002/eureka/
```



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * @author : yixihan
 * @create : 2022-01-18-15:48
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableHystrix
@EnableFeignClients
@EnableEurekaClient
public class OrderHystrixMain80 {

    public static void main(String[] args) {
        SpringApplication.run (OrderHystrixMain80.class, args);
    }
}

```



##### 业务类

>   service

```java
package com.yixihan.springcloud.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author : yixihan
 * @create : 2022-01-18-15:50
 */
@Component
@FeignClient("CLOUD-PROVIDER-HYSTRIX-PAYMENT")
public interface OrderHystrixService {

    @GetMapping("/payment/hystrix/ok/{id}")
    String paymentInfoOk (@PathVariable("id") Integer id);

    @GetMapping("/payment/hystrix/timeout/{id}")
    String paymentTimeout (@PathVariable("id") Integer id);
}

```



>   controller

```java
package com.yixihan.springcloud.controller;

import com.yixihan.springcloud.service.OrderHystrixService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-18-15:52
 */
@RestController
@RequestMapping("/consumer")
@Slf4j
public class OrderHystrixController {

    @Resource
    private OrderHystrixService orderHystrixService;

    @GetMapping("/payment/hystrix/ok/{id}")
    public String paymentInfoOk (@PathVariable("id") Integer id) {
        String result = orderHystrixService.paymentInfoOk (id);
        log.info (result);
        return result;
    }

    @GetMapping("/payment/hystrix/timeout/{id}")
    public String paymentTimeout (@PathVariable("id") Integer id) {
        String result = orderHystrixService.paymentTimeout (id);
        log.info (result);
        return result;
    }
}

```



##### 正常测试

[8001 测试 url - ok](http://localhost:8001/payment/hystrix/ok/2)

[8001 测试 url - timeout](http://localhost:8001/payment/hystrix/timeout/3)

[80 测试 url - ok](http://localhost/consumer/payment/hystrix/ok/2)

[80 测试 url - timeout](http://localhost/consumer/payment/hystrix/timeout/3)



>   服务端自测

![image-20220118160441841](/assets/imgs/SpringCloud2.assets/image-20220118160441841.png)

![image-20220118160455024](/assets/imgs/SpringCloud2.assets/image-20220118160455024.png)



>   客户端测试

![image-20220118160515095](/assets/imgs/SpringCloud2.assets/image-20220118160515095.png)

![image-20220118160540482](/assets/imgs/SpringCloud2.assets/image-20220118160540482.png)



##### 高并发测试

开启 Jmeter 高并发测测试

实测两个服务端开启可以承受 300-400w 左右的高并发

>   客户端测试

![image-20220118160653021](/assets/imgs/SpringCloud2.assets/image-20220118160653021.png)

![image-20220118160822426](/assets/imgs/SpringCloud2.assets/image-20220118160822426.png)



##### 故障现象和导致原因

8001同一层次的其它接口服务被困死，因为tomcat线程池里面的工作线程已经被挤占完毕

80此时调用8001，客户端访问响应缓慢，转圈圈



### 结论

正因为有上述故障或不佳表现
才有我们的降级/容错/限流等技术诞生



### 解决方法

>   超时导致服务器变慢(转圈)

超时不再等待



>   出错(宕机或程序运行出错)

出错要有兜底



>   解决

-   对方服务(8001)超时了，调用者(80)不能一直卡死等待，必须有服务降级
-   对方服务(8001)down机了，调用者(80)不能一直卡死等待，必须有服务降级
-   对方服务(8001)OK，调用者(80)自己出故障或有自我要求（自己的等待时间小于服务提供者），自己处理降级



### 服务降级

降级配置 : `@HystrixCommand`



#### 改进服务端

设置自身调用超时时间的峰值，峰值内可以正常运行，超过了需要有兜底的方法处理，作服务降级fallback



##### 业务类

```java
package com.yixihan.springcloud.service;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

/**
 * @author : yixihan
 * @create : 2022-01-18-14:39
 */
@Service
public class PaymentServiceImpl implements PaymentService {

    /**
     * 正常访问, 肯定 ok
     *
     * @param id id
     * @return info
     */
    @Override
    public String paymentInfoOk(Integer id) {
        return "线程池 : " + Thread.currentThread ().getName () + " paymentInfoOk, id : " + id + "\t hhhh";
    }

    /**
     * 超时访问
     * 一旦调用服务方法失败并抛出了错误信息后，会自动调用@HystrixCommand标注好的 fallbackMethod调用类中的指定方法
     * 超时或抛出异常都会执行 fallbackMethod 调用类中的指定方法
     * @param id id
     * @return info
     */
    @Override
    @HystrixCommand(fallbackMethod = "paymentInfoTimeoutHandler", commandProperties = {
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "3000")
    })
    public String paymentTimeout(Integer id) {
        int timeNumber = 5;
        int age = 10 / 0;
        try {
            TimeUnit.SECONDS.sleep (timeNumber);
        } catch (InterruptedException e) {
            e.printStackTrace ();
        }
        return "线程池 : " + Thread.currentThread ().getName () + " paymentTimeout, id : " + id + "\t hhhh, 耗时 " + timeNumber + " s";
    }



    public String paymentInfoTimeoutHandler(Integer id) {

        return "线程池 : " + Thread.currentThread ().getName () + " 调用接口超时或异常, 请稍后再试, " +
                "id : " + id + "\t xxxxx ";
    }

}

```



##### 主启动类

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;

/**
 * @author : yixihan
 * @create : 2022-01-18-14:38
 */
@SpringBootApplication
@EnableEurekaClient
@EnableHystrix
@EnableCircuitBreaker
@EnableDiscoveryClient
public class PaymentHystrixMain8002 {

    public static void main(String[] args) {
        SpringApplication.run (PaymentHystrixMain8002.class, args);
    }
}

```



##### 测试

[测试 url](http://localhost:8002/payment/hystrix/timeout/3)

![image-20220118164101955](/assets/imgs/SpringCloud2.assets/image-20220118164101955.png)



#### 改进客户端

80订单微服务，也可以更好的保护自己，自己也依样画葫芦进行客户端降级保护



>   谨记

我们自己配置过的热部署方式对java代码的改动明显

**但对@HystrixCommand内属性的修改建议重启微服务**



##### YAML

```yaml
server:
  port: 80

eureka:
  client:
    register-with-eureka: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka/,http://eureka7002.com:7002/eureka/

feign:
  hystrix:
    enabled: true

```



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * @author : yixihan
 * @create : 2022-01-18-15:48
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableHystrix
@EnableFeignClients
@EnableEurekaClient
public class OrderHystrixMain80 {

    public static void main(String[] args) {
        SpringApplication.run (OrderHystrixMain80.class, args);
    }
}

```



##### 业务类

```java
package com.yixihan.springcloud.controller;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import com.yixihan.springcloud.service.OrderHystrixService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-18-15:52
 */
@RestController
@RequestMapping("/consumer")
@Slf4j
public class OrderHystrixController {

    @Resource
    private OrderHystrixService orderHystrixService;

    @GetMapping("/payment/hystrix/ok/{id}")
    public String paymentInfoOk (@PathVariable("id") Integer id) {
        String result = orderHystrixService.paymentInfoOk (id);
        log.info (result);
        return result;
    }

    @GetMapping("/payment/hystrix/timeout/{id}")
    @HystrixCommand(fallbackMethod = "paymentTimeOutFallbackMethod",commandProperties = {
            @HystrixProperty(name="execution.isolation.thread.timeoutInMilliseconds",value="1500")
    })
    public String paymentTimeout (@PathVariable("id") Integer id) {
        String result = orderHystrixService.paymentTimeout (id);
        log.info (result);
        return result;
    }

    public String paymentTimeOutFallbackMethod (Integer id) {
        return "我是消费者80,对方支付系统繁忙请10秒钟后再试或者自己运行出错请检查自己,o(╥﹏╥)o";
    }

}

```



##### 测试

[测试 url](http://localhost/consumer/payment/hystrix/timeout/3)

![image-20220118170039258](/assets/imgs/SpringCloud2.assets/image-20220118170039258.png)



#### 目前问题

每个业务方法对应一个兜底的方法，代码膨胀

统一和自定义的分开



#### 解决问题



##### 每个方法配置一个？？？膨胀

![image-20220118172047537](/assets/imgs/SpringCloud2.assets/image-20220118172047537.png)

```java
package com.yixihan.springcloud.controller;

import com.netflix.hystrix.contrib.javanica.annotation.DefaultProperties;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.yixihan.springcloud.service.OrderHystrixService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-18-15:52
 */
@RestController
@RequestMapping("/consumer")
@Slf4j
@DefaultProperties(defaultFallback = "paymentGlobalFallbackMethod")
public class OrderHystrixController {

    @Resource
    private OrderHystrixService orderHystrixService;

    @GetMapping("/payment/hystrix/ok/{id}")
    public String paymentInfoOk (@PathVariable("id") Integer id) {
        String result = orderHystrixService.paymentInfoOk (id);
        log.info (result);
        return result;
    }


    /**
     * 若 @HystrixCommand 注解没有指定 fallbackMethod, 则会调用全局的 fallbackMethod 方法
     */
    @GetMapping("/payment/hystrix/timeout/{id}")
//    @HystrixCommand(fallbackMethod = "paymentTimeOutFallbackMethod",commandProperties = {
//            @HystrixProperty(name="execution.isolation.thread.timeoutInMilliseconds",value="1500")
//    })
    @HystrixCommand
    public String paymentTimeout (@PathVariable("id") Integer id) {
        int age = 10 / 0;
        String result = orderHystrixService.paymentTimeout (id);
        log.info (result);
        return result;
    }

    public String paymentTimeOutFallbackMethod (Integer id) {
        return "我是消费者80,对方支付系统繁忙请10秒钟后再试或者自己运行出错请检查自己,o(╥﹏╥)o";
    }


    /**
     * 全局 fallback 方法
     */
    public String paymentGlobalFallbackMethod () {
        return "Global异常处理信息，请稍后再试，/(ㄒoㄒ)/~~";
    }

}

```



>   测试

![image-20220118170955440](/assets/imgs/SpringCloud2.assets/image-20220118170955440.png)



##### 和业务逻辑混一起？？？混乱

本次案例服务降级处理是在客户端80实现完成的，与服务端8001没有关系, 只需要为Feign客户端定义的接口添加一个服务降级处理的实现类即可实现解耦



>   未来我们要面对的异常

-   运行
-   超时
-   宕机



>   业务类 PaymentController 的问题

![image-20220118180102859](/assets/imgs/SpringCloud2.assets/image-20220118180102859.png)

混合在一块 ，每个业务方法都要提供一个 fallbackMethod 方法



**解决方法 : 根据cloud-consumer-feign-hystrix-order80已经有的PaymentHystrixService接口，重新新建一个类(PaymentFallbackService)实现该接口，统一为接口里面的方法进行异常处理**



>   PaymentFallbackService 类实现 OrderHystrixService 接口

```java
package com.yixihan.springcloud.service;

import org.springframework.stereotype.Component;

/**
 * @author : yixihan
 * @create : 2022-01-18-17:27
 */
@Component
public class PaymentFallbackService implements OrderHystrixService{

    @Override
    public String paymentInfoOk(Integer id) {
        return "----PaymentFallbackService fall back paymentInfoOk";
    }

    @Override
    public String paymentTimeout(Integer id) {
        return "----PaymentFallbackService fall back paymentTimeout";
    }
}

```



>   OrderHystrixService  修改 @FeignClient 注解

```java
package com.yixihan.springcloud.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author : yixihan
 * @create : 2022-01-18-15:50
 */
@Component
@FeignClient(value = "CLOUD-PROVIDER-HYSTRIX-PAYMENT", fallback = PaymentFallbackService.class)
public interface OrderHystrixService {

    @GetMapping("/payment/hystrix/ok/{id}")
    String paymentInfoOk (@PathVariable("id") Integer id);

    @GetMapping("/payment/hystrix/timeout/{id}")
    String paymentTimeout (@PathVariable("id") Integer id);
}

```



>   修改 YAML 配置

```yaml
server:
  port: 80

eureka:
  client:
    register-with-eureka: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka/,http://eureka7002.com:7002/eureka/

feign:
  hystrix:
    enabled: true

```



>   controller

```java
package com.yixihan.springcloud.controller;

import com.netflix.hystrix.contrib.javanica.annotation.DefaultProperties;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.yixihan.springcloud.service.OrderHystrixService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-18-15:52
 */
@RestController
@RequestMapping("/consumer")
@Slf4j
@DefaultProperties(defaultFallback = "paymentGlobalFallbackMethod")
public class OrderHystrixController {

    @Resource
    private OrderHystrixService orderHystrixService;

    @GetMapping("/payment/hystrix/ok/{id}")
    public String paymentInfoOk (@PathVariable("id") Integer id) {
        String result = orderHystrixService.paymentInfoOk (id);
        log.info (result);
        return result;
    }


    /**
     * 若 @HystrixCommand 注解没有指定 fallbackMethod, 则会调用全局的 fallbackMethod 方法
     */
    @GetMapping("/payment/hystrix/timeout/{id}")
//    @HystrixCommand(fallbackMethod = "paymentTimeOutFallbackMethod",commandProperties = {
//            @HystrixProperty(name="execution.isolation.thread.timeoutInMilliseconds",value="1500")
//    })
    @HystrixCommand
    public String paymentTimeout (@PathVariable("id") Integer id) {
//        int age = 10 / 0;
        String result = orderHystrixService.paymentTimeout (id);
        log.info (result);
        return result;
    }

    public String paymentTimeOutFallbackMethod (Integer id) {
        return "我是消费者80,对方支付系统繁忙请10秒钟后再试或者自己运行出错请检查自己,o(╥﹏╥)o";
    }


    /**
     * 全局 fallback 方法
     */
    public String paymentGlobalFallbackMethod () {
        return "Global异常处理信息，请稍后再试，/(ㄒoㄒ)/~~";
    }

}

```





>   测试

正常情况

![image-20220118181038304](/assets/imgs/SpringCloud2.assets/image-20220118181038304.png)

服务端宕机

![image-20220118181059574](/assets/imgs/SpringCloud2.assets/image-20220118181059574.png)



ps :

-   若在 controller 类中加了 `@DefaultProperties(defaultFallback = "paymentGlobalFallbackMethod")` 且 方法上加了 `@HystrixCommand` 注解, 会优先调用 controller 类中的 defaultFallback 方法
-   若在方法上加了 `@HystrixCommand` 注解且指定了 fallbackMethod 方法, 会优先调用 fallbackMethod  方法
-   客户端接口中不能有异常抛出

![image-20220118181405069](/assets/imgs/SpringCloud2.assets/image-20220118181405069.png)



### 服务熔断



#### 断路器

一句话就是家里的保险丝



#### 熔断是什么

>   熔断机制概述

熔断机制是应对雪崩效应的一种微服务链路保护机制。当扇出链路的某个微服务出错不可用或者响应时间太长时，会进行服务的降级，进而熔断该节点微服务的调用，快速返回错误的响应信息。



**当检测到该节点微服务调用响应正常后，恢复调用链路。**



在Spring Cloud框架里，熔断机制通过Hystrix实现。Hystrix会监控微服务间调用的状况，当失败的调用到一定阈值，缺省是5秒内20次调用失败，就会启动熔断机制。熔断机制的注解是@HystrixCommand。



>   大神论文

[论文地址](https://martinfowler.com/bliki/CircuitBreaker.html)

![image-20220119071731311](/assets/imgs/SpringCloud2.assets/image-20220119071731311.png)

#### 实操



##### service

>   接口

```java
package com.yixihan.springcloud.service;

/**
 * @author : yixihan
 * @create : 2022-01-18-14:39
 */
public interface PaymentService {

    String paymentInfoOk (Integer id);

    String paymentTimeout (Integer id);

    String paymentCircuitBreaker(Integer id);
}

```



>   实现类

```java
package com.yixihan.springcloud.service;

import cn.hutool.core.util.IdUtil;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.concurrent.TimeUnit;

/**
 * @author : yixihan
 * @create : 2022-01-18-14:39
 */
@Service
public class PaymentServiceImpl implements PaymentService {

    /**
     * 正常访问, 肯定 ok
     *
     * @param id id
     * @return info
     */
    @Override
    public String paymentInfoOk(Integer id) {
        return "线程池 : " + Thread.currentThread ().getName () + " paymentInfoOk, id : " + id + "\t hhhh";
    }

    /**
     * 超时访问
     *
     * @param id id
     * @return info
     */
    @Override
    @HystrixCommand(fallbackMethod = "paymentInfoTimeoutHandler", commandProperties = {
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "3000")
    })
    public String paymentTimeout(Integer id) {
        int timeNumber = 5;
        try {
            TimeUnit.SECONDS.sleep (timeNumber);
        } catch (InterruptedException e) {
            e.printStackTrace ();
        }
        return "线程池 : " + Thread.currentThread ().getName () + " paymentTimeout, id : " + id + "\t hhhh, 耗时 " + timeNumber + " s";
    }

    public String paymentInfoTimeoutHandler(Integer id) {

        return "线程池 : " + Thread.currentThread ().getName () + " 调用接口超时或异常, 请稍后再试, " +
                "id : " + id + "\t xxxxx ";
    }

    /*
    服务熔断
     */
    @Override
    @HystrixCommand(fallbackMethod = "paymentCircuitBreakerFallback",commandProperties = {
            // 是否开启断路器
            @HystrixProperty(name = "circuitBreaker.enabled",value = "true"),
            // 请求次数
            @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold",value = "10"),
            //时间窗口期
            @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds",value = "10000"),
            //失败率达到多少后跳闸
            @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage",value = "60"),
    })
    public String paymentCircuitBreaker(@PathVariable("id") Integer id)
    {
        if(id < 0)
        {
            throw new RuntimeException("******id 不能负数");
        }
        String serialNumber = IdUtil.simpleUUID();

        return Thread.currentThread().getName()+"\t"+"调用成功，流水号: " + serialNumber;
    }

    public String paymentCircuitBreakerFallback(@PathVariable("id") Integer id)
    {
        return "id 不能负数，请稍后再试，/(ㄒoㄒ)/~~   id: " +id;
    }

}

```



>   controller

```java
package com.yixihan.springcloud.controller;

import com.yixihan.springcloud.service.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-18-14:44
 */
@RestController
@Slf4j
@RequestMapping("/payment")
public class PaymentController {

    @Resource
    private PaymentService paymentService;

    @Value ("${server.port")
    private String serverPort;

    @GetMapping("/hystrix/ok/{id}")
    String paymentInfoOk (@PathVariable ("id") Integer id) {
        String result = paymentService.paymentInfoOk (id);

        log.info (result);
        return result;
    }

    @GetMapping("/hystrix/timeout/{id}")
    public String paymentTimeout (@PathVariable ("id")Integer id) {
        String result = paymentService.paymentTimeout (id);

        log.info (result);
        return result;
    }

    /*
    服务熔断
     */
    @GetMapping("/hystrix/circuit/{id}")
    public String paymentCircuitBreaker (@PathVariable("id") Integer id) {
        String result = paymentService.paymentCircuitBreaker (id);

        log.info (result);
        return result;
    }

}

```



##### 测试

[正确 id - url](http://localhost:8001/payment/hystrix/circuit/21)

[错误 id - url](http://localhost:8001/payment/hystrix/circuit/-21)



>   正确 id

![image-20220119075116632](/assets/imgs/SpringCloud2.assets/image-20220119075116632.png)



>   错误 id

![image-20220119075132709](/assets/imgs/SpringCloud2.assets/image-20220119075132709.png)



>   多次错误 id 之后输入正确 id

![image-20220119074841117](/assets/imgs/SpringCloud2.assets/image-20220119074841117.png)



#### 总结

>   大神结论

![image-20220119075228090](/assets/imgs/SpringCloud2.assets/image-20220119075228090.png)



##### 熔断类型

>   熔断打开

请求不再进行调用当前服务，内部设置时钟一般为MTTR（平均故障处理时间)，当打开时长达到所设时钟则进入半熔断状态



>   熔断关闭

熔断关闭不会对服务进行熔断



>   熔断半开

部分请求根据规则调用当前服务，如果请求成功且符合规则则认为当前服务恢复正常，关闭熔断



##### 官网断路器流程图

![image-20220119075336867](/assets/imgs/SpringCloud2.assets/image-20220119075336867.png)



>   官网步骤

![image-20220119075351027](/assets/imgs/SpringCloud2.assets/image-20220119075351027.png)



##### 断路器在什么情况下开始起作用

![image-20220119075434236](/assets/imgs/SpringCloud2.assets/image-20220119075434236.png)

涉及到断路器的三个重要参数：快照时间窗、请求总数阀值、错误百分比阀值。

1.   快照时间窗：断路器确定是否打开需要统计一些请求和错误数据，而统计的时间范围就是快照时间窗，默认为最近的10秒。
2.   请求总数阀值：在快照时间窗内，必须满足请求总数阀值才有资格熔断。默认为20，意味着在10秒内，如果该hystrix命令的调用次数不足20次，即使所有的请求都超时或其他原因失败，断路器都不会打开。
3.   错误百分比阀值：当请求总数在快照时间窗内超过了阀值，比如发生了30次调用，如果在这30次调用中，有15次发生了超时异常，也就是超过50%的错误百分比，在默认设定50%阀值情况下，这时候就会将断路器打开。



##### 断路器开启或者关闭的条件

-   当满足一定的阀值的时候（默认10秒内超过20个请求次数）
-   当失败率达到一定的时候（默认10秒内超过50%的请求失败）
-   到达以上阀值，断路器将会开启
-   当开启的时候，所有请求都不会进行转发
-   一段时间之后（默认是5秒），这个时候断路器是半开状态，会让其中一个请求进行转发。
    如果成功，断路器会关闭，若失败，继续开启。重复4和5



##### 断路器打开之后

1.   再有请求调用的时候，将不会调用主逻辑，而是直接调用降级fallback。通过断路器，实现了自动地发现错误并将降级逻辑切换为主逻辑，减少响应延迟的效果。

2.   原来的主逻辑要如何恢复呢？

     对于这一问题，hystrix也为我们实现了自动恢复功能。
     	当断路器打开，对主逻辑进行熔断之后，hystrix会启动一个休眠时间窗，在这个时间窗内，降级逻辑是临时的成为主逻辑，
     	当休眠时间窗到期，断路器将进入半开状态，释放一次请求到原来的主逻辑上，如果此次请求正常返回，那么断路器将继续闭合，主逻辑恢复，如果这次请求依然有问题，断路器继续进入打开状态，休眠时间窗重新计时。



##### ALL 配置

```java
//========================All
@HystrixCommand(fallbackMethod = "str_fallbackMethod",
                groupKey = "strGroupCommand",
                commandKey = "strCommand",
                threadPoolKey = "strThreadPool",

                commandProperties = {
                    // 设置隔离策略，THREAD 表示线程池 SEMAPHORE：信号池隔离
                    @HystrixProperty(name = "execution.isolation.strategy", value = "THREAD"),
                    // 当隔离策略选择信号池隔离的时候，用来设置信号池的大小（最大并发数）
                    @HystrixProperty(name = "execution.isolation.semaphore.maxConcurrentRequests", value = "10"),
                    // 配置命令执行的超时时间
                    @HystrixProperty(name = "execution.isolation.thread.timeoutinMilliseconds", value = "10"),
                    // 是否启用超时时间
                    @HystrixProperty(name = "execution.timeout.enabled", value = "true"),
                    // 执行超时的时候是否中断
                    @HystrixProperty(name = "execution.isolation.thread.interruptOnTimeout", value = "true"),
                    // 执行被取消的时候是否中断
                    @HystrixProperty(name = "execution.isolation.thread.interruptOnCancel", value = "true"),
                    // 允许回调方法执行的最大并发数
                    @HystrixProperty(name = "fallback.isolation.semaphore.maxConcurrentRequests", value = "10"),
                    // 服务降级是否启用，是否执行回调函数
                    @HystrixProperty(name = "fallback.enabled", value = "true"),
                    // 是否启用断路器
                    @HystrixProperty(name = "circuitBreaker.enabled", value = "true"),
                    // 该属性用来设置在滚动时间窗中，断路器熔断的最小请求数。例如，默认该值为 20 的时候，
                    // 如果滚动时间窗（默认10秒）内仅收到了19个请求， 即使这19个请求都失败了，断路器也不会打开。
                    @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "20"),
                    // 该属性用来设置在滚动时间窗中，表示在滚动时间窗中，在请求数量超过
                    // circuitBreaker.requestVolumeThreshold 的情况下，如果错误请求数的百分比超过50,
                    // 就把断路器设置为 "打开" 状态，否则就设置为 "关闭" 状态。
                    @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "50"),
                    // 该属性用来设置当断路器打开之后的休眠时间窗。 休眠时间窗结束之后，
                    // 会将断路器置为 "半开" 状态，尝试熔断的请求命令，如果依然失败就将断路器继续设置为 "打开" 状态，
                    // 如果成功就设置为 "关闭" 状态。
                    @HystrixProperty(name = "circuitBreaker.sleepWindowinMilliseconds", value = "5000"),
                    // 断路器强制打开
                    @HystrixProperty(name = "circuitBreaker.forceOpen", value = "false"),
                    // 断路器强制关闭
                    @HystrixProperty(name = "circuitBreaker.forceClosed", value = "false"),
                    // 滚动时间窗设置，该时间用于断路器判断健康度时需要收集信息的持续时间
                    @HystrixProperty(name = "metrics.rollingStats.timeinMilliseconds", value = "10000"),
                    // 该属性用来设置滚动时间窗统计指标信息时划分"桶"的数量，断路器在收集指标信息的时候会根据
                    // 设置的时间窗长度拆分成多个 "桶" 来累计各度量值，每个"桶"记录了一段时间内的采集指标。
                    // 比如 10 秒内拆分成 10 个"桶"收集这样，所以 timeinMilliseconds 必须能被 numBuckets 整除。否则会抛异常
                    @HystrixProperty(name = "metrics.rollingStats.numBuckets", value = "10"),
                    // 该属性用来设置对命令执行的延迟是否使用百分位数来跟踪和计算。如果设置为 false, 那么所有的概要统计都将返回 -1。
                    @HystrixProperty(name = "metrics.rollingPercentile.enabled", value = "false"),
                    // 该属性用来设置百分位统计的滚动窗口的持续时间，单位为毫秒。
                    @HystrixProperty(name = "metrics.rollingPercentile.timeInMilliseconds", value = "60000"),
                    // 该属性用来设置百分位统计滚动窗口中使用 “ 桶 ”的数量。
                    @HystrixProperty(name = "metrics.rollingPercentile.numBuckets", value = "60000"),
                    // 该属性用来设置在执行过程中每个 “桶” 中保留的最大执行次数。如果在滚动时间窗内发生超过该设定值的执行次数，
                    // 就从最初的位置开始重写。例如，将该值设置为100, 滚动窗口为10秒，若在10秒内一个 “桶 ”中发生了500次执行，
                    // 那么该 “桶” 中只保留 最后的100次执行的统计。另外，增加该值的大小将会增加内存量的消耗，并增加排序百分位数所需的计算时间。
                    @HystrixProperty(name = "metrics.rollingPercentile.bucketSize", value = "100"),
                    // 该属性用来设置采集影响断路器状态的健康快照（请求的成功、 错误百分比）的间隔等待时间。
                    @HystrixProperty(name = "metrics.healthSnapshot.intervalinMilliseconds", value = "500"),
                    // 是否开启请求缓存
                    @HystrixProperty(name = "requestCache.enabled", value = "true"),
                    // HystrixCommand的执行和事件是否打印日志到 HystrixRequestLog 中
                    @HystrixProperty(name = "requestLog.enabled", value = "true"),
                },
                threadPoolProperties = {
                    // 该参数用来设置执行命令线程池的核心线程数，该值也就是命令执行的最大并发量
                    @HystrixProperty(name = "coreSize", value = "10"),
                    // 该参数用来设置线程池的最大队列大小。当设置为 -1 时，线程池将使用 SynchronousQueue 实现的队列，
                    // 否则将使用 LinkedBlockingQueue 实现的队列。
                    @HystrixProperty(name = "maxQueueSize", value = "-1"),
                    // 该参数用来为队列设置拒绝阈值。 通过该参数， 即使队列没有达到最大值也能拒绝请求。
                    // 该参数主要是对 LinkedBlockingQueue 队列的补充,因为 LinkedBlockingQueue
                    // 队列不能动态修改它的对象大小，而通过该属性就可以调整拒绝请求的队列大小了。
                    @HystrixProperty(name = "queueSizeRejectionThreshold", value = "5"),
                }
               )
public String strConsumer() {
    return "hello 2020";
}
public String str_fallbackMethod()
{
    return "*****fall back str_fallbackMethod";
}
```



### 服务限流

后面高级篇讲解alibaba的Sentinel说明



### hystrix工作流程

[官网讲解](https://github.com/Netflix/Hystrix/wiki/How-it-Works)

![image-20220119080037618](/assets/imgs/SpringCloud2.assets/image-20220119080037618.png)



#### 官网图例

![image-20220119080107132](/assets/imgs/SpringCloud2.assets/image-20220119080107132.png)



#### 步骤说明

1.   创建 HystrixCommand（用在依赖的服务返回单个操作结果的时候） 或 HystrixObserableCommand（用在依赖的服务返回多个操作结果的时候） 对象。
2.   命令执行。其中 HystrixComand 实现了下面前两种执行方式；而 HystrixObservableCommand 实现了后两种执行方式：execute()：同步执行，从依赖的服务返回一个单一的结果对象， 或是在发生错误的时候抛出异常。queue()：异步执行， 直接返回 一个Future对象， 其中包含了服务执行结束时要返回的单一结果对象。observe()：返回 Observable 对象，它代表了操作的多个结果，它是一个 Hot Obserable（不论 "事件源" 是否有 "订阅者"，都会在创建后对事件进行发布，所以对于 Hot Observable 的每一个 "订阅者" 都有可能是从 "事件源" 的中途开始的，并可能只是看到了整个操作的局部过程）。toObservable()： 同样会返回 Observable 对象，也代表了操作的多个结果，但它返回的是一个Cold Observable（没有 "订阅者" 的时候并不会发布事件，而是进行等待，直到有 "订阅者" 之后才发布事件，所以对于 Cold Observable 的订阅者，它可以保证从一开始看到整个操作的全部过程）。
3.   若当前命令的请求缓存功能是被启用的， 并且该命令缓存命中， 那么缓存的结果会立即以 Observable 对象的形式 返回。
4.   检查断路器是否为打开状态。如果断路器是打开的，那么Hystrix不会执行命令，而是转接到 fallback 处理逻辑（第 8 步）；如果断路器是关闭的，检查是否有可用资源来执行命令（第 5 步）。
5.   线程池/请求队列/信号量是否占满。如果命令依赖服务的专有线程池和请求队列，或者信号量（不使用线程池的时候）已经被占满， 那么 Hystrix 也不会执行命令， 而是转接到 fallback 处理逻辑（第8步）。
6.   Hystrix 会根据我们编写的方法来决定采取什么样的方式去请求依赖服务。HystrixCommand.run() ：返回一个单一的结果，或者抛出异常。HystrixObservableCommand.construct()： 返回一个Observable 对象来发射多个结果，或通过 onError 发送错误通知。
7.   Hystrix会将 "成功"、"失败"、"拒绝"、"超时" 等信息报告给断路器， 而断路器会维护一组计数器来统计这些数据。断路器会使用这些统计数据来决定是否要将断路器打开，来对某个依赖服务的请求进行 "熔断/短路"。
8.   当命令执行失败的时候， Hystrix 会进入 fallback 尝试回退处理， 我们通常也称该操作为 "服务降级"。而能够引起服务降级处理的情况有下面几种：第4步： 当前命令处于"熔断/短路"状态，断路器是打开的时候。第5步： 当前命令的线程池、 请求队列或 者信号量被占满的时候。第6步：HystrixObservableCommand.construct() 或 HystrixCommand.run() 抛出异常的时候。
9.   当Hystrix命令执行成功之后， 它会将处理结果直接返回或是以Observable 的形式返回。



tips : tips：如果我们没有为命令实现降级逻辑或者在降级处理逻辑中抛出了异常， Hystrix 依然会返回一个 Observable 对象， 但是它不会发射任何结果数据， 而是通过 onError 方法通知命令立即中断请求，并通过onError()方法将引起命令失败的异常发送给调用者。



### 服务监控hystrixDashboard



#### 概述

除了隔离依赖服务的调用以外，Hystrix还提供了**准实时的调用监控（Hystrix Dashboard）**，Hystrix会持续地记录所有通过Hystrix发起的请求的执行信息，并以统计报表和图形的形式展示给用户，包括每秒执行多少请求多少成功，多少失败等。Netflix通过hystrix-metrics-event-stream项目实现了对以上指标的监控。Spring Cloud也提供了Hystrix Dashboard的整合，对监控内容转化成可视化界面。



#### 仪表盘9001



##### 建 module

module 名 : cloud-consumer-hystrix-dashboard9001



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

    <artifactId>cloud-consumer-hystrix-dashboard9001</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
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



##### 写 YAML

```yaml
server:
  port: 9001

hystrix:
  dashboard:
    proxy-stream-allow-list: "*"
```



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.hystrix.dashboard.EnableHystrixDashboard;

/**
 * @author : yixihan
 * @create : 2022-01-19-8:12
 */
@SpringBootApplication
@EnableHystrixDashboard
public class HystrixDashboardMain9001 {

    public static void main(String[] args) {
        SpringApplication.run (HystrixDashboardMain9001.class, args);
    }
}

```



##### 注意点

所有Provider微服务提供类(8001/8002)都需要监控依赖配置

```xml
<!-- actuator监控信息完善 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

```



##### 测试

[hystrix 控制台](http://localhost:9001/hystrix)

![image-20220119081854289](/assets/imgs/SpringCloud2.assets/image-20220119081854289.png)

#### 断路器演示(服务监控hystrixDashboard)



##### 修改 服务提供者

>   YAML

```yaml
server:
  port: 8001

spring:
  application:
    name: cloud-provider-hystrix-payment

eureka:
  client:
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka

management:
  endpoints:
    web:
      exposure:
        include: "*"
```



>   主启动

```java
package com.yixihan.springcloud;

import com.netflix.hystrix.contrib.metrics.eventstream.HystrixMetricsStreamServlet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

/**
 * @author : yixihan
 * @create : 2022-01-18-14:38
 */
@SpringBootApplication
@EnableEurekaClient
@EnableCircuitBreaker
@EnableDiscoveryClient
public class PaymentHystrixMain8001 {

    public static void main(String[] args) {
        SpringApplication.run (PaymentHystrixMain8001.class, args);
    }

    /**
     *此配置是为了服务监控而配置，与服务容错本身无关，springcloud升级后的坑
     *ServletRegistrationBean因为springboot的默认路径不是"/hystrix.stream"，
     *只要在自己的项目里配置上下面的servlet就可以了
     */
    @Bean
    public ServletRegistrationBean getServlet() {
        HystrixMetricsStreamServlet streamServlet = new HystrixMetricsStreamServlet();
        ServletRegistrationBean registrationBean = new ServletRegistrationBean(streamServlet);
        registrationBean.setLoadOnStartup(1);
        registrationBean.addUrlMappings("/hystrix.stream");
        registrationBean.setName("HystrixMetricsStreamServlet");
        return registrationBean;
    }
}

```





##### 监控测试

>   填写监控地址

![image-20220119084543997](/assets/imgs/SpringCloud2.assets/image-20220119084543997.png)



ps : 测试之前最好访问几次接口, 确保返回几次正确错误结果再开始监控



>   监控结果，失败

![image-20220119083955068](/assets/imgs/SpringCloud2.assets/image-20220119083955068.png)



>   监控结果，成功

![image-20220119084014981](/assets/imgs/SpringCloud2.assets/image-20220119084014981.png)



##### 监控窗口查看方法

>   7色

![image-20220119084746866](/assets/imgs/SpringCloud2.assets/image-20220119084746866.png)



>   一圈

![image-20220119084813254](/assets/imgs/SpringCloud2.assets/image-20220119084813254.png)

实心圆：共有两种含义。它通过颜色的变化代表了实例的健康程度，它的健康度从 绿色 < 黄色 < 橙色 < 红色递减。

该实心圆除了颜色的变化之外，它的大小也会根据实例的请求流量发生变化，流量越大该实心圆就越大。所以通过该实心圆的展示，就可以在大量的实例中快速的发现**故障实例和高压力实例**。



>   1线

![image-20220119084927629](/assets/imgs/SpringCloud2.assets/image-20220119084927629.png)

曲线：用来记录2分钟内流量的相对变化，可以通过它来观察到流量的上升和下降趋势。



>   整图说明

![image-20220119084944018](/assets/imgs/SpringCloud2.assets/image-20220119084944018.png)

![image-20220119084950514](/assets/imgs/SpringCloud2.assets/image-20220119084950514.png)



>   复杂一点儿的图

![image-20220119085004928](/assets/imgs/SpringCloud2.assets/image-20220119085004928.png)

