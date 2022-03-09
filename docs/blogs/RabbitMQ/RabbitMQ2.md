---
title: RabbitMQ2
date: 2022-03-09
tags:
 - Linux
 - RabbitMQ
categories:
 - RabbitMQ
---
# RabbitMQ



## 延迟队列



### 延迟队列概念

延时队列,队列内部是有序的，最重要的特性就体现在它的延时属性上，延时队列中的元素是希望在指定时间到了以后或之前取出和处理，简单来说，延时队列就是用来存放需要在指定时间被处理的元素的队列。





### 延迟队列使用场景

-   订单在十分钟之内未支付则自动取消
-   新创建的店铺，如果在十天内都没有上传过商品，则自动发送消息提醒。
-   用户注册成功后，如果三天内没有登陆则进行短信提醒。
-   用户发起退款，如果三天内没有得到处理则通知相关运营人员
-   预定会议后，需要在预定的时间点前十分钟通知各个与会人员参加会议



这些场景都有一个特点，需要在某个事件发生之后或者之前的指定时间点完成某一项任务, 对这么庞大的数据量使用轮询的方式显然是不可取的，很可能在一秒内无法完成所有订单的检查，同时会给数据库带来很大压力，无法满足业务要求而且性能低下。



>   图解

![image-20220115084117720](/assets/imgs/RabbitMQ2.assets/image-20220115084117720.png)



### RabbitMQ 中的 TTL



>   TTL 简介

TTL 是 RabbitMQ 中一个消息或者队列的属性，表明一条消息或者该队列中的所有消息的最大存活时间，

单位是毫秒。换句话说，如果一条消息设置了 TTL 属性或者进入了设置 TTL 属性的队列，那么这条消息如果在 TTL 设置的时间内没有被消费，则会成为"死信"。如果同时配置了队列的 TTL 和消息的TTL，那么较小的那个值将会被使用，有两种方式设置 TTL。



#### 消息设置 TTL

```java
// 死信消息 设置 TTL 时间 time to live
// 单位是 ms
AMQP.BasicProperties props = new AMQP.BasicProperties ()
    .builder ().expiration ("10000").build ();

channel.basicPublish (NORMAL_EXCHANGE_NAME, null, props, message.getBytes ());
```



#### 队列设置 TTL

```java
// 过期时间, 可由交换机或者生产者设置
arguments.put ("x-message-ttl", 10000);
channel.queueDeclare (QUEUE_NAME, false, false, false, arguments);
```



#### 两者的区别 

如果设置了队列的 TTL 属性，那么一旦消息过期，就会被队列丢弃(如果配置了死信队列被丢到死信队列中)，而第二种方式，消息即使过期，也不一定会被马上丢弃，因为**消息是否过期是在即将投递到消费者 之前判定的**，如果当前队列有严重的消息积压情况，则已过期的消息也许还能存活较长时间；另外，还需要注意的一点是，如果不设置 TTL，表示消息永远不会过期，如果将 TTL 设置为 0，则表示除非此时可以直接投递该消息到消费者，否则该消息将会被丢弃。

前一小节我们介绍了死信队列，刚刚又介绍了 TTL，至此利用 RabbitMQ 实现延时队列的两大要素已 经集齐，接下来只需要将它们进行融合，再加入一点点调味料，延时队列就可以新鲜出炉了。想想看，延 时队列，不就是想要消息延迟多久被处理吗，TTL 则刚好能让消息在延迟多久之后成为死信，另一方面， 成为死信的消息都会被投递到死信队列里，这样只需要消费者一直消费死信队列里的消息就完事了，因为 里面的消息都是希望被立即处理的消息。



### 整合 SpringBoot



#### 创建 SpringBoot 项目

省略



#### 添加依赖

```xml
<dependencies>
    <!-- RabbitMQ 依赖 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-amqp</artifactId>
    </dependency>
    
    <!-- web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- devtools -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
        <optional>true</optional>
    </dependency>

    <!-- alibaba fastjson -->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <version>1.2.78</version>
    </dependency>

    <!-- lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    
    <!-- swagger 2-->
    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-swagger2</artifactId>
        <version>2.9.2</version>
    </dependency>
    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-swagger-ui</artifactId>
        <version>2.9.2</version>
    </dependency>

    <!-- test -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    
    <!-- RabbitMQ 测试依赖 -->
    <dependency>
        <groupId>org.springframework.amqp</groupId>
        <artifactId>spring-rabbit-test</artifactId>
        <scope>test</scope>
    </dependency>
    
</dependencies>
```



#### 修改配置文件

```yaml
spring:
  rabbitmq:
    host: 175.24.229.41
    port: 5672
    username: admin
    password: 123
```



#### 添加 Swagger 配置类

```java
package com.yixihan.config.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Swagger 配置类
 * @author : yixihan
 * @create : 2022-01-15-8:58
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket webApiConfig () {

        return new Docket (DocumentationType.SWAGGER_2)
                .groupName ("webApi")
                .apiInfo (webApiInfo ())
                .select ()
                .build ();
    }


    private ApiInfo webApiInfo() {

        Contact authorInfo = new Contact ("yixihan", "https://github.com/yixihan", "yixihan20010617@gmail.com");
        return new ApiInfoBuilder ()
                .title ("RabbitMQ 接口文档")
                .description ("本文档描述了 RabbitMQ 微服务接口定义")
                .version ("1.0")
                .contact (authorInfo)
                .build ();
    }
}

```



### 队列 TTL



#### 代码架构图 

创建两个队列 QA 和 QB，两者队列 TTL 分别设置为 10S 和 40S，然后在创建一个交换机 X 和死信交 换机 Y，它们的类型都是 direct，创建一个死信队列 QD，它们的绑定关系如下：

![image-20220115090550140](/assets/imgs/RabbitMQ2.assets/image-20220115090550140.png)





#### 配置文件类

注意 : @Qualifier 是导入 `org.springframework.beans.factory.annotation.Qualifier` 这个注解

