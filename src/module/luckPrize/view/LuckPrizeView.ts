import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import { ui } from "../../../ui/layaMaxUI";
import HttpMgr from "../../../core_wq/net/HttpMgr";
import MathUtil from "../../../core_wq/utils/MathUtil";
import TimeUtil from "../../../core_wq/utils/TimeUtil";
import PlayerMgr from "../../../core_wq/player/PlayerMgr";
import MsgMgr from "../../../core_wq/msg/MsgMgr";
import ViewMgr from "../../../core_wq/view/ViewMgr";
import ViewConst from "../../../core_wq/view/const/ViewConst";

export default class LuckPrizeView extends BaseView {

    private costDiamond: number = 120;
    private freeTimes: number = 0; //免费次数
    private freeTime: number = 0; //免费时间
    private nextFreeTime: number = 0; //离下次免费时间
    private isTryAgain: boolean = false; //再来一次
    private isFreeDrawing: boolean = false; //是否正在免费抽奖
    private _currType: number = -1;

    constructor() {
        super(LayerMgr.Ins.frameLayer, ui.moduleView.luckPrize.LuckPrizeViewUI);
    }

    public initUI(): void {
        super.initUI();
        this.luckPrizeInfo(() => {
            this.initView();
            this.refreshDiamontTxt();
            this.timerLoop(1000, this, this.onTimeHandler);
        })
    }

    private luckPrizeInfo(callBack: Function = null): void {
        HttpMgr.Ins.requestPrizeInfo((res: any) => {
            if (res) {
                if (this.isFreeDrawing == false) {
                    this.freeTimes = MathUtil.parseInt(res.free_num);
                    this.freeTime = MathUtil.parseInt(res.remain_time);
                    this.nextFreeTime = MathUtil.parseInt(res.next_free);
                }
                this.costDiamond = MathUtil.parseInt(res.roulette_price);
                //免费次数已用完
                if (this.freeTimes < 1) {
                    this.freeTime = 0;
                }
                callBack && callBack();
            }
        })
    }

    private initView(): void {
        this.ui.txt_des.text = "单次抽奖将消耗元宝x" + this.costDiamond;
    }

    private refreshDiamontTxt(): void {
        if (this.freeTime > 0 || this.isTryAgain) {
            this.ui.txt_diamond.text = "免费";
        } else {
            this.ui.txt_diamond.text = this.costDiamond + "";
        }
    }

    public addEvents(): void {
        this.ui.btn_start.on(Laya.Event.CLICK, this, this.onStartHandler);
    }

    public removeEvents(): void {
        this.ui.btn_start.off(Laya.Event.CLICK, this, this.onStartHandler);
    }

    /** 开始抽奖 */
    private onStartHandler(): void {
        this.setStartBtnEnabled(false);
        if (this.isTryAgain) {//再来一次
            this.isTryAgain = false;
            this.luckPrizeDrawPrize(LUCK_TYPE.AGAIN);
        } else if (this.freeTimes > 0) {
            this.luckPrizeDrawPrize(LUCK_TYPE.FREE);
        } else if (PlayerMgr.Ins.Info.userDiamond >= this.costDiamond) {
            this.luckPrizeDrawPrize(LUCK_TYPE.DIAMOND);
        } else {
            MsgMgr.Ins.showMsg("元宝不足,做任务领元宝!");
            this.setStartBtnEnabled();
        }
    }

    private onTimeHandler(): void {
        if (this.freeTime > 0) {
            this.ui.txt_time.text = "免费抽奖剩余时间: " + TimeUtil.timeFormatStr(this.freeTime, true);
            this.ui.txt_time.color = "#66CD00";
            this.freeTime--;
        } else if (this.nextFreeTime > 0) {
            this.ui.txt_time.text = "下一次免费抽奖倒计时: " + TimeUtil.timeFormatStr(this.nextFreeTime, true);
            this.ui.txt_time.color = "#EE6363";
            this.nextFreeTime--;
            this.freeTimes = 0; //免费次数清零
        } else {
            if (this.ui.txt_time.visible) {
                this.luckPrizeInfo();
            }
            this.ui.txt_time.visible = false;
        }
        //消耗元宝
        this.refreshDiamontTxt();
    }

    private luckPrizeDrawPrize(type: number): void {
        this._currType = type;
        HttpMgr.Ins.requestDrawPrize(type, (res: any) => {
            if (!res || res.id == null) {
                console.log("@David 无法正常抽奖 类型为：", type);
                this.setStartBtnEnabled();
                return;
            }
            let itemId: number = res.id;
            let rotation: number = (8 - itemId) * 360 / 8 + 360 / 16;
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
                    HttpMgr.Ins.requestDiamondData();
                    break;
            }
        })
    }

    /** 转盘 */
    private onRotation(rotation: number, itemId: number): void {
        let fAdd: number = 0.2;
        this.ui.imgBg.rotation = this.ui.imgBg.rotation % 360;
        if (this.ui.imgBg.rotation > rotation) {
            fAdd = -fAdd;
        }
        let fAddLength: number = 0;
        let fTotalLength: number = Math.abs(rotation - this.ui.imgBg.rotation);
        let animFun = () => {
            if (fAdd > 0) {
                if (this.ui.imgBg.rotation < rotation) {
                    let progress = fAddLength / fTotalLength;
                    //加速
                    if (progress < 0.2) {
                        fAdd += 0.2;
                    } else if (progress > 0.6) {
                        fAdd -= 0.1;
                    }
                    if (fAdd < 0.2) {
                        fAdd = 0.2;
                    }
                    fAddLength += fAdd;
                    this.ui.imgBg.rotation += fAdd;
                } else {
                    this.ui.imgBg.rotation = rotation;
                    this.ui.imgBg.clearTimer(this, animFun);
                    this.setStartBtnEnabled();
                    //显示奖励物品
                    this.showRewardView(itemId);
                }
            } else if (fAdd < 0) {
                if (this.ui.imgBg.rotation > rotation) {
                    this.ui.imgBg.rotation += fAdd;
                } else {
                    this.ui.imgBg.rotation = rotation;
                    this.ui.imgBg.clearTimer(this, animFun);
                    this.setStartBtnEnabled();
                }
            }
        }
        this.ui.imgBg.timerLoop(10, this, animFun);
    }

    /** 显示奖励界面 */
    private showRewardView(itemId: number): void {
        ViewMgr.Ins.open(ViewConst.LuckPrizeRewardView, (flag: boolean) => {
            if (flag) this.isTryAgain = true;
        }, itemId);
        if (this._currType == LUCK_TYPE.FREE) {
            this.isFreeDrawing = false;
        }
    }

    private setStartBtnEnabled(isEnabled: boolean = true): void {
        this.ui.btn_start.mouseEnabled = isEnabled;
    }
}

enum LUCK_TYPE {
    /** 免费 */
    FREE,
    /** 钻石 */
    DIAMOND,
    /** 再一次 */
    AGAIN
}