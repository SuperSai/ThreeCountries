import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import { ui } from "../../../ui/layaMaxUI";
import HttpMgr from "../../../core_wq/net/HttpMgr";
import MathUtil from "../../../core_wq/utils/MathUtil";
import RankItem from "./RankItem";
import SDKMgr from "../../../core_wq/msg/SDKMgr";

/**
 * 排行榜
 */
export default class RankView extends BaseView {

    private curSelectedIndex: number = -1;

    constructor() {
        super(LayerMgr.Ins.frameLayer, ui.moduleView.rank.RankViewUI);
    }

    public initUI(): void {
        super.initUI();
        this.ui.txt_noRank.visible = true;
        HttpMgr.Ins.requestWorldRankingData((data: any) => {
            if (data) {
                this.initWorldRank(data);
            }
        });
    }

    /** 初始化世界排行榜 */
    private initWorldRank(data: any): void {
        this.ui.txt_noRank.visible = false;
        data.forEach(element => {
            let asset: number = MathUtil.parseStringNum(element.week_output);
            if (asset <= 0) {
                element.week_output = 0;
            }
        });
        this.ui.lists.array = data;
        this.ui.lists.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);

        HttpMgr.Ins.requestMyWorldRankingData((rankNum: any) => {
            if (rankNum) {
                this.ui.txt_myRank.text = rankNum + "";
            }
        })
    }

    public addEvents(): void {
        this.ui.tab_rank.on(Laya.Event.CLICK, this, this.onRankTab);
    }

    public removeEvents(): void {
        this.ui.tab_rank.off(Laya.Event.CLICK, this, this.onRankTab);
    }

    private onRankTab(): void {
        if (this.curSelectedIndex == this.ui.tab_rank.selectedIndex) {
            return;
        }
        this.curSelectedIndex = this.ui.tab_rank.selectedIndex;
        let isWorldRanking = (0 == this.ui.tab_rank.selectedIndex);
        this.ui.worldRank.visible = isWorldRanking;
        this.ui.friendRank.visible = !isWorldRanking;
        if (!isWorldRanking) {
            SDKMgr.Ins.wxFriendRank(this.ui.friendRank, this.width, this.height);
        }
    }

    private onListRender(cell: Laya.Box, index: number): void {
        if (index > this.ui.lists.array.length) {
            return;
        }
        let item: RankItem = cell.getChildByName("item") as RankItem;
        if (item) {
            item.dataSource = this.ui.lists.array[index];
        }
    }
}