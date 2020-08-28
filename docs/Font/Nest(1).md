---
title: Nest基本概念
date: 2020-08-12
tags: 
- API
- 服务端
categories:
- 后端
---

### 基本目录结构

1. Controller()
    控制器：@Controller() 装饰器中使用路径前缀可以使我们轻松地对一组相关的路由进行分组，并最大程度地减少重复代码。例如，我们可以选择对一组路由进行分组
  
```javascript
    import { Controller, Get } from '@nestjs/common';

    @Controller('cats')
    export class CatsController {
      @Get('123')
      findAll(): string {
        return 'This action returns all cats';
      }
    }
  ```

* findAll()方法之前的 @Get() HTTP 请求方法装饰器告诉 Nest 为HTTP请求的特定端点创建处理程序。端点对应于 HTTP 请求方法（在本例中为 GET）和路由

* 当你请求/cat/123才会返回Hello word

* @Controller('cats')定义了请求类别，例如这是一个cat类，/cat/get,/cat/post,/cat/delete,cat/update

#### 状态码

如前面所说，默认情况下，响应的状态码总是200，除了 POST 请求外，此时它是201，我们可以通过在处理程序层添加@HttpCode（...） 装饰器来轻松更改此行为。

```javascript
    @Post()
    @HttpCode(204)

    create() {
  
    return 'This action adds a new cat';
  
    }

```

#### Headers

自定义Headers

#### Redirect

重定向装饰器

#### 路由参数

```javascript
    @Get(':id')
    findOne(@Param() params): string {
      console.log(params.id);
      return `This action returns a #${params.id} cat`;
    }
```

#### Async / await

```javascript
    @Get()
    async findAll(): Promise<any[]> {
      return [];
    }
```

#### 处理错误

```javascript
     import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
     import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';
     @Controller('cats')
     export class CatsController {
       @Post()
       create(@Body() createCatDto: CreateCatDto) {
         return 'This action adds a new cat';
       }
       @Get()
       findAll(@Query() query: ListAllEntities) {
         return `This action returns all cats (limit: ${query.limit} items)`;
       }
       @Get(':id')
       findOne(@Param('id') id: string) {
         return `This action returns a #${id} cat`;
       }
       @Put(':id')
       update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
         return `This action updates a #${id} cat`;
       }
       @Delete(':id')
       remove(@Param('id') id: string) {
         return `This action removes a #${id} cat`;
       }
     }
```

#### 提供者Providers

* Providers 是 Nest 的一个基本概念。许多基本的 Nest 类可能被视为 provider - service,repository, factory, helper 等等。 他们都可以通过 constructor 注入依赖关系。 这意味着对象可以彼此创建各种关系，并且“连接”对象实例的功能在很大程度上可以委托给 Nest运行时系统。 Provider 只是一个用 @Injectable() 装饰器注释的类。
* 控制器处理Http请求，并将复杂的任务委托给providers

#### 模块化Module

* 模块是具有 @Module() 装饰器的类。 @Module() 装饰器提供了元数据，Nest 用它来组织应用程序结构。模块里面接受控制器和提供者

```javascript
    import { Module } from '@nestjs/common';
    import { CatsController } from './cats.controller';
    import { CatsService } from './cats.service';
        @Module({
          controllers: [CatsController],
          providers: [CatsService],
        })
        export class CatsModule {}
```

#### 使用方法

模块注册在app.module.ts的import中导入

#### 参数接受方法

* 动态路由请求路径为/user/1,此时id为1

```javascript
@Get(':id')

function(@Param() params):string{
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}

```

* Post方法

定义一个传递的body的类型

```javascript
export class CreateCatDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}

@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```

#### 全部例子

```javascript
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
```

#### 错误处理

```javascript
@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```
