<template>
  <div class="total" :class="'classPrefix' && `${classPrefix}-wrapper`">
    <div class="main" :class="'classPrefix' && `${classPrefix}-content`">
      <slot></slot>
    </div>
    <Nav></Nav>
  </div>
</template>

<script>
export default {
  props: ["classPrefix"],
};
</script>

<style lang="scss" scoped>
.total {
  height: 100vh;
  display: flex;
  flex-direction: column;
  > .main {
    flex-grow: 1;
    overflow: auto;
  }
}
</style>
