"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require("./base/Layer");
const MaskLayer_1 = require("./base/MaskLayer");
const PointUtils_1 = require("../utils/PointUtils");
class LayerMgr {
    constructor() {
        this._layers = [];
    }
    get layers() {
        return this._layers;
    }
    /** 当前的鼠标位置 X */
    static get mouseX() {
        return Laya.stage.mouseX / LayerMgr.adaptScaleX;
    }
    /** 当前的鼠标位置 Y */
    static get mouseY() {
        return Laya.stage.mouseY / LayerMgr.adaptScaleY;
    }
    /** 获取对象的实际舞台变形数据 */
    static getRealStageRect(target) {
        let loc = PointUtils_1.default.localToGlobal(target);
        let rect = new Laya.Rectangle(loc.x * LayerMgr.adaptScale + this.left, loc.y * LayerMgr.adaptScale + this.top, target.width * LayerMgr.adaptScale, target.height * LayerMgr.adaptScale);
        let scaleFactor = Laya.stage.designWidth / Laya.Browser.clientWidth;
        rect.x = Math.round(rect.x / scaleFactor);
        rect.y = Math.round(rect.y / scaleFactor);
        rect.width = Math.round(rect.width / scaleFactor);
        rect.height = Math.round(rect.height / scaleFactor);
        return rect;
    }
    // prettier-ignore
    initLayer(container, designWidth, designHeight) {
        let pixelRatio = Laya.Browser.pixelRatio;
        let clientWidth = Laya.Browser.clientWidth * pixelRatio;
        let clientHeight = Laya.Browser.clientHeight * pixelRatio;
        let adaptScaleX = clientWidth / designWidth;
        let adaptScaleY = clientHeight / designHeight;
        let adaptScale = Math.min(adaptScaleX, adaptScaleY);
        let stageWidth = designWidth * adaptScaleX;
        let stageHeight = designHeight * adaptScaleY;
        let top = 0;
        let left = 0;
        if (adaptScale === adaptScaleX) {
            top = (stageHeight - designHeight * adaptScale) * 0.5;
        }
        else {
            left = (stageWidth - designWidth * adaptScale) * 0.5;
        }
        container.width = stageWidth;
        container.height = stageHeight;
        LayerMgr.stageDesignWidth = designWidth;
        LayerMgr.stageDesignHeight = designHeight;
        LayerMgr.clientWidth = Laya.Browser.clientWidth;
        LayerMgr.clientHeight = Laya.Browser.clientHeight;
        LayerMgr.adaptScaleX = adaptScaleX;
        LayerMgr.adaptScaleY = adaptScaleY;
        LayerMgr.adaptScale = adaptScale;
        LayerMgr.pixelRatio = pixelRatio;
        LayerMgr.top = top;
        LayerMgr.left = left;
        LayerMgr.clientTop = (top / pixelRatio);
        LayerMgr.clientLeft = (left / pixelRatio);
        // console.log(StringTools.wrapValueObjects(["designWidth", "designHeight"],[designWidth, designHeight]));
        // console.log(StringTools.wrapValueObjects(["clientWidth", "clientHeight"],[clientWidth, clientHeight]));
        // console.log(StringTools.wrapValueObjects(["adaptScaleX", "adaptScaleY", "pixelRatio"],[adaptScaleX, adaptScaleY, pixelRatio]));
        // console.log(StringTools.wrapValueObjects(["top", "left"], [top, left]));
        let idx = 0;
        this.renderLayer = this.createLayer(idx++, "renderLayer", container);
        this.navLayer = this.createLayer(idx++, "navLayer", container);
        this.flyLayer = this.createLayer(idx++, "flyLayer", container);
        this.frameLayer = this.createMaskLayer(idx++, "frameLayer", container);
        this.subFrameLayer = this.createMaskLayer(idx++, "subFrameLayer", container);
        this.alertLayer = this.createMaskLayer(idx++, "alertLayer", container);
        this.screenEffectLayer = this.createLayer(idx++, "screenEffectLayer", container);
        this.rollMessageLayer = this.createLayer(idx++, "rollMessageLayer", container);
        this.guideLayer = this.createLayer(idx++, "guideLayer", container);
        this.smallLoadingLayer = this.createMaskLayer(idx++, "smallLoadingLayer", container);
        this.noteLayer = this.createLayer(idx++, "noteLayer", container);
        this.debugLayer = this.createLayer(idx++, "debugLayer", container);
        for (let layer of this._layers) {
            layer.pos(left, 0);
            layer.scale(adaptScaleX, adaptScaleY);
        }
    }
    createLayer(index, name, container) {
        this._layers.push(container.addChild(new Layer_1.default(index, name)));
        return this._layers[this._layers.length - 1];
    }
    createMaskLayer(index, name, container) {
        this._layers.push(container.addChild(new MaskLayer_1.default(index, name)));
        return this._layers[this._layers.length - 1];
    }
    static get Ins() {
        if (!this._instance) {
            this._instance = new LayerMgr();
        }
        return this._instance;
    }
}
/** Laya.stage 的设计宽度，一般为人为设定 */
LayerMgr.stageDesignWidth = 0;
/** Laya.stage 的设计高度，一般为人为设定 */
LayerMgr.stageDesignHeight = 0;
/** Laya.stage 的设备宽度，一般根据机器自动设定 */
LayerMgr.clientWidth = 0;
/** Laya.stage 的设备高度，一般根据机器自动设定 */
LayerMgr.clientHeight = 0;
/** Laya.stage.width 针对设备的适应倍数 */
LayerMgr.adaptScaleX = 0;
/** Laya.stage.height 针对设备的适应倍数 */
LayerMgr.adaptScaleY = 0;
/** LayerMgr._layers 针对设备的适应倍数 */
LayerMgr.adaptScale = 0;
/** 设备像素倍率 */
LayerMgr.pixelRatio = 1;
/** 对设备适应后，LayerMgr._layers 距离屏幕顶部的距离 */
LayerMgr.top = 0;
/** 对设备适应后，LayerMgr._layers 距离屏幕左侧的距离 */
LayerMgr.left = 0;
/** 设备Top，距离屏幕顶部的真实屏幕距离 */
LayerMgr.clientTop = 0;
/** 设备Left，距离屏幕左侧的真实屏幕距离 */
LayerMgr.clientLeft = 0;
exports.default = LayerMgr;
