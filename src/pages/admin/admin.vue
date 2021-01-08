<template>
  <el-card class="ti">
    <el-button
      icon="el-icon-circle-plus-outline"
      type="primary"
      @click="info.isShow = !info.isShow"
      >新增</el-button
    >
    <el-divider></el-divider>
    <List
      :adminList="adminList"
      :adminTotal="adminTotal"
      :size="size"
      :page="page"
      @fn="fn"
      @updateList="updateList"
    />
    <Modal :info="info" @updateList="updateList" />
  </el-card>
</template>

<script>
// 子组件
import List from "./list";
import Modal from "./modal";
// 导入辅助方法
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
      size: 2,
    };
  },
  created() {
    this.adminActions({ page: this.page, size: this.size });
    this.adminActionsTotale();
  },
  // 注册子组件
  components: { List, Modal },
  // 映射数据
  computed: {
    ...mapState({
      adminList: (state) => state.admin.adminList,
      adminTotal: (state) => state.admin.adminTotal,
    }),
  },
  methods: {
    // 映射方法
    ...mapActions("admin", ["adminActions", "adminActionsTotale"]),
    // 自定义事件
    fn(page) {
      // 更新页码
      this.page = page;
      // 更新页面
      this.adminActions({ page: this.page, size: this.size });
    },
    // 自定义事件 点击确定之后触发
    updateList() {
      this.adminActions({ page: this.page, size: this.size });
      this.adminActionsTotale();
    },
  },
};
</script>

<style scoped>
.ti {
  text-align: left !important;
}
</style>