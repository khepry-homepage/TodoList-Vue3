<template>
  <n-drawer v-model:show="active" width="80%" :placement="placement">
    <n-drawer-content class="user-view">
      <template #header>
        <div class="header-title">
          Just To Do
        </div>
        <n-card :bordered="false" size="small" class="user-info">
          <n-layout has-sider>
            <n-layout-sider width="30%">
              <n-avatar
                round
                size="big"
                src="../assets/error.jpg"
                fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
              />
            </n-layout-sider>
            <n-layout-content content-style="display: flex; align-items: center;">
              <n-layout content-style="padding: 1rem;">
                <n-layout-header>UserId</n-layout-header>
                <n-layout-footer>加入日期: 2022-4-30</n-layout-footer>
              </n-layout>
            </n-layout-content>
          </n-layout>
        </n-card>
      </template>
      <template v-slot:default>
        <n-card class="options-menu">
          <n-space id="avatar" class="cursor">
            更换头像
          </n-space>
          <n-space id="guide" class="cursor">
            新手指南
          </n-space>
          <n-space id="consult" class="cursor">
            客户服务
          </n-space>
          <n-space id="exit" class="cursor">
            退出登录
          </n-space>
        </n-card>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
import { ref, onBeforeUnmount } from "vue";
import emitter from 'utils/eventbus.js'
export default {
  name: 'UserView',
  setup() {
    const active = ref(false);
    const placement = ref("right");
    const activate = (place = 'left') => {
      active.value = true;
      placement.value = place;
    };
    
    emitter.on('showUserView', activate);
    onBeforeUnmount(() => {
      emitter.off('showUserView', activate);
    })
    return {
      active,
      placement,
      activate
    };
  }
};
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