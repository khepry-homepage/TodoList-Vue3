<template>
  <n-drawer v-model:show="active" width="80%" :placement="placement">
    <n-drawer-content class="user-view">
      <template #header>
        <div class="header-title">
          Just To Do
        </div>
        <n-card :bordered="false" size="small" class="user-info">
          <n-layout has-sider>
            <n-layout-sider :width="120">
              <n-avatar
                round
                :size="120"
                :src="userInfo.avatar == null ? defaultSrc : userInfo.avatar"
              />
            </n-layout-sider>
            <n-layout-content content-style="display: flex; align-items: center;">
              <n-layout content-style="padding: 1rem;">
                <n-layout-header>昵称: {{ userInfo.nickname }}</n-layout-header>
                <n-layout-footer>加入日期: 2022-4-30</n-layout-footer>
              </n-layout>
            </n-layout-content>
          </n-layout>
        </n-card>
      </template>
      <template v-slot:default>
        <n-card class="options-menu">
          <n-space id="avatar" class="cursor" @click="showModal = !showModal">
            更新头像
            <n-modal v-model:show="showModal"
                preset="dialog"
                title="修改头像"
                positive-text="确认"
                negative-text="取消"
                @positive-click="onPositiveClick"
                @negative-click="onNegativeClick">
              <template #default>
                <n-upload
                  v-model:file-list="fileList"
                  list-type="image-card"
                  :max="1"
                >
                  点击上传
                </n-upload>
                <n-divider />
              </template>              
            </n-modal>
          </n-space>
          <n-space id="update-userInfo" class="cursor" @click.prevent="showUpdateInfoModal = !showUpdateInfoModal">
            修改用户信息
            <n-modal
              v-model:show="showUpdateInfoModal"
              preset="dialog"
              title="修改用户信息"
              positive-text="确认"
              negative-text="取消"
              @positive-click="submitForm"
            >
              <n-form ref="formRef" :model="userForm" :rules="rules">
                <n-form-item path="nickname" label="昵称">
                  <n-input v-model:value="userForm.nickname" maxlength="10" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="email" label="邮箱">
                  <n-input
                    v-model:value="userForm.email"  @keydown.enter.prevent
                  />
                </n-form-item>
                <n-form-item path="phone" label="手机号">
                  <n-input
                    v-model:value="userForm.phone"  @keydown.enter.prevent
                  />
                </n-form-item>
              </n-form>
            </n-modal>
          </n-space>
          <n-space id="guide" class="cursor">
            新手指南
          </n-space>
          <n-space id="consult" class="cursor">
            客户服务
          </n-space>
          <n-popconfirm
            @positive-click="logout">
            <template #trigger>
              <n-space id="exit" class="cursor">
                退出登录
              </n-space>
            </template>
            确认退出登录?
          </n-popconfirm>
        </n-card>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
import { onBeforeUnmount, reactive, computed, toRefs, defineComponent } from "vue";
import emitter from 'utils/eventbus.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router' 
import { useMessage } from 'naive-ui';
import api from 'api/index.js'
import { cookies } from 'utils/index.js'

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const message = useMessage();
    const state = reactive({
      userInfo: computed(() => store.state.userInfo),
      userForm: {
        nickname: null,
        email: null,
        phone: null,
      },
      active: false,
      placement: 'left',
      showModal: false,
      showUpdateInfoModal: false,
      fileList: [],
      defaultSrc: new URL('../assets/error.jpg', import.meta.url).href,
      formRef: null,
    })

    const activate = (place = 'left') => {
      state.active = true;
      state.placement = place;
    };

    emitter.on('showUserView', activate);
    onBeforeUnmount(() => {
      emitter.off('showUserView', activate);
    })
    return {
      ...toRefs(state),
      activate,
      onNegativeClick() {
        state.showModal = false;
      },
      onPositiveClick() {
        /* to do */
        if (!state.fileList.length) return;
        let reader = new FileReader();
        let file = state.fileList[0].file;
        reader.readAsDataURL(file);
        
        reader.onload = function () {
          api.user.uploadImage({ base64Image: reader.result, userId: store.state.userInfo.userId })
            .then(res => {
              if (res.code != 200)  {
                message.error('上传头像失败');
                return;
              }
              store.commit('updateAvatar', reader.result);
              message.success('上传成功');
              state.showModal = false; 
            })
        }
        
      },
      logout() {
        cookies.remove('token');
        router.push({ name: 'LoginView' });
      },
      rules: {
        nickname: {
          required: true,
          trigger: "blur",
          validator: (rule, value) => {
            return /^[a-zA-Z][a-zA-Z0-9]*$/.test(value);
          }
        },
        email: {
          required: true,
          trigger: "input",
          validator: (rule, value) => {
            return /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/.test(value);
          }
        },
        phone: {
          required: true,
          trigger: "input",
          validator: (rule, value) => {
            return /^[1][378]\d{9}$/.test(value);
          }
        }
      },
      submitForm() {
        state.formRef?.validate((errors) => {
          let nickname = state.userForm.nickname;
          if (!errors) {
            api.user.updateUser({ userInfo: state.userForm })
              .then(res => {
                if (res.code != 200)  {
                  message.error("更新失败, 请重试");
                  return;
                }
                store.commit('updateUserInfo', { nickname });
                message.success("更新成功");
              })
          } else {
            message.error("请输入有效信息");
            console.log("errors", errors);
          }
        });        
      }
    };
  }
});
</script>
<style lang="scss" scoped>
.user-view {
  :deep(.n-drawer-header) {
    background-color: rgb(77, 161, 230);
  }
}
.options-menu {
  .n-space {
    color: rgb(77, 76, 76);
    font-size: 2rem;
    border-bottom: 1px solid rgb(239, 239, 245);
    &:hover {
      color: black;
      border-bottom: 1px solid rgb(77, 161, 230);
    }
    &::before, &::after {
      font-family: "iconfont" !important;
      padding: 4px;
    }
    &::after {
      position: absolute;
      right: 0;
      content: "\e625";
    }
  }
  #avatar::before {
    content: "\e763";
  }
  #update-userInfo::before {
    content: "\e62c";
  }
  #guide::before {
    content: "\e601";
  }
  #consult::before {
    content: "\e60f";
  }
  #exit::before {
    content: "\ecb3";
  }
}
.user-info {
  border-radius: 1rem;
}
.header-title {
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>