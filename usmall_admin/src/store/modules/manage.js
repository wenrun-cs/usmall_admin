import {requestManageList,requestManageCount} from '../../util/request'
const state={
    managelist:[],
    // managecount:null
    size:3,
    total:0,
    page:1
}
const mutations={
   changemanagelist(state,arr){
       state.managelist=arr
   },
   changeTotal(state,total){
       state.total=total;
   },
   changePage(state,num){
       state.page=num;
   }
}
const actions={
   requestManagelist(context){
       const params={
           page:context.state.page,
           size:context.state.size
       }
    requestManageList(params).then(res=>{
        if(!res.data.list&&context.state.page>1){
         context.commit('changePage',context.state.page-1);
         context.dispatch("requestManagelist")
        }
       context.commit('changemanagelist',res.data.list);
    })
   },
   requestTotal(context){
      requestManageCount().then(res=>{
         context.commit('changeTotal',res.data.list[0].total)
      })
   },
   requestPage(context,num){
       context.commit('changePage',num)
   }
}
const getters={
    managelist(state){
     return state.managelist
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
