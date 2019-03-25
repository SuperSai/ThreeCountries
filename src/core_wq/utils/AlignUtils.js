"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LayerMgr_1 = require("../layer/LayerMgr");
class AlignUtils {
    /**
     * 把现实对象设置到屏幕水平居中，垂直居中的位置上，使用前请确认<code>sprite</code>宽高不为0
     * @param sprite
     * @param delayFrames
     * @param useRegisterPoint
     *
     */
    static setToScreenCenter(sprite, delayFrames, useRegisterPoint) {
        if (delayFrames) {
            Laya.timer.frameOnce(delayFrames, AlignUtils, AlignUtils.setToScreenCenter, [sprite], false);
        }
        if (useRegisterPoint) {
            sprite.x = LayerMgr_1.default.stageDesignWidth * 0.5;
            sprite.y = LayerMgr_1.default.stageDesignHeight * 0.5;
        }
        else {
            sprite.x = (LayerMgr_1.default.stageDesignWidth - sprite.width) * 0.5;
            sprite.y = (LayerMgr_1.default.stageDesignHeight - sprite.height) * 0.5;
        }
    }
    /**
     * 把现实对象设置到屏幕水平居中，垂直在0.618的黄金分割点位置上，使用前请确认<code>sprite</code>宽高不为0
     * @param sprite
     * @param delayFrames
     * @param useRegisterPoint
     *
     */
    static setToScreenGoldenPos(sprite, delayFrames, useRegisterPoint) {
        if (delayFrames) {
            Laya.timer.frameOnce(delayFrames, AlignUtils, AlignUtils.setToScreenGoldenPos, [sprite], false);
        }
        if (useRegisterPoint) {
            sprite.x = LayerMgr_1.default.stageDesignWidth * 0.5;
            sprite.y = LayerMgr_1.default.stageDesignHeight * 0.382;
        }
        else {
            sprite.x = (LayerMgr_1.default.stageDesignWidth - sprite.width) * 0.5;
            sprite.y = (LayerMgr_1.default.stageDesignHeight - sprite.height) * 0.382;
        }
    }
    /**
     * 仅将目标对象target的x坐标和y坐标设置为到ref的中心。（注意，如果ref没有宽高可能会导致意外的问题）
     * @param target
     * @param ref
     *
     */
    static setToSpriteCenter(target, ref) {
        if (!target || !ref) {
            throw new Error("Either target or ref is null.");
        }
        else {
            target.pos(ref.width * 0.5, ref.height * 0.5);
        }
    }
    /**
     * 仅将目标对象target根据对齐方式设置坐标。仅设置x坐标和y坐标，忽略目标对象target的宽高。（注意，如果ref没有宽高可能会导致意外的问题）
     * @param target
     * @param ref
     *
     */
    static setTo(align, target, ref) {
        if (align === "center") {
            AlignUtils.setToSpriteCenter(target, ref);
        }
    }
}
exports.default = AlignUtils;