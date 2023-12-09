<template>
  <div class="nav">
    <router-link to="/money" active-class="selected" class="item">
      <Icon name="money" />
      记账
    </router-link>
    <router-link to="/label" active-class="selected" class="item">
      <Icon name="label" />
      标签
    </router-link>
    <router-link to="/statistics" active-class="selected" class="item">
      <Icon name="statistics" />
      统计
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.25);
  > .item {
    padding: 2px 0;
    width: calc(100% / 3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected {
    color: $color-highlight;
  }
}
</style>
