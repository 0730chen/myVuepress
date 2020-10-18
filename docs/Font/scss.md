---
title: Scss的学习使用
date: 2019-11-6
tags:
  - Css
categories:
  - Css
---

#### Sass 和 Scss,Css 他们三者之间的区别

1. Sass 是 Css 的预处理语言
   是一种 css 的开发工具，可以极大便利 Css 的开发
2. Scss 是 Sass 的修改版本，更符合 JS 程序员的认识，更容易理解

   - 语法

   ```SCSS
   //1.创建变量
   //1-1使用$color创建变量，然后可以全局使用，当你修改这个变量的时候，你使用这个变量的位置也会发生改变
   //Scss中变量就相当于一个占位符，在适用时，根据值确认自己的值
   $color:red;
   //使用变量
   h1{
    background:$color;
   }

   //2.选择器嵌套
   //正常选择器使用

   h1{
    background:red;
   }
   h1>div{
    background:blue;
   }
   //此时需要多写一个h1，表明是h1中的div进行样式操作
   //Scss写法嵌套选择
   //使用&:引用父选择器
   h1{
    background:red;
    >div{
     background:blue;
    }
    &：hover{
     background：yellow；
    }
   }
   //直接在内部嵌套选择器进行样式操作
   //3. 运算
   h1{
    width:(1+2)px
   }

    //4. import 导入

    @import 'style.scss'//文件

    //5 继承
     //xtend //只能继承选择器 -->
     .all{
      border:1px solid blue;
     }
     .childern{
      @extend .ll
     }
     //此时chiildren有何.all相同的属性

     //5. 函数定义
     //定义了一个add函数，函数作用是添加border边框
     @mixin add(){
      border:1px solid black;
     }
     .border{
      @include add()//调用这个函数，给标签添加边框属性
     }
     //函数传递参数
     @mixin add($value){
      border:1px solid $value;
     }
     .border{
      @include add(red) //在调用时传入参数进行动态渲染
     }

     //if语句
     p{
      @if 1+1==2{@include add()}
      @if 5<3 {@include add()}
      @if null {@include add()}
     }

     //else if语句
     p{
      @if $value == aa{
       color:blue
      } @else if $value ==bb{
       color:red
      }@else{
       color:black
      }
     }
     //for 循环
     @for $i from 1 through 3{
      .item-#{$i} {widht:2em*$i}
     }
     //生成
     .item-1{
      width:2em;

     }
     .item-2{
      width:4em;

     }
     .item-3{
      width:6em;
     }
     ```

##### scss的选择器

父的选择器，&父选择器标识符，它的作用就相当于一个父选择器的占位符

```scss
.parent{
  color:white
  &-item{
    color:black
  }
}
//就会编译为如下

.parent{
  color:white
  .parent-item{
    color:black
  }
}

```
