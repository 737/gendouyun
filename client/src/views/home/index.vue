
<template>
    <header-component></header-component>
    <a-slide></a-slide>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "./header.vue";
import ASlide from './aside.vue';

export default defineComponent({
    components: {
        HeaderComponent,
        ASlide
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