<template>
  <div id="home-page">
    <todo-header class="todo-header">
      <template v-slot:title>
        <div class="title">
          待办事项
        </div>
      </template>
    </todo-header>
    <n-scrollbar class="todo-main" id="drawer-target">
      <todo-list></todo-list>
    </n-scrollbar>
    <edit-item-view></edit-item-view>
    <todo-footer class="todo-footer"></todo-footer>
  </div>
</template>

<script>
import TodoHeader from 'components/TodoHeader.vue'
import TodoFooter from 'components/TodoFooter.vue'
import TodoList from 'components/TodoList.vue'
import EditItemView from './EditItemView.vue';

export default {
  name: 'Home',
  components: { TodoHeader, TodoFooter, TodoList, EditItemView },
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
#home-page {
  display: flex;
  height: 100%;
  flex-direction: column;
  .todo-header {
    height: 10rem;
  }
  .todo-footer {
    height: 5rem;
  }
  .todo-main {
    position: relative;
    flex: 1 0;
    width: 0;
    height: 0;
  }
}
.todo-header,
.todo-footer
{
  display: flex;
  align-items: center;
  background-color: rgb(91, 138, 226);
}
.todo-header {
  flex-direction: column;
}
</style>