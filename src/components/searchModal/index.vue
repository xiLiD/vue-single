<template>
  <div>
    <el-form ref="form"
             :inline="true"
             label-width="50px"
             class="form-box">
      <el-form-item label="分类">
        <el-select v-model="searchOptions.typeValue"
                   placeholder="请选择">
          <el-option v-for="item in classify.types"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="searchOptions.kind"
                   placeholder="请选择">
          <el-option v-for="item in classify.kinds"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务">
        <el-select v-model="searchOptions.service"
                   placeholder="请选择">
          <el-option v-for="item in classify.service"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="年份">
        <el-date-picker type="dates"
                        v-model="searchOptions.year"
                        placeholder="选择一个日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      classify: {
        types: [
          {
            label: "全部",
            value: 0
          },
          {
            label: "存量",
            value: 1
          },
          {
            label: "增量",
            value: 2
          }
        ],
        kinds: [
          {
            label: "收入(万元)",
            value: 1
          },
          {
            label: "客户数(万户)",
            value: 2
          }
        ],
        service: [
          {
            label: "业务一",
            value: 1
          },
          {
            label: "业务二",
            value: 2
          }
        ]
      },
      searchOptions: {
        typeValue: "全部", // 分类类别,
        kind: "收入(万元)", // 额度类型
        serviece: "业务一", // 业务
        year: ""
      }
    };
  }
};
</script>
<style lang="less" scoped>
/deep/ .form-box .el-input__inner {
  width: 10rem;
}
</style>