```java
package com.yixihan.config.rabbitmq;

import org.springframework.amqp.core.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;

/**
 * TTL 队列 配置文件类代码
 * @author : yixihan
 * @create : 2022-01-15-9:08
 */
@Configuration
public class TtlQueueConfig {

    /**
     * 普通交换机的名称
     */
    public static final String X_EXCHANGE_NAME = "X";

    /**
     * 普通队列的名称
     */
    public static final String QUEUE_A_NAME = "QA";
    public static final String QUEUE_B_NAME = "QB";

    /**
     * 死信交换机的名称
     */
    public static final String Y_DEAD_EXCHANGE_NAME = "Y";


    /**
     * 死信队列的名称
     */
    public static final String DEAD_QUEUE_NAME = "QD";

    /**
     * 声明普通交换机 - X
     * 别名 ---> 为 xExchange
     */
    @Bean("xExchange")
    public DirectExchange xExchange () {
        return new DirectExchange (X_EXCHANGE_NAME);
    }

    /**
     * 声明普通交换机 - Y
     * 别名 ---> 为 yExchange
     */
    @Bean("yExchange")
    public DirectExchange yExchange () {
        return new DirectExchange (Y_DEAD_EXCHANGE_NAME);
    }

    /**
     * 声明普通队列 QA
     * TTL = 10s
     */
    @Bean("queueA")

    public Queue queueA () {

        HashMap<String, Object> arguments = new HashMap<> (16);

        // 设置死信交换机
        arguments.put ("x-dead-letter-exchange", Y_DEAD_EXCHANGE_NAME);

        // 设置死信 Routing Key
        arguments.put ("x-dead-letter-routing-key", "YD");

        // 设置 TTL 单位为 ms
        arguments.put ("x-message-ttl", 10000);
        return QueueBuilder.durable (QUEUE_A_NAME)
                .withArguments (arguments)
                .build ();
    }

    /**
     * 声明普通队列 QB
     * TTL = 10s
     */
    @Bean("queueB")
    public Queue queueB () {

        HashMap<String, Object> arguments = new HashMap<> (16);

        // 设置死信交换机
        arguments.put ("x-dead-letter-exchange", Y_DEAD_EXCHANGE_NAME);

        // 设置死信 Routing Key
        arguments.put ("x-dead-letter-routing-key", "YD");

        // 设置 TTL 单位为 ms
        arguments.put ("x-message-ttl", 40000);
        return QueueBuilder.durable (QUEUE_B_NAME)
                .withArguments (arguments)
                .build ();
    }

    /**
     * 声明死信队列 QD
     * TTL = 10s
     */
    @Bean("queueD")
    public Queue queueD () {

        return QueueBuilder.durable (DEAD_QUEUE_NAME)
                .build ();
    }

    @Bean
    public Binding queueABindingX (@Qualifier("queueA") Queue queueA,
                                   @Qualifier("xExchange") DirectExchange xExchange) {

        return BindingBuilder.bind (queueA).to (xExchange).with ("XA");
    }

    @Bean
    public Binding queueBBindingX (@Qualifier("queueB") Queue queueB,
                                   @Qualifier("xExchange") DirectExchange xExchange) {

        return BindingBuilder.bind (queueB).to (xExchange).with ("XB");
    }

    @Bean

    public Binding queueDBindingY (@Qualifier("queueD") Queue queueD,
                                   @Qualifier("yExchange") DirectExchange yExchange) {

        return BindingBuilder.bind (queueD).to (yExchange).with ("YD");
    }
}

```



#### 生产者

```java
package com.yixihan.controller.rabbitmq;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * 发送延迟消息
 * @author : yixihan
 * @create : 2022-01-15-9:44
 */
@Slf4j
@RestController
@RequestMapping("/ttl")
public class SendMsgController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    /**
     * 开始发消息
     */
    @GetMapping("/sendMsg/{message}")
    public void sendMsg (@PathVariable("message") String message) {
        log.info ("当前时间 : {}, 发送一条信息给两个 TTL 队列 :{}", new Date ().toString (), message);
        rabbitTemplate.convertAndSend ("X", "XA", "消息来自 ttl 为 10s 的队列 : " + message);
        rabbitTemplate.convertAndSend ("X", "XB", "消息来自 ttl 为 40s 的队列 : " + message);
    }
}

```



#### 消费者

```java
package com.yixihan.comsumer;

import com.rabbitmq.client.Channel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @author : yixihan
 * @create : 2022-01-15-9:49
 */
@Slf4j
@Component
public class DeadLetterQueueConsumer {

    /**
     * 接收消息
     */
    @RabbitListener(queues = "QD")
    public void receiveD (Message message, Channel channel) {
        String msg = new String (message.getBody ());

        log.info ("当前时间 :{}, 收到死信队列的消息 : {}", new Date ().toString (), msg);

    }
}

```



#### 测试

测试请求 :

