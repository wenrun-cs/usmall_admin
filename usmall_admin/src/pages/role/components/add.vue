<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <!-- 角色名称 -->
        <el-form-item label="角色名称" label-width="80px">
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
        <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
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
    add(){
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
    update(){
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
    },
  },
  mounted() {
      this.requestChangemenuList()
},
};
</script>
<style scoped>
</style>