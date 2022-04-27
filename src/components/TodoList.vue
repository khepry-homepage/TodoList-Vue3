<template>
  <ul class="todo-list">
    <todo-item v-for="todo in todos" :key="todo.id" :todo="todo"></todo-item>
  </ul>
</template>

<script>
import { reactive, toRefs, provide } from 'vue'
import { nanoid } from 'nanoid'
import TodoItem from './TodoItem.vue'
export default {
  name: 'TodoList',
  components: { TodoItem },
  setup() {
    const state = reactive({
      todos: [
        {
          "userId": 123456,
          "categoryName": "健身",
          "content": "跳绳20分钟",
          "priority": 2,
          "startTime": "2022-05-30 09:12:34",
          "endTime": "2022-07-31 08:59:59",
          "alarmTime": [
            "2022-05-30 08:55:00",
            "2022-05-30 09:00:00"
          ],
          "subtodos": '[{"content":"跳绳20min"},{"content":"跑步20min"}]',
          "repetition": 5
        },
        {
          "userId": 123456,
          "categoryName": "健",
          "content": "跳绳20分钟",
          "priority": 2,
          "startTime": "2022-05-30 09:12:34",
          "endTime": "2022-07-31 08:59:59",
          "alarmTime": [
            "2022-05-30 08:55:00",
            "2022-05-30 09:00:00"
          ],
          "subtodos": '[{"content":"跳绳10min"},{"content":"跑步20min"}]',
          "repetition": 4
        }
      ]
    })
    state.todos.forEach(todo => {
      todo.subtodos = JSON.parse(todo.subtodos);
      todo.id = nanoid();
      todo.subtodos.forEach(subtodo => subtodo.id = nanoid());
    })

    const handleTodoCheck = ( { id, subid, isCheck } ) => {
      const todoIdx = state.todos.findIndex(todo => todo.id == id);
      if (todoIdx == -1)  return;
      // 设置子todo的完成状态
      if (subid) {
        let isFinished = 0;
        state.todos[todoIdx].subtodos.forEach(subtodo => {
          if (subtodo.id == subid) subtodo.isCheck = isCheck;
          if (subtodo.isCheck) isFinished++;
        })
        state.todos[todoIdx].isCheck = isFinished == state.todos[todoIdx].subtodos.length ? true : false;
      }
      else {
        state.todos[todoIdx].subtodos.forEach(subtodo =>  subtodo.isCheck = isCheck);
        state.todos[todoIdx].isCheck = isCheck;
      }
     
    } 
    provide('handleTodoCheck', handleTodoCheck);
    return {
      ...toRefs(state),
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