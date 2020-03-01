<template>
   <div>
      <h1>Event Listing</h1>
      <EventCard
              v-for="event in events"
              :key="event.id"
              :event="event"/>
      <BaseIcon/>
   </div>
</template>

<script>
   import EventCard from "@/components/EventCard";
   import EventService from "@/services/EventService";

   export default {
     components: {
       EventCard
     },
     data() {
       return {
         events: []
       }
     },
     created() {
       EventService.getEvents()
       .then(response => {
         this.events = response.data;
         console.log(response.data)
       })
       .catch(error => {
         console.log('Error API 1 ' + error.response)
       })
     }
   }
</script>

<style scoped></style>
