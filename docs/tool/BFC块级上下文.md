---
title: BFC块级上下文和清除浮动
---
#### BFC块级上下文
* 块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视化CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

### 创建块格式化上下文
   * 根元素<html>
   * 浮动元素(float不能为none)
   * 绝对定位元素(position:absolute fixed)
   * 行内块元素(元素的display:inline-block)
   * 表单格元素(display:table-cell)
   * 表格标题(display:table-caption)
   * overflow:不为 visible
   * display:flow-root
   * contain:layout,content,paint
   * display:flex
#### 例子1 解决浮动元素和周围内容
```html
<div class="box">
<div class="float">浮动盒子</div>
<p>我在容器内</p> 
</div>
```
```css
.box{

background: #ffcebb;
border:5px solid black;
overflow: hidden;
}
```
#### 此时因为浮动元素的原因，float内容块会超出box的盒子，浮动内容和周围内容不等高的
* 将这个box元素变成一个BFC，即可解决浮动元素和周围元素等高,overflow:hidden

#### 例子2 解决margin合并问题,两个内容划清界限
```html
<div class="blue"></div>
<div class="red"></div>
```
```css
.blue{
    width:100px;
    min-height: 600px;
    border:3px solid red;
    float: left;
    margin-right: 20px;
    }
    .red{
        min-height: 600px;
        border:5px solid green;
        display: flow-root;
    }
```

#### display:flow-root它可以创建无副作用的BFC。在父级块中使用 display: flow-root 可以创建新的BFC。

#### 清除浮动  :hot:  :smile:
   * 在浮动元素的父元素添加这个类
   ```css
   .clearfix:after{
    content:'';
    display:block;
    clear:both
    }
   ```