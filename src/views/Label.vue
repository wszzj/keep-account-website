<template>
  <layout>
    <div class="tags">
      <router-link
        class="item"
        :to="`/label/edit/${item.id}`"
        v-for="(item, index) in tags"
        :key="index"
      >
        <span>{{ item.name }}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="button-wrapper">
      <Button @click="createTag">新建标签</Button>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel";

@Component
export default class Label extends Vue {
  tags = tagListModel.fetch();
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
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .item {
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
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}
</style>
