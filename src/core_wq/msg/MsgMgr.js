"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LayerMgr_1 = require("../layer/LayerMgr");
const AlignUtils_1 = require("../utils/AlignUtils");
class MsgMgr extends Laya.Script {
    constructor() { super(); }
    /** 显示提示消息 */
    showMsg(content) {
        var tipBarSp = new Laya.Image("images/component/tip_bg.png");
        AlignUtils_1.default.setToScreenGoldenPos(tipBarSp);
        LayerMgr_1.default.Ins.rollMessageLayer.addChild(tipBarSp);
        tipBarSp.zOrder = 1001;
        tipBarSp.width = 500;
        tipBarSp.height = 80;
        tipBarSp.pivot(tipBarSp.width / 2, tipBarSp.height / 2);
        tipBarSp.sizeGrid = "10,10,10,10";
        var coinLabel = new Laya.Label();
        coinLabel.text = content;
        coinLabel.fontSize = 40;
        coinLabel.color = "#ffffff";
        coinLabel.width = tipBarSp.width * 0.98;
        //设置文本水平居中
        coinLabel.align = "center";
        //设置文本垂直居中
        coinLabel.valign = "middle";
        //设置自动换行
        coinLabel.wordWrap = true;
        //重置背景高度
        tipBarSp.height = coinLabel.height + 20;
        tipBarSp.addChild(coinLabel);
        coinLabel.pos(tipBarSp.width / 2, tipBarSp.height / 2);
        coinLabel.pivot(coinLabel.width / 2, coinLabel.height / 2);
        Laya.Tween.to(tipBarSp, { x: tipBarSp.x, y: (tipBarSp.y - 100), alpha: 0 }, 3000, Laya.Ease.cubicInOut, Laya.Handler.create(this, (tipBarSp) => {
            tipBarSp.removeSelf();
        }, [coinLabel]));
    }
    static get Ins() {
        if (MsgMgr._instance == null) {
            MsgMgr._instance = new MsgMgr();
        }
        return MsgMgr._instance;
    }
}
exports.default = MsgMgr;
