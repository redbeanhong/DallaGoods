<template>
  <div>
    <!-- LOADING -->
    <loading :active.sync="isLoading"></loading>
    <!-- END OF LOADING -->

    <!-- FORM -->
    <validation-observer v-slot="{ invalid }">
      <div class="container">
        <shoppingStep class="mb-4"></shoppingStep>
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
      </div>
    </validation-observer>
    <!-- END OF FORM -->
  </div>
</template>

<script>
import Cart from "../../components/Cart.vue";
import ShoppingStep from "../../components/ShoppingStep.vue";

export default {
  data() {
    return {
      products: [], //呈現在頁面的所有商品清單
      product: {}, //單一商品細節暫存
      carts: {}, //購物車內容
      isLoading: false, //讀取中的效果控制
      fullPage: true,
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      value: ""
    };
  },
  components: {
    Cart,
    ShoppingStep
  },
  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      this.$http.get(api).then(res => {
        // console.log(res);
        vm.carts = res.data.data;
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
    this.getCart();
  }
};
</script>
