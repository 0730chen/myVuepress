---
title: HTTP详解
date: 2020-12-19
categories:
  - HTTP
---

#### HTTP 协议

#### HTTP 缓存

Web 缓存可以是共享的也可以是私有的，具体取决于其存在的位置。

- 浏览器缓存
- 代理缓存
- 反向代理缓存

- 浏览器缓存
  比如访问网页点击回退键时，访问网页的速度比第一次要快很多

- 代理缓存
  与为单个用户提供服务的浏览器缓存不同，代理缓存可以为访问同一内容的数百个不同用户提供服务。例如，通常由 ISP 或任何其他独立实体在更广泛的级别上实现它们。

- 反向代理缓存
  反向代理缓存或代理缓存在原始服务器附近实现，以减少服务器上的负载。与由 ISP 等实现以减少网络带宽使用的代理缓存不同，代理或反向代理缓存是由服务器管理员在原始服务器附近实现的，以减少服务器的负载。

#### 如何去控制缓存

    每当服务器发出一些响应时，它就会附带一些HTTP标头，以指导缓存是否以及如何缓存此响应。内容提供者是必须确保返回正确的HTTP标头以强制缓存如何缓存内容的提供者

- 设置过期时间：在 HTTP / 1.1 和引入之前 Cache-Control，有 Expires 一个标头，它只是一个时间戳，告诉缓存应将多久的内容视为新鲜内容。此标头的可能值是绝对到期日期；日期必须是格林尼治标准时间 Expires: Mon, 13 Mar 2017 12:22:00 GMT
- 缓存控制：Cache-Control 指定应将内容缓存多长时间以及以何种方式进行缓存。HTTP / 1.1 中引入了该标头家族，以克服 Expires 标头的限制。cache-control 可以设置为 private 私有的，内容将不会缓存在任何代理中，而只会由客户端（即浏览器）缓存。如果设置为 public，则除了由客户端缓存外，还可以由代理缓存。为许多其他用户提供服务。no-store 指定内容不由任何高速缓存高速缓存。表示可以维护缓存，但是要 ETag 在服务之前从服务器重新验证（例如，使用）缓存的内容。也就是说，仍然有向服务器发出请求，但需要进行验证，而不是下载缓存的内容。max-age 指定内容将被缓存的秒数。s-maxage 这里的 s-前缀代表共享。该指令专门针对共享缓存。就像 max-age 它也得到的秒数为某事进行高速缓存。如果存在，它将覆盖 max-age 和 expires 标头以进行共享缓存。must-revalidate 有时可能会发生以下情况：如果您遇到网络问题，并且无法从服务器检索内容，则浏览器可能会提供未经验证的陈旧内容。must-revalidate 避免这种情况。如果存在此伪指令，则意味着在任何情况下都不能提供过时的内容，并且必须在提供服务之前从服务器重新验证数据。然而，你可以结合不同的方式这些指令来实现不同的缓存行为，no-cache/no-store 并且 public/private 是互斥的。如果同时指定 no-store 和 no-cache，no-store 将优先于 no-cache。

#### 客户端去服务端验证

- Etag 或“实体标签”是在 HTTP / 1.1 规范中引入的。Etag 只是服务器附加一些资源的唯一标识符。客户端稍后会使用此 ETag 进行有条件的 HTTP 请求声明,ETag: "j82j8232ha7sdh0q2882" - Strong Etag
ETag: W/"j82j8232ha7sdh0q2882" - Weak Etag (prefixed with `W/`)
- 强大的ETag验证意味着两个资源完全相同，并且两者之间完全没有区别。尽管ETag弱意味着两个资源虽然不是严格相同，但可以认为是相同的。例如，弱etag可能对动态内容有用。
- 服务器可能包含Last-Modified标头，该标头指示上次修改某些内容的日期和时间。

#### 缓存建议

- 您可以对任何静态内容进行积极的缓存
- 查看并确定您是否甚至需要缓存任何动态内容，如果可以，则应缓存多长时间。例如，对于博客的某些RSS提要，可能需要几个小时的缓存，但是对于ERP中的库存项目则没有任何缓存。
- 始终在响应中添加验证器（最好是ETag）。
- 选择缓存内容的可见性（私有或公开）时，请注意。确保您不会在任何公共代理中意外地缓存任何特定于用户的内容或敏感内容。如有疑问，请不要使用缓存。
- 将经常更改的内容与不经常更改的内容（例如，在javascript捆绑包中）分开，以便在更新时不需要使整个缓存的内容陈旧。

#### session和cookies

- 为什么需要cookies，Web应用程序是使用HTTP协议传输数据的。HTTP协议是无状态的协议。一旦数据交换完毕，客户端与服务器端的链接就会关闭，再次交换数据须要创建新的链接。这就意味着服务器没法从链接上跟踪会话。cookies储存在浏览器上，是由服务器返回，浏览器记录。Cookie是由服务器端生成，发送给User-Agent（通常是浏览器），（服务器告诉浏览器设置一下cookie），浏览器自动会将Cookie以key/value保存到某个目录下的文本文件内，下次请求同一网站时也会自动发送该Cookie给服务器，即添加在请求头部（前提是浏览器设置为启用cookie）。
Cookie就是一个小型文件（浏览器对cookie的内存大小是有限制的-------用来记录一些信息）chrome。
- cookies的安全性，不建议将敏感信息放入cookies中，因为容易被前端进行修改。
- session，通常指的是HTTP session,提供一个在多页面请求切换的状况下用于验证、存储用户信息的手段。服务端一般是经过cookies或者rewriting URLs来保持一个session。
- session和cookies的联系，每个session对象都有一个sessionId,而在cookie数组中，又一个元素叫作JSESSIONID，服务器将session对象的sessionId,以名称叫作JSESSIONID，值为sessionId的形式存入cookie数组中，这样cookie和session就发生了关联。
- session和cookies是存在联系的。如果需要在非浏览器的情况下，去请求使用session，则需要模拟http请求并且在请求头中拼接cookies


