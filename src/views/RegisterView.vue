<template>
  <access-basic>
    <template #content>
      <form action="" id="registerForm">
        <n-input placeholder="用户名" 
          v-model:value="registerForm.username" 
          style="width: 50%" 
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
          style="width: 50%"
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
            style="width: 50%"
            clearable
          >
          <template #prefix>
            <svg-icon iconName="password"></svg-icon>
          </template>
        </n-input>
      </form>
      <n-button type="primary" @click="register" style="width: 50%;">
        注册
      </n-button>
      <div>已注册过, 直接<router-link to="/login">登录</router-link></div>
      
    </template>
  </access-basic>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useMessage } from "naive-ui";
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

      if (state.registerForm.usernameStatus != 'success')  message.info("用户名由字母数字组成且必须以字母开头");
    }
    const checkPassword = (password) => {
      let re1 = new RegExp("^[a-zA-Z][a-zA-Z0-9]*$");
      let re2 = new RegExp("^$");

      state.registerForm.passwordStatus = re1.test(password) ? 'success' :
        state.registerForm.passwordStatus = re2.test(password) ? null : 'error';
      if (state.registerForm.passwordStatus != 'success')  message.info("密码由字母数字组成");
    }
    const checkConfirmPassword = (confirmPassword) => {
      state.registerForm.confirmPasswordStatus = confirmPassword == state.registerForm.password ? 'success' : 'error';
      if (state.registerForm.passwordStatus != 'success')  message.info("确保两次输入的密码一致");
    }

    const register = () => {
      // let registerForm = this.registerForm;
      // if (registerForm.username === '' || registerForm.password === '') {
      //   alert('账号或密码不能为空');
      // } else {
      //   let option = {
      //     url: 'http://192.168.11.110:8080/api/login',
      //     data: registerForm
      //   }
      //   this.$getData(option, (res)=>{
      //     if (!res.success) {
      //       throw new Error('无法通过验证，请确保账号已注册')
      //     }
      //     let token = {
      //       accessToken: res.data.accessToken,
      //       refreshToken: res.data.refreshToken,
      //     }
      //     // let url = 'http://40.65.153.77' // 暴露token的域名(发布版本)
      //     let url = 'http://192.168.11.110'
      //     this.$setCookie('token', token, 2, url, true)  // token有效期为2天
      //     this.$router.push('/todo/item')
      //   }, (err)=>{alert('账号或密码错误')})
      // }  
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

