"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const layaMaxUI_1 = require("../../../ui/layaMaxUI");
class RankItem extends layaMaxUI_1.ui.moduleView.rank.RankItemUI {
    constructor() { super(); }
    set dataSource(value) {
        if (value) {
            this.txt_name.text = value.nick_name;
            this.txt_position.text = value.city == null ? "火星" : value.city;
            this.imgHead.skin = value.avatar_url;
            this.txt_score.text = value.week_output;
        }
    }
}
exports.default = RankItem;
