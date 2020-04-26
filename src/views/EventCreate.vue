<template>
   <div>
      <h1>Create Event</h1>

      <form @submit.prevent="createEvent">
         <!--Globally registered component-->
         <BaseSelect
                 v-model="event.category"
                 label="Select a category"
                 :options="categories"
                 :class="{ error: $v.event.category.$error}"
                 @blur="$v.event.category.$touch()"
         />
         <template v-if="$v.event.category.$error">
            <p v-if="!$v.event.category.required" class="errorMessage">Category is required</p>
         </template>

         <h3>Name & describe your event</h3>
         <BaseInput
                 v-model="event.title"
                 label="Title"
                 type="text"
                 placeholder="Add an event title"
                 aria-placeholder="Add an event title"
                 class="field"
                 :class="{ error: $v.event.title.$error }"
                 @blur="$v.event.title.$touch()"
         />
         <template v-if="$v.event.title.$error">
            <p v-if="!$v.event.title.required" class="errorMessage">Title is required</p>
         </template>

         <BaseInput
                 v-model="event.description"
                 label="Description"
                 type="text"
                 placeholder="Add a description"
                 aria-placeholder="Add a description"
                 class="field"
                 :class="{ error: $v.event.description.$error }"
                 @blur="$v.event.description.$touch()"
         />
         <template v-if="$v.event.description.$error">
            <p v-if="!$v.event.description.required" class="errorMessage">Description is required</p>
         </template>

         <!--Globally registered component-->
         <h3>Where is your event?</h3>
         <BaseInput
                 v-model="event.location"
                 label="Location"
                 type="text"
                 placeholder="Add a location"
                 aria-placeholder="Add a location"
                 class="field"
                 :class="{ error: $v.event.location.$error }"
                 @blur="$v.event.location.$touch()"
         />
         <template v-if="$v.event.location.$error">
            <p v-if="!$v.event.location.required" class="errorMessage">Location is required</p>
         </template>

         <h3>When is your event?</h3>
         <div class="field">
            <label>Date</label>
            <datepicker v-model="event.date"
                        placeholder="Select a date"
                        @opened="$v.event.date.$touch()"
                        input-class="{ error: $v.event.date.$error}"
            />
         </div>
         <template v-if="$v.event.date.$error">
            <p v-if="!$v.event.date.required" class="errorMessage">Date is required</p>
         </template>

         <BaseSelect
                 v-model.trim="event.time"
                 label="Select a time"
                 :options="times"
                 class="field"
                 :class="{ error: $v.event.time.$error}"
                 @blur="$v.event.time.$touch()"
         />
         <template v-if="$v.event.time.$error">
            <p v-if="!$v.event.time.required" class="errorMessage">Time is required</p>
         </template>

         <BaseButton type="submit"
                     button-class="-fill-gradient"
                     :disabled="$v.$anyError"
         >Submit
         </BaseButton>
         <p v-if="$v.$anyError" class="errorMessage">Please fill out the required field(s)</p>
      </form>
   </div>
</template>

<script>
  // import { mapState, mapGetters } from 'vuex';
  import Datepicker from 'vuejs-datepicker';
  import BaseInput from "@/components/BaseInput";
  import BaseSelect from "@/components/BaseSelect";
  import BaseButton from "@/components/BaseButton";
  import NProgress from 'nprogress';
  import {required} from 'vuelidate/lib/validators';

  export default {
    components: {
      BaseButton,
      BaseSelect,
      BaseInput,
      Datepicker,
    },
    data() {
      const times = [];
      for (let i = 1; i <= 24; i++) {
        times.push(i + ' :00')
      }
      return {
        event: this.createFreshEventObject(),
        categories: this.$store.state.categories,
        times,
      }
    },
    validations: {
      event: {
        category: {required},
        title: {required},
        description: {required},
        location: {required},
        date: {required},
        time: {required},
      },
    },
    methods: {
      createEvent() {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          NProgress.start()
          this.$store
              .dispatch('event/createEvent', this.event)
              .then(() => {
                this.$router.push({
                  name: 'event-show',
                  params: {id: this.event.id},
                });
                this.event = this.createFreshEventObject()
              })
              .catch(() => {
                NProgress.done()
              })
        }
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
          attendees: [],
        }
      },
    },
  }
</script>

<style scoped>
   .field {
      margin-bottom: 24px;
   }

   .errorMessage {
      color: red;
   }
</style>
