<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="doAction.php?act=addUser" method="post">
        <table cellpadding="0" cellspacing="0" bgcolor="#ABCDEF">
            <tr>
                <td>姓名：</td>
                <td><input type="text" name="userName" placeholder="请输入您的姓名" required='required'></td>
            </tr>
            <tr>
                <td>年龄：</td>
                <td><input type="number" name="userAge" id="age" required='required'></td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;"><input type="submit" value="添加"></td>
            </tr>
        </table>
    </form>
</body>
</html>