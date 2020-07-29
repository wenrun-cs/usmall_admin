import {requestGoodsCount , requestGoodsList} from '../../util/request'
const state={
   list:[],
   page:1,
   size:2,
   total:0
}
const mutations={
    changeGoods(state,arr){
        // arr.forEach(i => {
        //     i.attrs=JSON.parse(i.attrs);
        // });
        state.list=arr;
    },
    changeGoodsPage(state,p){
        state.page=p
    },
    changeGoodsTotal(state,t){
        state.total=t;
    }
}
const actions={
  // 获取列表
  requestAllGoodsList(context,all){
    var params={}
   if(all){
      params=all
    }else{
    params={
      page:context.state.page,
      size:context.state.size 
    }
   }
  requestGoodsList(params).then(res=>{
    console.log(params)
      if(res.data.list.length==0&&context.state.page>0){
          context.commit('changeGoodsPage',context.state.page-1)
          context.dispatch('requestGoodsList')
      }
      context.commit('changeGoods',res.data.list);
  })
  },
  //   获取总数
  requestGoodsCount(context){
    requestGoodsCount().then(res=>{
        context.commit('changeGoodsTotal',res.data.list[0].total);
    })
  },
//   获取页数
  requestGoodsPage(context,page){
        context.commit('changeGoodsPage',page);
  }
}
const getters={
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    }
}
export default{
  state,
  mutations,
  actions,
  getters,
  namespaced:true
}