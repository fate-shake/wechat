/**
 * Created by admin on 2016/2/25.
 */
if(1){
    e2lhost = 'http://wechat.sky200.com/action.php';
}else{
    e2lhost = 'http://wechat.sky200.com/action.php';
}

angular.module('myApp', ['ngRoute','ui.bootstrap.accordion','uib/template/accordion/accordion-group.html','uib/template/accordion/accordion.html'])
    .controller('one',['$scope','$http','$timeout','publicData', function ($scope, $http,$timeout,publicData) {
        $scope.getJs = function () {
            var str, parastr;
            var array = [];
            $scope.array = [];
            str = location.href;
            parastr = str.split("?")[1];
            parastr = parastr.split("#")[0];
            var arr = parastr.split("&");
            for (var i = 0; i < arr.length; i++) {
                array[arr[i].split("=")[0]] = arr[i].split("=")[1];
            }
            if (array.token.lastIndexOf('#') >= '0') {
                for (var j = 0; j <= array.length; j++) {
                    $scope.array.token = array.token.split("#")[0];
                }
            } else {
                $scope.array = array;
            }
            return $scope.array;

        };
        $scope.getJs();
        Array.prototype.remove = function(dx){
            for(var i=0;i<this.length;i++){
                if(this[i] === dx){
                    this.splice(i,1);
                }
            }
        };
        $('.affirm').bind('click', function () {
            $('.tips').hide();
        });
    }])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.
            when('/', {             //初次加载
                templateUrl: './template/list.html',
                controller: 'mainCtrl'
            })
            .when('/list/:id', {
                templateUrl: './template/grouplist.html'
            })
            .when('/follow/:arg', {
                templateUrl: './template/follow.html'
            })
            .when('/pBack/:arg', {
                templateUrl: './template/playback.html'
            })
            .when('/manage/', {
                templateUrl: './template/groupManage.html'
            })
            .when('/manage/:arg', {
                templateUrl: './template/manage.html'
            })
            .when('/directive/:arg', {
                templateUrl: './template/directive.html'
            })
            .when('/fencing/:arg', {
                templateUrl: './template/fence.html'
            })
            .when('/add_device/', {
                templateUrl: './template/add-device.html'
            })
    }])
    .controller('mainCtrl',['$scope','$http','$timeout','publicData',function($scope,$http,$timeout,publicData){
        $('#back')[0].style.display = 'none';
        $('#manage')[0].style.display = 'block';
        $('#directive')[0].style.display = 'none';
        $('#add').hide();
        $('#title')[0].innerText = '车辆列表';
        $scope.total = [];
        $scope.live = [];

        var request = {
            token: $scope.array.token,
            action:'grouplist'
        };
        function getData(){
           if(publicData.total.length>0){
               $scope.mydata = publicData.total;
               
           }else{
               $http({
                   method: 'POST',
                   url: e2lhost,
                   data: $.param(request),
                   timeout: 300000,
                   headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
               }).success(function (data) {
                   if (data.errorcode == '0') {
                       $scope.mydata = data.data;
			 publicData.setData(data.data);
                    
                    
                   } else {
                       $('#errorCode')[0].innerText = obj[data.errorcode];
                       $('.tips').show();
                   }
               }).error(function () {

               });
           }
        };
    
        getData();
	$scope.oneAtATime = true; 
     	
        $scope.show = function(e){
	    $scope.nodata = false;
	    $scope.load = true;
	    var request = {
                token:$scope.array.token,
                action:'devlist',
                gname: e.i.jname
            };
            if(e.$$childHead.isOpen == true){
		$scope.devlist = [];
                $http({
                    method: 'POST',
                    url: "http://wechat.sky200.com/action.php",
                    data: $.param(request),
                    timeout: 300000,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (data) {
		    $scope.load = false;
                    if (data.errorcode == '0') {
                        $scope.devlist = data.data;
			if($scope.devlist.length == 0){
                            $scope.nodata = true;
                        }else{
                            $scope.nodata = false;
                        }
			
                        console.log($scope.devlist);
                    } else {
                        $('#errorCode')[0].innerText = obj[data.errorcode];
                        $('.tips').show();
                    }
                }).error(function () {

                });
            }
        }
    }])
    .controller('g_l_group', ['$scope','$http', '$routeParams', 'publicData',function ($scope,$http ,$routeParams, publicData) {
        $scope.mydata = publicData.total;
        $scope.live = [];
        $scope.total = [];
        $scope.id = $routeParams.id;//当前点击的组名
        var request = {
            token:$scope.array.token,
            action:'devlist',
	    gname:$scope.id	
        };
        $http({
            method: 'POST',
            url: "http://wechat.sky200.com/action.php",
            data: $.param(request),
            timeout: 300000,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
            if (data.errorcode == '0') {
                $scope.devlist = data.data;
            } else {
                $('#errorCode')[0].innerText = obj[data.errorcode];
                $('.tips').show();
            }
        }).error(function () {

        });
     
        var index;
        for(var i=0;i<$scope.mydata.length;i++){
            if($scope.id == $scope.mydata[i].jname){
                index = i;
            }
        }
        $scope.part_one = $scope.mydata.slice(0, index+1);//选中组之前的组
        $scope.part_two = $scope.mydata.slice(index+1);


        publicData.setTemp($scope.mydata[$scope.id]);
        console.log($scope.part_one);
        console.log($scope.part_two);
        
    }])
    .controller('follow',['$scope','$http','$routeParams','$timeout',function ($scope, $http, $routeParams,$timeout) {
        $('#back')[0].style.display = 'block';
        $('#manage')[0].style.display = 'none';
        $('#directive')[0].style.display = 'block';
        $('#dir-back')[0].style.display = 'none';
        var imei = $routeParams.arg.split('&&')[0];
        var dname = $routeParams.arg.split('&&')[1];
     
        $('#title')[0].innerText = dname;
        $('#map').css({width: document.documentElement.clientWidth, height: document.documentElement.clientHeight - 50});
        $('#f-panorama').css({width: document.documentElement.clientWidth, height: document.documentElement.clientHeight - 50});
        $scope.map = new BMap.Map('map');
        var point = new BMap.Point(113.946532, 22.561115);
        $scope.map.centerAndZoom(point, 14);
        var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL};
        $scope.map.addControl(new BMap.NavigationControl(opts));
        var bottom_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT, offset: new BMap.Size(70, 2)});// 左上角，添加比例尺
        $scope.map.addControl(bottom_left_control);

        var request = {
            action: 'tracking',
            imei: imei,
            token: $scope.array.token
        };
        $scope.data = function () {
            $http({
                method: 'POST',
                url: "http://wechat.sky200.com/action.php",
                data: $.param(request),
                timeout: 300000,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data) {
                var data = data;
                if (data.errorcode == '0') {
                    var lng = (data.data.blng != 0) ? (data.data.blng) : data.data.lbs_blng;
                    var lat = (data.data.blat != 0) ? (data.data.blat) : data.data.lbs_blat;
                    $('#directive').attr('href', '#/directive/' + imei + '&&' + dname + '&&' + lng + '&&' + lat + '&&' + data.data.dtype);
                    $('#f_p').attr('href', '#/pBack/' + imei + '&&' + dname);
                    $scope.forPano = data.data;
                    if (!$scope.marker_new) {
                        $scope.myMarker();
                        if (data.data.blng == 0) {
                            $scope.marker_new.setPosition(new BMap.Point(lng,lat));
                            $scope.map.panTo(new BMap.Point(lng,lat));
                        } else {
                            $scope.marker_new.setPosition(new BMap.Point(lng,lat));
                            $scope.map.panTo(new BMap.Point(lng, lat));
                        }

                    } else {

                        $scope.marker_new.setPosition(new BMap.Point(lng, lat));
                        $scope.map.panTo(new BMap.Point(lng,lat));

                        if ($scope.map.getBounds().containsPoint(new BMap.Point(lng, lat)) == false || $scope.map.getBounds().containsPoint(new BMap.Point(lng, lat)) == false) {
                            $scope.map.panTo(new BMap.Point(lng,lat));
                        }
                    }
                    $scope.p1.innerHTML = "时间：" + $scope.dateChange(Date.parse(new Date((data.data.lasttime).replace(/-/g, "/"))) + 28800000);
                    if (data.data.speed == 0) {
                        $scope.p2.innerHTML = '状态：基站定位';
                    } else {
                        $scope.p2.innerHTML = "速度：" + data.data.speed / 10 + '&nbsp;&nbsp;&nbsp;&nbsp;公里/小时';
                    }
                } else {
                    $('#errorCode')[0].innerText = obj[data.errorcode];
                    $('.tips').show();
                }

            }).error(function () {

            });
            $scope.followTimer = $timeout(function () {
                $scope.data();
            }, 10000);
        };
        $scope.data();
        $scope.dateChange = function (date) {
            var date = new Date(date);
            Y = date.getFullYear() + '-';
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';//date.getDate() + ' ';
            h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';//date.getHours() + ':';
            m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';//date.getMinutes() + ':';
            s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds()); //date.getSeconds();
            return date = (Y + M + D + h + m + s);
        };
        /**
         * 自定义覆盖物
         * */
        $scope.myMarker = function () {
            function Marker(latlng) {
                this.point = latlng;
                $scope.map.addOverlay(this);
            }

            Marker.prototype = new BMap.Overlay();
            Marker.prototype.initialize = function (latlng) {
                var div = this.div = document.createElement("div");
                div.style.position = "absolute";
                div.style.backgroundColor = "rgba(255, 255, 255, 0)";
                div.style.border = "0px solid #BC3B3A";
                div.style.borderRadius = "5px";
                div.style.color = "white";
                div.style.width = "160px";
                div.style.height = "80px";
                div.style.lineHeight = "12px";
                div.style.whiteSpace = "nowrap";
                div.style.MozUserSelect = "none";
                div.style.fontSize = "12px";

                var div2 = document.createElement("div");
                div2.style.height = "50px";
                div2.style.padding = '5px 5px';
                div2.style.borderRadius = "5px";
                div2.style.color = '#129edf';
                div2.style.background = "rgba(255, 255, 255, 0.8)";
                div2.style.border = "1px solid #d3d3d3";
                div2.style.visibility = 'visible';
                div.appendChild(div2);
                $scope.p1 = document.createElement("p");
                $scope.p1.style.margin = '5px 0';
                $scope.p2 = this_p2 = document.createElement("p");
                div2.appendChild($scope.p1);
                div2.appendChild($scope.p2);

                $scope.p1.innerHTML = "时间：";
                $scope.p2.innerHTML = "速度：";

                var Icon = document.createElement("div");
                var Iconfont = document.createElement("div");
                Icon.style.borderRadius = "5px";
                Icon.appendChild(Iconfont);
                Icon.style.background = "rgba(255, 255, 255, 0)";
                Icon.style.position = "absolute";
                Icon.style.width = "160px";
                Icon.style.height = "31px";

                Iconfont.style.marginLeft = "auto";
                Iconfont.style.marginRight = "auto";
                Iconfont.style.background = "rgba(255, 255, 255, 0)";
                Iconfont.style.width = "28px";
                Iconfont.style.height = "28px";
                Iconfont.style.lineHeight = "28px";
                Iconfont.style.fontSize = "28px";
                var img = document.createElement("img");
                Iconfont.appendChild(img);
                img.style.height = "31px";
                img.style.width = "23px";
                img.style.display = 'block';

                img.src = "./img/dev.png";

                Icon.style.overflow = "hidden";
                div.appendChild(Icon);

                Icon.addEventListener('click', function () {
                    if (div2.style.visibility == 'hidden') {
                        div2.style.visibility = 'visible';
                        //div3.style.visibility = 'visible'
                    } else {
                        div2.style.visibility = 'hidden';
                        //div3.style.visibility = 'hidden'
                    }
                });

                $scope.map.getPanes().labelPane.appendChild(div);

                return div;
            };
            Marker.prototype.draw = function () {
                var pixel = $scope.map.pointToOverlayPixel(this.point);
                this.div.style.left = pixel.x - 80 + "px";
                this.div.style.top = pixel.y - 80 + "px";
            };
            Marker.prototype.setPosition = function (latlng) {
                this.point = latlng;
                var pixel = $scope.map.pointToOverlayPixel(latlng);
                this.div.style.left = pixel.x - 80 + "px";
                this.div.style.top = pixel.y - 80 + "px";
            };


            $scope.marker_new = new Marker(new BMap.Point(113.946532, 22.561098));
        };

        /*------------------全景---------------------------------------*/
        $('.pano').bind('click', function () {
            if ($scope.panorama) {
                var position = new BMap.Point($scope.forPano.blng, $scope.forPano.blat);
                var PanoramaService = new BMap.PanoramaService();
                PanoramaService.getPanoramaByLocation(position, function (data) {
                    if (data == null) {
                        $('#errorCode')[0].innerText = '该位置暂无全景数据';
                        $('.tips').show();
                    } else {
                        $scope.panorama.setPosition(position);
                        $('.panorama').css('visibility', 'visible');
                        $('.panorama').css('z-index', '3');

                    }
                })
            } else {
                $scope.panorama = new BMap.Panorama('f-panorama');
                var position = new BMap.Point($scope.forPano.blng, $scope.forPano.blat);
                var PanoramaService = new BMap.PanoramaService();
                PanoramaService.getPanoramaByLocation(position, function (data) {
                    if (data == null) {
                        $('#errorCode')[0].innerText = '该位置暂无全景数据';
                        $('.tips').show();
                    } else {
                        $scope.panorama.setPosition(position);
                        $('.panorama').css('visibility', 'visible');
                        $('.panorama').css('z-index', '3');

                    }
                });
            }
        });
        $('.closePano').bind('click', function () {

            $('.panorama').css('visibility', 'hidden');
            $('.panorama').css('z-index', '-1');
        });
        /*---------------------------------------------------------*/
        $('#directive').bind('click', function () {
            $timeout.cancel($scope.followTimer);
        });
        $('#f_p').bind('click', function () {
            $timeout.cancel($scope.followTimer);
        });
        $('#back').bind('click', function () {
            speed = 0;
            $timeout.cancel($scope.followTimer);
            $timeout.cancel($scope.playTimer);
        });


    }])
    .controller('pBack',['$scope','$http','$routeParams','$timeout','playback', function ($scope, $http, $routeParams, $timeout,playback) {
        var name = $routeParams.arg.split('&&')[1];
        $('.secList').css('height', document.documentElement.clientHeight - 50);
        $('.list').css('height', document.documentElement.clientHeight - 50);
        $('#title')[0].innerText = name + '(回放)';
        $('#pBackMap').css({width: document.documentElement.clientWidth, height: document.documentElement.clientHeight - 50});
        $scope.map1 = new BMap.Map('pBackMap');
        $scope.myGeo = new BMap.Geocoder();
        var point = new BMap.Point(113.946532, 22.561115);
        $scope.map1.centerAndZoom(point, 14);
        var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL};
        $scope.map1.addControl(new BMap.NavigationControl(opts));
        var bottom_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT, offset: new BMap.Size(70, 2)});// 左上角，添加比例尺
        $scope.map1.addControl(bottom_left_control);
        $('#back')[0].style.display = 'block';
        $('#directive').hide();
        $timeout.cancel($scope.followTimer);
        $('#manage')[0].style.display = 'none';
        $scope.getData = function (ST, ET) {
            $('.load').show();
            var imei = $routeParams.arg.split('&&')[0];
            var request = {
                action: 'playblack',
                token: $scope.array.token,
                imei: imei,
                st: ST,
                et: ET
            };
            $http({
                method: 'POST',
                url: e2lhost,
                data: $.param(request),
                timeout: 300000,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data) {
                $('.load').hide();
                $scope.map1.clearOverlays();
                if (data.errorcode == '0') {
                    $scope.data_get = data;
                    $scope.pbData = playback.filter(data);
                    if ($scope.pbData.usefulldata == undefined || $scope.pbData.usefulldata.length == 0) {
                        $('#errorCode')[0].innerText = '回放暂无数据！';
                        $('.tips').show();

                    } else {
                        $scope.drawPolyLine($scope.pbData.usefulldata);
                        $scope.drawMarker();
                        var myIcon1 = new BMap.Icon('img/startIcon.png', new BMap.Size(45, 90));
                        var marker1 = new BMap.Marker(new BMap.Point($scope.pbData.usefulldata[0].b_lng, $scope.pbData.usefulldata[0].b_lat), {icon: myIcon1});  // 创建标注
                        $scope.map1.addOverlay(marker1);
                        var myIcon2 = new BMap.Icon('img/endIcon.png', new BMap.Size(45, 90));
                        var marker2 = new BMap.Marker(new BMap.Point($scope.pbData.usefulldata[$scope.pbData.usefulldata.length - 1].b_lng, $scope.pbData.usefulldata[$scope.pbData.usefulldata.length - 1].b_lat), {icon: myIcon2});  // 创建标注
                        $scope.map1.addOverlay(marker2);
                        $('.secList').css({'display':'block','right':'0'});
                        $('.date').css('top', '-100%');
                    }

                } else {
                    $('#errorCode')[0].innerText = obj[data.errorcode];
                    $('.tips').show();
                }
            }).error(function () {

            })
        };
        $scope.drawMarker = function () {

            //绘制覆盖物
            function Marker(latlng) {
                this._point = latlng;
                $scope.map1.addOverlay(this);
            }

            Marker.prototype = new BMap.Overlay();
            Marker.prototype.initialize = function () {
                var div = this._div = document.createElement("div");
                div.style.position = "absolute";
                div.style.backgroundColor = "rgba(255, 255, 255, 0)";
                div.style.border = "0px solid #BC3B3A";
                div.style.borderRadius = "5px";
                div.style.color = "#129edf";
                div.style.width = "160px";
                div.style.height = "81px";
                div.style.lineHeight = "12px";
                div.style.whiteSpace = "nowrap";
                div.style.MozUserSelect = "none";
                div.style.fontSize = "12px";
                var div2 = document.createElement("div");
                div2.style.height = "48px";
                div2.style.borderRadius = "5px";
                div2.style.padding = '5px 5px';
                div2.style.background = "rgba(255,255,255, 0.8)";
                div2.style.border = "1px solid #d3d3d3";

                div.appendChild(div2);
                $scope.p1 = this_p1 = document.createElement("p");
                $scope.p1.style.margin = '5px 0';
                $scope.p2 = this_p2 = document.createElement("p");
                div2.appendChild($scope.p1);
                div2.appendChild($scope.p2);
                div2.style.visibility = 'visible';
                $scope.p1.innerHTML = "时间：" + $scope.pbData.usefulldata[0].GpsT;
                $scope.p2.innerHTML = "速度：" + $scope.pbData.usefulldata[0].spd;
                var Icon = document.createElement("div");
                var Iconfont = document.createElement("div");
                Icon.style.borderRadius = "5px";
                Icon.appendChild(Iconfont);
                Icon.style.background = "rgba(255, 255, 255, 0)";
                Icon.style.position = "absolute";
                Icon.style.width = "160px";
                Icon.style.height = "31px";
                Iconfont.style.marginLeft = "auto";
                Iconfont.style.marginRight = "auto";
                Iconfont.style.background = "rgba(255, 255, 255, 0)";
                Iconfont.style.width = "28px";
                Iconfont.style.height = "31px";
                Iconfont.style.lineHeight = "28px";
                Iconfont.style.fontSize = "28px";
                var img = document.createElement("img");
                Iconfont.appendChild(img);
                img.style.height = "31px";
                img.style.width = "23px";
                img.style.display = 'block';

                img.src = "./img/dev.png";

                Icon.style.overflow = "hidden";
                div.appendChild(Icon);

                Icon.addEventListener('click', function () {
                    if (div2.style.visibility == 'hidden') {
                        div2.style.visibility = 'visible';
                    } else {
                        div2.style.visibility = 'hidden';
                    }
                });

                $scope.map1.getPanes().labelPane.appendChild(div);

                return div;
            };
            Marker.prototype.draw = function () {
                var pixel = $scope.map1.pointToOverlayPixel(this._point);
                this._div.style.left = pixel.x - 80 + "px";
                this._div.style.top = pixel.y - 78 + "px";
            };
            Marker.prototype.setPosition = function (latlng) {
                this._point = latlng;
                var pixel = $scope.map1.pointToOverlayPixel(latlng);
                this._div.style.left = pixel.x - 80 + "px";
                this._div.style.top = pixel.y - 78 + "px";
            };
            $scope.marker_new = new Marker(new BMap.Point($scope.pbData.usefulldata[0].b_lng, $scope.pbData.usefulldata[0].b_lat));
        };

        $scope.reset = function () {
            $scope.i = 0;
        };
        window.playHere = function(){
            var slider = $('#slider')[0].value;
            if($scope.polyData){
                $scope.i = parseInt(slider);
                $scope.p1.innerHTML = "时间：" + $scope.polyData[$scope.i].GpsT;
                if ($scope.polyData[$scope.i].GpsS == 'L' || $scope.polyData[$scope.i].GpsS == 'B' || $scope.polyData[$scope.i].GpsS == 'W') {
                    var gps = '';
                    if ($scope.polyData[$scope.i].GpsS == 'L' || $scope.polyData[$scope.i].GpsS == 'B') {
                        gps = '基站定位';
                    } else {
                        gps = 'WiFi定位';
                    }
                    $scope.p2.innerHTML = "定位方式：" + gps;
                } else {
                    $scope.p2.innerHTML = "速度：" + $scope.polyData[$scope.i].spd / 10 + '&nbsp;&nbsp;&nbsp;&nbsp;公里/小时';

                }
                $scope.nowTime = $scope.polyData[$scope.i].GpsT;
                $scope.marker_new.setPosition(new BMap.Point($scope.polyData[$scope.i].b_lng, $scope.polyData[$scope.i].b_lat));
                if ($scope.map1.getBounds().containsPoint(new BMap.Point($scope.polyData[$scope.i].b_lng + 0.2, $scope.polyData[$scope.i].b_lat + 0.2)) == false) {
                    $scope.map1.panTo(new BMap.Point($scope.polyData[$scope.i].b_lng, $scope.polyData[$scope.i].b_lat));
                }
            }
        };
        playBack = function () {
            var total = $scope.polyData.length;
            if(speed == 0){
                speed = 2;
            }
            if ($scope.i == undefined) {
                $scope.i = 0;
            }
            $scope.siliby = $scope.i;
            if ($scope.i < $scope.polyData.length) {        //正常播放
                $scope.p1.innerHTML = "时间：" + $scope.polyData[$scope.i].GpsT;
                if ($scope.polyData[$scope.i].GpsS == 'L' || $scope.polyData[$scope.i].GpsS == 'B' || $scope.polyData[$scope.i].GpsS == 'W') {
                    var gps = '';
                    if ($scope.polyData[$scope.i].GpsS == 'L' || $scope.polyData[$scope.i].GpsS == 'B') {
                        gps = '基站定位';
                    } else {
                        gps = 'WiFi定位';
                    }
                    $scope.p2.innerHTML = "定位方式：" + gps;
                } else {
                    $scope.p2.innerHTML = "速度：" + $scope.polyData[$scope.i].spd / 10 + '&nbsp;&nbsp;&nbsp;&nbsp;公里/小时';

                }
                $scope.nowTime = $scope.polyData[$scope.i].GpsT;
                $scope.marker_new.setPosition(new BMap.Point($scope.polyData[$scope.i].b_lng, $scope.polyData[$scope.i].b_lat));
                if ($scope.map1.getBounds().containsPoint(new BMap.Point($scope.polyData[$scope.i].b_lng + 0.2, $scope.polyData[$scope.i].b_lat + 0.2)) == false) {
                    $scope.map1.panTo(new BMap.Point($scope.polyData[$scope.i].b_lng, $scope.polyData[$scope.i].b_lat));
                }
            }
            if ($scope.i < $scope.polyData.length) {
                if( $('#slider')[0]){
                    $('#slider')[0].value = $scope.i;
                    $scope.i++;
                }else{
                    play = false;
                }
            }

            if ($scope.i >= $scope.polyData.length) {
                $('#playIcon').attr('src', './img/play.png');
                $('#speedIcon').attr('src', './img/slow.png');
                speed = 0;
            }
            if (speed == 0) {
            } else {
                if (play) {
                    $scope.playTimer = $timeout(function () {
                        playBack();
                    }, (speed / 2) * 1000);
                } else {
                }
            }

        };

        $scope.drawPolyLine = function (data) {
            $scope.polyData = data;
            var polyline = new BMap.Polyline(
                [ new BMap.Point($scope.polyData[0].b_lng, $scope.polyData[0].b_lat)]
                ,
                {strokeColor: "blue", strokeWeight: 1, strokeOpacity: 1}
            );
            $scope.path = [];
            var polyPoint = [];
            for (var j = 0; j < $scope.polyData.length; j++) {
                polyPoint.push(new BMap.Point($scope.polyData[j].b_lng, $scope.polyData[j].b_lat));
            }
            $scope.polyline = new BMap.Polyline(
                polyPoint
                ,
                {strokeColor: "#0fb2ff", strokeWeight: 3, strokeOpacity: 1}
            );
            $scope.map1.addOverlay($scope.polyline);
        };
        function listMsg() {                     //填写列表的数据
            $scope.listMsg = [];
            var T_runTime = 0,
                T_stayTime = 0,
                T_distance = 0;
            for (var i = 0; i < $scope.pbData.secData.length; i++) {
                var msg = [];
                var runTime = timeCycle(Date.parse($scope.breakPoint[i][1].replace(/-/g, "/")) - Date.parse($scope.breakPoint[i][0].replace(/-/g, "/")));
                T_runTime += (Date.parse($scope.breakPoint[i][1].replace(/-/g, "/")) - Date.parse($scope.breakPoint[i][0].replace(/-/g, "/")));
                if (i + 1 < $scope.breakPoint.length) {
                    var stayTime = timeCycle(Date.parse($scope.breakPoint[i + 1][0].replace(/-/g, "/")) - Date.parse($scope.breakPoint[i][1].replace(/-/g, "/")));
                    T_stayTime += (Date.parse($scope.breakPoint[i + 1][0].replace(/-/g, "/")) - Date.parse($scope.breakPoint[i][1].replace(/-/g, "/")));
                } else {
                    var stayTime = '0秒';
                    T_stayTime += 0;
                }
                var sec = $scope.breakData($scope.breakPoint[i][0].replace(/-/g, "/"), $scope.breakPoint[i][1].replace(/-/g, "/"));
                var Distance = 0;
                for (var j = 0; j < sec.length - 1; j++) {
                    var dis = getDistance(sec[j].b_lat, sec[j].b_lng, sec[j + 1].b_lat, sec[j + 1].b_lng);
                    Distance += dis;
                }
                T_distance += Distance;

                var aveSpeed = Distance / ((Date.parse($scope.breakPoint[i][1].replace(/-/g, "/")) - Date.parse($scope.breakPoint[i][0].replace(/-/g, "/"))) / 1000);
                msg.push(dateChange(Date.parse($scope.breakPoint[i][0].replace(/-/g, "/")) + 28800000), dateChange(Date.parse($scope.breakPoint[i][1].replace(/-/g, "/")) + 28800000), runTime, stayTime, Distance / 1000, aveSpeed);
                $scope.listMsg.push(msg);
            };

            $scope.drvingTime = timeCycle(T_runTime);
            $scope.stayTime = timeCycle(T_stayTime);
            $scope.mileage = T_distance / 1000;
            $scope.aveSpeed = T_distance / (T_runTime / 1000) * 3.6;
        };

        function getDistance(lat1, lng1, lat2, lng2) {
            var dValueLat = (lat1 > lat2) ? (lat1 - lat2) : (lat2 - lat1);
            var dValueLng = (lng1 > lng2) ? (lng1 - lng2) : (lng2 - lng1);

            if ((0.0000001 > dValueLat) && (0.0000001 > dValueLng)) {
                return 0.0;
            }

            lng1 *= Math.PI / 180.0;
            lat1 *= Math.PI / 180.0;
            lng2 *= Math.PI / 180.0;
            lat2 *= Math.PI / 180.0;

            var sDistance = Math.acos(Math.cos(lat1 - lat2) - Math.cos(lat1) * Math.cos(lat2) * (1 - Math.cos(lng1 - lng2)));

            sDistance += sDistance * 6378137.0;

            return sDistance;
        };

        /*--------------*/
        function timeCycle(msd) {
            if (msd != 0) {
                var time = parseFloat(msd) / 1000;
                if (null != time && "" != time) {
                    if (time >= 60 && time < 60 * 60) { //小与一个小时
                        time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
                            parseInt(time / 60.0)) * 60) + "秒";
                    } else if (time >= 60 * 60 && time < 60 * 60 * 24) { //小与一天
                        time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
                            parseInt(time / 3600.0)) * 60) + "分钟" +
                            parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                                parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
                    } else if (time > 0 && time < 60) { //  小与一分钟
                        time = parseInt(time) + "秒";
                    } else { //大于一天
                        time = parseInt(time / 86400.0) + "天" + parseInt((parseFloat(time / 86400.0) - parseInt(time / 86400.0)) * 24) + "小时" + parseInt(((parseFloat((parseFloat(time / 86400.0) - parseInt(time / 86400.0)) * 24) - parseInt((parseFloat(time / 86400.0) - parseInt(time / 86400.0)) * 24))) * 60) + "分钟" + parseInt((parseFloat(((parseFloat((parseFloat(time / 86400.0) - parseInt(time / 86400.0)) * 24) - parseInt((parseFloat(time / 86400.0) - parseInt(time / 86400.0)) * 24))) * 60) - parseInt(((parseFloat((parseFloat(time / 86400.0) - parseInt(time / 86400.0)) * 24) - parseInt((parseFloat(time / 86400.0) - parseInt(time / 86400.0)) * 24))) * 60)) * 60) + "秒";
                    }
                }
            } else {
                time = 0 + '秒';
            }
            return time;
        };
        $(function () {         //初始化时间控件
            var currYear = (new Date()).getFullYear();
            var opt = {};
            var dateMin = new Date();
            dateMin.setMonth(dateMin.getMonth()-3);
            opt.date = {preset: 'datetime'};
            opt.datetime = { preset: 'datetime', minDate: dateMin, maxDate: new Date(), stepMinute: 5  };
            // opt.datetime = {preset: 'datetime'};
            opt.time = {preset: 'time'};
            opt.default = {
                theme: 'android-ics light', //皮肤样式
                display: 'modal', //显示方式
                mode: 'scroller', //日期选择模式
                lang: 'zh',
                startYear: currYear, //开始年份
                endYear: currYear //结束年份
            };
            $("#appDateTime0").mobiscroll($.extend(opt['date'], opt['default']));
            $("#appDateTime1").mobiscroll($.extend(opt['date'], opt['default']));
        });
        $('.secList').bind('click', function () {
            $('.secList').css({'right':'-100%','display':'none'});
        });
        $('#list').bind('click', function () {
            if (!$scope.data_get) {
                $('.express').css('left', '0%');
            } else {
                $('.secList').css({'display':'block','right':'0'});
            }

        });

        $('#speed').bind('click', function () {
            if (speed == 0) {
            } else if (speed == 2) {
                $('#speedIcon').attr('src', './img/quick.png');
                speed = 1;
            } else {
                speed = 2;
                $('#speedIcon').attr('src', './img/slow.png');
            }

        });
        $('.list').bind('click', function () {
            return false;
        });

        listen = function () {
            var select = $('#chooseTime option:selected').text();
            if (select == '自定义') {
                $('.express').css('left', '-100%');
                $('#expressForm')[0].reset();
                $('.date').css('top', '25%');
                var now = new Date();
                $('#appDateTime0')[0].value = dateChange(now - 7200000);
                $('#appDateTime1')[0].value = dateChange(now);
            }
        };
        dateChange = function (date) {
            var date = new Date(date);
            Y = date.getFullYear() + '-';
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';//date.getDate() + ' ';
            h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';//date.getHours() + ':';
            m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';//date.getMinutes() + ':';
            s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds()); //date.getSeconds();
            return date = (Y + M + D + h + m + s);
        };
        $('#choose').bind('click', function () {
            $('.express').css('left', '0');
        });
        $('.cancel0').bind('click', function () {
            $('.date').css('top', '-100%');
            $('#detailTime')[0].reset();
        });
        $('.cancel1').bind('click', function () {
            $('.express').css('left', '-100%');
            $('#expressForm')[0].reset();
        });
        $('#expressDate').bind('click', function () {
            var st = 0, et = 0;
            //su 4.8 快捷选项变成今天、昨天、前天----每天的00:00：00 - 当前时间
            var now = new Date();
            var today_zero = now - now.getHours() * 3600000 - now.getMinutes() * 60000 - now.getSeconds() * 1000; //今天0点
            var yes_zero = now - 86400000 - now.getHours() * 3600000 - now.getMinutes() * 60000 - now.getSeconds() * 1000;    //昨天0点
            var qian_zero = yes_zero - 86400000;     //前天0点
            var select = $('#chooseTime option:selected').text();
            if (select == '今天') {
                st = dateChange(today_zero - 28800000);
                et = dateChange(now - 28800000);
            } else if (select == '昨天') {
                st = dateChange(yes_zero - 28800000);
                et = dateChange(today_zero - 1000 - 28800000)
            } else if (select == '前天') {
                st = dateChange(qian_zero - 28800000);
                et = dateChange(yes_zero - 1000 - 28800000)
            }
            $('.express').css('left', '-100%');
            $scope.getData(st, et);

        });
        $('#detailDate').bind('click', function () {
            var st = $('#appDateTime0')[0].value,
                et = $('#appDateTime1')[0].value;
            if (st != '' && et != '' && Date.parse(st) < Date.parse(et)) {
                $('.date').css('top', '-100%');
                $scope.getData(dateChange(Date.parse(st) - 28800000), dateChange(Date.parse(et) - 28800000));
            }
        });

        $('.total').bind('click', function () {
            $timeout.cancel($scope.playTimer);
            $('.secList').css({'right':'-100%','display':'none'});
            $('#playIcon').attr('src', './img/stop.png');
            $scope.backData = $scope.pbData.usefulldata;
            $scope.map1.clearOverlays();
            $scope.drawPolyLine($scope.backData);
            $scope.drawMarker();
            var myIcon1 = new BMap.Icon('img/startIcon.png', new BMap.Size(45, 90));
            var marker1 = new BMap.Marker(new BMap.Point($scope.backData[0].b_lng, $scope.backData[0].b_lat), {icon: myIcon1});  // 创建标注
            $scope.map1.addOverlay(marker1);
            var myIcon2 = new BMap.Icon('img/endIcon.png', new BMap.Size(45, 90));
            var marker2 = new BMap.Marker(new BMap.Point($scope.backData[$scope.backData.length - 1].b_lng, $scope.backData[$scope.backData.length - 1].b_lat), {icon: myIcon2});  // 创建标注
            $scope.map1.addOverlay(marker2);
            $scope.reset();
            //$scope.timer = setTimeout(playBack, 1000);
            play = true;
            speed = 0;
            $scope.siliby = 0;
            playBack();
            $('#speedIcon').attr('src', './img/slow.png');
        })

    }])
    .controller('myGroup',['$scope','$http','publicData', function ($scope, $http,publicData) {
        $scope.mydata = publicData.total;
        $('#back')[0].style.display = 'block';
        $('#manage')[0].style.display = 'none';
        $('#dback')[0].style.display = 'none';
        $('#title')[0].innerText = '设备管理';
        $('#add').show();
        $('#adddev').hide();
        $('.re-gName').bind('click', function () {
            var old_gName = $(this).attr('data-gname');
            var new_gName = $('#newGname')[0].value;
            if (new_gName != '') {
                var request = {
                    action: "grouprename",
                    token: $scope.array.token,
                    gname: old_gName,
                    ngroup: new_gName
                };
                $http({
                    method: 'POST',
                    url: e2lhost,
                    data:$.param(request),
                    timeout: 300000,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (data) {
                    $('.new-group').hide();
                    $('#newGname')[0].value = '';
                    if (data.errorcode == '0') {
                        $('.tips').show();
                        $('#errorCode')[0].innerText = '修改成功！';
                       	getGroup();
                    } else {
                        $('#errorCode')[0].innerText = obj[data.errorcode];
                    }
                })
            } else {

            }

        });
	function getGroup(){
            $http({
                method: 'POST',
                url: "http://wechat.sky200.com/action.php",
                data: $.param({token:$scope.array.token,action:'grouplist'}),
                timeout: 300000,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data) {
                if (data.errorcode == '0') {
                    $scope.mydata = data.data;
                    publicData.setData(data.data);

                } else {
                    $('#errorCode')[0].innerText = obj[data.errorcode];
                    $('.tips').show();
                }
            }).error(function () {

            });
        }
        $('.unChange').bind('click', function () {
            $('.new-group').hide();
            $('#newGname')[0].value = '';
        });

        $('#add').bind('click', function () {
            $('.add-group').show();
		$('#addGname')[0].value = '';
        });
        $('.found').bind('click', function () {
            var gname = $('#addGname')[0].value;
            if (gname != '') {
                $('.add-group').hide();
                var request = {
                    gname: gname,
                    token: $scope.array.token,
                    action: 'groupadd'
                };
                $http({
                    method: 'POST',
                    url: e2lhost,
                    data: $.param(request),
                    timeout: 300000,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (data) {
                    if (data.errorcode == '0') {
                        $('#errorCode')[0].innerText = '创建成功！';
                        getGroup();
                    } else {
                        $('#errorCode')[0].innerText = obj[data.errorcode];
                    }
                    $('.tips').show();
                }).error(function () {
                    $('#errorCode')[0].innerText = '服务器连接失败';
                    $('.tips').show();
                })
            }
        });
        $('.unfound').bind('click', function () {
            $('.add-group').hide();
        });

        $('.delete').bind('click', function () {
            $('.delete-group').hide();
            var gname = $(this).attr('data-gname');
            var request = {
                action: 'groupdel',
                token: $scope.array.token,
                gname: gname
            };
            $http({
                method: 'POST',
                url: e2lhost,
                data: $.param(request),
                timeout: 300000,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data) {
                if (data.errorcode == '0') {
                    $('#errorCode')[0].innerText = '删除成功！';
                    getGroup();
                    publicData.setData($scope.mydata);
                } else {
                    $('#errorCode')[0].innerText = obj[data.errorcode];
                }
                $('.tips').show();
            }).error(function () {
                $('#errorCode')[0].innerText = '网络连接失败，请检查网络';
                $('.tips').show();
            })
        });
        $('.undelete').bind('click', function () {
            $('.delete-group').hide();
        })

    }])
    .controller('manage',['$scope','$http','$routeParams','publicData', function ($scope, $http, $routeParams,publicData) {
        $scope.mydata = publicData.total;
        $('#back')[0].style.display = 'none';
        $('#dback')[0].style.display = 'block';
        $('#directive')[0].style.display = 'none';
        $('#add').hide();
        $('#adddev').show();
        $('#add-back').hide();
        $('#add-back').attr('href', location.href);
        var gName= $routeParams.arg;
        $('.cancel').bind('click', function () {
            $('.move').hide();
        });
        $('.re-close').bind('click', function () {
            $('.rename-device').hide();
        });
        function getDevList() {
            $http({
                method:'POST',
                url: "http://wechat.sky200.com/action.php",
                data: $.param({gname:gName,token:$scope.array.token,action:'devlist'}),
                timeout: 300000,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                if(data.errorcode == 0){
                    $scope.myDevList = data.data;
                }
            })
        }
        getDevList();
        $('.moveDevice').bind('click', function () {
            var checked = $('.choose');

            var nName = $('#groupName option:selected').text();
            var imei = [];
            for (var i = 0; i < checked.length; i++) {
                var device = {};
                if (checked[i].checked == true) {
                    var did = $(checked[i]).attr('data-imei');
                    var old = $(checked[i]).attr('data-old');
                    imei.push(did);
                }
            }
            var len = imei.length;	
            var request = {
                token: $scope.array.token,
                action: 'devmov',
                imei: imei,
                ngroup: nName,
                count: len
            };
            $('.move').hide();
            $http({
                method: 'POST',
                url: e2lhost,
                data: $.param(request),
                timeout: 30000,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
            })
		.success(function (data) {
                if (data.errorcode == '0') {
                    $('#errorCode')[0].innerText = '移动成功';
                    getDevList();
                } else {
                    $('#errorCode')[0].innerText = obj[data.errorcode];
                }
                $('.tips').show();
               // $scope.$apply();
            })
        });
        $('.moveIt').bind('click', function () {
            var checked = $('.choose');
            var len = 0;
            for (var i = 0; i < checked.length; i++) {
                if (checked[i].checked == true) {
                    len = len + 1;
                }
            }
            if (len > 0) {
                $('.move').show();
            }
        });
        $('.choose-all').bind('click', function () {
            var checked = $('.choose');
            for (var i = 0; i < checked.length; i++) {
                checked[i].checked = true;
            }
        });
        $('.reverse').bind('click', function () {
            var checked = $('.choose');
            for (var i = 0; i < checked.length; i++) {
                if (checked[i].checked == true) {
                    checked[i].checked = false;
                } else {
                    checked[i].checked = true;
                }
            }
        });
        $('.unselect').bind('click', function () {
            var checked = $('.choose');
            for (var i = 0; i < checked.length; i++) {
                checked[i].checked = false;
            }
        });

        $('.re-name').bind('click', function () {
            var newName = $('#newName')[0].value;
            if (newName == '') {

            } else {
                $('.rename-device').hide();
                var did = $(this).attr('data-did');
                var request = {
                    imei: did,
                    token: $scope.array.token,
                    name: newName,
                    action: 'devrename'
                };
                $http({
                    method: 'POST',
                    url: e2lhost,
                    data: $.param(request),
                    timeout: 300000,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (data) {
                    if (data.errorcode == '0') {
                        $('#errorCode')[0].innerText = '修改成功！';
                        $('.tips').show();
                        getDevList();
                    } else {
			$('#errorCode')[0].innerText = '修改失败';
                        $('.tips').show();
                    }
                })
            }
        })

    }])
    .controller('addDevice',['$scope','$http', function ($scope, $http) {
        $('#adddev').hide();
        $('#add-back').show();
        $('#submit-btn').bind('click', function () {
            $('.load').show();
            var imei = $('#imei')[0].value;
            var key = $('#key')[0].value;
            var request = {
                action: 'devadd',
                token: $scope.array.token,
                imei: imei,
                key: key
            };
            $http({
                method: 'POST',
                url: e2lhost,
                data: $.param(request),
                timeout: 300000,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data) {
                $('.load').hide();
                if (data.errorcode == '0') {
                    $('#errorCode')[0].innerText = '添加成功！';
                } else {
                    $('#errorCode')[0].innerText = obj[data.errorcode];
                }
                $('.tips').show();
            }).error(function () {
                $('.load').hide();
                $('#errorCode')[0].innerText = '网络连接失败，请检查网络';
                $('.tips').show();
            })
        })
    }])
    .controller('directive', ['$scope', '$http', '$routeParams', 'publicData','$timeout', function ($scope, $http, $routeParams, publicData,$timeout) {
        $('#manage')[0].style.display = 'none';
        $('#back')[0].style.display = 'none';
        $('#directive')[0].style.display = 'none';
        $('#dir-back')[0].style.display = 'block';
        $scope.imei = $routeParams.arg.split('&&')[0];
        var dname = $routeParams.arg.split('&&')[1],
            lng = $routeParams.arg.split('&&')[2],
            lat = $routeParams.arg.split('&&')[3];
        $scope.dtype = $routeParams.arg.split('&&')[4];
        $('#dir-back').attr('href', '#/follow/' + $scope.imei + '&&' + dname);
	$('#fencing').attr('href', '#/fencing/' + $scope.imei + '&&' + dname + '&&' + lng + '&&' + lat + '&&' + $scope.dtype);
        
        $('#title')[0].innerText = dname;
        queryDirective = function (arg) {
            if($scope.dtype != 1){
                var order;
                if (arg == '中心号码') {
                    order = 5;
                } else if (arg == 'SOS号码') {
                    order = 6;
                } else if (arg == '监听号码') {
                    $('.load').hide();
                    order = 10;
                } else if (arg == '速度报警') {
                    order = 11;
                } else if (arg == '工作模式') {
                    order = 14;
                } else if (arg == '震动报警') {
                    order = 9;
                } else if (arg == '断油电') {
                    order = 7;
                }
                ;

                var par = angular.toJson({});
                var request = {
                    type: $scope.dtype,
                    action: 'cmd',
                    method: 'GET',
                    did: $scope.imei,
                    par: par,
                    token: $scope.array.token,
                    cmd_num: order
                };
                $http({
                    method: 'POST',       //传输方式
                    url: 'http://wechat.sky200.com/action.php',
                    data: $.param(request),
                    timeout: 30000,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function (data) {
                    if (data.errorcode == 0) {
                        if (order == 5) {
                            $('#center')[0].value = arr3[1];
                        } else if (order == 6) {
                            $('#sos1')[0].value = data.data[0];
                            $('#sos2')[0].value = data.data[1];
                            $('#sos3')[0].value = data.data[2];
                        } else if (order == 11) {
                            var speed = data.data;
                            $('#lowSpeed')[0].value = speed[0];
                            $('#overSpeed')[0].value = speed[1];
                        } else if (order == 7) {
                            if (data.data[0] == 'ON') {
                                $('#energy')[0].options[0].selected = true;
                            } else {
                                $('#energy')[0].options[1].selected = true;
                            }
                        } else if (order == 9) {
                            var lv = data.data;
                            $('#shakeLv')[0].options[lv[0]-1].selected = true;
                            $('#shakeTime')[0].value = lv[1];
                        } else if (order == 14) {
                            $('#saving')[0].options[data.data[0]].selected = true;
                        }
                        $('.load').hide();

                    } else {
                        $('#errorCode')[0].innerText = obj[data.errorcode];
                        $('.tips').show();
                        $('.load').hide();
                    }

                })
                    .error(function () {
                        $('#errorCode')[0].innerText = '连接服务器超时';
                        $('.tips').show();
                        $('.load').hide();
                    })
            }else{
		$('.load').hide();
		}
           
        };
        var tempDev = {};
        var request = {
            imei: $scope.imei,
            token: $scope.array.token,
            action: 'devinfo'
        }
        $http({
            method: 'POST',
            url: "http://wechat.sky200.com/action.php",
            data: $.param(request),
            timeout: 300000,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            if(data.errorcode == 0){
                tempDev = data.data;
                $scope.saving = true;
                $scope.fence = (tempDev.mval.efc == 0) ? false : true;
                $scope.energy = (tempDev.mval.oil == 0) ? false : true;
                $scope.sos = (tempDev.mval.sos == 0) ? false : true;
                $scope.listen = (tempDev.mval.lst == 0) ? false : true;
                $scope.speed = (tempDev.mval.spd == 0) ? false : true;
                $scope.shake = (tempDev.mval.vib == 0) ? false : true;
            }else{

            }
        })
        

    }])
    .controller('fence',['$scope','$http','$routeParams','$timeout',function ($scope, $http, $routeParams,$timeout) {
        $('.load').show();
        $('#fence-map').css('height', document.documentElement.clientHeight - 50);
        $scope.fence_map = new BMap.Map('fence-map');
        var point = new BMap.Point(113.946532, 22.561115);
        $scope.fence_map.centerAndZoom(point, 14);
        $scope.maxRadius = 5000;
        $scope.minRadius = 100;
        $scope.step = 100;
        var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL};
        $scope.fence_map.addControl(new BMap.NavigationControl(opts));
        var bottom_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT, offset: new BMap.Size(70, 2)});// 左上角，添加比例尺
        $scope.fence_map.addControl(bottom_left_control);
        function pantoCenter (opt){
            $scope.Circle.setCenter(opt);
            var p1 = $scope.Circle.getBounds().getNorthEast();//右上角
            var p2 = $scope.Circle.getBounds().getSouthWest();//左下角
            var mapRight = $scope.fence_map.getBounds().getNorthEast();
            var mapLeft = $scope.fence_map.getBounds().getSouthWest();
            if(p1 != null){
                if(p1.lng >= mapRight.lng ||p2.lng <= mapLeft.lng){
                    $scope.fence_map.setViewport([opt,p1,p2]);
                }
            }
        };
        $scope.fence_map.addEventListener('moveend',function(){
            if($scope.Circle){
                var center = $scope.fence_map.getCenter();
                pantoCenter(center);
            }
        });
        $scope.fence_map.addEventListener('zoomend', function () {
            if($scope.Circle){
                var center = $scope.fence_map.getCenter();
                pantoCenter(center);
            }
        });
        function ZoomControl(){
            // 默认停靠位置和偏移量
            this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
            this.defaultOffset = new BMap.Size(0, 0);
        };
        ZoomControl.prototype = new BMap.Control();
        ZoomControl.prototype.initialize = function(map){
            var div = document.createElement("div");
            div.style.width = "100%";
            div.style.height = "100%";
            div.style.border = "1px solid gray";
            div.style.position = "absolute";
            div.style.pointerEvents = "none";
            div.className = 'fence_circle';
            map.getContainer().appendChild(div);
            // 将DOM元素返回
            return div;
        };
        // 创建控件
        var myZoomCtrl = new ZoomControl();
        // 添加到地图当中
        $scope.fence_map.addControl(myZoomCtrl);


        var imei = $routeParams.arg.split('&&')[0],
            dname = $routeParams.arg.split('&&')[1],
            lng = $routeParams.arg.split('&&')[2],
            lat = $routeParams.arg.split('&&')[3],
            dtype = $routeParams.arg.split('&&')[4];
        $('#title')[0].innerText = dname + '(围栏)';

        $scope.center = point;
        $scope.radius = 300;
        $scope.Circle = new BMap.Circle($scope.center, $scope.radius);
        $scope.Circle.setStrokeWeight(1);
        $scope.Circle.setStrokeColor('blue');
        $scope.fence_map.addOverlay($scope.Circle);
        function seftMarker(){
            $scope.myIcon = new BMap.Icon("./img/fenceDev.png", new BMap.Size(21, 30), {anchor: new BMap.Size(11, 30)});
            $scope.marker = new BMap.Marker(new BMap.Point(lng, lat), {icon: $scope.myIcon});  // 创建标注
            //$scope.fence_map.panTo(new BMap.Point(lng, lat));
            $scope.fence_map.setZoom(17);
            $scope.fence_map.addOverlay($scope.marker);              // 将标注添加到地图中
        }
        seftMarker();
        $scope.myIcon1 = new BMap.Icon("./img/radius.png", new BMap.Size(64, 64), {anchor: new BMap.Size(32, 64)});
        queryFence(1);
        function drawFence(id, shape, p1, p2) {
            $('#fenceMessage')[0].innerText = '当前围栏编号：'+ id;
            if (shape == 'S') {    //矩形
                //发送指令取消矩形围栏
                var request = {
                    dtype: dtype,
                    action: 'cmd',
                    cmdnum: 9,
                    imei: imei,
                    token: $scope.array.token,
                    cmdvalue: 'FENCE' + ',' + id + '#'
                };
                $http({
                    method: 'POST',
                    url: 'http://wechat.sky200.com/action.php',
                    data: $.param(request),
                    timeout: 300000,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function (data) {
                    console.log('删除矩形围栏成功');
                }).error(function () {

                });
                $('#fenceMessage')[0].innerText = '设备暂时未设置围栏';
            }
            else {              //圆形
                if (p2 != 0) {
		    if(p2 >= 5000 && p2 <= 10000){
                        $scope.dime = 10000;
                    }else if(p2 > 10000 && p2 <= 50000){
                        $scope.dime = 50000;
                    }else if(p2 > 50000 && p2 <= 100000){
                        $scope.dime = 100000;
                    }else if(p2 > 100000 && p2 <= 250000){
                        $scope.dime = 250000;
                    }else if(p2 > 250000 && p2 <= 500000){
                        $scope.dime = 500000;
                    }
                    $scope.center = new BMap.Point(p1.lng, p1.lat);
                    $scope.radius = parseFloat(p2);//(parseFloat(p2)>5000)?5000:parseFloat(p2);
                    setTimeout(function () {
                        $('#radius-slider')[0].value = $scope.radius;
                    },100);
                    $scope.Circle.setCenter($scope.center);
                    $scope.Circle.setRadius($scope.radius);
                    $scope.Circle.setStrokeWeight(1);
                    $scope.fence_map.addOverlay($scope.Circle);
                    $scope.shape = 'R';
                    $scope.fence_map.panTo($scope.center);
                } else {
                    $('#fenceMessage')[0].innerText = '设备暂时未设置围栏';
                    $scope.center = new BMap.Point(lng, lat);
                    $scope.radius = 300;
                    $('#radius-slider')[0].value = $scope.radius;
                    $scope.Circle.setCenter($scope.center);
                    $scope.Circle.setRadius($scope.radius);
                    $scope.Circle.setStrokeWeight(1);
                    $scope.fence_map.addOverlay($scope.Circle);
                    $scope.fence_map.panTo($scope.center);
                    $scope.shape = 'R';
                }

            }
        };

        function setFence(type, shape, id) {     //设置围栏
            $('.load').show();
            var par = angular.toJson({num:id,mType:'B',fType:'R',wType:type,p1:{lng:$scope.center.lng,lat:$scope.center.lat},p2:$scope.radius});
            var request = {
                type: dtype,
                action: 'cmd',
                did: imei,
		method:'POST',
                cmd_num: 23,
                token: $scope.array.token,
                par: par
            };
            $http({
                method: 'POST',
                url: 'http://wechat.sky200.com/action.php',
                data: $.param(request),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .success(function (data) {
                    $('.load').hide();
                    if (data.errorcode == '0') {
                        $('.tips').show();
                        $('#errorCode')[0].innerText = '设置成功！';
                    } else {
                        $('.tips').show();
                        $('#errorCode')[0].innerText = '设置失败！';
                    }
                })


        };

        function queryFence(id) {
            var id = id;
            var par = angular.toJson({"num":id,"mType":"B"});
            var request = {
                type: dtype,
                par:par,
		method:'GET',
                cmd_num: 23,
                did: imei,
                token: $scope.array.token,
                action:'cmd'
            };
	
            $http({
                method: 'POST',
                url: 'http://wechat.sky200.com/action.php',
                data:$.param(request),
                timeout: 300000,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .success(function (data) {      //进入页面，自动查询围栏一
                    $('.load').hide();
                    if (data.errorcode == 0) {
                        if (data.data.fType == 'R') {           // 4 则是圆形，5 则为矩形
                            drawFence(id, 'R', new BMap.Point(data.data[0][0], data.data[0][1]), data.data[1]);
                        } else if (data.data.fType == 'S') {
                            drawFence(id, 'S', new BMap.Point(data.data[0][0], data.data[0][1]), new BMap.Point(data.data[1][0], data.data[1][1]))
                        } else {

                        }

                        /*} else if (arr[0] == '1') {
                         $('.tips').show();
                         $('#errorCode')[0].innerText = '网络连接超时，请重新打开页面';
                         } else if (arr[0] == '2') {
                         $('.tips').show();
                         $('#errorCode')[0].innerText = '设备正在被占用，请稍后重试';
                         } else if (arr[0] == '3') {
                         $('.tips').show();
                         $('#errorCode')[0].innerText = '数据库连接失败';
                         } else {
                         $('.tips').show();
                         $('#errorCode')[0].innerText = '设备繁忙';
                         }*/
                    } else {
                        if (data.errorcode == 50148) {
                            seftMarker();
                            $('#fenceMessage')[0].innerText = '设备暂时未设置围栏';
                            $scope.center = new BMap.Point(lng, lat);
                            $scope.radius = 300;
                            $('#radius-slider')[0].value = $scope.radius;
                            $scope.Circle.setCenter($scope.center);
                            $scope.Circle.setRadius($scope.radius);
                            $scope.Circle.setStrokeWeight(1);
                            $scope.fence_map.addOverlay($scope.Circle);
                            $scope.fence_map.panTo($scope.center);
                            $scope.shape = 'R';
                            var p1 = $scope.Circle.getBounds().getNorthEast();//右上角
                            var p2 = $scope.Circle.getBounds().getSouthWest();//左下角
                            var mapRight = $scope.fence_map.getBounds().getNorthEast();
                            var mapLeft = $scope.fence_map.getBounds().getSouthWest();
                            if (p1.lng >= mapRight.lng || p2.lng <= mapLeft.lng) {
                                $scope.fence_map.setViewport([$scope.center, p1, p2]);
                            }
                        } else {
                            $('.tips').show();
                            $('#errorCode')[0].innerText = obj[data.errorcode];
                        }

                    }
                })
                .error(function(){
                    $('.load').hide();
                    $('.tips').show();
                    $('#errorCode')[0].innerText = '网络错误';
                })
        }

        function delFence(id) {
            $('.load').show();
            var par = angular.toJson({val1:'FENCE,'+id+'#'});//  FENCE,1#
            var request = {
                type: dtype,
                action: 'cmd',
                method:'GET',
                cmd_num:99,
                did: imei,
                token: $scope.array.token,
                par: par
            };
            $http({
                method: 'POST',
                url: 'http://wechat.sky200.com/action.php',
                data: $.param(request),
                timeout: 300000,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (data) {
                $('.load').hide();

                if (data.errorcode == '0') {
                    $('.tips').show();
                    $('#errorCode')[0].innerText = '删除成功！';
                } else {
                    $('.tips').show();
                    $('#errorCode')[0].innerText = '删除失败！';
                }
            }).error(function () {

            })
        };
        /**
         * 第一档：100-5000 每次点击 + - step=100
         * 第二档：5000-10000 每次点击 + - step=500
         * 第三档：10000-100000 每次点击 + - step=1000
         * 第四档：100000-500000 每次点击 + - step=10000
         *
         * */
        $scope.dimes = [5000,10000,50000,100000,250000,500000];
        $scope.dime = 5000;
        $scope.$watch('dime',function(newval,oldval){
            if($scope.radius > newval){
                $scope.radius = newval;
                $scope.Circle.setRadius($scope.radius);
                var p1 = $scope.Circle.getBounds().getNorthEast();//右上角
                var p2 = $scope.Circle.getBounds().getSouthWest();//左下角
                $scope.fence_map.setViewport([$scope.center,p1,p2]);
            }
        });
        $scope.setRadius = function(opt){
            var slider = $('#radius-slider')[0];
            if(opt == '-'){
                switch ($scope.dime)
                {
                    case 5000:
                        $scope.radius = ($scope.radius >= 100 )?($scope.radius - 100):0;
                        break;
                    case 10000:
                        $scope.radius = ($scope.radius >= 1000 )?($scope.radius - 1000):0;
                        break;
                    case 50000:
                        $scope.radius = ($scope.radius > 5000 )?($scope.radius - 5000):0;
                        break;
                    case 100000:
                        $scope.radius = ($scope.radius > 10000 )?($scope.radius - 10000):0;
                        break;
                    case 250000:
                        $scope.radius = ($scope.radius > 20000 )?($scope.radius - 20000):0;
                        break;
                    case 500000:
                        $scope.radius = ($scope.radius > 50000 )?($scope.radius - 50000):0;
                        break;
                }
            }else{
                switch ($scope.dime)
                {
                    case 5000:
                        $scope.radius = ($scope.radius < 4900 )?($scope.radius + 100):5000;
                        break;
                    case 10000:
                        $scope.radius = ($scope.radius < 9900 )?($scope.radius + 1000):10000;
                        break;
                    case 50000:
                        $scope.radius = ($scope.radius < 45000 )?($scope.radius + 5000):50000;
                        break;
                    case 100000:
                        $scope.radius = ($scope.radius < 90000 )?($scope.radius + 10000):100000;
                        break;
                    case 250000:
                        $scope.radius = ($scope.radius <230000)?($scope.radius + 20000):250000;
                        break;
                    case 500000:
                        $scope.radius = ($scope.radius < 450000 )?($scope.radius + 50000):500000;
                        break;
                }
            }
            slider.value = $scope.radius;
            $scope.Circle.setRadius($scope.radius);
            var p1 = $scope.Circle.getBounds().getNorthEast();//右上角
            var p2 = $scope.Circle.getBounds().getSouthWest();//左下角
            $scope.fence_map.setViewport([$scope.center,p1,p2]);
        };
        $('#radius-slider').change(function(){
            $scope.radius = this.value;
            $scope.Circle.setRadius($scope.radius);
            var p1 = $scope.Circle.getBounds().getNorthEast();//右上角
            var p2 = $scope.Circle.getBounds().getSouthWest();//左下角
            $scope.fence_map.setViewport([$scope.center,p1,p2]);
            $scope.$apply();
        });

       window.sliderTouch = function () {
           var slider = $('#radius-slider')[0].value;
           $scope.radius = slider;
           $scope.Circle.setRadius($scope.radius);
           var p1 = $scope.Circle.getBounds().getNorthEast();//右上角
           var p2 = $scope.Circle.getBounds().getSouthWest();//左下角
           $scope.fence_map.setViewport([$scope.center,p1,p2]);
           $scope.$apply();
        };
        $('.fence-radius-wrap').bind('click',function(event){
            event.stopPropagation();
        });
        $('.setFC').bind('click', function () {
            if ($('.argument')[0].style.display == 'none') {
                $('.argument').show();
            } else {
                $('.argument').hide();
            }

        });
        $('#query1').bind('click', function () {
            $('.load').show();
            queryFence(1);
        });
        $('#query2').bind('click', function () {
            $('.load').show();
            queryFence(2);
        });
        $('#query3').bind('click', function () {
            $('.load').show();
            queryFence(3);
        });
        $('#setFence').bind('click', function () {
            var type = $('#type option:selected').text(),
                index = $('#index option:selected').text();
            var t = '', s = '', i = '';
            if (type == '超出') {
                t = 'O';
            } else if (type == '跨越') {
                t = 'C';
            } else {
                t = 'I';
            }
            s = 'R';
            if (index == '围栏一') {
                i = 1;
            } else if (index == '围栏二') {
                i = 2;
            } else {
                i = 3;
            }
            setFence(t, s, i);
            //FENCE,6,CR,113.5,22.5,500#
            //FENCE,1,OS,113.2,22.2，113.8,22.8#
        });
        $('.delFC').bind('click', function () {
            var id = this.id;
            delFence(id);
        });

        change = function () {
            var shape = $('#shape option:selected').text();
            var p1 = $scope.marker1.getPosition(),
                p2 = $scope.marker2.getPosition();
            if (shape == '矩形') {
                shape = 'S';
                //$scope.shape = 'S';
            } else {
                shape = 'R';
                // $scope.shape = 'R';
            }
            if ($scope.shape != shape) {
                drawFence('', shape, p1, p2);
            }
        }
    }])
    .directive('delFence', function () {
        return{
            restrict: 'A',
            link: function ($scope, element) {
                element.bind('click', function () {
                    $('.warning').show();
                })
            }
        }
    })
    .directive('subsection',['$timeout', function ($timeout) {
        return{
            restrict: 'A',
            link: function ($scope, element) {
                element.bind('click', function () {
                    $timeout.cancel($scope.playTimer);
                    speed = 0;
                    $scope.siliby = 0;
                    play = true;
                    $('#playIcon').attr('src', './img/play.png');
                    $('#speedIcon').attr('src', './img/slow.png');
                    $('.secList').css({'right':'-100%','display':'none'});
                    var index = parseInt($(this)[0].id);
                    var myPoly = $scope.pbData.section[index];
                    $scope.backData = $scope.pbData.section[index];
                    Array.prototype.clone = function () {
                        return this.slice(0);
                    };
                    var polydata = [];
                    polydata = myPoly.clone();
                    $scope.map1.clearOverlays();
                    $scope.drawPolyLine(polydata);
                    $scope.drawMarker();
                    $scope.marker_new.setPosition(new BMap.Point(polydata[0].b_lng, polydata[0].b_lat));
                    $scope.p1.innerHTML = "时间：" + polydata[0].GpsT;
                    $scope.p2.innerHTML = "速度：" + polydata[0].spd / 10 + '&nbsp;&nbsp;&nbsp;&nbsp;公里/小时';
                    $scope.map1.panTo(new BMap.Point(polydata[0].b_lng, polydata[0].b_lat));
                    var myIcon1 = new BMap.Icon('img/startIcon.png', new BMap.Size(45, 90));
                    var marker1 = new BMap.Marker(new BMap.Point(polydata[0].b_lng, polydata[0].b_lat), {icon: myIcon1});  // 创建标注
                    $scope.map1.addOverlay(marker1);
                    var myIcon2 = new BMap.Icon('img/endIcon.png', new BMap.Size(45, 90));
                    var marker2 = new BMap.Marker(new BMap.Point(polydata[$scope.polyData.length - 1].b_lng, polydata[$scope.polyData.length - 1].b_lat), {icon: myIcon2});  // 创建标注
                    $scope.map1.addOverlay(marker2);
                    $scope.reset();
                    playBack();
                })
            }
        }
    }])
    .directive('play', function ($timeout) {
        return{
            restrict: 'A',
            link: function ($scope, element) {
                element.bind('click', function () {
                    if ($scope.i == undefined) {
                        if (!$scope.data_get) {
                            $('.express').css('left', '0%');
                        } else {                                               //未选择分段，直接点播放，则播放全部
                            $('#playIcon').attr('src', './img/stop.png');
                            $scope.polyData = $scope.pbData.usefulldata;
                            $scope.reset();
                            speed = 2;
                            playBack();
                            $('#speedIcon').attr('src', './img/slow.png');
                        }

                    } else if ($scope.i == $scope.polyData.length) {            //进度到最后：播放到最后暂停——>播放
                        $('#playIcon').attr('src', './img/stop.png');
                        $scope.reset();
                        play = true;
                        speed = 2;
                        playBack();
                        $('#speedIcon').attr('src', './img/slow.png');
                    } else if ($scope.i == 0) {                                 //未开始播放：未播放——>播放
                        $('#playIcon').attr('src', './img/stop.png');
                        play = true;
                        speed = 2;
                        playBack();
                        $('#speedIcon').attr('src', './img/slow.png');
                    } else if (speed == 0) {                             //点击暂停后再次播放播放：暂停——>播放
                        $('#playIcon').attr('src', './img/stop.png');
                        play = true;
                        speed = 2;
                        playBack();
                        $('#speedIcon').attr('src', './img/slow.png');
                    } else {                                                    //播放——>暂停
                        $('#playIcon').attr('src', './img/play.png');
                        speed = 0;
                        $timeout.cancel($scope.playTimer);
                        $('#speedIcon').attr('src', './img/slow.png');
                    }

                })
            }
        }
    })
    .directive('isHide', function () {
        return{
            restrict: 'C',
            link: function ($scope, element) {
                element.bind('click', function () {
                    if ($(this).next()[0].style.display == 'none') {
                        $('.load').show();
                        $(this).next().show();
                        var other = $(this).parent().siblings();
                        for (var i = 1; i < other.length; i++) {
                            other[i].children[1].style.display = 'none';
                        }
                        var txt = $(this).children().children()[0].innerText;
                         if(txt == '监听号码'){
			    $('.load').hide();
                        }else{
                            queryDirective(txt);
                        }
                    } else {
                        $(this).next().hide();
                    }
                })
            }
        }
    })
    .directive('addListenTel',['$http', function ($http) {
        return{
            restrict: "C",
            link: function ($scope, element) {
                element.bind('click', function () {
                    $('.load').show();
                    var listenTel = $('#listen').val();
                    if (listenTel != '') {
                        var par = angular.toJson({val1: listenTel});
                        var listen = {
                            type: $scope.dtype,
                            action: 'cmdpost',
                            cmd_num: 10,
                            imei: $scope.imei,
                            method: 'POST',
                            token: $scope.array.token,
                            par: par
                        };
                        $http({
                            method: 'POST',       //传输方式
                            url: 'http://wechat.sky200.com/action.php',
                            data: $.param(listen),
                            timeout: 300000,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        })
                            .success(function (data) {
                                $('.load').hide();
                                if (data.errorcode == 0) {
                                    $('#errorCode')[0].innerText = '设置成功！';
                                } else {
                                    $('#errorCode')[0].innerText = '设置失败！';
                                }
                                $('.tips').show();
                            })
                            .error(function () {
                                //弹出错误提示
                                console.log('(*^__^*) 嘻嘻……');

                            })
                    } else {
                        console.log('傻逼，填个字都不会吗~~~');
                    }
                })
            }
        }
    }])
    .directive('addCenterTel', ['$http', function ($http) {
        return{
            restrict: "C",
            link: function ($scope, element) {
                element.bind('click', function () {
                    $('.load').show();
                    var tel = $('#center').val();
                    var par = angular.toJson({val1: tel});
                    if (tel != '') {
                        var center = {
                            type: $scope.dtype,
                            action: 'cmdpost',
                            cmd_num: 5,
                            method: 'POST',
                            imei: $scope.imei,
                            token: $scope.array.token,
                            par: par
                        };
                        $http({
                            method: 'POST',
                            url: 'http://wechat.sky200.com/action.php',
                            data: $.param(center),
                            timeout: 300000,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        })
                            .success(function (data) {
                                $('.load').hide();
                                if (data.errorcode == 0) {
                                    $('#errorCode')[0].innerText = '设置成功！';
                                } else {
                                    $('#errorCode')[0].innerText = '设置失败！';
                                }
                                $('.tips').show();
                            })
                            .error(function () {
                                //弹出错误提示
                                console.log('(*^__^*) 嘻嘻……');

                            })
                    } else {
                        console.log('傻逼，填个字都不会吗~~~');
                    }
                })
            }
        }
    }])
    .directive('delCenterTel', ['$http', function ($http) {
        return{
            restrict: 'C',
            link: function ($scope, element) {
                element.bind('click', function () {
                    $('.load').show();
                    var tel = $('#center').val();
                    var par = angular.toJson({val1: 'CENTER,' + 'D,' + '#'});
                    if (tel != '') {
                        center = {
                            type: $scope.dtype,
                            action: 'cmdpost',
                            cmd_num: 5,
                            method: 'GET',
                            did: $scope.imei,
                            token: $scope.array.token,
                            par: par
                        };
                        $http({
                            method: 'POST',
                            url: 'http://wechat.sky200.com/action.php',
                            data: $.param(center),
                            timeout: 300000,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        })
                            .success(function (data) {
                                $('.load').hide();
                                if (data.errorcode == 0) {
                                    $('#errorCode')[0].innerText = '删除成功！';
                                } else {
                                    $('#errorCode')[0].innerText = '删除失败！';
                                }
                                $('.tips').show();

                            })
                            .error(function () {
                                //弹出错误提示
                                console.log('(*^__^*) 嘻嘻……');

                            })
                    } else {
                        console.log('傻逼，填个字都不会吗~~~');
                    }
                })
            }
        }
    }])
    .directive('addSpeedwarn', ['$http', function ($http) {
        return{
            restrict: 'C',
            link: function ($scope, element) {
                element.bind('click', function () {
                    $('.load').show();
                    var overSpeed = $('#overSpeed').val();
                    var lowSpeed = $('#lowSpeed').val();

                    if (parseInt(overSpeed) >= parseInt(lowSpeed)) {
                        var par = angular.toJson({val1: lowSpeed, val2: overSpeed});
                        var speed = {
                            type: $scope.dtype,
                            action: 'cmdpost',
                            cmd_num: 11,
                            method: 'POST',
                            did: $scope.imei,
                            token: $scope.array.token,
                            par: par
                        };
                        $http({
                            method: 'POST',
                            url: 'http://wechat.sky200.com/action.php',
                            data: $.param(speed),
                            timeout: 300000,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        }).success(function (data) {
                            $('.load').hide();
                            if (data.errorcode == 0) {
                                $('#errorCode')[0].innerText = '设置成功！';
                            } else {
                                $('#errorCode')[0].innerText = '设置失败！';
                            }
                            $('.tips').show();
                        })
                    } else {

                    }

                })
            }
        }
    }])
    .directive('delSpeedCtrl', ['$http', function ($http) {
        return{
            restrict: 'C',
            link: function ($scope, element) {
                element.bind('click', function () {
                    $('.load').show();
                    var par = angular.toJson({val1: 0, val2: 0});
                    var speed = {
                        type: $scope.dtype,
                        action: 'cmdpost',
                        cmd_num: 11,
                        did: $scope.imei,
                        method: 'POST',
                        token: $scope.array.token,
                        par: par
                    };
                    $http({
                        method: 'POST',
                        url: 'http://wechat.sky200.com/action.php',
                        data: $.param(speed),
                        timeout: 300000,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function (data) {
                        $('.load').hide();
                        if (data.errorcode == 0) {
                            $('#overSpeed').val('');
                            $('#lowSpeed').val('');
                            $('#errorCode')[0].innerText = '删除成功！';
                        } else {
                            $('#errorCode')[0].innerText = '删除失败！';
                        }
                        $('.tips').show();
                    }).error(function () {
                    })
                });
            }
        }
    }])
    .directive('energy',['$http', function ($http) {
        return{
            restrict: 'C',
            link: function ($scope, element) {
                element.bind('click', function () {
                    $('.load').show();
                    var energy = $('#energy option:selected').text();
                    $scope.set = '';
                    if (energy == '恢复油电') {
                        $scope.set = '1';
                    } else {
                        $scope.set = '0';
                    }
                    var par = angular.toJson({val1: $scope.set});
                    var Energy = {
                        type: $scope.dtype,
                        action: 'cmdpost',
                        cmd_num: 7,
                        method: 'POST',
                        did: $scope.imei,
                        token: $scope.array.token,
                        par: par
                    };
                    $http({
                        method: 'POST',
                        url: 'http://wechat.sky200.com/action.php',
                        data: $.param(Energy),
                        timeout: 300000,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function (data) {
                        $('.load').hide();

                        if (data.errorcode == 0) {
                            $('#errorCode')[0].innerText = '设置成功！';
                        } else {
                            $('#errorCode')[0].innerText = '操作失败！';
                        }
                        $('.tips').show();
                    }).error(function () {
                    })
                })
            }
        }
    }])
    .directive('saving',['$http', function ($http) {
        return{
            restrict: 'C',
            link: function ($scope, element) {
                element.bind('click', function () {
                    $('.load').show();
                    var saving = $('#saving').val();
                    if (saving == 'long') {
                        var save = 0;
                    } else if (saving == 'power') {
                        var save = 1;
                    } else if (saving == 'sleep') {
                        var save = 2;
                    } else {
                        var save = 3;
                    }
                    var par = angular.toJson({val1: save});
                    var query = {
                        type: $scope.dtype,
                        action: 'cmdpost',
                        cmd_num: 14,
                        did: $scope.imei,
                        method: 'POST',
                        token: $scope.array.token,
                        par: par
                    };
                    $http({
                        method: 'POST',
                        url: 'http://wechat.sky200.com/action.php',
                        data: $.param(query),
                        timeout: 300000,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function (data) {
                        $('.load').hide();

                        if (data.errorcode == 0) {
                            $('#errorCode')[0].innerText = '设置成功！';
                        } else {
                            $('#errorCode')[0].innerText = '操作失败！';
                        }
                        $('.tips').show();
                    }).error(function () {
                        console.log('(*^__^*) 嘻嘻……');
                    })
                })
            }
        }
    }])
    .directive('shake', ['$http', function ($http) {
        return{
            restrict: 'C',
            link: function ($scope, element) {
                element.bind('click', function () {
                    $('.load').show();
                    var shakeLv = $('#shakeLv').val();
                    var shakeTime = $('#shakeTime').val();
                    if (shakeTime == '' || shakeTime > 60 || shakeTime <= 0) {
                        console.log('请按照提示输入正确的数字！！！');
                    } else {
                        var par = angular.toJson({val1: shakeLv, val2: shakeTime});
                        var query = {
                            type: $scope.dtype,
                            action: 'cmdpost',
                            cmd_num: 9,
                            did: $scope.imei,
                            method: 'POST',
                            token: $scope.array.token,
                            par: par
                        };
                        $http({
                            method: 'POST',
                            url: 'http://wechat.sky200.com/action.php',
                            data: $.param(query),
                            timeout: 300000,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        }).success(function (data) {
                            $('.load').hide();

                            if (data.errorcode == 0) {
                                $('#errorCode')[0].innerText = '设置成功！';
                            } else {
                                $('#errorCode')[0].innerText = '操作失败！';
                            }
                            $('.tips').show();
                        }).error(function () {
                            $('.load').hide();
                            $('#errorCode')[0].innerText = '连接失败，请检查网络！';
                            $('.tips').show();
                        })
                    }
                })
            }
        }
    }])
    .directive('delShake', ['$http', function ($http) {
        return{
            restrict: 'C',
            link: function ($scope, element) {
                element.bind('click', function () {
                    $('.load').show();
                    var par = angular.toJson({val1: 0, val2: 0});
                    var query = {
                        type: $scope.dtype,
                        action: 'cmdpost',
                        cmd_num: 9,
                        method: 'POST',
                        did: $scope.imei,
                        token: $scope.array.token,
                        par: par
                    };
                    $http({
                        method: 'POST',
                        url: 'http://wechat.sky200.com/action.php',
                        data: $.param(query),
                        timeout: 300000,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function (data) {
                        $('.load').hide();
                        if (data.errorcode == 0) {
                            $('#shakeLv').val('1');
                            $('#shakeTime').val('');
                            $('#errorCode')[0].innerText = '删除成功！';
                        } else {
                            $('#errorCode')[0].innerText = '操作失败！';
                        }
                        $('.tips').show();
                    }).error(function () {
                        $('.load').hide();
                        $('#errorCode')[0].innerText = '连接失败，请检查网络！';
                        console.log('(*^__^*) 嘻嘻……');
                    })
                })
            }
        }
    }])
    .directive('addsosTel', ['$http', function ($http) {
        return{
            restrict: 'C',
            link: function ($scope, element) {
                element.bind('click', function () {
                    $('.load').show();
                    var sos1 = $('#sos1')[0].value;
                    var sos2 = $('#sos2')[0].value;
                    var sos3 = $('#sos3')[0].value;
                    var par = angular.toJson({val1:sos1,val2:sos2,val3:sos3});
                    var query = {
                        type: $scope.dtype,
                        action: 'cmd',
                        cmd_num: 6,
                        method:'POST',
                        did: $scope.imei,
                        token: $scope.array.token,
                        par:par
                    };
                    $http({
                        method: 'POST',
                        url: 'http://wechat.sky200.com/action.php',
                        data: $.param(query),
                        timeout: 300000,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function (data) {
                        $('.load').hide();
                        if (data.errorcode == 0) {
                            $('#errorCode')[0].innerText = '添加成功！';
                        } else {

                        }
                        $('.tips').show();
                    })
                        .error(function () {
                            $('.load').hide();
                            $('#errorCode')[0].innerText = '连接失败，请检查网络！';
                        })
                })
            }
        }
    }])
    .directive('delsosTel', ['$http', function ($http) {
        return{
            restrict: 'C',
            link: function ($scope, element) {
                element.bind('click', function () {
                    $('.load').show();
                    var temp = [];
                    var directive = {};
                    if ($('#ckb1')[0].checked == true && $('#ckb2')[0].checked == false && $('#ckb3')[0].checked == false) {
                        directive = {val1: 1};
                        temp = [1];
                    } else if ($('#ckb1')[0].checked == false && $('#ckb2')[0].checked == true && $('#ckb3')[0].checked == false) {
                        directive = {val1: 2};
                        temp = [2];
                    } else if ($('#ckb1')[0].checked == false && $('#ckb2')[0].checked == false && $('#ckb3')[0].checked == true) {
                        directive = {val1: 3};
                        temp = [3];
                    } else if ($('#ckb1')[0].checked == true && $('#ckb2')[0].checked == true && $('#ckb3')[0].checked == false) {
                        directive = {val1: 1, val2: 2};
                        temp = [1,2];
                    } else if ($('#ckb1')[0].checked == true && $('#ckb2')[0].checked == false && $('#ckb3')[0].checked == true) {
                        directive = {val1: 1, val2: 3};
                        temp = [1,3];
                    } else if ($('#ckb1')[0].checked == false && $('#ckb2')[0].checked == true && $('#ckb3')[0].checked == true) {
                        directive = {val1: 2, val2: 3};
                        temp = [2,3];
                    } else {
                        directive = {val1: 1, val2: 2, val3: 3};
                        temp = [1,2,3];
                    }
                    var par = angular.toJson(directive);
                    var query = {
                        type: $scope.dtype,
                        action: 'cmd',
                        cmd_num: 6,
                        did: $scope.imei,
                        method: 'POST',
                        token: $scope.array.token,
                        par: par
                    };
                    $http({
                        method: 'POST',
                        url: 'http://wechat.sky200.com/action.php',
                        data: $.param(query),
                        timeout: 300000,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function (data) {
                        $('.load').hide();
                        if (data.errorcode == 0) {
                            $('#errorCode')[0].innerText = '删除成功！';
                            for(var i= 0;i<temp.length;i++){
                                if(temp[i] == 1 ){
                                    $scope.sos1 = '';
                                }else if(temp[i] == 2){
                                    $scope.sos2 = '';
                                }else if(temp[i] == 3){
                                    $scope.sos3 = '';
                                }
                            }
                        } else {
                            $('#errorCode')[0].innerText = '操作失败！';
                        }
                        $('.tips').show();
                    })
                        .error(function () {
                            $('.load').hide();
                            $('#errorCode')[0].innerText = '连接失败，请检查网络！';
                            $('.tips').show();
                        })
                });
            }
        }
    }])
    .directive('rename', function () {
        return{
            restrict: 'C',
            link: function ($scope, element) {
                element.bind('click', function () {
                    var did = $(this).attr('data-did');
                    $('.re-name').attr('data-did', did);
                    $('.rename-device').show();
                    $('#newName')[0].value = $(this).attr('data-name');
                })
            }
        }
    })
    .directive('renameGroup', function () {
        return{
            restrict: 'C',
            link: function ($scope, element) {
                element.bind('click', function () {
                    var gname = $(this).attr('data-Gname');
                    $('.new-group').show();
                    $('.re-gName').attr('data-gname', gname);
                    $('#newGname')[0].value = gname;
                })
            }
        }
    })
    .directive('delGroup', function () {
        return{
            restrict: 'C',
            link: function ($scope, element) {
                element.bind('click', function () {
                    var gname = $(this).attr('data-Gname');
                    $('.delete-group').show();
                    $('.delete').attr('data-gname', gname);
                })
            }
        }
    })
    .factory('publicData', function () {
        var public = {};
        public.tempGroup = [];
        public.setTemp = function (data) {
            return public.tempGroup = data;
        };
        public.total = [];
        public.setData = function (data) {
            return public.total = data;
        };
        return public;
    })
    .factory('conversion', function () {
        return{
            //转时间戳
            dateChange:function (date) {
                var date = new Date(date);
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())+' ';//date.getDate() + ' ';
                var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours())+':';//date.getHours() + ':';
                var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())+':';//date.getMinutes() + ':';
                var s =(date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds()); //date.getSeconds();
                return date = (Y + M + D + h + m + s);
            },
            //减？小时
            //获取标准时区时间数据
            dateTransform: function (date) {
                var today = new Date();
                var timeDif = 0;
                var timeZone = today.getTimezoneOffset() / 60;
                timeDif = timeZone * 3600000;
                var realTime = Date.parse(date) + timeDif;
                return realTime = this.dateChange(realTime);
            },
            //获取当地时区时间数据
            dataToLoc: function (date) {
                var today = new Date();
                var timeDif = 0;
                var timeZone = today.getTimezoneOffset() / 60;
                timeDif = timeZone * 3600000;
                var realTime = Date.parse(date) - timeDif;
                return realTime = this.dateChange(realTime);
            }
        }

    })
    .factory('playback', ['conversion', function (conversion) {
        var playback = {};
        //距离计算方法
        var LAT;
        var LNG;
        var LBSLAT;
        var LBSLNG;

        function getDistance(lat1, lng1, lat2, lng2) {
            var dValueLat = (lat1 > lat2) ? (lat1 - lat2) : (lat2 - lat1);
            var dValueLng = (lng1 > lng2) ? (lng1 - lng2) : (lng2 - lng1);

            if ((0.0000001 > dValueLat) && (0.0000001 > dValueLng)) {
                return 0.0;
            }

            lng1 *= Math.PI / 180.0;
            lat1 *= Math.PI / 180.0;
            lng2 *= Math.PI / 180.0;
            lat2 *= Math.PI / 180.0;

            var sDistance = Math.acos(Math.cos(lat1 - lat2) - Math.cos(lat1) * Math.cos(lat2) * (1 - Math.cos(lng1 - lng2)));

            sDistance += sDistance * 6378137.0;

            return sDistance;
        }

        //时间转换
        function timeCycle(msd) {
            if (msd != 0) {
                var time = parseFloat(msd) / 1000;
                if (null != time && "" != time) {
                    if (time >= 60 && time < 60 * 60) { //小与一个小时
                        time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
                            parseInt(time / 60.0)) * 60) + "秒";
                    } else if (time >= 60 * 60 && time < 60 * 60 * 24) { //小与一天
                        time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
                            parseInt(time / 3600.0)) * 60) + "分钟" +
                            parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                                parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
                    } else if (time > 0 && time < 60) { //  小与一分钟
                        time = parseInt(time) + "秒";
                    } else { //大于一天
                        time = parseInt(time / 86400.0) + "天" + parseInt((parseFloat(time / 86400.0) - parseInt(time / 86400.0)) * 24) + "小时" + parseInt(((parseFloat((parseFloat(time / 86400.0) - parseInt(time / 86400.0)) * 24) - parseInt((parseFloat(time / 86400.0) - parseInt(time / 86400.0)) * 24))) * 60) + "分钟" + parseInt((parseFloat(((parseFloat((parseFloat(time / 86400.0) - parseInt(time / 86400.0)) * 24) - parseInt((parseFloat(time / 86400.0) - parseInt(time / 86400.0)) * 24))) * 60) - parseInt(((parseFloat((parseFloat(time / 86400.0) - parseInt(time / 86400.0)) * 24) - parseInt((parseFloat(time / 86400.0) - parseInt(time / 86400.0)) * 24))) * 60)) * 60) + "秒";
                    }
                }
            } else {
                time = 0 + '秒';
            }
            return time;
        };

        //获取两点间的时间,返回时间为小时
        function getTime(s1, s2) {
            var time = Date.parse(s1.GpsT.replace(/-/g, '/')) - Date.parse(s2.GpsT.replace(/-/g, '/'));
            var dt = time;
            dt > 0 ? dt = time : dt = -time;
            return dt / 3600000;
        }

        //获取两点间的速度，返回单位为km/h
        function getSpeed(s1, s2) {
            var d = getDistance(s1[LAT], s1[LNG], s2[LAT], s2[LNG]);
            var dis = d / 1000;
            var dt = getTime(s1, s2);
            return dis / dt;
        }

        //获取上点与下点的lbs两点间的速度，返回单位为km/h
        function getLBSspeed(s1, s2) {
            var d = getDistance(s1[LAT], s1[LNG], s2.lbslat, s2.lbslng);
            var dis = isNaN(d) ? 0 : d;
            var dt = getTime(s1, s2);
            return dis / dt;
        }

        //克隆对象方法
        function clone(obj) {
            var objClone;
            if (obj.constructor == Object) {
                objClone = new obj.constructor();
            } else {
                objClone = new obj.constructor(obj.valueOf());
            }
            for (var key in obj) {
                if (objClone[key] != obj[key]) {
                    if (typeof(obj[key]) == 'object') {
                        objClone[key] = obj[key].Clone();
                    } else {
                        objClone[key] = obj[key];
                    }
                }
            }
            objClone.toString = obj.toString;
            objClone.valueOf = obj.valueOf;
            return objClone;
        }

        //完成两个过滤数据的方法	hkj	2016/07/11
        function playBackSplitSharpPoint(dataArray) {
            var index;
            var temp;

            //循环预留，可能会增加过滤次数
            for (index = 0; index < 1; index++) {
                temp = playBackSplitPoint(dataArray, 1);
            }
            for (index = 0; index < 1; index++) {
                temp = playBackSmpaleSplitPoint(temp);
            }

            return temp;
        }

        // c is 4 * cos(a) * cos(a)
        //通过三个点的经纬度数据判断是否小于相应的角	hkj	2016/07/11
        function isSharp(x1, y1, x2, y2, x3, y3, c) {
            var d12, dx12, dy12;
            var d23, dx23, dy23;
            var d31, dx31, dy31;
            var a1, a2;

            dx12 = x1 - x2;
            dx23 = x2 - x3;
            dx31 = x3 - x1;

            dy12 = y1 - y2;
            dy23 = y2 - y3;
            dy31 = y3 - y1;

            d12 = dx12 * dx12 + dy12 * dy12;
            d23 = dx23 * dx23 + dy23 * dy23;
            d31 = dx31 * dx31 + dy31 * dy31;

            a1 = d12 + d23 - d31;
            if (a1 <= 0)
                return  false;

            a1 = a1 * a1;
            a2 = d12 * d23 * c;
            if (a1 > a2)
                return true;
            return false;
        }

        //循环判断数据中每三点是否形成小于相应（turn=1 => 60度）的角	hkj	2016/07/11
        function playBackSplitPoint(m_lstRecordSplit_tmp, turn) {
            var a, b, c;
            var index;
            var temp = [];
            temp.push(m_lstRecordSplit_tmp[0]);

            for (index = 0; index < m_lstRecordSplit_tmp.length; index++) {
                if ((index + 2) < m_lstRecordSplit_tmp.length) {
                    a = m_lstRecordSplit_tmp[index];
                    b = m_lstRecordSplit_tmp[index + 1];
                    c = m_lstRecordSplit_tmp[index + 2];

                    if (isSharp(a[LNG], a[LAT], b[LNG], b[LAT], c[LNG], c[LAT], turn)) {
                        //index ++;
                        continue;
                    }
                    temp.push(b);
                } else {
                    if (m_lstRecordSplit_tmp[index + 1])
                        temp.push(m_lstRecordSplit_tmp[index + 1]);
                }
            }
            return temp;
        }

        //判断下两点间距（速度）是否大于上两点间距（速度）的10倍，并对数据进行处理		hkj	2016/07/11
        function playBackSmpaleSplitPoint(m_lstRecordSplit_tmp) {
            var tmIndex;
            var tmLast;
            var dis = 0;
            var index;
            var temp = [];

            tmLast = m_lstRecordSplit_tmp[0];
            for (index = 1; index < m_lstRecordSplit_tmp.length; index++) {
                tmIndex = m_lstRecordSplit_tmp[index];
                var s = getDistance(tmLast[LAT], tmLast[LNG], tmIndex[LAT], tmIndex[LNG]);
                tmLast = tmIndex;
                if (s < 10 * dis) {
                    temp.push(tmIndex)
                }
                dis = s;
            }
            return temp;
        }


        //过滤数据
        playback.filter = function (data, mapType) {
            /*过滤方法，过滤状态转换的点和距离小于5米的点（给对应点加标志位用于过滤）*/
            function playBackDelpFristPoint() {
                var tags = last.GpsS;
                var tempDate = [];
                for (var i = data_i + 1; i < getedData.length; i++) {
                    var intags = getedData[i].GpsS;
                    if (intags != tags) {
                        if ((i + 2) < getedData.length) {
                            if (intags == 'W') {
                                getedData[i - 1].isAbnormal = true;
                                tags = getedData[i].GpsS;
                            } else {
                                getedData[i].isAbnormal = true;
                                i++;
                                tags = getedData[i].GpsS;
                            }
                        }
                    }
                }

                var _last = last;
                tempDate.push(getedData[data_i]);
                for (var i = data_i + 1; i < getedData.length; i++) {
                    var pt = getedData[i];
                    if (getedData[i].isAbnormal) {
                        tempDate.push(pt);
                        continue;
                    }

                    var s = getDistance(_last[LAT], _last[LNG], pt[LAT], pt[LNG]);
                    if (s < 5) {
                        getedData[i].isAbnormal = true;
                        tempDate.push(pt);
                        continue;
                    }
                    tempDate.push(pt);
                    _last = pt;
                }
                getedData = tempDate;
            }

            //数据处理：有效总数据，分段数据，计算结果

            LAT = 'b_lat';
            LNG = 'b_lng';
            LBSLAT = 'lbs_blat';
            LBSLNG = 'lbs_blng';

            var getedData = data.data;
            var finalData = [];
            var pbData = {};
            var section_gap = 600000;
            pbData.usefulldata = [];
            pbData.section = [];    //分段点数据
            pbData.secData = [];    //分段数据：[0]、分段开始时间；[1]、分段结束时间；[2]、分段行驶时间（已解析为字符串）；[3]、分段停留时间（已解析为字符串）；[4]分段里程；[5]、分段平均速度
            pbData.secDataCy = [];  //分段数据：[0]、分段开始时间；[1]、分段结束时间；[2]、分段行驶时间（未解析）；[3]、分段停留时间（未解析）；[4]分段里程；[5]、分段平均速度
            pbData.totalData = [];  //总段数据：[0]、总段开始时间；[1]、总段结束时间；[2]、总段行驶时间（已解析为字符串）；[3]、总段停留时间（已解析为字符串）；[4]总段里程；[5]、总段平均速度
            //算法---------------------

            //去零点
            for (var i = 0; i < getedData.length; i++) {
                if (data.pbtype != 4) {
                    getedData[i].GpsT = conversion.dataToLoc(getedData[i].GpsT.replace(/-/g, '/'));

                    if (getedData[i].GpsS != "W" && (getedData[i][LNG] == 0 && getedData[i][LAT] == 0)) {
                        getedData.splice(i, 1);
                        i--;
                    }
                } else {
                    getedData[i].GpsT = conversion.dataToLoc(getedData[i].time.replace(/-/g, '/'));

                    //过滤0点，若为0点截去，重新下次循环
                    if (getedData[i][LNG] == 0 && getedData[i][LAT] == 0) {
                        getedData.splice(i, 1);
                        i--;
                    }
                }
            }
            if (getedData.length == 0) return pbData;    //若过滤异常点后没有数据，将空对象返回    by hkj 2016/05/25

            //起始点判断。与后面三点进行对比,判断首点是否正确 2016/05/25 hkj
            var data_i = 0;     //定义数据首点
            if (getedData.length >= 8) {
                while (true) {
                    var find_s = data_i;
                    var find_v = 0;
                    var piont1 = getedData[find_s++];
                    var piont2 = getedData[find_s++];
                    var piont3 = getedData[find_s++];
                    var piont4 = getedData[find_s++];

                    var spd1 = getSpeed(piont1, piont2);
                    var spd2 = getSpeed(piont1, piont3);
                    var spd3 = getSpeed(piont1, piont4);

                    if (spd1 < 360)
                        find_v++;
                    if (spd2 < 360)
                        find_v++;
                    if (spd3 < 360)
                        find_v++;

                    if (find_v >= 2) {
                        break;
                    } else {
                        data_i++;
                        if (getedData.length - data_i < 4)
                            break;
                    }
                }
            }
            finalData.push(getedData[data_i]);
            //筛选
            //定位方式：GPS定位，去异常点和重复点
            var last = getedData[data_i];
            var temp = null;
            var pt = {};
            //}

            /*以下根据返回pbtype判断设备类型并对应过滤方法：1.车载 2.人用 3.gpt09*/
            if (data.pbtype == '1') {
                playBackDelpFristPoint();
                for (var i = data_i + 1; i < getedData.length; i++) {
                    pt = getedData[i];
                    var spd = getSpeed(last, pt);
                    if (spd > 360) {
                        pt.isAbnormal = true;
                        continue;
                    }

                    //若定位数据不是GPS数据，或者与上点相同（既是静止）时，将该点位置保存，直至不是以下条件后再取时间。
                    if ((pt['GpsS'] != 'G' && pt['GpsS'] != 'A')) {
                        temp = pt;
                        continue;
                    }
                    if (pt[LAT] == last[LAT] && pt[LNG] == last[LNG]) {
                        temp = pt;
                        continue;
                    }
                    if (temp) {
                        var first = clone(last);
                        first.GpsT = temp.GpsT;
                        first.GpsS = temp.GpsS;
                        finalData.push(first);
                        finalData.push(pt);
                        temp = null;
                    } else {
                        finalData.push(pt);
                    }
                    last = pt;
                }
                finalData = playBackSplitSharpPoint(finalData);
            } else if (data.pbtype == '2') {//过滤重复点
                playBackDelpFristPoint();
                section_gap = 1200000;
                for (var i = data_i + 1; i < getedData.length; i++) {
                    pt = getedData[i];
                    if (((pt[LAT] == 0) && (pt[LNG] == 0)) || pt.isAbnormal)
                        continue;
                    //以上原为两点距离小于50处理，修改为两点时间大于30分钟将点处理	hkj 2016/07/11
                    var last_time = new Date(last.GpsT.replace(/-/g, '/')).getTime() / 1000;
                    var pt_time = new Date(pt.GpsT.replace(/-/g, '/')).getTime() / 1000;
                    var _t = pt_time - last_time;
                    if (_t > 1800) {
                        temp = pt;
                    }
                    if (temp != null) {
                        var first = clone(last);
                        first.GpsT = temp.GpsT;
                        first.GpsS = pt.GpsS;
                        finalData.push(first);
                        finalData.push(pt);
                        temp = null;
                    } else {
                        finalData.push(pt);
                    }
                    last = pt;
                }
                finalData = playBackSplitSharpPoint(finalData);
            } else if (data.pbtype == '3') {
                for (var i = data_i + 1; i < getedData.length; i++) {
                    pt = getedData[i];

                    var spd = getSpeed(last, pt);
                    if (spd > 360) {
                        continue;
                    }

                    finalData.push(pt);
                    last = pt;
                }
            } else if (data.pbtype == '4') {
                for (var i = data_i + 1; i < getedData.length; i++) {
                    pt = getedData[i];

                    var spd = getSpeed(last, pt);
                    if (spd > 360) {
                        var confirm_i = i - 2;
                        if (getedData[confirm_i]) {
                            var confirmSpeed = getSpeed(getedData[confirm_i], pt);
                            if (confirmSpeed > 360) {
                                continue
                            } else {
                                finalData[finalData.length - 1][LAT] = pt[LAT];
                                finalData[finalData.length - 1][LNG] = pt[LNG];
                            }
                        } else {
                            continue;
                        }
                    }

                    finalData.push(pt);
                    last = pt;
                }
            }

            //非TK108设备分段
            if (data.pbtype != '4') {
                for (var i = 0; i < finalData.length - 1; i++) {
                    if (Date.parse(finalData[i + 1].GpsT) - Date.parse(finalData[i].GpsT) > section_gap) {
                        var sec = finalData.splice(0, i + 1);
                        if (i > 1)
                            pbData.section.push(sec);
                        i = 0;
                    }
                }
                //最后余下数据大于1点足以形成分段，则将余下数据分一段
                if (finalData.length > 1)    pbData.section.push(finalData);
                if (pbData.section.length == 0)  return{};
            } else {
                for (var i = 0; i < finalData.length - 1; i++) {
                    if (finalData[i].state == 'STP' || finalData[i].state == 'VIB') {
                        var _eTime = new Date(finalData[i].GpsT.replace(/-/g, '/'));
                        var _sTime = new Date(finalData[0].GpsT.replace(/-/g, '/'));
                        var sec = finalData.splice(0, i + 1);
                        var secLength = pbData.section.length;
                        if ((i < 2 || _eTime - _sTime < 600000) && secLength > 0) {
                            pbData.section[secLength - 1] = pbData.section[secLength - 1].concat(sec);
                        } else {
                            pbData.section.push(sec);
                        }
                        i = 0;
                    }

                }
                //最后余下数据大于1点足以形成分段，则将余下数据分一段
                if (finalData.length > 1)    pbData.section.push(finalData);
                if (pbData.section.length == 0)  return{};
            }

            //数据计算
            //分段计算
            //分段总路程
            var secMileages = [];
            //分段开始、结束时间
            var secStartTime = [], secEndTime = [];
            //行驶时间
            var drvingTime = [];
            var cyDrvingTime = [];
            //分段平均速度
            var aveSpeed = [];
            //停留时间
            var stayTime = [];
            var cyStayTime = [];
            //总里程
            var dist = 0;
            //总段开始时间：第一分段的第一点
            var st = pbData.section[0][0].GpsT;
            //总段结束时间：最后分段的最后一点
            var et = pbData.section[pbData.section.length - 1][pbData.section[pbData.section.length - 1].length - 1].GpsT;
            //总行驶时间
            var drvingTTime = 0;
            //总停留时间
            var stayTTime = 0;
            //总分段数据点数组
            pbData.usefulldata = [];
            for (var i = 0; i < pbData.section.length;) {
                var secMileage = 0;
                for (var j = 0; j < pbData.section[i].length - 1; j++) {
                    secMileage += getDistance(pbData.section[i][j][LAT], pbData.section[i][j][LNG], pbData.section[i][j + 1][LAT], pbData.section[i][j + 1][LNG]);
                }
                //若非gpt09设备或tk108设备，去除里程长度小于150米的分段
                if ((data.pbtype != 3 && data.pbtype != 4) && secMileage < 150) {
                    pbData.section.splice(i, 1);
                    continue;
                }
                dist += secMileage;             //累加总里程，这里单位为m
                secMileage = secMileage / 1000;
                secMileages.push(secMileage);   //分段里程添加，这里单位为km

                secStartTime.push(pbData.section[i][0].GpsT);                           //分段开始时间
                secEndTime.push(pbData.section[i][pbData.section[i].length - 1].GpsT);  //分段结束时间

                var drv = (Date.parse(secEndTime[i]) - Date.parse(secStartTime[i]));    //分段行驶时间
                drvingTime.push(drv);                                                   //分段行驶时间数组添加
                drvingTTime += drv;                                                     //总分段行驶时间累加
                cyDrvingTime.push(timeCycle(drv));                                      //分段行驶时间解析并加入到数组

                var ave = secMileages[i] / drvingTime[i] * 3600000;                     //分段速度计算
                aveSpeed.push(ave);                                                     //分段速度数组添加

                var stay;
                if (i + 1 >= pbData.section.length) {
                    stay = 0;
                } else {
                    stay = (Date.parse(pbData.section[i + 1][0].GpsT) - Date.parse(pbData.section[i][pbData.section[i].length - 1].GpsT));
                }
                stayTime.push(stay);                                                    //分段停留时间数组添加
                cyStayTime.push(timeCycle(stay));                                       //分段停留时间解析数组添加
                stayTTime += stay;                                                      //总分段停留时间累加

                pbData.usefulldata = pbData.usefulldata.concat(pbData.section[i]);                  //各分段点并入到总分段点数组
                i++
            }

            pbData.secDataCy.push(secStartTime);
            pbData.secDataCy.push(secEndTime);
            pbData.secDataCy.push(cyDrvingTime);
            pbData.secDataCy.push(cyStayTime);
            pbData.secDataCy.push(secMileages);
            pbData.secDataCy.push(aveSpeed);
            pbData.secData.push(secStartTime);
            pbData.secData.push(secEndTime);
            pbData.secData.push(drvingTime);
            pbData.secData.push(stayTime);
            pbData.secData.push(secMileages);
            pbData.secData.push(aveSpeed);
            pbData.sec_Datas = [];
            for (var i = 0; i < secStartTime.length; i++) {
                var sections = [];
                sections.push(secStartTime[i]);
                sections.push(secEndTime[i]);
                sections.push(cyDrvingTime[i]);
                sections.push(cyStayTime[i]);
                sections.push(secMileages[i]);
                sections.push(aveSpeed[i]);
                pbData.sec_Datas.push(sections);
            }

            //总平均速度
            var aveTSpeed = dist / drvingTTime * 3600;
            drvingTTime = timeCycle(drvingTTime);
            stayTTime = timeCycle(stayTTime);

            pbData.totalData.push(st);
            pbData.totalData.push(et);
            pbData.totalData.push(drvingTTime);
            pbData.totalData.push(stayTTime);
            pbData.totalData.push(dist);
            pbData.totalData.push(aveTSpeed);
            return pbData;
        };
        return playback;
    }]);
