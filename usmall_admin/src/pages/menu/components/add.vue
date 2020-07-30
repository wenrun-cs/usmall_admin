<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth" prop='title'>
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth" prop='pid'>
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="--请选择--" disabled value></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 待添加选项 -->
             <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth" prop='type'>
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.type==1" prop='icon'>
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else prop='url'>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add('form')" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="update('form')" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 <script>
 import {requestMenuAdd,requestMenuDetail,updateMenuDetail} from '../../../util/request'
 import {successAlert,warningAlert} from '../../../util/alert'
 import {mapGetters,mapActions} from 'vuex'
export default {
  props: ["info"],
  computed:{
    ...mapGetters({
        list:'menu/menuList',   
    })
  },
  data() {
    return {
      //图标集合
      icons: [
        "el-icon-setting",
        "el-icon-s-help",
        "el-icon-s-operation",
        "el-icon-s-grid",
        'el-icon-s-goods',
        'el-icon-s-home'
      ],
      //路由集合
      urls: [
        "/home",
        "/menu",
        "/role",
        "/manage",
        "/cate",
        "/spec",
        "/goods",
        "/banner",
        "/seckill",
        '/member',
      ],
      form: {
        pid: 0,
        title: "",
        icon:"",
        type:1,
        url: "",
        status:1
      },
      formLabelWidth: "80px",
      rules: {
          title: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          pid: [
            { required: true, message: '请选择上级菜单', trigger: 'change' }
          ],
          icon: [
            { required: true, message: '请选择菜单图标', trigger: 'change' }
          ],
          url: [
            { required: true, message: '请选择菜单地址', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          type: [
            { required: true, message: '请选择菜单或目录', trigger: 'change' }
          ],
        }
    };
  },
  methods: {
    ...mapActions({
       requestList:'menu/requestChangemenuList'
    }),
    // 消失
    cancel(){
       this.info.show=false;
       if(!this.info.isAdd){
           this.empty()
       }
    },
    // 清空表格中的数据
    empty(){
        this.form={
                  pid: 0,
                 title: "",
                  icon: "",
                 type:1,
                  url: "",
                 status:1
                }
    },
    // 添加数据
    add(formName){
       this.$refs[formName].validate((valid) => {
          if (valid) {
            requestMenuAdd(this.form).then(res=>{
         if(res.data.code=='200'){
          //  弹出框
            successAlert(res.data.msg)
            // 清空数据
            this.empty()
            // 让添加的框消失 
            this.info.show=false;
            //再次请求数据
            this.requestList() 
        }else{
          // 错误提示
           warningAlert(res.data.msg)
        }
      })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    },
    // 获取某一条数据
    getDetail(id){
       requestMenuDetail({id:id}).then(res=>{
           this.form=res.data.list;
           this.form.id=id;
       })
    },
    // 修改数据
    update(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
             updateMenuDetail(this.form).then(res=>{
           if(res.data.code==200){
             successAlert(res.data.msg)
             this.empty()
             this.requestList()
             this.cancel()
           }else{
              warningAlert(res.data.msg)
           }
       })  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>