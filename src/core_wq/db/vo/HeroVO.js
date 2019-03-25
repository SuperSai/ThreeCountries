"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HeroVO {
    constructor() {
        this.id = 0;
        this.type = 0;
        this.name = "";
        /** 头像图片 */
        this.imgUrl = "";
        /** 对白 */
        this.dialogue = "";
        /** 龙骨动画 */
        this.modelImgUrl = "";
        /** 坐骑 */
        this.horse = "";
        /** 攻击动作 */
        this.atkAnimKey = "";
    }
}
exports.default = HeroVO;
