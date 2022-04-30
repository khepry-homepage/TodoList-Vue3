<template>
  <n-grid :cols="4">
    <n-grid-item @click="selectPage(0)">
      <svg-icon iconName="homefill" :customizedStyle="{width: '2rem', height: '2rem'}"
        class="cursor" :class="{'activated': activatedIdx == 0}"></svg-icon>
    </n-grid-item>
    <n-grid-item @click="selectPage(1)">
      <svg-icon iconName="chart" :customizedStyle="{width: '2rem', height: '2rem'}"
        class="cursor" :class="{'activated': activatedIdx == 1}"></svg-icon>
    </n-grid-item>
    <n-grid-item @click="selectPage(2)">
      <svg-icon iconName="timer-f" :customizedStyle="{width: '2rem', height: '2rem'}"
        class="cursor" :class="{'activated': activatedIdx == 2}"></svg-icon>
    </n-grid-item>
    <n-grid-item @click="showUserView">
      <svg-icon iconName="user-fill" :customizedStyle="{width: '2rem', height: '2rem'}"
        class="cursor" :class="{'activated': activatedIdx == 3}"></svg-icon>
    </n-grid-item>
  </n-grid>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import emitter from 'utils/eventbus.js'
export default {
  name: 'TodoFooter',
  setup() {
    const state = reactive({
      activatedIdx: 0, // 0-3表示第几个激活的底部图标
    })

    const router = useRouter();
    const routes = ['ListView', 'DataView', 'FocusView'];
    const selectPage = (index) => {
      state.activatedIdx = index;
      router.push({ name: routes[index] });
    } 
    const showUserView = () => { 
      emitter.emit('showUserView');
    }
    return { 
      ...toRefs(state),
      selectPage,
      showUserView
    }
  }
};
</script>
<style lang="scss" scoped>
.n-grid {
  div {
    margin: 0 auto;
    color: rgb(44, 43, 43);
    &:hover {
      color: black;
    }
  }
}
.activated {
  color: rgb(34, 20, 216) !important; 
}
</style>