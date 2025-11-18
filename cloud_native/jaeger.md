# Jaeger

**Jaeger 端口说明**

- 16686: Jaeger UI 端口
  用于访问 Jaeger 的 Web 界面
  可以通过浏览器访问 http://localhost:16686 查看追踪数据
- 4317: OTLP gRPC 端口
  OpenTelemetry Protocol (OTLP) 的 gRPC 接收端口
  用于接收 OTLP 格式的追踪数据(gRPC 协议)
- 4318: OTLP HTTP 端口
  OpenTelemetry Protocol (OTLP) 的 HTTP 接收端口
  用于接收 OTLP 格式的追踪数据(HTTP 协议)
- 5778: 配置服务端口
  Jaeger Agent 的配置服务端口
  用于提供采样策略等配置信息
- 9411: Zipkin 兼容端口
  Zipkin HTTP 接收端口
  用于接收 Zipkin 格式的追踪数据,保证与 Zipkin 的兼容性

### trace id

**HTTP Header 中的 Trace Context 标准**

推荐使用 **W3C Trace Context** 标准（OpenTelemetry 默认）：

1. **traceparent** (必需)

   ```
   traceparent: 00-{trace-id}-{span-id}-{trace-flags}
   ```

   - 版本: `00`
   - trace-id: 32 位十六进制 (128-bit)
   - span-id: 16 位十六进制 (64-bit)
   - flags: `01` (采样) 或 `00` (不采样)

   示例: `traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01`

2. **tracestate** (可选)

   ```
   tracestate: vendor1=value1,vendor2=value2
   ```

   供应商扩展信息

3. **baggage** (可选)
   ```
   baggage: userId=123,sessionId=abc
   ```
   跨服务传递业务上下文

**其他格式**：

- B3 格式 (Zipkin): `X-B3-TraceId`, `X-B3-SpanId`, `X-B3-Sampled`
- 自定义: `X-Request-Id`, `X-Correlation-Id`

OpenTelemetry 会自动处理 W3C 标准的传播，无需手动设置。

前后端关联同一请求的方式（核心：传播 trace context）：

补充：可以在后端给每个响应加：

```
response.headers["x-trace-id"] = format_trace_id(trace.get_current_span().get_span_context().trace_id)
```

## deploy

```bash
docker run --rm --name jaeger \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 5778:5778 \
  -p 9411:9411 \
  cr.jaegertracing.io/jaegertracing/jaeger:2.11.0
```

## python

```bash
pip install --upgrade pip
pip install opentelemetry-api opentelemetry-sdk opentelemetry-exporter-otlp
```

### 用修饰器进行函数级打点

```python
def traced(name=None):
    def wrap(fn):
        def inner(*a, **kw):
            with tracer.start_as_current_span(name or fn.__name__):
                return fn(*a, **kw)
        return inner
    return wrap

@traced()
def do_db():
    time.sleep(0.2)

@traced("api-call")
def call_api():
    time.sleep(0.15)

```

### 记录 span 和 event

- `set_attribute(key, value)`
  给 Span 添加“描述性”键值对，表示这次操作的上下文/特征（如 http.method、db.system、user.id）。
  作用于整个 Span 生命周期，常用于查询、聚合、过滤（在 Jaeger 的 Tags 里）。
  建议低基数、稳定键名；避免敏感/高基数字符串（如完整 SQL、令牌）。

- `add_event(name, attributes=None, timestamp=None)`
  在 Span 时间轴上记录“某一刻发生的事情”，带时间戳，可附带少量属性。
  适合阶段标记、重试、缓存命中/未命中、队列收发、业务里程碑、异常等。
  事件一经添加不可修改；在 Jaeger 的 Logs 面板中查看，不常用于过滤。

### 记录报错

```python
# ...existing code...
from opentelemetry.trace.status import Status, StatusCode
# ...existing code...

def main():
    # 创建一个根 span
    with tracer.start_as_current_span("main-operation") as parent_span:
        # ...existing code...

        # 创建子 span
        with tracer.start_as_current_span("database-query") as child_span:
            child_span.set_attribute("db.system", "postgresql")
            child_span.set_attribute("db.statement", "SELECT * FROM users")
            try:
                print("Executing database query...")
                time.sleep(0.2)
                # 模拟异常
                raise RuntimeError("query timeout")
            except Exception as e:
                child_span.record_exception(e)                      # 记录异常事件（带栈）
                child_span.set_status(Status(StatusCode.ERROR, str(e)))  # 标记错误
                child_span.set_attribute("error", True)             # 兼容 Jaeger 的错误标记
                # 不再向外抛出，继续后续逻辑
        # ...existing code...
```

### demo

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import Resource
import time

# 配置资源信息
resource = Resource(attributes={
    "service.name": "python-demo-service",
    "service.version": "1.0.0",
    "service.namespace": "billing",          # 可选：逻辑域
    "deployment.environment": "production",  # 环境
    "service.instance.id": "host-42",        # 实例/容器唯一标识
})

# 设置 Tracer Provider
trace.set_tracer_provider(TracerProvider(resource=resource))

# 配置 OTLP Exporter (使用 HTTP)
otlp_exporter = OTLPSpanExporter(
    endpoint="http://localhost:4318/v1/traces",  # Jaeger 的 OTLP HTTP 端口
)

# 添加 Span Processor
trace.get_tracer_provider().add_span_processor(
    BatchSpanProcessor(otlp_exporter)
)

# 获取 tracer
tracer = trace.get_tracer(__name__)


def main():
    # 创建一个根 span
    with tracer.start_as_current_span("main-operation") as parent_span:
        parent_span.set_attribute("user.id", "12345")
        parent_span.set_attribute("environment", "production")

        print("Starting main operation...")
        time.sleep(0.1)

        # 创建子 span
        with tracer.start_as_current_span("database-query") as child_span:
            child_span.set_attribute("db.system", "postgresql")
            child_span.set_attribute("db.statement", "SELECT * FROM users")
            print("Executing database query...")
            time.sleep(0.2)

        # 创建另一个子 span
        with tracer.start_as_current_span("api-call") as api_span:
            api_span.set_attribute("http.method", "GET")
            api_span.set_attribute("http.url", "https://api.example.com/data")
            api_span.set_attribute("http.status_code", 200)
            print("Making API call...")
            time.sleep(0.15)

        print("Main operation completed!")


if __name__ == "__main__":
    main()
    # 等待数据发送完成
    time.sleep(2)
    print("Traces sent to Jaeger!")
    print("Visit http://localhost:16686 to view traces")

```

## JS

TBD
