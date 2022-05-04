<template>
  <access-basic>
    <template #content>
      <form action="" id="registerForm">
        <n-input placeholder="用户名" 
          v-model:value="registerForm.username" 
          style="width: 60%" 
          :input-props="{ autocomplete: 'on' }"
          :status="registerForm.usernameStatus"
          clearable>
          <template #prefix>
            <svg-icon iconName="username"></svg-icon>
          </template>
        </n-input>
        <n-input
          type="password"
          placeholder="密码"
          :maxlength="8"
          :input-props="{ autocomplete: 'on' }"
          v-model:value="registerForm.password"
          :status="registerForm.passwordStatus"
          :on-change="checkPassword"
          style="width: 60%"
          clearable
        >
        <template #prefix>
          <svg-icon iconName="password"></svg-icon>
        </template>
        </n-input>
          <n-input
            type="password"
            placeholder="确认密码"
            :maxlength="8"
            :input-props="{ autocomplete: 'off' }"
            v-model:value="registerForm.confirmPassword"
            :status="registerForm.confirmPasswordStatus"
            :on-change="checkConfirmPassword"
            style="width: 60%"
            clearable
          >
          <template #prefix>
            <svg-icon iconName="password"></svg-icon>
          </template>
        </n-input>
      </form>
      <n-button type="primary" @click="register" style="width: 60%;">
        注册
      </n-button>
      <div>已注册过, 直接<router-link to="/login">登录</router-link></div>
      
    </template>
  </access-basic>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useMessage } from "naive-ui";
import { api } from 'utils/index.js'
import AccessBasic from './AccessBasic.vue';
export default defineComponent({
  components: { AccessBasic },
  setup() {
    const message = useMessage();
    const state = reactive({
      registerForm: {
        usernameStatus: 'null',
        passwordStatus: 'null',
        confirmPasswordStatus: 'null',
        username: 'user1',
        password: 'user1',
        confirmPassword: 'user1',
      }
    })
    
    const checkUsername = (username) => {
      let re1 = new RegExp("^[a-zA-Z][a-zA-Z0-9]*$");
      let re2 = new RegExp("^$");
      state.registerForm.usernameStatus = re1.test(username) ? 'success' :
        state.registerForm.usernameStatus = re2.test(username) ? null : 'error';

      if (state.registerForm.usernameStatus != 'success')  message.error("用户名由字母数字组成且必须以字母开头");
    }
    const checkPassword = (password) => {
      let re1 = new RegExp("^[a-zA-Z][a-zA-Z0-9]*$");
      let re2 = new RegExp("^$");

      state.registerForm.passwordStatus = re1.test(password) ? 'success' :
        state.registerForm.passwordStatus = re2.test(password) ? null : 'error';
      if (state.registerForm.passwordStatus != 'success')  message.error("密码由字母数字组成");
    }
    const checkConfirmPassword = (confirmPassword) => {
      state.registerForm.confirmPasswordStatus = confirmPassword == state.registerForm.password ? 'success' : 'error';
      if (state.registerForm.confirmPasswordStatus != 'success')  message.error("确保两次输入的密码一致");
    }

    const register = () => {
      let registerForm = state.registerForm;
      // 校验
      checkUsername(registerForm.username);
      checkPassword(registerForm.password);
      checkConfirmPassword(registerForm.confirmPassword);
      if (registerForm.usernameStatus == 'success' && registerForm.passwordStatus == 'success' && registerForm.confirmPasswordStatus == 'success') {
        api.register({ registerForm: state.registerForm })
          .then(res => {
            if (res.code != 200) {
              message.error("注册失败, 已存在相同用户");
              return;
            }
            message.success("注册成功, 请返回登录");
          })
      }
    }

    return {
      ...toRefs(state),
      checkUsername,
      checkPassword,
      checkConfirmPassword,
      register,
    }
  }
})
</script>

<style lang="scss" scoped>
#registerForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .n-input {
    margin-top: 0.5rem;
  }
}
</style>

