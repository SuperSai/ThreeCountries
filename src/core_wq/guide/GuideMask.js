"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventsMgr_1 = require("../event/EventsMgr");
const EventType_1 = require("../event/EventType");
const LayerMgr_1 = require("../layer/LayerMgr");
const GuideSpeakView_1 = require("../../module/guide/view/GuideSpeakView");
class GuideMask extends Laya.Sprite {
    constructor() {
        super();
        /** 是否点击空白区域进入下一步引导 */
        this.isClickMaskNextStep = false;
        this.init();
    }
    init() {
        //绘制一个蓝色方块，不被抠图
        var gameContainer = new Laya.Sprite();
        gameContainer.alpha = 0;
        gameContainer.loadImage("images/component/tip_bg.png");
        this.addChild(gameContainer);
        // 引导所在容器
        this.guideContainer = new Laya.Sprite();
        // 设置容器为画布缓存
        this.guideContainer.cacheAs = "bitmap";
        this.addChild(this.guideContainer);
        gameContainer.on(Laya.Event.CLICK, this, this.onNextStep);
        //绘制遮罩区，含透明度，可见游戏背景
        var maskArea = new Laya.Sprite();
        maskArea.alpha = 0.5;
        maskArea.graphics.drawRect(0, 0, LayerMgr_1.default.stageDesignWidth, LayerMgr_1.default.stageDesignHeight, "#000000");
        this.guideContainer.addChild(maskArea);
        //绘制一个圆形区域，利用叠加模式，从遮罩区域抠出可交互区
        this.interactionArea = new Laya.Sprite();
        //设置叠加模式
        this.interactionArea.blendMode = "destination-out";
        this.guideContainer.addChild(this.interactionArea);
        this.hitArea = new Laya.HitArea();
        this.hitArea.hit.drawRect(0, 0, LayerMgr_1.default.stageDesignWidth, LayerMgr_1.default.stageDesignHeight, "#000000");
        this.guideContainer.hitArea = this.hitArea;
        this.guideContainer.mouseEnabled = true;
    }
    onNextStep() {
        if (this.isClickMaskNextStep) {
            this.reset();
            EventsMgr_1.default.Ins.dispatch(EventType_1.default.GUIDE_NEXT_STEP);
        }
    }
    /** 可点击区域的大小 */
    drawCliclAreaSize(data) {
        this.hitArea.unHit.clear();
        this.hitArea.unHit.drawRect(data.x, data.y, data.w, data.h, "#000000");
        this.interactionArea.graphics.clear();
        this.interactionArea.graphics.drawRect(data.x, data.y, data.w, data.h, "#000000");
    }
    /** 显示对话框 */
    showSpeakView(content, pos, speakComplete = null) {
        if (this._speakView == null) {
            this._speakView = new GuideSpeakView_1.default();
            this._speakView.zOrder = 1000;
            this.addChild(this._speakView);
        }
        this._speakView.visible = true;
        this._speakView.pos(pos.x, pos.y);
        this._speakView.setSpeakContent(content, speakComplete);
    }
    /** 显示手指指引 */
    showFigner(pos, rotation = -40, effectType = 1) {
        if (this._finger == null) {
            this._finger = new Laya.Image("images/guide/guide_jiantou2.png");
            this._finger.zOrder = 1000;
            this._finger.anchorX = this._finger.anchorY = 0.5;
            this.addChild(this._finger);
        }
        this._finger.visible = true;
        this._finger.rotation = rotation;
        this._finger.pos(pos.x, pos.y);
        if (effectType == 1) {
            this._timeLine = new Laya.TimeLine();
            this._timeLine.addLabel("tl1", 0).to(this._finger, { x: this._finger.x - 20, y: this._finger.y + 20 }, 500)
                .addLabel("tl2", 0).to(this._finger, { x: this._finger.x, y: this._finger.y }, 500, Laya.Ease.backInOut);
            this._timeLine.play(0, true);
        }
        else if (effectType == 2) {
            this._timeLine = new Laya.TimeLine();
            this._timeLine.addLabel("tl1", 0).to(this._finger, { x: this._finger.x - 100, y: this._finger.y }, 500)
                .addLabel("tl2", 0).to(this._finger, { x: this._finger.x, y: this._finger.y }, 500, Laya.Ease.backInOut);
            this._timeLine.play(0, true);
        }
    }
    reset() {
        if (this._speakView) {
            this._speakView.visible = false;
        }
        if (this._finger) {
            this._finger.visible = false;
        }
        if (this._timeLine) {
            this._timeLine.destroy();
            this._timeLine = null;
        }
        this.visible = false;
    }
}
exports.default = GuideMask;
