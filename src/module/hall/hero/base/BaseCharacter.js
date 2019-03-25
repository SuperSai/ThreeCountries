"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseCharacter extends Laya.Sprite {
    constructor() {
        super();
        /** 移动方向(默认右,1为左) */
        this.moveDir = 0;
        /** 延迟移动时间 */
        this.delayMoveTime = 5;
        /** 移动速度倍率 */
        this.moveSpeedRatio = 1;
        /** 移动速度加速 */
        this.moveAccelerate = 1;
        /** 默认0步行，1为攻击 */
        this.state = -1;
        /** 攻击对象 */
        this.attackSprite = null;
        /** 初始位置x */
        this.orginalX = 0;
        /** 已经就位，可攻击 */
        this.isInPosition = false;
        /** 英雄模型路径 */
        this.heroPath = '';
        /** 坐骑模型路径 */
        this.horsePath = '';
        /** 攻击动画key */
        this.atkAnimKey = 'attack';
        /** 收益CD */
        this.incomeTime = 0;
    }
    /** 设置人物龙骨 */
    setCharacterBone(id) {
    }
    /** 动画播放状态 */
    playAnimation(state = 0, callback = null) {
    }
    /** 创建攻击对象 */
    createAttackTarget(parentNode, startPos) {
        return this;
    }
    /** 移除攻击对象 */
    removeEnemy(isKill = false) {
    }
    /** 移动 */
    playMoveAction() {
        this.orginalX = this.x;
        if (this.orginalX > Laya.stage.width / 2) {
            //后退
            let actionSp = this;
            this.orginalX = Laya.stage.width / 2 - Math.random() * 100;
            Laya.Tween.to(actionSp, { x: this.orginalX }, Math.abs(actionSp.x - this.orginalX) * 15, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                Laya.Tween.clearTween(actionSp);
                this.isInPosition = true;
            }));
        }
        else {
            this.isInPosition = true;
        }
    }
    /** 移动是否停止 */
    get isMoveStop() {
        return this.delayMoveTime > 0;
    }
    /** 收益倒计时 */
    setIncomeTime() {
        this.incomeTime = 60 * this.moveSpeedRatio;
    }
    /** 收益倒计时 */
    get IncomeTime() {
        return this.incomeTime;
    }
    //攻击对象
    get AttackTarget() {
        return this.attackSprite;
    }
    set AttackTarget(attackSp) {
        this.attackSprite = attackSp;
    }
    set IsInPosition(value) {
        this.isInPosition = value;
    }
    //是否攻击已就位
    get IsInPosition() {
        return this.isInPosition;
    }
    //获取初始位置x
    get OrginalX() {
        return this.orginalX;
    }
    setMoveSpeedRatio(value) {
        this.moveSpeedRatio = value;
    }
    setMoveAccelerate(value) {
        this.moveAccelerate = 1.0 / value;
    }
    //##贝塞尔曲线#################################
    // 以控制点cp计算曲线点
    CalculateBeizer(cp, numOfPoints) {
        var t = 1.0 / (numOfPoints - 1);
        var curve = [];
        for (var i = 0; i < numOfPoints; i++) {
            curve[i] = this.PointOnCubicBezier(cp, i * t);
        }
        return curve;
    }
    // 参数1: 4个点坐标(起点，控制点1，控制点2，终点)  
    // 参数2: 0 <= t <= 1   
    PointOnCubicBezier(cp, t) {
        var tPoint_x = this.MetaComputing(cp[0].x, cp[1].x, cp[2].x, cp[3].x, t);
        var tPoint_y = this.MetaComputing(cp[0].y, cp[1].y, cp[2].y, cp[3].y, t);
        return { x: tPoint_x, y: tPoint_y };
    }
    MetaComputing(p0, p1, p2, p3, t) {
        // 方法一:  
        var a, b, c;
        var tSquare, tCube;
        // 计算多项式系数
        c = 3.0 * (p1 - p0);
        b = 3.0 * (p2 - p1) - c;
        a = p3 - b - c - p0;
        // 计算t位置的点
        tSquare = t * t;
        tCube = t * tSquare;
        return (a * tCube) + (b * tSquare) + (c * t) + p0;
        // 方法二: 原始的三次方公式
        //  number n = 1.0 - t;
        //  return n*n*n*p0 + 3.0*p1*t*n*n + 3.0*p2*t*t*n + p3*t*t*t;
    }
}
exports.default = BaseCharacter;
