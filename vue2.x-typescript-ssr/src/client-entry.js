import createApp from './createApp' // 引入Vue实例

const { app, store, router } = createApp()
if (window.__INITIAL_STATE__) {
    // 激活状态数据，把服务端渲染注入的全局变量替换成客户端store中
    store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
    // 客户端的数据预取（非首屏渲染页面的数据预取）。在浏览器上直接输入网址打开的页面为预渲染的页面（首屏渲染），通过$router.push()等跳转的页面为非首屏渲染页面
    router.beforeResolve((to, from, next) => {
        // 返回当前路由的组件
        const matched = router.getMatchedComponents(to)
        // 返回上一个路由的组件
        const prevMatched = router.getMatchedComponents(from)
        // 判断路由组件是否复用。不复用，则执行asyncData函数，复用则不执行asyncData函数
        let diffed = false
        // typescript模式下需要从options中取组件
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = prevMatched[i].options !== c.options)
        })
        const asyncDataHooks = activated.map(c => c.options.asyncData).filter(_ => _)
        if (!asyncDataHooks.length) {
            return next()
        }

        Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
            .then(() => {
                next()
            })
            .catch(next)
    })
    app.$mount('#app', true)
})
