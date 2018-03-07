const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

// 获取NODE环境变量,区分开发、正式环境
const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: "web",
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                // loader: "vue-loader"
                use: [
                    {
                        loader: "vue-loader"
                    }
                ]
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    // 将读取到的css内容插入至<style></style>中
                    "style-loader",
                    // css-loader读取css内容
                    "css-loader"
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        // 依赖于file-loader
                        loader: "url-loader",
                        options: {
                            // 小于limit值,打包成base64;否则,直接源文件输出
                            limit: 10240,
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new htmlWebpackPlugin()
    ],
};

if(isDev) {
    // config.devtool = '#cheap-module-eval-source-map';
    // 开发环境
    config.devServer = {
        port: 8000,
        // host: '192.168.1.125',
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        hot: true
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    // 正式环境
}

module.exports = config;