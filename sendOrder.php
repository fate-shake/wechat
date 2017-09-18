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
    <script type="text/javascript" src="js/back-icon.js"></script>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/fontIcon/iconfont.css"/>
    <link rel="stylesheet" href="css/sendOrder.css"/>
    <script src="js/angular.js"></script>
    <script src="js/sendOrder.js"></script>
    <title></title>
</head>
<body ng-app="myApp" ng-controller="order">
<div class="nav navbar-inverse navbar-fixed-top addCarTitle">
    <h2>
        <a href="#" class="back-icon pull-left"><i class="iconfont">&#xe60e;</i></a>
        发送指令
    </h2>
</div>
<div class="container">
<div>
    <div class="panel panel-default isHide">
        <div class="panel-heading ">
            <a>
                中心号码
            </a>
        </div>
    </div>
    <div class="hideBody" style="display: none">
        <div>
            <div class="panel-body">

                <p>中心号码：<input type="tel" id="center"/>
                    <button type="submit" id="addCenterTel" class="btn  btn-primary  center  addCenterTel">设置</button>
                    <button type="submit" id="delCenterTel" class="btn  btn-danger  center   delCenterTel">删除</button>
                </p>
                <br/>
            </div>
        </div>
    </div>
</div>
<div>
    <div class="panel panel-default isHide">
        <div class="panel-heading ">
            <a>
                SOS号码
            </a>
        </div>
    </div>
    <div class="hideBody" style="display: none">
        <div>
            <!--<div class="panel-body">
                <p>SOS号码1
                    <input type="tel" id="sos1" value="{{}}"/><input class="ckb" type="checkbox"/>
                </p>
                <br/><p>SOS号码2
                    <input type="tel" id="sos2" value="{{}}"/><input class="ckb" type="checkbox"/>
                </p>
                <br/>
                <p>SOS号码3
                    <input type="tel" id="sos3" value="{{}}"/><input class="ckb" type="checkbox"/>
                </p>
                <p style="padding: 5px">
                    <button type="submit"  class="btn  btn-primary  center   addsosTel">添加</button>
                    <button type="submit"  class="btn  btn-danger  center   delsosTel">删除</button>
                </p>
            </div>-->
            <div class="panel-body">
                <div class="input-group">
                <span class="input-group-addon">
                            1
                        </span>
                    <input type="tel" id="sos1" class="form-control" aria-label="...">
                        <span class="input-group-addon">
                            <input id="ckb1" type="checkbox" aria-label="...">
                        </span>
                </div>
                <div class="input-group">
                 <span class="input-group-addon">
                            2
                        </span>
                    <input type="tel" id="sos2" class="form-control" aria-label="...">
                        <span class="input-group-addon">
                            <input id="ckb2" type="checkbox" aria-label="...">
                        </span>
                </div>
                <div class="input-group">
                 <span class="input-group-addon">
                            3
                        </span>
                    <input type="tel" id="sos3" class="form-control" aria-label="...">
                        <span class="input-group-addon">
                            <input id="ckb3" type="checkbox" aria-label="...">
                        </span>
                </div>
                <p style="padding: 5px">
                    <button type="submit" class="btn  btn-primary  center   addsosTel">添加</button>
                    <button type="submit" class="btn  btn-danger  center   delsosTel">删除</button>
                </p>
            </div>
        </div>
    </div>
</div>
<div>
    <div class="panel panel-default isHide">
        <div class="panel-heading ">
            <a>
                监听号码
            </a>
        </div>
    </div>
    <div class="hideBody" style="display: none">
        <div>
            <div class="panel-body">

                <p>监听号码：<input type="tel" id="listen"/>
                    <button type="submit" id="addListenTel" class="btn  btn-primary  center  addListenTel">设置</button>
                </p>
                <br/>
            </div>
        </div>
    </div>
