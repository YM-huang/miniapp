## 1. HTML面试题

### 1.1 如何理解html语义化
* 让人更容易读懂（增加代码可读性）。
* 让搜索引擎更容易读懂，有助于爬虫抓取更多的有效信息，爬虫依赖于标签来确定上下文和各个关键字的权重（SEO）。
* 在没有 CSS 样式下，页面也能呈现出很好地内容结构、代码结构。

### 1.2 script 标签中 defer 和 async 的区别？
* script ：会阻碍 HTML 解析，只有下载好并执行完脚本才会继续解析 HTML。
* async script ：解析 HTML 过程中进行脚本的异步下载，下载成功立马执行，有可能会阻断 HTML 的解析。
* defer script：完全不会阻碍 HTML 的解析，解析完成之后再按照顺序执行脚本。

下图清晰地展示了三种 script 的过程：
![image-20230130192613005](image/image-20230130192613005.png)

### 1.3 从浏览器地址栏输入 url 到请求返回发生了什么
1. 输入 URL 后解析出协议、主机、端口、路径等信息，并构造一个 HTTP 请求。
	* 强缓存。
	* 协商缓存。
2. DNS 域名解析。
3. TCP连接
>总是要问：为什么需要三次握手，两次不行吗？其实这是由 TCP 的自身特点可靠传输决定的。客户端和服务端要进行可靠传输，那么就需要确认双方的接收和发送能力。第一次握手可以确认客服端的发送能力，第二次握手，确认了服务端的发送能力和接收能力，所以第三次握手才可以确认客户端的接收能力。不然容易出现丢包的现象。

4. http 请求。
5. 服务器处理请求并返回 HTTP 报文。
6. 浏览器渲染页面。

## 2. CSS面试题
### 2.1 盒模型介绍
CSS3 中的盒模型有以下两种：标准盒模型、IE（替代）盒模型。
两种盒子模型都是由 content + padding + border + margin 构成，其大小都是由 content + padding + border 决定的，但是盒子内容宽/高度（即 width/height）的计算范围根据盒模型的不同会有所不同：
* 标准盒模型：只包含 content 。
* IE（替代）盒模型：content + padding + border 。

可以通过 box-sizing 来改变元素的盒模型：
* box-sizing: content-box ：标准盒模型（默认值）。
* box-sizing: border-box ：IE（替代）盒模型。

### 2.2 css 选择器和优先级
常规来说，大家都知道样式的优先级一般为 !important > style > id > class > 标签 ，但是涉及多类选择器作用于同一个元素时候怎么判断优先级呢？相信我，你在改一些第三方库（比如 antd 😂）样式时，理解这个会帮助很大！

优先级是由 A 、B、C、D 的值来决定的，其中它们的值计算规则如下：
1. 如果存在内联样式，那么 A = 1, 否则 A = 0;
2. B 的值等于 ID选择器（#id） 出现的次数;
3. C 的值等于 类选择器（.class） 和 属性选择器（a[href="https://example.org"]） 和 伪类（:first-child） 出现的总次数;
4. D 的值等于 标签选择器（h1,a,div） 和 伪元素（::before,::after） 出现的总次数 。

从左至右比较，如果是样式优先级相等，取后面出现的样式。

### 2.3 重排（reflow）和重绘（repaint）的理解
简单地总结下两者的概念：
* 重排：无论通过什么方式影响了元素的几何信息(元素在视口内的位置和尺寸大小)，浏览器需要重新计算元素在视口内的几何属性，这个过程叫做重排。
* 重绘：通过构造渲染树和重排（回流）阶段，我们知道了哪些节点是可见的，以及可见节点的样式和具体的几何信息(元素在视口内的位置和尺寸大小)，接下来就可以将渲染树的每个节点都转换为屏幕上的实际像素，这个阶段就叫做重绘。

如何减少重排和重绘？
* 最小化重绘和重排，比如样式集中改变，使用添加新样式类名 .class 或 cssText 。
批量操作 DOM，比如读取某元素 offsetWidth 属性存到一个临时变量，再去使用，而不是频* 繁使用这个计算属性；又比如利用 document.createDocumentFragment() 来添加要被添加的节点，处理完之后再插入到实际 DOM 中。
* 使用 **absolute** 或 **fixed** 使元素脱离文档流，这在制作复杂的动画时对性能的影响比较明显。
* 开启 GPU 加速，利用 css 属性 transform 、will-change 等，比如改变元素位置，我们使用 translate 会比使用绝对定位改变其 left 、top 等来的高效，因为它不会触发重排或重绘，transform 使浏览器为元素创建⼀个 GPU 图层，这使得动画元素在一个独立的层中进行渲染。当元素的内容没有发生改变，就没有必要进行重绘。

