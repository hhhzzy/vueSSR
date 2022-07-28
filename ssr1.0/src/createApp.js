import Vue from 'vue';
import App from './App.vue';
import createRouter from './router/router.js'
import createStore from './store/index.js'

// Vue.mixin({
//     beforeMount() {
//         const {asyncData} = this.$options
//         if(asyncData){
//             console.log(asyncData,this.$options,'55555555555555555')
//             asyncData({
//                 store:this.$store,
//                 route: this.$route
//             });
//         }
//     }
// })

export default function createApp (context) {
    const router = createRouter() // 创建router实例
    const store = createStore()
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });
  	return {
        router,
        store,
      	app
    };
};