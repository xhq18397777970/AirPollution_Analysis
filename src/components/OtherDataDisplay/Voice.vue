<template>
    <div>
        
    </div>
</template>


<script>

import bus from '@/bus/bus.js'
import AMapLoader from '@amap/amap-jsapi-loader'
import echarts, * as Echart from '@/js/echarts.js'
import $ from 'jquery';

export default{
    name:'Voice',
    components:{},
    props:{
        realVoice_ShowOrNot:Boolean,
        },

    data(){
        return{
            map:null,
            overlayGroup:null,

        }
    },
    methods:{
        voice_show(){
            var that = this
            AMapLoader.load({
            key:"ab483676931b5c32ffd436065e5607c1",             // 申请好的Web端开发者Key，首次调用 load 时必填
            version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins:['AMap.Heatmap','AMap.PlaceSearch','AMap.AutoComplete','AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap)=>{


            // 正式调用接口，读取数据
          var myHeaders = new Headers();
          myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
          
              var requestOptions = {
                method: 'GET',
                async:false,
                headers: myHeaders,
                redirect: 'follow'
              };

            fetch("http://175.178.67.109:8801/swagger/getVoiceEtc", requestOptions)
              .then(response => response.text())
              .then(result => {
                    var result_list = JSON.parse(result)
                    console.log(result_list);
                    var voice 
                    var lng 
                    var lat 
                    var marker_list = []
                    for (var i=0;i<result_list.length;i++){
                        voice = result_list[i].voice
                        lng = result_list[i].longitude
                        lat = result_list[i].latitude
                        
                if(voice<=50){
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
                    var params={}
                    circleMarker.setExtData(params={
                        "lng":lng,
                        "lat":lat,
                        
                        })
                    circleMarker.setOptions({strokeColor:'#00CC00',strokeOpacity:1,strokeWeight:2})
                    marker_list.push(circleMarker)
                    
                        }else if (voice>=50 &&voice<=55){
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
                    var params={}
                    circleMarker.setExtData(params={
                        "lng":lng,
                        "lat":lat,
                        
                        })
                    circleMarker.setOptions({strokeColor:'#FFCC33',strokeOpacity:1,strokeWeight:2})
                    marker_list.push(circleMarker)
                        }else if (voice>=55 &&voice<=60){
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
                    var params={}
                    circleMarker.setExtData(params={
                        "lng":lng,
                        "lat":lat,
                        
                        })
                    circleMarker.setOptions({strokeColor:'#CC6600',strokeOpacity:1,strokeWeight:2})
                    marker_list.push(circleMarker)
                        }
                        else if (voice>=60 &&voice<=65){
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
                    var params={}
                    circleMarker.setExtData(params={
                        "lng":lng,
                        "lat":lat,
                        
                        })
                    circleMarker.setOptions({strokeColor:'#990000',strokeOpacity:1,strokeWeight:2})
                    marker_list.push(circleMarker)
                        }
                        else if (voice>=65 &&voice<=70){
                            var circleMarker = new AMap.CircleMarker({
                        center: new AMap.LngLat(lng,lat),
                        // 半径
                        radius: 28,//3D视图下，CircleMarker半径不要超过64px
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
                    var params={}
                    circleMarker.setExtData(params={
                        "lng":lng,
                        "lat":lat,
                        })
                    circleMarker.setOptions({strokeColor:'#663366',strokeOpacity:1,strokeWeight:2})
                    marker_list.push(circleMarker)
                        }

                    }
                    // 渲染
                    that.overlayGroup = new AMap.OverlayGroup(marker_list);
                    that.map.add(that.overlayGroup);


                    // 绑定点击事件
                    this.overlayGroup.on('click', function (event) {
            
                    // 点击事件，canvas上的坐标
                    var canvas_lnt = event.lnglat.KL 
                    var canvas_lat = event.lnglat.kT
                    
                    // 真实的经纬度
                    // .target表示取得该事件绑定的对象，若是marker类型，则返回marker对象。
                    var gcj_lng = event.target.getExtData().lng
                    var gcj_lat = event.target.getExtData().lat

                    var content ='<div id="echartContainer" style="width: 700px;height:500px;"></div><table border="1"><tr><th>污染物</th><td>光照强度</td><td>噪声</td><td>PH</td></tr><tr><th>单位</td><td>LUX</td><td>dB</td><td>无</td></tr></table>'

                    var infoWindow = new AMap.InfoWindow({
                    anchor: 'bottom-left',
                    content: content
        });
                    infoWindow.open(that.map,[canvas_lnt,canvas_lat])
                    that.show_echart(gcj_lng,gcj_lat);


                    
                })
              })

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
                

                var PH_list =[]
                var voice_list =[]
                var light_list=[]
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
                    data: ['7月5日8:00点-9:00', '7月5日11:00点-12:00', '7月5日14:00点-15:00', '7月5日17:00点-18:00','7月5日20:00点-21:00',
                    '7月6日8:00点-9:00', '7月6日11:00点-12:00', '7月6日14:00点-15:00', '7月6日17:00点-18:00','7月6日20:00点-21:00',]
                    }
                    ],
                    yAxis: [
                    {
                    type: 'value'
                    }
                    ],
                    series: [
                    {
                    name: 'PH',
                    type: 'bar',
                    emphasis: {
                    focus: 'series'
                    },
                    data: []
                    },
                    {
                    name: '噪声',
                    type: 'bar',

                    emphasis: {
                    focus: 'series'
                    },
                    data: []
                    },
                    {
                    name: '光强',
                    type: 'bar',

                    emphasis: {
                    focus: 'series'
                    },
                    data: []
                    },

                    ]
              }
                for(var i=0;i<10;i++){
              option.series[0].data.push(parseFloat(result_list[i].ph))
              option.series[1].data.push(parseFloat(result_list[i].voice))
              option.series[2].data.push(parseFloat(result_list[i].light)*0.001)
                }
                console.log(option.series[0].data); 



                var myChart = echarts.init(document.getElementById('echartContainer'));

            //   console.log(option.series[0].data);
            //   console.log(option.series[1].data);
              myChart.setOption(option);
              })

            },
            delLayer(){
                this.map.clearMap();
            }
            
    },
    watch:{
        realVoice_ShowOrNot(newValue){
            if(newValue){
                this.voice_show()
                console.log("<voice>按钮打开");
            }else{  
                this.delLayer()
                console.log("<voice>按钮关闭");
            }
        }
    },
    created(){
        bus.$on('shareMap',(msg)=>{
          this.map = msg
        })

        var that = this
    },
}
</script>