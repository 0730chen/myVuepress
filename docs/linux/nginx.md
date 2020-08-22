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
    nginx location 路径配置。
    lcation /{
    root /root/dist/项目路径
    }
    如果要配置多个路径不能使用root
    location /blog{
    alias 路径名
    }
  ```


#### 接口路径配置
```text
location /music/ {
proxy_pass 接口地址
}
```
#### 跨越请求头设置
```text
if ($request_method = 'OPTIONS') {
add_header 'Access-Control-Allow-Origin' '*';
add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
#
# Custom headers and headers various browsers *should* be OK with but aren't
#
add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
#
# Tell client that this pre-flight info is valid for 20 days
#
add_header 'Access-Control-Max-Age' 1728000;
add_header 'Content-Type' 'text/plain charset=UTF-8';
add_header 'Content-Length' 0;
return 204;
}
if ($request_method = 'POST') {
add_header 'Access-Control-Allow-Origin' '*';
add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
add_header 'Access-Control-Expose-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
}
if ($request_method = 'GET') {
add_header 'Access-Control-Allow-Origin' '*';
add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
add_header 'Access-Control-Expose-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
}
```
