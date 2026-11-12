<template>
    <template v-if="isBare">
        <router-view />
    </template>
    <template v-else>
        <header-component></header-component>
        <div class="df flex-auto flex-row">
            <side-bar-component></side-bar-component>
            <div class="flex-auto df">
                <router-view />
            </div>
        </div>
    </template>
</template>


<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import HeaderComponent from "./components/header.vue";
import SideBarComponent from './components/sidebar.vue';

const route = useRoute();

// meta.bare 的页面（如“网站制作中”）占满整屏，不显示 header / sidebar
const isBare = computed(() => route.meta.bare === true);
</script>


<style lang="scss" scoped>
$primary-color: red;

.main-content {
    margin: $height-header 0 0 0;
    display: flex;
    justify-content: center;
}
</style>
