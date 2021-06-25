<template>
  <div>
    <!-- LOADING -->
    <loading :active.sync="isLoading"></loading>
    <!-- END OF LOADING -->

    <!-- CARD -->
    <div class="row mt-4">
      <div class="col-md-3 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <a href="#" @click.prevent="getProduct(item.id)">
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
          </a>

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
            <div class="h5 text-right mt-2">NT{{ item.price | Currency }}</div>
          </div>
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
      products: [], // 呈現在頁面的所有商品清單
      isLoading: false, // 讀取中的效果控制
      fullPage: true, // 讀取中的效果全畫面
      status: {
        // 讀取中的物件
        loadingItem: '',
        fileUploading: ''
      },
      pagination: {}, // 分頁控制
      stared: JSON.parse(localStorage.getItem('personalProduct')) || [],
      productType: '', // 頁面商品種類
      productList: {
        // 所有商品種類
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

        if (vm.productType === 'all') {
          vm.products = vm.allProducts
          vm.pagination = res.data.pagination
        } else if (vm.productList[vm.productType]) {
          vm.products = vm.allProducts.filter(e => {
            return e.category === vm.productList[vm.productType]
          })
          vm.pagination = {}
        } else if (vm.productType === 'stared') {
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
        // 如果此商品尚未在關注清單，就push商品名稱進入清單
        vm.stared.push(id)
        // 並傳入通知訊息
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

      // 更新通知icon數量
      const count = vm.stared.length
      vm.$bus.$emit('iconCount:change', 'heart', count)

      vm.getProducts()
    }
  },
  created () {
    const vm = this
    vm.productType = vm.$route.params.productType
    if (vm.productList[vm.productType]) {
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

<style lang="scss">
.mask-toggle {
  position: relative;
  &:hover {
    .mask {
      display: flex;
    }

    .heart-regular {
      display: block;
    }
  }
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
</style>
