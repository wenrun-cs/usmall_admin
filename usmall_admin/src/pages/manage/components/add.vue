<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show" >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="所属角色" label-width="80px" prop='roleid'>
          <el-select v-model="form.roleid">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in rolelist" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="用户名" label-width="80px" prop='username'>
          <el-input v-model="form.username" clearable autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" label-width="80px" prop='password'>
          <el-input placeholder="请输入密码" clearable v-model="form.password" show-password></el-input>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status"  active-color="#13ce66"  inactive-color="#ff4949"  :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <!-- 确认取消 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="add('form')"    v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="update('form')" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 <script>
 import {mapGetters,mapActions} from 'vuex'
 import {requestManageAdd,requestManageDetail,updateManageDetail} from '../../../util/request'
 import {successAlert,warningAlert} from '../../../util/alert'
export default {
  props: ["info"],
  computed:{
      ...mapGetters({
          rolelist:'role/rolelist',
          managelist:'manage/managelist' 
      })
  },
  data() {
    return {
      form: {
        roleid:null,
        username:'',
        password:'',
        status:1
      },
       rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ],
          roleid: [
            { required: true, message: '请选择所属角色', trigger: 'change' }
          ],
        }
    };
  },
  methods: {
    ...mapActions({
        requestchangeRoleList:'role/requestchangeRoleList',
         requestManagelist:'manage/requestManagelist'
    }),
    // 添加
    add(formName){
         this.$refs[formName].validate((valid) => {
          if (valid) {
            requestManageAdd(this.form).then(res=>{
          if(res.data.code==200){
            successAlert(res.data.msg);
            this.cancel();
            this.empty()
            // 再次获取列表信息
            this.requestManagelist()
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
    // 修改
    update(formName){
         this.$refs[formName].validate((valid) => {
          if (valid) {
            updateManageDetail(this.form).then(res=>{
            if(res.data.code=200){
                successAlert('信息修改成功了');
                this.cancel();
                this.empty()
                this.requestManagelist()
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
    // 置空
    empty(){
        this.form={
        roleid:null,
        username:'',
        password:'',
        status:1
      }
    },
    // 置空+消失
    cancel(){
        this.info.show=false;
        if(!this.info.isAdd){
            this.empty();
        }
    },
    // 拿到一个id的参数
    getDetail(uid){
       requestManageDetail({uid:uid}).then(res=>{
           if(res.data.code==200){
            this.form=res.data.list;
            this.form.password='';
           }
       }) 
    }
  },
  mounted() {
      this.requestchangeRoleList();
  },
};
</script>
<style scoped>
</style>