
<template>
    <div >

    </div>
  </template>

<script src="https://cdn.staticfile.org/echarts/4.3.0/echarts.min.js"></script>
  <script>
  
  import bus from '@/bus/bus.js'
  import Element from 'element-ui'
  import AMapLoader from '@amap/amap-jsapi-loader'
  import echarts, * as Echart from '@/js/echarts.js'
  import $ from 'jquery';
  

    export default {
        components:{Element,Echart},
        props:{
            carouselO3_ShowOrNot:Boolean,
        },
      data() {
        return {
          
        
          // 从mapcontainer接受过来的map实例
          map:null,
          // 存放圆点标记（circlemarker）的数组
          
          // 存放圆点标记的覆盖物组（类型为对象）
          overlayGroup:null,

          // 循环定时器（定义全局变量用于取消定时器）
          clock:null,
          // 存放marker
          marker_list:[],

          current_number:0,



        };
      },
      computed:{

      },
      methods: {
          carousel_o3_show(){
            var that = this
            AMapLoader.load({
            key:"ab483676931b5c32ffd436065e5607c1",             // 申请好的Web端开发者Key，首次调用 load 时必填
            version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins:['AMap.Heatmap','AMap.PlaceSearch','AMap.AutoComplete','AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap)=>{


          // 利用该点进行初始化
          var demo = new AMap.CircleMarker({
                    center: new AMap.LngLat(114.61523102851,30.460059529145),
                    // 半径
                    radius: 5,//3D视图下，CircleMarker半径不要超过64px
                    // 填充颜色
                    fillColor: 'rgba(228,228,0)',
                    // 填充透明度
                    fillOpacity: 1,
                    // 覆盖层级
                    zIndex: 10,
                    strokeColor: 'white',
                    strokeWeight: 0,
                    strokeOpacity: 0,
                    bubble: true,
                    cursor: 'pointer',
                    clickable: true
                })
          var ll = []
          ll.push(demo)
          that.overlayGroup = new AMap.OverlayGroup(ll);
                var clickMarkerHandler = function(event){
                  console.log("初始化点，绑定事件");
                }
          that.overlayGroup.on('click', clickMarkerHandler)


                // 正式调用接口，读取数据
          var myHeaders = new Headers();
          myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
          
              var requestOptions = {
                method: 'GET',
                async:false,
                headers: myHeaders,
                redirect: 'follow'
              };

            fetch("http://175.178.67.109:8801/swagger/get3Days", requestOptions)
              .then(response => response.text())
              .then(result => {
                    var obj = JSON.parse(result)
                    var l =[]
                  l.push(obj['before_yesterday:0'],obj['before_yesterday:1'],obj['before_yesterday:2'],obj['before_yesterday:3'],obj['before_yesterday:4'],
                  obj['yesterday:0'],obj['yesterday:1'],obj['yesterday:2'],obj['yesterday:3'],obj['yesterday:4'],
                    obj['today:0'],obj['today:1'],obj['today:2'],obj['today:3'],obj['today:4'],
                  
                  )
                  console.log(l);
                
                  var i=0
                  
                  
                  that.clock = setInterval(function(){
                    
                    console.log("巡检数据轮播开始");
                    
                    for(var t=0;t<that.marker_list.length;t++){
                      // 清除原有的marker
                      that.marker_list[t].hide()
                    }

                    // 清楚map上的标记点
                    // that.overlayGroup.clearOverlays()


                    // 清楚marker的绑定事件
                    // that.map.off('click',clickMarkerHandler)

                    // info列表存放每趟轮播的数据
                    var info = l[i]

                    
                    console.log("开始第"+i+"趟巡检");
                    console.log(info);

                    that.current_number = i+1                      
                    bus.$emit('current_Number',that.current_number)
          
                    successively_display(info);
                    i=(i+1)%15
                  },51000)



                  function successively_display(list){
                      
                    const icon = new AMap.Icon({
                        size: new AMap.Size(40, 50),    // 图标尺寸
                        image: require('@/img/car5.png'),  // Icon的图像
                        imageSize: new AMap.Size(40, 40)   // 根据所设置的大小拉伸或压缩图片
                    });
                    for (var j=0;j<51;j++){

                      var timeout_clock = setTimeout(function(j) {
                            return function() {
                              var lat = list[j].latitude
                              var lng = list[j].longitude
                              var o3 = list[j].o3

                              if(0<o3&&o3<=160){
                        var circleMarker = new AMap.CircleMarker({
                    center: new AMap.LngLat(lng,lat),
                    // 半径
                    radius: 20,//3D视图下，CircleMarker半径不要超过64px
                    // 填充颜色
                    fillColor: 'rgba(0,228,0,0.8)',
                    // 填充透明度
                    fillOpacity: 1,
                    // 覆盖层级
                    zIndex: 10,
                    bubble: true,
                    cursor: 'pointer',
                    clickable: true
                })
                circleMarker.setOptions({strokeColor:'#00CC00',strokeOpacity:1,strokeWeight:2,})
                // 为圆点坐标设置自定义属性，将原始的经纬度，定义为该圆点坐标的属性（使用：setExtData（），取数据：getExtData
                var params={}
                circleMarker.setExtData(params={
                  "lng":lng,
                  "lat":lat,
                  "id":i
                })
                circleMarker.setMap(that.map)
                that.marker_list.push(circleMarker)

                var car = new AMap.Marker({
                    position: new AMap.LngLat(lng,lat),
                    offset: new AMap.Pixel(-20, -20),
                    icon: icon, // 添加 Icon 图标 URL
                    title: 'car'
                });

                that.map.add(car)


                var car_display_clock = setTimeout(function(){
                  car.hide()
                },1000)
                
                      }
                      
                      
                      
                      
                      else if(160<=o3&&o3<=200){
                        var circleMarker = new AMap.CircleMarker({
                    center: new AMap.LngLat(lng,lat),
                    // 半径
                    radius: 23,//3D视图下，CircleMarker半径不要超过64px
                    // 填充颜色
                    fillColor: 'rgba(255,255,0,0.8)',
                    // 填充透明度
                    fillOpacity: 1,
                    // 覆盖层级
                    zIndex: 10,
                    bubble: true,
                    cursor: 'pointer',
                    clickable: true
                })
                circleMarker.setOptions({strokeColor:'#FFCC33',strokeOpacity:1,strokeWeight:2,})
                // 为圆点坐标设置自定义属性，将原始的经纬度，定义为该圆点坐标的属性（使用：setExtData（），取数据：getExtData
                var params={}
                circleMarker.setExtData(params={
                  "lng":lng,
                  "lat":lat,
                  "id":i
                })
                circleMarker.setMap(that.map)
                that.marker_list.push(circleMarker)

                var car = new AMap.Marker({
                    position: new AMap.LngLat(lng,lat),
                    offset: new AMap.Pixel(-20, -20),
                    icon: icon, // 添加 Icon 图标 URL
                    title: 'car'
                });

                that.map.add(car)


                var car_display_clock = setTimeout(function(){
                  car.hide()
                },1000)



                      }else if (200<=o3&&o3<=300){
                        var circleMarker = new AMap.CircleMarker({
                    center: new AMap.LngLat(lng,lat),
                    // 半径
                    radius: 26,//3D视图下，CircleMarker半径不要超过64px
                    // 填充颜色
                    fillColor: 'rgba(255,126,0,0.8)',
                    // 填充透明度
                    fillOpacity: 1,
                    // 覆盖层级
                    zIndex: 10,
                    bubble: true,
                    cursor: 'pointer',
                    clickable: true
                })
                circleMarker.setOptions({strokeColor:'#CC6600',strokeOpacity:1,strokeWeight:2})
                // 为圆点坐标设置自定义属性，将原始的经纬度，定义为该圆点坐标的属性（使用：setExtData（），取数据：getExtData
                var params={}
                circleMarker.setExtData(params={
                  "lng":lng,
                  "lat":lat,
                  "id":i
                })
                circleMarker.setMap(that.map)
                that.marker_list.push(circleMarker)



                var car = new AMap.Marker({
                    position: new AMap.LngLat(lng,lat),
                    offset: new AMap.Pixel(-20, -20),
                    icon: icon, // 添加 Icon 图标 URL
                    title: 'car'
                });

                that.map.add(car)


                var car_display_clock = setTimeout(function(){
                  car.hide()
                },1000)


                      }else if(300<=o3&&o3<=400){
                        var circleMarker = new AMap.CircleMarker({
                    center: new AMap.LngLat(lng,lat),
                    // 半径
                    radius: 27,//3D视图下，CircleMarker半径不要超过64px
                    // 填充颜色
                    fillColor: 'rgba(255,0,0,0.8)',
                    // 填充透明度
                    fillOpacity: 1,
                    // 覆盖层级
                    zIndex: 10,
                    bubble: true,
                    cursor: 'pointer',
                    clickable: true
                })
                circleMarker.setOptions({strokeColor:'#990000',strokeOpacity:1,strokeWeight:2,})
                // 为圆点坐标设置自定义属性，将原始的经纬度，定义为该圆点坐标的属性（使用：setExtData（），取数据：getExtData
                var params={}
                circleMarker.setExtData(params={
                  "lng":lng,
                  "lat":lat,
                  "id":i
                })
                circleMarker.setMap(that.map)
                that.marker_list.push(circleMarker) ;



                var car = new AMap.Marker({
                    position: new AMap.LngLat(lng,lat),
                    offset: new AMap.Pixel(-20, -20),
                    icon: icon, // 添加 Icon 图标 URL
                    title: 'car'
                });

                that.map.add(car)


                var car_display_clock = setTimeout(function(){
                  car.hide()
                },1000)


                      }else if(400<=o3&&o3<=800){
                        var circleMarker = new AMap.CircleMarker({
                    center: new AMap.LngLat(lng,lat),
                    // 半径
                    radius:28,//3D视图下，CircleMarker半径不要超过64px
                    // 填充颜色
                    fillColor: 'rgba(153,0,76,0.8)',
                    // 填充透明度
                    fillOpacity: 1,
                    // 覆盖层级
                    zIndex: 10,
                    bubble: true,
                    cursor: 'pointer',
                    clickable: true
                })
                circleMarker.setOptions({strokeColor:'#663366',strokeOpacity:1,strokeWeight:2})
                // 为圆点坐标设置自定义属性，将原始的经纬度，定义为该圆点坐标的属性（使用：setExtData（），取数据：getExtData
                var params={}
                circleMarker.setExtData(params={
                  "lng":lng,
                  "lat":lat,
                  "id":i
                })
                circleMarker.setMap(that.map)
                that.marker_list.push(circleMarker)



                var car = new AMap.Marker({
                    position: new AMap.LngLat(lng,lat),
                    offset: new AMap.Pixel(-20, -20),
                    icon: icon, // 添加 Icon 图标 URL
                    title: 'car'
                });

                that.map.add(car)


                var car_display_clock = setTimeout(function(){
                  car.hide()
                },1000)


                      }else if(800<=o3&&o3<=1000){
                        var circleMarker = new AMap.CircleMarker({
                    center: new AMap.LngLat(lng,lat),
                    // 半径
                    radius: 29,//3D视图下，CircleMarker半径不要超过64px
                    // 填充颜色
                    fillColor: 'rgba(126,0,35,0.8)',
                    // 填充透明度
                    fillOpacity: 1,
                    // 覆盖层级
                    zIndex: 10,
                    bubble: true,
                    cursor: 'pointer',
                    clickable: true
                })
                // 为圆点坐标设置自定义属性，将原始的经纬度，定义为该圆点坐标的属性（使用：setExtData（），取数据：getExtData
                var params={}
                circleMarker.setExtData(params={
                  "lng":lng,
                  "lat":lat,
                  "id":i
                })
                circleMarker.setMap(that.map)
                that.marker_list.push(circleMarker)


                var car = new AMap.Marker({
                    position: new AMap.LngLat(lng,lat),
                    offset: new AMap.Pixel(-20, -20),
                    icon: icon, // 添加 Icon 图标 URL
                    title: 'car'
                });

                that.map.add(car)


                var car_display_clock = setTimeout(function(){
                  car.hide()
                },1000)


                      }
                            };
                          }(j), j * 1000);

}

              console.log("每一趟中marker_list是多少");
              console.log(that.marker_list.length);


                    }
                    

                    var added_marker_list = that.map.getAllOverlays()
                    console.log(added_marker_list);

              })
              .catch(error => console.log('error', error));


                
              })
            },
            // 定义接口，传来数据，并挂载到option，传入的为经纬度坐标
            show_echart(lng,lat){

              // 传入点击圆点Marker的坐标，接受该点的所有污染数据
              var form = new FormData();
            form.append("longitude", lng);
            form.append("latitude", lat);

            var settings = {
              "url": "http://175.178.67.109:8801/swagger/singlePollutionWarning",
              "method": "POST",
              "timeout": 0,
              "headers": {
                  "User-Agent": "Apifox/1.0.0 (https://apifox.com)"
              },
              "processData": false,
              "mimeType": "multipart/form-data",
              "contentType": false,
              "data": form
            };

            $.ajax(settings).done(function (response) {

              var list = JSON.parse(response)
              console.log(list[0]);
              
            });




            // 将得到的API数据，绑定到echart的option中
              var myChart = echarts.init(document.getElementById('echartContainer'));
             var option = {
              toolbox:{

              },
              tooltip: {
              trigger: 'axis',
              axisPointer: {
              type: 'shadow'
              }
              },
              legend: {},
              grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
              },
              xAxis: [
              {
              type: 'category',
                                  data: ['7月5日8:00点-9:00', '7月5日11:00点-12:00', '7月6日8:00点-9:00', '7月6日11:00点-12:00','7月7日8:00点-9:00',
                    '7月7日11:00点-12:00', ]
              }
              ],
              yAxis: [
              {
              type: 'value'
              }
              ],
              series: [
              {
              name: 'PM2.5',
              type: 'bar',
              emphasis: {
              focus: 'series'
              },
              data: [42.3,56.1,43.87,78.0,80.130,104.21]
              },
              {
              name: 'PM10',
              type: 'bar',

              emphasis: {
              focus: 'series'
              },
              data: [124,130,76,42,81,56]
              },
              {
              name: 'NO2',
              type: 'bar',

              emphasis: {
              focus: 'series'
              },
              data: [141,142.1,130.56,136.1,98.41,110.8]
              },
              {
              name: 'SO2',
              type: 'bar',

              emphasis: {
              focus: 'series'
              },
              data: [19.4823,34.627,21.034,26.427,30.112,49.124]
              },
              {
              name: 'O3',
              type: 'bar',
              data: [34.06421,27.5673,31.6321,30.0821,38.4732,29.210],
              emphasis: {
              focus: 'series'
              },
              markLine: {
              lineStyle: {
              type: 'dashed'
              },

              }
              },
              {
              name: 'CO',
              type: 'bar',
              

              emphasis: {
              focus: 'series'
              },
              data: [0.172536,0.14564,0.251516,0.21234,0.32369,0.18948]
              },


            ]
            };
         // 使用刚指定的配置项和数据显示图表。
         myChart.setOption(option);

            },

            
          delLayer(){
            
            clearInterval(this.clock) 
            this.overlayGroup.clearOverlays()
            
          },

      },
      mounted(){
      },
      watch:{
        carouselO3_ShowOrNot(newValue){
          if(newValue){
            this.carousel_o3_show()
            console.log("<O3>按钮开关为：true");

          }else{
            var that =this
            // 清楚覆盖物点集
            this.delLayer()
            // 移除：循环定时器clock
            clearInterval(that.clock)
            
            
            console.log('<O3>按钮开关为：false');
          }
        }
      },                                        
      created(){
        
        bus.$on('shareMap',(msg)=>{
          this.map = msg
        })

      },unmounted() {
        // 为了使得循环定时器不占用资源，当组件被卸载时，也要在unmounted中写去除循环定时器的方法
        clearInterval(this.clock) 
      },

    }
  </script>


<style>

</style>