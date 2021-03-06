---
title: 活动页布局
date: 2019-03-11 21:22:48
tags: 
- css 
- 布局

---

### 活动页面的原理

  主要使用overflow：hidden隐藏超出的页面，给整个页面在一个div标签中，div赋值设置top（向下翻页）或者left（向右翻页），每一页都是固定的距离。这样可以在一个html文件中完成多个页面的展示。

### 图片库原理

  使用div标签建立一个大图展示区域，分别使用div建立小图展示区域。给小图定位赋值使用float：left属性，向左浮动，使他们排成一列。简单的页面布置就这样成功了，再加入图片的时候，使用createElement（'img'）方法建立img标签，并建立for循环，使用setattribute（'src', 路径）由于路径是字符串，所以要使用拼接字符串的方式，提前将图片的名称设置为1-5.jpg。

### 实现点击小图更新相应的大图

    给小图区域的父元素绑定一个onclick事件，本来是要给每一个img绑定事件，这里使用了事件冒泡，内部子元素要绑定相同的事件，则可以绑定在他们的父元素上，事件也可以触发，减少代码量。使用getattribute（'src'）方法获取当前点击图片的src路径。，并使用setattribute赋值给大图的src路径，则可以实现点击小图切换到对应大图上。

  实现页面的明暗

3.flex的各项属性
1.display:flex; （定义了一个flex容器）

#### flex-direction（决定主轴的方向）

row（默认值，水平从左到右）colunm（垂直从上到下）row-reverse（水平从右到左）column-reverse（垂直从下到上）

#### flex-wrap（定义如何换行）

* nowrap（默认值，不换行）wrap（换行）wrap-reverse（换行，且颠倒行顺序，第一行在下方）

* flex-flow（属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为row nowrap）

* justify-content（设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式）

* flex-start（ 默认值、弹性盒子元素将向行起始位置对齐） flex-end（弹性盒子元素将向行结束位置对齐）
* center（弹性盒子元素将向行中间位置对齐。该行的子元素将相互对齐并在行中居中齐） ** space-between（弹性盒子元素会平均地分布在行里）
* space-around（弹性盒子元素会平均地分布在行里，两端保留子元素与子元素之间间距大小的一半）

6.align-items（设置或检索弹性盒子元素在侧轴（纵轴）方向上的对齐方式）

      flex-start（弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界）
      flex-end（弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界）
      center（ 弹性盒子元素在该行的侧轴（纵轴）上居中放置。（如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度））
      baseline（如弹性盒子元素的行内轴与侧轴为同一条，则该值与flex-start等效。其它情况下，该值将参与基线对齐。）
      stretch（如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制）

7.align-content（设置或检索弹性盒堆叠伸缩行的对齐方式）

      flex-start（各行向弹性盒容器的起始位置堆叠。弹性盒容器中第一行的侧轴起始边界紧靠住该弹性盒容器的侧轴起始边界，之后的每一行都紧靠住前面一行）
      flex-end（各行向弹性盒容器的结束位置堆叠。弹性盒容器中最后一行的侧轴起结束界紧靠住该弹性盒容器的侧轴结束边界，之后的每一行都紧靠住前面一行）
      center（各行向弹性盒容器的中间位置堆叠。各行两两紧靠住同时在弹性盒容器中居中对齐，保持弹性盒容器的侧轴起始内容边界和第一行之间的距离与该容器的侧轴结束内容边界与第最后一      行之间的距离相等）
      space-between（各行在弹性盒容器中平均分布。第一行的侧轴起始边界紧靠住弹性盒容器的侧轴起始内容边界，最后一行的侧轴结束边界紧靠住弹性盒容器的侧轴结束内容边界，剩余的行则      按一定方式在弹性盒窗口中排列，以保持两两之间的空间相等）
      space-around（ 各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半。各行会按一定方式在弹性盒容器中排列，以保持两两之间的空间相等，同时第一行前面及最后      一行后面的空间是其他空间的一半）
      stretch（各行将会伸展以占用剩余的空间。剩余空间被所有行平分，以扩大它们的侧轴尺寸）

二. 子元素上属性

* order（默认情况下flex order会按照书写顺训呈现，可以通过order属性改变，数值小的在前面，还可以是负数）
* flex-grow（设置或检索弹性盒的扩展比率, 根据弹性盒子元素所设置的扩展因子作为比率来分配剩余空间）
* flex-shrink（设置或检索弹性盒的收缩比率, 根据弹性盒子元素所设置的收缩因子作为比率来收缩空间）
* flex-basis (设置或检索弹性盒伸缩基准值，如果所有子元素的基准值之和大于剩余空间，则会根据每项设置的基准值，按比率伸缩剩余空间)
* flex   (flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选)
* align-self  (设置或检索弹性盒子元素在侧轴（纵轴）方向上的对齐方式，可以覆盖父容器align-items的设置)
