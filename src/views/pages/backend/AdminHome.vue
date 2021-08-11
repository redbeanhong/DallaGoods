<template>
  <div>
    <div class="jumbotron">
      <div class="container">
        <p class="display-3">歡迎回來Dalla Goods賣家系統！</p>
        <p>
          為了提供給您更良好的使用體驗，賣家系統首頁即將全新改版，預計推出簡易儀表版和代辦事項功能，協助您能更有效率管理賣場商品與訂單。
        </p>

        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          客服諮詢 &raquo;
        </button>

        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">
                  聯絡我們
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
                <ul>
                  <li>
                    連絡電話：<a href="tel:+886-4-1231234">04-123-1234</a>
                  </li>
                  <li>
                    聯絡信箱：<a href="mailto:041231234@gmail.com"
                      >041231234@gmail.com</a
                    >
                  </li>
                </ul>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
