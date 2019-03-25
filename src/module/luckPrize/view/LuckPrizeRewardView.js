"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseView_1 = require("../../../core_wq/view/base/BaseView");
const LayerMgr_1 = require("../../../core_wq/layer/LayerMgr");
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const HallControl_1 = require("../../hall/HallControl");
const GlobalData_1 = require("../../../core_wq/db/GlobalData");
const MathUtil_1 = require("../../../core_wq/utils/MathUtil");
const HttpMgr_1 = require("../../../core_wq/net/HttpMgr");
const EventsMgr_1 = require("../../../core_wq/event/EventsMgr");
const EventType_1 = require("../../../core_wq/event/EventType");
const PathConfig_1 = require("../../../core_wq/config/PathConfig");
const StorageUtil_1 = require("../../../core_wq/utils/StorageUtil");
const MsgMgr_1 = require("../../../core_wq/msg/MsgMgr");
class LuckPrizeRewardView extends BaseView_1.default {
    constructor() {
        super(LayerMgr_1.default.Ins.subFrameLayer, layaMaxUI_1.ui.moduleView.luckPrize.LuckPrizeRewardViewUI);
        this.rewards = [
            { id: 1, name: "大量铜钱", num: 1, imgUrl: "images/lottery/luck_prize_4.png" },
            { id: 2, name: "大量元宝", num: 488, imgUrl: "images/lottery/luck_prize_6.png" },
            { id: 3, name: "双倍加速", num: 1, imgUrl: "images/lottery/luck_prize_2.png" },
            { id: 4, name: "高级宝箱", num: 1, imgUrl: "images/lottery/luck_prize_3.png" },
            { id: 5, name: "再来一次", num: 1, imgUrl: "images/lottery/luck_prize_0.png" },
            { id: 6, name: "腾讯季卡", num: 1, imgUrl: "images/lottery/luck_prize_5.png" },
            { id: 7, name: "超多铜钱", num: 1, imgUrl: "images/lottery/luck_prize_1.png" },
            { id: 8, name: "游戏T恤", num: 1, imgUrl: "images/lottery/luck_prize_7.png" }
        ]; //奖励物品列表
        this._itemId = 0;
    }
    initData() {
        super.initData();
        this._itemId = this.datas[0];
        if (this._itemId > 0) {
            let itemData = this.rewards[this._itemId - 1];
            this.ui.imgIcon.skin = itemData.imgUrl;
            if (this._itemId == 1 || this._itemId == 7) { //金币
                let vo = GlobalData_1.default.getData(GlobalData_1.default.HeroConfigVO, HallControl_1.default.Ins.Model.heroLevel);
                let heroPrice = 0;
                if (vo) {
                    heroPrice = HallControl_1.default.Ins.Model.getHeroBuyPrice(vo.buyPrice, HallControl_1.default.Ins.Model.queryBuyHeroRecord(vo.id));
                    if (this._itemId == 7) { //超多铜钱
                        heroPrice = heroPrice * 0.6;
                    }
                    else { //大量铜钱
                        heroPrice = heroPrice * 0.2;
                    }
                }
                this.ui.txt_name.text = "获得：" + itemData.name + "x" + MathUtil_1.default.unitConversion(heroPrice);
                HallControl_1.default.Ins.updateGold(heroPrice, false);
                HttpMgr_1.default.Ins.requestPrizeCensus(this._itemId, heroPrice);
            }
            else if (this._itemId == 2) { //钻石
                this.ui.txt_name.text = "获得：" + itemData.name + "x" + itemData.num;
                HttpMgr_1.default.Ins.requestDiamondData();
                HttpMgr_1.default.Ins.requestPrizeCensus(this._itemId, itemData.num);
            }
            else if (this._itemId == 3) { //双倍加速
                this.ui.txt_name.text = "获得：" + itemData.name + "x" + itemData.num;
                EventsMgr_1.default.Ins.dispatch(EventType_1.default.GAME_ACCE_START, 90);
                HttpMgr_1.default.Ins.requestPrizeCensus(this._itemId, itemData.num);
            }
            else if (this._itemId == 4) { //高级宝箱 获得英雄
                let heroVO = HallControl_1.default.Ins.Model.getPreNewHeroData(HallControl_1.default.Ins.Model.heroLevel, 1);
                if (heroVO) {
                    let vo = GlobalData_1.default.getData(GlobalData_1.default.HeroVO, heroVO.id);
                    if (vo) {
                        this.ui.imgIcon.skin = PathConfig_1.default.HEAD_PATH + vo.imgUrl;
                        this.ui.txt_name.text = "获得：" + heroVO.name + "x" + itemData.num;
                        let hero = HallControl_1.default.Ins.createHero(heroVO.id, true);
                        if (hero == null) {
                            StorageUtil_1.default.saveHeroStore(heroVO.id);
                            MsgMgr_1.default.Ins.showMsg("主人,武将已打包到箱子里了哦~记得点击箱子喲!");
                        }
                    }
                }
                HttpMgr_1.default.Ins.requestPrizeCensus(this._itemId, heroVO.id);
            }
            else {
                this.ui.txt_name.text = "获得：" + itemData.name + "(免费)";
                this.callback && this.callback(true);
                HttpMgr_1.default.Ins.requestPrizeCensus(this._itemId, itemData.num);
            }
        }
    }
}
exports.default = LuckPrizeRewardView;
