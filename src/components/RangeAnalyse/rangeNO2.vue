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

export default{
    name:'rangeCO',
    components:{},
    props:{
      rangeNO2_ShowOrNot:Boolean
    },
    data(){

        return{
            sum_result:[],
            map:null,
            clock:null
        }
    },
    methods:{
      range_no2_show(){
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
                    if(index>=list.length || that.rangeNO2_ShowOrNot==false){
                        return 
                    }
                    setTimeout(function(){

                        const icon = new AMap.Icon({
                        size: new AMap.Size(40, 50),    // 图标尺寸
                        image: require('@/img/car5.png'),  // Icon的图像
                        imageSize: new AMap.Size(40, 40)   // 根据所设置的大小拉伸或压缩图片
                    });

                        var no2
                        var lat
                        var lng
                        var marker_list =[]

                        no2 = list[index].no2
                        lat = list[index].latitude
                        lng = list[index].longitude

                        if(no2<=100 && no2>=0){
                    var circleMarker = new AMap.CircleMarker({
                    center: new AMap.LngLat(lng,lat),
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
                        "lng":lng,
                        "lat":lat,
                        "id":i
                        
                        })
                circleMarker.setOptions({strokeColor:'#00CC00',strokeOpacity:1,strokeWeight:2,})
                // 为圆点坐标设置自定义属性，将原始的经纬度，定义为该圆点坐标的属性（使用：setExtData（），取数据：getExtData
                marker_list.push(circleMarker)

                  }else if(no2>=100 &&no2<=200){
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
                circleMarker.setOptions({strokeColor:'#FFCC33',strokeOpacity:1,strokeWeight:2,})
                marker_list.push(circleMarker)
                  }else if(no2>=200 && no2<=700){
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
                marker_list.push(circleMarker)
                  }else if(no2>=700 &&no2<=1200){
                    var circleMarker = new AMap.CircleMarker({
                    center: new AMap.LngLat(lng,lat),
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
                  "lng":lng,
                  "lat":lat,
                  "id":i
                })
                circleMarker.setOptions({strokeColor:'#990000',strokeOpacity:1,strokeWeight:2,})
                marker_list.push(circleMarker)
                  }else if(no2>=1200 && no2<=2340){
                    var circleMarker = new AMap.CircleMarker({
                    center: new AMap.LngLat(lng,lat),
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
                  "lng":lng,
                  "lat":lat,
                  "id":i
                })
                circleMarker.setOptions({strokeColor:'#663366',strokeOpacity:1,strokeWeight:2})
                marker_list.push(circleMarker)
                  }else if(no2>=2340 && no2<=3090){
                    var circleMarker = new AMap.CircleMarker({
                    center: new AMap.LngLat(lng,lat),
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
                  "lng":lng,
                  "lat":lat,
                  "id":i
                })
  
                marker_list.push(circleMarker)
                  }
                



                  var car = new AMap.Marker({
                    position: new AMap.LngLat(lng,lat),
                    offset: new AMap.Pixel(-20, -20),
                    icon: icon, // 添加 Icon 图标 URL
                    title: 'car'
                });

                that.map.add(car)

                  that.overlayGroup = new AMap.OverlayGroup(marker_list);
                // 将覆盖物组添加到地图上
                    that.map.add(that.overlayGroup);

                var added_marker_list = that.map.getAllOverlays()
                
                displayWithDelay(list,index+1)
                var car_display_clock =   setTimeout(function(){car.hide()},1500)
                    },2000)
                    
                }

                displayWithDelay(that.sum_result,0)
            })
            },500)

             
            })
        },

        delLayer(){

            this.map.clearMap()

        }
    },
    created(){
      bus.$on('shareMap',(msg)=>{
          this.map = msg
        })
    },
    watch:{
      rangeNO2_ShowOrNot(newValue){
        if (newValue){
            
            this.range_no2_show()
            // setTimeout(function(){},5000)
            // this.rangeTwo_CO_show()

          console.log("<Range_NO2>按钮开关：true");
        }else{
          this.delLayer()
          
          console.log("<Range_NO2>按钮开关：false   WebSocket：关闭");
        }
      }
    }
}
</script>