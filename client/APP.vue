<template>
  <div>
    <div>i am app.vue</div>
    <router-link to="todolist">todolist</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>