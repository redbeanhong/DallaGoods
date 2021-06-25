import Vue from 'vue'
import Router from 'vue-router'

// VIEWS
import Dashboard from '@/views/Dashboard'
import CustomerIndex from '@/views/CustomerIndex'

// PAGES
import AdminLogin from '@/views/pages/backend/AdminLogin'
import AdminProducts from '@/views/pages/backend/AdminProducts'
import AdminOrderList from '@/views/pages/backend/AdminOrderList'
import AdminCoupon from '@/views/pages/backend/AdminCoupon'
import AdminHome from '@/views/pages/backend/AdminHome'

import CustomerHome from '@/views/pages/frontend/CustomerHome'
import CustomerOrders from '@/views/pages/frontend/CustomerOrders'
import CustomerCheckout from '@/views/pages/frontend/CustomerCheckout'
import CustomerCart from '@/views/pages/frontend/CustomerCart'
import CustomerForm from '@/views/pages/frontend/CustomerForm'
import CustomerProductDetail from '@/views/pages/frontend/CustomerProductDetail'
import CustomerCoupon from '@/views/pages/frontend/CustomerCoupon'
import CustomerStory from '@/views/pages/frontend/CustomerStory'
import CustomerComment from '@/views/pages/frontend/CustomerComment'
import CustomerNotice from '@/views/pages/frontend/CustomerNotice'
import CustomerFinished from '@/views/pages/frontend/CustomerFinished'

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
