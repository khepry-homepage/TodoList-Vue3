import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      userInfo: {
        nickname: "username",
        userId: null,
        avatar: null,
        nickname: null,
        sex: null,
        avatar: null,
      },
      LOCK_STATE: false,
      currTime: null,
      maxMinute: null,
      activateIdx: 0, // 导航索引
    }
  },
  mutations: {
    updateUserInfo(state, payload) {
      state.userInfo.nickname = payload?.nickname;
    },
    updateAvatar(state, base64Image) {
      state.userInfo.avatar = base64Image;
    },
    initialLoginState(state, payload) {
      let userInfo = payload.userInfo;
      state.userInfo.userId = userInfo.id;
      state.userInfo.nickname = userInfo.nickname;
      state.userInfo.sex = userInfo.sex;
      state.userInfo.avatar = payload.userImage;
    },
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