</div>
<div>
    <div class="panel panel-default isHide ">
        <div class="panel-heading ">
            <a>
                速度报警
            </a>
        </div>
    </div>
    <div class="hideBody" style="display: none">
        <div>
            <div class="panel-body">
                <form action="">
                    <p>低速设置(KM/H)
                        <input required id="lowSpeed" type="tel"/>
                    </p>

                    <p>超速设置(KM/H)
                        <input required id="overSpeed" type="tel"/>
                    </p>

                    <div class="speedCtrl">
                        <button type="submit" class="btn  btn-primary   addSpeedCtrl">设置</button>
                        <button type="submit" class="btn  btn-danger   delSpeedCtrl">删除</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<div>
    <div class="panel panel-default isHide">
        <div class="panel-heading ">
            <a>
                断油电
            </a>
        </div>
    </div>
    <div class="hideBody" style="display: none">
        <div>
            <div class="panel-body">
                <p>
                    <select id="energy">
                        <option value="reset">恢复油电</option>
                        <option value="stop">断油电</option>
                    </select>
                    <button type="submit" class="btn  btn-primary energy">设置</button>
                </p>
            </div>
        </div>
    </div>
</div>
<div>
    <div class="panel panel-default isHide">
        <div class="panel-heading ">
            <a>
                工作模式
            </a>
        </div>
    </div>
    <div class="hideBody" style="display: none">
        <div>
            <div class="panel-body">
                <p>
                    <select id="saving">
                        <option value="long">长开模式</option>
                        <option value="power">省电模式</option>
                        <option value="sleep">睡眠模式</option>
                        <option value="winterSleep">冬眠模式</option>
                    </select>
                    <button type="submit" id="myModel" class="btn  btn-primary saving">设置</button>
                </p>
                <p style="text-align: left">
                    长开模式：GPS一直开启 <br/>
                    省电模式：GPS在查询地址和移动终端时开启 <br/>
                    睡眠模式：GPS仅在查询地址时开启 <br/>
                    冬眠模式：GPS不开启
                </p>
            </div>
        </div>
    </div>
</div>
<div>
    <div class="panel panel-default isHide">
        <div class="panel-heading ">
            <a>
                震动报警
            </a>
        </div>
    </div>
    <div class="hideBody" style="display: none">
        <div>
            <div class="panel-body">
                <p style="text-align: left">
                    震动等级
                    <select id="shakeLv" style="padding: 0 10px">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3" class="active">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </p>
                持续时间
                <input type="tel" id="shakeTime">
                <br/>
                <button type="submit" id="ring" class="btn  btn-primary shake">设置</button>
                <button type="submit" class="btn  btn-danger delShake">删除</button>
                <br/>
                持续时间范围：0 ~ 60 单位：分钟
            </div>
        </div>
    </div>
</div>
<div>
    <div class="panel panel-default">
        <div class="panel-heading ">
            <a>
                更多
            </a>
        </div>
    </div>
    <div class="hideBody" style="display: none">
        <div>
            <div class="panel-body">
                <button class="btn btn-danger">more</button>
            </div>
        </div>
    </div>
</div>
</div>
<div id="s_tip" class="tip" style="display: none">
    <div id="s_tips">
        <p>设置成功！</p>
        <hr/>
        <p>
            <button class="btn btn-success closeBtn">确认</button>
        </p>
    </div>
</div>
<div id="e_tip" class="tip" style="display: none">
    <div id="e_tips">
        <p id="errortips">设置失败！请重新设置</p>
        <hr/>
        <p>
            <button class="btn btn-success closeBtn">确认</button>
        </p>
    </div>
</div>
<div class="loading" style="display: none">
    <div class="load">
        <img src="img/load.gif" alt="图片加载失败"/>

        <p>
            数据查询中.......
        </p>
    </div>
</div>
<div class="action" style="display: none">
    <div class="OK">
        <img src="img/ok.png" alt="OK"/>
        <p>
            查询成功！
        </p>
    </div>
</div>
</body>
</html>
