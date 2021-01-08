<template>
  <div class="login-setting">
    <div class="login-box">
      <h3>小U商城后台管理系统</h3>
      <!-- :rules="rules" 引用表单校验规则  -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <!-- prop 指定错误消息的显示位置 -->
        <el-form-item prop="uname">
          <el-input
            type="text"
            v-model="ruleForm.uname"
            autocomplete="off"
            placeholder="请输入用户名"
          >
            <template slot="prepend">
              <i class="el-icon-user-solid"></i>
            </template>
          </el-input>
        </el-form-item>

        <!-- show-password 插件属性 可以显示密码 -->
        <el-form-item prop="password">
          <el-input
            show-password
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="请输入密码"
          >
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            @click="submitForm('ruleForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        uname: "",
        password: "",
      },
      //   表单校验规则
      // required:true 代表当前数据为必填项  message：为错误提示信息  blur表单失去焦点时的触发事件
      rules: {
        uname: { required: true, message: "请输入登录账号", trigger: "blur" },
        password: {
          required: true,
          message: "请输入登录密码",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    submitForm(formName) {
      // validate：进行终极表单校验
      // valid 系统形参 true为表单校验通过
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http
            .post("/userlogin", {
              username: this.ruleForm.uname,
              password: this.ruleForm.password,
            })
            .then((res) => {
              // console.log(res);
              if (res.code == 200) {
                // 用户相关信息存储localStorage中
                localStorage.setItem("loginInfo", JSON.stringify(res.list));
                // 反馈用户的提示信息
                this.$success(res.msg);
                // 路由重定向
                this.$router.push("/");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-setting {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/img/loginbg.jpg");
}
.login-box {
  padding: 0 30px;
  width: 400px;
  height: 300px;
  background: white;
  border-radius: 10px;
}
h3 {
  text-align: center;
  color: #409eff;
  margin-top: 40px;
  margin-bottom: 20px;
}
.login-btn {
  width: 100%;
}
</style>