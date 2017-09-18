<?php
$_POST['action'] = '21';
$_POST['token'] = $_GET['token'];
// var_dump($_POST,$_GET);
require_once('../data/bin/act_init.php');
$rqs = new act_init();
$t_token = $rqs->checkToken();
// var_dump($t_token);
if($t_token['errorcode']!='0'){
    // var_dump($t_token);
    echo '链接过期,请重新点击查询车辆按钮';
    exit();
}

// 判断是否绑定了。绑定就跳转
if($t_token['bind']=='1'){
    header("Location:devlist.php?token=".$_POST['token']);
}
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script src="js/angular.js"></script>
    <script type="text/javascript" src="js/errorCode.js"></script>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/fontIcon/iconfont.css"/>
    <link rel="stylesheet" href="css/binding.css"/>
    <title></title>
</head>
<body ng-app="myApp" ng-controller="binding">
<div class="nav navbar-inverse navbar-fixed-top Title">
    <h2>
        <!--
                <a href="#" class="back-icon pull-left"><i class="iconfont">&#xe62f;</i></a>
        -->
        账号绑定
    </h2>
</div>
<div class="container">
    <form name="myForm" id="myForm">
        <div class="form-group">
            <label for="uid">账号:</label>
            <input type="text" class="form-control" id="uid" ng-model="formData.uid" placeholder="账号">
        </div>
        <div class="form-group">
            <label for="pw">密码:</label>
            <input type="password" class="form-control" id="pw" ng-model="formData.pw" placeholder="密码">
        </div>
        <input type="submit" ng-click="submit()" value="提交" class="btn btn-success btn-block">
    </form>
</div>
<p style="text-align: center;margin-top: 10%">还没有账号? <a href="reg.php?token={{array.token}}">马上注册！</a></p>

<div class="s_tip" style="visibility: hidden">
    <div class="tip">
        <p>绑定成功！</p>

        <p>页面即将进入账号页面</p>
        <!--<p>页面将在<span id="time">1</span>秒后进入账号</p>-->
    </div>
</div>
<div class="e_tip" style="display: none">
    <div class="tip">
        <p>绑定失败!</p>

        <!-- <p>错误代码:{{returnValue.errorcode}}</p> -->
        <p>{{ec}}</p>
        <button class="cancel btn btn-success btn-block">确定</button>
    </div>
</div>
<script src="js/binding.js"></script>
</body>
</html>
