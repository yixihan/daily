---
title: SpringCloud3
date: 2022-02-22
tags:
 - SpringCloud
 - SpringCloud Config
 - SpringCloud Bus
 - SpringCloud Stream
 - SpringCloud Sleuth
categories:
 - SpringCloud
---

# SpringCloud



## zuul路由网关

不讲

[脑图在此](D:\JAVA\笔记\尚硅谷SpringCloud（Alibaba）\尚硅谷SpringCloud第2季当堂代码和脑图笔记2020.2.29\SpringCloud2020.mmap)



## Gateway新一代网关



### 概述



#### 官网

>   zull 1.x

[zull github官网](https://github.com/Netflix/zuul/wiki)



>   gateway

[gateway 官网](https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.1.RELEASE/reference/html/)



#### gateway 概述

Gateway是在Spring生态系统之上构建的API网关服务，基于Spring 5，Spring Boot 2和 Project Reactor等技术。

Gateway旨在提供一种简单而有效的方式来对API进行路由，以及提供一些强大的过滤器功能， 例如：熔断、限流、重试等

SpringCloud Gateway 是 Spring Cloud 的一个全新项目，基于 Spring 5.0+Spring Boot 2.0 和 Project Reactor 等技术开发的网关，它旨在为微服务架构提供一种简单有效的统一的 API 路由管理方式。

SpringCloud Gateway 作为 Spring Cloud 生态系统中的网关，目标是替代 Zuul，在Spring Cloud 2.0以上版本中，没有对新版本的Zuul 2.0以上最新高性能版本进行集成，仍然还是使用的Zuul 1.x非Reactor模式的老版本。而为了提升网关的性能，SpringCloud Gateway是基于WebFlux框架实现的，而WebFlux框架底层则使用了高性能的Reactor模式通信框架Netty。

Spring Cloud Gateway的目标提供统一的路由方式且基于 Filter 链的方式提供了网关基本的功能，例如：安全，监控/指标，和限流。



>   总结

使用的Webflux中的reactor-netty响应式编程组件，底层使用了Netty通讯框架。



#### gateway 功能

-   反向代理
-   鉴权
-   流量控制
-   熔断
-   日志监控
-   ...



#### 微服务架构中网关在哪里

![image-20220119091135975](/assets/imgs/SpringCloud3.assets/image-20220119091135975.png)



#### Zuul 和 gateway 比较

>   我们为什么选择Gateway？

1.   neflix不太靠谱，zuul2.0一直跳票，迟迟不发布

     一方面因为Zuul1.0已经进入了维护阶段，而且Gateway是SpringCloud团队研发的，是亲儿子产品，值得信赖。而且很多功能Zuul都没有用起来也非常的简单便捷。

     Gateway是基于**异步非阻塞模型**上进行开发的，性能方面不需要担心。虽然Netflix早就发布了最新的 Zuul 2.x，但 Spring Cloud 貌似没有整合计划。而且Netflix相关组件都宣布进入维护期；不知前景如何？

     

2.   SpringCloud Gateway具有如下特性
     -   **基于Spring Framework 5, Project Reactor 和 Spring Boot 2.0 进行构建；**
     -   动态路由：能够匹配任何请求属性；
     -   可以对路由指定 Predicate（断言）和 Filter（过滤器）；
     -   集成Hystrix的断路器功能；
     -   集成 Spring Cloud 服务发现功能；
     -   易于编写的 Predicate（断言）和 Filter（过滤器）；
     -   请求限流功能；
     -   支持路径重写。

3.   SpringCloud Gateway 与 Zuul的区别
     -   Zuul 1.x，是一个基于阻塞 I/ O 的 API Gateway
     -   Zuul 1.x **基于Servlet 2. 5使用阻塞架构**它不支持任何长连接(如 WebSocket) Zuul 的设计模式和Nginx较像，每次 I/ O 操作都是从工作线程中选择一个执行，请求线程被阻塞到工作线程完成，但是差别是Nginx 用C++ 实现，Zuul 用 Java 实现，而 JVM 本身会有第一次加载较慢的情况，使得Zuul 的性能相对较差。
     -   Zuul 2.x理念更先进，想基于Netty非阻塞和支持长连接，但SpringCloud目前还没有整合。 Zuul 2.x的性能较 Zuul 1.x 有较大提升。在性能方面，根据官方提供的基准测试， Spring Cloud Gateway 的 RPS（每秒请求数）是Zuul 的 1. 6 倍。
     -   Spring Cloud Gateway 建立 在 Spring Framework 5、 Project Reactor 和 Spring Boot 2 之上， 使用非阻塞 API。
     -   Spring Cloud Gateway 还 支持 WebSocket， 并且与Spring紧密集成拥有更好的开发体验



##### Zuul 1.x 模型

Springcloud中所集成的Zuul版本，采用的是Tomcat容器，使用的是传统的Servlet IO处理模型。

学过尚硅谷web中期课程都知道一个题目，Servlet的生命周期?servlet由servlet container进行生命周期管理。

container启动时构造servlet对象并调用servlet init()进行初始化；

container运行时接受请求，并为每个请求分配一个线程（一般从线程池中获取空闲线程）然后调用service()。

container关闭时调用servlet destory()销毁servlet；

![image-20220119091859371](/assets/imgs/SpringCloud3.assets/image-20220119091859371.png)



>   上述模式的缺点：

servlet是一个简单的网络IO模型，当请求进入servlet container时，servlet container就会为其绑定一个线程，在**并发不高的场景下**这种模型是适用的。但是一旦高并发(比如抽风用jemeter压)，线程数量就会上涨，而线程资源代价是昂贵的（上线文切换，内存消耗大）严重影响请求的处理时间。在一些简单业务场景下，不希望为每个request分配一个线程，只需要1个或几个线程就能应对极大并发的请求，这种业务场景下servlet模型没有优势

所以Zuul 1.X是**基于servlet之上的一个阻塞式处理模型**，即spring实现了处理所有request请求的一个servlet（DispatcherServlet）并由该servlet阻塞式处理处理。所以Springcloud Zuul无法摆脱servlet模型的弊端



##### GateWay模型

>   WebFlux

[官网](https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html#webflux-new-framework)

![image-20220119092012123](/assets/imgs/SpringCloud3.assets/image-20220119092012123.png)

传统的Web框架，比如说：struts2，springmvc等都是基于Servlet API与Servlet容器基础之上运行的。

但是在**Servlet3.1之后有了异步非阻塞的支持**。而WebFlux是一个典型非阻塞异步的框架，它的核心是基于Reactor的相关API实现的。相对于传统的web框架来说，它可以运行在诸如Netty，Undertow及支持Servlet3.1的容器上。非阻塞式+函数式编程（Spring5必须让你使用java8）

Spring WebFlux 是 Spring 5.0 引入的新的响应式框架，区别于 Spring MVC，它不需要依赖Servlet API，它是完全异步非阻塞的，并且基于 Reactor 来实现响应式流规范。



### 三大核心概念



#### Route(路由)

路由是构建网关的基本模块，它由ID，目标URI，一系列的断言和过滤器组成，如果断言为true则匹配该路由



#### Predicate(断言)

参考的是Java8的java.util.function.Predicate. 

开发人员可以匹配HTTP请求中的所有内容(例如请求头或请求参数)，如果请求与断言相匹配则进行路由



#### Filter(过滤)

指的是Spring框架中GatewayFilter的实例，使用过滤器，可以在请求被路由前或者之后对请求进行修改。



#### 总结

![image-20220119092232399](/assets/imgs/SpringCloud3.assets/image-20220119092232399.png)

web请求，通过一些匹配条件，定位到真正的服务节点。并在这个转发过程的前后，进行一些精细化控制。

predicate就是我们的匹配条件；

而filter，就可以理解为一个无所不能的拦截器。有了这两个元素，再加上目标uri，就可以实现一个具体的路由了



### gateway 工作流程

![image-20220119092644866](/assets/imgs/SpringCloud3.assets/image-20220119092644866.png)

![image-20220119092649451](/assets/imgs/SpringCloud3.assets/image-20220119092649451.png)

客户端向 Spring Cloud Gateway 发出请求。然后在 Gateway Handler Mapping 中找到与请求相匹配的路由，将其发送到 Gateway Web Handler。

Handler 再通过指定的过滤器链来将请求发送到我们实际的服务执行业务逻辑，然后返回。

过滤器之间用虚线分开是因为过滤器可能会在发送代理请求之前（“pre”）或之后（“post”）执行业务逻辑。

Filter在“pre”类型的过滤器可以做参数校验、权限校验、流量监控、日志输出、协议转换等，在“post”类型的过滤器中可以做响应内容、响应头的修改，日志的输出，流量监控等有着非常重要的作用。



#### 核心逻辑

路由转发+执行过滤器链



### 入门配置



#### 建 module

module 名 : cloud-gateway-gateway9527



#### 改 POM

**注意 : 不需要引入 web 和 actuator 依赖**

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

    <artifactId>cloud-gateway-gateway9527</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <!--gateway-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
        </dependency>
        <!--eureka-client-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.yixihan.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
        <!--一般基础配置类-->
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
  port: 9527

spring:
  application:
    name: cloud-gateway
  cloud:
    gateway:
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          uri: http://localhost:8001          #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由

        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          uri: http://localhost:8001          #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由

eureka:
  instance:
    hostname: cloud-gateway-service
  client: #服务提供者provider注册进eureka服务列表内
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
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

/**
 * @author : yixihan
 * @create : 2022-01-19-9:38
 */
@SpringBootApplication
@EnableEurekaClient
public class GateWayMain9527 {

    public static void main(String[] args) {
        SpringApplication.run (GateWayMain9527.class, args);
    }
}

```



#### 测试

启动 7001, 7002, cloud-provider-payment8001, 9527



[添加网关前](http://localhost:8001/payment/get/1)

[添加网关后](http://localhost:9527/payment/get/1)



>   访问说明

![image-20220119100716673](/assets/imgs/SpringCloud3.assets/image-20220119100716673.png)



>   添加网关前

![image-20220119100629229](/assets/imgs/SpringCloud3.assets/image-20220119100629229.png)



>   添加网关后

![image-20220119100639418](/assets/imgs/SpringCloud3.assets/image-20220119100639418.png)



#### YAML 配置说明

Gateway网关路由有两种配置方式：

>   在配置文件yml中配置

同上面的配置



>   代码中注入RouteLocator的Bean

```java
package com.yixihan.springcloud.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author : yixihan
 * @create : 2022-01-19-10:27
 */
@Configuration
public class gateWayConfig {

    @Bean
    public RouteLocator routers (RouteLocatorBuilder builder) {
        RouteLocatorBuilder.Builder routes = builder.routes ();

        routes.route ("path_route_guonei",
                r -> r.path("/guonei").uri("http://news.baidu.com/guonei")).build ();

        routes.route ("path_route_guoji",
                r -> r.path ("/guoji").uri ("http://news.baidu.com/guoji")).build ();

        return routes.build ();
    }

}

```



>   测试

[guoji url](http://localhost:9527/guoji)

[guonei url](http://localhost:9527/guonei)

![image-20220119104023324](/assets/imgs/SpringCloud3.assets/image-20220119104023324.png)

![image-20220119104029476](/assets/imgs/SpringCloud3.assets/image-20220119104029476.png)



### 通过微服务名实现动态路由

默认情况下Gateway会根据注册中心注册的服务列表，以注册中心上微服务名为路径创建**动态路由进行转发，从而实现动态路由的功能**



>   启动 eureka7001/7002 + 两个服务提供者8001/8002

![image-20220119110106658](/assets/imgs/SpringCloud3.assets/image-20220119110106658.png)



#### POM

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```



#### YAML

```yaml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由

        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由

eureka:
  instance:
    hostname: cloud-gateway-service
  client: #服务提供者provider注册进eureka服务列表内
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
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

/**
 * @author : yixihan
 * @create : 2022-01-19-9:38
 */
@SpringBootApplication
@EnableEurekaClient
public class GateWayMain9527 {

    public static void main(String[] args) {
        SpringApplication.run (GateWayMain9527.class, args);
    }
}

```



#### 测试

[测试 url](http://localhost:9527/payment/lb)

![image-20220119110221752](/assets/imgs/SpringCloud3.assets/image-20220119110221752.png)

![image-20220119110226860](/assets/imgs/SpringCloud3.assets/image-20220119110226860.png)



### Predicate的使用



#### Predicat 是什么

![image-20220119110407327](/assets/imgs/SpringCloud3.assets/image-20220119110407327.png)



#### Route Predicate Factories 是什么

![image-20220119111356305](/assets/imgs/SpringCloud3.assets/image-20220119111356305.png)

Spring Cloud Gateway将路由匹配作为Spring WebFlux HandlerMapping基础架构的一部分。

Spring Cloud Gateway包括许多内置的Route Predicate工厂。所有这些Predicate都与HTTP请求的不同属性匹配。多个Route Predicate工厂可以进行组合

Spring Cloud Gateway 创建 Route 对象时， 使用 RoutePredicateFactory 创建 Predicate 对象，Predicate 对象可以赋值给 Route。 Spring Cloud Gateway 包含许多内置的Route Predicate Factories。

所有这些谓词都匹配HTTP请求的不同属性。多种谓词工厂可以组合，并通过逻辑and。



#### 常用的Route Predicate

>   uml

![image-20220120072302846](/assets/imgs/SpringCloud3.assets/image-20220120072302846.png)



##### After Route Predicate

![image-20220120072124858](/assets/imgs/SpringCloud3.assets/image-20220120072124858.png)

 我们的问题是：上述这个After好懂，这个时间串串？？？

```java
package com.yixihan.springcloud;

import org.junit.Test;

import java.time.ZonedDateTime;

/**
 * @author : yixihan
 * @create : 2022-01-20-7:24
 */
public class TimeTest {

    @Test
    public void test1 () {
        ZonedDateTime zdt = ZonedDateTime.now();
        System.out.println (zdt);
    }
}

```



>   yaml 配置

```yaml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由
            - After=2022-01-20T08:25:59.749+08:00[Asia/Shanghai]

        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由

eureka:
  instance:
    hostname: cloud-gateway-service
  client: #服务提供者provider注册进eureka服务列表内
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka

```



>   测试

[测试 url](http://localhost:9527/payment/get/1)

![image-20220120073134838](/assets/imgs/SpringCloud3.assets/image-20220120073134838.png)

![image-20220120073121715](/assets/imgs/SpringCloud3.assets/image-20220120073121715.png)



##### Before Route Predicate

![image-20220120072226626](/assets/imgs/SpringCloud3.assets/image-20220120072226626.png)



>   yaml

```yaml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由
            - After=2022-01-20T07:25:59.749+08:00[Asia/Shanghai]          # 断言，路径相匹配的进行路由
            - Before=2022-01-20T07:35:59.749+08:00[Asia/Shanghai]         # 断言，路径相匹配的进行路由

        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由

eureka:
  instance:
    hostname: cloud-gateway-service
  client: #服务提供者provider注册进eureka服务列表内
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka

```



>   测试

[测试 url](http://localhost:9527/payment/get/1)

![image-20220120073444450](/assets/imgs/SpringCloud3.assets/image-20220120073444450.png)

![image-20220120073613512](/assets/imgs/SpringCloud3.assets/image-20220120073613512.png)



##### Between Route Predicate

>   yaml

```yaml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由
#            - After=2022-01-20T07:25:59.749+08:00[Asia/Shanghai]          # 断言，路径相匹配的进行路由
#            - Before=2022-01-20T07:35:59.749+08:00[Asia/Shanghai]         # 断言，路径相匹配的进行路由
            - Between=2022-01-20T07:35:59.749+08:00[Asia/Shanghai],2022-01-20T07:38:59.749+08:00[Asia/Shanghai]

        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由

eureka:
  instance:
    hostname: cloud-gateway-service
  client: #服务提供者provider注册进eureka服务列表内
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka

```



>   测试

[测试 url](http://localhost:9527/payment/get/1)

![image-20220120073813691](/assets/imgs/SpringCloud3.assets/image-20220120073813691.png)

![image-20220120073922542](/assets/imgs/SpringCloud3.assets/image-20220120073922542.png)



##### Cookie Route Predicate

![image-20220120072240756](/assets/imgs/SpringCloud3.assets/image-20220120072240756.png)

Cookie Route Predicate需要两个参数，一个是 Cookie name ,一个是正则表达式。

路由规则会通过获取对应的 Cookie name 值和正则表达式去匹配，如果匹配上就会执行路由，如果没有匹配上则不执行



>   yaml

```yaml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由
#            - After=2022-01-20T07:25:59.749+08:00[Asia/Shanghai]          # 断言，路径相匹配的进行路由
#            - Before=2022-01-20T07:35:59.749+08:00[Asia/Shanghai]         # 断言，路径相匹配的进行路由
#            - Between=2022-01-20T07:35:59.749+08:00[Asia/Shanghai],2022-01-20T07:38:59.749+08:00[Asia/Shanghai]
            - Cookie=username,yixihan

          
        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由

eureka:
  instance:
    hostname: cloud-gateway-service
  client: #服务提供者provider注册进eureka服务列表内
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka

```



>   测试

```shell
curl http://localhost:9527/payment/get/1
curl http://localhost:9527/payment/get/1 --cookie  "username=yixihan"
```



![image-20220120074411946](/assets/imgs/SpringCloud3.assets/image-20220120074411946.png)



>   加入curl返回中文乱码

![image-20220120074547669](/assets/imgs/SpringCloud3.assets/image-20220120074547669.png)

[解决贴子](https://blog.csdn.net/leedee/article/details/82685636)



##### Header Route Predicate

![image-20220120072333778](/assets/imgs/SpringCloud3.assets/image-20220120072333778.png)

两个参数：一个是属性名称和一个正则表达式，这个属性值和正则表达式匹配则执行。



>   yaml

```yaml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由
#            - After=2022-01-20T07:25:59.749+08:00[Asia/Shanghai]          # 断言，路径相匹配的进行路由
#            - Before=2022-01-20T07:35:59.749+08:00[Asia/Shanghai]         # 断言，路径相匹配的进行路由
#            - Between=2022-01-20T07:35:59.749+08:00[Asia/Shanghai],2022-01-20T07:38:59.749+08:00[Asia/Shanghai]
#            - Cookie=username,yixihan
            - Header=X-Request-Id, \d+  # 请求头要有X-Request-Id属性并且值为整数的正则表达式


        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由

eureka:
  instance:
    hostname: cloud-gateway-service
  client: #服务提供者provider注册进eureka服务列表内
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka

```



>   测试

```
curl http://localhost:9527/payment/get/1 -H "X-Request-Id:123"
curl http://localhost:9527/payment/get/1 -H "X-Request-Id:-123"
```

![image-20220120074941767](/assets/imgs/SpringCloud3.assets/image-20220120074941767.png)



##### Host Route Predicate

![image-20220120072346044](/assets/imgs/SpringCloud3.assets/image-20220120072346044.png)

Host Route Predicate 接收一组参数，一组匹配的域名列表，这个模板是一个 ant 分隔的模板，用.号作为分隔符。

它通过参数中的主机地址作为匹配规则



>   yaml

```yaml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由
#            - After=2022-01-20T07:25:59.749+08:00[Asia/Shanghai]          # 断言，路径相匹配的进行路由
#            - Before=2022-01-20T07:35:59.749+08:00[Asia/Shanghai]         # 断言，路径相匹配的进行路由
#            - Between=2022-01-20T07:35:59.749+08:00[Asia/Shanghai],2022-01-20T07:38:59.749+08:00[Asia/Shanghai]
#            - Cookie=username,yixihan
#            - Header=X-Request-Id, \d+  # 请求头要有X-Request-Id属性并且值为整数的正则表达式
            - Host=**.yixihan.com


        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由

eureka:
  instance:
    hostname: cloud-gateway-service
  client: #服务提供者provider注册进eureka服务列表内
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka

```





>   测试

```shell
curl http://localhost:9527/payment/get/1 -H "Host: www.yixihan.com" 
curl http://localhost:9527/payment/get/1 -H "Host: www.yixihan.com" 
curl http://localhost:9527/payment/get/1 -H "Host: java.yixihan.net"
```

![image-20220120075337686](/assets/imgs/SpringCloud3.assets/image-20220120075337686.png)



##### Method Route Predicate

![image-20220120072400895](/assets/imgs/SpringCloud3.assets/image-20220120072400895.png)



>   yaml

```yaml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由
#            - After=2022-01-20T07:25:59.749+08:00[Asia/Shanghai]          # 断言，路径相匹配的进行路由
#            - Before=2022-01-20T07:35:59.749+08:00[Asia/Shanghai]         # 断言，路径相匹配的进行路由
#            - Between=2022-01-20T07:35:59.749+08:00[Asia/Shanghai],2022-01-20T07:38:59.749+08:00[Asia/Shanghai]
#            - Cookie=username,yixihan
#            - Header=X-Request-Id, \d+  # 请求头要有X-Request-Id属性并且值为整数的正则表达式
#            - Host=**.yixihan.com
            - Method=GET


        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由

eureka:
  instance:
    hostname: cloud-gateway-service
  client: #服务提供者provider注册进eureka服务列表内
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka

```



>   测试

```shell
curl http://localhost:9527/payment/get/1
curl -X -POST http://localhost:9527/payment/get/1
```

![image-20220120075508568](/assets/imgs/SpringCloud3.assets/image-20220120075508568.png)



##### Path Route Predicate

![image-20220120072406555](/assets/imgs/SpringCloud3.assets/image-20220120072406555.png)



>   yaml

```yaml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由
#            - After=2022-01-20T07:25:59.749+08:00[Asia/Shanghai]          # 断言，路径相匹配的进行路由
#            - Before=2022-01-20T07:35:59.749+08:00[Asia/Shanghai]         # 断言，路径相匹配的进行路由
#            - Between=2022-01-20T07:35:59.749+08:00[Asia/Shanghai],2022-01-20T07:38:59.749+08:00[Asia/Shanghai]
#            - Cookie=username,yixihan
#            - Header=X-Request-Id, \d+  # 请求头要有X-Request-Id属性并且值为整数的正则表达式
#            - Host=**.yixihan.com
            - Method=GET


        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由

eureka:
  instance:
    hostname: cloud-gateway-service
  client: #服务提供者provider注册进eureka服务列表内
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka

```



>   测试

之前一直在用





##### Query Route Predicate

![image-20220120072411871](/assets/imgs/SpringCloud3.assets/image-20220120072411871.png)

支持传入两个参数，一个是属性名，一个为属性值，属性值可以是正则表达式。



>   yaml

```yaml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由
#            - After=2022-01-20T07:25:59.749+08:00[Asia/Shanghai]          # 断言，路径相匹配的进行路由
#            - Before=2022-01-20T07:35:59.749+08:00[Asia/Shanghai]         # 断言，路径相匹配的进行路由
#            - Between=2022-01-20T07:35:59.749+08:00[Asia/Shanghai],2022-01-20T07:38:59.749+08:00[Asia/Shanghai]
#            - Cookie=username,yixihan
#            - Header=X-Request-Id, \d+  # 请求头要有X-Request-Id属性并且值为整数的正则表达式
#            - Host=**.yixihan.com
            - Method=GET
            - Query=username, \d+  # 要有参数名username并且值还要是整数才能路由

        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由

eureka:
  instance:
    hostname: cloud-gateway-service
  client: #服务提供者provider注册进eureka服务列表内
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka

```



>   测试

```shell
curl http://localhost:9527/payment/get/1?username=31

curl http://localhost:9527/payment/get/1?username=-31
```

![image-20220120075826094](/assets/imgs/SpringCloud3.assets/image-20220120075826094.png)



#### 总结

>   yaml

```yaml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由
#            - After=2022-01-20T07:25:59.749+08:00[Asia/Shanghai]          # 断言，路径相匹配的进行路由
#            - Before=2022-01-20T07:35:59.749+08:00[Asia/Shanghai]         # 断言，路径相匹配的进行路由
#            - Between=2022-01-20T07:35:59.749+08:00[Asia/Shanghai],2022-01-20T07:38:59.749+08:00[Asia/Shanghai]
#            - Cookie=username,yixihan
#            - Header=X-Request-Id, \d+  # 请求头要有X-Request-Id属性并且值为整数的正则表达式
#            - Host=**.yixihan.com
            - Method=GET
            - Query=username, \d+  # 要有参数名username并且值还要是整数才能路由

        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由

eureka:
  instance:
    hostname: cloud-gateway-service
  client: #服务提供者provider注册进eureka服务列表内
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka

```



说白了，Predicate就是为了实现一组匹配规则，让请求过来找到对应的Route进行处理。



### Filter的使用



#### 概述

![image-20220120080007275](/assets/imgs/SpringCloud3.assets/image-20220120080007275.png)

路由过滤器可用于修改进入的HTTP请求和返回的HTTP响应，路由过滤器只能指定路由进行使用。

Spring Cloud Gateway 内置了多种路由过滤器，他们都由GatewayFilter的工厂类来产生



#### Spring Cloud Gateway的Filter



##### 生命周期，Only Two

-   pre (业务逻辑之前)
-   post(业务逻辑之后)



##### 种类，Only Two

-   GatewayFilter (单一的)
-   GlobalFilter(全局的)



>   GatewayFilter 

[官网地址](https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.1.RELEASE/reference/html/#the-addrequestparameter-gatewayfilter-factory)

一共有 31 种

![image-20220120080133516](/assets/imgs/SpringCloud3.assets/image-20220120080133516.png)

>   GlobalFilter

![image-20220120080144176](/assets/imgs/SpringCloud3.assets/image-20220120080144176.png)



#### 常用的GatewayFilter



##### AddRequestParameter

>   yaml

```yaml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          filters:
            - AddRequestParameter=X-Request-Id,1024 #过滤器工厂会在匹配的请求头加上一对请求头，名称为X-Request-Id值为1024
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由
#            - After=2022-01-20T07:25:59.749+08:00[Asia/Shanghai]          # 断言，路径相匹配的进行路由
#            - Before=2022-01-20T07:35:59.749+08:00[Asia/Shanghai]         # 断言，路径相匹配的进行路由
#            - Between=2022-01-20T07:35:59.749+08:00[Asia/Shanghai],2022-01-20T07:38:59.749+08:00[Asia/Shanghai]
#            - Cookie=username,yixihan
#            - Header=X-Request-Id, \d+  # 请求头要有X-Request-Id属性并且值为整数的正则表达式
#            - Host=**.yixihan.com
            - Method=GET
            - Query=username, \d+  # 要有参数名username并且值还要是整数才能路由

        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由

eureka:
  instance:
    hostname: cloud-gateway-service
  client: #服务提供者provider注册进eureka服务列表内
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka

```



#### 自定义过滤器 - 自定义全局GlobalFilter



#### 两个主要接口介绍

-   GlobalFilter

-   Ordered



#### 功能

-   全局日志记录
-   统一网关鉴权
-   ...



#### 实现



##### filter

```java
package com.yixihan.springcloud.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Date;

/**
 * @author : yixihan
 * @create : 2022-01-20-8:07
 */
@Component
@Slf4j
public class MyLogGateWayFilter implements GlobalFilter, Ordered {


    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        log.info ("******come in MyLogGateWayFilter : " + new Date ());
        String uname = exchange.getRequest ().getQueryParams ().getFirst ("uname");

        if (uname == null) {
            log.info ("******用户名为 null, 非法用户");
            exchange.getResponse ().setStatusCode (HttpStatus.NOT_ACCEPTABLE);
            return exchange.getResponse ().setComplete ();
        }
        return chain.filter (exchange);

    }

    @Override
    public int getOrder() {
        return 0;
    }
}

```



##### yaml

```yaml
server:
  port: 9527

spring:
  application:
    name: cloud-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
#          filters:
#            - AddRequestParameter=X-Request-Id,1024 #过滤器工厂会在匹配的请求头加上一对请求头，名称为X-Request-Id值为1024
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由
#            - After=2022-01-20T07:25:59.749+08:00[Asia/Shanghai]          # 断言，路径相匹配的进行路由
#            - Before=2022-01-20T07:35:59.749+08:00[Asia/Shanghai]         # 断言，路径相匹配的进行路由
#            - Between=2022-01-20T07:35:59.749+08:00[Asia/Shanghai],2022-01-20T07:38:59.749+08:00[Asia/Shanghai]
#            - Cookie=username,yixihan
#            - Header=X-Request-Id, \d+  # 请求头要有X-Request-Id属性并且值为整数的正则表达式
#            - Host=**.yixihan.com
            - Method=GET
#            - Query=username, \d+  # 要有参数名username并且值还要是整数才能路由

        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由

eureka:
  instance:
    hostname: cloud-gateway-service
  client: #服务提供者provider注册进eureka服务列表内
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka

```



##### 测试

[测试 url - 正确](http://localhost:9527/payment/get/1?uname=l4)

[测试 url - 无参](http://localhost:9527/payment/get/1)

[测试 url - 错误参数](http://localhost:9527/payment/get/1/awf=awf)

![image-20220120081356235](/assets/imgs/SpringCloud3.assets/image-20220120081356235.png)

![image-20220120081408946](/assets/imgs/SpringCloud3.assets/image-20220120081408946.png)

![image-20220120081422033](/assets/imgs/SpringCloud3.assets/image-20220120081422033.png)



## SpringCloud Config 分布式配置中心



### 概述

>   分布式系统面临的---配置问题

   微服务意味着要将单体应用中的业务拆分成一个个子服务，每个服务的粒度相对较小，因此系统中会出现大量的服务。由于每个服务都需要必要的配置信息才能运行，所以一套集中式的、动态的配置管理设施是必不可少的。

SpringCloud提供了ConfigServer来解决这个问题，我们每一个微服务自己带着一个application.yml，上百个配置文件的管理....../(ㄒoㄒ)/~~



>   是什么

SpringCloud Config为微服务架构中的微服务提供集中化的外部配置支持，配置服务器为**各个不同微服务应用**的所有环境提供了一个**中心化的外部配置**



>   怎么玩

SpringCloud Config分为**服务端和客户端两部分**。



服务端也称为**分布式配置中心，它是一个独立的微服务应用**，用来连接配置服务器并为客户端提供获取配置信息，加密/解密信息等访问接口

客户端则是通过指定的配置中心来管理应用资源，以及与业务相关的配置内容，并在启动的时候从配置中心获取和加载配置信息配置服务器默认采用git来存储配置信息，这样就有助于对环境配置进行版本管理，并且可以通过git客户端工具来方便的管理和访问配置内容。



>   图解

![image-20220120082026327](/assets/imgs/SpringCloud3.assets/image-20220120082026327.png)



#### 功能

-   集中管理配置文件
-   不同环境不同配置，动态化的配置更新，分环境部署比如dev/test/prod/beta/release
-   运行期间动态调整配置，不再需要在每个服务部署的机器上编写配置文件，服务会向配置中心统一拉取配置自己的信息
-   当配置发生变动时，服务不需要重启即可感知到配置的变化并应用新的配置
-   将配置信息以REST接口的形式暴露
    post、curl访问刷新均可......



#### 与GitHub整合配置

由于SpringCloud Config默认使用Git来存储配置文件(也有其它方式,比如支持SVN和本地文件)，但最推荐的还是Git，而且使用的是http/https访问的形式



#### 官网

[官网](https://cloud.spring.io/spring-cloud-static/spring-cloud-config/2.2.1.RELEASE/reference/html/)



### Config服务端配置与测试



#### 前期准备

>   github 新建公共库

[springcloud-learn-config](https://github.com/yixihan/springcloud-learn-config)



>   获取新建库的 git 地址

```yaml
# https
https://github.com/yixihan/springcloud-learn-config.git
# ssh
git@github.com:yixihan/springcloud-learn-config.git
```



>   修改 hosts 文件, 增加映射

[hosts 文件位置](C:\Windows\System32\drivers\etc)

```
127.0.0.1 config-3344.com
```



![image-20220120093031640](/assets/imgs/SpringCloud3.assets/image-20220120093031640.png)



#### 建 cloud 配置中心模块



##### 建 module

module 名 : cloud-config-center-3344



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

    <artifactId>cloud-config-center-3344</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-config-server</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
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



##### 写 YAML

```yaml
server:
  port: 3344

spring:
  application:
    name:  cloud-config-center #注册进Eureka服务器的微服务名
  cloud:
    config:
      server:
        git:
#          uri: git@github.com:yixihan/springcloud-learn-config.git #GitHub上面的git仓库名字
          uri : https://github.com/yixihan/springcloud-learn-config.git
          ####搜索目录
          search-paths:
            - springcloud-learn-config
#          username: yixihan
#          password: ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCkGOcnEDQ+wtoXxjdXhzhaV0aEDQicV527scZLxHulm9q0MU7KCKNstTEj1fLIqkUyArGHOEtLYFW5JA7QHOLw7WgndcAOzjIdGVn7iwEIh4MikzWiQgYuvSHQM951kEHZFPUTscj/qNJ0QYxgrpEKTOD462NJ7bJJu9msIyyP3xDEpq6VJZ+OdIZhG5uXvRoZ/CX1/vRl1ZHnEVmCjpJLUs0zddf4mEttoswO/HuhStYlOISMuEU/zaLhTRKcRlhH9OdbGPoqewsC8Lgykkvic/zNsygc7/YjSTG+/7DOCo/nBVngHQoDeKhaZy6qcYgZ92qKIcAYx3PFwRm9BCH3r3QUyNzFmeQcsr5LloTtYIMDHlJJ79d86L3063EcJp1dbklzL36ZdiDxQgM1072gIBMWsafK6egplSkr3CCdNywjy3fdhrw87JBnYqtlI2UKiH7K+yY65f63Qd0SZt/bjRXdwMI1BMeHNgjB1BSKEzr5/1zZBUyWP8bdWaVxQZ0= yixihan20010617@gmail.com
      ####读取分支
      label: master

#服务注册到eureka地址
eureka:
  client:
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka


```



##### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.config.server.EnableConfigServer;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

/**
 * @author : yixihan
 * @create : 2022-01-20-8:53
 */
@SpringBootApplication
@EnableEurekaClient
@EnableConfigServer
@EnableDiscoveryClient
public class ConfigCenterMain3344 {

    public static void main(String[] args) {
        SpringApplication.run (ConfigCenterMain3344.class, args);
    }
}

```



#### 测试

[master-dev](http://config-3344.com:3344/master/config-dev.yaml)

[master-test](http://config-3344.com:3344/master/config-test.yaml)

[master-prod](http://config-3344.com:3344/master/config-prod.yaml)

[dev-dev](http://config-3344.com:3344/dev/config-dev.yaml)

[dev-test](http://config-3344.com:3344/dev/config-test.yaml)

[dev-prod](http://config-3344.com:3344/dev/config-prod.yaml)



![image-20220120091530028](/assets/imgs/SpringCloud3.assets/image-20220120091530028.png)

![image-20220120093658231](/assets/imgs/SpringCloud3.assets/image-20220120093658231.png)



#### 配置读取规则



##### 官网说明

![image-20220120093910975](/assets/imgs/SpringCloud3.assets/image-20220120093910975.png)



##### /{label}/{application}-{profile}.yml

>   master 分支

[master-dev](http://config-3344.com:3344/master/config-dev.yaml)

[master-test](http://config-3344.com:3344/master/config-test.yaml)

[master-prod](http://config-3344.com:3344/master/config-prod.yaml)



>   dev 分支

[dev-dev](http://config-3344.com:3344/dev/config-dev.yaml)

[dev-test](http://config-3344.com:3344/dev/config-test.yaml)

[dev-prod](http://config-3344.com:3344/dev/config-prod.yaml)



##### /{application}-{profile}.yml

ps : 选取分支为 yaml 配置的分支

[dev](http://config-3344.com:3344/config-dev.yaml)

[test](http://config-3344.com:3344/config-test.yaml)

[prod](http://config-3344.com:3344/config-prod.yaml)



##### /{application}/{profile}[/{label}]

[dev - master](http://config-3344.com:3344/config/dev/master)

[test- master](http://config-3344.com:3344/config/test/master)

[prod - master](http://config-3344.com:3344/config/prod /master)

[dev - dev](http://config-3344.com:3344/config/dev/dev)

[test- dev](http://config-3344.com:3344/config/test/dev)

[prod- dev](http://config-3344.com:3344/config/prod/dev)



##### 总结

```
 
/{name}-{profiles}.yml
 
/{label}-{name}-{profiles}.yml
 
label：分支(branch)
name ：服务名
profiles：环境(dev/test/prod)
```



### Config客户端配置与测试



#### 建 module

module 名 : cloud-config-client-3355

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

    <artifactId>cloud-config-client-3355</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-config</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
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

**bootstrap.yml**

```yaml
server:
  port: 3355

spring:
  application:
    name: config-client
  cloud:
    #Config客户端配置
    config:
      label: master #分支名称
      name: config #配置文件名称
      profile: dev #读取后缀名称   上述3个综合：master分支上config-dev.yml的配置文件被读取http://config-3344.com:3344/master/config-dev.yml
      uri: http://localhost:3344 #配置中心地址k

#服务注册到eureka地址
eureka:
  client:
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka

```



>   bootstrap.yml 是什么

applicaiton.yml是用户级的资源配置项

bootstrap.yml是系统级的，**优先级更加高**

Spring Cloud会创建一个“Bootstrap Context”，作为Spring应用的`Application Context`的父上下文。初始化的时候，`Bootstrap Context`负责从外部源加载配置属性并解析配置。这两个上下文共享一个从外部获取的`Environment`。

`Bootstrap`属性有高优先级，默认情况下，它们不会被本地配置覆盖。 `Bootstrap context`和`Application Context`有着不同的约定，所以新增了一个`bootstrap.yml`文件，保证`Bootstrap Context`和`Application Context`配置的分离。

**要将Client模块下的application.yml文件改为bootstrap.yml,这是很关键的**，
因为bootstrap.yml是比application.yml先加载的。bootstrap.yml优先级高于application.yml



>   配置说明

![image-20220120095745103](/assets/imgs/SpringCloud3.assets/image-20220120095745103.png)



#### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.config.server.EnableConfigServer;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

/**
 * @author : yixihan
 * @create : 2022-01-20-8:53
 */
@SpringBootApplication
@EnableEurekaClient
@EnableConfigServer
@EnableDiscoveryClient
public class ConfigCenterMain3344 {

    public static void main(String[] args) {
        SpringApplication.run (ConfigCenterMain3344.class, args);
    }
}

```



#### 业务类

```java
package com.yixihan.springcloud.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : yixihan
 * @create : 2022-01-20-9:49
 */
@RestController
@Slf4j
public class ConfigClientController {

    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/configInfo")
    public String getConfigInfo()
    {
        return configInfo;
    }

}

```



#### 测试

[测试 url](http://localhost:3355/configInfo)

>   测试 1

![image-20220120100033330](/assets/imgs/SpringCloud3.assets/image-20220120100033330.png)

![image-20220120095443549](/assets/imgs/SpringCloud3.assets/image-20220120095443549.png)



>   测试 2

![image-20220120100000081](/assets/imgs/SpringCloud3.assets/image-20220120100000081.png)

![image-20220120095934478](/assets/imgs/SpringCloud3.assets/image-20220120095934478.png)



#### 问题 - 分布式配置的动态刷新问题

>   Linux运维修改GitHub上的配置文件内容做调整

由

![image-20220120100230584](/assets/imgs/SpringCloud3.assets/image-20220120100230584.png)

修改为

![image-20220120101105352](/assets/imgs/SpringCloud3.assets/image-20220120101105352.png)



>   刷新3344，发现ConfigServer配置中心立刻响应

可能需要一定时间, 可能是个小bug, 但是暂时没有头绪怎么修复

![image-20220120100810768](/assets/imgs/SpringCloud3.assets/image-20220120100810768.png)

![image-20220120101025517](/assets/imgs/SpringCloud3.assets/image-20220120101025517.png)



>   刷新3355，发现ConfigClient客户端没有任何响应

![image-20220120100906710](/assets/imgs/SpringCloud3.assets/image-20220120100906710.png)

>   3355没有变化除非自己重启或者重新加载

3355 重启之后

![image-20220120101206889](/assets/imgs/SpringCloud3.assets/image-20220120101206889.png)

>   难到每次运维修改配置文件，客户端都需要重启？？噩梦



### Config客户端之动态刷新

避免每次更新配置都要重启客户端微服务3355



#### 动态刷新



##### 修改 3355 模块

>   POM

引入 actuator 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```



>   yaml

```yaml
server:
  port: 3355

spring:
  application:
    name: config-client
  cloud:
    #Config客户端配置
    config:
      label: master #分支名称
      name: config #配置文件名称
      profile: dev #读取后缀名称   上述3个综合：master分支上config-dev.yml的配置文件被读取http://config-3344.com:3344/master/config-dev.yml
      uri: http://localhost:3344 #配置中心地址k


#服务注册到eureka地址
eureka:
  client:
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka

# 暴露监控端点
management:
  endpoints:
    web:
      exposure:
        include: "*"


```



>   controller

添加 `@RefreshScope` 注解

```java
package com.yixihan.springcloud.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : yixihan
 * @create : 2022-01-20-9:49
 */
@RestController
@RefreshScope
@Slf4j
public class ConfigClientController {

    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/configInfo")
    public String getConfigInfo()
    {
        return configInfo;
    }

}

```



#### 测试

>   更新 github

![image-20220120101648627](/assets/imgs/SpringCloud3.assets/image-20220120101648627.png)



>   查看 3344

已修改

![image-20220120101642116](/assets/imgs/SpringCloud3.assets/image-20220120101642116.png)



>   查看 3355

未修改

![image-20220120101656687](/assets/imgs/SpringCloud3.assets/image-20220120101656687.png)

>   需要发送 post 请求刷新 3355

ps : 必须是POST请求

```shell
curl -X POST "http://localhost:3355/actuator/refresh"
```



![image-20220120101730607](/assets/imgs/SpringCloud3.assets/image-20220120101730607.png)



>   再次查看 3355

已刷新

![image-20220120101740886](/assets/imgs/SpringCloud3.assets/image-20220120101740886.png)



#### 问题

假如有多个微服务客户端3355/3366/3377。。。。。。

每个微服务都要执行一次post请求，手动刷新？

**可否广播，一次通知，处处生效？**

我们想大范围的自动刷新，求方法



## SpringCloud Bus 消息总线



### 概述

Spring Cloud Bus 配合 Spring Cloud Config 使用可以实现配置的动态刷新。

简而言之 SpringCloud Bus 功能 : 分布式自动刷新配置功能



>   图解

![image-20220120102547453](/assets/imgs/SpringCloud3.assets/image-20220120102547453.png)



Spring Cloud Bus是用来将分布式系统的节点与轻量级消息系统链接起来的框架，**它整合了Java的事件处理机制和消息中间件的功能。**

**Spring Clud Bus目前支持RabbitMQ和Kafka。**



#### 功能

Spring Cloud Bus能管理和传播分布式系统间的消息，就像一个分布式执行器，可用于广播状态更改、事件推送等，也可以当作微服务间的通信通道。



>   图解

![image-20220120102727560](/assets/imgs/SpringCloud3.assets/image-20220120102727560.png)



#### 为何被称为总线

>   什么是总线

在微服务架构的系统中，通常会使用**轻量级的消息代理**来构建一个**共用的消息主题**，并让系统中所有微服务实例都连接上来。由于**该主题中产生的消息会被所有实例监听和消费，所以称它为消息总线。**在总线上的各个实例，都可以方便地广播一些需要让其他连接在该主题上的实例都知道的消息。



>   基本原理

ConfigClient实例都监听MQ中同一个topic(默认是springCloudBus)。当一个服务刷新数据的时候，它会把这个信息放入到Topic中，这样其它监听同一Topic的服务就能得到通知，然后去更新自身的配置。



### RabbitMQ 环境配置

查看自己写的笔记

[RabbitMQ 1 - 单机环境搭建](D:\JAVA\tpyora\RabbitMQ1.md)

[RabbitMQ 2 - 集群环境搭建](D:\JAVA\tpyora\RabbitMQ2.md)

![image-20220120103105360](/assets/imgs/SpringCloud3.assets/image-20220120103105360.png)



### SpringCloud Bus动态刷新全局广播



#### 新建 3366 模块

为演示广播效果, 以 3355 为模板新建 3366

module 名 : cloud-config-client-3366



>   controller

```java
package com.yixihan.springcloud.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : yixihan
 * @create : 2022-01-20-9:49
 */
@RestController
@RefreshScope
@Slf4j
public class ConfigClientController {

    @Value("${server.port}")
    private String serverPort;

    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/configInfo")
    public String getConfigInfo() {
        return "serverPort: " + serverPort + "\t\n\n configInfo: " + configInfo;

    }

}

```



#### 设计思想

>   设计思想一

利用消息总线触发一个客户端/bus/refresh,而刷新所有客户端的配置

![image-20220120104805412](/assets/imgs/SpringCloud3.assets/image-20220120104805412.png)



>   设计思想二

利用消息总线触发一个服务端ConfigServer的/bus/refresh端点，而刷新所有客户端的配置

![image-20220120104811773](/assets/imgs/SpringCloud3.assets/image-20220120104811773.png)



图二的架构显然更加适合，图一不适合的原因如下

-   打破了微服务的职责单一性，因为微服务本身是业务模块，它本不应该承担配置刷新的职责。
-   破坏了微服务各节点的对等性。
-   有一定的局限性。例如，微服务在迁移时，它的网络地址常常会发生变化，此时如果想要做到自动刷新，那就会增加更多的修改



#### 给cloud-config-center-3344配置中心服务端添加消息总线支持



#### 给cloud-config-client-3355/3366客户端添加消息总线支持



#### 测试

[3344](http://config-3344.com:3344/master/config-dev.yaml)

[3355](http://localhost:3355/configInfo)

[3366](http://localhost:3366/configInfo)



>   测试前 config 内容

![image-20220120110118694](/assets/imgs/SpringCloud3.assets/image-20220120110118694.png)

![image-20220120110125356](/assets/imgs/SpringCloud3.assets/image-20220120110125356.png)

![image-20220120110130143](/assets/imgs/SpringCloud3.assets/image-20220120110130143.png)

![image-20220120110139956](/assets/imgs/SpringCloud3.assets/image-20220120110139956.png)



>   修改 config 内容

![image-20220120110158406](/assets/imgs/SpringCloud3.assets/image-20220120110158406.png)



>   3344 已修改

[3344](http://config-3344.com:3344/master/config-dev.yaml)

![image-20220120110445037](/assets/imgs/SpringCloud3.assets/image-20220120110445037.png)



>   发送 post 请求, 刷新 3344

```shell
curl -X POST "http://localhost:3344/actuator/bus-refresh"
```



![image-20220120110525839](/assets/imgs/SpringCloud3.assets/image-20220120110525839.png)



>   查看 3355/3366 已刷新

[3355](http://localhost:3355/configInfo)

[3366](http://localhost:3366/configInfo)

![image-20220120110539529](/assets/imgs/SpringCloud3.assets/image-20220120110539529.png)

![image-20220120110547988](/assets/imgs/SpringCloud3.assets/image-20220120110547988.png)



### SpringCloud Bus动态刷新定点通知

不想全部通知，只想定点通知

只通知3355, 不通知3366



>   简单一句话

指定具体某一个实例生效而不是全部 

公式：http://localhost:配置中心的端口号/actuator/bus-refresh/{destination}



/bus/refresh请求不再发送到具体的服务实例上，而是发给config server并
通过destination参数类指定需要更新配置的服务或实例



#### 案例

我们这里以刷新运行在3355端口上的config-client为例, 只通知3355, 不通知3366

ps : 修改之前 version = 7

>   修改 github

![image-20220120112926665](/assets/imgs/SpringCloud3.assets/image-20220120112926665.png)



>   查看 3344, 3355, 3366

[3344](http://config-3344.com:3344/master/config-dev.yaml)

[3355](http://localhost:3355/configInfo)

[3366](http://localhost:3366/configInfo)

![image-20220120112933940](/assets/imgs/SpringCloud3.assets/image-20220120112933940.png)

![image-20220120112939423](/assets/imgs/SpringCloud3.assets/image-20220120112939423.png)

![image-20220120112943873](/assets/imgs/SpringCloud3.assets/image-20220120112943873.png)



>   定点通知 3355

config-client : 微服务服务名

3355 : 要定点通知的端口

![image-20220120113224877](/assets/imgs/SpringCloud3.assets/image-20220120113224877.png)

```shell
curl -X POST "http://localhost:3344/actuator/bus-refresh/config-client:3355"
```



![image-20220120113246107](/assets/imgs/SpringCloud3.assets/image-20220120113246107.png)



>   查看 3355/3366

[3355](http://localhost:3355/configInfo)

[3366](http://localhost:3366/configInfo)

![image-20220120113025343](/assets/imgs/SpringCloud3.assets/image-20220120113025343.png)

![image-20220120113030721](/assets/imgs/SpringCloud3.assets/image-20220120113030721.png)



### 总结

![image-20220120113419420](/assets/imgs/SpringCloud3.assets/image-20220120113419420.png)



## SpringCloud Stream消息驱动



### 消息驱动概述

>   引入

![image-20220120132542215](/assets/imgs/SpringCloud3.assets/image-20220120132542215.png)



#### 是什么

>   什么是SpringCloudStream

官方定义 Spring Cloud Stream 是一个构建消息驱动微服务的框架。

应用程序通过 inputs 或者 outputs 来与 Spring Cloud Stream中binder对象交互。

通过我们配置来binding(绑定) ，而 Spring Cloud Stream 的 binder对象负责与消息中间件交互。

所以，我们只需要搞清楚如何与 Spring Cloud Stream 交互就可以方便使用消息驱动的方式。

通过使用Spring Integration来连接消息代理中间件以实现消息事件驱动。
Spring Cloud Stream 为一些供应商的消息中间件产品提供了个性化的自动化配置实现，引用了发布-订阅、消费组、分区的三个核心概念。



**目前仅支持RabbitMQ、Kafka。**



>   一句话总结

屏蔽底层消息中间件的差异,降低切换成本，统一消息的编程模型



##### 官网

[官网](https://spring.io/projects/spring-cloud-stream#overview)

[官方文档](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/3.0.13.RELEASE/reference/html/)

[Spring Cloud Stream中文指导手册](https://m.wang1314.com/doc/webapp/topic/20971999.html)



#### 设计思想



##### 标准MQ

>   图解

![image-20220120132741268](/assets/imgs/SpringCloud3.assets/image-20220120132741268.png)



-   生产者/消费者之间靠**消息**媒介传递信息内容
    Message
-   消息必须走特定的**通道**
    消息通道MessageChannel
-   消息通道里的消息如何被消费呢，谁负责收发**处理**
    消息通道MessageChannel的子接口SubscribableChannel，由MessageHandler消息处理器所订阅



##### 为什么用Cloud Stream

比方说我们用到了RabbitMQ和Kafka，由于这两个消息中间件的架构上的不同，像RabbitMQ有exchange，kafka有Topic和Partitions分区，这些中间件的差异性导致我们实际项目开发给我们造成了一定的困扰，我们如果用了两个消息队列的其中一种，后面的业务需求，我想往另外一种消息队列进行迁移，这时候无疑就是一个灾难性的，**一大堆东西都要重新推倒重新做**，因为它跟我们的系统耦合了，这时候springcloud Stream给我们提供了一种解耦合的方式。



![image-20220120133722441](/assets/imgs/SpringCloud3.assets/image-20220120133722441.png)



>   stream凭什么可以统一底层差异？

在没有绑定器这个概念的情况下，我们的SpringBoot应用要直接与消息中间件进行信息交互的时候，

由于各消息中间件构建的初衷不同，它们的实现细节上会有较大的差异性
通过定义绑定器作为中间层，完美地实现了**应用程序与消息中间件细节之间的隔离**。

通过向应用程序暴露统一的Channel通道，使得应用程序不需要再考虑各种不同的消息中间件实现。

**通过定义绑定器Binder作为中间层，实现了应用程序与消息中间件细节之间的隔离。**



>   Binder

在没有绑定器这个概念的情况下，我们的SpringBoot应用要直接与消息中间件进行信息交互的时候，由于各消息中间件构建的初衷不同，它们的实现细节上会有较大的差异性，通过定义绑定器作为中间层，完美地实现了**应用程序与消息中间件细节之间的隔离**。Stream对消息中间件的进一步封装，可以做到代码层面对中间件的无感知，甚至于动态的切换中间件(rabbitmq切换为kafka)，使得微服务开发的高度解耦，服务可以关注更多自己的业务流程

![image-20220120133050813](/assets/imgs/SpringCloud3.assets/image-20220120133050813.png)

INPUT对应于消费者

OUTPUT对应于生产者



##### Stream中的消息通信方式遵循了发布-订阅模式

Topic主题进行广播

-   在RabbitMQ就是Exchange
-   在Kakfa中就是Topic



#### Spring Cloud Stream标准流程套路

>   图解

![image-20220120133402642](/assets/imgs/SpringCloud3.assets/image-20220120133402642.png)

![image-20220120133411974](/assets/imgs/SpringCloud3.assets/image-20220120133411974.png)



>   Binder

很方便的连接中间件，屏蔽差异



>   Channel

通道，是队列Queue的一种抽象，在消息通讯系统中就是实现存储和转发的媒介，通过Channel对队列进行配置



>   Source和Sink

简单的可理解为参照对象是Spring Cloud Stream自身，
从Stream发布消息就是输出，接受消息就是输入。



#### 编码API和常用注解

![image-20220120133552552](/assets/imgs/SpringCloud3.assets/image-20220120133552552.png)

![image-20220120133600137](/assets/imgs/SpringCloud3.assets/image-20220120133600137.png)



### 案例说明

工程中新建三个子模块

-   cloud-stream-rabbitmq-provider8801， 作为生产者进行发消息模块
-   cloud-stream-rabbitmq-consumer8802，作为消息接收模块
-   cloud-stream-rabbitmq-consumer8803  作为消息接收模块



### 消息驱动之生产者



#### 建module

module 名 : cloud-stream-rabbitmq-provider8801



#### 改POM

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

    <artifactId>cloud-stream-rabbitmq-provider8801</artifactId>

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
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-stream-rabbit</artifactId>
        </dependency>
        <!--基础配置-->
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



#### 写YAML

```yaml
server:
  port: 8801

spring:
  application:
    name: cloud-stream-provider
  cloud:
    stream:
      binders: # 在此处配置要绑定的rabbitmq的服务信息；
        defaultRabbit: # 表示定义的名称，用于于binding整合
          type: rabbit # 消息组件类型
          environment: # 设置rabbitmq的相关的环境配置
            spring:
              rabbitmq:
                host: 175.24.229.41
                port: 5672
                username: admin
                password: 123
      bindings: # 服务的整合处理
        output: # 这个名字是一个通道的名称
          destination: studyExchange # 表示要使用的Exchange名称定义
          content-type: application/json # 设置消息类型，本次为对象json，文本则设置“text/plain”
          binder: defaultRabbit # 设置要绑定的消息服务的具体设置

  #如果连接到远程RabbitMQ报Rabbit health check failed异常
  #配置以下信息
  #因为默认会尝试连接localhost:5672
  rabbitmq:
    host: 175.24.229.41
    port: 5672
    username: admin
    password: 123

eureka:
  client: # 客户端进行Eureka注册的配置
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka, http://eureka7002.com:7002/eureka
  instance:
    lease-renewal-interval-in-seconds: 2 # 设置心跳的时间间隔（默认是30秒）
    lease-expiration-duration-in-seconds: 5 # 如果现在超过了5秒的间隔（默认是90秒）
    instance-id: send-8801.com  # 在信息列表时显示主机名称
    prefer-ip-address: true     # 访问的路径变为IP地址


```



#### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

/**
 * @author : yixihan
 * @create : 2022-01-20-13:50
 */
@SpringBootApplication
@EnableEurekaClient
public class StreamMQMain8801 {

    public static void main(String[] args) {
        SpringApplication.run (StreamMQMain8801.class, args);
    }
}

```



#### 业务类



##### service

>   接口

```java
package com.yixihan.springcloud.Service;

/**
 * @author : yixihan
 * @create : 2022-01-20-13:51
 */
public interface IMessageProvider {

    String send ();
}

```



>   实现类

```java
package com.yixihan.springcloud.Service.impl;

import com.yixihan.springcloud.Service.IMessageProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.messaging.Source;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.MessageBuilder;

import javax.annotation.Resource;
import java.util.UUID;

/**
 * @author : yixihan
 * @create : 2022-01-20-13:51
 */
@EnableBinding(Source.class) // 定义消息的推送管道
@Slf4j
public class MessageProviderImpl implements IMessageProvider {

    /**
     * 消息发送管道
     */
    @Resource
    private MessageChannel output;

    @Override
    public String send() {

        String serial = UUID.randomUUID ().toString ();
        output.send (MessageBuilder.withPayload (serial).build ()); // 创建并发送消息
        log.info ("***serial: " + serial);

        return serial;
    }
}

```



##### controller

```java
package com.yixihan.springcloud.controller;

import com.yixihan.springcloud.Service.IMessageProvider;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author : yixihan
 * @create : 2022-01-20-13:59
 */
@RestController
public class SendMessageController {

    @Resource
    private IMessageProvider messageProvider;

    @GetMapping(value = "/sendMessage")
    public String sendMessage()
    {
        return messageProvider.send();
    }

}

```



#### 测试

开启 7001/7002, 再开启8801

[测试 url](http://localhost:8801/sendMessage)

![image-20220120152834464](/assets/imgs/SpringCloud3.assets/image-20220120152834464.png)

![image-20220120152841947](/assets/imgs/SpringCloud3.assets/image-20220120152841947.png)

### 消息驱动之消费者



#### 建module

module 名 : cloud-stream-rabbitmq-consumer8802



#### 改POM

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

    <artifactId>cloud-stream-rabbitmq-consumer8802</artifactId>

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
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-stream-rabbit</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--基础配置-->
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



#### 写YAML

```yaml
server:
  port: 8802

spring:
  application:
    name: cloud-stream-consumer
  cloud:
    stream:
      binders: # 在此处配置要绑定的rabbitmq的服务信息；
        defaultRabbit: # 表示定义的名称，用于于binding整合
          type: rabbit # 消息组件类型
          environment: # 设置rabbitmq的相关的环境配置
            spring:
              rabbitmq:
                host: 175.24.229.41
                port: 5672
                username: admin
                password: 123
                virtual-host: /
      bindings: # 服务的整合处理
        input: # 这个名字是一个通道的名称
          destination: studyExchange # 表示要使用的Exchange名称定义
          content-type: application/json # 设置消息类型，本次为json，文本则设置“text/plain”
          binder: defaultRabbit # 设置要绑定的消息服务的具体设置

  #如果连接到远程RabbitMQ报Rabbit health check failed异常
  #配置以下信息
  #因为默认会尝试连接localhost:5672
  rabbitmq:
    host: 175.24.229.41
    port: 5672
    username: admin
    password: 123

eureka:
  client: # 客户端进行Eureka注册的配置
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka, http://eureka7002.com:7002/eureka
  instance:
    lease-renewal-interval-in-seconds: 2 # 设置心跳的时间间隔（默认是30秒）
    lease-expiration-duration-in-seconds: 5 # 如果现在超过了5秒的间隔（默认是90秒）
    instance-id: receive-8802.com  # 在信息列表时显示主机名称
    prefer-ip-address: true     # 访问的路径变为IP地址

```



#### 主启动

```java
package com.yixihan.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

/**
 * @author : yixihan
 * @create : 2022-01-20-15:01
 */
@SpringBootApplication
@EnableEurekaClient
public class StreamMQMain8802 {
    public static void main(String[] args) {

        SpringApplication.run(StreamMQMain8802.class,args);
    }

}

```



#### 业务类

>   listener

```java
package com.yixihan.springcloud.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.cloud.stream.messaging.Sink;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;

/**
 * @author : yixihan
 * @create : 2022-01-20-15:02
 */
@EnableBinding(Sink.class)
@Component
public class ReceiveMessageListener {


    @Value("${server.port}")
    private String serverPort;

    @StreamListener(Sink.INPUT)
    public void input(Message<String> message)
    {
        System.out.println("消费者1号，------->接收到的消息：" + message.getPayload()+"\t port: "+serverPort);
    }

}

```



#### 测试

先启动7001/7002, 再启动8801/8802

[测试 url](http://localhost:8801/sendMessage)

![image-20220120152544443](/assets/imgs/SpringCloud3.assets/image-20220120152544443.png)



>   控制台信息

![image-20220120153047276](/assets/imgs/SpringCloud3.assets/image-20220120153047276.png)

![image-20220120153032152](/assets/imgs/SpringCloud3.assets/image-20220120153032152.png)



>   交换机绑定关系

![image-20220120153104142](/assets/imgs/SpringCloud3.assets/image-20220120153104142.png)



### 分组消费与持久化

依照8802，clone出来一份运行8803



#### 启动

先启动7001/7002, 再启动8801/8802/8803



#### 运行后有两个问题

##### 重复消费

![image-20220120153350094](/assets/imgs/SpringCloud3.assets/image-20220120153350094.png)

![image-20220120153402177](/assets/imgs/SpringCloud3.assets/image-20220120153402177.png)

![image-20220120153411762](/assets/imgs/SpringCloud3.assets/image-20220120153411762.png)



##### 消息持久化问题





#### 消费

>   如何解决

分组和持久化属性group

比如在如下场景中，订单系统我们做集群部署，都会从RabbitMQ中获取订单信息，那如果**一个订单同时被两个服务获取到**，那么就会造成数据错误，我们得避免这种情况。

**这时我们就可以使用Stream中的消息分组来解决**

注意在Stream中处于同一个group中的多个消费者是竞争关系，就能够保证消息只会被其中一个应用消费一次。

**不同组是可以全面消费的(重复消费)**

**同一组内会发生竞争关系，只有其中一个可以消费。**



>   图解

![image-20220120153738778](/assets/imgs/SpringCloud3.assets/image-20220120153738778.png)

![image-20220120153809684](/assets/imgs/SpringCloud3.assets/image-20220120153809684.png)



#### 分组

微服务应用放置于同一个group中，就能够保证消息只会被其中一个应用消费一次。

**不同的组是可以消费的，同一个组内会发生竞争关系，只有其中一个可以消费。**



##### 8802/8803 都变成不同组

>   8802 - yaml 配置

```yaml
server:
  port: 8802

spring:
  application:
    name: cloud-stream-consumer
  cloud:
    stream:
      binders: # 在此处配置要绑定的rabbitmq的服务信息；
        defaultRabbit: # 表示定义的名称，用于于binding整合
          type: rabbit # 消息组件类型
          environment: # 设置rabbitmq的相关的环境配置
            spring:
              rabbitmq:
                host: 175.24.229.41
                port: 5672
                username: admin
                password: 123
                virtual-host: /
      bindings: # 服务的整合处理
        input: # 这个名字是一个通道的名称
          destination: studyExchange # 表示要使用的Exchange名称定义
          content-type: application/json # 设置消息类型，本次为json，文本则设置“text/plain”
          binder: defaultRabbit # 设置要绑定的消息服务的具体设置
          group: yixihan1


  #如果连接到远程RabbitMQ报Rabbit health check failed异常
  #配置以下信息
  #因为默认会尝试连接localhost:5672
  rabbitmq:
    host: 175.24.229.41
    port: 5672
    username: admin
    password: 123

eureka:
  client: # 客户端进行Eureka注册的配置
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka, http://eureka7002.com:7002/eureka
  instance:
    lease-renewal-interval-in-seconds: 2 # 设置心跳的时间间隔（默认是30秒）
    lease-expiration-duration-in-seconds: 5 # 如果现在超过了5秒的间隔（默认是90秒）
    instance-id: receive-8802.com  # 在信息列表时显示主机名称
    prefer-ip-address: true     # 访问的路径变为IP地址

```



>   8803 - yaml 配置

```yaml
server:
  port: 8803

spring:
  application:
    name: cloud-stream-consumer
  cloud:
    stream:
      binders: # 在此处配置要绑定的rabbitmq的服务信息；
        defaultRabbit: # 表示定义的名称，用于于binding整合
          type: rabbit # 消息组件类型
          environment: # 设置rabbitmq的相关的环境配置
            spring:
              rabbitmq:
                host: 175.24.229.41
                port: 5672
                username: admin
                password: 123
                virtual-host: /
      bindings: # 服务的整合处理
        input: # 这个名字是一个通道的名称
          destination: studyExchange # 表示要使用的Exchange名称定义
          content-type: application/json # 设置消息类型，本次为json，文本则设置“text/plain”
          binder: defaultRabbit # 设置要绑定的消息服务的具体设置
          group: yixihan2

  #如果连接到远程RabbitMQ报Rabbit health check failed异常
  #配置以下信息
  #因为默认会尝试连接localhost:5672
  rabbitmq:
    host: 175.24.229.41
    port: 5672
    username: admin
    password: 123

eureka:
  client: # 客户端进行Eureka注册的配置
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka, http://eureka7002.com:7002/eureka
  instance:
    lease-renewal-interval-in-seconds: 2 # 设置心跳的时间间隔（默认是30秒）
    lease-expiration-duration-in-seconds: 5 # 如果现在超过了5秒的间隔（默认是90秒）
    instance-id: receive-8803.com  # 在信息列表时显示主机名称
    prefer-ip-address: true     # 访问的路径变为IP地址

```



**主要是以 bindings 里面的 group 分配组**



>   测试

[发送信息](http://localhost:8801/sendMessage)

RabbitMQ 控制台 exchange 绑定信息

![image-20220120154407866](/assets/imgs/SpringCloud3.assets/image-20220120154407866.png)



控制台

![image-20220120154433185](/assets/imgs/SpringCloud3.assets/image-20220120154433185.png)

![image-20220120154439765](/assets/imgs/SpringCloud3.assets/image-20220120154439765.png)

![image-20220120154452810](/assets/imgs/SpringCloud3.assets/image-20220120154452810.png)



##### 8802/8803 都变成一个组

>   8802 - yaml 

```yaml
server:
  port: 8802

spring:
  application:
    name: cloud-stream-consumer
  cloud:
    stream:
      binders: # 在此处配置要绑定的rabbitmq的服务信息；
        defaultRabbit: # 表示定义的名称，用于于binding整合
          type: rabbit # 消息组件类型
          environment: # 设置rabbitmq的相关的环境配置
            spring:
              rabbitmq:
                host: 175.24.229.41
                port: 5672
                username: admin
                password: 123
                virtual-host: /
      bindings: # 服务的整合处理
        input: # 这个名字是一个通道的名称
          destination: studyExchange # 表示要使用的Exchange名称定义
          content-type: application/json # 设置消息类型，本次为json，文本则设置“text/plain”
          binder: defaultRabbit # 设置要绑定的消息服务的具体设置
          group: yixihan


  #如果连接到远程RabbitMQ报Rabbit health check failed异常
  #配置以下信息
  #因为默认会尝试连接localhost:5672
  rabbitmq:
    host: 175.24.229.41
    port: 5672
    username: admin
    password: 123

eureka:
  client: # 客户端进行Eureka注册的配置
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka, http://eureka7002.com:7002/eureka
  instance:
    lease-renewal-interval-in-seconds: 2 # 设置心跳的时间间隔（默认是30秒）
    lease-expiration-duration-in-seconds: 5 # 如果现在超过了5秒的间隔（默认是90秒）
    instance-id: receive-8802.com  # 在信息列表时显示主机名称
    prefer-ip-address: true     # 访问的路径变为IP地址

```



>   8803 - yaml

```yaml
server:
  port: 8803

spring:
  application:
    name: cloud-stream-consumer
  cloud:
    stream:
      binders: # 在此处配置要绑定的rabbitmq的服务信息；
        defaultRabbit: # 表示定义的名称，用于于binding整合
          type: rabbit # 消息组件类型
          environment: # 设置rabbitmq的相关的环境配置
            spring:
              rabbitmq:
                host: 175.24.229.41
                port: 5672
                username: admin
                password: 123
                virtual-host: /
      bindings: # 服务的整合处理
        input: # 这个名字是一个通道的名称
          destination: studyExchange # 表示要使用的Exchange名称定义
          content-type: application/json # 设置消息类型，本次为json，文本则设置“text/plain”
          binder: defaultRabbit # 设置要绑定的消息服务的具体设置
          group: yixihan

  #如果连接到远程RabbitMQ报Rabbit health check failed异常
  #配置以下信息
  #因为默认会尝试连接localhost:5672
  rabbitmq:
    host: 175.24.229.41
    port: 5672
    username: admin
    password: 123

eureka:
  client: # 客户端进行Eureka注册的配置
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka, http://eureka7002.com:7002/eureka
  instance:
    lease-renewal-interval-in-seconds: 2 # 设置心跳的时间间隔（默认是30秒）
    lease-expiration-duration-in-seconds: 5 # 如果现在超过了5秒的间隔（默认是90秒）
    instance-id: receive-8803.com  # 在信息列表时显示主机名称
    prefer-ip-address: true     # 访问的路径变为IP地址

```



>   测试

[发送信息](http://localhost:8801/sendMessage)

RabbitMQ 控制台 exchange 绑定信息

![image-20220120154627707](/assets/imgs/SpringCloud3.assets/image-20220120154627707.png)



控制台

![image-20220120154600295](/assets/imgs/SpringCloud3.assets/image-20220120154600295.png)

![image-20220120154606640](/assets/imgs/SpringCloud3.assets/image-20220120154606640.png)

![image-20220120154613470](/assets/imgs/SpringCloud3.assets/image-20220120154613470.png)



#### 持久化

##### 未持久化证明

>   去掉 8802 group属性

```yaml
server:
  port: 8802

spring:
  application:
    name: cloud-stream-consumer
  cloud:
    stream:
      binders: # 在此处配置要绑定的rabbitmq的服务信息；
        defaultRabbit: # 表示定义的名称，用于于binding整合
          type: rabbit # 消息组件类型
          environment: # 设置rabbitmq的相关的环境配置
            spring:
              rabbitmq:
                host: 175.24.229.41
                port: 5672
                username: admin
                password: 123
                virtual-host: /
      bindings: # 服务的整合处理
        input: # 这个名字是一个通道的名称
          destination: studyExchange # 表示要使用的Exchange名称定义
          content-type: application/json # 设置消息类型，本次为json，文本则设置“text/plain”
          binder: defaultRabbit # 设置要绑定的消息服务的具体设置
#          group: yixihan


  #如果连接到远程RabbitMQ报Rabbit health check failed异常
  #配置以下信息
  #因为默认会尝试连接localhost:5672
  rabbitmq:
    host: 175.24.229.41
    port: 5672
    username: admin
    password: 123

eureka:
  client: # 客户端进行Eureka注册的配置
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka, http://eureka7002.com:7002/eureka
  instance:
    lease-renewal-interval-in-seconds: 2 # 设置心跳的时间间隔（默认是30秒）
    lease-expiration-duration-in-seconds: 5 # 如果现在超过了5秒的间隔（默认是90秒）
    instance-id: receive-8802.com  # 在信息列表时显示主机名称
    prefer-ip-address: true     # 访问的路径变为IP地址

```



>   关闭 8802

![image-20220120155541848](/assets/imgs/SpringCloud3.assets/image-20220120155541848.png)



>   8801 发送 4 条消息

![image-20220120155612480](/assets/imgs/SpringCloud3.assets/image-20220120155612480.png)



>   8803 收到消息

![image-20220120155631800](/assets/imgs/SpringCloud3.assets/image-20220120155631800.png)



>   重启 8802, 查看是否能收到消息

![image-20220120155842787](/assets/imgs/SpringCloud3.assets/image-20220120155842787.png)



>   结论

未收到消息, 证明未持久化



##### 持久化证明

>   保留 8803 的 group 属性

```yaml
server:
  port: 8803

spring:
  application:
    name: cloud-stream-consumer
  cloud:
    stream:
      binders: # 在此处配置要绑定的rabbitmq的服务信息；
        defaultRabbit: # 表示定义的名称，用于于binding整合
          type: rabbit # 消息组件类型
          environment: # 设置rabbitmq的相关的环境配置
            spring:
              rabbitmq:
                host: 175.24.229.41
                port: 5672
                username: admin
                password: 123
                virtual-host: /
      bindings: # 服务的整合处理
        input: # 这个名字是一个通道的名称
          destination: studyExchange # 表示要使用的Exchange名称定义
          content-type: application/json # 设置消息类型，本次为json，文本则设置“text/plain”
          binder: defaultRabbit # 设置要绑定的消息服务的具体设置
          group: yixihan

  #如果连接到远程RabbitMQ报Rabbit health check failed异常
  #配置以下信息
  #因为默认会尝试连接localhost:5672
  rabbitmq:
    host: 175.24.229.41
    port: 5672
    username: admin
    password: 123

eureka:
  client: # 客户端进行Eureka注册的配置
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka, http://eureka7002.com:7002/eureka
  instance:
    lease-renewal-interval-in-seconds: 2 # 设置心跳的时间间隔（默认是30秒）
    lease-expiration-duration-in-seconds: 5 # 如果现在超过了5秒的间隔（默认是90秒）
    instance-id: receive-8803.com  # 在信息列表时显示主机名称
    prefer-ip-address: true     # 访问的路径变为IP地址

```



>   关闭 8803

![image-20220120155957576](/assets/imgs/SpringCloud3.assets/image-20220120155957576.png)



>   8801 发送 4 条信息

![image-20220120160021861](/assets/imgs/SpringCloud3.assets/image-20220120160021861.png)



>   8802 成功接收到信息

![image-20220120160037181](/assets/imgs/SpringCloud3.assets/image-20220120160037181.png)



>   重启 8803, 查看是否能收到消息

![image-20220120160122420](/assets/imgs/SpringCloud3.assets/image-20220120160122420.png)



>   结论

成功收到消息, 证明已持久化



##### 总结

**group 属性是持久化的关键, 若要持久化, 必须添加**



## SpringCloud Sleuth分布式请求链路跟踪



### 概述



>   为什么会出现这个技术？需要解决哪些问题？

在微服务框架中，一个由客户端发起的请求在后端系统中会经过多个不同的的服务节点调用来协同产生最后的请求结果，每一个前段请求都会形成一条复杂的分布式服务调用链路，链路中的任何一环出现高延时或错误都会引起整个请求最后的失败。



#### 是什么

>   官网

[官网](https://github.com/spring-cloud/spring-cloud-sleuth)



Spring Cloud Sleuth提供了一套完整的服务跟踪的解决方案

在分布式系统中提供追踪解决方案并且兼容支持了zipkin



>   图解

![image-20220120160401508](/assets/imgs/SpringCloud3.assets/image-20220120160401508.png)



### 搭建链路监控步骤



#### zipkin



##### 下载

SpringCloud从F版起已不需要自己构建Zipkin Server了，只需调用jar包即可

[下载地址](https://repo1.maven.org/maven2/io/zipkin/java/zipkin-server)

[一键下载](https://repo1.maven.org/maven2/io/zipkin/java/zipkin-server/2.12.9/zipkin-server-2.12.9-exec.jar)

##### 运行

```shell
java -jar zipkin-server-2.12.9-exec.jar
```



##### 运行控制台

>   web 控制台

[web 控制台](http://localhost:9411/zipkin/)



##### 术语

>   完整的调用链路 

表示一请求链路，一条链路通过Trace Id唯一标识，Span标识发起的请求信息，各span通过parent id 关联起来

![image-20220120161707341](/assets/imgs/SpringCloud3.assets/image-20220120161707341.png)



>   精简

一条链路通过Trace Id唯一标识，Span标识发起的请求信息，各span通过parent id 关联起来

![image-20220120161734516](/assets/imgs/SpringCloud3.assets/image-20220120161734516.png)

![image-20220120161741002](/assets/imgs/SpringCloud3.assets/image-20220120161741002.png)



>   名词解释

Trace:类似于树结构的Span集合，表示一条调用链路，存在唯一标识

span:表示调用链路来源，通俗的理解span就是一次请求信息



#### 服务提供者

修改 cloud-provider-payment8001/8002

##### POM

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
        <!--包含了sleuth+zipkin-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-zipkin</artifactId>
        </dependency>
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



##### YAML

```yaml
server:
  port: 8002

spring:
  application:
    name: cloud-payment-service
  zipkin:
    base-url: http://localhost:9411
  sleuth:
    sampler:
      #采样率值介于 0 到 1 之间，1 则表示全部采集
      probability: 1
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

  instance:
    # 主机名称 : 服务名称修改
    instance-id: payment8002
    # 访问路径可以显示 IP 地址
    prefer-ip-address: true
    # Eureka 客户端向服务端发送心跳的时间间隔，单位为秒(默认是30秒)
    lease-expiration-duration-in-seconds: 30
    # Eureka服务端在收到最后一次心跳后等待时间上限，单位为秒(默认是90秒)，超时将剔除服务
    lease-renewal-interval-in-seconds: 90
```



##### 业务类

```java
// ====================> zipkin+sleuth
@GetMapping("/payment/zipkin")
public String paymentZipkin()
{
    return "hi ,i'am paymentzipkin server fall back，welcome to atguigu，O(∩_∩)O哈哈~";
}
```



#### 服务消费者(调用方)

修改 cloud-consumer-order80



##### POM

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
        <!--包含了sleuth+zipkin-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-zipkin</artifactId>
        </dependency>

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



##### YAML

```yaml
server:
  port: 80

spring:
  application:
    name: cloud-order-service
  zipkin:
    base-url: http://localhost:9411
  sleuth:
    sampler:
      probability: 1


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
    instance-id: order80
    # 访问路径可以显示 IP 地址
    prefer-ip-address: true
    # Eureka 客户端向服务端发送心跳的时间间隔，单位为秒(默认是30秒)
    lease-expiration-duration-in-seconds: 30
    # Eureka服务端在收到最后一次心跳后等待时间上限，单位为秒(默认是90秒)，超时将剔除服务
    lease-renewal-interval-in-seconds: 90
```



##### 业务类

```java
// ====================> zipkin+sleuth
@GetMapping("/payment/zipkin")
public String paymentZipkin()
{
    return restTemplate.getForObject("http://localhost:8001"+"/payment/zipkin/", String.class);
}
```



#### 测试

>   依次启动 zipkin, 7001/7002, 8001/8002, 80

![image-20220120164432534](/assets/imgs/SpringCloud3.assets/image-20220120164432534.png)

![image-20220120164423052](/assets/imgs/SpringCloud3.assets/image-20220120164423052.png)

>   80 调用接口几次

[url](http://localhost/consumer/payment/zipkin)

![image-20220120164402547](/assets/imgs/SpringCloud3.assets/image-20220120164402547.png)



>   登录 zipkin 控制台查看

[zipkin](http://127.0.0.1:9411/zipkin/)



查找

![image-20220120164806209](/assets/imgs/SpringCloud3.assets/image-20220120164806209.png)

![image-20220120164835456](/assets/imgs/SpringCloud3.assets/image-20220120164835456.png)



查看依赖关系

![image-20220120164930392](/assets/imgs/SpringCloud3.assets/image-20220120164930392.png)

