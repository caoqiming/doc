# SfM (Structure from Motion) MVS (Multi-View Stereo)

1. 稀疏重建 (SfM - Structure from Motion)
   特征提取与匹配： 识别照片中的关键点（如建筑的转角），并在不同照片间寻找相同的点。
   相机位姿恢复： 计算出拍摄每一张照片时，相机在空间中的坐标和旋转角度。
   稀疏点云生成： 得到一个由成千上万个特征点组成的“骨架”模型。

2. 稠密重建 (MVS - Multi-View Stereo)
   根据相机的位置信息利用深度估计技术，填补稀疏点云之间的空白

## 实践

> SfM 可以用 COLMAP 完成，但 COLMAP 依赖cuda，所以没法在 mac 上 MVS
> 也可以用 openMVS

首先进行SfM，在 colmap gui 模式下，新建项目，再自动重建

```bash
colmap gui
```

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

> 这里 --image-folder 是基于 -i 指定的 dense 文件夹的，所以直接是 images就行了

现在有 scene.mvs

```bash
/Users/glimmer/Downloads/OpenMVS_macOS_arm64/DensifyPointCloud --max-threads 16 scene.mvs
```

现在有 scene_dense.mvs 以及 scene_dense.ply

目前获得的模型只有点，我们需要进一步生成面. 这里是将点变成面，但是还没有颜色。之前点云的颜色是写在点里的。仅用于预览，不会影响后续的贴图的逻辑。

```bash
/Users/glimmer/Downloads/OpenMVS_macOS_arm64/ReconstructMesh scene_dense.mvs --max-threads 16
```

现在有 scene_dense_mesh.ply

<!-- Mesh Refinement (optional)

```bash
/Users/glimmer/Downloads/OpenMVS_macOS_arm64/RefineMesh scene_dense.mvs -m scene_dense_mesh.ply -o scene_dense_mesh_refine.mvs --scales 1 --max-face-area 16
```

现在有 scene_dense_mesh_refine.ply -->

最后一步。这一步会读取你的原始照片，并将它们投影到模型上。在执行这一步之前先在blender里将模型简化一下。使用 Decimate ，减少面的数量。并可以删除部分不需要的点。并导出为 scene_dense_mesh_decimate.ply

```bash
/Users/glimmer/Downloads/OpenMVS_macOS_arm64/TextureMesh  scene_dense.mvs -m scene_dense_mesh_decimate.ply  --export-type obj --max-threads 16 --local-seam-leveling 0 --global-seam-leveling 0
```
