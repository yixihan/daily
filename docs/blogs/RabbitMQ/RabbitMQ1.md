---
title: RabbitMQ1
date: 2022-03-09
tags:
 - Linux
 - RabbitMQ
categories:
 - RabbitMQ
---
# RabbitMQ



## MQ 相关概念



### 什么是 MQ

MQ(message queue)，从字面意思上看，本质是个队列，FIFO 先入先出，只不过队列中存放的内容是 message 而已，还是一种跨进程的通信机制，用于上下游传递消息。在互联网架构中，MQ 是一种非常常 见的上下游“逻辑解耦+物理解耦”的消息通信服务。使用了 MQ 之后，消息发送上游只需要依赖 MQ，不用依赖其他服务。



### 为什么要使用 MQ



MQ 有三大功能

-   流量消峰
-   应用解耦
-   异步处理



>   流量消峰

举个例子，如果订单系统最多能处理一万次订单，这个处理能力应付正常时段的下单时绰绰有余，正 常时段我们下单一秒后就能返回结果。但是在高峰期，如果有两万次下单操作系统是处理不了的，只能限 制订单超过一万后不允许用户下单。使用消息队列做缓冲，我们可以取消这个限制，把一秒内下的订单分 散成一段时间来处理，这时有些用户可能在下单十几秒后才能收到下单成功的操作，但是比不能下单的体验要好。

![image-20220114082101851](/assets/imgs/RabbitMQ1.assets/image-20220114082101851.png)



>   应用解耦

以电商应用为例，应用中有订单系统、库存系统、物流系统、支付系统。用户创建订单后，如果耦合 调用库存系统、物流系统、支付系统，任何一个子系统出了故障，都会造成下单操作异常。当转变成基于 消息队列的方式后，系统间调用的问题会减少很多，比如物流系统因为发生故障，需要几分钟来修复。在 这几分钟的时间里，物流系统要处理的内存被缓存在消息队列中，用户的下单操作可以正常完成。当物流 系统恢复后，继续处理订单信息即可，中单用户感受不到物流系统的故障，提升系统的可用性。

![image-20220114082159590](/assets/imgs/RabbitMQ1.assets/image-20220114082159590.png)



>   异步处理

有些服务间调用是异步的，例如 A 调用 B，B 需要花费很长时间执行，但是 A 需要知道 B 什么时候可 以执行完，以前一般有两种方式，A 过一段时间去调用 B 的查询 api 查询。或者 A 提供一个 callback api， B 执行完之后调用 api 通知 A 服务。这两种方式都不是很优雅，使用消息总线，可以很方便解决这个问题， A 调用 B 服务后，只需要监听 B 处理完成的消息，当 B 处理完成后，会发送一条消息给 MQ，MQ 会将此 消息转发给 A 服务。这样 A 服务既不用循环调用 B 的查询 api，也不用提供 callback api。同样 B 服务也不 用做这些操作。A 服务还能及时的得到异步处理成功的消息。

![image-20220114082302447](/assets/imgs/RabbitMQ1.assets/image-20220114082302447.png)



### MQ 分类



#### ActiveMQ

