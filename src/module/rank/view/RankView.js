"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseView_1 = require("../../../core_wq/view/base/BaseView");
const LayerMgr_1 = require("../../../core_wq/layer/LayerMgr");
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const HttpMgr_1 = require("../../../core_wq/net/HttpMgr");
const MathUtil_1 = require("../../../core_wq/utils/MathUtil");
const PathConfig_1 = require("../../../core_wq/config/PathConfig");
/**
 * 排行榜
 */
class RankView extends BaseView_1.default {
    constructor() {
        super(LayerMgr_1.default.Ins.frameLayer, layaMaxUI_1.ui.moduleView.rank.RankViewUI);
        this.curSelectedIndex = -1;
        this.isWorldRanking = false;
    }
    initUI() {
        super.initUI();
        this.ui.lists.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this.initWorldRank();
    }
    /** 初始化世界榜 */
    initWorldRank() {
        HttpMgr_1.default.Ins.requestWorldRankingData((data) => {
            this._worldRankData = data;
            if (this._worldRankData) {
                this.updateRankList(this._worldRankData);
            }
            this.showMyWorldRank();
        });
    }
    /** 显示我的世界榜排名 */
    showMyWorldRank() {
        HttpMgr_1.default.Ins.requestMyWorldRankData((rankNum) => {
            if (rankNum) {
                this.ui.txt_myRank.text = rankNum + "";
            }
        });
    }
    /** 初始化收益排行榜 */
    initIncomeRank() {
        HttpMgr_1.default.Ins.requestIncomeRankingData((data) => {
            this._incomeRankData = data;
            if (this._incomeRankData) {
                if (this._incomeRankData && this._incomeRankData.length > 0) {
                    this._incomeRankData.forEach(element => {
                        let asset = MathUtil_1.default.parseStringNum(element.week_output);
                        if (asset < 0)
                            element.week_output = 0;
                    });
                }
                this.updateRankList(this._incomeRankData);
            }
            this.showMyIncomeRank();
        });
    }
    /** 显示我的收益榜排名 */
    showMyIncomeRank() {
        HttpMgr_1.default.Ins.requestMyIncomeRankData((rankNum) => {
            if (rankNum) {
                this.ui.txt_myRank.text = rankNum + "";
            }
        });
    }
    updateRankList(rankData) {
        this.ui.txt_noRank.visible = true;
        this.ui.lists.visible = false;
        this.ui.imgMyRank.visible = false;
        if (rankData && rankData.length > 0) {
            this.ui.txt_noRank.visible = false;
            this.ui.lists.visible = true;
            this.ui.imgMyRank.visible = true;
            this.ui.lists.array = rankData;
        }
    }
    addEvents() {
        this.ui.tab_rank.on(Laya.Event.CLICK, this, this.onRankTab);
    }
    removeEvents() {
        this.ui.tab_rank.off(Laya.Event.CLICK, this, this.onRankTab);
    }
    /** tab选择 0世界榜/1收益榜 */
    onRankTab() {
        if (this.curSelectedIndex == this.ui.tab_rank.selectedIndex)
            return;
        this.curSelectedIndex = this.ui.tab_rank.selectedIndex;
        this.isWorldRanking = (0 == this.ui.tab_rank.selectedIndex);
        if (this.isWorldRanking) { //世界榜
            this.ui.lists.height = 465;
            this.ui.lists.y = 454;
            this._worldRankData != null ? this.updateRankList(this._worldRankData) : this.initWorldRank();
        }
        else { //收益榜
            this.ui.lists.height = 735;
            this.ui.lists.y = 185;
            this._incomeRankData != null ? this.updateRankList(this._incomeRankData) : this.initIncomeRank();
        }
    }
    onListRender(cell, index) {
        if (index > this.ui.lists.array.length)
            return;
        let item = cell.getChildByName("item");
        if (item) {
            item.dataSource = this.ui.lists.array[index];
            item.box_title.visible = this.isWorldRanking;
            item.box_price.visible = !this.isWorldRanking;
            item.imgRank.visible = index < 3;
            if (item.imgRank.visible) {
                item.imgRank.skin = PathConfig_1.default.RANK_PATH.replace("{0}", (index + 1) + "");
            }
            else {
                item.txt_rank.text = (index + 1) + "";
            }
        }
    }
}
exports.default = RankView;
