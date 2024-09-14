<template>

    <div id="index_container">
      <div id="legend_wrapp">

        <!-- 轮播 -->

        <img v-show="carouselCO" src="@/img/legend/CO.png" height="100%" width="100%" alt="">
        <img v-show="carouselSO2" src="@/img/legend/SO2.png" height="100%" width="100%" alt="">
        <img v-show="carouselNO2" src="@/img/legend/NO2.png" height="100%" width="100%" alt="">
        <img v-show="carouselO3" src="@/img/legend/O3.png" height="100%" width="100%" alt="">
        <img v-show="carouselPM10" src="@/img/legend/PM10.png" height="100%" width="100%" alt="">
        <img v-show="voice" src="@/img/legend/PM25.png" height="100%" width="100%" alt="">
        <!-- 实时 -->

        <img v-show="wsPm25" src="@/img/legend/wPM25.png" height="100%" width="100%" alt="">
        <img v-show="wsPm10" src="@/img/legend/wPM10.png" height="100%" width="100%" alt="">
        <img v-show="wsSo2" src="@/img/legend/wSO2.png" height="100%" width="100%" alt="">
        <img v-show="wsNO2" src="@/img/legend/wNO2.png" height="100%" width="100%" alt="">
        <img v-show="wsCO" src="@/img/legend/wCO.png" height="100%" width="100%" alt="">
        <img v-show="wsO3" src="@/img/legend/wO3.png" height="100%" width="100%" alt="">
        <!-- 范围分析 -->

        <img v-show="rangeCO" src="@/img/legend/CO.png" height="100%" width="100%" alt="">
        <img v-show="rangeSO2" src="@/img/legend/SO2.png" height="100%" width="100%" alt="">
        <img v-show="rangeNO2" src="@/img/legend/NO2.png" height="100%" width="100%" alt="">
        <img v-show="rangeO3" src="@/img/legend/O3.png" height="100%" width="100%" alt="">
        <img v-show="rangePM10" src="@/img/legend/PM10.png" height="100%" width="100%" alt="">
        <img v-show="rangePM25" src="@/img/legend/PM25.png" height="100%" width="100%" alt="">
        <!-- 危害评估 -->
        <img v-show="raqi" src="@/img/legend/RAQI.png" height="100%" width="100%" alt="">
        <!-- 传感器数据展示 -->
        
        <img v-show="ph" src="@/img/legend/PH.png" height="100%" width="100%" alt="">
        <img v-show="realvoice" src="@/img/legend/噪声.png" height="100%" width="100%" alt="">
        <img v-show="light" src="@/img/legend/光强.png" height="100%" width="100%" alt="">

        <!-- 最新 -->
        <img v-show="heatmap" src="@/img/legend/PM25.png" height="100%" width="100%" alt="">
        <img v-show="range" src="@/img/legend/pm2.5range.png" height="100%" width="100%" alt="">

        <img v-show="RAQI" src="@/img/legend/RAQI.png" height="100%" width="100%" alt="">
        
      </div>
          
        

        <div id="timer_axis_container">
          <time-axis v-show="timeAsix_ShowOrNot"></time-axis>
        </div>

        <div id="search_wrap">
            <search></search>
        </div>

        <div id="map_wrap">
            <map-container></map-container>
        </div>

        <div id="heatMap_wrap">
            <heat-map-search-box></heat-map-search-box>
        </div>
              

        <div id="loading_tips">
          <!-- el控件：点击显示侧边框 -->
            <el-button id="showdetail" @click="drawer = true" type="primary" style="margin-left: 16px;">
              详情页
            </el-button>



            <!-- 日历 -->
            <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
              
              <el-calendar v-model="value">
          </el-calendar>
              <span>{{ message }}</span>
              <hr>
              <el-link type="primary" href="https://www.cug.edu.cn/" target="_blank">中国地质大学官网</el-link>
            </el-drawer>
            
        </div>

        <div id="pollution_wrap">
          
            <div id="pollution_btn">
              
              <!-- 按钮 -->
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>

    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-cloudy"></i>
            <span slot="title">一.大气污染</span>
          </template>
          <el-menu-item-group>
            <span slot="title">1.污染数据监测</span>
            <el-submenu index="1-1-1">
            <span slot="title">巡检数据轮播</span>
            <el-menu-item index="1-1-1-1" @click="change_carousel_o3">O3
              <carouselO3 :carouselO3_ShowOrNot="carouselO3"></carouselO3>
            </el-menu-item>
            <el-menu-item index="1-1-1-2" @click="change_carousel_co">CO
              <carouselCO :carouselCO_ShowOrNot="carouselCO"></carouselCO>
            </el-menu-item>
            <el-menu-item index="1-1-1-3" @click="change_carousel_so2">SO2
              <CarouselSO2 :carouselSO2_ShowOrNot="carouselSO2"></CarouselSO2>
            </el-menu-item>
            <el-menu-item index="1-1-1-4" @click="change_voice" >PM2.5
            <voice :voice_ShowOrNot="voice" ></voice>
          </el-menu-item>
            <el-menu-item index="1-1-1-5" @click="change_carousel_pm10">PM10
              <CarouselPM10 :carouselPM10_ShowOrNot="carouselPM10"></CarouselPM10>
            </el-menu-item>
            <el-menu-item index="1-1-1-6" @click="change_carousel_no2">NO2
              <CarouselNO2 :carouselNO2_ShowOrNot="carouselNO2"></CarouselNO2>
            </el-menu-item>
          </el-submenu>
          </el-menu-item-group>
        
          <el-menu-item-group>
            
            <span slot="title">2.污染态势预警</span>

          

          <el-submenu index="1-1-2">
            <span slot="title">实时巡检数据推送</span>
            <el-menu-item index="1-1-2-1" @click="change_wsO3">O3
              <WSO3 :o3_ShowOrNot="wsO3"></WSO3>
            </el-menu-item>
            <el-menu-item index="1-1-2-2" @click="change_wsCO">CO
              <WSCO :co_ShowOrNot="wsCO"></WSCO>
            </el-menu-item>
            <el-menu-item index="1-1-2-3" @click="change_wsSo2">SO2
              <WSSO2 :so2_ShowOrNot="wsSo2"></WSSO2>
            </el-menu-item>
            <el-menu-item index="1-1-2-4" @click="change_wsPm25">PM2.5
            <WSPM25 :wsPm25_ShowOrNot="wsPm25"></WSPM25>
          </el-menu-item>
            <el-menu-item index="1-1-2-5" @click="change_wsPm10">PM10
              <WSPM10 :wsPm10_ShowOrNot="wsPm10"></WSPM10>
            </el-menu-item>
            <el-menu-item index="1-1-2-6"  @click="change_wsNO2">NO2
              <WSNO2 :no2_ShowOrNot="wsNO2"></WSNO2>
            </el-menu-item>
          </el-submenu>



          </el-menu-item-group>



        <el-menu-item-group title="3.污染范围分析"></el-menu-item-group>


        <el-submenu index="1-2-1">
          <span slot="title">IAQI</span>
          <el-menu-item index="1-2-1-1" @click="rangeO3 = !rangeO3">O3
            <RangeO3 :rangeO3_ShowOrNot="rangeO3"></RangeO3>
          </el-menu-item>
          <el-menu-item index="1-2-1-2" @click="rangeCO =!rangeCO">CO
            <RangeCO :rangeCO_ShowOrNot="rangeCO"></RangeCO>
          </el-menu-item>
          <el-menu-item index="1-2-1-3" @click="rangeSO2 = !rangeSO2">SO2
            <RangeSO2 :rangeSO2_ShowOrNot="rangeSO2"></RangeSO2>
          </el-menu-item>
          <el-menu-item index="1-2-1-4" @click="rangePM25 =!rangePM25">PM2.5
            <RangePM25 :rangePM25_ShowOrNot="rangePM25"></RangePM25>
          </el-menu-item>
          <el-menu-item index="1-2-1-5" @click="rangePM10 =!rangePM10">PM10
            <RangePM10 :rangePM10_ShowOrNot="rangePM10"></RangePM10>
          </el-menu-item>
          <el-menu-item index="1-2-1-6" @click="rangeNO2 = !rangeNO2">NO2
            <RangeNO2 :rangeNO2_ShowOrNot="rangeNO2"></RangeNO2>
          </el-menu-item>
        </el-submenu>

        <el-menu-item-group>
            <span slot="title">4.污染危害评估</span>

            <el-menu-item index="1-3-1" @click="raqi = !raqi" >RAQI
              <RAQI :raqi_ShowOrNot="raqi"></RAQI>
              
            </el-menu-item>


        </el-menu-item-group>

      </el-submenu>


      
      
      <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-odometer"></i>
            <span slot="title">二.其他数据展示</span>
          </template>


          <el-menu-item-group>
            <span slot="title">1.噪声展示</span>


            <el-menu-item index="2-1-1" @click="realvoice=!realvoice">voice
              <RealVoice :realVoice_ShowOrNot="realvoice"></RealVoice>

            </el-menu-item>


          </el-menu-item-group>

          <el-menu-item-group>
            <span slot="title">2.PH值展示</span>


            <el-menu-item index="2-2-1" @click="ph = !ph">PH值
              <Ph :ph_ShowOrNot="ph"></Ph>

            </el-menu-item>


          </el-menu-item-group>

          <el-menu-item-group>
            <span slot="title">3.光强展示</span>


            <el-menu-item index="2-3-1" @click="light = !light">光照强度
              <LightIntensity :light_ShowOrNot="light"></LightIntensity>

            </el-menu-item>

            



          </el-menu-item-group>

          <el-menu-item-group>
            <span slot="title">4.大气污染数据分析</span>
            <el-menu-item  id="warn" index="2-4-1" @click="change_heatmap">1.污染态势预警
              <Test :heatmap_ShowOrNot="heatmap"></Test>

            </el-menu-item>

            <el-menu-item  id="range" index="2-4-2" @click="change_range">2.污染范围分析
              <Range :range_ShowOrNot="range"></Range>
            </el-menu-item>

            <el-menu-item  id="evaluate" index="2-4-3" @click="change_heatmap">3.污染范围缓冲区
              <Test :heatmap_ShowOrNot="heatmap"></Test>
            </el-menu-item>

            <el-menu-item  id="RAQI" index="2-4-3" @click="change_RAQI">4.污染危害评估
              <RAQI_new :RAQI_ShowOrNot="RAQI"></RAQI_new>
            </el-menu-item>

          </el-menu-item-group>
      </el-submenu>


 
    </el-menu>
          </div>

        </div>






    </div>
