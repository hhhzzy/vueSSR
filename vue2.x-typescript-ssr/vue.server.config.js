const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = {
    productionSourceMap: false,
    css: {
        extract: false // 不提取 CSS
    },
    outputDir: 'serverDist', // 输出的文件路径，避免打包时被删除重置
    configureWebpack: () => ({
        entry: `./src/server-entry.js`, // 服务端入口文件
        devtool: 'source-map',
        target: 'node', // 构建目标为nodejs环境
        // 文件夹通过@定位到src
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        output: {
            libraryTarget: 'commonjs2' // 构建目标加载模式 commonjs
        },
        // 跳过 node_mdoules，运行时会自动加载，不需要编译
        externals: nodeExternals({
            allowlist: [/\.css$/] // 允许css文件，方便css module
        }),
        optimization: {
            splitChunks: false // 关闭代码切割
        },
        plugins: [new VueSSRServerPlugin()]
    })
}
