<template>
    <header class="header">
        <router-link to="/" exact>
            <img class="logo" src="https://dimg04.c-ctrip.com/images/700d0w000000kmbxe4747_1080_934_570.jpg" alt="logo">
        </router-link>
        <div class="query-box">
            <div>
                <div>
                    <font-icon id='icon-location'></font-icon>上海市长宁区金钟路
                </div>
                <div>
                    <span>.</span>
                    <span>我的位置</span>
                </div>
                
            </div>
        </div>

    </header>
</template>

<script>

</script>

<style lang="scss" scoped>
    .header {
        display: fixed;
        position: relative;
    }

    .logo {
        width: 100%;
        display: inline-block;
        vertical-align: middle;
    }

    .query-box {
        width: 94%;
        height: 220px;
        background-color: #ffffff;
        position: absolute;
        left: 3%;
        top: 130px;
        border-radius: 6px;
    }
</style>
