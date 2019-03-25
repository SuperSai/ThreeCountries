"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCharacter_1 = require("./base/BaseCharacter");
const GlobalData_1 = require("../../../core_wq/db/GlobalData");
const PathConfig_1 = require("../../../core_wq/config/PathConfig");
const EffectUtil_1 = require("../../../core_wq/utils/EffectUtil");
const PointUtils_1 = require("../../../core_wq/utils/PointUtils");
const MathUtil_1 = require("../../../core_wq/utils/MathUtil");
const ItemExplode_1 = require("../../../core_wq/effect/ItemExplode");
class Hero extends BaseCharacter_1.default {
    constructor() {
        super();
        this.heroId = 0;
        this.hp = 6;
        this.maxHp = 6;
        /** 是否显示自白 */
        this._isShowDialogue = false;
        /** 自白列表 */
        this._dialogueList = [];
        /** 英雄模型路径 */
        this._heroPath = '';
        /** 坐骑模型路径 */
        this._horsePath = '';
        this._heroBone = null;
        this._horseBone = null;
        /** 攻击动画key */
        this._atkAnimKey = 'attack';
        this._walkKey = "walk";
        this._heroKey = "hero_key";
        this._horseKey = "horse_key";
        /** 骨骼动画模板 */
        this._spineFactory = [];
        this._enemyData = null;
        this._enemyModelUrlArray = [
            { id: "enemy_1", heroUrl: "images/boneAnim/enemy/bubinglv.sk", horseUrl: "" },
            { id: "enemy_2", heroUrl: "images/boneAnim/enemy/gongbinglv.sk", horseUrl: "" },
            { id: "enemy_3", heroUrl: "images/boneAnim/enemy/qibinglv.sk", horseUrl: "" },
        ]; //敌军模型
    }
    /** 设置人物龙骨 */
    setCharacterBone(id) {
        super.setCharacterBone(id);
        this.heroId = id;
        this._heroVO = GlobalData_1.default.getData(GlobalData_1.default.HeroVO, this.heroId);
        if (this._heroVO) {
            //设置独白
            this._dialogueList = [this._heroVO.dialogue];
            this._atkAnimKey = this._heroVO.atkAnimKey;
            //移除老模型
            this.removeChildByName(this._heroKey);
            this.removeChildByName(this._horseKey);
            this.state = -1;
            this.createHeroBone();
        }
    }
    /** 创建英雄龙骨动画 */
    createHeroBone() {
        this._heroPath = this._heroVO.modelImgUrl;
        if (this._heroPath && this._heroPath.length > 0) {
            this._heroPath = PathConfig_1.default.BONE_PATH.replace("{0}", this._heroPath);
        }
        this._heroBone = Laya.Pool.getItemByClass("bone" + this.heroId, Laya.Skeleton);
        if (this._heroBone.name != (this._heroKey + this.heroId)) {
            if (this._heroPath && this._heroPath.length > 0) {
                this.createSpineTemplate(this._heroPath, (spineFactory) => {
                    this._heroBone = spineFactory.buildArmature(0);
                    this._heroBone.name = this._heroKey + this.heroId;
                    this._heroBone.zOrder = 1;
                    this._heroBone.playbackRate(0.7);
                    this.addChild(this._heroBone);
                    this._heroBone.pos(50, 140);
                    if (this._horsePath == null || this._horsePath.length < 1) { //没坐骑,坐标下调
                        this._heroBone.y += 50;
                    }
                    this._heroBone.play(this._walkKey, true);
                });
            }
        }
        else {
            this.addChild(this._heroBone);
            this._heroBone.play(this._walkKey, true);
        }
    }
    /** 创建坐骑龙骨动画 */
    createHorseBone() {
        this._horsePath = this._heroVO.horse == "0" ? "" : this._heroVO.horse;
        if (this._horsePath && this._horsePath.length > 0) {
            this._horsePath = PathConfig_1.default.BONE_PATH.replace("{0}", this._horsePath);
        }
        this._horseBone = Laya.Pool.getItemByClass("horse_bone" + this.heroId, Laya.Skeleton);
        if (this._horseBone.name != (this._horseKey + this.heroId)) {
            if (this._horsePath && this._horsePath.length > 0) {
                this.createSpineTemplate(this._horsePath, (_spineFactory) => {
                    this._horseBone = _spineFactory.buildArmature(0);
                    this._horseBone.name = this._horseKey + this.heroId;
                    this._horseBone.playbackRate(0.7);
                    this.addChild(this._horseBone);
                    this._horseBone.pos(50, 140);
                    this._horseBone.play(this._walkKey, true);
                });
            }
        }
        else {
            this.addChild(this._horseBone);
            this._horseBone.play(this._walkKey, true);
        }
    }
    /** 动画播放状态 */
    playAnimation(state = 0, callback = null) {
        if (this.state == state)
            return;
        this.state = state;
        if (this.state == 1) {
            //自动切回步行
            this.timerOnce(180, this, () => {
                this.playAnimation(0);
            });
            if (this._heroBone)
                this._heroBone.play(this._atkAnimKey, false);
        }
        else {
            if (this._heroBone)
                this._heroBone.play(this._walkKey, true);
        }
    }
    /** 创建动画模版 */
    createSpineTemplate(url, parseComplete) {
        if (url == null)
            return;
        let spineFactory = this._spineFactory[url];
        if (spineFactory == null) {
            spineFactory = new Laya.Templet();
            spineFactory.on(Laya.Event.COMPLETE, this, () => {
                parseComplete && parseComplete(spineFactory);
                this._spineFactory[url] = spineFactory;
            });
            spineFactory.loadAni(url);
        }
        else {
            parseComplete && parseComplete(spineFactory);
        }
    }
    /** 刷新收益时间 */
    refreshIncomeTime(actCallback = null) {
        if (this.incomeTime > 0) {
            this.incomeTime -= 1 / this.moveAccelerate;
            //人物自白
            if (this._isShowDialogue == false && (this.incomeTime > 90 && this.incomeTime < 91)) {
                let dialogueIndex = Math.floor(Math.random() * 10) % (this._dialogueList.length);
                let dialogueText = this._dialogueList[dialogueIndex];
                if (Math.random() < 0.1 && dialogueText) {
                    this._isShowDialogue = true;
                    let isFlipX = this.x > Laya.stage.width * 0.8;
                    let txtPos = { x: this.width / 2, y: 50 };
                    //适配大将军
                    if (isFlipX == false) {
                        txtPos.x += 50;
                        if (this._horsePath == null || this._horsePath.length < 1) {
                            txtPos.y += 60;
                        }
                    }
                    EffectUtil_1.default.playDialogueEffect(this, "images/component/game_dialogue_frame.png", dialogueText, txtPos, 1, isFlipX);
                }
            }
        }
        else {
            this.delayMoveTime = 50; //停止动画
            this.setIncomeTime(); //重置收益
            this._isShowDialogue = false;
            Laya.Tween.to(this, { x: (this.orginalX + 180) }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                Laya.Tween.clearTween(this);
                this.playAnimation(1);
                actCallback && actCallback();
                Laya.Tween.to(this, { x: this.orginalX }, Math.abs(this.x - this.orginalX) * 15, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                    Laya.Tween.clearTween(this);
                }));
            }));
            return true;
        }
        return false;
    }
    /** 创建攻击对象 */
    createAttackTarget(parentNode, startPos) {
        if (this.attackSprite == null) {
            let hero = new Hero();
            hero.size(100, 100);
            hero.pivot(50, 50);
            hero.scaleX = -1;
            this._enemyData = this._enemyModelUrlArray[Math.floor(Math.random() * 10) % this._enemyModelUrlArray.length];
            let animName = 'walk';
            let isLoop = true;
            let frameRate = 0.7;
            let enemy = Laya.Pool.getItemByClass(this._enemyData.id, Laya.Skeleton);
            if (enemy.name != this._enemyData.id) {
                if (this._enemyData.heroUrl != "") {
                    this.createSpineTemplate(this._enemyData.heroUrl, (_spineFactory) => {
                        enemy = _spineFactory.buildArmature(0);
                        enemy.name = this._enemyData.id;
                        enemy.zOrder = 1;
                        enemy.playbackRate(frameRate);
                        hero.addChild(enemy);
                        enemy.pos(50, 200);
                        if (this._enemyData.horseUrl != "") { //有坐骑,坐标下调
                            enemy.y -= 50;
                        }
                        enemy.play(animName, isLoop);
                    });
                }
            }
            else {
                hero.addChild(enemy);
                enemy.play(animName, isLoop);
            }
            //敌人坐骑
            let enemyHorse = hero.getChildByName(this._horseKey);
            if (enemyHorse == null) {
                if (this._enemyData.horseUrl != "") {
                    this.createSpineTemplate(this._enemyData.horseUrl, (_spineFactory) => {
                        enemyHorse = _spineFactory.buildArmature(0);
                        enemyHorse.name = this._horseKey;
                        enemyHorse.playbackRate(frameRate);
                        hero.addChild(enemyHorse);
                        enemyHorse.pos(50, 150);
                        enemyHorse.play(animName, isLoop);
                    });
                }
            }
            else {
                enemyHorse.play(animName, isLoop);
            }
            if (parentNode) {
                parentNode.addChild(hero);
                hero.pos(startPos.x, startPos.y);
                let heroInfo = GlobalData_1.default.getData(GlobalData_1.default.HeroConfigVO, this.heroId);
                if (heroInfo) {
                    hero.setMoveSpeedRatio(heroInfo.speed);
                }
                hero.zOrder = Math.floor(hero.y);
            }
            this.attackSprite = hero;
        }
        return this.attackSprite;
    }
    /** 移除敌人 */
    removeEnemy(isKill = false) {
        if (this.attackSprite) {
            if (isKill) {
                let heroSp = this.attackSprite.getChildByName(this._enemyData.id);
                if (heroSp)
                    heroSp.stop();
                let horseSp = this.attackSprite.getChildByName(this._horseKey);
                if (horseSp)
                    horseSp.stop();
                //渐隐
                let targetPos = PointUtils_1.default.localToGlobal(this.attackSprite);
                EffectUtil_1.default.playBoneEffect("ui_hit_03", { x: targetPos.x, y: targetPos.y + 100 });
                let explode = new ItemExplode_1.default();
                if (this.attackSprite && this.attackSprite.parent && explode) {
                    this.attackSprite.parent.addChild(explode.play(this.attackSprite.x, this.attackSprite.y + 100).scale(0.8, 0.8));
                }
                this.frameLoop(1, this, this.onRemoveEnemyFly);
            }
            else {
                this.attackSprite.removeSelf();
                Laya.Pool.recover(this._enemyData.id, this.attackSprite.getChildByName(this._enemyData.id));
                this.attackSprite = null;
            }
        }
    }
    onRemoveEnemyFly() {
        this.attackSprite.rotation += 7;
        this.attackSprite.x += MathUtil_1.default.rangeInt(5, 20);
        this.attackSprite.y -= MathUtil_1.default.rangeInt(5, 10);
        if (this.attackSprite.y <= -this.attackSprite.height) {
            this.clearTimer(this, this.onRemoveEnemyFly);
            this.attackSprite.removeSelf();
            Laya.Pool.recover(this._enemyData.id, this.attackSprite.getChildByName(this._enemyData.id));
            this.attackSprite = null;
        }
    }
    get heroKey() {
        return this._heroKey;
    }
    get heroBone() {
        return this._heroBone;
    }
}
exports.default = Hero;
