"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
const EffectUtil_1 = require("../../../core_wq/utils/EffectUtil");
/**
 * 新手指引说话提示框
 */
class GuideSpeakView extends layaMaxUI_1.ui.moduleView.guide.GuideSpeakViewUI {
    constructor() {
        super();
    }
    onEnable() {
        EffectUtil_1.default.playTypewriterEffect(this.txt_content, this._content, 50, this._speakComplete);
    }
    /** 设置说话内容 */
    setSpeakContent(content, speakComplete = null) {
        this._content = content;
        this._speakComplete = speakComplete;
        if (this.txt_content) {
            EffectUtil_1.default.playTypewriterEffect(this.txt_content, this._content, 50, this._speakComplete);
        }
    }
}
exports.default = GuideSpeakView;
