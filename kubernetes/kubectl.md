# kubectl

根据 label 筛选 node

```bash
kubectl get node -l "topology.kubernetes.io/zone=cn-beijing-a"
```

根据字段筛选

```bash
kubectl get pods --field-selector=status.phase!=Running,spec.restartPolicy=Always
kubectl get queue --field-selector=spec.basic.cpu=0,spec.basic.rdma!=0
```
