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
$t_token1 = $rqs->imeiOwner();
if($t_token1['errorcode']!='0'){
    echo '非法的IMEI';
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
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=v56jZ8x7GCwaY4mF3wDVozrN"></script>
    <script type="text/javascript" src="js/back-icon.js"></script>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/fontIcon/iconfont.css"/>
    <link rel="stylesheet" href="css/followMyCar.css"/>
    <script src="js/angular.min.js"></script>
    <script src="js/errorCode.js"></script>

    <title></title>
</head>
<body ng-app="myApp" ng-controller="followMe">
<div class="flex-box">
    <div class="navbar myTitle">
        <a class="back-icon" href=""><i class="iconfont">&#xe60e;</i></a>

        <p>车辆跟踪</p>
        <!--下拉菜单-->
        <div class="dropdown pull-right nav-menu">
            <a class=" dropdown-toggle pull-right" id="dropdownMenu1"
               data-toggle="dropdown" href="#">
                <i class="iconfont">&#xe622;</i>
            </a>
            <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dropdownMenu1" style="z-index: 10001">
                <li role="presentation">
                    <a role="menuitem" class="order" tabindex="-1">发送指令</a>
                </li>
                <!-- <li role="presentation">
                    <a role="menuitem" tabindex="-1" href="deviceMessage.html">设备信息</a>
                </li> -->
                <li role="presentation">
                    <a role="menuitem" class="fence" tabindex="-1" href="">设置围栏</a>
                </li>
               <!--  <li role="presentation">
                    <a role="menuitem" tabindex="-1" href="#">更多+</a>
                </li> -->
            </ul>
        </div>

    </div>
    <div class="container">
        <div id="map"></div>
        <div class="panorama panoIcon"><a href=""><img src="img/map_pin.png" alt=""/></a></div>
    </div>
</div>
<div class="pano_tip" style="visibility: hidden">
    <p>此处暂无全景数据</p>
</div>
<div class="order_tip" style="visibility: hidden">
    <p>设备离线，无法进行操作</p>
</div>
<!--<div class="errorcode" style="position: fixed;top: 100px;background: #dddddd;width: 100%">
    <p style="text-align: center">返回值{{errorCode}}</p>
</div>-->
<div class="closeIcon" style="display: none">
    <a href="" class="close"><i class="iconfont" style="color: #000000;font-size: 52px;">&#xe62a;</i></a>
</div>
<div id="panorama" style="visibility: hidden;z-index: -1">

</div>
<div class="errorTips" style="display: none">
    <div class="errorTip">
        <p>
            错误提示
        </p>
        <p>
            {{ec}}
        </p>
        <button class="btn btn-block btn-success cancel1">确定</button>
    </div>
</div>
<script type="text/javascript" src="js/followme.js"></script>
</body>
</html>
