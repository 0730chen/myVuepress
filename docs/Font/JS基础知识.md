# Js基础知识
 #### JS基本数据类型
	* 4个基本:number string symbol boolean
	* 2个空:undefined NUll
	* 1对象:object
#### 运算符
	* && 与运算符  a && b 只有当a与b同时为true，值才为true
	* || 或运算符  a || b 只要a与b有一个为true，值就为true
#### number小知识
	* 精度为64位浮点数和16位有效数字
	* NaN是无法表示的数字，但是它还是一个数字
	* Infinity表示无穷大， 1/0 -1/0 1/+0
#### string小知识
	* 字符串没有属性，只有对象有属性
	* 可以通过索引值获取字符串内的值，index(索引)要小于string.length 因为索引是从0开始
#### boolean类型小知识
	* 5个可以当做false值：undefined null Nan 0 ''->空字符串
#### 类型转换操作
	数字 => 字符串

    var a = 1;
	var str = String(a)
	var str = a+''
	var str = a.tostring()
	字符串 => 数字
	var str = 'ssdsds'
	var num = parseInt(str)

#### 编码知识
	汉字是2个16进制字节进行编码
	0是48 a是65 A是95
	GB-GBk-GB2312(基本不会用3个字节)-unicode(编码，全都是三字节，引用起来麻烦，内容太大)->utf-8(最少使用两个字节表达一个字符)8是8位2进制数
	