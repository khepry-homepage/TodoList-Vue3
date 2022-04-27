<template>
  <n-grid :cols="4">
    <n-grid-item @click="selectPage(0)">
      <div class="todo-home-icon iconfont cursor" :class="{'activated': activatedIdx == 0}">&#xe6bb;</div>
    </n-grid-item>
    <n-grid-item @click="selectPage(1)">
      <div class="todo-chart-icon iconfont cursor" :class="{'activated': activatedIdx == 1}">&#xe62a;</div>
    </n-grid-item>
    <n-grid-item @click="selectPage(2)">
      <div class="todo-timer-icon iconfont cursor" :class="{'activated': activatedIdx == 2}">&#xe651;</div>
    </n-grid-item>
    <n-grid-item @click="selectPage(3)">
      <div class="todo-user-icon iconfont cursor" :class="{'activated': activatedIdx == 3}">&#xe7d5;</div>
    </n-grid-item>
  </n-grid>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'TodoFooter',
  setup() {
    const state = reactive({
      activatedIdx: 0, // 0-3表示第几个激活的底部图标
    })

    const selectPage = (index) => {
      state.activatedIdx = index;
    } 

    return { 
      ...toRefs(state),
      selectPage
    }
  }
};
</script>
<style lang="scss" scoped>
.todo-home-icon,
.todo-chart-icon,
.todo-timer-icon,
.todo-user-icon
{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: black;
}
.activated {
  color: rgb(34, 20, 216) !important; 
}
</style>