<template>
  <layout>
    <Tabs :value.sync="type" classPrefix="type" :dateSource="typeList" />
    <Tabs
      :value.sync="interval"
      classPrefix="interval"
      :dateSource="intervalList"
    />
    {{ type }}
    {{ interval }}
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  typeList = [
    {
      text: "收入",
      value: "+",
    },
    {
      text: "支出",
      value: "-",
    },
  ];
  intervalList = [
    {
      text: "按天",
      value: "day",
    },
    {
      text: "按周",
      value: "week",
    },
    {
      text: "按月",
      value: "month",
    },
  ];
}
</script>

<style lang="scss" scoped>
::v-deep .type-tab-item {
  background-color: #fff;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
</style>
