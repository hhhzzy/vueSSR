const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
// const webpack = require('webpack')

module.exports = merge(baseConfig, {
    entry: {
        app: path.join(__dirname, '../src/client-entry.js')
    }, // 客户端入口文件，默认打包输出地址为dist
    devtool: 'source-map',
    target: 'web',
    plugins: [new VueSSRClientPlugin()]
    // chainWebpack: config => {
    //     // 去除所有关于客户端生成的html配置，因为已经交给后端生成
    //     config.plugins.delete('html')
    //     config.plugins.delete('preload')
    //     config.plugins.delete('prefetch')
    // }
})
