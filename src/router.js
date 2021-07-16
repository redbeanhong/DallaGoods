import Vue from 'vue'
import Router from 'vue-router'

// VIEWS
import Dashboard from '@/views/Dashboard.vue'
import CustomerIndex from '@/views/CustomerIndex.vue'

// PAGES
import AdminLogin from '@/views/pages/backend/AdminLogin.vue'
import AdminProducts from '@/views/pages/backend/AdminProducts.vue'
import AdminOrderList from '@/views/pages/backend/AdminOrderList.vue'
import AdminCoupon from '@/views/pages/backend/AdminCoupon.vue'
import AdminHome from '@/views/pages/backend/AdminHome.vue'

import CustomerHome from '@/views/pages/frontend/CustomerHome.vue'
import CustomerOrders from '@/views/pages/frontend/CustomerOrders.vue'
import CustomerCheckout from '@/views/pages/frontend/CustomerCheckout.vue'
import CustomerCart from '@/views/pages/frontend/CustomerCart.vue'
import CustomerForm from '@/views/pages/frontend/CustomerForm.vue'
import CustomerProductDetail from '@/views/pages/frontend/CustomerProductDetail.vue'
import CustomerCoupon from '@/views/pages/frontend/CustomerCoupon.vue'
import CustomerStory from '@/views/pages/frontend/CustomerStory.vue'
import CustomerComment from '@/views/pages/frontend/CustomerComment.vue'
import CustomerNotice from '@/views/pages/frontend/CustomerNotice.vue'
import CustomerFinished from '@/views/pages/frontend/CustomerFinished.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: CustomerIndex,
      children: [
        {
          path: '/',
          name: 'CustomerHome',
          component: CustomerHome
        },
        {
          path: 'customer_orders/:productType',
          name: 'CustomerOrders',
          component: CustomerOrders
        },
        {
          path: 'product_detail/:productId',
          name: 'ProductDetail',
          component: CustomerProductDetail
        },
        {
          path: 'customer_cart',
          name: 'CustomerCart',
          component: CustomerCart
        },
        {
          path: 'customer_form',
          name: 'CustomerForm',
          component: CustomerForm
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout
        },
        {
          path: 'Customer_coupon',
          name: 'CustomerCoupon',
          component: CustomerCoupon
        },
        {
          path: 'Customer_story',
          name: 'CustomerStory',
          component: CustomerStory
        },
        {
          path: 'Customer_comment',
          name: 'CustomerComment',
          component: CustomerComment
        },
        {
          path: 'Customer_notice',
          name: 'CustomerNotice',
          component: CustomerNotice
        },
        {
          path: 'Customer_finished',
          name: 'CustomerFinished',
          component: CustomerFinished
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: AdminLogin
    },
    {
      path: '/admin',
      component: Dashboard,
      children: [
        {
          path: '/',
          name: 'Home',
          component: AdminHome,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'products',
          name: 'Products',
          component: AdminProducts,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'orderlist',
          name: 'OrderList',
          component: AdminOrderList,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: AdminCoupon,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
