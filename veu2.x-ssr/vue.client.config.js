const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
module.exports = {
    productionSourceMap: false,
    configureWebpack: () => ({
        entry: `./src/client-entry.js`, // 客户端入口文件，默认打包输出地址为dist
        devtool: 'source-map',
        target: 'web',
        // 文件夹通过@定位到src
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        plugins: [new VueSSRClientPlugin()]
    }),
    chainWebpack: config => {
        // 去除所有关于客户端生成的html配置，因为已经交给后端生成
        config.plugins.delete('html')
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
    }
}
