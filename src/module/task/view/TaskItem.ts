import { ui } from "../../../ui/layaMaxUI";
import HttpMgr from "../../../core_wq/net/HttpMgr";
import MsgMgr from "../../../core_wq/msg/MsgMgr";

export default class TaskItem extends ui.moduleView.task.TaskItemUI {

    private _info: any;

    constructor() { super(); }

    set dataSource(value: any) {
        this._info = value;
        if (this._info) {
            let finishNum: number = this._info.task_num || 0;
            if (finishNum > this._info.num) {
                finishNum = this._info.num;
            }
            this.txt_title.text = this._info.title + "(" + finishNum + "/" + this._info.num + ")";
            this.txt_diamond.text = "+" + this._info.reward;
            this.btn_get.visible = false;
            if (this._info.task_status > 0) {
                if (this._info.task_status > 1) {//已领取
                    this.btn_get.visible = false;
                } else {
                    this.btn_get.disabled = false;
                }
            } else {
                this.btn_get.disabled = true;
            }
            this.addEvents();
        }
    }

    private addEvents(): void {
        this.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
        this.btn_go.on(Laya.Event.CLICK, this, this.onGotoView);
    }

    private onGetReward(): void {
        HttpMgr.Ins.requestTaskPrize(this._info.id, (_res: any) => {
            if (_res) {
                this._info.status = 2;
                this.btn_get.visible = false;
                HttpMgr.Ins.requestDiamondData();
                MsgMgr.Ins.showMsg("任务奖励领取成功!");
            }
        });
    }

    private onGotoView(): void {
        
    }
}