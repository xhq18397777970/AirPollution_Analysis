<template>
    <div id="search_container">
        <input type="text" placeholder="请输入要查询的关键词" v-model="inputObject.userInput" :id="inputObject.inputId">
        <el-button id="searchBtn" @click="send" type="primary" icon="el-icon-search">搜索</el-button>
        
    </div>
</template>

<script>
  import bus from '@/bus/bus.js'
  import { Button } from 'element-ui'

export default{
    components:{Button},
    data(){
        return{
            // 返回值，用object对象构建，obj对象包含2个传来的属性：userInput、inputId
            inputObject:{
                userInput:'',
                // 初始值
                inputId:'searchInput'
            }

        }
    },
    methods:{
        send(){
            // 使用bus.js，构建当前的vue，并把当前vue组件中的属性和value传给兄弟组件
            bus.$emit('shareUserInput',this.inputObject)
            console.log(this.inputObject);
        }
    },mounted(){
        this.send()
    }
}
</script>

<style lang="less" scoped>
#search_container{
    width:100%;
    height:100%;
        display: flex;
    input{
        height:40px;
        width:300px;

    }
    #searchBtn{

        height: 45px;
        width: 100px;

    }
}
</style>