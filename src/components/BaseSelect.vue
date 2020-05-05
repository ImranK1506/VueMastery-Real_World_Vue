<template>
   <div>
      <label v-if="label">{{ label }}</label>
      <select v-on="$listeners"
              :value="value"
              v-bind="$attrs"
              @change="updateValue">
         <option v-for="option in options"
                 :value="option"
                 :key="option"
                 :selected="option === value">
            {{ option }}
         </option>
      </select>
   </div>
</template>

<script>
  import { formFieldMixin } from "@/mixins/formFieldMixin";
  export default {
    mixins: [formFieldMixin],
    props: {
      value: [String, Number],
      options: {
        type: Array,
        required: true
      },
    }
  }
</script>

