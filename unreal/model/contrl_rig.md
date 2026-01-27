# Contrl Rig

可以给模型的 sksletal mesh 创建 control rig, control rig 中可以给各个骨骼节点创建控制器（CMD+N），用蓝图编写 forwards solve graph 之后就可以通过控制器节点来控制骨骼的姿势了。可以在关卡序列中对有 control rig 的 sksletal mesh 制作动画。

- 注意控制器也需要与对应的骨骼一样，有层级结构，不然获取的transform会不受父节点的影响。
