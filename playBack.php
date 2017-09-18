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
<html ng-app="myApp">
<head lang="en">
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=v56jZ8x7GCwaY4mF3wDVozrN"></script>
    <link rel="stylesheet" href="css/bootstrap.min.css"/>
    <script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>
    <link rel="stylesheet" href="http://apps.bdimg.com/libs/jqueryui/1.10.4/css/jquery-ui.min.css">
    <!--
        <script src="http://apps.bdimg.com/libs/jquery/1.10.2/jquery.min.js"></script>
    -->
    <script src="js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/errorCode.js"></script>

    <link rel="stylesheet" href="css/fontIcon/iconfont.css"/>
    <link rel="stylesheet" href="css/playBack.css"/>
    <!--时间选择插件-->
    <script src="js/mobiscroll.core-2.5.2.js" type="text/javascript"></script>
    <script src="js/mobiscroll.core-2.5.2-zh.js" type="text/javascript"></script>
    <link href="css/mobiscroll.core-2.5.2.css" rel="stylesheet" type="text/css"/>
    <link href="css/mobiscroll.animation-2.5.2.css" rel="stylesheet" type="text/css"/>
    <script src="js/mobiscroll.datetime-2.5.1.js" type="text/javascript"></script>
    <script src="js/mobiscroll.datetime-2.5.1-zh.js" type="text/javascript"></script>
    <!-- S 可根据自己喜好引入样式风格文件 -->
    <script src="js/mobiscroll.android-ics-2.5.2.js" type="text/javascript"></script>
    <link href="css/mobiscroll.android-ics-2.5.2.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="js/timeChoose.js"></script>
    <!--<script type="text/javascript" src="js/play.js"></script>-->
    <script type="text/javascript" src="js/back-icon.js"></script>
    <!--
        <script type="text/javascript" src="js/followme.js"></script>
    -->
    <script src="js/angular.js"></script>
    <script src="js/pBack.js"></script>
</head>
<body ng-controller="getData">
<!--   头部导航  -->
<div class="navbar  myTitle">
    <a class="back-icon" href="javascript:void(0);"><i class="iconfont">&#xe60e;</i></a>

    <p>轨迹回放</p>

    <div class="nav-menu">
        <a data-status="on" class="pull-right clickList" href="javascript:void(0);">
            <i class="iconfont">&#xe637;</i>
        </a>
    </div>
</div>
<div class="container"><!--ng-controller="playCtrl"-->
    <!--加载BMap地图-->
    <div id="map"></div>
    <!--当前位置信息-->
    <div class="timeTips">
        <p>当前地点：<span class="location"></span></p>
    </div>
    <!--播放进度控件-->
    <div class="speedControl Progress" style="display: none">
        <div class="container">
            <div id="slider"></div>
        </div>
    </div>
    <!--================回放控制按钮：开始、暂停、选择时间段、弹出选择列表==============================================-->
    <div class="controlMenu">
        <div class="container">
            <div class="btn-group btn-group-justified" role="group" aria-label="...">
                <a type="button" class="btn btn-default beginIcon addPlay"><i class="iconfont">&#xe63a;</i></a>
                <a type="button" class="btn btn-default stopIcon pause"><i class="iconfont">&#xe62f;</i></a>
                <a type="button" class="btn btn-default timeIcon"><i class="iconfont">&#xe664;</i></a>
                <a type="button" class="btn btn-default clickList"><i class="iconfont">&#xe601;</i></a>
            </div>
        </div>
    </div>
    <div class="panorama">
        <div class="pano">
            <a href="#" ng-click="Panorama()"><img src="img/map_pin.png" width="40px" height="40px" alt=""/></a>
        </div>
    </div>
    <div class="pano_tip" style="color:#ff0000;visibility: hidden">
        <p>此处暂无全景信息</p>
    </div>
    <!--==============================时间段选择==================================-->
    <div class="timeChoose" id="timeDiv" style="display: none">
        <div class="chooseTime">
            <div class="chooseTime0">
                <select name="time" id="time" onchange="func()">
                    <option value="null" ></option>
                    <option selected value="oneday">最近一天</option>
                    <option value="twoday">最近两天</option>
                    <option value="threeday">最近三天</option>
                    <option value="week">最近一星期</option>
                    <option value="youlike">自定义</option>
                </select>

                <div id="errorTips" style="color: #ff0000;display: none">时间选择错误，请重新选择</div>
                <form action="" id="chooseForm" ng-submit="time" name="timeForm">
                    开始
                    <input type="text" required class="input-lg" name="appDateTime" id="appDateTime"
                           ng-model="time1"><br/>
                    结束
                    <input type="text" required class="input-lg" name="appDateTime1" id="appDateTime1"
                           ng-model="time2">
                    <input id="chooseTimeBtn" type="submit" value="提交" class="tableList btn btn-sm btn-success">
                    <button type="reset" class="btn btn-lg btn-default">重置</button>
                    <button type="button" class="btn btn-lg btn-danger">取消</button>
                </form>
            </div>
        </div>
    </div>
</div>
<!--===========回放分段选择===================================================================-->
<div class="section" id="section" style="right:-100%;display: none"><!---->
    <div class="sectionTitle">
        <span class="titleContainer">选择分段</span><a class="closeIcon" href="#"><i class="iconfont">&#xe649;</i></a>
    </div>
    <!--总行程-->
    <div class="wr">
        <div>
            <ul>
                <li class="goAll"><a href="">

                    <div class="row">
                        <div class="part-left list-title col-xs-3">
                            总路程
                        </div>
                        <div class="col-xs-3 secSecond">
                            <p>开始时间</p>

                            <p>结束时间</p>

                            <p>行驶时间</p>

                            <p>停留时间</p>

                            <p>行驶里程</p>

                            <p>平均速度</p>
                        </div>
                        <div class="part-right col-xs-6">
                            <p id="st"> {{breakPoint[0][0].datatime}}</p>
                            <!--<i class="iconfont pull-right playIcon">&#xe98b;</i>-->

                            <p id="et"> {{breakPoint[breakPoint.length-1][1].datatime}}</p>

                            <p><span>{{myTotalTime}}</span></p>

                            <p><span>{{myStayTime}}</span></p>

                            <p><span>{{(myTotalDistance | number:2 )+ "&nbsp 千米"}}</span></p>

                            <p><span>{{(mySpeed*3.6 |number:2)+"&nbsp 千米/小时"}}</span></p>
                        </div>
                    </div>
                </a></li>
                <li ng-repeat="i in breakPoint " class="go" id="{{$index}}">
                    <a href="#" id="sec{{$index}}">
                        <hello></hello>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
<div id="panorama"
     style="visibility: hidden;background: rgba(252, 249, 255, 0);height: 100%;width: 100%;z-index: -1;position: absolute;top: 0">
</div>
<div class="panorama_hide" style="display: none">
    <div class="pano_hide">
        <a href="" class="closePano"><i class="iconfont">&#xe646;</i></a>
    </div>
</div>
<div class="errorTips" style="display: none">
    <div class="errorTip">
        <!-- <p style="padding: 5px 0">错误代码：{{ec}}</p><br/> -->
        {{objs}}
        <button class="btn btn-success btn-block cancel">确定</button>
    </div>
</div>
<div class="loadIcon" style="display: none">
    <div class="loading">
        <img src="img/load.gif" alt="数据加载中..."/>
    </div>
    <p>数据加载中...</p>
</div>
<script src="js/defaultTime.js"></script>
</body>
</html>
