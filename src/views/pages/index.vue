<template>
  <div class="page-container common-css">
    <div class="page-main">
      <div class="page-menu">
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline"
                 size="small">
          <div class="menu-left">
            <el-form-item label="日期:">
              <el-date-picker type="date"
                              v-model="formInline.statisDate"
                              placeholder="选择一个日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="疑似客户分类:">
              <el-select v-model="formInline.customMenus"
                         placeholder="请选择">
                <el-option :label="item.name"
                           :value="item.value"
                           v-for="(item,index) in customMenus"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="疑似客户来源:">
              <el-select v-model="formInline.customOrigin"
                         placeholder="请选择">
                <el-option :label="item.name"
                           :value="item.value"
                           v-for="(item,index) in customOrigin"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
        <div class="data-map">
          <div class="area-left">
            <div><span>湖南累计疑似涉诈客户数：</span><span class="c-num">27</span> </div>
            <div><span>湖南当日疑似涉诈客户数：</span><span class="c-num">9</span></div>
            <div><span>湖南累计疑似骚扰客户数：</span><span class="c-num">20</span></div>
            <div><span>湖南当日疑似骚扰客户数：</span><span class="c-num">4</span></div>
            <div><span>湖南累计公安通报客户数：</span><span class="c-num">50</span></div>
            <div><span>湖南当日公安通报客户数：</span><span class="c-num">10</span></div>
            <div><span>湖南累计12321举报客户数：</span><span class="c-num">24</span></div>
            <div><span>湖南当日12321举报客户数：</span><span class="c-num">3</span></div>
          </div>
          <div class="area-right">
            <div ref="map"
                 id="map"
                 class="GisMap"></div>
          </div>

        </div>

      </div>
      <el-table :data="tableData"
                style="width: 100%"
                row-key="id"
                border
                lazy
                :load="load"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="city"
                         label="地市/地区"
                         width="180">
        </el-table-column>
        <el-table-column label="疑似涉诈">
          <el-table-column prop="swindle_grand"
                           label="当日疑似客户数"
                           width="180">
          </el-table-column>
          <el-table-column prop="swindle_total"
                           label="累计疑似客户数">
          </el-table-column>
        </el-table-column>
        <el-table-column label="疑似骚扰">
          <el-table-column prop="harass_grand"
                           label="当日疑似客户数"
                           width="180">
          </el-table-column>
          <el-table-column prop="harass_total"
                           label="累计疑似客户数">
          </el-table-column>
        </el-table-column>
        <el-table-column label="公安通报">
          <el-table-column prop="notice_grand"
                           label="当日疑似客户数"
                           width="180">
          </el-table-column>
          <el-table-column prop="notice_total"
                           label="累计疑似客户数">
          </el-table-column>
        </el-table-column>
        <el-table-column label="123321举报">
          <el-table-column prop="report_grand"
                           label="当日疑似客户数"
                           width="180">
          </el-table-column>
          <el-table-column prop="report_total"
                           label="累计疑似客户数">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script src="../../../static/js/leaflet.all.min.js"></script>
<script src="../../../static/js/baseMap.s.js"></script>
<script src="../../../static/js/colorBlock.s.js"></script>
<script>

