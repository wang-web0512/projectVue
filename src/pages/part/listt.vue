<template>
  <el-table :data="PartList" style="width: 100%">
    <el-table-column prop="id" label="id" width="180"> </el-table-column>
    <el-table-column prop="rolename" label="角色名称" width="180">
    </el-table-column>

    <el-table-column prop="status" label="状态">
      <template v-slot="props">
        <el-tag v-if="props.row.status == 1" type="success">正常</el-tag>
        <el-tag v-else type="danger">禁用</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template v-slot="props">
        <el-button
          circle
          size="mini"
          icon="el-icon-edit"
          type="success"
          @click="edit(props.row)"
        ></el-button>
        <el-button
          circle
          size="mini"
          icon="el-icon-delete-solid"
          type="danger"
          @click="del(props.row.id)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import vm from "../../utils/vm";
export default {
  props: ["PartList"],
  methods: {
    // 编辑事件
    edit(obj) {
      // console.log(obj);
      vm.$emit("sendDataPart", { ...obj });
    },
    // 删除
    del(id) {
      this.$myconfirm(() => {
        //  删除请求
        this.$http.post("/roledelete", { id }).then((res) => {
          if (res.code == 200) {
            this.$success(res.msg);
            this.$emit("uppartlist");
          } else {
            this.$error(res.msg);
          }
        });
      });
    },
  },
};
</script>

<style>
</style>