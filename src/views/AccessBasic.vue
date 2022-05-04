<template>
  <div class="user-access">
    <n-card :bordered="false">
      <template #header>
        <div class="access-header">
          <img class="todo-logo" src="../assets/logo.png">
          <h1>Just to do</h1>
        </div>
      </template>
      <template #default>
        <n-space justify="center" vertical> 
          <slot name="content"></slot>
        </n-space>
      </template>
    </n-card>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.access-header {
  .todo-logo {
    width: 8em;
    height: 8em;
    border-radius: 50%;
    background-color: black;
  }
  h1 {
    font-family: "Comic Sans MS", "Comic Sans", cursive;
    font-size: 3em;
    text-shadow: 0 0 20px #fdec84,
            10px -10px 30px #ffae35,
            20px -20px 40px #ec760c;
  }
}
.user-access {
  height: 100%;
  overflow: hidden; /* 解除坍塌，原理是提前计算块级元素高度 */
  background: url('../assets/login_background.png') no-repeat center/cover;  
  :deep(.n-input) {
    text-align: left;
  }
  .n-card {
    margin-top: 3rem;
    background: url('../assets/access_background.gif') no-repeat center/cover;
  }
}
</style>

