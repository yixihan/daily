---
title: Nginx
date: 2022-03-09
tags:
 - Nginx
 - Linux
categories:
 - Nginx
---

# Nginx



## Nginx 简介



### 什么是 Nginx

Nginx 可以作为静态页面的 web 服务器，同时还支持 CGI 协议的动态语言，比如 perl、php 等。但是不支持 java。Java 程序只能通过与 tomcat 配合完成。

Nginx 是高性能的 HTTP 和反向代理的服务器，处理高并发能力是十分强大的，能经受高负 载的考验,有报告表明能支持高达 50,000 个并发连接数。

[Nginx 简介](https://lnmp.org/nginx.html)

[Nginx官网](https://nginx.org/)



### 正向代理

正向代理：如果把局域网外的 Internet 想象成一个巨大的资源库，则局域网中的客户端要访 问 Internet，则需要通过代理服务器来访问，这种代理服务就称为正向代理。

**需要在客户端配置代理服务器进行指定网站访问**

![image-20220113080407618](/assets/imgs/Nginx.assets/image-20220113080407618.png)



### 反向代理

反向代理，其实客户端对代理是无感知的，因为客户端不需要任何配置就可以访问，我们只 需要将请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据后，在返 回给客户端，此时反向代理服务器和目标服务器对外就是一个服务器，**暴露的是代理服务器 地址，隐藏了真实服务器 IP 地址**。

![image-20220113080908675](/assets/imgs/Nginx.assets/image-20220113080908675.png)

![image-20220113080937075](/assets/imgs/Nginx.assets/image-20220113080937075.png)



### 负载均衡

**增加服务器的数量，然后将请求分发到各个服务器上，将原先请求集中到单个服务器上的 情况改为将请求分发到多个服务器上，将负载分发到不同的服务器，也就是我们所说的负载均衡**

![image-20220113081641151](/assets/imgs/Nginx.assets/image-20220113081641151.png)



### 动静分离

为了加快网站的解析速度，可以把动态页面和静态页面由不同的服务器来解析，加快解析速 度。降低原来单个服务器的压力。

![image-20220113082352406](/assets/imgs/Nginx.assets/image-20220113082352406.png)



## Nginx 安装



### 相关资源下载

[Nginx下载地址](http://nginx.org/en/download.html)

[xshell下载地址](https://www.xshell.com/zh/all-downloads/)



### Nginx 安装



>   使用 xshell 连接 Linux 服务器

![image-20220113083719353](/assets/imgs/Nginx.assets/image-20220113083719353.png)

>   安装  pcre 依赖

1.   联网下载 pcre 压缩文件依赖

     ```shell
     wget http://downloads.sourceforge.net/project/pcre/pcre/8.37/pcre-8.37.tar.gz
     ```

2.   解压压缩文件

     ```shell
     tar -zxvf pcre-8.37.tar.gz
     ```

3.   安装 pcre

     ```shell
     ./configure
     make && make install
     ```

4.   查看 pcre 版本号

     ```shell
     pcre-config --version
     ```

     ![image-20220113083936915](/assets/imgs/Nginx.assets/image-20220113083936915.png)

>   安装 openssl 、zlib 、 gcc 依赖

```shell
yum -y install make zlib zlib-devel gcc-c++ libtool openssl openssl-devel
```

>   安装 Nginx

```shell
tar -zxvf nginx-1.20.1.tar.gz
./configure
make && make install
```

>   启动 Nginx

```shell
cd /usr/local/nginx/sbin
./nginx 
```

>   访问 Nginx

```
http://yixihan.chat/
http://110.42.138.132/
```

[url](http://yixihan.chat/)

[url](http://110.42.138.132/)



![image-20220113084643763](/assets/imgs/Nginx.assets/image-20220113084643763.png)

>   开放端口

在 windows 系统中访问 linux 中 nginx，默认不能访问的，因为防火墙问题 

1.   关闭防火墙 
2.   开放访问的端口号，80 端口

```shell
# 查看开放的端口号
firewall-cmd --list-all
# 设置开放的端口号
firewall-cmd --add-service=http –permanent
firewall-cmd --add-port=80/tcp --permanent
# 重启防火墙
firewall-cmd --reload
```

## Nginx 常用命令

ps : Nginx 所有操作都必须在 `/usr/local/nginx/sbin` 目录中

```shell
# 进入 nginx 目录中
cd /usr/local/nginx/sbin

# 1. 查看 nginx 版本号
./nginx -v

# 2. 启动 nginx
./nginx

# 3. 停止 nginx
./nginx -s stop

# 4. 重新加载 nginx
./nginx -s reload

# 5. 查看 nginx 运行PID
ps -ef| grep nginx
```

## Nginx 配置文件



### Nginx 配置文件位置

`/usr/local/nginx/conf/nginx.conf`

```shell
vim /usr/local/nginx/conf/nginx.conf
```



### Nginx 配置文件内容

Nginx 配置文件分为三个部分

-   全局块
-   events 块
-   http 块



#### 全局块

配置服务器整体运行的配置指令

比如 worker_processes 1;处理并发数的配置

![image-20220113085630698](/assets/imgs/Nginx.assets/image-20220113085630698.png)



#### events 块

影响 Nginx 服务器与用户的网络连接

比如 worker_connections 1024 ==> 支持的最大连接数为 1024

![image-20220113085702413](/assets/imgs/Nginx.assets/image-20220113085702413.png)



#### http 块

这算是 Nginx 服务器配置中最频繁的部分，代理、缓存和日志定义等绝大多数功能和第三方模块的配置都在这里。

http 块还包含两部分： http 全局块 server 块

![image-20220113090128792](/assets/imgs/Nginx.assets/image-20220113090128792.png)



>   http 全局块

http 全局块配置的指令包括文件引入、MIME-TYPE 定义、日志自定义、连接超时时间、单链接请求数上限等。



>   server 块

这块和虚拟主机有密切关系，虚拟主机从用户角度看，和一台独立的硬件主机是完全一样的，该技术的产生是为了 节省互联网服务器硬件成本。 

每个 http 块可以包括多个 server 块，而每个 server 块就相当于一个虚拟主机。 

而每个 server 块也分为全局 server 块，以及可以同时包含多个 locaton 块。

这块的主要作用是基于 Nginx 服务器接收到的请求字符串（例如 server_name/uri-string），对虚拟主机名称 （也可以是 IP 别名）之外的字符串（例如 前面的 /uri-string）进行匹配，对特定的请求进行处理。地址定向、数据缓 存和应答控制等功能，还有许多第三方模块的配置也在这里进行。

1.   全局 server 块
     最常见的配置是本虚拟机主机的监听配置和本虚拟主机的名称或 IP 配置。

     ![image-20220113085913442](/assets/imgs/Nginx.assets/image-20220113085913442.png)

2.   location 块

     ![image-20220113085953508](/assets/imgs/Nginx.assets/image-20220113085953508.png)



## Nginx 配置实例 - 反向代理



### 反向代理实例一



>   实现效果

实现效果：使用 nginx 反向代理，访问 www.123.com 直接跳转到服务器的127.0.0.1:8080



#### 准备工作

>   安装 tomcat 并启动

ps : 需要有 jdk

[linux 版 tomcat 下载](https://tomcat.apache.org/download-90.cgi)

```shell
tar -zxvf apache-tomcat-9.0.43.tar.gz
cd apache-tomcat-9.0.43/bin/
./startup.sh
```

>   对外开放 8080 端口

```shell
firewall-cmd --add-port=8080/tcp --permanent
firewall-cmd --reload
firewall-cmd --list-all
```

>   访问 tomcat

![image-20220113091337863](/assets/imgs/Nginx.assets/image-20220113091337863.png)

#### 访问过程分析

![image-20220113091532023](/assets/imgs/Nginx.assets/image-20220113091532023.png)



#### 具体配置

>   在 windows 系统的 host 文件进行域名和 ip 对应关系的配置

1.   打开 host 文件
     host 文件位置 : `C:\Windows\System32\drivers\etc`
     ![image-20220113091707126](/assets/imgs/Nginx.assets/image-20220113091707126.png)

2.   添加内容

     ```
     # nginx 学习 (主机名 IP 地址 域名) 
     110.42.138.132 www.123.com
     ```

     ![image-20220113091948748](/assets/imgs/Nginx.assets/image-20220113091948748.png)

3.   测试访问
     ![image-20220113093605013](/assets/imgs/Nginx.assets/image-20220113093605013.png)
     ![image-20220113093621987](/assets/imgs/Nginx.assets/image-20220113093621987.png)



>   修改 nginx.conf 配置并重新加载 nginx

```shell
# 打开 nginx.conf
vim /usr/local/nginx/conf/nginx.conf

# 修改配置
server_name 主机IP地址;
proxy_pass http://127.0.0.1:8080;

# 重新加载 nginx
/usr/local/nginx/sbin/nginx -s reload
```



![image-20220113092926347](/assets/imgs/Nginx.assets/image-20220113092926347.png)



>   测试

![image-20220113093707259](/assets/imgs/Nginx.assets/image-20220113093707259.png)



### 反向代理实例二

>   实现效果

使用 nginx 反向代理，根据访问的路径跳转到不同端口的服务中

nginx 监听端口为 9001

访问 http://110.42.138.132:9001/edu/ 直接跳转到 127.0.0.1:8080 

访问 http:// 110.42.138.132:9001/vod/ 直接跳转到 127.0.0.1:8081



#### 准备工作

1.    准备两个 tomcat 服务器，一个 8080 端口，一个 8081 端口
2.    创建文件夹和测试页面

>   测试

![image-20220113100750534](/assets/imgs/Nginx.assets/image-20220113100750534.png)

![image-20220113100741063](/assets/imgs/Nginx.assets/image-20220113100741063.png)



#### 具体配置

>   修改 nginx.conf 配置并重新加载 nginx

```shell
# 打开 nginx.conf
vim /usr/local/nginx/conf/nginx.conf

# 修改配置
server {
	listen 9001;
	server_name 110.42.138.132;

	location ~ /edu/ {
		proxy_pass http://127.0.0.1:8080;
	}

	location ~ /vod/ {
		proxy_pass http://127.0.0.1:8081;
	}
}


# 重新加载 nginx
/usr/local/nginx/sbin/nginx -s reload
```

![image-20220113095718444](/assets/imgs/Nginx.assets/image-20220113095718444.png)



>   开放端口号

```shell
firewall-cmd --add-port=8081/tcp --permanent
firewall-cmd --add-port=9001/tcp --permanent
firewall -cmd --reload
```

>   测试

![image-20220113100721836](/assets/imgs/Nginx.assets/image-20220113100721836.png)

![image-20220113100659664](/assets/imgs/Nginx.assets/image-20220113100659664.png)



### location 指令说明

该指令用于匹配 URL。 

语法如下：

```shell
location { = | ~ | ~* | ^~ ] uri {

}
```

*   = ：用于不含正则表达式的 uri 前，要求请求字符串与 uri 严格匹配，如果匹配 成功，就停止继续向下搜索并立即处理该请求。
*   ~：用于表示 uri 包含正则表达式，并且区分大小写。
*   ~*：用于表示 uri 包含正则表达式，并且不区分大小写。
*   ^~：用于不含正则表达式的 uri 前，要求 Nginx 服务器找到标识 uri 和请求字 符串匹配度最高的 location 后，立即使用此 location 处理请求，而不再使用 location 块中的正则 uri 和请求字符串做匹配。

**注意：如果 uri 包含正则表达式，则必须要有 ~ 或者 ~* 标识**



## Nginx 配置实例 - 负载均衡



>   实现效果

浏览器地址栏输入地址 http://110.42.138.132/edu/a.html，负载均衡效果，平均 8080 和 8081 端口中



### 准备工作

1.   准备两台 tomcat 服务器，一台 8080，一台 8081
2.   在两台 tomcat 里面 webapps 目录中，创建名称是 edu 文件夹，在 edu 文件夹中创建 页面 a.html，用于测试

>   测试

![image-20220113101703849](/assets/imgs/Nginx.assets/image-20220113101703849.png)

![image-20220113101709278](/assets/imgs/Nginx.assets/image-20220113101709278.png)



### 具体配置

>   修改 nginx.conf 配置并重新加载 nginx

```shell
# 打开 nginx.conf
vim /usr/local/nginx/conf/nginx.conf

# 修改配置

# 负载均衡配置 (nginx 学习)
upstream myserver {
	server 110.42.138.132:8080;
	server 110.42.138.132:8081;
}

proxy_pass http://myserver;

# 重新加载 nginx
/usr/local/nginx/sbin/nginx -s reload
```

![image-20220113102127692](/assets/imgs/Nginx.assets/image-20220113102127692.png)

>   测试

![image-20220113102224533](/assets/imgs/Nginx.assets/image-20220113102224533.png)

![image-20220113102231982](/assets/imgs/Nginx.assets/image-20220113102231982.png)



### Nginx 负载均衡分配方式

随着互联网信息的爆炸性增长，负载均衡（load balance）已经不再是一个很陌生的话题， 顾名思义，负载均衡即是将负载分摊到不同的服务单元，既保证服务的可用性，又保证响应 足够快，给用户很好的体验。快速增长的访问量和数据流量催生了各式各样的负载均衡产品， 很多专业的负载均衡硬件提供了很好的功能，但却价格不菲，这使得负载均衡软件大受欢迎， nginx 就是其中的一个，在 linux 下有 Nginx、LVS、Haproxy 等等服务可以提供负载均衡服 务，而且 Nginx 提供了几种分配方式(策略)：

#### 轮询（默认）

每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器 down 掉，能自动剔除。



#### weight

weight 代表权,重默认为 1,权重越高被分配的客户端越多 指定轮询几率，weight 和访问比率成正比，用于后端服务器性能不均的情况。

 例如：

```shell
upstream server_pool{
	server 192.168.5.21 weight=10;
	server 192.168.5.22 weight=10;
}
```



#### ip_hash

每个请求**按访问 ip 的 hash 结果**分配，这样每个访客固定访问一个后端服务器，可以解决 session 的问题。 

例如：

```shell
upstream server_pool{
	ip_hash;
	server 192.168.5.21:80;
	server 192.168.5.22:80;
}
```

#### fair（第三方）

按**后端服务器的响应时间**来分配请求，响应时间短的优先分配。

```shell
upstream server_pool{
	server 192.168.5.21:80;
	server 192.168.5.22:80;
	fair;
}
```

## Nginx 配置实例 - 动静分离



### 动静分离简介

Nginx 动静分离简单来说就是把动态跟静态请求分开，不能理解成只是单纯的把动态页面和 静态页面物理分离。严格意义上说应该是动态请求跟静态请求分开，可以理解成使用 Nginx 处理静态页面，Tomcat 处理动态页面。



>   Nginx 动静分离的两种方式

*   纯粹把静态文件独立成单独的域名，放在独立的服务器上 (主流)
*   动态跟静态文件混合在一起发布，通过 nginx 来分开



>   实现方法

通过 location 指定不同的后缀名实现不同的请求转发。通过 expires 参数设置，可以使 浏览器缓存过期时间，减少与服务器之前的请求和流量。具体 Expires 定义：是给一个资 源设定一个过期时间，也就是说无需去服务端验证，直接通过浏览器自身确认是否过期即可， 所以不会产生额外的流量。此种方法非常适合不经常变动的资源。（如果经常更新的文件， 不建议使用 Expires 来缓存），我这里设置 3d，表示在这 3 天之内访问这个 URL，发送 一个请求，比对服务器该文件最后更新时间没有变化，则不会从服务器抓取，返回状态码 304，如果有修改，则直接从服务器重新下载，返回状态码 200。



>   图解

![image-20220113103324065](/assets/imgs/Nginx.assets/image-20220113103324065.png)



### 准备工作

1.   在 liunx 系统中准备静态资源，用于进行访问

![image-20220113104146968](/assets/imgs/Nginx.assets/image-20220113104146968.png)

![image-20220113104158833](/assets/imgs/Nginx.assets/image-20220113104158833.png)

![image-20220113104211194](/assets/imgs/Nginx.assets/image-20220113104211194.png)



### 具体配置

>   修改 nginx.conf 配置并重新加载 nginx

```shell
# 打开 nginx.conf
vim /usr/local/nginx/conf/nginx.conf

# 修改配置

# 负载均衡配置 (nginx 学习)
location /2D/ {
	root /picture/;
	autoindex on;
	expires 3d;
}

location /me/ {
	root /picture/;
	# 表示是否将所有资源以列表的形式列举出来
	autoindex on;
}

location /www/ {
	root /picture/;
	autoindex on;
	index index.html index.htm;
}

# 重新加载 nginx
/usr/local/nginx/sbin/nginx -s reload
```

![image-20220113111229457](/assets/imgs/Nginx.assets/image-20220113111229457.png)



>   测试

![image-20220113111257631](/assets/imgs/Nginx.assets/image-20220113111257631.png)

![image-20220113111315266](/assets/imgs/Nginx.assets/image-20220113111315266.png)

![image-20220113111352585](/assets/imgs/Nginx.assets/image-20220113111352585.png)



## Nginx 配置实例 - 高可用



### 高可用简介



>   问题

![image-20220113112632352](/assets/imgs/Nginx.assets/image-20220113112632352.png)



>   高可用

![image-20220113113453436](/assets/imgs/Nginx.assets/image-20220113113453436.png)



### 准备工作

1.   两台 nginx 服务器
     服务器 1 : 110.42.138.132
     服务器 2 : 1.117.145.128
2.    安装 nginx
3.    安装 keepalived



>   安装 keepalived

```shell
# 安装 keepalived
yum install keepalived –y

# 检测 keeypalived
rpm -q -v -a keepalived
```

![image-20220113115044111](/assets/imgs/Nginx.assets/image-20220113115044111.png)



### 具体配置

>   修改 keepalived

```shell
cd /etc/keepalived/
vim keepalived.conf 
```

具体配置 : 

```shell
! Configuration File for keepalived

# 全局定义
global_defs {
   notification_email {
     acassen@firewall.loc
     failover@firewall.loc
     sysadmin@firewall.loc
   }
   notification_email_from Alexandre.Cassen@firewall.loc
   smtp_server 192.168.200.1
   smtp_connect_timeout 30
   # 访问到主机 LVS_DEVEL 主机名字
   router_id LVS_DEVEL
   vrrp_skip_check_adv_addr
   vrrp_strict
   vrrp_garp_interval 0
   vrrp_gna_interval 0
}

# 检测脚本
vrrp_script chk_http_port {

 	script "/usr/local/src/nginx_check.sh"
	#（检测脚本执行的间隔）
 	interval 2 
	# 权重
 	weight 2
} 

# 虚拟 IP 配置
vrrp_instance VI_1 {

	# 备份服务器上将 MASTER 改为 BACKUP 
    state MASTER
	# 访问的网卡
    interface eth0
	# 主、备机的 virtual_router_id 必须相同
    virtual_router_id 51
	# 主、备机取不同的优先级，主机值较大，备份机值较小
    priority 100
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
	# VRRP H 虚拟地址 
    virtual_ipaddress {
    	# 主服务器, 备服务器, 虚拟地址需要在一个网段里面
        192.168.200.16
    }
}

```

>   添加脚本

检测脚本添加位置 `/usr/local/src`

```sh
#!/bin/bash
A=`ps -C nginx –no-header |wc -l`
if [ $A -eq 0 ];then
    /usr/local/nginx/sbin/nginx
    sleep 2
    if [ `ps -C nginx --no-header |wc -l` -eq 0 ];then
        killall keepalived
    fi
fi
```

>   启动 nginx 和 keepalived

启动 keepalived

```shell
systemctl start keepalived.service
ps -ef|grep keepalived
```

启动 nginx

```shell
/usr/local/nginx/sbin/nginx
```



>   测试

因服务器不在一个网段, 无法测试



## Nginx 原理



### master & worker

![image-20220114075215939](/assets/imgs/Nginx.assets/image-20220114075215939.png)



>   worke 工作机制

![image-20220114075230431](/assets/imgs/Nginx.assets/image-20220114075230431.png)



>   master-workers 的机制的好处

-   可以使用 nginx –s reload 热部署，利用 nginx 进行热部署操作
-   每个 woker 是独立的进程，如果有其中的一个 woker 出现问题，其他 woker 独立的， 继续进行争抢，实现请求过程，不会造成服务中断



### 设置多少个 woker 合适

worker 数和服务器的 cpu 数相等是最为适宜的



>   设置 worker 数量

```shell
worker_processes 4
#work 绑定 cpu(4 work 绑定 4cpu)。
worker_cpu_affinity 0001 0010 0100 1000
#work 绑定 cpu (4 work 绑定 8cpu 中的 4 个) 。
worker_cpu_affinity 0000001 00000010 00000100 00001000
```



>   连接数 worker_connection



问 : 发送请求，占用了 woker 的几个连接数？

答 : 2 或者 4 个



问 : nginx 有一个 master，有四个 woker，每个 woker 支持最大的连接数 1024，支持的 最大并发数是多少？

答 : 普通的静态访问最大并发数是： worker_connections  *  worker_processes  / 2，而如果是 HTTP 作 为反向代理来说，最大并发数量应该是 worker_connections  *  worker_processes / 4。



### nginx.conf 结构

![image-20220114075712088](/assets/imgs/Nginx.assets/image-20220114075712088.png)

