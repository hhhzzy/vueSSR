<template>
    <div class="about-box">
        <h1>about</h1>
        <button @click="gotoDetail('62ce7d9e0d8a8a5bde9ef55f')">进入详情一</button>
        <button @click="gotoDetail('62cd274d0d8a8a5bde9ef39c')">进入详情二</button>
        <!-- <ul>
            <li v-for="(item,index) in resultData" :key="index">{{item.name}}</li>
        </ul> -->
        <h2>{{resultData.name}}</h2>
        <h3>{{resultData.summary}}</h3>
    </div>
</template>
<script>
import axios from 'axios'
import store from '../store/index'
export default {
    data(){
        return {
            result:{}
        }
    },
    asyncData({ store, route }) {
        // 触发 action 后，会返回 Promise
        console.log(route.query.id,111111);
        return store.dispatch('initData/add_content', route.query.id || '62a8395ee1dc82578c849439')
    },
    // 计算属性
    computed:{
        // 返回vuex中获取的初始化的值
        resultData(){
            return this.$store.state.initData.content
        }
    },
    methods:{
        gotoDetail(id){
            this.$router.push({
                path:'/about',
                query:{
                    id: id
                }
            })
        }
    },
    mounted(){
        console.log('hellow this is my tel')
        // axios.get('https://www.hoom.xin:7001/api/web/findArticle?pageSize=10&currentPage=1').then(res => {
        //     console.log(res)
        //     if(res){
        //         this.result = res.data.data.result
        //     }
        // })
    }
}
</script>