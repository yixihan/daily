---
title: RabbitMQ_colony
date: 2022-03-09
tags:
 - Linux
 - RabbitMQ
categories:
 - RabbitMQ
---

# RabbitMQ 集群环境搭建



## clustering





### 使用集群的原因

最开始我们介绍了如何安装及运行 RabbitMQ 服务，不过这些是单机版的，无法满足目前真实应用的要求。如果 RabbitMQ 服务器遇到内存崩溃、机器掉电或者主板故障等情况，该怎么办？单台 RabbitMQ 服务器可以满足每秒 1000 条消息的吞吐量，那么如果应用需要 RabbitMQ 服务满足每秒 10 万条消息的吞吐量呢？购买昂贵的服务器来增强单机 RabbitMQ 务的性能显得捉襟见肘，搭建一个 RabbitMQ 集群才是 解决实际问题的关键.



## 搭建步骤 



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



## 镜像队列

如果 RabbitMQ 集群中只有一个 Broker 节点，那么该节点的失效将导致整体服务的临时性不可用，并且也可能会导致消息的丢失。可以将所有消息都设置为持久化，并且对应队列的durable属性也设置为true，但是这样仍然无法避免由于缓存导致的问题：因为消息在发送之后和被写入磁盘井执行刷盘动作之间存在一个短暂却会产生问题的时间窗。通过 publisherconfirm 机制能够确保客户端知道哪些消息己经存入磁盘，尽管如此，一般不希望遇到因单点故障导致的服务不可用。

引入镜像队列(Mirror Queue)的机制，可以将队列镜像到集群中的其他 Broker 节点之上，如果集群中的一个节点失效了，队列能自动地切换到镜像中的另一个节点上以保证服务的可用性。



### 搭建步骤

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



## Haproxy+Keepalive 实现高可用负载均衡



### 整体架构图 

![image-20220116080758776](/assets/imgs/RabbitMQ2.assets/image-20220116080758776.png)



### Haproxy 实现负载均衡 

HAProxy 提供高可用性、负载均衡及基于 TCPHTTP 应用的代理，支持虚拟主机，它是免费、快速并 且可靠的一种解决方案，包括 Twitter,Reddit,StackOverflow,GitHub 在内的多家知名互联网公司在使用。 HAProxy 实现了一种事件驱动、单一进程模型，此模型支持非常大的井发连接数。

[扩展 nginx,lvs,haproxy 之间的区别](http://www.ha97.com/5646.html)



### 搭建步骤(未自己实现)

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



## Federation Exchange



### 原理图

![image-20220116083223118](/assets/imgs/RabbitMQ2.assets/image-20220116083223118.png)



### 搭建步骤

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



## Federation Queue



### 使用它的原因

联邦队列可以在多个 Broker 节点(或者集群)之间为单个队列提供均衡负载的功能。一个联邦队列可以连接一个或者多个上游队列(upstream queue)，并从这些上游队列中获取消息以满足本地消费者消费消息的需求。



### 原理图

![image-20220116085839233](/assets/imgs/RabbitMQ2.assets/image-20220116085839233.png)



### 搭建步骤

>   添加 upstream

![image-20220116085500694](/assets/imgs/RabbitMQ2.assets/image-20220116085500694.png)



>   添加 policy

![image-20220116090200964](/assets/imgs/RabbitMQ2.assets/image-20220116090200964.png)



>   成功的前提

![image-20220116090223927](/assets/imgs/RabbitMQ2.assets/image-20220116090223927.png)



## Shovel



### 使用它的原因

Federation 具备的数据转发功能类似，Shovel 够可靠、持续地从一个 Broker 中的队列(作为源端，即 source)拉取数据并转发至另一个 Broker 中的交换器(作为目的端，即 destination)。作为源端的队列和作为目的端的交换器可以同时位于同一个 Broker，也可以位于不同的 Broker 上。Shovel 可以翻译为"铲子"，是一种比较形象的比喻，这个"铲子"可以将消息从一方"铲子"另一方。Shovel 行为就像优秀的客户端应用程序能够负责连接源和目的地、负责消息的读写及负责连接失败问题的处理。



### 原理图

在源头发送的消息直接回进入到目的地队列

![image-20220116090444771](/assets/imgs/RabbitMQ2.assets/image-20220116090444771.png)



### 搭建步骤

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

