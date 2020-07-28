import {requestSpecCount,requestSpecList} from '../../util/request'
const state={
   list:[],
   page:1,
   size:2,
   total:0
}
const mutations={
 changeSpec(state,arr){
     arr.forEach(i => {
         i.attrs=JSON.parse(i.attrs);
     });
     state.list=arr;
 },
 changeSpecPage(state,p){
     state.page=p
 },
 changeSpecTotal(state,t){
     state.total=t;
 }

}
const actions={
    // 获取列表
  requestSpecList(context){
      const params={
        page:context.state.page,
        size:context.state.size 
      }
    requestSpecList(params).then(res=>{
        if(res.data.list.length==0&&context.state.page>0){
            context.commit('changeSpecPage',context.state.page-1)
            context.dispatch('requestSpecList')
        }
        context.commit('changeSpec',res.data.list);
    })
  },
//   获取总数
  requestSpecCount(context){
    requestSpecCount().then(res=>{
        context.commit('changeSpecTotal',res.data.list[0].total);
    })
  },
//   获取页数
  requestSpecPage(context,page){
        context.commit('changeSpecPage',page);
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