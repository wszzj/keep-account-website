<template>
  <Layout>
    <div class="nav">
      <Icon name="left" class="leftIcon" @click.native="back" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem
        filedName="标签名"
        placeholder="在这里输入标签名"
        :value="tag.name"
        @update:value="update"
      />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import FormItem from "@/components/money/FormItem.vue";
import tagListModel from "@/models/tagListModel";
import { Component } from "vue-property-decorator";
@Component({
  components: { FormItem },
})
export default class EditLabel extends Vue {
  tag: { id: string; name: string } = { id: "", name: "" };
  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    tagListModel.update(this.tag.id, name);
  }
  remove() {
    tagListModel.remove(this.tag.id);
    this.$router.back();
  }

  back() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 12px 16px;
  > .title {
  }
  > .leftIcon {
    width: 24px;
    height: 24px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  background-color: #fff;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}
</style>
