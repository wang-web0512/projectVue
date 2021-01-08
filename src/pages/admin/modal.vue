<template>
  <el-dialog
    :title="fromData.id > 0 ? '编辑' : '新增'"
    @close="reset"
    :visible.sync="info.isShow"
  >
    <el-form ref="formRef" label-width="80px" :model="fromData" :rules="rules">
      <el-form-item label="角色" prop="roleid">
        <el-select v-model="fromData.roleid">
          <el-option
            v-for="item in PartList"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="账号" prop="username">
        <el-input
          placeholder="账号"
          v-model="fromData.username"
          :disabled="fromData.id > 0 ? true : false"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="密码"
          type="password"
          v-model="fromData.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="fromData.status">
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
import vm from "../../utils/vm";
import { mapState, mapActions } from "vuex";
export default {
  created() {
    this.getpartActions();
    vm.$on("sendDataadmin", (obj) => {
      this.info.isShow = true;
      this.fromData = obj;
    });
  },
  computed: {
    ...mapState({
      PartList: (state) => state.part.PartList,
    }),
  },
  props: ["info"],
  methods: {
    ...mapActions("part", ["getpartActions"]),
    // 新增
    submit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          const url = this.fromData.id > 0 ? "/useredit" : "/useradd";
          this.$http.post(url, this.fromData).then((res) => {
            if (res.code == 200) {
              this.$success(res.msg);
              //   更新
              this.$emit("updateList");
              //   重置
              this.reset();
            } else {
              this.$error(res.msg);
            }
          });
        }
      });
    },
    reset() {
      this.fromData = {
        // 角色id
        roleid: "",
        //  账号
        username: "",
        // 密码
        password: "",
        // 状态
        status: "",
      };
      // 隐藏对话框组件
      this.info.isShow = false;
    },
  },
  data() {
    return {
      fromData: {
        id: 0,
        roleid: "",
        username: "",
        password: "",
        status: "",
      },
      rules: {
        roleid: { required: true, message: "请选择角色", trigger: "blur" },
        username: { required: true, message: "请输入账号", trigger: "blur" },
        password: { required: true, message: "请输入密码", trigger: "blur" },
        status: { required: true, message: "请选择状态", trigger: "blur" },
      },
    };
  },
};
</script>

<style>
</style>