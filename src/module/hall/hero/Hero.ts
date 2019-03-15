import BaseCharacter from "./base/BaseCharacter";
import GlobalData from "../../../core_wq/db/GlobalData";
import HeroVO from "../../../core_wq/db/vo/HeroVO";
import PathConfig from "../../../core_wq/config/PathConfig";
import EffectUtil from "../../../core_wq/utils/EffectUtil";
import HeroConfigVO from "../../../core_wq/db/vo/HeroConfigVO";
import PointUtils from "../../../core_wq/utils/PointUtils";
import MathUtil from "../../../core_wq/utils/MathUtil";

export default class Hero extends BaseCharacter {

    public heroId: number = 0;
    public hp: number = 6;
    public maxHp: number = 6;
    private _heroVO: HeroVO;
    /** 是否显示自白 */
    private _isShowDialogue: boolean = false;
    /** 自白列表 */
    private _dialogueList: Array<string> = [];
    /** 英雄模型路径 */
    private _heroPath: string = '';
    /** 坐骑模型路径 */
    private _horsePath: string = '';
    /** 攻击动画key */
    private _atkAnimKey: string = 'attack';
    private _heroKey: string = "hero_key";
    private _horseKey: string = "horse_key";
    /** 骨骼动画模板 */
    private _spineFactory: Array<Laya.Templet> = [];
    private _enemyModelUrlArray: Array<any> = [
        { heroUrl: "images/boneAnim/enemy/bubinglv.sk", horseUrl: "" },
        { heroUrl: "images/boneAnim/enemy/gongbinglv.sk", horseUrl: "" },
        { heroUrl: "images/boneAnim/enemy/qibinglv.sk", horseUrl: "" },
    ]; //敌军模型

    constructor() { super(); }

    /** 设置人物龙骨 */
    public setCharacterBone(id: number): void {
        super.setCharacterBone(id);
        this.heroId = id;
        this._heroVO = GlobalData.getData(GlobalData.HeroVO, this.heroId);
        if (this._heroVO) {
            //设置独白
            this._dialogueList = [this._heroVO.dialogue];
            this._heroPath = this._heroVO.modelImgUrl;
            if (this._heroPath && this._heroPath.length > 0) {
                this._heroPath = PathConfig.BONE_PATH.replace("{0}", this._heroPath);
            }
            this._horsePath = this._heroVO.horse == "0" ? "" : this._heroVO.horse;
            if (this._horsePath && this._horsePath.length > 0) {
                this._horsePath = PathConfig.BONE_PATH.replace("{0}", this._horsePath);
            }
            this._atkAnimKey = this._heroVO.atkAnimKey;
            //移除老模型
            this.removeChildByName(this._heroKey);
            this.removeChildByName(this._horseKey);
            this.state = -1;
        }
        //英雄/坐骑
        this.playAnimation();
    }

    /** 动画播放状态 */
    public playAnimation(state: number = 0, callback: any = null): void {
        if (this.state == state) return;
        this.state = state;
        let animName: string = 'walk';
        let isLoop: boolean = true;
        let frameRate: number = 0.7;
        if (this.state == 1) {
            animName = this._atkAnimKey;
            isLoop = false;
            //自动切回步行
            this.timerOnce(180, this, () => {
                this.playAnimation(0);
            })
        }
        //英雄
        let spPos = new Laya.Point(50, 140);
        let heroSp = this.getChildByName(this._heroKey) as Laya.Skeleton;
        if (heroSp == null) {
            if (this._heroPath && this._heroPath.length > 0) {
                this.createSpineTemplate(this._heroPath, (_spineFactory: Laya.Templet) => {
                    heroSp = _spineFactory.buildArmature(0);
                    heroSp.name = this._heroKey;
                    heroSp.zOrder = 1;
                    heroSp.playbackRate(frameRate);
                    this.addChild(heroSp);
                    heroSp.pos(spPos.x, spPos.y);
                    if (this._horsePath == null || this._horsePath.length < 1) {
                        //没坐骑,坐标下调
                        heroSp.pos(spPos.x, spPos.y + 50);
                    }
                    heroSp.play(animName, isLoop);
                });
            }
        } else {
            heroSp.play(animName, isLoop);
        }
        //坐骑
        let horseSp = this.getChildByName(this._horseKey) as Laya.Skeleton;
        if (horseSp == null) {
            if (this._horsePath && this._horsePath.length > 0) {
                this.createSpineTemplate(this._horsePath, (_spineFactory: Laya.Templet) => {
                    horseSp = _spineFactory.buildArmature(0);
                    horseSp.name = this._horseKey;
                    horseSp.playbackRate(frameRate);
                    this.addChild(horseSp);
                    horseSp.pos(spPos.x, spPos.y);
                    horseSp.play(animName, isLoop);
                });
            }
        } else {
            horseSp.play(animName, isLoop);
        }
    }

