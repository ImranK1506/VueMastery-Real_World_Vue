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
  export default {
    inheritAttrs: false, // turn off automatic inheritance by the root element
    props: {
      value: [String, Number],
      label: String,
    },
    methods: {
      updateValue(event) {
        this.$emit('input', event.target.value)
        console.log(this.updateValue(event))
      },
    },
    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: this.updateValue,
        }
      },
    },
  }
</script>

