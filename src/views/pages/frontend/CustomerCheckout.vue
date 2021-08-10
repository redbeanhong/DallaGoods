<template>
  <div>
    <div class="container">
      <ShoppingStep class="mb-5"></ShoppingStep>
      <div class="my-5 row justify-content-center">
        <div class="col-md-6">
          <table class="table">
            <thead>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">
                  {{ item.qty }}/{{ item.product.unit }}
                </td>
                <td class="align-middle text-right">{{ item.final_total }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">總計</td>
                <td class="text-right">{{ order.total }}</td>
              </tr>
            </tfoot>
          </table>

          <table class="table">
            <tbody>
              <tr>
                <th width="100">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span>尚未付款</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right">
            <button class="btn btn-danger" type="button" @click="payOrder">
              確認付款去
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShoppingStep from '@/components/ShoppingStep.vue'
export default {
  data () {
    return {
      order: {
        user: {}
      }
    }
  },
  methods: {
    getOrder () {
      const vm = this
      const orderId = vm.$route.params.orderId
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${orderId}`
      vm.$http.get(api).then(res => {
        if (res.data.order) {
          vm.order = res.data.order
        } else {
          vm.$router.push({ path: '/' })
        }
      })
    },
    cleanCart () {
      localStorage.removeItem('personalCart')
    },
    payOrder () {
      const vm = this
      const orderId = vm.$route.params.orderId
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${orderId}`
      vm.$http.post(api).then(res => {
        if (res.data.success) {
          vm.cleanCart()
          vm.$bus.$emit('carts:Update')
          vm.$router.push({ path: '/customer_finished' })
        }
      })
    }
  },
  components: {
    ShoppingStep
  },
  created () {
    this.getOrder()
  }
}
</script>
