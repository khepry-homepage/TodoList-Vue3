<template>
  <n-drawer
    v-model:show="active"
    :placement="placement"
    :trap-focus="false"
    to="#drawer-target"
  >
    <n-drawer-content class="drawer-custom-class">
      <template v-slot:header>
        <div class="edit-header">
          <span>编辑事项</span>
          <svg-icon iconName="ok" class="cursor" :customizedStyle="{width: '1.5rem', height: '1.5rem'}"
            @click="affirmModifyTodo()"></svg-icon>
          <svg-icon iconName="cancel" class="cursor" :customizedStyle="{width: '1.5rem', height: '1.5rem'}"
            @click="closeEditWindow"></svg-icon>
        </div>
      </template>
      <template v-slot:default>
        <div class="edit-box">
            <n-space align="center" justify="center">
              <n-input size="small" round placeholder="待办事项" v-model:value="content">
                <template #suffix>
                  <span class="iconfont">
                    &#xe61a;
                  </span>
                </template>
              </n-input>
              <n-input size="small" round placeholder="所属分类" v-model:value="categoryName">
                <template #suffix>
                  <span class="iconfont">
                    &#xe638;
                  </span>
                </template>
              </n-input>
            </n-space>
            <n-space align="center" justify="center">
              <n-date-picker v-model:value="range" type="datetimerange" clearable input-readonly 
                :is-date-disabled="disablePreviousDate"/>
            </n-space>
            <n-space align="center" item-style="margin-left: 1rem;">
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-switch size="small" @update:value="handleSetAlarm" :default-value="alarmTime != null"/>
                </template>
                <span> 设置提醒 </span>
              </n-tooltip>
              <n-space v-show="needAlarm" :inline="true">
                <n-date-picker size="small" v-model:value="alarmTime" type="datetime" clearable input-readonly 
                  :is-date-disabled="disableDateRange" :disabled="!needAlarm || range == null"/>
                <n-radio-group v-model:value="repetition" name="radiogroup">
                  <n-space item-style="display: flex;" >
                    <n-radio v-for="times in alarmTimes" :key="times" :value="times">
                      {{ times }}
                    </n-radio>
                  </n-space>
                </n-radio-group>       
              </n-space>   
            </n-space>
            <n-space align="center">
              <n-select v-model:value="repeatState" :options="options" />
              <n-checkbox-group v-model:value="alarmDays" v-show="repeatState == 2">
                <n-space item-style="display: flex;" >
                  <n-checkbox :value="1" label="一" />
                  <n-checkbox :value="2" label="二" />
                  <n-checkbox :value="3" label="三" />
                  <n-checkbox :value="4" label="四" />
                  <n-checkbox :value="5" label="五" />
                  <n-checkbox :value="6" label="六" />
                  <n-checkbox :value="0" label="日" />
                </n-space>
              </n-checkbox-group>
            </n-space>
            <n-space>
              <div class="add-subtodo">
                <div class="subtodo-input">
                  <input type="text" placeholder="添加子任务" v-model="subtodoInputValue"
                    @blur="inputSubTodo">
                </div>
                <n-scrollbar style="max-height: 100px">
                  <div class="subtodo-list">
                    <div class="subtodo-item" v-for="subtodo in subtodos" :key="subtodo.id">
                      <span class="subtodo-content">{{ subtodo.content }}</span>
                      <span class="iconfont cursor" @click="delSubTodo({ id: subtodo.id })">&#xe600;</span>
                    </div>
                  </div>
                </n-scrollbar>
              </div>
            </n-space>
        </div>
      </template>
    </n-drawer-content>
  </n-drawer>
  <drag-button>
    <template v-slot:content>
      <svg-icon iconName="add" :customizedStyle="{width: '1.5rem', height: '1.5rem'}"
        @click="activate('bottom')"></svg-icon>
    </template>
  </drag-button>
</template>

