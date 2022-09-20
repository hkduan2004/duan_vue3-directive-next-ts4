<template>
  <div class="page">
    我的{{ globalStore.count }}
    <TestComp v-model:count="count">
      <template v-slot:button="{ addCount }">
        <el-button @click="addCount">加1</el-button>
        <span>嘿嘿嘿</span>
      </template>
    </TestComp>
    <div>
      <el-button type="primary" @click="checkLoadOption">切换loading</el-button>
      <div class="test_load" v-load="loadOption">测试v-load指令</div>
    </div>
    <div>
      <p>测试v-copy指令</p>
      <button v-copy="{ ...copyContent, content: '单击' }">单击复制内容</button>
      <button v-copy.dbclick="{ ...copyContent, content: '双击' }">
        双击复制内容
      </button>
    </div>
    <div style="background-color: #f2f2f2">
      <p>测试v-screenfull指令：{{ fullscreenText }}</p>
      <div v-screenfull style="width: 25px; height: 25px"></div>
    </div>
    <div>
      <p>测试v-tooltip指令</p>
      <!-- <span v-tooltip="'点我查看更多点我查看更多点我查看更多'"
        >点我查看更多</span
      > -->
    </div>
    <div style="background-color: #f2f2f2">
      <p>测试v-ellipsis指令</p>
      <div v-ellipsis class="test_ellipsis">
        哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
      </div>
      <div v-ellipsis="3" class="test_ellipsis">
        哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
      </div>
    </div>
    <div>
      <p>测试v-empty指令</p>
      <div><button @click="checkEmptyParams">切换empty状态</button></div>
      <div v-empty="emptyParams">
        <div>11111</div>
        <div>2222</div>
        <div>3333</div>
      </div>
    </div>
    <div style="background-color: #f2f2f2">
      <p>测试v-resize指令</p>
      <textarea v-resize="onResize" cols="30" rows="10"></textarea>
    </div>
    <div v-backtop>
      <p>测试v-backtop指令</p>
      <div style="width: 50px; height: 50px; background-color: #ccc">top</div>
    </div>
    <div style="background-color: #f2f2f2">
      <p>测试v-img-lazy指令</p>
      <img
        src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe59a51ac5f941e4a561a5121157875c~tplv-k3u1fbpfcp-watermark.image"
        v-img-lazy="vueLogo"
        width="100"
        alt=""
      />
    </div>
    <div>
      <p>测试v-img-error指令</p>
      <img
        src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe59a51ac5f941e4a561a5121157875c~tplv-k3u1fbpfcp-watermark.image"
        v-img-error="vueLogo"
        width="100"
        alt=""
      />
    </div>
    <div style="background-color: #f2f2f2">
      <p>测试v-longpress指令</p>
      <button v-longpress="onLongpress">长按我试试</button>
      <button v-longpress="onLongpress2">再长按我试试</button>
    </div>
    <div>
      <p>测试v-watermark指令</p>
      <p><button @click="resetWaterMark">设置水印</button></p>
      <div v-watermark="waterMarkParams" style="background: #f2f2f2">
        <div style="height: 300px">
          <el-button>按钮</el-button>
        </div>
      </div>
    </div>
    <div>
      <p>测试v-throttle指令</p>
      <input
        type="text"
        v-model="inputValue"
        placeholder="请输入文本"
        v-throttle.input="throttleFunc"
      />
    </div>
    <div style="background: #f2f2f2">
      <p>测试v-debounce指令</p>
      <input
        type="text"
        placeholder="请输入"
        v-model="inputValue2"
        v-debounce.input="debounceFunc"
      />
    </div>
    <div>
      <p>测试v-draggable指令</p>
      <div class="test_draggable">
        <div v-draggable.limit="moveEvent" class="test_draggable_item">1</div>
        <div v-draggable.limitX class="test_draggable_item">2</div>
        <div v-draggable.limitY class="test_draggable_item">3</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useGlobalStore } from "@/store";
import { TestComp } from "@/components";
import vueLogo from "@/assets/logo.png";
const globalStore = useGlobalStore();
const count = ref<number>(1);
const inputValue = ref<string>("");
const inputValue2 = ref<string>("");
const loadOption = ref({
  visible: false,
  text: "Loading",
  background: "rgba(0,0,0,.3)",
});
const emptyParams = ref({
  visible: false,
  content: "暂无数据",
  emptyImgUrl: vueLogo,
});
const waterMarkParams = ref({
  content: "这是图片水印",
  width: 150,
  height: 150,
  fontSize: 18,
});
const fullscreenText = computed(() =>
  document.fullscreenElement ? "全屏" : "非全屏"
);
const copyContent = ref({
  content: "这是复制的内容",
  callBack: () => {
    alert("复制成功");
  },
});
/** 切换load状态 */
const checkLoadOption = () => {
  loadOption.value = {
    ...loadOption.value,
    visible: !loadOption.value.visible,
  };
};
/** 切换empty状态 */
const checkEmptyParams = () => {
  emptyParams.value = {
    ...emptyParams.value,
    visible: !emptyParams.value.visible,
  };
};
/** resize回调 */
const onResize = (info: any) => {
  console.log(info);
};
/** 长按回调 */
const onLongpress = () => {
  console.log("嗨嗨嗨");
};
/** 长按回调 */
const onLongpress2 = () => {
  console.log("嗨嗨");
};
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
/** 节流函数 */
const throttleFunc = (e: any) => {
  console.log(e.target.value);
};
const debounceFunc = (e: any) => {
  console.log(e.target.value);
};
const moveEvent = (top: number, left: number) => {
  console.log(top, left);
};
</script>

<style lang="scss" scoped>
.page {
  @include screenPage(#ffffff);
  overflow: auto;
  .test_load {
    height: 300px;
    background: #f2f2f2;
  }
  .test_ellipsis {
    width: 200px;
    height: auto;
  }
  .test_draggable {
    height: 300px;
    position: relative;
    background-color: #f2f2f2;
    .test_draggable_item {
      width: 50px;
      height: 50px;
      background: #ccc;
      cursor: move;
    }
  }
}
</style>