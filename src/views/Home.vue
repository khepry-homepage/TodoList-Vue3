<template>
  <div id="home-page">
    <todo-header class="todo-header"></todo-header>
    <n-scrollbar class="todo-main">
      <todo-list></todo-list>
    </n-scrollbar>
    <todo-footer class="todo-footer"></todo-footer>
  </div>
</template>

<script>
import TodoHeader from 'components/TodoHeader.vue'
import TodoFooter from 'components/TodoFooter.vue'
import TodoList from 'components/TodoList.vue'
export default {
  name: 'Home',
  components: { TodoHeader, TodoFooter, TodoList },
  props: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
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
</style>