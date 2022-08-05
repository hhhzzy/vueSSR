<template>
    <div class="home">
        <h1>{{ initData.title }}</h1>
        <h1>{{ initData.content }}</h1>
        <img src="../assets/logo.png" alt="" />
        <input type="text" v-model="mo" />
        <el-dialog title="提示" :visible.sync="mo" width="30%" :modal-append-to-body="false">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <input type="text" v-model="mo" />
                <input type="text" />
                <input type="text" />
                <el-button @click="mo = false">取 消</el-button>
                <el-button type="primary" @click="goto">确 定</el-button>
            </span>
        </el-dialog>
        <button @click="clk">点击</button>
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
        private mo = false
        // 计算属性，初始化函数执行后获取保存到vuex的值
        get initData() {
            return this.$store.state.initData.homeInitData
        }
        public goto() {
            this.$router.push({
                path: '/about'
            })
        }
        public mounted() {
            console.log(process.env, 5565656)
        }
        public clk() {
            this.mo = true
        }
    }
</script>
