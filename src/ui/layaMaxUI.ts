/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
var REG: Function = Laya.ClassUtils.regClass;
export module ui.moduleView.common {
    export class DiamondBuyViewUI extends Laya.View {
		public btn_close:Laya.Button;
		public txt_title:Laya.Label;
		public btn_buy:Laya.Button;
		public txt_diamond:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/common/DiamondBuyView");
        }
    }
    REG("ui.moduleView.common.DiamondBuyViewUI",DiamondBuyViewUI);
    export class GoldNotEnoughViewUI extends Laya.View {
		public txt_price:Laya.Label;
		public btn_get:Laya.Button;
		public txt_btn:Laya.Label;
		public txt_lastTime:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/common/GoldNotEnoughView");
        }
    }
    REG("ui.moduleView.common.GoldNotEnoughViewUI",GoldNotEnoughViewUI);
    export class LevelRewardViewUI extends Laya.View {
		public txt_levelGift:Laya.Label;
		public btn_get:Laya.Button;
		public txt_acc:Laya.Label;
		public txt_gold:Laya.Label;
		public btn_share:Laya.Button;
		public txt_diamond:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/common/LevelRewardView");
        }
    }
    REG("ui.moduleView.common.LevelRewardViewUI",LevelRewardViewUI);
    export class OffLineRewardViewUI extends Laya.View {
		public txt_gold:Laya.Label;
		public btn_get:Laya.Button;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/common/OffLineRewardView");
        }
    }
    REG("ui.moduleView.common.OffLineRewardViewUI",OffLineRewardViewUI);
}
export module ui.moduleView.daySign {
    export class DaySignItemUI extends Laya.View {
		public btn_get:Laya.Button;
		public imgGet:Laya.Image;
		public txt_diamond:Laya.Label;
		public txt_title:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/daySign/DaySignItem");
        }
    }
    REG("ui.moduleView.daySign.DaySignItemUI",DaySignItemUI);
    export class DaySignViewUI extends Laya.View {
		public btn_get:Laya.Button;
		public btn_lastGet:Laya.Button;
		public imgGet:Laya.Image;
		public txt_diamond:Laya.Label;
		public txt_title:Laya.Label;
		public btn_close:Laya.Button;
		public lists:Laya.List;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/daySign/DaySignView");
        }
    }
    REG("ui.moduleView.daySign.DaySignViewUI",DaySignViewUI);
}
export module ui.moduleView.follow {
    export class FollowViewUI extends Laya.Scene {
		public btn_get:Laya.Button;
		public btn_close:Laya.Button;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/follow/FollowView");
        }
    }
    REG("ui.moduleView.follow.FollowViewUI",FollowViewUI);
}
export module ui.moduleView.guide {
    export class GuideSpeakViewUI extends Laya.View {
		public txt_content:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/guide/GuideSpeakView");
        }
    }
    REG("ui.moduleView.guide.GuideSpeakViewUI",GuideSpeakViewUI);
}
export module ui.moduleView.hall {
    export class CurrencyViewUI extends Laya.View {
		public btn_user:Laya.Image;
		public txt_level:Laya.Label;
		public txt_Income:Laya.Label;
		public imgGold:Laya.Sprite;
		public txt_gold:Laya.Label;
		public imgDiamond:Laya.Sprite;
		public txt_diamond:Laya.Label;
		public expBar:Laya.ProgressBar;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/hall/CurrencyView");
        }
    }
    REG("ui.moduleView.hall.CurrencyViewUI",CurrencyViewUI);
    export class HallSceneUI extends Laya.Scene {
		public box_farground:Laya.Box;
		public fargroundOne:Laya.Sprite;
		public fargroundTwo:Laya.Sprite;
		public box_foreground:Laya.Box;
		public foregroundOne:Laya.Sprite;
		public foregroundTwo:Laya.Sprite;
		public box_obstacle:Laya.Box;
		public obstacleOne:Laya.Sprite;
		public obstacleTwo:Laya.Sprite;
		public beginEventView:Laya.View;
		public imgDelete:Laya.Sprite;
		public map_name:Laya.Image;
		public txt_mapName:Laya.Label;
		public btn_recruit:Laya.Button;
		public txt_price:Laya.Label;
		public txt_level:Laya.Label;
		public btn_heroStore:Laya.Button;
		public imgBattleCount:Laya.Image;
		public txt_battleCount:Laya.Label;
		public imgBattleGold:Laya.Sprite;
		public btn_acc:Laya.Button;
		public imgAccTips:Laya.Sprite;
		public imgAcce:Laya.Sprite;
		public txt_accTimes:Laya.Label;
		public imgAccAdv:Laya.Sprite;
		public btn_shop:Laya.Button;
		public imgFree:Laya.Image;
		public imgHead:Laya.Image;
		public lists_head:Laya.List;
		public surpassView:laya.ui.WXOpenDataViewer;
		public list_btn:Laya.List;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/hall/HallScene");
        }
    }
    REG("ui.moduleView.hall.HallSceneUI",HallSceneUI);
    export class HeroTipsUI extends Laya.View {
		public txt_name:Laya.Label;
		public txt_secCoin:Laya.Label;
		public txt_sellPrice:Laya.Label;
		public txt_speed:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/hall/HeroTips");
        }
    }
    REG("ui.moduleView.hall.HeroTipsUI",HeroTipsUI);
    export class NewHeroViewUI extends Laya.View {
		public txt_name:Laya.Label;
		public txt_exp:Laya.Label;
		public txt_income:Laya.Label;
		public btn_reward:Laya.Button;
		public txt_price:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/hall/NewHeroView");
        }
    }
    REG("ui.moduleView.hall.NewHeroViewUI",NewHeroViewUI);
    export class UserInfoViewUI extends Laya.View {
		public expBar:Laya.ProgressBar;
		public txt_exp:Laya.Label;
		public txt_price:Laya.Label;
		public txt_heroCount:Laya.Label;
		public txt_battleCount:Laya.Label;
		public txt_userId:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/hall/UserInfoView");
        }
    }
    REG("ui.moduleView.hall.UserInfoViewUI",UserInfoViewUI);
}
export module ui.moduleView.hall.item {
    export class HeadItemUI extends Laya.View {
		public imgHead:Laya.Image;
		public imgLock:Laya.Sprite;
		public reviveBar:Laya.ProgressBar;
		public hpBar:Laya.ProgressBar;
		public boxLevel:Laya.Sprite;
		public txt_level:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/hall/item/HeadItem");
        }
    }
    REG("ui.moduleView.hall.item.HeadItemUI",HeadItemUI);
    export class SystemBtnUI extends Laya.View {
		public btn_system:Laya.Button;
		public imgRenPoint:Laya.Sprite;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/hall/item/SystemBtn");
        }
    }
    REG("ui.moduleView.hall.item.SystemBtnUI",SystemBtnUI);
}
export module ui.moduleView.login {
    export class LoginSceneUI extends Laya.Scene {
		public txt_pro:Laya.Label;
		public imgStart:Laya.Sprite;
		public txt_tips:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/login/LoginScene");
        }
    }
    REG("ui.moduleView.login.LoginSceneUI",LoginSceneUI);
}
export module ui.moduleView.luckPrize {
    export class LuckPrizeRewardViewUI extends Laya.View {
		public imgItemBg:Laya.Sprite;
		public imgIcon:Laya.Image;
		public txt_name:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/luckPrize/LuckPrizeRewardView");
        }
    }
    REG("ui.moduleView.luckPrize.LuckPrizeRewardViewUI",LuckPrizeRewardViewUI);
    export class LuckPrizeViewUI extends Laya.View {
		public imgBg:Laya.Sprite;
		public btn_start:Laya.Button;
		public imgDiamond:Laya.Sprite;
		public txt_diamond:Laya.Label;
		public txt_des:Laya.Label;
		public txt_time:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/luckPrize/LuckPrizeView");
        }
    }
    REG("ui.moduleView.luckPrize.LuckPrizeViewUI",LuckPrizeViewUI);
}
export module ui.moduleView.rank {
    export class RankItemUI extends Laya.View {
		public imgHead:Laya.Image;
		public imgRank:Laya.Image;
		public box_price:Laya.Box;
		public txt_score:Laya.Label;
		public txt_rank:Laya.Label;
		public txt_position:Laya.Label;
		public txt_name:Laya.Label;
		public box_title:Laya.Box;
		public txt_title:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/rank/RankItem");
        }
    }
    REG("ui.moduleView.rank.RankItemUI",RankItemUI);
    export class RankViewUI extends Laya.View {
		public txt_noRank:Laya.Label;
		public lists:Laya.List;
		public tab_rank:Laya.Tab;
		public imgMyRank:Laya.Sprite;
		public txt_myRank:Laya.Label;
		public imgBase:Laya.Sprite;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/rank/RankView");
        }
    }
    REG("ui.moduleView.rank.RankViewUI",RankViewUI);
}
export module ui.moduleView.shop {
    export class ShopItemUI extends Laya.View {
		public imgIcon:Laya.Image;
		public btn_buyDiamond:Laya.Button;
		public btn_adv:Laya.Button;
		public btn_buy:Laya.Button;
		public txt_price:Laya.Label;
		public btn_buyLock:Laya.Button;
		public imgHero:Laya.Image;
		public txt_unlockLevel:Laya.Label;
		public boxName:Laya.Box;
		public imgName:Laya.Sprite;
		public txt_name:Laya.Label;
		public txt_level:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/shop/ShopItem");
        }
    }
    REG("ui.moduleView.shop.ShopItemUI",ShopItemUI);
    export class ShopViewUI extends Laya.View {
		public lists:Laya.List;
		public txt_gold:Laya.Label;
		public txt_diamond:Laya.Label;
		public btn_close:Laya.Button;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/shop/ShopView");
        }
    }
    REG("ui.moduleView.shop.ShopViewUI",ShopViewUI);
}
export module ui.moduleView.task {
    export class TaskItemUI extends Laya.View {
		public btn_get:Laya.Button;
		public txt_title:Laya.Label;
		public txt_diamond:Laya.Label;
		public txt_extra:Laya.Label;
		public btn_go:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/task/TaskItem");
        }
    }
    REG("ui.moduleView.task.TaskItemUI",TaskItemUI);
    export class TaskViewUI extends Laya.View {
		public lists:Laya.List;
		public txt_noTask:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("moduleView/task/TaskView");
        }
    }
    REG("ui.moduleView.task.TaskViewUI",TaskViewUI);
}