<template>
    <div class="home">
        <h1>{{ initData.title }}</h1>
        <h1>{{ initData.content }}</h1>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component({
        // 初始化函数
        asyncData({ store, route }) {
            // 触发 action 后，会返回 Promise
            return store.dispatch('initData/home_init_data')
        },
        name: 'home',
        components: {}
    })
    export default class Home extends Vue {
        // 计算属性，初始化函数执行后获取保存到vuex的值
        get initData() {
            return this.$store.state.initData.homeInitData
        }
        public mounted() {
            console.log(process.env, 5565656)
        }
    }
</script>
