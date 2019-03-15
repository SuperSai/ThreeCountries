import BaseSound from "./BaseSound";

export default class SoundBG extends BaseSound {

    private _currBg: string;
    private _currSound: Laya.Sound;
    private _currSoundChannel: Laya.SoundChannel;
    private _volume: number;

    constructor() {
        super();
        this._currBg = "";
    }

    /**
     * 停止当前音乐
     */
    public stop(): void {
        if (this._currSoundChannel) {
            this._currSoundChannel.stop();
        }
        this._currSoundChannel = null;
        this._currSound = null;
        this._currBg = "";
    }

    /**
     * 播放某个音乐
     * @param effectName
     */
    public play(effectName: string): void {
        if (this._currBg == effectName)
            return;
        this.stop();
        this._currBg = effectName;
        var sound: Laya.Sound = this.getSound(effectName);
        if (sound) {
            this.playSound(sound);
        }
    }

    /**
     * 播放
     * @param sound
     */
    private playSound(sound: Laya.Sound): void {
        this._currSound = sound;
        this._currSoundChannel = this._currSound.play();
        this._currSoundChannel.volume = this._volume;
    }

    /**
     * 设置音量
     * @param volume
     */
    public setVolume(volume: number): void {
        this._volume = volume;
        if (this._currSoundChannel) {
            this._currSoundChannel.volume = this._volume;
        }
    }

    /**
     * 资源加载完成后处理播放
     * @param key
     */
    public loadedPlay(key: string, soundPath: string): void {
        if (this._currBg == key) {
            let sound: Laya.Sound = Laya.loader.getRes(soundPath);
            if (sound) {
                this.playSound(sound);
            }
        }
    }

    /**
     * 检测一个文件是否要清除
     * @param key
     * @returns {boolean}
     */
    public checkCanClear(key: string): boolean {
        return this._currBg != key;
    }
}