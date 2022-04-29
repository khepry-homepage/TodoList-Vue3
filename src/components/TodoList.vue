<template>
  <ul class="todo-list">
    <todo-item v-for="todo in todos" :key="todo.id" :todo="todo"></todo-item>
  </ul>
</template>

<script>
import { provide, computed } from 'vue'
import { useStore } from 'vuex'
import { nanoid } from 'nanoid'
import TodoItem from './TodoItem.vue'
export default {
  name: 'TodoList',
  components: { TodoItem },
  setup() {
    const store = useStore();
    const todos = computed(() => store.state.todos);
    
    todos.value.forEach(todo => {
      todo.subtodos = JSON.parse(todo.subtodos);
      todo.id = nanoid();
      todo.subtodos.forEach(subtodo => subtodo.id = nanoid());
    })

    const handleTodoCheck = ( { id, subid, isCheck } ) => {
      const todoIdx = todos.value.findIndex(todo => todo.id == id);
      if (todoIdx == -1)  return;
      // 设置子todo的完成状态
      if (subid) {
        let isFinished = 0;
        todos.value[todoIdx].subtodos.forEach(subtodo => {
          if (subtodo.id == subid) subtodo.isCheck = isCheck;
          if (subtodo.isCheck) isFinished++;
        })
        todos.value[todoIdx].isCheck = isFinished == todos.value[todoIdx].subtodos.length ? true : false;
      }
      else {
        todos.value[todoIdx].subtodos.forEach(subtodo =>  subtodo.isCheck = isCheck);
        todos.value[todoIdx].isCheck = isCheck;
      }
    } 
    provide('handleTodoCheck', handleTodoCheck);
    
    return {
      todos
    }
}
};
</script>
<style lang="scss" scoped>
.todo-list {
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
}
</style>