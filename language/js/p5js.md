# p5.js

是一个画图的js库

### 贪吃蛇

>复习js，顺手用p5.js实现了一个贪吃蛇，代码如下。实现很简洁，为了把图像放大显示倒是折腾了很久。scale只能放大图形不能放大点和线，因此这里都用的矩形绘制的。

可以复制代码到p5.js的编辑器里运行，也可以直接点击这里[开始游戏！](./gluttonous_snake.html)

```js
const L = 20, H = 20, BC = 255, FC = "red", SC = 0; RATIO = 20;
var snake = [[3, 1], [3, 2], [3, 2]];
var d = [0, 1], food = [-1, -1];

function setup() {
    createCanvas( L* RATIO, H* RATIO);
    frameRate(4);
    background(BC);
    noStroke();
}

function draw() {
    if (food[0] == -1) {
        genfood();
    }
    move();
    scale(RATIO);
    background(BC);
    fill(SC);
    for (var i = 0; i < snake.length; i++) {
        rect(snake[i][0], snake[i][1], 1, 1)
    }
    fill(FC);
    rect(food[0], food[1], 1, 1)
}

function move() {
    var h = snake[snake.length - 1];
    var nh = [h[0] + d[0], h[1] + d[1]];
    snake.push(nh);
    if (nh[0] == food[0] && nh[1] == food[1]) {
        food = [-1, -1];
    } else {
        if (nh[0] < 0 || nh[0] >= L || nh[1] < 0 || nh[0] >= H || get(nh[0] * RATIO, nh[1] * RATIO)[0] != BC) {
            noLoop();
        }
        snake.shift();
    }
}

function genfood() {
    var x = int(random(0, L)), y = int(random(0, L));
    if (get(x* RATIO, y* RATIO)[0] != BC) {
        genfood();
    } else {
        food = [x, y];
    }
}

function keyPressed() {
    if (key == "ArrowUp" && d[1] != 1) {
        d = [0, -1];
    } else if (key == "ArrowDown" && d[1] != -1) {
        d = [0, 1];
    } else if (key == "ArrowLeft" && d[0] != 1) {
        d = [-1, 0];
    } else if (key == "ArrowRight" && d[0] != -1) {
        d = [1, 0];
    } else if (key == "r") {
        snake = [[3, 1], [3, 2], [3, 2]], d = [0, 1], food = [-1, -1];
        draw();
        loop();
    }
}
```