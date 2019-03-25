"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseView_1 = require("../../../core_wq/view/base/BaseView");
const LayerMgr_1 = require("../../../core_wq/layer/LayerMgr");
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const HttpMgr_1 = require("../../../core_wq/net/HttpMgr");
/**
 * 任务界面
 */
class TaskView extends BaseView_1.default {
    constructor() {
        super(LayerMgr_1.default.Ins.frameLayer, layaMaxUI_1.ui.moduleView.task.TaskViewUI);
        this.setResources(["task"]);
    }
    initUI() {
        super.initUI();
        this.ui.txt_noTask.visible = true;
        this.ui.lists.visible = false;
        HttpMgr_1.default.Ins.requestTaskInfo((data) => {
            if (data) {
                this.ui.txt_noTask.visible = false;
                this.ui.lists.array = data;
                this.ui.lists.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
                this.ui.lists.visible = true;
            }
        });
    }
    onListRender(cell, index) {
        if (index > this.ui.lists.array.length) {
            return;
        }
        let item = cell.getChildByName("item");
        if (item) {
            item.dataSource = this.ui.lists.array[index];
        }
    }
}
exports.default = TaskView;
