"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SoundEffects_1 = require("./SoundEffects");
const SoundBG_1 = require("./SoundBG");
class SoundMgr {
    constructor() {
        this._bgOn = true;
        this._effectOn = true;
        this._bgVolume = 0.5;
        this._effectVolume = 0.5;
        this._bg = new SoundBG_1.default();
        this._bg.setVolume(this._bgVolume);
        this._effect = new SoundEffects_1.default();
        this._effect.setVolume(this._effectVolume);
    }
    /**
     * 播放音效
     * @param effectName
     */
    playEffect(effectId) {
        if (!this._effectOn)
            return;
        this._effect.play(effectId);
    }
    /**
     * 播放背景音乐
     * @param key
     */
    playBg(bgName) {
        this._currBg = bgName;
        if (!this._bgOn)
            return;
        this._bg.play(bgName);
    }
    /**
     * 停止背景音乐
     */
    stopBg() {
        this._bg.stop();
    }
    /**
     * 设置音效是否开启
     * @param $isOn
     */
    setEffectOn($isOn) {
        this._effectOn = $isOn;
    }
    /**
     * 设置背景音乐是否开启
     * @param $isOn
     */
    setBgOn($isOn) {
        this._bgOn = $isOn;
        if (!this._bgOn) {
            this.stopBg();
        }
        else {
            if (this._currBg) {
                this.playBg(this._currBg);
            }
        }
    }
    /**
     * 设置背景音乐音量
     * @param volume
     */
    setBgVolume(volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this._bgVolume = volume;
        this._bg.setVolume(this._bgVolume);
    }
    /**
     * 获取背景音乐音量
     * @returns {number}
     */
    getBgVolume() {
        return this._bgVolume;
    }
    /**
     * 设置音效音量
     * @param volume
     */
    setEffectVolume(volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this._effectVolume = volume;
        this._effect.setVolume(this._effectVolume);
    }
    /**
     * 获取音效音量
     * @returns {number}
     */
    getEffectVolume() {
        return this._effectVolume;
    }
    get bgOn() {
        return this._bgOn;
    }
    get effectOn() {
        return this._effectOn;
    }
    static get Ins() {
        if (SoundMgr._instance == null) {
            SoundMgr._instance = new SoundMgr();
        }
        return SoundMgr._instance;
    }
}
/** 音乐文件清理时间 */
SoundMgr.CLEAR_TIME = 3 * 60 * 1000;
exports.default = SoundMgr;
