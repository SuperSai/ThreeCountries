"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../../ui/layaMaxUI");
const GlobalData_1 = require("../../../../core_wq/db/GlobalData");
const PathConfig_1 = require("../../../../core_wq/config/PathConfig");
const Hero_1 = require("../../hero/Hero");
const HallControl_1 = require("../../HallControl");
const PlayerMgr_1 = require("../../../../core_wq/player/PlayerMgr");
const GuideMgr_1 = require("../../../../core_wq/guide/GuideMgr");
const EffectUtil_1 = require("../../../../core_wq/utils/EffectUtil");
class HeadItem extends layaMaxUI_1.ui.moduleView.hall.item.HeadItemUI {
    constructor() {
        super();
        /** 战斗的英雄 */
        this._battleHero = null;
        /** 0空,1战斗中,2拖动,3宝箱 */
        this._stage = HEAD_ITEM_STAGE.IDLE;
        /** 是否上锁 */
        this._isLock = false;
        /** 英雄位置下标 */
        this.heroIndex = -1;
        this._reviveTime = 0;
        this.isDie = false;
    }
    set dataSource(value) {
        this._info = value;
        this.imgHead.visible = false;
        if (this._info && this._info.heroId > 0) {
            this.updateHeadSkin(this._info.heroId);
        }
    }
    /** 更新头像 */
    updateHeadSkin(heroId, index = -1) {
        this.boxLevel.visible = this.imgHead.visible = heroId > 0;
        this.imgLock.visible = heroId < 0;
        if (index >= 0) {
            this.heroIndex = index;
        }
        if (heroId > 0) {
            if (this._info)
                this._info.heroId = heroId;
            this._heroVO = GlobalData_1.default.getData(GlobalData_1.default.HeroVO, heroId);
            if (this._heroVO) {
                this.imgHead.skin = PathConfig_1.default.HEAD_PATH + this._heroVO.imgUrl;
                this.txt_level.text = this._heroVO.id + "";
            }
        }
    }
    /** 创建战斗中的英雄 */
    createBattleHero(parentNode, startPos) {
        if (this._battleHero == null) {
            let hero = new Hero_1.default();
            hero.setCharacterBone(this._info.heroId);
            hero.pivot(41, 35);
            if (parentNode) {
                parentNode.addChild(hero);
                hero.pos(startPos.x, startPos.y);
                let heroInfo = GlobalData_1.default.getData(GlobalData_1.default.HeroConfigVO, this._info.heroId);
                if (heroInfo) {
                    hero.setMoveSpeedRatio(heroInfo.speed);
                }
                this.timerOnce(500, this, () => {
                    hero.playMoveAction();
                });
            }
            this._battleHero = hero;
            this.hpBar.value = hero.hp / hero.maxHp;
            this.hpBar.visible = true;
            this.reviveBar.visible = false;
            this.reviveBar.value = 0;
        }
        return this._battleHero;
    }
    /** 更新血量 */
    updateHp(value = 1) {
        if (GuideMgr_1.default.Ins.isGuide || this._battleHero == null)
            return;
        EffectUtil_1.default.playBoneEffect("hit_01", { x: this._battleHero.x, y: this._battleHero.y + 100 });
        this._battleHero.hp = this._battleHero.hp - value;
        this.hpBar.value = this._battleHero.hp / this._battleHero.maxHp;
        if (this.hpBar.value <= 0) {
            this.isDie = true;
            this._battleHero.IsInPosition = false;
            this._battleHero.visible = false;
            HallControl_1.default.Ins.setBattleHeroCount(PlayerMgr_1.default.Ins.Info.userRuncarCount - 1);
            this.hpBar.visible = false;
            this.reviveBar.visible = true;
            this.timerLoop(1000, this, this.heroReviveTime);
        }
    }
    heroReviveTime() {
        this._reviveTime += 1;
        this.reviveBar.value = this._reviveTime / 6;
        if (this._reviveTime >= 6) {
            this.clearTimer(this, this.heroReviveTime);
            this.reviveBar.visible = false;
            this.reviveBar.value = 0;
            this._reviveTime = 0;
            if (this._battleHero) {
                EffectUtil_1.default.playBoneEffect("ui_born", { x: this._battleHero.x - 20, y: this._battleHero.y + 200 });
            }
            this.timerOnce(100, this, () => {
                if (this._battleHero) {
                    this._battleHero.hp = this._battleHero.maxHp;
                    this.hpBar.value = this._battleHero.maxHp;
                    this._battleHero.visible = true;
                    this._battleHero.IsInPosition = true;
                }
                this.hpBar.visible = true;
                HallControl_1.default.Ins.setBattleHeroCount(PlayerMgr_1.default.Ins.Info.userRuncarCount + 1);
                this.isDie = false;
            });
        }
    }
    /** 移除战斗中的英雄 */
    removeBattleHero() {
        if (this._battleHero) {
            this._battleHero.removeEnemy();
            this._battleHero.removeSelf();
            Laya.Pool.recover("bone" + this._battleHero.heroId, this._battleHero.heroBone);
            this._battleHero = null;
        }
    }
    /** 获取战斗中的英雄 */
    get BattleHero() {
        return this._battleHero;
    }
    /** 设置战斗中的英雄 */
    set BattleHero(battleHero) {
        this._battleHero = battleHero;
    }
    /** 英雄出售价格 */
    getSellPrice() {
        if (this._heroVO) {
            let heroConfigVO = GlobalData_1.default.getData(GlobalData_1.default.HeroConfigVO, this._heroVO.id);
            if (heroConfigVO)
                return heroConfigVO.buyPrice * 0.8;
        }
        return 0;
    }
    /** 重置 */
    reset() {
        if (this._info)
            this._info.heroId = 0;
        if (this._heroVO)
            this._heroVO = null;
        this.hpBar.visible = false;
        this.reviveBar.visible = false;
        this.hpBar.value = 1;
        this.reviveBar.value = 0;
        this.updateHeadSkin(0);
        this.setStage(0);
        this.removeBattleHero();
    }
    /** 设置锁 */
    setLock(isLock) {
        this._isLock = this.imgLock.visible = isLock;
    }
    /** 0空,1战斗中,2拖动,3宝箱 */
    setStage(stage) {
        if (this._isLock)
            return;
        this._stage = stage;
    }
    /** 是否在战斗中 */
    get IsBattle() {
        return this._stage == HEAD_ITEM_STAGE.BATTLE;
    }
    /** 是否闲置 */
    get IsEmpty() {
        return this._stage <= HEAD_ITEM_STAGE.IDLE;
    }
    /** 是否宝箱 */
    get IsBox() {
        return this._stage == HEAD_ITEM_STAGE.BOX;
    }
    /** 是否上锁 */
    get IsLock() {
        return this._isLock;
    }
    /** 0空,1战斗中,2拖动,3宝箱 */
    get HeroStage() { return this._stage; }
    get Info() { return this._info; }
    get heroVO() {
        return this._heroVO;
    }
}
exports.default = HeadItem;
var HEAD_ITEM_STAGE;
(function (HEAD_ITEM_STAGE) {
    /** 空闲 */
    HEAD_ITEM_STAGE[HEAD_ITEM_STAGE["IDLE"] = 0] = "IDLE";
    /** 战斗中 */
    HEAD_ITEM_STAGE[HEAD_ITEM_STAGE["BATTLE"] = 1] = "BATTLE";
    /** 拖动 */
    HEAD_ITEM_STAGE[HEAD_ITEM_STAGE["DROP"] = 2] = "DROP";
    /** 宝箱 */
    HEAD_ITEM_STAGE[HEAD_ITEM_STAGE["BOX"] = 3] = "BOX";
})(HEAD_ITEM_STAGE || (HEAD_ITEM_STAGE = {}));
