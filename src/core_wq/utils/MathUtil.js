"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MathUtil extends Laya.Script {
    /** 生成随机浮点数，随机数范围包含min值，但不包含max值 */
    static range(min, max) {
        return Math.random() * (max - min) + min;
    }
    /** 生成随机整数，随机整数范围包含min值和max值 */
    static rangeInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    /** 单位转换 */
    static unitConversion(value) {
        if (value < 1000000) {
            return Math.floor(value).toString();
        }
        if (value === 0)
            return '0';
        let k = 1000, // or 1024
        sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'], i = Math.floor(Math.log(value) / Math.log(k));
        let unit = '';
        if (i < sizes.length) {
            unit = sizes[i];
        }
        else {
            let numLenght = i - sizes.length;
            unit = String.fromCharCode(97 + numLenght % 26);
            for (let index = 0, len = 1 + Math.floor(numLenght / 65); index < len; index++) {
                unit = unit + unit;
            }
        }
        return (value / Math.pow(k, i)).toPrecision(3) + ' ' + unit;
    }
    /** 字符串转数字 */
    static parseStringNum(_strNum) {
        let intNum = parseFloat(_strNum);
        if (intNum) {
            return intNum;
        }
        return 0;
    }
    /** 字符串转整形 */
    static parseInt(_strNum) {
        let intNum = parseFloat(_strNum);
        if (intNum) {
            return Math.floor(intNum);
        }
        return 0;
    }
    static splitToNumber(value, sprelator = "#") {
        if (value == "0")
            return [];
        let result = [];
        let sArray = value.split(sprelator);
        for (let i = 0; i < sArray.length; i++) {
            result.push(parseInt(sArray[i]));
        }
        return result;
    }
    static splitToString(value, sprelator = "#") {
        if (value == "0")
            return [];
        let result = [];
        let sArray = value.split(sprelator);
        for (let i = 0; i < sArray.length; i++) {
            result.push(sArray[i]);
        }
        return result;
    }
    static removeFromArray(target, array) {
        let index = array.indexOf(target);
        if (index >= 0)
            array.splice(index, 1);
        return array;
    }
    /** 替换数组中的数据 */
    static replaceItemToArray(array, inde, item) {
        array.splice(inde, 1, item);
    }
}
exports.default = MathUtil;
