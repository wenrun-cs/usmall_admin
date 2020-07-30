<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="info.show" >
      <el-form :model="form" :rules="rules" ref="form">
        <!-- 活动名称 -->
        <el-form-item label="活动名称" :label-width="formLabelWidth" prop='title'>
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 活动期限 -->
        <el-form-item label="活动期限" :label-width="formLabelWidth" >
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change='changeTime'
          ></el-date-picker>
        </el-form-item>
        <!--一级分类-->
        <el-form-item label="一级分类" :label-width="formLabelWidth" prop='first_cateid'>
          <el-select v-model="form.first_cateid" placeholder="请选择分类" @change="changeFirst()">
            <el-option label="-----------请选择-----------" value disabled></el-option>
            <el-option v-for="item in catelist" :key="item.id"  :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <!--二级分类-->
        <el-form-item label="二级分类" :label-width="formLabelWidth" prop='second_cateid'>
          <el-select v-model="form.second_cateid" placeholder="请选择分类" @change="changeSecond()">
            <el-option label="-----------请选择-----------" value disabled></el-option>
            <el-option v-for='item in secondArr' :key="item.id"   :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <!--商品-->
        <el-form-item label="商品" :label-width="formLabelWidth" prop='goodsid'>
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option label="-----------请选择-----------" value disabled></el-option>
            <el-option v-for="item in goodslist" :key="item.id" :label="item.goodsname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" :label-width="formLabelWidth">
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
 import {mapGetters,mapActions} from 'vuex'
 import {requestSeckillAdd,requestSeckillDetail,updateSeckillDetail} from '../../../util/request'
 import {successAlert,warningAlert} from '../../../util/alert'
export default {
  props: ["info"],
  computed:{
      ...mapGetters({
          catelist:'cate/list',
          goodslist:'goods/list',
          seckill:'seckill/list'
      })
  },
  data() {
    return {
        value1:[],
     //二级分类数组
      secondArr:[],
     //商品分类数组
      goodsArr:[],
      form: {
        title: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
        begintime:'',
        endtime:''
      },
      formLabelWidth: "100px",
      rules: {
          title: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
          first_cateid: [
            { required: true, message: '请选择一级分类', trigger: 'change' }
          ],
           second_cateid: [
            { required: true, message: '请选择二级分类', trigger: 'change' }
          ],
           goodsid: [
            { required: true, message: '请选择商品', trigger: 'change' }
          ],
          value1: [
            { required: true, message: '请选择活动时间', trigger: 'blur' },
          ],
        }
    };
  },
  methods: {
    ...mapActions({
        requestCateList:'cate/requestCateList',
        requestAllGoodsList:'goods/requestAllGoodsList',
         requestchangeSeckillList:'seckill/requestchangeSeckillList'
    }),
    //弹窗消失
    cancel() {
      this.info.show = false;
      if(!this.info.isAdd){
         this.empty();
         this.value1=[];
      }
    },
    // 置空
    empty(){
        this.form={
        title: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
        begintime:'',
        endtime:''
      }
    },
    add(formName){

      this.$refs[formName].validate((valid) => {
          if (valid) {
            requestSeckillAdd(this.form).then(res=>{
           if(res.data.code==200){
               successAlert(res.data.msg);
               this.cancel();
               this.empty();
               this.requestchangeSeckillList();
           }
       }) 
          } else {
            console.log('error submit!!');
            return false;
          }
        });

       
    },
    // 一级分类改变
    changeFirst(bool){
        var index=this.catelist.findIndex(
            (item)=> item.id == this.form.first_cateid
        );
        this.secondArr=this.catelist[index].children;
        if(!bool){
            this.form.second_cateid="";
        }
    },
    // 二级分类改变
    changeSecond(bool){
        this.requestAllGoodsList({fid:this.form.first_cateid,sid:this.form.second_cateid})
        if(!bool){
            this.form.goodsid="";
        }
    },
    //    this.goodsArr=this.goodslist.filter((item) => {
    //           return  item.second_cateid ==this.form.second_cateid;  
    //    })
     // 时间改变
    changeTime(e){
        this.form.begintime=new Date(e[0]).getTime();
        this.form.endtime=new Date(e[1]).getTime()
    },
    // 获取一条数据
    getDetail(id){
      requestSeckillDetail({id:id}).then(res=>{
        if(res.data.code == 200){
            this.form=res.data.list;
            this.form.id=id
            this.value1=[new Date(Number(this.form.begintime)), new Date(Number(this.form.endtime))]
            this.changeFirst(true); 
            this.changeSecond(true)
        }else{
            warningAlert(res.data.msg)
        }
      })
    },
    // 修改秒杀界面
    update(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            updateSeckillDetail(this.form).then(res=>{
           if(res.data.code===200){
              successAlert(res.data.msg)
              this.cancel();
              this.empty();
              this.requestchangeSeckillList()
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
    mounted(){
      this.requestCateList()
      this.requestAllGoodsList(true)
    }
};
</script>
<style scoped>
</style>