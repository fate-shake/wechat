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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/back-icon.js"></script>
    <script type="text/javascript" src="js/angular.js"></script>
    <script type="text/javascript" src="js/groupManger.js"></script>

    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/fontIcon/iconfont.css"/>
    <link rel="stylesheet" href="css/AddAndDelCar.css"/>
    <!--
        <link rel="stylesheet" href="css/AddAndDelCar.css"/>
    -->
    <title></title>
</head>
<body ng-app="deleteDevice" ng-controller="delCtrl">
<div class="nav navbar-inverse navbar-fixed-top addCarTitle">
    <h2>
        <a href="javascript:void(0);" class="back-icon pull-left"><i class="iconfont">&#xe60e;</i></a>
        组管理
        <a href="javascript:void(0);"
           style="right: 5px;position: absolute;border: 1px solid #dddddd;color: #ffffff;border-radius: 15px;font-size: 18px;
           padding: 5px 10px;margin: 0px 10px;" class="add pull-right">+</a>
    </h2>
</div>
<div class="container">
    <div class="panel-group" id="accordion">
        <ul>
            <li ng-repeat="datas in mydata.datas">
                <del></del>
            </li>
        </ul>
    </div>
</div>

<div class="deleteQR" dng="" style="display: none">
    <div class="deleteQR_b">
        <h4>真的要删除该组吗？</h4>

        <p>
            <button class="btn btn-default cancel">取消</button>
            <button class="btn btn-success delGroup">确定</button>
        </p>
    </div>
</div>
<div class="rename" gname="" style="display: none">
    <div class="rename_b">
        <h4>请输入新的组名：</h4>

        <div>
            <input type="text" required id="name" name="newname" class="form-control" placeholder="新的组名"
                   ng-model="formData.IMEI">
            <span id="DNGF" style="display: none">组名不能为空！！！</span>
        </div>
        <div>
            <input type="submit" style="width: 90%" value="提交" id="submit-btn"
                   class="sendNew btn btn-success  btn-block"/>
        </div>
        <button class="btn btn-default cancel2">取消</button>
    </div>
</div>
<div class="renameTips1" style="display: none">
    <div class="renameTip">
        <p style="text-align: center">修改成功</p>
        <button class="btn btn-block btn-success cancel6">确定</button>
    </div>
</div>
<div class="renameTips2" style="display: none">
    <div class="renameTip">
        <p>修改失败</p>
        <button class="btn btn-block btn-success cancel6">确定</button>
    </div>
</div>

<div class="tips " id="tips1">
    <div class="tBody">
        <h4>
            删除成功
        </h4>
        <button id="tips1-btn" class="btn btn-success tipsOne">确定</button>
    </div>
</div>
<div class="tips" id="tips2" style="display: none">
    <div class="tBody">
        <h4>
            操作失败，错误码：嘿嘿嘿！！！
        </h4>
        <button id="tips2-btn" class="btn btn-success tipsTwo">确定</button>
    </div>
</div>
<div class="tips " id="tips3" style="display: none">
    <div class="tBody">
        <p>该组下还有设备，请将设备移动到其他组后再进行删除操作!</p>
        <button id="tips3-btn" class="btn btn-success btn-block tipsThree">确定</button>
    </div>
</div>
<div id="removeDevice" style="display: none">
    <div class="removeDevice">
        <form role="form" id="myForm">
            <div class="form-group">
                <label>请选择要移动到的组名</label>
                <select class="form-control" id="select" ng-model="selected" ng-options="a.name for a in mydata.datas">
                    <option value=""></option>
                </select>

                <p class="hiddenTip" style="text-align: center;color:orangered;display: none">设备已位于该组下</p>
            </div>
            <button type="reset" class="btn  btn-success toRemove ">确定</button>
            <button type="reset" class="btn  btn-danger cancel3">取消</button>
        </form>
    </div>
</div>
<div class="removeTip1" style="display: none">
    <div class="tip_R">
        <p>成功移动设备！！！</p>
        <button class="btn btn-success btn-block cancel4">确定</button>
    </div>
</div>
<div class="removeTip2" style="display: none">
    <div class="tip_R">
        <p>移动失败，错误代码：007</p>
        <button class="btn btn-success btn-block cancel5">确定</button>
    </div>
</div>
<div class="addGroup-body" style="display: none">
    <div class="addGroup-container">
        <p>请输入要新建的组名：</p>
        <input class="groupName form-control" type="text"/>
        <button class="btn btn-block btn-success createGroup">提交</button>
        <button class="btn btn-block btn-danger unSelect">取消</button>
    </div>
</div>
<div class="addTip_s" style="display: none">
    <div class="addTip">
        <p>添加成功</p>
        <button class="btn btn-success btn-block cancel7">确定</button>
    </div>
</div>
<div class="addTip_e" style="display: none">
    <div class="addTip">
        <p>添加失败： <span>errorCode:0000</span></p>
        <button class="btn btn-success btn-block cancel8">确定</button>
    </div>
</div>
<!--<script src="js/addDev.js"></script>-->
</body>
</html>
