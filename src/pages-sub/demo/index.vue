<route lang="json5" type="home">
{
  layout: "default",
  name: "Demo",
  style: {
    navigationBarTitleText: "Demo",
  },
}
</route>
<template>
  <view class="text-area">
    <text class="title text-32px color-red"
      >{{ LYK }}</text
    > <wd-button size="small">Demo</wd-button>
    <image
      class="w-200rpx h-200rpx"
      src="@images/niwo.jpg"
      mode="scaleToFill"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
defineOptions({
  name: "Home",
});
const aaaa = ref<string>("LTK");
const LYK = ref<string>("LTK");
</script>

<style></style>