    /** 创建动画模版 */
    public createSpineTemplate(url: string, parseComplete: any) {
        if (url == null) return;
        let spineFactory = this._spineFactory[url];
        if (spineFactory == null) {
            spineFactory = new Laya.Templet();
            spineFactory.on(Laya.Event.COMPLETE, this, () => {
                parseComplete && parseComplete(spineFactory);
                this._spineFactory[url] = spineFactory;
            });
            spineFactory.loadAni(url);
        } else {
            parseComplete && parseComplete(spineFactory);
        }
    }

    /** 刷新收益时间 */
    public refreshIncomeTime(actCallback: any = null): boolean {
        if (this.incomeTime > 0) {
            this.incomeTime -= 1 / this.moveAccelerate;
            //人物自白
            if (this._isShowDialogue == false && (this.incomeTime > 90 && this.incomeTime < 91)) {
                let dialogueIndex: number = Math.floor(Math.random() * 10) % (this._dialogueList.length);
                let dialogueText = this._dialogueList[dialogueIndex] as string;
                if (Math.random() < 0.1 && dialogueText) {
                    this._isShowDialogue = true;
                    let isFlipX: boolean = this.x > Laya.stage.width * 0.8;
                    let txtPos = { x: this.width / 2, y: 50 };
                    //适配大将军
                    if (isFlipX == false) {
                        txtPos.x += 50;
                        if (this._horsePath == null || this._horsePath.length < 1) {
                            txtPos.y += 60;
                        }
                    }
                    EffectUtil.playDialogueEffect(this, "images/component/game_dialogue_frame.png", dialogueText, txtPos, 1, isFlipX);
                }
            }
        } else {
            this.delayMoveTime = 50; //停止动画
            //重置收益
            this.setIncomeTime();
            this._isShowDialogue = false;
            //后退
            let actionSp: Hero = this;
            let timeLine = new Laya.TimeLine();
            timeLine.addLabel("tl1", 0).to(actionSp, { x: (this.orginalX + 180) }, 500, Laya.Ease.linearNone)
            timeLine.on(Laya.Event.COMPLETE, actionSp, () => {
                this.playAnimation(1);
                actCallback && actCallback();
                //恢复初始位置
                let timeLine = new Laya.TimeLine();
                timeLine.addLabel("tl1", 0).to(actionSp, { x: this.orginalX }, Math.abs(actionSp.x - this.orginalX) * 15, Laya.Ease.linearNone)
                timeLine.play(0, false);
            });
            timeLine.play(0, false);
            return true;
        }
        return false;
    }

