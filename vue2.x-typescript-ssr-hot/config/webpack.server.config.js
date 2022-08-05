const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
    entry: path.join(__dirname, '../src/server-entry.js'), // 服务端入口文件
    target: 'node', // 构建目标为nodejs环境
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
