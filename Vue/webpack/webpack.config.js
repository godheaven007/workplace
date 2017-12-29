const path = require('path');

module.exports = {
	// 入口文件配置项
	entry: {
		entry: './src/entry.js',
		entry2: './src/test.js'
	},

	// 出口文件配置项
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},

	// 模块：SCSS、Less文件等编译、静态资源压缩等
	module: {},

	// 插件
	plugins: [],

	// 配置webpack开发服务功能
	devServer: {
		// 配置服务器基本运行路径，用于找到程序打包地址
		contentBase: path.resolve(__dirname, 'dist'),
		// 服务器的IP地址，可以使用IP也可以使用localhost
		host: 'localhost',
		// 服务端压缩是否开启
		compress: true,
		hot:true,
		// 配置服务端口号
		port: 1212

	}
};