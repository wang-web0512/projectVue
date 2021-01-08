
import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

// 导入子模块
import menu from "./modules/menu";
import part from "./modules/part";
import admin from "./modules/admin";
import classify from "./modules/classify";
import spec from "./modules/spec";
import goods from "./modules/goods";

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    menu,
    part,
    admin,
    classify,
    spec,
    goods
  }
});

// 导出
export default store;