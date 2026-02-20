# SfM (Structure from Motion) MVS (Multi-View Stereo)

1. 稀疏重建 (SfM - Structure from Motion)
   特征提取与匹配： 识别照片中的关键点（如建筑的转角），并在不同照片间寻找相同的点。
   相机位姿恢复： 计算出拍摄每一张照片时，相机在空间中的坐标和旋转角度。
   稀疏点云生成： 得到一个由成千上万个特征点组成的“骨架”模型。

2. 稠密重建 (MVS - Multi-View Stereo)
   根据相机的位置信息利用深度估计技术，填补稀疏点云之间的空白

## 实践

> SfM 可以用 COLMAP 完成，但 COLMAP 依赖cuda，所以没法在 mac 上 MVS

首先进行SfM

再对图像进行去畸变（undistortion），并将结果保存为 MVS 的输入格式。

```bash
colmap image_undistorter --image_path images --input_path sparse/0 --output_path dense --output_type COLMAP
```

- image_path 原始图像的路径
- input_path 稀疏重建的结果路径

MVS 可以用 openMVS

```bash
/Users/glimmer/Downloads/OpenMVS_macOS_arm64/InterfaceCOLMAP -i dense -o scene.mvs --image-folder images
```

生成 OpenMVS 的项目文件 scene.mvs
生成稠密点云 scene_dense.mvs 以及 ply 文件

```bash
/Users/glimmer/Downloads/OpenMVS_macOS_arm64/DensifyPointCloud scene.mvs
```
