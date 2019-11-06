<template>
  <article class="comment-root">
    <!-- 顶部名称 -->
    <div class="header-wrap">
      <span class="name">南京颐和酒店</span>
      <span class="tag">官方</span>
      <div class="watch">
        <span class="txt">+&nbsp;关注</span>
      </div>
    </div>

    <!-- slider -->
    <div class="slider">
      <div class="image-wrap">
        <img
          src="https://dimg04.c-ctrip.com/images//hotel/795000/794773/ea6a19ec0b024ce1a00cd9f69bf71b31_C_550_412_Q50.jpg_.webp?v=1"
          data-state="https://dimg04.c-ctrip.com/images//hotel/795000/794773/ea6a19ec0b024ce1a00cd9f69bf71b31_C_550_412_Q50.jpg_.webp?v=1"
        />
      </div>
      <div class="pnumber">
        <span class="txt">3&nbsp;/5</span>
      </div>
    </div>

    <!-- 名称信息 -->
    <div class="info-block name-price">
      <div class="name">
        <span>景观高级房2晚+早餐2份早餐2份早餐2份早餐2份+代金券1份+SPA2份</span>
      </div>
      <div class="price-count">
        <div class="price">
          <span class="cny">¥</span>
          <span class="salePrice">999.9</span>
          <span class="originPrice">门市价 ¥1999.9</span>
          <span class="count">销量&nbsp;333</span>
        </div>
      </div>
      <div class="df">
        <div class="mr32">随时退</div>
        <div class="mr32">随时退</div>
        <div class="mr32">随时退</div>
        <div class="mr32">随时退</div>
      </div>
    </div>

    <!-- 房费包含 -->
    <div class="info-block group">
      <h1>房费包含</h1>

      <ul>
        <li class="df justBetween">
          <div>
            <i>·</i>
            <span class="ml20">景观高级房间</span>
            <span class="ml32">2晚</span>
          </div>
          <div>
            <span>参考价</span>
            <span class="ml20">¥1200</span>
          </div>
        </li>
        <li class="df justBetween">
          <div>
            <i>·</i>
            <span class="ml20">早餐</span>
            <span class="ml32">2份</span>
          </div>
          <div>
            <span class="ml20">¥200</span>
          </div>
        </li>
        <li class="df justBetween">
          <div>
            <i>·</i>
            <span class="ml20">儿童乐园</span>
            <span class="ml32">1份</span>
          </div>
          <div>
            <span class="ml20">¥100</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- 房态信息 -->
    <div class="info-block room-status">
      <h1>房态信息</h1>

      <div class="df justBetween">
        <ul class="calendar df">
          <li class="df flexColumn justAround algnCenter">
            <div class="df flexColumn algnCenter">
              <p>10-22</p>
              <p class="mt8">今天</p>
            </div>
            <p>满房</p>
          </li>

          <li class="df flexColumn justAround algnCenter">
            <div class="df flexColumn algnCenter">
              <p>10-22</p>
              <p class="mt8">今天</p>
            </div>
            <p>满房</p>
          </li>
          <li class="df flexColumn justAround algnCenter">
            <div class="df flexColumn algnCenter">
              <p>10-22</p>
              <p class="mt8">今天</p>
            </div>
            <p>满房</p>
          </li>
          <li class="df flexColumn justAround algnCenter">
            <div class="df flexColumn algnCenter">
              <p>10-22</p>
              <p class="mt8">今天</p>
            </div>
            <p>满房</p>
          </li>
        </ul>

        <div class="calendar-icon df flexCenter">
          <span></span>
          <span>更多</span>
        </div>
      </div>
    </div>
    <!-- /房态信息 -->

    <!-- 购买须知 -->
    <div class="info-block room-status">
      <h1>购买须知</h1>
    </div>
    <!-- 购买须知 -->
  </article>
</template>

<style>
@import "../../styles/cstyle.scss";
@import "../../styles/detail.scss";
</style>

<script>
export default {
  computed: {
    guessYouWantCity() {
      return this.$store.state.home.staticInfo.guessYouWantCity;
    }
  },
  asyncData({ store }) {
    return store.dispatch("getHomeStaticInfo");
  }
};
</script>
