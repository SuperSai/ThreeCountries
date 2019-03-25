"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MathUtil_1 = require("../utils/MathUtil");
const TimeConfig_1 = require("../config/TimeConfig");
const PoolMgr_1 = require("../msg/PoolMgr");
class ItemExplode extends Laya.Sprite {
    constructor(animationName = "rollingCoin") {
        super();
        this._animationName = animationName;
    }
    play(fromX, fromY) {
        const timestamp = new Date().getTime();
        if (timestamp - ItemExplode.lastTimestamp > ItemExplode.COOL_DOWN) {
            ItemExplode.lastTimestamp = timestamp;
            this._animNum = 0;
            this._animLen = 7;
            this.pos(fromX, fromY);
            this.createAnim();
        }
        else {
            Laya.timer.frameOnce(5, this, this.onAnimComplete);
        }
        return this;
    }
    createAnim() {
        this._animNum++;
        const anim = PoolMgr_1.default.Ins.get(Laya.Animation, this._animationName);
        // @ts-ignore
        if (!anim.url_loaded) {
            // @ts-ignore
            anim.url_loaded = true;
            anim.loadAtlas("images/boneAnim/effect/" + this._animationName + ".json");
            anim.interval = 25;
        }
        const scale = MathUtil_1.default.range(0.6, 0.8);
        anim
            .pivot(30, 30)
            .pos(MathUtil_1.default.rangeInt(-5, 5), MathUtil_1.default.rangeInt(-5, 5))
            .scale(scale, scale);
        anim.play(0, true);
        anim.alpha = 1;
        const tx = (Math.abs(anim.x) / anim.x) * MathUtil_1.default.rangeInt(30, 220);
        // @ts-ignore
        anim.speedY = MathUtil_1.default.range(-7.5, -5);
        // @ts-ignore
        anim.g = 0.3;
        // @ts-ignore
        anim.updateHandler = Laya.Handler.create(this, this.onAnimUpdate, [anim], false);
        const duration = TimeConfig_1.default.SEC_IN_MILI * MathUtil_1.default.range(0.6, 0.8);
        // prettier-ignore
        // @ts-ignore
        Laya.Tween.to(anim, { x: tx, update: anim.updateHandler }, duration * 1.5, Laya.Ease.quadOut);
        // prettier-ignore
        Laya.Tween.to(anim, { alpha: 0, complete: Laya.Handler.create(this, this.onAnimComplete, [anim]) }, duration * 0.4, Laya.Ease.quadOut, null, duration * 0.6);
        Laya.timer.frameOnce(1, this, () => {
            this.addChild(anim);
        });
        if (this._animNum < this._animLen) {
            // prettier-ignore
            this.createAnim();
        }
    }
    onAnimUpdate(anim) {
        // @ts-ignore
        anim.y += anim.speedY;
        // @ts-ignore
        anim.speedY += anim.g;
    }
    onAnimComplete(anim) {
        if (anim) {
            anim.stop();
            anim.removeSelf();
            // @ts-ignore
            anim.updateHandler.clear();
            PoolMgr_1.default.Ins.return(anim, this._animationName);
        }
        try {
            if (this && this.numChildren <= 0) {
                this.destroy(true);
            }
        }
        catch (e) {
            console.log('@FREEMAN: ItemExplode.ts => ', e);
        }
    }
}
ItemExplode.lastTimestamp = 0;
ItemExplode.COOL_DOWN = 500;
exports.default = ItemExplode;