[测试](http://localhost:8080/ttl/sendMsg/%E5%98%BB%E5%98%BB%E5%98%BB)

![image-20220115095455885](/assets/imgs/RabbitMQ2.assets/image-20220115095455885.png)



#### 总结

第一条消息在 10S 后变成了死信消息，然后被消费者消费掉，第二条消息在 40S 之后变成了死信消息， 然后被消费掉，这样一个延时队列就打造完成了。

不过，如果这样使用的话，岂不是**每增加一个新的时间需求，就要新增一个队列**，这里只有 10S 和 40S两个时间选项，如果需要一个小时后处理，那么就需要增加 TTL 为一个小时的队列，如果是预定会议室然后提前通知这样的场景，岂不是要增加无数个队列才能满足需求？



### 延时队列优化



#### 代码架构图

![image-20220115095739372](/assets/imgs/RabbitMQ2.assets/image-20220115095739372.png)



#### 配置文件

```java
/**
 * 普通队列的名称
 */
public static final String QUEUE_C_NAME = "QC";

/**
 * 声明普通队列 QC
 * TTL 由生产者指定
 */
@Bean("queueC")
public Queue queueC () {

    HashMap<String, Object> arguments = new HashMap<> (16);

    // 设置死信交换机
    arguments.put ("x-dead-letter-exchange", Y_DEAD_EXCHANGE_NAME);

    // 设置死信 Routing Key
    arguments.put ("x-dead-letter-routing-key", "YD");

    // 设置 TTL 单位为 ms  TTL 由生产者指定
    //        arguments.put ("x-message-ttl", 40000);
    return QueueBuilder.durable (QUEUE_C_NAME)
        .withArguments (arguments)
        .build ();
}

@Bean
public Binding queueCBindingX (@Qualifier("queueC") Queue queueC,
                               @Qualifier("xExchange") DirectExchange xExchange) {

    return BindingBuilder.bind (queueC).to (xExchange).with ("XC");
}
```



#### 生产者

```java
@GetMapping("/sendExpirationMsg/{message}/{ttlTime}")
public void sendMsg (@PathVariable("message") String message, @PathVariable("ttlTime") String ttlTime) {
    MessagePostProcessor messagePostProcessor = correlationData -> {
        correlationData.getMessageProperties ().setExpiration (ttlTime);
        return correlationData;
    };
    rabbitTemplate.convertAndSend ("X", "XC", message, messagePostProcessor);
    log.info ("当前时间 : {}, 发送 TTL 时长为 {} ms 的信息给 TTL 队列 :{}", new Date ().toString (), ttlTime, message);
}
```



#### 消费者

桶队列 TTL 实战 - 消费者



#### 测试

测试请求 :

[测试1](http://localhost:8080/ttl/sendExpirationMsg/你好 1/20000)

[测试2](http://localhost:8080/ttl/sendExpirationMsg/你好 2/2000)

![image-20220115100948315](/assets/imgs/RabbitMQ2.assets/image-20220115100948315.png)



#### 总结

看起来似乎没什么问题，但是在最开始的时候，就介绍过如果使用在消息属性上设置 TTL 的方式，消 息可能并不会按时“死亡“，因为 **RabbitMQ 只会检查第一个消息是否过期**，如果过期则丢到死信队列， **如果第一个消息的延时时长很长，而第二个消息的延时时长很短，第二个消息并不会优先得到执行**。



### Rabbitmq 插件实现延迟队列

上文中提到的问题，确实是一个问题，如果不能实现在消息粒度上的 TTL，并使其在设置的 TTL 时间 及时死亡，就无法设计成一个通用的延时队列。那如何解决呢，接下来我们就去解决该问题。



#### 安装延时队列插件

[插件下载地址](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases)



```shell
# 进入 RabbitMQ 的安装目录下的 plgins 目录
cd /usr/lib/rabbitmq/lib/rabbitmq_server-3.9.12/plugins/

# 安装插件
rabbitmq-plugins enable rabbitmq_delayed_message_exchange

# 重启 RabbitMQ
systemctl restart rabbitmq-server
```



>   检测插件是否安装成功

![image-20220115101919856](/assets/imgs/RabbitMQ2.assets/image-20220115101919856.png)



>   插件之前的流程图

![image-20220115102350898](/assets/imgs/RabbitMQ2.assets/image-20220115102350898.png)



>   插件之后的流程图

![image-20220115102422558](/assets/imgs/RabbitMQ2.assets/image-20220115102422558.png)



#### 代码架构图

在这里新增了一个队列 delayed.queue,一个自定义交换机 delayed.exchange，绑定关系如下:

![image-20220115102312659](/assets/imgs/RabbitMQ2.assets/image-20220115102312659.png)



#### 配置文件

```java
package com.yixihan.config.rabbitmq;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.CustomExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;

/**
 * 基于插件实现的 延迟队列 配置类
 * @author : yixihan
 * @create : 2022-01-15-10:26
 */
@Configuration
public class DelayedQueueConfig {

    /**
     * 交换机
     */
    public static final String DELAYED_EXCHANGE_NAME = "delayed.exchange";

    /**
     * 队列
     */
    public static final String DELAYED_QUEUE_NAME = "delayed.queue";

    /**
     * Routing Key
     */
    public static final String DELAYED_ROUTING_KEY = "delayed.routingkey";


    /**
     * 声明交换机
     */
    @Bean("delayedExchange")
    public CustomExchange delayedExchange () {
        /*
        CustomExchange(String name, String type, boolean durable, boolean autoDelete, Map<String, Object> arguments)
        name : 交换机的名称
        type : 交换机的类型, x-delayed-message
        durable : 是否需要持久化
        autoDelete : 是否需要自动删除
        arguments : 其他的参数
         */
        HashMap<String, Object> arguments = new HashMap<> ();

        arguments.put ("x-delayed-type", "direct");

        return new CustomExchange (DELAYED_EXCHANGE_NAME, "x-delayed-message",
                true, false, arguments);
    }

    /**
     * 声明队列
     */
    @Bean("deliveryQueue")
    public Queue deliveryQueue () {
        return new Queue (DELAYED_QUEUE_NAME);
    }

    /**
     * 绑定
     */
    @Bean
    public Binding deliveryQueueBindingDeliveryExchange (
            @Qualifier("delayedExchange") CustomExchange deliveryExchange,
            @Qualifier("deliveryQueue") Queue deliverQueue
    ) {
        return BindingBuilder.bind (deliverQueue).to (deliveryExchange).with (DELAYED_ROUTING_KEY).noargs ();
    }
}

```





#### 生产者

```java
/**
 * 发消息, 基于插件, 发送消息及延迟的时间
 */
@GetMapping("/sendDelayMsg/{message}/{delayTime}")
public void sendMsg (@PathVariable("message") String message, @PathVariable("delayTime") Integer delayTime) {

    MessagePostProcessor messagePostProcessor = correlationData -> {
        correlationData.getMessageProperties ().setDelay (delayTime);
        return correlationData;
    };

    log.info ("当前时间 : {}, 发送一条时长为 {} ms 的信息给延迟队列 :{}", new Date ().toString (), delayTime, message);


    rabbitTemplate.convertAndSend (DelayedQueueConfig.DELAYED_EXCHANGE_NAME,
                                   DelayedQueueConfig.DELAYED_ROUTING_KEY,
                                   message,
                                   messagePostProcessor
                                  );
}
```



#### 消费者

```java
package com.yixihan.comsumer;

import com.rabbitmq.client.Channel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @author : yixihan
 * @create : 2022-01-15-9:49
 */
@Slf4j
@Component
public class DeadLetterQueueConsumer {

    /**
     * 接收消息
     */
    @RabbitListener(queues = "QD")
    public void receiveD (Message message, Channel channel) {
        String msg = new String (message.getBody ());

        log.info ("当前时间 :{}, 收到死信队列的消息 : {}", new Date ().toString (), msg);

    }
}

```



#### 测试



测试请求 : 

[测试1](http://localhost:8080/ttl/sendDelayMsg/come on baby1/20000)

[测试2](http://localhost:8080/ttl/sendDelayMsg/come on baby2/2000)

![image-20220115105029890](/assets/imgs/RabbitMQ2.assets/image-20220115105029890.png)



#### 总结

第二个消息被先消费掉了，符合预期



### 总结

延时队列在需要延时处理的场景下非常有用，使用 RabbitMQ 来实现延时队列可以很好的利用RabbitMQ 的特性，如：消息可靠发送、消息可靠投递、死信队列来保障消息至少被消费一次以及未被正确处理的消息不会被丢弃。另外，通过 RabbitMQ 集群的特性，可以很好的解决单点故障问题，不会因为单个节点挂掉导致延时队列不可用或者消息丢失。

当然，延时队列还有很多其它选择，比如利用 Java 的 DelayQueue，利用 Redis 的 zset，利用 Quartz 或者利用 kafka 的时间轮，这些方式各有特点,看需要适用的场景



## 发布确认高级

在生产环境中由于一些不明原因，导致 rabbitmq 重启，在 RabbitMQ 重启期间生产者消息投递失败，导致消息丢失，需要手动处理和恢复。于是，我们开始思考，如何才能进行 RabbitMQ 的消息可靠投递呢？特别是在这样比较极端的情况，RabbitMQ 集群不可用的时候，无法投递的消息该如何处理呢:

```java
应 用 [xxx] 在 [08-1516:36:04] 发 生 [ 错误日志异常 ] ， alertId=[xxx] 。 由 [org.springframework.amqp.rabbit.listener.BlockingQueueConsumer:start:620] 触发。
    
应用 xxx 可能原因如下
服务名为：
异常为： org.springframework.amqp.rabbit.listener.BlockingQueueConsumer:start:620,
产 生 原 因 如 下 :1.org.springframework.amqp.rabbit.listener.QueuesNotAvailableException:
Cannot prepare queue for listener. Either the queue doesn't exist or the broker will not allow us to use it.||Consumer received fatal=false exception on startup:
```



### 发布确认 springboot 版本



#### 确认机制方案

![image-20220115105913061](/assets/imgs/RabbitMQ2.assets/image-20220115105913061.png)



#### 代码架构图

![image-20220115105925997](/assets/imgs/RabbitMQ2.assets/image-20220115105925997.png)



#### 配置文件

application.yaml

```yaml
# NONE : 禁用发布确认模式，是默认值
# CORRELATED : 发布消息成功到交换器后会触发回调方法
# SIMPLE : 经测试有两种效果，
# 效果一和 CORRELATED 值一样会触发回调方法,
# 其二在发布消息成功后使用 rabbitTemplate 调用 waitForConfirms 或 waitForConfirmsOrDie 方法
# 等待 broker 节点返回发送结果，根据返回结果来判定下一步的逻辑，要注意的点是
# waitForConfirmsOrDie 方法如果返回 false 则会关闭 channel，则接下来无法发送消息到 broker
publisher-confirm-type: correlated
```





#### 配置类

```java
package com.yixihan.config.rabbitmq;

import org.springframework.amqp.core.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 配置类 - 发布确认 (高级内容)
 * @author : yixihan
 * @create : 2022-01-15-11:06
 */
@Configuration
public class ConfirmConfig {

    /**
     * 交换机
     */
    public static final String CONFIRM_EXCHANGE_NAME = "confirm_exchange";

    /**
     * 队列
     */
    public static final String CONFIRM_QUEUE_NAME = "confirm_queue";

    /**
     * routing key
     */
    public static final String CONFIRM_ROUTING_KEY = "key1";

    @Bean("confirmExchange")
    public DirectExchange confirmExchange () {
        return new DirectExchange (CONFIRM_EXCHANGE_NAME);
    }


    @Bean("confirmQueue")
    public Queue confirmQueue () {
        return QueueBuilder.durable (CONFIRM_QUEUE_NAME).build ();
    }

    @Bean
    public Binding queueBindingExchange (
            @Qualifier("confirmExchange") DirectExchange confirmExchange,
            @Qualifier("confirmQueue") Queue confirmQueue
    ) {
        return BindingBuilder.bind (confirmQueue).to (confirmExchange).with (CONFIRM_ROUTING_KEY);
    }
}

```



#### 生产者

```java
package com.yixihan.controller.rabbitmq.confirm;

import com.yixihan.config.rabbitmq.ConfirmConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 发消息 - 测试确认
 * @author : yixihan
 * @create : 2022-01-15-11:12
 */
@RestController
@RequestMapping("/confirm")
@Slf4j
public class ProduceController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @GetMapping("/sendMessage/{message}")
    public void sendMessage (@PathVariable("message") String message) {

        CorrelationData correlationData1 = new CorrelationData ("1");

        rabbitTemplate.convertAndSend (
                ConfirmConfig.CONFIRM_EXCHANGE_NAME,
                ConfirmConfig.CONFIRM_ROUTING_KEY,
                message + " <key1>",
                correlationData1
                );

        log.info ("发送消息内容 : {} <key1>", message);

        CorrelationData correlationData2 = new CorrelationData ("2");

        rabbitTemplate.convertAndSend (
                ConfirmConfig.CONFIRM_EXCHANGE_NAME + "123",
                ConfirmConfig.CONFIRM_ROUTING_KEY,
                message + " <key2>",
                correlationData2
        );

        log.info ("发送消息内容 : {} <key2>", message);

        CorrelationData correlationData3 = new CorrelationData ("3");

        rabbitTemplate.convertAndSend (
                ConfirmConfig.CONFIRM_EXCHANGE_NAME,
                ConfirmConfig.CONFIRM_ROUTING_KEY + "123",
                message + " <key3>",
                correlationData3
        );

        log.info ("发送消息内容 : {} <key3>", message);
    }
}

```



#### 消费者

```java
package com.yixihan.comsumer;

import com.yixihan.config.rabbitmq.ConfirmConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

/**
 * @author : yixihan
 * @create : 2022-01-15-11:15
 */
@Component
@Slf4j
public class ConfirmConsumer {


    @RabbitListener(queues = ConfirmConfig.CONFIRM_QUEUE_NAME)
    public void receiveConfirmMessage (Message message) {
        log.info ("接受到的队列 confirm.queue 消息 : {}", new String (message.getBody ()));
    }
}

```



#### 回调接口

```java
package com.yixihan.config.rabbitmq;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * 自定义回调接口
 * @author : yixihan
 * @create : 2022-01-15-11:33
 */
@Component
@Slf4j
public class MyCallBack implements RabbitTemplate.ConfirmCallback {

    /**
     * 注入
     */
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @PostConstruct
    public void init () {
        rabbitTemplate.setConfirmCallback (this);
    }

    /**
     * void confirm(@Nullable CorrelationData correlationData, boolean ack, @Nullable String cause);
     * 交换机确认回调方法
     * 1. 发消息 交换机收到了 回调
     * correlationData : 保存回调消息的 ID 及相关信息
     * ack : 交换机收到消息 ack = true
     * cause : null
     * 2. 发消息, 交换机接收失败了 回调
     * correlationData : 保存回调消息的 ID 及相关信息
     * ack : 交换机收到消息 ack = false
     * cause : 失败的原因
     *
     * @param correlationData 保存回调消息的 ID 及相关信息
     * @param ack             交换机收到信息
     * @param cause           失败的原因
     */
    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {
        String id = correlationData != null ? correlationData.getId () : "";
        if (ack) {
            log.info ("交换机已经收到了 ID 为 : {} 的消息", id);
        } else {
            log.info ("交换机还未收到 ID 为 : {} 的消息, 失败的原因是 : {}", id, cause);
        }
    }
}

```



#### 测试

>   测试 1 - 成功

![image-20220115114521790](/assets/imgs/RabbitMQ2.assets/image-20220115114521790.png)



>   测试2 - 失败 (exchange 错误)

![image-20220115114905538](/assets/imgs/RabbitMQ2.assets/image-20220115114905538.png)



>   综合测试 

key1 => 正常情况

key2 => exchange 错误

key3 => routing key 错误

![image-20220115115818554](/assets/imgs/RabbitMQ2.assets/image-20220115115818554.png)



#### 总结

可以看到，发送了两条消息，第一条消息的 RoutingKey 为 "key1"，第二条消息的 RoutingKey 为 "key2"，两条消息都成功被交换机接收，也收到了交换机的确认回调，但消费者只收到了一条消息，因为 第二条消息的 RoutingKey 与队列的 BindingKey 不一致，也没有其它队列能接收这个消息，所有第二条消息被直接丢弃了。



### 回退消息



#### Mandatory 参数

**在仅开启了生产者确认机制的情况下，交换机接收到消息后，会直接给消息生产者发送确认消息，如果发现该消息不可路由，那么消息会被直接丢弃，此时生产者是不知道消息被丢弃这个事件的。**那么如何让无法被路由的消息帮我想办法处理一下？最起码通知我一声，我好自己处理啊。通过设置 mandatory 参数可以在当消息传递过程中不可达目的地时将消息返回给生产者。



#### 配置文件

```yaml
# 回退消息
publisher-returns: true

```



#### 生产者

```java
package com.yixihan.controller.rabbitmq.confirm;

import com.yixihan.config.rabbitmq.ConfirmConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 发消息 - 测试确认
 * @author : yixihan
 * @create : 2022-01-15-11:12
 */
@RestController
@RequestMapping("/confirm")
@Slf4j
public class ProduceController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @GetMapping("/sendMessage/{message}")
    public void sendMessage (@PathVariable("message") String message) {

        CorrelationData correlationData1 = new CorrelationData ("1");

        rabbitTemplate.convertAndSend (
                ConfirmConfig.CONFIRM_EXCHANGE_NAME,
                ConfirmConfig.CONFIRM_ROUTING_KEY,
                message + " <key1>",
                correlationData1
                );

        log.info ("发送消息内容 : {} <key1>", message);

        CorrelationData correlationData2 = new CorrelationData ("2");

        rabbitTemplate.convertAndSend (
                ConfirmConfig.CONFIRM_EXCHANGE_NAME + "123",
                ConfirmConfig.CONFIRM_ROUTING_KEY,
                message + " <key2>",
                correlationData2
        );

        log.info ("发送消息内容 : {} <key2>", message);

        CorrelationData correlationData3 = new CorrelationData ("3");

        rabbitTemplate.convertAndSend (
                ConfirmConfig.CONFIRM_EXCHANGE_NAME,
                ConfirmConfig.CONFIRM_ROUTING_KEY + "123",
                message + " <key3>",
                correlationData3
        );

        log.info ("发送消息内容 : {} <key3>", message);
    }
}

```



#### 消费者

同发布确认 SpringBoot 版本 - 消费者



#### 回调接口

```java
package com.yixihan.controller.rabbitmq.confirm;

import com.yixihan.config.rabbitmq.ConfirmConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 发消息 - 测试确认
 * @author : yixihan
 * @create : 2022-01-15-11:12
 */
@RestController
@RequestMapping("/confirm")
@Slf4j
public class ProduceController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @GetMapping("/sendMessage/{message}")
    public void sendMessage (@PathVariable("message") String message) {

        CorrelationData correlationData1 = new CorrelationData ("1");

        rabbitTemplate.convertAndSend (
                ConfirmConfig.CONFIRM_EXCHANGE_NAME,
                ConfirmConfig.CONFIRM_ROUTING_KEY,
                message + " <key1>",
                correlationData1
                );

        log.info ("发送消息内容 : {} <key1>", message);

        CorrelationData correlationData2 = new CorrelationData ("2");

        rabbitTemplate.convertAndSend (
                ConfirmConfig.CONFIRM_EXCHANGE_NAME + "123",
                ConfirmConfig.CONFIRM_ROUTING_KEY,
                message + " <key2>",
                correlationData2
        );

        log.info ("发送消息内容 : {} <key2>", message);

        CorrelationData correlationData3 = new CorrelationData ("3");

        rabbitTemplate.convertAndSend (
                ConfirmConfig.CONFIRM_EXCHANGE_NAME,
                ConfirmConfig.CONFIRM_ROUTING_KEY + "123",
                message + " <key3>",
                correlationData3
        );

        log.info ("发送消息内容 : {} <key3>", message);
    }
}

```



#### 测试

![image-20220115123900849](/assets/imgs/RabbitMQ2.assets/image-20220115123900849.png)



#### 总结

可以实现回退效果, 即使 routing key 错误, 也能回退到生产者



### 备份交换机

有了 mandatory 参数和回退消息，我们获得了对无法投递消息的感知能力，有机会在生产者的消息无法被投递时发现并处理。但有时候，我们并不知道该如何处理这些无法路由的消息，最多打个日志，然后触发报警，再来手动处理。而通过日志来处理这些无法路由的消息是很不优雅的做法，特别是当生产者所在的服务有多台机器的时候，手动复制日志会更加麻烦而且容易出错。而且设置 mandatory 参数会增加生产者的复杂性，需要添加处理这些被退回的消息的逻辑。如果既不想丢失消息，又不想增加生产者的复杂性，该怎么做呢？前面在设置死信队列的文章中，我们提到，可以为队列设置死信交换机来存储那些处理失败的消息，可是这些不可路由消息根本没有机会进入到队列，因此无法使用死信队列来保存消息。在 RabbitMQ 中，有一种备份交换机的机制存在，可以很好的应对这个问题。什么是备份交换机呢？备份交换机可以理解为 RabbitMQ 中交换机的“备胎”，当我们为某一个交换机声明一个对应的备份交换机时，就是为它创建一个备胎，当交换机接收到一条不可路由消息时，将会把这条消息转发到备份交换机中，由备份交换机来进行转发和处理，通常备份交换机的类型为 Fanout ，这样就能把所有消息都投递到与其绑定的队列中，然后我们在备份交换机下绑定一个队列，这样所有那些原交换机无法被路由的消息，就会都进入这个队列了。当然，我们还可以建立一个报警队列，用独立的消费者来进行监测和报警。



#### 代码架构图 

![image-20220115124355853](/assets/imgs/RabbitMQ2.assets/image-20220115124355853.png)

#### 配置类

```java
package com.yixihan.config.rabbitmq;

import org.springframework.amqp.core.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;

/**
 * 配置类 - 发布确认 (高级内容)
 * @author : yixihan
 * @create : 2022-01-15-11:06
 */
@Configuration
public class ConfirmConfig {

    /**
     * 交换机
     */
    public static final String CONFIRM_EXCHANGE_NAME = "confirm_exchange";

    /**
     * 队列
     */
    public static final String CONFIRM_QUEUE_NAME = "confirm_queue";

    /**
     * routing key
     */
    public static final String CONFIRM_ROUTING_KEY = "key1";

    /**
     * 备份交换机
     */
    public static final String BACKUP_EXCHANGE_NAME = "backup_exchange";

    /**
     * 备份队列
     */
    public static final String BACKUP_QUEUE_NAME = "backup_queue";

    /**
     * 报警队列
     */
    public static final String WARNING_QUEUE_NAME = "warning_queue";


    @Bean("confirmExchange")
    public DirectExchange confirmExchange () {

        HashMap<String, Object> arguments = new HashMap<> (16);
        arguments.put ("alternate-exchange", BACKUP_EXCHANGE_NAME);

        return ExchangeBuilder.directExchange (CONFIRM_EXCHANGE_NAME)
                .durable (true)
                .withArguments (arguments)
                .build ();
    }

    @Bean("backupExchange")
    public FanoutExchange backupExchange () {
        return new FanoutExchange (BACKUP_EXCHANGE_NAME);
    }

    @Bean("backupQueue")
    public Queue backupQueue () {
        return QueueBuilder.durable (BACKUP_QUEUE_NAME).build ();
    }

    @Bean("warningQueue")
    public Queue warningQueue () {
        return QueueBuilder.durable (WARNING_QUEUE_NAME).build ();
    }


    @Bean("confirmQueue")
    public Queue confirmQueue () {
        return QueueBuilder.durable (CONFIRM_QUEUE_NAME).build ();
    }

    @Bean
    public Binding queueBindingExchange (
            @Qualifier("confirmExchange") DirectExchange confirmExchange,
            @Qualifier("confirmQueue") Queue confirmQueue
    ) {
        return BindingBuilder.bind (confirmQueue).to (confirmExchange).with (CONFIRM_ROUTING_KEY);
    }

    @Bean
    public Binding queueBackupBindingExchangeBackup (
            @Qualifier("backupExchange") FanoutExchange confirmExchange,
            @Qualifier("backupQueue") Queue backupQueue
    ) {
        return BindingBuilder.bind (backupQueue).to (confirmExchange);
    }

    @Bean
    public Binding queueWarningBindingExchangeBackup (
            @Qualifier("backupExchange") FanoutExchange confirmExchange,
            @Qualifier("warningQueue") Queue warningQueue
    ) {
        return BindingBuilder.bind (warningQueue).to (confirmExchange);
    }
}

```



#### 生产者

```java
package com.yixihan.controller.rabbitmq.confirm;

import com.yixihan.config.rabbitmq.ConfirmConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 发消息 - 测试确认
 * @author : yixihan
 * @create : 2022-01-15-11:12
 */
@RestController
@RequestMapping("/confirm")
@Slf4j
public class ProduceController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @GetMapping("/sendMessage/{message}")
    public void sendMessage (@PathVariable("message") String message) {

        CorrelationData correlationData1 = new CorrelationData ("1");

        rabbitTemplate.convertAndSend (
                ConfirmConfig.CONFIRM_EXCHANGE_NAME,
                ConfirmConfig.CONFIRM_ROUTING_KEY,
                message + " <key1>",
                correlationData1
                );

        log.info ("发送消息内容 : {} <key1>", message);

        CorrelationData correlationData2 = new CorrelationData ("2");

        rabbitTemplate.convertAndSend (
                ConfirmConfig.CONFIRM_EXCHANGE_NAME + "123",
                ConfirmConfig.CONFIRM_ROUTING_KEY,
                message + " <key2>",
                correlationData2
        );

        log.info ("发送消息内容 : {} <key2>", message);

        CorrelationData correlationData3 = new CorrelationData ("3");

        rabbitTemplate.convertAndSend (
                ConfirmConfig.CONFIRM_EXCHANGE_NAME,
                ConfirmConfig.CONFIRM_ROUTING_KEY + "123",
                message + " <key3>",
                correlationData3
        );

        log.info ("发送消息内容 : {} <key3>", message);
    }
}

```



#### 消费者

备份消费者

```java
package com.yixihan.comsumer;

import com.yixihan.config.rabbitmq.ConfirmConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

/**
 * @author : yixihan
 * @create : 2022-01-15-12:58
 */
@Slf4j
@Component
public class BackupConsumer {

    /**
     * 接收备份消息
     */
    @RabbitListener(queues = ConfirmConfig.BACKUP_QUEUE_NAME)
    public void receiveWarningMessage (Message message) {
        String msg = new String (message.getBody ());
        log.info ("备份发现不可路由消息 : {}", msg);
    }
}

```



警告消费者

```java
package com.yixihan.comsumer;

import com.yixihan.config.rabbitmq.ConfirmConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

/**
 * @author : yixihan
 * @create : 2022-01-15-12:56
 */
@Component
@Slf4j
public class WarningConsumer {

    /**
     * 接收报警消息
     */
    @RabbitListener(queues = ConfirmConfig.WARNING_QUEUE_NAME)
    public void receiveWarningMessage (Message message) {
        String msg = new String (message.getBody ());
        log.error ("报警发现不可路由消息 : {}", msg);
    }
}

```



#### 测试

>   测试注意事项

重新启动项目的时候需要把原来的 confirm.exchange 删除因为我们修改了其绑定属性，不然报以下错:

![image-20220115130119503](/assets/imgs/RabbitMQ2.assets/image-20220115130119503.png)



#### 总结

mandatory 参数与备份交换机可以一起使用的时候，如果两者同时开启，消息究竟何去何从？谁优先 级高，经过上面结果显示答案是**备份交换机优先级高**。



## RabbitMQ 其他知识点



### 幂等性



#### 概念 

用户对于同一操作发起的一次请求或者多次请求的结果是一致的，不会因为多次点击而产生了副作用。举个最简单的例子，那就是支付，用户购买商品后支付，支付扣款成功，但是返回结果的时候网络异常，此时钱已经扣了，用户再次点击按钮，此时会进行第二次扣款，返回结果成功，用户查询余额发现多扣钱了，流水记录也变成了两条。在以前的单应用系统中，我们只需要把数据操作放入事务中即可，发生错误立即回滚，但是再响应客户端的时候也有可能出现网络中断或者异常等等



#### 消息重复消费 

消费者在消费 MQ 中的消息时，MQ 已把消息发送给消费者，消费者在给 MQ 返回 ack 时网络中断，故 MQ 未收到确认信息，该条消息会重新发给其他的消费者，或者在网络重连后再次发送给该消费者，但实际上该消费者已成功消费了该条消息，造成消费者消费了重复的消息。



#### 解决思路

MQ 消费者的幂等性的解决一般使用全局 ID 或者写个唯一标识比如时间戳 或者 UUID 或者订单消费者消费 MQ 中的消息也可利用 MQ 的该 id 来判断，或者可按自己的规则生成一个全局唯一 id，每次消费消息时用该 id 先判断该消息是否已消费过。



#### 消费端的幂等性保障

在海量订单生成的业务高峰期，生产端有可能就会重复发生了消息，这时候消费端就要实现幂等性，这就意味着我们的消息永远不会被消费多次，即使我们收到了一样的消息。业界主流的幂等性有两种操作:a. 唯一 ID+指纹码机制,利用数据库主键去重, b.利用 redis 的原子性去实现



#### 唯一 ID + 指纹码机制

指纹码:我们的一些规则或者时间戳加别的服务给到的唯一信息码,它并不一定是我们系统生成的，基本都是由我们的业务规则拼接而来，但是一定要保证唯一性，然后就利用查询语句进行判断这个 id 是否存在数据库中,优势就是实现简单就一个拼接，然后查询判断是否重复；劣势就是在高并发时，如果是单个数据库就会有写入性能瓶颈当然也可以采用分库分表提升性能，但也不是我们最推荐的方式。



#### Redis 原子性

利用 redis 执行 setnx 命令，天然具有幂等性。从而实现不重复消费



### 优先级队列



#### 使用场景 

在我们系统中有一个**订单催付**的场景，我们的客户在天猫下的订单,淘宝会及时将订单推送给我们，如果在用户设定的时间内未付款那么就会给用户推送一条短信提醒，很简单的一个功能对吧，但是，tmall 商家对我们来说，肯定是要分大客户和小客户的对吧，比如像苹果，小米这样大商家一年起码能给我们创造很大的利润，所以理应当然，他们的订单必须得到优先处理，而曾经我们的后端系统是使用 redis 来存放的定时轮询，大家都知道 redis 只能用 List 做一个简简单单的消息队列，并不能实现一个优先级的场景，所以订单量大了后采用 RabbitMQ 进行改造和优化,如果发现是大客户的订单给一个相对比较高的优先级， 否则就是默认优先级。



>   图解

![image-20220115133926528](/assets/imgs/RabbitMQ2.assets/image-20220115133926528.png)



#### 如何添加

添加方式一共有三种

-   控制台页面添加
-   队列中代码添加优先级
-   消息中代码添加优先级



>   控制台页面添加

![image-20220115133612287](/assets/imgs/RabbitMQ2.assets/image-20220115133612287.png)



>   队列中代码添加优先级

```java
HashMap<String, Object> arguments = new HashMap<> (16);
// 优先级队列 0 - 255 越大优先级越大
// 推荐使用 0 - 10
arguments.put ("x-max-priority", 10);
channel.queueDeclare ("hello", false, false, false, arguments);
```



>   消息中代码添加优先级

```java
AMQP.BasicProperties properties = new
AMQP.BasicProperties().builder().priority(5).build();
```

![image-20220115134107474](/assets/imgs/RabbitMQ2.assets/image-20220115134107474.png)

![image-20220115134850594](/assets/imgs/RabbitMQ2.assets/image-20220115134850594.png)



>   注意事项

要让队列实现优先级需要做的事情有如下事情:队列需要设置为优先级队列，消息需要设置消息的优先级，消费者需要等待消息已经发送到队列中才去消费因为，这样才有机会对消息进行排序



#### 实战



##### 生产者

```java
package com.yixihan.controller.rabbitmq.priority;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.yixihan.controller.rabbitmq.util.RabbitMqUtils;

import java.util.HashMap;

/**
 * 生产者 : 发消息
 * @author : yixihan
 * @create : 2022-01-14-9:52
 */
public class Producer {

    /**
     * 队列名称
     */
    public static final String QUEUE_NAME = "hello";

    /**
     * 发消息
     */
    public static void main(String[] args) throws Exception {

        Channel channel = RabbitMqUtils.getChannel ();

        /*
        生成一个队列
        queueDeclare(String queue, boolean durable, boolean exclusive, boolean autoDelete,
                                 Map<String, Object> arguments) ;

        queue : 队列名称
        durable : 队列里面的消息是否持久化 (磁盘) 默认情况消息存储在内存中
        exclusive : 该队列是否只供一个消费者进行消费, 是否进行消息共享, true : 可以多个消费者消费, false : 只能一个消费者消费
        autoDelete : 是否自动删除 最后一个消费者段断开连接以后, 该队列是否自动删除, true : 自动删除, false : 不自动删除
        arguments : 其他参数

         */
        HashMap<String, Object> arguments = new HashMap<> (16);
        // 官方允许是 0 - 255 之间, 此处设置 0, 允许优先级范围 0 - 10, 不要设置过大, 浪费 CPU 与内存
        arguments.put ("x-max-priority", 10);
        channel.queueDeclare (QUEUE_NAME, true, false, false, arguments);

        // 发大量消息
        for (int i = 0; i < 100; i++) {
            String message = "info" + (i + 1);
            if (i % 25 == 0) {
                AMQP.BasicProperties properties =
                        new AMQP.BasicProperties ().builder ().priority (5).build ();
                channel.basicPublish ("", QUEUE_NAME, properties, message.getBytes ());
            } else {
                channel.basicPublish ("", QUEUE_NAME, null, message.getBytes ());
            }
        }


        System.out.println ("消息发送完毕");

    }
}

```



##### 消费者

```java
package com.yixihan.controller.rabbitmq.priority;

import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.yixihan.controller.rabbitmq.util.RabbitMqUtils;

/**
 * 消费者 : 接收消息
 * 优先级队列
 * @author : yixihan
 * @create : 2022-01-14-10:25
 */
public class Customer {

    /**
     * 队列的名称
     */
    public static final String QUEUE_NAME = "hello";

    /**
     * 接收消息
     */
    public static void main(String[] args) throws Exception {

        Channel channel = RabbitMqUtils.getChannel ();

        System.out.println ("等待接收消息... ");

        // 声明
        DeliverCallback deliverCallback = (consumerTag, message) -> System.out.println (new String (message.getBody ()));

        CancelCallback cancelCallback = consumerTag -> System.out.println ("消息消费被中断");
        
        channel.basicConsume (QUEUE_NAME, true, deliverCallback, cancelCallback);
    }
}

```



#### 测试

>   控制台



![image-20220115135022584](/assets/imgs/RabbitMQ2.assets/image-20220115135022584.png)

>   消费者

![image-20220115135102552](/assets/imgs/RabbitMQ2.assets/image-20220115135102552.png)



### 惰性队列



#### 使用场景

RabbitMQ 从 3.6.0 版本开始引入了惰性队列的概念。惰性队列会尽可能的将消息存入磁盘中，而在消费者消费到相应的消息时才会被加载到内存中，它的一个重要的设计目标是能够支持更长的队列，即支持更多的消息存储。当消费者由于各种各样的原因(比如消费者下线、宕机亦或者是由于维护而关闭等)而致使长时间内不能消费消息造成堆积时，惰性队列就很有必要了。

默认情况下，当生产者将消息发送到 RabbitMQ 的时候，队列中的消息会尽可能的存储在内存之中，这样可以更加快速的将消息发送给消费者。即使是持久化的消息，在被写入磁盘的同时也会在内存中驻留一份备份。当 RabbitMQ 需要释放内存的时候，会将内存中的消息换页至磁盘中，这个操作会耗费较长的时间，也会阻塞队列的操作，进而无法接收新的消息。虽然 RabbitMQ 的开发者们一直在升级相关的算法，但是效果始终不太理想，尤其是在消息量特别大的时候。



>   图解





#### 两种模式

队列具备两种模式：default 和 lazy。默认的为 default 模式，在 3.6.0 之前的版本无需做任何变更。lazy 模式即为惰性队列的模式，可以通过调用 channel.queueDeclare 方法的时候在参数中设置，也可以通过 Policy 的方式设置，如果一个队列同时使用这两种方式设置的话，那么 Policy 的方式具备更高的优先级。如果要通过声明的方式改变已有队列的模式的话，那么只能先删除队列，然后再重新声明一个新的。

在队列声明的时候可以通过`“x-queue-mode”`参数来设置队列的模式，取值为`“default”`和`“lazy”`。下面示例中演示了一个惰性队列的声明细节：

```java
Map<String, Object> args = new HashMap<String, Object>();
args.put("x-queue-mode", "lazy");
channel.queueDeclare("myqueue", false, false, false, args);
```



#### 内存开销对比

![image-20220115135324356](/assets/imgs/RabbitMQ2.assets/image-20220115135324356.png)

在发送 1 百万条消息，每条消息大概占 1KB 的情况下，普通队列占用内存是 1.2GB，而惰性队列仅仅占用 1.5MB



## RabbitMQ 集群



### clustering





#### 使用集群的原因

最开始我们介绍了如何安装及运行 RabbitMQ 服务，不过这些是单机版的，无法满足目前真实应用的要求。如果 RabbitMQ 服务器遇到内存崩溃、机器掉电或者主板故障等情况，该怎么办？单台 RabbitMQ 服务器可以满足每秒 1000 条消息的吞吐量，那么如果应用需要 RabbitMQ 服务满足每秒 10 万条消息的吞吐量呢？购买昂贵的服务器来增强单机 RabbitMQ 务的性能显得捉襟见肘，搭建一个 RabbitMQ 集群才是 解决实际问题的关键.



#### 搭建步骤 



>   修改 2 台主机的名称

```shell
vim /etc/hostname

# 修改之后重启 linux, 使修改失效
reboot
```

![image-20220115140725234](/assets/imgs/RabbitMQ2.assets/image-20220115140725234.png)

![image-20220115140735692](/assets/imgs/RabbitMQ2.assets/image-20220115140735692.png)



>   配置各个节点的 hosts 文件，让各个节点都能互相识别对方

```shell
vim /etc/hosts

175.24.229.41 master
110.42.138.132 slave1
175.24.163.161 slave2

```

![image-20220115140832295](/assets/imgs/RabbitMQ2.assets/image-20220115140832295.png)



>   测试是否能成功识别

```shell
ping master

ping salve
```

![image-20220115140941072](/assets/imgs/RabbitMQ2.assets/image-20220115140941072.png)

![image-20220115140929774](/assets/imgs/RabbitMQ2.assets/image-20220115140929774.png)



>   开启防火墙

```shell
firewall-cmd --add-port=25672/tcp --permanent
firewall-cmd --add-port=4369/tcp --permanent
firewall-cmd --reload
```



>   以确保各个节点的 cookie 文件使用的是同一个值

```shell
# 直接把 master 上面的 cookie 通过 xftp 拷贝过去
TUAOTMAWXVSQWDISMLNU

```



>   重启 RabbitMQ

```shell
/sbin/service rabbitmq-server restart
```



>   启动 RabbitMQ 服务,顺带启动 Erlang 虚拟机和 RbbitMQ 应用服务(在两台节点上分别执行以 下命令)

```shell
rabbitmq-server -detached
```



>   在节点 slave 执行

```shell
# (rabbitmqctl stop 会将 Erlang 虚拟机关闭，rabbitmqctl stop_app 只关闭 RabbitMQ 服务)
rabbitmqctl stop_app

rabbitmqctl reset
rabbitmqctl join_cluster rabbit@master
# (只启动应用服务)
rabbitmqctl start_app
```



>   查看集群状态

```shell
rabbitmqctl cluster_status
```

![image-20220116074446385](/assets/imgs/RabbitMQ2.assets/image-20220116074446385.png)

>   重新设置账号

```shell
# 创建账号
rabbitmqctl add_user admin 123
# 设置用户角色
rabbitmqctl set_user_tags admin administrator
# 设置用户权限
rabbitmqctl set_permissions -p "/" admin ".*" ".*" ".*"

```



>   解除集群节点 (在 slave 节点上执行)

```shell
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl start_app
rabbitmqctl cluster_status
# (slave 机器上执行)
rabbitmqctl forget_cluster_node rabbit@slave
```



>   登录 web 控制台

![image-20220116074507939](/assets/imgs/RabbitMQ2.assets/image-20220116074507939.png)



### 镜像队列

如果 RabbitMQ 集群中只有一个 Broker 节点，那么该节点的失效将导致整体服务的临时性不可用，并且也可能会导致消息的丢失。可以将所有消息都设置为持久化，并且对应队列的durable属性也设置为true，但是这样仍然无法避免由于缓存导致的问题：因为消息在发送之后和被写入磁盘井执行刷盘动作之间存在一个短暂却会产生问题的时间窗。通过 publisherconfirm 机制能够确保客户端知道哪些消息己经存入磁盘，尽管如此，一般不希望遇到因单点故障导致的服务不可用。

引入镜像队列(Mirror Queue)的机制，可以将队列镜像到集群中的其他 Broker 节点之上，如果集群中的一个节点失效了，队列能自动地切换到镜像中的另一个节点上以保证服务的可用性。



#### 搭建步骤

>   启动三台集群节点

```shell
/sbin/service rabbitmq-server start
```



>   随便找一个节点添加 policy

![image-20220116075920798](/assets/imgs/RabbitMQ2.assets/image-20220116075920798.png)

![image-20220116080157728](/assets/imgs/RabbitMQ2.assets/image-20220116080157728.png)



>   测试

![image-20220116080221834](/assets/imgs/RabbitMQ2.assets/image-20220116080221834.png)

![image-20220116080234304](/assets/imgs/RabbitMQ2.assets/image-20220116080234304.png)



>   总结

就算整个集群只剩下一台机器了 依然能消费队列里面的消息

说明队列里面的消息被镜像队列传递到相应机器里面了



### Haproxy+Keepalive 实现高可用负载均衡



#### 整体架构图 

![image-20220116080758776](/assets/imgs/RabbitMQ2.assets/image-20220116080758776.png)



#### Haproxy 实现负载均衡 

HAProxy 提供高可用性、负载均衡及基于 TCPHTTP 应用的代理，支持虚拟主机，它是免费、快速并 且可靠的一种解决方案，包括 Twitter,Reddit,StackOverflow,GitHub 在内的多家知名互联网公司在使用。 HAProxy 实现了一种事件驱动、单一进程模型，此模型支持非常大的井发连接数。

[扩展 nginx,lvs,haproxy 之间的区别](http://www.ha97.com/5646.html)



#### 搭建步骤(未自己实现)

>   下载 haproxy(在 node1 和 node2)

```shell
yum -y install haproxy
```



>   修改 node1 和 node2 的 haproxy.cfg

```shell
vim /etc/haproxy/haproxy.cfg

#---------------------------------------------------------------------
# rabbitmq haproxy
#---------------------------------------------------------------------
server rabbit_master 175.24.229.41:5672 check inter 5000 rise 2 fall 3 weight 1
server rabbit_slave 110.42.138.132:5672 check inter 5000 rise 2 fall 3 weight 1
```



>   开启防火墙

```shell
firewall-cmd --add-port=8888/tcp --permanent
firewall-cmd --add-port=5000/tcp --permanent
firewall-cmd --add-port=5672/tcp --permanent
firewall-cmd --reload
```



>   在两台节点启动 haproxy

```shell
haproxy -f /etc/haproxy/haproxy.cfg
ps -ef | grep haproxy
```



>   访问地址

[master](http://175.24.229.41:8888/stats)

[slave](http://110.42.138.132:8888/stats)



>   没搭成功, 不知道咋搭



### Federation Exchange



#### 原理图

![image-20220116083223118](/assets/imgs/RabbitMQ2.assets/image-20220116083223118.png)



#### 搭建步骤

>   需要保证每台节点单独运行

```shell
/sbin/service rabbitmq-server start
```



>   安装插件

```shell
rabbitmq-plugins enable rabbitmq_federation
rabbitmq-plugins enable rabbitmq_federation_management
```



>   在 downstream(slave)里面创建 fed_exchange 交换机 和 slave_queue 队列

```java
package com.yixihan.controller.rabbitmq.federationexchange;

import com.rabbitmq.client.Channel;
import com.yixihan.controller.rabbitmq.util.RabbitMqUtils;

import java.nio.charset.StandardCharsets;
import java.util.Random;
import java.util.Scanner;

/**
 * @author : yixihan
 * @create : 2022-01-16-8:35
 */
public class FederationExchange {

    /**
     * 交换机的名字
     */
    public static final String FED_EXCHANGE = "fed_exchange";

    public static void main(String[] args) throws Exception {

        String[] status = {"info", "warning", "error"};
        Random random = new Random();

        Channel channel = RabbitMqUtils.getSlaveChannel ();

        channel.exchangeDeclare (FED_EXCHANGE, "direct");
        channel.queueDeclare ("fed_queue", true,false, false, null);
        channel.queueBind ("fed_queue", FED_EXCHANGE, "routingKey");

        Scanner sc = new Scanner(System.in);

        while (sc.hasNext ()) {
            int index = random.nextInt (3);
            String message = "这是一条 " + status[index] + " 信息, 信息内容 : " + sc.next ();
            System.out.println ("发送的消息为 : " + message);
            channel.basicPublish (FED_EXCHANGE, status[index], null, message.getBytes (StandardCharsets.UTF_8));
        }
    }
}

```



>   在 downstream(slave)配置 upstream(matser)

![image-20220116085500694](/assets/imgs/RabbitMQ2.assets/image-20220116085500694.png)



>   添加 policy

![image-20220116085621658](/assets/imgs/RabbitMQ2.assets/image-20220116085621658.png)



>   成功的前提

![image-20220116085741736](/assets/imgs/RabbitMQ2.assets/image-20220116085741736.png)



### Federation Queue



#### 使用它的原因

联邦队列可以在多个 Broker 节点(或者集群)之间为单个队列提供均衡负载的功能。一个联邦队列可以连接一个或者多个上游队列(upstream queue)，并从这些上游队列中获取消息以满足本地消费者消费消息的需求。



#### 原理图

![image-20220116085839233](/assets/imgs/RabbitMQ2.assets/image-20220116085839233.png)



#### 搭建步骤

>   添加 upstream

![image-20220116085500694](/assets/imgs/RabbitMQ2.assets/image-20220116085500694.png)



>   添加 policy

![image-20220116090200964](/assets/imgs/RabbitMQ2.assets/image-20220116090200964.png)



>   成功的前提

![image-20220116090223927](/assets/imgs/RabbitMQ2.assets/image-20220116090223927.png)



### Shovel



#### 使用它的原因

Federation 具备的数据转发功能类似，Shovel 够可靠、持续地从一个 Broker 中的队列(作为源端，即 source)拉取数据并转发至另一个 Broker 中的交换器(作为目的端，即 destination)。作为源端的队列和作为目的端的交换器可以同时位于同一个 Broker，也可以位于不同的 Broker 上。Shovel 可以翻译为"铲子"，是一种比较形象的比喻，这个"铲子"可以将消息从一方"铲子"另一方。Shovel 行为就像优秀的客户端应用程序能够负责连接源和目的地、负责消息的读写及负责连接失败问题的处理。



#### 原理图

在源头发送的消息直接回进入到目的地队列

![image-20220116090444771](/assets/imgs/RabbitMQ2.assets/image-20220116090444771.png)



#### 搭建步骤

>   开启插件(需要的机器都开启)

```shell
rabbitmq-plugins enable rabbitmq_shovel
rabbitmq-plugins enable rabbitmq_shovel_management

```



>   查看是否开启成功

![image-20220116090509492](/assets/imgs/RabbitMQ2.assets/image-20220116090509492.png)



>   添加 shovel 源和目的地

![image-20220116090732414](/assets/imgs/RabbitMQ2.assets/image-20220116090732414.png)

>   查看是否配置成功

![image-20220116090905830](/assets/imgs/RabbitMQ2.assets/image-20220116090905830.png)

