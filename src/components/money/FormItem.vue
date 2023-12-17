<template>
  <div>
    <label class="formItem">
      <span class="name">{{ filedName }}</span>
      <template v-if="type === 'date'">
        <input
          :type="type || 'text'"
          :placeholder="placeholder"
          :value="x(value)"
          @input="onValueChanged"
        />
      </template>
      <template v-else>
        <input
          type=" text"
          :placeholder="placeholder"
          :value="value"
          @input="onValueChanged"
        />
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  @Prop({ default: "" }) value!: string;
  @Prop({ required: true }) filedName!: string;
  @Prop(String) placeholder?: string;
  @Prop(String) type?: string;
  onValueChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    this.$emit("update:value", input.value);
  }
  x(string: string) {
    return dayjs(string).format("YYYY-MM-DD");
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
    outline: medium;
  }
}
</style>
