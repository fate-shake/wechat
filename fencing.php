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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    <script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=v56jZ8x7GCwaY4mF3wDVozrN"></script>
    <script type="text/javascript" src="js/back-icon.js"></script>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/fontIcon/iconfont.css"/>
    <script src="js/angular.min.js"></script>
    <script src="js/fencing.js"></script>
    <link rel="stylesheet" href="css/fencing.css"/>
    <script src="js/errorCode.js"></script>
    <title></title>
</head>
<body ng-app="myApp" ng-controller="fencing">
<div class="flex-box">
    <div class="navbar myTitle">
        <a class="back-icon" href=""><i class="iconfont">&#xe60e;</i></a>

        <p>围栏</p>

        <!--<div class=" pull-right nav-menu">
            <a class="fencing pull-right" id="fencing">
                <i class="iconfont">&#xe65b;</i>
            </a>
        </div>-->
    </div>
    <div class="container">
        <div id="map"></div>
        <div class="fc_now">
            <p id="fenceMessage">
                当前围栏
            </p>
        </div>
    </div>
 <!--   <div class="right-menu" id="right-menu" style="display: none">
        <div class="right_part">
            <div class="select_1">
                <p>请选择围栏类型：</p>
                <select name="type" id="type">
                    <option selected value="进入">进入</option>
                    <option value="超出">超出</option>
                    <option value="跨越">跨越</option>
                </select>
            </div>
            <div class="select_2">
                <p>选择或输入围栏范围：</p>
                <select name="scope" id="scope">
                    <option selected value="围栏一">围栏一</option>
                    <option value="围栏二">围栏二</option>
                    <option value="围栏三">围栏三</option>
                </select>
            </div>
            <div class="select_3">
                <p>请选择围栏形状：</p>
                <select name="shape" id="shape">
                    <option selected value="circle">圆形</option>
                    <option value="square">矩形</option>
                </select>
            </div>
            <button class="btn btn-block btn-success cancel">确定</button>
        </div>
    </div>-->
    <div class="myP">
        <div class="BTmyP">
            <a><i class="iconfont">&#xe62b;</i></a>
        </div>
    </div>
    <div class="bottom-menu">
        <div class="wrap-menu">
            <div class="btn-group dropup">
                <button type="button" class="btn btn-default dropdown-toggle switch" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    查询
                </button>
                <ul class="dropdown-menu">
                    <li><a class="query">围栏一</a></li>
                    <li><a class="query">围栏二</a></li>
                    <li><a class="query">围栏三</a></li>
                </ul>
            </div>
            <div class="btn-group dropup">
                <button type="button" class="btn btn-default dropdown-toggle setFC" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    设置
                </button>
            </div>
            <div class="btn-group dropup">
                <button type="button" class="btn btn-default dropdown-toggle switch" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    删除
                </button>
                <ul class="dropdown-menu">
                    <li><a href="#" class="delFC">围栏一</a></li>
                    <li><a href="#" class="delFC">围栏二</a></li>
                    <li><a href="#" class="delFC">围栏三</a></li>
                    <li><a href="#" class="delFC">全部</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="argument" style="display: none">
        <div class="select_1">
            <select name="type" id="type">
                <option selected value="进入">进入</option>
                <option value="超出">超出</option>
                <option value="跨越">跨越</option>
            </select>
        </div>
        <div class="select_2">
            <select name="style" id="style">
                <option selected value="围栏一">围栏一</option>
                <option value="围栏二">围栏二</option>
                <option value="围栏三">围栏三</option>
            </select>
        </div>
        <div class="select_3">
            <select name="shape" id="shape" onchange="change()">
                <option selected value="square">矩形</option>
                <option  value="circle">圆形</option>
            </select>
        </div>
        <button class="btn btn-block btn-success setFencing">提交</button>
    </div>
</div>
<div class="errorTips" style="display: none">
    <div class="errorTip">
        <p>
            提示:
        </p>
        <p id="result">

        </p>
        <button class="btn btn-block btn-success determine">确定</button>
    </div>
</div>
<div class="loading" style="display: block">
    <img src="img/loading.gif" alt="数据加载中，请稍候。。。"/>
    <p>正在请求数据，请稍候......</p>
</div>
<div class="waiting" style="display: none">

</div>
<div class="delDetermine" style="display: none">
    <div>

        <p class="pull-left">是否要删除</p>
        <p id="fenceName">
xxxx
        </p>
        <button class="btn btn-default cancel">取消</button>
        <button  class="btn btn-primary set">确定</button>
    </div>
</div>
</body>
</html>
