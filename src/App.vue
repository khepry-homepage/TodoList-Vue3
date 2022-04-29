<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { NConfigProvider, zhCN, dateZhCN } from 'naive-ui'


/** 
 * 设置日历主题
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides = {
  DatePicker: {
    "itemCellWidth": "30px",
    "itemCellHeight": "24px",
  }
}

</script>

<template>

  <n-config-provider class="config-provider" :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN">
    <router-view></router-view>
  </n-config-provider>
  
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}
.config-provider {
  height: 100%;
}
.cursor {
  cursor: pointer;;
}
</style>
