<template>
    <div>
    </div>
</template>

<script src="https://webapi.amap.com/maps?v=2.0&key=ab483676931b5c32ffd436065e5607c1"></script>
<script src="https://webapi.amap.com/loca?v=2.0.0&key=ab483676931b5c32ffd436065e5607c1"></script>
<script src="https://unpkg.com/@turf/turf/turf.min.js"></script>
<script>

import * as turf from '@turf/turf'
  import bus from '@/bus/bus.js'
  import Element from 'element-ui'
  import AMapLoader from '@amap/amap-jsapi-loader'
  import echarts, * as Echart from '@/js/echarts.js'
  import $ from 'jquery';
  import warning from './1.json';
  import pointJson from './2.json'
  import future3Json from './未来三路.json'
  import rangeJson from './range.json'
  import heatmapJson from './heatmap.json'
  import car1_json from './Json/car_one.json'
  import car2_json from './Json/青岛_范围分析.json'


  export default {
    components:[],
    props:{
        range_ShowOrNot:Boolean
    },
    
    name:'range',
    data(){
        return{
            interval:null,
            obj:{},
            stop:0,
            map:null,


            warning:warning,
            pointJson:pointJson,
            future3Json:future3Json,
            rangeJson:rangeJson,
            heatmapJson:heatmapJson,
            car1_json:car1_json,
            car2_json:car2_json,
        }
        
       
    },

    methods:{
        car(){
            var that = this
            AMapLoader.load({
            key:"ab483676931b5c32ffd436065e5607c1",             // 申请好的Web端开发者Key，首次调用 load 时必填
            version:"2.0",
            "Loca":{                // 是否加载 Loca， 缺省不加载
            "version": '2.0.0'  // Loca 版本，缺省 1.3.2
                },      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins:['AMap.MoveAnimation','AMap.Heatmap','AMap.PlaceSearch','AMap.AutoComplete','AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap)=>{

                // 有多少段数据
                var length =this.future3Json.list.length

                var i =0 
                var t=0
                
                that.interval = setInterval(function(){
                    var line = that.future3Json.list[i].point
                    console.log(line);
                    
                    patrol(line,t)
                    stop=stop+1
                    i=(i+1)%length
                    t=(t+1)%length
                    // 表示一趟巡检中，每一段颜色（长度可能不一致）展示的时间都是5s
                },10000)

                // 变量i用于保存该段路程，线路的颜色
                function patrol(line,i){
                    // 车
                    console.log(i);
                    var car =[]
                    car[i] = new AMap.Marker({
                    map: that.map,
                    position: line[0],
                    icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
                    offset: new AMap.Pixel(-13, -26),
                });
                
                    var lineArr =line
                    var lineColor 
                    if(that.future3Json.list[i].color==1){lineColor='#238E23'}
                    else if(that.future3Json.list[i].color==2){lineColor='#D9D919'}
                    else if(that.future3Json.list[i].color==3){lineColor='#FF7F00'}
                    else if(that.future3Json.list[i].color==4){lineColor='#8C1717'}
                    var passedPolyline = new AMap.Polyline({
                        map: that.map,
                        strokeColor: lineColor,  //线颜色
                        strokeWeight: 25,          //线宽
                        strokeOpacity: 0.9      
                    });
                    // 为小车绑定事件，当小车经过时绘制线
                    car[i].on('moving', function (e) {
                        passedPolyline.setPath(e.passedPath);
                        // 镜头移动到当前小车的位置
                    // that.map.setCenter(e.target.getPosition(),true)
                    });

                    window.startAnimation = function startAnimation () {
                        car[i].moveAlong(lineArr, {
                            // 每一段的时长
                            duration: 400,//可根据实际采集时间间隔设置
                            // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
                            autoRotation: true,
                        });
                    };
                    // 存在异步的问题，应该等待动画执行结束，再执行hide
                    startAnimation()
                    var timeout = setTimeout(()=>{
                        car[i].hide()
                    },10000)
                    
                    
                }



                        
                    })
        },car2(){
            // 未来三路预警（轮播展示）
            var that = this
            AMapLoader.load({
            key:"ab483676931b5c32ffd436065e5607c1",             // 申请好的Web端开发者Key，首次调用 load 时必填
            version:"2.0",
            "Loca":{                // 是否加载 Loca， 缺省不加载
            "version": '2.0.0'  // Loca 版本，缺省 1.3.2
                },      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins:['AMap.MoveAnimation','AMap.Heatmap','AMap.PlaceSearch','AMap.AutoComplete','AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap)=>{

            // --------------------------------------------------
            // 创建 AMap.Icon 实例：
            const icon = new AMap.Icon({
                    size: new AMap.Size(100, 100),    // 图标尺寸
                    image: require('@/assets/重污染应急.png'),  // Icon的图像
                    
                    imageSize: new AMap.Size(100, 100)   // 根据所设置的大小拉伸或压缩图片
                });

                // 将 Icon 实例添加到 marker 上:
                const marker = new AMap.Marker({
                    position: new AMap.LngLat(114.6039,30.4515128743495),
                    offset: new AMap.Pixel(-10, -10),
                    icon: icon, // 添加 Icon 实例
                    title: '存在污染源',
                    zoom: 13
                });

                setTimeout(()=>{
                    that.map.add(marker);
                },43000)
                



                // ----------------------------------

                // 有多少段数据
                var length =this.rangeJson.list.length

                var i =0 
                var current_number
                var interval = setInterval(function(){
                    var line = that.rangeJson.list[i].point
                    console.log(line);
                    
                    // 此时length%x求余，表示当前在第几趟，并把current_number传递给时间轴组件，并渲染当前位于哪一趟
                    console.log(i+1);
                    console.log(parseInt(i/14));
                    current_number = parseInt(i/14)+1
                    console.log(current_number);
                    bus.$emit('current_Number',current_number)

                    patrol(line,i)
                    i=(i+1)%length
                   
                    // 表示一趟巡检中，每一段颜色（长度可能不一致）展示的时间都是5s
                },4000)

                // 变量i用于保存该段路程，线路的颜色
                function patrol(line,i){
                    // 车
                    
                    var car =[]
                    car[i] = new AMap.Marker({
                    map: that.map,
                    position: line[0],
                    icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
                    offset: new AMap.Pixel(-13, -26),
                });
                
                    var lineArr =line
                    var lineColor 
                    if(that.rangeJson.list[i].color==1){lineColor='#238E23'}
                    else if(that.rangeJson.list[i].color==1.5){lineColor='rgba(34,139,34,0.5)'}
                    else if(that.rangeJson.list[i].color==2){lineColor='rgba(255,215,0,0.5)'}
                    else if(that.rangeJson.list[i].color==3){lineColor='#FF7F00'}
                    else if(that.rangeJson.list[i].color==4){lineColor='#E3170D'}
                    else if(that.rangeJson.list[i].color==5){lineColor='#4F2F4F'}
                    
                    
                    var passedPolyline = new AMap.Polyline({
                        map: that.map,
                        strokeColor: lineColor,  //线颜色
                        strokeWeight: 25,          //线宽
                        strokeOpacity: 0.9      
                    });
                    // 为小车绑定事件，当小车经过时绘制线
                    car[i].on('moving', function (e) {
                        passedPolyline.setPath(e.passedPath);
                        // 镜头移动到当前小车的位置
                    // that.map.setCenter(e.target.getPosition(),true)
                    });

                    window.startAnimation = function startAnimation () {
                        car[i].moveAlong(lineArr, {
                            // 每一段的时长
                            duration: 100,//可根据实际采集时间间隔设置
                            // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
                            autoRotation: true,
                        });
                    };
                    // 存在异步的问题，应该等待动画执行结束，再执行hide
                    startAnimation()
                    var timeout = setTimeout(()=>{
                        car[i].hide()
                    },4000)
                    
                    
                }



                        
                    })
        },
        car3(){
            var that = this
            AMapLoader.load({
            key:"ab483676931b5c32ffd436065e5607c1",             // 申请好的Web端开发者Key，首次调用 load 时必填
            version:"2.0",
            "Loca":{                // 是否加载 Loca， 缺省不加载
            "version": '2.0.0'  // Loca 版本，缺省 1.3.2
                },      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins:['AMap.MoveAnimation','AMap.Heatmap','AMap.PlaceSearch','AMap.AutoComplete','AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap)=>{
          

                // 有多少段数据
                var length_one =this.car1_json.list.length
                var length_two =this.car2_json.list.length


                var i =0
                var ii=0 
                
                
                var interval = setInterval(function(){
                    var line_one = that.car1_json.list[i].point
                    var line_two = that.car2_json.list[ii].point
                    console.log(line_two,line_one);
                    
                    patrol(line_one,line_two,i,ii)
                    i=(i+1)%length_one
                    ii=(ii+1)%length_two
                    // 表示一趟巡检中，每一段颜色（长度可能不一致）展示的时间都是5s
                },500)

                // 变量i用于保存该段路程，线路的颜色
                function patrol(line1,line2,i,ii){
                    // 车
                    console.log(i,ii);
                    var car1 =[]
                    var car2 = []

                    car1[i] = new AMap.Marker({
                    map: that.map,
                    position: line1[0],
                    icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
                    offset: new AMap.Pixel(-13, -26),
                });
                    car2[ii] = new AMap.Marker({
                        map: that.map,
                        position: line2[0],
                        icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
                        offset: new AMap.Pixel(-13, -26),
                    });
                
                    var lineArr1 =line1
                    var lineColor1 

                    var lineArr2 =line2
                    var lineColor2 

                    if(that.car1_json.list[i].color==1){lineColor1='#238E23'}
                    else if(that.car1_json.list[i].color==1.5){lineColor1='rgba(34,139,34,0.5)'}
                    else if(that.car1_json.list[i].color==2){lineColor1='rgba(255,215,0,0.5)'}
                    else if(that.car1_json.list[i].color==3){lineColor1='#FF7F00'}
                    else if(that.car1_json.list[i].color==4){lineColor1='#8C1717'}
                    else if(that.car1_json.list[i].color==5){lineColor1='#4F2F4F'}
                    
                    if(that.car2_json.list[ii].color==1){lineColor2='#238E23'}
                    else if(that.car2_json.list[ii].color==1.5){lineColor2='rgba(34,139,34,0.5)'}
                    else if(that.car2_json.list[ii].color==2){lineColor2='rgba(255,215,0,0.5)'}
                    else if(that.car2_json.list[ii].color==3){lineColor2='#FF7F00'}
                    else if(that.car2_json.list[ii].color==4){lineColor2='#8C1717'}
                    else if(that.car2_json.list[ii].color==5){lineColor2='#4F2F4F'}
                    
                    
                    var passedPolyline1 = new AMap.Polyline({
                        map: that.map,
                        strokeColor: lineColor1,  //线颜色
                        strokeWeight: 25,          //线宽
                        strokeOpacity: 0.9      
                    });

                    var passedPolyline2 = new AMap.Polyline({
                        map: that.map,
                        strokeColor: lineColor2,  //线颜色
                        strokeWeight: 25,          //线宽
                        strokeOpacity: 0.9      
                    });
                    // 为小车绑定事件，当小车经过时绘制线
                    car1[i].on('moving', function (e) {
                        passedPolyline1.setPath(e.passedPath);
                        // 镜头移动到当前小车的位置
                    // that.map.setCenter(e.target.getPosition(),true)
                    });

                    car2[ii].on('moving', function (e) {
                        passedPolyline2.setPath(e.passedPath);
                        // 镜头移动到当前小车的位置
                    // that.map.setCenter(e.target.getPosition(),true)
                    });

                    window.startAnimation = function startAnimation () {
                        car1[i].moveAlong(lineArr1, {
                            // 每一段的时长
                            duration: 10,//可根据实际采集时间间隔设置
                            // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
                            autoRotation: true,
                        });
                        car2[ii].moveAlong(lineArr2, {
                            // 每一段的时长
                            duration: 10,//可根据实际采集时间间隔设置
                            // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
                            autoRotation: true,
                        });
                    };
                    // 存在异步的问题，应该等待动画执行结束，再执行hide
                    startAnimation()
                    var timeout = setTimeout(()=>{
                        car1[i].hide()
                        car2[ii].hide()
                    },500)
                    
                    setTimeout(()=>{
                      clearInterval(interval)
                },16000)
                }



                        
                    })
        },

        warn2(){
            var that = this
            AMapLoader.load({
            key:"ab483676931b5c32ffd436065e5607c1",             // 申请好的Web端开发者Key，首次调用 load 时必填
            version:"2.0",
            "Loca":{                // 是否加载 Loca， 缺省不加载
            "version": '2.0.0'  // Loca 版本，缺省 1.3.2
                },      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins:['AMap.MoveAnimation','AMap.Heatmap','AMap.PlaceSearch','AMap.AutoComplete','AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap)=>{

                var loca = new Loca.Container({
                    map:that.map,
                });

                var geo = new Loca.GeoJSONSource({
                    data:this.warning
                })

            // 文字主体图层
            var zMarker = new Loca.ZMarkerLayer({
                loca: loca,
                zIndex: 120,
                depth: false,
            });
            zMarker.setSource(geo);
            zMarker.setStyle({
                content: (i, feat) => {
                    var props = feat.properties;
                    var leftColor = props.price < 60000 ? 'rgba(0, 28, 52, 0.6)' : 'rgba(33,33,33,0.6)';
                    var rightColor = props.price < 60000 ? '#038684' : 'rgba(172, 137, 51, 0.3)';
                    var borderColor = props.price < 60000 ? '#038684' : 'rgba(227,23,13, 1)';
                    var fontColor= props.price < 60000 ? '#FFF' : 'rgba(227,23,13, 1)';
                    return (
                        '<div style="width: 600px; height: 228px; padding: 0 0;">' +
                        '<p style="display: block; height:80px; line-height:80px;font-size:40px;background-image: linear-gradient(to right, '
                        + leftColor + ',' + leftColor + ',' + rightColor + ',rgba(0,0,0,0.4)); border:4px solid '
                        + borderColor + '; color:'+fontColor+'; border-radius: 15px; text-align:center; margin:0; padding:5px;">' +
                        props['name'] 
                        +
                        ': ' +
                        
                        '</p><span style="width: 130px; height: 130px; margin: 0 auto; display: block; background: url(https://a.amap.com/Loca/static/loca-v2/demos/images/prism_'
                        + (props['price'] < 60000 ? 'blue' : 'yellow') + '.png);"></span></div>'
                    );
                },
                unit: 'meter',
                rotation: 0,
                alwaysFront: true,
                size: [490/2, 222/2],
                altitude: 0,
            });

            // 浮动三角
            var triangleZMarker = new Loca.ZMarkerLayer({
                loca: loca,
                zIndex: 119,
                depth: false,
            });
            triangleZMarker.setSource(geo);
            triangleZMarker.setStyle({
                content: (i, feat) => {
                    return (
                        '<div style="width: 120px; height: 120px; background: url(https://a.amap.com/Loca/static/loca-v2/demos/images/triangle_'
                        + (feat.properties.price < 60000 ? 'blue' : 'yellow')
                        + '.png);"></div>'
                    );
                },
                unit: 'meter',
                rotation: 0,
                alwaysFront: true,
                size: [60, 60],
                altitude: 15,
            });
            triangleZMarker.addAnimate({
                key: 'altitude',
                value: [0, 1],
                random: true,
                transform: 1000,
                delay: 2000,
                yoyo: true,
                repeat: 999999,
            });

            // 呼吸点 蓝色
            var scatterBlue = new Loca.ScatterLayer({
                loca,
                zIndex: 110,
                opacity: 1,
                visible: true,
                zooms: [2, 26],
                depth: false,
            });

            scatterBlue.setSource(geo);
            scatterBlue.setStyle({
                unit: 'meter',
                size: function (i, feat) {
                    return feat.properties.price < 60000 ? [90, 90] : [0, 0];
                },
                texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/scan_blue.png',
                altitude: 20,
                duration: 2000,
                animate: true,
            });

            // 呼吸点 金色
            var scatterYellow = new Loca.ScatterLayer({
                loca,
                zIndex: 110,
                opacity: 1,
                visible: true,
                zooms: [2, 26],
                depth: false
            });

            scatterYellow.setSource(geo);
            scatterYellow.setStyle({
                unit: 'meter',
                size: function (i, feat) {
                    return feat.properties.price > 60000 ? [90, 90] : [0, 0];
                },
                texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/scan_yellow.png',
                altitude: 20,
                duration: 2000,
                animate: true,
            });

            // 启动帧
            loca.animate.start();
            })
        },
        
        heatMap(){
            var that = this
            AMapLoader.load({
            key:"ab483676931b5c32ffd436065e5607c1",             // 申请好的Web端开发者Key，首次调用 load 时必填
            version:"2.0",
            "Loca":{                // 是否加载 Loca， 缺省不加载
            "version": '2.0.0'  // Loca 版本，缺省 1.3.2
                },      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins:['AMap.MoveAnimation','AMap.Heatmap','AMap.PlaceSearch','AMap.AutoComplete','AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap)=>{

                var loca = new Loca.Container({
                    map:that.map,
                });

                var geo = new Loca.GeoJSONSource({
                    data:this.obj
                });

                var heatmap = new Loca.HeatMapLayer({
                    // loca,
                    zIndex: 10,
                    opacity: 0.75,
                    visible: true,
                    zooms: [2, 22],
                });


                heatmap.setSource(geo, {
                    radius: 130,
                    unit: 'meter',
                    height: 0,
                    difference: true,
                    gradient: {
                        // 单色范围分析
                1: '#8E2323',
                0.8: '#CC0000',
                0.6: '#FF0000',
                0.5: '#FF3300',
                0.4: '#FF6666',
                0.2: '#FFCCCC',

                // 1: '#F31212',
                // 0.8: '#7A0404',
                // 0.6: '#8E0707',
                // 0.5: '#A20909',
                // 0.4: '#B70B0B',
                // 0.2: '#DF1010',

                // 多色
                // 1: '#FF4C2F',
                // 0.8: '#FAA53F',
                // 0.6: '#FFF100',
                // 0.5: '#7DF675',
                // 0.4: '#5CE182',
                // 0.2: '#29CF6F',
            },
                    value: function (index, feature) {
                        return feature.properties.count;
                    },
                    opacity: [0, 1],
                    heightBezier: [0, 0.53, 0.37, 0.98]
                });
                loca.add(heatmap);

                that.map.on('click', () => {

                    const icon = new AMap.Icon({
                    size: new AMap.Size(250, 180),    // 图标尺寸
                    image: require('@/assets/图片2.png'),  // Icon的图像
                    
                    imageSize: new AMap.Size(250, 180)   // 根据所设置的大小拉伸或压缩图片
                });

                // 将 Icon 实例添加到 marker 上:
                const marker = new AMap.Marker({
                    zIndex:11,
                    position: new AMap.LngLat(114.60314714718476 ,30.45173474630128),
                    offset: new AMap.Pixel(-10, -10),
                    icon: icon, // 添加 Icon 实例
                    title: '存在污染源',
                    zoom: 13
                });
                
                    that.map.add(marker);

                    heatmap.addAnimate({
                        key: 'radius',
                        value: [0, 1],
                        random: true,
                        transform: 1000,
                        delay: 6000,
                        easing: 'BounceOut' //https://redmed.github.io/chito/example/easing.html
                    });
                });
                console.log('heatmap');
            })
        },

        switch(){
            var list = this.car2_json.list
            this.obj = {
                "type": "FeatureCollection",
                "features": []
            }
            for (var i=0;i<list.length;i++){
                var type = list[i].color
                for (var j=0;j<list[i].point.length;j++){
                    var o ={
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": list[i].point[j]
                        },
                        "properties": {
                            "count": type
                        }
                    }
                    this.obj.features.push(o)
                }
            }
            
            console.log(this.obj.features);
        }  ,
        range_pm25_show_new(){
      var that = this
      AMapLoader.load({
        key:"ab483676931b5c32ffd436065e5607c1",
        version:"2.0",
        plugins:['AMap.Heatmap','AMap.PlaceSearch','AMap.AutoComplete','AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap)=>{
        // let arr0=[];
        // fetch("http://175.178.67.109:8801/swagger/getAnalySensor8ShortRoad", {})
        //   .then(response =>
        //       // console.log("response:",response)
        //       response.text()
        // ).then(result => {
        //     let result_list = JSON.parse(result)
        //     console.log('aaaaa:',result_list);
        //     let date="2023-07-25 10:00:00";
        //     for(let i=0;i<result_list.length;i++){
        //       if(new Date(result_list[i].time)>new Date(date)){
        //         console.log("result_list[i]",result_list[i])
        //         arr0.push(result_list[i]);
        //       }
        //     }
        //   console.log("arr0:",arr0)
        //   console.log("arr0[0]:",arr0["0"])
        //   let temparr=[
        //     [arr0[0].longitude,arr0[0].latitude],
        //     [arr0[1].longitude,arr0[1].latitude],
        //     [arr0[2].longitude,arr0[2].latitude],
        //     [arr0[3].longitude,arr0[3].latitude],
        //     [arr0[4].longitude,arr0[4].latitude],
        //     [arr0[5].longitude,arr0[5].latitude],
        //     [arr0[6].longitude,arr0[6].latitude],
        //     [arr0[7].longitude,arr0[7].latitude]
        //   ]
        //   console.log("temparr",temparr)
        //   let lineOne=turf.lineString(temparr)
        //   console.log("lineOne:",lineOne)
        //   let buffered1=turf.buffer(lineOne,0.01,{unites:'miles'});
        //   console.log("buffered1:",buffered1)
        //   let buffered2=turf.buffer(lineOne,0.03,{unites:'miles'});
        //   console.log("buffered2:",buffered2)
        //
        //   // let a1=reduceDimension(buffered1.geometry.coordinates);
        //   // let a2=reduceDimension(buffered2.geometry.coordinates)
        //
        //   buffered1.geometry.coordinates[0].push(buffered1.geometry.coordinates[0][0])
        //   buffered2.geometry.coordinates[0].push(buffered2.geometry.coordinates[0][0])
        //   let a1=[buffered1.geometry.coordinates];
        //   let a2=[buffered2.geometry.coordinates];
        //
        //   const polygon = new AMap.Polygon({
        //     path: a1,
        //     fillColor: '#EE675D', // 多边形填充颜色
        //     strokeOpacity: 1, // 线条透明度
        //     fillOpacity: 1, //填充透明度
        //     strokeColor: '#EE675D', // 线条颜色
        //     // strokeWeight: 1, //线条宽度
        //     // strokeStyle: 'dashed', // 线样式
        //     // strokeDasharray: [5, 5], //轮廓的虚线和间隙的样式
        //   });
        //   const polygon1 = new AMap.Polygon({
        //     path: a2,
        //     fillColor: '#EE675D', // 多边形填充颜色
        //     strokeOpacity: 0.5, // 线条透明度
        //     fillOpacity: 0.5, //填充透明度
        //     strokeColor: '#EE675D', // 线条颜色
        //     // strokeWeight: 1, //线条宽度
        //     // strokeStyle: 'dashed', // 线样式
        //     // strokeDasharray: [5, 5], //轮廓的虚线和间隙的样式
        //   });
        //   that.map.add(polygon)
        //   that.map.add(polygon1)
        // })

        let pointData=[{
          "color":5,
          "point":[
          [114.60305364140606,30.45181184886236],[114.6033382242108,30.451790820897187],[114.60356589045455,30.45179783021942],[114.60378542576109,30.451790820897187],[114.60417571075038,30.451727736974515],[114.60447655542964,30.451734746301252],[114.6047448763598,30.451720727647245],[114.60499693541539,30.451720727647245],[114.60519207791003,30.451699699662427],[114.60515955416093,30.45153848496145],[114.60514329228636,30.451412316748566],[114.60511889947458,30.451251101572183],[114.60511076853726,30.45106184863355],[114.60506198291364,30.450851567159585],[114.60504572103906,30.45067633225137],[114.6050375901018,30.450522125271508],[114.60505385197632,30.450304833203926],[114.60495628072903,30.45029081434425],[114.6047774001089,30.450311842633024],[114.60462291230067,30.450339880344387],[114.60446029355512,30.45035389919704],[114.60428954387226,30.450360908622603],[114.6041594488758,30.450367918047657],[114.603988699193,30.45037492747223],[114.60380981857287,30.450402965165424],[114.6036634617019,30.450402965165424],[114.60348458108183,30.45040997458745],[114.60334635514812,30.45040997458745],[114.60321626015161,30.45038894631982],[114.60302111765697,30.45035389919704],[114.6028422370369,30.450318852061617],[114.60272840391497,30.450325861489723],[114.6027202729777,30.45040997458745],[114.60276905860138,30.450522125271508],[114.6028422370369,30.450620257014183],[114.60292354640967,30.450795492023236],[114.6029804629706,30.450942689187343],[114.60300485578244,30.451103904873886],[114.60300485578244,30.451223064122974],[114.60305364140606,30.451349232580863],[114.60305364140606,30.451482410220333],[114.6030780342179,30.451615587677793],[114.60310242702974,30.451755774278514]
          ]
        },
        {
          "color":4,
          "point":[
        [114.60521647072187,30.452008109651672],[114.60527338728286,30.45216932357578],[114.60532217290648,30.452323527949318],[114.60533843478106,30.45249875989578],[114.60543600602841,30.452765111850955],[114.60550918446387,30.453031463078165],[114.60320812921435,30.452246425793057],[114.60324878390077,30.4523585743638],[114.60325691483808,30.452477732078844],[114.60328130764987,30.452631935964355],[114.6033057004617,30.45283520434975],[114.60331383139896,30.453010435376164],[114.60332196233628,30.453213702972068],[114.60333009327348,30.45336089648373],[114.6028422370369,30.451945025869634],[114.6026145707931,30.451909979306404],[114.60232998798841,30.451916988620063],[114.60206979799551,30.451916988620063],[114.60173642956715,30.451909979306404],[114.60138679926422,30.451916988620063],[114.60115913302047,30.451923997933214],[114.60083389552938,30.451931007245854],[114.60063875303467,30.451931007245854],[114.60045174147729,30.451945025869634],[114.60032977741815,30.451909979306404],[114.6001996824217,30.451938016557985],[114.60007771836251,30.451959044491353],[114.602582047044,30.4504029651654],[114.60229746423926,30.4504029651654],[114.60211858361919,30.450353899197015],[114.60195596487364,30.450311842633024],[114.60174456050441,30.450276795482488],[114.60152502519793,30.450234738885243],[114.60128922801687,30.4502137105798],[114.60099651427493,30.450150625636272],[114.60071193147019,30.450087540651907],[114.6005167889756,30.450031465075956],[114.60291541547241,30.450178663393995],[114.60293167734693,30.450052493420735],[114.60296420109603,30.449940342196268],[114.60298859390787,30.449772115117586],[114.6030129867197,30.449617906707058],[114.6030455104688,30.449435660089158],[114.60315121265347,30.449131051477877],[114.60317560546525,30.449011889671038],[114.60333009327354,30.448829641919943],[114.60339514077174,30.448626365180196],[114.60343579545815,30.44847215495688],[114.60345205733273,30.448282896622093],[114.60511889947458,30.45011237846466],[114.60511076853732,30.4499932178576],[114.60511076853732,30.449881066564913],[114.60511076853732,30.4497689151432],[114.60511889947458,30.449656763592404],[114.60512703041184,30.44953059294352],[114.60512703041184,30.449383393646738],[114.60515142322367,30.44925021313902],[114.60515142322367,30.449138060991377],[114.60517988150417,30.448787584698238],[114.60518801244143,30.448647393828093],[114.6052693218142,30.448629577997405],[114.60527338728286,30.448385995836496],
]
        }


        ]
        //
        let coordinatesArr=[]
        let j=0;
        console.log("length:",pointData.length)
        for(let i=0;i<pointData.length;i++){
          let line=turf.lineString(pointData[i].point)
          let radius=0;
          switch(pointData[i].color){
            case 0:
              radius=0.018;
              break;
            case 1:
              radius=0.058;
              break;
            case 2:
              radius=0.009;
              break;
            case 3:
              radius=0.010;
              break;
            case 4:
              radius=0.023;
              break;
            case 5:
              radius=0.008;
              break;
          }

          let bufferOne=turf.buffer(line,radius+0.01,{unites:'miles'});
          let bufferTwo=turf.buffer(line,radius+0.03,{unites:'miles'});
          let bufferThree=turf.buffer(line,radius+0.06,{unites:'miles'});
          console.log("bufferOne,bufferTwo,bufferThree",bufferOne,bufferTwo,bufferThree)

          let lengthOne=bufferOne.geometry.coordinates[0].length;
          let lengthTwo=bufferTwo.geometry.coordinates[0].length;
          let lengthThree=bufferThree.geometry.coordinates[0].length;
          bufferOne.geometry.coordinates[0][lengthOne]=bufferOne.geometry.coordinates[0][0];
          bufferTwo.geometry.coordinates[0][lengthTwo]=bufferTwo.geometry.coordinates[0][0];
          bufferThree.geometry.coordinates[0][lengthThree]=bufferThree.geometry.coordinates[0][0];
          let inCoordinates=[bufferOne.geometry.coordinates];
          let outCoordinates1=[bufferTwo.geometry.coordinates];
          let outCoordinates2=[bufferThree.geometry.coordinates];
          let color=getColor(pointData[i].color);
          coordinatesArr[j]=[inCoordinates,outCoordinates1,outCoordinates2,color];
          j=j+1
        }

        for(let i=0;i<coordinatesArr.length;i++){
          let polygon = new AMap.Polygon({
            path: coordinatesArr[i][0],
            fillColor: coordinatesArr[i][3], // 多边形填充颜色
            strokeOpacity: 1, // 线条透明度
            fillOpacity: 1, //填充透明度
            strokeColor: coordinatesArr[i][3], // 线条颜色
          });
          let polygon1 = new AMap.Polygon({
            path:coordinatesArr[i][1],
            fillColor: coordinatesArr[i][3], // 多边形填充颜色
            strokeOpacity: 0.5, // 线条透明度
            fillOpacity: 0.5, //填充透明度
            strokeColor: coordinatesArr[i][3], // 线条颜色
          });
          let polygon2 = new AMap.Polygon({
            path:coordinatesArr[i][2],
            fillColor: coordinatesArr[i][3], // 多边形填充颜色
            strokeOpacity: 0.2, // 线条透明度
            fillOpacity: 0.2, //填充透明度
            strokeColor: coordinatesArr[i][3], // 线条颜色
          });

          // polygon.on('mouseover', () => { // 鼠标移入更改样式
          //   polygon.setOptions({
          //     fillOpacity: 0.7,
          //     fillColor: '#7bccc4'
          //   })
          //   console.log("aa:",i);
          // })

          that.map.add(polygon2)
          that.map.add(polygon1)
          that.map.add(polygon)

        }
        // getPoint()
        // let pp=getPoint()
        // console.log("pp:",pp)
        // for(let i=0;i<pp.length;i++){
        //   that.map.add(pp[0])
        //   that.map.add(pp[1])
        // }
        //----------------点------------------------------
        function getPoint(){
          let coordinatesArr=[]
          let j=0;
          for(let i=0;i<pointData.length;i++) {
            let pointArr = pointData[i].point;
            console.log("pointArr:",pointArr)
            for (let m = 0; m < pointArr.length; m++) {
              let point = turf.point(pointArr[m])
              let bufferOne;
              let bufferTwo;
              let bufferThree;
              let radius=0;
              switch(pointData[i].color){
                case 0:
                  radius=0.002;
                  // radius=0.001;
                  break;
                case 1:
                  radius=0.004;
                  // radius=0.002;
                  break;
                case 2:
                  radius=0.006;
                  // radius=0.003;
                  break;
                case 3:
                  radius=0.008;
                  break;
                case 4:
                  radius=0.010;
                  break;
                case 5:
                  radius=0.012;
                  break;
              }

              bufferOne = turf.buffer(point, radius, {unites: 'miles'});
              bufferTwo = turf.buffer(point, radius+0.02, {unites: 'miles'});
              bufferThree = turf.buffer(point, radius+0.04, {unites: 'miles'});
              // bufferTwo = turf.buffer(point, radius+0.03, {unites: 'miles'});
              // bufferThree = turf.buffer(point, radius+0.06, {unites: 'miles'});
              bufferOne.geometry.coordinates[0].push(bufferOne.geometry.coordinates[0][0]);
              bufferTwo.geometry.coordinates[0].push(bufferTwo.geometry.coordinates[0][0]);
              bufferThree.geometry.coordinates[0].push(bufferThree.geometry.coordinates[0][0]);
              let inCoordinates = [bufferOne.geometry.coordinates];
              let outCoordinates1 = [bufferTwo.geometry.coordinates];
              let outCoordinates2 = [bufferThree.geometry.coordinates];
              let color = getColor(pointData[i].color);
              // coordinatesArr.push([inCoordinates,outCoordinates,color])
              coordinatesArr[j++] = [inCoordinates, outCoordinates1, outCoordinates2, color]
              console.log("coordinatesArr:",coordinatesArr)
            }
          }

          for(let i=0;i<coordinatesArr.length;i++){
            // let polygon = new AMap.Polygon({
            //   path: coordinatesArr[i][0],
            //   fillColor: coordinatesArr[i][3], // 多边形填充颜色
            //   strokeOpacity: 1, // 线条透明度
            //   fillOpacity: 1, //填充透明度
            //   strokeColor: coordinatesArr[i][3], // 线条颜色
            // });
            let polygon1 = new AMap.Polygon({
              path:coordinatesArr[i][1],
              fillColor: coordinatesArr[i][3], // 多边形填充颜色
              strokeOpacity: 0.5, // 线条透明度
              fillOpacity: 0.5, //填充透明度
              strokeColor: coordinatesArr[i][3], // 线条颜色
            });
            let polygon2 = new AMap.Polygon({
              path:coordinatesArr[i][2],
              fillColor: coordinatesArr[i][3], // 多边形填充颜色
              strokeOpacity: 0.2, // 线条透明度
              fillOpacity: 0.2, //填充透明度
              strokeColor: coordinatesArr[i][3], // 线条颜色
            });

            // that.map.add(polygon)
            that.map.add(polygon1)
            that.map.add(polygon2)
          }

        }
        // let coordinatesArr=[]
        // let j=0;
        // for(let i=0;i<pointData.length;i++) {
        //   let pointArr = pointData[i].point;
        //   console.log("pointArr:",pointArr)
        //   for (let m = 0; m < pointArr.length; m++) {
        //     let point = turf.point(pointArr[m])
        //     let bufferOne;
        //     let bufferTwo;
        //     let bufferThree;
        //     let radius=0;
        //     switch(pointData[i].color){
        //       case 0:
        //         radius=0.002;
        //         break;
        //       case 1:
        //         radius=0.004;
        //         break;
        //       case 2:
        //         radius=0.006;
        //         break;
        //       case 3:
        //         radius=0.008;
        //         break;
        //       case 4:
        //         radius=0.010;
        //         break;
        //       case 5:
        //         radius=0.012;
        //         break;
        //     }
        //
        //     bufferOne = turf.buffer(point, radius, {unites: 'miles'});
        //     bufferTwo = turf.buffer(point, radius+0.02, {unites: 'miles'});
        //     bufferThree = turf.buffer(point, radius+0.04, {unites: 'miles'});
        //     bufferOne.geometry.coordinates[0].push(bufferOne.geometry.coordinates[0][0]);
        //     bufferTwo.geometry.coordinates[0].push(bufferTwo.geometry.coordinates[0][0]);
        //     bufferThree.geometry.coordinates[0].push(bufferThree.geometry.coordinates[0][0]);
        //     let inCoordinates = [bufferOne.geometry.coordinates];
        //     let outCoordinates1 = [bufferTwo.geometry.coordinates];
        //     let outCoordinates2 = [bufferThree.geometry.coordinates];
        //     let color = getColor(pointData[i].color);
        //     // coordinatesArr.push([inCoordinates,outCoordinates,color])
        //     coordinatesArr[j++] = [inCoordinates, outCoordinates1, outCoordinates2, color]
        //     console.log("coordinatesArr:",coordinatesArr)
        //   }
        // }
        // //----------------------------------------------
        //
        // //   let line=turf.lineString(pointData[i].point)
        // //   let bufferOne=turf.buffer(line,0.01,{unites:'miles'});
        // //   let bufferTwo=turf.buffer(line,0.03,{unites:'miles'});
        // //   bufferOne.geometry.coordinates[0].push(bufferOne.geometry.coordinates[0][0]);
        // //   bufferTwo.geometry.coordinates[0].push(bufferTwo.geometry.coordinates[0][0]);
        // //   let inCoordinates=[bufferOne.geometry.coordinates];
        // //   let outCoordinates=[bufferTwo.geometry.coordinates];
        // //   let color=getColor(pointData[i].color);
        // //   coordinatesArr.push([inCoordinates,outCoordinates,color])
        // // }
        // // console.log("coordinatesArr[1][0][0][0]:",coordinatesArr[1][0][0][0])
        // // let result=[]
        // // let arr1=[]
        // // for(let i=0;i<coordinatesArr.length;i++){
        // //   arr1.push([coordinatesArr[i][0][0][0][0],coordinatesArr[i][0][0][0][1]])
        // // }
        // // console.log("arr1:",arr1)
        //
        // for(let i=0;i<coordinatesArr.length;i++){
        //   // let polygon = new AMap.Polygon({
        //   //   path: coordinatesArr[i][0],
        //   //   fillColor: coordinatesArr[i][3], // 多边形填充颜色
        //   //   strokeOpacity: 1, // 线条透明度
        //   //   fillOpacity: 1, //填充透明度
        //   //   strokeColor: coordinatesArr[i][3], // 线条颜色
        //   // });
        //   let polygon1 = new AMap.Polygon({
        //     path:coordinatesArr[i][1],
        //     fillColor: coordinatesArr[i][3], // 多边形填充颜色
        //     strokeOpacity: 0.5, // 线条透明度
        //     fillOpacity: 0.5, //填充透明度
        //     strokeColor: coordinatesArr[i][3], // 线条颜色
        //   });
        //   let polygon2 = new AMap.Polygon({
        //     path:coordinatesArr[i][2],
        //     fillColor: coordinatesArr[i][3], // 多边形填充颜色
        //     strokeOpacity: 0.2, // 线条透明度
        //     fillOpacity: 0.2, //填充透明度
        //     strokeColor: coordinatesArr[i][3], // 线条颜色
        //   });
        //   // that.map.add(polygon)
        //   that.map.add(polygon1)
        //   that.map.add(polygon2)
        // }


        // console.log("temparr",temparr)
        // let lineOne=turf.lineString(temparr)
        // console.log("lineOne:",lineOne)
        // let buffered1=turf.buffer(lineOne,0.01,{unites:'miles'});
        // console.log("buffered1:",buffered1)
        // let buffered2=turf.buffer(lineOne,0.03,{unites:'miles'});
        // console.log("buffered2:",buffered2)

        // let a1=reduceDimension(buffered1.geometry.coordinates);
        // let a2=reduceDimension(buffered2.geometry.coordinates)

        // buffered1.geometry.coordinates[0].push(buffered1.geometry.coordinates[0][0])
        // buffered2.geometry.coordinates[0].push(buffered2.geometry.coordinates[0][0])
        // let a1=[buffered1.geometry.coordinates];
        // let a2=[buffered2.geometry.coordinates];

        // const polygon = new AMap.Polygon({
        //   path: a1,
        //   fillColor: '#EE675D', // 多边形填充颜色
        //   strokeOpacity: 1, // 线条透明度
        //   fillOpacity: 1, //填充透明度
        //   strokeColor: '#EE675D', // 线条颜色
        //   // strokeWeight: 1, //线条宽度
        //   // strokeStyle: 'dashed', // 线样式
        //   // strokeDasharray: [5, 5], //轮廓的虚线和间隙的样式
        // });
        // const polygon1 = new AMap.Polygon({
        //   path: a2,
        //   fillColor: '#EE675D', // 多边形填充颜色
        //   strokeOpacity: 0.5, // 线条透明度
        //   fillOpacity: 0.5, //填充透明度
        //   strokeColor: '#EE675D', // 线条颜色
        //   // strokeWeight: 1, //线条宽度
        //   // strokeStyle: 'dashed', // 线样式
        //   // strokeDasharray: [5, 5], //轮廓的虚线和间隙的样式
        // });
        // that.map.add(polygon)
        // that.map.add(polygon1)


        function reduceDimension(arr) {
          let reduced = [];
          for (let i = 0; i < arr.length; i++) {
            reduced = reduced.concat(...arr[i]);
          }
          console.log("reduced:",reduced)
          return reduced;
        }

      // function getColor(num){
      //     switch(num){
      //       case 0:
      //         return "#EE675D";
      //         break;
      //       case 1:
      //         return "#EC534B";
      //         break;
      //       case 2:
      //         return "#EB403A";
      //         break;
      //       case 3:
      //         return "#E92C28";
      //         break;
      //       case 4:
      //         return "#E81917";
      //         break;
      //       case 5:
      //         return "#E60505";
      //         break;
      //     }
      // }
        function getColor(num){
          switch(num){
            case 0:
              return "#F7B3B3";
              break;
            case 1:
              return "#EB9090";
              break;
            case 2:
              return "#DE6E6E";
              break;
            case 3:
              return "#D24B4B";
              break;
            case 4:
              return "#C52929";
              break;
            case 5:
              return "#B90606";
              break;
          }
        }

        // let a=new AMap.CircleMarker({
        //   center: new AMap.LngLat(114.6079752679767, 30.451266949563507),
        //   // 半径
        //   radius: 50,//3D视图下，CircleMarker半径不要超过64px
        //   // 填充颜色
        //   fillColor: 'rgba(255,99,71,0.8)',
        //   // 填充透明度
        //   fillOpacity: 1,
        //   // 覆盖层级
        //   zIndex: 10,
        //   strokeColor: 'white',
        //   strokeWeight: 0,
        //   strokeOpacity: 0,
        //   bubble: true,
        //   cursor: 'pointer',
        //   clickable: true
        // })
        // that.map.add(a)

    })
  }
            

    },
    created(){
      bus.$on('shareMap',(msg)=>{
          this.map = msg
        })
    },
    watch:{
        range_ShowOrNot(newValue){
            var that = this
        if (newValue){
            console.log('污染预警：True');
            // that.range_pm25_show_new()

            this.switch()
            this.heatMap()

            // this.car3()  
            // setTimeout(()=>{
            //     that.range_pm25_show_new()
            // },20000)


            
            

            // setTimeout(()=>{
            //     that.warn2()
            // },50000)
            // this.warn2()

            // 
            // this.car2()
            // setTimeout(()=>{
            //     this.switch()
            //     that.heatMap()
            // },70000)



            
        }
        else{
            console.log('污染预警：False');
        }
      },
      stop(value){
        if(value>this.future3Json.list.length){
            clearInterval(that.interval)
        }
      }
    }
  }
</script>

<style>

</style>