<template>
  <Layout class-prefix="layout">
    {{ record }}
    <numberPad :value="record.amount" @update:value="onUpdateAmount" />
    <Types :value.sync="record.type" @update:value="onUpdateType" />
    <Notes :value="record.notes" @update:value="onUpdateNotes" />
    <Tags :dataSource.sync="tags" @update:value="onUpdateTag" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tags from "@/components/money/Tags.vue";
import Notes from "@/components/money/Notes.vue";
import Types from "@/components/money/Types.vue";
import NumberPad from "@/components/money/NumberPad.vue";
type Record = {
  tag: string;
  notes: string;
  type: string;
  amount: number;
};
@Component({
  components: { Tags, Notes, Types, NumberPad },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行", "喝酒"];
  record: Record = { tag: "", notes: "", type: "-", amount: 0 };
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  onUpdateTag(value: string) {
    this.record.tag = value;
  }
  onUpdateType(value: string) {
    this.record.type = value;
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
