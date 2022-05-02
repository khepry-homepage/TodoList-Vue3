import initInterceptors from './interceptors/index.js'
import axios from 'axios'


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
}

function refreshToken({ token }) {
  if (!(token.refreshToken && token.accessToken)) return null;

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


export default {
  refreshToken,
  login,
  register,
}