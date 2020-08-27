---
title: Mongodb和Mongoose的使用
date: 2020-02-02
tags:
- mongodb
- 数据库
categories:
- 数据库
---

#### Mongodb

    1. 是一个文档型数据库，在 sql 中，我们的数据层级是：数据库（db） -> 表（table） -> 记录（record）-> 字段；在 mongodb 中，数据的层级是：数据库 -> collection -> document -> 字段。
    2. 文档型数据库可以储存bson，bson是json的扩展，可以储存二进制数据

#### 安装

    * 从官网下载安装，安装后再安装目录有一个mongod.bin文件，点击运行就可以了。
    * 可以下载mongodb可视化工具，有网页版的mongodbadmin和桌面应用工具，在这里推荐使用桌面工具Robo3T

#### 在Node中连接mongodb

* mongoose是一个对象关系映射并且集成了promise的链式调用，避免了回调地狱
* 下载mongoose

```shell
npm install mongoose
```

```javascript
//使用moogoose
let mongoose = require('mongoose')
mongoose.connect('mongodb的服务地址')
//建立检验模型
let From = moogoose.moneyModel('From',{
    name:String,
    age:Number,
})
let use1 = new From({name:'ss',age:18})
use1.save().then() 保存数据和查看保存成功后结果
//Schema 就是一种检验规则 返回一个promise进行链式操作
 ```

```javascript
//使用方法
let Schema = mongoose.Schema
let Animal = new Schema({
title:String,
body:String,
})
let cat = mongoose.moneyModel('cat',Animal)
//此时的cat就是你的collection 就是存全部数据的容器
module.exports = cat //导出猫数据的模型
cat.find()//cat就可以去进行数据的增删查改
//添加检验规则，不符合规则的无法存入数据库中
//在node中使用moudle.exports = 命名导出 和 rquire('')引入
```
