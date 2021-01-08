 <template>
  <div>
    <el-table :data="adminList" style="width: 100%">
      <el-table-column prop="id" label="id" min-width="80"> </el-table-column>
      <el-table-column prop="rolename" label="角色" min-width="180">
      </el-table-column>
      <el-table-column prop="username" label="账号"> </el-table-column>
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
            @click="del(props.row.uid)"
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
      background
      layout="prev, pager, next"
      :total="adminTotal"
      :page-size="size"
      @current-change="pageUpdate"
    >
    </el-pagination>
  </div>
</template>

<script>
import vm from "../../utils/vm";
export default {
  props: ["adminList", "adminTotal", "size","page"],
  data() {
    return {};
  },
  methods: {
    // page: 分页按钮的页码, 系统自动注入
    pageUpdate(page) {
      this.$emit("fn", page);
    },
    del(uid) {
      this.$myconfirm(() => {
        // 1-发送数据请求
        this.$http.post("/userdelete", { uid }).then((res) => {
          console.log(uid);
          if (res.code === 200) {
            this.$success(res.msg);
            // 判断当前处于最后一页并且是只有一条数据，删除后请求上一页数据
            if (
              Math.ceil(this.adminTotal / this.size) == this.page &&
              this.adminTotal % this.size == 1
            ) {
              this.$emit("fn", this.page - 1);
            } else {
              // 2-更新数据列表
              this.$emit("updateList");
            }
            return false;
          } else {
            this.$error(res.msg);
          }
        });
      });
    },
    edit(obj) {
      vm.$emit("sendDataadmin", { ...obj });
    },
  },
};
</script>

<style>
</style>