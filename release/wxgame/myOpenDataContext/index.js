require("weapp-adapter.js");
require("libs/laya.wxmini.js");
window.loadLib = require;
/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "sensor_landscape";

//-----libs-begin-----
// loadLib("libs/laya.opendata.min.js")
loadLib("libs/laya.core.js")
loadLib("libs/laya.ui.js")
loadLib("js/bundle.js");
//-----libs-end-------
// wx.onMessage(data => {
//   console.log(data)
//   if (data.message == "friendRank") {
//     loadLib("js/bundle.js");
//   }
// })