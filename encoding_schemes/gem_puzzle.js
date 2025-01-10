// 设置棋盘的大小
const boardSize = 8;
const boardSize_4 = 4;
// 计算每个格子的大小
let cellSize;
let cellSize_4;

// 定义一个包含6种颜色的列表
const colors = [
  "#FFB6C1", // 浅粉色
  "#ADD8E6", // 淡蓝色
  "#FFFF99", // 浅黄色
  "#CCCCFF", // 淡紫色
  "#99FF99", // 淡绿色
  "#FFCC99", // 淡橙色
];

// 自定义函数：判断一个数是否为2的整数次幂
function isPowerOfTwo(n) {
  if (n === 0) return false;
  return (n & (n - 1)) === 0;
}

function isBitSet(n, x) {
  // 使用位运算符检查第x位是否为1
  return (n & (1 << x)) !== 0;
}

// 第一张画布，绘制棋盘

function sketch1(p) {
  p.setup = function () {
    // 找到想把该画布插入的位置
    let divElement = document.getElementById("chessboard");
    let canvas = p.createCanvas(400, 400);
    canvas.parent(divElement);

    // 计算每个格子的大小
    cellSize = p.width / boardSize;
    // 设置文本对齐方式为居中
    p.textAlign(p.CENTER, p.CENTER);
    // 设置文本大小
    p.textSize(10);
    p.frameRate(5);
  };
  p.draw = function () {
    // 设置背景颜色为白色
    p.background(255);
    // 遍历棋盘的每一行
    for (let row = 0; row < boardSize; row++) {
      // 遍历棋盘的每一列
      for (let col = 0; col < boardSize; col++) {
        // 计算当前格子的索引
        let index = row * boardSize + col;
        // 根据索引的奇偶性来设置格子的填充颜色
        p.fill((index + row) % 2 === 0 ? 200 : 255);
        // 绘制当前格子
        p.rect(col * cellSize, row * cellSize, cellSize, cellSize);
        // 设置文本颜色为黑色
        p.fill(0);
        // 将数字转换为长度为6的二进制字符串
        let binaryIndex = index.toString(2).padStart(6, "0");
        // 在当前格子中显示二进制数字
        p.text(
          binaryIndex,
          col * cellSize + cellSize / 2,
          row * cellSize + cellSize / 2
        );
      }
    }
  };
}

// 第二张，绘制出index

function sketch2(p) {
  p.setup = function () {
    // 找到想把该画布插入的位置
    let divElement = document.getElementById("chessboard-index");
    let canvas = p.createCanvas(400, 400);
    canvas.parent(divElement);

    // 计算每个格子的大小
    cellSize = p.width / boardSize;
    // 设置文本对齐方式为居中
    p.textAlign(p.CENTER, p.CENTER);
    // 设置文本大小
    p.textSize(10);
    p.frameRate(5);
  };
  p.draw = function () {
    // 设置背景颜色为白色
    p.background(255);
    // 遍历棋盘的每一行
    for (let row = 0; row < boardSize; row++) {
      // 遍历棋盘的每一列
      for (let col = 0; col < boardSize; col++) {
        // 计算当前格子的索引
        let index = row * boardSize + col;
        // 根据索引的奇偶性来设置格子的填充颜色
        p.fill((index + row) % 2 === 0 ? 200 : 255);
        if (isPowerOfTwo(index)) {
          for (let i = 0; i < 6; i++) {
            if (isBitSet(index, i)) {
              p.fill(colors[i]);
              break;
            }
          }
        }

        // 绘制当前格子
        p.rect(col * cellSize, row * cellSize, cellSize, cellSize);
        // 设置文本颜色为黑色
        p.fill(0);
        // 将数字转换为长度为6的二进制字符串
        let binaryIndex = index.toString(2).padStart(6, "0");
        // 在当前格子中显示二进制数字
        p.text(
          binaryIndex,
          col * cellSize + cellSize / 2,
          row * cellSize + cellSize / 2
        );
      }
    }
  };
}

// index-0

