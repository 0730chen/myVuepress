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

在闭包中闭包复制的是原对象指针，这就很容易解释延迟引用现象

```go
package main

import "fmt"

func test() func() {
    x := 100
    fmt.Printf("x (%p) = %d\n", &x, x)

    return func() {
        fmt.Printf("x (%p) = %d\n", &x, x)
    }
}

func main() {
    f := test()
    f()
}

```

#### 外部引用函数参数局部变量

```go
package main

import "fmt"

// 外部引用函数参数局部变量
func add(base int) func(int) int {
    return func(i int) int {
        base += i
        return base
    }
}

func main() {
    tmp1 := add(10)
    fmt.Println(tmp1(1), tmp1(2))
    // 此时tmp1和tmp2不是一个实体了
    tmp2 := add(100)
    fmt.Println(tmp2(1), tmp2(2))
}
```

#### go的递归

递归，就是在运行的过程中调用自己。 一个函数调用自己，就叫做递归函数。

* 必须要有结束条件

数字阶乘

```go
package main

import "fmt"

func factorial(i int) int {
    if i <= 1 {
        return 1
    }
    return i * factorial(i-1)
}

func main() {
    var i int = 7
    fmt.Printf("Factorial of %d is %d\n", i, factorial(i))
}
```

斐波那契数列

```go
package main

import "fmt"

func fibonaci(i int) int {
    if i == 0 {
        return 0
    }
    if i == 1 {
        return 1
    }
    return fibonaci(i-1) + fibonaci(i-2)
}

func main() {
    var i int
    for i = 0; i < 10; i++ {
        fmt.Printf("%d\n", fibonaci(i))
    }
}
```
