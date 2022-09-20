<!--
 * @Author: duan
 * @Date: 2022-09-19 16:58:50
 * @LastEditors: duan
 * @LastEditTime: 2022-09-20 14:49:59
 * @Description: file content
-->
# duan_vue3-directive-next-ts4

关于duan_vue3-directive-next-ts4:
>一些常用的vue3自定义指令,目前只支持vue3,并没有向下兼容，毕竟vue3已经成为vue-cli的默认版本了，后续会考虑如何兼容uni-app下的不同平台（上班摸鱼的时候写写，嘿嘿嘿），若插件内部的指令有bug，也希望使用的开发者反馈给我，并提出您的宝贵意见，大家一起学习。

## 快速开始
1.下载
```bash
npm i duan_vue3-directive-next-ts4 --save
```
2.vue项目src文件下新增declare.d.ts
```ts
declare module 'duan_vue3-directive-next-ts4';
```
3.在src/main.ts下
```ts
import {createApp,App as AppProps} from 'vue'
import App from './App.vue';
// 引入指令
import "../node_modules/duan_vue3-directive-next-ts4/lib/style.css"
import directive from 'duan_vue3-directive-next-ts4'

const app: AppProps = createApp(App);
app.use(directive)
app.mount('#app')
```

## 技术栈

* [x] vite2 
* [x] vue3.x
* [x] typescript
* [x] pinia2.x
* [x] vue-router4.x   
  
## 指令基本使用方法

### 1. v-backtop 滚动条置顶

```html
<!-- 父节点  -->
<div clas="parent">
   <!-- 子节点  -->
  <div class="child"></div>
  <!-- 点击该节点，父节点滚动条置顶 -->
  <div v-backtop class="backtop"></div>
</div>
```

### 2. v-copy 复制内容到剪切板

```html
<button v-copy="copyParams">单击复制内容</button>
<button v-copy.dbclick="copyParams">双击复制内容</button>
```

```ts
import { ref } from 'vue';
const copyParams = ref({
  // 需要复制的内容
  content: '复制内容',
  // 回调函数
  callBack: ()=>console.log('复制成功')
})
```

### 3. v-debounce 函数防抖

```html
<input type="text" placeholder="请输入" v-model="inputValue2"  v-debounce.input="debounceFunc" />
<input type="text" placeholder="请输入" v-model="inputValue2" v-debounce.input.3="debounceFunc" />
```

```ts
/**
 * @param eventName 函数时间类型 click,input,mousestart等
 * @param debounceTime 防抖时间 1,2,3...秒 默认为1
 */
// v-debounce."eventName"."debounceTime"
const debounceFunc = (e: Event)=>void
```

### 4. v-draggable 节点拖拽
注: .test_draggable的div节点必须设置position：relative，不然不会生效
```html
<div class="test_draggable">
  <div v-draggable.limit="moveEvent" class="test_draggable_item">1</div>
  <div v-draggable.limitX class="test_draggable_item">2</div>
  <div v-draggable.limitY class="test_draggable_item">3</div>
  <div v-draggable.x class="test_draggable_item">4</div>
  <div v-draggable.y class="test_draggable_item">5</div>
  <div v-draggable class="test_draggable_item">6</div>
</div>
```
```ts
// v-draggable.draggabelType
enum EDraggable = {
    /** 不限制，x轴，y轴都可随意拖拽，哪怕超出父节点区域 */
    '':''，
    /** limit x轴，y轴都可随意拖拽,但不会超出父节点区域 */
    'limit':'limit',
    /** limitX x轴可拖拽,但不会超出父节点区域 */
    'limitX':'limitX',
    /** limitY Y轴可拖拽,但不会超出父节点区域 */
    'limitY':'limitY',
    /** x轴可拖拽,可以超出父节点区域 */
    'x':'x',
    /** y轴可拖拽,可以超出父节点区域 */
    'y':'y'
} 
/**
 * draggabelType: TDraggable;
 * @param EDraggable 拖拽类型
 */
/** 
 * @param top 距离相对定位父节点顶部距离
 * @param left 距离相对定位父节点左侧距离
*/
const mouseEvent = (top: number,left: number)=>void
```
### 5. v-ellipsis 文本超出省略号

注: .test_ellipsis的dom必须设置宽度

```html
 <div v-ellipsis class="test_ellipsis">这是文本内容，这是文本内容, 这是文本内容</div>
 <div v-ellipsis="3" class="test_ellipsis">这是文本内容，这是文本内容, 这是文本内容这是文本内容，这是文本内容, 这是文本内容这是文本内容，这是文本内容, 这是文本内容</div>
```

```ts
// v-ellipsis 单行超出省略号
// v-ellipsis="n" n: number 多行超出省略号
```

### 6. v-empty 空状态骨架屏

