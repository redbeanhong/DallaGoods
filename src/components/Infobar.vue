<template>
  <div>
    <ul class="nav nav-tabs nav-fill my-4">
      <li class="nav-item">
        <router-link to="/customer_story" class="nav-link" href="#">
          <div class="d-flex align-items-center justify-content-center">
            <i class="fas fa-book-open mr-3" style="font-size: 30px;"></i>
            <blockquote class="blockquote text-left mb-0">
              <p class="mb-0">
                設計館故事
              </p>
              <footer class="blockquote-footer mb-0">
                <cite title="Source Title">About us</cite>
              </footer>
            </blockquote>
          </div>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/customer_comment" class="nav-link" href="#">
          <div class="d-flex align-items-center justify-content-center">
            <i class="fas fa-comment-dots mr-3" style="font-size: 30px;"></i>
            <blockquote class="blockquote text-left mb-0">
              <p class="mb-0">
                購買評價
              </p>
              <footer class="blockquote-footer mb-0">
                <cite title="Source Title">Reviews</cite>
              </footer>
            </blockquote>
          </div>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/customer_coupon" class="nav-link" href="#">
          <div class="d-flex align-items-center justify-content-center">
            <i class="fas fa-ticket-alt mr-3" style="font-size: 30px;"></i>
            <blockquote class="blockquote text-left mb-0">
              <p class="mb-0">
                領取優惠券
              </p>
              <footer class="blockquote-footer mb-0">
                <cite title="Source Title">Coupon</cite>
              </footer>
            </blockquote>
          </div>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/customer_notice" class="nav-link" href="#">
          <div class="d-flex align-items-center justify-content-center">
            <i class="fas fa-info-circle mr-3" style="font-size: 30px;"></i>
            <blockquote class="blockquote text-left mb-0">
              <p class="mb-0">
                注意事項
              </p>
              <footer class="blockquote-footer mb-0">
                <cite title="Source Title">Notice</cite>
              </footer>
            </blockquote>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
