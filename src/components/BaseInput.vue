<template>
   <div>
      <label v-if="label">{{ label }}</label>
      <input v-on="listeners"
             @input="updateValue"
             :value="value"
             v-bind="$attrs"
      />
   </div>
</template>

<script>
   import { formFieldMixin } from "@/mixins/formFieldMixin";
   export default {
    mixins: [formFieldMixin],
    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: this.updateValue,
        }
      }
    }
  }
</script>

