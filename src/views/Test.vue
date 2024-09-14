<template>
    <div>
      <button @click="start">点击</button>
    </div>
</template>

<script>
import Element from 'element-ui'
import Child from '@/components/child.vue'




export default {

    name:'T',
    components:{Element,Child},
    data(){
        return{
          // 定义mapcontainer传来的map实例
          map:null,
          // 覆盖物组，存放圆点标记
          overlayGroup:null,
        }
    },
    methods:{   
      start(){
        var i=0



        function printMessages() {
  console.log('小循环');

  for (var j = 0; j < 10; j++) {
    setTimeout(function(j) {
      return function() {
        console.log(j);
      };
    }(j), j * 1000);
  }

  setTimeout(function() {
    console.log('我的朋友');
  }, 9000);
}




setInterval(function() {
  console.log('大循环开始');
  printMessages();
}, 10000);

    
      }

    },
    mounted(){
      var that =this
    },
    created(){

    }
}
</script>

<style>

</style>