#### TCP连接

- TCP三次握手连接客户端和服务端，TCP 是面向连接的协议，所以使用 TCP 前必须先建立连接，而建立连接是通过三次握手来进行的。
- 第三次握手是可以携带数据的，前两次握手是不可以携带数据的，连接一旦完成则可以进行通信
- 在liunx中查看tcp进程 netstat -natp
- TCP连接用于保证可靠性和流量控制维护的某些状态信息，这些信息的组合，包括Socket、序列号和窗口大小称为连接。
- 为什么TCP需要三次握手，三次握手才可以阻止重复历史连接的初始化（主要原因），比如在连接过程中，由于网络问题，服务端接收到了旧的请求，然后返回给客户端，客户端发现不是自己最新的请求，就会发送RST请求，服务端接收到RST请求后就会释放连接，然后重新发送请求，「旧 SYN 报文」称为历史连接，TCP 使用三次握手建立连接的最主要原因就是防止「历史连接」初始化了连接。 
- 在两次握手的情况下，服务端没有中间状态给客户端来阻止历史连接，导致服务端可能建立一个历史连接，造成资源浪费。
- 避免在建立历史连接，如果发现是历史请求则服务端释放连接。
- 为什么建立序列号每次初始化都不一样 1.为了防止历史报文被下一个相同四元组的连接接收（主要方面）2.为了安全性，防止黑客伪造的相同序列号的 TCP 报文被对方接收；


#### HTTP缓存机制，强缓存，协商缓存

1. 浏览器在加载资源时会根据请求头expires，cache-control进行缓存判断，判断是否命中强缓存策略，判断是否向远程服务器请求资源还是去本地获取缓存资源。

##### Expires

在浏览器第一次请求资源的时候，服务器端的响应头会附上Expires这个响应字段，当浏览器在下一次请求这个资源时会根据上次的expires字段是否使用缓存资源（当请求时间小于服务端返回的到期时间，直接使用缓存数据）。expires是根据本地时间来判断的，假设客户端和服务器时间不同，会导致缓存命中误差

##### cache-control

缓存控制，上面我们提到了Expires有个缺点，当客户端本地时间和服务器时间不一致时会产生误差，浏览器会直接向服务器请求新的资源，为了解决这个问题，在http1.1规范中，提出了cache-control字段，且这个字段优先级高于上面提到的Expires，值是相对时间。

1. max-age，private，public，no-store，no-cache

##### 协商缓存

上面提到的强缓存都是由本地浏览器在确定是否使用缓存，当浏览器没有命中强缓存时就会向浏览器发送请求，验证协商缓存是否命中，如果缓存命中则返回304状态码，否则返回新的资源数据。

协商缓存（也叫对比缓存）是由服务器来确定资源是否可用，这将涉及到两组字段成对出现的，在浏览器第一次发出请求时会带上字段例如 Last-Modified 或者Etag,则后续请求则会带上对于的请求字段（if-modified-since或者if-none-Match），若响应头没有Last-Modified或者Etag，则请求头也不会有对应的字段

1. Last-modified表示本地文件最后修改时间，由服务器返回
2. if-modified-since是浏览器在请求数据时返回的，值是上次浏览器返回的Last-modified
3. ETag是一个文件的唯一标识符，当资源发生变化时这个ETag就会发生变化。弥补了上面last-modified可能出现文件内容没有变化但是last-modified发生了变化出现重新向服务器请求资源情况。这个值也是又服务器返回的
4. if-none-match是浏览器请求数据时带上的字段，值是上次服务器返回的ETag

#### 缓存字段的优先级

1. expires和cache-control如果同时存在时，cache-control会覆盖expires，expires无效，无论是否过期，。即 Cache-control > expires
2. 强缓存和协商缓存如果同时存在时，会去先对比强缓存是否还再有效期，如果强缓存还在有效期内则直接使用强缓存，否则协商缓存生效，即强缓存 > 协商缓存
3. 协商缓存Etag和last-modified同时存在时，会先比较Etag，last-modified无效，即Etag > last-modified

#### 浏览器缓存的一个流程

1. 当浏览器发起一个资源请求时，浏览器会先判断本地是否有缓存记录，如果没有会向浏览器请求新的资源，并记录服务器返回的last-modified。此时查看是否有强缓存
2. 如果有缓存记录，先判断强缓存是否存在（cache-control优先于expires），如果强缓存的时间没有过期则返回本地缓存资源（状态码为200）
3. 如果强缓存失效了，客户端会发起请求进行协商缓存策略，首先服务器判断Etag标识符，如果客户端传来标识符和当前服务器上的标识符是一致的，则返回状态码 304 not modified（不会返回资源内容）
4. 如果没有Etag字段，服务器会对比客户端传过来的if-modified-match，如果这两个值是一致的，此时响应头不会带有last-modified字段（因为资源没有变化，last-modified的值也不会有变化）。客户端304状态码之后读取本地缓存
5. 如果Etag和服务器端上的不一致，重新获取新的资源，并进行协商缓存返回数据。
6. 为什么需要ETag Etag是文件的唯一标识，在某些情况下，文件内容没变，但是文件的最后修改时间变化了，会导致资源再次请求。可能有些文件修改比较频繁，秒级以内修改的，If-Modified-Since 能检查到的粒度是秒级的，使用 Etag 就能够保证这种需求下客户端在 1 秒内能刷新多次。有些服务器不能准确的获取文件修改时间。