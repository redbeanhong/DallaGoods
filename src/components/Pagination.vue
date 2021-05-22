<template>
  <div>
    <nav aria-label="Page navigation example" v-if="pagination.total_pages>1">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !pagination.has_pre }">
          <a
            class="page-link"
            href="#"
            @click.prevent="getProducts(pagination.current_page - 1)"
            ><i class="fas fa-angle-double-left"></i
          ></a>
        </li>
        <li
          class="page-item"
          :class="{ active: pagination.current_page === item }"
          v-for="item in pagination.total_pages"
          :key="item"
        >
          <a class="page-link" href="#" @click.prevent="getProducts(item)">{{
            item
          }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !pagination.has_next }">
          <a
            class="page-link"
            href="#"
            @click.prevent="getProducts(pagination.current_page + 1)"
            ><i class="fas fa-angle-double-right"></i
          ></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object
    }
  },
  data() {
    return {
      newPagination: this.pagination,
    };
  },
  methods:{
    getProducts(page){
      this.$emit('getpagination',page)
    }
  }
};
</script>
