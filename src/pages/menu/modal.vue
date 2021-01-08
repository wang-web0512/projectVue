<template>
  <!-- :visible.sync  属性控制对话框的显示状态-->
  <el-dialog
    @close="resetForm"
    :title="fromData.id > 0 ? '编辑' : '新增'"
    :visible.sync="info.isShow"
  >
    <el-form :model="fromData" :rules="rules" label-width="70px" ref="menuForm">
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="fromData.type">
          <!-- label 在单选框上代表提交数据接口中的真实数据 -->
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="上级" v-if="fromData.type == 2" prop="pid">
        <el-select v-model="fromData.pid" placeholder="顶级菜单">
          <el-option label="请选择" :value="0"> </el-option>
          <el-option
            v-for="item in menuList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="名称" prop="title">
        <el-input placeholder="请输入名称" v-model="fromData.title"></el-input>
      </el-form-item>

      <el-form-item label="地址" v-if="fromData.type == 2" prop="url">
        <el-input placeholder="请输入地址" v-model="fromData.url"></el-input>
      </el-form-item>

      <el-form-item label="图标" v-if="fromData.type == 1" prop="icon">
        <el-input placeholder="请输入图标" v-model="fromData.icon"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="fromData.status">
          <!-- label 在单选框上代表提交数据接口中的真实数据 -->
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="info.isShow = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 拿菜单列表数据
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({ menuList: (state) => state.menu.menuList }),
  },
  // 接受父组件传递的数据
  props: ["info"],
  data() {
    return {
      // 和表单元素进行双向数据绑定
      fromData: {
        id: 0,
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: "",
      },
      //定义表单校验规则
      rules: {
        title: { required: true, message: "请输入名称", trigger: "blur" },
        status: { required: true, message: "请选择状态", trigger: "blur" },
      },
    };
  },
  methods: {
    setFromData(obj) {
      this.fromData = { ...obj };
    },
    submit() {
      //   console.log(this.$refs.menuForm);
      // 通过id判断是为提交还是编辑 0为提交
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          let url = this.fromData.id > 0 ? "/menuedit" : "/menuadd";
          this.$http.post(url, this.fromData).then((res) => {
            if (res.code == 200) {
              this.$success(res.msg);
              this.info.isShow = false;
              this.$emit("updateList");
            } else {
              this.$error(res.msg);
            }
          });
        }
      });
    },
    resetForm() {
      //   重置表单的方法
      this.$refs.menuForm.resetFields();
      this.fromData = {
        id: 0,
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: "",
      };
    },
  },
};
</script>

<style>
</style>