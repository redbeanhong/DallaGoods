<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="text-right">
      <button
        type="button"
        class="btn btn-primary mt-4"
        @click="openModal('productModal', true)"
      >
        建立新的產品
      </button>
    </div>

    <table class="table mt-4">
      <thead>
        <td class="th--mid">分類</td>
        <td>產品名稱</td>
        <td class="th--sm">原價</td>
        <td class="th--sm">售價</td>
        <td class="th--sm">是否啟用</td>
        <td class="th--sm">編輯</td>
        <td class="th--sm">刪除</td>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | Currency }}</td>
          <td class="text-right">{{ item.price | Currency }}</td>
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
              @click="openModal('delProductModal', false, item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination
      :pagination="pagination"
      v-on:getpagination="getProducts"
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
            <form>
              <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                  <span>新增產品</span>
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
                  <div class="col-sm-4">
                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors, classes }"
                    >
                      <div class="form-group">
                        <label for="image">輸入圖片網址</label>
                        <input
                          type="text"
                          class="form-control"
                          id="image"
                          placeholder="請輸入圖片連結"
                          v-model="tempProduct.imageUrl"
                          :class="classes"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>

                    <div class="form-group">
                      <label for="customFile"
                        >或 上傳圖片
                        <i
                          class="fas fa-spinner fa-spin"
                          v-if="status.fileUploading"
                        ></i>
                      </label>
                      <input
                        type="file"
                        id="customFile"
                        class="form-control"
                        ref="files"
                        @change="uploadFile()"
                      />
                    </div>

                    <img
                      v-if="tempProduct.imageUrl"
                      :src="tempProduct.imageUrl"
                      class="img-fluid"
                      alt="productImg"
                    />
                  </div>

                  <div class="col-sm-8">
                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors, classes }"
                    >
                      <div class="form-group">
                        <label for="title">標題</label>
                        <input
                          v-model="tempProduct.title"
                          type="text"
                          class="form-control"
                          id="title"
                          placeholder="請輸入標題"
                          :class="classes"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>

                    <div class="form-row">
                      <ValidationProvider
                        class=" col-md-6"
                        rules="required"
                        v-slot="{ errors, classes }"
                      >
                        <div class="form-group">
                          <label for="category">分類</label>
                          <select
                            v-model="tempProduct.category"
                            type="text"
                            class="form-control"
                            id="category"
                            placeholder="請輸入分類"
                            :class="classes"
                          >
                            <option disabled value="">--請選擇--</option>
                            <option
                              :value="item"
                              v-for="(item, index) in productList"
                              :key="index"
                              >{{ item }}</option
                            >
                          </select>
                          <span class="text-danger">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>

                      <ValidationProvider
                        rules="required"
                        class="col-md-6"
                        v-slot="{ errors, classes }"
                      >
                        <div class="form-group">
                          <label for="price">單位</label>
                          <input
                            v-model="tempProduct.unit"
                            type="unit"
                            class="form-control"
                            id="unit"
                            placeholder="請輸入單位"
                            :class="classes"
                          />
                          <span class="text-danger">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>

                    <div class="form-row">
                      <ValidationProvider
                        rules="required|integer"
                        class="col-md-6"
                        v-slot="{ errors, classes }"
                      >
                        <div class="form-group">
                          <label for="origin_price">原價</label>
                          <input
                            v-model="tempProduct.origin_price"
                            type="number"
                            class="form-control"
                            id="origin_price"
                            placeholder="請輸入原價"
                            :class="classes"
                          />
                          <span class="text-danger">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>

                      <ValidationProvider
                        rules="required|integer"
                        class="col-md-6"
                        v-slot="{ errors, classes }"
                      >
                        <div class="form-group">
                          <label for="price">售價</label>
                          <input
                            v-model="tempProduct.price"
                            type="number"
                            class="form-control"
                            id="price"
                            placeholder="請輸入售價"
                            :class="classes"
                          />
                          <span class="text-danger">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>

                    <hr />

                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors, classes }"
                    >
                      <div class="form-group">
                        <label for="description">產品描述</label>
                        <textarea
                          v-model="tempProduct.description"
                          type="text"
                          class="form-control"
                          id="description"
                          placeholder="請輸入產品描述"
                          :class="classes"
                        ></textarea>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>

                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors, classes }"
                    >
                      <div class="form-group">
                        <label for="content">說明內容</label>
                        <textarea
                          v-model="tempProduct.content"
                          type="text"
                          class="form-control"
                          id="content"
                          placeholder="請輸入產品說明內容"
                          :class="classes"
                        ></textarea>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>

                    <div class="form-group">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="is_enabled"
                          v-model="tempProduct.is_enabled"
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
                  type="button"
                  class="btn btn-primary"
                  @click="updateProduct"
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
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
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
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="closeModal('delProductModal')"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteProduct()"
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
      products: [],
      tempProduct: {},
      isNew: true,
      isLoading: false,
      status: {
        fileUploading: false
      },
      pagination: {},
      productList: ['包與鑰的事', '耳朵上的事', '桌上的好事', '掌心的小事']
    }
  },
  components: {
    Pagination
  },
  methods: {
    openModal (modalName, isNew, item) {
      $(`#${modalName}`).modal('show')
      if (isNew) {
        this.tempProduct = { category: '', num: 1 }
        this.isNew = true
      } else {
        this.tempProduct = { ...item }
        this.isNew = false
        this.tempProduct.num = 1
      }
    },
    closeModal (modalName) {
      $(`#${modalName}`).modal('hide')
    },
    getProducts (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then(res => {
        vm.products = res.data.products
        vm.pagination = res.data.pagination
        vm.isLoading = false
      })
    },
    deleteProduct () {
      const vm = this
      const itemId = vm.tempProduct.id
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${itemId}`
      vm.$http.delete(api).then(res => {
        if (res.data.success) {
          vm.closeModal('delProductModal')
          vm.getProducts()
        } else {
          vm.$bus.$emit('message:push', res.data.message)
        }
      })
    },
    updateProduct () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let httpMethod = 'post'

      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put'
      }

      vm.$http[httpMethod](api, { data: vm.tempProduct }).then(res => {
        if (res.data.success) {
          vm.closeModal('productModal')
          vm.getProducts()
          vm.tempProduct = {}
        } else {
          vm.$bus.$emit('message:push', res.data.message)
        }
      })
    },
    uploadFile () {
      const vm = this
      const uploaedFile = vm.$refs.files.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploaedFile)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`

      vm.status.fileUploading = true
      vm.$http
        .post(api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          vm.status.fileUploading = false
          if (res.data.success) {
            vm.$set(vm.tempProduct, 'imageUrl', res.data.imageUrl)
          } else {
            vm.$bus.$emit('message:push', res.data.message)
          }
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
