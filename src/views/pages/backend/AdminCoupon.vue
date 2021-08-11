<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="text-right">
      <button
        type="button"
        class="btn btn-primary mt-4"
        @click="openModal('productModal', true)"
      >
        建立新的優惠券
      </button>
    </div>

    <table class="table mt-4">
      <thead>
        <td>名稱</td>
        <td>折扣百分比</td>
        <td class="th--mid">到期日</td>
        <td class="th--sm">是否啟用</td>
        <td class="th--sm">編輯</td>
        <td class="th--sm">刪除</td>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_data }}</td>
          <td>
            <span v-if="item.is_enabled == 1" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openModal('productModal', false, item)"
            >
              編輯
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openModal('delCouponModal', false, item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination
      :pagination="pagination"
      v-on:getpagination="getCoupons"
    ></Pagination>

    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="updateCoupon">
              <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                  <span>建立新的優惠券</span>
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
                <div class="row">
                  <div class="col-sm-12">
                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors, classes }"
                    >
                      <div class="form-group">
                        <label for="title">標題</label>
                        <input
                          v-model="tempCoupon.title"
                          type="text"
                          class="form-control"
                          id="title"
                          placeholder="請輸入標題"
                          :class="classes"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div></ValidationProvider
                    >

                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors, classes }"
                    >
                      <div class="form-group">
                        <label for="category">優惠碼</label>
                        <input
                          v-model="tempCoupon.code"
                          type="text"
                          class="form-control"
                          id="category"
                          placeholder="請輸入優惠碼"
                          :class="classes"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div></ValidationProvider
                    >

                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors, classes }"
                    >
                      <div class="form-group">
                        <label for="date">到期日</label>
                        <input
                          v-model="tempCoupon.due_data"
                          type="date"
                          class="form-control"
                          id="date"
                          placeholder="請輸入到期日"
                          :class="classes"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div></ValidationProvider
                    >

                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors, classes }"
                    >
                      <div class="form-group">
                        <label for="price">折扣百分比</label>
                        <input
                          v-model="tempCoupon.percent"
                          type="unit"
                          class="form-control"
                          id="unit"
                          placeholder="請輸入折扣百分比"
                          :class="classes"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div></ValidationProvider
                    >

                    <div class="form-group">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="is_enabled"
                          v-model="tempCoupon.is_enabled"
                          :true-value="1"
                          :false-value="0"
                        />
                        <label class="form-check-label" for="is_enabled">
                          是否啟用
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="closeModal('productModal')"
                >
                  取消
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="invalid"
                >
                  確認
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
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
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong>
            優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="closeModal('delCouponModal')"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteCoupon()"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: true,
      isLoading: false,
      status: {
        fileUploading: false
      },
      pagination: {}
    }
  },
  components: {
    Pagination
  },
  methods: {
    openModal (modalName, isNew, item) {
      $(`#${modalName}`).modal('show')
      if (isNew) {
        this.tempCoupon = {}
        this.isNew = true
      } else {
        this.tempCoupon = { ...item }
        this.isNew = false
      }
    },
    closeModal (modalName) {
      $(`#${modalName}`).modal('hide')
    },
    getCoupons (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then(res => {
        vm.coupons = res.data.coupons
        vm.pagination = res.data.pagination
        vm.isLoading = false
      })
    },
    deleteCoupon () {
      const vm = this
      const itemId = vm.tempCoupon.id
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${itemId}`
      vm.$http.delete(api).then(res => {
        if (res.data.success) {
          vm.closeModal('delCouponModal')
          vm.getCoupons()
        } else {
          vm.$bus.$emit('message:push', res.data.message)
        }
      })
    },
    updateCoupon () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      let httpMethod = 'post'

      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'put'
      }

      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then(res => {
        if (res.data.success) {
          vm.closeModal('productModal')
          vm.getCoupons()
        } else {
          vm.$bus.$emit('message:push', res.data.message)
        }
      })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
