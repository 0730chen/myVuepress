---
title: Vue源码中的编译器解析
date: 2022-10-19
---

* 刷新watcher队列，每个watcher执行watcher.run方法，watcher.run调用watcher.get,执行watcher.getter，进入更新阶段

#### 渲染watcher执行updateComponent

```javascript

const updateComponent = ()=>{
    vm._update(vm._render(),hydrating)
}
```

* 每次执行更新前都需要执行一下vm._render(),render函数有两种方式得到
* 用户自己提供，在编写组件时，用render选项代替模板
* 由编译器组件模板生成render选项

#### 编译器核心

* 解析，将类html模板转换成AST对象
* 优化, 静态标记，遍历AST对象，标记每个节点是否为静态节点
* 生成渲染函数，将AST对象生成渲染函数


#### Vue解析器如何将类Html模板字符串转换成AST对象

```javascript
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    __DEV__ &&
      warn(
        `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
      )
    return this
  }
  //获取配置项

  const options = this.$options
  // resolve template/el and convert to render function
  //如果没有定义render函数
  /*
  如果用户提供了render配置
  优先级render>template>el
  */
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
            //是否是一个id选择器，则获取innerHtml作为模板
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (__DEV__ && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (__DEV__) {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
        //如果设置了el，则将其作为模板
      // @ts-expect-error
      template = getOuterHTML(el)
    }
    if (template) {
        //如果模板就绪就开始进行编译阶段
      /* istanbul ignore if */
      if (__DEV__ && config.performance && mark) {
        mark('compile')
      }
      //动态渲染函数和静态渲染函数
      const { render, staticRenderFns } = compileToFunctions(
        template,
        {
          outputSourceRange: __DEV__,
          shouldDecodeNewlines,
          shouldDecodeNewlinesForHref,
          delimiters: options.delimiters,
          comments: options.comments
        },
        this
      )
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (__DEV__ && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  return mount.call(this, el, hydrating)
}
```

#### CompileToFunctions编译模板函数

* 执行编译函数，得到编译结果 -compiled
* 处理编译期间产生的error tip，分别输出到控制台
* 将编译得到的字符串通过new Function方法转换成可执行函数
* 缓存编译结果 

```javascript
export function createCompileToFunctionFn(compile: Function): Function {
    //创建缓存，每次创建编译时创建缓存
  const cache = Object.create(null)
  //返回一个创建函数
  return function compileToFunctions(
    template: string,
    options?: CompilerOptions,
    vm?: Component
  ): CompiledFunctionResult {
    //从配置项中扩展
    options = extend({}, options)
    const warn = options.warn || baseWarn
    delete options.warn

    /* istanbul ignore if */
    if (__DEV__) {
      // detect possible CSP restriction
      try {
        new Function('return 1')
      } catch (e: any) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
                  // 看起来你在一个 CSP 不安全的环境中使用完整版的 Vue.js，模版编译器不能工作在这样的环境中。
        // 考虑放宽策略限制或者预编译你的 template 为 render 函数
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
              'environment with Content Security Policy that prohibits unsafe-eval. ' +
              'The template compiler cannot work in this environment. Consider ' +
              'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
              'templates into render functions.'
          )
        }
      }
    }

    // check cache
    //如果有缓存则跳过编译从缓存中获取上次编译结果
    const key = options.delimiters
      ? String(options.delimiters) + template
      : template
    if (cache[key]) {
      return cache[key]
    }

    // compile，执行编译函数，得到编译结果
    const compiled = compile(template, options)

    // check compilation errors/tips
    //编译期间产生的error和tip分别输出到控制台
    if (__DEV__) {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(e => {
            warn(
              `Error compiling template:\n\n${e.msg}\n\n` +
                generateCodeFrame(template, e.start, e.end),
              vm
            )
          })
        } else {
          warn(
            `Error compiling template:\n\n${template}\n\n` +
              compiled.errors.map(e => `- ${e}`).join('\n') +
              '\n',
            vm
          )
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(e => tip(e.msg, vm))
        } else {
          compiled.tips.forEach(msg => tip(msg, vm))
        }
      }
    }

    // turn code into functions，将转换编译得到的字符串为函数，通过new Function实现
    const res: any = {}
    const fnGenErrors: any[] = []
    res.render = createFunction(compiled.render, fnGenErrors)
    res.staticRenderFns = compiled.staticRenderFns.map(code => {
      return createFunction(code, fnGenErrors)
    })

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    //处理下面代码转换过程中出现的错误，这一部一般不会报错，除非编译器本身出错了
    if (__DEV__) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          `Failed to generate render function:\n\n` +
            fnGenErrors
              .map(
                ({ err, code }) => `${(err as any).toString()} in\n\n${code}\n`
              )
              .join('\n'),
          vm
        )
      }
    }
    //缓存编译结果
    return (cache[key] = res)
  }
}
```

#### compile编译函数

```javascript
/**
 * 编译函数，做了两件事：
 *   1、选项合并，将 options 配置项 合并到 finalOptions(baseOptions) 中，得到最终的编译配置对象
 *   2、调用核心编译器 baseCompile 得到编译结果
 *   3、将编译期间产生的 error 和 tip 挂载到编译结果上，返回编译结果
 *  4. 这个函数是在上面创建编译模板时调用
 * @param {*} template 模版
 * @param {*} options 配置项
 * @returns 
 */
function compile(
  template: string,
  options?: CompilerOptions
): CompiledResult {
  // 以平台特有的编译配置为原型创建编译选项对象
  const finalOptions = Object.create(baseOptions)
  const errors = []
  const tips = []

  // 日志，负责记录将 error 和 tip
  let warn = (msg, range, tip) => {
    (tip ? tips : errors).push(msg)
  }

  // 如果存在编译选项，合并 options 和 baseOptions，存在配置项则合并配置项
  if (options) {
    // 开发环境走
    if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
      // $flow-disable-line
      const leadingSpaceLength = template.match(/^\s*/)[0].length

      // 增强 日志 方法 日志的报错信息
      warn = (msg, range, tip) => {
        const data: WarningMessage = { msg }
        if (range) {
          if (range.start != null) {
            data.start = range.start + leadingSpaceLength
          }
          if (range.end != null) {
            data.end = range.end + leadingSpaceLength
          }
        }
        (tip ? tips : errors).push(data)
      }
    }

    /**
     * 将 options 中的配置项合并到 finalOptions
     */

    // 合并自定义 module
    if (options.modules) {
      finalOptions.modules =
        (baseOptions.modules || []).concat(options.modules)
    }
    // 合并自定义指令
    if (options.directives) {
      finalOptions.directives = extend(
        Object.create(baseOptions.directives || null),
        options.directives
      )
    }
    // 拷贝其它配置项
    for (const key in options) {
      if (key !== 'modules' && key !== 'directives') {
        finalOptions[key] = options[key]
      }
    }
  }

  // 日志
  finalOptions.warn = warn

  // 到这里为止终于到重点了，调用核心编译函数，传递模版字符串和最终的编译选项，得到编译结果
  // 前面做的所有事情都是为了构建平台最终的编译选项
  const compiled = baseCompile(template.trim(), finalOptions)
  if (process.env.NODE_ENV !== 'production') {
    detectErrors(compiled.ast, warn)
  }
  // 将编译期间产生的错误和提示挂载到编译结果上
  compiled.errors = errors
  compiled.tips = tips
  return compiled
}
```

#### baseOptions基础选项合并

```javascript
export const baseOptions: CompilerOptions = {
  expectHTML: true,
  // 处理 class、style、v-model
  modules,
  // 处理指令
  // 是否是 pre 标签
  isPreTag,
  // 是否是自闭合标签
  isUnaryTag,
  // 规定了一些应该使用 props 进行绑定的属性
  mustUseProp,
  // 可以只写开始标签的标签，结束标签浏览器会自动补全
  canBeLeftOpenTag,
  // 是否是保留标签（html + svg）
  isReservedTag,
  // 获取标签的命名空间
  getTagNamespace,
  staticKeys: genStaticKeys(modules)
}
```

#### baseCompile核心编译函数

* 将html解析成ast
* 将ast树进行静态标记
* 将ast生成渲染树
* 静态渲染函数放到code.staticRenderFns数组中,code.render为动态渲染函数，在将来渲染时执行渲染函数得到vnode


```javascript
function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 将模版解析为 AST，每个节点的 ast 对象上都设置了元素的所有信息，比如，标签信息、属性信息、插槽信息、父节点、子节点等。
  // 具体有那些属性，查看 start 和 end 这两个处理开始和结束标签的方法
  const ast = parse(template.trim(), options)
  // 优化，遍历 AST，为每个节点做静态标记
  // 标记每个节点是否为静态节点，然后进一步标记出静态根节点
  // 这样在后续更新中就可以跳过这些静态节点了
  // 标记静态根，用于生成渲染函数阶段，生成静态根节点的渲染函数
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  // 从 AST 生成渲染函数，生成像这样的代码，比如：code.render = "_c('div',{attrs:{"id":"app"}},_l((arr),function(item){return _c('div',{key:item},[_v(_s(item))])}),0)"
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}

```


#### parse解析函数将html解析为ast

```javascript
/**
 * 
 * 将 HTML 字符串转换为 AST
 * @param {*} template HTML 模版
 * @param {*} options 平台特有的编译选项
 * @returns root
 */
export function parse(
  template: string,
  options: CompilerOptions
): ASTElement | void {
  // 日志
  warn = options.warn || baseWarn

  // 是否为 pre 标签
  platformIsPreTag = options.isPreTag || no
  // 必须使用 props 进行绑定的属性
  platformMustUseProp = options.mustUseProp || no
  // 获取标签的命名空间
  platformGetTagNamespace = options.getTagNamespace || no
  // 是否是保留标签（html + svg)
  const isReservedTag = options.isReservedTag || no
  // 判断一个元素是否为一个组件
  maybeComponent = (el: ASTElement) => !!el.component || !isReservedTag(el.tag)

  // 分别获取 options.modules 下的 class、model、style 三个模块中的 transformNode、preTransformNode、postTransformNode 方法
  // 负责处理元素节点上的 class、style、v-model
  transforms = pluckModuleFunction(options.modules, 'transformNode')
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode')
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode')

  // 界定符，比如: {{}}
  delimiters = options.delimiters

  const stack = []
  // 空格选项
  const preserveWhitespace = options.preserveWhitespace !== false
  const whitespaceOption = options.whitespace
  // 根节点，以 root 为根，处理后的节点都会按照层级挂载到 root 下，最后 return 的就是 root，一个 ast 语法树
  let root
  // 当前元素的父元素
  let currentParent
  let inVPre = false
  let inPre = false
  let warned = false
  
  // 解析 html 模版字符串，处理所有标签以及标签上的属性
  // 这里的 parseHTMLOptions 在后面处理过程中用到，再进一步解析
  // 提前解析的话容易让大家岔开思路
  parseHTML(template, parseHtmlOptions)
  
  // 返回生成的 ast 对象
  return root
}
```

#### 在进一步解析Html

```javascript
/**
 * 通过循环遍历 html 模版字符串，依次处理其中的各个标签，以及标签上的属性
 * @param {*} html html 模版
 * @param {*} options 配置项
 */
export function parseHTML(html, options) {
  const stack = []
  const expectHTML = options.expectHTML
  // 是否是自闭合标签
  const isUnaryTag = options.isUnaryTag || no
  // 是否可以只有开始标签
  const canBeLeftOpenTag = options.canBeLeftOpenTag || no
  // 记录当前在原始 html 字符串中的开始位置
  let index = 0
  let last, lastTag
  while (html) {
    last = html
    // 确保不是在 script、style、textarea 这样的纯文本元素中
    if (!lastTag || !isPlainTextElement(lastTag)) {
      // 找第一个 < 字符
      let textEnd = html.indexOf('<')
      // textEnd === 0 说明在开头找到了
      // 分别处理可能找到的注释标签、条件注释标签、Doctype、开始标签、结束标签
      // 每处理完一种情况，就会截断（continue）循环，并且重置 html 字符串，将处理过的标签截掉，下一次循环处理剩余的 html 字符串模版
      if (textEnd === 0) {
        // 处理注释标签 <!-- xx -->
        if (comment.test(html)) {
          // 注释标签的结束索引
          const commentEnd = html.indexOf('-->')

          if (commentEnd >= 0) {
            // 是否应该保留 注释
            if (options.shouldKeepComment) {
              // 得到：注释内容、注释的开始索引、结束索引
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3)
            }
            // 调整 html 和 index 变量
            advance(commentEnd + 3)
            continue
          }
        }

        // 处理条件注释标签：<!--[if IE]>
        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          // 找到结束位置
          const conditionalEnd = html.indexOf(']>')

          if (conditionalEnd >= 0) {
            // 调整 html 和 index 变量
            advance(conditionalEnd + 2)
            continue
          }
        }

        // 处理 Doctype，<!DOCTYPE html>
        const doctypeMatch = html.match(doctype)
        if (doctypeMatch) {
          advance(doctypeMatch[0].length)
          continue
        }

        /**
         * 处理开始标签和结束标签是这整个函数中的核型部分，其它的不用管
         * 这两部分就是在构造 element ast
         */

        // 处理结束标签，比如 </div>
        const endTagMatch = html.match(endTag)
        if (endTagMatch) {
          const curIndex = index
          advance(endTagMatch[0].length)
          // 处理结束标签
          parseEndTag(endTagMatch[1], curIndex, index)
          continue
        }

        // 处理开始标签，比如 <div id="app">，startTagMatch = { tagName: 'div', attrs: [[xx], ...], start: index }
        const startTagMatch = parseStartTag()
        if (startTagMatch) {
          // 进一步处理上一步得到结果，并最后调用 options.start 方法
          // 真正的解析工作都是在这个 start 方法中做的
          handleStartTag(startTagMatch)
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1)
          }
          continue
        }
      }

      let text, rest, next
      if (textEnd >= 0) {
        // 能走到这儿，说明虽然在 html 中匹配到到了 <xx，但是这不属于上述几种情况，
        // 它就只是一个普通的一段文本：<我是文本
        // 于是从 html 中找到下一个 <，直到 <xx 是上述几种情况的标签，则结束，
        // 在这整个过程中一直在调整 textEnd 的值，作为 html 中下一个有效标签的开始位置

        // 截取 html 模版字符串中 textEnd 之后的内容，rest = <xx
        rest = html.slice(textEnd)
        // 这个 while 循环就是处理 <xx 之后的纯文本情况
        // 截取文本内容，并找到有效标签的开始位置（textEnd）
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // 则认为 < 后面的内容为纯文本，然后在这些纯文本中再次找 <
          next = rest.indexOf('<', 1)
          // 如果没找到 <，则直接结束循环
          if (next < 0) break
          // 走到这儿说明在后续的字符串中找到了 <，索引位置为 textEnd
          textEnd += next
          // 截取 html 字符串模版 textEnd 之后的内容赋值给 rest，继续判断之后的字符串是否存在标签
          rest = html.slice(textEnd)
        }
        // 走到这里，说明遍历结束，有两种情况，一种是 < 之后就是一段纯文本，要不就是在后面找到了有效标签，截取文本
        text = html.substring(0, textEnd)
      }

      // 如果 textEnd < 0，说明 html 中就没找到 <，那说明 html 就是一段文本
      if (textEnd < 0) {
        text = html
      }

      // 将文本内容从 html 模版字符串上截取掉
      if (text) {
        advance(text.length)
      }

      // 处理文本
      // 基于文本生成 ast 对象，然后将该 ast 放到它的父元素的肚子里，
      // 即 currentParent.children 数组中
      if (options.chars && text) {
        options.chars(text, index - text.length, index)
      }
    } else {
      // 处理 script、style、textarea 标签的闭合标签
      let endTagLength = 0
      // 开始标签的小写形式
      const stackedTag = lastTag.toLowerCase()
      const reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'))
      // 匹配并处理开始标签和结束标签之间的所有文本，比如 <script>xx</script>
      const rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1')
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1)
        }
        if (options.chars) {
          options.chars(text)
        }
        return ''
      })
      index += html.length - rest.length
      html = rest
      parseEndTag(stackedTag, index - endTagLength, index)
    }

    // 到这里就处理结束，如果 stack 数组中还有内容，则说明有标签没有被闭合，给出提示信息
    if (html === last) {
      options.chars && options.chars(html)
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(`Mal-formatted tag at end of template: "${html}"`, { start: index + html.length })
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag()
}
```

#### advance

```javascript
/**
 * 重置 html，html = 从索引 n 位置开始的向后的所有字符
 * index 为 html 在 原始的 模版字符串 中的的开始索引，也是下一次该处理的字符的开始位置
 * @param {*} n 索引
 */
