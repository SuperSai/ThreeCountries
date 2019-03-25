"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimeUtil {
    /** 00:00:00格式时间 */
    static timeFormatStr(_time, _isHour = false) {
        let hour = Math.floor(_time / 3600);
        let minute = Math.floor(_time / 60) % 60;
        let sec = _time % 60;
        if (_isHour) {
            return (hour < 10 ? ('0' + hour) : hour) + ':' + (minute < 10 ? ('0' + minute) : minute) + ':' + (sec < 10 ? ('0' + sec) : sec);
        }
        else {
            return (minute < 10 ? ('0' + minute) : minute) + ':' + (sec < 10 ? ('0' + sec) : sec);
        }
    }
    /** 获取本地与服务器时间差(s减c) */
    static csDiffTime() {
        let that = this;
        return that.cs_time_diff;
    }
    /** 获取服务器当前时间 */
    static serverTime() {
        let that = this;
        let cur_time = (new Date()).getTime() / 1000;
        return (cur_time + that.csDiffTime());
    }
}
TimeUtil.cs_time_diff = 0; //客户端与服务器时间差
exports.default = TimeUtil;