function sketch3(p) {
  p.setup = function () {
    // 找到想把该画布插入的位置
    let divElement = document.getElementById("chessboard-index-0");
    let canvas = p.createCanvas(400, 400);
    canvas.parent(divElement);

    // 计算每个格子的大小
    cellSize = p.width / boardSize;
    // 设置文本对齐方式为居中
    p.textAlign(p.CENTER, p.CENTER);
    // 设置文本大小
    p.textSize(10);
    p.frameRate(5);
  };
  p.draw = function () {
    // 设置背景颜色为白色
    p.background(255);
    // 遍历棋盘的每一行
    for (let row = 0; row < boardSize; row++) {
      // 遍历棋盘的每一列
      for (let col = 0; col < boardSize; col++) {
        // 计算当前格子的索引
        let index = row * boardSize + col;
        // 根据索引的奇偶性来设置格子的填充颜色
        p.fill((index + row) % 2 === 0 ? 200 : 255);
        if (isBitSet(index, 0)) {
          p.fill(colors[0]);
        }

        // 绘制当前格子
        p.rect(col * cellSize, row * cellSize, cellSize, cellSize);
        // 设置文本颜色为黑色
        p.fill(0);
        // 将数字转换为长度为6的二进制字符串
        let binaryIndex = index.toString(2).padStart(6, "0");
        // 在当前格子中显示二进制数字
        p.text(
          binaryIndex,
          col * cellSize + cellSize / 2,
          row * cellSize + cellSize / 2
        );
      }
    }
  };
}

// index-1

function sketch4(p) {
  p.setup = function () {
    // 找到想把该画布插入的位置
    let divElement = document.getElementById("chessboard-index-1");
    let canvas = p.createCanvas(400, 400);
    canvas.parent(divElement);

    // 计算每个格子的大小
    cellSize = p.width / boardSize;
    // 设置文本对齐方式为居中
    p.textAlign(p.CENTER, p.CENTER);
    // 设置文本大小
    p.textSize(10);
    p.frameRate(5);
  };
  p.draw = function () {
    // 设置背景颜色为白色
    p.background(255);
    // 遍历棋盘的每一行
    for (let row = 0; row < boardSize; row++) {
      // 遍历棋盘的每一列
      for (let col = 0; col < boardSize; col++) {
        // 计算当前格子的索引
        let index = row * boardSize + col;
        // 根据索引的奇偶性来设置格子的填充颜色
        p.fill((index + row) % 2 === 0 ? 200 : 255);
        if (isBitSet(index, 1)) {
          p.fill(colors[1]);
        }

        // 绘制当前格子
        p.rect(col * cellSize, row * cellSize, cellSize, cellSize);
        // 设置文本颜色为黑色
        p.fill(0);
        // 将数字转换为长度为6的二进制字符串
        let binaryIndex = index.toString(2).padStart(6, "0");
        // 在当前格子中显示二进制数字
        p.text(
          binaryIndex,
          col * cellSize + cellSize / 2,
          row * cellSize + cellSize / 2
        );
      }
    }
  };
}

// index-2
function sketch5(p) {
  p.setup = function () {
    // 找到想把该画布插入的位置
    let divElement = document.getElementById("chessboard-index-2");
    let canvas = p.createCanvas(400, 400);
    canvas.parent(divElement);
    // 计算每个格子的大小
    cellSize = p.width / boardSize;
    // 设置文本对齐方式为居中
    p.textAlign(p.CENTER, p.CENTER);
    // 设置文本大小
    p.textSize(10);
    p.frameRate(5);
  };
  p.draw = function () {
    // 设置背景颜色为白色
    p.background(255);
    // 遍历棋盘的每一行
    for (let row = 0; row < boardSize; row++) {
      // 遍历棋盘的每一列
      for (let col = 0; col < boardSize; col++) {
        // 计算当前格子的索引
        let index = row * boardSize + col;
        // 根据索引的奇偶性来设置格子的填充颜色
        p.fill((index + row) % 2 === 0 ? 200 : 255);
        if (isBitSet(index, 2)) {
          p.fill(colors[2]);
        }
        // 绘制当前格子
        p.rect(col * cellSize, row * cellSize, cellSize, cellSize);
        // 设置文本颜色为黑色
        p.fill(0);
        // 将数字转换为长度为6的二进制字符串
        let binaryIndex = index.toString(2).padStart(6, "0");
        // 在当前格子中显示二进制数字
        p.text(
          binaryIndex,
          col * cellSize + cellSize / 2,
          row * cellSize + cellSize / 2
        );
      }
    }
  };
}

