"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpMgr_1 = require("../net/HttpMgr");
const HttpRequestHelper_1 = require("../net/HttpRequestHelper");
const PathConfig_1 = require("../config/PathConfig");
const PlayerMgr_1 = require("../player/PlayerMgr");
const HallControl_1 = require("../../module/hall/HallControl");
const MathUtil_1 = require("./MathUtil");
const ShareMgr_1 = require("../msg/ShareMgr");
const EventsMgr_1 = require("../event/EventsMgr");
const EventType_1 = require("../event/EventType");
const TimeUtil_1 = require("./TimeUtil");
const GuideMgr_1 = require("../guide/GuideMgr");
const AppConfig_1 = require("../config/AppConfig");
/**
 * 缓存工具
 */
class StorageUtil extends Laya.Script {
    constructor() { super(); }
    /** 新老版本更新检测（防止老数据覆盖） */
    static versionCheck(callback) {
        let that = this;
        if (AppConfig_1.default.isDebug) {
            callback && callback();
            return;
        }
        let storage = window.localStorage;
        HttpMgr_1.default.Ins.requestVersionCheck((_res) => {
            if (_res && _res.clear_flag) {
                //清理老数据
                storage.setItem(that.s_version_clear, 'true');
            }
        });
        //上一次记录清理
        let dataJson = storage.getItem(that.s_version_clear);
        if (dataJson) {
            //需要清理数据
            HttpMgr_1.default.Ins.requestVersionClear((_res) => {
                storage.removeItem(that.s_version_clear);
                that.clearLocalData();
                callback && callback();
            });
        }
        else {
            callback && callback();
        }
    }
    /** 保存缓存到本地 */
    static saveStorageToLocal(upload = false) {
        if (StorageUtil._isLoadStorage == false) {
            console.log("@David 未同步本地/服务器数据");
            return;
        }
        else if (HallControl_1.default.Ins.IsGuide) {
            return;
        }
        let localData = {};
        localData["userGold"] = PlayerMgr_1.default.Ins.Info.userGold;
        localData["userLevel"] = PlayerMgr_1.default.Ins.Info.userLevel;
        localData["userId"] = PlayerMgr_1.default.Ins.Info.userId;
        localData["userExp"] = PlayerMgr_1.default.Ins.Info.userExp;
        localData["AllHeros"] = HallControl_1.default.Ins.Model.AllHeros;
        localData["BuyHerosRecord"] = HallControl_1.default.Ins.Model.BuyHerosRecord;
        localData["AllHeros"] = HallControl_1.default.Ins.Model.AllHeros;
        localData["heroLevel"] = HallControl_1.default.Ins.Model.heroLevel;
        localData["heroCount"] = HallControl_1.default.Ins.Model.heroCount;
        localData["guideStep"] = GuideMgr_1.default.Ins.guideStep;
        let dataJson = JSON.stringify(localData);
        if (dataJson) {
            let storage = window.localStorage;
            storage.setItem(StorageUtil.storage_user, dataJson);
        }
        if (upload) {
            StorageUtil.requestSaveHerosData();
            StorageUtil.requestSaveHeroShopData();
            StorageUtil.requestSaveUserInfoData();
        }
    }
    /** 取出本地数据 */
    static loadStorage(callback) {
        StorageUtil._isLoadStorage = true;
        let storage = window.localStorage;
        let dataJson = storage.getItem(StorageUtil.storage_user);
        if (dataJson) {
            let jsonObj = JSON.parse(dataJson);
            if (jsonObj) {
                PlayerMgr_1.default.Ins.Info.userGold = jsonObj["userGold"];
                PlayerMgr_1.default.Ins.Info.userLevel = jsonObj["userLevel"];
                PlayerMgr_1.default.Ins.Info.userId = jsonObj["userId"];
                PlayerMgr_1.default.Ins.Info.userExp = jsonObj["userExp"];
                HallControl_1.default.Ins.Model.AllHeros = jsonObj["AllHeros"];
                HallControl_1.default.Ins.Model.BuyHerosRecord = jsonObj["BuyHerosRecord"];
                HallControl_1.default.Ins.Model.heroLevel = jsonObj["heroLevel"];
                HallControl_1.default.Ins.Model.heroCount = jsonObj["heroCount"];
                GuideMgr_1.default.Ins.guideStep = jsonObj["guideStep"];
            }
            callback && callback(true);
        }
        else {
            if (Laya.Browser.onPC) {
                callback && callback(true);
                return;
            }
            //从服务器同步数据
            let serverDataProgress = 3;
            HttpMgr_1.default.Ins.requestCarparkData((res) => {
                HallControl_1.default.Ins.Model.AllHeros = res;
                serverDataProgress--;
                if (serverDataProgress < 1) {
                    callback && callback(true);
                }
            });
            HttpMgr_1.default.Ins.requestCarshopData((res) => {
                serverDataProgress--;
                HallControl_1.default.Ins.Model.BuyHerosRecord = res;
                if (serverDataProgress < 1) {
                    callback && callback(true);
                }
            });
            HttpMgr_1.default.Ins.requestUserInfoData((res) => {
                if (res) {
                    PlayerMgr_1.default.Ins.Info.userId = res.id;
                    PlayerMgr_1.default.Ins.Info.userGold = MathUtil_1.default.parseStringNum(res.money);
                    PlayerMgr_1.default.Ins.Info.userDiamond = MathUtil_1.default.parseStringNum(res.diamond);
                    PlayerMgr_1.default.Ins.Info.userLevel = MathUtil_1.default.parseInt(res.level);
                    PlayerMgr_1.default.Ins.Info.userExp = MathUtil_1.default.parseStringNum(res.exp);
                    HallControl_1.default.Ins.Model.heroLevel = MathUtil_1.default.parseInt(res.car_level);
                    // GuideMgr.Ins.guideStep = MathUtil.parseInt(res.guideStep);
                }
                serverDataProgress--;
                if (serverDataProgress < 1) {
                    callback && callback(true);
                }
            });
            //超时尝试重新请求
            Laya.stage.timerOnce(12000, this, () => {
                console.log("@David 超时尝试重新请求:", serverDataProgress);
                if (serverDataProgress > 0) {
                    StorageUtil.loadStorage(callback);
                }
            });
        }
        //请求分享开关
        HttpMgr_1.default.Ins.requestShareFlag((res) => {
            ShareMgr_1.default.Ins.shareSwitchOpen = res;
        });
        HttpMgr_1.default.Ins.requestUserBaseData((res) => {
            let model = HallControl_1.default.Ins.Model;
            if (model) {
                model.shareAdTimes = res.operation;
                model.showShareGiftRedPoint = res.share_reward_flag;
                model.showDailySignRedPoint = res.sign_flag;
                model.showTaskRedPoint = res.task_flag;
                model.showLuckPrizeRedPoint = res.roulette_flag;
                model.showFollowRedPoint = res.follow_flag;
                model.advert = res.advert;
                model.diamond_acce_num = res.diamond_acce_num;
            }
        });
    }
    static isLoadStorage() {
        return this._isLoadStorage;
    }
    /** 英雄数据 */
    static requestSaveHerosData() {
        let self = this;
        let dataJson = JSON.stringify(HallControl_1.default.Ins.Model.AllHeros);
        //非法数据过滤
        if (dataJson == null || dataJson.length < 1 || HallControl_1.default.Ins.Model.AllHeros.length < 1) {
            return;
        }
        else if (self.carparkJsonRecord == dataJson) {
            console.log("carparkJsonRecord数据未刷新");
            return;
        }
        self.carparkJsonRecord = dataJson;
        let dataString = 'info=' + dataJson;
        console.log("requestSaveCarparkData:", dataString);
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/seat/post',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestSaveCarparkData2:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 英雄商店数据 */
    static requestSaveHeroShopData() {
        let dataJson = JSON.stringify(HallControl_1.default.Ins.Model.BuyHerosRecord);
        //非法数据过滤
        if (dataJson == null || dataJson.length < 1 || HallControl_1.default.Ins.Model.BuyHerosRecord.length < 1) {
            return;
        }
        else if (this.carshopJsonRecord == dataJson) {
            console.log("carshopJsonRecord数据未刷新");
            return;
        }
        this.carshopJsonRecord = dataJson;
        let dataString = 'info=' + dataJson;
        console.log("requestSaveCarshopData:", dataString);
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/shop/post',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestSaveCarshopData2:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 保存用户信息金币 */
    static requestSaveUserInfoData() {
        let dataString = 'money=' + PlayerMgr_1.default.Ins.Info.userGold +
            '&car_level=' + HallControl_1.default.Ins.Model.heroLevel +
            '&level=' + PlayerMgr_1.default.Ins.Info.userLevel +
            '&exp=' + PlayerMgr_1.default.Ins.Info.userExp +
            '&asset=' + Math.floor(PlayerMgr_1.default.Ins.Info.userGold + HallControl_1.default.Ins.Model.heroAllAsset());
        console.log("@David 保存用户信息金币:", dataString);
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/post',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("@David 保存用户信息金币:", res);
            },
            fail: function (res) {
                console.log("@David 保存用户信息金币错误:", res);
            }
        });
    }
    /** 保存加速剩余时间 */
    static saveAcceLeftTime(_acceLeftTime) {
        let storage = window.localStorage;
        if (_acceLeftTime > 0) {
            storage.setItem(HallControl_1.default.Ins.Model.s_acceLeft_time, _acceLeftTime.toString());
        }
        else {
            storage.removeItem(HallControl_1.default.Ins.Model.s_acceLeft_time);
        }
    }
    /** 获取加速剩余时间 */
    static getAcceLeftTime() {
        let storage = window.localStorage;
        let dataJson = storage.getItem(HallControl_1.default.Ins.Model.s_acceLeft_time);
        if (dataJson) {
            let acceLeftTime = MathUtil_1.default.parseInt(dataJson);
            storage.removeItem(HallControl_1.default.Ins.Model.s_acceLeft_time);
            return acceLeftTime;
        }
        return 0;
    }
    /** 缓存单个英雄 */
    static saveHeroStore(heroId) {
        if (heroId < 1)
            return;
        let heroAry = [];
        let storage = window.localStorage;
        let dataJson = storage.getItem(this.hero_store_key);
        if (dataJson) {
            let jsonObj = JSON.parse(dataJson);
            if (jsonObj) {
                heroAry = jsonObj;
            }
        }
        if (heroAry) {
            heroAry.push(heroId);
            let dataJson = JSON.stringify(heroAry);
            if (dataJson) {
                storage.setItem(this.hero_store_key, dataJson);
            }
        }
        EventsMgr_1.default.Ins.dispatch(EventType_1.default.HERO_BOX);
    }
    /** 取出缓存英雄 */
    static popHeroStore(isRemove = false) {
        let storage = window.localStorage;
        let dataJson = storage.getItem(this.hero_store_key);
        if (dataJson) {
            let jsonObj = JSON.parse(dataJson);
            if (jsonObj) {
                let carId = jsonObj.shift();
                //保存移除
                if (isRemove) {
                    let dataJson = JSON.stringify(jsonObj);
                    if (dataJson) {
                        storage.setItem(this.hero_store_key, dataJson);
                    }
                }
                if (carId) {
                    return carId;
                }
            }
        }
        return 0;
    }
    /** 离线奖励 */
    static offlinePrize() {
        let that = this;
        let storage = window.localStorage;
        let dataJson = storage.getItem(that.s_offlinePrize_time);
        let offlineTime = MathUtil_1.default.parseInt(dataJson);
        if (offlineTime > 0) {
            storage.removeItem(that.s_offlinePrize_time);
        }
        return offlineTime;
    }
    /** 查询离线奖励 */
    static requestOfflinePrizeData() {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper_1.default(PathConfig_1.default.AppUrl);
        HttpReqHelper.request({
            url: 'v1/login',
            success: function (res) {
                console.log("@David 查询离线奖励:", res);
                let offlineTime = MathUtil_1.default.parseInt(res.time); //离线时长
                let login_time = MathUtil_1.default.parseInt(res.login_time); //登录当前服务器时间
                let cur_time = (new Date()).getTime() / 1000;
                TimeUtil_1.default.cs_time_diff = login_time - cur_time;
                let storage = window.localStorage;
                let dataJson = storage.getItem(that.s_offline_time);
                console.log("读取本地离线:", dataJson);
                if (dataJson) {
                    offlineTime = 0;
                    let last_logout_time = MathUtil_1.default.parseInt(dataJson); //上次离线时间
                    console.log(login_time, cur_time, last_logout_time, (login_time - last_logout_time), TimeUtil_1.default.cs_time_diff);
                    if (!isNaN(last_logout_time) && login_time > last_logout_time) {
                        offlineTime = login_time - last_logout_time;
                    }
                    storage.removeItem(that.s_offline_time);
                }
                console.log("离线奖励:", offlineTime);
                if (offlineTime > 0) {
                    storage.setItem(that.s_offlinePrize_time, offlineTime.toString());
                    EventsMgr_1.default.Ins.dispatch(EventType_1.default.SHOW_OFFLINE_REWARD);
                }
                HttpMgr_1.default.Ins.requestNotifyServerPrize();
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    //保存离线时间
    static saveOfflineTime() {
        let that = this;
        let storage = window.localStorage;
        let offlineServerTime = TimeUtil_1.default.serverTime();
        storage.setItem(that.s_offline_time, offlineServerTime.toString());
    }
    /** 移除缓存数据 */
    static clearLocalData() {
        let storage = window.localStorage;
        if (storage) {
            storage.removeItem(this.storage_user_old);
            storage.removeItem(this.storage_user);
        }
    }
}
StorageUtil.storage_user_old = 'user_data'; //保存本地v1.0
StorageUtil.storage_user = 'user_data_111'; //保存本地
StorageUtil.hero_store_key = "car_store_key"; //本地保存兵营车辆
StorageUtil.s_version_clear = 's_version_clear'; //版本清理
StorageUtil.s_offlinePrize_time = 's_offlinePrize_time'; //离线奖励时间
StorageUtil.s_offline_time = 's_offline_time'; //离线服务器时间
StorageUtil._isLoadStorage = false; //是否已加载本地数据
StorageUtil.carparkJsonRecord = ''; //防止提交相同数据给服务器
StorageUtil.carshopJsonRecord = ''; //防止提交相同数据给服务器
exports.default = StorageUtil;
