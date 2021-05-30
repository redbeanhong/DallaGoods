<template>
  <div>
    <!-- LOADING -->
    <loading :active.sync="isLoading"></loading>
    <!-- END OF LOADING -->

    <!-- PAGINATION -->
    <pagination
      :pagination="pagination"
      v-on:getpagination="getProducts"
    ></pagination>
    <!-- END OF PAGINATION -->

    <!-- CARD -->
    <div class="row mt-4">
      <div class="col-md-3 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <a href="#" @click.prevent="getProduct(item.id)">
            <div
              class="mask-toggle"
              style="height: 250px; background-size: cover; background-position: center"
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
            >
              <div class="mask h-100"></div>
              <a class="heart heart-regular h3" @click.prevent="changeStared($event, item.id)" v-if="!stared.includes(item.id)"
                ><i class="far fa-heart"></i
              ></a>
              <a class="heart h3" 
              :class="{'active':stared.includes(item.id)}"
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
  </div>
</template>

<script>
import $ from "jquery";
import Cart from "../../components/Cart.vue";
import Pagination from "../../components/Pagination.vue";

export default {
  data() {
    return {
      allProducts: [],
      products: [], //呈現在頁面的所有商品清單
      isLoading: false, //讀取中的效果控制
      fullPage: true, //讀取中的效果全畫面
      status: {
        //讀取中的物件
        loadingItem: "",
        fileUploading: ""
      },
      pagination: {}, //分頁控制
      stared: JSON.parse(localStorage.getItem("personalProduct")) || [],
      productType: "", //頁面商品種類
      productList: {
        //所有商品種類
        key_ring: "包與鑰的事",
        earring: "耳朵上的事",
        tray: "桌上的好事",
        technology: "掌心的小事"
      }
    };
  },
  components: {
    Pagination,
    Cart
  },
  methods: {
    // 取得所有商品，並加入到頁面的商品清單
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then(res => {
        // console.log(res);
        vm.allProducts = res.data.products.filter(e => {
          return e.is_enabled === 1;
        });

        if (vm.productList[vm.productType]) {
          vm.products = vm.allProducts.filter(e => {
            return e.category === vm.productList[vm.productType];
          });
        } else if (vm.productType === "stared") {
          vm.products = vm.allProducts.filter(e => {
            return vm.stared.includes(e.id);
          });
        } else {
          vm.products = vm.allProducts;
        }

        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      this.$router.push({ path: `/product_detail/${id}` });
    },
    addCouponCode() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      let coupon = {
        code: vm.coupon_code
      };
      this.$http.post(api, { data: coupon }).then(res => {
        // console.log(res);
        this.getCart();
      });
    },
    changeStared(e, id) {
      e.stopPropagation();
      let vm = this;
      if (!vm.stared.includes(id)) {
        // 如果此商品尚未在關注清單，就push商品名稱進入清單
        vm.stared.push(id);
      } else {
        // 如果此商品已經在關注清單，就將他從清單移除
        vm.stared.splice(
          vm.stared.findIndex(e => e === id),
          1
        );
      }

      // 將關注資料存到localStorage
      localStorage.setItem("personalProduct", JSON.stringify(vm.stared));
      vm.getProducts();
    }
  },
  created() {
    this.productType = this.$route.params.productType;
    this.getProducts();
  },
  watch: {
    $route() {
      this.productType = this.$route.params.productType;
      this.getProducts();
    }
  }
};
</script>

<style lang="scss">
.mask-toggle {
  position: relative;
  &:hover {
    .mask {
      display: flex;
    }

    .heart-regular{
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
