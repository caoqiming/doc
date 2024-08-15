# cookie

HTTP cookies (also called web cookies, Internet cookies, browser cookies, or simply cookies) are small blocks of data created by a web server while a user is browsing a website and placed on the user's computer or other device by the user's web browser.

They enable web servers to store stateful information (such as items added in the shopping cart in an online store) on the user's device or to track the user's browsing activity (including clicking particular buttons, logging in, or recording which pages were visited in the past). They can also be used to save information that the user previously entered into form fields, such as names, addresses, passwords, and payment card numbers for subsequent use.

在程序中，会话跟踪是很重要的事情。理论上，一个用户的所有请求操作都应该属于同一个会话，而另一个用户的所有请求操作则应该属于另一个会话，二者不能混淆。例如，用户 A 在超市购买的任何商品都应该放在 A 的购物车内，不论是用户 A 什么时间购买的，这都是属于同一个会话的，不能放入用户 B 或用户 C 的购物车内，这不属于同一个会话。而 Web 应用程序是使用 HTTP 协议传输数据的。HTTP 协议是无状态的协议。一旦数据交换完毕，客户端与服务器端的连接就会关闭，再次交换数据需要建立新的连接。这就意味着服务器无法从连接上跟踪会话。即用户 A 购买了一件商品放入购物车内，当再次购买商品时服务器已经无法判断该购买行为是属于用户 A 的会话还是用户 B 的会话了。要跟踪该会话，必须引入一种机制。Cookie 就是这样的一种机制。它可以弥补 HTTP 协议无状态的不足。在 Session 出现之前，基本上所有的网站都采用 Cookie 来跟踪会话。

其实本质上 cookies 就是 http 的一个扩展。有两个 http 头部是专门负责设置以及发送 cookie 的,它们分别是 Set-Cookie 以及 Cookie。当服务器返回给客户端一个 http 响应信息时，其中如果包含 Set-Cookie 这个头部时，意思就是指示客户端建立一个 cookie，并且在后续的 http 请求中自动发送这个 cookie 到服务器端，直到这个 cookie 过期。

Cookie 具有不可跨域名性。根据 Cookie 规范，浏览器访问 Google 只会携带 Google 的 Cookie，而不会携带 Baidu 的 Cookie。Google 也只能操作 Google 的 Cookie，而不能操作 Baidu 的 Cookie。
用户登录网站www.google.com之后会发现访问images.google.com时登录信息仍然有效，而普通的Cookie是做不到的。如果想所有google.com名下的二级域名都可以使用该Cookie，需要设置Cookie的domain参数。

## 查看 cookie

```
javascript:alert(document.cookie)
```

## go 中的 cookie

```go
type Cookie struct {
	Name  string
	Value string

	Path       string    // optional
	Domain     string    // optional
	Expires    time.Time // optional
	RawExpires string    // for reading cookies only

	// MaxAge=0 means no 'Max-Age' attribute specified.
	// MaxAge<0 means delete cookie now, equivalently 'Max-Age: 0'
	// MaxAge>0 means Max-Age attribute present and given in seconds
	MaxAge   int
	Secure   bool
	HttpOnly bool
	SameSite SameSite
	Raw      string
	Unparsed []string // Raw text of unparsed attribute-value pairs
}
```

- Name (string): Cookie 的名字。
- Value (string): Cookie 的值。
- Path (string): 可选字段，限制 Cookie 在哪些路径上发送，如果未指定，默认为"/"，表示发送到所有路径。
- Domain (string): 可选字段，限制 Cookie 在哪些域名下发送。如果未指定，默认为 Cookie 创建时的域名。
- Expires (time.Time): 可选字段，指定 Cookie 的过期时间，使用时间类型。
- RawExpires (string): 仅用于读取 Cookie，表示原始的过期时间字符串。
- MaxAge (int):
  - MaxAge=0 表示未指定 Max-Age 属性。
  - MaxAge<0 表示立即删除 Cookie，相当于 Max-Age: 0。
  - MaxAge>0 表示 Max-Age 属性存在，值为以秒为单位的时间长度。
- Secure (bool): Boolean 类型，如果设置为 true，仅在 HTTPS 连接上发送。
- HttpOnly (bool): Boolean 类型，如果设置为 true，通过 JavaScript 无法访问 Cookie，提高安全性，防止 XSS（跨站脚本）攻击。
- SameSite (SameSite):
  这个字段用于防止跨站请求伪造（CSRF）。有以下几个取值：
  - SameSiteLaxMode 防范跨站，大多数情况下禁止获取 cookie，除非导航到目标网址的 GET 请求
  - SameSiteStrictMode 完全禁止第三方获取 cookie，跨站点时，任何情况下都不会发送 cookie
  - SameSiteNoneMode 没有限制。必须同时设置 Secure 属性（Cookie 只能通过 HTTPS 协议发送），否则无效，需要 chrome > 80
- Raw (string): 原始的未解析的 Cookie 字符串。
- Unparsed ([]string): 原始的、未解析的属性-值对的文本。

## session

除了使用 Cookie，Web 应用程序中还经常使用 Session 来记录客户端状态。Session 是服务器端使用的一种记录客户端状态的机制，数据储存在服务端，客户端每次访问带上 session id。
