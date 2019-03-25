"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MathUtil_1 = require("../utils/MathUtil");
const PoolMgr_1 = require("../msg/PoolMgr");
const PathUtil_1 = require("../utils/PathUtil");
class ItemFly extends Laya.Sprite {
    constructor(animationName = "rollingCoin") {
        super();
        this._animationName = animationName;
        this._anims = [];
    }
    play(fromX, fromY, toX = 38, toY = 42) {
        this._animNum = 0;
        this._animLen = 7;
        this.createAnim(fromX, fromY, toX, toY);
        Laya.timer.frameLoop(1, this, this.onLoop);
        return this;
    }
    createAnim(fromX, fromY, toX, toY) {
        this._animNum++;
        const anim = PoolMgr_1.default.Ins.get(Laya.Animation, this._animationName);
        // @ts-ignore
        if (!anim.url_loaded) {
            // @ts-ignore
            anim.url_loaded = true;
            anim.loadAtlas("images/effect/" + this._animationName + ".json");
            anim.interval = 25;
        }
        const scale = Math.random() * 0.15 + 0.65;
        anim
            .pivot(30, 30)
            .pos(fromX + MathUtil_1.default.rangeInt(5, 10), fromY + MathUtil_1.default.rangeInt(5, 10))
            .scale(scale, scale);
        anim.play(0, true);
        anim.alpha = 1;
        const iX = fromX + Math.random() * (toX - fromX);
        const iY = fromY + Math.random() * (toY - fromY);
        const points = [];
        points.push(new Laya.Point(anim.x, anim.y));
        points.push(new Laya.Point(iX, iY));
        points.push(new Laya.Point(toX, toY));
        // prettier-ignore
        const path = PathUtil_1.default.CreateBezierPoints(points, MathUtil_1.default.rangeInt(25, 40));
        // @ts-ignore
        anim.path = path;
        // @ts-ignore
        anim.pathLength = path.length - 1;
        // @ts-ignore
        anim.pathIndex = 0;
        this.addChild(anim);
        this._anims.push(anim);
        if (this._animNum < this._animLen) {
            // prettier-ignore
            Laya.timer.frameOnce(MathUtil_1.default.rangeInt(4, 12), this, this.createAnim, [fromX, fromY, toX, toY]);
        }
    }
    onLoop() {
        let len = this._anims.length;
        for (let i = 0; i < len; i++) {
            const anim = this._anims[i];
            // @ts-ignore
            const idx = anim.pathIndex++;
            // @ts-ignore
            if (idx === anim.pathLength) {
                this._anims.splice(i, 1);
                this.onAnimComplete(anim);
                i--;
                len--;
            }
            else {
                // @ts-ignore
                const point = anim.path[idx];
                anim.pos(point.x, point.y);
            }
        }
    }
    onAnimComplete(anim) {
        if (anim) {
            anim.stop();
            anim.removeSelf();
            PoolMgr_1.default.Ins.return(anim, this._animationName);
        }
        if (this.numChildren <= 0) {
            Laya.timer.clear(this, this.onLoop);
            this.destroy(true);
        }
    }
}
exports.default = ItemFly;
