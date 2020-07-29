<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show" @opened='createEditor'>
      <el-form :model="form">
          <!-- 一级分类 -->
        <el-form-item label="一级分类" :label-width="formLabelWidth" >
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeFirstCateId()">
            <el-option label="--请选择--" disabled value></el-option>
            <!-- 待添加选项 -->
            <el-option 
            v-for="item in catelist" 
            :key="item.id"
             :label="item.catename" 
             :value="item.id"
             >
             </el-option>
          </el-select>
        </el-form-item>
        <!-- 二级分类 -->
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option label="--请选择--" disabled :value='0'></el-option>
            <!-- 待添加选项 -->
            <el-option v-for="item in secondCateArr" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品名称 -->
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
         <!-- 价格 -->
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
         <!-- 市场价格 -->
        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上传文件图片 -->
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
        <!-- 商品规格 -->
        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.specsid" placeholder="请选择" @change='changeSpecsId()'>
            <el-option label="--请选择--" disabled value></el-option>
            <!-- 待添加选项 -->
            <el-option v-for="item in specList" :key="item.id" :label="item.specsname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
         <!-- 规格属性 -->
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option label="--请选择--" disabled value></el-option>
            <!-- 待添加选项 -->
            <el-option v-for="item in attrsArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 是否新品 -->
        <el-form-item label="是否新品" :label-width="formLabelWidth">
            <el-radio v-model="form.isnew" :label="1">是</el-radio>
            <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <!-- 是否热卖 -->
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
            <el-radio v-model="form.ishot" :label="1">是</el-radio>
            <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <!-- 订单状态 -->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <!-- 商品描述 -->
        <el-form-item label="商品描述" :label-width="formLabelWidth">
           <div id="desc"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
            <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 <script>
import { mapActions, mapGetters } from "vuex";
import { warningAlert,successAlert } from '../../../util/alert';
import {requestGoodsAdd,requestGoodsDetail,updateGoodsDetail} from '../../../util/request'
import E from 'wangeditor';
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
        // 分类列表
      catelist: "cate/list",
       //规格列表
      specList: "spec/list",
    }),
  },
  data() {
    return {
        editor:null,
       secondCateArr:[],
       attrsArr:[],
      formLabelWidth: "80px",
      form: {
        first_cateid:'',
        second_cateid:'',
        goodsname: "",
        price:null,
        market_price:null,
        img:null,
        description:'',
        specsid:'',
        specsattr:[],
        isnew:1,
        ishot:1,
        status: 1,
      },
      imageUrl: "",
    };
  },
  methods: {
    ...mapActions({
       requestCateList:'cate/requestCateList',
        //获取所有的规格数据
       requestSpecList: "spec/requestSpecList",
       requestAllGoodsList:'goods/requestAllGoodsList',
       requestGoodsCount:'goods/requestGoodsCount'
    }),
    // 改变了一级分类
    changeFirstCateId(bool){
        let index=this.catelist.findIndex(
            (item)=>item.id ==this.form.first_cateid
        )
        this.secondCateArr=this.catelist[index].children;
      //传了true,second_cateid就不置空；没传就置空
       if(!bool){
           this.form.second_cateid='';
       }
    },
    changeSpecsId(bool){
         let index=this.specList.findIndex(
             (item) => item.id == this.form.specsid
         );
         this.attrsArr=this.specList[index].attrs; 
        if(!bool){
            this.form.specsattr=[];
        } 
    },
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
      add(){
          this.form.description=this.editor.txt.html();
          this.form.specsattr=JSON.stringify(this.form.specsattr)
          requestGoodsAdd(this.form).then(res=>{
            if(res.data.code==200){
              successAlert(res.data.msg);
              this.cancel();
              this.empty();
              this.requestAllGoodsList()
              this.requestGoodsCount()
            }else{
              warningAlert(res.data.msg)
            }
          })
      },
      update(){
          this.form.description=this.editor.txt.html();
          this.form.specsattr=JSON.stringify(this.form.specsattr)
          updateGoodsDetail(this.form).then(res=>{
            if(res.data.code==200){
               successAlert('商品信息修改成功');
               this.cancel();
               this.empty();
               this.requestAllGoodsList()
              this.requestGoodsCount()
            }else{
              warningAlert('商品信息修改失败');
            }
          })    
      },
      empty(){
        this.form= {
        first_cateid:'',
        second_cateid:'',
        goodsname: "",
        price:0,
        market_price:0,
        img:null,
        description:'',
        specsid:'',
        specsattr:[],
        isnew:1,
        ishot:1,
        status: 1,
      }
        this.imageUrl="";
        this.secondCateArr=[]
        this.attrsArr=[]
      },
      cancel(){
       this.info.show=false;
       if(!this.info.isAdd){
          this.empty();
       }   
      },
      getDetail(id){
         requestGoodsDetail({id:id}).then(res=>{
           if(res.data.code==200){
             this.form=res.data.list;
             this.form.id = id;
             this.imageUrl=this.$imgPre+this.form.img
            //  this.secondCateArr
             //根据一级分类计算出二级分类的数组
             this.changeFirstCateId(true)
        //根据商品规格计算出商品属性
             this.changeSpecsId(true)
             this.form.specsattr=JSON.parse(this.form.specsattr)
           }else{
              warningAlert(res.data.msg)
           }
         })
      },
     //创建编辑器
     createEditor(){
         this.editor=new E('#desc');
         this.editor.create();
         this.editor.txt.html(this.form.description)       
     }
  },
  mounted(){
     this.requestCateList()
     this.requestSpecList(false)
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