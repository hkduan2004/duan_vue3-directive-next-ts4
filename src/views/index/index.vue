<template>
  <div class="index_page">
    {{ indexName }}
    <button @click="toMinePage">跳转我的页面</button>
    <div>
      <p>pinia里的count值是{{ globalStore.count }}</p>
      <p>pinia里getters里的count值是{{ globalStore.count_2 }}</p>
      <button @click="addCount">count+1</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useGlobalStore } from "@/store";
const globalStore = useGlobalStore();
const indexName = ref<string>("首页");
const $router = useRouter();

/** 跳转我的页面 */
const toMinePage = () =>
  $router.push({
    path: "/mine",
    query: { from: "index" },
  });

/** count+1 */
const addCount = () => {
  //globalStore.resetCount(globalStore.count + 1);
  globalStore.$patch({
      count: globalStore.count+1
  })
};
</script>

<style lang="scss" scoped>
.index_page {
  @include screenPage(#f2f2f2);
}
</style>