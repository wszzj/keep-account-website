<template>
  <Layout class-prefix="layout">
    <NumberPad
      @update:value="onUpdateAmount"
      :value="record.amount"
      @submit="saveRecord"
    />
    <Types :value.sync="record.type" />
    <div class="notes">
      <FormItem
        :value="record.notes"
        @update:value="onUpdateNotes"
        filedName="备注"
        placeholder="在这里输入备注"
      />
    </div>
    <Tags @update:value="onUpdateTag" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Tags from "@/components/money/Tags.vue";
import FormItem from "@/components/money/FormItem.vue";
import Types from "@/components/money/Types.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import recordListModel from "@/models/recordListModel";
const recordList = recordListModel.fetch();
@Component({
  components: { Tags, FormItem, Types, NumberPad },
})
export default class Money extends Vue {
  record: RecordItem = { tag: "", notes: "", type: "-", amount: "0" };
  recordList: RecordItem[] = recordList;
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateAmount(value: string) {
    this.record.amount = value;
  }
  onUpdateTag(value: string) {
    this.record.tag = value;
  }
  saveRecord() {
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }
  @Watch("recordList")
  onRecordListChanged() {
    recordListModel.save(this.recordList);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>
