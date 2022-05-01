<template>
  <ul class="todo-list">
    <todo-item v-for="todo in todos" :key="todo.id" :todo="todo"></todo-item>
  </ul>
  <edit-item-view :createTodoItem="createTodoItem"></edit-item-view>
</template>

<script>
import { provide, reactive } from 'vue'
import { nanoid } from 'nanoid'
import { jsDateFormatter } from 'utils/index.js'
import TodoItem from './TodoItem.vue'
import EditItemView from 'views/EditItemView.vue'
export default {
  name: 'TodoList',
  components: { TodoItem, EditItemView },
  setup() {
    const todos = reactive([
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
          "subtodos": '[{\"content\":\"跳绳\",\"id\":111},{\"content\":\"跑步\",\"id\":222}]',
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
      ]);

    todos.forEach(todo => {
      todo.subtodos = JSON.parse(todo.subtodos);
      todo.id = nanoid();
      todo.subtodos.forEach(subtodo => subtodo.id = nanoid());
    })

    /* 
     * flag: 0 表示新建事项
     * flag: 1 表示修改原有事项
     */
    const createTodoItem = ({ flag, todo }) => {
      let wrapTodo = Object.create(null);
      wrapTodo({ todo, wrapTodo });
      if (flag == 0) {
        todos.push(wrapTodo);
      }
      else {
        todos.some(todo => {
          if (todo.id == wrapTodo.id) {
            Object.assign(todo, wrapTodo);
            return true;
          }
        })
      }
    }
    // wrap the todo object
    const wrapTodo = ({ todo, wrapTodo }) => {
      const [ startTime, endTime ] = todo.range; 
      let repetition = 0;
      if (todo.alarmDays) {
        todo.alarmDays.forEach(alarmDay => {  
          repetition |= (1 << alarmDay);
        })
      }
      let alarmTime = null;
      if (todo.alarmTime) {
        alarmTime = [[new Date(todo.alarmTime)], [new Date(startTime)]];
      }

      wrapTodo.id = todo.id;
      wrapTodo.categoryName = todo.categoryName;
      wrapTodo.content = todo.content;
      wrapTodo.startTime = jsDateFormatter(new Date(startTime));
      wrapTodo.endTime = jsDateFormatter(new Date(endTime));
      wrapTodo.subtodos = todo.subtodos;
      wrapTodo.alarmTime = alarmTime;
      wrapTodo.repetition = repetition;
    }


    const handleTodoCheck = ( { id, subid, isCheck } ) => {
      const todoIdx = todos.findIndex(todo => todo.id == id);
      if (todoIdx == -1)  return;
      // 设置子todo的完成状态
      if (subid) {
        let isFinished = 0;
        todos[todoIdx].subtodos.forEach(subtodo => {
          if (subtodo.id == subid) subtodo.isCheck = isCheck;
          if (subtodo.isCheck) isFinished++;
        })
        todos[todoIdx].isCheck = isFinished == todos[todoIdx].subtodos.length ? true : false;
      }
      else {
        todos[todoIdx].subtodos.forEach(subtodo =>  subtodo.isCheck = isCheck);
        todos[todoIdx].isCheck = isCheck;
      }
    } 

    provide('handleTodoCheck', handleTodoCheck);
    
    return {
      todos,
      createTodoItem
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