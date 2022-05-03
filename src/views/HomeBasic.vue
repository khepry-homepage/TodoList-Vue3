<template>
  <div class="todo-header">
    <slot name="title"></slot>
    <WeekDate/>
  </div>
  <n-scrollbar class="todo-main" id="drawer-target">
    <slot name="main"></slot>
  </n-scrollbar>
</template>

<script>
import { defineComponent } from 'vue'
import WeekDate from 'components/WeekDate.vue'

export default defineComponent({
  name: 'HomeBasic',
  components: { WeekDate },
});
</script>
<style lang="scss" scoped>
.todo-header {
  height: 10rem;
}
.todo-main {
  position: relative;
  flex: 1 0;
  width: 0;
  height: 0;
}
.todo-header
{
  display: flex;
  align-items: center;
  background-color: rgb(91, 138, 226);
  flex-direction: column;
}
</style>