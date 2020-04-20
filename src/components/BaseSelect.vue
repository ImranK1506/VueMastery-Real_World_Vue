<template>
   <div>
      <label v-if="label">{{ label }}</label>
      <select :value="value"
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
  export default {
    inheritAttrs: false, // turn off automatic inheritance by the root element
    props: {
      options: {
        type: Array,
        required: true
      },
      value: [String, Number],
      label: String,
    },
    methods: {
      updateValue(event) {
        this.$emit('input', event.target.value)
      },
    },
  }
</script>

