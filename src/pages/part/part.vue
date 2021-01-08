<template>
  <el-card class="ti">
    <el-button
      @click="partAppend"
      icon="el-icon-circle-plus-outline"
      type="primary"
      >新增</el-button
    >
    <el-divider></el-divider>

    <Listt :PartList="PartList" @uppartlist="uppartlist"/>

    <Modal :info="info" @uppartlist="uppartlist" />
  </el-card>
</template>

<script>
import Modal from "./modal";
import Listt from "./listt";
// 拿数据
import { mapState, mapActions } from "vuex";
export default {
  // 注册弹框组件
  components: {
    Modal,
    Listt,
  },
  created() {
    this.getpartActions();
  },
  computed: {
    //   vuex中的数据 数据源
    ...mapState({ PartList: (state) => state.part.PartList }),
  },
  methods: {
    ...mapActions("part", ["getpartActions"]),
    // 点击新增
    partAppend() {
      this.info.isShow = !this.info.isShow;
    },
    // 子组件的自定义事件 
    uppartlist() {
      this.getpartActions();
    },
   
  },
  data() {
    return {
      info: {
        isShow: false,
      },
    };
  },
};
</script>

<style scoped>
.ti {
  text-align: left !important;
}
</style>