function advance(n) {
  index += n
  html = html.substring(n)
}

```

#### 开始解析的标签parseStartTag

```javascript
/**
 * 解析开始标签，比如：<div id="app">
 * @returns { tagName: 'div', attrs: [[xx], ...], start: index }
 */
function parseStartTag() {
  const start = html.match(startTagOpen)
  if (start) {
    // 处理结果
    const match = {
      // 标签名
      tagName: start[1],
      // 属性，占位符
      attrs: [],
      // 标签的开始位置
      start: index
    }
    /**
     * 调整 html 和 index，比如：
     *   html = ' id="app">'
     *   index = 此时的索引
     *   start[0] = '<div'
     */
    advance(start[0].length)
    let end, attr
    // 处理 开始标签 内的各个属性，并将这些属性放到 match.attrs 数组中
    while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
      attr.start = index
      advance(attr[0].length)
      attr.end = index
      match.attrs.push(attr)
    }
    // 开始标签的结束，end = '>' 或 end = ' />'
    if (end) {
      match.unarySlash = end[1]
      advance(end[0].length)
      match.end = index
      return match
    }
  }
}
```

#### handleStartTag

```javascript
/**
 * 进一步处理开始标签的解析结果 ——— match 对象
 *  处理属性 match.attrs，如果不是自闭合标签，则将标签信息放到 stack 数组，待将来处理到它的闭合标签时再将其弹出 stack，表示该标签处理完毕，这时标签的所有信息都在 element ast 对象上了
 *  接下来调用 options.start 方法处理标签，并根据标签信息生成 element ast，
 *  以及处理开始标签上的属性和指令，最后将 element ast 放入 stack 数组
 * 
 * @param {*} match { tagName: 'div', attrs: [[xx], ...], start: index }
 */
function handleStartTag(match) {
  const tagName = match.tagName
  // />
  const unarySlash = match.unarySlash

  if (expectHTML) {
    if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
      parseEndTag(lastTag)
    }
    if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
      parseEndTag(tagName)
    }
  }

  // 一元标签，比如 <hr />
  const unary = isUnaryTag(tagName) || !!unarySlash

  // 处理 match.attrs，得到 attrs = [{ name: attrName, value: attrVal, start: xx, end: xx }, ...]
  // 比如 attrs = [{ name: 'id', value: 'app', start: xx, end: xx }, ...]
  const l = match.attrs.length
  const attrs = new Array(l)
  for (let i = 0; i < l; i++) {
    const args = match.attrs[i]
    // 比如：args[3] => 'id'，args[4] => '='，args[5] => 'app'
    const value = args[3] || args[4] || args[5] || ''
    const shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
      ? options.shouldDecodeNewlinesForHref
      : options.shouldDecodeNewlines
    // attrs[i] = { id: 'app' }
    attrs[i] = {
      name: args[1],
      value: decodeAttr(value, shouldDecodeNewlines)
    }
    // 非生产环境，记录属性的开始和结束索引
    if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
      attrs[i].start = args.start + args[0].match(/^\s*/).length
      attrs[i].end = args.end
    }
  }

  // 如果不是自闭合标签，则将标签信息放到 stack 数组中，待将来处理到它的闭合标签时再将其弹出 stack
  // 如果是自闭合标签，则标签信息就没必要进入 stack 了，直接处理众多属性，将他们都设置到 element ast 对象上，就没有处理 结束标签的那一步了，这一步在处理开始标签的过程中就进行了
  if (!unary) {
    // 将标签信息放到 stack 数组中，{ tag, lowerCasedTag, attrs, start, end }
    stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end })
    // 标识当前标签的结束标签为 tagName
    lastTag = tagName
  }

  /**
   * 调用 start 方法，主要做了以下 6 件事情:
   *   1、创建 AST 对象
   *   2、处理存在 v-model 指令的 input 标签，分别处理 input 为 checkbox、radio、其它的情况
   *   3、处理标签上的众多指令，比如 v-pre、v-for、v-if、v-once
   *   4、如果根节点 root 不存在则设置当前元素为根节点
   *   5、如果当前元素为非自闭合标签则将自己 push 到 stack 数组，并记录 currentParent，在接下来处理子元素时用来告诉子元素自己的父节点是谁
   *   6、如果当前元素为自闭合标签，则表示该标签要处理结束了，让自己和父元素产生关系，以及设置自己的子元素
   */
  if (options.start) {
    options.start(tagName, attrs, unary, match.start, match.end)
  }
}
```


#### 处理结束标签parseEndTag


```javascript
/**
 * 解析结束标签，比如：</div>
 * 最主要的事就是：
 *   1、处理 stack 数组，从 stack 数组中找到当前结束标签对应的开始标签，然后调用 options.end 方法
 *   2、处理完结束标签之后调整 stack 数组，保证在正常情况下 stack 数组中的最后一个元素就是下一个结束标签对应的开始标签
 *   3、处理一些异常情况，比如 stack 数组最后一个元素不是当前结束标签对应的开始标签，还有就是
 *      br 和 p 标签单独处理
 * @param {*} tagName 标签名，比如 div
 * @param {*} start 结束标签的开始索引
 * @param {*} end 结束标签的结束索引
 */

function parseEndTag(tagName, start, end) {
  let pos, lowerCasedTagName
  if (start == null) start = index
  if (end == null) end = index

  // 倒序遍历 stack 数组，找到第一个和当前结束标签相同的标签，该标签就是结束标签对应的开始标签的描述对象
  // 理论上，不出异常，stack 数组中的最后一个元素就是当前结束标签的开始标签的描述对象
  // Find the closest opened tag of the same type
  if (tagName) {
    lowerCasedTagName = tagName.toLowerCase()
    for (pos = stack.length - 1; pos >= 0; pos--) {
      if (stack[pos].lowerCasedTag === lowerCasedTagName) {
        break
      }
    }
  } else {
    // If no tag name is provided, clean shop
    pos = 0
  }

  // 如果在 stack 中一直没有找到相同的标签名，则 pos 就会 < 0，进行后面的 else 分支

  if (pos >= 0) {
    // 这个 for 循环负责关闭 stack 数组中索引 >= pos 的所有标签
    // 为什么要用一个循环，上面说到正常情况下 stack 数组的最后一个元素就是我们要找的开始标签，
    // 但是有些异常情况，就是有些元素没有给提供结束标签，比如：
    // stack = ['span', 'div', 'span', 'h1']，当前处理的结束标签 tagName = div
    // 匹配到 div，pos = 1，那索引为 2 和 3 的两个标签（span、h1）说明就没提供结束标签
    // 这个 for 循环就负责关闭 div、span 和 h1 这三个标签，
    // 并在开发环境为 span 和 h1 这两个标签给出 ”未匹配到结束标签的提示”
    // Close all the open elements, up the stack
    for (let i = stack.length - 1; i >= pos; i--) {
      if (process.env.NODE_ENV !== 'production' &&
        (i > pos || !tagName) &&
        options.warn
      ) {
        options.warn(
          `tag <${stack[i].tag}> has no matching end tag.`,
          { start: stack[i].start, end: stack[i].end }
        )
      }
      if (options.end) {
        // 走到这里，说明上面的异常情况都处理完了，调用 options.end 处理正常的结束标签
        options.end(stack[i].tag, start, end)
      }
    }

    // 将刚才处理的那些标签从数组中移除，保证数组的最后一个元素就是下一个结束标签对应的开始标签
    // Remove the open elements from the stack
    stack.length = pos
    // lastTag 记录 stack 数组中未处理的最后一个开始标签
    lastTag = pos && stack[pos - 1].tag
  } else if (lowerCasedTagName === 'br') {
    // 当前处理的标签为 <br /> 标签
    if (options.start) {
      options.start(tagName, [], true, start, end)
    }
  } else if (lowerCasedTagName === 'p') {
    // p 标签
    if (options.start) {
      // 处理 <p> 标签
      options.start(tagName, [], false, start, end)
    }
    if (options.end) {
      // 处理 </p> 标签
      options.end(tagName, start, end)
    }
  }
}
```


#### parsetHtmlOptions

定义如何处理开始标签、结束标签、文本节点和注释节点。

```javascript
/**
 * 主要做了以下 6 件事情:
 *   1、创建 AST 对象
 *   2、处理存在 v-model 指令的 input 标签，分别处理 input 为 checkbox、radio、其它的情况
 *   3、处理标签上的众多指令，比如 v-pre、v-for、v-if、v-once
 *   4、如果根节点 root 不存在则设置当前元素为根节点
 *   5、如果当前元素为非自闭合标签则将自己 push 到 stack 数组，并记录 currentParent，在接下来处理子元素时用来告诉子元素自己的父节点是谁
 *   6、如果当前元素为自闭合标签，则表示该标签要处理结束了，让自己和父元素产生关系，以及设置自己的子元素
 * @param {*} tag 标签名
 * @param {*} attrs [{ name: attrName, value: attrVal, start, end }, ...] 形式的属性数组
 * @param {*} unary 自闭合标签
 * @param {*} start 标签在 html 字符串中的开始索引
 * @param {*} end 标签在 html 字符串中的结束索引
 */
function start(tag, attrs, unary, start, end) {
  // 检查命名空间，如果存在，则继承父命名空间
  // check namespace.
  // inherit parent ns if there is one
  const ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag)

  // handle IE svg bug
  /* istanbul ignore if */
  if (isIE && ns === 'svg') {
    attrs = guardIESVGBug(attrs)
  }

  // 创建当前标签的 AST 对象
  let element: ASTElement = createASTElement(tag, attrs, currentParent)
  // 设置命名空间
  if (ns) {
    element.ns = ns
  }

  // 这段在非生产环境下会走，在 ast 对象上添加 一些 属性，比如 start、end
  if (process.env.NODE_ENV !== 'production') {
    if (options.outputSourceRange) {
      element.start = start
      element.end = end
      // 将属性数组解析成 { attrName: { name: attrName, value: attrVal, start, end }, ... } 形式的对象
      element.rawAttrsMap = element.attrsList.reduce((cumulated, attr) => {
        cumulated[attr.name] = attr
        return cumulated
      }, {})
    }
    // 验证属性是否有效，比如属性名不能包含: spaces, quotes, <, >, / or =.
    attrs.forEach(attr => {
      if (invalidAttributeRE.test(attr.name)) {
        warn(
          `Invalid dynamic argument expression: attribute names cannot contain ` +
          `spaces, quotes, <, >, / or =.`,
          {
            start: attr.start + attr.name.indexOf(`[`),
            end: attr.start + attr.name.length
          }
        )
      }
    })
  }

  // 非服务端渲染的情况下，模版中不应该出现 style、script 标签
  if (isForbiddenTag(element) && !isServerRendering()) {
    element.forbidden = true
    process.env.NODE_ENV !== 'production' && warn(
      'Templates should only be responsible for mapping the state to the ' +
      'UI. Avoid placing tags with side-effects in your templates, such as ' +
      `<${tag}>` + ', as they will not be parsed.',
      { start: element.start }
    )
  }

  /**
   * 为 element 对象分别执行 class、style、model 模块中的 preTransforms 方法
   * 不过 web 平台只有 model 模块有 preTransforms 方法
   * 用来处理存在 v-model 的 input 标签，但没处理 v-model 属性
   * 分别处理了 input 为 checkbox、radio 和 其它的情况
   * input 具体是哪种情况由 el.ifConditions 中的条件来判断
   * <input v-mode="test" :type="checkbox or radio or other(比如 text)" />
   */
  // apply pre-transforms
  for (let i = 0; i < preTransforms.length; i++) {
    element = preTransforms[i](element, options) || element
  }

  if (!inVPre) {
    // 表示 element 是否存在 v-pre 指令，存在则设置 element.pre = true
    processPre(element)
    if (element.pre) {
      // 存在 v-pre 指令，则设置 inVPre 为 true
      inVPre = true
    }
  }
  // 如果 pre 标签，则设置 inPre 为 true
  if (platformIsPreTag(element.tag)) {
    inPre = true
  }

  if (inVPre) {
    // 说明标签上存在 v-pre 指令，这样的节点只会渲染一次，将节点上的属性都设置到 el.attrs 数组对象中，作为静态属性，数据更新时不会渲染这部分内容
    // 设置 el.attrs 数组对象，每个元素都是一个属性对象 { name: attrName, value: attrVal, start, end }
    processRawAttrs(element)
  } else if (!element.processed) {
    // structural directives
    // 处理 v-for 属性，得到 element.for = 可迭代对象 element.alias = 别名
    processFor(element)
    /**
     * 处理 v-if、v-else-if、v-else
     * 得到 element.if = "exp"，element.elseif = exp, element.else = true
     * v-if 属性会额外在 element.ifConditions 数组中添加 { exp, block } 对象
     */
    processIf(element)
    // 处理 v-once 指令，得到 element.once = true 
    processOnce(element)
  }

  // 如果 root 不存在，则表示当前处理的元素为第一个元素，即组件的 根 元素
  if (!root) {
    root = element
    if (process.env.NODE_ENV !== 'production') {
      // 检查根元素，对根元素有一些限制，比如：不能使用 slot 和 template 作为根元素，也不能在有状态组件的根元素上使用 v-for 指令
      checkRootConstraints(root)
    }
  }

  if (!unary) {
    // 非自闭合标签，通过 currentParent 记录当前元素，下一个元素在处理的时候，就知道自己的父元素是谁
    currentParent = element
    // 然后将 element push 到 stack 数组，将来处理到当前元素的闭合标签时再拿出来
    // 将当前标签的 ast 对象 push 到 stack 数组中，这里需要注意，在调用 options.start 方法
    // 之前也发生过一次 push 操作，那个 push 进来的是当前标签的一个基本配置信息
    stack.push(element)
  } else {
    /**
     * 说明当前元素为自闭合标签，主要做了 3 件事：
     *   1、如果元素没有被处理过，即 el.processed 为 false，则调用 processElement 方法处理节点上的众多属性
     *   2、让自己和父元素产生关系，将自己放到父元素的 children 数组中，并设置自己的 parent 属性为 currentParent
     *   3、设置自己的子元素，将自己所有非插槽的子元素放到自己的 children 数组中
     */
    closeElement(element)
  }
}
```

#### end

* 处理结束标签
* 如果元素没有被处理过，即 el.processed 为 false，则调用 processElement 方法处理节点上的众多属性
* 让自己和父元素产生关系，将自己放到父元素的 children 数组中，并设置自己的 parent 属性为 currentParent
* 设置自己的子元素，将自己所有非插槽的子元素放到自己的 children 数组中


```javascript
/**
 * 处理结束标签
 * @param {*} tag 结束标签的名称
 * @param {*} start 结束标签的开始索引
 * @param {*} end 结束标签的结束索引
 */

function end(tag, start, end) {
  // 结束标签对应的开始标签的 ast 对象
  const element = stack[stack.length - 1]
  // pop stack
  stack.length -= 1
  // 这块儿有点不太理解，因为上一个元素有可能是当前元素的兄弟节点
  currentParent = stack[stack.length - 1]
  if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
    element.end = end
  }
  /**
   * 主要做了 3 件事：
   *   1、如果元素没有被处理过，即 el.processed 为 false，则调用 processElement 方法处理节点上的众多属性
   *   2、让自己和父元素产生关系，将自己放到父元素的 children 数组中，并设置自己的 parent 属性为 currentParent
   *   3、设置自己的子元素，将自己所有非插槽的子元素放到自己的 children 数组中
   */
  closeElement(element)
}

```

#### char

* 处理文本


```javascript
/**
 * 处理文本，基于文本生成 ast 对象，然后将该 ast 放到它的父元素的肚子里，即 currentParent.children 数组中 
 */
