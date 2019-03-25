"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShareMgr_1 = require("./ShareMgr");
const HallControl_1 = require("../../module/hall/HallControl");
const EventsMgr_1 = require("../event/EventsMgr");
const EventType_1 = require("../event/EventType");
const SystemConfig_1 = require("../../module/hall/config/SystemConfig");
/**
 * 红点管理类
 */
class RedPointMgr {
    updateRedPoint() {
        EventsMgr_1.default.Ins.dispatch(EventType_1.default.UPDATE_SYSTEM_RED_POINT, SystemConfig_1.default.SIGN, this.isShowSignRedPoint);
        EventsMgr_1.default.Ins.dispatch(EventType_1.default.UPDATE_SYSTEM_RED_POINT, SystemConfig_1.default.TASK, this.isShowTaskRedPoint);
        EventsMgr_1.default.Ins.dispatch(EventType_1.default.UPDATE_SYSTEM_RED_POINT, SystemConfig_1.default.LUCK_PRIZE, this.isShowLuckPrizeRedPoint);
        EventsMgr_1.default.Ins.dispatch(EventType_1.default.UPDATE_SYSTEM_RED_POINT, SystemConfig_1.default.FOLLOW, this.isShowFollowRedPoint);
    }
    /** 是否显示商店红点 */
    get isShowShopRedPoint() {
        return ((ShareMgr_1.default.Ins.getAdTimes(11) + ShareMgr_1.default.Ins.getShareTimes(11)) > 0) && (HallControl_1.default.Ins.Model.heroLevel >= 6 && HallControl_1.default.Ins.Model.heroLevel < HallControl_1.default.Ins.Model.heroMaxLevel);
    }
    /** 移除商店红点 */
    removeCarShopRedPoin() {
        EventsMgr_1.default.Ins.dispatch(EventType_1.default.REMOVE_SHOP_REN_POINT, true);
    }
    /** 是否显示任务红点 */
    get isShowTaskRedPoint() {
        return HallControl_1.default.Ins.Model.showTaskRedPoint;
    }
    /** 移除任务红点 */
    removeTaskRedPoint() {
        HallControl_1.default.Ins.Model.showTaskRedPoint = false;
        EventsMgr_1.default.Ins.dispatch(EventType_1.default.REMOVE_TASK_REN_POINT, true);
    }
    /** 是否显示转盘红点 */
    get isShowLuckPrizeRedPoint() {
        return HallControl_1.default.Ins.Model.showLuckPrizeRedPoint;
    }
    /** 移除转盘红点 */
    removeLuckPrizeRedPoint() {
        HallControl_1.default.Ins.Model.showLuckPrizeRedPoint = false;
        EventsMgr_1.default.Ins.dispatch(EventType_1.default.REMOVE_LUCK_PRIZE_REN_POINT, true);
    }
    /** 是否显示每日签到红点 */
    get isShowSignRedPoint() {
        return HallControl_1.default.Ins.Model.showDailySignRedPoint;
    }
    /** 移除签到红点 */
    removeSignRedPoint() {
        HallControl_1.default.Ins.Model.showDailySignRedPoint = false;
        EventsMgr_1.default.Ins.dispatch(EventType_1.default.REMOVE_SIGN_REN_POINT, true);
    }
    /** 是否显示关注红点 */
    get isShowFollowRedPoint() {
        return HallControl_1.default.Ins.Model.showFollowRedPoint;
    }
    /** 移除关注红点 */
    removeFollowRedPoint() {
        HallControl_1.default.Ins.Model.showFollowRedPoint = false;
        EventsMgr_1.default.Ins.dispatch(EventType_1.default.REMOVE_FOLLOW_REN_POINT, true);
    }
    static get Ins() {
        if (RedPointMgr._instance == null) {
            RedPointMgr._instance = new RedPointMgr();
        }
        return RedPointMgr._instance;
    }
}
exports.default = RedPointMgr;
