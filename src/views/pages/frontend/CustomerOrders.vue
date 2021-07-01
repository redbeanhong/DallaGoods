<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="container" id="stared__none">
      <p class="h3 text-primary border border-primary rounded p-3 text-center">
        目前關注清單暫無內容，眾多商品歡迎選購！
        <router-link class="nav-link text-danger" to="/customer_orders/all"
          >點我來去逛逛<i class="far fa-hand-point-left"></i
          ><i class="far fa-hand-point-left"></i
          ><i class="far fa-hand-point-left"></i
        ></router-link>
      </p>
    </div>

    <!-- CARD -->
    <div class="row mt-4">
      <div class="col-md-3 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm card--hover">
          <a
            href="#"
            @click.prevent="getProduct(item.id)"
            class="text-decoration-none"
          >
            <div
              class="mask-toggle img img-mid"
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
                  {{ item.title }}
                </p>

                <footer class="blockquote-footer mb-0 text-right">
                  <cite title="Source Title">{{ item.category }}</cite>
                </footer>
              </blockquote>
              <div class="h5 text-right mt-2">
                NT{{ item.price | Currency }}
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <!-- END OF CARD -->

    <!-- PAGINATION -->
    <Pagination
      :pagination="pagination"
      v-on:getpagination="getProducts"
    ></Pagination>
    <!-- END OF PAGINATION -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      allProducts: [],
      products: [],
      isLoading: false,
      fullPage: true,
      pagination: {},
      stared: JSON.parse(localStorage.getItem('personalProduct')) || [],
      productType: '',
      productList: {
        all: 'all',
        key_ring: '包與鑰的事',
        earring: '耳朵上的事',
        tray: '桌上的好事',
        technology: '掌心的小事'
      }
    }
  },
  components: {
    Pagination
  },
  methods: {
    // 取得所有商品，並加入到頁面的商品清單
    getProducts (page = 1) {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`

      if (vm.productType === 'all') {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      }

      vm.isLoading = true
      vm.$http.get(api).then(res => {
        vm.allProducts = res.data.products.filter(e => {
          return e.is_enabled === 1
        })

        const staredArea = document.querySelector('#stared__none')
        staredArea.classList.remove('active')

        if (vm.productType === 'all') {
          vm.products = vm.allProducts
          vm.pagination = res.data.pagination
        } else if (vm.productList[vm.productType]) {
          vm.products = vm.allProducts.filter(e => {
            return e.category === vm.productList[vm.productType]
          })
          vm.pagination = {}
        } else if (vm.productType === 'stared') {
          if (vm.stared.length===0 || vm.stared === null) {
            staredArea.classList.add('active')
          } else {
            staredArea.classList.remove('active')
          }
          vm.products = vm.allProducts.filter(e => {
            return vm.stared.includes(e.id)
          })
          vm.pagination = {}
        }
        vm.isLoading = false
      })
    },
    getProduct (id) {
      this.$router.push({ path: `/product_detail/${id}` })
    },
    changeStared (e, id, title) {
      e.stopPropagation()
      const vm = this
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

      // 將關注資料存到localStorage
      localStorage.setItem('personalProduct', JSON.stringify(vm.stared))

      // 更新通知icon數量
      const count = vm.stared.length
      vm.$bus.$emit('iconCount:change', 'heart', count)

      vm.getProducts()
    }
  },
  created () {
    const vm = this
    vm.productType = vm.$route.params.productType
    if (vm.productList[vm.productType] || vm.productType === 'stared') {
      vm.getProducts()
    } else {
      vm.$router.push({ path: '/' })
    }
  },
  watch: {
    $route () {
      this.productType = this.$route.params.productType
      this.getProducts()
    }
  }
}
</script>

<style lang="scss" scoped>
.card--hover {
  &:hover {
    background-color: #fff1ef;
    .mask-toggle {
      .mask {
        display: flex;
      }

      .heart-regular {
        display: block;
      }
    }
  }

  .mask-toggle {
    position: relative;

    .mask {
      background-color: rgba(233, 233, 233, 0.2);
      display: none;
    }
    .heart {
      position: absolute;
      bottom: 15px;
      right: 20px;
      padding: 0;
      margin: 0;
      display: none;
    }

    .heart.active {
      position: absolute;
      bottom: 15px;
      right: 20px;
      padding: 0;
      margin: 0;
      display: block;
    }
  }
}
#stared__none {
  display: none;
  &.active {
    display: block;
  }
}
</style>
