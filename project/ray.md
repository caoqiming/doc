# ray

> [document](https://docs.ray.io/en/latest/ray-overview/index.html)

Ray is an open-source unified framework for scaling AI and Python applications like machine learning. It provides the compute layer for parallel processing so that you don’t need to be a distributed systems expert.

## submit

> [document](https://docs.ray.io/en/latest/cluster/running-applications/job-submission/sdk.html)

使用以下 python 脚本提交任务

```python
from ray.job_submission import JobSubmissionClient

# If using a remote cluster, replace 127.0.0.1 with the head node's IP address or set up port forwarding.
client = JobSubmissionClient("http://127.0.0.1:8265")
job_id = client.submit_job(
    # Entrypoint shell command to execute
    entrypoint="python script.py",
    # Path to the local directory that contains the script.py file
    runtime_env={"working_dir": "/root/code/"}
)
print(job_id)
```

任务 script.py 例子

```python
# script.py
import ray
import os
ray.init()

# 定义一个远程函数
@ray.remote
def my_task():
    return os.getenv('MLP_TASK_INSTANCE_ID')

# 获取集群中的所有节点
nodes = ray.nodes()
print(nodes)
# 在每一个节点上运行任务
results = ray.get([my_task.remote() for _ in nodes])

# 打印结果
for result in results:
    print(result)
```

### Dependency Management

可以指定依赖的 pip 包

```python
job_id = client.submit_job(
    # Entrypoint shell command to execute
    entrypoint="python script.py",
    # Runtime environment for the job, specifying a working directory and pip package
    runtime_env={
        "working_dir": "./",
        "pip": ["requests==2.26.0"]
    }
)
```

> Instead of a local directory ("./" in this example), you can also specify remote URIs for your job’s working directory, such as S3 buckets or Git repositories.
