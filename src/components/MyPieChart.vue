<template>
  <div class="wrapper">
    <div ref="container" class="chart"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as echarts from "echarts";
import { Component, Prop, Watch } from "vue-property-decorator";
type EChartsOption = echarts.EChartsOption;

@Component
export default class MyPieChart extends Vue {
  @Prop(Object) option!: EChartsOption;
  chart?: echarts.ECharts;
  mounted() {
    this.chart = echarts.init(this.$refs.container as HTMLDivElement);
    if (this.option) {
      this.chart.setOption(this.option);
    }
  }
  @Watch("option")
  onOptionChanged(newOption: EChartsOption) {
    this.chart?.setOption(newOption);
  }
}
</script>

<style lang="scss" scoped>
.chart {
  min-width: 100%;
  min-height: 100vw;
  background: #fff;
}
</style>
