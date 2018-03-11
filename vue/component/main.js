let myBtn2 = Vue.extend({
    template: "<button @click=add(5,7)>添加1{{msg}}</button>",
    data: function () {
        return {
            msg: "Chinese"
        }
    },
    methods: {
        add: function (num1, num2) {
            alert(num1 + num2);
        }
    }
});

var vm = new Vue({
    el: "#app",
    components:{
        "my-btn":myBtn2
    }
})
var vm2 = new Vue({
    el: "#app2",
})