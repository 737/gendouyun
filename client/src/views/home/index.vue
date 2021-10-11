
<template>
    <header-component></header-component>
    <side-bar-component></side-bar-component>
    <content-component></content-component>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "./header.vue";
import SideBarComponent from './sidebar.vue';
import ContentComponent from './content.vue';

export default defineComponent({
    components: {
        HeaderComponent,
        SideBarComponent,
        ContentComponent
    },

    setup() {},
});
</script>


<style lang="scss" scoped>
$primary-color: red;

.title {
    color: $color-primary
}

</style>