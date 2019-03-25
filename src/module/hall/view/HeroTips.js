"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const LayerMgr_1 = require("../../../core_wq/layer/LayerMgr");
const GlobalData_1 = require("../../../core_wq/db/GlobalData");
const BoneAnim_1 = require("../../../core_wq/bone/BoneAnim");
class HeroTips extends layaMaxUI_1.ui.moduleView.hall.HeroTipsUI {
    constructor() { super(); }
    onEnable() {
        if (this._data) {
            // let pos: Laya.Point = PointUtils.localToGlobal(this._data);
            // this.pos(pos.x, pos.y);
            this.pos(this._data.x, this._data.y);
            if (this.x < 0) {
                this.x = 0;
            }
            else if (this.x > LayerMgr_1.default.stageDesignWidth) {
                this.x = LayerMgr_1.default.stageDesignWidth - this.width;
            }
            let config = GlobalData_1.default.getData(GlobalData_1.default.HeroConfigVO, this._data.Info.heroId);
            if (config) {
                this.txt_name.text = config.name;
                this.txt_speed.text = config.speed + "";
                this.txt_secCoin.text = config.PerSecCoin + "";
                this.txt_sellPrice.text = config.sellPrice + "";
            }
            if (this._data && this._data.heroVO) {
                this._bone = new BoneAnim_1.default(this._data.heroVO.modelImgUrl, true, true);
                this.addChild(this._bone);
                this._bone.pos(174, 420);
            }
        }
    }
    removeTips() {
        if (this._bone)
            this._bone.destroy();
        this.removeSelf();
    }
    set dataSource(value) {
        this._data = value;
    }
}
exports.default = HeroTips;