function chars(text: string, start: number, end: number) {
  // 异常处理，currentParent 不存在说明这段文本没有父元素
  if (!currentParent) {
    if (process.env.NODE_ENV !== 'production') {
      if (text === template) { // 文本不能作为组件的根元素
        warnOnce(
          'Component template requires a root element, rather than just text.',
          { start }
        )
      } else if ((text = text.trim())) { // 放在根元素之外的文本会被忽略
        warnOnce(
          `text "${text}" outside root element will be ignored.`,
          { start }
        )
      }
    }
    return
  }
  // IE textarea placeholder bug
  /* istanbul ignore if */
  if (isIE &&
    currentParent.tag === 'textarea' &&
    currentParent.attrsMap.placeholder === text
  ) {
    return
  }
  // 当前父元素的所有孩子节点
  const children = currentParent.children
  // 对 text 进行一系列的处理，比如删除空白字符，或者存在 whitespaceOptions 选项，则 text 直接置为空或者空格
  if (inPre || text.trim()) {
    // 文本在 pre 标签内 或者 text.trim() 不为空
    text = isTextTag(currentParent) ? text : decodeHTMLCached(text)
  } else if (!children.length) {
    // 说明文本不在 pre 标签内而且 text.trim() 为空，而且当前父元素也没有孩子节点，
    // 则将 text 置为空
    // remove the whitespace-only node right after an opening tag
    text = ''
  } else if (whitespaceOption) {
    // 压缩处理
    if (whitespaceOption === 'condense') {
      // in condense mode, remove the whitespace node if it contains
      // line break, otherwise condense to a single space
      text = lineBreakRE.test(text) ? '' : ' '
    } else {
      text = ' '
    }
  } else {
    text = preserveWhitespace ? ' ' : ''
  }
  // 如果经过处理后 text 还存在
  if (text) {
    if (!inPre && whitespaceOption === 'condense') {
      // 不在 pre 节点中，并且配置选项中存在压缩选项，则将多个连续空格压缩为单个
      // condense consecutive whitespaces into single space
      text = text.replace(whitespaceRE, ' ')
    }
    let res
    // 基于 text 生成 AST 对象
    let child: ?ASTNode
    if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
      // 文本中存在表达式（即有界定符）
      child = {
        type: 2,
        // 表达式
        expression: res.expression,
        tokens: res.tokens,
        // 文本
        text
      }
    } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
      // 纯文本节点
      child = {
        type: 3,
        text
      }
    }
    // child 存在，则将 child 放到父元素的肚子里，即 currentParent.children 数组中
    if (child) {
      if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
        child.start = start
        child.end = end
      }
      children.push(child)
    }
  }
},
```

#### comment

* 处理注释节点

```javascript
function comment(text: string, start, end) {
  // adding anything as a sibling to the root node is forbidden
  // comments should still be allowed, but ignored
  // 禁止将任何内容作为 root 的节点的同级进行添加，注释应该被允许，但是会被忽略
  // 如果 currentParent 不存在，说明注释和 root 为同级，忽略
  if (currentParent) {
    // 注释节点的 ast
    const child: ASTText = {
      // 节点类型
      type: 3,
      // 注释内容
      text,
      // 是否为注释
      isComment: true
    }
    if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
      // 记录节点的开始索引和结束索引
      child.start = start
      child.end = end
    }
    // 将当前注释节点放到父元素的 children 属性中
    currentParent.children.push(child)
  }
}

```

#### createASTElement

* 创建抽象语法对象

```javascript
/**
 * 为指定元素创建 AST 对象
 * @param {*} tag 标签名
 * @param {*} attrs 属性数组，[{ name: attrName, value: attrVal, start, end }, ...]
 * @param {*} parent 父元素
 * @returns { type: 1, tag, attrsList, attrsMap: makeAttrsMap(attrs), rawAttrsMap: {}, parent, children: []}
 * 存在标签名，属性数组，父节点的储存
 */


export function createASTElement(
  tag: string,
  attrs: Array<ASTAttr>,
  parent: ASTElement | void
): ASTElement {
  return {
    // 节点类型
    type: 1,
    // 标签名
    tag,
    // 标签的属性数组
    attrsList: attrs,
    // 标签的属性对象 { attrName: attrVal, ... }
    attrsMap: makeAttrsMap(attrs),
    // 原始属性对象
    rawAttrsMap: {},
    // 父节点
    parent,
    // 孩子节点
    children: []
  }
}
```

#### preTransformNode

```javascript
/**
 * 处理存在 v-model 的 input 标签，但没处理 v-model 属性
 * 分别处理了 input 为 checkbox、radio 和 其它的情况
 * input 具体是哪种情况由 el.ifConditions 中的条件来判断
 * <input v-mode="test" :type="checkbox or radio or other(比如 text)" />
 * @param {*} el 
 * @param {*} options 
 * @returns branch0
 */
function preTransformNode (el: ASTElement, options: CompilerOptions) {
  if (el.tag === 'input') {
    const map = el.attrsMap
    // 不存在 v-model 属性，直接结束
    if (!map['v-model']) {
      return
    }

    // 获取 :type 的值
    let typeBinding
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type')
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = `(${map['v-bind']}).type`
    }

    // 如果存在 type 属性
    if (typeBinding) {
      // 获取 v-if 的值，比如： <input v-model="test" :type="checkbox" v-if="test" />
      const ifCondition = getAndRemoveAttr(el, 'v-if', true)
      // &&test
      const ifConditionExtra = ifCondition ? `&&(${ifCondition})` : ``
      // 是否存在 v-else 属性，<input v-else />
      const hasElse = getAndRemoveAttr(el, 'v-else', true) != null
      // 获取 v-else-if 属性的值 <inpu v-else-if="test" />
      const elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true)
      // 克隆一个新的 el 对象，分别处理 input 为 chekbox、radio 或 其它的情况
      // 具体是哪种情况，通过 el.ifConditins 条件来判断
      // 1. checkbox
      const branch0 = cloneASTElement(el)
      // process for on the main node
      // <input v-for="item in arr" :key="item" />
      // 处理 v-for 表达式，得到 branch0.for = arr, branch0.alias = item
      processFor(branch0)
      // 在 branch0.attrsMap 和 branch0.attrsList 对象中添加 type 属性
      addRawAttr(branch0, 'type', 'checkbox')
      // 分别处理元素节点的 key、ref、插槽、自闭合的 slot 标签、动态组件、class、style、v-bind、v-on、其它指令和一些原生属性 
      processElement(branch0, options)
      // 标记当前对象已经被处理过了
      branch0.processed = true // prevent it from double-processed
      // 得到 true&&test or false&&test，标记当前 input 是否为 checkbox
      branch0.if = `(${typeBinding})==='checkbox'` + ifConditionExtra
      // 在 branch0.ifConfitions 数组中放入 { exp, block } 对象
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      })
      // 克隆一个新的 ast 对象
      // 2. add radio else-if condition
      const branch1 = cloneASTElement(el)
      // 获取 v-for 属性值
      getAndRemoveAttr(branch1, 'v-for', true)
      // 在 branch1.attrsMap 和 branch1.attrsList 对象中添加 type 属性
      addRawAttr(branch1, 'type', 'radio')
      // 分别处理元素节点的 key、ref、插槽、自闭合的 slot 标签、动态组件、class、style、v-bind、v-on、其它指令和一些原生属性 
      processElement(branch1, options)
      // 在 branch0.ifConfitions 数组中放入 { exp, block } 对象
      addIfCondition(branch0, {
        // 标记当前 input 是否为 radio
        exp: `(${typeBinding})==='radio'` + ifConditionExtra,
        block: branch1
      })
      // 3. other，input 为其它的情况
      const branch2 = cloneASTElement(el)
      getAndRemoveAttr(branch2, 'v-for', true)
      addRawAttr(branch2, ':type', typeBinding)
      processElement(branch2, options)
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      })

      // 给 branch0 设置 else 或 elseif 条件
      if (hasElse) {
        branch0.else = true
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition
      }

      return branch0
    }
  }
}
```

#### getBindingAttr

* 获取v-bind

```javascript
export function getBindingAttr (
  el: ASTElement,
  name: string,
  getStatic?: boolean
): ?string {
  // 获取指定属性的值
  const dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name)
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    const staticValue = getAndRemoveAttr(el, name)
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

```


#### getAndRemoveAttr

```javascript
/*
从el中移除属性
*/
export function getAndRemoveAttr (
  el: ASTElement,
  name: string,
  removeFromMap?: boolean
): ?string {
  let val
  // 将执行属性 name 从 el.attrsList 中移除
  if ((val = el.attrsMap[name]) != null) {
    const list = el.attrsList
    for (let i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1)
        break
      }
    }
  }
  // 如果 removeFromMap 为 true，则从 el.attrsMap 中移除指定的属性 name
  // 不过一般不会移除 el.attsMap 中的数据，因为从 ast 生成 代码 期间还需要使用该对象
  if (removeFromMap) {
    delete el.attrsMap[name]
  }
  // 返回执行属性的值
  return val
}

```

#### processFor

```javascript
/*
处理v-for标签熟悉
* 处理 v-for，将结果设置到 el 对象上，得到:
 *   el.for = 可迭代对象，比如 arr
 *   el.alias = 别名，比如 item
 * @param {*} el 元素的 ast 对象
*/
export function processFor(el: ASTElement) {
  let exp
  // 获取 el 上的 v-for 属性的值
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    // 解析 v-for 的表达式，得到 { for: 可迭代对象， alias: 别名 }，比如 { for: arr, alias: item }
    const res = parseFor(exp)
    if (res) {
      // 将 res 对象上的属性拷贝到 el 对象上
      extend(el, res)
    } else if (process.env.NODE_ENV !== 'production') {
      warn(
        `Invalid v-for expression: ${exp}`,
        el.rawAttrsMap['v-for']
      )
    }
  }
}
```

#### addRawAttr

```javascript
/*
添加指定属性，因为属性是存放在数组中的，则直接Push就行
*/
export function addRawAttr (el: ASTElement, name: string, value: any, range?: Range) {
  el.attrsMap[name] = value
  el.attrsList.push(rangeSetItem({ name, value }, range))
}

```

#### processElement

```javascript
/*
/**
 * 分别处理元素节点的 key、ref、插槽、自闭合的 slot 标签、动态组件、class、style、v-bind、v-on、其它指令和一些原生属性 
 * 然后在 el 对象上添加如下属性：
 * el.key、ref、refInFor、scopedSlot、slotName、component、inlineTemplate、staticClass
 * el.bindingClass、staticStyle、bindingStyle、attrs
 * @param {*} element 被处理元素的 ast 对象
 * @param {*} options 配置项
 * @returns 
 */

export function processElement(
  element: ASTElement,
  options: CompilerOptions
) {
  // el.key = val
  processKey(element)

  // 确定 element 是否为一个普通元素
  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = (
    !element.key &&
    !element.scopedSlots &&
    !element.attrsList.length
  )

  // el.ref = val, el.refInFor = boolean
  processRef(element)
  // 处理作为插槽传递给组件的内容，得到  插槽名称、是否为动态插槽、作用域插槽的值，以及插槽中的所有子元素，子元素放到插槽对象的 children 属性中
  processSlotContent(element)
  // 处理自闭合的 slot 标签，得到插槽名称 => el.slotName = xx
  processSlotOutlet(element)
  // 处理动态组件，<component :is="compoName"></component>得到 el.component = compName，
  // 以及标记是否存在内联模版，el.inlineTemplate = true of false
  processComponent(element)
  // 为 element 对象分别执行 class、style、model 模块中的 transformNode 方法
  // 不过 web 平台只有 class、style 模块有 transformNode 方法，分别用来处理 class 属性和 style 属性
  // 得到 el.staticStyle、 el.styleBinding、el.staticClass、el.classBinding
  // 分别存放静态 style 属性的值、动态 style 属性的值，以及静态 class 属性的值和动态 class 属性的值
  for (let i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element
  }
  /**
   * 处理元素上的所有属性：
   * v-bind 指令变成：el.attrs 或 el.dynamicAttrs = [{ name, value, start, end, dynamic }, ...]，
   *                或者是必须使用 props 的属性，变成了 el.props = [{ name, value, start, end, dynamic }, ...]
   * v-on 指令变成：el.events 或 el.nativeEvents = { name: [{ value, start, end, modifiers, dynamic }, ...] }
   * 其它指令：el.directives = [{name, rawName, value, arg, isDynamicArg, modifier, start, end }, ...]
   * 原生属性：el.attrs = [{ name, value, start, end }]，或者一些必须使用 props 的属性，变成了：
   *         el.props = [{ name, value: true, start, end, dynamic }]
   */
  processAttrs(element)
  return element
}
```

#### processKey

* 处理

```javascript
/**
 * 处理元素上的 key 属性，设置 el.key = val
 * @param {*} el 
 */
function processKey(el) {
  // 拿到 key 的属性值
  const exp = getBindingAttr(el, 'key')
  if (exp) {
    // 关于 key 使用上的异常处理
    if (process.env.NODE_ENV !== 'production') {
      // template 标签不允许设置 key
      if (el.tag === 'template') {
        warn(
          `<template> cannot be keyed. Place the key on real elements instead.`,
          getRawBindingAttr(el, 'key')
        )
      }
      // 不要在 <transition=group> 的子元素上使用 v-for 的 index 作为 key，这和没用 key 没什么区别
      if (el.for) {
        const iterator = el.iterator2 || el.iterator1
        const parent = el.parent
        if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
          warn(
            `Do not use v-for index as key on <transition-group> children, ` +
            `this is the same as not using keys.`,
            getRawBindingAttr(el, 'key'),
            true /* tip */
          )
        }
      }
    }
    // 设置 el.key = exp
    el.key = exp
  }
}

```

#### processRef

* 处理Ref属性

```javascript
/**
 * 处理元素上的 ref 属性
 *  el.ref = refVal
 *  el.refInFor = boolean
 * @param {*} el 
 */
function processRef(el) {
  const ref = getBindingAttr(el, 'ref')
  if (ref) {
    el.ref = ref
    // 判断包含 ref 属性的元素是否包含在具有 v-for 指令的元素内或后代元素中
    // 如果是，则 ref 指向的则是包含 DOM 节点或组件实例的数组
    el.refInFor = checkInFor(el)
  }
}

```

#### processSlotContent

* 处理插槽

```javascript
/**
 * 处理作为插槽传递给组件的内容，得到：
 *  slotTarget => 插槽名
 *  slotTargetDynamic => 是否为动态插槽
 *  slotScope => 作用域插槽的值
 *  直接在 <comp> 标签上使用 v-slot 语法时，将上述属性放到 el.scopedSlots 对象上，其它情况直接放到 el 对象上
 * handle content being passed to a component as slot,
 * e.g. <template slot="xxx">, <div slot-scope="xxx">
 */
