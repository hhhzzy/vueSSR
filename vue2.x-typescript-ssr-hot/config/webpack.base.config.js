const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash:7].js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts'],
        alias: {
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                use: 'vue-html-loader',
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                },
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            preserveWhitespace: false
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        esModule: false,
                        ame: '[name].[ext]?[hash]',
                        outputPath: 'images'
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader'
                }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    performance: {
        hints: false
    },
    devtool: 'source-map',
    // devtool: '#cheap-module-source-map'
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: isProd ? '[name].[hash].css' : '[name].css',
            chunkFilename: isProd ? '[id].[hash].css' : '[id].css'
        })
    ]
}
