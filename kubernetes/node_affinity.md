# node affinity

```yaml
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
        - matchExpressions:
            - key: cqm-test/no-npd
              operator: DoesNotExist
```

不同的 nodeSelectorTerms 之间的关系是 “或”（OR），而单个 nodeSelectorTerm 中的多个 matchExpressions 之间的关系是 “且”（AND）。
给节点打标签

```bash
kubectl label nodes  cqm-test/no-npd=true
```
