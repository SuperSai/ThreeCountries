"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../../ui/layaMaxUI");
const EventsMgr_1 = require("../../../../core_wq/event/EventsMgr");
const EventType_1 = require("../../../../core_wq/event/EventType");
const PathConfig_1 = require("../../../../core_wq/config/PathConfig");
const SystemConfig_1 = require("../../config/SystemConfig");
const PointUtils_1 = require("../../../../core_wq/utils/PointUtils");
const SDKMgr_1 = require("../../../../core_wq/msg/SDKMgr");
class SystemBtn extends layaMaxUI_1.ui.moduleView.hall.item.SystemBtnUI {
    constructor() {
        super(...arguments);
        this._info = null;
    }
    set dataSource(value) {
        this._info = value;
        if (this._info) {
            this.init();
            this.addEvents();
        }
    }
    init() {
        this.imgRenPoint.visible = false;
        this.btn_system.skin = PathConfig_1.default.SYSTEM_BTN_PATH.replace("{0}", this._info.icon);
        //投诉建议特殊处理
        if (this._info.id == SystemConfig_1.default.FEEDBACK) {
            let pos = PointUtils_1.default.localToGlobal(this.btn_system);
            SDKMgr_1.default.Ins.wxCreateFeedbackButton({
                x: pos.x, y: pos.y,
                width: this.btn_system.width, height: this.btn_system.height
            });
        }
    }
    addEvents() {
        this.btn_system.on(Laya.Event.CLICK, this, this.onClickBtn);
        EventsMgr_1.default.Ins.addListener(EventType_1.default.UPDATE_SYSTEM_RED_POINT, this.onUpdateRedPoint, this);
    }
    onClickBtn() {
        if (this._info) {
            EventsMgr_1.default.Ins.dispatch(EventType_1.default.OPEN_VIEW, this._info.id);
        }
        else {
            console.log("@David 功能按钮点击错误,没有找到System表对应的字段!");
        }
    }
    onUpdateRedPoint(id, isShow) {
        if (this._info && this._info.id == id) {
            this.imgRenPoint.visible = isShow;
        }
    }
}
exports.default = SystemBtn;
