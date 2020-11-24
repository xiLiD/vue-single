import {
  requestGet, // eslint-disable-line
  requestPost,
  requestFile,
  requestExcel // eslint-disable-line
} from "./request";
import url from "./url";
import base from "@/api/baseUrl";
console.log(url)
function getParams(params) {
  let baseUrl = process.env.NODE_ENV === "development" ? base.development : base.production;
  return Object.assign(
    {},
    {
      url: baseUrl + "/iopWeb" + params.url,
      data: params.data,
      showLoading: params.showLoading
    }
  );
}
function getJSONParams(params) {
  let baseUrl = process.env.NODE_ENV === "development" ? base.development : base.production;
  return Object.assign(
    {},
    {
      url: baseUrl + params.url,
      data: params.data,
      showLoading: params.showLoading
    }
  );
}
const getJSON = function (params = {}) {
  params.url = url.getJSON;
  console.log(requestGet(getJSONParams(params)))
  return requestGet(getJSONParams(params));
};
const loginSso = function (params) {
  params.url = url.loginSso;
  return requestPost(getParams(params));
};
// const getToken = function (params) {
//   params.url = url.getToken;
//   return requestPost(getParams(params));
// };
// const excelFile = function (params) {
//   params.url = url.excelFile;
//   return requestFile(getParams(params));
// };
// 获取用户权限
const findUserInfo = function (params) {
  params.url = url.findUserInfo;
  return requestPost(getParams(params));
};
// 获取用户权限
const findUserInfos = function (params) {
  params.url = url.findUserInfos;
  return requestPost(getParams(params));
};
// IOP产品维表导入
const prodExcelFile = function (params) {
  params.url = url.prodExcelFile;
  return requestFile(getParams(params));
};
// IOP产品维表查询
const prodFindProdInfo = function (params) {
  params.url = url.prodFindProdInfo;
  return requestPost(getParams(params));
};
// IOP产品维表修改
const prodUpdateProdInfo = function (params) {
  params.url = url.prodUpdateProdInfo;
  return requestPost(getParams(params));
};
// IOP产品新增
const prodInsertProdInfo = function (params) {
  params.url = url.prodInsertProdInfo;
  return requestPost(getParams(params));
};
// const prodDownloadProdExcel = function (params) {
//   params.url = url.prodDownloadProdExcel;
//   return requestPost(getParams(params));
// };
// IOP渠道维表导入
const canalExcelFile = function (params) {
  params.url = url.canalExcelFile;
  return requestFile(getParams(params));
};
// IOP渠道维表查询
const canalFindChnnlInfo = function (params) {
  params.url = url.canalFindChnnlInfo;
  return requestPost(getParams(params));
};
// IOP渠道维表修改 
const canalUpdateChnlInfo = function (params) {
  params.url = url.canalUpdateChnlInfo;
  return requestPost(getParams(params));
};
// IOP渠道维表新增
const canalInsertProdInfo = function (params) {
  params.url = url.canalInsertProdInfo;
  return requestPost(getParams(params));
};
//IOP渠道维表导入监测
const canalCheckChnnlInfo = function (params) {
  params.url = url.canalCheckChnnlInfo;
  return requestFile(getParams(params));
};
//IOP渠道维表删除
const canalRemoveChnlByCode = function (params) {
  params.url = url.canalRemoveChnlByCode;
  return requestPost(getParams(params));
};
//IOP产品维表导入监测
const prodCheckProdInfo = function (params) {
  params.url = url.prodCheckProdInfo;
  return requestFile(getParams(params));
};
//IOP产品维表删除
const prodRemoveProdByCode = function (params) {
  params.url = url.prodRemoveProdByCode;
  return requestPost(getParams(params));
};
// const prodDownProdInfo = function (params) {
//   params.url = url.prodDownProdInfo;
//   return requestPost(getParams(params));
// };
export default {
  loginSso,
  findUserInfos,
  findUserInfo,
  prodExcelFile,
  prodFindProdInfo,
  prodUpdateProdInfo,
  prodInsertProdInfo,
  prodCheckProdInfo,
  canalExcelFile,
  canalFindChnnlInfo,
  canalUpdateChnlInfo,
  canalInsertProdInfo,
  canalCheckChnnlInfo,
  canalRemoveChnlByCode,
  prodRemoveProdByCode,
  getJSON
};