1. 渲染过程：DOM树（HTML）& CSSOM （CSS） 结合生成渲染树；回流（Layout）得到节点的几何信息（大小和位置）；重绘（Painting）得到节点的绝对像素，将渲染树的每个节点都转换为屏幕上的实际像素；展示。
2. 渲染树只包含可见节点， 一些不会渲染输出的节点，比如 script、meta、link 等 和 设置 display:none 的节点不会出现在渲染树中。但是利用 visibility 和 opacity 隐藏的节点会显示在渲染树上。
3. 当页面布局和几何信息发生变化的时候，就需要回流。如新增 DOM，元素尺寸变化，窗口大小变化等。回流一定会触发重绘，而重绘不一定会回流。
4. 大多数浏览器都会通过队列化修改并批量执行来优化重排过程。当你获取布局信息的操作的时候，会强制队列刷新。
5. 减少回流和重绘：1）修改样式的时候通过 css 类名修改或通过 cssText 修改。2）DOM 元素离线修改—>隐藏元素，应用修改，重新显示。（浏览器本身也会有优化）3）避免触发同步布局事件，如获取 offsetWidth 等属性值，因为会强制浏览器刷新队列。4）使用绝对定位让复杂动画脱离文档流减少父元素以及后续元素频繁的回流。5）使用css3硬件加速，可以让 transform、opacity、filters、will-change 这些动画不会引起回流重绘 （会提高内存占用）。

### 2.4 对 BFC 的理解
BFC（Block Formatting Contexts） 即块级格式上下文，根据盒模型可知，每个元素都被定义为一个矩形盒子，然而盒子的布局会受到尺寸，定位，盒子的子元素或兄弟元素，视口的尺寸等因素决定，所以这里有一个浏览器计算的过程，计算的规则就是由一个叫做视觉格式化模型的东西所定义的，BFC 就是来自这个概念，它是 CSS 视觉渲染的一部分，用于决定块级盒的布局及浮动相互影响范围的一个区域。

BFC 具有一些特性：
1. 块级元素会在垂直方向一个接一个的排列，和文档流的排列方式一致。
2. 在 BFC 中上下相邻的两个容器的 margin  会重叠，创建新的 BFC 可以避免外边距重叠。
3. 计算 BFC 的高度时，需要计算浮动元素的高度。
4. BFC 区域不会与浮动的容器发生重叠。
5. BFC 是独立的容器，容器内部元素不会影响外部元素。
6. 每个元素的左 margin  值和容器的左 border  相接触。

利用这些特性，我们可以解决以下问题：
* 利用 4  和 6 ，我们可以实现三栏（或两栏）自适应布局。
* 利用 2 ，我们可以避免 margin  重叠问题。
* 利用 3 ，我们可以避免高度塌陷。

创建 BFC 的方式：
* 绝对定位元素（position 为 absolute 或 fixed ）。
* 行内块元素，即 display 为 inline-block 。
* overflow 的值不为 visible 。

* 根元素（\<html>）
* 浮动元素（float 不为 none）
* 绝对定位元素（position 为 absolute 或 fixed）
* 表格的标题和单元格（display 为 table-caption，table-cell）
* 匿名表格单元格元素（display 为 table 或 inline-table）
* 行内块元素（display 为 inline-block）
* overflow 的值不为 visible 的元素
* 弹性元素（display 为 flex 或 inline-flex 的元素的直接子元素）
* 网格元素（display 为 grid 或 inline-grid 的元素的直接子元素）


