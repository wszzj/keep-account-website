<template>
  <div>
    当前页面不存在，请检查网址是否正确。
    <router-link to="/" class="backHome">返回首页</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  > .backHome {
    margin-top: 20px;
  }
}
</style>
