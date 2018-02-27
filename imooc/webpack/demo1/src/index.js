// 入口文件
// 将vue组件挂载到DOM流中
import vue from 'vue';
import App from './app.vue';

import './assets/style/test.css'
import './assets/images/bg.jpg';

let newElement = document.createElement("div");
document.body.appendChild(newElement);

new vue({
    render: (h) => h(App)
}).$mount(newElement);