// 处理请求和响应拦截器调度
import requestInterceptors from './request/index.js'
import responseInterceptors from './response/index.js'

/* 默认响应错误的回调函数 */
const defalutError = (error) => { console.log(error.message) };

const initInterceptors = instance => {
  // 往任务编排队列中添加请求拦截器
  for (let requestInterceptor of Object.values(requestInterceptors)) {
    instance.interceptors.request.use(
      requestInterceptor.SUCCESS, 
      requestInterceptor.ERROR | defalutError
    )
  }

  // 往任务编排队列中添加响应拦截器
  for (let responseInterceptor of Object.values(responseInterceptors)) {
    instance.interceptors.response.use(
      responseInterceptor.SUCCESS, 
      responseInterceptors.ERROR | defalutError
    )
  }
}

export default initInterceptors