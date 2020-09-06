---
title: Django开发
date: 2020-09-05
---

#### 创建一个Django开发项目

创建一个django项目

```shell script
django-admin startproject mysite
```

```shell
mysite/
    manage.py
    mysite/
        __init__.py
        settings.py
        urls.py
        asgi.py
        wsgi.py
```


#### manage.py文件

这个是django的启动文件，类似于koa2，express的index.js,用来检查一些配置项目

#### __init__.py文件

可以是一个空文件，可以告诉python这是一个软件包

#### setting.py文件
 
该项目的所有配置

#### 创建一个应用

```shell script
python manage.py startapp polls

```

#### 应用视图

```shell
polls/
    __init__.py
    admin.py
    apps.py
    migrations/
        __init__.py
    models.py
    tests.py
    views.py
```

#### urls.py文件

```python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
]
```

* 使用 from import 引入包文件，使用include函数包含文件

#### 将创建的应用引入项目中

需要在setting中进行配置