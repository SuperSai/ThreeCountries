"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventsMgr extends Laya.Sprite {
    constructor() {
        super();
        this.type = 1;
        this.dict = {};
        this.eVec = new Array();
        this.lastRunTime = 0;
        if (this.type == 0) {
            this.frameLoop(1, this, this.onRun);
        }
    }
    /**
     * 添加消息监听
     * @param type 消息唯一标识
     * @param listener 侦听函数
     * @param listenerObj 侦听函数所属对象
     *
     */
    addListener(type, listener, listenerObj) {
        let arr = this.dict[type];
        if (arr == null) {
            arr = new Array();
            this.dict[type] = arr;
        }
        //检测是否已经存在
        let i = 0;
        let len = arr.length;
        for (i; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == listenerObj) {
                return;
            }
        }
        arr.push([listener, listenerObj]);
    }
    /**
     * 移除消息监听
     * @param type 消息唯一标识
     * @param listener 侦听函数
     * @param listenerObj 侦听函数所属对象
     */
    removeListener(type, listener, listenerObj) {
        let arr = this.dict[type];
        if (arr == null)
            return;
        let i = 0;
        let len = arr.length;
        for (i; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == listenerObj) {
                arr.splice(i, 1);
                break;
            }
        }
        if (arr.length == 0) {
            this.dict[type] = null;
            delete this.dict[type];
        }
    }
    /**
     * 移除某一对象的所有监听
     * @param listenerObj 侦听函数所属对象
     */
    removeAll(listenerObj) {
        let keys = Object.keys(this.dict);
        for (let i = 0, len = keys.length; i < len; i++) {
            let type = keys[i];
            let arr = this.dict[type];
            for (let j = 0; j < arr.length; j++) {
                if (arr[j][1] == listenerObj) {
                    arr.splice(j, 1);
                    j--;
                }
            }
            if (arr.length == 0) {
                this.dict[type] = null;
                delete this.dict[type];
            }
        }
    }
    /**
     * 触发消息
     * @param type 消息唯一标识
     * @param param 消息参数
     */
    dispatch(type, ...param) {
        if (this.dict[type] == null) {
            return;
        }
        let vo = Laya.Pool.getItemByClass("MessageVo", MessageVo);
        vo.type = type;
        vo.param = param;
        if (this.type == 0) {
            this.eVec.push(vo);
        }
        else if (this.type == 1) {
            this.dealMsg(vo);
        }
        else {
            // Log.trace("MessageCenter未实现的类型");
        }
    }
    /** 运行 */
    onRun() {
        let currTime = Laya.Browser.now();
        let inSleep = currTime - this.lastRunTime > 100;
        this.lastRunTime = currTime;
        if (inSleep) {
            while (this.eVec.length > 0) {
                this.dealMsg(this.eVec.shift());
            }
        }
        else {
            while (this.eVec.length > 0) {
                this.dealMsg(this.eVec.shift());
                if ((Laya.Browser.now() - currTime) > 5) {
                    break;
                }
            }
        }
    }
    /** 处理一条消息 */
    dealMsg(msgVo) {
        let listeners = this.dict[msgVo.type];
        let i = 0;
        let len = listeners.length;
        let listener = null;
        while (i < len) {
            listener = listeners[i];
            listener[0].apply(listener[1], msgVo.param);
            if (listeners.length != len) {
                len = listeners.length;
                i--;
            }
            i++;
        }
        msgVo.dispose();
        Laya.Pool.recover("MessageVo", msgVo);
    }
    /** 清空处理 */
    clear() {
        this.dict = {};
        this.eVec.splice(0);
    }
    static get Ins() {
        if (EventsMgr._ins == null) {
            EventsMgr._ins = new EventsMgr();
        }
        return EventsMgr._ins;
    }
}
exports.default = EventsMgr;
class MessageVo {
    constructor() {
    }
    dispose() {
        this.type = null;
        this.param = null;
    }
}
