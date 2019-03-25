"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseView_1 = require("../../../core_wq/view/base/BaseView");
const LayerMgr_1 = require("../../../core_wq/layer/LayerMgr");
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const GlobalData_1 = require("../../../core_wq/db/GlobalData");
const ViewMgr_1 = require("../../../core_wq/view/ViewMgr");
const ViewConst_1 = require("../../../core_wq/view/const/ViewConst");
/**
 * 商店界面
 */
class ShopView extends BaseView_1.default {
    constructor() {
        super(LayerMgr_1.default.Ins.frameLayer, layaMaxUI_1.ui.moduleView.shop.ShopViewUI);
        this._curBuyIndex = 0;
        this.setResources(["shop"]);
    }
    //初始化
    initUI() {
        super.initUI();
        let listDatas = GlobalData_1.default.getAllValue(GlobalData_1.default.HeroConfigVO);
        if (listDatas) {
            this.ui.lists.vScrollBarSkin = "";
            this.ui.lists.array = listDatas;
            this.ui.lists.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
            this.frameOnce(5, this, () => {
                if (this._curBuyIndex > 0) {
                    this.ui.lists.scrollTo(this._curBuyIndex);
                }
            });
        }
    }
    /** 添加监听事件 */
    addEvents() {
        this.ui.btn_close.on(Laya.Event.CLICK, this, this.onCloseHandler);
    }
    /** 移除监听事件 */
    removeEvents() {
        this.ui.btn_close.off(Laya.Event.CLICK, this, this.onCloseHandler);
    }
    onListRender(cell, index) {
        if (index > this.ui.lists.array.length) {
            return;
        }
        let item = cell.getChildByName("shopItem");
        if (item) {
            item.dataSource = this.ui.lists.array[index];
            if (item.btn_buy.visible && index < this.ui.lists.array.length - 3) {
                this._curBuyIndex = index - 2;
            }
        }
    }
    onCloseHandler() {
        ViewMgr_1.default.Ins.close(ViewConst_1.default.ShopView);
    }
}
exports.default = ShopView;
