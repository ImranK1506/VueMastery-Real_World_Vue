import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    event: {},
    user: {id: '1', name: 'Imran Khan'},
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
    events: [
      {id: 1, text: '...', done: true},
      {id: 2, text: '...', done: false},
      {id: 3, text: '...', done: true},
      {id: 4, text: '...', done: false},
    ],
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event) {
      state.event = event
    },
  },
  actions: {
    createEvent({commit}, event) {
      EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event.data)
      });
    },
    fetchEvents({commit}, {perPage, page}) {
      EventService.getEvents(perPage, page)
          .then(response => {
            commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']));
            // console.log('Total events: ' + response.headers['x-total-count']);
            commit('SET_EVENTS', response.data);
          })
          .catch(error => {
            console.log('FetchEvents error: ' + error.response)
          })
    },
    fetchEvent({commit, getters}, id) {
      // Check if there already is an event
      let event = getters.getEventById(id);

      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
            .then(response => {
              commit('SET_EVENT', response.date);
            })
            .catch(error => {
              console.log('FetchEvent error: ', error.response)
            })
      }
    },
  },
  modules: {},
  getters: {
    catLength: state => {
      return state.categories.length
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    },
  },
});