function processSlotContent(el) {
  let slotScope
  if (el.tag === 'template') {
    // template 标签上使用 scope 属性的提示
    // scope 已经弃用，并在 2.5 之后使用 slot-scope 代替
    // slot-scope 即可以用在 template 标签也可以用在普通标签上
    slotScope = getAndRemoveAttr(el, 'scope')
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && slotScope) {
      warn(
        `the "scope" attribute for scoped slots have been deprecated and ` +
        `replaced by "slot-scope" since 2.5. The new "slot-scope" attribute ` +
        `can also be used on plain elements in addition to <template> to ` +
        `denote scoped slots.`,
        el.rawAttrsMap['scope'],
        true
      )
    }
    // el.slotScope = val
    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope')
  } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && el.attrsMap['v-for']) {
      // 元素不能同时使用 slot-scope 和 v-for，v-for 具有更高的优先级
      // 应该用 template 标签作为容器，将 slot-scope 放到 template 标签上 
      warn(
        `Ambiguous combined usage of slot-scope and v-for on <${el.tag}> ` +
        `(v-for takes higher priority). Use a wrapper <template> for the ` +
        `scoped slot to make it clearer.`,
        el.rawAttrsMap['slot-scope'],
        true
      )
    }
    el.slotScope = val
    el.slotScope = slotScope
  }

  // 获取 slot 属性的值
  // slot="xxx"，老旧的具名插槽的写法
  const slotTarget = getBindingAttr(el, 'slot')
  if (slotTarget) {
    // el.slotTarget = 插槽名（具名插槽）
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget
    // 动态插槽名
    el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot'])
    // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.
    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'))
    }
  }

  // 2.6 v-slot syntax
  if (process.env.NEW_SLOT_SYNTAX) {
    if (el.tag === 'template') {
      // v-slot 在 tempalte 标签上，得到 v-slot 的值
      // v-slot on <template>
      const slotBinding = getAndRemoveAttrByRegex(el, slotRE)
      if (slotBinding) {
        // 异常提示
        if (process.env.NODE_ENV !== 'production') {
          if (el.slotTarget || el.slotScope) {
            // 不同插槽语法禁止混合使用
            warn(
              `Unexpected mixed usage of different slot syntaxes.`,
              el
            )
          }
          if (el.parent && !maybeComponent(el.parent)) {
            // <template v-slot> 只能出现在组件的根位置，比如：
            // <comp>
            //   <template v-slot>xx</template>
            // </comp>
            // 而不能是
            // <comp>
            //   <div>
            //     <template v-slot>xxx</template>
            //   </div>
            // </comp>
            warn(
              `<template v-slot> can only appear at the root level inside ` +
              `the receiving component`,
              el
            )
          }
        }
        // 得到插槽名称
        const { name, dynamic } = getSlotName(slotBinding)
        // 插槽名
        el.slotTarget = name
        // 是否为动态插槽
        el.slotTargetDynamic = dynamic
        // 作用域插槽的值
        el.slotScope = slotBinding.value || emptySlotScopeToken // force it into a scoped slot for perf
      }
    } else {
      // 处理组件上的 v-slot，<comp v-slot:header />
      // slotBinding = { name: "v-slot:header", value: "", start, end}
      // v-slot on component, denotes default slot
      const slotBinding = getAndRemoveAttrByRegex(el, slotRE)
      if (slotBinding) {
        // 异常提示
        if (process.env.NODE_ENV !== 'production') {
          // el 不是组件的话，提示，v-slot 只能出现在组件上或 template 标签上
          if (!maybeComponent(el)) {
            warn(
              `v-slot can only be used on components or <template>.`,
              slotBinding
            )
          }
          // 语法混用
          if (el.slotScope || el.slotTarget) {
            warn(
              `Unexpected mixed usage of different slot syntaxes.`,
              el
            )
          }
          // 为了避免作用域歧义，当存在其他命名槽时，默认槽也应该使用<template>语法
          if (el.scopedSlots) {
            warn(
              `To avoid scope ambiguity, the default slot should also use ` +
              `<template> syntax when there are other named slots.`,
              slotBinding
            )
          }
        }
        // 将组件的孩子添加到它的默认插槽内
        // add the component's children to its default slot
        const slots = el.scopedSlots || (el.scopedSlots = {})
        // 获取插槽名称以及是否为动态插槽
        const { name, dynamic } = getSlotName(slotBinding)
        // 创建一个 template 标签的 ast 对象，用于容纳插槽内容，父级是 el
        const slotContainer = slots[name] = createASTElement('template', [], el)
        // 插槽名
        slotContainer.slotTarget = name
        // 是否为动态插槽
        slotContainer.slotTargetDynamic = dynamic
        // 所有的孩子，将每一个孩子的 parent 属性都设置为 slotContainer
        slotContainer.children = el.children.filter((c: any) => {
          if (!c.slotScope) {
            // 给插槽内元素设置 parent 属性为 slotContainer，也就是 template 元素
            c.parent = slotContainer
            return true
          }
        })
        slotContainer.slotScope = slotBinding.value || emptySlotScopeToken
        // remove children as they are returned from scopedSlots now
        el.children = []
        // mark el non-plain so data gets generated
        el.plain = false
      }
    }
  }
}
```

#### getSlotName

* 解析插槽，得到插槽名或者是否是动态插槽

```javascript
/**
 * 解析 binding，得到插槽名称以及是否为动态插槽
 * @returns { name: 插槽名称, dynamic: 是否为动态插槽 }
 */
function getSlotName(binding) {
  let name = binding.name.replace(slotRE, '')
  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default'
    } else if (process.env.NODE_ENV !== 'production') {
      warn(
        `v-slot shorthand syntax requires a slot name.`,
        binding
      )
    }
  }
  return dynamicArgRE.test(name)
    // dynamic [name]
    ? { name: name.slice(1, -1), dynamic: true }
    // static name
    : { name: `"${name}"`, dynamic: false }
}

```

#### processSlotOutlet

* 处理自闭合标签

```javascript
// handle <slot/> outlets，处理自闭合 slot 标签
// 得到插槽名称，el.slotName
function processSlotOutlet(el) {
  if (el.tag === 'slot') {
    // 得到插槽名称
    el.slotName = getBindingAttr(el, 'name')
    // 提示信息，不要在 slot 标签上使用 key 属性
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn(
        `\`key\` does not work on <slot> because slots are abstract outlets ` +
        `and can possibly expand into multiple elements. ` +
        `Use the key on a wrapping element instead.`,
        getRawBindingAttr(el, 'key')
      )
    }
  }
}

```

#### processComponent

* 处理component标签

```javascript
/**
 * 处理动态组件，<component :is="compName"></component>
 * 得到 el.component = compName
 */
function processComponent(el) {
  let binding
  // 解析 is 属性，得到属性值，即组件名称，el.component = compName
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding
  }
  // <component :is="compName" inline-template>xx</component>
  // 组件上存在 inline-template 属性，进行标记：el.inlineTemplate = true
  // 表示组件开始和结束标签内的内容作为组件模版出现，而不是作为插槽别分发，方便定义组件模版
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true
  }
}

```

#### transformNode

* 处理元素上的class属性
* 静态的class属性赋值给el.staticClass属性
* 动态的class属性赋值给el.classBinding属性

```javascript
/**
 * 处理元素上的 class 属性
 * 静态的 class 属性值赋值给 el.staticClass 属性
 * 动态的 class 属性值赋值给 el.classBinding 属性
 */
function transformNode (el: ASTElement, options: CompilerOptions) {
  // 日志
  const warn = options.warn || baseWarn
  // 获取元素上静态 class 属性的值 xx，<div class="xx"></div>
  const staticClass = getAndRemoveAttr(el, 'class')
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    const res = parseText(staticClass, options.delimiters)
    // 提示，同 style 的提示一样，不能使用 <div class="{{ val}}"></div>，请用
    // <div :class="val"></div> 代替
    if (res) {
      warn(
        `class="${staticClass}": ` +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.',
        el.rawAttrsMap['class']
      )
    }
  }
  // 静态 class 属性值赋值给 el.staticClass
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass)
  }
  // 获取动态绑定的 class 属性值，并赋值给 el.classBinding
  const classBinding = getBindingAttr(el, 'class', false /* getStatic */)
  if (classBinding) {
    el.classBinding = classBinding
  }
}
```

#### processAttrs属性处理

* 处理标签上面的属性数组

```javascript
/**
 * 处理元素上的所有属性：
 * v-bind 指令变成：el.attrs 或 el.dynamicAttrs = [{ name, value, start, end, dynamic }, ...]，
 *                或者是必须使用 props 的属性，变成了 el.props = [{ name, value, start, end, dynamic }, ...]
 * v-on 指令变成：el.events 或 el.nativeEvents = { name: [{ value, start, end, modifiers, dynamic }, ...] }
 * 其它指令：el.directives = [{name, rawName, value, arg, isDynamicArg, modifier, start, end }, ...]
 * 原生属性：el.attrs = [{ name, value, start, end }]，或者一些必须使用 props 的属性，变成了：
 *         el.props = [{ name, value: true, start, end, dynamic }]
 */
function processAttrs(el) {
  // list = [{ name, value, start, end }, ...]
  const list = el.attrsList
  let i, l, name, rawName, value, modifiers, syncGen, isDynamic
  for (i = 0, l = list.length; i < l; i++) {
    // 属性名
    name = rawName = list[i].name
    // 属性值
    value = list[i].value
    if (dirRE.test(name)) {
      // 说明该属性是一个指令

      // 元素上存在指令，将元素标记动态元素
      // mark element as dynamic
      el.hasBindings = true
      // modifiers，在属性名上解析修饰符，比如 xx.lazy
      modifiers = parseModifiers(name.replace(dirRE, ''))
      // support .foo shorthand syntax for the .prop modifier
      if (process.env.VBIND_PROP_SHORTHAND && propBindRE.test(name)) {
        // 为 .props 修饰符支持 .foo 速记写法
        (modifiers || (modifiers = {})).prop = true
        name = `.` + name.slice(1).replace(modifierRE, '')
      } else if (modifiers) {
        // 属性中的修饰符去掉，得到一个干净的属性名
        name = name.replace(modifierRE, '')
      }
      if (bindRE.test(name)) { // v-bind, <div :id="test"></div>
        // 处理 v-bind 指令属性，最后得到 el.attrs 或者 el.dynamicAttrs = [{ name, value, start, end, dynamic }, ...]

        // 属性名，比如：id
        name = name.replace(bindRE, '')
        // 属性值，比如：test
        value = parseFilters(value)
        // 是否为动态属性 <div :[id]="test"></div>
        isDynamic = dynamicArgRE.test(name)
        if (isDynamic) {
          // 如果是动态属性，则去掉属性两侧的方括号 []
          name = name.slice(1, -1)
        }
        // 提示，动态属性值不能为空字符串
        if (
          process.env.NODE_ENV !== 'production' &&
          value.trim().length === 0
        ) {
          warn(
            `The value for a v-bind expression cannot be empty. Found in "v-bind:${name}"`
          )
        }
        // 存在修饰符
        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name)
            if (name === 'innerHtml') name = 'innerHTML'
          }
          if (modifiers.camel && !isDynamic) {
            name = camelize(name)
          }
          // 处理 sync 修饰符
          if (modifiers.sync) {
            syncGen = genAssignmentCode(value, `$event`)
            if (!isDynamic) {
              addHandler(
                el,
                `update:${camelize(name)}`,
                syncGen,
                null,
                false,
                warn,
                list[i]
              )
              if (hyphenate(name) !== camelize(name)) {
                addHandler(
                  el,
                  `update:${hyphenate(name)}`,
                  syncGen,
                  null,
                  false,
                  warn,
                  list[i]
                )
              }
            } else {
              // handler w/ dynamic event name
              addHandler(
                el,
                `"update:"+(${name})`,
                syncGen,
                null,
                false,
                warn,
                list[i],
                true // dynamic
              )
            }
          }
        }
        if ((modifiers && modifiers.prop) || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          // 将属性对象添加到 el.props 数组中，表示这些属性必须通过 props 设置
          // el.props = [{ name, value, start, end, dynamic }, ...]
          addProp(el, name, value, list[i], isDynamic)
        } else {
          // 将属性添加到 el.attrs 数组或者 el.dynamicAttrs 数组
          addAttr(el, name, value, list[i], isDynamic)
        }
      } else if (onRE.test(name)) { // v-on, 处理事件，<div @click="test"></div>
        // 属性名，即事件名
        name = name.replace(onRE, '')
        // 是否为动态属性
        isDynamic = dynamicArgRE.test(name)
        if (isDynamic) {
          // 动态属性，则获取 [] 中的属性名
          name = name.slice(1, -1)
        }
        // 处理事件属性，将属性的信息添加到 el.events 或者 el.nativeEvents 对象上，格式：
        // el.events = [{ value, start, end, modifiers, dynamic }, ...]
        addHandler(el, name, value, modifiers, false, warn, list[i], isDynamic)
      } else { // normal directives，其它的普通指令
        // 得到 el.directives = [{name, rawName, value, arg, isDynamicArg, modifier, start, end }, ...]
        name = name.replace(dirRE, '')
        // parse arg
        const argMatch = name.match(argRE)
        let arg = argMatch && argMatch[1]
        isDynamic = false
        if (arg) {
          name = name.slice(0, -(arg.length + 1))
          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1)
            isDynamic = true
          }
        }
        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i])
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value)
        }
      }
    } else {
      // 当前属性不是指令
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        const res = parseText(value, delimiters)
        if (res) {
          warn(
            `${name}="${value}": ` +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.',
            list[i]
          )
        }
      }
      // 将属性对象放到 el.attrs 数组中，el.attrs = [{ name, value, start, end }]
      addAttr(el, name, JSON.stringify(value), list[i])
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
        name === 'muted' &&
        platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true', list[i])
      }
    }
  }
}

```


#### addHandler

* 处理事件属性
  
```javascript

/**
 * 处理事件属性，将事件属性添加到 el.events 对象或者 el.nativeEvents 对象中，格式：
 * el.events[name] = [{ value, start, end, modifiers, dynamic }, ...]
 * 其中用了大量的篇幅在处理 name 属性带修饰符 (modifier) 的情况
 * @param {*} el ast 对象
 * @param {*} name 属性名，即事件名
 * @param {*} value 属性值，即事件回调函数名
 * @param {*} modifiers 修饰符
 * @param {*} important 
 * @param {*} warn 日志
 * @param {*} range 
 * @param {*} dynamic 属性名是否为动态属性
 */
export function addHandler (
  el: ASTElement,
  name: string,
  value: string,
  modifiers: ?ASTModifiers,
  important?: boolean,
  warn?: ?Function,
  range?: Range,
  dynamic?: boolean
) {
  // modifiers 是一个对象，如果传递的参数为空，则给一个冻结的空对象
  modifiers = modifiers || emptyObject
  // 提示：prevent 和 passive 修饰符不能一起使用
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    process.env.NODE_ENV !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.',
      range
    )
  }

  // 标准化 click.right 和 click.middle，它们实际上不会被真正的触发，从技术讲他们是它们
  // 是特定于浏览器的，但至少目前位置只有浏览器才具有右键和中间键的点击
  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (modifiers.right) {
    // 右键
    if (dynamic) {
      // 动态属性
      name = `(${name})==='click'?'contextmenu':(${name})`
    } else if (name === 'click') {
      // 非动态属性，name = contextmenu
      name = 'contextmenu'
      // 删除修饰符中的 right 属性
      delete modifiers.right
    }
  } else if (modifiers.middle) {
    // 中间键
    if (dynamic) {
      // 动态属性，name => mouseup 或者 ${name}
      name = `(${name})==='click'?'mouseup':(${name})`
    } else if (name === 'click') {
      // 非动态属性，mouseup
      name = 'mouseup'
    }
  }

  /**
   * 处理 capture、once、passive 这三个修饰符，通过给 name 添加不同的标记来标记这些修饰符
   */
  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture
    // 给带有 capture 修饰符的属性，加上 ! 标记
    name = prependModifierMarker('!', name, dynamic)
  }
  if (modifiers.once) {
    delete modifiers.once
    // once 修饰符加 ~ 标记
    name = prependModifierMarker('~', name, dynamic)
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive
    // passive 修饰符加 & 标记
    name = prependModifierMarker('&', name, dynamic)
  }

  let events
  if (modifiers.native) {
    // native 修饰符， 监听组件根元素的原生事件，将事件信息存放到 el.nativeEvents 对象中
    delete modifiers.native
    events = el.nativeEvents || (el.nativeEvents = {})
  } else {
    events = el.events || (el.events = {})
  }

  const newHandler: any = rangeSetItem({ value: value.trim(), dynamic }, range)
  if (modifiers !== emptyObject) {
    // 说明有修饰符，将修饰符对象放到 newHandler 对象上
    // { value, dynamic, start, end, modifiers }
    newHandler.modifiers = modifiers
  }

  // 将配置对象放到 events[name] = [newHander, handler, ...]
  const handlers = events[name]
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler)
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler]
  } else {
    events[name] = newHandler
  }

  el.plain = false
}

```

#### addIfCondition

```javascript
/**
 * 将传递进来的条件对象放进 el.ifConditions 数组中
 */
export function addIfCondition(el: ASTElement, condition: ASTIfCondition) {
  if (!el.ifConditions) {
    el.ifConditions = []
  }
  el.ifConditions.push(condition)
}

```

#### processPre

* 处理v-pre修饰符


```javascript
function processPre(el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true
  }
}
```

#### processRawAttrs

* 处理属性数组对象，也就是标签上的属性


```javascript
function processRawAttrs(el) {
  const list = el.attrsList
  const len = list.length
  if (len) {
    const attrs: Array<ASTAttr> = el.attrs = new Array(len)
    for (let i = 0; i < len; i++) {
      attrs[i] = {
        name: list[i].name,
        value: JSON.stringify(list[i].value)
      }
      if (list[i].start != null) {
        attrs[i].start = list[i].start
        attrs[i].end = list[i].end
      }
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true
  }
}

```

#### processIf

* 处理v-if修饰符

```javascript
/**
 * 处理 v-if、v-else-if、v-else
 * 得到 el.if = "exp"，el.elseif = exp, el.else = true
 * v-if 属性会额外在 el.ifConditions 数组中添加 { exp, block } 对象
 */
function processIf(el) {
  // 获取 v-if 属性的值，比如 <div v-if="test"></div>
  const exp = getAndRemoveAttr(el, 'v-if')
  if (exp) {
    // el.if = "test"
    el.if = exp
    // 在 el.ifConditions 数组中添加 { exp, block }
    addIfCondition(el, {
      exp: exp,
      block: el
    })
  } else {
    // 处理 v-else，得到 el.else = true
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true
    }
    // 处理 v-else-if，得到 el.elseif = exp
    const elseif = getAndRemoveAttr(el, 'v-else-if')
    if (elseif) {
      el.elseif = elseif
    }
  }
}

