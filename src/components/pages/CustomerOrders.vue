<template>
  <div>
    <!-- LOADING -->
    <loading :active.sync="isLoading"></loading>
    <!-- END OF LOADING -->

    <!-- GET CART -->
    <div class="text-right">
      <button class="btn btn-danger mt-4">
        查看購物車
      </button>
    </div>
    <!-- END OF ADD GET CART -->

    <!-- CARD -->
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{
              item.category
            }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <del class="h6">原價{{ item.origin_price | Currency }} 元</del>
              <div class="h5">現在只要 {{ item.price | Currency }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"
              ></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.fileUploading === item.id"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- END OF CARD -->

    <!-- PAGINATION -->
    <pagination
      :pagination="pagination"
      v-on:getpagination="getProducts"
    ></pagination>
    <!-- END OF PAGINATION -->

    <div class="row justify-content-center">
      <div class="col-md-6">
        <!-- CARTS -->
        <cart
          :carts="carts"
          :status="status"
          v-on:removeCartItem="removeCartItem"
        ></cart>
        <!-- END OF CART -->

        <!-- COUPON -->
        <div class="input-group mb-3 input-group-sm">
          <input
            type="text"
            class="form-control"
            placeholder="請輸入優惠碼"
            v-model="coupon_code"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="addCouponCode"
            >
              套用優惠碼
            </button>
          </div>
        </div>
        <!-- END OF COUPON -->
      </div>
    </div>

    <!-- FORM -->
    <validation-observer v-slot="{ invalid }">
      <div class="my-5 row justify-content-center">
        <form class="col-md-6" @submit.prevent="submitForm">
          <validation-provider
            rules="required|email"
            v-slot="{ errors, classes }"
          >
            <div class="form-group">
              <label for="useremail">Email</label>
              <input
                type="email"
                class="form-control"
                name="Email"
                id="useremail"
                v-model="form.user.email"
                placeholder="請輸入 Email"
                :class="classes"
              />
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors, classes }">
            <div class="form-group">
              <label for="username">收件人姓名</label>
              <input
                type="text"
                class="form-control"
                name="姓名"
                id="username"
                v-model="form.user.name"
                placeholder="輸入姓名"
                :class="classes"
              />
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors, classes }">
            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <input
                name="收件人電話"
                type="tel"
                class="form-control"
                id="usertel"
                v-model="form.user.tel"
                placeholder="請輸入電話"
                :class="classes"
              />
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors, classes }">
            <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <input
                type="text"
                class="form-control"
                name="收件人地址"
                id="useraddress"
                v-model="form.user.address"
                placeholder="請輸入地址"
                :class="classes"
              />
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </validation-provider>
          <div class="form-group">
            <label for="comment">留言</label>
            <textarea
              name="留言"
              id="comment"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-right">
            <button type="submit" class="btn btn-danger" :disabled="invalid">
              送出表單
            </button>
          </div>
        </form>
      </div>
    </validation-observer>

    <!-- END OF FORM -->

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
import Cart from "./Cart.vue";
import Pagination from "./Pagination.vue";

export default {
  data() {
    return {
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
      value: ""
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
        vm.products = res.data.products;
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
    submitForm(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      this.$http.post(api, { data: this.form }).then(res => {
        // console.log(res);
        if (res.data.success) {
          vm.$router.push({ path: `customer_checkout/${res.data.orderId}`})
        }
      });
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>
