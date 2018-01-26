const path = require('path');
// JS文件压缩
const uglify = require('uglifyjs-webpack-plugin');
// HTML插件
const htmlPlugin = require('html-webpack-plugin');
// CSS分离提取
const extractTextPlugin = require('extract-text-webpack-plugin');

// 多个实例
const extarctSCSS = new extractTextPlugin('css/scss.css');
const extarctLESS = new extractTextPlugin('css/less.css');

console.log( encodeURIComponent(process.env.type) );
let website = {
		publicPath: "http://localhost:2265/"
	};
if(process.env.type == 'build') {
	// 生产环境
} else {
	// 开发环境
	website.publicPath = "http://xusf.cn:2265/";
}

module.exports = {
	devtool: 'source-map',
	// 入口文件配置项
	entry: {
		entry: './src/entry.js',
	},
	// 出口文件配置项
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: website.publicPath
	},
	// 模块：SCSS、Less文件等编译、静态资源压缩等
	module: {
		rules: [
			// css文件处理(打包至JS入口文件中.P.S.跟CSS分离extractTextPlugin不要混合使用)
			// {
			// 	test: /\.css$/,
			// 	use: [
			// 		{loader: "style-loader"},
			// 		{loader: "css-loader"},
			// 	]
			// },

			// CSS分离提取
			{
				test: /\.css$/,
				use: extractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader",
							options: {importLoaders:1}
						},
						"postcss-loader"
					]
				})
			},

			// scss
			{
				test:/\.scss$/,
				use: extarctSCSS.extract({
					use: [{
							loader: "css-loader"
						},
						{
							loader: "sass-loader"
						}],
					fallback: "style-loader"
				})
			},

			// less
			{
				test: /\.less$/,
				use: extarctLESS.extract({
					use: [
						{
							loader: "css-loader"
						},
						{
							loader: "less-loader"
						}
					],
					fallback: "style-loader"
				})
			},

			// 图片处理
			{
				test: /\.(png|jpg)$/,
				use:[
					{
						loader: 'url-loader',
						options: {
							limit: 5000,
							outputPath: 'images/'
						}
					}
				]
			},

			// Babel转换
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	// 插件
	plugins: [
		// new uglify({
		// 	test: /(index|entry)\.js/
		// }),

		new htmlPlugin({
			hash: true,
			template: './src/index.html'
		}),
		new extractTextPlugin({
			filename: (getPath) => {
				return 'css/index.css'
			}
		}),
		extarctSCSS,
		extarctLESS,
	],
	// 配置webpack开发服务功能
	devServer: {
		// 配置服务器基本运行路径，用于找到程序打包地址
		contentBase: path.resolve(__dirname, 'dist'),
		// 服务器的IP地址，可以使用IP也可以使用localhost
		host: 'localhost',
		// 服务端压缩是否开启
		compress: true,
		// 配置服务端口号
		port: 2265
	}
}