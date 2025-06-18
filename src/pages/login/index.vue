<route lang="json5">
{
  layout: 'default',
  name: 'Login',
  style: {
    navigationBarTitleText: 'Login',
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
defineOptions({
  name: 'Login',
});
const LYK = ref<string>('LTK');

onLoad((options) => {
  console.log(options, 'options');
});
</script>

<style></style>
