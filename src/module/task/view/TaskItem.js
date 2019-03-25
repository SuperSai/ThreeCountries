"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const HttpMgr_1 = require("../../../core_wq/net/HttpMgr");
const MsgMgr_1 = require("../../../core_wq/msg/MsgMgr");
class TaskItem extends layaMaxUI_1.ui.moduleView.task.TaskItemUI {
    constructor() { super(); }
    set dataSource(value) {
        this._info = value;
        if (this._info) {
            let finishNum = this._info.task_num || 0;
            if (finishNum > this._info.num) {
                finishNum = this._info.num;
            }
            this.txt_title.text = this._info.title + "(" + finishNum + "/" + this._info.num + ")";
            this.txt_diamond.text = "+" + this._info.reward;
            this.btn_get.visible = false;
            if (this._info.task_status > 0) {
                if (this._info.task_status > 1) { //已领取
                    this.btn_get.visible = false;
                }
                else {
                    this.btn_get.disabled = false;
                }
            }
            else {
                this.btn_get.disabled = true;
            }
            this.addEvents();
        }
    }
    addEvents() {
        this.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
        this.btn_go.on(Laya.Event.CLICK, this, this.onGotoView);
    }
    onGetReward() {
        HttpMgr_1.default.Ins.requestTaskPrize(this._info.id, (_res) => {
            if (_res) {
                this._info.status = 2;
                this.btn_get.visible = false;
                HttpMgr_1.default.Ins.requestDiamondData();
                MsgMgr_1.default.Ins.showMsg("任务奖励领取成功!");
            }
        });
    }
    onGotoView() {
    }
}
exports.default = TaskItem;