```

#### processOnce

* 处理v-once属性
  
```javascript
/**
 * 处理 v-once 指令，得到 el.once = true
 * @param {*} el 
 */
function processOnce(el) {
  const once = getAndRemoveAttr(el, 'v-once')
  if (once != null) {
    el.once = true
  }
}

```

#### checkRootConstraints

```javascript
/**
 * 检查根元素：
 *   不能使用 slot 和 template 标签作为组件的根元素
 *   不能在有状态组件的 根元素 上使用 v-for 指令，因为它会渲染出多个元素
 * @param {*} el 
 */
function checkRootConstraints(el) {
  // 不能使用 slot 和 template 标签作为组件的根元素
  if (el.tag === 'slot' || el.tag === 'template') {
    warnOnce(
      `Cannot use <${el.tag}> as component root element because it may ` +
      'contain multiple nodes.',
      { start: el.start }
    )
  }
  // 不能在有状态组件的 根元素 上使用 v-for，因为它会渲染出多个元素
  if (el.attrsMap.hasOwnProperty('v-for')) {
    warnOnce(
      'Cannot use v-for on stateful component root element because ' +
      'it renders multiple elements.',
      el.rawAttrsMap['v-for']
    )
  }
}

```

#### closeElement

* 如果元素没有被处理过，即 el.processed 为 false，则调用 processElement 方法处理节点上的众多属性
* 让自己和父元素产生关系，将自己放到父元素的 children 数组中，并设置自己的 parent 属性为 currentParent
* 设置自己的子元素，将自己所有非插槽的子元素放到自己的 children 数组中


```javascript
/**
 * 主要做了 3 件事：
 *   1、如果元素没有被处理过，即 el.processed 为 false，则调用 processElement 方法处理节点上的众多属性
 *   2、让自己和父元素产生关系，将自己放到父元素的 children 数组中，并设置自己的 parent 属性为 currentParent
 *   3、设置自己的子元素，将自己所有非插槽的子元素放到自己的 children 数组中
 */
function closeElement(element) {
  // 移除节点末尾的空格，当前 pre 标签内的元素除外
  trimEndingWhitespace(element)
  // 当前元素不再 pre 节点内，并且也没有被处理过
  if (!inVPre && !element.processed) {
    // 分别处理元素节点的 key、ref、插槽、自闭合的 slot 标签、动态组件、class、style、v-bind、v-on、其它指令和一些原生属性 
    element = processElement(element, options)
  }
  // 处理根节点上存在 v-if、v-else-if、v-else 指令的情况
  // 如果根节点存在 v-if 指令，则必须还提供一个具有 v-else-if 或者 v-else 的同级别节点，防止根元素不存在
  // tree management
  if (!stack.length && element !== root) {
    // allow root elements with v-if, v-else-if and v-else
    if (root.if && (element.elseif || element.else)) {
      if (process.env.NODE_ENV !== 'production') {
        // 检查根元素
        checkRootConstraints(element)
      }
      // 给根元素设置 ifConditions 属性，root.ifConditions = [{ exp: element.elseif, block: element }, ...]
      addIfCondition(root, {
        exp: element.elseif,
        block: element
      })
    } else if (process.env.NODE_ENV !== 'production') {
      // 提示，表示不应该在 根元素 上只使用 v-if，应该将 v-if、v-else-if 一起使用，保证组件只有一个根元素
      warnOnce(
        `Component template should contain exactly one root element. ` +
        `If you are using v-if on multiple elements, ` +
        `use v-else-if to chain them instead.`,
        { start: element.start }
      )
    }
  }
  // 让自己和父元素产生关系
  // 将自己放到父元素的 children 数组中，然后设置自己的 parent 属性为 currentParent
  if (currentParent && !element.forbidden) {
    if (element.elseif || element.else) {
      processIfConditions(element, currentParent)
    } else {
      if (element.slotScope) {
        // scoped slot
        // keep it in the children list so that v-else(-if) conditions can
        // find it as the prev node.
        const name = element.slotTarget || '"default"'
          ; (currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element
      }
      currentParent.children.push(element)
      element.parent = currentParent
    }
  }

  // 设置自己的子元素
  // 将自己的所有非插槽的子元素设置到 element.children 数组中
  // final children cleanup
  // filter out scoped slots
  element.children = element.children.filter(c => !(c: any).slotScope)
  // remove trailing whitespace node again
  trimEndingWhitespace(element)

  // check pre state
  if (element.pre) {
    inVPre = false
  }
  if (platformIsPreTag(element.tag)) {
    inPre = false
  }
  // 分别为 element 执行 model、class、style 三个模块的 postTransform 方法
  // 但是 web 平台没有提供该方法
  // apply post-transforms
  for (let i = 0; i < postTransforms.length; i++) {
    postTransforms[i](element, options)
  }
}

```

#### trimEndingWhitespace

* 删除元素中空白的文本节点

```javascript
function trimEndingWhitespace(el) {
  if (!inPre) {
    let lastNode
    while (
      (lastNode = el.children[el.children.length - 1]) &&
      lastNode.type === 3 &&
      lastNode.text === ' '
    ) {
      el.children.pop()
    }
  }
}

```

#### processIfConditions

* 处理条件数组中的情况


```javascript
function processIfConditions(el, parent) {
  // 找到 parent.children 中的最后一个元素节点
  const prev = findPrevElement(parent.children)
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    })
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      `v-${el.elseif ? ('else-if="' + el.elseif + '"') : 'else'} ` +
      `used on element <${el.tag}> without corresponding v-if.`,
      el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
    )
  }
}

```

#### findPrevElement

* 处理children中最后一个节点
  
```javascript
function findPrevElement(children: Array<any>): ASTElement | void {
  let i = children.length
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
        warn(
          `text "${children[i].text.trim()}" between v-if and v-else(-if) ` +
          `will be ignored.`,
          children[i]
        )
      }
      children.pop()
    }
  }
}

```

#### AST优化

* 也就是静态标记，深入理解编译器的静态标记过程

```javascript
/**
 * 在这之前做的所有的事情，只有一个目的，就是为了构建平台特有的编译选项（options），比如 web 平台
 * 
 * 1、将 html 模版解析成 ast
 * 2、对 ast 树进行静态标记
 * 3、将 ast 生成渲染函数
 *    静态渲染函数放到  code.staticRenderFns 数组中
 *    code.render 为动态渲染函数
 *    在将来渲染时执行渲染函数得到 vnode
 */
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 将模版解析为 AST，每个节点的 ast 对象上都设置了元素的所有信息，比如，标签信息、属性信息、插槽信息、父节点、子节点等。
  // 具体有那些属性，查看 start 和 end 这两个处理开始和结束标签的方法
  const ast = parse(template.trim(), options)
  // 优化，遍历 AST，为每个节点做静态标记
  // 标记每个节点是否为静态节点，然后进一步标记出静态根节点
  // 这样在后续更新的过程中就可以跳过这些静态节点了
  // 标记静态根，用于生成渲染函数阶段，生成静态根节点的渲染函数
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  // 从 AST 生成渲染函数，生成像这样的代码，比如：code.render = "_c('div',{attrs:{"id":"app"}},_l((arr),function(item){return _c('div',{key:item},[_v(_s(item))])}),0)"
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})

```

#### optimize（优化）


```javascript
/**
 * 优化：
 *   遍历 AST，标记每个节点是静态节点还是动态节点，然后标记静态根节点
 *   这样在后续更新的过程中就不需要再关注这些节点
 */
export function optimize(root: ?ASTElement, options: CompilerOptions) {
  if (!root) return
  /**
   * options.staticKeys = 'staticClass,staticStyle'
   * isStaticKey = function(val) { return map[val] }
   */
  isStaticKey = genStaticKeysCached(options.staticKeys || '')
  // 平台保留标签
  isPlatformReservedTag = options.isReservedTag || no
  // 遍历所有节点，给每个节点设置 static 属性，标识其是否为静态节点
  markStatic(root)
  // 进一步标记静态根，一个节点要成为静态根节点，需要具体以下条件：
  // 节点本身是静态节点，而且有子节点，而且子节点不只是一个文本节点，则标记为静态根
  // 静态根节点不能只有静态文本的子节点，因为这样收益太低，这种情况下始终更新它就好了
  markStaticRoots(root, false)
}

```

#### markStatic制作静态标记

* 递归循环标记子节点

```javascript
/**
 * 在所有节点上设置 static 属性，用来标识是否为静态节点
 * 注意：如果有子节点为动态节点，则父节点也被认为是动态节点
 * @param {*} node 
 * @returns 
 */
function markStatic(node: ASTNode) {
  // 通过 node.static 来标识节点是否为 静态节点
  node.static = isStatic(node)
  if (node.type === 1) {
    /**
     * 不要将组件的插槽内容设置为静态节点，这样可以避免：
     *   1、组件不能改变插槽节点
     *   2、静态插槽内容在热重载时失败
     */
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      // 递归终止条件，如果节点不是平台保留标签  && 也不是 slot 标签 && 也不是内联模版，则直接结束
      return
    }
    // 遍历子节点，递归调用 markStatic 来标记这些子节点的 static 属性
    for (let i = 0, l = node.children.length; i < l; i++) {
      const child = node.children[i]
      markStatic(child)
      // 如果子节点是非静态节点，则将父节点更新为非静态节点
      if (!child.static) {
        node.static = false
      }
    }
    // 如果节点存在 v-if、v-else-if、v-else 这些指令，则依次标记 block 中节点的 static
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        const block = node.ifConditions[i].block
        markStatic(block)
        if (!block.static) {
          node.static = false
        }
      }
    }
  }
}

```

#### isStatic

* 判断是否是静态节点

```javascript
/**
 * 判断节点是否为静态节点：
 *  通过自定义的 node.type 来判断，2: 表达式 => 动态，3: 文本 => 静态
 *  凡是有 v-bind、v-if、v-for 等指令的都属于动态节点
 *  组件为动态节点
 *  父节点为含有 v-for 指令的 template 标签，则为动态节点
 * @param {*} node 
 * @returns boolean
 */
function isStatic(node: ASTNode): boolean {
  if (node.type === 2) { // expression
    // 比如：{{ msg }}
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

```

#### markStaticRoots

* 进一步标记静态根节点
* 必须是静态节点
* 必须有子节点
* 子节点不只是有一个文本节点，则标记为静态根节点

```javascript
/**
 * 进一步标记静态根，一个节点要成为静态根节点，需要具体以下条件：
 * 节点本身是静态节点，而且有子节点，而且子节点不只是一个文本节点，则标记为静态根
 * 静态根节点不能只有静态文本的子节点，因为这样收益太低，这种情况下始终更新它就好了
 * 
 * @param { ASTElement } node 当前节点
 * @param { boolean } isInFor 当前节点是否被包裹在 v-for 指令所在的节点内
 */
function markStaticRoots(node: ASTNode, isInFor: boolean) {
  if (node.type === 1) {
    if (node.static || node.once) {
      // 节点是静态的 或者 节点上有 v-once 指令，标记 node.staticInFor = true or false
      node.staticInFor = isInFor
    }

    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      // 节点本身是静态节点，而且有子节点，而且子节点不只是一个文本节点，则标记为静态根 => node.staticRoot = true，否则为非静态根
      node.staticRoot = true
      return
    } else {
      node.staticRoot = false
    }
    // 当前节点不是静态根节点的时候，递归遍历其子节点，标记静态根
    if (node.children) {
      for (let i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for)
      }
    }
    // 如果节点存在 v-if、v-else-if、v-else 指令，则为 block 节点标记静态根
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        markStaticRoots(node.ifConditions[i].block, isInFor)
      }
    }
  }
}

```

#### 总结

* Vue编译器做了什么，将组件的 html 模版解析成 AST 对象，优化遍历AST对象，进一步对AST进行静态标记，标记完后进一步进行静态根节点标记，这样在后续更新的过程中就可以跳过这些静态节点了；标记静态根用于生成渲染函数阶段，生成静态根节点的渲染函数
* 从 AST 生成运行渲染函数，即大家说的 render，其实还有一个，就是 staticRenderFns 数组，里面存放了所有的静态节点的渲染函数
* 文本节点，点上没有 v-bind、v-for、v-if 等指令，非组件 这三种可以被标记为静态节点

#### 由AST生成渲染函数

```javascript
/**
 * 在这之前做的所有的事情，只有一个目的，就是为了构建平台特有的编译选项（options），比如 web 平台
 * 
 * 1、将 html 模版解析成 ast
 * 2、对 ast 树进行静态标记
 * 3、将 ast 生成渲染函数
 *    静态渲染函数放到  code.staticRenderFns 数组中
 *    code.render 为动态渲染函数
 *    在将来渲染时执行渲染函数得到 vnode
 */
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 将模版解析为 AST，每个节点的 ast 对象上都设置了元素的所有信息，比如，标签信息、属性信息、插槽信息、父节点、子节点等。
  // 具体有那些属性，查看 options.start 和 options.end 这两个处理开始和结束标签的方法
  const ast = parse(template.trim(), options)
  // 优化，遍历 AST，为每个节点做静态标记
  // 标记每个节点是否为静态节点，然后进一步标记出静态根节点
  // 这样在后续更新中就可以跳过这些静态节点了
  // 标记静态根，用于生成渲染函数阶段，生成静态根节点的渲染函数
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  // 代码生成，将 ast 转换成可执行的 render 函数的字符串形式
  // code = {
  //   render: `with(this){return ${_c(tag, data, children, normalizationType)}}`,
  //   staticRenderFns: [_c(tag, data, children, normalizationType), ...]
  // }
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})

```

#### generate渲染函数生成

* 接受AST对象和配置参数
  
```javascript
/**
 * 从 AST 生成渲染函数
 * @returns {
 *   render: `with(this){return _c(tag, data, children)}`,
 *   staticRenderFns: state.staticRenderFns
 * } 
 */
export function generate(
  ast: ASTElement | void,
  options: CompilerOptions
): CodegenResult {
  // 实例化 CodegenState 对象，生成代码的时候需要用到其中的一些东西
  const state = new CodegenState(options)
  // 生成字符串格式的代码，比如：'_c(tag, data, children, normalizationType)'
  // data 为节点上的属性组成 JSON 字符串，比如 '{ key: xx, ref: xx, ... }'
  // children 为所有子节点的字符串格式的代码组成的字符串数组，格式：
  //     `['_c(tag, data, children)', ...],normalizationType`，
  //     最后的 normalization 是 _c 的第四个参数，
  //     表示节点的规范化类型，不是重点，不需要关注
  // 当然 code 并不一定就是 _c，也有可能是其它的，比如整个组件都是静态的，则结果就为 _m(0)
  const code = ast ? genElement(ast, state) : '_c("div")'
  return {
    render: `with(this){return ${code}}`,
    staticRenderFns: state.staticRenderFns
  }
}
```

#### genElement 

```javascript
export function genElement(el: ASTElement, state: CodegenState): string {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre
  }

  if (el.staticRoot && !el.staticProcessed) {
    /**
     * 处理静态根节点，生成节点的渲染函数
     *   1、将当前静态节点的渲染函数放到 staticRenderFns 数组中
     *   2、返回一个可执行函数 _m(idx, true or '') 
     */
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    /**
     * 处理带有 v-once 指令的节点，结果会有三种：
     *   1、当前节点存在 v-if 指令，得到一个三元表达式，condition ? render1 : render2
     *   2、当前节点是一个包含在 v-for 指令内部的静态节点，得到 `_o(_c(tag, data, children), number, key)`
     *   3、当前节点就是一个单纯的 v-once 节点，得到 `_m(idx, true of '')`
     */
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    /**
     * 处理节点上的 v-for 指令  
     * 得到 `_l(exp, function(alias, iterator1, iterator2){return _c(tag, data, children)})`
     */
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    /**
     * 处理带有 v-if 指令的节点，最终得到一个三元表达式：condition ? render1 : render2
     */
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    /**
     * 当前节点不是 template 标签也不是插槽和带有 v-pre 指令的节点时走这里
     * 生成所有子节点的渲染函数，返回一个数组，格式如：
     * [_c(tag, data, children, normalizationType), ...] 
     */
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    /**
     * 生成插槽的渲染函数，得到
     * _t(slotName, children, attrs, bind)
     */
    return genSlot(el, state)
  } else {
    // component or element
    // 处理动态组件和普通元素（自定义组件、原生标签）
    let code
    if (el.component) {
      /**
       * 处理动态组件，生成动态组件的渲染函数
       * 得到 `_c(compName, data, children)`
       */
      code = genComponent(el.component, el, state)
    } else {
      // 自定义组件和原生标签走这里
      let data
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        // 非普通元素或者带有 v-pre 指令的组件走这里，处理节点的所有属性，返回一个 JSON 字符串，
        // 比如 '{ key: xx, ref: xx, ... }'
        data = genData(el, state)
      }

      // 处理子节点，得到所有子节点字符串格式的代码组成的数组，格式：
      // `['_c(tag, data, children)', ...],normalizationType`，
      // 最后的 normalization 表示节点的规范化类型，不是重点，不需要关注
      const children = el.inlineTemplate ? null : genChildren(el, state, true)
      // 得到最终的字符串格式的代码，格式：
      // '_c(tag, data, children, normalizationType)'
      code = `_c('${el.tag}'${data ? `,${data}` : '' // data
        }${children ? `,${children}` : '' // children
        })`
    }
    // 如果提供了 transformCode 方法， 
    // 则最终的 code 会经过各个模块（module）的该方法处理，
    // 不过框架没提供这个方法，不过即使处理了，最终的格式也是 _c(tag, data, children)
    // module transforms
    for (let i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code)
    }
    return code
  }
}