    /** 创建攻击对象 */
    public createAttackTarget(parentNode: Laya.Node, startPos: Laya.Point): BaseCharacter {
        if (this.attackSprite == null) {
            let hero = new Hero();
            hero.size(100, 100);
            hero.pivot(50, 50);
            hero.scaleX = -1;
            let enemyHeroPath: string = PathConfig.BONE_MONSTER_PATH.replace("{0}", "bubinglv");
            let enemyHorsePath: string = "";
            let enemyData = this._enemyModelUrlArray[Math.floor(Math.random() * 10) % this._enemyModelUrlArray.length];
            if (enemyData) {
                enemyHeroPath = enemyData.heroUrl;
                enemyHorsePath = enemyData.horseUrl;
            }
            let animName: string = 'walk';
            let isLoop: boolean = true;
            let frameRate: number = 0.7;
            //英雄
            let spPos = new Laya.Point(50, 150);
            let heroSp = hero.getChildByName(this._heroKey) as Laya.Skeleton;
            if (heroSp == null) {
                if (enemyHeroPath && enemyHeroPath.length > 0) {
                    this.createSpineTemplate(enemyHeroPath, (_spineFactory: Laya.Templet) => {
                        heroSp = _spineFactory.buildArmature(0);
                        heroSp.name = this._heroKey;
                        heroSp.zOrder = 1;
                        heroSp.playbackRate(frameRate);
                        hero.addChild(heroSp);
                        heroSp.pos(spPos.x, spPos.y);
                        if (enemyHorsePath == null || enemyHorsePath.length < 1) {
                            //没坐骑,坐标下调
                            heroSp.pos(spPos.x, spPos.y + 50);
                        }
                        heroSp.play(animName, isLoop);
                    });
                }
            } else {
                heroSp.play(animName, isLoop);
            }
            //坐骑
            let horseSp = hero.getChildByName(this._horseKey) as Laya.Skeleton;
            if (horseSp == null) {
                if (enemyHorsePath && enemyHorsePath.length > 0) {
                    this.createSpineTemplate(enemyHorsePath, (_spineFactory: Laya.Templet) => {
                        horseSp = _spineFactory.buildArmature(0);
                        horseSp.name = this._horseKey;
                        horseSp.playbackRate(frameRate);
                        hero.addChild(horseSp);
                        horseSp.pos(spPos.x, spPos.y);
                        horseSp.play(animName, isLoop);
                    });
                }
            } else {
                horseSp.play(animName, isLoop);
            }
            if (parentNode) {
                parentNode.addChild(hero);
                hero.pos(startPos.x, startPos.y);
                let heroInfo: HeroConfigVO = GlobalData.getData(GlobalData.HeroConfigVO, this.heroId);
                if (heroInfo) {
                    hero.setMoveSpeedRatio(heroInfo.speed);
                }
                hero.zOrder = Math.floor(hero.y);
            }
            this.attackSprite = hero;
        }
        return this.attackSprite;
    }

    /** 移除攻击对象 */
    public removeAttackTarget(isKill: boolean = false): void {
        if (this.attackSprite) {
            this.attackSprite.stopMoveAction();
            if (isKill) {
                let heroSp = this.attackSprite.getChildByName(this._heroKey) as Laya.Skeleton;
                if (heroSp) {
                    heroSp.stop();
                }
                let horseSp = this.attackSprite.getChildByName(this._horseKey) as Laya.Skeleton;
                if (horseSp) {
                    horseSp.stop();
                }
                //渐隐
                let actionSp: Hero = this.attackSprite as Hero;
                let targetPos: any = PointUtils.localToGlobal(actionSp);
                EffectUtil.playBoneEffect("ui_hit_03", { x: targetPos.x, y: targetPos.y + 100 });
                this.frameLoop(1, this, this.attackTargetFly, [actionSp]);
                // let timeLine = new Laya.TimeLine();
                // timeLine.addLabel("tl11", 0).from(actionSp, { alpha: 1 }, 200, Laya.Ease.linearNone)
                //     .addLabel("tl1", 200).from(actionSp, { alpha: 0 }, 100, Laya.Ease.linearNone)
                //     .addLabel("tl2", 100).to(actionSp, { alpha: 0.8 }, 200, Laya.Ease.linearNone)
                //     .addLabel("tl3", 200).to(actionSp, { alpha: 0 }, 100, Laya.Ease.linearNone)
                // timeLine.on(Laya.Event.COMPLETE, actionSp, () => {
                //     actionSp.removeSelf();
                //     this.attackSprite = null;
                // });
                // timeLine.play(0, false);
            } else {
                this.attackSprite.removeSelf();
                this.attackSprite = null;
            }
        }
    }

    private attackTargetFly(actionSp: Hero): void {
        actionSp.rotation += 7;
        actionSp.x += MathUtil.rangeInt(5, 20);
        actionSp.y -= MathUtil.rangeInt(5, 10);
        if (actionSp.y <= -actionSp.height) {
            this.clearTimer(this, this.attackTargetFly);
            actionSp.removeSelf();
            this.attackSprite = null;
        }
    }

    public get heroKey(): string {
        return this._heroKey;
    }
}