<template>
  <n-grid :cols="7">
    <n-grid-item v-for="(date, week, index) in weekDate" :key="week">
      <n-grid :cols="1">
        <n-grid-item class="todo-week">
          {{week}}
        </n-grid-item>
        <n-grid-item class="todo-date">
          <span :class="{'isToday': today == index + 1}">
            {{date}}
          </span>
        </n-grid-item>
      </n-grid>
    </n-grid-item>
  </n-grid>  
</template>

<script>
import { defineComponent, computed } from 'vue'
export default defineComponent({
  setup() {
    const today = computed(() => {
      let index = new Date().getDay()
      return index === 0 ? 7 : index;
    })  
    const weekDate = computed(() => {
      let weeks = {Mon: '', Tues: '', Wed: '', Thur: '', Fri: '', Sat: '', Sun: ''}
      const date = new Date()
      let idendity = date.getDay(); //0-6表示星期日-星期六
      idendity = idendity === 0 ? 7 : idendity
      let index = 1;
      for (let i in weeks) {
        weeks[i] = new Date(date.getTime() + (index - idendity) * 86400000).getDate()
        ++index
      }
      return weeks
    })
    return {
      today,
      weekDate
    }
  }
});
</script>

<style lang="scss" scoped>
.isToday {
  background-color: rgb(37, 192, 115);
  border-radius: 50%;
}
.todo-week,
.todo-date {
  font-size: 1.2rem;
}
.todo-week {
  font-weight: bold;
}
.todo-date {
  color: rgb(241, 241, 241);
  span {
    height: 100%;
    display: inline-block;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>
