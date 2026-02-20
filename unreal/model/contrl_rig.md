# Contrl Rig

可以给模型的 sksletal mesh 创建 control rig, control rig 中的 "Rig Hierarchy" 中可以给各个骨骼节点创建控制器（CMD+N）
用蓝图编写 forwards solve graph 之后就可以通过控制器节点来控制骨骼的姿势了。逻辑基本上是从骨骼节点控制器读取 transform 再应用到对应的骨骼。 搜索 "get control transform" ,记得禁用 content sensitive，搜索 "set transform"
可以在关卡序列中对有 control rig 的 sksletal mesh 制作动画。

- 注意控制器也需要与对应的骨骼一样，有层级结构，不然获取的transform会不受父节点的影响。
