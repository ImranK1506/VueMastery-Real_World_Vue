<template>
   <div>
      <h1>Uh oh, it looks like you are experiencing connectivity issues!</h1>
      <router-link :to="{ name: 'event-list' }">Back to event list</router-link>
   </div>
   
</template>

<script>
  export default {
    name: "NetworkIssue",
  }
</script>

<style scoped>

</style>