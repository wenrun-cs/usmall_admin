<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules" ref="form">
        <!-- 角色名称 -->
        <el-form-item label="角色名称" label-width="80px" prop='rolename'>
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 角色权限 -->
        <!-- :default-checked-keys="[5]" -->
        <el-form-item label="角色权限" label-width="80px">
          <el-tree
            :data="list"
            show-checkbox
            node-key="id"
            :default-checked-keys=defaultKey
            :props="defaultProps"
            ref="tree"
          ></el-tree>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add('form')" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="update('form')" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 <script>
 import {mapGetters,mapActions} from 'vuex'
 import {requestRoleAdd,requestRoleDetail,updateRoleDetail} from '../../../util/request'
 import {successAlert,warningAlert} from '../../../util/alert'
export default {
  props: ["info"],
  computed:{
      ...mapGetters({
          list:'menu/menuList'
      })
  },
  data() {
    return {
      form: {
        rolename: "",
        menus:'',
        status:1,
      },
      defaultKey:[],
      //树形结构数据
      defaultProps: {
        children: "children",
        label: "title",
      },
       rules: {
          rolename: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
          defaultKey: [
            { type: 'array', required: true, message: '请至少选择一个角色权限', trigger: 'change' }
          ],
        }
    };
  },
  methods: {
    ...mapActions({
        requestChangemenuList:'menu/requestChangemenuList',
        requestchangeRoleList:'role/requestchangeRoleList'
    }),
    // 清空表格
    empty(){
        this.form= {
        rolename: "",
        menus:'',
        status:1,
       }
       this.$refs.tree.setCheckedKeys([]) 
    },
    // 隐藏表单
     cancel(){
         this.info.show=false;
         if(!this.info.isAdd){
            this.empty();
         }
     },
    //添加
    add(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            //获取tree的key赋值给form.menus
        this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys()) 
        requestRoleAdd(this.form).then(res=>{
            if(res.data.code==200){
                successAlert(res.data.list);
                this.empty()
                this.cancel()
                this.requestchangeRoleList()
            }else{
                warningAlert(res.data.msg);
            }
        })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    },
    //编辑
    getDetail(id){
        requestRoleDetail({id:id}).then(res=>{
             if(res.data.code==200){
                 this.form=res.data.list;
                 this.form.id=id;
                 this.defaultKey=JSON.parse(res.data.list.menus)
             }
        })
    },
    //修改
    update(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            // 获取tree的key赋值给form.menus
        this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys()) 
        updateRoleDetail(this.form).then(res=>{
            if(res.data.code==200){
                successAlert('修改成功');
                this.empty();
                this.cancel();
                this.requestchangeRoleList()
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
      this.requestChangemenuList()
},
};
</script>
<style scoped>
</style>