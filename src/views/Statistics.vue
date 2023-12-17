<template>
  <layout>
    <Tabs :value.sync="type" classPrefix="type" :dateSource="typeList" />
    <Tabs
      :value.sync="interval"
      classPrefix="interval"
      :dateSource="intervalList"
    />
    <ol v-if="interval === 'day'">
      <li v-for="(group, index) in dayHashTable" :key="index">
        <h3 class="title">
          {{ beautifyDay(group.title) }}
          <span>{{ group.total?.toFixed(2) }}</span>
        </h3>
        <ol>
          <li v-for="(item, index) in group.items" :key="index" class="record">
            <span>{{ tagString(item.tag) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span class="amount"
              >￥{{ parseFloat(item.amount).toFixed(2) }}</span
            >
          </li>
        </ol>
      </li>
    </ol>
    <ol v-else-if="interval === 'month'" class="monthDateSource">
      <label class="createAt">
        <input type="month" v-model="now" />
      </label>
      <MyPieChart
        v-if="monthHashTable.length !== 0"
        :option.sync="monthOption"
        class="chart"
        :value.sync="now"
      />

      <li v-for="(group, index) in monthHashTable" :key="index">
        <h3 class="title">
          {{ beautifyMonth(group.title) }}
          <span>{{ group.total?.toFixed(2) }}</span>
        </h3>
        <ol>
          <li v-for="(item, index) in group.items" :key="index" class="record">
            <span>{{ tagString(item.tag) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span class="amount"
              >￥{{ parseFloat(item.amount).toFixed(2) }}</span
            >
          </li>
        </ol>
      </li>
    </ol>
    <h3 v-if="dayHashTable.length === 0">暂无数据可以显示</h3>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import typeList from "@/constants/typeList";
import intervalList from "@/constants/intervalList";
import MyPieChart from "@/components/MyPieChart.vue";
import dayjs from "dayjs";
import clone from "@/lib/clone";
type EChartsOption = echarts.EChartsOption;
@Component({
  components: { Tabs, MyPieChart },
})
export default class Statistics extends Vue {
  now = dayjs().format("YYYY-MM");
  get monthOption() {
    if (this.monthHashTable.length === 0) {
      return {} as EChartsOption;
    }
    const newList = this.monthHashTable[0].items;

    const result = [
      { value: Number(newList[0].amount), name: newList[0].tag || "无" },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (last.name === current.tag) {
        last.value += Number(current.amount);
      } else {
        result.push({ value: Number(current.amount), name: current.tag });
      }
    }
    return {
      tooltip: {
        trigger: "item",
        textStyle: {
          fontSize: 16,
        },
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["25%", "50%"],
          label: {
            show: true,
            formatter: "{b}:{c}",
          },
          data: result,
        },
      ],
    };
  }
  type = "-";
  interval = "day";
  typeList = typeList;
  intervalList = intervalList;

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  beforeCreate() {
    this.$store.commit("fetchRecord");
  }
  get dayHashTable() {
    const { recordList } = this;
    type Result = [{ title: string; total?: number; items: RecordItem[] }];
    const list = clone(recordList).filter((i) => i.type === this.type);
    if (recordList.length === 0 || list.length === 0) {
      return [];
    }
    const newList = list.sort((a, b) => {
      return dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf();
    });

    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
      result.map((group) => {
        group.total = group.items.reduce((sum, item) => {
          return (sum += Number(item.amount));
        }, 0);
      });
    }
    return result;
  }
  get monthHashTable() {
    const { recordList } = this;
    type Result = [{ title: string; total?: number; items: RecordItem[] }];
    const list = clone(recordList).filter((i) => i.type === this.type);
    if (recordList.length === 0 || list.length === 0) {
      return [];
    }
    const newList = list.sort((a, b) => {
      return dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf();
    });
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "month")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM"),
          items: [current],
        });
      }
      result.map((group) => {
        group.total = group.items.reduce((sum, item) => {
          return (sum += Number(item.amount));
        }, 0);
      });
    }
    const newResult = result.filter((i) => i.title === this.now);
    return newResult;
  }
  tagString(tag: string) {
    return tag === "" ? "无" : tag;
  }

  beautifyDay(string: string) {
    const now = dayjs();
    const day = dayjs(string);
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now, "year")) {
      return day.format("MM月DD日");
    } else {
      return day.format("YYYY年MM月DD日");
    }
  }
  beautifyMonth(string: string) {
    const now = dayjs();
    const day = dayjs(string);
    if (day.isSame(now, "month")) {
      return "本月";
    } else if (day.isSame(now, "year")) {
      return day.format("MM月");
    } else {
      return day.format("YYYY年MM月");
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tab-item {
    background-color: #fff;
    &.selected {
      background: #c4c4c4;
      &::after {
        display: none;
      }
    }
  }
  .interval-tab-item {
    height: 48px;
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  background: #fff;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
  overflow: auto;
}
.amount {
  padding-left: 12px;
}

.monthDateSource {
  display: flex;
  flex-direction: column;
  > .createAt {
    right: 20px;
    > input {
      border: none;
      outline: none;
      background: transparent;
      padding: 10px;
    }
  }
}
</style>
