"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseView_1 = require("../../../core_wq/view/base/BaseView");
const LayerMgr_1 = require("../../../core_wq/layer/LayerMgr");
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const HttpMgr_1 = require("../../../core_wq/net/HttpMgr");
const MathUtil_1 = require("../../../core_wq/utils/MathUtil");
const TimeUtil_1 = require("../../../core_wq/utils/TimeUtil");
const PlayerMgr_1 = require("../../../core_wq/player/PlayerMgr");
const MsgMgr_1 = require("../../../core_wq/msg/MsgMgr");
const ViewMgr_1 = require("../../../core_wq/view/ViewMgr");
const ViewConst_1 = require("../../../core_wq/view/const/ViewConst");
class LuckPrizeView extends BaseView_1.default {
    constructor() {
        super(LayerMgr_1.default.Ins.frameLayer, layaMaxUI_1.ui.moduleView.luckPrize.LuckPrizeViewUI);
        this.costDiamond = 120;
        this.freeTimes = 0; //免费次数
        this.freeTime = 0; //免费时间
        this.nextFreeTime = 0; //离下次免费时间
        this.isTryAgain = false; //再来一次
        this.isFreeDrawing = false; //是否正在免费抽奖
        this._currType = -1;
    }
    initUI() {
        super.initUI();
        this.luckPrizeInfo(() => {
            this.initView();
            this.refreshDiamontTxt();
            this.timerLoop(1000, this, this.onTimeHandler);
        });
    }
    luckPrizeInfo(callBack = null) {
        HttpMgr_1.default.Ins.requestPrizeInfo((res) => {
            if (res) {
                if (this.isFreeDrawing == false) {
                    this.freeTimes = MathUtil_1.default.parseInt(res.free_num);
                    this.freeTime = MathUtil_1.default.parseInt(res.remain_time);
                    this.nextFreeTime = MathUtil_1.default.parseInt(res.next_free);
                }
                this.costDiamond = MathUtil_1.default.parseInt(res.roulette_price);
                //免费次数已用完
                if (this.freeTimes < 1) {
                    this.freeTime = 0;
                }
                callBack && callBack();
            }
        });
    }
    initView() {
        this.ui.txt_des.text = "单次抽奖将消耗元宝x" + this.costDiamond;
    }
    refreshDiamontTxt() {
        if (this.freeTime > 0 || this.isTryAgain) {
            this.ui.txt_diamond.text = "免费";
        }
        else {
            this.ui.txt_diamond.text = this.costDiamond + "";
        }
    }
    addEvents() {
        this.ui.btn_start.on(Laya.Event.CLICK, this, this.onStartHandler);
    }
    removeEvents() {
        this.ui.btn_start.off(Laya.Event.CLICK, this, this.onStartHandler);
    }
    /** 开始抽奖 */
    onStartHandler() {
        this.setStartBtnEnabled(false);
        if (this.isTryAgain) { //再来一次
            this.isTryAgain = false;
            this.luckPrizeDrawPrize(LUCK_TYPE.AGAIN);
        }
        else if (this.freeTimes > 0) {
            this.luckPrizeDrawPrize(LUCK_TYPE.FREE);
        }
        else if (PlayerMgr_1.default.Ins.Info.userDiamond >= this.costDiamond) {
            this.luckPrizeDrawPrize(LUCK_TYPE.DIAMOND);
        }
        else {
            MsgMgr_1.default.Ins.showMsg("元宝不足,做任务领元宝!");
            this.setStartBtnEnabled();
        }
    }
    onTimeHandler() {
        if (this.freeTime > 0) {
            this.ui.txt_time.text = "免费抽奖剩余时间: " + TimeUtil_1.default.timeFormatStr(this.freeTime, true);
            this.ui.txt_time.color = "#66CD00";
            this.freeTime--;
        }
        else if (this.nextFreeTime > 0) {
            this.ui.txt_time.text = "下一次免费抽奖倒计时: " + TimeUtil_1.default.timeFormatStr(this.nextFreeTime, true);
            this.ui.txt_time.color = "#EE6363";
            this.nextFreeTime--;
            this.freeTimes = 0; //免费次数清零
        }
        else {
            if (this.ui.txt_time.visible) {
                this.luckPrizeInfo();
            }
            this.ui.txt_time.visible = false;
        }
        //消耗元宝
        this.refreshDiamontTxt();
    }
    luckPrizeDrawPrize(type) {
        this._currType = type;
        HttpMgr_1.default.Ins.requestDrawPrize(type, (res) => {
            if (!res || res.id == null) {
                console.log("@David 无法正常抽奖 类型为：", type);
                this.setStartBtnEnabled();
                return;
            }
            let itemId = res.id;
            let rotation = (8 - itemId) * 360 / 8 + 360 / 16;
            this.onRotation(360 * 7 + rotation, itemId);
            switch (type) {
                case LUCK_TYPE.FREE:
                    this.isFreeDrawing = true;
                    this.freeTimes--;
                    this.freeTime = 0;
                    break;
                case LUCK_TYPE.DIAMOND:
                    this.freeTimes--;
                    this.freeTime = 0;
                    HttpMgr_1.default.Ins.requestDiamondData();
                    break;
            }
        });
    }
    /** 转盘 */
    onRotation(rotation, itemId) {
        let fAdd = 0.2;
        this.ui.imgBg.rotation = this.ui.imgBg.rotation % 360;
        if (this.ui.imgBg.rotation > rotation) {
            fAdd = -fAdd;
        }
        let fAddLength = 0;
        let fTotalLength = Math.abs(rotation - this.ui.imgBg.rotation);
        let animFun = () => {
            if (fAdd > 0) {
                if (this.ui.imgBg.rotation < rotation) {
                    let progress = fAddLength / fTotalLength;
                    //加速
                    if (progress < 0.2) {
                        fAdd += 0.2;
                    }
                    else if (progress > 0.6) {
                        fAdd -= 0.1;
                    }
                    if (fAdd < 0.2) {
                        fAdd = 0.2;
                    }
                    fAddLength += fAdd;
                    this.ui.imgBg.rotation += fAdd;
                }
                else {
                    this.ui.imgBg.rotation = rotation;
                    this.ui.imgBg.clearTimer(this, animFun);
                    this.setStartBtnEnabled();
                    //显示奖励物品
                    this.showRewardView(itemId);
                }
            }
            else if (fAdd < 0) {
                if (this.ui.imgBg.rotation > rotation) {
                    this.ui.imgBg.rotation += fAdd;
                }
                else {
                    this.ui.imgBg.rotation = rotation;
                    this.ui.imgBg.clearTimer(this, animFun);
                    this.setStartBtnEnabled();
                }
            }
        };
        this.ui.imgBg.timerLoop(10, this, animFun);
    }
    /** 显示奖励界面 */
    showRewardView(itemId) {
        ViewMgr_1.default.Ins.open(ViewConst_1.default.LuckPrizeRewardView, (flag) => {
            if (flag)
                this.isTryAgain = true;
        }, itemId);
        if (this._currType == LUCK_TYPE.FREE) {
            this.isFreeDrawing = false;
        }
    }
    setStartBtnEnabled(isEnabled = true) {
        this.ui.btn_start.mouseEnabled = isEnabled;
    }
}
exports.default = LuckPrizeView;
var LUCK_TYPE;
(function (LUCK_TYPE) {
    /** 免费 */
    LUCK_TYPE[LUCK_TYPE["FREE"] = 0] = "FREE";
    /** 钻石 */
    LUCK_TYPE[LUCK_TYPE["DIAMOND"] = 1] = "DIAMOND";
    /** 再一次 */
    LUCK_TYPE[LUCK_TYPE["AGAIN"] = 2] = "AGAIN";
})(LUCK_TYPE || (LUCK_TYPE = {}));
