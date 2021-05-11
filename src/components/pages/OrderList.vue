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
          <td>{{ item.create_at}}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul
              class="list-unstyled"
              v-for="product in item.products"
              :key="product.id"
            >
              <li>{{ product.id }}：{{ product.qty }}個</li>
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
    <pagination
      :pagination="pagination"
      v-on:getpagination="getOrderList"
    ></pagination>
    <!-- END OF PAGINATION -->
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "./Pagination.vue";

export default {
  data() {
    return {
      orders: [], //呈現在頁面的所有商品清單
      tempProduct: {}, //暫存新增或修改的商品
      isNew: true, //是否為新增商品
      isLoading: false, //讀取中的效果控制
      fullPage: true,
      pagination: {} //多頁清單控制
    };
  },
  components: {
    Pagination
  },
  methods: {
    // 取得所有商品，並加入到頁面的商品清單
    getOrderList(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then(res => {
        let fakeData = {
          success: true,
          orders: [
            {
              create_at: 1523539834,
              id: "-L9u2EUkQSoEmW7QzGLF",
              is_paid: true,
              message: "這是留言",
              paid_date: 1523539924,
              payment_method: "credit_card",
              products: {
                L8nBrq8Ym4ARI1Kog4t: {
                  id: "L8nBrq8Ym4ARI1Kog4t",
                  product_id: "-L8moRfPlDZZ2e-1ritQ",
                  qty: "3"
                }
              },
              total: 100,
              user: {
                address: "kaohsiung",
                email: "test@gmail.com",
                name: "test",
                tel: "0912346768"
              },
              num: 1
            },
            {
              create_at: 1523539519,
              id: "-L9u11NAE0m0SpSBUDIq",
              is_paid: false,
              message: "這是留言",
              payment_method: "credit_card",
              products: {
                L8nBrq8Ym4ARI1Kog4t: {
                  id: "L8nBrq8Ym4ARI1Kog4t",
                  product_id: "-L8moRfPlDZZ2e-1ritQ",
                  qty: "3"
                }
              },
              user: {
                address: "kaohsiung",
                email: "test2@gmail.com",
                name: "test",
                tel: "0912346768"
              },
              num: 2
            }
          ],
          pagination: {
            total_pages: 1,
            current_page: 1,
            has_pre: false,
            has_next: false,
            category: null
          },
          messages: []
        };
        console.log(res);
        vm.orders = fakeData.orders;
        vm.pagination = fakeData.pagination;
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.getOrderList();
  }
};
</script>