```

#### genChildren

* 获取子节点

```javascript
/**
 * 生成所有子节点的渲染函数，返回一个数组，格式如：
 * [_c(tag, data, children, normalizationType), ...] 
 */
export function genChildren(
  el: ASTElement,
  state: CodegenState,
  checkSkip?: boolean,
  altGenElement?: Function,
  altGenNode?: Function
): string | void {
  // 所有子节点
  const children = el.children
  if (children.length) {
    // 第一个子节点
    const el: any = children[0]
    // optimize single v-for
    if (children.length === 1 &&
      el.for &&
      el.tag !== 'template' &&
      el.tag !== 'slot'
    ) {
      // 优化，只有一个子节点 && 子节点的上有 v-for 指令 && 子节点的标签不为 template 或者 slot
      // 优化的方式是直接调用 genElement 生成该节点的渲染函数，不需要走下面的循环然后调用 genCode 最后得到渲染函数
      const normalizationType = checkSkip
        ? state.maybeComponent(el) ? `,1` : `,0`
        : ``
      return `${(altGenElement || genElement)(el, state)}${normalizationType}`
    }
    // 获取节点规范化类型，返回一个 number 0、1、2，不是重点， 不重要
    const normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0
    // 函数，生成代码的一个函数
    const gen = altGenNode || genNode
    // 返回一个数组，数组的每个元素都是一个子节点的渲染函数，
    // 格式：['_c(tag, data, children, normalizationType)', ...]
    return `[${children.map(c => gen(c, state)).join(',')}]${normalizationType ? `,${normalizationType}` : ''
      }`
  }
}

```


#### genNode

* 根据节点的类型返回不同的Node


```javascript
function genNode(node: ASTNode, state: CodegenState): string {
  if (node.type === 1) {
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}


```

#### genText

* 文本渲染函数

```javascript
export function genText(text: ASTText | ASTExpression): string {
  return `_v(${text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))
    })`
}

```

#### genComment

* 内容变成渲染函数

```javascript
export function genComment(comment: ASTText): string {
  return `_e(${JSON.stringify(comment.text)})`
}
```

#### genData

* 处理节点上的众多属性，最后生成这些属性组成的 JSON 字符串，比如 data = { key: xx, ref: xx, ... } 

```javascript
/**
 * 处理节点上的众多属性，最后生成这些属性组成的 JSON 字符串，比如 data = { key: xx, ref: xx, ... } 
 */
export function genData(el: ASTElement, state: CodegenState): string {
  // 节点的属性组成的 JSON 字符串
  let data = '{'

  // 首先先处理指令，因为指令可能在生成其它属性之前改变这些属性
  // 执行指令编译方法，比如 web 平台的 v-text、v-html、v-model，然后在 el 对象上添加相应的属性，
  // 比如 v-text： el.textContent = _s(value, dir)
  //     v-html：el.innerHTML = _s(value, dir)
  // 当指令在运行时还有任务时，比如 v-model，则返回 directives: [{ name, rawName, value, arg, modifiers }, ...}] 
  // directives first.
  // directives may mutate the el's other properties before they are generated.
  const dirs = genDirectives(el, state)
  if (dirs) data += dirs + ','

  // key，data = { key: xx }
  if (el.key) {
    data += `key:${el.key},`
  }
  // ref，data = { ref: xx }
  if (el.ref) {
    data += `ref:${el.ref},`
  }
  // 带有 ref 属性的节点在带有 v-for 指令的节点的内部， data = { refInFor: true }
  if (el.refInFor) {
    data += `refInFor:true,`
  }
  // pre，v-pre 指令，data = { pre: true }
  if (el.pre) {
    data += `pre:true,`
  }
  // 动态组件，data = { tag: 'component' }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += `tag:"${el.tag}",`
  }
  // 为节点执行模块(class、style)的 genData 方法，
  // 得到 data = { staticClass: xx, class: xx, staticStyle: xx, style: xx }
  // module data generation functions
  for (let i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el)
  }
  // 其它属性，得到 data = { attrs: 静态属性字符串 } 或者 
  // data = { attrs: '_d(静态属性字符串, 动态属性字符串)' }
  // attributes
  if (el.attrs) {
    data += `attrs:${genProps(el.attrs)},`
  }
  // DOM props，结果同 el.attrs
  if (el.props) {
    data += `domProps:${genProps(el.props)},`
  }
  // 自定义事件，data = { `on${eventName}:handleCode` } 或者 { `on_d(${eventName}:handleCode`, `${eventName},handleCode`) }
  // event handlers
  if (el.events) {
    data += `${genHandlers(el.events, false)},`
  }
  // 带 .native 修饰符的事件，
  // data = { `nativeOn${eventName}:handleCode` } 或者 { `nativeOn_d(${eventName}:handleCode`, `${eventName},handleCode`) }
  if (el.nativeEvents) {
    data += `${genHandlers(el.nativeEvents, true)},`
  }
  // 非作用域插槽，得到 data = { slot: slotName }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += `slot:${el.slotTarget},`
  }
  // scoped slots，作用域插槽，data = { scopedSlots: '_u(xxx)' }
  if (el.scopedSlots) {
    data += `${genScopedSlots(el, el.scopedSlots, state)},`
  }
  // 处理 v-model 属性，得到
  // data = { model: { value, callback, expression } }
  // component v-model
  if (el.model) {
    data += `model:{value:${el.model.value
      },callback:${el.model.callback
      },expression:${el.model.expression
      }},`
  }
  // inline-template，处理内联模版，得到
  // data = { inlineTemplate: { render: function() { render 函数 }, staticRenderFns: [ function() {}, ... ] } }
  if (el.inlineTemplate) {
    const inlineTemplate = genInlineTemplate(el, state)
    if (inlineTemplate) {
      data += `${inlineTemplate},`
    }
  }
  // 删掉 JSON 字符串最后的 逗号，然后加上闭合括号 }
  data = data.replace(/,$/, '') + '}'
  // v-bind dynamic argument wrap
  // v-bind with dynamic arguments must be applied using the same v-bind object
  // merge helper so that class/style/mustUseProp attrs are handled correctly.
  if (el.dynamicAttrs) {
    // 存在动态属性，data = `_b(data, tag, 静态属性字符串或者_d(静态属性字符串, 动态属性字符串))`
    data = `_b(${data},"${el.tag}",${genProps(el.dynamicAttrs)})`
  }
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data)
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data)
  }
  return data
}
```

#### genDirectives运行指令的编译原理

```javascript
/**
 * 运行指令的编译方法，如果指令存在运行时任务，则返回 directives: [{ name, rawName, value, arg, modifiers }, ...}] 
 */
function genDirectives(el: ASTElement, state: CodegenState): string | void {
  // 获取指令数组
  const dirs = el.directives
  // 没有指令则直接结束
  if (!dirs) return
  // 指令的处理结果
  let res = 'directives:['
  // 标记，用于标记指令是否需要在运行时完成的任务，比如 v-model 的 input 事件
  let hasRuntime = false
  let i, l, dir, needRuntime
  // 遍历指令数组
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i]
    needRuntime = true
    // 获取节点当前指令的处理方法，比如 web 平台的 v-html、v-text、v-model
    const gen: DirectiveFunction = state.directives[dir.name]
    if (gen) {
      // 执行指令的编译方法，如果指令还需要运行时完成一部分任务，则返回 true，比如 v-model
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn)
    }
    if (needRuntime) {
      // 表示该指令在运行时还有任务
      hasRuntime = true
      // res = directives:[{ name, rawName, value, arg, modifiers }, ...]
      res += `{name:"${dir.name}",rawName:"${dir.rawName}"${dir.value ? `,value:(${dir.value}),expression:${JSON.stringify(dir.value)}` : ''
        }${dir.arg ? `,arg:${dir.isDynamicArg ? dir.arg : `"${dir.arg}"`}` : ''
        }${dir.modifiers ? `,modifiers:${JSON.stringify(dir.modifiers)}` : ''
        }},`
    }
  }
  if (hasRuntime) {
    // 也就是说，只有指令存在运行时任务时，才会返回 res
    return res.slice(0, -1) + ']'
  }
}

```


#### genProps

* 遍历属性数组

```javascript
/**
 * 遍历属性数组 props，得到所有属性组成的字符串
 * 如果不存在动态属性，则返回：
 *   'attrName,attrVal,...'
 * 如果存在动态属性，则返回：
 *   '_d(静态属性字符串, 动态属性字符串)' 
 */
function genProps(props: Array<ASTAttr>): string {
  // 静态属性
  let staticProps = ``
  // 动态属性
  let dynamicProps = ``
  // 遍历属性数组
  for (let i = 0; i < props.length; i++) {
    // 属性
    const prop = props[i]
    // 属性值
    const value = __WEEX__
      ? generateValue(prop.value)
      : transformSpecialNewlines(prop.value)
    if (prop.dynamic) {
      // 动态属性，`dAttrName,dAttrVal,...`
      dynamicProps += `${prop.name},${value},`
    } else {
      // 静态属性，'attrName,attrVal,...'
      staticProps += `"${prop.name}":${value},`
    }
  }
  // 去掉静态属性最后的逗号
  staticProps = `{${staticProps.slice(0, -1)}}`
  if (dynamicProps) {
    // 如果存在动态属性则返回：
    // _d(静态属性字符串，动态属性字符串)
    return `_d(${staticProps},[${dynamicProps.slice(0, -1)}])`
  } else {
    // 说明属性数组中不存在动态属性，直接返回静态属性字符串
    return staticProps
  }
}

```

#### genHandlers

* 处理事件

```javascript
 export function genHandlers (
  events: ASTElementHandlers,
  isNative: boolean
): string {
  // 原生：nativeOn，否则为 on
  const prefix = isNative ? 'nativeOn:' : 'on:'
  // 静态
  let staticHandlers = ``
  // 动态
  let dynamicHandlers = ``
  // 遍历 events 数组
  // events = [{ name: { value: 回调函数名, ... } }]
  for (const name in events) {
    // 获取指定事件的回调函数名，即 this.methodName 或者 [this.methodName1, ...]
    const handlerCode = genHandler(events[name])
    if (events[name] && events[name].dynamic) {
      // 动态，dynamicHandles = `eventName,handleCode,...,`
      dynamicHandlers += `${name},${handlerCode},`
    } else {
      // 静态，staticHandles = `"eventName":handleCode,`
      staticHandlers += `"${name}":${handlerCode},`
    }
  }
  // 去掉末尾的逗号
  staticHandlers = `{${staticHandlers.slice(0, -1)}}`
  if (dynamicHandlers) {
    // 动态，on_d(statickHandles, [dynamicHandlers])
    return prefix + `_d(${staticHandlers},[${dynamicHandlers.slice(0, -1)}])`
  } else {
    // 静态，`on${staticHandlers}`
    return prefix + staticHandlers
  }
}

```

#### genStatic

* 静态节点的渲染函数

```javascript
/**
 * 生成静态节点的渲染函数
 *   1、将当前静态节点的渲染函数放到 staticRenderFns 数组中
 *   2、返回一个可执行函数 _m(idx, true or '') 
 */
// hoist static sub-trees out
function genStatic(el: ASTElement, state: CodegenState): string {
  // 标记当前静态节点已经被处理过了
  el.staticProcessed = true
  // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.
  const originalPreState = state.pre
  if (el.pre) {
    state.pre = el.pre
  }
  // 将静态根节点的渲染函数 push 到 staticRenderFns 数组中，比如：
  // [`with(this){return _c(tag, data, children)}`]
  state.staticRenderFns.push(`with(this){return ${genElement(el, state)}}`)
  state.pre = originalPreState
  // 返回一个可执行函数：_m(idx, true or '')
  // idx = 当前静态节点的渲染函数在 staticRenderFns 数组中下标
  return `_m(${state.staticRenderFns.length - 1
    }${el.staticInFor ? ',true' : ''
    })`
}

```

#### genOnce

* v-once修饰符的渲染函数

```javascript
/**
 * 处理带有 v-once 指令的节点，结果会有三种：
 *   1、当前节点存在 v-if 指令，得到一个三元表达式，condition ? render1 : render2
 *   2、当前节点是一个包含在 v-for 指令内部的静态节点，得到 `_o(_c(tag, data, children), number, key)`
 *   3、当前节点就是一个单纯的 v-once 节点，得到 `_m(idx, true of '')`
 */
function genOnce(el: ASTElement, state: CodegenState): string {
  // 标记当前节点的 v-once 指令已经被处理过了
  el.onceProcessed = true
  if (el.if && !el.ifProcessed) {
    // 如果含有 v-if 指令 && if 指令没有被处理过，则走这里
    // 处理带有 v-if 指令的节点，最终得到一个三元表达式，condition ? render1 : render2 
    return genIf(el, state)
  } else if (el.staticInFor) {
    // 说明当前节点是被包裹在还有 v-for 指令节点内部的静态节点
    // 获取 v-for 指令的 key
    let key = ''
    let parent = el.parent
    while (parent) {
      if (parent.for) {
        key = parent.key
        break
      }
      parent = parent.parent
    }
    // key 不存在则给出提示，v-once 节点只能用于带有 key 的 v-for 节点内部
    if (!key) {
      process.env.NODE_ENV !== 'production' && state.warn(
        `v-once can only be used inside v-for that is keyed. `,
        el.rawAttrsMap['v-once']
      )
      return genElement(el, state)
    }
    // 生成 `_o(_c(tag, data, children), number, key)`
    return `_o(${genElement(el, state)},${state.onceId++},${key})`
  } else {
    // 上面几种情况都不符合，说明就是一个简单的静态节点，和处理静态根节点时的操作一样,
    // 得到 _m(idx, true or '')
    return genStatic(el, state)
  }
}

```

#### genFor

* 处理v-for指令的函数

```javascript

/**
 * 处理节点上的 v-for 指令  
 * 得到 `_l(exp, function(alias, iterator1, iterator2){return _c(tag, data, children)})`
 */
export function genFor(
  el: any,
  state: CodegenState,
  altGen?: Function,
  altHelper?: string
): string {
  // v-for 的迭代器，比如 一个数组
  const exp = el.for
  // 迭代时的别名
  const alias = el.alias
  // iterator 为 v-for = "(item ,idx) in obj" 时会有，比如 iterator1 = idx
  const iterator1 = el.iterator1 ? `,${el.iterator1}` : ''
  const iterator2 = el.iterator2 ? `,${el.iterator2}` : ''

  // 提示，v-for 指令在组件上时必须使用 key
  if (process.env.NODE_ENV !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      `<${el.tag} v-for="${alias} in ${exp}">: component lists rendered with ` +
      `v-for should have explicit keys. ` +
      `See https://vuejs.org/guide/list.html#key for more info.`,
      el.rawAttrsMap['v-for'],
      true /* tip */
    )
  }

  // 标记当前节点上的 v-for 指令已经被处理过了
  el.forProcessed = true // avoid r
  // 得到 `_l(exp, function(alias, iterator1, iterator2){return _c(tag, data, children)})`
  return `${altHelper || '_l'}((${exp}),` +
    `function(${alias}${iterator1}${iterator2}){` +
    `return ${(altGen || genElement)(el, state)}` +
    '})'
}

```

#### genIf

* v-if修饰符

```javascript

/**
 * 处理带有 v-if 指令的节点，最终得到一个三元表达式，condition ? render1 : render2 
 */
