"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const DaySignView_1 = require("./DaySignView");
const HttpMgr_1 = require("../../../core_wq/net/HttpMgr");
const MsgMgr_1 = require("../../../core_wq/msg/MsgMgr");
const ViewMgr_1 = require("../../../core_wq/view/ViewMgr");
const ViewConst_1 = require("../../../core_wq/view/const/ViewConst");
const EventsMgr_1 = require("../../../core_wq/event/EventsMgr");
const EventType_1 = require("../../../core_wq/event/EventType");
class DaySignItem extends layaMaxUI_1.ui.moduleView.daySign.DaySignItemUI {
    constructor() {
        super();
        this._diamond = 0;
        this._day = 0;
    }
    set dataSource(value) {
        this._day = value;
        this._diamond = DaySignView_1.default.SignData.prize["day_" + this._day];
        this.txt_title.text = "第" + this._day + "天";
        this.txt_diamond.text = "x" + this._diamond;
        if (this._day <= DaySignView_1.default.SignData.sign.day) {
            this.btn_get.skin = "images/daySign/day_prize_item1.png";
            this.imgGet.skin = "images/daySign/day_prize_get.png";
            if (this._day == DaySignView_1.default.SignData.sign.day && DaySignView_1.default.SignData.sign.status == 0) {
                this.imgGet.visible = false;
                this.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
                EventsMgr_1.default.Ins.addListener(EventType_1.default.DAYSIGN_REWARD_COMPLETE, this.onRewardGetComplete, this);
            }
        }
    }
    onGetReward() {
        if (DaySignView_1.default.SignData && DaySignView_1.default.SignData.sign) {
            let day = DaySignView_1.default.SignData.sign.day;
            HttpMgr_1.default.Ins.requestDaySignPrize(day, (_res) => {
                if (_res) {
                    if (_res.code == 1) {
                        this.onRewardGetComplete();
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
    onRewardGetComplete() {
        HttpMgr_1.default.Ins.requestDiamondData();
        this.imgGet.visible = true;
        ViewMgr_1.default.Ins.close(ViewConst_1.default.DaySignView);
        MsgMgr_1.default.Ins.showMsg("签到奖励领取成功：元宝x" + this._diamond);
    }
}
exports.default = DaySignItem;