<script>
import { reactive, toRefs, toRaw, onUnmounted } from 'vue'
import { nanoid } from 'nanoid'
import { useStore } from 'vuex'
import emitter from 'utils/eventbus.js'
import DragButton from 'components/DragButton.vue';
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'EditItemView',
  components: { DragButton },
  setup(props) {
    const store = useStore();
    /* 初始化编辑栏的文本内容与状态 */
    const initialContent = (ec, state) => {
      ec.id = null;
      ec.content = null;
      ec.categoryName = null;
      ec.range = null;
      ec.repetition = null;
      ec.alarmTime = null;
      ec.alarmDays = null;
      ec.subtodos = [];      

      
      state.subtodoInputValue = null;
      state.repeatState = 0;
      state.needAlarm = false;
      state.active = false;
    }

    const state = reactive({
      subtodoInputValue: null,
      repeatState: 0,
      needAlarm: false,
      options: [
        { label: '不重复', value: 0, },
        { label: '每月', value: 1, },
        { label: '每周', value: 2, },
        { label: '每日', value: 3, },
      ],
      alarmTimes: ['1次', '2次', '3次'],
      active: false,
      placement: 'bottom',
    })

    const editContent = reactive({})
    initialContent(editContent, state);
    /* 
     * 提供编辑事项的接口
     * 接受事项的已有内容初始化编辑栏
     */
    const editItem = (todo) => {
      if (typeof(todo) != 'object') {
        return;
      }
      let alarmDays = [];
      for (let i = 0, repetition = todo.repetition; repetition != 0; repetition >>= 1, i++) {
        if (repetition & 1) {
          alarmDays.push(i);
        }
      }
      editContent.id = todo.id;
      editContent.categoryName = todo.categoryName;
      editContent.content = todo.content;
      editContent.range = [new Date(todo.startTime).getTime(), new Date(todo.endTime).getTime()];
      if (todo.alarmTime) {
        const [ alarmTime ] = todo.alarmTime;
        editContent.alarmTime = new Date(alarmTime).getTime();
        state.needAlarm = true;
      }
      if (todo.repetition) {
        editContent.alarmDays = alarmDays;
        state.repeatState = 2;
      }
      editContent.subtodos = cloneDeep(todo.subtodos); 
      state.active = true;      
    }
    emitter.on('editItem', editItem); // 注册事件
    onUnmounted(() => {
      emitter.off('editItem', editItem); // 销毁事件
    })

    /* 禁选过去日期 */
    const disablePreviousDate = (ts) => {
      return ts <= Date.now();
    }
    /* 禁用特定时期 */
    const disableDateRange = (ts) => {
      if (editContent.range == null) {
        editContent.alarmTime = null;
        return true;
      }
      return ts <= Date.now() || ts >= editContent.range[0];
    }
    const handleSetAlarm = (value) => {
      state.needAlarm = value;
      editContent.repetition = null;
      editContent.alarmTime = null;
    } 

    // 子任务输入框失焦时调用
    const inputSubTodo = () => {
      if (state.subtodoInputValue == null || state.subtodoInputValue.trim() == '')  return;
      let content = state.subtodoInputValue.trim();
      addSubTodo({ content });
      state.subtodoInputValue = null;
    }
    // 添加子任务
    const addSubTodo = ({ content }) => {
      let subtodo = {content, id: nanoid()};
      editContent.subtodos.push(subtodo);
    }
    // 删除子任务
    const delSubTodo = ({ id }) => {
      editContent.subtodos = editContent.subtodos.filter(subtodo => subtodo.id != id);
    }

    const activate = (place) => {
      state.active = true;
      state.placement = place;
    };
    /*
     * flag: 0 表示添加事项
     * flag: 1 表示修改事项 
     */
    const affirmModifyTodo = () => {
      if (!todoIsValid()) {
        return;
      }
      let flag = 1;
      if (editContent.id == null) {
        editContent.id = nanoid();
        flag = 0;
      }
      store.commit('createTodoItem', { flag, todo: cloneDeep(toRaw(editContent)) });
      initialContent(editContent, state);
    }
    const closeEditWindow = () => {
      initialContent(editContent, state);
      state.active = false;
    }
    const todoIsValid = () => {
      if (!editContent.content || editContent.content == '' || editContent.range == null ) {
        return false;
      }
      return true;
    }


    return {
      ...toRefs(state),
      ...toRefs(editContent),
      disablePreviousDate,
      disableDateRange,
      handleSetAlarm,
      inputSubTodo,
      delSubTodo,
      activate,
      affirmModifyTodo,
      closeEditWindow
    };
  }
};
</script>
<style lang="scss" scoped>
.edit-box {
  background-color: rgb(240, 239, 239);
  border: 1px solid darkgray;
  height: 16rem;
  padding-top: 0.5rem;
}
.add-subtodo {
  margin-top: 1rem;
  margin-left: 1rem;
  width: calc(100vw - 2rem);
  background-color: rgb(240, 239, 239);
  input[type=text] {
    border: none;
    border-bottom: 1px solid darkgray;
    outline: none;
    background-color: rgb(240, 239, 239);
  }
  input[type=text]:hover {
    border-bottom: 1px solid rgb(128, 207, 9);
  }
  input[type=text]:focus {
    box-shadow: 0 0.5px 0.5px rgb(122, 199, 8);
  }
}
.subtodo-input {
  text-align: left;
}
.subtodo-input::before {
  font-family: "iconfont" !important;
  content: "\e648";
}
.subtodo-list {
  padding-left: 1.5rem;
  .subtodo-item {
    display: flex;
    align-items: center;
    text-align: left;
    span {
      display: inline-block;
    }
    .subtodo-content {
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.subtodo-content::before {
  display: inline-block;
  font-family: "iconfont" !important;
  content: "\e613";
}
.drawer-custom-class {
  :deep(.n-drawer-body-content-wrapper) {
    padding: 0 !important;
  }
  :deep(.n-drawer-header__main) {
    width: 100% !important;
  }
}

.edit-header {
  width: 100%;
  display: flex;
  align-items: center;
  span {
    margin-right: calc(100% - 12rem);
  }
  svg {
    margin-left: 1.5rem;
    border-radius: 0.3rem;
  }
  svg:nth-child(2) {
    color: rgb(121, 241, 121);
    box-shadow: 0 0 3px rgb(96, 214, 96);
    background-color: rgb(203, 241, 203);
  }
  svg:nth-child(3) {
    color: rgb(238, 93, 26);
    box-shadow: 0 0 3px rgb(231, 85, 17);
    background-color: rgb(248, 167, 130);
  }
}
</style>