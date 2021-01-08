<template>
  <div>
    <el-card class="ti">
      <Wrie />
      <Cookie />
      <Pillar />
    </el-card>
  </div>
</template>

<script>
import Wrie from "./home/wrie";
import Cookie from "./home/cookie";
import Pillar from "./home/pillar";
export default {
  components: { Wrie, Cookie, Pillar },
};
</script>

<style scoped>
.ti {
  text-align: left !important;
}
</style>