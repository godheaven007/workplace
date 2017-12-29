<?php
if ($_FILES['testFile']["type"] == "image/png") {
    echo "{\"code\":0, \"msg\":\"上传成功！\"}";
} else {
    echo "{\"code\":-1, \"msg\":\"上传失败！\"}";
}
?>