<template>
  <home-basic>
    <template #title>
      <div class="title">
        专注模式
      </div>
    </template>
    <template #main>
    </template>
  </home-basic>
</template>

<script>
import HomeBasic from './HomeBasic.vue'
export default {
  name: 'FocusView',
  components: { HomeBasic },
  props: {},
};
</script>
<style lang="scss" scoped>
.title {
  width: 100%;
  padding-left: 2rem;
  text-align: left;
  color: rgb(243, 243, 243);
  font-size: 2rem;
  &::before {
    font-family: "iconfont" !important;
    content: "\e61c";
  }
}
</style>