"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const EventsMgr_1 = require("../../../core_wq/event/EventsMgr");
const EventType_1 = require("../../../core_wq/event/EventType");
const PlayerMgr_1 = require("../../../core_wq/player/PlayerMgr");
const PlayerInfo_1 = require("../../../core_wq/player/data/PlayerInfo");
const MathUtil_1 = require("../../../core_wq/utils/MathUtil");
const StorageUtil_1 = require("../../../core_wq/utils/StorageUtil");
const ViewMgr_1 = require("../../../core_wq/view/ViewMgr");
const ViewConst_1 = require("../../../core_wq/view/const/ViewConst");
/**
 * 货币界面
 */
class CurrencyView extends layaMaxUI_1.ui.moduleView.hall.CurrencyViewUI {
    constructor() { super(); }
    onAwake() {
        this.addEvents();
    }
    addEvents() {
        EventsMgr_1.default.Ins.addListener(EventType_1.default.UPDATE_USER_LEVEL, this.onUpdateUserLevel, this);
        EventsMgr_1.default.Ins.addListener(EventType_1.default.UPDATE_CURRENCY, this.onUpdateCurrency, this);
        EventsMgr_1.default.Ins.addListener(EventType_1.default.UPDATE_USER_EXP, this.onUpdateUserExp, this);
        EventsMgr_1.default.Ins.addListener(EventType_1.default.UPDATE_INCOME, this.onUpdateIncome, this);
        this.btn_user.on(Laya.Event.CLICK, this, this.onShowUserInfoView);
    }
    /** 更新用户等级 */
    onUpdateUserLevel() {
        this.txt_level.text = "Lv." + PlayerMgr_1.default.Ins.Info.userLevel;
        Laya.timer.callLater(this, StorageUtil_1.default.saveStorageToLocal);
    }
    /** 更新用户经验 */
    onUpdateUserExp(upNeedexp) {
        this.expBar.value = (1 * PlayerMgr_1.default.Ins.Info.userExp / upNeedexp);
        Laya.timer.callLater(this, StorageUtil_1.default.saveStorageToLocal);
    }
    /** 更新用户每秒收益 */
    onUpdateIncome(userIncomeSec) {
        PlayerMgr_1.default.Ins.Info.userIncomeSec = userIncomeSec;
        this.txt_Income.text = MathUtil_1.default.unitConversion(PlayerMgr_1.default.Ins.Info.userIncomeSec) + "/每秒";
    }
    /** 更新用户货币 */
    onUpdateCurrency(type, value, isTotal = true) {
        switch (type) {
            case PlayerInfo_1.default.GOLD:
                this.updateGold(value, isTotal);
                break;
            case PlayerInfo_1.default.DIAMOND:
                this.updateDiamond(value, isTotal);
                break;
        }
    }
    /** 显示用户信息界面 */
    onShowUserInfoView() {
        ViewMgr_1.default.Ins.open(ViewConst_1.default.UserInfoView);
    }
    updateGold(value, isTotal) {
        let isInitGold = (PlayerMgr_1.default.Ins.Info.userGold == 0);
        if (isTotal) {
            PlayerMgr_1.default.Ins.Info.userGold = value;
        }
        else {
            PlayerMgr_1.default.Ins.Info.userGold += value;
        }
        this.txt_gold.text = MathUtil_1.default.unitConversion(PlayerMgr_1.default.Ins.Info.userGold);
        if (!isInitGold) {
            Laya.Tween.from(this.imgGold, { scaleX: 1.2, scaleY: 1.2 }, 300, null, Laya.Handler.create(this, () => { Laya.Tween.clearTween(this.imgGold); }));
        }
        Laya.timer.callLater(this, StorageUtil_1.default.saveStorageToLocal);
    }
    updateDiamond(value, isTotal) {
        let isInitDiamond = (PlayerMgr_1.default.Ins.Info.userDiamond == 0);
        if (isTotal) {
            PlayerMgr_1.default.Ins.Info.userDiamond = value;
        }
        else {
            PlayerMgr_1.default.Ins.Info.userDiamond += value;
        }
        this.txt_diamond.text = PlayerMgr_1.default.Ins.Info.userDiamond + "";
        if (!isInitDiamond) {
            Laya.Tween.from(this.imgDiamond, { scaleX: 1.2, scaleY: 1.2 }, 300, null, Laya.Handler.create(this, () => { Laya.Tween.clearTween(this.imgDiamond); }));
        }
    }
}
exports.default = CurrencyView;
