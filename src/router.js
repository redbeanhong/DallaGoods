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
          component: CustomerHome,
          meta: {
            scrollToInfobar: true
          }
        },
        {
          path: 'customer_orders/:productType',
          component: CustomerOrders,
          meta: {
            scrollToInfobar: true
          }
        },
        {
          path: 'product_detail/:productId',
          component: CustomerProductDetail,
          meta: {
            scrollToInfobar: true
          }
        },
        {
          path: 'customer_cart',
          component: CustomerCart,
          meta: {
            closeBanner: true
          }
        },
        {
          path: 'customer_form',
          component: CustomerForm,
          meta: {
            closeBanner: true
          }
        },
        {
          path: 'customer_checkout/:orderId',
          component: CustomerCheckout,
          meta: {
            closeBanner: true
          }
        },
        {
          path: 'Customer_coupon',
          component: CustomerCoupon,
          meta: {
            scrollToInfobar: true
          }
        },
        {
          path: 'Customer_story',
          component: CustomerStory,
          meta: {
            scrollToInfobar: true
          }
        },
        {
          path: 'Customer_comment',
          component: CustomerComment,
          meta: {
            scrollToInfobar: true
          }
        },
        {
          path: 'Customer_notice',
          component: CustomerNotice,
          meta: {
            scrollToInfobar: true
          }
        },
        {
          path: 'Customer_finished',
          component: CustomerFinished,
          meta: {
            closeBanner: true
          }
        }
      ]
    },
    {
      path: '/login',
      component: AdminLogin
    },
    {
      path: '/admin',
      component: Dashboard,
      children: [
        {
          path: '/',
          component: AdminHome,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'products',
          component: AdminProducts,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'orderlist',
          component: AdminOrderList,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'coupon',
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
