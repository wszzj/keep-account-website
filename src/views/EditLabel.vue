<template>
  <Layout>
    <div>
      <Icon name="left" />
      <span>编辑标签</span>
      <span></span>
    </div>
    <div>
      <Notes filedName="标签名" placeholder="在这里输入标签名" />
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Notes from "@/components/money/Notes.vue";
import tagListModel from "@/models/tagListModel";
import { Component } from "vue-property-decorator";
@Component({
  components: { Notes },
})
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      // console.log(tag);
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style lang="scss" scoped></style>
