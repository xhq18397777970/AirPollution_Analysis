<template>
  <div>
      
  </div>
</template>

<script >

import bus from '@/bus/bus.js'
import Element from 'element-ui'
import AMapLoader from '@amap/amap-jsapi-loader'
import echarts, * as Echart from '@/js/echarts.js'
import * as turf from '@turf/turf';

import $ from 'jquery';

export default{
  name:'rangepm25',
  components:{},
  props:{
      rangePM25_ShowOrNot:Boolean
  },
  data(){

      return{
          sum_result:[],
          map:null,
          clock:null,
          marker_list:[]
      }
  },
  methods:{
  range_pm25_show(){
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

          fetch("http://175.178.67.109:8801/swagger/getFlagOne", requestOptions)
            .then(response => response.text())
            .then(result => {
              var result_list = JSON.parse(result)
              console.log('getFlagOne数据:',result_list);
              for(var i= 0;i<result_list.length;i++){
                  that.sum_result.push(result_list[i])
              }
          })

          setTimeout(function(){
              var myHeaders = new Headers();
          myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
        
            var requestOptions = {
              method: 'GET',
              async:false,
              headers: myHeaders,
              redirect: 'follow'
            };
            fetch("http://175.178.67.109:8801/swagger/getFlagTwo", requestOptions)
            .then(response => response.text())
            .then(result => {
              var result_list = JSON.parse(result)
              console.log('getFlagTwo数据:',result_list);
              var result_list = JSON.parse(result)

              for(var i= 0;i<result_list.length;i++){
                  that.sum_result.push(result_list[i])
              }

              console.log('getFlagTwo回调函数中：',that.sum_result);

              
              function displayWithDelay(list,index){
                  if(index>=list.length || that.rangePM25_ShowOrNot==false){
                      return 
                  }
                  setTimeout(function(){

                      const icon = new AMap.Icon({
                      size: new AMap.Size(40, 50),    // 图标尺寸
                      image: require('@/img/car5.png'),  // Icon的图像
                      imageSize: new AMap.Size(40, 40)   // 根据所设置的大小拉伸或压缩图片
                  });

                      var pm25
                      var lat
                      var lng
                      

                      pm25 = parseInt(list[index].pm2p5) 
                      lat = list[index].latitude
                      lng = list[index].longitude
                  
                      if(pm25<=35 && pm25>=0){
                  var circleMarker = new AMap.CircleMarker({
                  center: new AMap.LngLat(lng,lat),
                  // 半径
                  radius: 20,//3D视图下，CircleMarker半径不要超过64px
                  // 填充颜色
                  fillColor: 'rgba(250,128,114,0.8)',
                  // 填充透明度
                  fillOpacity: 1,
                  // 覆盖层级
                  zIndex: 10,
                  bubble: true,
                  cursor: 'pointer',
                  clickable: true
              })
              var params={}
                  circleMarker.setExtData(params={
                      "lng":lng,
                      "lat":lat,
                      "id":i
                      
                      })
              // circleMarker.setOptions({strokeColor:'#00CC00',strokeOpacity:1,strokeWeight:2,})
              // 为圆点坐标设置自定义属性，将原始的经纬度，定义为该圆点坐标的属性（使用：setExtData（），取数据：getExtData
              that.marker_list.push(circleMarker)

                }else if(pm25>=35 &&pm25<=75){
                  var circleMarker = new AMap.CircleMarker({
                    
                  center: new AMap.LngLat(lng,lat),
                  // 半径
                  radius: 23,//3D视图下，CircleMarker半径不要超过64px
                  // 填充颜色
                  fillColor: 'rgba(255,99,71,0.8)',
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
                "lng":lng,
                "lat":lat,
                "id":i
              })
              // circleMarker.setOptions({strokeColor:'#FFCC33',strokeOpacity:1,strokeWeight:2,})
              that.marker_list.push(circleMarker)
                }else if(pm25>=75 && pm25<=115){
                  var circleMarker = new AMap.CircleMarker({
                  center: new AMap.LngLat(lng,lat),
                  // 半径
                  radius: 24,//3D视图下，CircleMarker半径不要超过64px
                  // 填充颜色
                  fillColor: 'rgba(255,69,0,0.8)',
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
                "lng":lng,
                "lat":lat,
                "id":i
              })
              circleMarker.setOptions({strokeColor:'#CC6600',strokeOpacity:1,strokeWeight:2})
              that.marker_list.push(circleMarker)
                }else if(pm25>=115 &&pm25<=150){
                  var circleMarker = new AMap.CircleMarker({
                  center: new AMap.LngLat(lng,lat),
                  // 半径
                  radius: 25,//3D视图下，CircleMarker半径不要超过64px
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
                "lng":lng,
                "lat":lat,
                "id":i
              })
              circleMarker.setOptions({strokeColor:'#990000',strokeOpacity:1,strokeWeight:2,})
              that.marker_list.push(circleMarker)
                }else if(pm25>=150 && pm25<=250){
                  var circleMarker = new AMap.CircleMarker({
                  center: new AMap.LngLat(lng,lat),
                  // 半径
                  radius: 26,//3D视图下，CircleMarker半径不要超过64px
                  // 填充颜色
                  fillColor: 'rgba(227,23,13,0.8)',
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
                "lng":lng,
                "lat":lat,
                "id":i
              })
              circleMarker.setOptions({strokeColor:'#663366',strokeOpacity:1,strokeWeight:2})
              that.marker_list.push(circleMarker)
                }else if(pm25>=250 && pm25<=350){
                  var circleMarker = new AMap.CircleMarker({
                  center: new AMap.LngLat(lng,lat),
                  // 半径
                  radius: 27,//3D视图下，CircleMarker半径不要超过64px
                  // 填充颜色
                  fillColor: 'rgba(237,145,33,0.8)',
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
                "lng":lng,
                "lat":lat,
                "id":i
              })

              that.marker_list.push(circleMarker)
                }
              



                var car = new AMap.Marker({
                  position: new AMap.LngLat(lng,lat),
                  offset: new AMap.Pixel(-20, -20),
                  icon: icon, // 添加 Icon 图标 URL
                  title: 'car'
              });

              circleMarker.on('click', function (event) {
                  // 点击事件，canvas上的坐标
                  var canvas_lnt = event.lnglat.KL 
                  var canvas_lat = event.lnglat.kT
                  
                  // 真实的经纬度
                  // .target表示取得该事件绑定的对象，若是marker类型，则返回marker对象。
                  var gcj_lng = event.target.getExtData().lng
                  var gcj_lat = event.target.getExtData().lat

                  console.log('经纬度：',gcj_lng,gcj_lat);

                  var content ='<div id="echartContainer" style="width: 600px;height:400px;"></div><table border="1"><tr><th>污染物</th><td>SO2(二氧化硫)</td><td>NO2(二氧化氮)</td><td>O3(臭氧)</td><td>PM2.5</td><td>PM10</td><td>CO(一氧化硫)</td></tr><tr><th>单位</td><td>μg/m3</td><td>μg/m3</td><td>μg/m3</td><td>μg/m3</td><td>μg/m3</td><td>mg/m3</td></tr></table>'

                  var infoWindow = new AMap.InfoWindow({
                  anchor: 'bottom-left',
                  content: content
                  });
                  infoWindow.open(that.map,[canvas_lnt,canvas_lat])
                  that.show_echart();
                                  })

              that.map.add(car)

                that.overlayGroup = new AMap.OverlayGroup(that.marker_list);
              // 将覆盖物组添加到地图上
                  that.map.add(that.overlayGroup);

              // var added_marker_list = that.map.getAllOverlays()
              
              displayWithDelay(list,index+1)
              var car_display_clock =   setTimeout(function(){car.hide()},1500)
                  },2000)
                  
              }

              displayWithDelay(that.sum_result,0)
          })
          },500)

           
          })
      },
      show_echart(){
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
          var myChart = echarts.init(document.getElementById('echartContainer'));
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
      },
      bind_event(){

      },
      delLayer(){

          this.map.clearMap()

      },
    //---------------------------20230811--------------------------------------
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
          "color":3,
          "point":[
            [114.599979383681,30.453639865452],[114.599878200955,30.453138563369],[114.599825846355,30.452628851997]
          ]
        },
          {
            "color":4,
            "point":[
              [114.599825846355,30.452628851997],[114.599790581598,30.452117784289],[114.599826388889,30.451608344185],[114.59987982856,30.45109890408],[114.599948730469,30.45059109158],[114.600048828125,30.45008843316],[114.600183376737,30.449593912761],[114.60036702474,30.44911702474],[114.600538465712,30.448634711372]
            ]},
          {
            "color":3,
            "point":[
              [114.600538465712,30.448634711372],[114.600732421875,30.448160807292],[114.600927191841,30.447686631945],[114.601176215278,30.447261284723],[114.601669921875,30.447380371094],[114.60215983073,30.447530381945]
            ]},
          {
            "color":4,
            "point":[
              [114.60215983073,30.447530381945],[114.602657606337,30.447651095921],[114.603160807292,30.44774468316],[114.60366889106,30.447811143664],[114.604179416233,30.4478515625],[114.604691297744,30.447861599393],[114.605203721789,30.447852376303],[114.605715060764,30.44782280816],[114.606225314671,30.447777506511]
            ]},
          {
            "color":3,
            "point":[
              [114.606225314671,30.447777506511],[114.606733940973,30.447716200087],[114.607120225695,30.447831488716],[114.607216525608,30.448334689671],[114.607294108073,30.448841145834]
            ]},
          {
            "color":4,
            "point":[
              [114.607294108073,30.448841145834],[114.607342122396,30.44935139974],[114.607380099827,30.449862467448],[114.607347005209,30.450372992622],[114.607353786893,30.450885687935]
            ]},{
            "color":3,
            "point":[
              [114.607353786893,30.450885687935],[114.607383626303,30.45139702691],[114.607428927952,30.451907552084]]
          },{
            "color":2,
            "point":[
              [114.607428927952,30.451907552084],[114.607471516928,30.452418077257],[114.60704155816,30.453071831598],[114.606532660591,30.453130967882]
            ]
          },
          {
            "color":3,
            "point":[
              [114.606532660591,30.453130967882], [114.606022406685,30.453174099393],[114.605520019532,30.453272298178],[114.605011121962,30.453330891928]
            ]
          },
          {
            "color":4,
            "point":[
              [114.605520019532,30.453272298178],[114.604499511719,30.453354492188],[114.603988986546,30.453392740886],[114.603480088976,30.453453504775]
            ]
          },
          {    "color":4,
            "point":[
              [114.603480088976,30.453453504775], [114.602970106337,30.453502875435],[114.602460666233,30.453555501303],[114.601950412327,30.453602701823],[114.601440158421,30.453644748264]

            ]},
          {    "color":3,
            "point":[
              [114.601440158421,30.453644748264], [114.600930175782,30.453694932726],[114.600419379341,30.45373155382],[114.599979383681,30.453639865452],[114.599979383681,30.453639865452]

            ]},
          {
            "color":4,
            "point":[
              [114.599878200955,30.453138563369],[114.599825846355,30.452628851997],[114.599790581598,30.452117784289]]
          },
          {
            "color":4,
            "point":[
              [114.599790581598,30.452117784289], [114.600196126303,30.45208577474], [114.600602213542,30.452053493924], [114.601008029514,30.452021755643], [114.601413845487,30.451989746094], [114.601819661459,30.451957736546], [114.602225477431,30.451925998264], [114.602631293403,30.451893988716], [114.603037380643,30.451861979167]
            ]
          },
          {
            "color":4,
            "point":[
              [114.603037380643,30.451861979167],
              [114.603172743056,30.45185139974],[114.603283420139,30.4519007704],[114.603423665365,30.451901312935],[114.603563639323,30.451899956598],[114.603703613282,30.451893446181],[114.60384358724,30.451887207032],[114.603983832466,30.451882052952],[114.604123806424,30.451876356337],[114.604263780382,30.451870117188],[114.604403754341,30.451862250435],[114.604543728299,30.451853027344],[114.60468343099,30.451842990452],[114.604823676216,30.451837293837],[114.604962836372,30.451824001737],[114.605072699653,30.451815592448]]

          },{
            "color":4,
            "point":[
              [114.605072699653,30.451815592448],[114.605486653646,30.451696777344],[114.60582139757,30.451643880209],[114.606155870226,30.451591254341],[114.606490885417,30.451538085938],[114.606825629341,30.451485188803],[114.607160373264,30.451432291667]]
          },
          {
            "color":3,
            "point":[
              [114.607160373264,30.451432291667],[114.60888264974,30.451295572917]]
          },
          {
            "color":2,
            "point":[
              [114.60888264974,30.451295572917],[114.609182128907,30.4512757704],[114.609481879341,30.451255425348],[114.609781629775,30.451235080296]
              ,[114.60990234375,30.450946994358]
            ]
          },
          {
            "color":1,
            "point":[
              [114.60990234375,30.450946994358],[114.609930013021,30.450666232639],[114.609938693577,30.450384114584],[114.609943847657,30.450101725261],[114.609940049914,30.449819607205],[114.609932725695,30.449537760417],[114.609920518664,30.449255371094]
            ]
          },
          {
            "color":2,
            "point":[
              [114.609932725695,30.449537760417],[114.609830729167,30.44955078125],[114.609524468316,30.449589572483]]
          },
          {
            "color":3,
            "point":[
              [114.609524468316,30.449589572483],[114.609217936198,30.449628634983],[114.608911675348,30.449667697483],[114.608605414497,30.449706759983],[114.608299153646,30.449745551216]
            ]
          },
          {
            "color":4,
            "point":[
              [114.608299153646,30.449745551216],[114.607992892796,30.449784342448],[114.607686360678,30.449823404948],[114.607380099827,30.449862467448],[114.607148980035,30.44991373698],[114.60680202908,30.449990234375],[114.606455349393,30.450067003039]
            ]},
          {
            "color":5,
            "point":[
              [114.606455349393,30.450067003039],[114.606108398438,30.450144042969],[114.605761447483,30.450220811632],[114.605414767796,30.450297580296]
            ]},
          {
            "color":5,
            "point":[

              [114.605414767796,30.450297580296],[114.602743869358,30.450480414497],[114.602407226563,30.450431315105],[114.6020703125,30.45038248698],[114.601733127171,30.450333387587]]
          },
          {
            "color":4,
            "point":[
              [114.601733127171,30.450333387587],[114.601396484375,30.450284288195],[114.601059570313,30.450235188803],[114.60072265625,30.450186631945],[114.600386013455,30.450137532553]]
          },
          {
            "color":3,
            "point":[

              [114.605225423178,30.452054578994],[114.6052992079,30.452358940973],[114.605372721355,30.452663302952],[114.605446506077,30.452967936198]]
          },
          {
            "color":1,
            "point":[

              [114.607390407987,30.453072102865],[114.607739257813,30.453072102865],[114.608088107639,30.453072102865],[114.608436686198,30.453072374132],[114.608785536025,30.453072374132],[114.609134657119,30.453072374132],[114.609483506945,30.4530726454],[114.609812282987,30.453052842882],[114.609812282987,30.452703993056],[114.609812282987,30.452354871962],[114.60990234375,30.450946994358],[114.609475368924,30.447050509983]]
          },
          {
            "color":2,
            "point":[
              [114.609475368924,30.447050509983],[114.60938123915,30.44708170573],[114.60909857856,30.447175564237],[114.608815646702,30.447268880209],[114.608533257379,30.447362738716],[114.608250596789,30.447456325955]
            ]},
          {
            "color":3,
            "point":[
              [114.608250596789,30.447456325955],[114.607967936198,30.447550184462],[114.607685546875,30.447643771702],[114.607402886285,30.447737630209],[114.607120225695,30.447831488716]]},
          {
            "color":5,
            "point":[
              [114.603172743056,30.45185139974],[114.603113335504,30.451724446615],[114.603073730469,30.451590169271],[114.60303249783,30.451455891928],[114.602987196181,30.451323242188],[114.602947862414,30.451188693577],[114.602914767796,30.451052517362],[114.602886284723,30.450915256077],[114.602865397136,30.450776638455],[114.602855088976,30.450636935764],[114.602856174046,30.450496961806],[114.602976074219,30.450454101563],[114.603116319445,30.450456814237],[114.603256293403,30.450458170573],[114.603396538629,30.450452745226],[114.603536512587,30.450451660157],[114.603676486546,30.450457085504],[114.603816731771,30.450453287761],[114.60395670573,30.450449490018],[114.604096950955,30.450446777344],[114.604236924914,30.450438910591],[114.604376627605,30.450428602431],[114.604516330296,30.450418565539],[114.604656032987,30.450410698785],[114.604796006945,30.450402832032],[114.604935167101,30.450387098525],[114.605067816841,30.450374348959],[114.605112575955,30.450497233073],[114.605083821615,30.450634494358],[114.605084092882,30.450774468316],[114.605086534289,30.450914442275],[114.605096571181,30.451054416233],[114.605108506945,30.451194390191],[114.605123697917,30.451333550348],[114.605158420139,30.451611328125],[114.605151909723,30.451749945747],
            ]
          },
          {
            "color":4,
            "point":[
              [114.605084092882,30.450071885851],[114.605100368924,30.449768880209],[114.605116916233,30.449466417101],[114.605133192275,30.449163682726],[114.605149468316,30.448860948351],[114.605165744358,30.448558213976],[114.605181749132,30.448255750869],[114.605198025174,30.447953016494] ]
          },
          {
            "color":4,
            "point":[
              [114.603045247396,30.450189887153],[114.603114691841,30.449925672744],[114.603183865018,30.449661458334],[114.603253309462,30.449396972657],[114.603322753907,30.449132758247],[114.603391655816,30.448868543837],[114.603461100261,30.448604329428],[114.603530273438,30.448340115018],[114.603599717882,30.448075358073],[114.60366889106,30.447811143664],
            ]
          },
          {
            "color":3,
            "point":[
              [114.603440755209,30.453142903646],[114.603401421441,30.452832573785],[114.603362087674,30.452521972657],[114.603322753907,30.452211371528], ]
          },

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
              radius=0.002;
              break;
            case 1:
              radius=0.004;
              break;
            case 2:
              radius=0.006;
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
  },
    //-----------------------------------------------------------------------
    // ------------------------0815--------------------------------------
    range_pm25_show_new1(){
      var that = this
      AMapLoader.load({
        key:"ab483676931b5c32ffd436065e5607c1",
        version:"2.0",
        plugins:['AMap.Heatmap','AMap.PlaceSearch','AMap.AutoComplete','AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap)=>{
        let pointData=[{
          "color":3,
          "point":[
            [114.599979383681,30.453639865452],[114.599878200955,30.453138563369],[114.599825846355,30.452628851997]
          ]
        },
          {
            "color":4,
            "point":[
              [114.599825846355,30.452628851997],[114.599790581598,30.452117784289],[114.599826388889,30.451608344185],[114.59987982856,30.45109890408],[114.599948730469,30.45059109158],[114.600048828125,30.45008843316],[114.600183376737,30.449593912761],[114.60036702474,30.44911702474],[114.600538465712,30.448634711372]
            ]},
          {
            "color":3,
            "point":[
              [114.600538465712,30.448634711372],[114.600732421875,30.448160807292],[114.600927191841,30.447686631945],[114.601176215278,30.447261284723],[114.601669921875,30.447380371094],[114.60215983073,30.447530381945]
            ]},
          {
            "color":4,
            "point":[
              [114.60215983073,30.447530381945],[114.602657606337,30.447651095921],[114.603160807292,30.44774468316],[114.60366889106,30.447811143664],[114.604179416233,30.4478515625],[114.604691297744,30.447861599393],[114.605203721789,30.447852376303],[114.605715060764,30.44782280816],[114.606225314671,30.447777506511]
            ]},
          {
            "color":3,
            "point":[
              [114.606225314671,30.447777506511],[114.606733940973,30.447716200087],[114.607120225695,30.447831488716],[114.607216525608,30.448334689671],[114.607294108073,30.448841145834]
            ]},
          {
            "color":4,
            "point":[
              [114.607294108073,30.448841145834],[114.607342122396,30.44935139974],[114.607380099827,30.449862467448],[114.607347005209,30.450372992622],[114.607353786893,30.450885687935]
            ]},{
            "color":3,
            "point":[
              [114.607353786893,30.450885687935],[114.607383626303,30.45139702691],[114.607428927952,30.451907552084]]
          },{
            "color":2,
            "point":[
              [114.607428927952,30.451907552084],[114.607471516928,30.452418077257],[114.60704155816,30.453071831598],[114.606532660591,30.453130967882]
            ]
          },
          {
            "color":3,
            "point":[
              [114.606532660591,30.453130967882], [114.606022406685,30.453174099393],[114.605520019532,30.453272298178],[114.605011121962,30.453330891928]
            ]
          },
          {
            "color":4,
            "point":[
              [114.605520019532,30.453272298178],[114.604499511719,30.453354492188],[114.603988986546,30.453392740886],[114.603480088976,30.453453504775]
            ]
          },
          {    "color":4,
            "point":[
              [114.603480088976,30.453453504775], [114.602970106337,30.453502875435],[114.602460666233,30.453555501303],[114.601950412327,30.453602701823],[114.601440158421,30.453644748264]

            ]},
          {    "color":3,
            "point":[
              [114.601440158421,30.453644748264], [114.600930175782,30.453694932726],[114.600419379341,30.45373155382],[114.599979383681,30.453639865452],[114.599979383681,30.453639865452]

            ]},
          {
            "color":0,
            "point":[
              [114.599878200955,30.453138563369],[114.599825846355,30.452628851997],[114.599790581598,30.452117784289]]
          },
          {
            "color":4,
            "point":[
              [114.599790581598,30.452117784289], [114.600196126303,30.45208577474], [114.600602213542,30.452053493924], [114.601008029514,30.452021755643], [114.601413845487,30.451989746094], [114.601819661459,30.451957736546], [114.602225477431,30.451925998264], [114.602631293403,30.451893988716], [114.603037380643,30.451861979167]
            ]
          },
          {
            "color":0,
            "point":[
              [114.603037380643,30.451861979167],
              [114.603172743056,30.45185139974],[114.603283420139,30.4519007704],[114.603423665365,30.451901312935],[114.603563639323,30.451899956598],[114.603703613282,30.451893446181],[114.60384358724,30.451887207032],[114.603983832466,30.451882052952],[114.604123806424,30.451876356337],[114.604263780382,30.451870117188],[114.604403754341,30.451862250435],[114.604543728299,30.451853027344],[114.60468343099,30.451842990452],[114.604823676216,30.451837293837],[114.604962836372,30.451824001737],[114.605072699653,30.451815592448]]

          },{
            "color":4,
            "point":[
              [114.605072699653,30.451815592448],[114.605486653646,30.451696777344],[114.60582139757,30.451643880209],[114.606155870226,30.451591254341],[114.606490885417,30.451538085938],[114.606825629341,30.451485188803],[114.607160373264,30.451432291667]]
          },
          {
            "color":3,
            "point":[
              [114.607160373264,30.451432291667],[114.60888264974,30.451295572917]]
          },
          {
            "color":2,
            "point":[
              [114.60888264974,30.451295572917],[114.609182128907,30.4512757704],[114.609481879341,30.451255425348],[114.609781629775,30.451235080296]
              ,[114.60990234375,30.450946994358]
            ]
          },
          {
            "color":1,
            "point":[
              [114.60990234375,30.450946994358],[114.609930013021,30.450666232639],[114.609938693577,30.450384114584],[114.609943847657,30.450101725261],[114.609940049914,30.449819607205],[114.609932725695,30.449537760417],[114.609920518664,30.449255371094]
            ]
          },
          {
            "color":2,
            "point":[
              [114.609932725695,30.449537760417],[114.609830729167,30.44955078125],[114.609524468316,30.449589572483]]
          },
          {
            "color":3,
            "point":[
              [114.609524468316,30.449589572483],[114.609217936198,30.449628634983],[114.608911675348,30.449667697483],[114.608605414497,30.449706759983],[114.608299153646,30.449745551216]
            ]
          },
          {
            "color":4,
            "point":[
              [114.608299153646,30.449745551216],[114.607992892796,30.449784342448],[114.607686360678,30.449823404948],[114.607380099827,30.449862467448],[114.607148980035,30.44991373698],[114.60680202908,30.449990234375],[114.606455349393,30.450067003039]
            ]},
          {
            "color":5,
            "point":[
              [114.606455349393,30.450067003039],[114.606108398438,30.450144042969],[114.605761447483,30.450220811632],[114.605414767796,30.450297580296]
            ]},
          {
            "color":5,
            "point":[

              [114.605414767796,30.450297580296],[114.602743869358,30.450480414497],[114.602407226563,30.450431315105],[114.6020703125,30.45038248698],[114.601733127171,30.450333387587]]
          },
          {
            "color":4,
            "point":[
              [114.601733127171,30.450333387587],[114.601396484375,30.450284288195],[114.601059570313,30.450235188803],[114.60072265625,30.450186631945],[114.600386013455,30.450137532553]]
          },
          {
            "color":0,
            "point":[

              [114.605225423178,30.452054578994],[114.6052992079,30.452358940973],[114.605372721355,30.452663302952],[114.605446506077,30.452967936198]]
          },
          {
            "color":1,
            "point":[

              [114.607390407987,30.453072102865],[114.607739257813,30.453072102865],[114.608088107639,30.453072102865],[114.608436686198,30.453072374132],[114.608785536025,30.453072374132],[114.609134657119,30.453072374132],[114.609483506945,30.4530726454],[114.609812282987,30.453052842882],[114.609812282987,30.452703993056],[114.609812282987,30.452354871962],[114.60990234375,30.450946994358],[114.609475368924,30.447050509983]]
          },
          {
            "color":2,
            "point":[
              [114.609475368924,30.447050509983],[114.60938123915,30.44708170573],[114.60909857856,30.447175564237],[114.608815646702,30.447268880209],[114.608533257379,30.447362738716],[114.608250596789,30.447456325955]
            ]},
          {
            "color":3,
            "point":[
              [114.608250596789,30.447456325955],[114.607967936198,30.447550184462],[114.607685546875,30.447643771702],[114.607402886285,30.447737630209],[114.607120225695,30.447831488716]]},
          {
            "color":5,
            "point":[
              [114.603172743056,30.45185139974],[114.603113335504,30.451724446615],[114.603073730469,30.451590169271],[114.60303249783,30.451455891928],[114.602987196181,30.451323242188],[114.602947862414,30.451188693577],[114.602914767796,30.451052517362],[114.602886284723,30.450915256077],[114.602865397136,30.450776638455],[114.602855088976,30.450636935764],[114.602856174046,30.450496961806],[114.602976074219,30.450454101563],[114.603116319445,30.450456814237],[114.603256293403,30.450458170573],[114.603396538629,30.450452745226],[114.603536512587,30.450451660157],[114.603676486546,30.450457085504],[114.603816731771,30.450453287761],[114.60395670573,30.450449490018],[114.604096950955,30.450446777344],[114.604236924914,30.450438910591],[114.604376627605,30.450428602431],[114.604516330296,30.450418565539],[114.604656032987,30.450410698785],[114.604796006945,30.450402832032],[114.604935167101,30.450387098525],[114.605067816841,30.450374348959],[114.605112575955,30.450497233073],[114.605083821615,30.450634494358],[114.605084092882,30.450774468316],[114.605086534289,30.450914442275],[114.605096571181,30.451054416233],[114.605108506945,30.451194390191],[114.605123697917,30.451333550348],[114.605158420139,30.451611328125],[114.605151909723,30.451749945747],
            ]
          },
          {
            "color":4,
            "point":[
              [114.605084092882,30.450071885851],[114.605100368924,30.449768880209],[114.605116916233,30.449466417101],[114.605133192275,30.449163682726],[114.605149468316,30.448860948351],[114.605165744358,30.448558213976],[114.605181749132,30.448255750869],[114.605198025174,30.447953016494] ]
          },
          {
            "color":4,
            "point":[
              [114.603045247396,30.450189887153],[114.603114691841,30.449925672744],[114.603183865018,30.449661458334],[114.603253309462,30.449396972657],[114.603322753907,30.449132758247],[114.603391655816,30.448868543837],[114.603461100261,30.448604329428],[114.603530273438,30.448340115018],[114.603599717882,30.448075358073],[114.60366889106,30.447811143664],
            ]
          },
          {
            "color":3,
            "point":[
              [114.603440755209,30.453142903646],[114.603401421441,30.452832573785],[114.603362087674,30.452521972657],[114.603322753907,30.452211371528], ]
          },
        ]
        
        let reader = new jsts.io.WKTReader()
        // let a = reader.read('POINT (114.603401421441 30.452832573785)')
        // let b = reader.read('POINT (114.603440755209 30.453142903646)')
        // a=a.buffer(0.0001)
        // b=b.buffer(0.0001)
        // // let union =a.union(b)
        // console.log("a:",a);
        // console.log("b:",b);
        // // console.log("union:",union);
        // console.log("a._shell._points._coordinates:",a._shell._points._coordinates)
        // let aa=getCoordinate(a._shell._points._coordinates)
        // let bb=getCoordinate(b._shell._points._coordinates)
        //
        // // drawPolygon(polygon,1);
        // drawPolygon(aa,1);
        // drawPolygon(bb,1);
        let pointArr=[];
        for(let i=0;i<pointData.length;i++){
          let item=pointData[i].point;
          let color=pointData[i].color;
          for(let j=0;j<item.length;j++){
            pointArr.push([item[j][0],item[j][1],color])
          }
        }

        let wktPointArr=[];
        let str1="POINT (";
        let str2=")"
        pointArr.forEach(item=>{
          wktPointArr.push(str1+item[0]+" "+item[1]+str2);
        })
        let radiusOne=[0.0002,0.0004,0.0006,0.0008,0.0010,0.0012]
        let bufferArr=[]

        for(let i=0;i<wktPointArr.length;i++){
          let temp=reader.read(wktPointArr[i]);
          let radius=pointArr[i][2];
          temp=temp.buffer(radiusOne[radius]);
          bufferArr.push(temp)
        }

        //把所有相交的颜色一致的合并
        for(let i=0;i<bufferArr.length;i++){
          for(let j=0;j<bufferArr.length;j++){
            let union;
            if(pointArr[i][2]===pointArr[j][2]){
              bufferArr[i] =bufferArr[i].union(bufferArr[j])
            }

            const intersection = bufferArr[i].intersection(bufferArr[j]);
            // const difference = bufferArr[i].difference(bufferArr[j]);
            console.log("intersection:",intersection._shell._points._coordinates);
          }
        }


        // for(let i=0;i<bufferArr.length;i++){
        //   for(let j=i+1;j<bufferArr.length;j++){
        //     const difference = bufferArr[i].difference(bufferArr[j]);
        //     console.log("difference:",difference._shell._points._coordinates);
        //   }
        // }




        function getCoordinate(coordinates){
          let polygon=[]
          for(let i=0;i<coordinates.length;i++){
            let item=coordinates[i];
            console.log("item:",item)
            polygon.push([item.x,item.y])
          }
          return polygon
        }


        function drawPoint(point,color){

        };
        function drawLine(){

        };
        function drawPolygon(coordinate,color){
          const polygon1 = new AMap.Polygon({
            path: [[coordinate]],
            fillColor: '#EE675D', // 多边形填充颜色
            strokeOpacity: 0.5, // 线条透明度
            fillOpacity: 0.5, //填充透明度
            strokeColor: '#EE675D', // 线条颜色
            // strokeWeight: 1, //线条宽度
            // strokeStyle: 'dashed', // 线样式
            // strokeDasharray: [5, 5], //轮廓的虚线和间隙的样式
          });
          that.map.add(polygon1);
        }
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

      })
    },
    //------------------------------------------------------
  },
  created(){
    bus.$on('shareMap',(msg)=>{
        this.map = msg
      })
  },
  watch:{
      rangePM25_ShowOrNot(newValue){
      if (newValue){
          
          // this.range_pm25_show()
        this.range_pm25_show_new()

        console.log("<Range_PM25>按钮开关：true");
      }else{
        this.delLayer()
        
        console.log("<Range_PM25>按钮开关：false   WebSocket：关闭");
      }
    }
  }
}
</script>