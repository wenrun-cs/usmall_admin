<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules" ref="form">
        <!-- 手机号 -->
        <el-form-item label="手机号" label-width="80px" prop='phone'>
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 昵称 -->
         <el-form-item label="昵称" label-width="80px" prop='nickname'>
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
         <el-form-item label="密码" label-width="80px" prop='password'>
          <el-input v-model="form.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update('form')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 <script>
 import {mapGetters,mapActions} from 'vuex'
 import {requestMemberDetail,updateMemberList} from '../../../util/request'
 import {successAlert,warningAlert} from '../../../util/alert'
export default {
  props: ["info"],
  computed:{
      ...mapGetters({
        memberlist:'member/list'
      })
  },
  data() {
    return {
      form: {
        nickname: "",
        phone:'',
        password:'',
        status:1,
      },
      ps:'',
      rules: {
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在 11个字符', trigger: 'blur' }
          ],
           nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 3,  message: '长度在 3个字符以上', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
          ],
        }
    };
  },
  methods: {
    ...mapActions({
        requestChangeList:'member/requestChangeList'
    }),
    // 清空表格
    empty(){
        this.form= {
        nickname: "",
        phone:'',
        password:'',
        status:1,
      }
    },
    // 隐藏表单
     cancel(){
         this.info.show=false;
         if(!this.info.isAdd){
            this.empty();
         }
     },
    //编辑
    getDetail(uid){
        requestMemberDetail({uid:uid}).then(res=>{
             if(res.data.code==200){
                 this.form=res.data.list;
                 this.form.uid=uid;
                 this.form.password='';
                 this.ps=res.data.list.password;
             }
        })
    },
    //修改
    update(formName){
       this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.form.password==''){
            this.form.password=this.ps;
        }
        updateMemberList(this.form).then(res=>{
            if(res.data.code==200){
                successAlert('修改成功');
                this.empty();
                this.cancel();
                this.requestChangeList()
            }else{
                warningAlert(res.data.msg)
            }
        })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
  },
  mounted() {
      this.requestChangeList()
},
};
</script>
<style scoped>
</style>