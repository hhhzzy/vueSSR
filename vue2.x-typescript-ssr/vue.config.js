const WEBPACK_TARGET = process.env.WEBPACK_TARGET // 获取到通过cross-env设置的WEBPACK_TARGET的值
const serverConfig = require('./vue.server.config') // 引入服务端打包入口文件
const clientConfig = require('./vue.client.config') // 引入客户端打包入口文件

if (WEBPACK_TARGET === 'node') {
    module.exports = serverConfig
} else {
    module.exports = clientConfig
}
