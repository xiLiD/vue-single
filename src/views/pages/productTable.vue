<template>
  <div class="page-container common-css">
    <div class="page-main">
      <div class="page-menu">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="small"
        >
          <div class="menu-left">
            <el-form-item>
              <el-input
                v-model="formInline.search"
                placeholder="请输入查询关键字"
              ></el-input>
            </el-form-item>
            <el-form-item label="查询类别">
              <el-select v-model="formInline.region" placeholder="查询类别">
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for="(item, index) in menuOptions"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="findTable" size="small"
                >查询</el-button
              >
            </el-form-item>
          </div>
          <div class="menu-right">
            <el-form-item class="menu-btn">
              <el-button
                type="danger"
                icon="el-icon-remove"
                @click="deleteTable"
                size="small"
                v-if="authInfo.remove == 1"
                >删除</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-circle-plus"
                @click="addTable"
                size="small"
                v-if="authInfo.inser == 1"
                >新增</el-button
              >
              <el-button
                type="warning"
                icon="el-icon-upload"
                @click="showTableVisible()"
                size="small"
                v-if="authInfo.inser == 1"
                >导入</el-button
              >
              <el-button
                type="success"
                @click="exportTable"
                icon="el-icon-download"
                size="small"
                >导出</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </div>
      <el-table
        :data="tableData"
        border
        :header-cell-style="{ background: 'rgb(160,207,255)', color: '#fff' }"
        :span-method="objectSpanMethod"
        style="width: 100%; margin-top: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="prodcode" label="产品编码" />
        <el-table-column prop="prodname" label="产品名称" />
        <el-table-column prop="chnnlcode" label="一级类别编码" />
        <el-table-column prop="chnnlname" label="一级类别名称" />
        <el-table-column prop="categorycode" label="二级类别编码" />
        <el-table-column prop="categoryname" label="二级类别名称" />
        <el-table-column prop="calcode" label="统计口径编码" />
        <el-table-column prop="calcode2" label="统计口径编码2" />
        <el-table-column prop="proddesc" label="产品描述" />
        <el-table-column label="操作" width="80" v-if="authInfo.updat == 1">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <!-- <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="queryData.pageNo"
        :page-size="queryData.pageSize"
        :total="queryData.total"
        style="margin-top: 20px; text-align: center"
        :page-sizes="[10, 20, 30, 50, 70, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      title="导入框"
      :visible.sync="dialogTableVisible"
      class="export-dialog"
    >
      <div class="dialog-top">
        <div class="dialog-left">
          <el-upload
            class="upload-demo"
            action="#"
            ref="upload"
            :limit="1"
            :http-request="httpRequest"
          >
            <el-button type="warning" icon="el-icon-upload" size="small"
              >选择文件</el-button
            >
          </el-upload>
          <el-button
            type="primary"
            size="small"
            @click.native="importTable"
            :disabled="!checkPass"
            >确定</el-button
          >
        </div>
        <div class="dialog-right">
          <el-button
            type="success"
            icon="el-icon-download"
            size="small"
            @click.native="downloadExcel"
            >模板下载</el-button
          >
        </div>
      </div>
      <div class="dialog-info">
        <div v-for="(item, index) in notice" :key="index">{{ item }}</div>
      </div>
    </el-dialog>

    <el-dialog
      :title="modalInfo.title"
      :visible.sync="modalInfo.show"
      class="export-dialog"
      @close="closeDialog"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        size="small"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item class="menu-btn" label="产品编码" prop="prodcode">
          <el-input
            v-model="ruleForm.prodcode"
            placeholder="请输入产品编码"
            :disabled="modalInfo.title == '修改框'"
          ></el-input>
        </el-form-item>
        <el-form-item class="menu-btn" label="产品名称" prop="prodname">
          <el-input
            v-model="ruleForm.prodname"
            placeholder="请输入产品名称"
          ></el-input>
        </el-form-item>
        <el-form-item class="menu-btn" label="一级类别编码" prop="chnnlcode">
          <el-input
            v-model="ruleForm.chnnlcode"
            placeholder="请输入一级类别编码"
          ></el-input>
        </el-form-item>
        <el-form-item class="menu-btn" label="一级类别名称" prop="chnnlname">
          <el-input
            v-model="ruleForm.chnnlname"
            placeholder="请输入一级类别名称"
          ></el-input>
        </el-form-item>
        <el-form-item class="menu-btn" label="二级类别编码" prop="categorycode">
          <el-input
            v-model="ruleForm.categorycode"
            placeholder="请输入二级类别编码"
          ></el-input>
        </el-form-item>
        <el-form-item class="menu-btn" label="二级类别名称" prop="categoryname">
          <el-input
            v-model="ruleForm.categoryname"
            placeholder="请输入二级类别名称"
          ></el-input>
        </el-form-item>
        <el-form-item class="menu-btn" label="产品描述" prop="proddesc">
          <el-input
            v-model="ruleForm.proddesc"
            placeholder="请输入产品描述"
          ></el-input>
        </el-form-item>
        <el-form-item class="menu-btn" label="统计口径1" prop="calcode">
          <el-input
            v-model="ruleForm.calcode"
            placeholder="请输入统计口径"
            :disabled="modalInfo.title == '修改框'"
          ></el-input>
        </el-form-item>
        <el-form-item class="menu-btn" label="统计口径2" prop="calcode2">
          <el-input
            v-model="ruleForm.calcode2"
            placeholder="请输入统计口径"
            :disabled="modalInfo.title == '修改框'"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btn-group">
        <el-button type="primary" size="small" @click="submitForm('ruleForm')"
          >确定</el-button
        >
        <el-button type="primary" size="small" @click="modalInfo.show = false"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import apiSend from "@/api/axios.js";
