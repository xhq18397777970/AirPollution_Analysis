<template>
    <div>
        <div id="roll_display_card_container">
            <br>
        <div id="roll_display_card">
          <el-steps  space="400px" :active="active" finish-status="success" process-status="finish" align-center >
          <el-step title="10月23日" description="14:00-15:00"></el-step>
          <el-step title="10月23日 " description="16:00-17:00"></el-step>
          <el-step title="10月24日 " description="09:00-10:00"></el-step>
        </el-steps>

        </div>
        
      </div>

    </div>
</template>

<script>

import Element from 'element-ui'
import bus from '@/bus/bus.js'

export default{
    components:{Element},
    data(){
        return{
            active:0,
        }
    },
    created(){
        bus.$on('current_Number',(msg)=>{
          this.active = msg
        })

    },
    mounted(){
       
    },
    methods:{

    },
    watch:{
        active(newValue){
            var scrollContainer = document.getElementById("roll_display_card_container");

              // 计算滚动条位置（当newValue为1时，不动，为2时开始向右移动，总共有15趟数据，则每次移动1/15。当移动到最后一趟时，newValue又变成1，此时又回到开始）
            var scrollPosition = (newValue - 1) / 15 * 100;

              // 设置滚动条位置
            scrollContainer.scrollLeft = (scrollContainer.scrollWidth - scrollContainer.clientWidth) * (scrollPosition / 100);

              }
    }

}
</script>

<style>
#roll_display_card_container{
  width: 800px;
  height: 95px;
  z-index: 20;
  position:absolute;
  top:85%;
  left: 30%;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.925);
border-radius: 50px;

}
#roll_display_card{
  width: 2280px;
}
</style>