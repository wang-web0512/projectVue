<template>
  <!-- el-card 组件中美化过的div -->
  <el-card class="ti">
    <el-button
      @click="showPopout"
      icon="el-icon-circle-plus-outline"
      type="primary"
      >新增</el-button
    >
    <el-divider></el-divider>

    <!--  default-expand-all 默认展开全部  已删-->
    <!-- :data 指定数据源 -->
    <!-- :tree-props指定二级菜单数据存储的属性节点名称  children: 属性指定二级菜单存储位置 值可变 根据后端返回的值来指定当前属性的值 -->
    <el-table
      :data="menuList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <!-- sortable 属性添加可以排序 会出现排序上下箭头  已删 -->
      <!-- prop="" 值为后端返回数据的名称 -->
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="icon" label="图标" width="180">
        <!-- 作用域插槽 接受组件分发出的数据 -->
        <!-- props w为分发出所有数据的集合   row属性为系统自己添加.icon就可拿到传递的图标-->
        <template v-slot="props"><i :class="props.row.icon"></i></template>
      </el-table-column>
      <el-table-column prop="url" label="地址"> </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template v-slot="props">
          <el-tag v-if="props.row.status == 1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="abc">
          <el-button
            circle
            size="mini"
            icon="el-icon-edit"
            type="success"
            @click="edit(abc.row)"
          ></el-button>
          <el-button
            circle
            size="mini"
            icon="el-icon-delete-solid"
            type="danger"
            @click="del(abc.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <Modal ref="menuRef" :info="info" @updateList="updateList" />
  </el-card>
</template>

<script>
// 导入弹框组件
import Modal from "./modal";
// 请求数据 由组件发出
// 使用vuex辅助方法
import { mapState, mapActions } from "vuex";
export default {
  // 注册弹框组件
  components: {
    Modal,
  },
  created() {
    //   使用异步请求方法
    this.menuActions();
  },
  computed: {
    //   vuex中的数据 数据源
    ...mapState({ menuList: (state) => state.menu.menuList }),
  },
  methods: {
    //   拿到请求数据方法
    ...mapActions("menu", ["menuActions"]),
    showPopout() {
      this.info.isShow = !this.info.isShow;
    },
    updateList() {
      this.menuActions();
    },
    edit(obj) {
      //  console.log(obj,5555);
      // 更新弹框显示
      this.info.isShow = true;
      // 通过ref属性操作组件
      this.$refs.menuRef.setFromData(obj);
    },
    del(id) {
      // console.log(id);
      this.$myconfirm(() => {
        this.$http.post("/menudelete", { id }).then((res) => {
          if (res.code == 200) {
            this.$success(res.msg);
            this.menuActions();
            return;
          }
          this.$error(res.msg);
        });
      });
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
