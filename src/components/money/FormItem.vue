<template>
  <div>
    <label class="formItem">
      <span class="name">{{ filedName }}</span>
      <input
        type="text"
        :placeholder="placeholder"
        :value="value"
        @input="onValueChanged"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  @Prop({ default: "" }) value!: string;
  @Prop({ required: true }) filedName!: string;
  @Prop(String) placeholder?: string;
  onValueChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    this.$emit("update:value", input.value);
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
