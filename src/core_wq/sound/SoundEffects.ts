import BaseSound from "./BaseSound";

export default class SoundEffects extends BaseSound {

    private _volume: number;

    constructor() { super(); }

    /**
     * 播放一个音效
     * @param effectName
     */
    public play(effectId: string): void {
        let sound: Laya.Sound = this.getSound(effectId);
        if (sound) {
            this.playSound(sound);
        }
    }

    /**
     * 播放
     * @param sound
     */
    private playSound(sound: Laya.Sound): void {
        if (!sound) return;
        let channel: Laya.SoundChannel = sound.play(0, 1);
        channel.volume = this._volume;
    }

    /**
     * 设置音量
     * @param volume
     */
    public setVolume(volume: number): void {
        this._volume = volume;
    }

    /**
     * 资源加载完成后处理播放
     * @param key
     */
    public loadedPlay(key: string, soundPath: string): void {
        let sound: Laya.Sound = Laya.loader.getRes(soundPath);
        if (sound) {
            this.playSound(sound);
        }
    }
}