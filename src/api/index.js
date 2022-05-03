import initInterceptors from './interceptors/index.js'
import axios from 'axios'
import store from '../store/index.js';


const request = axios.create({
  baseURL: 'http://localhost:3000/api',
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
  uploadImage: '/user/uploadImage',
  downloadImage: '/user/downloadImage'
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
        id: store.state.userId,
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
  }
}


export default {
  refreshToken,
  login,
  register,
  user,
  todo
}