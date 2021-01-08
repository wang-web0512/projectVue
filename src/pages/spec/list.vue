<template>
  <div>
    <el-table :data="specList" style="width: 100%">
      <el-table-column prop="id" label="id" min-width="80"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称" min-width="120">
      </el-table-column>
      <el-table-column prop="attrs" label="规格可选值" min-width="250">
        <template v-slot="props">
          <el-tag
            type="success"
            v-for="(item, index) in props.row.attrs"
            :key="index"
            >{{ item }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="100">
        <template v-slot="props">
          <el-tag type="success" v-if="props.row.status === 1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="操作">
        <template v-slot="props">
          <el-button
            type="success"
            size="mini"
            circle
            icon="el-icon-edit"
            @click="edit(props.row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            circle
            icon="el-icon-delete"
            @click="del(props.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--
        total 数据总条数
        page-size:每页显示数据的条数
        current-change: 分页按钮点击事件
     -->
    <el-pagination
      :page-size="size"
      @current-change="pageChange"
      background
      layout="prev, pager, next"
      :total="specTotal"
    >
    </el-pagination>
  </div>
</template>

<script>
// 事件中心
import vm from "../../utils/vm";
export default {
  props: ["specList", "specTotal", "size", "page"],
  methods: {
    //   分页页码事件
    pageChange(page) {
      this.$emit("sendData", page);
    },
    // 点击编辑事件
    edit(obj) {
      vm.$emit("sendData", { ...obj });
    },
    // 点击删除
    del(id) {
      this.$myconfirm(() => {
        this.$http.post("/specsdelete", { id }).then((res) => {
          if (res.code === 200) {
            this.$success(res.msg);
            if (
              Math.ceil(this.specTotal / this.size) == this.page &&
              this.specTotal % this.size == 1
            ) {
              this.$emit("sendDataSpec", this.page - 1);
            } else {
              // 更新数据列表
              this.$emit("updateList");
            }
          } else {
            this.$error(res.msg);
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.el-tag {
  margin-right: 10px;
}
</style>