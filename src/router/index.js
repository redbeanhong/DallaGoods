import Vue from "vue";
import Router from "vue-router";

// VIEWS
import Dashboard from "@/views/Dashboard";
import CustomerIndex from "@/views/CustomerIndex";

// PAGES
import Login from "@/views/pages/Login";
import CustomerHome from "@/views/pages/CustomerHome";
import Products from "@/views/pages/Products";
import OrderList from "@/views/pages/OrderList";
import Coupon from "@/views/pages/Coupon";
import CustomerOrders from "@/views/pages/CustomerOrders";
import CustomerCheckout from "@/views/pages/CustomerCheckout";
import Cart from "@/views/pages/Cart";

Vue.use(Router);

export default new Router({
  linkActiveClass: "active",
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      name: "CustomerIndex",
      component: CustomerIndex,
      children: [
        {
          path: "/",
          name: "CustomerHome",
          component: CustomerHome
        },
        {
          path: "customer_orders/:productType",
          name: "CustomerOrders",
          component: CustomerOrders
        },
        {
          path: "cart",
          name: "Cart",
          component: Cart,
        },
        {
          path: "customer_checkout/:orderId",
          name: "CustomerCheckout",
          component: CustomerCheckout,
        }
      ]
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
  ]
});
