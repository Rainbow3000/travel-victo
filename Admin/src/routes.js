
import Index from "./views/Index.js";
import Login from "./views/Login.js";
import Category from "./views/Category.js";
import Tour from './views/Tour.js'
import Order from "./views/Order.js";
import Schedule from "./views/Schedule.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },

  {
    path: "/category",
    name: "Category",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Category />,
    layout: "/admin",
  },
  {
    path: "/tour",
    name: "Tour",
    icon: "ni ni-world text-green",
    component: <Tour />,
    layout: "/admin",
  },
  {
    path: "/order",
    name: "Order",
    icon: "ni ni-basket text-yellow",
    component: <Order />,
    layout: "/admin",
  },
  {
    path: "/schedule",
    name: "Schedule",
    icon: "ni ni-calendar-grid-58 text-blue",
    component: <Schedule />,
    layout: "/admin",
  },
  {
    path: "/login",
  
    
    component: <Login />,
    layout: "/auth",
  },
 
];
export default routes;
