<template>
  <layout>
    <Tabs :value.sync="type" classPrefix="type" :dateSource="typeList" />
    <Tabs
      :value.sync="interval"
      classPrefix="interval"
      :dateSource="intervalList"
    />
    <ol>
      <li v-for="(group, index) in result" :key="index">
        {{ group.title }}
        <ol>
          <li v-for="(item, index) in group.items" :key="index">
            {{ item.createdAt }} {{ item.amount }}
          </li>
        </ol>
      </li>
    </ol>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import typeList from "@/constants/typeList";
import intervalList from "@/constants/intervalList";
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
  get result() {
    const { recordList } = this;
    const hashTable: { [key: string]: { title: string; items: RecordItem[] } } =
      {};
    for (let i = 0; i < recordList.length; i++) {
      const date = recordList[i].createdAt?.split("T")[0];
      if (date) {
        hashTable[date] = hashTable[date] || { title: date, items: [] };
        hashTable[date].items.push(recordList[i]);
      }
    }
    return hashTable;
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
</style>
