import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "@/views/EventList";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList
  },
  {
    path: "/event/create",
    name: "event-create",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Event Create" */ "../views/EventCreate.vue")
  },
  {
    path: "/event/:id",
    name: "event-show",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Event Show" */ "../views/EventShow.vue"),
    props: true
  },
  {
    path: '*',
    component: () => import("../views/404NotFoundPage.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