### 2.5 实现两栏布局（左侧固定 + 右侧自适应布局）
现在有以下 DOM 结构：
```html
<div class="outer">
  <div class="left">左侧</div>
  <div class="right">右侧</div>
</div>
```
1. 利用浮动，左边元素宽度固定 ，设置向左浮动。将右边元素的 margin-left 设为固定宽度 。注意，因为右边元素的 width 默认为 auto ，所以会自动撑满父元素。
```css
.outer {
  height: 100px;
}
.left {
  float: left;
  width: 200px;
  height: 100%;
  background: lightcoral;
}
.right {
  margin-left: 200px;
  height: 100%;
  background: lightseagreen;
}
```
2. 同样利用浮动，左边元素宽度固定 ，设置向左浮动。右侧元素设置 overflow: hidden; 这样右边就触发了 BFC ，BFC 的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠。
```css
.outer {
  height: 100px;
}
.left {
  float: left;
  width: 200px;
  height: 100%;
  background: lightcoral;
}
.right {
  overflow: auto;
  height: 100%;
  background: lightseagreen;
}
```
3. 利用 flex 布局，左边元素固定宽度，右边的元素设置 flex: 1 。
```css
.outer {
  display: flex;
  height: 100px;
}
.left {
  width: 200px;
  height: 100%;
  background: lightcoral;
}
.right {
  flex: 1;
  height: 100%;
  background: lightseagreen;
}
```
4. 利用绝对定位，父级元素设为相对定位。左边元素 absolute  定位，宽度固定。右边元素的 margin-left  的值设为左边元素的宽度值。
```css
.outer {
  position: relative;
  height: 100px;
}
.left {
  position: absolute;
  width: 200px;
  height: 100%;
  background: lightcoral;
}
.right {
  margin-left: 200px;
  height: 100%;
  background: lightseagreen;
}
```
5. 利用绝对定位，父级元素设为相对定位。左边元素宽度固定，右边元素 absolute  定位， left  为宽度大小，其余方向定位为 0 。
```css
.outer {
  position: relative;
  height: 100px;
}
.left {
  width: 200px;
  height: 100%;
  background: lightcoral;
}
.right {
  position: absolute;
  left: 200px;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  background: lightseagreen;
}
```
### 2.6 实现圣杯布局和双飞翼布局（经典三分栏布局）
圣杯布局和双飞翼布局的目的：
* 三栏布局，中间一栏最先加载和渲染（内容最重要，这就是为什么还需要了解这种布局的原因）。
* 两侧内容固定，中间内容随着宽度自适应。
* 一般用于 PC 网页。

圣杯布局和双飞翼布局的技术总结：
* 使用 float  布局。
* 两侧使用 margin 负值，以便和中间内容横向重叠。
* 防止中间内容被两侧覆盖，圣杯布局用 padding ，双飞翼布局用 margin 。

圣杯布局： HTML 结构：
```html
<div id="container" class="clearfix">
  <p class="center">我是中间</p>
  <p class="left">我是左边</p>
  <p class="right">我是右边</p>
</div>
```
CSS 样式：
```css
#container {
  padding-left: 200px;
  padding-right: 150px;
  overflow: auto;
}
#container p {
  float: left;
}
.center {
  width: 100%;
  background-color: lightcoral;
}
.left {
  width: 200px;
  position: relative;
  left: -200px;
  margin-left: -100%;
  background-color: lightcyan;
}
.right {
  width: 150px;
  margin-right: -150px;
  background-color: lightgreen;
}
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
```
双飞翼布局： HTML 结构：
```html
<div id="main" class="float">
  <div id="main-wrap">main</div>
</div>
<div id="left" class="float">left</div>
<div id="right" class="float">right</div>
```
CSS 样式：
```css
.float {
  float: left;
}
#main {
  width: 100%;
  height: 200px;
  background-color: lightpink;
}
#main-wrap {
  margin: 0 190px 0 190px;
}
#left {
  width: 190px;
  height: 200px;
  background-color: lightsalmon;
  margin-left: -100%;
}
#right {
  width: 190px;
  height: 200px;
  background-color: lightskyblue;
  margin-left: -190px;
}
```

tips：上述代码中 margin-left: -100%  相对的是父元素的 content  宽度，即不包含 paddig 、 border  的宽度。

