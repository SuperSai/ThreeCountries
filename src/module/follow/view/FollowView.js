"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseView_1 = require("../../../core_wq/view/base/BaseView");
const LayerMgr_1 = require("../../../core_wq/layer/LayerMgr");
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const ViewMgr_1 = require("../../../core_wq/view/ViewMgr");
const ViewConst_1 = require("../../../core_wq/view/const/ViewConst");
const HttpMgr_1 = require("../../../core_wq/net/HttpMgr");
class FollowView extends BaseView_1.default {
    constructor() {
        super(LayerMgr_1.default.Ins.frameLayer, layaMaxUI_1.ui.moduleView.follow.FollowViewUI);
    }
    initUI() {
        super.initUI();
    }
    addEvents() {
        this.ui.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_close.on(Laya.Event.CLICK, this, this.onCloseHandler);
    }
    removeEvents() {
        this.ui.btn_get.off(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_close.off(Laya.Event.CLICK, this, this.onCloseHandler);
    }
    onGetReward() {
        HttpMgr_1.default.Ins.requestAccountRewardPrize();
    }
    onCloseHandler() {
        ViewMgr_1.default.Ins.close(ViewConst_1.default.FollowView);
    }
}
exports.default = FollowView;
