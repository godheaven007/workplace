const path = require('path');

module.exports = {
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
    plugins: [],
    devServer: {

    }
};