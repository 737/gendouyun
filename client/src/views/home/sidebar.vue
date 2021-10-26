

<template>
    <div class="sidebar">
        <div class="tab-box">
            <a
                :class="{ active: tabCurrent === 'search' }"
                @click="handleTab('search')"
                >快搜</a
            >
            <a
                :class="{ active: tabCurrent === 'nav' }"
                @click="handleTab('nav')"
                >导航</a
            >
        </div>
        <div class="search-box" v-if="tabCurrent === 'search'">
            <ul>
                <li class="">
                    <img src="../../assets/images/google.ico" /><a
                        data="https://www.google.com/"
                        >谷歌</a
                    >
                </li>
                <li class="current">
                    <img src="../../assets/images/baidu.ico" /><a
                        data="https://www.baidu.com/"
                        >百度</a
                    >
                </li>
            </ul>
        </div>
        <div class="nav-box df just-center" v-if="tabCurrent === 'nav'">
            <dl>
                <dt style="top: 11px"><span class="show-list"></span></dt>
                <dd class="current">
                    <a
                        href="#web"
                        class="auto-scroll"
                        data-offset="-20"
                        data-speed="500"
                        >热闹推荐</a
                    >
                </dd>
                <dd class="">
                    <a
                        href="#icon"
                        class="auto-scroll"
                        data-offset="-20"
                        data-speed="500"
                        >图标ICON</a
                    >
                </dd>
                <dd class="">
                    <a
                        href="#brush"
                        class="auto-scroll"
                        data-offset="-20"
                        data-speed="500"
                        >笔刷纹理</a
                    >
                </dd>
                <dd>
                    <a
                        href="#logo"
                        class="auto-scroll"
                        data-offset="-20"
                        data-speed="500"
                        >Logo设计</a
                    >
                </dd>
                <dd>
                    <a
                        href="#infographic"
                        class="auto-scroll"
                        data-offset="-20"
                        data-speed="500"
                        >信息图</a
                    >
                </dd>
                <dd>
                    <a
                        href="#company"
                        class="auto-scroll"
                        data-offset="-20"
                        data-speed="500"
                        >设计公司</a
                    >
                </dd>
            </dl>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, computed, onMounted, onUnmounted, ref } from "vue";

var tabCurrent = ref("search");

const handleTab = (e: string) => {
    tabCurrent.value = e;
};
</script>


<style lang="scss" scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: $height-header;
    left: 0;
    width: $width-sidebar;
    height: calc(100% - $height-header);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background-color: $color-background-sidebar;
    font-size: 1rem;
    z-index: $z-index-sidebar;
}

.tab-box {
    height: 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    a {
        cursor: pointer;

        &.active {
            background-color: red;
        }
    }
}

.nav-box {
    font-size: 14px;
    color: #3b3c3e;
    margin-top: 2rem;

    &.fixed {
        position: fixed;
        top: 0;
        margin-top: 0;

        dl {
            margin: 10px 0 0;
        }
    }

    dl {
        position: relative;
        margin: -12px 0 0;
        padding-bottom: 20px;

        dt {
            position: absolute;
            top: 12px;
            left: -20px;
        }

        .show-list {
            display: block;
            width: 16px;
            height: 16px;
            cursor: pointer;

            &::before {
                content: "";
                display: block;
                width: 12px;
                height: 2px;
                background: #000;
                border-radius: 1px;
                position: absolute;
                top: 50%;
                margin-top: -1px;
            }

            &.add::after {
                content: "";
                display: block;
                width: 2px;
                height: 12px;
                background: #000;
                border-radius: 1px;
                position: absolute;
                left: 5px;
                top: 20%;
                margin-top: -1px;
            }
        }
    }

    dd {
        margin: 0;
        padding: 6px 0;
        letter-spacing: 0.5px;
        a {
            color: #5e5d5b;
            display: inline-block;
            padding: 2px 4px;
            transition: 0.1s;

            &:hover {
                color: #fff;
                background: #ff5a00;
                border-radius: 3px;
            }
        }

        &.current a {
            color: #ff5a00;
            background: transparent;
        }
    }
}

.search-box {
    flex: 1;
    background-color: #f1f4f9;

    ul {
        li {
            height: 2.8rem;
            display: flex;
            align-items: center;

            img {
                margin: 0 1rem 0.2rem;
                width: 1.3rem;
                height: 1.3rem;
            }

            &.current {
                background-color: white;
            }
        }
    }
}

@media (max-width: 1199px) {
    .nav-box {
        font-size: 12px;
        margin-left: 0;
        padding-right: 0;
    }

    .nav-box dt {
        display: none;
    }
}

@media screen and (max-width: 991px) {
    .nav-box {
        display: none;
    }
}
</style>