
import { createRouter, createWebHistory} from "vue-router";
// 项目其他页面路由（推荐使用）
//import Practice from "../router/practiceFolder/practice";

// vue项目自带路由
const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/home.vue")
  },
  {
    path: "/history",
    name: "History",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/history.vue")
  },
  {
    path: "/culture",
    name: "Culture",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/culture.vue")
  },
  {
    path: "/locationConsult",
    name: "LocationConsult",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/locationContent/consult.vue")
  },
  {
    path: "/locationMap",
    name: "LocationMap",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/locationContent/locationMap.vue")
  },
  {
    path: "/historyMap",
    name: "HistoryMap",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/historyContent/historyMap.vue")
  },
  {
    path: "/historyTicket",
    name: "HistoryTicket",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/historyContent/ticket.vue")
  },
  {
    path: "/cultureMap",
    name: "CultureMap",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/cultureContent/cultureMap.vue")
  },
  {
    path: "/cultureRestaurant",
    name: "CultureRestaurant",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/cultureContent/restaurant.vue")
  },
  {
    path: "/cultureMenu",
    name: "CultureMenu",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/cultureContent/menu.vue")
  },
  {
    path: "/cultureTable",
    name: "CultureTable",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/cultureContent/table.vue")
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

