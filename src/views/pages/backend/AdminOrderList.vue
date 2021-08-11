<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <table class="table mt-4">
      <thead>
        <td class="th--sm">購買時間</td>
        <td class="th--mid">Email</td>
        <td>購買項目</td>
        <td class="th--sm">應付金額</td>
        <td class="th--sm">是否付款</td>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ item.create_at | TimeChange }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul
              class="list-unstyled"
              v-for="product in item.products"
              :key="product.id"
            >
              <li>{{ product.product.title }}：{{ product.qty }}個</li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | Currency }}</td>
          <td>
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else>尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination
      :pagination="pagination"
      v-on:getpagination="getOrderList"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      orders: [],
      isNew: true,
      isLoading: false,
      pagination: {}
    }
  },
  components: {
    Pagination
  },
  methods: {
    getOrderList (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then(res => {
        vm.orders = res.data.orders
        vm.pagination = res.data.pagination
        vm.isLoading = false
      })
    }
  },
  created () {
    this.getOrderList()
  }
}
</script>
