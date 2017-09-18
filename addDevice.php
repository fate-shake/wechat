<?php
$_POST['action'] = '22';
$_POST['token'] = $_GET['token'];
require_once('../data/bin/act_init.php');
$rqs = new act_init();
$t_token = $rqs->checkToken();
if($t_token['errorcode']!='0'){
    echo '链接过期,请重新点击查询车辆按钮';
    exit();
}

?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/back-icon.js"></script>
    <script type="text/javascript" src="js/angular.min.js"></script>
    <script type="text/javascript" src="js/submitForm.js"></script>
    <script src="js/errorCode.js"></script>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/fontIcon/iconfont.css"/>
    <link rel="stylesheet" href="css/AddAndDelCar.css"/>
    <title></title>
</head>
<body ng-app="myForm" ng-controller="formCtrl">
<div class="nav navbar-fixed-top addCarTitle">
    <h2>
        <a href="devlist.php?token={{array.token}}" class=" pull-left"><i class="iconfont">&#xe60e;</i></a>
        添加设备
         <!--       <a href="" class="pull-right"><i class="iconfont">&#xebb5;</i></a>-->
    </h2>
</div>
<div class="container">
    <form ng-submit="processForm()" name="my_Form" id="myForm">
        <!-- IMEI -->
        <div id="IMEI-group" class="form-group" has-feedback>
            <label>IMEI</label>
            <input type="tel" required id="imei" name="imei" class="form-control" placeholder="设备IMEI"
                   ng-model="formData.imei">
            <span class="glyphicon glyphicon-ok form-control-feedback"
                  ng-show="my_Form.imei.$dirty && my_Form.imei.$valid"></span>
        </div>

        <!--  激活码 -->
        <div id="KEY-group" class="form-group">
            <label>激活码</label>
            <input type="tel" name="key" required id="key" class="form-control" placeholder="激活码" ng-model="formData.key">
            <span class="help-block"></span>
        </div>

        <!-- SUBMIT BUTTON -->
        <input type="submit" ng-disabled="my_Form.$invalid" value="提交" id="submit-btn"
               class="submitAgain btn btn-success  btn-block"/>


    </form>
    <!-- SHOW DATA FROM INPUTS AS THEY ARE BEING TYPED -->
    <!--<pre>
        {{ formData }}
    </pre>-->
    <div class="input_tips">
        <p style="color: red">提示：</p>

        <p>
            IMEI和激活码都可以从你的设备上获得。
        </p>
    </div>
    <div class="show">

    </div>
</div>
<div class="successTips" style="display: none">
    <div class="tips-body">
        <p>设备添加成功</p>
        <button class="btn btn-success cancel">确定</button>
    </div>
</div>
<div class="errorTips" style="display: none">
    <div class="tips-body">

        <p>设备添加失败</p>
		<!-- <p>
            错误码{{errorcode}}
        </p> -->
        <p>{{ec}}</p>
        <button class="btn btn-success cancel">确定</button>
    </div>
</div>
</body>
</html>
