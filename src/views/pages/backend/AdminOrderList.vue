<template>
  <div>
    <!-- LOADING -->
    <loading :active.sync="isLoading"></loading>
    <!-- END OF LOADING -->

    <!-- TABLE -->
    <table class="table mt-4">
      <thead>
        <td width="120">購買時間</td>
        <td>Email</td>
        <td width="300">購買款項</td>
        <td width="120">應付金額</td>
        <td width="100">是否付款</td>
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
    <!-- END OF TABLE -->

    <!-- PAGINATION -->
    <Pagination
      :pagination="pagination"
      v-on:getpagination="getOrderList"
    ></Pagination>
    <!-- END OF PAGINATION -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      orders: [], // 呈現在頁面的所有商品清單
      isNew: true, // 是否為新增商品
      isLoading: false, // 讀取中的效果控制
      fullPage: true,
      pagination: {} // 多頁清單控制
    }
  },
  components: {
    Pagination
  },
  methods: {
    // 取得所有商品，並加入到頁面的商品清單
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
