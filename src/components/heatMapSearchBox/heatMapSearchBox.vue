<template>
    <div id="heat_map_search_box_container">
        <el-checkbox v-model="checked" @change="send">热力图展示</el-checkbox>

    </div>
</template>


<script>
import bus from '@/bus/bus.js'
export default{
    data(){
        return{
            checked:false
        }
    },
    methods:{
        send(){
            bus.$emit('heatMapSearchBox',this.checked)
            console.log(this.checked);
        }
    }
}
</script>



<style lang="less" scoped>
    #heat_map_search_box_container{
        height: 100%;
        width: 100%;
        position: relative;
    }
</style>