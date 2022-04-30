<template>
  <div id="home-page">
    <router-view></router-view>
    <todo-footer class="todo-footer"></todo-footer>
    <user-view></user-view>
  </div>
</template>

<script>
import TodoFooter from 'components/TodoFooter.vue'
import UserView from 'views/UserView.vue'
export default {
  name: 'Home',
  components: { TodoFooter, UserView },
};
</script>
<style lang="scss" scoped>
#home-page {
  display: flex;
  height: 100%;
  flex-direction: column;
  .todo-footer {
    height: 5rem;
  }
}
.todo-footer
{
  display: flex;
  align-items: center;
  background-color: rgb(91, 138, 226);
}
</style>