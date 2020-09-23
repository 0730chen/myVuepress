---
title: go的闭包用法
date: 2020-09-23
tags:
- golang
categories:
- golang
---

#### go中的闭包

闭包是由函数及其相关引用环境组合而成的实体(即：闭包=函数+引用环境)。

在其他函数环境中可以引用另一个环境的变量，这就形成了闭包

```javascript
function a(){
    var i=0;
    function b(){
        console.log(++i);
        document.write("<h1>"+i+"</h1>");
    }
    return b;
}


```

```go

package main

import (
    "fmt"
)

func a() func() int {
    i := 0
    b := func() int {
        i++
        fmt.Println(i)
        return i
    }
    return b
}

func main() {
    c := a()
    c()
    c()
    c()

    a() //不会输出i
}
```