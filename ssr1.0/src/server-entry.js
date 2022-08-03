import createApp from './createApp'

export default context => {
    const { app,router  } = createApp(context);
    return new Promise((resolve, reject) => {
        const { app, router,store } = createApp();
        // 设置服务器端 router 的位置
        router.push(context.url)
        // onReady 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return reject({
                    code: 404
                });
            }
            console.log(matchedComponents,'matchedComponents')
             // 对所有匹配的路由组件调用 `asyncData()`
             Promise.all(matchedComponents.map(Component => {
                console.log(Component, Component.asyncData, Component.name, Component.data, '4')
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    });
                }
            })).then(() => {
                // 状态传递给renderer的上下文，方便后面客户端激活数据
                context.state = store.state
                // Promise 应该 resolve 应用程序实例，以便它可以渲染
                resolve(app)
            }).catch(reject);
        }, reject)
    })
}