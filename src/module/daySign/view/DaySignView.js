"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseView_1 = require("../../../core_wq/view/base/BaseView");
const LayerMgr_1 = require("../../../core_wq/layer/LayerMgr");
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const ViewMgr_1 = require("../../../core_wq/view/ViewMgr");
const ViewConst_1 = require("../../../core_wq/view/const/ViewConst");
const HttpMgr_1 = require("../../../core_wq/net/HttpMgr");
const MsgMgr_1 = require("../../../core_wq/msg/MsgMgr");
const EventsMgr_1 = require("../../../core_wq/event/EventsMgr");
const EventType_1 = require("../../../core_wq/event/EventType");
/**
 * 每日签到界面
 */
class DaySignView extends BaseView_1.default {
    constructor() {
        super(LayerMgr_1.default.Ins.frameLayer, layaMaxUI_1.ui.moduleView.daySign.DaySignViewUI);
        this.setResources(["daySign"]);
    }
    initUI() {
        super.initUI();
        HttpMgr_1.default.Ins.requestSignInfo((data) => {
            DaySignView.SignData = data;
            if (DaySignView.SignData) {
                this.ui.lists.array = [1, 2, 3, 4, 5, 6];
                this.ui.lists.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
                this.ui.txt_diamond.text = "x" + DaySignView.SignData.prize["day_7"];
                if (7 <= DaySignView.SignData.sign.day) {
                    this.ui.btn_lastGet.skin = "images/daySign/day_prize_item2.png";
                    this.ui.imgGet.skin = "images/daySign/day_prize_get.png";
                    if (7 == DaySignView.SignData.sign.day && DaySignView.SignData.sign.status == 0) {
                        this.ui.imgGet.visible = false;
                        this.ui.btn_lastGet.on(Laya.Event.CLICK, this, this.onGetReward);
                    }
                }
            }
        });
    }
    addEvents() {
        this.ui.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_close.on(Laya.Event.CLICK, this, this.onCloseHandler);
    }
    removeEvents() {
        this.ui.btn_get.off(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_lastGet.off(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_close.off(Laya.Event.CLICK, this, this.onCloseHandler);
    }
    /** 领取奖励 */
    onGetReward() {
        if (DaySignView.SignData && DaySignView.SignData.sign) {
            let day = DaySignView.SignData.sign.day;
            HttpMgr_1.default.Ins.requestDaySignPrize(day, (_res) => {
                if (_res) {
                    if (_res.code == 1) {
                        if (day < 7) {
                            EventsMgr_1.default.Ins.dispatch(EventType_1.default.DAYSIGN_REWARD_COMPLETE);
                        }
                        else {
                            HttpMgr_1.default.Ins.requestDiamondData();
                            this.ui.imgGet.visible = true;
                            ViewMgr_1.default.Ins.close(ViewConst_1.default.DaySignView);
                            MsgMgr_1.default.Ins.showMsg("签到奖励领取成功：元宝x" + DaySignView.SignData.prize["day7"]);
                        }
                    }
                    else if (_res.code == 2) {
                        MsgMgr_1.default.Ins.showMsg("今日签到奖励已领取");
                    }
                    else {
                        MsgMgr_1.default.Ins.showMsg("签到奖励领取失败");
                    }
                }
            });
        }
    }
    onCloseHandler() {
        ViewMgr_1.default.Ins.close(ViewConst_1.default.DaySignView);
    }
    onListRender(cell, index) {
        if (index > this.ui.lists.array.length) {
            return;
        }
        let item = cell.getChildByName("item");
        if (item) {
            let info = this.ui.lists.array[index];
            item.dataSource = info;
        }
    }
}
DaySignView.SignData = null;
exports.default = DaySignView;