</template>


<script>
// 必需组件
import bus from '@/bus/bus.js'
import Element from 'element-ui'

// 地图组件
import MapContainer from '@/components/MapContainer/MapContainer.vue';
import Search from '@/components/Search/Search.vue'
import HeatMapSearchBox from '@/components/heatMapSearchBox/heatMapSearchBox.vue'


// 污染组件
import Voice from '@/components/pollutionSearchBox/Voice.vue'
import CarouselPM10 from '@/components/pollutionSearchBox/carouselPM10.vue';
import CarouselSO2 from '@/components/pollutionSearchBox/carouselSO2.vue'
import CarouselNO2 from '@/components/pollutionSearchBox/carouselNO2.vue'
import carouselCO from '@/components/pollutionSearchBox/carouselCO.vue'
import carouselO3 from '@/components/pollutionSearchBox/carouselO3.vue'


import WSPM25 from '@/components/wsPollution/wsPM25.vue';
import WSPM10 from '@/components/wsPollution/wsPM10.vue'
import WSSO2 from '@/components/wsPollution/wsSO2.vue'
import WSNO2 from '@/components/wsPollution/wsNO2.vue'
import WSCO from '@/components/wsPollution/wsCO.vue'
import WSO3 from '@/components/wsPollution/wsO3.vue'

