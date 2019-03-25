"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const GlobalData_1 = require("../../../core_wq/db/GlobalData");
const AppConfig_1 = require("../../../core_wq/config/AppConfig");
const SDKMgr_1 = require("../../../core_wq/msg/SDKMgr");
const StorageUtil_1 = require("../../../core_wq/utils/StorageUtil");
const MathUtil_1 = require("../../../core_wq/utils/MathUtil");
class LoginScene extends layaMaxUI_1.ui.moduleView.login.LoginSceneUI {
    constructor() {
        super();
        this._authorityState = 3;
        this.tipsArr = [
            "等待时间越久离线金币越多哟",
            "正在召集英雄上阵",
            "别忘每天的免费转盘抽奖哟",
            "签到天数越久奖励越丰盛~",
            "邀请好友召唤英雄，获取超多奖励",
            "每天登陆都有大量离线金币领取"
        ];
    }
    onEnable() {
        this.showStartuplogo();
        this.initData();
    }
    initData() {
        this.txt_tips.visible = true;
        StorageUtil_1.default.versionCheck(() => {
            GlobalData_1.default.Ins.setup(() => {
                StorageUtil_1.default.loadStorage((isOK) => {
                    if (isOK) {
                        this.checkAuthority();
                    }
                });
            });
        });
    }
    /** 检查是否用户授权 */
    checkAuthority() {
        if (Laya.Browser.onWeiXin) {
            SDKMgr_1.default.Ins.wxLogin((state) => {
                this._authorityState = state;
                switch (state) {
                    case 1: //已经授权
                        this.txt_tips.text = this.tipsArr[MathUtil_1.default.rangeInt(0, this.tipsArr.length - 1)];
                        break;
                    case 2: //授权成功进入大厅
                        SDKMgr_1.default.Ins.initWX();
                        this.enterHallScene();
                        break;
                    case 3: //没有授权
                        this.txt_tips.text = "点击任意位置进入游戏";
                        break;
                }
                this.onShowBreathEffect();
                this.timerLoop(1500, this, this.onShowBreathEffect);
            });
        }
        else {
            this.enterHallScene();
        }
    }
    /** 进入大厅 */
    enterHallScene() {
        this.removeImgStartTween();
        this.clearTimer(this, this.onShowBreathEffect);
        AppConfig_1.default.HallScene && Laya.Scene.open(AppConfig_1.default.HallScene);
    }
    /** 显示开机图 */
    showStartuplogo() {
        // let timeLine = new Laya.TimeLine();
        // timeLine.addLabel("tl1", 0).to(this.imgStart, { alpha: 1 }, 2000, Laya.Ease.linearNone)
        //     .addLabel("tl2", 2000).to(this.imgStart, { alpha: 0 }, 200, Laya.Ease.linearNone);
        // timeLine.on(Laya.Event.COMPLETE, this.imgStart, () => {
        //     timeLine.destroy();
        //     timeLine = null;
        //     this.imgStart.removeSelf();
        // });
        // timeLine.play(0, false);
        Laya.Tween.to(this.imgStart, { alpha: 1 }, 2000);
        Laya.Tween.to(this.imgStart, { alpha: 0, delay: 2000 }, 200, null, Laya.Handler.create(this, () => {
            this.removeImgStartTween();
        }));
    }
    removeImgStartTween() {
        Laya.Tween.clearTween(this.imgStart);
        this.imgStart.removeSelf();
    }
    onShowBreathEffect() {
        if (this._authorityState != 3) {
            this.txt_tips.text = this.tipsArr[MathUtil_1.default.rangeInt(0, this.tipsArr.length - 1)];
        }
        Laya.Tween.clearTween(this.txt_tips);
        Laya.Tween.to(this.txt_tips, { scaleX: 0.9, scaleY: 0.9 }, 900, null, Laya.Handler.create(this, () => {
            Laya.Tween.to(this.txt_tips, { scaleX: 1, scaleY: 1 }, 900);
        }));
    }
}
exports.default = LoginScene;