// index-3
function sketch6(p) {
  p.setup = function () {
    // 找到想把该画布插入的位置
    let divElement = document.getElementById("chessboard-index-3");
    let canvas = p.createCanvas(400, 400);
    canvas.parent(divElement);
    // 计算每个格子的大小
    cellSize = p.width / boardSize;
    // 设置文本对齐方式为居中
    p.textAlign(p.CENTER, p.CENTER);
    // 设置文本大小
    p.textSize(10);
    p.frameRate(5);
  };
  p.draw = function () {
    // 设置背景颜色为白色
    p.background(255);
    // 遍历棋盘的每一行
    for (let row = 0; row < boardSize; row++) {
      // 遍历棋盘的每一列
      for (let col = 0; col < boardSize; col++) {
        // 计算当前格子的索引
        let index = row * boardSize + col;
        // 根据索引的奇偶性来设置格子的填充颜色
        p.fill((index + row) % 2 === 0 ? 200 : 255);
        if (isBitSet(index, 3)) {
          p.fill(colors[3]);
        }
        // 绘制当前格子
        p.rect(col * cellSize, row * cellSize, cellSize, cellSize);
        // 设置文本颜色为黑色
        p.fill(0);
        // 将数字转换为长度为6的二进制字符串
        let binaryIndex = index.toString(2).padStart(6, "0");
        // 在当前格子中显示二进制数字
        p.text(
          binaryIndex,
          col * cellSize + cellSize / 2,
          row * cellSize + cellSize / 2
        );
      }
    }
  };
}

// index-4
function sketch7(p) {
  p.setup = function () {
    // 找到想把该画布插入的位置
    let divElement = document.getElementById("chessboard-index-4");
    let canvas = p.createCanvas(400, 400);
    canvas.parent(divElement);
    // 计算每个格子的大小
    cellSize = p.width / boardSize;
    // 设置文本对齐方式为居中
    p.textAlign(p.CENTER, p.CENTER);
    // 设置文本大小
    p.textSize(10);
    p.frameRate(5);
  };
  p.draw = function () {
    // 设置背景颜色为白色
    p.background(255);
    // 遍历棋盘的每一行
    for (let row = 0; row < boardSize; row++) {
      // 遍历棋盘的每一列
      for (let col = 0; col < boardSize; col++) {
        // 计算当前格子的索引
        let index = row * boardSize + col;
        // 根据索引的奇偶性来设置格子的填充颜色
        p.fill((index + row) % 2 === 0 ? 200 : 255);
        if (isBitSet(index, 4)) {
          p.fill(colors[4]);
        }
        // 绘制当前格子
        p.rect(col * cellSize, row * cellSize, cellSize, cellSize);
        // 设置文本颜色为黑色
        p.fill(0);
        // 将数字转换为长度为6的二进制字符串
        let binaryIndex = index.toString(2).padStart(6, "0");
        // 在当前格子中显示二进制数字
        p.text(
          binaryIndex,
          col * cellSize + cellSize / 2,
          row * cellSize + cellSize / 2
        );
      }
    }
  };
}

// index-5
function sketch8(p) {
  p.setup = function () {
    // 找到想把该画布插入的位置
    let divElement = document.getElementById("chessboard-index-5");
    let canvas = p.createCanvas(400, 400);
    canvas.parent(divElement);
    // 计算每个格子的大小
    cellSize = p.width / boardSize;
    // 设置文本对齐方式为居中
    p.textAlign(p.CENTER, p.CENTER);
    // 设置文本大小
    p.textSize(10);
    p.frameRate(5);
  };
  p.draw = function () {
    // 设置背景颜色为白色
    p.background(255);
    // 遍历棋盘的每一行
    for (let row = 0; row < boardSize; row++) {
      // 遍历棋盘的每一列
      for (let col = 0; col < boardSize; col++) {
        // 计算当前格子的索引
        let index = row * boardSize + col;
        // 根据索引的奇偶性来设置格子的填充颜色
        p.fill((index + row) % 2 === 0 ? 200 : 255);
        if (isBitSet(index, 5)) {
          p.fill(colors[5]);
        }
        // 绘制当前格子
        p.rect(col * cellSize, row * cellSize, cellSize, cellSize);
        // 设置文本颜色为黑色
        p.fill(0);
        // 将数字转换为长度为6的二进制字符串
        let binaryIndex = index.toString(2).padStart(6, "0");
        // 在当前格子中显示二进制数字
        p.text(
          binaryIndex,
          col * cellSize + cellSize / 2,
          row * cellSize + cellSize / 2
        );
      }
    }
  };
}
new p5(sketch1);
new p5(sketch2);
new p5(sketch3);
new p5(sketch4);
new p5(sketch5);
new p5(sketch6);
new p5(sketch7);
new p5(sketch8);

