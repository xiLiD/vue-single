<template>
  <div class="page-container common-css">
    <div class="searchBox">
      <div class="flex">
        <div class="text">日期：</div>
        <el-date-picker
          v-model="dataQuery.statisData"
          type="date"
          size="small"
          placeholder="选择日期"
        >
        </el-date-picker>
      </div>
      <div class="flex" style="margin-left:30px">
        <div class="text">用户标识：</div>
        <el-input
          placeholder="请输入userId"
          v-model="dataQuery.userId"
          size="small"
        >
        </el-input>
      </div>
      <div class="flex" style="margin-left:30px">
        <div class="text">电话号码：</div>
        <el-input
          placeholder="请输入电话号码"
          v-model="dataQuery.servNo"
          size="small"
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
        <el-table-column prop="data" label="日期"></el-table-column>
        <el-table-column
          prop="data"
          label="开户归属地市代码"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="data"
          label="开户归属地县代码"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="data"
          label="开户归属营业部"
          width="150"
        ></el-table-column>
        <el-table-column prop="data" label="用户标识"></el-table-column>
        <el-table-column prop="data" label="手机号码"></el-table-column>
        <el-table-column prop="data" label="性别"></el-table-column>
        <el-table-column prop="data" label="年龄"></el-table-column>
        <el-table-column
          prop="data"
          min-width="100"
          label="用户品牌"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="用户消状态"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="100"
          label="在网月份"
        ></el-table-column>
        <el-table-column prop="data" label="姓氏"></el-table-column>
        <el-table-column prop="data" label="生日"></el-table-column>
        <el-table-column prop="data" label="用户大状态"></el-table-column>
        <el-table-column prop="data" label="用户大状态"></el-table-column>
        <el-table-column
          prop="data"
          min-width="100"
          label="用户服务品牌"
        ></el-table-column>
        <el-table-column prop="data" label="客户品牌"></el-table-column>
        <el-table-column prop="data" label="入网时间"></el-table-column>
        <el-table-column prop="data" label="离网时间"></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="通话归属区县"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="是否在网用户"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="是否在网物联网卡用户"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="是否在网个人客户"
        ></el-table-column>
        <el-table-column prop="data" label="主套餐ID"></el-table-column>
        <el-table-column prop="data" label="主套餐优惠"></el-table-column>
        <el-table-column prop="data" label="主套餐价值"></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="套餐折扣名称"
        ></el-table-column>
        <el-table-column prop="data" label="套餐折扣率"></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="用户主用终端品牌"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="用户主用终端型号"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="当月语音套餐饱和度"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="当月套餐就来饱和度"
        ></el-table-column>
        <el-table-column prop="data" label="当月流量"></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="推荐套餐档次"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="阅读作者偏好"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="偏好阅读内容类型"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="120"
          label="音乐歌手偏好"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="偏好音乐内容类型"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="偏好游戏内容类型"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="游戏内容类型偏好排名"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="偏好视频内容类型"
        ></el-table-column>
        <el-table-column
          prop="data"
          min-width="150"
          label="视频内容类型偏好排名"
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
  data: function() {
    return {
      dataQuery: {
        statisData: "",
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
