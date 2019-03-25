"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathConfig_1 = require("../config/PathConfig");
/** 龙骨动画 */
class BoneAnim extends Laya.Sprite {
    constructor(boneName, isLoop = false, isHeroBone = false) {
        super();
        this._currIndex = 0;
        this._isLoop = false;
        this._isLoop = isLoop;
        if (isHeroBone) {
            this._aniPath = PathConfig_1.default.BONE_PATH.replace("{0}", boneName);
        }
        else {
            this._aniPath = "images/boneAnim/common/" + boneName + ".sk";
        }
        this._factory = new Laya.Templet();
        this.addEvents();
        this._factory.loadAni(this._aniPath);
    }
    addEvents() {
        this._factory.on(Laya.Event.COMPLETE, this, this.parseComplete);
        this._factory.on(Laya.Event.ERROR, this, this.onError);
    }
    removeEvents() {
        this._factory.off(Laya.Event.COMPLETE, this, this.parseComplete);
        this._factory.off(Laya.Event.ERROR, this, this.onError);
        this._armature.off(Laya.Event.STOPPED, this, this.completeHandler);
    }
    onError() {
        console.log("@David 龙骨动画路径：" + this._aniPath + " - 创建失败！");
    }
    parseComplete() {
        if (Laya.loader.getRes(this._aniPath)) {
            this._armature = this._factory.buildArmature(0);
            this.addChild(this._armature);
            this._armature.on(Laya.Event.STOPPED, this, this.completeHandler);
            this._armature.play(0, this._isLoop);
        }
        else {
            this.destroy();
        }
    }
    completeHandler() {
        if (this._armature && !this._isLoop) {
            this.completeBack && this.completeBack();
        }
    }
    play(playName = 0, isLoop = false) {
        if (this._armature) {
            this._armature.play(playName, this._isLoop);
        }
    }
    destroy() {
        if (this._armature) {
            this.removeEvents();
            this._armature.stop(); //停止龙骨动画播放
            this._armature.removeSelf(); //从显示列表移除龙骨动画本身
            this._armature.removeChildren(); //从显示列表移除龙骨动画子对象
            this._armature.destroy(true); //从显存销毁龙骨动画及其子对象
            this._armature = null;
            this._factory.destroy(); //释放动画模板类下的纹理数据
            this.removeChildren();
            this.removeSelf();
        }
    }
    get armature() {
        return this._armature;
    }
    set armature(value) {
        this._armature = value;
    }
}
exports.default = BoneAnim;
