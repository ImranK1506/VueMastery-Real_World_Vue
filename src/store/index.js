import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: '1', name: 'Imran Khan'},
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false }
    ]
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event.data)
      });
    }
  },
  modules: {},
  getters: {
    catLength: state => {
      return state.categories.length
    },
    // doneTodos: state => {
    //   return state.todos.filter(todo => todo.done)
    // },
    // activeTodosCount: state => {
    //   return state.todos.filter(todo => !todo.done).length
    // }
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
});