import RangeCO from '@/components/RangeAnalyse/rangeCO.vue'
import RangeSO2 from '@/components/RangeAnalyse/rangeSO2.vue'
import RangeNO2 from '@/components/RangeAnalyse/rangeNO2.vue'
import RangeO3 from '@/components/RangeAnalyse/rangeO3.vue'
import RangePM10 from '@/components/RangeAnalyse/rangePM10.vue'
import RangePM25 from '@/components/RangeAnalyse/rangePM25.vue'
import RAQI from '@/components/pollutionSearchBox/RAQI.vue';

import RealVoice from '@/components/OtherDataDisplay/Voice.vue'
import LightIntensity from '@/components/OtherDataDisplay/LightIntensity.vue'
import Ph from '@/components/OtherDataDisplay/Ph.vue'

// Element控件
import TimeAxis from '@/components/Element/TimeAxis.vue';
import { format } from 'echarts/core';
import carouselCOVue from '@/components/pollutionSearchBox/carouselCO.vue';



// 最新
import  Test from '@/components/HeatMap/test.vue'
import RAQI_new from '@/components/HeatMap/RAQI.vue'
import Range from '@/components/HeatMap/range.vue'




export default{
    components:{ 

       Element,TimeAxis, 
       MapContainer, Search, HeatMapSearchBox,

        //  轮播
        Voice,CarouselPM10,CarouselSO2,CarouselNO2,carouselCO,carouselO3,
        //实时 
        WSPM25, WSPM10,WSSO2,WSNO2,WSCO,WSO3,
        // 范围
        RangeCO,RangeSO2,RangeNO2,RangeO3,RangePM10,RangePM25,
 
        RealVoice,LightIntensity,Ph,RAQI,


        // 最新
        Test,RAQI_new,Range,

    },
            data(){
                return{
                  message:'在此处展示污染数据',
                  // el控件：日历
                  value: new Date(),
                  // 侧边框
                  drawer: false,
                  // 菜单栏
                  isCollapse: true,


                    // 1、轮播：flag
                      timeAsix_ShowOrNot:false,
                      voice:false,
                      carouselPM10:false,
                      carouselSO2:false,
                      carouselNO2:false,
                      carouselCO:false,
                      carouselO3:false,
                    // 2、实时推送
                      wsPm25:false,
                      wsPm10:false,
                      wsSo2:false,
                      wsNO2:false,
                      wsCO:false,
                      wsO3:false,

                    // 3、
                      rangeCO:false,
                      rangeSO2:false,
                      rangeNO2:false,
                      rangeO3:false,
                      rangePM10:false,
                      rangePM25:false,



                    // 3、危害评估
                      raqi:false,
                      // 4、数值展示
                      realvoice:false,
                      light:false,
                      ph:false,

                      // 5、热力图
                      heatmap:false,
                      RAQI:false,
                      range:false,

                      

                }
            },
            methods:{
              // Element：下拉框方法
            handleOpen(key, keyPath) {
              console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
              console.log(key, keyPath);
            },

    // Element：“提示：请等待地图完全加载”
            loadingTip() {
              const h = this.$createElement;
              this.$message({
                message: h('p', null, [
                  
                  h('i', { style: 'color: teal' }, '请5s至等待地图完全加载...')
                ])
              })
            },


          // 1、轮播
          change_voice(){
            this.voice=!this.voice
            // 此时当点击按钮，把时间轴也打开（只需要在轮播的组件中展示）
            this.timeAsix_ShowOrNot = true

            this.carouselPM10 = false
            this.carouselSO2 = false
            this.carouselNO2 = false
            this.carouselCO = false
            this.carouselO3 = false
          },

          change_carousel_pm10(){
            this.carouselPM10 = !this.carouselPM10
            this.timeAsix_ShowOrNot = true

            this.voice = false
            this.carouselO3 = false
            this.carouselSO2 = false
            this.carouselNO2 = false
            this.carouselCO = false
          },
          change_carousel_so2(){
            this.carouselSO2 = !this.carouselSO2
            this.timeAsix_ShowOrNot = true

            this.voice = false
            this.carouselPM10 = false
            this.carouselO3 = false
            this.carouselNO2 = false
            this.carouselCO = false
          },
          change_carousel_no2(){
            this.carouselNO2 = !this.carouselNO2
            this.timeAsix_ShowOrNot =true

            this.voice = false
            this.carouselPM10 = false
            this.carouselSO2 = false
            this.carouselO3 = false
            this.carouselCO = false
          },
          change_carousel_co(){
            this.carouselCO = !this.carouselCO
            this.timeAsix_ShowOrNot = true

            this.voice = false
            this.carouselPM10 = false
            this.carouselSO2 = false
            this.carouselNO2 = false
            this.carouselO3 = false
            
          },
          change_carousel_o3(){
            this.carouselO3 = !this.carouselO3
            this.timeAsix_ShowOrNot = true

            this.voice = false,
            this.carouselPM10 = false
            this.carouselSO2 = false
            this.carouselNO2 = false
            this.carouselCO = false
            

          },


          // 2、实时推送
          change_wsPm25(){
            this.timeAsix_ShowOrNot = false
            this.wsPm25 = !this.wsPm25

            this.wsSo2= false
            this.wsNO2 = false
            this.wsCO= false
            this.wsO3= false
            this.wsPm10= false
            
          },
          change_wsPm10(){
            this.timeAsix_ShowOrNot = false
            this.wsPm10 = !this.wsPm10
            
            this.wsSo2= false
            this.wsNO2 = false
            this.wsCO= false
            this.wsO3= false
            this.wsPm25= false
          },
          change_wsSo2(){
            this.timeAsix_ShowOrNot = false
            this.wsSo2 = !this.wsSo2
            
            this.wsPm25= false
            this.wsNO2 = false
            this.wsCO= false
            this.wsO3= false
            this.wsPm10= false
          },
          change_wsNO2(){
            this.timeAsix_ShowOrNot = false
            this.wsNO2 = !this.wsNO2

            this.wsSo2= false
            this.wsPm25 = false
            this.wsCO= false
            this.wsO3= false
            this.wsPm10= false
            
          },
          change_wsCO(){
            this.timeAsix_ShowOrNot = false
            this.wsCO = !this.wsCO
            
            this.wsSo2= false
            this.wsNO2 = false
            this.wsPm25= false
            this.wsO3= false
            this.wsPm10= false
          },
          change_wsO3(){
            this.timeAsix_ShowOrNot = false
            this.wsO3 = !this.wsO3

            this.wsSo2= false
            this.wsNO2 = false
            this.wsCO= false
            this.wsPm25= false
            this.wsPm10= false
            
          },

          // 3、危害评估
          change_raqi(){
            this.raqi = !this.raqi
            
          },


          // 最新：
          // 1、污染预警（轮播)
          change_heatmap(){
            this.timeAsix_ShowOrNot = true
            this.heatmap = !this.heatmap
          },
          change_RAQI(){
            this.timeAsix_ShowOrNot = false
            this.RAQI = !this.RAQI
          },
          change_range(){
            this.timeAsix_ShowOrNot = false
            this.range = !this.range
          }

            },
            // 挂载完以后给出提示：“请等待地图完全加载”（由于需要组件通信时间）
            mounted() {
              this.loadingTip()
            },
            created(){
              // 接受voice传递来，当前的巡检趟数

            },
            watch:{


            }

}
</script>

