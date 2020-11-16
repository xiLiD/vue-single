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
        style="width: 100%; margin-top: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="prodcode" label="产品编码"> </el-table-column>
        <el-table-column prop="prodname" label="产品名称"> </el-table-column>
        <el-table-column prop="prodbidcode" label="推荐类型编码">
        </el-table-column>
        <el-table-column prop="prodbidname" label="推荐类型名称">
        </el-table-column>
        <el-table-column prop="prodsmallcode" label="产品小类编码">
        </el-table-column>
        <el-table-column prop="prodsmallname" label="产品小类名称">
        </el-table-column>
        <el-table-column prop="note" label="备注"> </el-table-column>
        <el-table-column prop="operationuser" label="操作人"> </el-table-column>
        <el-table-column prop="operationtime" label="操作时间" min-width="110">
        </el-table-column>
        <!-- <el-table-column prop="statisdate"
                         label="统计时间"
                         min-width="110">
        </el-table-column> -->
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
            >模板下载
          </el-button>
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
        <el-form-item class="menu-btn" label="推荐类型编码" prop="prodbidcode">
          <el-input
            v-model="ruleForm.prodbidcode"
            placeholder="请输入推荐类型编码"
          ></el-input>
        </el-form-item>
        <el-form-item class="menu-btn" label="推荐类型名称" prop="prodbidname">
          <el-input
            v-model="ruleForm.prodbidname"
            placeholder="请输入推荐类型名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="menu-btn"
          label="产品小类编码"
          prop="prodsmallcode"
        >
          <el-input
            v-model="ruleForm.prodsmallcode"
            placeholder="请输入产品小类编码"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="menu-btn"
          label="产品小类名称"
          prop="prodsmallname"
        >
          <el-input
            v-model="ruleForm.prodsmallname"
            placeholder="请输入产品小类名称"
          ></el-input>
        </el-form-item>
        <el-form-item class="menu-btn" label="备注" prop="note">
          <el-input v-model="ruleForm.note" placeholder="请输入备注"></el-input>
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
import axios from "axios";
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
        prodcode: "",
        prodname: "",
        prodbidcode: "",
        prodbidname: "",
        prodsmallcode: "",
        prodsmallname: "",
        note: "",
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
        prodbidcode: [
          { required: true, message: "推荐类型编码不能为空", trigger: "blur" },
        ],
        prodbidname: [
          { required: true, message: "推荐类型名称不能为空", trigger: "blur" },
        ],
        prodsmallcode: [
          { required: true, message: "产品小类编码不能为空", trigger: "blur" },
        ],
        prodsmallname: [
          { required: true, message: "产品小类名称不能为空", trigger: "blur" },
        ],
      },
      fileData: "", //导入文件
      checkPass: false, // 监测上传是否成功
      multipleSelection: [],
    };
  },
  computed: {
    // tableData(){
    //   this.tableData.sort((a,b)=>a.id - b.id)
    // }
    ...mapState(["authInfo"]),
  },
  created() {
    // this.setrowspans();
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
        this.baseUrl + "/iopWeb/IopChnnlDTableController/downChnlInfo",
        params,
        "IOP渠道维表"
      );
    },
    downloadExcel() {
      // download(this.baseUrl+'/iopWeb/IopChnnlDTableController/downloadChnlExcel',{})
      // window.location.href = this.baseUrl + '/iopWeb/IopChnnlDTableController/downloadChnlExcel'
      if (process.env.NODE_ENV === "development") {
        window.location.href =
          this.baseUrl + "/iopWeb/IopChnnlDTableController/downloadChnlExcel";
      } else {
        window.location.href = this.baseUrl + "/static/IOPChnlImportTemp.xlsx";
      }
    },
    // 关闭弹窗
    closeDialog() {
      this.$refs["ruleForm"].resetFields();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    showTableVisible() {
      this.dialogTableVisible = true;
      this.notice = [];
      this.checkPass = false;
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    },
    findTable() {
      let self = this;
      let params = {
        pageNo: self.queryData.pageNo,
        pageSize: self.queryData.pageSize,
      };
      let key = self.formInline.region == 0 ? "prodCode" : "prodName";
      let key2 = key == "prodCode" ? "prodName" : "prodCode";
      params[key] = self.formInline.search;
      params[key2] = "";
      apiSend.canalFindChnnlInfo({ data: params }).then((res) => {
        self.tableData = res.data.data.records;
        self.queryData.total = res.data.data.total;
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
              .canalInsertProdInfo({ data: this.ruleForm })
              .then((res) => {
                this.modalInfo.show = false;
                this.$message.success("新增成功!");
                this.findTable();
              })
              .catch((err) => {
                this.$message.error(err.data.msg);
              });
          } else {
            apiSend
              .canalUpdateChnlInfo({ data: this.ruleForm })
              .then((res) => {
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
        .canalExcelFile({
          data: this.fileData,
        })
        .then((res) => {
          let arr = [];
          if (res.data.data.code == "0") {
            this.dialogTableVisible = false;
            this.$message.success(res.data.data.msg);
          } else {
            let { code, msg, ...result } = res.data.data;
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
      let _this = this;
      let file = data.file;
      this.fileData = {
        excelFile: data.file,
      };
      this.checkPass = false;
      apiSend
        .canalCheckChnnlInfo({
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
          // this.$message.error(err.data.msg)
        });
    },
    addTable() {
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
          let str = "";
          this.multipleSelection.forEach((item, index) => {
            str += index == 0 ? item.prodcode : "," + item.prodcode;
          });
          let params = {
            prodCode: str,
          };
          apiSend
            .canalRemoveChnlByCode({ data: params })
            .then((res) => {
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
            .canalRemoveChnlByCode({ data: params })
            .then((res) => {
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
      let { operationtime, operationuser, ...result } = row;
      let self = this;
      self.$nextTick(() => {
        self.$refs.ruleForm.resetFields();
      });
      this.ruleForm = result;
      this.modalInfo.show = true;
      this.modalInfo.title = "修改框";
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
</style>