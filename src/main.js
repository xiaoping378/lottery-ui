// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import VueI18n from 'vue-i18n'

Vue.use(Vuex)
Vue.use(VueI18n);
//引用Store全局存储
import store from './store';
const messages = {
  zh: require('./assets/lang/cn'),
  en: require('./assets/lang/en')
}
const i18n = new VueI18n({
  locale: 'zh', // 语言标识
  messages
})

Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  components: {App},
  template: '<App/>'
})