// 以下为4*4的部分

function sketch4_1(p) {
  p.setup = function () {
    // 找到想把该画布插入的位置
    let divElement = document.getElementById("chessboard4");
    let canvas = p.createCanvas(200, 200);
    canvas.parent(divElement);

    // 计算每个格子的大小
    cellSize_4 = p.width / boardSize_4;
    // 设置文本对齐方式为居中
    p.textAlign(p.CENTER, p.CENTER);
    // 设置文本大小
    p.textSize(10);
    p.frameRate(5);
  };
  p.draw = function () {
    // 设置背景颜色为白色
    p.background(255);
    // 遍历棋盘的每一行
    for (let row = 0; row < boardSize_4; row++) {
      // 遍历棋盘的每一列
      for (let col = 0; col < boardSize_4; col++) {
        // 计算当前格子的索引
        let index = row * boardSize_4 + col;
        // 根据索引的奇偶性来设置格子的填充颜色
        p.fill((index + row) % 2 === 0 ? 200 : 255);
        // 绘制当前格子
        p.rect(col * cellSize_4, row * cellSize_4, cellSize_4, cellSize_4);
        // 设置文本颜色为黑色
        p.fill(0);
        // 将数字转换为长度为6的二进制字符串
        let binaryIndex = index.toString(2).padStart(4, "0");
        // 在当前格子中显示二进制数字
        p.text(
          binaryIndex,
          col * cellSize_4 + cellSize_4 / 2,
          row * cellSize_4 + cellSize_4 / 2
        );
      }
    }
  };
}

// index-0
function sketch4_2(p) {
  p.setup = function () {
    // 找到想把该画布插入的位置
    let divElement = document.getElementById("chessboard4-index-0");
    let canvas = p.createCanvas(200, 200);
    canvas.parent(divElement);

    // 计算每个格子的大小
    cellSize_4 = p.width / boardSize_4;
    // 设置文本对齐方式为居中
    p.textAlign(p.CENTER, p.CENTER);
    // 设置文本大小
    p.textSize(10);
    p.frameRate(5);
  };
  p.draw = function () {
    // 设置背景颜色为白色
    p.background(255);
    // 遍历棋盘的每一行
    for (let row = 0; row < boardSize_4; row++) {
      // 遍历棋盘的每一列
      for (let col = 0; col < boardSize_4; col++) {
        // 计算当前格子的索引
        let index = row * boardSize_4 + col;
        // 根据索引的奇偶性来设置格子的填充颜色
        p.fill((index + row) % 2 === 0 ? 200 : 255);
        if (isBitSet(index, 0)) {
          p.fill(colors[0]);
        }
        // 绘制当前格子
        p.rect(col * cellSize_4, row * cellSize_4, cellSize_4, cellSize_4);
        // 设置文本颜色为黑色
        p.fill(0);
        // 将数字转换为长度为6的二进制字符串
        let binaryIndex = index.toString(2).padStart(4, "0");
        // 在当前格子中显示二进制数字
        p.text(
          binaryIndex,
          col * cellSize_4 + cellSize_4 / 2,
          row * cellSize_4 + cellSize_4 / 2
        );
      }
    }
  };
}

