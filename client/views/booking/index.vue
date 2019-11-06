<template>
    <div class="booking">
        <div class="header">
            <div class="room">
                <h4>南京颐和公馆酒店</h4>
                <div class="room-content">
                    <div class="room-pic">
                        <img src alt="房型图片" />
                    </div>
                    <div class="room-desc">
                        <h3>景观高级房2晚+早餐2份+代金券1份+SPA2份</h3>
                        <h4 class="price">&yen;999.9</h4>
                        <div class="tags">
                            <span>不可退</span>
                            <span>官方直销</span>
                            <span>可转赠</span>
                        </div>
                    </div>
                </div>
            </div>
            <form>
                <div class="form-row">
                    <label>购买数量</label>
                </div>
                <div class="form-row">
                    <label>手机号码</label>
                    <input type="number" />
                </div>
            </form>
        </div>
        <div class="pay-type">
            <div class="pay-item">
                <span class="pay-name">微信支付</span><span class="check-box"></span>
            </div>
        </div>
        <div class="footer">
            <p>该处文案为示意文字本商品由南京颐和酒店提供，商品服务支持由携程旅行提供示意文字示意文字</p>
        </div>
        <div class="pay-bar">

        </div>
    </div>
</template>

<script>
export default {
    computed: {
        guessYouWantCity() {
            return this.$store.state.home.staticInfo.guessYouWantCity;
        }
    },
    title() {
        return "确认订单";
    }
};
</script>

<style>
@import "../../styles/booking.scss";
</style>
