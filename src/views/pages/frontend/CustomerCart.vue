<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="container" v-if="cart.products.length === 0">
      <p class="h3 text-primary border border-primary rounded p-3 text-center">
        目前購物車內暫無內容，眾多商品歡迎選購！
        <router-link class="nav-link text-danger" to="/customer_orders/all"
          >點我來去逛逛<i class="far fa-hand-point-left"></i
          ><i class="far fa-hand-point-left"></i
          ><i class="far fa-hand-point-left"></i
        ></router-link>
      </p>
    </div>

    <div class="container" v-else>
      <ShoppingStep class="mb-4"></ShoppingStep>
      <div class="row justify-content-center">
        <div class="col-md-10 col-10">
          <!-- 商品內容 -->
          <section
            class="row mb-4"
            v-for="item in cart.products"
            :key="item.id"
          >
            <!-- 左商品圖片 -->
            <div class="col-md-4">
              <div
                class="h-100 img img-mid"
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
              ></div>
            </div>
            <!-- END OF 左商品圖片 -->

            <!-- 右商品說明 -->
            <div class="col-md-8">
              <div class="border p-3 mb-3">
                <button
                  type="button"
                  class="close"
                  @click="changeCart(item.id, 0, item.title)"
                >
                  <i
                    class="fas fa-spinner fa-spin"
                    v-if="status.loadingItem === item.id"
                  ></i>
                  <span aria-hidden="true" v-else>&times;</span>
                </button>
                <blockquote class="blockquote text-left">
                  <p class="mb-0">
                    {{ item.title }}
                  </p>
                  <footer class="blockquote-footer pl-5">
                    {{ item.description }}
                  </footer>
                </blockquote>
                <div v-if="item.coupon" class="text-success">已套用優惠券</div>
              </div>

              <div class="d-flex border p-3 justify-content-between">
                <div class="d-flex align-items-center">
                  <button
                    type="button"
                    :disabled="item.num === 1 || isLoading"
                    :class="{ 'input--disabled': item.num === 1 || isLoading }"
                    class="btn btn-outline-primary"
                    @click="changeCart(item.id, -1, item.title)"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                  <span class="mx-2">{{ item.num }}</span>
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    :disabled="isLoading"
                    @click="changeCart(item.id, +1, item.title)"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>

                <div class="d-sm-flex align-items-center">
                  <p class="m-0 p-2 border-right text-gray small">
                    NT{{ item.price | Currency }}/{{ item.unit }}
                  </p>
                  <p class="m-0 p-2 text-primary h5">
                    NT{{ (item.price * item.num) | Currency }}
                  </p>
                </div>
              </div>
            </div>
            <!-- END OF 右商品說明 -->
          </section>
          <!-- END OF 商品內容 -->

          <!-- 結帳價格 -->
          <section class="row justify-content-end">
            <div class="col-4 text-center">
              <p class="h3 border-bottom mb-3 p-3">
                總計: <span>NT{{ cart.total | Currency }}</span>
              </p>
              <button
                type="button"
                class="btn btn-primary btn-lg"
                @click="addToCart"
              >
                結帳去
              </button>
            </div>
          </section>
          <!-- END OF 結帳價格 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShoppingStep from '@/components/ShoppingStep.vue'

export default {
  data () {
    return {
      isLoading: false,
      fullPage: true,
      cart: JSON.parse(localStorage.getItem('personalCart')) || {
        products: []
      },
      status: {
        loadingItem: ''
      }
    }
  },
  methods: {
    changeCart (productID, changeQty, productTitle) {
      const vm = this
      const productIndex = vm.cart.products.findIndex(e => e.id === productID)
      const msg = {
        title: ''
      }
      vm.status.loadingItem = productID

      if (changeQty === 0) {
        vm.cart.products.splice(productIndex, 1)
        msg.title = `『${productTitle}』已至購物車移除`
      } else {
        vm.cart.products[productIndex].num += changeQty
        msg.title = `『${productTitle}』數量已更新`
      }
      vm.updateTotal()
      localStorage.setItem('personalCart', JSON.stringify(vm.cart))

      setTimeout(function () {
        vm.status.loadingItem = ''
      }, 500)

      vm.$bus.$emit('message:push', msg.title, 'success')
      vm.$bus.$emit('carts:Update')
    },
    updateTotal () {
      const vm = this
      vm.cart.total = vm.cart.products.reduce((total, e) => {
        return total + e.price * e.num
      }, 0)
    },
    addToCart () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      let addProduct = {}
      vm.cart.products.forEach(e => {
        addProduct = {
          product_id: e.id,
          qty: e.num
        }
        vm.$http.post(api, { data: addProduct }).then(res => {})
      })
      vm.$router.push('/customer_Form')
    },
    cleanCart () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`

      vm.$http.get(api).then(res => {
        if (res.data.data.carts.length > 0) {
          const carts = res.data.data.carts
          carts.forEach(e => {
            const delapi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${e.id}`
            vm.$http.delete(delapi).then(res => {})
          })
        }
      })
    }
  },
  components: {
    ShoppingStep
  },
  created () {
    this.cleanCart()
  }
}
</script>