[ActiveMQ 官网](https://activemq.apache.org/)



>   优点

-   单机吞吐量万级
-   时效性 ms 级
-   可用性高，基于主从架构实现高可用性
-   消息可靠性较 低的概率丢失数据



>   缺点

-   官方社区现在对 ActiveMQ 5.x 维护越来越少
-   高吞吐量场景较少使用。



#### Kafka

大数据的杀手锏，谈到大数据领域内的消息传输，则绕不开 Kafka，这款为大数据而生的消息中间件， 以其百万级 TPS 的吞吐量名声大噪，迅速成为大数据领域的宠儿，在数据采集、传输、存储的过程中发挥 着举足轻重的作用。目前已经被 LinkedIn，Uber, Twitter, Netflix 等大公司所采纳。

[Kafka 官网](https://kafka.apache.org/)



>   优点

-   性能卓越，单机写入 TPS 约在百万条/秒，最大的优点，就是吞吐量高。
-   时效性 ms 级可用性非 常高，kafka 是分布式的，一个数据多个副本，少数机器宕机，不会丢失数据，不会导致不可用
-   消费者采 用 Pull 方式获取消息, 消息有序, 通过控制能够保证所有消息被消费且仅被消费一次
-   有优秀的第三方 Kafka Web 管理界面 Kafka-Manager
-   在日志领域比较成熟，被多家公司和多个开源项目使用
-   功能支持： 功能较为简单，主要支持简单的 MQ 功能，在大数据领域的实时计算以及日志采集被大规模使用



>   缺点

-   Kafka 单机超过 64 个队列/分区，Load 会发生明显的飙高现象，队列越多，load 越高，发送消息响应时间变长
-   使用短轮询方式，实时性取决于轮询间隔时间，消费失败不支持重试
-   支持消息顺序， 但是一台代理宕机后，就会产生消息乱序，社区更新较慢



#### RocketMQ

RocketMQ 出自阿里巴巴的开源产品，用 Java 语言实现，在设计时参考了 Kafka，并做出了自己的一 些改进。被阿里巴巴广泛应用在订单，交易，充值，流计算，消息推送，日志流式处理，binglog 分发等场景。

[RocketMQ 官网](https://rocketmq.apache.org/)



>   优点

-   单机吞吐量十万级,可用性非常高，分布式架构
-   消息可以做到 0 丢失,MQ 功能较为完善，还是分 布式的，扩展性好
-   支持 10 亿级别的消息堆积，不会因为堆积导致性能下降
-   源码是 java 我们可以自己阅 读源码，定制自己公司的 MQ



>   缺点

-   支持的客户端语言不多，目前是 java 及 c++，其中 c++不成熟
-   社区活跃度一般,没有在 MQ 核心中去实现 JMS 等接口,有些系统要迁移需要修改大量代码



#### RabbitMQ

2007 年发布，是一个在 AMQP(高级消息队列协议)基础上完成的，可复用的企业消息系统，是当前最 主流的消息中间件之一。

[RabbitMQ 官网](https://www.rabbitmq.com/)



>   优点

-   由于 erlang 语言的高并发特性，性能较好
-   吞吐量到万级
-   MQ 功能比较完备,健壮、稳定、易 用、跨平台
-   支持多种语言 如：Python、Ruby、.NET、Java、JMS、C、PHP、ActionScript、XMPP、STOMP 等，支持 AJAX 文档齐全
-   开源提供的管理界面非常棒，用起来很好用,社区活跃度高
-   更新频率相当高



>   缺点

-   商业版需要收费,学习成本较高



### MQ 的选择



>   kafka

Kafka 主要特点是基于 Pull 的模式来处理消息消费，追求高吞吐量，一开始的目的就是用于日志收集 和传输，适合产生大量数据的互联网服务的数据收集业务。大型公司建议可以选用，如果有日志采集功能， 肯定是首选 kafka 了



>   RocketMQ

天生为金融互联网领域而生，对于可靠性要求很高的场景，尤其是电商里面的订单扣款，以及业务削 峰，在大量交易涌入时，后端可能无法及时处理的情况。RoketMQ 在稳定性上可能更值得信赖，这些业务 场景在阿里双 11 已经经历了多次考验，如果你的业务有上述并发场景，建议可以选择 RocketMQ。



>   RabbitMQ

结合 erlang 语言本身的并发优势，性能好时效性微秒级，社区活跃度也比较高，管理界面用起来十分 方便，如果你的数据量没有那么大，中小型公司优先选择功能比较完备的 RabbitMQ。



## RabbitMQ



### RabbitMQ 概念

RabbitMQ 是一个消息中间件：它接受并转发消息。你可以把它当做一个快递站点，当你要发送一个包 裹时，你把你的包裹放到快递站，快递员最终会把你的快递送到收件人那里，按照这种逻辑 RabbitMQ 是 一个快递站，一个快递员帮你传递快件。RabbitMQ 与快递站的主要区别在于，它不处理快件而是接收， 存储和转发消息数据。

![image-20220114083508214](/assets/imgs/RabbitMQ1.assets/image-20220114083508214.png)



### 四大核心概念

RabbitMQ 有四大核心概念

-   生产者
-   交换机
-   队列
-   消费者



>   生产者

产生数据发送消息的程序是生产者



>   交换机

交换机是 RabbitMQ 非常重要的一个部件，一方面它接收来自生产者的消息，另一方面它将消息 推送到队列中。交换机必须确切知道如何处理它接收到的消息，是将这些消息推送到特定队列还是推 送到多个队列，亦或者是把消息丢弃，这个得有交换机类型决定



>   队列

队列是 RabbitMQ 内部使用的一种数据结构，尽管消息流经 RabbitMQ 和应用程序，但它们只能存 储在队列中。队列仅受主机的内存和磁盘限制的约束，本质上是一个大的消息缓冲区。许多生产者可 以将消息发送到一个队列，许多消费者可以尝试从一个队列接收数据。这就是我们使用队列的方式



>   消费者

消费与接收具有相似的含义。消费者大多时候是一个等待接收消息的程序。请注意生产者，消费 者和消息中间件很多时候并不在同一机器上。同一个应用程序既可以是生产者又是可以是消费者。



>   图解

![image-20220114083824328](/assets/imgs/RabbitMQ1.assets/image-20220114083824328.png)



### RabbitMQ 核心部分

![image-20220114083849899](/assets/imgs/RabbitMQ1.assets/image-20220114083849899.png)



### RabbitMQ 名词介绍



>   RabbitMQ 工作原理

![image-20220114083952701](/assets/imgs/RabbitMQ1.assets/image-20220114083952701.png)



>   Broker

接收和分发消息的应用，RabbitMQ Server 就是 Message Broker



>   Virtual host

出于多租户和安全因素设计的，把 AMQP 的基本组件划分到一个虚拟的分组中，类似 于网络中的 namespace 概念。当多个不同的用户使用同一个 RabbitMQ server 提供的服务时，可以划分出 多个 vhost，每个用户在自己的 vhost 创建 exchange／queue 等



>   Connection

publisher／consumer 和 broker 之间的 TCP 连接



>   Channel

如果每一次访问 RabbitMQ 都建立一个 Connection，在消息量大的时候建立 TCP Connection 的开销将是巨大的，效率也较低。Channel 是在 connection 内部建立的逻辑连接，如果应用程 序支持多线程，通常每个 thread 创建单独的 channel 进行通讯，AMQP method 包含了 channel id 帮助客 户端和 message broker 识别 channel，所以 channel 之间是完全隔离的。**Channel 作为轻量级的 Connection 极大减少了操作系统建立 TCP connection 的开销 **



>   Exchange

message 到达 broker 的第一站，根据分发规则，匹配查询表中的 routing key，分发 消息到 queue 中去。常用的类型有：direct (point-to-point), topic (publish-subscribe) and fanout (multicast)



>   Queue

消息最终被送到这里等待 consumer 取走



>   Binding

exchange 和 queue 之间的虚拟连接，binding 中可以包含 routing key，Binding 信息被保 存到 exchange 中的查询表中，用于 message 的分发依据



### RabbitMQ 安装



>   下载 RabbitMQ 安装包

[下载地址](https://github.com/rabbitmq/rabbitmq-server/releases)



>   下载 erlang 安装包

[下载地址](https://github.com/rabbitmq/erlang-rpm/releases/)



>   安装

```shell
rpm -ivh erlang-23.3.4.10-1.el7.x86_64.rpm
yum install socat -y
rpm -ivh rabbitmq-server-3.9.12-1.el7.noarch.rpm
```



### RabbitMQ 常用命令

```shell
# 添加开机启动 RabbitMQ 服务
chkconfig rabbitmq-server on
# 启动服务
/sbin/service rabbitmq-server start
# 重启服务
/sbin/service rabbitmq-server restart
# 查看服务状态
/sbin/service rabbitmq-server status
#停止服务(选择执行)
/sbin/service rabbitmq-server stop
# 开启 web 管理插件
rabbitmq-plugins enable rabbitmq_management
# 查看防火墙端口列表
firewall-cmd --permanent --list-port
```



>   查看服务状态

![image-20220114092620869](/assets/imgs/RabbitMQ1.assets/image-20220114092620869.png)



### 开启 web 管理插件

```shell
# 开启 web 管理插件
rabbitmq-plugins enable rabbitmq_management

# 防火墙开启端口
firewall-cmd --add-port=15672/tcp --permanent
firewall-cmd --reload

# 添加账户
# 创建账号
rabbitmqctl add_user admin 123

# 设置用户角色
rabbitmqctl set_user_tags admin administrator

# 设置用户权限
# 格式 set_permissions [-p <vhostpath>] <user> <conf> <write> <read>
rabbitmqctl set_permissions -p "/" admin ".*" ".*" ".*"

# 列出当前所有的用户
rabbitmqctl list_users
```



>   登录

![image-20220114093607166](/assets/imgs/RabbitMQ1.assets/image-20220114093607166.png)



#### 重置命令



```shell
# 关闭应用的命令
rabbitmqctl stop_app
# 清除的命令
rabbitmqctl reset
# 重新启动命令
rabbitmqctl start_app
```



## Hello World



>   实现效果

将用 Java 编写两个程序。发送单个消息的生产者和接收消息并打印 出来的消费者。我们将介绍 Java API 中的一些细节。

在下图中，“ P”是我们的生产者，“ C”是我们的消费者。中间的框是一个队列-RabbitMQ 代 表使用者保留的消息缓冲区

![image-20220114093847812](/assets/imgs/RabbitMQ1.assets/image-20220114093847812.png)



### 环境搭建

jdk : 1.8.0_291

IDE : IDEA 2020.3.2

maven : 3.8.1



####  依赖

```xml
<dependencies>

    <!-- 操作文件流的一个依赖-->
    <dependency>
        <groupId>commons-io</groupId>
        <artifactId>commons-io</artifactId>
        <version>2.11.0</version>
    </dependency>

    <!-- RabbitMQ 依赖客户端-->
    <!-- https://mvnrepository.com/artifact/com.rabbitmq/amqp-client -->
    <dependency>
        <groupId>com.rabbitmq</groupId>
        <artifactId>amqp-client</artifactId>
        <version>5.14.0</version>
    </dependency>

</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
            <configuration>
                <source>8</source>
                <target>8</target>
            </configuration>
        </plugin>
    </plugins>
</build>
```



#### 开放端口

```shell
# 防火墙开启端口
firewall-cmd --add-port=5672/tcp --permanent
firewall-cmd --reload
```





### 思路分析

![image-20220114095146652](/assets/imgs/RabbitMQ1.assets/image-20220114095146652.png)



### 代码实现



#### 生产者

```java
package com.yixihan.rabbitmq.lesson01;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

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
    public static void main(String[] args) throws IOException, TimeoutException {

        // 创建一个连接工程
        ConnectionFactory factory = new ConnectionFactory ();

        // 工厂 IP
        factory.setHost ("175.24.229.41");

        // 端口号
        // web 端访问端口为 15672
        // java 连接访问端口为 5672
        factory.setPort (5672);

        // 用户名
        factory.setUsername ("admin");

        // 密码
        factory.setPassword ("123");

        // 创建连接
        Connection connection = factory.newConnection();

        // 获取信道
        Channel channel = connection.createChannel ();

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
        channel.queueDeclare (QUEUE_NAME, false, false, false, null);

        // 发消息
        String message = "hello world";

        /*
        发送一个信息
        basicPublish(String exchange, String routingKey, BasicProperties props, byte[] body) throws IOException;

        exchange : 发送到那个交换机
        routingKey : 路由的 key 值是哪个, 本次是队列的名称
        props : 其他参数信息
        body : 发送消息的信息体
         */
        channel.basicPublish ("", QUEUE_NAME, null, message.getBytes ());

        System.out.println ("消息发送完毕");

    }
}

```



#### 消费者

```java
package com.yixihan.rabbitmq.lesson01;

import com.rabbitmq.client.*;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

/**
 * 消费者 : 接收消息
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
    public static void main(String[] args) throws IOException, TimeoutException {

        // 创建连接工程
        ConnectionFactory factory = new ConnectionFactory ();

        // 设置 IP
        factory.setHost ("175.24.229.41");

        // 设置端口
        factory.setPort (5672);

        // 设置用户名
        factory.setUsername ("admin");

        // 设置密码
        factory.setPassword ("123");

        // 获取连接
        Connection connection = factory.newConnection ();

        // 创建信道
        Channel channel = connection.createChannel ();

        System.out.println ("等待接收消息... ");

        // 声明
        DeliverCallback deliverCallback = (consumerTag, message) -> System.out.println (new String (message.getBody ()));

        CancelCallback cancelCallback = consumerTag -> System.out.println ("消息消费被中断");

        /*
        消费者接收消息
        basicConsume(String queue, boolean autoAck, DeliverCallback deliverCallback, CancelCallback cancelCallback);

        queue : 消费哪个队列
        autoAck : 消费成功之后是否需要自动应答, true : 自动应答, false : 手动应答
        deliverCallback : 消费者成功消费的回调
        cancelCallback : 消费者取消消费的回调

         */
        channel.basicConsume (QUEUE_NAME, true, deliverCallback, cancelCallback);
    }
}
```



### 测试

>   生产者

![image-20220114102430104](/assets/imgs/RabbitMQ1.assets/image-20220114102430104.png)

![image-20220114102440296](/assets/imgs/RabbitMQ1.assets/image-20220114102440296.png)



>   消费者

![image-20220114104036069](/assets/imgs/RabbitMQ1.assets/image-20220114104036069.png)

![image-20220114104053969](/assets/imgs/RabbitMQ1.assets/image-20220114104053969.png)



## Work Queues

工作队列(又称任务队列)的主要思想是避免立即执行资源密集型任务，而不得不等待它完成。 相反我们安排任务在之后执行。我们把任务封装为消息并将其发送到队列。在后台运行的工作进 程将弹出任务并最终执行作业。当有多个工作线程时，这些工作线程将一起处理这些任务。



>   实现效果

![image-20220114104355825](/assets/imgs/RabbitMQ1.assets/image-20220114104355825.png)



### 代码实现



#### 工具类

```java
package com.yixihan.rabbitmq.util;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

/**
 * RabbitMQ 工具类
 * @author : yixihan
 * @create : 2022-01-14-10:45
 */
public class RabbitMqUtils {

    public static Connection getConnection () throws IOException, TimeoutException {

        // 创建一个连接工程
        ConnectionFactory factory = new ConnectionFactory ();

        // 设置属性
        factory.setHost ("175.24.229.41");
        factory.setPort (5672);
        factory.setUsername ("admin");
        factory.setPassword ("123");

        // 获取连接
        return factory.newConnection ();
    }

    public static Channel getChannel () throws IOException, TimeoutException {

        // 获取连接
        Connection connection = getConnection ();

        // 创建信道
        return connection.createChannel ();
    }
}
```



#### 生产者

```java
package com.yixihan.rabbitmq.workqueues;

import com.rabbitmq.client.Channel;
import com.yixihan.rabbitmq.util.RabbitMqUtils;

import java.io.IOException;
import java.util.Scanner;
import java.util.concurrent.TimeoutException;

/**
 * 生产者 - 可以发送大量的消息
 * @author : yixihan
 * @create : 2022-01-14-11:04
 */
public class Task {

    /**
     * 队列名称
     */
    public static final String QUEUE_NAME = "hello";

    /**
     * 发送大量信息
     */
    public static void main(String[] args) throws IOException, TimeoutException {

        Channel channel = RabbitMqUtils.getChannel ();

        System.out.println ("连接成功, 请输入要传输的信息");

        channel.queueDeclare (QUEUE_NAME, false, false, false, null);

        // 从控制台当中接收信息
        Scanner sc = new Scanner(System.in);

        while (sc.hasNext ()) {
            String next = sc.next ();
            channel.basicPublish ("", QUEUE_NAME, null, next.getBytes ());
            System.out.println ("消息发送完成 : " + next);
        }

        System.out.println ("信息传输完成, 程序正在退出");
    }
}

```



#### 消费者

```java
package com.yixihan.rabbitmq.workqueues;

import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.yixihan.rabbitmq.util.RabbitMqUtils;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

/**
 * 这是一个工作线程 -- 相当于之前的消费者
 * 采用多线程完成多个工作线程的创建
 * @author : yixihan
 * @create : 2022-01-14-10:49
 */
public class Worker {

    /**
     * 队列名称
     */
    public static final String QUEUE_NAME = "hello";

    public static void main(String[] args) {
        Thread worker01 = new CustomerRun ("C1");
        Thread worker02 = new CustomerRun ("C2");
        Thread worker03 = new CustomerRun ("C3");

        worker01.start ();
        worker03.start ();
        worker02.start ();
    }

    /**
     * 接收消息
     */
    public static void getMessage (String workerName) throws IOException, TimeoutException {
        // 创建信道
        Channel channel = RabbitMqUtils.getChannel ();

        System.out.println (workerName + "正在等待接收消息...");

        // 消息的接收
        DeliverCallback deliverCallback = (consumerTag, message) ->
                System.out.println (workerName + "接收到的消息 : " + new String (message.getBody ()));

        CancelCallback cancelCallback = consumerTag -> System.out.println (consumerTag + "消费者取消消费接口回调逻辑");

        channel.basicConsume (QUEUE_NAME, true, deliverCallback, cancelCallback);
    }

    private static class CustomerRun extends Thread {

        public CustomerRun(String name) {
            super (name);
        }

        @Override
        public void run() {
            try {
                getMessage (getName ());
            } catch (IOException | TimeoutException e) {
                e.printStackTrace ();
            }
        }
    }
}
```



### 测试

>   生产者

![image-20220114111318239](/assets/imgs/RabbitMQ1.assets/image-20220114111318239.png)



>   消费者

![image-20220114111329564](/assets/imgs/RabbitMQ1.assets/image-20220114111329564.png)



### 消息应答



#### 消息应答概念

消费者完成一个任务可能需要一段时间，如果其中一个消费者处理一个长的任务并仅只完成 了部分突然它挂掉了，会发生什么情况。RabbitMQ 一旦向消费者传递了一条消息，便立即将该消 息标记为删除。在这种情况下，突然有个消费者挂掉了，我们将丢失正在处理的消息。以及后续 发送给该消费这的消息，因为它无法接收到。

 为了保证消息在发送过程中不丢失，rabbitmq 引入消息应答机制，消息应答就是:**消费者在接 收到消息并且处理该消息之后，告诉 rabbitmq 它已经处理了，rabbitmq 可以把该消息删除了。**



#### 自动应答

消息发送后立即被认为已经传送成功，这种模式需要在**高吞吐量和数据传输安全性方面做权衡**,因为这种模式如果消息在接收到之前，消费者那边出现连接或者 channel 关闭，那么消息就丢 失了,当然另一方面这种模式消费者那边可以传递过载的消息，**没有对传递的消息数量进行限制**， 当然这样有可能使得消费者这边由于接收太多还来不及处理的消息，导致这些消息的积压，最终 使得内存耗尽，最终这些消费者线程被操作系统杀死，**所以这种模式仅适用在消费者可以高效并 以某种速率能够处理这些消息的情况下使用**。



#### 手动消息应答的方式

手动应答的好处是可以批量应答并且减少网络拥堵

-   Channel.basicAck (用于肯定确认)
    RabbitMQ 已知道该消息并且成功处理消息, 可以将其丢弃了
-   Channel.basicNack(用于否定确认)
-   Channel.basicReject(用于否定确认)
    与 Channel.basicNack 相比少一个参数
    不处理该消息了直接拒绝，可以将其丢弃了



```java
void basicAck(long deliveryTag, boolean multiple) throws IOException;
void basicNack(long deliveryTag, boolean multiple, boolean requeue) throws IOException;
void basicReject(long deliveryTag, boolean requeue) throws IOException;
```



#### multiple的解释

multiple 的 true 和 false 代表不同意思

*   true  代表批量应答 channel 上未应答的消息
    比如说 channel 上有传送 tag 的消息 5,6,7,8 当前 tag 是 8 那么此时 5-8 的这些还未应答的消息都会被确认收到消息应答
*   false 代表不批量应答 channel 上未应答的消息
    只会应答 tag=8 的消息 5,6,7 这三个消息依然不会被确认收到消息应答



![image-20220114112510027](/assets/imgs/RabbitMQ1.assets/image-20220114112510027.png)

![image-20220114112525372](/assets/imgs/RabbitMQ1.assets/image-20220114112525372.png)



#### 自动重新入队

如果消费者由于某些原因失去连接(其通道已关闭，连接已关闭或 TCP 连接丢失)，导致消息 未发送 ACK 确认，RabbitMQ 将了解到消息未完全处理，并将对其重新排队。如果此时其他消费者 可以处理，它将很快将其重新分发给另一个消费者。这样，即使某个消费者偶尔死亡，也可以确 保不会丢失任何消息。

![image-20220114112611776](/assets/imgs/RabbitMQ1.assets/image-20220114112611776.png)



#### 代码实现



>   实现效果

![image-20220114113230488](/assets/imgs/RabbitMQ1.assets/image-20220114113230488.png)



##### 生产者

```java
package com.yixihan.rabbitmq.manualask;

import com.rabbitmq.client.Channel;
import com.yixihan.rabbitmq.util.RabbitMqUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;
import java.util.concurrent.TimeoutException;

/**
 * 消息在手动应答时是不丢失的, 放回队列中重新消费
 * @author : yixihan
 * @create : 2022-01-14-11:32
 */
public class Task {

    /**
     * 队列名称
     */
    public static final String TASK_QUEUE_NAME = "ack_queue";

    /**
     * 发送大量信息
     */
    public static void main(String[] args) throws IOException, TimeoutException {

        Channel channel = RabbitMqUtils.getChannel ();

        System.out.println ("连接成功, 请输入要传输的信息");

        channel.queueDeclare (TASK_QUEUE_NAME, false, false, false, null);

        // 从控制台当中接收信息
        Scanner sc = new Scanner(System.in);

        while (sc.hasNext ()) {
            String next = sc.next ();
            channel.basicPublish ("", TASK_QUEUE_NAME, null, next.getBytes (StandardCharsets.UTF_8));
            System.out.println ("消息发送完成 : " + next);
        }

        System.out.println ("信息传输完成, 程序正在退出");

    }
}
```



##### 消费者1

```java
package com.yixihan.rabbitmq.manualask;

import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.yixihan.rabbitmq.util.RabbitMqUtils;
import com.yixihan.rabbitmq.util.SleepUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

/**
 * 消息在手动应答时是不丢失的, 放回队列中重新消费
 * @author : yixihan
 * @create : 2022-01-14-11:35
 */
public class Worker01 {

    /**
     * 队列名称
     */
    public static final String TASK_QUEUE_NAME = "ack_queue";

    /**
     * 接收消息
     */
    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel ();

        System.out.println ("C1 等待接收消息处理时间较短...");

        DeliverCallback deliverCallback = (consumerTag, message) -> {

            // 沉睡 1 秒
            SleepUtils.sleep (1);

            System.out.println ("接收到的消息 : " + new String (message.getBody (), StandardCharsets.UTF_8));

            /*
            手动应答
            basicAck(long deliveryTag, boolean multiple);

            deliveryTag : 消息的标记 Tag
            multiple : 是否批量应答, true : 批量应答信道中的消息 false : 不批量应答信道中的消息 (推荐)
             */
            channel.basicAck (message.getEnvelope ().getDeliveryTag (), false);
        };

        CancelCallback cancelCallback = consumerTag -> System.out.println (consumerTag + "消费者取消消费接口回调逻辑");


        channel.basicConsume (TASK_QUEUE_NAME, false, deliverCallback, cancelCallback);
    }

}
```



##### 消费者2

```java
package com.yixihan.rabbitmq.manualask;

import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.yixihan.rabbitmq.util.RabbitMqUtils;
import com.yixihan.rabbitmq.util.SleepUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

/**
 * 消息在手动应答时是不丢失的, 放回队列中重新消费
 * @author : yixihan
 * @create : 2022-01-14-11:35
 */
public class Worker02 {

    /**
     * 队列名称
     */
    public static final String TASK_QUEUE_NAME = "ack_queue";

    /**
     * 接收消息
     */
    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMqUtils.getChannel ();

        System.out.println ("C2 等待接收消息处理时间较长...");

        DeliverCallback deliverCallback = (consumerTag, message) -> {

            // 沉睡 30 秒
            SleepUtils.sleep (30);

            System.out.println ("接收到的消息 : " + new String (message.getBody (), StandardCharsets.UTF_8));

            /*
            手动应答
            basicAck(long deliveryTag, boolean multiple);

            deliveryTag : 消息的标记 Tag
            multiple : 是否批量应答, true : 批量应答信道中的消息 false : 不批量应答信道中的消息 (推荐)
             */
            channel.basicAck (message.getEnvelope ().getDeliveryTag (), false);
        };

        CancelCallback cancelCallback = consumerTag -> System.out.println (consumerTag + "消费者取消消费接口回调逻辑");


        channel.basicConsume (TASK_QUEUE_NAME, false, deliverCallback, cancelCallback);
    }

}
```



##### 工具类

```java
package com.yixihan.rabbitmq.util;

/**
 * @author : yixihan
 * @create : 2022-01-14-11:39
 */
public class SleepUtils {

    public static void sleep (int seconds) {

        try {
            Thread.sleep (seconds * 1000L);
        } catch (InterruptedException e) {
            e.printStackTrace ();
        }
    }
}
```



#### 测试

>   测试连接是否成功建立



-   生产者
    ![image-20220114115131211](/assets/imgs/RabbitMQ1.assets/image-20220114115131211.png)
-   消费者1
    ![image-20220114115138353](/assets/imgs/RabbitMQ1.assets/image-20220114115138353.png)
-   消费者2
    ![image-20220114115145541](/assets/imgs/RabbitMQ1.assets/image-20220114115145541.png)



>   再次发送两条数据, 并在 C2 处理中关闭 C2

![image-20220114115237810](/assets/imgs/RabbitMQ1.assets/image-20220114115237810.png)

![image-20220114115230724](/assets/imgs/RabbitMQ1.assets/image-20220114115230724.png)

C1 接收到两个消息, 测试成功



### RabbitMQ 持久化



#### 持久化概念

刚刚我们已经看到了如何处理任务不丢失的情况，但是如何保障当 RabbitMQ 服务停掉以后消 息生产者发送过来的消息不丢失。默认情况下 RabbitMQ 退出或由于某种原因崩溃时，它忽视队列 和消息，除非告知它不要这样做。确保消息不会丢失需要做两件事：**我们需要将队列和消息都标 记为持久化。**



#### 队列实现持久化

之前我们创建的队列都是非持久化的，rabbitmq 如果重启的化，该队列就会被删除掉，如果 要队列实现持久化 需要在声明队列的时候把 ==durable== 参数设置为持久化

```java
// 消息队列持久化
boolean durable = true;
channel.queueDeclare (TASK_QUEUE_NAME, durable, false, false, null);
```

![image-20220114135415608](/assets/imgs/RabbitMQ1.assets/image-20220114135415608.png)



>   注意

但是需要注意的就是如果之前声明的队列不是持久化的，需要把原先队列先删除，或者重新创建一个持久化的队列，不然就会出现错误

![image-20220114135434331](/assets/imgs/RabbitMQ1.assets/image-20220114135434331.png)



>   持久化与非持久化队列的 UI 显示区别

![image-20220114135548934](/assets/imgs/RabbitMQ1.assets/image-20220114135548934.png)

这个时候即使重启 rabbitmq 队列也依然存在



#### 消息实现持久化

要想让消息实现持久化需要在消息生产者修改代码, MessageProperties.PERSISTENT_TEXT_PLAIN 添 加这个属性。

```java
// 当 durable 为 true 时
channel.basicPublish ("", TASK_QUEUE_NAME, MessageProperties.PERSISTENT_TEXT_PLAIN, next.getBytes (StandardCharsets.UTF_8));
```



>   图示

![image-20220114135946602](/assets/imgs/RabbitMQ1.assets/image-20220114135946602.png)

![image-20220114135905380](/assets/imgs/RabbitMQ1.assets/image-20220114135905380.png)

将消息标记为持久化并不能完全保证不会丢失消息。尽管它告诉 RabbitMQ 将消息保存到磁盘，但是 这里依然存在当消息刚准备存储在磁盘的时候 但是还没有存储完，消息还在缓存的一个间隔点。此时并没 有真正写入磁盘。持久性保证并不强，但是对于我们的简单任务队列而言，这已经绰绰有余了。如果需要 更强有力的持久化策略，参考后边课件发布确认章节。



##### 不公平分发 (能者多劳)

在最开始的时候我们学习到 RabbitMQ 分发消息采用的轮训分发，但是在某种场景下这种策略并不是 很好，比方说有两个消费者在处理任务，其中有个消费者 1 处理任务的速度非常快，而另外一个消费者 2 处理速度却很慢，这个时候我们还是采用轮训分发的化就会到这处理速度快的这个消费者很大一部分时间 处于空闲状态，而处理慢的那个消费者一直在干活，这种分配方式在这种情况下其实就不太好，但是 RabbitMQ 并不知道这种情况它依然很公平的进行分发。

为了避免这种情况，我们可以设置参数 **channel.basicQos(1);**

```java
// 更改消费者的代码
int prefetchCount = 1;
channel.basicQos (prefetchCount);
```



![image-20220114140151767](/assets/imgs/RabbitMQ1.assets/image-20220114140151767.png)



意思就是如果这个任务我还没有处理完或者我还没有应答你，你先别分配给我，我目前只能处理一个 任务，然后 rabbitmq 就会把该任务分配给没有那么忙的那个空闲消费者，当然如果所有的消费者都没有完 成手上任务，队列还在不停的添加新任务，队列有可能就会遇到队列被撑满的情况，这个时候就只能添加 新的 worker 或者改变其他存储任务的策略。



>   图解

![image-20220114141531184](/assets/imgs/RabbitMQ1.assets/image-20220114141531184.png)

![image-20220114143354312](/assets/imgs/RabbitMQ1.assets/image-20220114143354312.png)



##### 预取值

本身消息的发送就是异步发送的，所以在任何时候，channel 上肯定不止只有一个消息另外来自消费 者的手动确认本质上也是异步的。因此这里就存在一个未确认的消息缓冲区，因此希望开发人员能**限制此 缓冲区的大小，以避免缓冲区里面无限制的未确认消息问题**。这个时候就可以通过使用 basic.qos 方法设 置“预取计数”值来完成的。**该值定义通道上允许的未确认消息的最大数量**。一旦数量达到配置的数量， RabbitMQ 将停止在通道上传递更多消息，除非至少有一个未处理的消息被确认，例如，假设在通道上有 未确认的消息 5、6、7，8，并且通道的预取计数设置为 4，此时 RabbitMQ 将不会在该通道上再传递任何 消息，除非至少有一个未应答的消息被 ack。比方说 tag=6 这个消息刚刚被确认 ACK，RabbitMQ 将会感知 这个情况到并再发送一条消息。消息应答和 QoS 预取值对用户吞吐量有重大影响。通常，增加预取将提高 向消费者传递消息的速度。**虽然自动应答传输消息速率是最佳的，但是，在这种情况下已传递但尚未处理 的消息的数量也会增加，从而增加了消费者的 RAM 消耗**(随机存取存储器)应该小心使用具有无限预处理 的自动确认模式或手动确认模式，消费者消费了大量的消息如果没有确认的话，会导致消费者连接节点的 内存消耗变大，所以找到合适的预取值是一个反复试验的过程，不同的负载该值取值也不同 100 到 300 范 围内的值通常可提供最佳的吞吐量，并且不会给消费者带来太大的风险。预取值为 1 是最保守的。当然这 将使吞吐量变得很低，特别是消费者连接延迟很严重的情况下，特别是在消费者连接等待时间较长的环境 中。对于大多数应用来说，稍微高一点的值将是最佳的。



>   图解

![image-20220114145341788](/assets/imgs/RabbitMQ1.assets/image-20220114145341788.png)

c1 获得两条信息

c2 获得五条信息



>   设置预取值

```java
// prefetchCount > 2 表示预取值
// prefetchCount = 1 表示不公平分发
// prefetchCount = 0 表示轮转
int prefetchCount = 2;
channel.basicQos (prefetchCount);
```



>   测试

![image-20220114145318790](/assets/imgs/RabbitMQ1.assets/image-20220114145318790.png)



## 发布确认



### 发布确认原理

生产者将信道设置成 confirm 模式，一旦信道进入 confirm 模式，所有在该信道上面发布的 消息都将会被指派一个唯一的 ID(从 1 开始)，一旦消息被投递到所有匹配的队列之后，broker 就会发送一个确认给生产者(包含消息的唯一 ID)，这就使得生产者知道消息已经正确到达目的队 列了，如果消息和队列是可持久化的，那么确认消息会在将消息写入磁盘之后发出，broker 回传 给生产者的确认消息中 delivery-tag 域包含了确认消息的序列号，此外 broker 也可以设置 basic.ack 的 multiple 域，表示到这个序列号之前的所有消息都已经得到了处理。 confirm 模式最大的好处在于他是异步的，一旦发布一条消息，生产者应用程序就可以在等信 道返回确认的同时继续发送下一条消息，当消息最终得到确认之后，生产者应用便可以通过回调 方法来处理该确认消息，如果 RabbitMQ 因为自身内部错误导致消息丢失，就会发送一条 nack 消 息，生产者应用程序同样可以在回调方法中处理该 nack 消息。



>   图解

![image-20220114145703057](/assets/imgs/RabbitMQ1.assets/image-20220114145703057.png)



### 发布确认的策略



#### 开启发布确认的方法

发布确认默认是没有开启的，如果要开启需要调用方法 confirmSelect，每当你要想使用发布 确认，都需要在 channel 上调用该方法

```java
Channel channel = connection.creatChannel ();
channel.confirmSelect ();
```



发布确认的策略有三种

-   单个确认发布
-   批量确认发布
-   异步确认发布



##### 单个发布确认

这是一种简单的确认方式，它是一种**同步确认发布**的方式，也就是发布一个消息之后只有它 被确认发布，后续的消息才能继续发布,waitForConfirmsOrDie(long)这个方法只有在消息被确认 的时候才返回，如果在指定时间范围内这个消息没有被确认那么它将抛出异常。

这种确认方式有一个最大的缺点就是:**发布速度特别的慢**，因为如果没有确认发布的消息就会 阻塞所有后续消息的发布，这种方式最多提供每秒不超过数百条发布消息的吞吐量。当然对于某 些应用程序来说这可能已经足够了。

```java
/**
 * 单个确认
 */
public static void publishMessageIndividually () throws Exception {

    // 队列的声明
    Channel channel = RabbitMqUtils.getChannel ();

    String queueName = UUID.randomUUID ().toString ();
    channel.queueDeclare (queueName, true, false, false, null);

    // 开启发布确认
    channel.confirmSelect ();

    // 获取开始时间
    long start = System.currentTimeMillis ();

    // 批量发消息 单个发布确认
    for (int i = 0; i < MESSAGE_COUNT; i++) {
        String message = String.valueOf (i);
        channel.basicPublish ("", queueName, MessageProperties.PERSISTENT_TEXT_PLAIN, message.getBytes ());

        // 单个消息就马上进行发布确认
        boolean flag = channel.waitForConfirms ();
        if (flag) {
            System.out.println ("消息发送成功 !");
        }
    }

    long end = System.currentTimeMillis ();

    System.out.println ("发布 " + MESSAGE_COUNT +  " 条消息, 使用单个确认模式, 共计用时 " + (end - start) + " ms");

}
```



##### 批量确认发布 

上面那种方式非常慢，与单个等待确认消息相比，先发布一批消息然后一起确认可以极大地 提高吞吐量，当然这种方式的缺点就是:当发生故障导致发布出现问题时，不知道是哪个消息出现 问题了，我们必须将整个批处理保存在内存中，以记录重要的信息而后重新发布消息。**当然这种方案仍然是同步的**，也一样阻塞消息的发布。

```java
/**
 * 批量发布确认
 */
public static void publishMessagePatch () throws Exception {
    // 队列的声明
    Channel channel = RabbitMqUtils.getChannel ();

    String queueName = UUID.randomUUID ().toString ();
    channel.queueDeclare (queueName, true, false, false, null);

    // 开启发布确认
    channel.confirmSelect ();

    // 获取开始时间
    long start = System.currentTimeMillis ();

    // 批量确认消息大小
    int batchSize = 100;

    // 批量发消息 批量发布确认
    for (int i = 1; i <= MESSAGE_COUNT; i++) {
        String message = String.valueOf (i);
        channel.basicPublish ("", queueName, MessageProperties.PERSISTENT_TEXT_PLAIN, message.getBytes ());

        // 发布确认
        if (i % batchSize == 0) {
            boolean flag = channel.waitForConfirms ();
            if (flag) {
                System.out.println ("消息发送成功 !");
            }
        }
    }

    long end = System.currentTimeMillis ();

    System.out.println ("发布 " + MESSAGE_COUNT +  " 条消息, 使用批量确认模式, 共计用时 " + (end - start) + " ms");
}
```



##### 异步确认发布 

异步确认虽然编程逻辑比上两个要复杂，但是性价比最高，无论是可靠性还是效率都没得说， 他是利用回调函数来达到消息可靠性传递的，这个中间件也是通过函数回调来保证是否投递成功， 下面就让我们来详细讲解异步确认是怎么实现的。

![image-20220114152155608](/assets/imgs/RabbitMQ1.assets/image-20220114152155608.png)



```java
/**
 * 异步发布确认
 */
public static void publishMessageAsync () throws Exception {

    // 队列的声明
    Channel channel = RabbitMqUtils.getChannel ();

    String queueName = UUID.randomUUID ().toString ();
    channel.queueDeclare (queueName, true, false, false, null);

    // 开启发布确认
    channel.confirmSelect ();

    // 获取开始时间
    long start = System.currentTimeMillis ();

    /*
        线程安全有序的一个哈希表, 适用于高并发的情况下
        1. 轻松的将序号与消息进行关联
        2. 可以轻松的批量删除条目, 只要给到 key 值就行
        3. 支持高并发
         */
    ConcurrentSkipListMap<Long, String> outstandingConfirms = new ConcurrentSkipListMap<> ();

    // 准备消息的监听器, 监听哪些消息成功了, 哪些消息失败了

    // 消息确认成功, 回调函数
    /*
        deliveryTag : 消息的标记
        multiple : 是否为批量确认
         */
    ConfirmCallback ackCallback = (deliveryTag, multiple) -> {

        System.out.println ("确认的消息 : " + deliveryTag);
        if (multiple) {
            // 2. 删除已经确认的消息, 剩下的就是未确认的消息
            ConcurrentNavigableMap<Long, String> confirmed = outstandingConfirms.headMap (deliveryTag);
            confirmed.clear ();
        } else {
            System.out.println (outstandingConfirms.get (deliveryTag));
            outstandingConfirms.remove (deliveryTag);
        }
    };

    // 消息确失败, 回调函数
    ConfirmCallback nackCallback = (deliveryTag, multiple) -> {
        // 3. 打印一下未确认的消息都有哪些
        String message = outstandingConfirms.get (deliveryTag);
        System.out.println ("未确认的消息序号 : " + deliveryTag + ", 消息是 : " + message);
    };

    /*
        addConfirmListener(ConfirmCallback ackCallback, ConfirmCallback nackCallback);
        ackCallback : 监听哪些消息成功了
        nackCallback : 监听哪些消息失败了

        异步通知
         */
    channel.addConfirmListener (ackCallback, nackCallback);


    // 批量发消息 异步发布确认
    for (int i = 1; i <= MESSAGE_COUNT; i++) {
        String message = String.valueOf (i);
        channel.basicPublish ("", queueName, MessageProperties.PERSISTENT_TEXT_PLAIN, message.getBytes ());
        // 1. 此处记录下所有要发送的消息 消息的总和
        outstandingConfirms.put (channel.getNextPublishSeqNo (), message);
    }

    // 获取结束时间
    long end = System.currentTimeMillis ();

    System.out.println ("发布 " + MESSAGE_COUNT +  " 条消息, 使用异步发布确认模式, 共计用时 " + (end - start) + " ms");
}
```



##### 如何处理异步未确认消息 

最好的解决的解决方案就是把未确认的消息放到一个基于内存的能被发布线程访问的队列， 比如说用 ConcurrentLinkedQueue 这个队列在 confirm callbacks 与发布线程之间进行消息的传递。



##### 三种发布确认速度对比

>   单独发布消息

同步等待确认，简单，但吞吐量非常有限



>   批量发布消息

批量同步等待确认，简单，合理的吞吐量，一旦出现问题但很难推断出是那条 消息出现了问题。

>   异步处理

最佳性能和资源使用，在出现错误的情况下可以很好地控制，但是实现起来稍微难些



```java
public static void main(String[] args) throws Exception {

    // 1. 单个确认
    // 发布 1000 条消息, 使用单个确认模式, 共计用时 43707 ms
    publishMessageIndividually ();

    // 2. 批量确认
    // 发布 1000 条消息, 使用批量确认模式, 共计用时 605 ms
    publishMessagePatch ();

    // 3. 异步批量确认
    // 发布 1000 条消息, 使用异步发布确认模式, 共计用时 99 ms
    publishMessageAsync ();
}
```



## 交换机

在上一节中，我们创建了一个工作队列。我们假设的是工作队列背后，每个任务都恰好交付给一个消 费者(工作进程)。在这一部分中，我们将做一些完全不同的事情-我们将消息传达给多个消费者。这种模式 称为 ”发布/订阅”.

为了说明这种模式，我们将构建一个简单的日志系统。它将由两个程序组成:第一个程序将发出日志消 息，第二个程序是消费者。其中我们会启动两个消费者，其中一个消费者接收到消息后把日志存储在磁盘， 另外一个消费者接收到消息后把消息打印在屏幕上，事实上第一个程序发出的日志消息将广播给所有消费者



>   简单模式 (工作模式)

![image-20220114155611963](/assets/imgs/RabbitMQ1.assets/image-20220114155611963.png)



>   发布订阅模式

![image-20220114155628174](/assets/imgs/RabbitMQ1.assets/image-20220114155628174.png)



### Exchanges



#### Exchanges 概念

RabbitMQ 消息传递模型的核心思想是: **生产者生产的消息从不会直接发送到队列**。实际上，通常生产者甚至都不知道这些消息传递传递到了哪些队列中。

相反，**生产者只能将消息发送到交换机(exchange)**，交换机工作的内容非常简单，一方面它接收来 自生产者的消息，另一方面将它们推入队列。交换机必须确切知道如何处理收到的消息。是应该把这些消 息放到特定队列还是说把他们到许多队列中还是说应该丢弃它们。这就的由交换机的类型来决定。



>   图解

![image-20220114155742000](/assets/imgs/RabbitMQ1.assets/image-20220114155742000.png)



##### Exchanges 类型

Exchanges 一共有五种类型

-   直接类型 (direct)
-   主题类型 (topic)
-   标题类型 (headers)
-   扇出类型 (fanout)
-   无名类型 ()



##### 无名 Exchanges

在本教程的前面部分我们对 exchange 一无所知，但仍然能够将消息发送到队列。之前能实现的 原因是因为我们使用的是默认交换，我们通过空字符串(“”)进行标识

```java
channel.basicPublish ("", queueName, null, message.getBytes ());
```

第一个参数是交换机的名称。空字符串表示默认或无名称交换机：消息能路由发送到队列中其实 是由 routingKey(bindingkey)绑定 key 指定的，如果它存在的话



### 临时队列

之前的章节我们使用的是具有特定名称的队列(还记得 hello 和 ack_queue 吗？)。队列的名称我们 来说至关重要-我们需要指定我们的消费者去消费哪个队列的消息。

每当我们连接到 Rabbit 时，我们都需要一个全新的空队列，为此我们可以创建一个具有**随机名称的队列**，或者能让服务器为我们选择一个随机队列名称那就更好了。其次**一旦我们断开了消费者的连接，队列将被自动删除。**



>   创建临时队列

```java
String queueName = channel.queueDeclare ().getQueue ();
```



>   临时队列模样

![image-20220114160656816](/assets/imgs/RabbitMQ1.assets/image-20220114160656816.png)



### 绑定 (bindings)

什么是 bingding 呢，binding 其实是 exchange 和 queue 之间的桥梁，它告诉我们 exchange 和那个队 列进行了绑定关系。比如说下面这张图告诉我们的就是 X 与 Q1 和 Q2 进行了绑定

![image-20220114160733092](/assets/imgs/RabbitMQ1.assets/image-20220114160733092.png)



>   示例

![image-20220114160848585](/assets/imgs/RabbitMQ1.assets/image-20220114160848585.png)

![image-20220114160955678](/assets/imgs/RabbitMQ1.assets/image-20220114160955678.png)

>   使用 Routing key 可以实现 "区别对待"

![image-20220114161138355](/assets/imgs/RabbitMQ1.assets/image-20220114161138355.png)



### Fanout (广播)



#### Fanout 介绍 

Fanout 这种类型非常简单。正如从名称中猜到的那样，它是将接收到的所有消息广播到它知道的 所有队列中。系统中默认有些 exchange 类型

![image-20220114161243160](/assets/imgs/RabbitMQ1.assets/image-20220114161243160.png)



#### Fanout 实战

>   实现效果

![image-20220114161256049](/assets/imgs/RabbitMQ1.assets/image-20220114161256049.png)



Logs 和临时队列的绑定关系如下图

![image-20220114161425401](/assets/imgs/RabbitMQ1.assets/image-20220114161425401.png)



##### 生产者

```java
package com.yixihan.rabbitmq.fanout;

import com.rabbitmq.client.Channel;
import com.yixihan.rabbitmq.util.RabbitMqUtils;

import java.nio.charset.StandardCharsets;
import java.util.Scanner;

/**
 * 发消息 交换机 Fanout
 * @author : yixihan
 * @create : 2022-01-14-16:22
 */
public class EmitLog {

    /**
     * 交换机的名字
     */
    public static final String EXCHANGE_NAME = "logs";

    public static void main(String[] args) throws Exception {

        Channel channel = RabbitMqUtils.getChannel ();

        channel.exchangeDeclare (EXCHANGE_NAME, "fanout");

        Scanner sc = new Scanner(System.in);

        while (sc.hasNext ()) {
            String message = sc.next ();
            channel.basicPublish (EXCHANGE_NAME, "", null, message.getBytes (StandardCharsets.UTF_8));
        }
    }
}

```



##### 消费者

```java
package com.yixihan.rabbitmq.fanout;

import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.yixihan.rabbitmq.util.RabbitMqUtils;

import java.nio.charset.StandardCharsets;

/**
 * Fanout 接收
 * @author : yixihan
 * @create : 2022-01-14-16:15
 */
public class ReceiveLog01 {

    /**
     * 交换机的名字
     */
    public static final String EXCHANGE_NAME = "logs";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel ();

        // 声明一个交换机
        channel.exchangeDeclare (EXCHANGE_NAME, "fanout");

        // 声明一个队列 临时队列
        /*
        生成一个临时的队列, 队列的名称是随机的
        当消费者断开与队列的连接的时候, 队列就自动删除
         */
        String queueName = channel.queueDeclare ().getQueue ();

        // 绑定交换机与队列
        channel.queueBind (queueName, EXCHANGE_NAME, "");

        System.out.println ("等待接收消息, 把接收到的消息打印在屏幕上...");

        DeliverCallback deliverCallback = (consumerTag, message) ->
                System.out.println ("控制台01打印接收到的消息" + new String (message.getBody (), StandardCharsets.UTF_8)
                );

        CancelCallback cancelCallback = consumerTag -> System.out.println (consumerTag + "消费者取消消费接口回调逻辑");

        channel.basicConsume (queueName, true, deliverCallback, cancelCallback);

    }
}

```



##### 测试

>   生产者

![image-20220114162724321](/assets/imgs/RabbitMQ1.assets/image-20220114162724321.png)



>   消费者

![image-20220114162747147](/assets/imgs/RabbitMQ1.assets/image-20220114162747147.png)

![image-20220114162759729](/assets/imgs/RabbitMQ1.assets/image-20220114162759729.png)



### Direct exchange



#### 回顾

在上一节中，我们构建了一个简单的日志记录系统。我们能够向许多接收者广播日志消息。在本 节我们将向其中添加一些特别的功能-比方说我们只让某个消费者订阅发布的部分消息。例如我们只把 严重错误消息定向存储到日志文件(以节省磁盘空间)，同时仍然能够在控制台上打印所有日志消息。

我们再次来回顾一下什么是 bindings，绑定是交换机和队列之间的桥梁关系。也可以这么理解： **队列只对它绑定的交换机的消息感兴趣**。绑定用参数：routingKey 来表示也可称该参数为 binding key， 创建绑定我们用代码:`channel.queueBind(queueName, EXCHANGE_NAME, "routingKey");`**绑定之后的 意义由其交换类型决定**。



#### Direct exchange 介绍

上一节中的我们的日志系统将所有消息广播给所有消费者，对此我们想做一些改变，例如我们希 望将日志消息写入磁盘的程序仅接收严重错误(errros)，而不存储哪些警告(warning)或信息(info)日志 消息避免浪费磁盘空间。Fanout 这种交换类型并不能给我们带来很大的灵活性-它只能进行无意识的 广播，在这里我们将使用 direct 这种类型来进行替换，这种类型的工作方式是，消息只去到它绑定的 routingKey 队列中去。

![image-20220114162936566](/assets/imgs/RabbitMQ1.assets/image-20220114162936566.png)

在上面这张图中，我们可以看到 X 绑定了两个队列，绑定类型是 direct。队列 Q1 绑定键为 orange， 队列 Q2 绑定键有两个:一个绑定键为 black，另一个绑定键为 green.

在这种绑定情况下，生产者发布消息到 exchange 上，绑定键为 orange 的消息会被发布到队列 Q1。绑定键为 blackgreen 和的消息会被发布到队列 Q2，其他消息类型的消息将被丢弃。



#### 多重绑定 

![image-20220114162956789](/assets/imgs/RabbitMQ1.assets/image-20220114162956789.png)

当然如果 exchange 的绑定类型是 direct，**但是它绑定的多个队列的 key 如果都相同**，在这种情 况下虽然绑定类型是 direct **但是它表现的就和 fanout 有点类似了**，就跟广播差不多，如上图所示。



#### 实战

>   实现效果

![image-20220114163035937](/assets/imgs/RabbitMQ1.assets/image-20220114163035937.png)

![image-20220114163042040](/assets/imgs/RabbitMQ1.assets/image-20220114163042040.png)



##### 生产者

```java
package com.yixihan.rabbitmq.direct;

import com.rabbitmq.client.Channel;
import com.yixihan.rabbitmq.util.RabbitMqUtils;

import java.nio.charset.StandardCharsets;
import java.util.Random;
import java.util.Scanner;

/**
 * 发消息 交换机 direct
 * @author : yixihan
 * @create : 2022-01-14-16:36
 */
public class DirectLog {

    /**
     * 交换机的名字
     */
    public static final String EXCHANGE_NAME = "direct_logs";

    public static void main(String[] args) throws Exception {

        String[] status = {"info", "warning", "error"};
        Random random = new Random();

        Channel channel = RabbitMqUtils.getChannel ();

        channel.exchangeDeclare (EXCHANGE_NAME, "direct");

        Scanner sc = new Scanner(System.in);

        while (sc.hasNext ()) {
            int index = random.nextInt (3);
            String message = "这是一条 " + status[index] + " 信息, 信息内容 : " + sc.next ();
            System.out.println ("发送的消息为 : " + message);
            channel.basicPublish (EXCHANGE_NAME, status[index], null, message.getBytes (StandardCharsets.UTF_8));
        }
    }
}

```



##### 消费者

console 消费者

```java
package com.yixihan.rabbitmq.direct;

import com.rabbitmq.client.BuiltinExchangeType;
import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.yixihan.rabbitmq.util.RabbitMqUtils;

import java.nio.charset.StandardCharsets;

/**
 * direct 接收
 * @author : yixihan
 * @create : 2022-01-14-16:31
 */
public class ReceiveLogsDirect01 {

    public static final String EXCHANGES_NAME = "direct_logs";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel ();

        // 声明一个交换机
        channel.exchangeDeclare (EXCHANGES_NAME, BuiltinExchangeType.DIRECT);

        // 声明一个队列
        /*
        生成一个临时的队列, 队列的名称是随机的
        当消费者断开与队列的连接的时候, 队列就自动删除
         */
        String queueName = "console";
        channel.queueDeclare (queueName, false, false, false, null);

        // 绑定交换机与队列
        channel.queueBind (queueName, EXCHANGES_NAME, "info");
        channel.queueBind (queueName, EXCHANGES_NAME, "warning");

        System.out.println ("等待接收消息, 把接收到的消息打印在屏幕上...");

        DeliverCallback deliverCallback = (consumerTag, message) ->
                System.out.println ("控制台 "+ queueName + " 打印接收到的消息" + new String (message.getBody (), StandardCharsets.UTF_8)
                );

        CancelCallback cancelCallback = consumerTag -> System.out.println (consumerTag + "消费者取消消费接口回调逻辑");

        channel.basicConsume (queueName, true, deliverCallback, cancelCallback);
    }
}

```



disk 消费者

```java
package com.yixihan.rabbitmq.direct;

import com.rabbitmq.client.BuiltinExchangeType;
import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.yixihan.rabbitmq.util.RabbitMqUtils;

import java.nio.charset.StandardCharsets;

/**
 * direct 接收
 * @author : yixihan
 * @create : 2022-01-14-16:31
 */
public class ReceiveLogsDirect02 {

    public static final String EXCHANGES_NAME = "direct_logs";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel ();

        // 声明一个交换机
        channel.exchangeDeclare (EXCHANGES_NAME, BuiltinExchangeType.DIRECT);

        // 声明一个队列
        /*
        生成一个临时的队列, 队列的名称是随机的
        当消费者断开与队列的连接的时候, 队列就自动删除
         */
        String queueName = "disk";
        channel.queueDeclare (queueName, false, false, false, null);

        // 绑定交换机与队列
        channel.queueBind (queueName, EXCHANGES_NAME, "error");

        System.out.println ("等待接收消息, 把接收到的消息打印在屏幕上...");

        DeliverCallback deliverCallback = (consumerTag, message) ->
                System.out.println ("控制台 "+ queueName + " 打印接收到的消息" + new String (message.getBody (), StandardCharsets.UTF_8)
                );

        CancelCallback cancelCallback = consumerTag -> System.out.println (consumerTag + "消费者取消消费接口回调逻辑");

        channel.basicConsume (queueName, true, deliverCallback, cancelCallback);
    }
}

```





##### 测试

>   生产者

![image-20220114164228748](/assets/imgs/RabbitMQ1.assets/image-20220114164228748.png)



>   消费者

![image-20220114164241167](/assets/imgs/RabbitMQ1.assets/image-20220114164241167.png)

![image-20220114164247520](/assets/imgs/RabbitMQ1.assets/image-20220114164247520.png)



### Topics



#### 之前类型的问题 

在上一个小节中，我们改进了日志记录系统。我们没有使用只能进行随意广播的 fanout 交换机，而是 使用了 direct 交换机，从而有能实现有选择性地接收日志。

尽管使用 direct 交换机改进了我们的系统，但是它仍然存在局限性-比方说我们想接收的日志类型有 info.base 和 info.advantage，某个队列只想 info.base 的消息，那这个时候 direct 就办不到了。这个时候 就只能使用 topic 类型



#### Topic 的要求 

发送到类型是 topic 交换机的消息的 routing_key 不能随意写，必须满足一定的要求，它**必须是一个单词列表，以点号分隔开**。这些单词可以是任意单词，比如说："stock.usd.nyse", "nyse.vmw", "quick.orange.rabbit".这种类型的。当然这个单词列表最多不能超过 255 个字节。



在这个规则列表中，其中有两个替换符是大家需要注意的

-   ***(星号)可以代替一个单词**
-   **#(井号)可以替代零个或多个单词**



#### Topic 匹配案例 

下图绑定关系如下

-   Q1-->绑定的是 
    -   中间带 orange 带 3 个单词的字符串(*.orange.*) 

-   Q2-->绑定的是 

    -   最后一个单词是 rabbit 的 3 个单词(*.*.rabbit) 

    -   第一个单词是 lazy 的多个单词(lazy.#)

![image-20220114164549885](/assets/imgs/RabbitMQ1.assets/image-20220114164549885.png)



>   他们之间数据接收情况

|       Routing key        |                接收到的队列                |
| :----------------------: | :----------------------------------------: |
|   lazy.orange.elephant   |             被队列 Q1Q2 接收到             |
|     quick.orange.fox     |              被队列 Q1 接收到              |
|   quick.orange.rabbit    |             被队列 Q1Q2 接收到             |
|      lazy.brown.fox      |              被队列 Q2 接收到              |
|     lazy.pink.rabbit     |   虽然满足两个绑定但只被队列 Q2 接收一次   |
|     quick.brown.fox      | 不匹配任何绑定不会被任何队列接收到会被丢弃 |
| quick.orange.male.rabbit |      是四个单词不匹配任何绑定会被丢弃      |
| lazy.orange.male.rabbit  |            是四个单词但匹配 Q2             |



当队列绑定关系是下列这种情况时需要引起注意

-   **当一个队列绑定键是#,那么这个队列将接收所有数据，就有点像 fanout 了**
-   **如果队列绑定键当中没有#和*出现，那么该队列绑定类型就是 direct 了**



#### 实战

>   实现效果

![image-20220114164549885](/assets/imgs/RabbitMQ1.assets/image-20220114164549885.png)

![image-20220114165738730](/assets/imgs/RabbitMQ1.assets/image-20220114165738730.png)



##### 生产者

```java
package com.yixihan.rabbitmq.topic;

import com.rabbitmq.client.Channel;
import com.yixihan.rabbitmq.util.RabbitMqUtils;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * 发消息 交换机 topic
 * @author : yixihan
 * @create : 2022-01-14-17:04
 */
public class EmitLogTopic {

    /**
     * 交换机名称
     */
    public static final String EXCHANGE_NAME = "topic_logs";

    public static void main(String[] args) throws Exception {

        Map<String, String> map = new HashMap<> (16);
        map.put ("lazy.orange.elephant","被队列 Q1Q2 接收到");
        map.put ("quick.orange.fox","被队列 Q1 接收到");
        map.put ("quick.orange.rabbit","被队列 Q1Q2 接收到");
        map.put ("lazy.brown.fox","被队列 Q2 接收到");
        map.put ("lazy.pink.rabbit","虽然满足两个绑定但只被队列 Q2 接收一次");
        map.put ("quick.brown.fox","不匹配任何绑定不会被任何队列接收到会被丢弃");
        map.put ("quick.orange.male.rabbit","是四个单词不匹配任何绑定会被丢弃");
        map.put ("lazy.orange.male.rabbit","是四个单词但匹配 Q2");

        Channel channel = RabbitMqUtils.getChannel ();

        channel.exchangeDeclare (EXCHANGE_NAME, "topic");

        Set<Map.Entry<String, String>> entries = map.entrySet ();

        for (Map.Entry<String, String> entry : entries) {
            String message = entry.getValue ();
            System.out.println ("Routing key : " + entry.getKey () + ", message : " + message);
            channel.basicPublish (EXCHANGE_NAME, entry.getKey (), null, message.getBytes (StandardCharsets.UTF_8));
        }
    }
}

```



##### 消费者

Q1 消费者

```java
package com.yixihan.rabbitmq.topic;

import com.rabbitmq.client.BuiltinExchangeType;
import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.yixihan.rabbitmq.util.RabbitMqUtils;

/**
 * topic 接收
 * @author : yixihan
 * @create : 2022-01-14-16:59
 */
public class ReceiveLogsTopic01 {

    /**
     * 交换机名称
     */
    public static final String EXCHANGE_NAME = "topic_logs";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel ();

        // 声明一个交换机
        channel.exchangeDeclare (EXCHANGE_NAME, BuiltinExchangeType.TOPIC);

        // 声明一个队列 临时队列
        /*
        生成一个临时的队列, 队列的名称是随机的
        当消费者断开与队列的连接的时候, 队列就自动删除
         */
        String queueName = "Q1";
        channel.queueDeclare (queueName, false, false, false, null);

        // 绑定交换机与队列
        channel.queueBind (queueName, EXCHANGE_NAME, "*.orange.*");

        System.out.println ("等待接收消息, 把接收到的消息打印在屏幕上...");

        DeliverCallback deliverCallback = (consumerTag, message) ->
                System.out.println ("控制台 "+ queueName + " , 绑定键 : " + message.getEnvelope ().getRoutingKey ()
                );

        CancelCallback cancelCallback = consumerTag -> System.out.println (consumerTag + "消费者取消消费接口回调逻辑");

        channel.basicConsume (queueName, true, deliverCallback, cancelCallback);
    }
}

```



Q2 消费者

```java
package com.yixihan.rabbitmq.topic;

import com.rabbitmq.client.BuiltinExchangeType;
import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.yixihan.rabbitmq.util.RabbitMqUtils;

/**
 * topic 接收
 * @author : yixihan
 * @create : 2022-01-14-16:59
 */
public class ReceiveLogsTopic02 {

    /**
     * 交换机名称
     */
    public static final String EXCHANGE_NAME = "topic_logs";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel ();

        // 声明一个交换机
        channel.exchangeDeclare (EXCHANGE_NAME, BuiltinExchangeType.TOPIC);

        // 声明一个队列 临时队列
        /*
        生成一个临时的队列, 队列的名称是随机的
        当消费者断开与队列的连接的时候, 队列就自动删除
         */
        String queueName = "Q2";
        channel.queueDeclare (queueName, false, false, false, null);

        // 绑定交换机与队列
        channel.queueBind (queueName, EXCHANGE_NAME, "*.*.rabbit");
        channel.queueBind (queueName, EXCHANGE_NAME, "lazy.#");

        System.out.println ("等待接收消息, 把接收到的消息打印在屏幕上...");

        DeliverCallback deliverCallback = (consumerTag, message) ->
                System.out.println ("控制台 "+ queueName + " , 绑定键 : " + message.getEnvelope ().getRoutingKey ()
                );

        CancelCallback cancelCallback = consumerTag -> System.out.println (consumerTag + "消费者取消消费接口回调逻辑");

        channel.basicConsume (queueName, true, deliverCallback, cancelCallback);
    }
}
```



##### 测试

>   生产者

![image-20220114171947835](/assets/imgs/RabbitMQ1.assets/image-20220114171947835.png)

![image-20220114172010356](/assets/imgs/RabbitMQ1.assets/image-20220114172010356.png)![image-20220114172015369](/assets/imgs/RabbitMQ1.assets/image-20220114172015369.png)



## 死信队列



### 死信的概念

先从概念解释上搞清楚这个定义，死信，顾名思义就是无法被消费的消息，字面意思可以这样理 解，一般来说，producer 将消息投递到 broker 或者直接到 queue 里了，consumer 从 queue 取出消息 进行消费，但某些时候由于特定的**原因导致 queue 中的某些消息无法被消费**，这样的消息如果没有 后续的处理，就变成了死信，有死信自然就有了死信队列。

应用场景:为了保证订单业务的消息数据不丢失，需要使用到 RabbitMQ 的死信队列机制，当消息 消费发生异常时，将消息投入死信队列中.还有比如说: 用户在商城下单成功并点击去支付后在指定时 间未支付时自动失效



### 死信的来源



-   消息 TTL 过期
-   队列达到最大长度(队列满了，无法再添加数据到 mq 中)
-   消息被拒绝(basic.reject 或 basic.nack)并且 requeue=false.





### 死信实战



#### 代码架构图 

![image-20220115071913629](/assets/imgs/RabbitMQ1.assets/image-20220115071913629.png)



#### 实战一 - 消息 TTL 过期



##### 生产者

```java
package com.yixihan.rabbitmq.deadletter;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.yixihan.rabbitmq.util.RabbitMqUtils;

/**
 * 死信队列 - 实战
 * 生产者
 * @author : yixihan
 * @create : 2022-01-15-7:52
 */
public class Producer {

    /**
     * 普通交换机名称
     */
    public static final String NORMAL_EXCHANGE_NAME = "normal_exchange";

    public static void main(String[] args) throws Exception {

        Channel channel = RabbitMqUtils.getChannel ();

        // 死信消息 设置 TTL 时间 time to live
        // 单位是 ms
        AMQP.BasicProperties props = new AMQP.BasicProperties ()
                .builder ().expiration ("10000").build ();

        for (int i = 0; i < 10; i++) {

            String message = "info" + i;
            channel.basicPublish (NORMAL_EXCHANGE_NAME, "zhangsan", props, message.getBytes ());
        }

        System.out.println ("消息发送完成, 生产者正在退出");
        channel.close ();

    }

}

```



##### 消费者

消费者1 - 普通队列

```java
package com.yixihan.rabbitmq.deadletter;

import com.rabbitmq.client.BuiltinExchangeType;
import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.yixihan.rabbitmq.util.RabbitMqUtils;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * 死信队列 - 实战
 * 消费者 1
 * @author : yixihan
 * @create : 2022-01-15-7:25
 */
public class Consumer01 {

    /**
     * 普通交换机名称
     */
    public static final String NORMAL_EXCHANGE_NAME = "normal_exchange";

    /**
     * 普通队列名称
     */
    public static final String NORMAL_QUEUE_NAME = "normal_queue";

    /**
     * 死信交换机名称
     */
    public static final String DEAD_EXCHANGE_NAME = "dead_exchange";

    /**
     * 死信队列名称
     */
    public static final String DEAD_QUEUE_NAME = "dead_queue";


    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel ();

        // 声明交换机
        // 普通交换机 direct
        channel.exchangeDeclare (NORMAL_EXCHANGE_NAME, BuiltinExchangeType.DIRECT);

        // 死信交换机 direct
        channel.exchangeDeclare (DEAD_EXCHANGE_NAME, BuiltinExchangeType.DIRECT);

        // 声明队列
        // 普通队列
        Map<String, Object> arguments = new HashMap<> (16);

        // 过期时间, 可由交换机或者生产者设置
//        arguments.put ("x-message-ttl", 10000);

        // 正常队列设置死信交换机
        arguments.put ("x-dead-letter-exchange", DEAD_EXCHANGE_NAME);

        // 设置死信 Routing Key
        arguments.put ("x-dead-letter-routing-key", "lisi");

        channel.queueDeclare (NORMAL_QUEUE_NAME, false, false, false, arguments);

        // 死信队列
        channel.queueDeclare (DEAD_QUEUE_NAME, false, false, false, null);

        // 绑定交换机与队列
        // 普通队列
        channel.queueBind (NORMAL_QUEUE_NAME, NORMAL_EXCHANGE_NAME, "zhangsan");

        // 死信队列
        channel.queueBind (DEAD_QUEUE_NAME, DEAD_EXCHANGE_NAME, "lisi");

        System.out.println ("消费者已连接成功, 正在等待接收消息...");


        DeliverCallback deliverCallback = (consumerTag, message) ->
                System.out.println (Consumer01.class.getName () + " 接收的消息是" + new String (message.getBody (), StandardCharsets.UTF_8));

        CancelCallback cancelCallback = consumerTag -> System.out.println (consumerTag + "消费者取消消费接口回调逻辑");

        channel.basicConsume (NORMAL_QUEUE_NAME, true, deliverCallback, cancelCallback);

    }
}

```



消费者2 - 死信队列

```java
package com.yixihan.rabbitmq.deadletter;

import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.yixihan.rabbitmq.util.RabbitMqUtils;

import java.nio.charset.StandardCharsets;

/**
 * 死信队列 - 实战
 * 消费者 1
 * @author : yixihan
 * @create : 2022-01-15-7:25
 */
public class Consumer02 {

    /**
     * 死信队列名称
     */
    public static final String DEAD_QUEUE_NAME = "dead_queue";


    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel ();

        System.out.println ("消费者已连接成功, 正在等待接收消息...");


        DeliverCallback deliverCallback = (consumerTag, message) ->
                System.out.println (Consumer02.class.getName () + " 接收的消息是" + new String (message.getBody (), StandardCharsets.UTF_8));

        CancelCallback cancelCallback = consumerTag -> System.out.println (consumerTag + "消费者取消消费接口回调逻辑");

        channel.basicConsume (DEAD_QUEUE_NAME, true, deliverCallback, cancelCallback);

    }
}

```



##### 测试

>   正常信息 -> 死信



![image-20220115080128690](/assets/imgs/RabbitMQ1.assets/image-20220115080128690.png)



![image-20220115080138043](/assets/imgs/RabbitMQ1.assets/image-20220115080138043.png)



>   消费者2 - 死信队列

![image-20220115080334185](/assets/imgs/RabbitMQ1.assets/image-20220115080334185.png)



#### 实战二 - 队列达到最大长度



##### 生产者

```java
package com.yixihan.rabbitmq.deadletter.maxlen;

import com.rabbitmq.client.Channel;
import com.yixihan.rabbitmq.util.RabbitMqUtils;

/**
 * 死信队列 - 实战
 * 生产者
 * @author : yixihan
 * @create : 2022-01-15-7:52
 */
public class Producer {

    /**
     * 普通交换机名称
     */
    public static final String NORMAL_EXCHANGE_NAME = "normal_exchange";

    public static void main(String[] args) throws Exception {

        Channel channel = RabbitMqUtils.getChannel ();

        // 死信消息 设置 TTL 时间 time to live
        // 单位是 ms
        /*
        AMQP.BasicProperties props = new AMQP.BasicProperties ()
                .builder ().expiration ("10000").build ();
        */



        for (int i = 0; i < 10; i++) {

            String message = "info" + i;
            channel.basicPublish (NORMAL_EXCHANGE_NAME, "zhangsan", null, message.getBytes ());
        }

        System.out.println ("消息发送完成, 生产者正在退出");
        channel.close ();

    }

}

```



##### 消费者

消费者1 - 正常队列

```java
package com.yixihan.rabbitmq.deadletter.maxlen;

import com.rabbitmq.client.BuiltinExchangeType;
import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.yixihan.rabbitmq.util.RabbitMqUtils;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * 死信队列 - 实战
 * 消费者 1
 * @author : yixihan
 * @create : 2022-01-15-7:25
 */
public class Consumer01 {

    /**
     * 普通交换机名称
     */
    public static final String NORMAL_EXCHANGE_NAME = "normal_exchange";

    /**
     * 普通队列名称
     */
    public static final String NORMAL_QUEUE_NAME = "normal_queue";

    /**
     * 死信交换机名称
     */
    public static final String DEAD_EXCHANGE_NAME = "dead_exchange";

    /**
     * 死信队列名称
     */
    public static final String DEAD_QUEUE_NAME = "dead_queue";


    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel ();

        // 声明交换机
        // 普通交换机 direct
        channel.exchangeDeclare (NORMAL_EXCHANGE_NAME, BuiltinExchangeType.DIRECT);

        // 死信交换机 direct
        channel.exchangeDeclare (DEAD_EXCHANGE_NAME, BuiltinExchangeType.DIRECT);

        // 声明队列
        // 普通队列
        Map<String, Object> arguments = new HashMap<> (16);

        // 过期时间, 可由交换机或者生产者设置
//        arguments.put ("x-message-ttl", 10000);

        // 设置正常队列的长度的限制
        arguments.put ("x-max-length", 6);

        // 正常队列设置死信交换机
        arguments.put ("x-dead-letter-exchange", DEAD_EXCHANGE_NAME);

        // 设置死信 Routing Key
        arguments.put ("x-dead-letter-routing-key", "lisi");

        channel.queueDeclare (NORMAL_QUEUE_NAME, false, false, false, arguments);

        // 死信队列
        channel.queueDeclare (DEAD_QUEUE_NAME, false, false, false, null);

        // 绑定交换机与队列
        // 普通队列
        channel.queueBind (NORMAL_QUEUE_NAME, NORMAL_EXCHANGE_NAME, "zhangsan");

        // 死信队列
        channel.queueBind (DEAD_QUEUE_NAME, DEAD_EXCHANGE_NAME, "lisi");

        System.out.println ("消费者已连接成功, 正在等待接收消息...");


        DeliverCallback deliverCallback = (consumerTag, message) ->
                System.out.println (Consumer01.class.getName () + " 接收的消息是" + new String (message.getBody (), StandardCharsets.UTF_8));

        CancelCallback cancelCallback = consumerTag -> System.out.println (consumerTag + "消费者取消消费接口回调逻辑");

        channel.basicConsume (NORMAL_QUEUE_NAME, true, deliverCallback, cancelCallback);

    }
}

```



消费者2 - 死信队列

同实战一 --- 消费者 2



##### 测试

>   正常消息 -> 死信

![image-20220115081443957](/assets/imgs/RabbitMQ1.assets/image-20220115081443957.png)

![image-20220115081227039](/assets/imgs/RabbitMQ1.assets/image-20220115081227039.png)



>   消费者 2 - 死信队列

![image-20220115081254184](/assets/imgs/RabbitMQ1.assets/image-20220115081254184.png)



#### 实战三 - 消息被拒



##### 生产者

同实战二生产者



##### 消费者

消费者 1 - 正常队列

```java
package com.yixihan.rabbitmq.deadletter.refuse;

import com.rabbitmq.client.BuiltinExchangeType;
import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.yixihan.rabbitmq.util.RabbitMqUtils;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * 死信队列 - 实战
 * 消费者 1
 * @author : yixihan
 * @create : 2022-01-15-7:25
 */
public class Consumer01 {

    /**
     * 普通交换机名称
     */
    public static final String NORMAL_EXCHANGE_NAME = "normal_exchange";

    /**
     * 普通队列名称
     */
    public static final String NORMAL_QUEUE_NAME = "normal_queue";

    /**
     * 死信交换机名称
     */
    public static final String DEAD_EXCHANGE_NAME = "dead_exchange";

    /**
     * 死信队列名称
     */
    public static final String DEAD_QUEUE_NAME = "dead_queue";


    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel ();

        // 声明交换机
        // 普通交换机 direct
        channel.exchangeDeclare (NORMAL_EXCHANGE_NAME, BuiltinExchangeType.DIRECT);

        // 死信交换机 direct
        channel.exchangeDeclare (DEAD_EXCHANGE_NAME, BuiltinExchangeType.DIRECT);

        // 声明队列
        // 普通队列
        Map<String, Object> arguments = new HashMap<> (16);

        // 过期时间, 可由交换机或者生产者设置
//        arguments.put ("x-message-ttl", 10000);

        // 设置正常队列的长度的限制
//        arguments.put ("x-max-length", 6);

        // 正常队列设置死信交换机
        arguments.put ("x-dead-letter-exchange", DEAD_EXCHANGE_NAME);

        // 设置死信 Routing Key
        arguments.put ("x-dead-letter-routing-key", "lisi");

        channel.queueDeclare (NORMAL_QUEUE_NAME, false, false, false, arguments);

        // 死信队列
        channel.queueDeclare (DEAD_QUEUE_NAME, false, false, false, null);

        // 绑定交换机与队列
        // 普通队列
        channel.queueBind (NORMAL_QUEUE_NAME, NORMAL_EXCHANGE_NAME, "zhangsan");

        // 死信队列
        channel.queueBind (DEAD_QUEUE_NAME, DEAD_EXCHANGE_NAME, "lisi");

        System.out.println ("消费者已连接成功, 正在等待接收消息...");


        DeliverCallback deliverCallback = (consumerTag, message) -> {

            String msg = new String (message.getBody (), StandardCharsets.UTF_8);
            if (! "info5".equals (msg)) {
                System.out.println (Consumer01.class.getName () + " 接收的消息是" + msg);
                channel.basicAck (message.getEnvelope ().getDeliveryTag (), false);
            } else {
                // requeue : false : 拒接后不塞回普通队列
                channel.basicReject (message.getEnvelope ().getDeliveryTag (), false);
                System.out.println (Consumer01.class.getName () + " 接收的消息是" + msg + ", 拒收");
            }
        };

        CancelCallback cancelCallback = consumerTag -> System.out.println (consumerTag + "消费者取消消费接口回调逻辑");

        // 开启手动应答
        channel.basicConsume (NORMAL_QUEUE_NAME, false, deliverCallback, cancelCallback);

    }
}

```



消费者 2 - 死信队列

同实战二 - 消费者 2



##### 测试

>   消费者 1 - 正常队列

![image-20220115082144526](/assets/imgs/RabbitMQ1.assets/image-20220115082144526.png)



>   消费者 2 - 死信队列

![image-20220115082150835](/assets/imgs/RabbitMQ1.assets/image-20220115082150835.png)



>   生产者

![image-20220115082158451](/assets/imgs/RabbitMQ1.assets/image-20220115082158451.png)

