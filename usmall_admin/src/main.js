// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'



// 引入重置类
import './assets/css/reset.css'
// 引入公共组件
import commonComponents from './components'
for(var i in commonComponents){
  Vue.component(i,commonComponents[i]);
}

// 引入vuex库
import store from './store'

// 引入过滤器
import filters from './filters'
for(var i in filters){
  Vue.filter(i,filtesr[i])
}

// 引入element -ui 组件
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi)

//图片前缀
Vue.prototype.$imgPre="http://localhost:3000"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
