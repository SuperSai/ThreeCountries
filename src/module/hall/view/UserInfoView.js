"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseView_1 = require("../../../core_wq/view/base/BaseView");
const LayerMgr_1 = require("../../../core_wq/layer/LayerMgr");
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const GlobalData_1 = require("../../../core_wq/db/GlobalData");
const PlayerMgr_1 = require("../../../core_wq/player/PlayerMgr");
/**
 * 用户信息界面
 */
class UserInfoView extends BaseView_1.default {
    constructor() {
        super(LayerMgr_1.default.Ins.frameLayer, layaMaxUI_1.ui.moduleView.hall.UserInfoViewUI);
    }
    initData() {
        super.initData();
        this._levelVO = GlobalData_1.default.getData(GlobalData_1.default.LevelVO, PlayerMgr_1.default.Ins.Info.userLevel);
        this._nextLevelVO = GlobalData_1.default.getData(GlobalData_1.default.LevelVO, PlayerMgr_1.default.Ins.Info.userLevel + 1);
        this.ui.txt_userId.text = PlayerMgr_1.default.Ins.Info.userId + "";
        this.ui.expBar.value = (1.0 * PlayerMgr_1.default.Ins.Info.userExp / this._nextLevelVO.upNeedexp);
        this.ui.txt_exp.text = Math.floor(PlayerMgr_1.default.Ins.Info.userExp) + "/" + Math.floor(this._nextLevelVO.upNeedexp);
        this.ui.txt_price.text = Math.floor(100 * this._levelVO.extraProduce) + "%";
        this.ui.txt_heroCount.text = this._levelVO.openCellCount + "个";
        this.ui.txt_battleCount.text = this._levelVO.battleCount + "个";
    }
}
exports.default = UserInfoView;
