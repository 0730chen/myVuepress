---
title: Docker的基本命令
---

#### Docker是我们常用的部署工具
Docker 是属于Linux容器的一种封装，提供简单易用的容器使用接口。是目前最流行的部署方案

#### Docker的用途

* 提供一次性的环境
* 提供弹性的云服务
* 组建微服务架构


#### Docker安装

[ubuntu] (https://docs.docker.com/engine/install/ubuntu/)
```shell script
#验证是否安装成功
docker version 
```
* 给docker设置权限
```shell script
sudo usermod -aG docker $USER
```

* docker服务的启动命令
```shell script
sudo service docker start

sudo systemctl start docker

#指定启动的端口映射
#-d代表让容器在后台运行 
#-p 支持的格式有 hostPort:containerPort、ip:hostPort:containerPort、 ip::containerPort。
sudo docker run -d -p 5000:5000 containername

```

#### image

Docker 把应用程序及其依赖，打包在 image 文件里面。只有通过这个文件，才能生成 Docker 容器。image 文件可以看作是容器的模板。Docker 根据 image 文件生成容器的实例。同一个 image 文件，可以生成多个同时运行的容器实例。

image 是二进制文件。实际开发中，一个 image 文件往往通过继承另一个 image 文件，加上一些个性化设置而生成。举例来说，你可以在 Ubuntu 的 image 基础上，往里面加入 Apache 服务器，形成你的 image。

```shell script
# 列出本机的所有 image 文件。-l列出最后一个部署的详细信息
docker image ls

# 删除 image 文件
docker image rm [imageName]

```

image 文件是通用的，一台机器的 image 文件拷贝到另一台机器，照样可以使用。一般来说，为了节省时间，我们应该尽量使用别人制作好的 image 文件，而不是自己制作。即使要定制，也应该基于别人的 image 文件进行加工，而不是从零开始制作。

docker也有自己的dockerHub,可以寻找自己想要的下载使用

#### DockerFile文件

学会使用 image 文件以后，接下来的问题就是，如何可以生成 image 文件？如果你要推广自己的软件，势必要自己制作 image 文件。

这就需要用到 Dockerfile 文件。它是一个文本文件，用来配置 image。Docker 根据 该文件生成二进制的 image 文件。

下面通过一个实例，演示如何编写 Dockerfile 文件。

#### 创建一个dockerFile文件

```shell script
FROM node:8.4
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3000
```

* FROM node:8.4 该 image 文件继承官方的 node image，冒号表示标签，这里标签是8.4，即8.4版本的 node。
* COPY . /app：将当前目录下的所有文件（除了.dockerignore排除的路径），都拷贝进入 image 文件的/app目录。
* WORKDIR /app：指定接下来的工作路径为/app。
* RUN npm install：在/app目录下，运行npm install命令安装依赖。注意，安装后所有的依赖，都将打包进入 image 文件。
* EXPOSE 3000：将容器 3000 端口暴露出来， 允许外部连接这个端口。

#### 构建image
```shell script
#构建项目名 -t指定image名  tag就是容器标签名
docker image build -tag name
docker build -t nginx-centos:6.7 .

#t参数是image标签，, 代表是从当前目录寻找Dockerfile文件

# 从git仓库中构建
docker build https://github.com/docker/rootfs.git#container:docker

```

#### 生成容器参数
docker run [option] <镜像名> [向启动容器中传入的命令]
```shell script
docker container run -p 8000:3000 -it koa-demo /bin/bash

docker container run -p 8000:3000 -it koa-demo:0.0.1 /bin/bash
```

* -p参数：容器的 3000 端口映射到本机的 8000 端口。
* -it参数：容器的 Shell 映射到当前的 Shell，然后你在本机窗口输入的命令，就会传入容器。
* koa-demo:0.0.1：image 文件的名字（如果有标签，还需要提供标签，默认是 latest 标签）。
* /bin/bash：容器启动以后，内部第一个执行的命令。这里是启动 Bash，保证用户可以使用 Shell。


#### 停止容器运行

```shell script
docker container ls

docker container stop option

docker container kill [containerID]
# 查出容器的 ID
docker container ls --all
#删除指定的容器文件
 docker container rm [containerID]

```
#### 一些有用的命令

* docker container start [containerID] 开始容器
* docker container stop 终止容器运行
* docker container logs or docker container logs -it 就要用这个命令查看输出。
* docker container exec命令用于进入一个正在运行的 docker 容器。如果docker run命令运行容器的时候，没有使用-it参数，就要用这个命令进入容器。一旦进入了容器，就可以在容器的 Shell 执行命令了。
* docker container cp命令用于从正在运行的 Docker 容器里面，将文件拷贝到本机。下面是拷贝到当前目录的写法。

* docker logs -f containerid 查询容器打印的log
* docker ps -a 列出所有的容器
* docker image inspect --format='{{.RepoTags}} {{.Id}} {{.Parent}}' $(docker image ls -q --filter since=xxxx） 查询相关容器
* docker container rm ID或者tag名 删除容器
  
