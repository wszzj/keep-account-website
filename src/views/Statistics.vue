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
    <ol v-else-if="interval === 'month'">
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

import dayjs from "dayjs";
import clone from "@/lib/clone";
@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
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
    const list = recordList.filter((i) => i.type === this.type);
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
    const list = recordList.filter((i) => i.type === this.type);
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
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "month")) {
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
</style>