```html
<div>
  <button @click="checkEmptyParams">切换empty状态</button>
  <div v-empty="emptyParams">
    <div>11111</div>
    <div>2222</div>
    <div>3333</div>
  </div>
</div>
```

```ts
import { ref } from 'vue';
/** 图片 */
import vueLogo from "@/assets/logo.png";
const emptyParams = ref({
  // 是否显示空状态骨架屏
  visible: false,
  // 展示的文字
  content: "暂无数据",
  // 展示的图片
  emptyImgUrl: vueLogo,
})
/** 切换empty状态 */
const checkEmptyParams = () => {
  emptyParams.value = {
    ...emptyParams.value,
    visible: !emptyParams.value.visible,
  };
};
```

### 7. v-img-error 图片加载失败

```html
<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe59a51ac5f941e4a561a5121157875c~tplv-k3u1fbpfcp-watermark.image"
     v-img-error="vueLogo"
     width="100"
     alt=""
/>
```

```ts
import vueLogo from "@/assets/logo.png";
// v-img-error="vueLogo"
/**
 * 图片加载失败时，将vueLogo替换成img的src
 */
```


### 8. v-img-lazy 图片懒加载

```html
<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe59a51ac5f941e4a561a5121157875c~tplv-k3u1fbpfcp-watermark.image"
     v-img-lazy="vueLogo"
     width="100"
     alt=""
/>
```

```ts
import vueLogo from "@/assets/logo.png";
// v-img-lazy="vueLogo"
/**
 * 图片没有出现在窗口可视范围内时，img展示vueLogo,一旦出现，就显示设置的src
 */
```

### 9. v-load 加载状态

```html
<el-button type="primary" @click="checkLoadOption">切换loading</el-button>
<div class="test_load" v-load="loadOption">内容</div>
```
```ts
import { ref } from 'vue'
const loadOption = ref({
  // 是否展示load状态
  visible: false,
  // load文字
  text: "Loading",
  // load的背景颜色
  background: "rgba(0,0,0,.3)",
});
/** 切换load状态 */
const checkLoadOption = () => {
  loadOption.value = {
    ...loadOption.value,
    visible: !loadOption.value.visible,
  };
};
```

### 10. v-longpress 长按事件
```html
<button v-longpress="onLongpress">长按我试试</button>
```

```ts
/** 长按回调 */
const onLongpress = () => {
  console.log("触发长按事件，默认是2s后触发");
};
```

### 11. v-resize 监听dom尺寸变化事件

```html
<textarea v-resize="onResize" cols="30" rows="10"></textarea>
```

```ts
interface IResizeProps {
    // 节点大小位置信息 包括width,height,top,left,bottom,right,x,y
    contentRect: DOMRectReadOnly;
    // 当前节点
    target: HTMLElement;
}
/** resize回调 */
const onResize = (info: IResizeProps) => {
  console.log(info);
};
```

### 12. v-screenfull 窗口全屏/非全屏

```html
<div v-screenfull class="screen_item"></div>
```

```ts
// 内部会显示是否全屏的图标，点击该节点会触发窗口全屏或非全屏
```

### 13. v-throttle 函数节流

```html
<input type="text" v-model="inputValue" placeholder="请输入文本" v-throttle.input="throttleFunc" />
<input type="text" v-model="inputValue" placeholder="请输入文本" v-throttle.input.3="throttleFunc" />
```

```ts
import { ref } from 'vue'
// v-throttle."eventName"."throttleTime"
/** 
 * @param eventName 事件类型 click,input,change,scroll等
 * @param throttleTime 节流事件 number 默认1 代表1s
*/
const inputValue = ref<number>('');
/** 节流函数 */
const throttleFunc = (e: any) => {
  console.log(e.target.value);
};
```

### 14. v-tooltip 悬停提示
```html
<span v-tooltip="'点我查看更多点我查看更多点我查看更多'" >点我查看更多</span>
```

```ts
// 实现类element-plus里的<el-tooltip>组件功能，鼠标悬停在节点上会展示悬停提示
```

### 15. v-watermark 水印

```html
<p><button @click="resetWaterMark">设置水印</button></p>
<div v-watermark="waterMarkParams" style="background: #f2f2f2">
  <div style="height: 300px">
    <el-button>按钮</el-button>
  </div>
</div>
```

```ts
import { ref } from 'vue'
const waterMarkParams = ref({
  // 水印文字
  content: "这是图片水印",
  // 水印转换的单个图片宽度
  width: 150,
  // 水印转换的单个图片高度
  height: 150,
  // 水印文字大小 px
  fontSize: 18,
});
/** 设置水印 */
const resetWaterMark = () => {
  waterMarkParams.value = {
    ...waterMarkParams.value,
    content:
      waterMarkParams.value.content === "Ant-design-vue"
        ? "Ant-desgin-mobile"
        : "Ant-design-vue",
  };
};
```