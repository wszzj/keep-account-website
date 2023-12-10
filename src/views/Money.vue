<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <Notes @update:value="onUpdateNotes" />
    <Tags :dataSource.sync="tags" @update:value="onUpdateTag" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Tags from "@/components/money/Tags.vue";
import Notes from "@/components/money/Notes.vue";
import Types from "@/components/money/Types.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import model from "@/model";
const recordList = model.fetch();

@Component({
  components: { Tags, Notes, Types, NumberPad },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行", "喝酒"];
  record: RecordItem = { tag: "", notes: "", type: "-", amount: 0 };
  recordList: RecordItem[] = recordList;
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  onUpdateTag(value: string) {
    this.record.tag = value;
  }
  saveRecord() {
    const record2: RecordItem = model.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }
  @Watch("recordList")
  onRecordListChanged() {
    model.save(this.recordList);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