export function genIf(
  el: any,
  state: CodegenState,
  altGen?: Function,
  altEmpty?: string
): string {
  // 标记当前节点的 v-if 指令已经被处理过了，避免无效的递归
  el.ifProcessed = true // avoid recursion
  // 得到三元表达式，condition ? render1 : render2
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions(
  conditions: ASTIfConditions,
  state: CodegenState,
  altGen?: Function,
  altEmpty?: string
): string {
  // 长度若为空，则直接返回一个空节点渲染函数
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  // 从 conditions 数组中拿出第一个条件对象 { exp, block }
  const condition = conditions.shift()
  // 返回结果是一个三元表达式字符串，condition ? 渲染函数1 : 渲染函数2
  if (condition.exp) {
    // 如果 condition.exp 条件成立，则得到一个三元表达式，
    // 如果条件不成立，则通过递归的方式找 conditions 数组中下一个元素，
    // 直到找到条件成立的元素，然后返回一个三元表达式
    return `(${condition.exp})?${genTernaryExp(condition.block)
      }:${genIfConditions(conditions, state, altGen, altEmpty)
      }`
  } else {
    return `${genTernaryExp(condition.block)}`
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp(el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

```

#### genSlot

* 渲染处理的插槽函数

```javascript
/**
 * 生成插槽的渲染函数，得到
 * _t(slotName, children, attrs, bind)
 */
function genSlot(el: ASTElement, state: CodegenState): string {
  // 插槽名称
  const slotName = el.slotName || '"default"'
  // 生成所有的子节点
  const children = genChildren(el, state)
  // 结果字符串，_t(slotName, children, attrs, bind)
  let res = `_t(${slotName}${children ? `,${children}` : ''}`
  const attrs = el.attrs || el.dynamicAttrs
    ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(attr => ({
      // slot props are camelized
      name: camelize(attr.name),
      value: attr.value,
      dynamic: attr.dynamic
    })))
    : null
  const bind = el.attrsMap['v-bind']
  if ((attrs || bind) && !children) {
    res += `,null`
  }
  if (attrs) {
    res += `,${attrs}`
  }
  if (bind) {
    res += `${attrs ? '' : ',null'},${bind}`
  }
  return res + ')'
}

```

#### genComponent

* 组件渲染

```javascript

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
/**
 * 生成动态组件的渲染函数
 * 返回 `_c(compName, data, children)`
 */
function genComponent(
  componentName: string,
  el: ASTElement,
  state: CodegenState
): string {
  // 所有的子节点
  const children = el.inlineTemplate ? null : genChildren(el, state, true)
  // 返回 `_c(compName, data, children)`
  // compName 是 is 属性的值
  return `_c(${componentName},${genData(el, state)}${children ? `,${children}` : ''
    })`
}

```

#### Vue编译器的作用

* 将Html模板解析成AST对象，对AST对象进行分析，优化，遍历AST对象，进行静态标记，进行静态标记的同时标记静态根节点，这样有方便于在后面更新过程中跳过这个过程。标记静态节点有助于生成渲染函数
* 从AST生成可运行的渲染函数，即render，就是 staticRenderFns 数组，里面存放了所有的静态节点的渲染函数

#### Vue的渲染函数生成过程

* 第一类就是一个 render 函数，负责生成动态节点的 vnode
* 第二类是放在一个叫 staticRenderFns 数组中的静态渲染函数，这些函数负责生成静态节点的 vnode
* 生成渲染函数的过程就是遍历AST的过程，然后在遍历过程对修饰符，事件进行处理，通过递归的方式，处理每个节点
* AST节点的静态节点的处理过程：1.将生成静态节点 vnode 函数放到 staticRenderFns 数组中，2：返回一个 _m(idx) 的可执行函数，意思是执行 staticRenderFns 数组中下标为 idx 的函数，生成静态节点的 vnode，根据索引执行生成静态节点函数
* v-once、v-if、v-for、组件 等都是怎么处理的，Vue修饰符的处理方式1.单纯的 v-once 节点处理方式和静态节点一致，2.v-if是一个三元表达式 condition?true:false,3.v-for 节点的处理结果是可执行的函数，该函数负责生成 v-for 节点的 vnode,4.组件的处理结果和普通元素一样，得到的是形如 _c(compName) 的可执行代码，生成组件的 vnode

#### 数据响应式的更新的执行过程

* 响应式拦截到数据更新
* dep通过watcher进行异步更新
* wathcer调用run更新后执行updateComponent方法更新
* 执行 vm._render 生成组件的 vnode，这时就会执行编译器生成的函数

#### renderHelp函数

* 渲染函数之所以能生成 vnode 是通过其中的 _c、_l、、_v、_s 等方法实现的。比如：
* 普通节点被编译成可执行函数_c
* v-for节点被编译成可执行函数_l


```javascript
/**
 * 在实例上挂载简写的渲染工具函数，这些都是运行时代码
 * 这些工具函数在编译器生成的渲染函数中被使用到了
 * @param {*} target Vue 实例
 */
export function installRenderHelpers(target: any) {
  /**
   * v-once 指令的运行时帮助程序，为 VNode 加上打上静态标记
   * 有点多余，因为含有 v-once 指令的节点都被当作静态节点处理了，所以也不会走这儿
   */
  target._o = markOnce
  // 将值转换为数字
  target._n = toNumber
  /**
   * 将值转换为字符串形式，普通值 => String(val)，对象 => JSON.stringify(val)
   */
  target._s = toString
  /**
   * 运行时渲染 v-for 列表的帮助函数，循环遍历 val 值，依次为每一项执行 render 方法生成 VNode，最终返回一个 VNode 数组
   */
  target._l = renderList
  target._t = renderSlot
  /**
   * 判断两个值是否相等
   */
  target._q = looseEqual
  /**
   * 相当于 indexOf 方法
   */
  target._i = looseIndexOf
  /**
   * 运行时负责生成静态树的 VNode 的帮助程序，完成了以下两件事
   *   1、执行 staticRenderFns 数组中指定下标的渲染函数，生成静态树的 VNode 并缓存，下次在渲染时从缓存中直接读取（isInFor 必须为 true）
   *   2、为静态树的 VNode 打静态标记
   */
  target._m = renderStatic
  target._f = resolveFilter
  target._k = checkKeyCodes
  target._b = bindObjectProps
  /**
   * 为文本节点创建 VNode
   */
  target._v = createTextVNode
  /**
   * 为空节点创建 VNode
   */
  target._e = createEmptyVNode
}
```

* 根据不同的作用定义不同生成函数

#### _o = markOnce

* v-once的处理方式

```javascript
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 * v-once 指令的运行时帮助程序，为 VNode 加上打上静态标记
 * 有点多余，因为含有 v-once 指令的节点都被当作静态节点处理了，所以也不会走这儿
 */
export function markOnce (
  tree: VNode | Array<VNode>,
  index: number,
  key: string
) {
  markStatic(tree, `__once__${index}${key ? `_${key}` : ``}`, true)
  return tree
}

```

#### markStatic

* 添加静态标记属性

```javascript
/**
 * 为 VNode 打静态标记，在 VNode 上添加三个属性：
 * { isStatick: true, key: xx, isOnce: true or false } 
 */
function markStatic (
  tree: VNode | Array<VNode>,
  key: string,
  isOnce: boolean
) {
  if (Array.isArray(tree)) {
    // tree 为 VNode 数组，循环遍历其中的每个 VNode，为每个 VNode 做静态标记
    for (let i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], `${key}_${i}`, isOnce)
      }
    }
  } else {
    markStaticNode(tree, key, isOnce)
  }
}

```

#### markStaticNode

* 标记静态节点

```javascript
/**
 * 标记静态 VNode
 */
function markStaticNode (node, key, isOnce) {
  node.isStatic = true
  node.key = key
  node.isOnce = isOnce
}

```

#### _l = renderList

* v-for渲染函数
* 循环val值，然后得到一个渲染函数的vNode的值

```javascript
/**
 * Runtime helper for rendering v-for lists.
 * 运行时渲染 v-for 列表的帮助函数，循环遍历 val 值，依次为每一项执行 render 方法生成 VNode，最终返回一个 VNode 数组
 */
export function renderList (
  val: any,
  render: (
    val: any,
    keyOrIndex: string | number,
    index?: number
  ) => VNode
): ?Array<VNode> {
  let ret: ?Array<VNode>, i, l, keys, key
  if (Array.isArray(val) || typeof val === 'string') {
    // val 为数组或者字符串
    ret = new Array(val.length)
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i)
    }
  } else if (typeof val === 'number') {
    // val 为一个数值，则遍历 0 - val 的所有数字
    ret = new Array(val)
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i)
    }
  } else if (isObject(val)) {
    // val 为一个对象，遍历对象
    if (hasSymbol && val[Symbol.iterator]) {
      // val 为一个可迭代对象
      ret = []
      const iterator: Iterator<any> = val[Symbol.iterator]()
      let result = iterator.next()
      while (!result.done) {
        ret.push(render(result.value, ret.length))
        result = iterator.next()
      }
    } else {
      // val 为一个普通对象
      keys = Object.keys(val)
      ret = new Array(keys.length)
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i]
        ret[i] = render(val[key], key, i)
      }
    }
  }
  if (!isDef(ret)) {
    ret = []
  }
  // 返回 VNode 数组
  (ret: any)._isVList = true
  return ret
}

```

#### _m = renderStatic

* 执行 staticRenderFns 数组中指定下标的渲染函数，生成静态树的 VNode 并缓存，下次在渲染时从缓存中直接读取（isInFor 必须为 true）
* 为静态树的 VNode 打静态标记

```javascript
/**
 * Runtime helper for rendering static trees.
 * 运行时负责生成静态树的 VNode 的帮助程序，完成了以下两件事
 *   1、执行 staticRenderFns 数组中指定下标的渲染函数，生成静态树的 VNode 并缓存，下次在渲染时从缓存中直接读取（isInFor 必须为 true）
 *   2、为静态树的 VNode 打静态标记
 * @param { number} index 表示当前静态节点的渲染函数在 staticRenderFns 数组中的下标索引
 * @param { boolean} isInFor 表示当前静态节点是否被包裹在含有 v-for 指令的节点内部
 */
 export function renderStatic (
  index: number,
  isInFor: boolean
): VNode | Array<VNode> {
  // 缓存，静态节点第二次被渲染时就从缓存中直接获取已缓存的 VNode
  const cached = this._staticTrees || (this._staticTrees = [])
  let tree = cached[index]
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  // 如果当前静态树已经被渲染过一次（即有缓存）而且没有被包裹在 v-for 指令所在节点的内部，则直接返回缓存的 VNode
  if (tree && !isInFor) {
    return tree
  }
  // 执行 staticRenderFns 数组中指定元素（静态树的渲染函数）生成该静态树的 VNode，并缓存
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  )
  // 静态标记，为静态树的 VNode 打标记，即添加 { isStatic: true, key: `__static__${index}`, isOnce: false }
  markStatic(tree, `__static__${index}`, false)
  return tree
}

```

#### _c

* 一个创建createElement的柯里化方法

```javascript
/**
 * 定义 _c，它是 createElement 的一个柯里化方法
 * @param {*} a 标签名
 * @param {*} b 属性的 JSON 字符串
 * @param {*} c 子节点数组
 * @param {*} d 节点的规范化类型
 * @returns VNode or Array<VNode>
 */
vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
```

#### createElement

* 创建Vnode的方法

```javascript
/**
 * 生成组件或普通标签的 vnode，一个包装函数，不用管
 * wrapper function for providing a more flexible interface
 * without getting yelled at by flow
 */
export function createElement(
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
): VNode | Array<VNode> {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE
  }
  // 执行 _createElement 方法创建组件的 VNode
  return _createElement(context, tag, data, children, normalizationType)
}

```

#### _createElement

* 平台保留标签未知元素执行new Vnode生成vnode
* 组件执行createComponent生成vnode
* 函数式组件执行自己的render函数生成Vnode
* 普通组件实例化一个vnode，并在其data.hoook对象上设置4个方法,在组件的patch阶段会被调用，从而进入子组件的实例化，在挂载阶段，直至完成渲染


```javascript
/**
 * 生成 vnode，
 *   1、平台保留标签和未知元素执行 new Vnode() 生成 vnode
 *   2、组件执行 createComponent 生成 vnode
 *     2.1 函数式组件执行自己的 render 函数生成 VNode
 *     2.2 普通组件则实例化一个 VNode，并且在其 data.hook 对象上设置 4 个方法，在组件的 patch 阶段会被调用，
 *         从而进入子组件的实例化、挂载阶段，直至完成渲染
 * @param {*} context 上下文
 * @param {*} tag 标签
 * @param {*} data 属性 JSON 字符串
 * @param {*} children 子节点数组
 * @param {*} normalizationType 节点规范化类型
 * @returns VNode or Array<VNode>
 */
export function _createElement(
  context: Component,
  tag?: string | Class<Component> | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
): VNode | Array<VNode> {
  if (isDef(data) && isDef((data: any).__ob__)) {
    // 属性不能是一个响应式对象
    process.env.NODE_ENV !== 'production' && warn(
      `Avoid using observed data object as vnode data: ${JSON.stringify(data)}\n` +
      'Always create fresh vnode data objects in each render!',
      context
    )
    // 如果属性是一个响应式对象，则返回一个空节点的 VNode
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is
  }
  if (!tag) {
    // 动态组件的 is 属性是一个假值时 tag 为 false，则返回一个空节点的 VNode
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // 检测唯一键 key，只能是字符串或者数字
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    if (!__WEEX__ || !('@binding' in data.key)) {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      )
    }
  }

  // 子节点数组中只有一个函数时，将它当作默认插槽，然后清空子节点列表
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {}
    data.scopedSlots = { default: children[0] }
    children.length = 0
  }
  // 将子元素进行标准化处理
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children)
  }

   /**
   * 这里开始才是重点，前面的都不需要关注，基本上是一些异常处理或者优化等
   */

  let vnode, ns
  if (typeof tag === 'string') {
    // 标签是字符串时，该标签有三种可能：
    //   1、平台保留标签
    //   2、自定义组件
    //   3、不知名标签
    let Ctor
    // 命名空间
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
    if (config.isReservedTag(tag)) {
      // tag 是平台原生标签
      // platform built-in elements
      if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.nativeOn)) {
        // v-on 指令的 .native 只在组件上生效
        warn(
          `The .native modifier for v-on is only valid on components but it was used on <${tag}>.`,
          context
        )
      }
      // 实例化一个 VNode
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      )
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // tag 是一个自定义组件
      // 在 this.$options.components 对象中找到指定标签名称的组件构造函数
      // 创建组件的 VNode，函数式组件直接执行其 render 函数生成 VNode，
      // 普通组件则实例化一个 VNode，并且在其 data.hook 对象上设置了 4 个方法，在组件的 patch 阶段会被调用，
      // 从而进入子组件的实例化、挂载阶段，直至完成渲染
      // component
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      // 不知名的一个标签，但也生成 VNode，因为考虑到在运行时可能会给一个合适的名字空间
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      )
    }
  } else {
     // tag 为非字符串，比如可能是一个组件的配置对象或者是一个组件的构造函数
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children)
  }
  // 返回组件的 VNode
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) applyNS(vnode, ns)
    if (isDef(data)) registerDeepBindings(data)
    return vnode
  } else {
    return createEmptyVNode()
  }
}


```

#### createComponent组件创建方法

* 函数式组件是根据render方法生成组件的vnode
* 普通组件通过new Vnode生成vnode，但是普通组件有会在data.hook上设置4个钩子函数 init prepatch insert destroy 在patch阶段会调用，比如init方法，调用时会进入实例创建挂载阶段，直到渲染完成

```javascript
/**
 * 创建组件的 VNode，
 *   1、函数式组件通过执行其 render 方法生成组件的 VNode
 *   2、普通组件通过 new VNode() 生成其 VNode，但是普通组件有一个重要操作是在 data.hook 对象上设置了四个钩子函数，
 *      分别是 init、prepatch、insert、destroy，在组件的 patch 阶段会被调用，
 *      比如 init 方法，调用时会进入子组件实例的创建挂载阶段，直到完成渲染
 * @param {*} Ctor 组件构造函数
 * @param {*} data 属性组成的 JSON 字符串
 * @param {*} context 上下文
 * @param {*} children 子节点数组
 * @param {*} tag 标签名
 * @returns VNode or Array<VNode>
 */
