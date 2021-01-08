// 导入数据请求方法  按需请求
import { getGoodsList, getGoodsTotal } from "@/requeste/goods";

export default {
    namespaced: true,
    state() {
        return {
            // 管理员列表
            goodsList: [],
            // 管理员总数
            goodsTotal: 0

        }
    },
    mutations: {
        // 初始化管理员列表
        goodsInit(state, list) {
            state.goodsList = list
        },
        // 初始化总数
        goodsTotaleInit(state, total) {
            state.goodsTotal = total
        }
    },
    actions: {
        // 请求管理员列表
        goodsActions({ commit }, params) {
            getGoodsList(params).then(res => {
                // console.log(res,8888);
                if (res) {
                    commit('goodsInit', res)
                }
            })
        },
        goodsActionsTotale({ commit }) {
            getGoodsTotal().then(res => {
                if (res) {
                    commit('goodsTotaleInit', res)
                }
            })
        }
    }

}