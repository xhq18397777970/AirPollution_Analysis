<template>
    <div id="container"></div>

  </template>
  



  <script src="https://webapi.amap.com/maps?v=2.0&key=ab483676931b5c32ffd436065e5607c1"></script>
  <script src="https://a.amap.com/jsapi_demos/static/resource/heatmapData.js"></script>
  <script>
  import AMapLoader from '@amap/amap-jsapi-loader'
  import bus from '@/bus/bus.js'

  import Voice from '@/components/pollutionSearchBox/Voice.vue'


      window._AMapSecurityConfig = {
            securityJsCode: 'f2291aed2690407b622f3572bfe1def8'
      }
  export default {
    components:{Voice},
    data(){
	return {
		map:null,

        autoOptions: {
        input: ''
      },
        searchPlaceInput:'',
        auto: null,
        placeSearch:null,
        showHeatOrNot:false,
        heatmap:null,


        // 污染数据flag

        
        
	}},

    methods:{
    initMap(){
        AMapLoader.load({
            key:"ab483676931b5c32ffd436065e5607c1",             // 申请好的Web端开发者Key，首次调用 load 时必填
            version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins:['AMap.Heatmap','AMap.PlaceSearch','AMap.AutoComplete','AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap)=>{


            this.map = new AMap.Map("container",{
              resizeEnable: true,  //设置地图容器id
                viewMode:"3D", 
                   //是否为3D地图模式
                zoom:17.4, 
               
                terrain: true,          //初始化地图级别
                center:[120.08717217833885,36.7634383576044], //初始化地图中心点位置
            });


            this.map.addControl(new AMap.Scale())
            this.map.addControl(new AMap.ToolBar())
            this.map.addControl(new AMap.HawkEye())
            this.map.addControl(new AMap.MapType())
            this.map.addControl(new AMap.Geolocation())
            // 联箱搜索：该插件即传入一个对象，会调用高德的插件，对关键词进行检索
            // 高德每日有搜索次数限制的，后来换了个企业版的密钥和key就好啦
            this.auto = new AMap.AutoComplete(this.autoOptions)
          

            // 在initMap中定义，可以将实例map传递给兄弟组件
            bus.$emit('shareMap',this.map)
            


            // 热力图加载存在插件加载问题：插件的同步加载和异步加载
          var heatmap;
    var points =[
    { "lng": 114.61961344401101, "lat": 30.457530653212, "count": 1000 },
          { "lng": 114.62060329861197, "lat": 30.457513020834, "count": 11000 },
          { "lng":  114.61913519965299, "lat": 39.810742, "count": 1255 },
          { "lng": 116.481707, "lat": 30.4587367079, "count": 134 },
          { "lng": 116.410588, "lat": 39.880172, "count": 14 },
          { "lng": 116.394816, "lat": 39.91181, "count": 15 },
          { "lng": 116.416002, "lat": 39.952917, "count": 16 }
    ];
        //加载热力图插件
          
        //     heatmap = new AMap.HeatMap(this.map);    //在地图对象叠加热力图
        // heatmap.setDataSet({data:points,max:100}); //设置热力图数据集
          

        //具体参数见接口文档

    


          // 联想搜索+POI地址查询
          this.placeSearch = new AMap.PlaceSearch({
            map: this.map
          }) //构造地点查询类（绑定地图搜索为this.map，用auto.on的select监听，当发现有select事件，则调用select函数
          this.auto.on('select', this.select)

        }).catch(e => {
          console.log(e);
        })
    },
    // 回调函数（e），返回城市的id、name
    select(e) {
      this.placeSearch.setCity(e.poi.adcode)
      this.placeSearch.search(e.poi.name) //关键字查询查询
    },
    // 样式，成功返回交互信息
    feedback(msg,feedbackType) {
        this.$message({
          message: msg,
          type: feedbackType
        });
      },

      //热力图展示
      showHeatMap(){
        this.map.plugin(['AMap.PlaceSearch'], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 50, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: this.searchPlaceInput, // 兴趣点城市（为输入并send的关键词）
          citylimit: true //是否强制限制在设置的城市内搜索
          //map: this.map, // 展现结果的地图实例
          // panel: 'panel', // 结果列表将在此容器中进行展示。
          // autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        })
        //关键字查询
        placeSearch.search('小区', (status, result) => {
          // console.log(result)

          this.getHotChartPos('小区', result)
        })
      })
      this.$notify({
        title: '成功',
        message: '热力图获取成果，但是由于电脑性能，我们仅加载部分数据',
        type: 'success'
      })

      },

      // 
      // detail，为传入的“商场”
      getHotChartPos(detail, result) {
      let lengthSize = result.poiList.pageSize
      const count = result.poiList.count
      // const lengthPage = count / lengthSize
      if (lengthSize > count) {
        lengthSize = count
      }
      for (var n = 0; n < 2; n++) {
        // this.map.plugin(['AMap.PlaceSearch'], () => {
        //构造地点查询类
        var realSearch = new AMap.PlaceSearch({
          pageSize: 50, // 单页显示结果条数
          pageIndex: n + 1, // 页码
          city: this.searchPlaceInput, // 兴趣点城市
          citylimit: true //是否强制限制在设置的城市内搜索
          // map: this.map, // 展现结果的地图实例
          // panel: 'panel', // 结果列表将在此容器中进行展示。
          // autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        })
        realSearch.search(detail, (status, result) => {
          // for (var j = 0; j < 50; j++) {
          // this.map.remove(this.map.getAllOverlays('marker'))
          //var centerPoint = [result.poiList.pois[j].location.lng, result.poiList.pois[j].location.lat]
          // console.log(result)
          //热力图
          this.showHatChart(result)
          // }
        })
      }
    },
    showHatChart(result) {
      var info = []
      for (let i = 0; i < 50; i++) {
        info.push({
          lng: result.poiList.pois[i].location.lng,
          lat: result.poiList.pois[i].location.lat,
          count: 3 * 6.4 * Math.round(Math.random() * (10 - 2) + 2)
        })
      }

      this.map.plugin(['AMap.HeatMap'], () => {
        // console.log('nn')
        //初始化heatmap对象
        this.heatmap = new AMap.HeatMap(this.map, {
          radius: 56, //给定半径
          opacity: [0, 0.5]
          /*,
            gradient:{
                0.5: 'blue',
                0.65: 'rgb(117,211,248)',
                0.7: 'rgb(0, 255, 0)',
                0.9: '#ffea00',
                1.0: 'red'
            }
             */
        })
        //设置数据集
        this.heatmap.setDataSet({
          data: info,
          max: 100
        })
        this.heatmapList.push(this.heatmap)
        this.heatmap.show()
        
      })
    },

    shareMap(){
            // 使用bus.js，构建当前的vue，并把当前vue组件中的属性和value传给兄弟组件
            bus.$emit('shareMap',this.map)
    },




},

mounted() {
    //DOM初始化完成进行地图初始化
    this.initMap()

  },
  created(){
    bus.$on('shareUserInput',val=>{
        // 接收的是inputId，由于autocomletion中传入的是输入框的id
        this.autoOptions.input = val.inputId
        this.searchPlaceInput = val.userInput
    })
    
    bus.$on('heatMapSearchBox',val=>{
        // 接收的是inputId，由于autocomletion中传入的是输入框的id
        this.showHeatOrNot = val.checked
        
    })

    // bus.$emit('shareMap',this.map)


    
  },
  watch: {
    searchPlaceInput(newValue) {
      if (newValue != null) {
        this.feedback('“'+newValue+'”'+"POI查询成功！","success")
        console.log("POI查询："+newValue);
        this.placeSearch.search(newValue)
        this.map.setZoom(17.2)
      }
      else{
        this.feedback("POI查询失败！","error")
      }
    },
    
    showHeatOrNot(newValue){
      if(newValue){
        this.showHeatMap()
      }
    },

    // 污染数据展示

      // if(newValue){
      //   var myHeaders = new Headers();
      //         myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

      //         var requestOptions = {
      //             method: 'GET',
      //             headers: myHeaders,
      //             redirect: 'follow'
      //         };

      //         fetch("http://175.178.67.109:8801/swagger/aqiDataShow", requestOptions)
      //             .then(response => response.text())
      //             .then(result => {
      //               var obj = JSON.parse(result)
      //               console.log(obj)
      //               // for (var i =0;i<result.length;i++){
      //               //     console.log(result[i]);
      //               // }

      //             })
      //             .catch(error => console.log('error', error));
      // }
    


  }


}

  
  </script>
  
  
  <style lang="less" scoped>
  #container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
  }
  #btn{
    z-index: 20;
  }
  #amap_ctrl_zoomin,#amap_ctrl_zoomout{
    left: 20%;
    position: absolute;
  }
  </style>
  