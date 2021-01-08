<template>
  <el-dialog
    :title="this.fromData.id > 0 ? '编辑' : '新增'"
    :visible.sync="info.isShow"
    width="100%"
    @close="reset"
  >
    <el-form ref="formRef" :rules="rules" :model="fromData" label-width="100px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form-item label="一级分类" prop="first_cateid">
            <el-select
              placeholder="请选择活动区域"
              @change="firstCateChange"
              v-model="fromData.first_cateid"
            >
              <el-option
                v-for="item in classifyList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="二级分类" prop="second_cateid">
            <el-select
              placeholder="请选择活动区域"
              v-model="fromData.second_cateid"
            >
              <el-option
                v-for="item in secondList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品名称" prop="goodsname">
            <el-input v-model="fromData.goodsname"></el-input>
          </el-form-item>

          <el-form-item label="商品图片" prop="img">
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
              :limit="1"
              :auto-upload="false"
              :on-preview="handlePictureCardPreview"
              :on-exceed="limitTips"
              :on-change="imgChange"
              :file-list="imgList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>

          <el-form-item label="商品价格" prop="price">
            <el-input v-model="fromData.price"></el-input>
          </el-form-item>
          <el-form-item label="市场价格" prop="market_price">
            <el-input v-model="fromData.market_price"></el-input>
          </el-form-item>

          <el-form-item label="商品规格" prop="specsid">
            <el-select
              placeholder="请选择活动区域"
              @change="specsChange"
              v-model="fromData.specsid"
            >
              <el-option
                v-for="item in specList"
                :key="item.id"
                :label="item.specsname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格属性值" prop="specsattr">
            <!--  multiple 代表可多选 -->
            <el-select
              placeholder="请选择活动区域"
              v-model="fromData.specsattr"
              multiple
            >
              <el-option
                v-for="(item, index) in specsAttrs"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否新品" prop="isnew">
            <el-radio-group v-model="fromData.isnew">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否热卖" prop="ishot">
            <el-radio-group v-model="fromData.ishot">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="fromData.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="商品详情" name="second">
          <el-form-item prop="description" label-width="0">
            <vueWangeditor
              ref="description"
              v-model="fromData.description"
              id="description"
              width="100%"
              height="300"
              style="height: 400px"
            />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入事件中心
