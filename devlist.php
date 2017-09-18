<?php
$_POST['action'] = '21';
$_POST['token'] = $_GET['token'];

require_once('../data/bin/act_init.php');
$rqs = new act_init();
$t_token = $rqs->checkToken();
 //var_dump($t_token);
if($t_token['errorcode']!='0'){
    echo '链接过期,请重新点击查询车辆按钮';
    exit();
}

?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    <link rel="stylesheet" href="libs/Mobiscroll/mobiscroll.core-2.5.2.css"/>
    <link rel="stylesheet" href="libs/Mobiscroll/mobiscroll.animation-2.5.2.css"/>
    <link rel="stylesheet" href="libs/Mobiscroll/mobiscroll.android-ics-2.5.2.css"/>
    <link rel="stylesheet" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/mystyle.css"/>
    <script src="js/angular.js"></script>
<script src="js/ui.bootstrap.accordion.js"></script>
    <script src="js/route.js"></script>
    <title></title>
</head>
<body ng-app="myApp" ng-controller="one">
<div class="menu navbar navbar-fixed-top ">
    <a id="back"  style="display: none;position: absolute;height: 50px;width: 50px;line-height: 50px" href="#/"><img
            src="./img/back.png" alt="返回"/></a>
    <a id="dback" style="display: none;position: absolute;height: 50px;width: 50px;line-height: 50px"
       href="#/manage"><img
            src="./img/back.png" alt="返回"/></a>
    <a id="dir-back" style="display: none;position: absolute;height: 50px;width: 50px;line-height: 50px" href=''><img
            src="./img/back.png" alt="返回"/></a>
    <a id="add-back" style="display: none;position: absolute;height: 50px;width: 50px;line-height: 50px" href=''><img
            src="./img/back.png" alt="返回"/></a>
    <a id="manage"
       style="display:none;position: absolute;height: 50px;width: 50px;line-height: 50px;right:0;color: #ffffff;text-align: center"
       href="#/manage">管理</a>
    <a id="add" style="display:none;position: absolute;height: 50px;width: 50px;line-height: 50px;right:0;color: #ffffff;text-align: center">添加</a>
    <a id="adddev" href="#/add_device" style="display:none;position: absolute;height: 50px;width: 50px;line-height: 50px;right:0;color: #ffffff;text-align: center">添加</a>
    <a id="directive"style="display:none;position: absolute;height: 50px;width: 50px;line-height: 50px;right:0;color: #ffffff;text-align: center" href="">指令</a>

    <h3 id="title"
        style="color:#ffffff;text-align: center;margin: 15px 20%;height: 25px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
        车辆列表
    </h3>
</div>
<div class="content">
    <ng-view id="myView">
    </ng-view>
</div>
<div class="tips" style="display: none">
    <div class="dialog" id="myLog">
        <div class="myDialog">
            <div class="my-content">
                <div class="my-header">
                    <button type="button" class="close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">提示：</h4>
                </div>
                <div class="my-body">
                    <p id="errorCode"></p>
                </div>
                <div class="my-footer">
                    <button type="button" class="btn btn-primary affirm">确定</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="warning" style="display: none">
    <div class="dialog">
        <div class="myDialog">
            <div class="my-content">
                <div class="my-header">
                    <button type="button" class="close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">提示：</h4>
                </div>
                <div class="my-body" style="text-align: center">
                    是否确定要删除该围栏？
                </div>
                <div class="my-footer">
                    <button type="button" class="btn btn-default">取消</button>
                    <button type="button" class="btn btn-primary">确定</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="load" style="display: none">
    <div class="loading">
        <img src="./img/load.gif" alt="正在加载...."/>
    </div>
    <p style="text-align: center">正在查询数据，请等待...</p>
</div>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=v56jZ8x7GCwaY4mF3wDVozrN"></script>
<script src="js/errorCode.js"></script>
<script src="js/jquery-2.1.3.min.js"></script>
<!--<script src="libs/slider/jquery-ui.min.js"></script>-->
<script src="js/bootstrap.min.js"></script>
<script src="libs/Mobiscroll/mobiscroll.core-2.5.2.js"></script>
<script src="libs/Mobiscroll/mobiscroll.core-2.5.2-zh.js"></script>
<script src="libs/Mobiscroll/mobiscroll.datetime-2.5.1.js"></script>
<script src="libs/Mobiscroll/mobiscroll.datetime-2.5.1-zh.js"></script>
<script src="libs/Mobiscroll/mobiscroll.android-ics-2.5.2.js"></script>
<!-- <script src="js/app.min.js"></script> -->
<script src="js/app.js"></script>
</body>
</html>
