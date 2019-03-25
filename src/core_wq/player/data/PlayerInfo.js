"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerInfo {
    constructor() {
        /** 微信用户信息 */
        this.wxUserInfo = null;
        this.wxLaunch = null;
        /** 拥有金币 */
        this.userGold = 100000;
        /** 拥有钻石 */
        this.userDiamond = 0;
        /** 用户ID */
        this.userId = 0;
        /** 用户等级 */
        this.userLevel = 1;
        /** 用户经验 */
        this.userExp = 0;
        /** 等级增长的收益 */
        this.userLevelExtraIncome = 1;
        /** 本地缓存数据 */
        this.store_key = "store_key";
        /** 每秒收益 */
        this.userIncomeSec = 0;
        /** 额外收益-战斗人数满后+10% */
        this.userExtraIncome = 1;
        /** 启动加速x2 */
        this.userAcceValue = 1;
        /** 加速时间 */
        this.userAcceTime = 0;
        /** 跑道车数量 */
        this.userRuncarCount = 0;
        /** 跑道车数量最大值 */
        this.userRuncarCountMax = 0;
    }
}
PlayerInfo.GOLD = 0;
PlayerInfo.DIAMOND = 1;
exports.default = PlayerInfo;
