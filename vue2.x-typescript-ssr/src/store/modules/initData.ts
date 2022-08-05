const state = {
    homeInitData: {},
    aboutInitData: {}
}

const mutations = {
    HOME_INIT_DATD(state: { homeInitData: object }, data: object) {
        state.homeInitData = data
    },
    ABOUT_INIT_DATA(state: { aboutInitData: object }, data: object) {
        state.aboutInitData = data
    }
}
const actions = {
    home_init_data({ commit }: { commit: Function }, data: any) {
        // 这里一定要返回Promise，以便知道数据什么时候获取到并注入到全局变量中
        return new Promise((resolve, reject) => {
            // 模拟请求
            setTimeout(() => {
                const data = {
                    title: 'hellow ssr',
                    content: '这是vue ssr服务端渲染'
                }
                commit('HOME_INIT_DATD', data)
                resolve(true)
            }, 1000)
        })
    },
    about_init_data({ commit }: { commit: Function }, data: object) {
        // 这里一定要返回Promise，以便知道数据什么时候获取到并注入到全局变量中
        return new Promise((resolve, reject) => {
            // 模拟请求
            setTimeout(() => {
                const data = {
                    title: 'hellow hzy',
                    content: '我是about页面，我进行了服务端渲染，预取了数据'
                }
                commit('ABOUT_INIT_DATA', data)
                resolve(true)
            }, 1000)
        })
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
