<template>
  <el-card class="ti">
    <el-button
      @click="info.isShow = !info.isShow"
      icon="el-icon-circle-plus-outline"
      type="primary"
      >新增</el-button
    >
    <el-divider></el-divider>
    <List :classifyList="classifyList" @upclassiftlist="upclassiftlist" />
    <Modal :info="info" @upclassiftlist="upclassiftlist" />
  </el-card>
</template>

<script>
// 导入子组件
import List from "./list";
import Modal from "./modal";
// 导入vuex辅助方法
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      info: {
        isShow: false,
      },
    };
  },
  // 注册子组件
  components: { List, Modal },
  computed: {
    ...mapState({ classifyList: (state) => state.classify.classifyList }),
  },
  methods: {
    ...mapActions("classify", ["classifyActions"]),
    upclassiftlist() {
      this.classifyActions();
    },
  },
  created() {
    this.classifyActions();
  },
};
</script>

<style scoped>
.ti {
  text-align: left !important;
}
</style>