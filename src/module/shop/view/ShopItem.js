"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const GlobalData_1 = require("../../../core_wq/db/GlobalData");
const PathConfig_1 = require("../../../core_wq/config/PathConfig");
const HallControl_1 = require("../../hall/HallControl");
const ShareMgr_1 = require("../../../core_wq/msg/ShareMgr");
const MathUtil_1 = require("../../../core_wq/utils/MathUtil");
const PlayerMgr_1 = require("../../../core_wq/player/PlayerMgr");
const MsgMgr_1 = require("../../../core_wq/msg/MsgMgr");
const StorageUtil_1 = require("../../../core_wq/utils/StorageUtil");
const ViewMgr_1 = require("../../../core_wq/view/ViewMgr");
const ViewConst_1 = require("../../../core_wq/view/const/ViewConst");
class ShopItem extends layaMaxUI_1.ui.moduleView.shop.ShopItemUI {
    constructor() {
        super();
        this._firstLockId = 0;
        this._buyPrice = 0;
    }
    set dataSource(value) {
        if (value) {
            this._config = value;
            this.init();
            this.addEvents();
        }
    }
    init() {
        this._vo = GlobalData_1.default.getData(GlobalData_1.default.HeroVO, this._config.id);
        if (this._vo) {
            this.imgIcon.skin = PathConfig_1.default.HEAD_PATH + this._vo.imgUrl;
            if (HallControl_1.default.Ins.Model.heroLevel < this._config.id) {
                this.imgIcon.gray = true;
                this.boxName.visible = false;
            }
            else {
                this.imgIcon.gray = false;
                this.boxName.visible = true;
                this.txt_level.text = this._config.id + "";
                let strNewName = '';
                for (var index = 0; index < this._config.name.length; index++) {
                    var element = this._config.name[index];
                    if (element) {
                        strNewName += element + '\n';
                    }
                }
                this.txt_name.text = strNewName;
            }
            this.btn_buyLock.visible = HallControl_1.default.Ins.Model.heroLevel < this._config.unlockNeedId;
            this.btn_buy.visible = !this.btn_buyLock.visible;
            if (this.btn_buy.visible && HallControl_1.default.Ins.Model.heroLevel < this._config.unlockNeedId && this._firstLockId < 1) {
                this._firstLockId = this._config.unlockNeedId;
            }
            if (this._firstLockId > 0) {
                this.btn_buyDiamond.visible = this._firstLockId == this._config.unlockNeedId;
                if (this.btn_buyDiamond.visible) {
                    this.updateAdvBtn();
                }
            }
            else {
                this.btn_buyDiamond.visible = false;
            }
            this.updateBuyPrice();
            this.updateLockHeroBtn();
        }
    }
    updateBuyPrice() {
        if (this.btn_buy.visible) {
            this._buyPrice = HallControl_1.default.Ins.Model.getHeroBuyPrice(this._config.buyPrice, HallControl_1.default.Ins.Model.queryBuyHeroRecord(this._config.id));
            this.txt_price.text = MathUtil_1.default.unitConversion(this._buyPrice);
        }
    }
    addEvents() {
        this.btn_buy.on(Laya.Event.CLICK, this, this.onBuyHero);
        this.btn_adv.on(Laya.Event.CLICK, this, this.onLookAdv);
        this.btn_buyDiamond.on(Laya.Event.CLICK, this, this.onBuyDiamondHero);
    }
    removeEvents() {
        this.btn_buy.off(Laya.Event.CLICK, this, this.onBuyHero);
        this.btn_adv.off(Laya.Event.CLICK, this, this.onLookAdv);
        this.btn_buyDiamond.off(Laya.Event.CLICK, this, this.onBuyDiamondHero);
    }
    /** 购买英雄 */
    onBuyHero() {
        if (PlayerMgr_1.default.Ins.Info.userGold >= this._buyPrice) {
            HallControl_1.default.Ins.buyHero(this._config);
            this.updateBuyPrice();
        }
        else {
            MsgMgr_1.default.Ins.showMsg("主人,铜钱不够喔~快去做任务吧...");
        }
    }
    /** 看视频 */
    onLookAdv() {
        ShareMgr_1.default.Ins.showShareOrAdv(() => {
            let hero = HallControl_1.default.Ins.createHero(this._config.id, true);
            if (hero == null) {
                StorageUtil_1.default.saveHeroStore(this._config.id);
                MsgMgr_1.default.Ins.showMsg("主人,武将已打包到箱子里了哦~记得点击箱子喲!");
            }
            this.updateAdvBtn();
        }, 11, false, true);
    }
    /** 钻石购买英雄 */
    onBuyDiamondHero() {
        ViewMgr_1.default.Ins.open(ViewConst_1.default.DiamondBuyView, null, { type: "hero", value: this._config.id });
    }
    /** 未解锁按钮处理 */
    updateLockHeroBtn() {
        if (!this.btn_buyLock.visible)
            return;
        let lockConfig = GlobalData_1.default.getData(GlobalData_1.default.HeroVO, this._config.unlockNeedId);
        if (lockConfig) {
            this.imgHero.skin = PathConfig_1.default.HEAD_PATH + lockConfig.imgUrl;
            // if (!this.imgHero.filters) {
            //     this.imgHero.filters = ColorUtil.createColorFilter(2);
            // }
            // this.imgHero.alpha = 0.6;
            this.txt_unlockLevel.text = this._config.unlockNeedId + "";
            if (this._config.unlockNeedId >= 1000) {
                this.txt_unlockLevel.text = "?";
            }
        }
    }
    updateAdvBtn() {
        if (ShareMgr_1.default.Ins.getAdTimes(11) < 1 && ShareMgr_1.default.Ins.getShareTimes(11) < 1) {
            this.btn_adv.visible = false;
        }
        else {
            if (ShareMgr_1.default.Ins.isAdStage(11)) {
                this.btn_adv.skin = "images/shop/shop_free_video.png";
            }
            else {
                this.btn_adv.skin = "images/shop/shop_free_share.png";
            }
        }
    }
}
exports.default = ShopItem;
