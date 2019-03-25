"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathConfig_1 = require("../config/PathConfig");
const GlobalData_1 = require("../db/GlobalData");
const SoundMgr_1 = require("./SoundMgr");
class BaseSound {
    constructor() {
        this.soundPath = "";
        let self = this;
        self._cache = {};
        self._loadingCache = new Array();
        Laya.timer.loop(1 * 60 * 1000, self, self.dealSoundTimer);
    }
    /**
     * 处理音乐文件的清理
     */
    dealSoundTimer() {
        let self = this;
        let currTime = Laya.Browser.now();
        let keys = Object.keys(self._cache);
        for (let i = 0, len = keys.length; i < len; i++) {
            let key = keys[i];
            if (!self.checkCanClear(key))
                continue;
            if (currTime - self._cache[key] >= SoundMgr_1.default.CLEAR_TIME) {
                delete self._cache[key];
                Laya.loader.clearRes(key);
            }
        }
    }
    /**
     * 获取Sound
     * @param key
     * @returns {egret.Sound}
     */
    getSound(key) {
        let self = this;
        self._key = key;
        let vo = GlobalData_1.default.getData(GlobalData_1.default.SoundVO, Number(key));
        if (vo == null)
            return null;
        self.soundPath = PathConfig_1.default.SOUND_PATH.replace("{0}", vo.file);
        let sound = Laya.loader.getRes(self.soundPath);
        if (sound) {
            if (self._cache[self.soundPath]) {
                self._cache[self.soundPath] = Laya.Browser.now();
            }
        }
        else {
            if (self._loadingCache.indexOf(self.soundPath) != -1) {
                return sound;
            }
            self._loadingCache.push(self.soundPath);
            Laya.loader.load([{ url: self.soundPath, type: Laya.Loader.SOUND }], Laya.Handler.create(self, () => {
                let index = self._loadingCache.indexOf(self.soundPath);
                if (index != -1) {
                    self._loadingCache.splice(index, 1);
                    self._cache[self.soundPath] = Laya.Browser.now();
                    self.loadedPlay(self._key, self.soundPath);
                }
            }, null, false));
        }
        return sound;
    }
    /**
     * 资源加载完成后处理播放，子类重写
     * @param key
     */
    loadedPlay(key, soundPath) {
    }
    /**
     * 检测一个文件是否要清除，子类重写
     * @param key
     * @returns {boolean}
     */
    checkCanClear(key) {
        return true;
    }
}
exports.default = BaseSound;
