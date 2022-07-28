<template>
    <div class="home-box">
        <h1>home</h1>
        <ul>
            <li v-for="(item,index) in resultData" :key="index">{{item.name}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    
    asyncData({ store, route }) {
        // 触发 action 后，会返回 Promise
        console.log('home')
        return store.dispatch('initData/get_home_data', route.query.id)
    },
    // 计算属性
    computed:{
        // 返回vuex中获取的初始化的值
        resultData(){
            return this.$store.state.initData.homeContent
        }
    },
}
</script>