<template>
  <ul class="todo-list">
    <todo-item v-for="todo in todos" :key="todo.id" :todo="todo"></todo-item>
  </ul>
  <edit-item-view :createTodoItem="createTodoItem"></edit-item-view>
</template>

<script>
import { provide, reactive, defineComponent, toRefs } from 'vue'
import throttle from 'lodash/throttle'
import { nanoid } from 'nanoid'
import { useStore } from 'vuex'
import { useMessage } from 'naive-ui';
import TodoItem from './TodoItem.vue'
import EditItemView from 'views/EditItemView.vue'
import { api } from 'utils/index.js'
export default defineComponent({
  components: { TodoItem, EditItemView },
  setup() {
    const state = reactive({ todos: null });
    const store = useStore();
    const message = useMessage();

    const queryTodo = () => {
      api.todo.queryTodo()
        .then(res => {
          if (res.code != 200)  {
            message.error('查询事项失败');
            return;
          }
          state.todos = res.data;
          state.todos.forEach(todo => {
            todo.alarmTime = JSON.parse(todo.alarmTime);
            todo.subtodos = JSON.parse(todo.subtodos);
            todo.subtodos.forEach(subtodo => subtodo.id = nanoid());
          })
        })
    }
    queryTodo();
    /* 
     * flag: 0 表示新建事项
     * flag: 1 表示修改原有事项
     */
    const createTodoItem = throttle(({ flag, todo }) => {
      let target = Object.create(null);
      wrapTodo({ todo, target });
      if (flag == 0) {
        api.todo.addTodo(target)
          .then(res => {
            if (res.code != 200)  {
              message.error('添加事项失败');
              return;
            }
            queryTodo();
            message.success('添加事项成功');
          })
      }
      else {
        api.todo.modifyTodo(target)
          .then(res => {
            if (res.code != 200)  {
              message.error('修改事项失败');
              return;
            }
            target.alarmTime = JSON.parse(target.alarmTime);
            target.subtodos = JSON.parse(target.subtodos);
            target.subtodos.forEach(subtodo => subtodo.id = nanoid());
            state.todos.some(todo => {
              if (todo.id == target.id) {
                Object.assign(todo, target);
                return true;
              }
            })
            message.success('修改事项成功');
          })
      }
    }, 500);

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
        alarmTime = JSON.stringify([new Date(todo.alarmTime).Format('yyyy-MM-dd hh:mm:ss'), new Date(startTime).Format('yyyy-MM-dd hh:mm:ss')]);
      }
      
      target.userId = store.state.userInfo.userId;
      target.id = todo.id;
      target.categoryName = todo.categoryName;
      target.content = todo.content;
      target.state = todo.state;
      target.startTime = new Date(startTime).Format('yyyy-MM-dd hh:mm:ss');
      target.endTime = new Date(endTime).Format('yyyy-MM-dd hh:mm:ss');
      target.subtodos = JSON.stringify(todo.subtodos);
      target.alarmTime = alarmTime || "[]";
      target.repetition = repetition;
      
      // to do
      target.priority = 2;
    }


    const handleTodoCheck = ({ id, subid, isCheck }) => {
      let todos = state.todos;
      const todoIdx = todos.findIndex(todo => todo.id == id);
      if (todoIdx == -1)  return;
      // 设置子todo的完成状态
      if (subid) {
        let isFinished = 0;
        todos[todoIdx].subtodos.forEach(subtodo => {
          if (subtodo.id == subid) subtodo.state = isCheck ? 2 : 1;
          if (subtodo.state == 2) isFinished++;
        })
        todos[todoIdx].state = isFinished == todos[todoIdx].subtodos.length ? 2 : 1;
      }
      else {
        todos[todoIdx].subtodos.forEach(subtodo =>  subtodo.state = isCheck ? 2 : 1);
        todos[todoIdx].state = isCheck ? 2 : 1;
      }
      let target = Object.create(null);
      const todo = todos[todoIdx];
      target.alarmTime = JSON.stringify(todo.alarmTime);
      target.categoryName = todo.categoryName;
      target.content = todo.content;
      target.id = todo.id;
      target.priority = todo.priority;
      target.startTime = todo.startTime;
      target.state = todo.state;
      target.subtodos = JSON.stringify(todo.subtodos);
      target.repetition = todo.repetition ? todo.repetition : 0;
      target.userId = store.state.userInfo.userId;
      api.todo.modifyTodo(target)
        .then(res => {
          if (res.code != 200)  {
            message.error('事项状态更新失败');
            return;
          }
          message.success('事项状态更新成功');
        })
        .catch(err => queryTodo())
    } 

    provide('handleTodoCheck', handleTodoCheck);
    
    return {
      ...toRefs(state),
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