import vm from "../../utils/vm";
//导入vue-wangeditor
import vueWangeditor from "vue-wangeditor";
import { mapState, mapActions } from "vuex";
export default {
  // 生命周期
  created() {
    //   分类管理列表初始化
    this.classifyActions();
    // 规格列表初始化
    this.getSpecAction();
    // 监听兄弟组件的自定义事件
    vm.$on("sendGoodsData", (obj) => {
      this.fromData = obj;
      this.info.isShow = true;
      // 延迟富文本框的渲染时间
      setTimeout(() => {
        this.$refs.description.setHtml(obj.description);
      }, 500);
      // 如果下拉框启用了多选, 则默认值需要提供数组格式
      obj.specsattr = obj.specsattr.split(",");
      // 点击一级分类后触发拿到二级分类值
      this.firstCateChange(obj.first_cateid, false);
      // 点击商品规格change事件回调函数
      this.specsChange(obj.specsid, false);
      // 编辑点击之后手动添加图片
      this.imgList =
        obj.img !== "" ? [{ url: this.$imgBaseUrl + obj.img }] : [];
    });
  },
  computed: {
    //   映射
    ...mapState({
      classifyList: (state) => state.classify.classifyList,
      specList: (state) => state.spec.specList,
    }),
  },
  components: {
    //   注册wang
    vueWangeditor,
  },
  props: ["info"],
  data() {
    // 富文本框自定义校验规则
    const validDesc = (rule, value, callback) => {
      // 表单校验不通过
      if (this.$refs.description.getHtml() === "<p><br></p>") {
        return callback(new Error("请输入商品描述"));
      }
      // 表示校验通过
      callback();
    };
    return {
      // 图片预览相关属性
      dialogImageUrl: "",
      dialogVisible: false,
      activeName: "first",

      imgList: [],
      secondList: [],
      specsAttrs: [],
      // 关联表单
      fromData: {
        first_cateid: "", // 一级分类id
        second_cateid: "", //二级分类id
        goodsname: "", //商品名称
        price: "", // 商品价格
        market_price: "", //市场价格
        img: "", // 商品图片
        description: "", // 商品描述
        specsid: "", // 规格id
        specsattr: "", // 规格属性值
        isnew: "", // 是否新品
        ishot: "", // 是否热卖
        status: "", //状态
      },
      //  表单校验规则
      rules: {
        first_cateid: { required: true, message: "请选择", trigger: "blur" },
        second_cateid: { required: true, message: "请选择", trigger: "blur" },
        goodsname: { required: true, message: "请输入", trigger: "blur" },
        price: { required: true, message: "请输入", trigger: "blur" },
        market_price: { required: true, message: "请输入", trigger: "blur" },
        description: { validator: validDesc, trigger: "blur" },
        specsid: { required: true, message: "请选择", trigger: "blur" },
        specsattr: { required: true, message: "请选择", trigger: "blur" },
        isnew: { required: true, message: "请选择", trigger: "blur" },
        ishot: { required: true, message: "请选择", trigger: "blur" },
        status: { required: true, message: "请选择", trigger: "blur" },
      },
    };
  },
  methods: {
    // 选择图片后触发的事件 file系统自动注入
    imgChange(file) {
      this.fromData.img = file.raw;
    },
    // 点击确定后事件
    submit() {
      // 同步富文本框的数据
      // this.$refs.description.getHtml();  获取数据
      this.fromData.description = this.$refs.description.getHtml();
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // 判断是为编辑还是新增
          const url = this.fromData.id > 0 ? "/goodsedit" : "/goodsadd";
          // 创建FormData实例对象
          const fd = new FormData();
          // 删除多余参数
          delete this.fromData.firstcatename;
          delete this.fromData.secondcatename;
          for (let key in this.fromData) {
            fd.append(key, this.fromData[key]);
          }

          this.$http.post(url, fd).then((res) => {
            if (res.code === 200) {
              //  通知父组件更新数据
              this.$emit("updateList");
              this.$success(res.msg);
              //  重置数据
              this.reset();
            } else {
              this.$error(res.msg);
            }
          });
        }
      });
    },
    // 重置方法
    reset() {
      this.fromData = {
        first_cateid: "", // 一级分类id
        second_cateid: "", //二级分类id
        goodsname: "", //商品名称
        price: "", // 商品价格
        market_price: "", //市场价格
        img: "", // 商品图片
        description: "", // 商品描述
        specsid: "", // 规格id
        specsattr: "", // 规格属性值
        isnew: "", // 是否新品
        ishot: "", // 是否热卖
        status: "", //状态
      };
      // 重置表单状态
      this.$refs.formRef.resetFields();
      // 清空富文本编辑器
      this.$refs.description.setHtml("");
      // 重置图片
      this.imgList = [];
      // 隐藏弹框
      this.info.isShow = false;
    },
    // 上传组件相关方法
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    ...mapActions("classify", ["classifyActions"]),
    ...mapActions("spec", ["getSpecAction"]),
    // 图片上传超出限制触发函数
    limitTips() {
      this.$error("最多只能上传一张");
    },
    handleClick(tab, event) {},
    // 点开弹框点击一级分类 自动获取二级分类事件方法 id自动注入
    // 编辑点击后传入形参 false 进行判断是否需要重置二级列表
    firstCateChange(id, flag = true) {
      // 通过id查找索引
      let index = this.classifyList.findIndex((item) => item.id === id);
      if (flag) {
        this.secondList = [];
        this.fromData.second_cateid = "";
      }
      this.secondList = this.classifyList[index].children;
    },
    // 点开弹框点击商品规格 自动获取商品规格属性事件方法 id自动注入
    specsChange(id, flag = true) {
      // 通过id查找索引
      let index = this.specList.findIndex((item) => item.id === id);
      if (flag) {
        this.fromData.specsattr = [];
      }
      this.specsAttrs = this.specList[index].attrs;
    },
  },
};
</script>

<style>
</style>