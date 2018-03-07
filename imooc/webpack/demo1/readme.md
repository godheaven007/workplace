1、cross-env: 针对不同平台，设置NODE_ENV的环境变量
        MAC: NODE_ENV=production webpack --config webpack.config.js
        WINDOWS: set NODE_ENV=production webpack --config webpack.config.js
    为了兼容不同平台使用同一个命令,可以使用cross-env:
        build: cross-env NODE_ENV=production webpack --config webpack.config.js
2、webpack-dev-server版本：^3.10.0导致无法跑脚本 npm run dev, 将版本改为^2.11.0       
3、css-loader: 在JS中加载读取css; style-loader: 将读取得到的css以<style></style>插入DOM中
4、postcss: 后处理css文件(less,sass前处理css文件)
        例： test.scss => test.css =>postcss处理转换好的test.css文件