<template>
  <home-basic>
    <template #title>
      <div class="title">
        专注模式
      </div>
    </template>
    <template #main>
      <n-card :bordered="false">
        <template #cover>
          <img src="../assets/focus_background.jpeg">
        </template>
      </n-card>
      <n-card title="暂别手机, 遇见更好的自己" class="description" header-style="color: rgb(77, 74, 74);font-size: 1.5rem;">
        享受那份源自内心的宁静
      </n-card>
      <n-grid
        :cols="5"
        :collapsed="true"
        :collapsed-rows="5"
      >
        <n-gi
          v-for="(locktime, index) in lockTimeOptions"
          :key="locktime"
          class="lock-time"
        >
          <div @click="activateIdx = index" :class="{activate: activateIdx == index}" class="content cursor">
            <n-ellipsis style="max-width: 100%;">
              <div class="time-value">{{ locktime }}</div>
              <div class="time-unit">分钟</div>
            </n-ellipsis>
          </div>
        </n-gi>
        <n-gi suffix class="suffix" #="{ overflow }">
          <div class="content cursor" @click="showModal = true">
            <svg-icon iconName="add" customizedStyle="width: 2rem; height: 2rem; color: rgb(128, 125, 125);"></svg-icon>
          </div>
          <n-modal
            v-model:show="showModal"
            :mask-closable="false"
            preset="dialog"
            title="确认"
            positive-text="确认"
            negative-text="取消"
            @positive-click="onPositiveClick"
            @negative-click="onNegativeClick"
          >
            <template #default>
              <div>
                <n-input-number v-model:value="value" clearable :min="20" />
              </div>
            </template>
          </n-modal>
        </n-gi>
      </n-grid>
      <n-space justify="center">
        <n-button size="large" type="primary" round :disabled="!(activateIdx >= 0 && activateIdx < lockTimeOptions.length)"
          @click="changeLockState(lockTimeOptions[activateIdx])">
          <template #icon>
            <span class="button-icon">&#xe612;</span>
          </template>
          开启专注模式
        </n-button>
        <lock-screen v-if="LOCK_STATE" :currTime="currTime" :maxMinute="maxMinute" 
          :changeLockState="changeLockState" :addCurrTime="addCurrTime" :closeLockScreen="closeLockScreen"></lock-screen>
      </n-space>
    </template>
  </home-basic>
</template>

<script>
import { reactive, toRefs, ref, computed, defineComponent } from 'vue'
import HomeBasic from './HomeBasic.vue'
import LockScreen from './LockScreen.vue'
import { useMessage } from "naive-ui";
import { useStore } from 'vuex'
export default defineComponent({
  components: { HomeBasic, LockScreen },
  setup() {
    const store = useStore();

    const state = reactive({
      lockTimeOptions: [30, 60, 90],
      activateIdx: -1,
      value: 20,
      LOCK_STATE: computed(() => store.state.LOCK_STATE),
      currTime: computed(() => store.state.currTime),
      maxMinute: computed(() => store.state.maxMinute),
    })

    const message = useMessage();
    const showModalRef = ref(false);

    const initialValue = () => { state.value = 20; };

    return {
      ...toRefs(state),
      showModal: showModalRef,
      onNegativeClick() {
        showModalRef.value = false;
        initialValue();
      },
      onPositiveClick() {
        state.lockTimeOptions.push(state.value);
        message.success("添加成功");
        showModalRef.value = false;
        initialValue();
      },
      changeLockState(maxMinute) { store.commit('changeLockState', maxMinute) },
      addCurrTime() { store.commit('addCurrTime') },
      closeLockScreen() { store.commit('closeLockScreen') },
    }
  }
});
</script>
<style lang="scss" scoped>
.title {
  width: 100%;
  text-align: left;
  color: rgb(243, 243, 243);
  font-size: 2rem;
  &::before {
    margin-left: 1rem;
    font-family: "iconfont" !important;
    content: "\e68d";
  }
}
.lock-time, .suffix {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  padding: 0.5rem;
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    background-color: rgb(240, 240, 240);
    &:hover {
      background-color: rgb(221, 221, 221);
    }
    .time-value {
      color: rgb(92, 92, 92);
      font-size: 2rem;
    }
    .time-unit {
      color: rgb(128, 125, 125);
      font-size: 0.8rem;
    }
  }
}
.activate {
  background-color: rgb(86, 199, 251) !important;
  div {
    color: #fff !important;
  }
}
.description {
  :deep(.n-card__content) {
    color: rgb(187, 187, 187);
    font-size: 1rem;
  }
}
.button-icon {
  font-family: "iconfont" !important;
  vertical-align: middle;
}
</style>