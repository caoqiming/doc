# open GL

## 基本概念

### 顶点缓冲对象(Vertex Buffer Objects, VBO)

我们通过顶点缓冲对象(VBO)在 GPU 内存（通常被称为显存）中储存大量顶点。

```cpp
    GLuint vbo = 0;
    glGenBuffers(1, &vbo);              // 生成一个 VBO 标识符
    glBindBuffer(GL_ARRAY_BUFFER, vbo); // 绑定 VBO 到 GL_ARRAY_BUFFER 目标
    glBufferData(GL_ARRAY_BUFFER, 9 * sizeof(float), points, GL_STATIC_DRAW);
```

- `void glGenBuffers(GLsizei n, GLuint * buffers);` 用于创建缓冲区对象 (Buffer Objects)，
  `n` 为要生成的缓冲区对象 ID 的数量。
  `buffers` 用于存储生成的 ID 的数组的指针。函数会将生成的 ID 依次写入到这个数组中。

- `void glBindBuffer(GLenum target, GLuint buffer);` 用于将一个特定的 Buffer Object 绑定到一个 Target 上。
  `target` 缓冲区目标，可选`GL_ARRAY_BUFFER`,`GL_ELEMENT_ARRAY_BUFFER`,`GL_UNIFORM_BUFFER`,`GL_SHADER_STORAGE_BUFFER`
  `buffer` 缓冲区 ID

> 为什么要用缓冲区？使用缓冲区后，数据只需要发送一次并存储在 GPU 显存中。缓冲区允许您以结构化、类型安全的方式组织数据（例如，将坐标、颜色、法线等打包在一起）。可以在多个渲染调用中重用同一个缓冲区，而无需重新上传数据。如果您有多个 VBO（VBO1, VBO2），您通过调用 glBindBuffer(GL_ARRAY_BUFFER, VBO1) 来操作 VBO1，然后调用 glBindBuffer(GL_ARRAY_BUFFER, VBO2) 来切换到操作 VBO2。

- `void glBufferData(GLenum target, GLsizeiptr size, const void * data, GLenum usage);` 把用户定义的数据复制到当前绑定缓冲
  `target` 缓冲区目标
  `size` 数据大小，字节
  `data` 源数据指针：指向要上传到 GPU 的 CPU 内存数据的指针。如果为 NULL，则只分配空间，不上传数据。
  `usage` 使用模式：提示 OpenGL 如何管理数据，用于优化性能。可选 `GL_STATIC_DRAW` `GL_DYNAMIC_DRAW` `GL_STREAM_DRAW` `GL_STATIC_READ`

### 顶点数组对象 (VAO)

VAO 记录了如何从 VBO 中读取数据，以及这些数据如何映射到着色器输入变量（in 变量）

```cpp
    GLuint vao = 0;
    glGenVertexArrays(1, &vao); // 生成一个 VAO 标识符
    glBindVertexArray(vao);     // 绑定 VAO
    glEnableVertexAttribArray(0);       // 启用 VAO 中索引为 0 的顶点属性
    // 指定顶点数据格式：
    // 索引 0, 3 个分量 (vec3), 浮点型, 不需归一化, 步长 0 (紧密排列), 偏移 0
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 0, NULL);
```

- `glEnableVertexAttribArray(GLuint index)` 打开当前绑定的 VAO 的一个 index 的通道
  OpenGL 中，顶点数据被组织成不同的属性（Attributes），例如位置、颜色、法线、纹理坐标，每个属性都被分配了一个 索引位置（Location）。这个位置在顶点着色器中通过 `layout(location = N) in ...` 来指定。调用这个函数后 OpenGL 就会打开索引为 index 的这个通道，允许数据流经它。

- `void glVertexAttribPointer(GLuint index, GLint size, GLenum type, GLboolean normalized, GLsizei stride, const void * pointer);`
  简单来说，它的作用就是告诉 VAO：“从这个 VBO 中，以这种格式、这个步长、从这个偏移量开始读取数据，并将它送到顶点着色器的这个位置（Location）。”
  `index` 着色器输入位置：必须与顶点着色器中 `layout(location = N)` 指定的 `N` 值完全匹配。
  `size` 每个顶点属性由多少个分量组成，是一个 1 到 4 之间的整数
  `type` 数据类型，如 GL_FLOAT、GL_UNSIGNED_INT
  `normalized` 是否将非浮点类型的数据（如整数）在传入着色器前自动映射到 0 到 1 或 -1 到 1 的范围
  `stride` 每个完整顶点记录之间的字节间隔
  `pointer` 当前属性在 VBO 的数据块中开始的字节偏移量。

### 顶点着色器(Vertex Shader)

文件后缀一般为 `.vert`

```glsl
#version 410 core
layout(location = 0) in vec3 vp; // 使用固定位置 0 与 VAO 对应
uniform vec2 offset;             // 传入偏移量
void main() {
  gl_Position = vec4( vp.xy + offset, vp.z, 1.0 ); // 应用偏移
}
```

数据读取的方式为`glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 0, NULL);`
这里的 vp 是从 location=0 读取出来的一个顶点的数据。也就从 VBO 中，读出一个点的坐标（3 维）并给到 vp

uniform 变量是 CPU 和 GPU 之间通信的主要方式之一，它们允许您在不更改着色器代码的情况下，动态地改变渲染效果。
从 cpp 传递数据到 uniform 的方法为

