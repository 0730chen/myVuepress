---
title: Shell脚本基础语法
---

#### Shell脚本语法

* 声明变量
  
```shell
time = 10

echo $(name)
```

* 删除变量 

```shell
unset name
```

* 声明数组

```shell
array_name = (1,2,3,4)
```

* 传递参数

我们可以在执行 Shell 脚本时，向脚本传递参数，脚本内获取参数的格式为：$n。n 代表一个数字，1 为执行脚本的第一个参数，2 为执行脚本的第二个参数，以此类推……

```shell
sh deoly.sh happy  sad 
# 可以使用 $0来获取第一个参数 happy，$2获取第二个参数 sad

```

* 条件语句
if[]....then 表达式

| 运算符  | 含义  |
|---|---|----|
|！|非运算符，表达式为true，则返回false，否则返回true|
| -o| 或运算符，表达式返回true，则返回true|
|-a| 与运算符,表达式返回true，才返回true|

#### 流程控制

和Java、PHP等语言不一样，sh的流程控制不可为空，如果else分支没有语句执行，就不要写这个else。

* if else fi语句

```shell

if condition
then
    command1  
    command2
    ...
    commandN  
fi
```

* if else

```shell
if condition
then
    command1  
    command2
    ...
    commandN
else
    command
fi

```

* if else-if else

```shell
if condition1
then
    command1
elif condition2 
then 
    command2
else
    commandN
fi

``
