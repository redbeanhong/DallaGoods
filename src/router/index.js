import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/pages/Login";
import Dashboard from "@/components/Dashboard";
import Products from "@/components/pages/Products";
import OrderList from "@/components/pages/OrderList";
import Coupon from "@/components/pages/Coupon";
import CustomerOrders from "@/components/pages/CustomerOrders";
import CustomerCheckout from "@/components/pages/CustomerCheckout";

Vue.use(Router);

export default new Router({
  linkActiveClass: "active",
  routes: [
    {
      path: "*",
      redirect: "Login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/admin",
      name: "Dashboard",
      component: Dashboard,
      children: [
        {
          path: "products",
          name: "Products",
          component: Products,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "orderlist",
          name: "OrderList",
          component: OrderList,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "coupon",
          name: "Coupon",
          component: Coupon,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: "/",
      name: "index",
      component: Dashboard,
      children: [
        {
          path: "customer_orders",
          name: "CustomerOrders",
          component: CustomerOrders
        },
        {
          path: "customer_checkout/:orderId",
          name: "CustomerCheckout",
          component: CustomerCheckout,
        }
      ]
    },
  ]
});
