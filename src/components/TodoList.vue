<template>
  <ul class="todo-list">
    <todo-item v-for="todo in todos" :key="todo.id" :todo="todo"></todo-item>
  </ul>
  <edit-item-view :createTodoItem="createTodoItem"></edit-item-view>
</template>

<script>
import { provide, reactive, defineComponent } from 'vue'
import { nanoid } from 'nanoid'
import { useStore } from 'vuex'
import TodoItem from './TodoItem.vue'
import EditItemView from 'views/EditItemView.vue'
export default defineComponent({
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
    const store = useStore();

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
      let target = Object.create(null);
      wrapTodo({ todo, target });
      if (flag == 0) {
        todos.push(target);
      }
      else {
        todos.some(todo => {
          if (todo.id == target.id) {
            Object.assign(todo, target);
            return true;
          }
        })
      }
    }

    // wrap the todo object
    const wrapTodo = ({ todo, target }) => {
      const [ startTime, endTime ] = todo.range; 
      let repetition = 0;
      if (todo.alarmDays) {
        todo.alarmDays.forEach(alarmDay => {  
          repetition |= (1 << alarmDay);
        })
      }
      let alarmTime = null;
      if (todo.alarmTime) {
        alarmTime = [new Date(todo.alarmTime).Format('yyyy-MM-dd hh:mm:ss'), new Date(startTime).Format('yyyy-MM-dd hh:mm:ss')];
      }

      target.userId = store.state.userInfo.userId;
      target.id = todo.id;
      target.categoryName = todo.categoryName;
      target.content = todo.content;
      target.startTime = new Date(startTime).Format('yyyy-MM-dd hh:mm:ss');
      target.endTime = new Date(endTime).Format('yyyy-MM-dd hh:mm:ss');
      target.subtodos = todo.subtodos;
      target.alarmTime = alarmTime;
      target.repetition = repetition;

      // to do
      target.priority = 2;
    }


    const handleTodoCheck = ({ id, subid, isCheck }) => {
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
});
</script>
<style lang="scss" scoped>
.todo-list {
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
}
</style>