export function createComponent(
  Ctor: Class<Component> | Function | Object | void,
  data: ?VNodeData,
  context: Component,
  children: ?Array<VNode>,
  tag?: string
): VNode | Array<VNode> | void {
  // 组件构造函数不存在，直接结束
  if (isUndef(Ctor)) {
    return
  }

  // Vue.extend
  const baseCtor = context.$options._base

  // 当 Ctor 为配置对象时，通过 Vue.extend 将其转为构造函数
  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor)
  }

  // 如果到这个为止，Ctor 仍然不是一个函数，则表示这是一个无效的组件定义
  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(`Invalid Component definition: ${String(Ctor)}`, context)
    }
    return
  }

  // 异步组件
  // async component
  let asyncFactory
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor)
    if (Ctor === undefined) {
      // 为异步组件返回一个占位符节点，组件被渲染为注释节点，但保留了节点的所有原始信息，这些信息将用于异步服务器渲染 和 hydration
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  // 节点的属性 JSON 字符串
  data = data || {}

  // 这里其实就是组件做选项合并的地方，即编译器将组件编译为渲染函数，渲染时执行 render 函数，然后执行其中的 _c，就会走到这里了
  // 解析构造函数选项，并合基类选项，以防止在组件构造函数创建后应用全局混入
  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor)

  // 将组件的 v-model 的信息（值和回调）转换为 data.attrs 对象的属性、值和 data.on 对象上的事件、回调
  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data)
  }

  // 提取 props 数据，得到 propsData 对象，propsData[key] = val
  // 以组件 props 配置中的属性为 key，父组件中对应的数据为 value
  // extract props
  const propsData = extractPropsFromVNodeData(data, Ctor, tag)

  // 函数式组件
  // functional component
  if (isTrue(Ctor.options.functional)) {
    /**
     * 执行函数式组件的 render 函数生成组件的 VNode，做了以下 3 件事：
     *   1、设置组件的 props 对象
     *   2、设置函数式组件的渲染上下文，传递给函数式组件的 render 函数
     *   3、调用函数式组件的 render 函数生成 vnode
     */
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // 获取事件监听器对象 data.on，因为这些监听器需要作为子组件监听器处理，而不是 DOM 监听器
  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  const listeners = data.on
  // 将带有 .native 修饰符的事件对象赋值给 data.on
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn

  if (isTrue(Ctor.options.abstract)) {
    // 如果是抽象组件，则值保留 props、listeners 和 slot
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    const slot = data.slot
    data = {}
    if (slot) {
      data.slot = slot
    }
  }

  /**
   * 在组件的 data 对象上设置 hook 对象，
   * hook 对象增加四个属性，init、prepatch、insert、destroy，
   * 负责组件的创建、更新、销毁，这些方法在组件的 patch 阶段会被调用
   * install component management hooks onto the placeholder node
   */
  installComponentHooks(data)

  const name = Ctor.options.name || tag
  // 实例化组件的 VNode，对于普通组件的标签名会比较特殊，vue-component-${cid}-${name}
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  )

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  if (__WEEX__ && isRecyclableComponent(vnode)) {
    return renderRecyclableComponentTemplate(vnode)
  }

  return vnode
}

```

#### resolveConstructorOptions

* 解析构造函数上的配置项

```javascript
export function resolveConstructorOptions (Ctor: Class<Component>) {
  // 从实例构造函数上获取选项
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    // 缓存
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // 说明基类的配置项发生了更改
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      // 找到更改的选项
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        // 将更改的选项和 extend 选项合并
        extend(Ctor.extendOptions, modifiedOptions)
      }
      // 将新的选项赋值给 options
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}

```

#### resolveModifiedOptions

* 解析构造函数被修改或新增的配置项

```javascript
/**
 * 解析构造函数选项中后续被修改或者增加的选项
 */
function resolveModifiedOptions (Ctor: Class<Component>): ?Object {
  let modified
  // 构造函数选项
  const latest = Ctor.options
  // 密封的构造函数选项，备份
  const sealed = Ctor.sealedOptions
  // 对比两个选项，记录不一致的选项
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = latest[key]
    }
  }
  return modified
}

```


#### transformModel

* 将组件的v-model的信息转换成data.attrs对象属性，值和data.on上的事件，回调

```javascript
/**
 * 将组件的 v-model 的信息（值和回调）转换为 data.attrs 对象的属性、值和 data.on 对象上的事件、回调
 * transform component v-model info (value and callback) into
 * prop and event handler respectively.
 */
function transformModel(options, data: any) {
  // model 的属性和事件，默认为 value 和 input
  const prop = (options.model && options.model.prop) || 'value'
  const event = (options.model && options.model.event) || 'input'
    // 在 data.attrs 对象上存储 v-model 的值
    ; (data.attrs || (data.attrs = {}))[prop] = data.model.value
  // 在 data.on 对象上存储 v-model 的事件
  const on = data.on || (data.on = {})
  // 已存在的事件回调函数
  const existing = on[event]
  // v-model 中事件对应的回调函数
  const callback = data.model.callback
  // 合并回调函数
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing)
    }
  } else {
    on[event] = callback
  }
}

```

#### extractPropsFromVNodeData(提取Vnode的data属性中的props)

* 提取 props，得到 res[key] = val 

```javascript
/**
 * <comp :msg="hello vue"></comp>
 * 
 * 提取 props，得到 res[key] = val 
 * 
 * 以 props 配置中的属性为 key，父组件中对应的的数据为 value
 * 当父组件中数据更新时，触发响应式更新，重新执行 render，生成新的 vnode，又走到这里
 * 这样子组件中相应的数据就会被更新 
 */
export function extractPropsFromVNodeData (
  data: VNodeData, // { msg: 'hello vue' }
  Ctor: Class<Component>, // 组件构造函数
  tag?: string // 组件标签名
): ?Object {
  // 组件的 props 选项，{ props: { msg: { type: String, default: xx } } }
  
  // 这里只提取原始值，验证和默认值在子组件中处理
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  const propOptions = Ctor.options.props
  if (isUndef(propOptions)) {
    // 未定义 props 直接返回
    return
  }
  // 以组件 props 配置中的属性为 key，父组件传递下来的值为 value
  // 当父组件中数据更新时，触发响应式更新，重新执行 render，生成新的 vnode，又走到这里
  // 这样子组件中相应的数据就会被更新
  const res = {}
  const { attrs, props } = data
  if (isDef(attrs) || isDef(props)) {
    // 遍历 propsOptions
    for (const key in propOptions) {
      // 将小驼峰形式的 key 转换为 连字符 形式
      const altKey = hyphenate(key)
      // 提示，如果声明的 props 为小驼峰形式（testProps），但由于 html 不区分大小写，所以在 html 模版中应该使用 test-props 代替 testProps
      if (process.env.NODE_ENV !== 'production') {
        const keyInLowerCase = key.toLowerCase()
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            `Prop "${keyInLowerCase}" is passed to component ` +
            `${formatComponentName(tag || Ctor)}, but the declared prop name is` +
            ` "${key}". ` +
            `Note that HTML attributes are case-insensitive and camelCased ` +
            `props need to use their kebab-case equivalents when using in-DOM ` +
            `templates. You should probably use "${altKey}" instead of "${key}".`
          )
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false)
    }
  }
  return res
}
```

#### checkProp

* 提取prop后检查

```javascript
/**
 * 得到 res[key] = val
 */
function checkProp (
  res: Object,
  hash: ?Object,
  key: string,
  altKey: string,
  preserve: boolean
): boolean {
  if (isDef(hash)) {
    // 判断 hash（props/attrs）对象中是否存在 key 或 altKey
    // 存在则设置给 res => res[key] = hash[key]
    if (hasOwn(hash, key)) {
      res[key] = hash[key]
      if (!preserve) {
        delete hash[key]
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey]
      if (!preserve) {
        delete hash[altKey]
      }
      return true
    }
  }
  return false
}

```

#### createFunctionalComponent(创建函数组件)

* 执行函数式组件的render函数生成了vnode
* 设置组件的props
* 设置函数式组件的渲染上下文，传递给函数式组件的render函数
* 调用函数式组件的render函数生成vnode

```javascript
installRenderHelpers(FunctionalRenderContext.prototype)

/**
 * 执行函数式组件的 render 函数生成组件的 VNode，做了以下 3 件事：
 *   1、设置组件的 props 对象
 *   2、设置函数式组件的渲染上下文，传递给函数式组件的 render 函数
 *   3、调用函数式组件的 render 函数生成 vnode
 * 
 * @param {*} Ctor 组件的构造函数 
 * @param {*} propsData 额外的 props 对象
 * @param {*} data 节点属性组成的 JSON 字符串
 * @param {*} contextVm 上下文
 * @param {*} children 子节点数组
 * @returns Vnode or Array<VNode>
 */
export function createFunctionalComponent (
  Ctor: Class<Component>,
  propsData: ?Object,
  data: VNodeData,
  contextVm: Component,
  children: ?Array<VNode>
): VNode | Array<VNode> | void {
  // 组件配置项
  const options = Ctor.options
  // 获取 props 对象
  const props = {}
  // 组件本身的 props 选项
  const propOptions = options.props
  // 设置函数式组件的 props 对象
  if (isDef(propOptions)) {
    // 说明该函数式组件本身提供了 props 选项，则将 props.key 的值设置为组件上传递下来的对应 key 的值
    for (const key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject)
    }
  } else {
    // 当前函数式组件没有提供 props 选项，则将组件上的 attribute 自动解析为 props
    if (isDef(data.attrs)) mergeProps(props, data.attrs)
    if (isDef(data.props)) mergeProps(props, data.props)
  }

  // 实例化函数式组件的渲染上下文
  const renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  )

  // 调用 render 函数，生成 vnode，并给 render 函数传递 _c 和 渲染上下文
  const vnode = options.render.call(null, renderContext._c, renderContext)

  // 在最后生成的 VNode 对象上加一些标记，表示该 VNode 是一个函数式组件生成的，最后返回 VNode
  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    const vnodes = normalizeChildren(vnode) || []
    const res = new Array(vnodes.length)
    for (let i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext)
    }
    return res
  }
}

```

#### installComponentHooks(组件安装的钩子函数)

* 给组件的data对象上设置hook对象
* hook对象增加四个属性 init prepatch insert destroy
* 负责组件的创建，更新，销毁

```javascript
const hooksToMerge = Object.keys(componentVNodeHooks)
/**
 * 在组件的 data 对象上设置 hook 对象，
 * hook 对象增加四个属性，init、prepatch、insert、destroy，
 * 负责组件的创建、更新、销毁
 */
 function installComponentHooks(data: VNodeData) {
  const hooks = data.hook || (data.hook = {})
  // 遍历 hooksToMerge 数组，hooksToMerge = ['init', 'prepatch', 'insert' 'destroy']
  for (let i = 0; i < hooksToMerge.length; i++) {
    // 比如 key = init
    const key = hooksToMerge[i]
    // 从 data.hook 对象中获取 key 对应的方法
    const existing = hooks[key]
    // componentVNodeHooks 对象中 key 对象的方法
    const toMerge = componentVNodeHooks[key]
    // 合并用户传递的 hook 方法和框架自带的 hook 方法，其实就是分别执行两个方法
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook(toMerge, existing) : toMerge
    }
  }
}

function mergeHook(f1: any, f2: any): Function {
  const merged = (a, b) => {
    // flow complains about extra args which is why we use any
    f1(a, b)
    f2(a, b)
  }
  merged._merged = true
  return merged
}
```

#### componentVNodeHooks

* patch期间在组件vnode上调用内联钩子
* 对keep-live进行特殊处理，判断是否调用组件的$destroy方法


```javascript
// patch 期间在组件 vnode 上调用内联钩子
// inline hooks to be invoked on component VNodes during patch
const componentVNodeHooks = {
  // 初始化
  init(vnode: VNodeWithData, hydrating: boolean): ?boolean {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // 被 keep-alive 包裹的组件
      // kept-alive components, treat as a patch
      const mountedNode: any = vnode // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode)
    } else {
      // 创建组件实例，即 new vnode.componentOptions.Ctor(options) => 得到 Vue 组件实例
      const child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      )
      // 执行组件的 $mount 方法，进入挂载阶段，接下来就是通过编译器得到 render 函数，接着走挂载、patch 这条路，直到组件渲染到页面
      child.$mount(hydrating ? vnode.elm : undefined, hydrating)
    }
  },

  // 更新 VNode，用新的 VNode 配置更新旧的 VNode 上的各种属性
  prepatch(oldVnode: MountedComponentVNode, vnode: MountedComponentVNode) {
    // 新 VNode 的组件配置项
    const options = vnode.componentOptions
    // 老 VNode 的组件实例
    const child = vnode.componentInstance = oldVnode.componentInstance
    // 用 vnode 上的属性更新 child 上的各种属性
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    )
  },

  // 执行组件的 mounted 声明周期钩子
  insert(vnode: MountedComponentVNode) {
    const { context, componentInstance } = vnode
    // 如果组件未挂载，则调用 mounted 声明周期钩子
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true
      callHook(componentInstance, 'mounted')
    }
    // 处理 keep-alive 组件的异常情况
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance)
      } else {
        activateChildComponent(componentInstance, true /* direct */)
      }
    }
  },

  /**
   * 销毁组件
   *   1、如果组件被 keep-alive 组件包裹，则使组件失活，不销毁组件实例，从而缓存组件的状态
   *   2、如果组件没有被 keep-alive 包裹，则直接调用实例的 $destroy 方法销毁组件
   */
  destroy (vnode: MountedComponentVNode) {
    // 从 vnode 上获取组件实例
    const { componentInstance } = vnode
    if (!componentInstance._isDestroyed) {
      // 如果组件实例没有被销毁
      if (!vnode.data.keepAlive) {
        // 组件没有被 keep-alive 组件包裹，则直接调用 $destroy 方法销毁组件
        componentInstance.$destroy()
      } else {
        // 负责让组件失活，不销毁组件实例，从而缓存组件的状态
        deactivateChildComponent(componentInstance, true /* direct */)
      }
    }
  }
}
```


#### createComponentInstanceForVnode(创建Vnode实例组件)

* 

```javascript
/**
 * new vnode.componentOptions.Ctor(options) => 得到 Vue 组件实例 
 */
export function createComponentInstanceForVnode(
  // we know it's MountedComponentVNode but flow doesn't
  vnode: any,
  // activeInstance in lifecycle state
  parent: any
): Component {
  const options: InternalComponentOptions = {
    _isComponent: true,
    _parentVnode: vnode,
    parent
  }
  // 检查内联模版渲染函数
  const inlineTemplate = vnode.data.inlineTemplate
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render
    options.staticRenderFns = inlineTemplate.staticRenderFns
  }
  // new VueComponent(options) => Vue 实例
  return new vnode.componentOptions.Ctor(options)
}

```

#### 一个组件如何变成Vnode

* 组件实例初始化，最后执行 $mount 进入挂载阶段
* 如果是只包含运行时的 vue.js，只直接进入挂载阶段，因为这时候的组件已经变成了渲染函数，编译过程通过模块打包器 + vue-loader + vue-template-compiler 完成的
* 如果没有使用预编译，则必须使用全量的 vue.js
* 挂载时如果发现组件配置项上没有 render 选项，则进入编译阶段
* 将模版字符串编译成 AST 语法树，其实就是一个普通的 JS 对象
* 然后优化 AST，遍历 AST 对象，标记每一个节点是否为静态静态；然后再进一步标记出静态根节点，在组件后续更新时会跳过这些静态节点的更新，以提高性能
* 接下来从 AST 生成渲染函数，生成的渲染函数有两部分组成：
* 负责生成动态节点 VNode 的 render 函数
* 还有一个 staticRenderFns 数组，里面每一个元素都是一个生成静态节点 VNode 的函数，这些函数会作为 render 函数的组成部分，负责生成静态节点的 VNode
* 接下来将渲染函数放到组件的配置对象上，进入挂载阶段，即执行 mountComponent 方法
* 最终负责渲染组件和更新组件的是一个叫 updateComponent 方法，该方法每次执行前首先需要执行 vm._render 函数，该函数负责执行编译器生成的 render，得到组件的 VNode
* 将一个组件生成 VNode 的具体工作是由 render 函数中的 _c、_o、_l、_m 等方法完成的，这些方法都被挂载到 Vue 实例上面，负责在运行时生成组件 VNode
* 简单总结 render helper 的作用就是：在 Vue 实例上挂载一些运行时的工具方法，这些方法用在编译器生成的渲染函数中，用于生成组件的 VNode。
* 设置组件配置信息，然后通过 new VNode(组件信息) 生成组件的 VNode