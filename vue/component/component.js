// Vue.component('test', {
//     // template: "#test",
//     data: function() {
//         return {
//             text: "xusf"
//         }
//     },
//     methods: {
//         add: function(num1, num2) {
//             alert(num1+num2);
//         }
//     }
// })

let myBtn = Vue.extend({
    template: "<button @click=add(3,7)>添加{{msg}}</button>",
    data: function() {
        return {
            msg: "Chinese"
        }  
    },
    methods: {
        add: function(num1, num2){
            alert(num1 + num2);
        }
    }
});

Vue.component("my-btn", myBtn);