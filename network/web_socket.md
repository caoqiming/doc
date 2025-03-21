# web socket

WebSocket 是一种网络传输协议，可在单个 TCP 连接上进行全双工通信，位于 OSI 模型的应用层。

WebSocket is distinct from HTTP used to serve most webpages. Although they are different, RFC 6455 states that WebSocket "is designed to work over HTTP ports 443 and 80 as well as to **support HTTP proxies and intermediaries**", thus making it compatible with HTTP. To achieve compatibility, the WebSocket handshake uses the HTTP Upgrade header to change from the HTTP protocol to the WebSocket protocol

The WebSocket protocol specification defines ws (WebSocket) and wss (WebSocket Secure) as two new uniform resource identifier (URI) schemes that are used for unencrypted and encrypted connections respectively.

## python

### server

`pip install websockets`

> 这个例子使用 `threading` ，高并发应该用 `asyncio`

```python
from websockets.sync.server import serve
from datetime import datetime

def echo(websocket):
    for message in websocket:
        websocket.send("%s %s"%(datetime.now().strftime("%H:%M:%S"),message))


def main():
    with serve(echo, "0.0.0.0", 8765) as server:
        server.serve_forever()


if __name__ == "__main__":
    main()
```

### client

```python
from websockets.sync.client import connect

def hello():
    with connect("ws://localhost:8765") as websocket:
        websocket.send("Hello world!")
        message = websocket.recv()
        print(message)


if __name__ == "__main__":
    hello()
```

## go

`go get github.com/gorilla/websocket`
