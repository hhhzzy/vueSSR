import axios from "axios"
const state = {
    content: {},
    homeContent:{}
}

const mutations = {
    ADD_CONTENT(state,data){
        state.content = data
    },
    GET_HOME_DATA(state,data){
        state.homeContent = data
    }
}

const actions = {
    add_content({commit},data){
        return new Promise((resolve,reject) => {
            axios.get('https://www.hoom.xin:7001/api/web/detailArticle?id=' + data).then(res => {
                console.log(commit,5555)
                commit('ADD_CONTENT',res.data.data)
                resolve()
            })
        })
    },
    get_home_data({commit},data){
        return new Promise((resolve,reject) => {
            axios.get('https://www.hoom.xin:7001/api/web/findTag?pageSize=5&currentPage=1').then(res => {
                console.log(commit,666)
                commit('GET_HOME_DATA',res.data.data.result)
                resolve()
            })
        })
    }

}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
