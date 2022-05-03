<template>
  <li class="todo-item">
    <div class="main-item">
      <span class="item-check cursor" 
        @click="handleTodoCheck({ id: todo.id, isCheck: todo.isCheck ? false : true})">
        <svg-icon iconName="non-checked" :class="{checked: todo.isCheck}"></svg-icon>
      </span>
      <span class="todo-content">{{todo.content}}</span>
      <span class="todo-category">{{todo.categoryName}}</span>
      <span class="todo-edit cursor" @click="handleEditTodo">
        <svg-icon iconName="edit" :customizedStyle="{width: '1.5rem', height: '1.5rem'}"></svg-icon>
      </span>
    </div>
    <div class="todo-time">
      <span class="week">{{days}}</span>
      <span class="time">{{time}}</span>
      <span class="alarm" v-show="todo.alarmTime">
        {{ alarm }}
      </span>
    </div>

    <SubTodo v-for="subtodo in todo.subtodos" 
      :key="subtodo.id" 
      :subtodo="subtodo"/>
    
  </li>
</template>

<script>
import { computed, toRefs, toRaw, provide, inject, defineComponent } from 'vue'
import emitter from 'utils/eventbus.js'
import { getDiffDays } from 'utils/index.js'
import SubTodo from './SubTodo.vue'
export default defineComponent({
  components: { SubTodo },
  props: {
    todo: {
      require: true,
      type: Object,
    }
  },
  setup(props) {
    const todo = props.todo;

    const days = computed(() => {
      const diffDays = getDiffDays(todo.startTime, new Date().toString());
      return diffDays === 0 ? '今天' : diffDays === 1 ? '明天' : diffDays + '天后'; 
    })
    const time = computed(() => {
      return new Date(todo.startTime).Format('hh:mm');
    })
    const alarm = computed(() => {
      if (!todo.alarmTime) return null;
      let [ alarmTime ] = todo.alarmTime;
      const diffDays = getDiffDays(alarmTime, new Date().toString())
      return (diffDays === 0 ? '今天' : diffDays === 1 ? '明天' : diffDays + '天后') + 
              `${new Date(alarmTime).Format('hh:mm')}响铃`
    })


    const handleTodoCheck = inject('handleTodoCheck');
    const handleSubTodoCheck = ({ subid, isCheck }) => {
      const subtodoIdx = todo.subtodos.findIndex(subtodo => subtodo.id == subid);
      if (subtodoIdx == -1) return;
      handleTodoCheck({ id: todo.id, subid, isCheck });
    } 

    const handleEditTodo = () => {
      emitter.emit('editItem', toRaw(todo));
    }

    provide('handleSubTodoCheck', handleSubTodoCheck);
    return {
      ...toRefs(props),
      days,
      time,
      alarm,
      handleTodoCheck,
      handleEditTodo
    }
  }
});
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
  border-bottom: 1px solid rgb(51, 50, 50);
}
.main-item {
  position: relative;
  font-size: 2.5rem;
  .item-check {
    display: inline-flex;
    align-items: center;
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
    width: 2rem;
    text-align: center;
    vertical-align: text-top !important;
    border-radius: 50%;
    background-color: cadetblue;
  }
  .todo-edit {
    position: absolute;
    right: 1rem;
    vertical-align: middle;
    color: rgba(0, 171, 250, 0.904);
    &:hover {
      color: rgb(6, 122, 218);
    }
  } 
}
.main-item, .todo-time {
  text-align: left;
}
.todo-time {
  padding-left: 2rem;
  border-bottom: 1px dashed rgb(124, 123, 123);
  font-size: 1.2rem;
  .week, .time, .alarm {
    display: inline-block;
    text-align: left;
    width: 30%;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.week::before,
.time::before,
.alarm::before {
  font-family: "iconfont" !important;
}
.week::before {
  content: "\e6f5";
}
.time::before {
  content: "\e6c1";
}
.alarm::before {
  content: '\e657';
}
.checked {
  color: rgb(110, 165, 28);
}
</style>