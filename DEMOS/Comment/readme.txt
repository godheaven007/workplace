1、后台如何接收前端数据？

例如：前端数据格式为：
var data = {
    name: "xxx",
    age:22
};

方式一：
前台传递JS对象：$.post("xxx.php", {prop: JSON.stringify(data)},function(){});
后台接受：$data = $_POST["prop"];    // String
          $data = json_decode($data,true);// 转换为数组或对象
          echo $data["name"];

方式二：
前台直接传递data:  $.post("xxx.php", data, function(){});
后台接受： $name = $_POST["name"];
           $age = $_POST["age"];


2、在利用表单进行提交数据时，可以利用表单序列化直接操作，没有必要获取各个input框的值


2017-09-18
PDO封装类实现插入、查询数据功能