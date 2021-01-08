<template>
  <el-dialog
    @close="reset"
    :title="this.fromData.id > 0 ? '编辑' : '新增'"
    :visible.sync="info.isShow"
  >
    <el-form label-width="80px" :model="fromData" :rules="rules" ref="fromRef">
      <el-form-item label="属性名" prop="specsname">
        <el-input
          placeholder="请输入属性名"
          v-model="fromData.specsname"
        ></el-input>
      </el-form-item>
      <el-form-item label="属性值" prop="attrs">
        <div class="box" v-for="(item, index) in attrs" :key="index">
          <el-input
            placeholder="请输入属性值"
            v-model.trim="attrs[index]"
          ></el-input>
          <el-button v-if="index == 0" type="success" size="mini" @click="add"
            >新增</el-button
          >
          <el-button v-else type="danger" size="mini" @click="delAttr(index)"
            >删除</el-button
          >
        </div>
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
export default {
  created() {
    // 监听兄弟组件事件
    vm.$on("sendDataSpec", (obj) => {
      this.info.isShow = true;
      this.fromData = obj;
      //   更新弹框里面定义数组的数据
      this.attrs = obj.attrs;
    });
  },
  props: ["info"],
  methods: {
    //   点击确定
    submit() {
      this.$refs.fromRef.validate((valid) => {
        if (valid) {
          // 将数组attrs值赋给fromData.attrs进行数据提交
          this.fromData.attrs = this.attrs.join(",");
          const url = this.fromData.id > 0 ? "/specsedit" : "/specsadd";
          this.$http.post(url, this.fromData).then((res) => {
            if (res.code == 200) {
              this.$success(res.msg);
              // 更新数据列表
              this.$emit("updateList");
              // 数据重置
              this.reset();
            } else {
              this.$error(res.msg);
            }
          });
        }
      });
    },
    // 点击表单添加input框
    add() {
      if (this.attrs.length >= 5) {
        return this.$error("最多五个哦");
      }
      this.attrs.push("");
    },
    // 点击表单删除按钮删除input框
    delAttr(index) {
      this.attrs.splice(index, 1);
    },
    // 重置事件
    reset() {
      this.fromData = {
        specsname: "",
        attrs: "",
        status: "",
      };
      this.attrs = [""];
      this.info.isShow = false;
    },
  },
  data() {
    let validAttrs = (rule, value, callback) => {
      // 假设所有表单都输入内容
      let flag = true;
      this.attrs.forEach((item) => {
        if (item == "") {
          flag = false;
        }
      });
      //   如果flag为false 则取反让执行提示语句
      if (!flag) {
        return callback(new Error("请输入属性可选值"));
      }
      callback();
    };
    return {
      attrs: [""],
      fromData: {
        //   规格名称
        specsname: "",
        //   规格可选值
        attrs: "",
        //   状态
        status: "",
      },
      rules: {
        specsname: {
          required: true,
          message: "请输入规格名称",
          trigger: "blur",
        },
        status: { required: true, message: "请选择状态", trigger: "blur" },
        attrs: { validator: validAttrs, trigger: "blur" },
      },
    };
  },
};
</script>

<style scoped>
.box {
  display: flex;
  margin-bottom: 10px;
}
.box .el-button--mini {
  margin-left: 15px;
}
</style>