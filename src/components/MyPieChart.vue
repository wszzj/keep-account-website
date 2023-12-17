<template>
  <div ref="container"></div>
</template>

<script lang="ts">
import Vue from "vue";
import * as echarts from "echarts";
import { Component } from "vue-property-decorator";
@Component
export default class MyPieChart extends Vue {
  getChart() {
    const div = this.$refs.container as HTMLElement;
    const width = document.documentElement.clientWidth;
    div.style.width = `${width - 32}px`;
    div.style.height = `${width - 32}px`;
    let myChart = echarts.init(div);
    let option = {
      title: {
        text: "Referer of a Website",
        subtext: "Fake Data",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    option && myChart.setOption(option);
  }

  mounted() {
    this.getChart();
  }
}
</script>

<style lang="scss" scoped></style>
