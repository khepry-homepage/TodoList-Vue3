<template>
  <n-grid :cols="4">
    <n-grid-item @click="selectPage(0)">
      <svg-icon iconName="homefill" :customizedStyle="{width: '2rem', height: '2rem'}"
        class="cursor" :class="{'activate': activateIdx == 0}"></svg-icon>
    </n-grid-item>
    <n-grid-item @click="selectPage(1)">
      <svg-icon iconName="chart" :customizedStyle="{width: '2rem', height: '2rem'}"
        class="cursor" :class="{'activate': activateIdx == 1}"></svg-icon>
    </n-grid-item>
    <n-grid-item @click="selectPage(2)">
      <svg-icon iconName="timer-f" :customizedStyle="{width: '2rem', height: '2rem'}"
        class="cursor" :class="{'activate': activateIdx == 2}"></svg-icon>
    </n-grid-item>
    <n-grid-item @click="showUserView">
      <svg-icon iconName="user-fill" :customizedStyle="{width: '2rem', height: '2rem'}"
        class="cursor" :class="{'activate': activateIdx == 3}"></svg-icon>
    </n-grid-item>
  </n-grid>
</template>

<script>
import { reactive, toRefs, computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import throttle from 'lodash/throttle'
import { emitter } from 'utils/index.js'
export default defineComponent({
  setup() {
    const store = useStore();
    const state = reactive({
      activateIdx: computed(() => store.state.activateIdx), // 0-3表示第几个激活的底部图标
    })

    const router = useRouter();
    const routes = ['ListView', 'DataChartView', 'FocusView'];
    const selectPage = throttle((index) => {
      router.push({ name: routes[index] });
    }, 500);
    const showUserView = () => { 
      emitter.emit('showUserView');
    }
    return { 
      ...toRefs(state),
      selectPage,
      showUserView
    }
  }
});
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
.activate {
  color: rgb(34, 20, 216) !important; 
}
</style>