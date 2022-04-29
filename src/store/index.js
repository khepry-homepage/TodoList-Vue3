import { createStore } from 'vuex'
import { jsDateFormatter } from '../utils/index.js'
const store = createStore({
  state () {
    return {
      todos: [
        {
          "userId": 123456,
          "categoryName": "健身",
          "content": "跳绳20分钟",
          "priority": 2,
          "startTime": "2022-05-30 09:12:34",
          "endTime": "2022-07-31 08:59:59",
          "alarmTime": [
            "2022-05-30 08:55:00",
            "2022-05-30 09:00:00"
          ],
          "subtodos": '[{\"content\":\"跳绳\",\"id\":111},{\"content\":\"跑步\",\"id\":222}]',
          "repetition": 5
        },
        {
          "userId": 123456,
          "categoryName": "健",
          "content": "跳绳20分钟",
          "priority": 2,
          "startTime": "2022-05-30 09:12:34",
          "endTime": "2022-07-31 08:59:59",
          "alarmTime": [
            "2022-05-30 08:55:00",
            "2022-05-30 09:00:00"
          ],
          "subtodos": '[{"content":"跳绳10min"},{"content":"跑步20min"}]',
          "repetition": 4
        }
      ],
    }
  },
  mutations: {
    /* 
     * flag: 0 表示新建事项
     * flag: 1 表示修改原有事项
     */
    createTodoItem(state, { flag, todo }) {
      let wrapTodo = Object.create(null);
      this.commit('wrapTodo', { todo, wrapTodo });
      if (flag == 0) {
        state.todos.push(wrapTodo);
      }
      else {
        state.todos.some(todo => {
          if (todo.id == wrapTodo.id) {
            Object.assign(todo, wrapTodo);
            return true;
          }
        })
      }
    },
    // wrap the todo object
    wrapTodo(state, { todo, wrapTodo }) {
      const [ startTime, endTime ] = todo.range; 
      let repetition = 0;
      if (todo.alarmDays) {
        todo.alarmDays.forEach(alarmDay => {  
          repetition |= (1 << alarmDay);
        })
      }
      let alarmTime = null;
      if (todo.alarmTime) {
        alarmTime = [[new Date(todo.alarmTime)], [new Date(startTime)]];
      }

      wrapTodo.id = todo.id;
      wrapTodo.categoryName = todo.categoryName;
      wrapTodo.content = todo.content;
      wrapTodo.startTime = jsDateFormatter(new Date(startTime));
      wrapTodo.endTime = jsDateFormatter(new Date(endTime));
      wrapTodo.subtodos = todo.subtodos;
      wrapTodo.alarmTime = alarmTime;
      wrapTodo.repetition = repetition;
    }
  }
})

export default store

