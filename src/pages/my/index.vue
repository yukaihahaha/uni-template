<route lang="json5">
{
  layout: 'default',
  name: 'My',
  style: {
    navigationBarTitleText: 'My',
  },
}
</route>
<template>
  <view class="text-center m-4">
    <image class="h-40 w-40" src="@images/niwo.jpg" />
    <view class="my-4">
      <text class="text-gray-400 font-bold">{{ LYK }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
// import { ref } from "vue";
defineOptions({
  name: 'My',
});
const LYK = ref<string>('LTK');
</script>

<style></style>
