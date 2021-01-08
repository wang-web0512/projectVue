<template>
  <div>
    <el-table :data="goodsList" style="width: 100%">
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="firstcatename" label="一级分类" width="180">
      </el-table-column>
      <el-table-column prop="firstcatename" label="二级分类" width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="img" label="商品图片" min-width="180">
        <template v-slot="props">
          <img :src="$imgBaseUrl + props.row.img" style="height: 80px" alt />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="零售价格" min-width="180">
        <template v-slot="props">&yen;{{ props.row.price }}</template>
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" min-width="180">
        <template v-slot="props">&yen;{{ props.row.market_price }}</template>
      </el-table-column>

      <el-table-column prop="isnew" label="是否新品" min-width="180">
        <template v-slot="props">
          <el-tooltip
            :content="props.row.isnew === 0 ? '否' : '是'"
            placement="top"
          >
            <el-switch
              @change="statusChange(props.row, 'isnew')"
              v-model="props.row.isnew"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column prop="ishot" label="是否热卖" min-width="180">
        <template v-slot="props">
          <el-tooltip
            :content="props.row.ishot === 0 ? '否' : '是'"
            placement="top"
          >
            <el-switch
              @change="statusChange(props.row, 'ishot')"
              v-model="props.row.ishot"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" min-width="180">
        <template v-slot="props">
          <el-tag type="success" v-if="props.row.status === 1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template v-slot="props">
          <el-button
            @click="edit(props.row)"
            type="success"
            circle
            icon="el-icon-edit"
            size="mini"
          ></el-button>
          <el-button
            @click="del(props.row.id)"
            type="danger"
            circle
            icon="el-icon-delete"
            size="mini"
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
      background
      layout="prev, pager, next"
      :total="goodsTotal"
      @current-change="pageList"
    >
    </el-pagination>
  </div>
</template>

<script>
// 导入事件中心
import vm from "../../utils/vm";
export default {
  props: ["goodsList", "goodsTotal", "size", "page"],
  methods: {
    //   分页按钮的触发事件
    pageList(page) {
      //   console.log(page);
      this.$emit("updateList", page);
    },
    // 是否新品 热卖事件
    statusChange(row, attr) {
      // 创建fromData实例
      let fd = new FormData();
      fd.append("id", row.id);
      fd.append(attr, row[attr]);
      this.$http.post("/goodsedit", fd).then((res) => {
        if (res.code == 200) {
          // 提示信息
          return this.$success(res.msg);
        } else {
          this.$error(res.msg);
        }
      });
    },
    // 删除事件
    del(id) {
      this.$myconfirm(() => {
        this.$http.post("/goodsdelete", { id }).then((res) => {
          if (res.code === 200) {
            this.$success(res.msg);
            if (
              Math.ceil(this.goodsTotal / this.size) == this.page &&
              this.goodsTotal % this.size == 1
            ) {
              this.$emit("updateList", this.page - 1);
            } else {
              // 通知父组件更新数据列表
              this.$emit("updateList");
            }
          } else {
            this.$error(res.msg);
          }
        });
      });
    },
    // 编辑事件
    edit(obj) {
      // 通过自定义事件将待编辑的商品对象传递给兄弟组件Modal
      vm.$emit("sendGoodsData", { ...obj });
    },
  },
};
</script>

<style>
</style>