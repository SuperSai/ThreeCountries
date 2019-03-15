import PathConfig from "../config/PathConfig";
import SoundVO from "../db/vo/SoundVO";
import GlobalData from "../db/GlobalData";
import SoundMgr from "./SoundMgr";

export default class BaseSound {

    private _cache: any;
    private _loadingCache: Array<string>;
    private _key: string;

    constructor() {
        this._cache = {};
        this._loadingCache = new Array<string>();
        Laya.timer.loop(1 * 60 * 1000, this, this.dealSoundTimer);
    }

    /**
     * 处理音乐文件的清理
     */
    private dealSoundTimer(): void {
        let currTime: number = Laya.Browser.now();
        let keys = Object.keys(this._cache);
        for (let i: number = 0, len = keys.length; i < len; i++) {
            let key = keys[i];
            if (!this.checkCanClear(key))
                continue;
            if (currTime - this._cache[key] >= SoundMgr.CLEAR_TIME) {
                delete this._cache[key];
                Laya.loader.clearRes(key);
            }
        }
    }

    /**
     * 获取Sound
     * @param key
     * @returns {egret.Sound}
     */
    public getSound(key: string): Laya.Sound {
        this._key = key;
        let vo: SoundVO = GlobalData.getData(GlobalData.SoundVO, Number(key));
        if (vo == null) return null;
        let soundPath: string = PathConfig.SOUND_PATH.replace("{0}", vo.file);
        let sound: Laya.Sound = Laya.loader.getRes(soundPath);
        if (sound) {
            if (this._cache[soundPath]) {
                this._cache[soundPath] = Laya.Browser.now();
            }
        } else {
            if (this._loadingCache.indexOf(soundPath) != -1) {
                return sound;
            }
            this._loadingCache.push(soundPath);
            Laya.loader.load([{ url: soundPath, type: Laya.Loader.SOUND }], Laya.Handler.create(this, () => {
                let index: number = this._loadingCache.indexOf(soundPath);
                if (index != -1) {
                    this._loadingCache.splice(index, 1);
                    this._cache[soundPath] = Laya.Browser.now();
                    this.loadedPlay(this._key, soundPath);
                }
            }, null, false));
        }
        return sound;
    }

    /**
     * 资源加载完成后处理播放，子类重写
     * @param key
     */
    public loadedPlay(key: string, soundPath: string): void {

    }

    /**
     * 检测一个文件是否要清除，子类重写
     * @param key
     * @returns {boolean}
     */
    public checkCanClear(key: string): boolean {
        return true;
    }
}