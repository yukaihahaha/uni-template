<template>
  <view class="text-area">
    <text class="title text-32px color-red">222{{ LYK }}</text>
    <image
      class="w-200rpx h-200rpx"
      src="@images/niwo.jpg"
      mode="scaleToFill"
    />
  </view>
</template>

<script lang="ts" setup>
defineOptions({
  name: "Home",
});

const LYK = ref<string>("LTK");
</script>

<style>
</style>