import { download } from "@/api/export.js";
import base from "@/api/baseUrl";
import { mapState } from "vuex";
export default {
  data() {
    return {
      baseUrl:
        process.env.NODE_ENV === "development"
          ? base.development
          : base.production,
      modalInfo: {
        title: "",
        show: false,
      },
      ruleForm: {
        calcode: "", // 统计口径编码1
        calcode2: "", // 统计口径编码2
        chnnlcode: "", // 一级类别编号
        chnnlname: "", // 一级类别名
        categorycode: "", // 二级类别编号
        categoryname: "", // 二级类别名
        prodcode: "", // 产品编码
        prodname: "", // 产品名
        proddesc: "", // 产品描述
      },
      queryData: {
        total: 0,
        pageSize: 10,
        pageNo: 1,
      },
      dialogTableVisible: false,
      notice: [], // 提示信息
      formInline: {
        search: "",
        region: 0,
      },
      menuOptions: [
        { name: "产品编码", value: 0 },
        { name: "产品名称", value: 1 },
      ],
      tableData: [],
      rules: {
        prodcode: [
          { required: true, message: "产品编码不能为空", trigger: "blur" },
        ],
        prodname: [
          { required: true, message: "产品名称不能为空", trigger: "blur" },
        ],
        calcode: [
          { required: true, message: "统计口径编码不能为空", trigger: "blur" },
        ],
        calcode2: [
          { required: true, message: "统计口径编码2不能为空", trigger: "blur" },
        ],
        chnnlcode: [
          { required: true, message: "一级类别编码不能为空", trigger: "blur" },
        ],
        chnnlname: [
          { required: true, message: "一级类别名称不能为空", trigger: "blur" },
        ],
        categorycode: [
          { required: true, message: "二级类别编码不能为空", trigger: "blur" },
        ],
        categoryname: [
          { required: true, message: "二级类别名称不能为空", trigger: "blur" },
        ],
      },
      fileData: "", //导入文件
      checkPass: false, // 监测上传是否成功
      multipleSelection: [],
      // 合并的长度
      colSpanArr: [],
      // 合并开始的位置
      rowIndexArr: [],
    };
  },
  computed: {
    ...mapState(["authInfo"]),
  },
  created() {
    this.findTable();
  },
  methods: {
    exportTable() {
      let params = {
        pageNo: this.queryData.pageNo,
        pageSize: this.queryData.pageSize,
      };
      let key = this.formInline.region == 0 ? "prodCode" : "prodName";
      let key2 = key == "prodCode" ? "prodName" : "prodCode";
      params[key] = this.formInline.search;
      params[key2] = "";
      download(
        this.baseUrl + "/iopWeb/IopProdDTableController/downProdInfo",
        params,
        "IOP产品维表"
      );
    },
    downloadExcel() {
      // window.location.href = this.baseUrl + '/iopWeb/IopProdDTableController/downloadProdExcel'
      // window.location.href = this.baseUrl + '/static/IOPProdImportTemp.xlsx'
      if (process.env.NODE_ENV === "development") {
        window.location.href =
          this.baseUrl + "/iopWeb/IopProdDTableController/downloadProdExcel";
      } else {
        window.location.href = this.baseUrl + "/static/IOPProdImportTemp.xlsx";
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    showTableVisible() {
      let self = this;
      self.dialogTableVisible = true;
      self.notice = [];
      self.checkPass = false;
      self.$nextTick(() => {
        self.$refs.ruleForm.resetFields();
      });
    },
    // 关闭弹窗
    closeDialog() {
      this.$refs["ruleForm"].resetFields();
    },
    findTable() {
      // debugger
      let params = {
        pageNo: this.queryData.pageNo,
        pageSize: this.queryData.pageSize,
      };
      let key = this.formInline.region == 0 ? "prodCode" : "prodName";
      let key2 = key == "prodCode" ? "prodName" : "prodCode";
      params[key] = this.formInline.search;
      params[key2] = "";
      apiSend.prodFindProdInfo({ data: params }).then((res) => {
        let arr = [];

        if (res.data.data.records) {
          res.data.data.records.forEach((item) => {
            let {
              operationtime, // eslint-disable-line no-unused-vars
              operationuser, // eslint-disable-line no-unused-vars
              stat, // eslint-disable-line no-unused-vars
              ...result
            } = item;
            arr.push(result);
          });
          this.tableData = arr;
        }
        this.setrowspans();
        this.queryData.total = res.data.data.total;

        // this.getColSpanData("prodcode", this.tableData);
      });
    },
    handleCurrentChange(val) {
      this.queryData.pageNo = val;
      this.findTable();
    },
    handleSizeChange(val) {
      this.queryData.pageSize = val;
      this.findTable();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.modalInfo.title == "新增框") {
            apiSend
              .prodInsertProdInfo({ data: this.ruleForm })
              .then(() => {
                this.modalInfo.show = false;
                this.$message.success("新增成功!");
                this.findTable();
              })
              .catch((err) => {
                this.$message.error(err.data.msg);
              });
          } else {
            apiSend
              .prodUpdateProdInfo({ data: this.ruleForm })
              .then(() => {
                this.modalInfo.show = false;
                this.$message.success("修改成功!");
                this.findTable();
              })
              .catch((err) => {
                this.$message.error(err.data.msg);
              });
          }
        }
      });
    },
    importTable() {
      apiSend
        .prodExcelFile({
          data: this.fileData,
        })
        .then((res) => {
          let arr = [];
          if (res.data.data.code == "0") {
            this.dialogTableVisible = false;
            this.$message.success(res.data.data.msg);
          } else {
            let {
              code, // eslint-disable-line no-unused-vars
              msg, // eslint-disable-line no-unused-vars
              ...result
            } = res.data.data;
            Object.keys(result).forEach((key) => {
              arr.push(result[key]);
            });
            if (!arr.length) {
              arr.push(res.data.data.msg);
            }
            this.notice = arr;
          }
          this.findTable();
        })
        .catch((err) => {
          this.$message.error(err.data.msg);
        });
    },
    httpRequest(data) {
      // let file = data.file;
      this.fileData = {
        excelFile: data.file,
      };
      this.checkPass = false;
      apiSend
        .prodCheckProdInfo({
          data: this.fileData,
        })
        .then((res) => {
          this.$refs.upload.clearFiles();
          let arr = [];
          // let result = res.data.data
          let { code, ...result } = res.data.data;
          if (code == "0") {
            this.checkPass = true;
            arr.push(result.msg);
          } else {
            Object.keys(result).forEach((key) => {
              arr.push(result[key]);
            });
          }
          this.notice = arr;
        })
        .catch((err) => {
          this.$message.error(err.data.msg);
        });
    },
    addTable() {
      // this.$nextTick(() => {
      //   this.$refs['ruleForm'].resetFields();
      // })
      // this.ruleForm = {
      //   calcode: '', // 统计口径
      //   calcode2: '', // 统计口径2
      //   chnnlcode: '', // 一级类别编号
      //   chnnlname: '',// 一级类别名
      //   categorycode: '',// 二级类别编号
      //   categoryname: '',// 二级类别名
      //   prodcode: '', // 产品编码
      //   prodname: '', // 产品名
      //   proddesc: '' // 产品描述
      // }
      this.modalInfo.show = true;
      this.modalInfo.title = "新增框";
    },
    deleteTable() {
      if (!this.multipleSelection.length) {
        this.$message.warning("请选择要删除的项!");
        return;
      }
      this.$confirm("进行删除操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定的操作(调用接口)
          // let str = '',calcode = '',calcode2 = ''
          let array = [];
          this.multipleSelection.forEach((item) => {
            // str += index == 0 ? item.prodcode : ',' + item.prodcode
            // calcode += index == 0 ? item.calcode : ',' + item.calcode
            // calcode2 += index == 0 ? item.calcode2 : ',' + item.calcode2
            array.push({
              prodcode: item.prodcode,
              calcode: item.calcode,
              calcode2: item.calcode2,
            });
          });
          apiSend
            .prodRemoveProdByCode({ data: array })
            .then((res) => {
              console.log(res);
              this.$message.success("删除成功!");
              this.findTable();
            })
            .catch((err) => {
              this.$message.error(err.data.msg);
            });
        })
        .catch(() => {
          //几点取消的提示
        });
    },
    handleDelete(index, row) {
      this.$confirm("进行删除操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定的操作(调用接口)
          let params = {
            prodCode: row.prodcode,
          };
          apiSend
            .prodRemoveProdByCode({ data: params })
            .then(() => {
              this.$message.success("删除成功!");
              this.findTable();
            })
            .catch((err) => {
              this.$message.error(err.data.msg);
            });
        })
        .catch(() => {
          //几点取消的提示
        });
    },
    handleEdit(index, row) {
      let {
        operationtime, // eslint-disable-line no-unused-vars
        operationuser, // eslint-disable-line no-unused-vars
        ...result
      } = row;
      let self = this;
      self.$nextTick(() => {
        self.$refs["ruleForm"].resetFields();
      });
      self.ruleForm = result;
      self.modalInfo.show = true;
      self.modalInfo.title = "修改框";
    },
    objectSpanMethod({
      row,
      column /* eslint-disable-line no-unused-vars*/,
      rowIndex /* eslint-disable-line no-unused-vars*/,
      columnIndex,
    }) {
      if (columnIndex === 1) {
        return {
          rowspan: row.rowspan,
          colspan: 1,
        };
      }
    },
    setrowspans() {
      // 先给所有的数据都加一个v.rowspan = 1
      // debugger
      this.tableData.forEach((v) => {
        v.rowspan = 1;
      });
      // 双层循环
      for (let i = 0; i < this.tableData.length; i++) {
        // 内层循环，上面已经给所有的行都加了v.rowspan = 1
        // 这里进行判断
        // 如果当前行的id和下一行的id相等
        // 就把当前v.rowspan + 1
        // 下一行的v.rowspan - 1
        for (let j = i + 1; j < this.tableData.length; j++) {
          //此处可根据相同字段进行合并，此处是根据的id
          if (this.tableData[i].prodcode === this.tableData[j].prodcode) {
            this.tableData[i].rowspan++;
            this.tableData[j].rowspan--;
          }
        }
        // 这里跳过已经重复的数据
        i = i + this.tableData[i].rowspan - 1;
      }
    },
  },
};
</script>
<style lang="less">
.menu-right .menu-btn {
  display: flex !important;
}
.page-container {
  box-sizing: border-box;
  width: 100%;
  padding: 30px 20px;
  box-shadow: 0 0 5px #999;
  border-radius: 5px;
  background-color: #fff;
  .menu-right .upload-demo {
    display: inline-block;
    margin: 10px;
  }
}
.export-dialog {
  .dialog-top {
    display: flex;
    justify-content: space-between;
    .dialog-left {
      display: flex;
      .upload-demo {
        margin-right: 10px;
        position: relative;
        .el-upload-list {
          position: absolute;
          top: 30px;
          left: 0;
        }
      }
    }
  }
  .dialog-info {
    margin-top: 50px;
    min-height: 300px;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    line-height: 1.5;
  }
  .btn-group {
    text-align: right;
  }
}
.el-message .el-message-box__wrapper {
  z-index: 99999;
}
</style>