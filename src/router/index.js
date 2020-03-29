import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "@/views/EventList";
import NProgress from 'nprogress';
import store from "@/store/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: true
  },
  {
    path: "/event/create",
    name: "event-create",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import(/* webpackChunkName: "Event Create" */ "../views/EventCreate.vue"),
  },
  {
    path: "/event/:id",
    name: "event-show",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import(/* webpackChunkName: "Event Show" */ "../views/EventShow.vue"),
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('event/fetchEvent', routeTo.params.id)
          .then((event) => {
            routeTo.params.event = event;
            next();
          })
    },
  },
  {
    path: '*',
    component: () => import("../views/404NotFoundPage.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

// Global route guards
router.beforeEach((routeTo, routeFrom, next) => {
  // Start navigation
  NProgress.start();
  next()
});
router.afterEach(() => {
  // Complete animation of the progress bar
  NProgress.done();
});

export default router;
