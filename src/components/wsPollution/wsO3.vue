<template>
    <div>
    </div>
  </template>
  
  
  
  
  <script>
  import bus from '@/bus/bus.js'
  import Element from 'element-ui'
  import AMapLoader from '@amap/amap-jsapi-loader'
  import echarts, * as Echart from '@/js/echarts.js'
  import $ from 'jquery';
  
  const ws = new WebSocket('ws://175.178.67.109:8801/ws/sensorWS?token=147')
  
  export default{
    name:'wsCO',
    components:{Element,Echart},
    props:{
        o3_ShowOrNot:Boolean,
    },
    data(){
        return{
          // 定义mapcontainer传来的map实例
          map:null,
          // 覆盖物组，存放圆点标记
          overlayGroup:null,
          // 循环定时器
          clock:null,
          
  
        }
    },
    methods:{
        wsO3_show(){
            var that = this
            AMapLoader.load({
            key:"ab483676931b5c32ffd436065e5607c1",             // 申请好的Web端开发者Key，首次调用 load 时必填
            version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins:['AMap.Heatmap','AMap.PlaceSearch','AMap.AutoComplete','AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap)=>{
  
  
            var myHeaders = new Headers();
          myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
          
              var requestOptions = {
                method: 'GET',
                async:false,
                headers: myHeaders,
                redirect: 'follow'
              };
  
            fetch("http://175.178.67.109:8801/swagger/pollutionWarning", requestOptions)
              .then(response => response.text())
              .then(result => {
                var obj = JSON.parse(result)
                console.log(obj);
                
  
            //   // 初始化小车（每次接受到WS信息，都需要移除上一次添加的小车覆盖物，那么就需要创建overlayGroup_car存放小车，并且每次接受到ws信息时，清楚一下小车）
            //   const icon = new AMap.Icon({
            //             size: new AMap.Size(40, 50),    // 图标尺寸
            //             image: require('@/img/car.png'),  // Icon的图像
            //             imageSize: new AMap.Size(40, 40)   // 根据所设置的大小拉伸或压缩图片
            //             });
            //   var car1 = new AMap.Marker({
            //         position: new AMap.LngLat(114.16511,30.5161661),
            //         offset: new AMap.Pixel(-20, -20),
            //         icon: icon, // 添加 Icon 图标 URL
            //         title: 'car1'
            //             });
                  
            //       var car_list=[]
            //       car_list.push(car1)
            //       that.overlayGroup_car =new AMap.OverlayGroup(car_list)
  
  
                var marker_list = []
                
                
                for(var i=0;i<obj.length;i++){
                
                  // gcj_lng/gcj_lat/co
                  var gcj_lng = obj[i].longitude
                  var gcj_lat = obj[i].latitude
                  var o3 = obj[i].o3
                  var evaluate_o3 = obj[i].evaluateO3
                  
  
                  if(o3<=160 && evaluate_o3<=10){
                    var circleMarker = new AMap.CircleMarker({
                    center: new AMap.LngLat(gcj_lng,gcj_lat),
                    // 半径
                    radius: 20,//3D视图下，CircleMarker半径不要超过64px
                    // 填充颜色
                    fillColor: 'rgba(0,228,0,0.8)',
                    strokeColor:'#336633',
                    strokeOpacity:1,
                    strokeWeight:10,
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
                var params={}
                    circleMarker.setExtData(params={
                        "lng":gcj_lng,
                        "lat":gcj_lat,
                        "id":i
                        
                        })
                circleMarker.setOptions({strokeColor:'#00CC00',strokeOpacity:1,strokeWeight:2,})
                // 为圆点坐标设置自定义属性，将原始的经纬度，定义为该圆点坐标的属性（使用：setExtData（），取数据：getExtData
                marker_list.push(circleMarker)
  
                  }else if(o3<=160 && evaluate_o3>=10){
                    var circleMarker = new AMap.CircleMarker({
                    center: new AMap.LngLat(gcj_lng,gcj_lat),
                    // 半径
                    radius: 23,//3D视图下，CircleMarker半径不要超过64px
                    // 填充颜色
                    fillColor: 'rgba(255,255,0,0.8)',
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
                // 为圆点坐标设置自定义属性，将原始的经纬度，定义为该圆点坐标的属性（使用：setExtData（），取数据：getExtData
                var params={}
                circleMarker.setExtData(params={
                  "lng":gcj_lng,
                  "lat":gcj_lat,
                  "id":i
                })
                circleMarker.setOptions({strokeColor:'#FFCC33',strokeOpacity:1,strokeWeight:2,})
                marker_list.push(circleMarker)
                  }else if(200>=o3 && o3>=160 && evaluate_o3<=10){
                    var circleMarker = new AMap.CircleMarker({
                    center: new AMap.LngLat(gcj_lng,gcj_lat),
                    // 半径
                    radius: 26,//3D视图下，CircleMarker半径不要超过64px
                    // 填充颜色
                    fillColor: 'rgba(255,126,0,0.8)',
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
                // 为圆点坐标设置自定义属性，将原始的经纬度，定义为该圆点坐标的属性（使用：setExtData（），取数据：getExtData
                var params={}
                circleMarker.setExtData(params={
                  "lng":gcj_lng,
                  "lat":gcj_lat,
                  "id":i
                })
                circleMarker.setOptions({strokeColor:'#CC6600',strokeOpacity:1,strokeWeight:2})
                marker_list.push(circleMarker)
                  }else if(200>=o3 &&o3>=160 && evaluate_o3>=10){
                    var circleMarker = new AMap.CircleMarker({
                    center: new AMap.LngLat(gcj_lng,gcj_lat),
                    // 半径
                    radius: 29,//3D视图下，CircleMarker半径不要超过64px
                    // 填充颜色
                    fillColor: 'rgba(255,0,0,0.8)',
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
                // 为圆点坐标设置自定义属性，将原始的经纬度，定义为该圆点坐标的属性（使用：setExtData（），取数据：getExtData
                var params={}
                circleMarker.setExtData(params={
                  "lng":gcj_lng,
                  "lat":gcj_lat,
                  "id":i
                })
                circleMarker.setOptions({strokeColor:'#990000',strokeOpacity:1,strokeWeight:2,})
                marker_list.push(circleMarker)
                  }else if(o3>=200 && evaluate_o3<=0){
                    var circleMarker = new AMap.CircleMarker({
                    center: new AMap.LngLat(gcj_lng,gcj_lat),
                    // 半径
                    radius: 32,//3D视图下，CircleMarker半径不要超过64px
                    // 填充颜色
                    fillColor: 'rgba(153,0,76,0.8)',
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
                // 为圆点坐标设置自定义属性，将原始的经纬度，定义为该圆点坐标的属性（使用：setExtData（），取数据：getExtData
                var params={}
                circleMarker.setExtData(params={
                  "lng":gcj_lng,
                  "lat":gcj_lat,
                  "id":i
                })
                circleMarker.setOptions({strokeColor:'#663366',strokeOpacity:1,strokeWeight:2})
                marker_list.push(circleMarker)
                  }else if(o3>=200 && evaluate_o3>=0){
                    var circleMarker = new AMap.CircleMarker({
                    center: new AMap.LngLat(gcj_lng,gcj_lat),
                    // 半径
                    radius: 35,//3D视图下，CircleMarker半径不要超过64px
                    // 填充颜色
                    fillColor: 'rgba(126,0,35,0.8)',
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
                // 为圆点坐标设置自定义属性，将原始的经纬度，定义为该圆点坐标的属性（使用：setExtData（），取数据：getExtData
                var params={}
                circleMarker.setExtData(params={
                  "lng":gcj_lng,
                  "lat":gcj_lat,
                  "id":i
                })
  
                marker_list.push(circleMarker)
                  }
                }
  
                that.overlayGroup = new AMap.OverlayGroup(marker_list);
                // 将覆盖物组添加到地图上
                that.map.add(that.overlayGroup);
  
  
              })
              .catch(error => console.log('error', error));
  
        })
        
        },
  
  
        sendMsg(){
          var that =this  
          this.clock = setInterval(function(){
              ws.send(JSON.stringify({
            msg:'1'
          }))
            },5000)
  
        },
  
        wsOpen(e){
            console.log('wsO3:FE WebSocket open',e);
        },
        wsClose(e){
            console.log('wsO3:FE WebSocket close',e);
        },
        wsError(e){
            console.log('wsO3:FE WebSocket Error',e);
        },
        wsMessage(e){
          var that = this
  
          
            AMapLoader.load({
            key:"ab483676931b5c32ffd436065e5607c1",             // 申请好的Web端开发者Key，首次调用 load 时必填
            version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins:['AMap.Heatmap','AMap.PlaceSearch','AMap.AutoComplete','AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap)=>{
  
          var that = this
            const msg = JSON.parse(e.data)
            
            // 当收到的ws中收到停止信息时，关闭循环定时器
            if(("The latest task data has been uploaded")in msg){
              console.log("---最后一条信息---");
              clearInterval(that.clock)
            }else if((("Still updating the data in real time")in msg)&& !(("The latest task data has been uploaded")in msg)){
              console.log("---接收到一条ws信息---");
              var str1 = (msg["Still updating the data in real time"])
              str1=str1.slice(13,str1.length-2)
              var list1 = str1.split(',')
              // console.log(list1);
  
              // ws中：经度
              var ws_lng = list1[8]
              ws_lng=parseFloat(ws_lng.slice(11,ws_lng.length))
              
              // ws中：纬度
              var ws_lat =list1[9]
              ws_lat = parseFloat(ws_lat.slice(10,ws_lat.length))
              
              // ws中：o3插值
              var ws_o3_evaluate=list1[6]
              ws_o3_evaluate = parseFloat(ws_o3_evaluate.slice(4,ws_o3_evaluate.length))
              
              
  
              var str2 = (msg["Real-time data"])
              str2=str2.slice(12,str2.length-1)
              var list2 = str2.split(',')
              
              // ws中取得的o3真实值
              var ws_o3 = list2[6]
              ws_o3=parseFloat(ws_o3.slice(4,ws_o3.length))
              
              
              // 
                const icon = new AMap.Icon({
                        size: new AMap.Size(40, 50),    // 图标尺寸
                        image: require('@/img/car.png'),  // Icon的图像
                        imageSize: new AMap.Size(40, 40)   // 根据所设置的大小拉伸或压缩图片
                        });
              var car = new AMap.Marker({
                    position: new AMap.LngLat(ws_lng,ws_lat),
                    offset: new AMap.Pixel(-20, -20),
                    icon: icon, // 添加 Icon 图标 URL
                    title: 'car'
                        });
                  
                  // var car_list=[]
                  // car_list.push(car)
                  // that.overlayGroup_car =new AMap.OverlayGroup(car_list)
  
  
  
  
              // 获取当前地图上的marker覆盖物
              var added_marker_list = that.map.getAllOverlays()
  
                var num=0
                var ws_list = []
                for(var j=0;j<added_marker_list.length;j++){
                  
                  // 获取点标记自定义属性中保存的原始gcj经纬度坐标
                  var ExtData_lng = added_marker_list[j].getExtData().lng
                  var ExtData_lat = added_marker_list[j].getExtData().lat
                  
                  
                  if(ExtData_lng==String(ws_lng) &&ExtData_lat==String(ws_lat)){
                    num = j
                    console.log("当前替换第： ",num,' 个点');
                  }
                  // 隐藏该点
                  added_marker_list[num].hide()
                  
  
  
                  // 修改先前marker的属性
                  if(ws_o3<=160 && ws_o3_evaluate<=10){
                    added_marker_list[num].setOptions({fillColor: 'rgba(0,228,0)',radius: 20,strokeColor:'#00CC00',strokeOpacity:1,strokeWeight:2})
                  }else if(ws_o3<=160 && ws_o3_evaluate>=10){
                    added_marker_list[num].setOptions({fillColor:'rgba(255,255,0)',radius:23,strokeColor:'#FFCC33',strokeOpacity:1,strokeWeight:2})
                  }else if(ws_o3<=200 && ws_o3>=160 && ws_o3_evaluate<=10){
                    added_marker_list[num].setOptions({fillColor:'rgba(255,126,0)',radius: 26,strokeColor:'#CC6600',strokeOpacity:1,strokeWeight:2})
                  }else if(ws_o3<=200 && ws_o3>=160 && ws_o3_evaluate>=10){
                    added_marker_list[num].setOptions({fillColor:'rgba(255,0,0)',radius: 28,strokeColor:'#990000',strokeOpacity:1,strokeWeight:2})
                  }else if(ws_o3>=200 && ws_o3_evaluate>=0){
                    added_marker_list[num].setOptions({fillColor:'rgba(255,0,0)',radius: 29,strokeColor:'#663366',strokeOpacity:1,strokeWeight:2})
                  }else if(ws_o3>=200 && ws_o3_evaluate<=0){
                    added_marker_list[num].setOptions({fillColor:'rgba(255,0,0)'})
                  }
  
                  
                  var clock = setTimeout(function(){
                    added_marker_list[num].show()
  
                    added_marker_list[num].on('click', function (event) {
            
            // 点击事件，canvas上的坐标
            var canvas_lnt = event.lnglat.KL 
            var canvas_lat = event.lnglat.kT
            
            // 真实的经纬度
            // .target表示取得该事件绑定的对象，若是marker类型，则返回marker对象。
            var gcj_lng = event.target.getExtData().lng
            var gcj_lat = event.target.getExtData().lat
  
  
            var content ='<div id="echartContainer" style="width: 600px;height:400px;"></div><table border="1"><tr><th>污染物</th><td>co(二氧化硫)</td><td>co(二氧化氮)</td><td>O3(臭氧)</td><td>PM2.5</td><td>co</td><td>CO(一氧化硫)</td></tr><tr><th>单位</td><td>μg/m3</td><td>μg/m3</td><td>μg/m3</td><td>μg/m3</td><td>μg/m3</td><td>mg/m3</td></tr></table>'
  
            var infoWindow = new AMap.InfoWindow({
              anchor: 'bottom-left',
              content: content
  });
            infoWindow.open(that.map,[canvas_lnt,canvas_lat])
            that.show_echart(gcj_lng,gcj_lat);
  
  
                })
  
                    that.map.add(car)
                    
  
                  },2000)
                  var car_clock = setTimeout(function(){that.map.remove(car);},5000)
                }
  
                // that.overlayGroup = new AMap.OverlayGroup(ws_list);
                // // 将覆盖物组添加到地图上
                // that.map.add(that.overlayGroup);
  
            }
  
        })
          
  
            
        },
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
  
                var result_list = JSON.parse(response)
              
                var co_list =[]
                var co_list =[]
                var co_list=[]
                var co_list=[]
                var o3_list=[]
                var co_list=[]
                
                // 将得到的API数据，绑定到echart的option中
              
              var option =  {
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
              data: []
              },
              {
              name: 'PM10',
              type: 'bar',
  
              emphasis: {
              focus: 'series'
              },
              data: []
              },
              {
              name: 'NO2',
              type: 'bar',
  
              emphasis: {
              focus: 'series'
              },
              data: []
              },
              {
              name: 'SO2',
              type: 'bar',
  
              emphasis: {
              focus: 'series'
              },
              data: []
              },
              {
              name: 'O3',
              type: 'bar',
              data: [],
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
              data: []
              },
  
  
            ]
            };
  
  
            for(var i=0;i<6;i++){
                option.series[0].data.push(parseFloat(result_list[i].pm2p5))
              option.series[1].data.push(parseFloat(result_list[i].pm10))
              option.series[2].data.push(parseFloat(result_list[i].no2))
              option.series[3].data.push(parseFloat(result_list[i].so2))
              option.series[4].data.push(parseFloat(result_list[i].o3))
              option.series[5].data.push(parseFloat(result_list[i].co))
                }
                
            var myChart = echarts.init(document.getElementById('echartContainer'));
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
  
                          })
  
  
              
          },
          loadingTip() {
              const h = this.$createElement;
              this.$message({
                message: h('p', null, [
                  
                  h('i', { style: 'color: red' }, '  实时污染数据推送中...  ')
                ])
              })
            },
          delLayer(){
          this.map.clearMap()
          },
    },
    computed:{
  
    },
    created(){
      bus.$on('shareMap',(msg)=>{
          this.map = msg
        })
    },
    mounted(){
        ws.addEventListener('open',this.wsOpen.bind(this),false);
        ws.addEventListener('close',this.wsClose.bind(this),false);
        ws.addEventListener('error',this.wsError.bind(this),false);
        ws.addEventListener('message',this.wsMessage.bind(this),false);
    },
    watch:{
        o3_ShowOrNot(newValue){
        if (newValue){
          // 点击开关，首先展示第二趟与第一趟的插值（5s），接着开始展示第三次与第二次的插值数据（实时ws）
          this.wsO3_show()
  
          this.loadingTip()
          // 发送ws数据
          this.sendMsg()
          console.log("<wsO3>按钮开关：true");
        }else{
          this.delLayer()
          clearInterval(this.clock)
          console.log("<wsO3>按钮开关：false   WebSocket：关闭");
        }
      }
    }
  
  }
  
  
  
  </script>