# 常用脚本

> 这个文档用来放常用的 bash 脚本片段，没找到更合适的路径，这个文档暂且放在这里吧。

处理输入参数

```bash
# 默认参数值为空
cluster_addr=""
pods=""
dryrun=false

# 解析输入参数
while [[ "$#" -gt 0 ]]; do
    case $1 in
    --cluster_addr=*)
        cluster_addr="${1#*=}"
        ;;
    --pods=*)
        pods="${1#*=}"
        ;;
    --dryrun)
        dryrun=true
        ;;
    *)
        echo "Unknown parameter: $1"
        exit 1
        ;;
    esac
    shift
done

# 校验 cluster_addr 和 pods 不为空
if [[ -z "$cluster_addr" ]]; then
    echo "Error: --cluster_addr cannot be empty"
    exit 1
fi

if [[ -z "$pods" ]]; then
    echo "Error: --pods cannot be empty"
    exit 1
fi

# 输出结果
echo "Cluster Address: $cluster_addr"
echo "Pods: $pods"
echo "Dry Run: $dryrun"
```
