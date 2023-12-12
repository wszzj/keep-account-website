<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="(tag, index) in tags"
        :key="index"
        @click="select(tag.name)"
        :class="{ selected: selectedTag === tag.name }"
      >
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import tagListModel from "@/models/tagListModel";
import { Component } from "vue-property-decorator";
@Component
export default class Tags extends Vue {
  tags = tagListModel.fetch();
  selectedTag = "";
  select(tag: string) {
    if (this.selectedTag !== tag) {
      this.selectedTag = tag;
    } else if (this.selectedTag === tag) {
      return;
    } else {
      throw new Error("该标签不存在！");
    }
    this.$emit("update:value", this.selectedTag);
  }
  createTag() {
    const name = window.prompt("请输入新的标签名");
    if (name) {
      const message = tagListModel.create(name);
      if (message === "duplicate") {
        window.alert("标签名重复");
      } else if (message === "success") {
        window.alert("创建成功");
      }
    } else if (name === "") {
      window.alert("标签名不能为空");
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  background: white;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;
    $bg: #d9d9d9;

    > li {
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: darken($bg, 20%);
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 5px;
    }
  }
}
</style>
