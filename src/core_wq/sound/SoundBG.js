"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseSound_1 = require("./BaseSound");
class SoundBG extends BaseSound_1.default {
    constructor() {
        super();
        this._currBg = "";
    }
    /**
     * 停止当前音乐
     */
    stop() {
        let self = this;
        if (self._currSoundChannel) {
            self._currSoundChannel.stop();
        }
        self._currSoundChannel = null;
        self._currSound = null;
        self._currBg = "";
    }
    /**
     * 播放某个音乐
     * @param effectName
     */
    play(effectName) {
        let self = this;
        if (self._currBg == effectName)
            return;
        self.stop();
        self._currBg = effectName;
        var sound = self.getSound(effectName);
        if (sound) {
            self.playSound(self.soundPath);
        }
    }
    /**
     * 播放
     * @param sound
     */
    playSound(soundPath) {
        let self = this;
        self._currSoundChannel = Laya.SoundManager.playMusic(soundPath, 0);
        if (self._currSoundChannel)
            self._currSoundChannel.volume = this._volume;
    }
    /**
     * 设置音量
     * @param volume
     */
    setVolume(volume) {
        let self = this;
        self._volume = volume;
        if (self._currSoundChannel) {
            self._currSoundChannel.volume = self._volume;
        }
    }
    /**
     * 资源加载完成后处理播放
     * @param key
     */
    loadedPlay(key, soundPath) {
        let self = this;
        if (self._currBg == key) {
            var sound = Laya.loader.getRes(soundPath);
            if (sound) {
                self.playSound(soundPath);
            }
        }
    }
    /**
     * 检测一个文件是否要清除
     * @param key
     * @returns {boolean}
     */
    checkCanClear(key) {
        let self = this;
        return self._currBg != key;
    }
}
exports.default = SoundBG;
