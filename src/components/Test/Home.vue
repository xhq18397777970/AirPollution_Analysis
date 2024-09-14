<template>
    <div class="about">
        <input type="text" placeholder="请输入信息" v-model="msg">
        <button @click="sendMsg">发送</button>
    </div>
</template>
<script>

const ws = new WebSocket('ws://175.178.67.109:8801/ws/sensorWS?token=147')
export default{
    name:'home',
    data(){
        return{
            msg:'',
            username:'',
            msgList:[]
        }
    },
    mounted(){
        this.username = localStorage.getItem("username");

        if (!this.username){
            this.$router.push('/login')
        }

        ws.addEventListener('open',this.wsOpen.bind(this),false);
        ws.addEventListener('close',this.wsClose.bind(this),false);
        ws.addEventListener('error',this.wsError.bind(this),false);
        ws.addEventListener('message',this.wsMessage.bind(this),false);
    },
    methods:{
        sendMsg(){
            const msg = "1"
            ws.send(JSON.stringify({
                msg:msg
            }))
        },

        wsOpen(e){
            console.log('FE WebSocket open',e);
        },
        wsClose(e){
            console.log('FE WebSocket close',e);
        },
        wsError(e){
            console.log('FE WebSocket Error',e);
        },
        wsMessage(e){
            console.log("信息为：");
            const msg = JSON.parse(e.data)
            console.log(msg);
        }
    }
}
</script>