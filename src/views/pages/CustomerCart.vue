<template>
  <div>
    <!-- LOADING -->
    <loading :active.sync="isLoading"></loading>
    <!-- END OF LOADING -->

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10 col-12">
          <shoppingStep class="mb-4"></shoppingStep>
          
          <section class="row mb-4" v-for="item in carts.carts" :key="item.id">
            <div class="col-md-4">
              <div
                class="h-100"
                style="background-size: cover; background-position: center;"
                :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
              ></div>
            </div>
            <div class="col-md-8">
              <div class="content border p-3 mb-3">
                <button
                  type="button"
                  class="close"
                  @click.prevent="removeCartItem(item.id)"
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
              <div
                class="d-flex justify-content-between align-items-center border p-3"
              >
                <div class="qt-group">
                  <button
                    :disabled="item.qty === 1 || isLoading"
                    class="btn btn-outline-primary"
                    @click.prevent="
                      changeCart(item.product_id, item.qty - 1, item.id)
                    "
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                  <span class="mx-5">{{ item.qty }}</span>
                  <button
                    class="btn btn-outline-primary"
                    :disabled="isLoading"
                    @click.prevent="
                      changeCart(item.product_id, item.qty + 1, item.id)
                    "
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>

                <div class="price-group d-flex">
                  <p class="px-5 py-2 m-0">
                    NT{{ item.product.price | Currency }}
                  </p>
                  <p class="bg-primary px-5 py-2 m-0 text-light">
                    NT{{ (item.product.price * item.qty) | Currency }}
                  </p>
                </div>
              </div>
            </div>
          </section>
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
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-primary"
                    type="button"
                    id="button-addon2"
                    @click.prevent="addCouponCode"
                  >
                    使用優惠券
                  </button>
                </div>
              </div>
            </div>
          </section>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";
import ShoppingStep from "../../components/ShoppingStep.vue";

export default {
  data() {
    return {
      isLoading: false, //讀取中的效果控制
      fullPage: true,
      carts: {}, //呈現在頁面的所有商品清單
      status: {
        loadingItem: ""
      },
      coupon_code: ""
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(api).then(res => {
        // console.log(res);
        vm.carts = res.data.data;
        vm.carts.carts.sort(function(a, b) {
          return a.product.title.localeCompare(b.product.title);
        });
        vm.isLoading = false;
      });
    },
    changeCart(productID, qty, itemID) {
      this.isLoading = true;
      this.removeCartItem(itemID);
      setTimeout(() => {
        this.addToCart(productID, qty);
      }, 300);
    },
    addToCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      let cart = {
        product_id: id,
        qty
      };
      this.$http.post(api, { data: cart }).then(res => {
        // console.log(res);
        this.getCart();
      });
    },
    removeCartItem(itemId) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${itemId}`;
      // this.status.loadingItem = itemId;
      this.$http.delete(api).then(res => {
        // console.log(res);
        this.getCart();
        setTimeout(() => {
          // vm.status.loadingItem = "";
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
        vm.coupon_code = `已使用優惠券${vm.coupon_code}`;
        this.getCart();
      });
    }
  },components:{
    ShoppingStep,
  },
  created() {
    this.getCart();
  }
};
</script>
