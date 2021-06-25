<template>
  <div>
    <!-- LOADING -->
    <loading :active.sync="isLoading"></loading>
    <!-- END OF LOADING -->
    <div class="container" v-if="!cartIn">
      <h3 class="text-primary border border-primary rounded p-3 text-center">
        目前購物車內暫無內容，眾多商品歡迎選購！
      </h3>
    </div>

    <div class="container" v-else>
      <ShoppingStep class="mb-4"></ShoppingStep>
      <div class="row justify-content-center">
        <div class="col-md-10 col-10">
          <!-- 商品內容 -->
          <section class="row mb-4" v-for="item in carts.carts" :key="item.id">
            <!-- 左商品圖片 -->
            <div class="col-md-4">
              <div
                class="h-100 img img-mid"
                :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
              ></div>
            </div>
            <!-- END OF 左商品圖片 -->

            <!-- 右商品說明 -->
            <div class="col-md-8">
              <div class="border p-3 mb-3">
                <button
                  type="button"
                  class="close"
                  @click="removeCartItem(item.id)"
                >
                  <i
                    class="fas fa-spinner fa-spin"
                    v-if="status.loadingItem === item.id"
                  ></i>
                  <span aria-hidden="true">&times;</span>
                </button>
                <blockquote class="blockquote text-left">
                  <p class="mb-0">
                    {{ item.product.title }}
                  </p>
                  <footer class="blockquote-footer pl-5">
                    {{ item.product.description }}
                  </footer>
                </blockquote>
                <div v-if="item.coupon" class="text-success">已套用優惠券</div>
              </div>

              <div class="d-flex border p-3 justify-content-between">
                <div class="d-flex align-items-center">
                  <button
                    type="button"
                    :disabled="item.qty === 1 || isLoading"
                    class="btn btn-outline-primary"
                    @click="changeCart(item.product_id, item.qty - 1, item.id)"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                  <span class="mx-2">{{ item.qty }}</span>
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    :disabled="isLoading"
                    @click="changeCart(item.product_id, item.qty + 1, item.id)"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>

                <div class="d-sm-flex align-items-center">
                  <p class="m-0 p-2">NT{{ item.product.price | Currency }}</p>
                  <p class="bg-primary m-0 text-light p-2">
                    NT{{ (item.product.price * item.qty) | Currency }}
                  </p>
                </div>
              </div>
            </div>
            <!-- END OF 右商品說明 -->
          </section>
          <!-- END OF 商品內容 -->

          <!-- 優惠碼輸入 -->
          <section class="row mb-4">
            <div class="col-md-12">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入優惠碼"
                  aria-label="輸入優惠碼"
                  aria-describedby="button-addon2"
                  v-model="coupon_code"
                  :class="couponClass"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-primary"
                    type="button"
                    id="button-addon2"
                    @click="addCouponCode"
                  >
                    使用優惠券
                  </button>
                </div>
              </div>
            </div>
          </section>
          <!-- END OF 優惠碼輸入 -->

          <!-- 結帳價格 -->
          <section class="row">
            <div class="col-md-3">
              <p class="text-success" v-if="carts.final_total !== carts.total">
                已折扣:
                <span
                  >NT{{ (carts.final_total - carts.total) | Currency }}</span
                >
              </p>
            </div>
            <div class="col-md-9 d-flex justify-content-end">
              <div class="text-center">
                <p class="h3 border-bottom mb-3 p-3">
                  總計: <span>NT{{ carts.total | Currency }}</span>
                </p>
                <p
                  class="h2 text-success mb-3"
                  v-if="carts.final_total !== carts.total"
                >
                  折扣價: <span>NT{{ carts.final_total | Currency }}</span>
                </p>
                <router-link class="nav-link" to="/customer_form"
                  ><button type="button" class="btn btn-primary btn-lg">
                    結帳去
                  </button>
                </router-link>
              </div>
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
      isLoading: false, // 讀取中的效果控制
      fullPage: true,
      carts: {}, // 呈現在頁面的所有商品清單
      status: {
        loadingItem: ''
      },
      coupon_code: '',
      cartIn: true,
      couponClass: ''
    }
  },
  methods: {
    getCart () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      let count = 0

      vm.isLoading = true

      vm.$http.get(api).then(res => {
        if (!res.data.data.carts[0]) {
          vm.cartIn = false
        } else {
          count = res.data.data.carts
            .map(item => item.qty)
            .reduce((total, e) => {
              return total + e
            }, 0)
        }

        vm.$bus.$emit('carts:Update', count)

        vm.carts = res.data.data
        vm.carts.carts.sort(function (a, b) {
          return a.product.title.localeCompare(b.product.title)
        })
        vm.isLoading = false
      })
    },
    changeCart (productID, qty, itemID) {
      this.isLoading = true
      this.removeCartItem(itemID)
      setTimeout(() => {
        this.addToCart(productID, qty)
      }, 300)
    },
    addToCart (id, qty = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      vm.$http.post(api, { data: cart }).then(res => {
        vm.getCart()
      })
    },
    removeCartItem (itemId) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${itemId}`
      vm.isLoading = true
      vm.$http.delete(api).then(res => {
        vm.getCart()
        setTimeout(() => {
          vm.isLoading = false
        }, 300)
      })
    },
    addCouponCode () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.$http.post(api, { data: coupon }).then(res => {
        if (res.data.success) {
          vm.coupon_code = `已使用優惠券${vm.coupon_code}`
          vm.couponClass = 'is-valid'
          vm.getCart()
        } else {
          vm.$bus.$emit('message:push', res.data.message)
          vm.couponClass = 'is-invalid'
        }
      })
    }
  },
  components: {
    ShoppingStep
  },
  created () {
    this.getCart()
  }
}
</script>
