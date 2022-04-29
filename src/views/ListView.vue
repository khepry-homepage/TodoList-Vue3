<template>
  <home-basic>
    <template v-slot:title>
      <div class="title">
        待办事项
      </div>
    </template>
    <template v-slot:main>
      <todo-list></todo-list>
      <edit-item-view></edit-item-view>
    </template>
  </home-basic>
</template>

<script>
import HomeBasic from './HomeBasic.vue'
import EditItemView from './EditItemView.vue'
import TodoList from 'components/TodoList.vue'
export default {
  name: 'ListView',
  components: { HomeBasic, EditItemView, TodoList },
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