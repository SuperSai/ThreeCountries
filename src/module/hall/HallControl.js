"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HallModel_1 = require("./model/HallModel");
const GlobalData_1 = require("../../core_wq/db/GlobalData");
const PlayerMgr_1 = require("../../core_wq/player/PlayerMgr");
const EventsMgr_1 = require("../../core_wq/event/EventsMgr");
const EventType_1 = require("../../core_wq/event/EventType");
const PlayerInfo_1 = require("../../core_wq/player/data/PlayerInfo");
const MathUtil_1 = require("../../core_wq/utils/MathUtil");
const MsgMgr_1 = require("../../core_wq/msg/MsgMgr");
const StorageUtil_1 = require("../../core_wq/utils/StorageUtil");
const SoundMgr_1 = require("../../core_wq/sound/SoundMgr");
const SoundType_1 = require("../../core_wq/sound/SoundType");
const ShareMgr_1 = require("../../core_wq/msg/ShareMgr");
const ViewMgr_1 = require("../../core_wq/view/ViewMgr");
const ViewConst_1 = require("../../core_wq/view/const/ViewConst");
const EffectUtil_1 = require("../../core_wq/utils/EffectUtil");
const GuideMgr_1 = require("../../core_wq/guide/GuideMgr");
class HallControl extends Laya.Script {
    constructor() {
        super();
        /** 兵营满席动画 */
        this._battleHeroTimeLine = null;
        this._battleHeroIndex = 0;
        this.initModel();
    }
    onAwake() {
        this.initModel();
    }
    initModel() {
        if (this._model == null) {
            this._model = new HallModel_1.default();
        }
    }
    /** 购买英雄 */
    buyHero(heroInfo) {
        if (heroInfo) {
            let buyPrice = this._model.getHeroBuyPrice(heroInfo.buyPrice, this._model.queryBuyHeroRecord(heroInfo.id));
            if (PlayerMgr_1.default.Ins.Info.userGold >= buyPrice) {
                if (this.createHero(heroInfo.id) == null)
                    return;
                this.updateGold(PlayerMgr_1.default.Ins.Info.userGold - buyPrice);
                this._model.refreshBuyHeroRecord(heroInfo.id);
                buyPrice = this._model.getHeroBuyPrice(heroInfo.buyPrice, this._model.queryBuyHeroRecord(heroInfo.id));
                this.hallScene.txt_price.text = MathUtil_1.default.unitConversion(buyPrice);
                this.hallScene.frameOnce(1, this.hallScene, () => { this.sortHero(); }); //英雄排序
            }
            else {
                if (ShareMgr_1.default.Ins.isShareEnable && (ShareMgr_1.default.Ins.getAdTimes(12) > 0 || ShareMgr_1.default.Ins.getShareTimes(12) > 0)) {
                    ViewMgr_1.default.Ins.open(ViewConst_1.default.GoldNotEnoughView);
                }
                else {
                    MsgMgr_1.default.Ins.showMsg("很抱歉，铜钱不足");
                }
            }
        }
    }
    /** 创建英雄 */
    createHero(id, isBackward = false) {
        for (let index = 0; index < this._model.allHeroCount; index++) {
            let curIndex = index;
            if (isBackward) {
                curIndex = this._model.allHeroCount - index - 1;
            }
            let cell = this.hallScene.lists_head.getCell(index);
            if (cell) {
                let headItem = cell.getChildByName("hero");
                if (headItem && headItem.IsEmpty && !headItem.IsLock && !headItem.IsBox) {
                    headItem.Info.heroId = id;
                    headItem.updateHeadSkin(id, curIndex);
                    headItem.setStage(1);
                    //设置战斗中的英雄
                    this._battleHeroIndex++;
                    this._startPos = {
                        x: MathUtil_1.default.rangeInt(10, 50) + this.hallScene.width * 0.5 * Math.random(),
                        y: this.hallScene.beginEventView.y + MathUtil_1.default.rangeInt(-150, 200) //150 + (this.hallScene.beginEventView.height - 30) / this.hallScene.lists_head.array.length * this._battleHeroIndex
                    };
                    EffectUtil_1.default.playBoneEffect("ui_born", { x: this._startPos.x - 20, y: this._startPos.y + 200 });
                    if (this._battleHeroIndex >= this.hallScene.lists_head.array.length) {
                        this._battleHeroIndex = 0;
                    }
                    this._model.heroCount += 1;
                    this.hallScene.timerOnce(100, this.hallScene, () => {
                        this.createHeroBone(headItem, this._startPos);
                        this.setBattleHeroCount(PlayerMgr_1.default.Ins.Info.userRuncarCount + 1);
                        SoundMgr_1.default.Ins.playEffect(SoundType_1.default.SUMMON_HERO);
                    });
                    this.setSaveHeroData(headItem);
                    GuideMgr_1.default.Ins.onNextStep();
                    return headItem;
                }
            }
        }
        if (!isBackward) {
            MsgMgr_1.default.Ins.showMsg("兵营不足,快去合成英雄哟!");
        }
        return null;
    }
    /** 创建英雄龙骨动画 */
    createHeroBone(headItem, startPos) {
        headItem.removeBattleHero();
        headItem.createBattleHero(this.hallScene, startPos);
        this._model.is_reset_zorder = true;
        if (this._model.userAcceValue > 1) {
            headItem.BattleHero.setMoveAccelerate(this._model.userAcceValue);
        }
    }
    /** 设置格子是否锁 */
    setCellIsLock(lockIndex) {
        for (let index = 0; index < this._model.allHeroCount; index++) {
            let cell = this.hallScene.lists_head.getCell(index);
            if (cell) {
                let headItem = cell.getChildByName("hero");
                if (headItem) {
                    headItem.setLock(index >= lockIndex);
                }
            }
        }
    }
    /** 设置用户等级 */
    setUserLevel(level) {
        PlayerMgr_1.default.Ins.Info.userLevel = level;
        EventsMgr_1.default.Ins.dispatch(EventType_1.default.UPDATE_USER_LEVEL);
        EventsMgr_1.default.Ins.dispatch(EventType_1.default.UPDATE_SYSTEM_BTN);
        this.refreshUserData();
    }
    /** 刷新用户相关数据 */
    refreshUserData() {
        let levelVO = GlobalData_1.default.getData(GlobalData_1.default.LevelVO, PlayerMgr_1.default.Ins.Info.userLevel);
        if (levelVO) {
            this.setCellIsLock(levelVO.openCellCount);
            this.setBattleHeroCountMax(levelVO.battleCount);
        }
    }
    /** 设置用户经验 */
    setUserExp(upExp) {
        PlayerMgr_1.default.Ins.Info.userExp = upExp;
        let upNeedexp = 0;
        let nextLevel = PlayerMgr_1.default.Ins.Info.userLevel + 1;
        let levelVO = GlobalData_1.default.getData(GlobalData_1.default.LevelVO, nextLevel);
        if (levelVO) {
            upNeedexp = levelVO.upNeedexp;
            let exp = PlayerMgr_1.default.Ins.Info.userExp - upNeedexp;
            if (exp >= 0) {
                this.setUserLevel(nextLevel);
                PlayerMgr_1.default.Ins.Info.userLevelExtraIncome = 1 + levelVO.extraProduce;
                if (levelVO.goldGift > 0) { //等级奖励
                    ViewMgr_1.default.Ins.open(ViewConst_1.default.LevelRewardView, null, levelVO);
                }
                else {
                    MsgMgr_1.default.Ins.showMsg("主人,恭喜您升级了!");
                    SoundMgr_1.default.Ins.playEffect(SoundType_1.default.UPGRADE_HERO);
                }
                this.setUserExp(exp);
                this.updateMapData(true);
            }
            EventsMgr_1.default.Ins.dispatch(EventType_1.default.UPDATE_USER_EXP, upNeedexp);
        }
    }
    /** 更新地图数据 */
    updateMapData(isUpLevel = false) {
        //更新城池名字
        let mapVO = GlobalData_1.default.getData(GlobalData_1.default.MapVO, PlayerMgr_1.default.Ins.Info.userLevel);
        if (mapVO) {
            this._hallScene.txt_mapName.text = mapVO.name;
        }
    }
    /** 刷新每秒金币收益 */
    refreshIncomeSec() {
        let incomePerSec = 0;
        for (let index = 0; index < this._model.allHeroCount; index++) {
            let cell = this.hallScene.lists_head.getCell(index);
            if (cell) {
                let headItem = cell.getChildByName("hero");
                if (headItem) {
                    incomePerSec += this.getHeroIncomeSecGold(headItem.Info.heroId) * PlayerMgr_1.default.Ins.Info.userExtraIncome * PlayerMgr_1.default.Ins.Info.userAcceValue * PlayerMgr_1.default.Ins.Info.userLevelExtraIncome;
                }
            }
        }
        EventsMgr_1.default.Ins.dispatch(EventType_1.default.UPDATE_INCOME, incomePerSec);
    }
    /**
     * 更新金币
     * @param gold 金币数量
     * @param isTotal true:是否直接替换金额  false:差额
     */
    updateGold(gold, isTotal = true) {
        EventsMgr_1.default.Ins.dispatch(EventType_1.default.UPDATE_CURRENCY, PlayerInfo_1.default.GOLD, gold, isTotal); //更新用户获得金币
        this.hallScene.updateRecruitData();
    }
    /** 更新英雄等级 */
    updateHeroLevel(level) {
        if (this._model.heroLevel < this._model.heroMaxLevel) {
            if (this._model.heroLevel < level) {
                this._model.heroLevel = level;
                Laya.timer.callLater(this, StorageUtil_1.default.saveStorageToLocal, [true]);
                return true;
            }
        }
        else {
            MsgMgr_1.default.Ins.showMsg("已达到最高级了耶!");
        }
        return false;
    }
    /** 获取英雄合成经验 */
    getHeroExp(heroId) {
        let heroConfig = GlobalData_1.default.getData(GlobalData_1.default.HeroConfigVO, heroId);
        if (heroConfig) {
            return heroConfig.syntheticExp;
        }
        return 0;
    }
    /** 获取英雄每秒产出金币 */
    getHeroIncomeSecGold(heroId) {
        let heroConfig = GlobalData_1.default.getData(GlobalData_1.default.HeroConfigVO, heroId);
        if (heroConfig) {
            return heroConfig.PerSecCoin;
        }
        return 0;
    }
    /** 获取英雄一共的收益金币 */
    getHeroIncomeTotalGold(heroId) {
        let heroConfig = GlobalData_1.default.getData(GlobalData_1.default.HeroConfigVO, heroId);
        if (heroConfig) {
            return heroConfig.totalCoin;
        }
        return 0;
    }
    /** 是否新手 */
    get IsGuide() {
        return this._model.heroLevel < 3;
    }
    /** 是否被点击 */
    isHit(checkObj, extW = 0, extH = 0) {
        if (checkObj) {
            let touchPos = checkObj.getMousePoint();
            let touchArea = new Laya.Rectangle(0 - extW / 2, 0 - extH / 2, checkObj.width + extW, checkObj.height + extH);
            return touchArea.contains(touchPos.x, touchPos.y);
        }
        return false;
    }
    /** 英雄按等级排序 */
    sortHero() {
        let heroSortList = [];
        for (var index = 0; index < this._model.allHeroCount; index++) {
            let cell = this.hallScene.lists_head.getCell(index);
            if (cell) {
                let headItem = cell.getChildByName("hero");
                if (headItem && !headItem.IsEmpty && !headItem.IsBox && !headItem.IsLock) {
                    let heroData = {
                        heroId: headItem.Info.heroId,
                        heroStage: headItem.HeroStage,
                        battleHero: headItem.BattleHero,
                        currHp: headItem.hpBar.value
                    };
                    if (index < 1) {
                        heroSortList.push(heroData);
                    }
                    else {
                        let maxCount = heroSortList.length;
                        let maxIndex = maxCount;
                        for (var j = 0; j < maxCount; j++) {
                            if (heroSortList[j] && heroSortList[j].heroId < headItem.Info.heroId) {
                                maxIndex = j;
                                break;
                            }
                        }
                        heroSortList.splice(maxIndex, 0, heroData);
                    }
                }
            }
        }
        let heroIndex = 0;
        for (var index = 0; index < this._model.allHeroCount; index++) {
            let cell = this.hallScene.lists_head.getCell(index);
            if (cell) {
                let headItem = cell.getChildByName("hero");
                if (headItem && !headItem.IsBox && !headItem.IsLock) {
                    if (heroIndex >= heroSortList.length) {
                        headItem.reset();
                    }
                    else {
                        let heroData = heroSortList[heroIndex];
                        headItem.updateHeadSkin(heroData.heroId);
                        headItem.setStage(heroData.heroStage);
                        if (headItem.BattleHero == null) {
                            headItem.BattleHero = heroData.battleHero;
                            headItem.hpBar.value = heroData.currHp;
                            headItem.hpBar.visible = true;
                        }
                        heroIndex++;
                    }
                    this.setSaveHeroData(headItem);
                }
            }
        }
    }
    /** 设置英雄数据并保存 */
    setSaveHeroData(headItemOne, headItemTwo = null) {
        for (let key in this._model.AllHeros) {
            let element = this._model.AllHeros[key];
            if (headItemOne) {
                if (element && element.id == headItemOne.heroIndex) {
                    element.heroId = headItemOne.Info.heroId;
                }
            }
            //交换车辆
            if (headItemTwo) {
                if (element && element.id == headItemTwo.heroIndex) {
                    element.heroId = headItemTwo.Info.heroId;
                }
            }
        }
        Laya.timer.callLater(this, StorageUtil_1.default.saveStorageToLocal, [true]);
    }
    /** 设置战斗英雄的数量 */
    setBattleHeroCount(value) {
        PlayerMgr_1.default.Ins.Info.userRuncarCount = value;
        this.refreshBattleHeroCount();
        this.refreshIncomeSec();
        SoundMgr_1.default.Ins.playEffect(SoundType_1.default.ENTER_GAME);
    }
    /** 设置战斗英雄的最大数量 */
    setBattleHeroCountMax(value) {
        PlayerMgr_1.default.Ins.Info.userRuncarCountMax = value;
        this.refreshBattleHeroCount();
    }
    /** 刷新战斗中英雄数量 */
    refreshBattleHeroCount() {
        if (PlayerMgr_1.default.Ins.Info.userRuncarCount < PlayerMgr_1.default.Ins.Info.userRuncarCountMax) {
            PlayerMgr_1.default.Ins.Info.userExtraIncome = 1;
            this.hallScene.txt_battleCount.text = PlayerMgr_1.default.Ins.Info.userRuncarCount + "/" + PlayerMgr_1.default.Ins.Info.userRuncarCountMax;
        }
        else {
            PlayerMgr_1.default.Ins.Info.userExtraIncome = 1.1;
            this.hallScene.txt_battleCount.text = "+10%";
        }
        //跑道已满效果
        if ((PlayerMgr_1.default.Ins.Info.userRuncarCount < PlayerMgr_1.default.Ins.Info.userRuncarCountMax)) {
            this.hallScene.imgBattleCount.skin = "images/hall/game_running_num1.png";
            this.hallScene.txt_battleCount.y = 3;
            this.hallScene.txt_battleCount.color = "#000000";
            //停止缩放
            if (this._battleHeroTimeLine) {
                this._battleHeroTimeLine.pause();
                this.hallScene.imgBattleCount.scale(1, 1);
            }
        }
        else {
            this.hallScene.imgBattleCount.skin = "images/hall/game_running_num2.png";
            this.hallScene.txt_battleCount.y = 25;
            this.hallScene.txt_battleCount.color = "#b11a1a";
            //开始缩放动画
            if (this._battleHeroTimeLine == null) {
                this._battleHeroTimeLine = new Laya.TimeLine();
                this._battleHeroTimeLine.addLabel("scale1", 0).to(this.hallScene.imgBattleCount, { scaleX: 0.9, scaleY: 0.9 }, 300)
                    .addLabel("scale2", 100).to(this.hallScene.imgBattleCount, { scaleX: 1, scaleY: 1 }, 300);
            }
            this._battleHeroTimeLine.play(0, true);
        }
        this.hallScene.imgBattleGold.visible = !(PlayerMgr_1.default.Ins.Info.userRuncarCount < PlayerMgr_1.default.Ins.Info.userRuncarCountMax);
        this.hallScene.imgBattleGold.x = 92;
        this.hallScene.imgBattleGold.y = 21;
        this.hallScene.imgBattleCount.alpha = 0.9;
    }
    /** 设置战斗英雄加速效果 */
    setBattleHeroAcce(accValue) {
        this._model.userAcceValue = accValue;
        for (var index = 0; index < this._model.allHeroCount; index++) {
            let cell = this.hallScene.lists_head.getCell(index);
            if (cell) {
                let headItem = cell.getChildByName("hero");
                if (headItem && headItem.HeroStage == 1) {
                    let battleHero = headItem.BattleHero;
                    if (battleHero) {
                        battleHero.setMoveAccelerate(this._model.userAcceValue);
                    }
                }
            }
        }
        this.refreshIncomeSec();
    }
    /** 获取功能开放列表 */
    getSystemBtnList() {
        let datas = GlobalData_1.default.getDataByCondition(GlobalData_1.default.SystemVO, (item) => {
            return PlayerMgr_1.default.Ins.Info.userLevel >= item.openLevel;
        });
        if (datas && datas.length > 0) {
            datas.sort((item1, item2) => item1.sort - item2.sort);
            return datas;
        }
        return null;
    }
    set Model(value) { this._model = value; }
    get Model() { return this._model; }
    set hallScene(value) {
        this._hallScene = value;
    }
    get hallScene() {
        return this._hallScene;
    }
    static get Ins() {
        if (HallControl._instance == null) {
            HallControl._instance = new HallControl();
        }
        return HallControl._instance;
    }
}
exports.default = HallControl;
