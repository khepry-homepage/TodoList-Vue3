<template>
  <li class="todo-item">
    <div class="main-item">
      <span class="item-check iconfont cursor" 
        @click="handleTodoCheck({ id: todo.id, isCheck: todo.isCheck ? false : true})" 
        :class="{'checked': todo.isCheck}">&#xe600;</span>
      <span class="todo-content">{{todo.content}}</span>
      <span class="todo-category">{{todo.categoryName}}</span>
    </div>
    <div class="todo-time">
      <span class="week">{{days}}</span>
      <span class="time">{{time}}</span>
      <span v-show="todo.needBell">
        {{bell}}
      </span>
    </div>

    <SubTodo v-for="subtodo in todo.subtodos" 
      :key="subtodo.id" 
      :subtodo="subtodo"/>
    
  </li>
</template>

<script>
import SubTodo from './SubTodo.vue'
import { computed, toRefs, provide, inject } from 'vue'
import { getDiffDays } from 'utils/index.js'
export default {
  name: 'TodoItem',
  components: { SubTodo },
  props: {
    todo: {
      require: true,
      type: Object,
    }
  },
  setup(props) {
    const todo = props.todo;
    const handleTodoCheck = inject('handleTodoCheck');
    const days = computed(() => {
      const diffDays = getDiffDays(todo.startTime, new Date().toString());
      return diffDays === 0 ? '今天' : diffDays === 1 ? '明天' : diffDays + '天后'; 
    })
    const time = computed(() => {
      return new Date(todo.startTime).Format('hh:mm');
    })
    const bell = computed(() => {
        const diffDays = getDiffDays(todo.alarmTime, new Date().toString())
        return (diffDays === 0 ? '今天' : diffDays === 1 ? '明天' : diffDays + '天后') + 
                `${new Date(todo.alarmTime).Format('hh:mm')}响铃${todo.repetition}次`
    })

    const handleSubTodoCheck = ({ subid, isCheck }) => {
      const subtodoIdx = todo.subtodos.findIndex(subtodo => subtodo.id == subid);
      if (subtodoIdx == -1) return;
      handleTodoCheck({ id: todo.id, subid, isCheck });
    } 
    provide('handleSubTodoCheck', handleSubTodoCheck);
    return {
      ...toRefs(props),
      days,
      time,
      bell,
      handleTodoCheck
    }
}
};
</script>
<style lang="scss" scoped>
.todo-content, 
.todo-category,
.week,
.time {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
.todo-item {
  list-style-type: none;
  background-color: rgb(133, 207, 209);
}
.main-item {
  font-size: 1.5rem;
  .item-check {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    vertical-align: middle;
  }
  .todo-content {
    max-width: 50%;
  }
  .todo-category {
    font-size: 1rem;
    color: #fff;
    margin-left: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    max-width: 4rem;
    vertical-align: text-top !important;
    border-radius: 50%;
    background-color: cadetblue;
  }
}
.main-item, .todo-time {
  text-align: left;
}
.todo-time {
  padding-left: 2rem;
  border-bottom: 1px dashed rgb(124, 123, 123);
  .week, .time {
    text-align: left;
    width: 30%;
  }
}
.week::before,
.time::before {
  font-family: "iconfont" !important;
}
.week::before {
  content: "\e6f5";
}
.time::before {
  content: "\e6c1";
}
.checked {
  color: rgb(18, 146, 35) !important; 
}
</style>