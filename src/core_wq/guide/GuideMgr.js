"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GuideMask_1 = require("./GuideMask");
const LayerMgr_1 = require("../layer/LayerMgr");
const EventsMgr_1 = require("../event/EventsMgr");
const EventType_1 = require("../event/EventType");
const GlobalData_1 = require("../db/GlobalData");
const HallControl_1 = require("../../module/hall/HallControl");
/**
 * 新手引导
 */
class GuideMgr {
    constructor() {
        this._guideStep = 1;
        /** 是否在进行新手流程 */
        this.isGuide = false;
    }
    setup() {
        this._guideLen = GlobalData_1.default.getAllValue(GlobalData_1.default.GuideVO).length;
        if (this._guideStep < 0 || this._guideStep >= this._guideLen)
            return;
        this._maskView = new GuideMask_1.default();
        this._maskView.visible = false;
        LayerMgr_1.default.Ins.guideLayer.addChild(this._maskView);
        EventsMgr_1.default.Ins.addListener(EventType_1.default.GUIDE_NEXT_STEP, this.onNextStep, this);
        this.onNextStep();
    }
    onNextStep() {
        if (this._maskView == null || this._guideStep < 0 || this._guideStep > this._guideLen) {
            this.isGuide = false;
            if (this._maskView)
                this._maskView.reset();
            return;
        }
        this._maskView.visible = true;
        this._guideVO = GlobalData_1.default.getData(GlobalData_1.default.GuideVO, this._guideStep);
        if (this._guideVO) {
            if (this.isNextStep()) {
                this.isGuide = true;
                this._maskView.visible = true;
                if (this._guideVO.isForce) {
                    this._maskView.drawCliclAreaSize({ x: this._guideVO.clickAreaParam[0], y: this._guideVO.clickAreaParam[1], w: this._guideVO.clickAreaParam[2], h: this._guideVO.clickAreaParam[3] });
                }
                if (this._guideVO.speakParam.length > 0) {
                    this._maskView.showSpeakView(this._guideVO.speakContent, { x: this._guideVO.speakParam[0], y: this._guideVO.speakParam[1] });
                }
                if (this._guideVO.fingerParam.length > 0) {
                    this._maskView.showFigner({ x: this._guideVO.fingerParam[0], y: this._guideVO.fingerParam[1] }, this._guideVO.fingerRotation, this._guideVO.fingerEffectType);
                }
                //特殊要求
                switch (this._guideStep) {
                    case 1: //第一次购买英雄
                        break;
                    case 2: //第一次合成英雄
                        break;
                }
            }
            else {
                return;
            }
        }
        else {
            this.isGuide = false;
            this._maskView.reset();
            console.log("@David 步骤ID无法找到表中对应数据  step：", this._guideStep);
            return;
        }
        this._guideStep++;
    }
    /** 是否可以进入下一步骤 */
    isNextStep() {
        switch (this._guideVO.type) {
            case GUIDE_TYPE.PASS:
                return true;
            case GUIDE_TYPE.USER_LEVEL:
                break;
            case GUIDE_TYPE.HERO_LEVEL:
                break;
            case GUIDE_TYPE.HERO_COUNT:
                if (HallControl_1.default.Ins.Model.heroCount >= this._guideVO.condition) {
                    this._maskView.reset();
                    return true;
                }
                break;
            default:
                return false;
        }
        return false;
    }
    get guideStep() {
        return this._guideStep;
    }
    set guideStep(value) {
        this._guideStep = value;
    }
    static get Ins() {
        if (!this._instance) {
            this._instance = new GuideMgr();
        }
        return this._instance;
    }
}
exports.default = GuideMgr;
var GUIDE_TYPE;
(function (GUIDE_TYPE) {
    GUIDE_TYPE[GUIDE_TYPE["PASS"] = 0] = "PASS";
    /** 用户等级 */
    GUIDE_TYPE[GUIDE_TYPE["USER_LEVEL"] = 1] = "USER_LEVEL";
    /** 英雄等级 */
    GUIDE_TYPE[GUIDE_TYPE["HERO_LEVEL"] = 2] = "HERO_LEVEL";
    /** 英雄数量 */
    GUIDE_TYPE[GUIDE_TYPE["HERO_COUNT"] = 3] = "HERO_COUNT";
})(GUIDE_TYPE || (GUIDE_TYPE = {}));