import apiSend from '@/api/axios.js'
import axios from 'axios'
import { download } from '@/api/export.js'
import base from "@/api/baseUrl";
import { mapState } from 'vuex'
import Axios from 'axios'
export default {
  data () {
    return {
      baseUrl: process.env.NODE_ENV === "development" ? base.development : base.production,
      formInline: {
        region: 0,
        origin: '',
        statisDate : '',
        customMenus : '',
        customOrigin : ''
      },
      customMenus: [{ name: '所有', value: 0 }, { name: '骚扰', value: 1 }, { name: '诈骗', value: 2 }],
      customOrigin: [{ name: '所有', value: 0 }, { name: '模型识别', value: 1 }, { name: '人工导入', value: 2 }, { name: '公安通报', value: 3 }, { name: '12321举报', value: 4 }],
      lv: 2,
      layer: null,
      cityInfo: {
        'center': []
      },
      cntyInfo: {
        name: ''
      },
      gridInfo: {
        name: ''
      },
      tableData: [{
        id: 1,
        city: '岳阳市',
        swindle_grand: 2,
        swindle_total: 21,
        harass_grand: 11,
        harass_total: 22,
        notice_grand: 123,
        notice_total: 23,
        report_grand: 11,
        report_total: 1
      }, {
        id: 2,
        city: '益阳市',
        swindle_grand: 2,
        swindle_total: 21,
        harass_grand: 11,
        harass_total: 22,
        notice_grand: 123,
        notice_total: 23,
        report_grand: 11,
        report_total: 1
      }, {
        id: 3,
        city: '长沙市',
        swindle_grand: '2',
        swindle_total: '21',
        harass_grand: '21',
        harass_total: '22',
        notice_grand: '23',
        notice_total: '2',
        report_grand: '11',
        report_total: '1',
        children: [{
          id: 31,
          city: '天心区',
          swindle_grand: '2',
          swindle_total: '21',
          harass_grand: '21',
          harass_total: '22',
          notice_grand: '23',
          notice_total: '2',
          report_grand: '11',
          report_total: '1',
        }, {
          id: 4,
          city: '开福区',
          swindle_grand: '2',
          swindle_total: '21',
          harass_grand: '21',
          harass_total: '22',
          notice_grand: '23',
          notice_total: '2',
          report_grand: '11',
          report_total: '1',
        }]
      }, {
        id: 5,
        city: '娄底市',
        swindle_grand: '2',
        swindle_total: '21',
        harass_grand: '21',
        harass_total: '22',
        notice_grand: '23',
        notice_total: '2',
        report_grand: '11',
        report_total: '1',
      }, {
        id: 6,
        city: '湘潭市',
        swindle_grand: '2',
        swindle_total: '21',
        harass_grand: '21',
        harass_total: '22',
        notice_grand: '23',
        notice_total: '2',
        report_grand: '11',
        report_total: '1',
      }, {
        id: 7,
        city: '株洲市',
        swindle_grand: '2',
        swindle_total: '21',
        harass_grand: '21',
        harass_total: '22',
        notice_grand: '23',
        notice_total: '2',
        report_grand: '11',
        report_total: '1',
      }]
    };
  },
  computed: {
    // tableData(){
    //   this.tableData.sort((a,b)=>a.id - b.id)
    // }
    ...mapState(['authInfo'])
  },
  created () {
    // this.setrowspans();
    // this.findTable()
    this.findLeft(); // 左方
    this.findMapList(1) // 右方
    this.findTable();
  },
  methods: {
    initData(){
      let baseUrl = process.env.NODE_ENV === "development" ? base.development : base.production
      Axios.post(baseUrl + '/heatmap/selectSumMapData',{
        areaId : '',
        statisDate : this.formInline.statisDate
      }).then((res)=>{
        console.log(data)
      })
    },
    findLeft(){

    },
    findTable(){

    },
    load (tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
    },
    // 初始化gis地图
    initGisMap () {
      // url:'http://10.154.89.210:4003/arcgis/rest/services/HN_BaseMap/MapServer',
      var clz = new BaseMap({ boxId: 'map', Zoom: 0 })
      this.map = clz.loadBaseMap()
      this.map.flyTo({ lat: 27.4, lng: 111.55 }, 0)
      this.map.dragging.disable()
      this.map.scrollWheelZoom.disable()
      this.map.keyboard.disable()
      this.loadColorBlock('0', 'ColorBlock', true)
    },
    // 获取地图列表
    findMapList (num) {
      this.$post(Url.findMapInfo, this.mapQuery, 'complex').then(res => {
        switch (num) {
          case 1:
            this.cityInfo.list = res.data
            this.initGisMap()
            break;
          case 2:
            this.cntyInfo.list = res.data
            this.lv = res.data[0].lv
            this.map.setView(this.cntyInfo.center, 1);
            this.loadColorBlock('0', 'ColorBlock', true);
            break;
          case 3:
            this.gridInfo.list = res.data
            this.lv = res.data[0].lv
            this.map.setView(this.gridInfo.center, 3);
            this.loadColorBlock('0', 'ColorBlock', true);
            break;
        }
        console.log(this.cityInfo, 'cityInfo')
      })
    },
    loadColorBlock (ind, key, hasShow) {
      var that = this
      var currCity = 0;
      var currLayer;
      this.layer = currLayer = new ColorBlock({
        key: key, baseMap: this.map, showName: true, data: this.lv === 2 ? this.cityInfo.list : this.lv === 3 ? this.cntyInfo.list : this.lv === 4 ? this.gridInfo.list : this.cityInfo.list,
        // level: [[1, 100, 'rgba(177,67,59,0.5)'], [100, 200, 'rgba(57,73,142,0.5)'], [200, 300, 'rgba(59,160,136,0.5)'], [300, 300, 'rgba(173,136,68,0.5)']],
        callback: function (item, e) {
          console.log(item, 'item')
          if (item.lv === 2) {
            that.cntyInfo.center = item.center
            that.cntyInfo.name = item.name
            // that.mapQuery.parentCode = item.code
            that.findMapList(2)
            that.layer.hide()
          }
          if (item.lv === 3) {
            that.gridInfo.center = item.center
            that.gridInfo.name = item.name
            // that.mapQuery.parentCode = item.code
            that.findMapList(3)
            that.layer.hide()
          }
          // that.dataQuery.areaLvl = item.lv
          // that.dataQuery.code = item.code
          if (item.lv === 4) {
            // that.findLeftDownDate()
            // that.findCenterDownDate()
            // that.findRightDownDate()
          } else {
            that.initData()
          }
        }
      });
      that.layer.draw();
      if (hasShow) that.layer.show(); else that.layer.hide();
    }
  }
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
.data-map {
  // padding:20px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .area-left {
    > div {
      margin-bottom: 15px;
      .c-num {
        font-weight: bold;
        color: #e66f0f;
        font-size: 20px;
      }
    }
  }

  .GisMap {
    min-width: 500px;
    min-height: 500px;
    width: 60%;
    height: 100%;
  }
}
</style>