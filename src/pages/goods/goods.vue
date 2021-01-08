<template>
  <el-card class="ti">
    <el-button
      @click="info.isShow = !info.isShow"
      icon="el-icon-circle-plus-outline"
      type="primary"
      >新增</el-button
    >
    <el-divider></el-divider>

    <List
      @updateList="updateList"
      :goodsList="goodsList"
      :goodsTotal="goodsTotal"
      :page="page"
      :size="size"
    />

    <Modal :info="info" @updateList="updateList" />
  </el-card>
</template>

<script>
import List from "./list";
import Modal from "./modal";

import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      info: {
        isShow: false,
      },
      // 页码
      page: 1,
      // 每页显示的数据条数
      size: 3,
    };
  },
  // 生命周期
  created() {
    this.goodsActions({ page: this.page, size: this.size });
    this.goodsActionsTotale();
  },
  components: { List, Modal },
  computed: {
    // 映射
    ...mapState({
      goodsList: (state) => state.goods.goodsList,
      goodsTotal: (state) => state.goods.goodsTotal,
    }),
  },
  methods: {
    // 映射
    ...mapActions("goods", ["goodsActions", "goodsActionsTotale"]),
    // 分页按钮事件
    updateList(page) {
      if (page) {
        this.page = page;
      }
      this.goodsActions({ page: this.page, size: this.size });
      this.goodsActionsTotale();
    },
  },
};
</script>

<style scoped>
.ti {
  text-align: left !important;
}
</style>