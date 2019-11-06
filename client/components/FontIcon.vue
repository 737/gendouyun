<template lang="html">
    <i v-if="id" class="icon-font" :class="id"></i>
</template>

<script>
    export default {
        name: 'icon-font',
        props: {
            id: {
                type: String,
                default: ''
            }
        }
    };
</script>
