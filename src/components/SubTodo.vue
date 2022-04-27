<template>
  <li class="todo-subtodo">
    <input type="checkbox" :checked="subtodo.isCheck"
      @change="handleSubTodoCheck({ subid: subtodo.id, isCheck: subtodo.isCheck ? false : true})"/>
    <span class="todo-subtodo-content">{{subtodo.content}}</span>
  </li>
</template>

<script>
import { toRefs } from 'vue'
export default {
  name:'SubTodo',
  props:[ 'subtodo' ],
  inject: [ 'handleSubTodoCheck' ],
  setup(props) {
    return {
      ...toRefs(props)
    }
  }
};
</script>
<style lang="scss" scoped>
.todo-subtodo {
  border-left: 1px dashed rgb(124, 123, 123);
  border-bottom: 1px dashed rgb(124, 123, 123);
  list-style: none;
  margin-left: 2rem;
  text-align: left;
  .todo-subtodo-content {
    display: inline-block;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .todo-subtodo-content, input {
    vertical-align: middle;
  }
}

</style>