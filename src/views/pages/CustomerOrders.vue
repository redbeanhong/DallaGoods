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
              style="height: 250px; background-size: cover; background-position: center"
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
            ></div>
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

    <!-- MODEL PRODUCT INFO -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ product.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="" />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">
                {{ product.origin_price }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.origin_price }} 元</del
              >
              <div class="h4" v-if="product.price">
                現在只要 {{ product.price }} 元
              </div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(product.id, product.num)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="product.id === status.loadingItem"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- END OF MODEL PRODUCT INFO -->
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
      product: {}, //單一商品細節暫存
      carts: {}, //購物車內容
      isLoading: false, //讀取中的效果控制
      fullPage: true,
      status: {
        loadingItem: "",
        fileUploading: ""
      },
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      pagination: {},
      value: "",
      productType: ""
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

        switch (vm.productType) {
          case "all":
            vm.products = vm.allProducts;
            break;

          case "key_ring":
            console.log("鑰匙圈");
            vm.products = vm.allProducts.filter(e => {
              return e.category === "包與鑰的事";
            });
            break;

          case "earring":
            console.log("耳環");
            vm.products = vm.allProducts.filter(e => {
              return e.category === "耳朵上的事";
            });
            break;

          case "tray":
            console.log("盤子");
            vm.products = vm.allProducts.filter(e => {
              return e.category === "桌上的好事";
            });
            break;

          case "technology":
            console.log("手機架");
            vm.products = vm.allProducts.filter(e => {
              return e.category === "掌心的小事";
            });
            break;

          default:
            vm.products = vm.allProducts;
            break;
        }
        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      });
    },
    // 取得單一商品細節
    getProduct(itemId) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${itemId}`;
      vm.status.loadingItem = itemId;
      this.$http.get(api).then(res => {
        // console.log(res);
        vm.product = res.data.product;
        $("#productModal").modal("show");
        vm.status.loadingItem = "";
      });
    },
    addToCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      let cart = {
        product_id: id,
        qty
      };
      vm.status.fileUploading = id;
      this.$http.post(api, { data: cart }).then(res => {
        // console.log(res);
        this.getCart();
        $("#productModal").modal("hide");
        vm.status.fileUploading = "";
      });
    },
    getCart() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      this.$http.get(api).then(res => {
        // console.log(res);
        vm.carts = res.data.data;
      });
    },
    removeCartItem(itemId) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${itemId}`;
      this.status.loadingItem = itemId;
      this.$http.delete(api).then(res => {
        // console.log(res);
        this.getCart();
        setTimeout(() => {
          vm.status.loadingItem = "";
        }, 300);
      });
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
    submitForm() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      this.$http.post(api, { data: this.form }).then(res => {
        // console.log(res);
        if (res.data.success) {
          vm.$router.push({ path: `customer_checkout/${res.data.orderId}` });
        }
      });
    }
  },
  created() {
    this.productType = this.$route.params.productType;
    console.log(this.productType);
    this.getProducts();
    this.getCart();
  },
  watch: {
    $route() {
      this.productType = this.$route.params.productType;
      console.log(this.productType);
      this.getProducts();
    }
  }
};
</script>
