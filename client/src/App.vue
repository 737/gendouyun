<template>
    <header-component></header-component>
    <div class="df flex-auto flex-row">
        <side-bar-component></side-bar-component>
        <div class="flex-auto">
            <router-view />
        </div>
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

.main-content {
    margin: $height-header 0 0 0;
    display: flex;
    justify-content: center;
}
</style>
