<template>
  <el-dialog
    :title="fromData.id > 0 ? '编辑' : '新增'"
    @close="reset"
    :visible.sync="info.isShow"
  >
    <el-form label-width="80px" :model="fromData" :rules="rules" ref="partForm">
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="fromData.rolename"></el-input>
      </el-form-item>

      <el-form-item label="角色权限" prop="menus">
        <!-- default-expand-all 默认展开所有的一级节点 -->
        <el-tree
          ref="treeRef"
          :data="menuList"
          show-checkbox
          node-key="id"
          default-expand-all
          :props="defaultProps"
        >
        </el-tree>
      </el-form-item>

      <el-form-item label="角色状态" prop="status">
        <el-radio-group v-model="fromData.status">
          <!-- label 在单选框上代表提交数据接口中的真实数据 -->
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import vm from "../../utils/vm";
export default {
  props: ["info"],
  created() {
    this.menuActions();
    // 监听自定义事件
    vm.$on("sendDataPart", (obj) => {
      this.info.isShow = true;
      // 更新表单数据
      this.fromData = obj;
      // 勾选角色权限
      setTimeout(() => {
        this.$refs.treeRef.setCheckedKeys(this.fromData.menus.split(","));
      }, 100);
    });
  },
  computed: {
    //   vuex中的数据 数据源
    ...mapState({ menuList: (state) => state.menu.menuList }),
  },
  methods: {
    ...mapActions("menu", ["menuActions"]),
    // 表单提交
    submit() {
      this.$refs.partForm.validate((valid) => {
        if (valid) {
          let url = this.fromData.id > 0 ? "/roleedit" : "/roleadd";
          // 获取用户勾选的节点
          let keys = this.$refs.treeRef.getCheckedKeys().join(",");
          this.fromData.menus = keys;
          this.$http.post(url, this.fromData).then((res) => {
            if (res.code == 200) {
              this.$success(res.msg);
              this.reset();
              // 更新
              this.$emit("uppartlist");
            } else {
              this.$error(res.msg);
            }
          });
        }
      });
    },
    reset() {
      // 重置树形表单勾选项
      this.$refs.treeRef.setCheckedKeys([]);
      //重置数据
      this.fromData = {
        rolename: "",
        menus: "",
        status: "",
      };
      // 隐藏弹框
      this.info.isShow = false;
    },
  },
  data() {
    // 自定义表单校验规则
    var validMenus = (rule, value, callback) => {
      // getCheckedKeys() 必须通过组件对象调用 可以拿到树形对象所勾选的数组
      let keys = this.$refs.treeRef.getCheckedKeys();
      if (keys.length == 0) {
        callback(new Error("请选择操作权限"));
        return;
      }
      // 直接调用callback()代表表单校验通过
      callback();
    };
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "title",
      },
      fromData: {
        id: "",
        rolename: "",
        menus: "",
        status: "", //角色状态
      },

      //定义表单校验规则
      rules: {
        rolename: {
          required: true,
          message: "请输入角色名称",
          trigger: "blur",
        },
        status: { required: true, message: "请选择角色状态", trigger: "blur" },
        menus: { validator: validMenus, trigger: "blur" },
      },
    };
  },
};
</script>

<style>
</style>