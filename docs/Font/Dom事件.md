---
title: Dom事件
date: 2019-12-21
tags:
  - html
  - dom
categories:
  - html
---

#### 什么是事件委托

    不直接在目标节点绑定事件，在其祖先元素上绑定事件，根据 e.target,判断

```html
    <div>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
```

```javascript
    //我们在li上绑定点击事件点击响应的li打印出123,不事件委托，需要进行多次DOM操作，分别在li上绑定事件
    window.onload = () => {
      let Ul = document.querySelector("ul");
      let li = document.querySelector("li");
      for (let i = 0; i < li.length; i++) {
        li[i].onclick = () => {
          console.log("123");
        };
      }
    };
    //使用事件委托方式进行操作,打印
    window.onload = () => {
      let ul = document.querySelector("ul");
      ul.onclick = function() {
        console.log("123");
      };
    };
```

当点击1，2，3，4数字时，由于冒泡原理，就会向外传播到ul上，ul上有点击事件，所以会触发打印出123

#### 怎么阻止默认行为

w3c 中，阻止默认事件的方法是 e.preventDefault() 这个 event 是事件的对象 onlick=e=>{}ie 中，使用的 e.returnValue = false例如我们可以取消 a 标签的默认行为 a 标签点击后会跳转到对应页面

```javascript
    window.onload = () => {
      let a = document.querySelector("a");
      a.onclick = (e) => {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          window.event.returnValue = false;
        }
      };
      //或者使用return false 阻止默认行为，但是不会停止冒泡
    };
```

#### 怎么阻止事件冒泡

    在 w3c 中是 e.stopPropagation()
    在 IE 中是 e.cancelBubble = true
    e 都是事件对象 event

```javascript
    //在IE中window.event===true
    window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
 ```
