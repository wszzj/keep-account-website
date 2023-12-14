<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Tabs :dateSource="typeList" :value.sync="record.type" />
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
import { Component } from "vue-property-decorator";
import Tags from "@/components/money/Tags.vue";
import FormItem from "@/components/money/FormItem.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Tabs from "@/components/Tabs.vue";
import typeList from "@/constants/typeList";
@Component({
  components: { Tags, FormItem, NumberPad, Tabs },
})
export default class Money extends Vue {
  typeList = typeList;
  get recordList() {
    return this.$store.state.recordList;
  }
  created() {
    this.$store.commit("fetchRecord");
  }
  record: RecordItem = { tag: "", notes: "", type: "-", amount: "0" };

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateTag(value: string) {
    this.record.tag = value;
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
    this.record = { tag: "", notes: "", type: "-", amount: "0" };
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
@/constants/typeList
