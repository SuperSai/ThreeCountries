"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseView_1 = require("../../../core_wq/view/base/BaseView");
const LayerMgr_1 = require("../../../core_wq/layer/LayerMgr");
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const HallControl_1 = require("../../hall/HallControl");
const MathUtil_1 = require("../../../core_wq/utils/MathUtil");
const PlayerMgr_1 = require("../../../core_wq/player/PlayerMgr");
const HttpMgr_1 = require("../../../core_wq/net/HttpMgr");
const MsgMgr_1 = require("../../../core_wq/msg/MsgMgr");
const GlobalData_1 = require("../../../core_wq/db/GlobalData");
class DiamondBuyView extends BaseView_1.default {
    constructor() {
        super(LayerMgr_1.default.Ins.subFrameLayer, layaMaxUI_1.ui.moduleView.common.DiamondBuyViewUI);
        this._price = 0;
    }
    initData() {
        super.initData();
        this._data = this.datas[0];
        if (this._data) {
            if (this._data.type == "hero") {
                this._heroConfig = GlobalData_1.default.getData(GlobalData_1.default.HeroConfigVO, this._data.value);
                this._price = HallControl_1.default.Ins.Model.getDiamondBuyHeroPrice(this._data.value, HallControl_1.default.Ins.Model.queryBuyHeroRecord(this._data.value, true));
                this.ui.txt_diamond.text = MathUtil_1.default.unitConversion(this._price);
                if (this._heroConfig) {
                    this.ui.txt_title.text = "购买" + this._heroConfig.name;
                }
            }
        }
    }
    addEvents() {
        this.ui.btn_buy.on(Laya.Event.CLICK, this, this.onBuyHandler);
    }
    removeEvents() {
        this.ui.btn_buy.off(Laya.Event.CLICK, this, this.onBuyHandler);
    }
    onBuyHandler() {
        if (this._data.type == "hero") {
            this.buyHeroHandler();
        }
    }
    buyHeroHandler() {
        let heroPriceInt = Math.floor(this._price);
        if (PlayerMgr_1.default.Ins.Info.userDiamond >= heroPriceInt) {
            HttpMgr_1.default.Ins.requestDiamondBuyOrder(heroPriceInt, (res) => {
                if (res) {
                    if (HallControl_1.default.Ins.createHero(this._data.value) == null)
                        return;
                    HttpMgr_1.default.Ins.requestDiamondBuy(res.order_id, (_res) => {
                        if (this._heroConfig) {
                            MsgMgr_1.default.Ins.showMsg("武将购买成功：" + this._heroConfig.name + "x1");
                        }
                        else {
                            MsgMgr_1.default.Ins.showMsg("武将购买成功");
                        }
                        HttpMgr_1.default.Ins.requestDiamondData();
                        //刷新消费记录
                        HallControl_1.default.Ins.Model.refreshBuyHeroRecord(this._data.value, true);
                    });
                }
                else {
                    MsgMgr_1.default.Ins.showMsg("购买失败");
                }
            });
        }
        else {
            MsgMgr_1.default.Ins.showMsg("元宝不足,做任务领元宝噢!");
        }
    }
}
exports.default = DiamondBuyView;
