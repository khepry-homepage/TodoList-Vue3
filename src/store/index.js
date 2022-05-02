import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      LOCK_STATE: false,
      currTime: null,
      maxMinute: null,
      activateIdx: 0, // 导航索引
    }
  },
  mutations: {
    changeLockState(state, maxMinute) {
      if (maxMinute && typeof(maxMinute) == 'number')  this.commit('setMaxMinute', maxMinute);
      state.currTime = 0;
      state.LOCK_STATE = !state.LOCK_STATE;
    },
    addCurrTime(state) {
      state.currTime++;
    },
    setMaxMinute(state, maxMinute) {
      state.maxMinute = maxMinute;
    },
    closeLockScreen(state) {
      state.LOCK_STATE = false;
      state.currTime = null;
      state.maxMinute = null;
      window.sessionStorage.setItem('store', JSON.stringify(state));
    },
    setNavIdx(state, index) {
      state.activateIdx = index;
    }
  }
})

export default store

