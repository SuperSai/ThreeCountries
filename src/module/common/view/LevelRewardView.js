"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseView_1 = require("../../../core_wq/view/base/BaseView");
const LayerMgr_1 = require("../../../core_wq/layer/LayerMgr");
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const PlayerMgr_1 = require("../../../core_wq/player/PlayerMgr");
const MathUtil_1 = require("../../../core_wq/utils/MathUtil");
const HallControl_1 = require("../../hall/HallControl");
const EventsMgr_1 = require("../../../core_wq/event/EventsMgr");
const EventType_1 = require("../../../core_wq/event/EventType");
const ViewMgr_1 = require("../../../core_wq/view/ViewMgr");
const ViewConst_1 = require("../../../core_wq/view/const/ViewConst");
const ShareMgr_1 = require("../../../core_wq/msg/ShareMgr");
const SDKMgr_1 = require("../../../core_wq/msg/SDKMgr");
const HttpMgr_1 = require("../../../core_wq/net/HttpMgr");
/**
 * 等级礼包界面
 */
class LevelRewardView extends BaseView_1.default {
    constructor() {
        super(LayerMgr_1.default.Ins.subFrameLayer, layaMaxUI_1.ui.moduleView.common.LevelRewardViewUI);
        this._isGetAllReward = false;
    }
    initData() {
        super.initData();
        this._levelVO = this.datas[0];
        if (this._levelVO) {
        }
    }
    initView() {
        this._gold = Math.floor(this._levelVO.goldGift * PlayerMgr_1.default.Ins.Info.userIncomeSec);
        let diamond = Math.floor(this._levelVO.diamondsGift);
        let isAdvanced = diamond > 0;
        let shareItems = [];
        let isGetPrize = false; //是否已领取
        this.ui.txt_levelGift.text = this._levelVO.id + "";
        this.ui.txt_acc.text = Math.floor(this._levelVO.accSpeedTime) + "";
        this.ui.txt_gold.text = MathUtil_1.default.unitConversion(this._gold);
        this.ui.txt_diamond.text = Math.floor(this._levelVO.diamondsGift) + "";
        this.ui.btn_get.text.text = "领取";
        this.ui.btn_get.disabled = false;
        this.ui.btn_share.text.text = "炫耀";
        this.ui.btn_share.disabled = false;
    }
    addEvents() {
        this.ui.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_share.on(Laya.Event.CLICK, this, this.onGetShareReward);
    }
    removeEvents() {
        this.ui.btn_get.off(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_share.off(Laya.Event.CLICK, this, this.onGetShareReward);
    }
    /** 普通礼包奖励 */
    onGetReward() {
        if (Math.floor(this._levelVO.accSpeedTime) > 0) {
            EventsMgr_1.default.Ins.dispatch(EventType_1.default.GAME_ACCE_START, Math.floor(this._levelVO.accSpeedTime));
        }
        if (this._gold > 0) {
            HallControl_1.default.Ins.updateGold(this._gold, false);
            this._gold = 0;
        }
        this.ui.btn_get.text.text = "已领取";
        this.ui.btn_get.disabled = true;
        this.closeView();
    }
    onGetShareReward() {
        SDKMgr_1.default.Ins.showVideoAd((_res) => {
            if (_res && _res.isEnded || _res === undefined) {
                this.ui.btn_share.text.text = "已领取";
                this.ui.btn_share.disabled = true;
                HttpMgr_1.default.Ins.requestDiamondData();
                HttpMgr_1.default.Ins.requestShareAdFinish("levelReward", _res);
            }
        }, () => {
            //无视频回调
            this.shareGetReward();
        });
        this.closeView();
    }
    shareGetReward() {
        ShareMgr_1.default.Ins.showShareOrAdv((res) => {
            this.ui.btn_share.text.text = "已领取";
            this.ui.btn_share.disabled = true;
            HttpMgr_1.default.Ins.requestDiamondData();
        });
    }
    closeView() {
        if (this._isGetAllReward) {
            ViewMgr_1.default.Ins.close(ViewConst_1.default.LevelRewardView);
        }
        this._isGetAllReward = true;
    }
}
exports.default = LevelRewardView;
