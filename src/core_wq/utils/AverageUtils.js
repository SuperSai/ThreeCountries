"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 平均数工具类
 */
class AverageUtils {
    /**
     * 构造函数
     * @param $maxNum 参与计算的最大值
     */
    constructor($maxNum = 10) {
        this.nums = [];
        this.numsLen = 0;
        this.numSum = 0;
        this.maxNum = $maxNum;
    }
    /**
     * 加入一个值
     * @param value
     */
    push(value) {
        if (this.numsLen > this.maxNum) {
            this.numsLen--;
            this.numSum -= this.nums.shift();
        }
        this.nums.push(value);
        this.numSum += value;
        this.numsLen++;
    }
    /**
     * 获取平均值
     * @returns {number}
     */
    getValue() {
        return this.numSum / this.numsLen;
    }
    /**
     * 清空
     */
    clear() {
        this.nums.splice(0);
        this.numsLen = 0;
        this.numSum = 0;
    }
}
exports.default = AverageUtils;
