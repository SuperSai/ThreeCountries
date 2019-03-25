"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathConfig_1 = require("../config/PathConfig");
const HttpRequestHelper_1 = require("./HttpRequestHelper");
const MsgMgr_1 = require("../msg/MsgMgr");
const EventsMgr_1 = require("../event/EventsMgr");
const EventType_1 = require("../event/EventType");
const PlayerInfo_1 = require("../player/data/PlayerInfo");
const StorageUtil_1 = require("../utils/StorageUtil");
class HttpMgr extends Laya.Script {
    /** 元宝购车订单 */
    requestDiamondBuyOrder(diamond, callback, type = 0) {
        let strKind = 'buy_car';
        if (type == 1)
            strKind = 'diamond_acce';
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/diamond/order/' + diamond + '&kind=' + strKind,
            success: function (res) {
                console.log("@David 元宝购车订单", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 元宝购车 */
    requestDiamondBuy(orderId, callback) {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/diamond/buy_car/' + orderId,
            success: function (res) {
                console.log("@David 元宝购车", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 请求等级奖励元宝 */
    requestLevelPrizeDiamond(level, diamond, callback) {
        let dataString = 'level=' + level + '&diamond=' + diamond;
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v2/userinfo/upgrade_reward_diamond',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("@David 请求等级奖励元宝:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 拉取分享信息 */
    requestTaskInfo(callback) {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/task/info',
            success: function (res) {
                console.log("@David 拉取分享信息:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 拉取任务奖励 */
    requestTaskPrize(itemId, callback) {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/task/rewards/' + itemId,
            success: function (res) {
                console.log("@David 拉取任务奖励:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 拉取分享信息 */
    requestShareInfo(callback) {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/friend_num',
            success: function (res) {
                console.log("@David 拉取分享信息:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 拉取任务奖励 */
    requestTaskRewardPrize(itemId, callback) {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/friend_rewards/' + itemId,
            success: function (res) {
                console.log("@David 拉取任务奖励", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 拉取每日签到奖励 */
    requestDaySignPrize(itemId, callback) {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/sign/commit/' + itemId,
            success: function (res) {
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 拉取签到信息 */
    requestSignInfo(callback) {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/sign/info',
            success: function (res) {
                console.log("@David 拉取签到信息", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 拉取公众二维码 */
    requestOfficialAccData(callback) {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/subscription/get_info',
            success: function (res) {
                console.log("requestOfficialAccData", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 拉取公众奖励 */
    requestAccountRewardPrize() {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/subscription/rewards',
            success: function (res) {
                console.log("requestPrize", res);
                if (res.code == 1) {
                    MsgMgr_1.default.Ins.showMsg("奖励领取成功");
                    this.requestDiamondData();
                    //移除红点
                    // if (userData) {
                    //     userData.removeFollowRedPoint();
                    // }
                }
                else if (res.code == 2) {
                    MsgMgr_1.default.Ins.showMsg("未关注公众号");
                }
                else if (res.code == 3) {
                    MsgMgr_1.default.Ins.showMsg("奖励已领取");
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /**刷新用户元宝数量 */
    requestDiamondData() {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/get_diamond',
            success: function (res) {
                console.log("@David 刷新用户元宝数量:", res);
                if (res) {
                    EventsMgr_1.default.Ins.dispatch(EventType_1.default.UPDATE_CURRENCY, PlayerInfo_1.default.DIAMOND, res.diamond);
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 英雄数据 */
    requestCarparkData(callback) {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/seat/get',
            success: function (res) {
                console.log("@David 英雄数据:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
                // CommonFun.stopWaitEffect();
                MsgMgr_1.default.Ins.showMsg("网络异常");
            }
        });
    }
    /** 每日任务统计 */
    requestDailyTaskData(taskId) {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/task/progress/' + taskId,
            success: function (res) {
                console.log("requestDailyTaskData:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 分享广告完成 */
    requestShareAdFinish(type, shareId = 0) {
        let dataString = 'type=' + type + '&share_id=' + shareId;
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/operational/post_info',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 商店数据 */
    requestCarshopData(callback) {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/shop/get',
            success: function (res) {
                console.log("@David 商店数据:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
                // CommonFun.stopWaitEffect();
                MsgMgr_1.default.Ins.showMsg("网络异常");
            }
        });
    }
    /** 分享完成 */
    requestShareFinish(shareId, encryptedData = '', iv = '', callback = null) {
        let dataString = 'share_id=' + shareId + '&encryptedData=' + encryptedData + '&iv=' + iv;
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/finish',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log(res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 获取分享主题 */
    requestShareSubject(callback) {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/to',
            success: function (res) {
                console.log(res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 通知服务器已领取离线收益 */
    requestNotifyServerPrize() {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/reward',
            success: function (res) {
                console.log("requestNotifyServerPrize:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 新老版本更新检测（防止老数据覆盖） */
    requestVersionCheck(callback) {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/check/version',
            success: function (res) {
                console.log("requestVersionCheck", res);
                if (res && res.clear_flag) {
                    //清理老数据
                    StorageUtil_1.default.clearLocalData();
                }
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 新老版本清理回调 */
    requestVersionClear(callback) {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/clear/user_data',
            success: function (res) {
                console.log("requestVersionClear", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 用户基础数据 */
    requestUserInfoData(callback) {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/get',
            success: function (res) {
                console.log("@David 用户基础数据:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
                // CommonFun.stopWaitEffect();
                MsgMgr_1.default.Ins.showMsg("网络异常");
            }
        });
    }
    /** 请求分享开关 */
    requestShareFlag(callback) {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/flag',
            success: function (res) {
                if (res) {
                    callback && callback();
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 用户基础数据赋值 */
    requestUserBaseData(callback = null) {
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v2/user/info',
            success: function (res) {
                console.log("@David 用户基础数据赋值:", res);
                if (res) {
                    callback && callback(res);
                }
            },
            fail: function (res) {
                console.log("@David 用户基础数据赋值失败:", res);
            }
        });
    }
    //获取抽奖信息
    requestPrizeInfo(callback) {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/activity/get/roulette',
            success: function (res) {
                console.log("@David 获取抽奖信息:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 转盘抽奖 */
    requestDrawPrize(type, callback) {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v2/activity/roulette/' + type,
            success: function (res) {
                console.log("requestDrawPrize", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
                callback && callback(false);
            }
        });
    }
    /** 转盘统计 */
    requestPrizeCensus(itemId, num) {
        let dataString = 'prizeId=' + itemId + '&prizeNum=' + num;
        console.log("requestPrizeCensus:", dataString);
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/activity/roulette/log',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestPrizeCensus:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 请求世界排行数据 */
    requestWorldRankingData(callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/rank/week',
            success: function (res) {
                console.log("@David 请求世界排行数据:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 请求我的世界排行数据 */
    requestMyWorldRankData(callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/rank/my',
            success: function (res) {
                console.log("@David 请求我的世界排行数据:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 请求收益周排行数据 */
    requestIncomeRankingData(callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/rank/week',
            success: function (res) {
                console.log("@David 请求收益周排行数据:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 请求我的收益周排行数据 */
    requestMyIncomeRankData(callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/rank/my',
            success: function (res) {
                console.log("@David 请求我的收益周排行数据:", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    static get Ins() {
        if (HttpMgr._instance == null) {
            HttpMgr._instance = new HttpMgr();
        }
        return HttpMgr._instance;
    }
}
exports.default = HttpMgr;
