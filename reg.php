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


?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script src="js/angular.js"></script>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
    <!-- <link rel="stylesheet" href="css/fontIcon/iconfont.css"/>-->
    <link rel="stylesheet" href="css/RegAndLogin.css"/>
    <script src="js/reg.js"></script>
    <script type="text/javascript" src="js/errorCode.js"></script>
    <title></title>
</head>
<body ng-app="myApp" ng-controller="myForm">
<div class="nav navbar-inverse navbar-fixed-top addCarTitle">
    <h2>
        <!--
                <a href="#" class="back-icon pull-left"><i class="iconfont">&#xe60e;</i></a>
        -->
        账号注册
    </h2>
</div>
<div class="container" >
    <form ng-submit="myFormSubmit()" name="my_Form" id="myForm">
        <div id="name" class="form-group">
            <label>昵称：</label><span class="nameNeed" style="color: #dddddd;font-size: 12px;line-height: 17px">昵称要大于0个字符，小与32个字符</span>
            <input type="text" required id="uname" name="uname" class="form-control userBlur" placeholder="昵称"
                   ng-model="formData.uname">
            <span class=" form-control-feedback"
                  ng-show="my_Form.uname.$dirty && my_Form.uname.$valid"></span>
        </div>
        <div id="uids" class="form-group">
            <label>账号：</label><span id="uidspan" style="color: #dddddd;font-size: 12px;line-height: 17px">请以邮箱格式注册</span>
            <!--<span
                class="idNeed"
                style="visibility: hidden; color: #ff0000;font-size: 12px;line-height: 17px">，长度需小与32个字符</span>-->
            <input type="email" required id="uid" name="uid" class="form-control idBlur" placeholder="邮箱格式"
                   ng-model="formData.uid">
                      <span class=" form-control-feedback"
                            ng-show="my_Form.uid.$dirty && my_Form.uid.$valid"></span>
        </div>
        <div id="pwd" class="form-group">
            <label>密码：</label><span class="pwdNeed" style="color: #dddddd;font-size: 12px;line-height: 17px">密码长度大于5个字符，小与32个字符</span>
            <input type="password" required id="pw" name="pw" class="form-control pwdBlur" placeholder="密码"
                   ng-model="formData.pw">
            <span class=" form-control-feedback"
                  ng-show="my_Form.pw.$dirty && my_Form.pw.$valid"></span>
        </div>
        <div id="pwd2" class="form-group">
            <label>核对密码：</label><span class="error"
                                      style="visibility: hidden;color: #ff0000;font-size: 12px;line-height: 17px">与第一次输入不相同</span>
            <input type="password" required id="pwd3" name="pwd3" class="form-control repwdBlur" placeholder="核对密码"
                   >
        </div>
        <div id="imeis" class="form-group">
            <label>IMEI:</label>
            <input type="tel" name="imei" id="imei" required class="form-control" placeholder="IMEI"
                   ng-model="formData.imei">
            <span class="help-block"></span>
        </div>
        <div id="KEYs" class="form-group">
            <label>激活码:</label>
            <input type="tel" name="key" id="key" required class="form-control" placeholder="激活码"
                   ng-model="formData.key">
            <span class="help-block"></span>
        </div>

        <input type="submit" ng-disabled="my_Form.$invalid" value="提交" id="submit-btn"
               class="submit btn btn-success  btn-block"/>


    </form>
</div>
<div class="errorTips" style="display: none">
    <div class="errorTip">
        <p>
            注册失败！
        </p>
        <p>
            {{ec}}
        </p>
        <button class="btn btn-block btn-success cancel1">确定</button>
    </div>
</div>
<div class="s_tips" style="display: none">
    <div class="s_tip">
        <p>注册成功！</p>

        <p>页面将在<span id="time" style="color: #ff0000">1</span>秒后进入账号</p>
        <button class="btn btn-success cancel">确定</button>
    </div>
</div>
</body>
</html>
