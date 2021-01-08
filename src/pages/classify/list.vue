<template>
  <el-table
    :data="classifyList"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="id" label="id" min-width="180"> </el-table-column>
    <el-table-column prop="img" label="分类图片" min-width="180">
      <template v-slot="props">
        <img
          v-if="props.row.img !== ''"
          style="height: 80px"
          :src="$imgBaseUrl + props.row.img"
          alt=""
        />
      </template>
    </el-table-column>
    <el-table-column prop="catename" label="分类名称" width="180">
    </el-table-column>
    <el-table-column prop="status" label="状态">
      <template v-slot="props">
        <el-tag type="success" v-if="props.row.status === 1">正常</el-tag>
        <el-tag type="danger" v-else>禁用</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" min-width="180">
      <template v-slot="props">
        <el-button
          size="mini"
          circle
          type="success"
          icon="el-icon-edit"
          @click="edit(props.row)"
        ></el-button>
        <el-button
          size="mini"
          circle
          type="danger"
          icon="el-icon-delete"
           @click="del(props.row.id)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// 事件中心
import vm from "../../utils/vm";
export default {
  props: ["classifyList"],
  data() {
    return {};
  },
  methods: {
    edit(obj) {
      // console.log(obj);
      vm.$emit("sendDataModal", { ...obj });
    },
    del(id){
      this.$myconfirm(()=>{
        // 发请求, 删除数据
        this.$http.post('/catedelete',{id}).then(res=>{
          if(res.code===200){
            this.$success(res.msg);
            // 更新数据列表
            this.$emit('upclassiftlist');
          }else{
            this.$error(res.msg);
          }
        })
      });
    }
  },
};
</script>

<style>
</style>