其实以上问题需要掌握  [Marin负值问题](https://zhuanlan.zhihu.com/p/25892372) 即可很好理解。

### 2.7 水平垂直居中多种实现方式
1. 利用绝对定位，设置 left: 50%  和 top: 50%  现将子元素左上角移到父元素中心位置，然后再通过 translate  来调整子元素的中心点到父元素的中心。该方法可以不定宽高。
```css
.father {
  position: relative;
}
.son {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```
2. 利用绝对定位，子元素所有方向都为 0 ，将 margin  设置为 auto ，由于宽高固定，对应方向实现平分，该方法必须盒子有宽高。
```css
.father {
  position: relative;
}
.son {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0px;
  margin: auto;
  height: 100px;
  width: 100px;
}
```
3. 利用绝对定位，设置 left: 50% 和 top: 50% 现将子元素左上角移到父元素中心位置，然后再通过 margin-left  和 margin-top  以子元素自己的一半宽高进行负值赋值。该方法必须定宽高。
```css
.father {
  position: relative;
}
.son {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 200px;
  height: 200px;
  margin-left: -100px;
  margin-top: -100px;
}
```
4. 利用 flex ，最经典最方便的一种了，不用解释，定不定宽高无所谓的。
```css
.father {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
其实还有很多方法，比如 display: grid  或 display: table-cell  来做.

### 2.8 flex 布局
这一块内容看 Flex 布局教程 就够了。

这里有个小问题，很多时候我们会用到 flex: 1 ，它具体包含了以下的意思：

* flex-grow: 1 ：该属性默认为 0 ，如果存在剩余空间，元素也不放大。设置为 1  代表会放大。
* flex-shrink: 1 ：该属性默认为 1 ，如果空间不足，元素缩小。
* flex-basis: 0% ：该属性定义在分配多余空间之前，元素占据的主轴空间。浏览器就是根据这个属性来计算是否有多余空间的。默认值为 auto ，即项目本身大小。设置为 0%  之后，因为有 flex-grow  和 flex-shrink  的设置会自动放大或缩小。在做两栏布局时，如果右边的自适应元素 flex-basis  设为 auto  的话，其本身大小将会是 0 。

### 2.9 line-height 如何继承？
* 父元素的 line-height 写了具体数值，比如 30px，则子元素 line-height 继承该值。
* 父元素的 line-height 写了比例，比如 1.5 或 2，则子元素 line-height 也是继承该比例。
* 父元素的 line-height 写了百分比，比如 200%，则子元素 line-height 继承的是父元素 font-size * 200% 计算出来的值。

## JS基础
js 的考察其实来回就那些东西，不过就我自己而已学习的时候理解是真的理解了，但是忘也确实会忘（大家都说理解了一定不会忘，但是要答全的话还是需要理解+背）。
### 1. 数据类型
以下是比较重要的几个 js 变量要掌握的点。
#### 1.1 基本的数据类型介绍，及值类型和引用类型的理解
在 JS 中共有 8  种基础的数据类型，分别为： Undefined 、 Null 、 Boolean 、 Number 、 String 、 Object 、 Symbol 、 BigInt 。

其中 Symbol  和 BigInt  是 ES6 新增的数据类型，可能会被单独问：
* Symbol 代表独一无二的值，最大的用法是用来定义对象的唯一属性名。
* BigInt 可以表示任意大小的整数。

值类型的赋值变动过程如下：
```js
let a = 100;
let b = a;
a = 200;
console.log(b); // 100
```

![image-20230208203730255](image/image-20230208203730255.png)

![image-20230208203742464](image/image-20230208203742464.png)

![image-20230208203756896](image/image-20230208203756896.png)

值类型是直接存储在**栈（stack）**中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；

引用类型的赋值变动过程如下：
```js
let a = { age: 20 };
let b = a;
b.age = 30;
console.log(a.age); // 30
```

引用类型存储在**堆（heap）**中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；

#### 1.2 数据类型的判断
* typeof：能判断所有值类型，函数。不可对 null、对象、数组进行精确判断，因为都返回 object 。
```js
console.log(typeof undefined); // undefined
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof "str"); // string
console.log(typeof Symbol("foo")); // symbol
console.log(typeof 2172141653n); // bigint
console.log(typeof function () {}); // function
// 不能判别
console.log(typeof []); // object
console.log(typeof {}); // object
console.log(typeof null); // object
```
* instanceof：能判断对象类型，不能判断基本数据类型，其内部运行机制是判断在其原型链中能否找到该类型的原型。比如考虑以下代码：
```js
class People {}
class Student extends People {}

const vortesnail = new Student();

