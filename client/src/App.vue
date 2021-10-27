<template>
    <div class="main">
        <header-component></header-component>
        <side-bar-component></side-bar-component>
        <router-view />
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "./components/header.vue";
import SideBarComponent from './components/sidebar.vue';

export default defineComponent({
    components: {
        HeaderComponent,
        SideBarComponent,
    },

    setup() { },
});
</script>


<style lang="scss" scoped>
$primary-color: red;

.title {
    color: $color-primary;
}
</style>