```cpp
// ...已经创建了 shader_program
// 通过变量名获取其地址
GLint offset_loc = glGetUniformLocation(shader_program, "offset");
// 传递参数
glUniform2f(offset_loc, your_data_1, your_data_2);
```

`offset` 的值传递路径是：

$$\text{C++ Code} \xrightarrow{\text{glGetUniformLocation}} \text{获取位置} \xrightarrow{\text{glUniform2f}} \text{上传值} \longrightarrow \text{GPU 显存中的 Uniform 存储} \longrightarrow \text{GLSL 着色器} \text{(在每次绘制时读取)}$$

`gl_Position` 它是 GLSL 语言规范预先定义好的特殊变量。是 OpenGL 顶点着色器中一个固定、内置（Built-in）、且必须写入（Write-only）的输出变量。
`gl_Position` 是 `vec4` 类型（四维浮点向量）。这是因为裁剪坐标系需要四个分量 $(x, y, z, w)$ 来进行后续的齐次除法（Perspective Divide）和裁剪测试。$w$ 分量在数学上代表了深度信息，它直接控制了透视效果。离相机越远，$w$ 越大。

到目前为止，顶点着色器只输出了一个顶点的坐标。既然叫着色器，肯定得有跟颜色相关的输出。
一般还会输出 out 变量 (可选，传递颜色、法线、纹理坐标等属性，用于 Fragment Shader)
比如

```glsl
# version 410 core
layout(location = 0) in vec3 vp;
layout(location = 1) in vec3 inColor;
out vec3 color;
void main() {
  color = inColor;
  gl_Position = vec4(vp, 1.0);
}
```

### 片段着色器(Fragment Shader)

后缀一般是 `.frag`

```glsl
# version 410 core
in vec3 color;
out vec4 frag_colour;
void main() {
  frag_colour = vec4(color, 1.0);
}
```

顶点着色器的 out 变量在片段着色器中以 in 变量接收时，其值是经过了光栅化阶段的插值（Interpolation）处理后的数据，而不是原始的顶点数据。
注意这里的输出是人为指定的，`out vec4 frag_colour;`，这是因为，它允许在着色器中定义多个输出（用于多重渲染目标，MRT），并对它们进行明确的控制。

> MRT 最重要的应用是 延迟着色（Deferred Shading），比如一次性处理，漫反射颜色，世界空间法线，世界空间位置，材质属性。避免了对同一场景进行多次绘制来收集这些基础数据。

### 着色器程序对象(Shader Program Object)

着色器程序对象(Shader Program Object)是多个着色器合并之后并最终链接完成的版本。

```cpp
// 1. 创建和编译顶点着色器
GLuint vs = glCreateShader(GL_VERTEX_SHADER);
glShaderSource(vs, 1, &vertex_shader, NULL);
glCompileShader(vs);
// 2. 创建和编译片段着色器
GLuint fs = glCreateShader(GL_FRAGMENT_SHADER);
glShaderSource(fs, 1, &fragment_shader, NULL);
glCompileShader(fs);
// 3. 创建着色器程序并链接
GLuint shader_program = glCreateProgram();
glAttachShader(shader_program, vs); // 附加顶点着色器
glAttachShader(shader_program, fs); // 附加片段着色器
glLinkProgram(shader_program);      // 链接程序
```

`glAttachShader`添加顶点着色器和片段着色器的顺序没有要求。程序会自动识别着色器的类型并控制其顺序，固定的执行顺序为：

1.  顶点着色器 (Vertex Shader, VS)：

    - 第一个阶段，处理每一个顶点。将顶点坐标从局部空间转换到裁剪空间，并输出顶点属性（如颜色、法线）。

2.  细分控制着色器 (Tessellation Control Shader, TCS)：

    - 可选阶段。定义细分域和细分因子。数据经过 TCS 后，管线进行细分（Tessellation）操作。

3.  细分评估着色器 (Tessellation Evaluation Shader, TES)：

    - 可选阶段。计算细分过程中生成的新顶点的位置和其他属性。

4.  几何着色器 (Geometry Shader, GS)：

    - 可选阶段。接收完整的图元（点、线、三角形），可以生成新的图元，或将图元传递给下一个阶段。

5.  _（光栅化阶段：将几何体转换为片元）_

6.  片段着色器 (Fragment Shader, FS)：
    - 最后一个可编程阶段。处理光栅化阶段生成的片元。计算最终颜色、深度和模板值。

### 索引缓冲对象(Index Buffer Object，IBO)

也叫元素缓冲对象(Element Buffer Object，EBO)
它存储 OpenGL 用来决定要绘制哪些顶点的索引。避免重复储存顶点。

```cpp
float vertices[] = {
    0.5f, 0.5f, 0.0f,   // 右上角
    0.5f, -0.5f, 0.0f,  // 右下角
    -0.5f, -0.5f, 0.0f, // 左下角
    -0.5f, 0.5f, 0.0f   // 左上角
};

unsigned int indices[] = {
    // 注意索引从0开始!
    // 此例的索引(0,1,2,3)就是顶点数组vertices的下标，
    // 这样可以由下标代表顶点组合成矩形
    0, 1, 3, // 第一个三角形
    1, 2, 3  // 第二个三角形
};

unsigned int EBO;
glGenBuffers(1, &EBO);
glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO);
glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(indices), indices, GL_STATIC_DRAW);
```
