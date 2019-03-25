"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HallControl_1 = require("../../module/hall/HallControl");
const MathUtil_1 = require("../utils/MathUtil");
const HttpMgr_1 = require("../net/HttpMgr");
const MsgMgr_1 = require("./MsgMgr");
const PlayerMgr_1 = require("../player/PlayerMgr");
const EventsMgr_1 = require("../event/EventsMgr");
const EventType_1 = require("../event/EventType");
const SDKMgr_1 = require("./SDKMgr");
const AppConfig_1 = require("../config/AppConfig");
class ShareMgr extends Laya.Script {
    constructor() {
        super();
        this._shareFailedTimes = 0; //分享失败保底
        this._isOpenShareAd = false; //打开视频分享
        this.shareSwitchOpen = false; //分享开关打开
        this._model = HallControl_1.default.Ins.Model;
    }
    /** 请求分享/视频 */
    showShareOrAdv(callback = null, type = 0, isTask = false, isGroupShare = false) {
        if (AppConfig_1.default.isDebug) {
            callback && callback();
            return;
        }
        if (this._isOpenShareAd) {
            return 0;
        }
        this._isOpenShareAd = true;
        Laya.stage.timerOnce(1000, this, () => {
            this._isOpenShareAd = false;
        });
        //是否优先视频广告
        if (this.getAdTimes(type) > 0) {
            SDKMgr_1.default.Ins.showVideoAd((_res) => {
                if (_res && _res.isEnded || _res === undefined) {
                    this.decreAdTimes(type);
                    let adKey = "ad";
                    if (type == 10) {
                        adKey = "ad_acce";
                    }
                    else if (type == 11) {
                        adKey = "ad_free_car";
                    }
                    else if (type == 12) {
                        adKey = "ad_no_money";
                    }
                    HttpMgr_1.default.Ins.requestShareAdFinish(adKey);
                    callback && callback();
                }
            }, () => {
                //无视频回调
                this._model.hasVideoAd = false;
                this._isOpenShareAd = false;
                this.showShareOrAdv(callback, type, isTask, isGroupShare);
            }, this.isShareEnable);
            return 0;
        }
        switch (type) {
            case 1: //广告无限次数
                SDKMgr_1.default.Ins.showVideoAd((_res) => {
                    if (_res && _res.isEnded || _res === undefined) {
                        callback && callback();
                        HttpMgr_1.default.Ins.requestShareAdFinish("ad_other", _res);
                    }
                }, () => {
                    //无视频回调
                    this._model.hasVideoAd = false;
                    this._isOpenShareAd = false;
                    this.showShareOrAdv(callback, 0, isTask, isGroupShare);
                });
                break;
            case 10: //加速
                if (this.getShareTimes(type) < 1) {
                    MsgMgr_1.default.Ins.showMsg("今日分享次数已用完");
                    return 1;
                }
                this.toShare((_res) => {
                    this.decreShareTimes(type);
                    HttpMgr_1.default.Ins.requestShareAdFinish("share_acce", _res);
                    callback && callback();
                }, isTask, isGroupShare);
                break;
            case 11: //免费的车
                if (this.getShareTimes(type) < 1) {
                    MsgMgr_1.default.Ins.showMsg("今日分享次数已用完");
                    return 1;
                }
                this.toShare((_res) => {
                    this.decreShareTimes(type);
                    HttpMgr_1.default.Ins.requestShareAdFinish("share_free_car", _res);
                    callback && callback();
                }, isTask, isGroupShare);
                break;
            case 12: //无金币
                if (this.getShareTimes(type) < 1) {
                    MsgMgr_1.default.Ins.showMsg("今日分享次数已用完");
                    return 1;
                }
                this.toShare((_res) => {
                    MsgMgr_1.default.Ins.showMsg("求助已发出");
                    Laya.timer.once(30000, this, () => {
                        callback && callback();
                    });
                    this.decreShareTimes(type);
                    HttpMgr_1.default.Ins.requestShareAdFinish("share_no_money", _res);
                }, isTask, isGroupShare);
                break;
            default: //分享无限次数
                this.toShare((_res) => {
                    callback && callback();
                    HttpMgr_1.default.Ins.requestShareAdFinish("share_other", _res);
                }, isTask, isGroupShare);
                break;
        }
        return 0;
    }
    /** 分享广告可点击次数 */
    getAdTimes(type) {
        if (this._model && this._model.shareAdTimes && this._model.hasVideoAd) {
            if (type == 10) {
                return MathUtil_1.default.parseInt(this._model.shareAdTimes.ad_acce_num);
            }
            else if (type == 11) {
                return MathUtil_1.default.parseInt(this._model.shareAdTimes.ad_free_car_num);
            }
            else if (type == 12) {
                return MathUtil_1.default.parseInt(this._model.shareAdTimes.ad_no_money_num);
            }
        }
        return 0;
    }
    /** 分享剩余次数 */
    getShareTimes(type) {
        if (this._model && this._model.shareAdTimes) {
            if (type == 10) {
                return MathUtil_1.default.parseInt(this._model.shareAdTimes.share_acce_num);
            }
            else if (type == 11) {
                return MathUtil_1.default.parseInt(this._model.shareAdTimes.share_free_car_num);
            }
            else if (type == 12) {
                return MathUtil_1.default.parseInt(this._model.shareAdTimes.share_no_money_num);
            }
        }
        return 0;
    }
    /** 减少分享广告可点击次数 */
    decreAdTimes(type) {
        if (this._model && this._model.shareAdTimes) {
            if (type == 10) {
                this._model.shareAdTimes.ad_acce_num--;
            }
            else if (type == 11) {
                this._model.shareAdTimes.ad_free_car_num--;
            }
            else if (type == 12) {
                this._model.shareAdTimes.ad_no_money_num--;
            }
            else {
                this._model.shareAdTimes.ad_num--;
            }
        }
        console.log("@David 减少分享广告可点击次数:", this._model.shareAdTimes);
    }
    /** 减少分享可点击次数 */
    decreShareTimes(type) {
        if (this._model.shareAdTimes) {
            if (type == 10) {
                this._model.shareAdTimes.share_acce_num--;
            }
            else if (type == 11) {
                this._model.shareAdTimes.share_free_car_num--;
            }
            else if (type == 12) {
                this._model.shareAdTimes.share_no_money_num--;
            }
        }
        console.log("@David 减少分享可点击次数:", this._model.shareAdTimes);
    }
    /** 分享或广告开关 */
    isAdStage(type) {
        return (this.getAdTimes(type) > 0);
    }
    //请求分享
    toShare(callback = null, isTask = false, isGroupShare = false) {
        HttpMgr_1.default.Ins.requestShareSubject((_res) => {
            if (!_res) {
                MsgMgr_1.default.Ins.showMsg("今日分享次数已用完");
                return;
            }
            let shareCfg = { imageUrl: _res.image, content: _res.describe, id: _res.id };
            let queryData = null;
            if (isTask) {
                queryData = "userId=" + PlayerMgr_1.default.Ins.Info.userId + "&shareId=" + shareCfg.id + "&shareType=task";
            }
            else {
                queryData = "userId=" + PlayerMgr_1.default.Ins.Info.userId + "&shareId=" + shareCfg.id + "&shareType=share";
            }
            //重返游戏
            let curTime = (new Date()).getTime() / 1000;
            let isAutoShare = true;
            EventsMgr_1.default.Ins.addListener(EventType_1.default.COME_BACK_GAME, (data) => {
                let backTime = (new Date()).getTime() / 1000;
                let leaveTime = backTime - curTime;
                if (isAutoShare && leaveTime > 2.3) {
                    if (this._shareFailedTimes > 1 || Math.random() > 0.5) {
                        this._shareFailedTimes = 0;
                        callback && callback(shareCfg.id);
                        HttpMgr_1.default.Ins.requestShareFinish(shareCfg.id);
                    }
                    else {
                        this._shareFailedTimes++;
                        MsgMgr_1.default.Ins.showMsg("分享失败，请尝试重新分享");
                    }
                }
            }, this);
            SDKMgr_1.default.Ins.wxOnShare({
                title: shareCfg.content,
                imageUrl: shareCfg.imageUrl,
                query: queryData,
                isGroupShare: isGroupShare,
                success: function (_res) {
                },
                fail: function () {
                    console.log("转发失败!!!");
                }
            });
        });
    }
    get isShareEnable() {
        return this.shareSwitchOpen;
    }
    static get Ins() {
        if (ShareMgr._instance == null) {
            ShareMgr._instance = new ShareMgr();
        }
        return ShareMgr._instance;
    }
}
exports.default = ShareMgr;
