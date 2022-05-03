import { cookies } from '../../../utils/index.js'
const setToken = config => {
  let token = cookies.get('token');
  if (token) {
    config.headers.TOKEN = token.value.accessToken;
  }
  return config;
}

export default {
  SUCCESS: setToken
}