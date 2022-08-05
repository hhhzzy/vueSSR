<template>
    <div class="about">
        <h1>{{ initData.title }}</h1>
        <h1>{{ initData.content }}</h1>
        <input type="text" />
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component({
        name: 'home',
        components: {},
        // 初始化函数
        asyncData({ store, route }) {
            // 触发 action 后，会返回 Promise
            return store.dispatch('initData/about_init_data')
        }
    })
    export default class Home extends Vue {
        // 计算属性，初始化函数执行后获取保存到vuex的值
        get initData() {
            return this.$store.state.initData.aboutInitData
        }
        public mounted() {
            console.log(this.$route, 5565656)
        }
    }
</script>
