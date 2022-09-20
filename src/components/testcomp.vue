<template>
  <div class="test_comp">
    <p>count：{{ count }}</p>
    <slot name="button" :addCount="addCount">
      <button @click="addCount">click me</button>
    </slot>
  </div>
</template>

<script lang="ts" setup>
const $emit = defineEmits(["update:count"]);
const props = defineProps({
  count: {
    type: Number,
    required: true,
    validator: (n: number) => n <= 100,
  },
});
const addCount = () => {
  $emit("update:count", props.count + 1);
};
</script>

<style lang="scss" scoped>
.test_comp {
  background: #f2f2f2;
  padding: 5px 10px;
}
</style>