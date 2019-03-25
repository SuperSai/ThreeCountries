"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseView_1 = require("../../../core_wq/view/base/BaseView");
const LayerMgr_1 = require("../../../core_wq/layer/LayerMgr");
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const MathUtil_1 = require("../../../core_wq/utils/MathUtil");
const ShareMgr_1 = require("../../../core_wq/msg/ShareMgr");
const MsgMgr_1 = require("../../../core_wq/msg/MsgMgr");
const HallControl_1 = require("../../hall/HallControl");
/**
 * 离线奖励界面
 */
class OffLineRewardView extends BaseView_1.default {
    constructor() {
        super(LayerMgr_1.default.Ins.subFrameLayer, layaMaxUI_1.ui.moduleView.common.OffLineRewardViewUI);
        this._gold = 0;
    }
    initData() {
        super.initData();
        this._gold = this.datas[0];
        this.ui.txt_gold.text = MathUtil_1.default.unitConversion(this._gold);
    }
    addEvents() {
        this.ui.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
    }
    removeEvents() {
        this.ui.btn_get.off(Laya.Event.CLICK, this, this.onGetReward);
    }
    onGetReward() {
        ShareMgr_1.default.Ins.showShareOrAdv(() => {
            MsgMgr_1.default.Ins.showMsg("您获得铜钱：" + MathUtil_1.default.unitConversion(this._gold));
            HallControl_1.default.Ins.updateGold(this._gold, false);
        }, 1);
    }
}
exports.default = OffLineRewardView;
