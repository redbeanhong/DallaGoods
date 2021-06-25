<template>
  <div>
    <!-- LOADING -->
    <loading :active.sync="isLoading"></loading>
    <!-- END OF LOADING -->
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-6">
          <div
            class="h-100"
            style="background-size: cover; background-position: center;min-height:500px;"
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
          ></div>
        </div>
        <div class="col-md-6 p-3">
          <blockquote class="blockquote text-left">
            <p class="mb-0">
              {{ product.title }}
            </p>
            <footer class="blockquote-footer pl-5">
              {{ product.description }}
            </footer>
          </blockquote>
          <p class="h3 text-primary">
            NT{{ product.price | Currency }}
            <span class="h6 text-secondary" v-if="product.num"
              >小計
              <strong>NT{{ (product.num * product.price) | Currency }}</strong>
            </span>
          </p>
          <select name="" class="form-control mt-3" v-model="product.num">
            <option :value="num" v-for="num in 10" :key="num">
              選購 {{ num }} {{ product.unit }}
            </option>
          </select>
          <button
            type="button"
            class="btn btn-primary btn-block my-3"
            @click="addToCart(product.id, product.num, product.title)"
          >
            <i
              class="fas fa-spinner fa-spin"
              v-if="product.id === status.loadingItem"
            ></i>
            加到購物車
          </button>
          <button
            type="button"
            class="btn btn-block my-3"
            :class="{
              'btn-danger': stared.includes(product.id),
              'btn-outline-primary': !stared.includes(product.id)
            }"
            @click="changeStared(product.id, product.title)"
          >
            <i class="fas fa-heart"></i>
            <span v-if="stared.includes(product.id)">已收藏商品</span>
            <span v-else>收藏商品</span>
          </button>
          <ul>
            <li>付款後，從備貨到寄出商品為 3 個工作天。（不包含假日）</li>
            <li>設計館符合免辦理營業登記，無需開立統一發票。</li>
            <li>刷卡滿 NT$1500 即享分期 0利率！</li>
          </ul>
        </div>
      </div>
      <div class="row" style="white-space: pre-wrap;">
        <div class="col-12">
          <p class="h3 border-bottom border-primary pb-2">商品說明</p>
          {{ product.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      product: {}, // 單一商品細節暫存
      carts: {}, // 購物車內容
      status: {
        loadingItem: ''
      },
      isLoading: false, // 讀取中的效果控制
      fullPage: true,
      stared: JSON.parse(localStorage.getItem('personalProduct')) || []
    }
  },
  methods: {
    // 取得單一商品細節
    getProduct (itemId) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${itemId}`
      vm.isLoading = true
      vm.$http.get(api).then(res => {
        vm.product = res.data.product
        $('#productModal').modal('show')
        vm.isLoading = false
      })
    },
    addToCart (id, qty = 1, title) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const msg = {
        title: `『${title}』已加入購物車`
      }
      const cart = {
        product_id: id,
        qty
      }
      vm.status.loadingItem = id
      vm.$http.post(api, { data: cart }).then(res => {
        $('#productModal').modal('hide')
        vm.status.loadingItem = ''
        vm.$bus.$emit('message:push', msg.title, 'success')
        vm.$bus.$emit('carts:Update')
      })
    },
    changeStared (id, title) {
      const vm = this
      const msg = {
        title: `『${title}』已加入關注清單`,
        content: `謝謝您喜歡『${title}』！`,
        creat_at: Date.now(),
        href: `#/product_detail/${id}`
      }

      if (!vm.stared.includes(id)) {
        // 如果此商品尚未在關注清單，就push商品名稱進入清單
        vm.stared.push(id)
        vm.$bus.$emit('message:dropdown', msg)
        vm.$bus.$emit('message:push', msg.title, 'success')
      } else {
        // 如果此商品已經在關注清單，就將他從清單移除
        vm.stared.splice(
          vm.stared.findIndex(e => e === id),
          1
        )
      }

      // 將關注資料存到localStorage
      localStorage.setItem('personalProduct', JSON.stringify(vm.stared))
    }
  },
  created () {
    const productId = this.$route.params.productId
    this.getProduct(productId)
  }
}
</script>
