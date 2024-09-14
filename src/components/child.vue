<template>
    <div id="child">
        
    </div>
</template>

<script>
export default{
    name:'child',
    props:{
        flag:Boolean
    },
    data(){
        return{
            y:false
        }
    },
    methods:{

        send(){
            if(this.flag){
                console.log("接受的值为真");
            }else{
                console.log("接受的值为假");
            }
        }
    },

    mounted(){
        this.send()
    },
    watch:{
        flag(newValue){
            if(newValue){
                console.log("真");
            
            }else{
                console.log("假");
            }
        }
    },
    created(){

    }

}
</script>
