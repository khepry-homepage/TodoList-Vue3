<template>
  <home-basic>
    <template #title>
      <div class="title">
        待办事项
      </div>
    </template>
    <template #main>
      <todo-list></todo-list>
    </template>
  </home-basic>
</template>

<script>
import HomeBasic from './HomeBasic.vue'
import TodoList from 'components/TodoList.vue'
export default {
  name: 'ListView',
  components: { HomeBasic, TodoList },
};
</script>
<style lang="scss" scoped>
.title {
  width: 100%;
  text-align: left;
  color: rgb(243, 243, 243);
  font-size: 2rem;
  &::before {
    margin-left: 1rem;
    font-family: "iconfont" !important;
    content: "\e61c";
  }
}
</style>