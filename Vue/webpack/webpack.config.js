const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
	// 入口文件配置项
	entry: {
		entry: './src/entry.js',
	},

	// 出口文件配置项
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},

	// 模块：SCSS、Less文件等编译、静态资源压缩等
	module: {
		rules: [
			{
				test: /\.css$/,
				use:[
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					}
				]
			}
		]
	},

	// 插件
	plugins: [
		new uglify(),
		new htmlPlugin({
			hash: true,
			template: './src/index.html'
		})
	],

	// 配置webpack开发服务功能
	devServer: {
		// 配置服务器基本运行路径，用于找到程序打包地址
		contentBase: path.resolve(__dirname, 'dist'),
		// 服务器的IP地址，可以使用IP也可以使用localhost
		host: 'localhost',
		// 服务端压缩是否开启
		compress: true,
		// hot:true,
		// 配置服务端口号
		port: 2242

	}
};