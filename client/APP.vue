<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
@import "./styles/normalize.scss";

$COLOR: #333;

body {
  font-family: "PingFang SC", "Microsoft YaHei", arial, "Hiragino Sans GB",
    "Hiragino Sans GB W3";
  color: $COLOR;
  background-color: #fafafa;
}

a {
  text-decoration: none;
  cursor: pointer;
  color: $COLOR;
}

a:hover {
  color: #f50;
}
</style>