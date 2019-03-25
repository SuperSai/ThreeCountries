"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MathUtil_1 = require("../../utils/MathUtil");
class GuideVO {
    set isForce(value) {
        this._isForce = Number(value) == 0 ? false : true;
    }
    /** 是否强制引导 */
    get isForce() {
        return this._isForce;
    }
    set clickAreaParam(value) {
        this._clickAreaParam = MathUtil_1.default.splitToNumber(value);
    }
    /** 可点击区域参数  x#y#w#h */
    get clickAreaParam() {
        return this._clickAreaParam;
    }
    set fingerParam(value) {
        this._fingerParam = MathUtil_1.default.splitToNumber(value);
    }
    /** 手指指引位置参数 x#y */
    get fingerParam() {
        return this._fingerParam;
    }
    set speakParam(value) {
        this._speakParam = MathUtil_1.default.splitToNumber(value);
    }
    /** 对话框位置参数  x#y */
    get speakParam() {
        return this._speakParam;
    }
}
exports.default = GuideVO;
