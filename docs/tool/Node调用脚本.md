---
title: Node调用脚本
---

### Node如何在程序中调用脚本

#### child_process

* [官方文档](http://nodejs.cn/api/child_process.html)

* 该child_process模块创建了我们主要的Node.js进程的新子进程。我们可以使用这些子进程执行shell命令。此功能主要由 child_process.spawn() 函数提供：

* 默认情况下， stdin、 stdout 和 stderr 的管道会在父 Node.js 进程和衍生的子进程之间建立。 这些管道具有有限的（且平台特定的）容量。 如果子进程写入 stdout 时超出该限制且没有捕获输出，则子进程会阻塞并等待管道缓冲区接受更多的数据。 这与 shell 中的管道的行为相同。 如果不消费输出，则使用 { stdio: 'ignore' } 选项。

* 如果传入 options 对象，则会使用 options.env.PATH 环境变量来执行命令查找，否则会使用 process.env.PATH。 考虑到 Windows 的环境变量不区分大小写，Node.js 会按字典顺序对所有 env 的键进行排序，并且不区分大小写地选择第一个匹配的 PATH 来执行命令查找。 当传给 env 选项的对象具有多个 PATH 变量时，在 Windows 上可能会出现问题。

* child_process.spawn()、child_process.fork()、child_process.exec() 和 child_process.execFile() 方法都遵循其他 Node.js API 惯用的异步编程模式

```javascript
//引入模块
const { exec } = require('child_process');

const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});
```

* 例子二

```javascript
const { exec, spawn } = require('child_process');
exec('my.bat', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});

// 文件名中包含空格的脚本：
const bat = spawn('"my script.cmd"', ['a', 'b'], { shell: true });
// 或：
exec('"my script.cmd" a b', (err, stdout, stderr) => {
  // ...
});

```

#### exec函数

child_process.exec(command[, options][, callback])

! 文件路径要按照当前脚本的执行路径填写

* command 表示要执行的命令

```javascript
const { exec } = require('child_process');
exec('cat *.js 文件 | wc -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行的错误: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
```





#### execFile

child_process.execFile(file[, args][, options][, callback])


* file <string> 要运行的可执行文件的名称或路径。

```javascript
const { execFile } = require('child_process');
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
```

可以返回Promise版本

```javascript

const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
async function getVersion() {
  const { stdout } = await execFile('node', ['--version']);
  console.log(stdout);
}
getVersion();

```


#### spawn

child_process.spawn(command[, args][, options])

```javascript
const { spawn } = require('child_process');
const ps = spawn('ps', ['ax']);
const grep = spawn('grep', ['ssh']);

ps.stdout.on('data', (data) => {
  grep.stdin.write(data);
});

ps.stderr.on('data', (data) => {
  console.error(`ps 的 stderr: ${data}`);
});

ps.on('close', (code) => {
  if (code !== 0) {
    console.log(`ps 进程退出，退出码 ${code}`);
  }
  grep.stdin.end();
});

grep.stdout.on('data', (data) => {
  console.log(data.toString());
});

grep.stderr.on('data', (data) => {
  console.error(`grep 的 stderr: ${data}`);
});

grep.on('close', (code) => {
  if (code !== 0) {
    console.log(`grep 进程退出，退出码 ${code}`);
  }
});
```

其他API可以查看官方文档

#### execa插件使用

一个npm提供执行脚本的插件
[文档地址](https://www.npmjs.com/package/execa)

```shell
npm install execa
```

* 简单使用

```javascript
const execa = require('execa');
 
(async () => {
    const {stdout} = await execa('echo', ['unicorns']);
    console.log(stdout);
    //=> 'unicorns'
})();
```