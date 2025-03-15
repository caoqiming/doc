# uproperty

虚幻引擎通过反射系统将我们的 C++对象类封装在各种宏中，这些宏扩展了引擎和编辑器功能，打通了 UE 和标准 C++之间的功能交流。

## 设置可见性和可编辑性

- VisibleAnywhere：在蓝图编辑器细节面板和场景细节面板中都可见；
- VisibleDefaultsOnly：只在蓝图编辑器细节面板中可见；
- VisibleInstanceOnly：只在场景细节面板中可见；
- EditAnywhere：在蓝图编辑器细节面板和场景细节面板中都可见、可编辑；
- EditDefaultsOnly：只在蓝图编辑器细节面板中可见、可编辑；
- EditInstanceOnly：只在场景细节面板中可见、可编辑，在蓝图细节面板中不可见；

## 设置是否读写

- BlueprintReadWrite：是否可以通过蓝图节点进行 get/set；

## 设置分类，可以使用管道符设置子分类

- Category="xxxx|yyy"

## 设置元数据 meta

- DisplayName=“xxx：设置显示名称，相当于别名；
- ToolTip="abc"：设置鼠标悬浮时候的提示内容；
- EditCondition = "isControl"：设置在某个变量为 true 的时候可编辑；

更多元数据可以参照官网文档