console.log(vortesnail instanceof People); // true
console.log(vortesnail instanceof Student); // true
```
其实现就是顺着原型链去找，如果能找到对应的 Xxxxx.prototype  即为 true 。比如这里的 vortesnail  作为实例，顺着原型链能找到 Student.prototype  及 People.prototype ，所以都为 true 。
* Object.prototype.toString.call()：所有原始数据类型都是能判断的，还有 Error 对象，Date 对象等。
```js
Object.prototype.toString.call(2); // "[object Number]"
Object.prototype.toString.call(""); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(Math); // "[object Math]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(function () {}); // "[object Function]"
```
在面试中有一个经常被问的问题就是：如何判断变量是否为数组？
```js
Array.isArray(arr); // true
arr.__proto__ === Array.prototype; // true
arr instanceof Array; // true
Object.prototype.toString.call(arr); // "[object Array]"
```
一道经典的面试题，如何让：a == 1 && a == 2 && a == 3。

根据上面的拆箱转换，以及==的隐式转换，我们可以轻松写出答案：
```js
const a = {
   value:[3,2,1],
   valueOf: function () {return this.value.pop(); },
} 
```
#### 1.3 手写[深拷贝](https://juejin.cn/post/6844903929705136141)（一定要会！）
值传递和引用传递  [2.5节](https://juejin.cn/post/6844903854882947080#heading-7)

* 你真的理解什么是深拷贝吗？
* 在面试官眼里，什么样的深拷贝才算合格？
* 什么样的深拷贝能让面试官感到惊艳？

我们来明确一下深拷贝和浅拷贝的定义：

浅拷贝：

![image-20230209111335511](image/image-20230209111335511.png)
>创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

深拷贝：![image-20230209142120710](image/image-20230209142120710.png)
>将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象

##### 乞丐版
在不使用第三方库的情况下，我们想要深拷贝一个对象，用的最多的就是下面这个方法。
```js
JSON.parse(JSON.stringify());
```
这种写法非常简单，而且可以应对大部分的应用场景，但是它还是有很大缺陷的，比如拷贝其他引用类型、拷贝函数、循环引用等情况。
显然，面试时你只说出这样的方法是一定不会合格的。
接下来，我们一起来手动实现一个深拷贝方法。

##### 基础版本
如果是浅拷贝的话，我们可以很容易写出下面的代码：
```js
function clone(target) {
    let cloneTarget = {};
    for (const key in target) {
        cloneTarget[key] = target[key];
    }
    return cloneTarget;
};
```
创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性依次添加到新对象上，返回。

如果是深拷贝的话，考虑到我们要拷贝的对象是不知道有多少层深度的，我们可以用递归来解决问题，稍微改写上面的代码：

* 如果是原始类型，无需继续拷贝，直接返回
* 如果是引用类型，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性执行深拷贝后依次添加到新对象上。

很容易理解，如果有更深层次的对象可以继续递归直到属性为原始类型，这样我们就完成了一个最简单的深拷贝：
```js
function clone(target) {
    if (typeof target === 'object') {
        let cloneTarget = {};
        for (const key in target) {
            cloneTarget[key] = clone(target[key]);
        }
        return cloneTarget;
    } else {
        return target;
    }
};
```
这是一个最基础版本的深拷贝，这段代码可以让你向面试官展示你可以用递归解决问题，但是显然，他还有非常多的缺陷，比如，还没有考虑数组。
##### 考虑数组
在上面的版本中，我们的初始化结果只考虑了普通的object，下面我们只需要把初始化代码稍微一变，就可以兼容数组了：
```js
module.exports = function clone(target) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        for (const key in target) {
            cloneTarget[key] = clone(target[key]);
        }
        return cloneTarget;
    } else {
        return target;
    }
};
```
##### 循环引用
我们执行下面这样一个测试用例：
```js
const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};
target.target = target;
```
可以看到下面的结果：![image-20230209145457356](image/image-20230209145457356.png)

很明显，因为递归进入死循环导致栈内存溢出了。

原因就是上面的对象存在循环引用的情况，即对象的属性间接或直接的引用了自身的情况：

解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。

这个存储空间，需要可以存储key-value形式的数据，且key可以是一个引用类型，我们可以选择Map这种数据结构：
* 检查map中有无克隆过的对象
* 有 - 直接返回
* 没有 - 将当前对象作为key，克隆对象作为value进行存储
* 继续克隆
```js
function clone(target, map = new Map()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);
        for (const key in target) {
            cloneTarget[key] = clone(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
};
```

##### 常规
```js
/**
 * 深拷贝
 * @param {Object} obj 要拷贝的对象
 * @param {Map} map 用于存储循环引用对象的地址
 */

function deepClone(obj = {}, map = new Map()) {
  if (typeof obj !== "object") {
    return obj;
  }
  if (map.get(obj)) {
    return map.get(obj);
  }

  let result = {};
  // 初始化返回结果
  if (
    obj instanceof Array ||
    // 加 || 的原因是为了防止 Array 的 prototype 被重写，Array.isArray 也是如此
    Object.prototype.toString(obj) === "[object Array]"
  ) {
    result = [];
  }
  // 防止循环引用
  map.set(obj, result);
  for (const key in obj) {
    // 保证 key 不是原型属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用
      result[key] = deepClone(obj[key], map);
    }
  }

  // 返回结果
  return result;
}
```
#### 1.4 根据 0.1+0.2 ! == 0.3，讲讲 IEEE 754 ，如何让其相等？
原因总结：
* 进制转换 ：js 在做数字计算的时候，0.1 和 0.2 都会被转成二进制后无限循环 ，但是 js 采用的 IEEE 754 二进制浮点运算，最大可以存储 53 位有效数字，于是大于 53 位后面的会全部截掉，将导致精度丢失。
* 对阶运算 ：由于指数位数不相同，运算时需要对阶运算，阶小的尾数要根据阶差来右移（0舍1入），尾数位移时可能会发生数丢失的情况，影响精度。

解决办法：

1. 转为整数（大数）运算。
```js
function add(a, b) {
  const maxLen = Math.max(
    a.toString().split(".")[1].length,
    b.toString().split(".")[1].length
  );
  const base = 10 ** maxLen;
  const bigA = BigInt(base * a);
  const bigB = BigInt(base * b);
  const bigRes = (bigA + bigB) / BigInt(base); // 如果是 (1n + 2n) / 10n 是等于 0n的。。。
  return Number(bigRes);
}
```
这里代码是有问题的，因为最后计算 bigRes 的大数相除（即 /）是会把小数部分截掉的，所以我很疑惑为什么网络上很多文章都说可以通过先转为整数运算再除回去，为了防止转为的整数超出 js 表示范围，还可以运用到 ES6 新增的大数类型，我真的很疑惑，希望有好心人能解答下。

2. 使用 Number.EPSILON 误差范围。
```js
function isEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}

