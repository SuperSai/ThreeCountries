"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShopView_1 = require("../../module/shop/view/ShopView");
const ViewMgr_1 = require("./ViewMgr");
const ViewConst_1 = require("./const/ViewConst");
const DiamondBuyView_1 = require("../../module/common/view/DiamondBuyView");
const LuckPrizeView_1 = require("../../module/luckPrize/view/LuckPrizeView");
const DaySignView_1 = require("../../module/daySign/view/DaySignView");
const TaskView_1 = require("../../module/task/view/TaskView");
const FollowView_1 = require("../../module/follow/view/FollowView");
const RankView_1 = require("../../module/rank/view/RankView");
const GoldNotEnoughView_1 = require("../../module/common/view/GoldNotEnoughView");
const LevelRewardView_1 = require("../../module/common/view/LevelRewardView");
const OffLineRewardView_1 = require("../../module/common/view/OffLineRewardView");
const UserInfoView_1 = require("../../module/hall/view/UserInfoView");
const NewHeroView_1 = require("../../module/hall/view/NewHeroView");
/**
 * 界面注册类
 */
class ViewRegisterMgr {
    /** 初始化注册界面 */
    initRegisterView() {
        ViewMgr_1.default.Ins.register(ViewConst_1.default.ShopView, new ShopView_1.default());
        ViewMgr_1.default.Ins.register(ViewConst_1.default.DiamondBuyView, new DiamondBuyView_1.default());
        ViewMgr_1.default.Ins.register(ViewConst_1.default.LuckPrizeView, new LuckPrizeView_1.default());
        ViewMgr_1.default.Ins.register(ViewConst_1.default.DaySignView, new DaySignView_1.default());
        ViewMgr_1.default.Ins.register(ViewConst_1.default.TaskView, new TaskView_1.default());
        ViewMgr_1.default.Ins.register(ViewConst_1.default.FollowView, new FollowView_1.default());
        ViewMgr_1.default.Ins.register(ViewConst_1.default.RankView, new RankView_1.default());
        ViewMgr_1.default.Ins.register(ViewConst_1.default.GoldNotEnoughView, new GoldNotEnoughView_1.default());
        ViewMgr_1.default.Ins.register(ViewConst_1.default.LevelRewardView, new LevelRewardView_1.default());
        ViewMgr_1.default.Ins.register(ViewConst_1.default.OffLineRewardView, new OffLineRewardView_1.default());
        ViewMgr_1.default.Ins.register(ViewConst_1.default.UserInfoView, new UserInfoView_1.default());
        ViewMgr_1.default.Ins.register(ViewConst_1.default.NewHeroView, new NewHeroView_1.default());
    }
    static get Ins() {
        if (ViewRegisterMgr._instance == null) {
            ViewRegisterMgr._instance = new ViewRegisterMgr();
        }
        return ViewRegisterMgr._instance;
    }
}
exports.default = ViewRegisterMgr;
