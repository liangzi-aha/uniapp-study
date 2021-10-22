import App from './App'
import { request } from './request/index.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false;
Vue.prototype.$request = request;
// 全局过滤器
Vue.filter('formatDate',(data)=>{
	const newData = new Date(data);
	const year = newData.getFullYear();
	const month = (newData.getMonth() + 1).toString().padStart(2,0);
	const day = newData.getDay().toString().padStart(2,0);
	return year + '-' + month + '-' + day
})

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif