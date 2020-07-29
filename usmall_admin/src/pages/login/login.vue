<template>
  <div class="login">
       <div class="box">
           <h3>登录</h3>
           <el-input class="input" v-model="user.username" placeholder="请输入内容"  clearable></el-input>
            <el-input class="input" v-model="user.password" placeholder="请输入内容" clearable show-password></el-input>
            <div class="btnbox">
                <el-button type="primary" round @click="login">登录</el-button>
            </div>     
       </div>
  </div>
</template>
 <script>
 import {mapGetters,mapActions} from 'vuex'
 import {requestManageLogin} from '../../util/request'
 import {successAlert,warningAlert} from '../../util/alert'
 export default {
computed:{
},
 data() {
 return {
     user:{
         username:'',
         password:''
     }
 };
 },
 methods: {
     ...mapActions({
          requestUser:'requestUser'
     }),
      login(){
          requestManageLogin(this.user).then(res=>{
              if(res.data.code==200){
                   successAlert(res.data.msg)
                   this.requestUser(res.data.list)
                   this.$router.push("/")
              }else{
                  warningAlert(res.data.msg)
              }
          }) 
      }
},
 mounted(){},
 };
</script>
<style scoped>
.login{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right,#553444, #303d60);
}
.box{
    width: 400px;
    padding: 20px;
    background: #fff;
    border-radius:20px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
h3{
    text-align: center;
    line-height: 60px;
    font-size: 30px;
}
.input{
    margin-bottom: 20px;
}
.btnbox{
    text-align: center;
}
</style>