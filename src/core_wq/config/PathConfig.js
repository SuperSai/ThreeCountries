"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PathConfig extends Laya.Script {
}
PathConfig.AppUrl = "https://sanguo.xiaoduogame.cn/api/"; //正式服地址
PathConfig.AppResUrl = "https://miniapp.vuggame.com/sanguo_xiaoduogame_cn/v1/";
PathConfig.RES_URL = PathConfig.AppResUrl + "images/";
PathConfig.HEAD_PATH = PathConfig.RES_URL + "headImg/";
PathConfig.BONE_PATH = PathConfig.RES_URL + "boneAnim/{0}.sk";
PathConfig.BONE_MONSTER_PATH = PathConfig.RES_URL + "boneAnim/enemy/{0}.sk";
/** 声音路径 */
PathConfig.SOUND_PATH = "musics/{0}.mp3";
/** 排行榜排名图片路径 */
PathConfig.RANK_PATH = "images/rank/cell_top{0}.png";
/** 功能按钮图片路径 */
PathConfig.SYSTEM_BTN_PATH = "images/hall/{0}.png";
exports.default = PathConfig;
