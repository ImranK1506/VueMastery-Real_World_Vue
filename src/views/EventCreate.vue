<template>
   <div>
      <h1>Create Event</h1>

      <form @submit.prevent="createEvent">
         <!--Globally registered component-->
         <BaseSelect
                 v-model="event.category"
                 label="Select a category"
                 :options="categories"
         />

         <h3>Name & describe your event</h3>
         <BaseInput
                 v-model="event.title"
                 label="Title"
                 type="text"
                 placeholder="Add an event title"
                 aria-placeholder="Add an event title"
                 class="field"
         />
         <BaseInput
                 v-model="event.description"
                 label="Description"
                 type="text"
                 placeholder="Add a description"
                 aria-placeholder="Add a description"
                 class="field"
         />

         <!--Globally registered component-->
         <h3>Where is your event?</h3>
         <BaseInput
                 v-model="event.location"
                 label="Location"
                 type="text"
                 placeholder="Add a location"
                 aria-placeholder="Add a location"
                 class="field"
         />

         <h3>When is your event?</h3>
         <div class="field">
            <label>Date</label>
            <datepicker v-model="event.date" placeholder="Select a date"/>
         </div>
         <div class="field">
            <label>Select a time</label>
            <select v-model="event.time">
               <option v-for="time in times" :key="time">{{ time }}</option>
            </select>
         </div>
         <input type="submit" class="button -fill-gradient" value="Submit"/>
      </form>
   </div>
</template>

<script>
  // import { mapState, mapGetters } from 'vuex';
  import Datepicker from 'vuejs-datepicker';
  import BaseInput from "@/components/BaseInput";
  import BaseSelect from "@/components/BaseSelect";

  export default {
    components: {
      BaseSelect,
      BaseInput,
      Datepicker
    },
    data() {
      const times = [];
      for (let i = 1; i <= 24; i++) {
        times.push(i + ' :00')
      }
      return {
        event: this.createFreshEventObject(),
        categories: this.$store.state.categories,
        times
      }
    },
    methods: {
      createEvent() {
        this.$store.dispatch('event/createEvent', this.event)
            .then(() => {
              this.$router.push({
                name: 'event-show',
                params: { id: this.event.id }
              });
              this.event = this.createFreshEventObject()
            })
      },
      createFreshEventObject() {
        const user = this.$store.state.user.user;
        const id = Math.floor(Math.random() * 10000000);
        return {
          id: id,
          category: '',
          organizer: user,
          title: '',
          description: '',
          location: '',
          date: '',
          time: '',
          attendees: []
        }
      }
    }
  }
</script>

<style scoped>
   .field {
      margin-bottom: 24px;
   }
</style>
