<template>
  <div>
    <div class="head-title">欢迎登录</div>
    <article>
      <div class="head-hotel-wrapper">
        <span class="head-hotelname">{{hotelname}}官网</span>
        <div class="head-tag-wrapper">
          <span class="tagtxt">官方</span>
        </div>
      </div>
      <form class="login-form">
        <div class="form-wrapper">
          <label>
            <font-icon id="icon-phone" class="icon"></font-icon>
          </label>
          <input
            class="inputbox"
            placeholder="请输入手机号"
            v-model.trim="telNum"
            id="tel"
            @focus="editing"
            @blur="validData('tel')"
          />
          <span class="warning-txt" v-show="showTelWarning">请填写正确的手机号</span>
        </div>
        <div class="form-wrapper">
          <label>
            <font-icon id="icon-valid" class="icon"></font-icon>
          </label>
          <input
            class="inputbox"
            placeholder="请输入验证码"
            v-model.trim="validCode"
            id="code"
            @focus="editing"
            @blur="validData('code')"
          />
          <div class="validCode-btn" v-on:click="getValidCode">获取验证码</div>
          <span class="warning-txt" v-show="showCodeWarning">请填写正确的验证码</span>
        </div>
        <div class="login-btn" v-on:click="finalSubmit">登 录</div>
      </form>
    </article>
    <footer>
      <div class="login-footer">免责声明</div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotelname: "酒店名称",
      telNum: "",
      validCode: "",
      showTelWarning: false,
      showCodeWarning: false
    };
  },
  computed: {
    // guessYouWantCity() {
    //   return this.$store.state.home.staticInfo.guessYouWantCity;
    // }
  },
  asyncData({ store }) {
    // return store.dispatch("getHomeStaticInfo");
  },
  methods: {
    editing: function() {
      console.log("input ing");
    },
    validData: function(type) {
      //正则验证
      if (type == "tel") {
        console.log("valid tel");
        this.showTelWarning = !this.checkPhone(this.telNum);
      } else if (type == "code") {
        console.log("valid code");
        this.showCodeWarning = !this.checkCode(this.validCode);
      }
      return;
    },
    checkPhone: function(tel) {
      if (!/^1[3456789]\d{9}$/.test(tel)) {
        return false;
      }
      return true;
    },
    checkCode: function(code) {
      if (!/^\d{6}$/.test(this.validCode)) {
        return false;
      }
      return true;
    },
    clearInput: function() {
      return;
    },
    getValidCode: function() {
      console.log("get code");
      return;
    },
    finalSubmit: function() {
      let postdata = {
        tel: this.telNum,
        code: this.validCode
      };
      console.log("login data", postdata);
    }
  }
};
</script>

<style>
@import "../../styles/login.scss";
</style>
