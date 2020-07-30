<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="上级分类" :label-width="formLabelWidth" prop='pid'>
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="--请选择--" disabled value></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 待添加选项 -->
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth" prop='catename'>
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上传文件 -->
        <el-form-item label="图片" :label-width="formLabelWidth" v-if="form.pid!==0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
            <el-button type="primary" @click="add(form)" v-if="info.isAdd">添加</el-button>
            <el-button type="primary" @click="update(form)" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 <script>
import { mapActions, mapGetters } from "vuex";
import { warningAlert,successAlert } from '../../../util/alert';
import {requestCateAdd,requestCateDetail,updateCateDetail} from '../../../util/request'
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  data() {
    return {
      formLabelWidth: "80px",
      form: {
        pid: null,
        catename: "",
        status: 1,
        img:null
      },
      imageUrl: "",
      rules: {
          catename: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          pid: [
            { required: true, message: '请选择上级分类', trigger: 'change' }
          ]
        }
    };
  },
  methods: {
    ...mapActions({
       requestCateList:'cate/requestCateList'
    }),
    changeImg(e){
       if(e.size > 2 * 1024 * 1024){
          warningAlert('上传的图片不能超过2M')
          return
       }
       var extname=e.name.slice(e.name.lastIndexOf('.'))
       var extarr=['.png','.jpg','.jpeg','.gif'];
       if(!extarr.some((item)=>item === extname)){
            warningAlert('上传的文件必须是图片')
            return;
       }
        var file=e.raw;
        this.imageUrl=URL.createObjectURL(file);
        console.log(this.imageUrl) //http://localhost:8080/8c900147-78c6-4b1f-a4b3-92a4d3b79ac7
        this.form.img=file; 
      },
      add(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            requestCateAdd(this.form).then(res=>{
            if(res.data.code==200){
              successAlert(res.data.msg);
              this.cancel();
              this.empty();
              this.requestCateList()
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
      update(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updateCateDetail(this.form).then(res=>{
            if(res.data.code==200){
               successAlert('商品分类修改成功');
               this.cancel();
               this.empty();
               this.requestCateList()
            }else{
              warningAlert('商品分类修改失败');
            }
          })    
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      empty(){
        this.form={
          pid: null,
          catename:"",
          status: 1,
          img:null
        }
        this.imageUrl="";
      },
      cancel(){
       this.info.show=false;
       if(!this.info.isAdd){
          this.empty();
       }   
      },
      getDetail(id){
         requestCateDetail({id:id}).then(res=>{
           if(res.data.code==200){
             this.form=res.data.list;
             this.form.id = id;
             this.imageUrl=this.$imgPre+this.form.img
           }else{
              warningAlert(res.data.msg)
           }
         })
      }
  },
  mounted(){
     this.requestCateList()
  },
};
</script>
<style scoped lang="stylus">
.box >>> .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.box >>> .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>