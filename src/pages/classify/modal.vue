<template>
  <el-dialog
    :visible.sync="info.isShow"
    :title="fromData.id > 0 ? '编辑' : '新增'"
    @close="reset"
  >
    <el-form label-width="80px" ref="formRef" :model="fromData" :rules="rules">
      <el-form-item label="上级分类" prop="pid">
        <el-select v-model="fromData.pid">
          <el-option :value="0" label="顶级分类"></el-option>
          <el-option
            v-for="item in classifyList"
            :key="item.id"
            :value="item.id"
            :label="item.catename"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类名称" prop="catename">
        <el-input placeholder="名称" v-model="fromData.catename"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="img" v-if="fromData.pid !== 0">
        <!-- 
             action: 指定图片上传的数据接口 
             auto-upload: 是否自动上传图片, 默认自动上传
             on-preview: 图片预览事件
             on-change: 当用户选择文件的时候, 自动触发
             limit: 最大允许上传个数
             on-exceed:文件超出个数限制时的钩子
             file-list:设置需要默认展示的图片列表，需要一个数组
           -->
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :auto-upload="false"
          :limit="1"
          :on-change="fileChange"
          :on-exceed="limitTips"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="分类状态" prop="status">
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
import vm from "../../utils/vm";
import { mapState } from "vuex";
export default {
  created() {
    // 监听自定义事件
    vm.$on("sendDataModal", (obj) => {
      this.info.isShow = true;
      // 更新表单数据
      this.fromData = obj;
      // 更新图片列表的数组
      this.fileList = [{ url: this.$imgBaseUrl + obj.img }];
    });
  },
  props: ["info"],
  computed: {
    ...mapState({ classifyList: (state) => state.classify.classifyList }),
  },
  data() {
    return {
      // 上传组件所需属性
      dialogImageUrl: "",
      dialogVisible: false,
      //   和表单进行绑定的数据对象
      fromData: {
        pid: 0,
        catename: "",
        img: "",
        status: "",
      },
      //  默认需要展示的图片列表
      fileList: [],
      // 表单校验规则对象
      rules: {
        pid: { required: true, message: "请选择上级", trigger: "blur" },
        catename: {
          required: true,
          message: "请输入分类名称",
          trigger: "blur",
        },
        status: { required: true, message: "请选择状态", trigger: "blur" },
      },
    };
  },
  methods: {
    // 上传组件相关方法
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 监听用户选择的文件 file 系统自动注入，表示用户选择的文件对象
    fileChange(file) {
      // console.log(file);
      this.fromData.img = file.raw;
    },
    // 图片数量超过上限的提示
    limitTips() {
      this.$error("最多只能上传一张");
    },
    // 点击确认
    submit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // 需要将this.fromData转换为FormData对象进行提交
          //  创建formData实例对象
          const fd = new FormData();
          for (let key in this.fromData) {
            fd.append(key, this.fromData[key]);
          }
          let url = this.fromData.id > 0 ? "/cateedit" : "/cateadd";
          this.$http.post(url, fd).then((res) => {
            if (res.code == 200) {
              this.$success(res.msg);
              // 更新
              this.$emit("upclassiftlist");
              this.reset();
            } else {
              this.$error(res.msg);
            }
          });
        }
      });
    },
    reset() {
      // 重置表单
      this.$refs.formRef.resetFields();
      this.fromData = {
        pid: 0,
        catename: "",
        img: "",
        status: "",
      };
      this.info.isShow = false;
    },
  },
};
</script>

<style>
</style>