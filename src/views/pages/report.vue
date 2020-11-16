<template>
  <div class="page-container common-css">
    <div class="searchBox">
      <div class="flex">
        <div class="text">日期：</div>
        <el-date-picker
          v-model="dataQuery.statisDate"
          type="date"
          size="small"
          style="width:150px;"
          placeholder=""
        >
        </el-date-picker>
      </div>
      <div class="flex" style="margin-left:30px">
        <div class="text">地市名称：</div>
        <el-input
          placeholder=""
          v-model="dataQuery.cityName"
          size="small"
          style="width:120px;"
        >
        </el-input>
      </div>
      <div class="flex" style="margin-left:30px">
        <div class="text">区县名称：</div>
        <el-input
          placeholder=""
          v-model="dataQuery.cntyName"
          size="small"
          style="width:120px;"
        >
        </el-input>
      </div>
      <div class="flex" style="margin-left:30px">
        <div class="text">网格名称：</div>
        <el-input
          placeholder=""
          v-model="dataQuery.gridName"
          size="small"
          style="width:120px;"
        >
        </el-input>
      </div>
      <div class="flex" style="margin-left:30px">
        <div class="text">营业部名称：</div>
        <el-input
          placeholder=""
          v-model="dataQuery.townsName"
          size="small"
          style="width:120px;"
        >
        </el-input>
      </div>
      <el-button
        icon="el-icon-search"
        style="margin-left:50px"
        type="primary"
        size="small"
        >搜索</el-button
      >
    </div>

    <div class="tableBox">
      <el-table
        :data="tableData"
        size="small"
        :header-cell-style="{background:'rgb(160,207,255)',color:'#fff'}"
        style="width: 100%"
        border
      >
        <el-table-column prop="data" label="统计月份"></el-table-column>
        <el-table-column prop="data" label="地市代码"></el-table-column>
        <el-table-column prop="data" label="地市名称"></el-table-column>
        <el-table-column prop="data" label="区县代码"></el-table-column>
        <el-table-column prop="data" label="区县名称"></el-table-column>
        <el-table-column prop="data" label="营业部id"></el-table-column>
        <el-table-column prop="data" label="营业部名称"></el-table-column>
        <el-table-column prop="data" label="乡镇id"></el-table-column>
        <el-table-column prop="data" label="乡镇名称"></el-table-column>
        <el-table-column prop="data" label="网格id"></el-table-column>
        <el-table-column prop="data" label="网格名称"></el-table-column>
        <el-table-column prop="data" label="地市级别"></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="期末5g客户数"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="当日净增5g客户数"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="当月净增5g客户数"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="当年净增5g客户数"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="5g套餐客户数"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="特惠流量包客户数"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="140"
          label="直通包客户数"
        ></el-table-column>
        <el-table-column prop="data" label="全球通客户"></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="动感地带客户"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="160"
          label="5g智享套餐个人版客户"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="160"
          label="5g智享套餐家庭版客户"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="线上渠道合计"
        ></el-table-column>
        <el-table-column prop="data" label="一级电渠"></el-table-column>
        <el-table-column prop="data" label="省内电渠"></el-table-column>
        <el-table-column prop="data" label="在线公司"></el-table-column>
        <el-table-column
          prop="data"
          min-width="180"
          label="在线公司-5g特惠流量包"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="160"
          label="在线公司-5g直通包"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="在线公司-5g套餐"
        ></el-table-column>
        <el-table-column prop="data" label="和掌柜"></el-table-column>
        <el-table-column prop="data" label="线下渠道"></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="线下渠道-5g套餐"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="180"
          label="线下渠道-5g特惠流量包"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="160"
          label="线下渠道-5g直通包"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="180"
          label="使用了5g流量的客户数"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="180"
          label="本月累计流量(m)"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="100"
          label="0流量客户"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="100"
          label="dou(0,1g]"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="100"
          label="dou(1,10g]"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="100"
          label="dou 10g以上"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="流量超套客户"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="本月累计在线时长"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="100"
          label="0通话客户"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="mou (0,100分钟]"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="mou 100分钟以上"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="语音超套用户"
        ></el-table-column>
        <el-table-column prop="data" label="arpu值"></el-table-column>
        <el-table-column
          prop="data"
          min-width="130"
          label="产生漫游客户数"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="使用了短信的客户数"
        ></el-table-column>
      </el-table>
    </div>

    <div class="pageBox">
      <el-pagination
        :current-page="1"
        :page-size="10"
        :total="200"
        style="text-align: center;"
        layout="total, prev, pager, next, jumper"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataQuery: {
        statisDate: "",
        cityName: "",
        cntyName: "",
        gridName: "",
        townsName: "",
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
    }
  },
}
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
</style>
