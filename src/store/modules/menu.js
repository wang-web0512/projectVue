// 导入数据请求方法  按需请求
import { getMenuList } from "@/requeste/menu.js";

export default {
    namespaced: true,
    state() {
        return {
            // 菜单列表
            menuList: []
        }
    },
    mutations: {
        //    菜单初始化
        menuInit(state, list) {
            state.menuList = list
        }
    },
    actions: {
        // 请求菜单列表
        menuActions({commit}) {
            getMenuList().then(res=>{
                // console.log(res,8888);
                if(res){
                    commit('menuInit',res)
                }
            })
        }
    }

}