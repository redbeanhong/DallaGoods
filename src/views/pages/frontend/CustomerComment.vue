<template>
  <div>
    <div class="container">
      <div
        class="row mb-5 border-bottom border-primary p-3 justify-content-center"
        v-for="item in comments"
        :key="item.creatAt"
      >
        <div class="col-md-2">
          <div class="m-auto w-50 img img-small" :class="item.photoUrl"></div>
          <p class="text-primary text-center">{{ item.name }}</p>
          <div class="heart-group text-center">
            <i
              class="fas fa-heart text-danger mr-1"
              v-for="num in item.score"
              :key="num"
            ></i>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          {{ item.content }}
        </div>
        <div class="col-md-2 text-right">
          <div class="mb-2 img img-mid" :class="item.imageUrl"></div>
          {{ item.creatAt }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: [
        {
          name: '大黃貓',
          photoUrl: 'imagePhoto1',
          imageUrl: 'imageProduct1',
          creatAt: '2021-05-02',
          content: '包裝細心，品質良好！朕的項圈也是在這裡客製的，朕甚為心喜。',
          score: 5
        },
        {
          name: '蓬蓬狗',
          photoUrl: 'imagePhoto2',
          imageUrl: 'imageProduct2',
          creatAt: '2021-05-09',
          content: '第一次購買Dalla Goods的商品，非常喜歡呢～汪～！',
          score: 4
        },
        {
          name: '太陽犬',
          photoUrl: 'imagePhoto3',
          imageUrl: 'imageProduct3',
          creatAt: '2021-04-09',
          content: '汪汪！！Dalla Goods的商品讚讚讚！！媽咪也讚不絕口哦！！',
          score: 5
        },
        {
          name: '看啥喵',
          photoUrl: 'imagePhoto4',
          imageUrl: 'imageProduct4',
          creatAt: '2021-05-20',
          content:
            '聽說全手工製作很用心，朕買來看看，覺得不錯，來人啊！賞罐罐。',
          score: 5
        },
        {
          name: '車底貓',
          photoUrl: 'imagePhoto5',
          imageUrl: 'imageProduct5',
          creatAt: '2021-05-10',
          content: '作品質量很好，朕喜歡。',
          score: 5
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.imagePhoto1 {
  background-image: url('../../../assets/img/photo1.jpg');
}
.imagePhoto2 {
  background-image: url('../../../assets/img/photo2.jpg');
}
.imagePhoto3 {
  background-image: url('../../../assets/img/photo3.jpg');
}
.imagePhoto4 {
  background-image: url('../../../assets/img/photo4.jpg');
}
.imagePhoto5 {
  background-image: url('../../../assets/img/photo5.jpg');
}

.imageProduct1 {
  background-image: url('../../../assets/img/product1.png');
}
.imageProduct2 {
  background-image: url('../../../assets/img/product2.png');
}
.imageProduct3 {
  background-image: url('../../../assets/img/product3.png');
}
.imageProduct4 {
  background-image: url('../../../assets/img/product4.png');
}
.imageProduct5 {
  background-image: url('../../../assets/img/product5.png');
}
</style>
