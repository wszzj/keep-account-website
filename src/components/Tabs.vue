<template>
  <ul class="tabs">
    <li
      class="tabs-item"
      v-for="(item, index) in dateSource"
      :key="index"
      :class="{
        selected: item.value === value,
        [classPrefix + '-tab-item']: classPrefix,
      }"
      @click="select(item)"
    >
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array }) dateSource!: {
    text: string;
    value: string;
  }[];
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;
  select(item: { text: string; value: string }) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>
