"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseSound_1 = require("./BaseSound");
class SoundEffects extends BaseSound_1.default {
    constructor() { super(); }
    /**
     * 播放一个音效
     * @param effectName
     */
    play(effectId) {
        let sound = this.getSound(effectId);
        if (sound) {
            this.playSound(this.soundPath);
        }
    }
    /**
     * 播放
     * @param sound
     */
    playSound(soundPath) {
        let channel = Laya.SoundManager.playSound(soundPath, 1);
        if (channel)
            channel.volume = this._volume;
    }
    /**
     * 设置音量
     * @param volume
     */
    setVolume(volume) {
        this._volume = volume;
    }
    /**
     * 资源加载完成后处理播放
     * @param key
     */
    loadedPlay(key, soundPath) {
        let sound = Laya.loader.getRes(soundPath);
        if (sound) {
            this.playSound(this.soundPath);
        }
    }
}
exports.default = SoundEffects;
