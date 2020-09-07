// 配置编译环境和线上环境之间的切换

const env = process.env;
let baseUrl = '/mp';
// 图表库为avue
let iconfontVersion = ['567566_qo5lxgtishg', '667895_vf6hgm08ubf', '734853_69upnso6mha'];
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`;
let codeUrl = `${window.location.origin}/mp/code`;
let actUrl = `${window.location.origin}/act/modeler.html?modelId=`;
if (env.NODE_ENV == 'development') {

} else if (env.NODE_ENV == 'production') {

} else if (env.NODE_ENV == 'test') {

}
export {
  baseUrl,
  actUrl,
  iconfontUrl,
  iconfontVersion,
  codeUrl,
  env
}