<style lang="less" scoped>
#index_container{
    overflow: hidden;
    // background-color: rgb(207, 229, 248);
    height: 100%;
    width:100%;
    padding: 0;
    margin: 0;
    position: relative;

    #search_wrap{
        z-index: 10;
        position: absolute;
        top: 30px;
        left:50%;
        transform: translate(-50%,-50%);
        height: 60px;
        width: 400px;
    }
    #map_wrap{
        z-index: 10;
        position:absolute;
        top: 50px;
        left: 60px;
        // transform: translate(-50%,-50%);
        height: 90%;
        width:95%;
        padding: 0;
        margin: 0;

    }


    #heatMap_wrap{
        z-index: 12;
        position:absolute;
        top: 25px;
        left:36%;

        transform: translate(-50%,-50%);
        position:absolute;
    }
    #pollution_wrap{
      z-index: 20;

      
    } 
    #showdetail{
      z-index: 12;
        position:absolute;
        top: 20px;
        left:10%;

        transform: translate(-50%,-50%);
        position:absolute;
        border-radius: 20px;
    }


}
.el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 100px;
      min-height: 200px;
    }

#legend_wrapp{
  position: absolute;
  width: 400px;
  height: 400px;
  z-index: 20;
  left: 3%;
  top: 7%;
}

</style>