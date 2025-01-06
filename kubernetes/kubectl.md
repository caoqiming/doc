# kubectl

根据 label 筛选 node

```bash
kubectl get node -l "topology.kubernetes.io/zone=cn-beijing-a"
```

根据字段筛选

```bash
kubectl get pods --field-selector=status.phase!=Running,spec.restartPolicy=Always
```

删除 Evicted 的 pod

```bash
kubectl get pod -n kube-system | grep Evicted | awk '{print $1}' | xargs kubectl delete pod -n kube-system
```

端口映射

```bash
# Forward one or more local ports to a pod. This command requires the node to have 'socat' installed.
#  Use resource type/name such as deployment/mydeployment to select a pod. Resource type defaults to 'pod' if omitted.
#  If there are multiple pods matching the criteria, a pod will be selected automatically. The forwarding session ends when the selected pod terminates, and rerun of the command is needed to resume forwarding.

# Listen on ports 5000 and 6000 locally, forwarding data to/from ports 5000 and 6000 in the pod
kubectl port-forward pod/mypod 5000 6000

# Listen on port 8888 locally, forwarding to 5000 in the pod
kubectl port-forward pod/mypod 8888:5000

# Listen on a random port locally, forwarding to 5000 in the pod
kubectl port-forward pod/mypod :5000
```

给节点打标签

```bash
kubectl label nodes 192.18.128.2 cqm-test/no-npd=true
```

删除标签

```bash
kubectl label nodes 192.18.128.2 cqm-test/no-npd-
```

自定义返回内容

```bash
kubectl get mljob -o custom-columns=NAME:.metadata.name,ANNOTATION:.metadata.annotations."yourannokey"
```
