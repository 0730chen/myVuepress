---
title: JS函数的执行机制
data: 2019-09-01
tag: Js函数
---

### JS函数的执行机制
 1. setTimeout
 ```javascript
 let i = 0
 for(i;i<6;i++){
	 setTimeout(()=>{
		 console.log(i)
	 },0)
 }
 //打印结果是6，6，6，6，6，6 因为只有一个i
 setTimeout(()=>{})//过一会再去干某事，前面的循环就先循环完。然后setTimeout()打印出i的值
 for(let i =0;i<6;i++){
	 //let i = 0,1,2,3,4,5
	 setTimeout(()=>{
		 console.log(i)
	 })
 }
 //在for循环内部使用let定义i，则可以打印 0，1，2，3，4，5，
 /*let会自己帮我们记录上一次的i 所以可以打印出0-5* 在这次循环中共有7个i/ 
 ```
 2. setTimeout()打印出0-5的方法
```javascript
for(let i = 0;i<6;i++){
	setTimeout(()=>{
		console.log(i)
	})
}
//0,1,2,3,4,5
for(var i = 0;i<6;i++){
	// setTimeout(()=>{
	// 	console.log(i)
	// })
	let x = i
	setTimeout(()=>{
		console.log(x)
	})
}
//0,1,2,3,4,5
//使用一个值保存当前的i,过一会打印出i
for(var i =0;i<6;i++){
	function add(){
		var x = i
		setTimeout(()=>{
			console.log(x)
		})
	}
	add()
}
//0，1，2，3，4，5
//使用闭包，定义一个值保存当前的i的值 
```