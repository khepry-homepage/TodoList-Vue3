<template>
  <teleport to="body">
    <div id="lock-screen">
      <n-space>
        <n-button size="large" type="error" round @click="closeFocus">
          结束专注模式
        </n-button>
      </n-space>
      <n-space>
        <n-progress type="circle" :percentage="percentage" :style="{width: '15rem'}" status="success">
          <span style="text-align: center; font-size: 2rem; color: rgb(68, 68, 68); font-weight:bold;">{{ formatTime }}</span>
        </n-progress>      
      </n-space>
    </div>
  </teleport>
</template>

<script>
import { defineComponent, reactive, toRefs, computed, onMounted, onUnmounted } from 'vue'
export default defineComponent({
  props: {
    currTime: {
      require: true,
      type: Number
    },
    maxMinute: {
      require: true,
      type: Number
    },
    addCurrTime: {
      require: true,
      type: Function
    },
    changeLockState: {
      require: true,
      type: Function
    },
    closeLockScreen: {
      require: true,
      type: Function
    }
  },
  setup(props) {
    const { currTime, maxMinute, addCurrTime, changeLockState, closeLockScreen } = toRefs(props);

    const state = reactive({
      percentage: null,
      currTime: currTime,
      maxSecond: maxMinute.value * 60,
    })

    let timer = null;

    const formatTime = computed(() => {
      let second = state.currTime % 60,
          minute = Math.floor(state.currTime / 60) % 60,
          hour = Math.floor(state.currTime / 3600);
      return `${hour<10?'0':''}${hour}:${minute<10?'0':''}${minute}:${second<10?'0':''}${second}`;
    })

    const destroyTimer = () => {
      clearInterval(timer);
      timer = null;
      closeLockScreen.value();
    }
    /* 结束专注模式 */
    const closeFocus = () => {
      /* to do */
      changeLockState.value();
    }

    onMounted(() => {
      
      state.percentage = (state.currTime / state.maxSecond) * 100;
      
      timer = setInterval(() => {
        addCurrTime.value();
        state.percentage = (state.currTime / state.maxSecond) * 100;
        if (state.currTime >= state.maxSecond) {
          destroyTimer();
        }
      }, 1000);
    })
    onUnmounted(() => {
      destroyTimer();
    })

    return {
      ...toRefs(state),
      formatTime,
      closeFocus,
    }
  }
});
</script>
<style lang="scss" scoped>
#lock-screen {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/lock_background.gif") no-repeat center/cover;
  :deep(.n-space) {
    margin-top: 1rem !important;
  }
}
</style>