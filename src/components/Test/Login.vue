<template>
    <div class="about">
        <input type="text" placeholder="请输入你的用户名" v-model="username">
        <button @click="LoginBtn">进入聊天室</button>
    </div>
</template>

<script>

export default{
    name:'login',
    data(){
        return{
            username:'',
        }
    },

    methods:{
        LoginBtn(){
            const username = this.username.trim()
            if(username.length<6){
                alert('输入的用户名不得小于6位!')
                return;
            }
            localStorage.setItem('username',username);
            this.$router.push('/home')
        }
    }
}
</script>