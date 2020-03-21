import EventService from "@/services/EventService";

// Global namespace
export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
};
export const mutations = {
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
};
export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event);
          const notification = {
            type: 'success',
            message: 'Successful event created'
          };
          dispatch('notification/add', notification, { root: true })
    })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'CreateEvent error: ' + error.message
          };
          dispatch('notification/add', notification, { root: true });
          throw error
        })
  },
  fetchEvents({ commit, dispatch }, {perPage, page}) {
    EventService.getEvents(perPage, page)
        .then(response => {
          commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']));
          // console.log('Total events: ' + response.headers['x-total-count']);
          commit('SET_EVENTS', response.data);
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'FetchEvents error: ' + error.message
          };
          dispatch('notification/add', notification, { root: true })
        })
  },
  fetchEvent({commit, getters, dispatch}, id) {
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
            const notification = {
              type: 'error',
              message: 'FetchEvent error: ' + error.message
            };
            dispatch('notification/add', notification, { root: true })
          })
    }
  },
};
export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  },
};
