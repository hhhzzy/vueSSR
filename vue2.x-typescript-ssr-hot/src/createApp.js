import Vue from 'vue'
import App from './App.vue'
import createRouter from './router/index.ts'
import createStore from './store/index.ts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// Vue.mixin({
//     beforeMount() {
//         const { asyncData } = this.$options
//         if (asyncData) {
//             asyncData({
//                 store: this.$store,
//                 route: this.$route
//             })
//         }
//     }
// })
Vue.use(ElementUI)
// 防止交叉感染，每次都要创建一个新的实例
// 正常的spa单页面请求的时候，每次是从服务器上面请求html文件，然后在加载js、css等资源，都会在本地浏览器上创建Vue实例，不会感染。
// ssr的时候是在express服务上面创建的Vue实例，因为开启的是同一个进程，使用的是同一个实例
export default function createApp() {
    const router = createRouter() // 创建router实例
    const store = createStore() // 创建store实例
    const app = new Vue({
        router, // 把router注入到根组件
        store, // 把store注入到根组件
        render: h => h(App)
    })
    return {
        router,
        store,
        app
    }
}
