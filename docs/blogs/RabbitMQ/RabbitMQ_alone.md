---
title: RabbitMQ_alone
date: 2022-03-09
tags:
 - Linux
 - RabbitMQ
categories:
 - RabbitMQ
---

# RabbitMQ 单机环境搭建

## RabbitMQ 安装

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

## RabbitMQ 常用命令

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

## 开启 web 管理插件

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

### 重置命令



```shell
# 关闭应用的命令
rabbitmqctl stop_app
# 清除的命令
rabbitmqctl reset
# 重新启动命令
rabbitmqctl start_app
```

## 安装延时队列插件

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

![image-20220115101919856](RabbitMQ2.assets/image-20220115101919856.png)
