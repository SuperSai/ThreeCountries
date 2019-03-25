"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 功能开放表
 */
class SystemVO {
    constructor() {
        this.id = 0;
        /** 名字 */
        this.name = "";
        /** 描述 */
        this.des = "";
        /** 开放等级 */
        this.openLevel = 0;
        /** 排序位置 */
        this.sort = 0;
        /** 图片 */
        this.icon = "";
    }
}
exports.default = SystemVO;
