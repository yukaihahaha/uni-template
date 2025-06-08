<route lang="json5">
{
  layout: "default",
  name:"My",
  style: {
    navigationBarTitleText: "My",
  },
}
</route>
<template>
  <view class="text-area">
    <text class="title text-32px color-red">Demo{{ LYK }}</text>
    <image
      class="w-200rpx h-200rpx"
      src="@images/niwo.jpg"
      mode="scaleToFill"
    />
  </view>
</template>

<script lang="ts" setup>
defineOptions({
  name: "My",
});

const LYK = ref<string>("LTK");
</script>

<style></style>
