import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import { ui } from "../../../ui/layaMaxUI";
import HallControl from "../../hall/HallControl";
import HeroConfigVO from "../../../core_wq/db/vo/HeroConfigVO";
import GlobalData from "../../../core_wq/db/GlobalData";
import MathUtil from "../../../core_wq/utils/MathUtil";
import HttpMgr from "../../../core_wq/net/HttpMgr";
import EventsMgr from "../../../core_wq/event/EventsMgr";
import EventType from "../../../core_wq/event/EventType";
import PathConfig from "../../../core_wq/config/PathConfig";
import HeroVO from "../../../core_wq/db/vo/HeroVO";
import HeadItem from "../../hall/view/item/HeadItem";
import StorageUtil from "../../../core_wq/utils/StorageUtil";
import MsgMgr from "../../../core_wq/msg/MsgMgr";

export default class LuckPrizeRewardView extends BaseView {

    private rewards: Array<any> = [
        { id: 1, name: "大量铜钱", num: 1, imgUrl: "images/lottery/luck_prize_4.png" },
        { id: 2, name: "大量元宝", num: 488, imgUrl: "images/lottery/luck_prize_6.png" },
        { id: 3, name: "双倍加速", num: 1, imgUrl: "images/lottery/luck_prize_2.png" },
        { id: 4, name: "高级宝箱", num: 1, imgUrl: "images/lottery/luck_prize_3.png" },
        { id: 5, name: "再来一次", num: 1, imgUrl: "images/lottery/luck_prize_0.png" },
        { id: 6, name: "腾讯季卡", num: 1, imgUrl: "images/lottery/luck_prize_5.png" },
        { id: 7, name: "超多铜钱", num: 1, imgUrl: "images/lottery/luck_prize_1.png" },
        { id: 8, name: "游戏T恤", num: 1, imgUrl: "images/lottery/luck_prize_7.png" }
    ]; //奖励物品列表

    private _itemId: number = 0;

    constructor() {
        super(LayerMgr.Ins.subFrameLayer, ui.moduleView.luckPrize.LuckPrizeRewardViewUI);
    }

    public initData(): void {
        super.initData();
        this._itemId = this.datas[0];
        if (this._itemId > 0) {
            let itemData = this.rewards[this._itemId - 1];
            this.ui.imgIcon.skin = itemData.imgUrl;
            if (this._itemId == 1 || this._itemId == 7) {   //金币
                let vo: HeroConfigVO = GlobalData.getData(GlobalData.HeroConfigVO, HallControl.Ins.Model.heroLevel);
                let heroPrice = 0;
                if (vo) {
                    heroPrice = HallControl.Ins.Model.getHeroBuyPrice(vo.buyPrice, HallControl.Ins.Model.queryBuyHeroRecord(vo.id));
                    if (this._itemId == 7) {//超多铜钱
                        heroPrice = heroPrice * 0.6;
                    } else {//大量铜钱
                        heroPrice = heroPrice * 0.2;
                    }
                }
                this.ui.txt_name.text = "获得：" + itemData.name + "x" + MathUtil.unitConversion(heroPrice);
                HallControl.Ins.updateGold(heroPrice, false);
                HttpMgr.Ins.requestPrizeCensus(this._itemId, heroPrice);
            } else if (this._itemId == 2) { //钻石
                this.ui.txt_name.text = "获得：" + itemData.name + "x" + itemData.num;
                HttpMgr.Ins.requestDiamondData();
                HttpMgr.Ins.requestPrizeCensus(this._itemId, itemData.num);
            } else if (this._itemId == 3) {//双倍加速
                this.ui.txt_name.text = "获得：" + itemData.name + "x" + itemData.num;
                EventsMgr.Ins.dispatch(EventType.GAME_ACCE_START, 90);
                HttpMgr.Ins.requestPrizeCensus(this._itemId, itemData.num);
            } else if (this._itemId == 4) {//高级宝箱 获得英雄
                let heroVO: HeroConfigVO = HallControl.Ins.Model.getPreNewHeroData(HallControl.Ins.Model.heroLevel, 1);
                if (heroVO) {
                    let vo: HeroVO = GlobalData.getData(GlobalData.HeroVO, heroVO.id);
                    if (vo) {
                        this.ui.imgIcon.skin = PathConfig.HEAD_PATH + vo.imgUrl;
                        this.ui.txt_name.text = "获得：" + heroVO.name + "x" + itemData.num;
                        let hero: HeadItem = HallControl.Ins.createHero(heroVO.id, true);
                        if (hero == null) {
                            StorageUtil.saveHeroStore(heroVO.id);
                            MsgMgr.Ins.showMsg("主人,武将已打包到箱子里了哦~记得点击箱子喲!");
                        }
                    }
                }
                HttpMgr.Ins.requestPrizeCensus(this._itemId, heroVO.id);
            } else {
                this.ui.txt_name.text = "获得：" + itemData.name + "(免费)";
                this.callback && this.callback(true);
                HttpMgr.Ins.requestPrizeCensus(this._itemId, itemData.num);
            }
        }
    }
}