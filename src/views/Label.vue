<template>
  <layout>
    <ol class="tags">
      <li v-for="(item, index) in tags" :key="index">
        <span>{{ item.name }}</span>
        <Icon name="right" />
      </li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel";
tagListModel.fetch();
@Component
export default class Label extends Vue {
  tags = tagListModel.data;
  createTag() {
    const name = window.prompt("请输入新的标签名");
    if (name === "") {
      window.alert("标签名不能为空");
      return;
    }
    if (name) {
      tagListModel.create(name);
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > li {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
  }
  svg {
    width: 18px;
    height: 18px;
    color: #666;
    margin-right: 16px;
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 28px;
  }
}
</style>
