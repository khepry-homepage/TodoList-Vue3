<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { zhCN, dateZhCN } from 'naive-ui'
import { useStore } from 'vuex'
const store = useStore();
/** 
 * 设置日历主题
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides = {
  "DatePicker": {
    "itemCellWidth": "28px",
    "itemCellHeight": "24px",
    "panelExtraFooterPadding": "4px 8px",
    "scrollItemHeight": "20px",
    "scrollItemWidth": "40px",
    "itemSize": "16px",
    "calendarTitleGridTempateColumns": "14px 14px 1fr 14px 14px",
    "itemFontSize": "14px",
    "calendarDaysFontSize": "14px",
    "calendarTitleFontSize": "14px",
    "calendarDaysHeight": "16px",
    "calendarRightPaddingDatetime": "0 0 ",
    "calendarRightPaddingDaterange": "0 0 0 0",
    "calendarRightPaddingDate": "0 0 0 0",
    "calendarLeftPaddingDatetimerange": "0px 0px",
    "calendarLeftPaddingDaterange": "0px 0px 0px 0px",
    "calendarLeftPaddingDatetime": "0px 0px",
    "calendarLeftPaddingDate": "0px 0px 0px 0px",
    "panelHeaderPadding": "2px 2px",
    "calendarRightPaddingDatetimerange": "0 0 "
  }
}
/* 初始化vuex全局状态 */
if (sessionStorage.getItem("store")) {
  store.replaceState(
    Object.assign(
      {},
      store.state,
      JSON.parse(sessionStorage.getItem("store"))
    )
  );
}

window.addEventListener("beforeunload", function () {
  this.sessionStorage.setItem("store", JSON.stringify(store.state));
})
</script>

<template>

  <n-config-provider class="config-provider" :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </n-config-provider>
  
</template>
<style>
/* 浏览器窗口缩放时重新计算html字体标准大小 */
@media screen {
  /* 设计稿大小: 480 * 800 */
  html {
    font-size: 3.33vw;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
  background-color: #fff;
}
.config-provider {
  height: 100%;
}
.cursor {
  cursor: pointer;;
}
</style>
