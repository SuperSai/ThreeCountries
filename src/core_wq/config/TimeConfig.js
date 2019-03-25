"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimeConfig {
}
/**
 * 以秒为单位时，表示1秒的值，即1
 */
TimeConfig.SEC = 1;
/**
 * 以秒为单位时，表示1分钟的值，即60
 */
TimeConfig.MIN = 60;
/**
 * 以秒为单位时，表示1小时的值，即60 x 60
 */
TimeConfig.HOUR = 60 * 60;
/**
 * 以毫秒为单位时，表示1秒的值，即1000
 */
TimeConfig.SEC_IN_MILI = 1000;
/**
 * 以毫秒为单位时，表示1分钟的值，即1000 x 60
 */
TimeConfig.MIN_IN_MILI = 1000 * 60;
/**
 * 以毫秒为单位时，表示1小时的值，即1000 x 60 x 60
 */
TimeConfig.HOUR_IN_MILI = 1000 * 60 * 60;
exports.default = TimeConfig;