console.log(isEqual(0.1 + 0.2, 0.3)); // true
```
Number.EPSILON 的实质是一个可以接受的最小误差范围，一般来说为 Math.pow(2, -52) 。

3. 转成字符串，对字符串做加法运算。
```js
// 字符串数字相加
var addStrings = function (num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  const res = [];
  let carry = 0;
  while (i >= 0 || j >= 0) {
    const n1 = i >= 0 ? Number(num1[i]) : 0;
    const n2 = j >= 0 ? Number(num2[j]) : 0;
    const sum = n1 + n2 + carry;
    res.unshift(sum % 10);
    carry = Math.floor(sum / 10);
    i--;
    j--;
  }
  if (carry) {
    res.unshift(carry);
  }
  return res.join("");
};

function isEqual(a, b, sum) {
  const [intStr1, deciStr1] = a.toString().split(".");
  const [intStr2, deciStr2] = b.toString().split(".");
  const inteSum = addStrings(intStr1, intStr2); // 获取整数相加部分
  const deciSum = addStrings(deciStr1, deciStr2); // 获取小数相加部分
  return inteSum + "." + deciSum === String(sum);
}

console.log(isEqual(0.1, 0.2, 0.3)); // true
```

### 2. 原型和原型链
可以说这部分每家面试官都会问了。。首先理解的话，其实一张图即可，一段代码即可。
```js
function Foo() {}

let f1 = new Foo();
let f2 = new Foo();
```
千万别畏惧下面这张图，特别有用，一定要搞懂，熟到提笔就能默画出来。

![image-20230209210631252](image/image-20230209210631252.png)

总结：

* 原型：每一个 JavaScript 对象（null 除外）在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性，其实就是 prototype 对象。
* 原型链：由相互关联的原型组成的链状结构就是原型链。

先说出总结的话，再举例子说明如何顺着原型链找到某个属性。

### 3、 作用域与作用域链
* 作用域：规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。换句话说，作用域决定了代码区块中变量和其他资源的可见性。（全局作用域、函数作用域、块级作用域）
* 作用域链：从当前作用域开始一层层往上找某个变量，如果找到全局作用域还没找到，就放弃寻找 。这种层级关系就是作用域链。（由多个执行上下文的变量对象构成的链表就叫做作用域链，学习下面的内容之后再考虑这句话）
需要注意的是，js 采用的是静态作用域，所以函数的作用域在函数定义时就确定了。