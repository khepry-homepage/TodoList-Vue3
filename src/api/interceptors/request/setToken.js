const setToken = config => {
  config.headers.TOKEN = window.localStorage.getItem('token');
  return config;
}

export default {
  SUCCESS: setToken
}