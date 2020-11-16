<template>
  <div class="page-container common-css">
    <div class="searchBox">
      <div class="flex">
        <div class="text">日期：</div>
        <el-date-picker
          v-model="dataQuery.statisMonth"
          type="month"
          size="small"
          placeholder="选择月份"
        >
        </el-date-picker>
      </div>
      <div class="flex" style="margin-left: 30px">
        <div class="text">地市编码：</div>
        <el-input
          placeholder="请输入地市编码"
          v-model="dataQuery.cityCode"
          size="small"
          style="width: 150px"
        >
        </el-input>
      </div>
      <div class="flex" style="margin-left: 30px">
        <div class="text">用户标识：</div>
        <el-input
          placeholder="请输入userId"
          v-model="dataQuery.userId"
          size="small"
          style="width: 150px"
        >
        </el-input>
      </div>
      <div class="flex" style="margin-left: 30px">
        <div class="text">电话号码：</div>
        <el-input
          placeholder="请输入电话号码"
          v-model="dataQuery.servNo"
          size="small"
          style="width: 150px"
        >
        </el-input>
      </div>
      <el-button
        icon="el-icon-search"
        style="margin-left: 50px"
        type="primary"
        size="small"
        >搜索</el-button
      >
    </div>

    <div class="tableBox">
      <el-table
        :data="tableData"
        size="small"
        :header-cell-style="{ background: 'rgb(160,207,255)', color: '#fff' }"
        style="width: 100%"
        border
      >
        <el-table-column prop="data" label="统计月份"></el-table-column>
        <el-table-column prop="data" label="地市编码"></el-table-column>
        <el-table-column prop="data" label="用户id"></el-table-column>
        <el-table-column prop="data" label="手机号码"></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="是否为家庭关键人"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="是否为家庭圈成员"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="是否为家庭圈异网成员"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="130"
          label="用户所在家庭成员数"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="130"
          label="是否办理家庭类产品"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="130"
          label="是否办理移动宽带"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="140"
          label="是否办理魔百和/电视"
        ></el-table-column>
        <el-table-column prop="data" label="是否有老人"></el-table-column>
        <el-table-column prop="data" label="是否有儿童"></el-table-column>
        <el-table-column prop="data" label="是否有宠物"></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="是否亲情网潜客"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="是否智能音箱"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="是否语音遥控器"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="是否智能组网潜客"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="80"
          label="稳定度级别"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="80"
          label="价制度级别"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="180"
          label="4g客户不满意原因类型自动"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="180"
          label="4g客户不满意原因类型人工"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="180"
          label="宽带客户不满意原因类型自动"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="180"
          label="宽带客户不满意原因类型人工"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="是否宽带问卷调查潜客"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="是否4g问卷调查潜客"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="180"
          label="是否4g升越级投诉倾向客户"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="180"
          label="是否本网高三校园用户"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="180"
          label="是否本网高校校园用户"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="用户常驻小区"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="用户常驻聚类市场"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="180"
          label="是否聚类市场商铺经营者"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="200"
          label="是否聚类市场商铺已办理本网宽带"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="180"
          label="是否聚类市场商铺已办理专线"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="160"
          label="是否abc类集团成员甄别"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="是否abc类集团潜客"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="160"
          label="是否abc类集团v网潜客"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="家庭圈异网号码集"
        ></el-table-column>
      </el-table>
    </div>

    <div class="pageBox">
      <el-pagination
        :current-page="1"
        :page-size="10"
        :total="200"
        style="text-align: center"
        layout="total, prev, pager, next, jumper"
      />
    </div>
  </div>
</template>
<script>
import apiSend from "@/api/axios.js";
export default {
  data() {
    return {
      dataQuery: {
        statisMonth: "",
        cityCode: "",
        userId: "",
        servNo: "",
      },
      value1: "",
      input1: "",
      tableData: [
        {
          data: "王小虎",
        },
        {
          data: "王小虎",
        },
        {
          data: "王小虎",
        },
        {
          data: "王小虎",
        },
      ],
    };
  },
  methods: {
    findTable() {
      let self = this;
      let params = {
        pageNo: 1,
        pageSize: 2,
      };
      apiSend
        .canalFindChnnlInfo({
          data: params,
        })
        .then((res) => {
          console.log(res);
          self.tableData = res.data.data.records;
          self.queryData.total = res.data.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.findTable();
  },
};
</script>
<style lang="less">
.searchBox {
  background: #f4f4f4;
  padding: 10px;
  border: 1px solid #efefef;
  display: flex;
}
.pageBox {
  background: #f4f4f4;
  padding: 10px;
  border: 1px solid #efefef;
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
}
.flex {
  display: flex;
  align-items: center;
}
.el-input {
  width: 200px;
}
.tableBox {
  margin-top: 20px;
}
.text {
  font-size: 14px;
  color: #666;
}
.el-table .cell {
  line-height: 1.5 !important;
}
</style>
