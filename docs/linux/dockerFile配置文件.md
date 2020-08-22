---
title: 如何使用Dockefile生成镜像文件
---

#### DockerFile

DockerFile是构建docker图像的基本配置文件，主要作用就是描述图像的构成文件

官方的例子
```javascript
FROM php:5.6-apache
RUN a2enmod rewrite
# install the PHP extensions we need
RUN apt-get update && apt-get install -y libpng12-dev libjpeg-dev && rm -rf /var/lib/apt/lists/* \
  && docker-php-ext-configure gd --with-png-dir=/usr --with-jpeg-dir=/usr \
  && docker-php-ext-install gd RUN docker-php-ext-install mysqli
VOLUME /var/www/html

ENV WORDPRESS_VERSION 4.2.2
ENV WORDPRESS_UPSTREAM_VERSION 4.2.2
ENV WORDPRESS_SHA1 d3a70d0f116e6afea5b850f793a81a97d2115039
# upstream tarballs include ./wordpress/ so this gives us /usr/src/wordpress

RUN curl -o wordpress.tar.gz -SL https://wordpress.org/wordpress-${WORDPRESS_UPSTREAM_VERSION}.tar.gz \
  && echo "$WORDPRESS_SHA1 *wordpress.tar.gz" | sha1sum -c - \
  && tar -xzf wordpress.tar.gz -C /usr/src/ \
  && rm wordpress.tar.gz \
  && chown -R www-data:www-data /usr/src/wordpress


COPY docker-entrypoint.sh /entrypoint.sh
# grr, ENTRYPOINT resets CMD now
ENTRYPOINT ["/entrypoint.sh"]
CMD ["apache2-foreground"]

```

它分为4个参数设置

* FORM
* COPY
* WORKDIR
* RUN
* EXPOSE
* CMD

#### FORM

FORM参数，配置当前环境的来源

例如 FROM node:8.4：该 image 文件继承官方的 node image，冒号表示标签，这里标签是8.4，即8.4版本的 node。
FORM可以配置多个环境

#### COPY

```docker
COPY docker-entrypoint.sh /entrypoint.sh
```


它可以将文件（与Dockerfile位于同一目录中）复制到容器中。

#### WORKDIR

设置当前的工作目录，默认工作目录是当前目录

#### RUN 

相当于shell，可以执行一些脚本命令，

```javascript
RUN git config http.postBuffer 524288000 \
    && git config --global http.lowSpeedLimit 0 \
    && git config --global http.lowSpeedTime 999999\；

RUN && git init\
    && npm install
```

* 使用&&多端构建
* 多阶段构建使您可以大幅度减小最终图像的大小，而不必努力减少中间层和文件的数量。

* 由于映像是在生成过程的最后阶段生成的，因此可以利用生成缓存来最小化映像层。

#### EXPORS

将容器 3000 端口暴露出来， 允许外部连接这个端口。

#### CMD 

运行命令行命令 CMD['node','app.js']