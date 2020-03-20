<template>
   <div>
      <h1>Events for {{ user.user.name }}</h1>
      <EventCard
              v-for="event in event.events"
              :key="event.id"
              :event="event"/>
      <template v-if="page !== 1">
         <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">
            Previous page
         </router-link>
         <template v-if="hasNextPage"> | </template>
      </template>
      <router-link v-if="hasNextPage" :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">
         Next page
      </router-link>
<!--      <BaseIcon/>-->
   </div>
</template>

<script>
  import EventCard from "@/components/EventCard";
  import { mapState } from 'vuex';

  export default {
    components: {
      EventCard,
    },
    created() {
      this.perPage = 3;

      this.$store.dispatch('event/fetchEvents', {
        perPage: this.perPage, // Items to display per page
        page: this.page, // Which page we are on
      })
    },
    computed: {
      page() { // Current page we are on
        return parseInt(this.$route.query.page) || 1
      },
      hasNextPage() {
        return this.event.eventsTotal > this.page * this.perPage
      },
      ...mapState(['event', 'user']),
    },
  }
</script>

<style scoped></style>
