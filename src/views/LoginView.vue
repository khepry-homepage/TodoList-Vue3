<template>
  <access-basic>
    <template #content>
      <form action="" id="loginForm" autocomplete="on">
        <n-input placeholder="用户名" v-model:value="loginForm.username" style="width: 60%" :status="loginForm.usernameStatus"
          :on-change="checkUsername"
          :input-props="{ autocomplete: 'on' }"
          clearable>
          <template #prefix>
            <svg-icon iconName="username"></svg-icon>
          </template>
        </n-input>
        <n-input
          type="password"
          show-password-on="click"
          placeholder="密码"
          :input-props="{ autocomplete: 'on' }"
          :maxlength="8"
          v-model:value="loginForm.password"
          :status="loginForm.passwordStatus"
          :on-change="checkPassword"
          style="width: 60%"
          clearable
        >
          <template #prefix>
            <svg-icon iconName="password"></svg-icon>
          </template>
        </n-input>
      </form>

      <n-button type="primary" @click="login" style="width: 60%;">
        登录
      </n-button>
      <router-link to="/register">
        注册
      </router-link>
    </template>
  </access-basic>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useMessage } from "naive-ui";
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { cookies, api } from 'utils/index.js'
import AccessBasic from './AccessBasic.vue';

export default defineComponent({
  components: { AccessBasic },
  setup() {
    const message = useMessage();
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      loginForm: {
        usernameStatus: 'null',
        passwordStatus: 'null',
        username: 'user1',
        password: 'user1'
      }
    })
    
    const checkUsername = (username) => {
      let re1 = new RegExp("^[a-zA-Z][a-zA-Z0-9]*$");
      let re2 = new RegExp("^$");
      state.loginForm.usernameStatus = re1.test(username) ? 'success' :
        state.loginForm.usernameStatus = re2.test(username) ? null : 'error';

      if (state.loginForm.usernameStatus != 'success')  message.error("用户名由字母数字组成且必须以字母开头");
    }
    const checkPassword = (password) => {
      let re1 = new RegExp("^[a-zA-Z][a-zA-Z0-9]*$");
      let re2 = new RegExp("^$");

      state.loginForm.passwordStatus = re1.test(password) ? 'success' :
        state.loginForm.passwordStatus = re2.test(password) ? null : 'error';
      if (state.loginForm.passwordStatus != 'success')  message.error("密码由字母数字组成");
    }

    const login = () => {
      api.login({ loginForm: state.loginForm })
        .then(res => {
          if (res.code != 200) {
            message.error(res.msg);
            return;
          }
          let token = {
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          }
          cookies.set('token', token, 2, window.location.hostname, false)  // token有效期为2天
          router.push({ name: 'ListView' });
        })
    }

    return {
      ...toRefs(state),
      checkUsername,
      checkPassword,
      login,
    }
  }
})
</script>

<style lang="scss" scoped>
#loginForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .n-input {
    margin-top: 0.5rem;
  }
}
</style>

