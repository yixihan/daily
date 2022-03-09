(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{592:function(s,a,t){"use strict";t.r(a);var e=t(13),n=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"rabbitmq-单机环境搭建"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#rabbitmq-单机环境搭建"}},[s._v("#")]),s._v(" RabbitMQ 单机环境搭建")]),s._v(" "),t("h2",{attrs:{id:"rabbitmq-安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#rabbitmq-安装"}},[s._v("#")]),s._v(" RabbitMQ 安装")]),s._v(" "),t("blockquote",[t("p",[s._v("下载 RabbitMQ 安装包")])]),s._v(" "),t("p",[t("a",{attrs:{href:"https://github.com/rabbitmq/rabbitmq-server/releases",target:"_blank",rel:"noopener noreferrer"}},[s._v("下载地址"),t("OutboundLink")],1)]),s._v(" "),t("blockquote",[t("p",[s._v("下载 erlang 安装包")])]),s._v(" "),t("p",[t("a",{attrs:{href:"https://github.com/rabbitmq/erlang-rpm/releases/",target:"_blank",rel:"noopener noreferrer"}},[s._v("下载地址"),t("OutboundLink")],1)]),s._v(" "),t("blockquote",[t("p",[s._v("安装")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rpm")]),s._v(" -ivh erlang-23.3.4.10-1.el7.x86_64.rpm\nyum "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" socat -y\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rpm")]),s._v(" -ivh rabbitmq-server-3.9.12-1.el7.noarch.rpm\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h2",{attrs:{id:"rabbitmq-常用命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#rabbitmq-常用命令"}},[s._v("#")]),s._v(" RabbitMQ 常用命令")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 添加开机启动 RabbitMQ 服务")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chkconfig")]),s._v(" rabbitmq-server on\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 启动服务")]),s._v("\n/sbin/service rabbitmq-server start\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 重启服务")]),s._v("\n/sbin/service rabbitmq-server restart\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看服务状态")]),s._v("\n/sbin/service rabbitmq-server status\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#停止服务(选择执行)")]),s._v("\n/sbin/service rabbitmq-server stop\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 开启 web 管理插件")]),s._v("\nrabbitmq-plugins "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v(" rabbitmq_management\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看防火墙端口列表")]),s._v("\nfirewall-cmd --permanent --list-port\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br")])]),t("blockquote",[t("p",[s._v("查看服务状态")])]),s._v(" "),t("p",[t("img",{attrs:{src:"/assets/imgs/RabbitMQ1.assets/image-20220114092620869.png",alt:"image-20220114092620869"}})]),s._v(" "),t("h2",{attrs:{id:"开启-web-管理插件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#开启-web-管理插件"}},[s._v("#")]),s._v(" 开启 web 管理插件")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 开启 web 管理插件")]),s._v("\nrabbitmq-plugins "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v(" rabbitmq_management\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 防火墙开启端口")]),s._v("\nfirewall-cmd --add-port"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("15672")]),s._v("/tcp --permanent\nfirewall-cmd --reload\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 添加账户")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 创建账号")]),s._v("\nrabbitmqctl add_user admin "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("123")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 设置用户角色")]),s._v("\nrabbitmqctl set_user_tags admin administrator\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 设置用户权限")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 格式 set_permissions [-p <vhostpath>] <user> <conf> <write> <read>")]),s._v("\nrabbitmqctl set_permissions -p "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/"')]),s._v(" admin "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('".*"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('".*"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('".*"')]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 列出当前所有的用户")]),s._v("\nrabbitmqctl list_users\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br")])]),t("blockquote",[t("p",[s._v("登录")])]),s._v(" "),t("p",[t("img",{attrs:{src:"/assets/imgs/RabbitMQ1.assets/image-20220114093607166.png",alt:"image-20220114093607166"}})]),s._v(" "),t("h3",{attrs:{id:"重置命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#重置命令"}},[s._v("#")]),s._v(" 重置命令")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 关闭应用的命令")]),s._v("\nrabbitmqctl stop_app\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 清除的命令")]),s._v("\nrabbitmqctl reset\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 重新启动命令")]),s._v("\nrabbitmqctl start_app\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("h2",{attrs:{id:"安装延时队列插件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装延时队列插件"}},[s._v("#")]),s._v(" 安装延时队列插件")]),s._v(" "),t("p",[t("a",{attrs:{href:"https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases",target:"_blank",rel:"noopener noreferrer"}},[s._v("插件下载地址"),t("OutboundLink")],1)]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入 RabbitMQ 的安装目录下的 plgins 目录")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /usr/lib/rabbitmq/lib/rabbitmq_server-3.9.12/plugins/\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装插件")]),s._v("\nrabbitmq-plugins "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v(" rabbitmq_delayed_message_exchange\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 重启 RabbitMQ")]),s._v("\nsystemctl restart rabbitmq-server\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("blockquote",[t("p",[s._v("检测插件是否安装成功")])]),s._v(" "),t("p",[t("img",{attrs:{src:"RabbitMQ2.assets/image-20220115101919856.png",alt:"image-20220115101919856"}})])])}),[],!1,null,null,null);a.default=n.exports}}]);