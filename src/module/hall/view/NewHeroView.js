"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseView_1 = require("../../../core_wq/view/base/BaseView");
const LayerMgr_1 = require("../../../core_wq/layer/LayerMgr");
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const AppConfig_1 = require("../../../core_wq/config/AppConfig");
const GlobalData_1 = require("../../../core_wq/db/GlobalData");
const BoneAnim_1 = require("../../../core_wq/bone/BoneAnim");
const HallControl_1 = require("../HallControl");
const MathUtil_1 = require("../../../core_wq/utils/MathUtil");
const MsgMgr_1 = require("../../../core_wq/msg/MsgMgr");
const ShareMgr_1 = require("../../../core_wq/msg/ShareMgr");
const ViewMgr_1 = require("../../../core_wq/view/ViewMgr");
const ViewConst_1 = require("../../../core_wq/view/const/ViewConst");
/**
 * 新武将界面
 */
class NewHeroView extends BaseView_1.default {
    constructor() {
        super(LayerMgr_1.default.Ins.frameLayer, layaMaxUI_1.ui.moduleView.hall.NewHeroViewUI);
        this._money = 0;
    }
    initData() {
        super.initData();
        if (this.datas && this.datas.length > 0) {
            this._heroVO = GlobalData_1.default.getData(GlobalData_1.default.HeroVO, this.datas[0]);
            if (this._heroVO) {
                this.ui.txt_name.text = this._heroVO.name;
                this._bone = new BoneAnim_1.default(this._heroVO.modelImgUrl, true, true);
                this._bone.completeBack = () => {
                };
                this.addChild(this._bone);
                this._bone.scale(1.5, 1.5);
                this._bone.pos(238, 445);
            }
            this._heroInfo = GlobalData_1.default.getData(GlobalData_1.default.HeroConfigVO, HallControl_1.default.Ins.Model.heroLevel);
            if (this._heroInfo) {
                this.ui.txt_exp.text = "经验: +" + this._heroInfo.syntheticExp;
                this.ui.txt_income.text = "收益: +" + MathUtil_1.default.unitConversion(this._heroInfo.PerSecCoin) + "/秒";
                let curPrice = HallControl_1.default.Ins.Model.getHeroBuyPrice(this._heroInfo.buyPrice, HallControl_1.default.Ins.Model.queryBuyHeroRecord(this._heroInfo.id));
                this._money = curPrice * 0.6;
            }
            this.ui.txt_price.text = "+" + MathUtil_1.default.unitConversion(this._money);
        }
    }
    addEvents() {
        this.ui.btn_reward.on(Laya.Event.CLICK, this, this.onGetReward);
    }
    removeEvents() {
        this.ui.btn_reward.off(Laya.Event.CLICK, this, this.onGetReward);
    }
    onGetReward() {
        if (AppConfig_1.default.isDebug && Laya.Browser.onPC) {
            this.sendReward();
        }
        else {
            ShareMgr_1.default.Ins.showShareOrAdv(() => {
                this.sendReward();
            });
        }
    }
    sendReward() {
        MsgMgr_1.default.Ins.showMsg("您已获得铜钱:" + MathUtil_1.default.unitConversion(this._money));
        HallControl_1.default.Ins.updateGold(this._money, false);
        ViewMgr_1.default.Ins.close(ViewConst_1.default.NewHeroView);
    }
    close(...param) {
        super.close(param);
        this._heroVO = null;
        this._heroInfo = null;
        if (this._bone)
            this._bone.destroy();
    }
}
exports.default = NewHeroView;
