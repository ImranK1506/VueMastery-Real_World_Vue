<template>
   <div>
      <h1>Uh oh, 404 was found!</h1>
      <h3>The <template v-if="resource">{{ resource }}</template> page is not available.</h3>
      <router-link :to="{ name: 'event-list' }">Back to home page</router-link>
   </div>
</template>

<script>
  export default {
    props: {
      resource: {
        type: String,
        // required: true
      }
    }
  }
</script>
