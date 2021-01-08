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
      :specList="specList"
      :size="size"
       :page="page"
      :specTotal="specTotal"
      @sendData="sendData"
      @updateList="updateList"
    />
    <Modal :info="info" @updateList="updateList" />
  </el-card>
</template>

<script>
import List from "./list";
import Modal from "./modal";
// 映射方法
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
    this.getSpecAction({ page: this.page, size: this.size });
    this.getSpecTotalAction();
  },
  // 注册子组件
  components: { List, Modal },
  computed: {
    ...mapState({
      specList: (state) => state.spec.specList,
      specTotal: (state) => state.spec.specTotal,
    }),
  },
  methods: {
    ...mapActions("spec", ["getSpecAction", "getSpecTotalAction"]),
    sendData(page) {
      // 更新页码
      this.page = page;
      //   更新数据
      this.getSpecAction({ page: this.page, size: this.size });
    },
    updateList() {
      this.getSpecAction({ page: this.page, size: this.size });
      this.getSpecTotalAction();
    },
  },
};
</script>

<style scoped>
.ti {
  text-align: left !important;
}
</style>