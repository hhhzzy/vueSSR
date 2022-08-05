const server = require('express')
const app = server()
const path = require('path')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')

// 通过vue-server-renderer创建渲染器
// const renderer = createBundleRenderer(serverBundle, {
//     runInNewContext: false,
//     template, // 使用HTML模板
//     clientManifest // 将客户端的构建结果清单传入
// })
// 把dist静态资源挂载到node服务中
app.use(server.static(path.resolve(process.cwd(), 'dist')))
// const Vue = require('vue')
// 渲染的数据
// const content = new Vue({
//     template: '<div ><h1>hello vue ssr</h1><button @click="sayHellow">点击事件</button></div>',
//     methods: {
//         sayHellow() {
//             alert('say hellow')
//         }
//     }
// })

const setupDevServer = require('../config/setup-dev-server.js')
const isProd = process.env.NODE_ENV === 'production' // 是否为正式环境
let onReady
let renderer
if (isProd) {
    // 正式环境
    // 加载服务端代码
    const serverBundle = path.resolve(process.cwd(), 'dist', 'vue-ssr-server-bundle.json')
    // 加载客户端的代码
    const clientManifestPath = path.resolve(process.cwd(), 'dist', 'vue-ssr-client-manifest.json')
    const clientManifest = require(clientManifestPath)
    // 加载模板
    const template = fs.readFileSync(path.resolve(__dirname, 'index_ssr.html'), 'utf-8')
    renderer = createBundleRenderer(serverBundle, {
        runInNewContext: false,
        template, // 使用HTML模板
        clientManifest // 将客户端的构建结果清单传入
    })
} else {
    // 开发环境
    // 定义一个函数setupDevServer，获取到构建好的文件（客户端+服务端）后重新创建渲染器renderer
    onReady = setupDevServer(app, (template, serverBundle, clientManifest) => {
        renderer = createBundleRenderer(serverBundle, {
            runInNewContext: false,
            template, // 使用HTML模板
            clientManifest // 将客户端的构建结果清单传入
        })
    })
}
// 渲染函数
const render = async (req, res) => {
    const context = {
        url: req.url
    }
    // 判断是否为正式环境，await onReady等待新的渲染器renderer创建完成
    if (!isProd) await onReady
    renderer.renderToString(context, (err, html) => {
        if (err) {
            res.send('500 server error')
            return
        }
        res.send(html)
    })
}
app.get('*', render)

// 服务端渲染
// app.get('*', async (req, res) => {
//     const context = {
//         url: req.url
//     }
//     console.log(context)
//     // 通过renderToString渲染完成的HTML页面
//     // require('vue-server-renderer')
//     //     .createRenderer()
//     //     .renderToString(content, (err, html) => {
//     //         if (err) {
//     //             console.log(err)
//     //             res.send('500 server error')
//     //             return
//     //         }
//     //         res.send(html)
//     //     })
//     renderer.renderToString(context, (err, html) => {
//         if (err) {
//             console.log(err)
//             res.send('500 server error')
//             return
//         }
//         res.send(html)
//     })
// })
app.listen(8088, () => {
    console.log('listen:8088')
})
