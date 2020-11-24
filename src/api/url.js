export default {
  getToken: "/getToken", // 接口名
  // excelFile: '/Common/excelFile', // 上传
  findUserInfos: '/Common/findUserInfos', // 获取loginName
  findUserInfo: '/Common/findUserInfo', // 获取用户权限
  prodFindProdInfo: '/IopProdDTableController/findProdInfo', // IOP产品维表查询
  prodExcelFile: '/IopProdDTableController/excelFile', // IOP产品维表导入
  prodUpdateProdInfo: '/IopProdDTableController/updateProdInfo', // IOP产品维表修改
  prodInsertProdInfo: '/IopProdDTableController/insertProdInfo', // IOP产品新增
  prodRemoveProdByCode: '/IopProdDTableController/removeProdByCode', //IOP产品维表删除
  prodCheckProdInfo: '/IopProdDTableController/checkProdInfo', //IOP产品维表导入监测
  // ProdDownloadProdExcel: '/IopChnnlDTableController/downloadProdExcel', // IOP渠道维表下载模板
  // prodDownProdInfo: '/IopProdDTableController/downProdInfo', // IOP导出
  canalExcelFile: '/IopChnnlDTableController/excelFile', // IOP渠道维表导入
  canalFindChnnlInfo: '/IopChnnlDTableController/findChnnlInfo', // IOP渠道维表查询
  canalUpdateChnlInfo: '/IopChnnlDTableController/updateChnlInfo', // IOP渠道维表修改  
  canalInsertProdInfo: '/IopChnnlDTableController/insertChnlInfo', // IOP渠道维表新增
  canalCheckChnnlInfo: '/IopChnnlDTableController/checkChnnlInfo', //IOP渠道维表导入监测
  canalRemoveChnlByCode: '/IopChnnlDTableController/removeChnlByCode', //IOP渠道维表删除
  // canalDownloadChnlExcel: '/IopChnnlDTableController/downloadChnlExcel', // IOP渠道维表下载模板
  // canaldownChnlInfo: '/IopChnnlDTableController/downChnlInfo' // IOP导出
  getJSON: '../../data.json?t=' + (new Date()).getTime().toString()
};
