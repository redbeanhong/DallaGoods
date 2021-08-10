<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="container">
      <div class="row mb-5">
        <div class="col-md-6">
          <div
            class="h-100 img img--big"
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
          <select class="form-control mt-3" v-model="product.num">
            <option :value="num" v-for="num in 10" :key="num">
              選購 {{ num }} {{ product.unit }}
            </option>
          </select>
          <button
            type="button"
            class="btn btn-primary btn-block my-3"
            @click="addToCart"
            :disabled="status.loadingItem"
          >
            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem"></i>
            加到購物車
          </button>
          <button
            type="button"
            class="btn btn-block my-3"
            :class="{
              'btn-danger': stared.includes(product.id),
              'btn-outline-primary': !stared.includes(product.id)
            }"
            @click="changeStared"
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
      <div class="row text--pre-line">
        <div class="col-md-8">
          <section class="mb-5">
            <h3 class="border-bottom border-primary pb-2">商品說明</h3>
            {{ product.content }}
          </section>
          <section>
            <h3 class="border-bottom border-primary pb-2">常見問題</h3>
            <br />
            <ul class="list-unstyled">
              <li class="border rounded mb-3">
                <a
                  class="modal-toggle d-flex align-items-center text-decoration-none p-2 collapsed"
                  data-toggle="collapse"
                  href="#qa-01"
                  role="button"
                  aria-expanded="false"
                  aria-controls="qa-01"
                >
                  <span class="badge bg-primary text-light p-2 mr-3">Q1</span>
                  <div
                    class="d-flex align-items-center justify-content-between w-100"
                  >
                    <small>可以客製化商品嗎？</small
                    ><small
                      ><i class="fas fa-chevron-up"></i
                      ><i class="fas fa-chevron-down"></i
                    ></small>
                  </div>
                </a>
                <div class="collapse collapse--border" id="qa-01">
                  <p class="py-3 pl-5 pr-3">
                    <small class="pl-2"
                      >可以在這邊大買特買客製化商品，通通都沒有問題，服務優良包您滿意！</small
                    >
                  </p>
                </div>
              </li>
              <li class="border rounded mb-3">
                <a
                  class="modal-toggle d-flex align-items-center text-decoration-none p-2 collapsed"
                  data-toggle="collapse"
                  href="#qa-02"
                  role="button"
                  aria-expanded="false"
                  aria-controls="qa-02"
                >
                  <span class="badge bg-primary text-light p-2 mr-3">Q2</span>
                  <div
                    class="d-flex align-items-center justify-content-between w-100"
                  >
                    <small>有提供保固或維修服務嗎？</small
                    ><small
                      ><i class="fas fa-chevron-up"></i
                      ><i class="fas fa-chevron-down"></i
                    ></small>
                  </div>
                </a>
                <div class="collapse collapse--border" id="qa-02">
                  <p class="py-3 pl-5 pr-3">
                    <small class="pl-2"
                      >可以在這邊大買特買客製化商品，通通都沒有問題，服務優良包您滿意！</small
                    >
                  </p>
                </div>
              </li>
              <li class="border rounded mb-3">
                <a
                  class="modal-toggle d-flex align-items-center text-decoration-none p-2 collapsed"
                  data-toggle="collapse"
                  href="#qa-03"
                  role="button"
                  aria-expanded="false"
                  aria-controls="qa-03"
                >
                  <span class="badge bg-primary text-light p-2 mr-3">Q3</span>
                  <div
                    class="d-flex align-items-center justify-content-between w-100"
                  >
                    <small>相關五金配件要去哪裡購買呢？</small
                    ><small
                      ><i class="fas fa-chevron-up"></i
                      ><i class="fas fa-chevron-down"></i
                    ></small>
                  </div>
                </a>
                <div class="collapse collapse--border" id="qa-03">
                  <p class="py-3 pl-5 pr-3">
                    <small class="pl-2"
                      >可以在這邊大買特買客製化商品，通通都沒有問題，服務優良包您滿意！</small
                    >
                  </p>
                </div>
              </li>
              <li class="border rounded mb-3">
                <a
                  class="modal-toggle d-flex align-items-center text-decoration-none p-2 collapsed"
                  data-toggle="collapse"
                  href="#qa-04"
                  role="button"
                  aria-expanded="false"
                  aria-controls="qa-04"
                >
                  <span class="badge bg-primary text-light p-2 mr-3">Q4</span>
                  <div
                    class="d-flex align-items-center justify-content-between w-100"
                  >
                    <small>是否可以大量訂製呢？</small
                    ><small
                      ><i class="fas fa-chevron-up"></i
                      ><i class="fas fa-chevron-down"></i
                    ></small>
                  </div>
                </a>
                <div class="collapse collapse--border" id="qa-04">
                  <p class="py-3 pl-5 pr-3">
                    <small class="pl-2"
                      >可以在這邊大買特買客製化商品，通通都沒有問題，服務優良包您滿意！</small
                    >
                  </p>
                </div>
              </li>
              <li class="border rounded mb-3">
                <a
                  class="modal-toggle d-flex align-items-center text-decoration-none p-2 collapsed"
                  data-toggle="collapse"
                  href="#qa-05"
                  role="button"
                  aria-expanded="false"
                  aria-controls="qa-05"
                >
                  <span class="badge bg-primary text-light p-2 mr-3">Q5</span>
                  <div
                    class="d-flex align-items-center justify-content-between w-100"
                  >
                    <small>運送方式及付款方式有哪些呢？</small
                    ><small
                      ><i class="fas fa-chevron-up"></i
                      ><i class="fas fa-chevron-down"></i
                    ></small>
                  </div>
                </a>
                <div class="collapse collapse--border" id="qa-05">
                  <p class="py-3 pl-5 pr-3">
                    <small class="pl-2"
                      >可以在這邊大買特買客製化商品，通通都沒有問題，服務優良包您滿意！</small
                    >
                  </p>
                </div>
              </li>
              <li class="border rounded">
                <a
                  class="modal-toggle d-flex align-items-center text-decoration-none p-2 collapsed"
                  data-toggle="collapse"
                  href="#qa-06"
                  role="button"
                  aria-expanded="false"
                  aria-controls="qa-06"
                >
                  <span class="badge bg-primary text-light p-2 mr-3">Q6</span>
                  <div
                    class="d-flex align-items-center justify-content-between w-100"
                  >
                    <small>退換貨方式及規則</small
                    ><small
                      ><i class="fas fa-chevron-up"></i
                      ><i class="fas fa-chevron-down"></i
                    ></small>
                  </div>
                </a>
                <div class="collapse collapse--border" id="qa-06">
                  <p class="py-3 pl-5 pr-3">
                    <small class="pl-2"
                      >可以在這邊大買特買客製化商品，通通都沒有問題，服務優良包您滿意！</small
                    >
                  </p>
                </div>
              </li>
            </ul>
          </section>
        </div>
        <aside class="col-md-4 d-none d-md-block">
          <p class="text-right text-secondary">店長推薦</p>
          <ul class="list-unstyled">
            <li v-for="item in recommend" :key="item.id" class="mb-3">
              <div class="card border-0 shadow-sm card--hover">
                <a
                  href="#"
                  @click.prevent="getProduct(item.id)"
                  class="text-decoration-none"
                >
                  <div
                    class="mask-toggle img img--mid"
                    :style="{ backgroundImage: `url(${item.imageUrl})` }"
                  >
                    <div class="mask h-100"></div>
                    <a
                      class="heart heart-regular h3 text-danger"
                      @click.prevent="changeStared($event, item.id, item.title)"
                      v-if="!stared.includes(item.id)"
                      ><i class="far fa-heart"></i
                    ></a>
                    <a
                      class="heart h3 text-danger"
                      :class="{ active: stared.includes(item.id) }"
                      @click.prevent="changeStared($event, item.id)"
                      ><i class="fas fa-heart"></i
                    ></a>
                  </div>
                  <div class="card-body">
                    <blockquote class="blockquote text-left mb-0">
                      <p class="mb-0 text-truncate">
                        {{ item.title
                        }}<i
                          class="fas fa-spinner fa-spin"
                          v-if="status.loadingItem === item.id"
                        ></i>
                      </p>

                      <footer class="blockquote-footer mb-0 text-right">
                        <cite title="Source Title">{{ item.category }}</cite>
                      </footer>
                    </blockquote>
                    <p class="h5 text-right mb-0">
                      NT{{ item.price | Currency }}
                    </p>
                  </div>
                </a>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {},
      cart: JSON.parse(localStorage.getItem('personalCart')) || {
        products: []
      },
      status: {
        loadingItem: false
      },
      isLoading: false,
      fullPage: true,
      stared: JSON.parse(localStorage.getItem('personalProduct')) || [],
      recommend: []
    }
  },
  methods: {
    getProduct (itemId) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${itemId}`
      vm.isLoading = true
      vm.$http.get(api).then(res => {
        vm.product = res.data.product
        vm.isLoading = false
        this.getRecommend()
      })
    },
    addToCart () {
      const vm = this
      const title = vm.product.title
      const msg = {
        title: `『${title}』已加入購物車`
      }
      vm.status.loadingItem = true
      if (vm.cart.products.findIndex(e => e.id === vm.product.id) === -1) {
        vm.cart.products.push(vm.product)
      } else {
        const qty = vm.product.num
        vm.cart.products[
          vm.cart.products.findIndex(e => e.id === vm.product.id)
        ].num += qty
      }
      vm.updateTotal()
      localStorage.setItem('personalCart', JSON.stringify(vm.cart))

      setTimeout(() => {
        vm.status.loadingItem = false
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
    changeStared () {
      const vm = this
      const id = vm.product.id
      const title = vm.product.title
      const msg = {
        title: `『${title}』已加入關注清單`,
        content: `謝謝您喜歡『${title}』！`,
        creat_at: Date.now(),
        href: `#/product_detail/${id}`
      }

      if (!vm.stared.includes(id)) {
        vm.stared.push(id)
        vm.$bus.$emit('message:dropdown', msg)
        vm.$bus.$emit('message:push', msg.title, 'success')
      } else {
        vm.stared.splice(
          vm.stared.findIndex(e => e === id),
          1
        )
      }

      localStorage.setItem('personalProduct', JSON.stringify(vm.stared))
    },
    getRecommend () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`

      vm.$http.get(api).then(res => {
        const allProducts = res.data.products.filter(e => e.is_enabled === 1)

        vm.recommend = allProducts.filter(
          e =>
            e.category === vm.product.category && e.title !== vm.product.title
        )
        if (vm.recommend.length > 3) {
          vm.recommend.splice(3)
        }
      })
    }
  },
  created () {
    const productId = this.$route.params.productId
    this.getProduct(productId)
  }
}
</script>
