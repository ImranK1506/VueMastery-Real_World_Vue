<template>
   <div>
      <label v-if="label">{{ label }}</label>
      <input v-on="listeners"
             :id="label"
             :value="value"
             v-bind="$attrs"
      />
   </div>
</template>

<script>
   import { formFieldMixin } from "@/mixins/formFieldMixin";
   export default {
    mixins: [formFieldMixin],
     props: {
      value: [String, Number]
     },
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

