import { ui } from "../../../ui/layaMaxUI";
import GlobalData from "../../../core_wq/db/GlobalData";
import AppConfig from "../../../core_wq/config/AppConfig";
import SDKMgr from "../../../core_wq/msg/SDKMgr";
import StorageUtil from "../../../core_wq/utils/StorageUtil";

export default class LoginScene extends ui.moduleView.login.LoginSceneUI {

    constructor() {
        super();
    }

    onEnable(): void {
        this.initData();
        this.showStartuplogo();
    }

    private initData(): void {
        StorageUtil.versionCheck(() => {
            GlobalData.Ins.setup(() => {
                StorageUtil.loadStorage((isOK: boolean) => {
                    if (isOK) {
                        this.addEvents();
                        this.btn_login.visible = true;
                    }
                })
            })
        })
    }

    /** 显示开机图 */
    private showStartuplogo(): void {
        let timeLine = new Laya.TimeLine();
        timeLine.addLabel("tl1", 0).to(this.imgStart, { alpha: 1 }, 2000, Laya.Ease.linearNone)
            .addLabel("tl2", 2000).to(this.imgStart, { alpha: 0 }, 200, Laya.Ease.linearNone);
        timeLine.on(Laya.Event.COMPLETE, this.imgStart, () => {
            timeLine.destroy();
            timeLine = null;
            this.imgStart.removeSelf();
            this.imgStart = null;
        });
        timeLine.play(0, false);
    }

    private addEvents(): void {
        this.btn_login.on(Laya.Event.CLICK, this, this.onEnterHall);
    }

    private removeEvents(): void {
        this.btn_login.off(Laya.Event.CLICK, this, this.onEnterHall);
    }

    private onEnterHall(): void {
        AppConfig.HallScene && Laya.Scene.open(AppConfig.HallScene);
    }

    onDisable(): void {
        this.removeEvents();
    }
}