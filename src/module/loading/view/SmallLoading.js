"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LayerMgr_1 = require("../../../core_wq/layer/LayerMgr");
const AverageUtils_1 = require("../../../core_wq/utils/AverageUtils");
class SmallLoading extends Laya.Sprite {
    constructor() {
        super();
        this._content = null;
        this._speed = 0;
        this.init();
    }
    init() {
        this._averageUtils = new AverageUtils_1.default();
        this._speed = 10 / (1000 / 60);
        this._content = Laya.Pool.getItemByClass("Sprite", Laya.Sprite);
        this._content.graphics.drawRect(0, 0, LayerMgr_1.default.stageDesignWidth, LayerMgr_1.default.stageDesignHeight, "#000000");
        this._content.mouseEnabled = true;
        this._uiContainer = Laya.Pool.getItemByClass("Sprite", Laya.Sprite);
        let url = "images/common/load_Reel.png";
        Laya.loader.load([{ url: url, type: Laya.Loader.IMAGE }], Laya.Handler.create(this, (texture) => {
            let img = Laya.Pool.getItemByClass("Image", Laya.Image);
            img.texture = Laya.loader.getRes(url);
            img.x = -img.width * 0.5;
            img.y = -img.height * 0.5;
            this._uiContainer.addChild(img);
        }));
    }
    showLoading() {
        LayerMgr_1.default.Ins.smallLoadingLayer.addChild(this._content);
        this.frameLoop(1, this, this.enterFrame);
    }
    hideLoading() {
        if (this._content && this._content.parent) {
            this._uiContainer.rotation = 0;
            this._uiContainer.removeChildren();
            this._uiContainer.removeSelf();
            this._content.removeChildren();
            this._content.removeSelf();
            Laya.Pool.recover("Sprite", this._uiContainer);
            Laya.Pool.recover("Sprite", this._content);
        }
        this.clearTimer(this, this.enterFrame);
    }
    enterFrame(time) {
        this._averageUtils.push(this._speed * time);
        this._uiContainer.rotation += this._averageUtils.getValue();
    }
    static get Ins() {
        if (SmallLoading._instance == null) {
            SmallLoading._instance = new SmallLoading();
        }
        return SmallLoading._instance;
    }
}
exports.default = SmallLoading;
