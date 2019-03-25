"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const HallControl_1 = require("../HallControl");
const PlayerMgr_1 = require("../../../core_wq/player/PlayerMgr");
const EffectUtil_1 = require("../../../core_wq/utils/EffectUtil");
const EventsMgr_1 = require("../../../core_wq/event/EventsMgr");
const EventType_1 = require("../../../core_wq/event/EventType");
const PlayerInfo_1 = require("../../../core_wq/player/data/PlayerInfo");
const MathUtil_1 = require("../../../core_wq/utils/MathUtil");
const MsgMgr_1 = require("../../../core_wq/msg/MsgMgr");
const HttpMgr_1 = require("../../../core_wq/net/HttpMgr");
const ShareMgr_1 = require("../../../core_wq/msg/ShareMgr");
const LayerMgr_1 = require("../../../core_wq/layer/LayerMgr");
const GameConfig_1 = require("../../../GameConfig");
const StorageUtil_1 = require("../../../core_wq/utils/StorageUtil");
const SoundMgr_1 = require("../../../core_wq/sound/SoundMgr");
const SoundType_1 = require("../../../core_wq/sound/SoundType");
const ViewRegisterMgr_1 = require("../../../core_wq/view/ViewRegisterMgr");
const ViewMgr_1 = require("../../../core_wq/view/ViewMgr");
const ViewConst_1 = require("../../../core_wq/view/const/ViewConst");
const HeadItem_1 = require("./item/HeadItem");
const GuideMgr_1 = require("../../../core_wq/guide/GuideMgr");
const SDKMgr_1 = require("../../../core_wq/msg/SDKMgr");
const HeroTips_1 = require("./HeroTips");
const RedPointMgr_1 = require("../../../core_wq/msg/RedPointMgr");
const SystemConfig_1 = require("../config/SystemConfig");
class HallScene extends layaMaxUI_1.ui.moduleView.hall.HallSceneUI {
    constructor() {
        super();
        this._battleHeroIndex = 0;
    }
    onAwake() {
        SDKMgr_1.default.Ins.wxShowUpdateVersionTips();
    }
    onEnable() {
        LayerMgr_1.default.Ins.initLayer(Laya.stage, GameConfig_1.default.width, GameConfig_1.default.height);
        this.scale(LayerMgr_1.default.adaptScaleX, LayerMgr_1.default.adaptScaleY);
        ViewRegisterMgr_1.default.Ins.initRegisterView();
        this.init();
        this.initUserData();
        this.haveStoreHero();
        this.showSurpassView();
        this.initSystemBtn();
        this.initRedPoint();
        this.addEvents();
    }
    init() {
        this._control = HallControl_1.default.Ins;
        this._control.hallScene = this;
        this.lists_head.vScrollBarSkin = "";
        this.lists_head.array = this._control.Model.AllHeros;
        this.lists_head.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this.foregroundTwo.x = this._control.Model.foregroundWidth;
        this.fargroundTwo.x = this._control.Model.fargroundWidth;
        this.list_btn.renderHandler = Laya.Handler.create(this, this.onRenderSystem, null, false);
        SoundMgr_1.default.Ins.playBg(SoundType_1.default.BG_MUSIC);
    }
    /** 初始化用户数据 */
    initUserData() {
        if (PlayerMgr_1.default.Ins.Info.wxUserInfo) {
            this.imgHead.skin = PlayerMgr_1.default.Ins.Info.wxUserInfo.avatarUrl;
        }
        this._control.setUserLevel(PlayerMgr_1.default.Ins.Info.userLevel); //用户等级
        this._control.setUserExp(PlayerMgr_1.default.Ins.Info.userExp); //用户经验
        EventsMgr_1.default.Ins.dispatch(EventType_1.default.UPDATE_INCOME, PlayerMgr_1.default.Ins.Info.userIncomeSec); //用户每秒可获得的金币
        this._control.updateGold(PlayerMgr_1.default.Ins.Info.userGold);
        EventsMgr_1.default.Ins.dispatch(EventType_1.default.UPDATE_CURRENCY, PlayerInfo_1.default.DIAMOND, PlayerMgr_1.default.Ins.Info.userDiamond); //更新用户获得钻石
        this.updateRecruitData();
        this.frameLoop(1, this, this.onUpdateBattleView);
        StorageUtil_1.default.requestOfflinePrizeData();
        this._control.updateMapData();
        GuideMgr_1.default.Ins.setup();
    }
    /** 初始化红点 */
    initRedPoint() {
        this.imgFree.visible = RedPointMgr_1.default.Ins.isShowShopRedPoint;
    }
    /** 初始化功能按钮 */
    initSystemBtn() {
        let datas = this._control.getSystemBtnList();
        if (datas && datas.length > 0 && (this.list_btn.array == null || datas.length > this.list_btn.array.length)) {
            this.list_btn.visible = true;
            this.list_btn.array = datas;
            RedPointMgr_1.default.Ins.updateRedPoint();
        }
    }
    addEvents() {
        this.btn_recruit.on(Laya.Event.CLICK, this, this.onClickBtnHandler);
        this.btn_acc.on(Laya.Event.CLICK, this, this.onClickBtnHandler);
        this.btn_shop.on(Laya.Event.CLICK, this, this.onClickBtnHandler);
        this.btn_heroStore.on(Laya.Event.CLICK, this, this.onClickBtnHandler);
        this.lists_head.on(Laya.Event.MOUSE_DOWN, this, this.onHeroSelect);
        EventsMgr_1.default.Ins.addListener(EventType_1.default.HERO_BOX, this.onShowHeroBox, this);
        EventsMgr_1.default.Ins.addListener(EventType_1.default.GAME_ACCE_START, this.onGameAcce, this);
        EventsMgr_1.default.Ins.addListener(EventType_1.default.SHOW_OFFLINE_REWARD, this.onOffLineReward, this);
        EventsMgr_1.default.Ins.addListener(EventType_1.default.UPDATE_SYSTEM_BTN, this.onUpdateSystemBtn, this);
        EventsMgr_1.default.Ins.addListener(EventType_1.default.OPEN_VIEW, this.onOpenSystemView, this);
    }
    onOpenSystemView(id) {
        switch (id) {
            case SystemConfig_1.default.SIGN:
                ViewMgr_1.default.Ins.open(ViewConst_1.default.DaySignView);
                break;
            case SystemConfig_1.default.RANK:
                ViewMgr_1.default.Ins.open(ViewConst_1.default.RankView);
                break;
            case SystemConfig_1.default.LUCK_PRIZE:
                ViewMgr_1.default.Ins.open(ViewConst_1.default.LuckPrizeView);
                break;
            case SystemConfig_1.default.TASK:
                ViewMgr_1.default.Ins.open(ViewConst_1.default.TaskView);
                break;
            case SystemConfig_1.default.INVITE:
                break;
            case SystemConfig_1.default.FOLLOW:
                ViewMgr_1.default.Ins.open(ViewConst_1.default.FollowView);
                break;
            case SystemConfig_1.default.FEEDBACK:
                break;
        }
    }
    onClickBtnHandler(e) {
        if (e.target instanceof Laya.Button) {
            switch (e.target) {
                case this.btn_recruit: //招募英雄
                    this.recruitHero();
                    break;
                case this.btn_acc: //加速
                    this.openGameAcc();
                    break;
                case this.btn_shop: //商店
                    ViewMgr_1.default.Ins.open(ViewConst_1.default.ShopView);
                    break;
                case this.btn_heroStore: //英雄保存箱
                    this.popHeroStore();
                    break;
            }
        }
    }
    /** 招募英雄 */
    recruitHero() {
        this._currBuyHeroInfo = this._control.Model.getRecruitHeroData();
        if (this._currBuyHeroInfo) {
            this._control.buyHero(this._currBuyHeroInfo);
            this.updateRecruitData(this._currBuyHeroInfo);
        }
    }
    /** 更新招募英雄数据 */
    updateRecruitData(buyHeroInfo = null) {
        if (buyHeroInfo) {
            this._currBuyHeroInfo = buyHeroInfo;
        }
        else {
            this._currBuyHeroInfo = this._control.Model.getRecruitHeroData();
        }
        let buyPrice = this._control.Model.getHeroBuyPrice(this._currBuyHeroInfo.buyPrice, this._control.Model.queryBuyHeroRecord(this._currBuyHeroInfo.id));
        this.txt_price.text = MathUtil_1.default.unitConversion(buyPrice);
        if (PlayerMgr_1.default.Ins.Info.userGold < buyPrice) {
            this.txt_price.color = "#FF0000";
        }
        else {
            this.txt_price.color = "#FFF1BA";
        }
        this.txt_level.text = "Lv." + this._currBuyHeroInfo.id;
    }
    onHeroSelect(e) {
        if (this._copyHeadItem)
            return;
        for (let index = 0; index < this._control.Model.allHeroCount; index++) {
            let cell = this.lists_head.getCell(index);
            if (cell) {
                let headItem = cell.getChildByName("hero");
                if (headItem && headItem.IsBattle && !headItem.IsBox && this._control.isHit(headItem)) {
                    headItem.setStage(2);
                    this._currHeadItem = headItem;
                    this._currHeadItem.visible = false;
                    this._copyHeadItem = Laya.Pool.getItemByClass("copyHeadItem", HeadItem_1.default); // new HeadItem();
                    this._copyHeadItem.updateHeadSkin(headItem.Info.heroId, index);
                    this._copyHeadItem.pivot(126 / 2, 127 / 2);
                    this._copyHeadItem.zOrder = 999;
                    this.addChild(this._copyHeadItem);
                    this.showHeroTips();
                    this._copyHeadItem.pos(this.mouseX, this.mouseY);
                    this.imgDelete.alpha = 1.0;
                    this.on(Laya.Event.MOUSE_MOVE, this, this.onMouseHeadItemMove);
                    this.on(Laya.Event.MOUSE_UP, this, this.onMouseHeadItemUp);
                    break;
                }
            }
        }
    }
    onMouseHeadItemMove(e) {
        if (this._copyHeadItem) {
            this._copyHeadItem.pos(this.mouseX, this.mouseY);
        }
    }
    onMouseHeadItemUp(e) {
        this.imgDelete.alpha = 0.5;
        if (this._copyHeadItem) {
            this.off(Laya.Event.MOUSE_MOVE, this, this.onMouseHeadItemMove);
            this.off(Laya.Event.MOUSE_UP, this, this.onMouseHeadItemUp);
            if (this._control.isHit(this.imgDelete)) { //出售英雄
                let sellPrice = this._currHeadItem.getSellPrice();
                this._currHeadItem.reset();
                EffectUtil_1.default.playCoinEffect(this.imgDelete, 'images/common/star2.png');
                EffectUtil_1.default.playTextEffect(this.imgDelete, "金币+" + MathUtil_1.default.unitConversion(sellPrice));
                this._control.updateGold(PlayerMgr_1.default.Ins.Info.userGold + sellPrice);
                this._control.setSaveHeroData(this._currHeadItem);
                this._control.setBattleHeroCount(PlayerMgr_1.default.Ins.Info.userRuncarCount - 1);
            }
            else {
                this._currHeadItem.setStage(1);
                for (let index = 0; index < this._control.Model.allHeroCount; index++) {
                    let cell = this.lists_head.getCell(index);
                    if (cell) {
                        let headItem = cell.getChildByName("hero");
                        if (headItem && this._control.isHit(headItem) && headItem != this._currHeadItem && !headItem.IsBox && !headItem.IsLock) {
                            let heroId = headItem.Info.heroId;
                            if (heroId == this._currHeadItem.Info.heroId) {
                                if (heroId >= this._control.Model.heroMaxLevel) {
                                    MsgMgr_1.default.Ins.showMsg("已达最高级！");
                                }
                                else { //合并英雄
                                    let nextLevel = heroId + 1;
                                    let exp = this._control.getHeroExp(heroId);
                                    headItem.updateHeadSkin(nextLevel, index);
                                    headItem.removeBattleHero();
                                    let startPos = {
                                        x: 50 + this.width * 0.5 * Math.random(),
                                        y: this.beginEventView.y - 150 + (this.beginEventView.height - 30) / this.lists_head.array.length
                                    };
                                    headItem.createBattleHero(this, startPos);
                                    EffectUtil_1.default.playBoneEffect("ui_born", { x: startPos.x - 20, y: startPos.y + 200 });
                                    this._currHeadItem.reset();
                                    //合并效果
                                    EffectUtil_1.default.playHeroMergeEffect(this, heroId, headItem);
                                    //更新英雄等级
                                    if (this._control.updateHeroLevel(nextLevel)) {
                                        ViewMgr_1.default.Ins.open(ViewConst_1.default.NewHeroView, null, nextLevel);
                                        SoundMgr_1.default.Ins.playEffect(SoundType_1.default.UNLOCK);
                                    }
                                    else {
                                        SoundMgr_1.default.Ins.playEffect(SoundType_1.default.MAKE_HERO);
                                    }
                                    if (exp > 0) {
                                        this._control.setUserExp(PlayerMgr_1.default.Ins.Info.userExp + exp);
                                        let headItemPos = headItem.localToGlobal(new Laya.Point(0, 0));
                                        let pos = { x: headItemPos.x + headItem.width * 0.5, y: headItemPos.y + 2 };
                                        EffectUtil_1.default.playTextEffect(this, "Exp+" + exp, pos);
                                        headItemPos = null;
                                    }
                                    this.updateRecruitData();
                                    this._control.refreshIncomeSec();
                                    this._control.setSaveHeroData(headItem, this._currHeadItem);
                                    //刷新战斗英雄的数量
                                    this._control.setBattleHeroCount(PlayerMgr_1.default.Ins.Info.userRuncarCount - 1);
                                    HttpMgr_1.default.Ins.requestDailyTaskData(1);
                                    GuideMgr_1.default.Ins.onNextStep();
                                }
                            }
                            else { //交换
                                let isEmpty = headItem.IsEmpty;
                                headItem.updateHeadSkin(this._currHeadItem.Info.heroId);
                                headItem.setStage(this._currHeadItem.HeroStage);
                                if (isEmpty) {
                                    this._control.createHeroBone(headItem, { x: this._currHeadItem.BattleHero.x, y: this._currHeadItem.BattleHero.y });
                                    this._currHeadItem.reset();
                                }
                                else {
                                    this._currHeadItem.updateHeadSkin(heroId);
                                    let oldBattleHero = this._currHeadItem.BattleHero;
                                    this._currHeadItem.BattleHero = headItem.BattleHero;
                                    headItem.BattleHero = oldBattleHero;
                                }
                                this._control.setSaveHeroData(headItem, this._currHeadItem);
                                SoundMgr_1.default.Ins.playEffect(SoundType_1.default.DRAW_HERO);
                            }
                            break;
                        }
                    }
                }
            }
            this.removeHeroTips();
            this._currHeadItem.visible = true;
            this._copyHeadItem.removeSelf();
            Laya.Pool.recover("copyHeadItem", this._copyHeadItem);
            this._copyHeadItem = null;
        }
    }
    /** 更新战斗界面 */
    onUpdateBattleView() {
        let isRollView = false;
        for (let index = 0; index < this._control.Model.allHeroCount; index++) {
            let cell = this.lists_head.getCell(index);
            if (cell) {
                let headItem = cell.getChildByName("hero");
                if (headItem && headItem.Info.heroId > 0 && !headItem.isDie) {
                    isRollView = true;
                    let battleHero = headItem.BattleHero;
                    if (battleHero) {
                        if (this._control.Model.is_reset_zorder) {
                            battleHero.zOrder = Math.floor(battleHero.y);
                        }
                        //是否攻击就位
                        if (battleHero.IsInPosition) {
                            if (battleHero.AttackTarget == null) {
                                let posX = battleHero.OrginalX + battleHero.IncomeTime * this._control.Model.viewRollSpeep + 340;
                                battleHero.createAttackTarget(battleHero.parent, new Laya.Point(posX, battleHero.y));
                            }
                            else {
                                battleHero.AttackTarget.x -= this._control.Model.viewRollSpeep * this._control.Model.userAcceValue;
                            }
                            battleHero.refreshIncomeTime(() => {
                                let txtPos = { x: battleHero.x, y: battleHero.y - 30 };
                                //移除攻击对象
                                let attackSp = battleHero.AttackTarget;
                                if (attackSp) {
                                    headItem.updateHp();
                                    txtPos = { x: attackSp.x - 50, y: attackSp.y + 50 };
                                    battleHero.removeEnemy(true);
                                }
                                let obtainMoney = this._control.getHeroIncomeTotalGold(headItem.Info.heroId) * PlayerMgr_1.default.Ins.Info.userExtraIncome * PlayerMgr_1.default.Ins.Info.userLevelExtraIncome;
                                //飘数字
                                EffectUtil_1.default.playImageTextEffect(this, "images/common/coin.png", "+" + MathUtil_1.default.unitConversion(obtainMoney), txtPos, 1000);
                                this._control.updateGold(PlayerMgr_1.default.Ins.Info.userGold + obtainMoney);
                            });
                        }
                    }
                }
            }
        }
        this.doRollView(isRollView);
    }
    /** 滚动屏幕 */
    doRollView(isRollView) {
        if (isRollView) {
            //前景屏幕
            this.box_foreground.x -= this._control.Model.viewRollSpeep * this._control.Model.userAcceValue;
            let pageIndex = Math.floor(-this.box_foreground.x / this._control.Model.foregroundWidth);
            if (this._control.Model.foregroundIndex != pageIndex) {
                this._control.Model.foregroundIndex = pageIndex;
                this.viewMoveHandler(this.foregroundOne, this.foregroundTwo, this._control.Model.foregroundWidth, pageIndex);
            }
            //远景屏幕
            this.box_farground.x -= this._control.Model.viewRollSpeep * this._control.Model.userAcceValue * 0.5;
            let farPageIndex = Math.floor(-this.box_farground.x / this._control.Model.fargroundWidth);
            if (this._control.Model.fargroundIndex != farPageIndex) {
                this._control.Model.fargroundIndex = farPageIndex;
                this.viewMoveHandler(this.fargroundOne, this.fargroundTwo, this._control.Model.fargroundWidth, farPageIndex);
            }
            //最前景屏幕
            this.box_obstacle.x -= this._control.Model.viewRollSpeep * this._control.Model.userAcceValue * 1.2;
            let obstaclePageIndex = Math.floor(-this.box_obstacle.x / this._control.Model.topForegroundWidth);
            if (this._control.Model.topForegroundIndex != obstaclePageIndex) {
                this._control.Model.topForegroundIndex = obstaclePageIndex;
                this.viewMoveHandler(this.obstacleOne, this.obstacleTwo, this._control.Model.topForegroundWidth, obstaclePageIndex);
            }
        }
    }
    viewMoveHandler(rollViewOne, rollViewTwo, width, pageIndex) {
        if (this._control.Model.viewRollSpeep > 0) {
            //左移
            if (pageIndex % 2 == 0) {
                rollViewTwo.x = width * (pageIndex + 1);
            }
            else {
                rollViewOne.x = width * (pageIndex + 1);
            }
        }
        else {
            //右移
            if (pageIndex % 2 == 0) {
                rollViewOne.x = width * pageIndex;
            }
            else {
                rollViewTwo.x = width * pageIndex;
            }
        }
    }
    onListRender(cell, index) {
        if (index > this.lists_head.array.length) {
            return;
        }
        let headItem = cell.getChildByName("hero");
        if (headItem) {
            let info = this.lists_head.array[index];
            headItem.dataSource = info;
            if (info.heroId > 0) {
                Laya.timer.frameOnce(index + (Math.random() * 45), this, () => {
                    this._battleHeroIndex++;
                    let startPos = {
                        x: MathUtil_1.default.rangeInt(10, 50) + this.width * 0.5 * Math.random(),
                        y: this.beginEventView.y + MathUtil_1.default.rangeInt(-150, 200) //- 150 + (this.beginEventView.height - 30) / (this.lists_head.array.length) * this._battleHeroIndex
                    };
                    EffectUtil_1.default.playBoneEffect("ui_born", { x: startPos.x - 20, y: startPos.y + 200 });
                    this.timerOnce(100, this, () => {
                        headItem.createBattleHero(this, startPos); //汽车放入跑道
                        headItem.setStage(1);
                        this._control.Model.is_reset_zorder = true;
                        //刷新战斗英雄的数量
                        this._control.setBattleHeroCount(PlayerMgr_1.default.Ins.Info.userRuncarCount + 1);
                    });
                });
            }
        }
    }
    /** 打开游戏加速 */
    openGameAcc() {
        let stage = ShareMgr_1.default.Ins.showShareOrAdv(() => {
            this.playAccEffect();
        }, 10, false, true);
    }
    /** 加速效果 */
    playAccEffect(_acceTime = 90, _isEffect = true) {
        if (this._control.Model.userAcceTime > 1) {
            this._control.Model.userAcceTime += _acceTime;
            return;
        }
        this.btn_acc.mouseEnabled = false;
        this.imgAcce.visible = true;
        this._control.Model.userAcceTime += _acceTime;
        if (_isEffect) {
            EffectUtil_1.default.playAccEffect(this);
        }
        this._control.setBattleHeroAcce(2);
        this.refreshAcceTime();
        this.timerLoop(1000, this, this.refreshAcceTime);
        SoundMgr_1.default.Ins.playEffect(SoundType_1.default.GAME_ACCE);
    }
    /** 刷新加速时间 */
    refreshAcceTime() {
        let minute = Math.floor(this._control.Model.userAcceTime / 60);
        let sec = this._control.Model.userAcceTime % 60;
        this.txt_accTimes.text = (minute < 10 ? ('0' + minute) : minute) + ':' + (sec < 10 ? ('0' + sec) : sec);
        if (this._control.Model.userAcceTime > 0) {
            this._control.Model.userAcceTime--;
            StorageUtil_1.default.saveAcceLeftTime(this._control.Model.userAcceTime);
            EffectUtil_1.default.playCoinRainEffect("images/common/coin.png");
        }
        else {
            this._control.setBattleHeroAcce(1);
            this.clearTimer(this, this.refreshAcceTime);
            this.imgAcce.visible = false;
            this.btn_acc.mouseEnabled = true;
        }
    }
    /** 显示英雄保存箱 */
    onShowHeroBox() {
        this.btn_heroStore.visible = true;
    }
    /** 取出英雄箱中的英雄 */
    popHeroStore() {
        let heroId = StorageUtil_1.default.popHeroStore();
        if (heroId > 0) {
            let hero = this._control.createHero(heroId);
            if (hero) {
                StorageUtil_1.default.popHeroStore(true);
                this.haveStoreHero();
            }
        }
    }
    /** 是否拥有缓存的英雄 */
    haveStoreHero() {
        this.btn_heroStore.visible = StorageUtil_1.default.popHeroStore() > 0;
    }
    /** 转盘奖励加速 */
    onGameAcce(time) {
        this.playAccEffect(time);
    }
    /** 离线奖励 */
    onOffLineReward() {
        let offlinePrize = StorageUtil_1.default.offlinePrize();
        if (offlinePrize > 10 * 60 && PlayerMgr_1.default.Ins.Info.userIncomeSec > 0 && this._control.IsGuide == false) {
            // 1) 离线0-8小时：100%收益
            // 2) 8-24小时：8小时100%收益+（X-8）*50%收益
            // 3) 24小时以上：8小时100%收益+16小时*50%收益（意思就是超出24小时后的部分不计算收益）
            // 20180726-离线奖励规则修改：8小时内100%调整为25%；8小时-24小时50%调整为10%。
            // 20180728-离线奖励再降低下，只计算8小时内的。8小时以外不给奖励。
            // 20180806-有收益的最长时间改为：2个小时
            let gold = 0;
            let secondForHour = 60 * 60;
            let secHourMax = 2 * secondForHour;
            if (offlinePrize > secHourMax) {
                gold = (secHourMax * PlayerMgr_1.default.Ins.Info.userIncomeSec) * 0.05;
            }
            else {
                gold = (offlinePrize * PlayerMgr_1.default.Ins.Info.userIncomeSec) * 0.05;
            }
            if (gold > 0) {
                gold = gold * 4;
                this._control.updateGold(gold, false);
                if (PlayerMgr_1.default.Ins.Info.userLevel > 8) {
                    ViewMgr_1.default.Ins.open(ViewConst_1.default.OffLineRewardView, null, gold);
                }
                else {
                    MsgMgr_1.default.Ins.showMsg("获得离线奖励:" + MathUtil_1.default.unitConversion(gold));
                }
            }
        }
    }
    /** 显示英雄信息Tips */
    showHeroTips() {
        if (this._heroTips == null) {
            this._heroTips = Laya.Pool.getItemByClass("HeroTips", HeroTips_1.default);
            this._heroTips.dataSource = this._currHeadItem;
            this._copyHeadItem.addChild(this._heroTips);
        }
    }
    /** 移除英雄信息Tips */
    removeHeroTips() {
        this.clearTimer(this, this.showHeroTips);
        if (this._heroTips) {
            this._heroTips.removeTips();
            Laya.Pool.recover("HeroTips", this._heroTips);
            this._heroTips = null;
        }
    }
    /** 显示超越好友 */
    showSurpassView() {
        if (window["wx"]) {
            SDKMgr_1.default.Ins.wxSetUserCloudStorage();
            this.surpassView.postMsg({ message: "showSurpassFriend" });
        }
    }
    onRenderSystem(cell, index) {
        if (index > this.list_btn.array.length) {
            return;
        }
        let btn = cell.getChildByName("item");
        if (btn) {
            btn.dataSource = this.list_btn.array[index];
        }
    }
    /** 更新系统功能按钮 */
    onUpdateSystemBtn() {
        this.initSystemBtn();
    }
}
exports.default = HallScene;
