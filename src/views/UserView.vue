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
                :src="avatarSrc"
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
          <n-space id="avatar" class="cursor" @click="showModal = !showModal">
            更换头像
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
    const showModalRef = ref(false);
    const avatarSrc = ref("../assets/error.jpg");
    const fileList = ref([]);


    emitter.on('showUserView', activate);
    onBeforeUnmount(() => {
      emitter.off('showUserView', activate);
    })
    return {
      active,
      placement,
      fileList,
      avatarSrc,
      showModal: showModalRef,
      activate,
      onNegativeClick() {
        showModalRef.value = false;
      },
      onPositiveClick() {
        /* to do */
        if (!fileList.value.length) return;
        let reader = new FileReader();
        let file = fileList.value[0].file;
        reader.readAsDataURL(file);

        reader.onload = function () {
          avatarSrc.value = reader.result;
          showModalRef.value = false; 
        }
        
      },
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