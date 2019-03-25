"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlobalData_1 = require("../../../core_wq/db/GlobalData");
const StorageUtil_1 = require("../../../core_wq/utils/StorageUtil");
class HallModel extends Laya.Script {
    constructor() {
        super();
        /** 英雄最高等级 */
        this.heroMaxLevel = 30;
        /** 英雄合成数量 */
        this.heroCount = 0;
        /** 总英雄的数量 */
        this.allHeroCount = 15;
        /** 屏幕滚动速度 */
        this.viewRollSpeep = 2;
        /** 每屏 */
        this.foregroundIndex = 0;
        /** 前景每屏宽度 */
        this.foregroundWidth = 1991; //3034
        /** 每屏 */
        this.fargroundIndex = 0;
        /** 远景每屏宽度 */
        this.fargroundWidth = 1986; //2135
        /** 滚屏(最前景) */
        this.topForegroundIndex = 0;
        /** 每屏宽度 */
        this.topForegroundWidth = 750;
        /** 启动加速x2 */
        this.userAcceValue = 1;
        /** 加速时间 */
        this.userAcceTime = 0;
        /** 当前英雄最高等级 */
        this.heroLevel = 1;
        /** 分享广告可点击次数 */
        this.shareAdTimes = {};
        /** 广告 */
        this.advert = [];
        /** 是否有视频广告 */
        this.hasVideoAd = true;
        /** 每日元宝加速次数 */
        this.diamond_acce_num = 0;
        /** 加速剩余时间 */
        this.s_acceLeft_time = 's_acceLeft_time';
        /** 层次重拍 */
        this.is_reset_zorder = false;
        /************************红点系列 start************************/
        /** 分享礼包红点 */
        this.showShareGiftRedPoint = false;
        /** 每日签到红点 */
        this.showDailySignRedPoint = false;
        /** 任务红点 */
        this.showTaskRedPoint = false;
        /** 转盘红点 */
        this.showLuckPrizeRedPoint = false;
        /** 关注奖励红点 */
        this.showFollowRedPoint = false;
        /************************红点系列 end************************/
        /** 所有的英雄信息 { id: index, heroId: 0, isRunning: false } */
        this._allHeros = [];
        /** 购买英雄记录  {heroId: 1, buyTimes:0}*/
        this._buyHerosRecord = [];
        /**
         * 英雄初始消费价格
         * 1、一级英雄单个钻石定价为：36
         * 2、英雄成本递增为上一级的1.3，购买次数递增为上一级的一点1.18，车（钻石价）=36*1.3^（n-1）
         */
        this._heroBaseDiamondPrice = 36;
        //初始化英雄信息
        if (this._allHeros.length < 1) {
            for (let index = 0; index < this.allHeroCount; index++) {
                this._allHeros.push({ id: index, heroId: 0, isRunning: false });
            }
        }
    }
    /** 获取当前可以招募英雄的数据 */
    getRecruitHeroData() {
        let heroDatas = GlobalData_1.default.getDataByCondition(GlobalData_1.default.HeroConfigVO, (data) => {
            return this.heroLevel >= data.unlockNeedId;
        });
        if (heroDatas && heroDatas.length > 0) {
            return heroDatas[heroDatas.length - 1];
        }
        return null;
    }
    /** 获取最新开锁(可购买)的前n位英雄的配置 */
    getPreNewHeroData(unlockCarId, index = 0) {
        let heroData = GlobalData_1.default.getAllValue(GlobalData_1.default.HeroConfigVO);
        if (heroData) {
            for (var key in heroData) {
                if (heroData.hasOwnProperty(key)) {
                    var element = heroData[key];
                    if (unlockCarId < element.unlockNeedId) {
                        let heroId = parseInt(key) + index;
                        return GlobalData_1.default.getData(GlobalData_1.default.HeroConfigVO, heroId);
                    }
                }
            }
        }
        return null;
    }
    /** 购买单个英雄价格 */
    getHeroBuyPrice(price, buyTimes) {
        if (buyTimes > 0) {
            return price * Math.pow(1.15, buyTimes);
        }
        return price;
    }
    /** 查询购买英雄记录 */
    queryBuyHeroRecord(heroId, isDiamond = false) {
        for (let key in this._buyHerosRecord) {
            let element = this._buyHerosRecord[key];
            if (element) {
                if (element.heroId == heroId) {
                    if (isDiamond) {
                        return this._buyHerosRecord[key].diamondBuyTimes;
                    }
                    else {
                        return this._buyHerosRecord[key].buyTimes;
                    }
                }
            }
        }
        return 0;
    }
    /** 刷新购买英雄记录 */
    refreshBuyHeroRecord(heroId, isDiamond = false) {
        let isNew = true;
        for (let key in this._buyHerosRecord) {
            let element = this._buyHerosRecord[key];
            if (element && element.heroId == heroId) {
                if (isDiamond) {
                    this._buyHerosRecord[key].diamondBuyTimes++;
                }
                else {
                    this._buyHerosRecord[key].buyTimes++;
                }
                isNew = false;
                return;
            }
        }
        if (isNew) {
            if (isDiamond) {
                this._buyHerosRecord.push({ heroId: heroId, buyTimes: 0, diamondBuyTimes: 1 });
            }
            else {
                this._buyHerosRecord.push({ heroId: heroId, buyTimes: 1, diamondBuyTimes: 0 });
            }
        }
        Laya.timer.callLater(this, StorageUtil_1.default.saveStorageToLocal, [true]);
    }
    /** 每日元宝加速次数 */
    diamondAcceTimes(isAdd = false) {
        let diamondAcceTimes = this.diamond_acce_num;
        if (isAdd) {
            this.diamond_acce_num++;
        }
        return diamondAcceTimes;
    }
    /** 钻石购买英雄的价格 */
    getDiamondBuyHeroPrice(heroId, buyTimes) {
        if (heroId < 1)
            return this._heroBaseDiamondPrice;
        var heroPrice = this._heroBaseDiamondPrice;
        var foreCarId = 20;
        if (heroId > foreCarId) {
            heroPrice = heroPrice * Math.pow(1.085, (foreCarId - 1)) * Math.pow(1.25, (heroId - foreCarId));
        }
        else {
            heroPrice = heroPrice * Math.pow(1.085, (heroId - 1));
        }
        if (buyTimes > 0) {
            heroPrice = heroPrice * Math.pow(1.2, buyTimes);
        }
        heroPrice = Math.ceil(heroPrice); //四舍五入
        return heroPrice;
    }
    /** 计算英雄总资产（基础价格） */
    heroAllAsset() {
        let allAsset = 0;
        if (this._allHeros && this._allHeros.length > 0) {
            this._allHeros.forEach(element => {
                if (element && element.heroId > 0) {
                    let vo = GlobalData_1.default.getData(GlobalData_1.default.HeroConfigVO, element.heroId);
                    if (vo) {
                        allAsset += this.getHeroBuyPrice(vo.buyPrice, this.queryBuyHeroRecord(vo.id));
                    }
                }
            });
        }
        return allAsset;
    }
    set AllHeros(value) { this._allHeros = value; }
    get AllHeros() { return this._allHeros; }
    set BuyHerosRecord(value) { this._buyHerosRecord = value; }
    /** 购买英雄记录  {heroId: 1, buyTimes:0} */
    get BuyHerosRecord() { return this._buyHerosRecord; }
}
exports.default = HallModel;
