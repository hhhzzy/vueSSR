import createApp from './createApp' // 引入Vue实例

export default context => {
    // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
    // 以便服务器能够等待所有的内容在渲染前就已经准备就绪。
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()
        // 设置服务器端 router 的位置，获取到express传递过来的url
        router.push(context.url)
        // onReady 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return reject({
                    code: 404
                })
            }
            // 对所有匹配的路由组件调用 `asyncData()`
            Promise.all(
                matchedComponents.map(Component => {
                    // typescript只能从他的options上面取到asyncData函数，不用则为Component.asyncData
                    if (Component.options.asyncData) {
                        return Component.options.asyncData({
                            store,
                            route: router.currentRoute
                        })
                    }
                })
            )
                .then(() => {
                    // 状态传递给renderer的上下文，注入到全局变量window.__INITIAL_STATE__中，方便后面客户端激活数据
                    context.state = store.state
                    // Promise 应该 resolve 应用程序实例，以便它可以渲染
                    resolve(app)
                })
                .catch(reject)
        }, reject)
    })
}
