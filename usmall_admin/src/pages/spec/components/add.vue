<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="80px">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-for="(item,index) in attrArr" :key="index" label="规格属性" label-width="80px">
          <el-input v-model="item.value"   autocomplete="off"></el-input>
          <el-button type='primary' v-if="index==0" @click="addAttr">新建规格属性</el-button>
          <el-button type='danger' v-else @click="remove(index)">删除</el-button>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary"  @click="update" v-else>修改</el-button> 
      </div>
    </el-dialog>
  </div>
</template>
 <script>
 import {requestSpecAdd,requestSpecDetail,updateSpecDetail} from '../../../util/request'
 import {mapGetters,mapActions} from 'vuex'
import { warningAlert,successAlert } from '../../../util/alert';
export default {
  props: ["info"],
  computed:{
      ...mapGetters({
        list:'spec/list',
        total:'spec/total'
      })
  },
  data() {
    return {
        attrArr:[
           {
               value:'',
           },
        ],
      form:{
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
        requestSpecList:'spec/requestSpecList',
        requestSpecCount:'spec/requestSpecCount'
    }),
    empty(){
        this.form={
        specsname: "",
        attrs: "",
        status: 1,
      };
       this.attrArr=[{
           value:''
       }] 
    },
    cancel(){
        this.info.show=false;
        if(!this.info.inAdd){
            this.empty();
        }
    },
    remove(index){
      this.attrArr.splice(index,1);  
    },
    add(){
        if(this.attrArr.some((item) => item.value=='')){
            warningAlert('属性与规格均不能为空')
           return;
        }
        this.form.attrs=JSON.stringify(this.attrArr.map((item) => item.value))
         requestSpecAdd(this.form).then(res=>{
             if(res.data.code==200){
                 this.empty();
                 this.cancel();
                 this.requestSpecList();
                this.requestSpecCount()
             }else{
                warningAlert(res.data.msg);
             }
         })
    },
    update(){
       if(this.attrArr.some((item)=> item.value =='')){
             warningAlert("属性规格均不能为空");
             return;
       }
       this.form.attrs=JSON.stringify(this.attrArr.map((item)=>item.value));
       updateSpecDetail(this.form).then(res=>{
            if(res.data.code==200){
                successAlert('修改成功')
                this.empty();
                this.cancel();
                this.requestSpecList();
                this.requestSpecCount()
            }else{
                warningAlert(res.data.msg)
            }
       })  
    },

    addAttr(){
       this.attrArr.push({
           value:'',
       }) 
    },
    getDetail(id){
        requestSpecDetail({id:id}).then(res=>{
            if(res.data.code==200){
              successAlert(res.data.msg);
              this.form=res.data.list[0];
              this.attrArr=JSON.parse(res.data.list[0].attrs).map((item)=>({
                   value:item,
              }))
              this.form.id=id;
            }else{
                warningAlert(res.data.msg)
            }
        })
    }
  },
  mounted() {
      this.requestSpecList();
      this.requestSpecCount()
  },
};
</script>
<style scoped lang='stylus'>
 .box >>> .el-form-item__content {
  display: flex !important;
}

.box >>> .el-input {
  flex: 1;
}

.box >>> .el-button {
  width: auto;
}
</style>