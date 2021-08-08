<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <ValidationObserver v-slot="{ invalid }">
      <div class="container">
        <ShoppingStep class="mb-5"></ShoppingStep>

        <!-- TABLE -->
        <div class="my-5 row justify-content-center">
          <div class="col-md-6">
            <table class="table">
              <thead>
                <th>品名</th>
                <th>數量</th>
                <th class="text-right">單價</th>
              </thead>
              <tbody>
                <tr v-for="item in carts.carts" :key="item.id">
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td class="align-middle">
                    {{ item.qty }}/{{ item.product.unit }}
                  </td>
                  <td class="align-middle text-right">
                    <s
                      class="text-danger"
                      v-if="item.final_total !== item.total"
                      >{{ item.total | Currency }}</s
                    >
                    {{ item.final_total | Currency }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="text-right">總計</td>
                  <td class="text-right">
                    {{ carts.total | Currency }}
                    <small
                      v-if="carts.final_total !== carts.total"
                      class="text-danger"
                      >-{{ carts.total - carts.final_total }}</small
                    >
                  </td>
                </tr>
                <tr
                  v-if="carts.final_total !== carts.total"
                  class="text-success"
                >
                  <td colspan="2" class="text-right">折扣價</td>
                  <td class="text-right">{{ carts.final_total | Currency }}</td>
                </tr>
              </tfoot>
            </table>
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
        </div>
        <!-- END OF TABLE -->

        <!-- FORM -->
        <div class="my-5 row justify-content-center">
          <form class="col-md-6" @submit.prevent="submitForm">
            <p class="text-danger text-right">標示 * 的項目請務必填入</p>
            <ValidationProvider
              rules="required|email"
              v-slot="{ errors, classes }"
            >
              <div class="form-group">
                <label for="useremail"
                  ><small class="text-danger h6">*</small> Email</label
                >
                <input
                  type="email"
                  class="form-control"
                  id="useremail"
                  v-model="form.user.email"
                  placeholder="請輸入 Email"
                  :class="classes"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider rules="required" v-slot="{ errors, classes }">
              <div class="form-group">
                <label for="username"
                  ><small class="text-danger h6">*</small> 收件人姓名</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="form.user.name"
                  placeholder="輸入姓名"
                  :class="classes"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider rules="required" v-slot="{ errors, classes }">
              <div class="form-group">
                <label for="usertel"
                  ><small class="text-danger h6">*</small> 收件人電話</label
                >
                <input
                  type="tel"
                  class="form-control"
                  id="usertel"
                  v-model="form.user.tel"
                  placeholder="請輸入電話"
                  :class="classes"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider rules="required" v-slot="{ errors, classes }">
              <div class="form-group">
                <label for="useraddress"
                  ><small class="text-danger h6">*</small> 收件人地址</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="useraddress"
                  v-model="form.user.address"
                  placeholder="請輸入地址"
                  :class="classes"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <div class="form-group">
              <label for="comment">留言</label>
              <textarea
                id="comment"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="text-right">
              <button
                type="submit"
                class="btn btn-danger"
                :disabled="invalid"
                :class="{ 'input--disabled': invalid }"
              >
                送出表單
              </button>
            </div>
          </form>
        </div>
        <!-- END OF FORM -->
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import ShoppingStep from '@/components/ShoppingStep.vue'

export default {
  data () {
    return {
      carts: {}, // 購物車內容
      isLoading: false,
      fullPage: true,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      coupon_code: '',
      couponClass: ''
    }
  },
  components: {
    ShoppingStep
  },
  methods: {
    getCart () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$http.get(api).then(res => (vm.carts = res.data.data))
    },
    addCouponCode () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.isLoading = true
      vm.$http.post(api, { data: coupon }).then(res => {
        if (res.data.success) {
          vm.coupon_code = `已使用優惠券${vm.coupon_code}`
          vm.couponClass = 'is-valid'
          vm.getCart()
        } else {
          vm.$bus.$emit('message:push', res.data.message)
          vm.couponClass = 'is-invalid'
        }
        vm.isLoading = false
      })
    },
    submitForm () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      vm.$http.post(api, { data: vm.form }).then(res => {
        if (res.data.success) {
          vm.$router.push({ path: `customer_checkout/${res.data.orderId}` })
        }
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
