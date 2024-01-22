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
