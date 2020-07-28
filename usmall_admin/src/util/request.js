import axios from 'axios'
import qs from 'qs'

// 响应拦截
axios.interceptors.response.use(res =>{
    console.group('你现在访问的是'+res.config.url)
    console.log(res);
    return res;
})

const baseUrl='/api'

// ------------菜单管理----------------
// 菜单添加
export const requestMenuAdd=(params)=>{
    return  axios({
        url:baseUrl+'/api/menuadd',
        method:'post',
        data:qs.stringify(params)
    })
} 

// 菜单列表数据获取
export const requestMenuList=(params)=>{
   return axios({
        url:baseUrl+'/api/menulist',
        method:'get',
        params:params
    })
}

// 获取一条菜单数据
export const requestMenuDetail=(params)=>{
    return axios ({
        url:baseUrl+'/api/menuinfo',
        method:'get',
        params
    })
} 

// 修改菜单数据
export const updateMenuDetail=(params)=>{
    return axios({
       url:baseUrl+"/api/menuedit",
       method:'post',
       data:qs.stringify(params)
    })
} 

// 删除菜单数据
export const delMenuDetail=(params)=>{
    return axios({
        url:baseUrl+'/api/menudelete',
        method:'post',
        data:qs.stringify(params)
    })
}

// ------------角色管理----------------

// 角色添加
export const requestRoleAdd=(params)=>{
    return axios({
         url:baseUrl+'/api/roleadd',
         method:'post',
         data:qs.stringify(params)
    })
}
// 角色列表获取
export const requestRoleList=()=>{
    return axios({
        url:baseUrl+'/api/rolelist',
        method:'get'
    })
}
// 角色一条数据获取
export const requestRoleDetail=(params)=>{
    return axios({
        url:baseUrl+'/api/roleinfo',
        method:'get',
        params
    })
}
// 角色修改 
export const updateRoleDetail=(params)=>{
   return axios({
       url:baseUrl+'/api/roleedit',
       method:'post',
       data:qs.stringify(params)
   })
}
// 角色删除
export const delRoleDetail=(params)=>{
   return axios({
       url:baseUrl+'/api/roledelete',
       method:'post',
       data:qs.stringify(params)
   })
}
// ------------管理员管理----------------
//管理员添加
export const requestManageAdd=(params)=>{
    return axios({
        url:baseUrl+'/api/useradd',
        method:'post',
        data:qs.stringify(params)
    })
}

// 管理员总数
export const requestManageCount=()=>{
    return axios({
        url:baseUrl+'/api/usercount',
        method:'get'
    })
}
//管理员列表
export const  requestManageList=(params)=>{
    return axios({
        url:baseUrl+'/api/userlist',
        method:'get',
        params
    })
}
// 获取一条管理员数据
export const  requestManageDetail=(params)=>{
  return axios({
      url:baseUrl+'/api/userinfo',
      method:'get',
      params
  })
}

//修改管理员数据
export const updateManageDetail=(params)=>{
    return axios({
        url:baseUrl+'/api/useredit',
        method:'post',
        data:qs.stringify(params)
    })
}

// 管理员删除
export const delManageDetail=(params)=>{
     return axios({
         url:baseUrl+'/api/userdelete',
         method:'post',
         data:qs.stringify(params)
     })
}
// 管理员登录
export const requestManageLogin=(params)=>{
    return axios({
        url:baseUrl+'/api/userlogin',
        method:'post',
        data:qs.stringify(params)
    })
}

// ------------商品分类管理----------------

// 添加商品分类
export const requestCateAdd=(params)=>{
    var formData=new FormData();
    for(var i in params){
        formData.append(i,params[i]);
    }
    return  axios({
         url:baseUrl+'/api/cateadd',
         method:'post',
         data:formData
     })
}
// 商品分类列表
export const  requestCateList=(params)=>{
    return axios({
        url:baseUrl+'/api/catelist',
        method:'get',
        params
    })
}
// 获取一条分类信息
export const  requestCateDetail=(params)=>{
    return axios({
        url:baseUrl+'/api/cateinfo',
        method:'get',
        params
    })
  }
// 修改商品分类
export const updateCateDetail=(params)=>{
        var formdata=new FormData();
        for (var i in params){
            formdata.append(i,params[i]);
        }
    return axios({
        url:baseUrl+'/api/cateedit',
        method:'post',
        data:formdata
    })
}

// 商品分类删除
export const delCateDetail=(params)=>{
    return axios({
        url:baseUrl+'/api/catedelete',
        method:'post',
        data:qs.stringify(params)
    })
}

// ------------商品规格管理----------------
// 添加规格
export const requestSpecAdd=(params)=>{
    return axios({
       url:baseUrl+'/api/specsadd',
       method:'post',
       data:qs.stringify(params)
    })
}
//规格总数
export const requestSpecCount=()=>{
     return axios({
        url:baseUrl+'/api/specscount',
        method:'get',
     })
}
// 规格列表
export const requestSpecList=(params)=>{
    return axios({
        url:baseUrl+'/api/specslist',
        method:'get',
        params
    })
}
// 规格的一条数据
export const requestSpecDetail=(params)=>{
      return axios({
          url:baseUrl+'/api/specsinfo',
          method:'get',
          params
      })
}
// 修改规格数据
export const updateSpecDetail =(params)=>{
    return axios({
       url:baseUrl+'/api/specsedit',
       method:'post', 
       data:qs.stringify(params)
    })
}
// 删除规格数据
export const deleteSpecDetail=(params)=>{
    return axios({
        url:baseUrl+'/api/specsdelete',
        method:'post',
        data:qs.stringify(params)
    })
}