import Vue from "vue";
import Router from "vue-router";

// VIEWS
import Dashboard from "@/views/Dashboard";
import CustomerIndex from "@/views/CustomerIndex";

// PAGES
import Login from "@/views/pages/AdminLogin";
import Products from "@/views/pages/AdminProducts";
import OrderList from "@/views/pages/AdminOrderList";
import Coupon from "@/views/pages/AdminCoupon";
import Home from "@/views/pages/AdminHome";

import CustomerHome from "@/views/pages/CustomerHome";
import CustomerOrders from "@/views/pages/CustomerOrders";
import CustomerCheckout from "@/views/pages/CustomerCheckout";
import CustomerCart from "@/views/pages/CustomerCart";
import CustomerForm from "@/views/pages/CustomerForm";
import ProductDetail from "@/views/pages/CustomerProductDetail";
import CustomerCoupon from "@/views/pages/CustomerCoupon";
import CustomerStory from "@/views/pages/CustomerStory";
import CustomerComment from "@/views/pages/CustomerComment";
import CustomerNotice from "@/views/pages/CustomerNotice";
import CustomerFinished from "@/views/pages/CustomerFinished";

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
          path: "product_detail/:productId",
          name: "ProductDetail",
          component: ProductDetail
        },
        {
          path: "customer_cart",
          name: "CustomerCart",
          component: CustomerCart
        },
        {
          path: "customer_form",
          name: "CustomerForm",
          component: CustomerForm
        },
        {
          path: "customer_checkout/:orderId",
          name: "CustomerCheckout",
          component: CustomerCheckout
        },
        {
          path: "Customer_coupon",
          name: "CustomerCoupon",
          component: CustomerCoupon
        },
        {
          path: "Customer_story",
          name: "CustomerStory",
          component: CustomerStory
        },
        {
          path: "Customer_comment",
          name: "CustomerComment",
          component: CustomerComment
        },
        {
          path: "Customer_notice",
          name: "CustomerNotice",
          component: CustomerNotice
        },
        {
          path: "Customer_finished",
          name: "CustomerFinished",
          component: CustomerFinished
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
      component: Dashboard,
      children: [
        {
          path: "/",
          name: "Home",
          component: Home,
          meta: {
            requiresAuth: true
          }
        },
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
    }
  ]
});
