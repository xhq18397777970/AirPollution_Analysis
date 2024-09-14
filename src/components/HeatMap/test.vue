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
  import car2_json from './Json/car_two.json'
  export default {
    components:[],
    props:{
        heatmap_ShowOrNot:Boolean
    },
    
    name:'test',
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
        },
        
        
        // 未来三路预警（轮播展示）
        car2(){

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
                    position: new AMap.LngLat(120.0823603228252 ,36.76108847431574),
                    offset: new AMap.Pixel(-10, -10),
                    icon: icon, // 添加 Icon 实例
                    title: '存在污染源',
                    zoom: 13
                });

                setTimeout(()=>{
                    that.map.add(marker);
                },30000)
                


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
                    that.map.setCenter(e.target.getPosition(),true)
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
                    opacity: 1,
                    visible: true,
                    zooms: [2, 22],
                });


                heatmap.setSource(geo, {
                    radius: 80,
                    unit: 'meter',
                    height: 0,
                    difference: true,
                    gradient: {
                1: '#FF4C2F',
                0.8: '#FAA53F',
                0.6: '#FFF100',
                0.5: '#7DF675',
                0.4: '#5CE182',
                0.2: '#29CF6F',
            },
                    value: function (index, feature) {
                        return feature.properties.count;
                    },
                    opacity: [0, 1],
                    heightBezier: [0, 0.53, 0.37, 0.98]
                });
                loca.add(heatmap);

                that.map.on('click', () => {
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
        }  
            
                

    },
    created(){
      bus.$on('shareMap',(msg)=>{
          this.map = msg
        })
    },
    watch:{
        heatmap_ShowOrNot(newValue){
            var that = this
        if (newValue){
            console.log('污染预警：True');

            // RAQI展示，热力图形式（先用switch()将json数据转化为热力图需要的key—value数据）
            // this.switch()
            // this.heatMap()

            // 态势预警
            this.car2()
            setTimeout(()=>{
                that.warn2()
            },57000)
            


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