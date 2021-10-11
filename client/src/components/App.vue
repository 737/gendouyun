<script setup lang="ts">
import { reactive, toRefs, computed, onMounted, onUnmounted, ref } from "vue";

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";

const countter = ref(0);

const handleClick = (e) => {
    countter.value = countter.value + 1;
};
</script>

<template>
    <img alt="Vue logo" src="./assets/logo.png" />

    <button @click="handleClick">点我可以弹alert{{ countter }}</button>
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>


