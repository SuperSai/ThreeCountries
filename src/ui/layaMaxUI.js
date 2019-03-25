"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = Laya.ClassUtils.regClass;
var ui;
(function (ui) {
    var moduleView;
    (function (moduleView) {
        var common;
        (function (common) {
            class DiamondBuyViewUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/common/DiamondBuyView");
                }
            }
            common.DiamondBuyViewUI = DiamondBuyViewUI;
            REG("ui.moduleView.common.DiamondBuyViewUI", DiamondBuyViewUI);
            class GoldNotEnoughViewUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/common/GoldNotEnoughView");
                }
            }
            common.GoldNotEnoughViewUI = GoldNotEnoughViewUI;
            REG("ui.moduleView.common.GoldNotEnoughViewUI", GoldNotEnoughViewUI);
            class LevelRewardViewUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/common/LevelRewardView");
                }
            }
            common.LevelRewardViewUI = LevelRewardViewUI;
            REG("ui.moduleView.common.LevelRewardViewUI", LevelRewardViewUI);
            class OffLineRewardViewUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/common/OffLineRewardView");
                }
            }
            common.OffLineRewardViewUI = OffLineRewardViewUI;
            REG("ui.moduleView.common.OffLineRewardViewUI", OffLineRewardViewUI);
        })(common = moduleView.common || (moduleView.common = {}));
    })(moduleView = ui.moduleView || (ui.moduleView = {}));
})(ui = exports.ui || (exports.ui = {}));
(function (ui) {
    var moduleView;
    (function (moduleView) {
        var daySign;
        (function (daySign) {
            class DaySignItemUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/daySign/DaySignItem");
                }
            }
            daySign.DaySignItemUI = DaySignItemUI;
            REG("ui.moduleView.daySign.DaySignItemUI", DaySignItemUI);
            class DaySignViewUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/daySign/DaySignView");
                }
            }
            daySign.DaySignViewUI = DaySignViewUI;
            REG("ui.moduleView.daySign.DaySignViewUI", DaySignViewUI);
        })(daySign = moduleView.daySign || (moduleView.daySign = {}));
    })(moduleView = ui.moduleView || (ui.moduleView = {}));
})(ui = exports.ui || (exports.ui = {}));
(function (ui) {
    var moduleView;
    (function (moduleView) {
        var follow;
        (function (follow) {
            class FollowViewUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/follow/FollowView");
                }
            }
            follow.FollowViewUI = FollowViewUI;
            REG("ui.moduleView.follow.FollowViewUI", FollowViewUI);
        })(follow = moduleView.follow || (moduleView.follow = {}));
    })(moduleView = ui.moduleView || (ui.moduleView = {}));
})(ui = exports.ui || (exports.ui = {}));
(function (ui) {
    var moduleView;
    (function (moduleView) {
        var guide;
        (function (guide) {
            class GuideSpeakViewUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/guide/GuideSpeakView");
                }
            }
            guide.GuideSpeakViewUI = GuideSpeakViewUI;
            REG("ui.moduleView.guide.GuideSpeakViewUI", GuideSpeakViewUI);
        })(guide = moduleView.guide || (moduleView.guide = {}));
    })(moduleView = ui.moduleView || (ui.moduleView = {}));
})(ui = exports.ui || (exports.ui = {}));
(function (ui) {
    var moduleView;
    (function (moduleView) {
        var hall;
        (function (hall) {
            class CurrencyViewUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/hall/CurrencyView");
                }
            }
            hall.CurrencyViewUI = CurrencyViewUI;
            REG("ui.moduleView.hall.CurrencyViewUI", CurrencyViewUI);
            class HallSceneUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/hall/HallScene");
                }
            }
            hall.HallSceneUI = HallSceneUI;
            REG("ui.moduleView.hall.HallSceneUI", HallSceneUI);
            class HeroTipsUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/hall/HeroTips");
                }
            }
            hall.HeroTipsUI = HeroTipsUI;
            REG("ui.moduleView.hall.HeroTipsUI", HeroTipsUI);
            class NewHeroViewUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/hall/NewHeroView");
                }
            }
            hall.NewHeroViewUI = NewHeroViewUI;
            REG("ui.moduleView.hall.NewHeroViewUI", NewHeroViewUI);
            class UserInfoViewUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/hall/UserInfoView");
                }
            }
            hall.UserInfoViewUI = UserInfoViewUI;
            REG("ui.moduleView.hall.UserInfoViewUI", UserInfoViewUI);
        })(hall = moduleView.hall || (moduleView.hall = {}));
    })(moduleView = ui.moduleView || (ui.moduleView = {}));
})(ui = exports.ui || (exports.ui = {}));
(function (ui) {
    var moduleView;
    (function (moduleView) {
        var hall;
        (function (hall) {
            var item;
            (function (item) {
                class HeadItemUI extends Laya.View {
                    constructor() { super(); }
                    createChildren() {
                        super.createChildren();
                        this.loadScene("moduleView/hall/item/HeadItem");
                    }
                }
                item.HeadItemUI = HeadItemUI;
                REG("ui.moduleView.hall.item.HeadItemUI", HeadItemUI);
                class SystemBtnUI extends Laya.View {
                    constructor() { super(); }
                    createChildren() {
                        super.createChildren();
                        this.loadScene("moduleView/hall/item/SystemBtn");
                    }
                }
                item.SystemBtnUI = SystemBtnUI;
                REG("ui.moduleView.hall.item.SystemBtnUI", SystemBtnUI);
            })(item = hall.item || (hall.item = {}));
        })(hall = moduleView.hall || (moduleView.hall = {}));
    })(moduleView = ui.moduleView || (ui.moduleView = {}));
})(ui = exports.ui || (exports.ui = {}));
(function (ui) {
    var moduleView;
    (function (moduleView) {
        var login;
        (function (login) {
            class LoginSceneUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/login/LoginScene");
                }
            }
            login.LoginSceneUI = LoginSceneUI;
            REG("ui.moduleView.login.LoginSceneUI", LoginSceneUI);
        })(login = moduleView.login || (moduleView.login = {}));
    })(moduleView = ui.moduleView || (ui.moduleView = {}));
})(ui = exports.ui || (exports.ui = {}));
(function (ui) {
    var moduleView;
    (function (moduleView) {
        var luckPrize;
        (function (luckPrize) {
            class LuckPrizeRewardViewUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/luckPrize/LuckPrizeRewardView");
                }
            }
            luckPrize.LuckPrizeRewardViewUI = LuckPrizeRewardViewUI;
            REG("ui.moduleView.luckPrize.LuckPrizeRewardViewUI", LuckPrizeRewardViewUI);
            class LuckPrizeViewUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/luckPrize/LuckPrizeView");
                }
            }
            luckPrize.LuckPrizeViewUI = LuckPrizeViewUI;
            REG("ui.moduleView.luckPrize.LuckPrizeViewUI", LuckPrizeViewUI);
        })(luckPrize = moduleView.luckPrize || (moduleView.luckPrize = {}));
    })(moduleView = ui.moduleView || (ui.moduleView = {}));
})(ui = exports.ui || (exports.ui = {}));
(function (ui) {
    var moduleView;
    (function (moduleView) {
        var rank;
        (function (rank) {
            class RankItemUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/rank/RankItem");
                }
            }
            rank.RankItemUI = RankItemUI;
            REG("ui.moduleView.rank.RankItemUI", RankItemUI);
            class RankViewUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/rank/RankView");
                }
            }
            rank.RankViewUI = RankViewUI;
            REG("ui.moduleView.rank.RankViewUI", RankViewUI);
        })(rank = moduleView.rank || (moduleView.rank = {}));
    })(moduleView = ui.moduleView || (ui.moduleView = {}));
})(ui = exports.ui || (exports.ui = {}));
(function (ui) {
    var moduleView;
    (function (moduleView) {
        var shop;
        (function (shop) {
            class ShopItemUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/shop/ShopItem");
                }
            }
            shop.ShopItemUI = ShopItemUI;
            REG("ui.moduleView.shop.ShopItemUI", ShopItemUI);
            class ShopViewUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/shop/ShopView");
                }
            }
            shop.ShopViewUI = ShopViewUI;
            REG("ui.moduleView.shop.ShopViewUI", ShopViewUI);
        })(shop = moduleView.shop || (moduleView.shop = {}));
    })(moduleView = ui.moduleView || (ui.moduleView = {}));
})(ui = exports.ui || (exports.ui = {}));
(function (ui) {
    var moduleView;
    (function (moduleView) {
        var task;
        (function (task) {
            class TaskItemUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/task/TaskItem");
                }
            }
            task.TaskItemUI = TaskItemUI;
            REG("ui.moduleView.task.TaskItemUI", TaskItemUI);
            class TaskViewUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("moduleView/task/TaskView");
                }
            }
            task.TaskViewUI = TaskViewUI;
            REG("ui.moduleView.task.TaskViewUI", TaskViewUI);
        })(task = moduleView.task || (moduleView.task = {}));
    })(moduleView = ui.moduleView || (ui.moduleView = {}));
})(ui = exports.ui || (exports.ui = {}));
