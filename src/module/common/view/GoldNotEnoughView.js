"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseView_1 = require("../../../core_wq/view/base/BaseView");
const LayerMgr_1 = require("../../../core_wq/layer/LayerMgr");
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const HallControl_1 = require("../../hall/HallControl");
const MathUtil_1 = require("../../../core_wq/utils/MathUtil");
const ShareMgr_1 = require("../../../core_wq/msg/ShareMgr");
const MsgMgr_1 = require("../../../core_wq/msg/MsgMgr");
/**
 * 金币不足界面
 */
class GoldNotEnoughView extends BaseView_1.default {
    constructor() {
        super(LayerMgr_1.default.Ins.subFrameLayer, layaMaxUI_1.ui.moduleView.common.GoldNotEnoughViewUI);
        this._gold = 0;
    }
    initUI() {
        super.initUI();
        let vo = HallControl_1.default.Ins.Model.getPreNewHeroData(HallControl_1.default.Ins.Model.heroLevel);
        if (vo) {
            let price = HallControl_1.default.Ins.Model.getHeroBuyPrice(vo.buyPrice, HallControl_1.default.Ins.Model.queryBuyHeroRecord(vo.id));
            this._gold = price * 0.6;
            this.ui.txt_price.text = MathUtil_1.default.unitConversion(this._gold);
        }
        let isAd = ShareMgr_1.default.Ins.isAdStage(12);
        if (isAd) {
            this.ui.txt_btn.text = "看视频领铜钱";
        }
        else {
            this.ui.txt_btn.text = "求助群友呀!";
        }
        this.ui.txt_lastTime.visible = !isAd;
        if (this.ui.txt_lastTime.visible) {
            this.ui.txt_lastTime.text = "今天剩余" + ShareMgr_1.default.Ins.getShareTimes(12) + "次";
        }
    }
    addEvents() {
        this.ui.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
    }
    removeEvents() {
        this.ui.btn_get.off(Laya.Event.CLICK, this, this.onGetReward);
    }
    onGetReward() {
        ShareMgr_1.default.Ins.showShareOrAdv((res) => {
            MsgMgr_1.default.Ins.showMsg("您获得铜钱：" + Number(this.ui.txt_price.text));
            HallControl_1.default.Ins.updateGold(this._gold, false);
        }, 12, false, true);
    }
}
exports.default = GoldNotEnoughView;
