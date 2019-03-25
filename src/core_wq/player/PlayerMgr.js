"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PlayerInfo_1 = require("./data/PlayerInfo");
class PlayerMgr extends Laya.Script {
    constructor() {
        super();
        this.init();
    }
    init() {
        this._info = new PlayerInfo_1.default();
    }
    set Info(value) { this._info = value; }
    get Info() { return this._info; }
    static get Ins() {
        if (PlayerMgr._instance == null) {
            PlayerMgr._instance = new PlayerMgr();
        }
        return PlayerMgr._instance;
    }
}
exports.default = PlayerMgr;
