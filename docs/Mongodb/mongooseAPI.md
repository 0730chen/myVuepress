---
title: mongooseAPI的详情
date: 2020-08-28
tags:
  - API
  - 数据库
categories:
  - 数据库
---

#### Schemas

- 一个 Schema,每个 schema 都会映射到一个 MongoDB collection ，并定义这个 collection 里的文档的构成，

- Schemas 就是一个文档类型结构，定义一个文档数据结构

```javascript
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});
```

如果之后需要添加 Schema 的 key 值则可以使用 Schema.add()

```javascript
var ToySchema = new Schema();
ToySchema.add({ name: "string", color: "string", price: "number" });
```

#### Schema 字段类型

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- Object
- Array

##### Schema 功能

- 定义文档的实例的实例方法,documents 是 Models 的实例。 Document 有很多自带的实例方法， 当然也可以自定义我们自己的方法

- 同样不要在静态方法中使用 ES6 箭头函数会造成 this 指向混乱问题

```javascript
//把一个Schema转换成一个模型
var Blog = mongoose.model("Blog", blogSchema);
// define a schema
var animalSchema = new Schema({ name: String, type: String });

// assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
  return this.model("Animal").find({ type: this.type }, cb);
};
```

#### 配置选项

```javascript
new Schema({}, { options });
```

- autoIndex 自动生成索引{autoIndex:true}

```javascript

//这个操作是关闭
var schema = new Schema({..}, { autoIndex: false });
var Clock = mongoose.model('Clock', schema);
Clock.ensureIndexes(callback);
```

- id,文档默认会生成一个\_id 属性,可以设置{id:false}设置默认不生成\_id 属性

- 时间戳

```javascript
var thingSchema = new Schema({..}, { timestamps: { createdAt: 'created_at' } });
var Thing = mongoose.model('Thing', thingSchema);
var thing = new Thing();
thing.save(); //
```

#### mongodb 索引

- index 布尔值是否创建这个属性索引
- unique 布尔值是否对这个属性创建唯一索引
- sparse 布尔值是否对这个属性创建稀疏索引

#### 模型 Model

模型是从 Schema 构建编译过来的构造函数,其他的实例就代表着可以从数据库保存和读取的文档。从数据库创建和读取文档的所有操作都是通过模型进行的。

```javascript
var schema = new mongoose.Schema({ name: "string", size: "string" });
var Tank = mongoose.model("Tank", schema);
```

##### 文档是模型的实例

```javascript
var Tank = mongoose.model("Tank", yourSchema);

var small = new Tank({ size: "small" });
small.save(function(err) {
  if (err) return handleError(err);
  // saved!
});

// or

Tank.create({ size: "small" }, function(err, small) {
  if (err) return handleError(err);
  // saved!
});
```

#### 查询

```javascript
Tank.find({ size: "small" })
  .where("createdDate")
  .gt(oneYearAgo)
  .exec(callback);
```

#### 删除

```javascript
Tank.remove({ size: "large" }, function(err) {
  if (err) return handleError(err);
  // removed!
});
```

#### 更新

document.update({},{},fn),第一个参数代表要更新的字段的索引，第二哥\$set 代表重新设置该字段的值

```javascript
Tank.update({ _id: id }, { $set: { size: "large" } }, callback);
//会返回更新后的文档
Tank.findByIdAndUpdate(id, { $set: { size: "large" } }, { new: true }, function(
  err,
  tank
) {
  if (err) return handleError(err);
  res.send(tank);
});

mongoose.set("useFindAndModify", false);
//第一个参数是查询的参数，第二个$set代表设置其中的值，第三个参数代表返回更新后的文档
model.findOneAndUpdate(
  { name: params.name },
  { $set: { tags: params.tags } },
  { new: true }
);
```

#### 子文档

子文档是指嵌套在另一个文档中的文档。 在 Mongoose 中，这意味着你可以在里嵌套另一个 schema。 Mongoose 子文档有两种不同的概念：子文档数组和单个嵌套子文档。

#### API

- findOne()返回单个列表
- find() 是返回文档列表
- count() 是文档数量
- update() 是文档修改数量
