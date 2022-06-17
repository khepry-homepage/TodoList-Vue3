import initInterceptors from './interceptors/index.js'
import axios from 'axios'
import { store } from '../utils/index.js';


const request = axios.create({
  baseURL: 'http://106.15.177.150:8080/',
  method: 'post',
  withCredentials: true,
  timeout: 5000,
});

// 注册请求拦截器和响应拦截器
initInterceptors(request);

const api = {
  refreshToken: '/token/refresh',
  login: '/login',
  register: '/register',
  getUser: '/user/getUser',
  updateUser: '/user/updateUser',
  addTodo: '/todo/addTodo',
  queryTodo: '/todo/queryTodo',
  modifyTodo: '/todo/modifyTodo',
  uploadImage: '/user/uploadImage',
  downloadImage: '/user/downloadImage',
  completedTodo: '/statistic/completionOfCategory',
}

function refreshToken({ token }) {
  if (!(token?.refreshToken && token?.accessToken)) return Promise.resolve(null);
  return request({
    url: api.refreshToken,
    data: {
      refreshToken: token.refreshToken
    }
  });
}

function login({ loginForm }) {
  if (!(loginForm && loginForm.username && loginForm.password)) throw new Error('make sure the function params is valid');
  return request({
    url: api.login,
    data: {
      username: loginForm.username,
      password: loginForm.password,
    }
  });
}

function register({ registerForm }) {
  if (!(registerForm && registerForm.username && registerForm.password)) throw new Error('make sure the function params is valid');
  return request({
    url: api.register,
    data: {
      username: registerForm.username,
      password: registerForm.password,
      repeatPassword: registerForm.confirmPassword
    }
  });
}


const user = {
  getUser() {
    return request({
      url: api.getUser
    });
  },
  updateUser({ userInfo }) {
    return request({
      url: api.updateUser,
      data: {
        id: store.state.userInfo.userId,
        nickname: userInfo.nickname
      }
    });
  },
  uploadImage({base64Image, userId }) {
    return request({
      url: api.uploadImage,
      data: {
        base64Image,
        userId
      }
    })
  },
  downloadImage() {
    return request({
      url: api.downloadImage
    })
  }
}


const todo = {
  addTodo(item) {
    return request({
      url: api.addTodo,
      data: { ...item },
    })
  },
  modifyTodo(item) {
    return request({
      url: api.modifyTodo,
      data: { ...item },
    })
  },
  completedTodo(range) {
    let [ startTime, endTime ] = range;
    return request({
      url: api.completedTodo,
      data: {
        userId: 2,
        startTime,
        endTime
      }
    })
  },
  queryTodo() {
    return request({
      url: api.queryTodo,
      data: {
        userId: store.state.userInfo.userId,
        state: 1,
        startTime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        endTime: new Date(new Date().setHours(23, 59, 59, 999)).Format('yyyy-MM-dd hh:mm:ss'),
      }
    })
  }
}


export default {
  refreshToken,
  login,
  register,
  user,
  todo
}