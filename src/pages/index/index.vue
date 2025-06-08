<route lang="json5" type="h2ome">
{
  layout: "default",
  name: "Home",
  style: {
    navigationBarTitleText: "Home",
  },
}
</route>
<template>
  <view class="text-area"><wd-toast></wd-toast>
    <wd-button size="small">Home</wd-button>
    <text class="title text-32px color-red" @click="urlPush"
      >Home{{ LYK }}</text
    >
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

const urlPush = () => {
  console.log("urlPush");
  uni.navigateTo({ url: "/pages-sub/demo/index" });
};
const LYK = ref<string>("LTK");
</script>

<style></style>
