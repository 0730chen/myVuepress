---
title: 服务端的nginx使用
---
#### 需要配置nginx.conf文件
```javascript
location / {
index index.html
}
```
#### nginx策略
    * 负载均衡就是域名配置多个服务器，拦截server中的请求响应，将请求转向配置的后端服务器
    * 轮询策略，将所有客户端的请求轮询分配给服务端，但是其中一台出现延迟会影响其他用户
    * 最小连接策略， 将请求优先分配给压力服务小的服务器，平衡每个队列的长度
    * 最快响应时间策略
    * 客户端ip绑定，ip_hash 有效解决了动态网页的session共享问题
#### 常用的nginx命令
    ```shell script
    nginx -c /etc/nginx.conf  按照配置文件启动nginx服务
    nginx -t 检查配置文件是否出错
    nginx -s reload 重启 nginx服务器
    查找进程
    netstat -ltunp 查看端口号是否被占用
    kill -9 端口号 杀死进程
    ```
    nginx location 路径配置。
    lcation /{
    root /root/dist/项目路径
    }
    如果要配置多个路径不能使用root
    location /blog{
    alias 路径名
    }