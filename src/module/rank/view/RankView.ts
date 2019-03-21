import BaseView from "../../../core_wq/view/base/BaseView";
import LayerMgr from "../../../core_wq/layer/LayerMgr";
import { ui } from "../../../ui/layaMaxUI";
import HttpMgr from "../../../core_wq/net/HttpMgr";
import MathUtil from "../../../core_wq/utils/MathUtil";
import RankItem from "./RankItem";
import SDKMgr from "../../../core_wq/msg/SDKMgr";
import HallControl from "../../hall/HallControl";

/**
 * 排行榜
 */
export default class RankView extends BaseView {

    private _friendRank: Laya.WXOpenDataViewer;
    private curSelectedIndex: number = -1;

    constructor() {
        super(LayerMgr.Ins.frameLayer, ui.moduleView.rank.RankViewUI);
    }

    public initUI(): void {
        super.initUI();
        this.ui.txt_noRank.visible = true;
        this.ui.lists.visible = false;
        HttpMgr.Ins.requestWorldRankingData((data: any) => {
            if (data) {
                this.initWorldRank(data);
            }
        });
    }

    /** 初始化世界排行榜 */
    private initWorldRank(data: any): void {
        if (data && data.length > 0) {
            this.ui.txt_noRank.visible = false;
            this.ui.lists.visible = true;
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
        // if (this._friendRank) this._friendRank.visible = !isWorldRanking;
        if (!isWorldRanking) {

        }
    }

    private onListRender(cell: Laya.Box, index: number): void {
        if (index > this.ui.lists.array.length) {
            return;
        }
        let item: RankItem = cell.getChildByName("item") as RankItem;
        if (item) {
            item.dataSource = this.ui.lists.array[index];
            item.imgRank.visible = index < 3;
            if (index < 1) {
                item.imgRank.skin = "images/rank/cell_top1.png";
            } else if (index < 2) {
                item.imgRank.skin = "images/rank/cell_top2.png";
            } else if (index < 3) {
                item.imgRank.skin = "images/rank/cell_top3.png";
            } else {
                item.txt_rank.text = (index + 1) + "";
            }
        }
    }

    public close(...param: any[]): void {
        super.close(param);
        if (this._friendRank) {
            this._friendRank.destroy();
            this._friendRank.removeSelf();
            this._friendRank = null;
        }
    }
}