// index-1
function sketch4_3(p) {
  p.setup = function () {
    // 找到想把该画布插入的位置
    let divElement = document.getElementById("chessboard4-index-1");
    let canvas = p.createCanvas(200, 200);
    canvas.parent(divElement);

    // 计算每个格子的大小
    cellSize_4 = p.width / boardSize_4;
    // 设置文本对齐方式为居中
    p.textAlign(p.CENTER, p.CENTER);
    // 设置文本大小
    p.textSize(10);
    p.frameRate(5);
  };
  p.draw = function () {
    // 设置背景颜色为白色
    p.background(255);
    // 遍历棋盘的每一行
    for (let row = 0; row < boardSize_4; row++) {
      // 遍历棋盘的每一列
      for (let col = 0; col < boardSize_4; col++) {
        // 计算当前格子的索引
        let index = row * boardSize_4 + col;
        // 根据索引的奇偶性来设置格子的填充颜色
        p.fill((index + row) % 2 === 0 ? 200 : 255);
        if (isBitSet(index, 1)) {
          p.fill(colors[1]);
        }
        // 绘制当前格子
        p.rect(col * cellSize_4, row * cellSize_4, cellSize_4, cellSize_4);
        // 设置文本颜色为黑色
        p.fill(0);
        // 将数字转换为长度为6的二进制字符串
        let binaryIndex = index.toString(2).padStart(4, "0");
        // 在当前格子中显示二进制数字
        p.text(
          binaryIndex,
          col * cellSize_4 + cellSize_4 / 2,
          row * cellSize_4 + cellSize_4 / 2
        );
      }
    }
  };
}

// index-2
function sketch4_4(p) {
  p.setup = function () {
    // 找到想把该画布插入的位置
    let divElement = document.getElementById("chessboard4-index-2");
    let canvas = p.createCanvas(200, 200);
    canvas.parent(divElement);

    // 计算每个格子的大小
    cellSize_4 = p.width / boardSize_4;
    // 设置文本对齐方式为居中
    p.textAlign(p.CENTER, p.CENTER);
    // 设置文本大小
    p.textSize(10);
    p.frameRate(5);
  };
  p.draw = function () {
    // 设置背景颜色为白色
    p.background(255);
    // 遍历棋盘的每一行
    for (let row = 0; row < boardSize_4; row++) {
      // 遍历棋盘的每一列
      for (let col = 0; col < boardSize_4; col++) {
        // 计算当前格子的索引
        let index = row * boardSize_4 + col;
        // 根据索引的奇偶性来设置格子的填充颜色
        p.fill((index + row) % 2 === 0 ? 200 : 255);
        if (isBitSet(index, 2)) {
          p.fill(colors[2]);
        }
        // 绘制当前格子
        p.rect(col * cellSize_4, row * cellSize_4, cellSize_4, cellSize_4);
        // 设置文本颜色为黑色
        p.fill(0);
        // 将数字转换为长度为6的二进制字符串
        let binaryIndex = index.toString(2).padStart(4, "0");
        // 在当前格子中显示二进制数字
        p.text(
          binaryIndex,
          col * cellSize_4 + cellSize_4 / 2,
          row * cellSize_4 + cellSize_4 / 2
        );
      }
    }
  };
}

// index-3
function sketch4_5(p) {
  p.setup = function () {
    // 找到想把该画布插入的位置
    let divElement = document.getElementById("chessboard4-index-3");
    let canvas = p.createCanvas(200, 200);
    canvas.parent(divElement);

    // 计算每个格子的大小
    cellSize_4 = p.width / boardSize_4;
    // 设置文本对齐方式为居中
    p.textAlign(p.CENTER, p.CENTER);
    // 设置文本大小
    p.textSize(10);
    p.frameRate(5);
  };
  p.draw = function () {
    // 设置背景颜色为白色
    p.background(255);
    // 遍历棋盘的每一行
    for (let row = 0; row < boardSize_4; row++) {
      // 遍历棋盘的每一列
      for (let col = 0; col < boardSize_4; col++) {
        // 计算当前格子的索引
        let index = row * boardSize_4 + col;
        // 根据索引的奇偶性来设置格子的填充颜色
        p.fill((index + row) % 2 === 0 ? 200 : 255);
        if (isBitSet(index, 3)) {
          p.fill(colors[3]);
        }
        // 绘制当前格子
        p.rect(col * cellSize_4, row * cellSize_4, cellSize_4, cellSize_4);
        // 设置文本颜色为黑色
        p.fill(0);
        // 将数字转换为长度为6的二进制字符串
        let binaryIndex = index.toString(2).padStart(4, "0");
        // 在当前格子中显示二进制数字
        p.text(
          binaryIndex,
          col * cellSize_4 + cellSize_4 / 2,
          row * cellSize_4 + cellSize_4 / 2
        );
      }
    }
  };
}

new p5(sketch4_1);
new p5(sketch4_2);
new p5(sketch4_3);
new p5(sketch4_4);
new p5(sketch4_5);
