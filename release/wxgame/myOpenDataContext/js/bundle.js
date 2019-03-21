var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RankingView_1 = require("./view/RankingView");
var Main = /** @class */ (function () {
    function Main() {
        //设置子域
        Laya.isWXOpenDataContext = true;
        Laya.isWXPosMsg = true;
        //根据IDE设置初始化引擎		
        // Laya.init(GameConfig.width, GameConfig.height, false);
        Laya.init(750, 1334, Laya.WebGL);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
        //竖屏
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        RankingView_1.default.Create(Laya.stage);
    }
    return Main;
}());
//激活启动类
new Main();
},{"./view/RankingView":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = Laya.ClassUtils.regClass;
var ui;
(function (ui) {
    var rank;
    (function (rank) {
        var RankingViewUI = /** @class */ (function (_super) {
            __extends(RankingViewUI, _super);
            function RankingViewUI() {
                return _super.call(this) || this;
            }
            RankingViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(RankingViewUI.uiView);
            };
            RankingViewUI.uiView = { "type": "View", "props": { "top": 0, "right": 0, "left": 0, "bottom": 0 }, "compId": 2, "child": [{ "type": "View", "props": { "width": 680, "var": "mainView", "height": 960 }, "compId": 24, "child": [{ "type": "List", "props": { "visible": false, "var": "rankingList", "vScrollBarSkin": " ", "top": 153, "spaceY": 8, "right": 30, "repeatX": 1, "name": "rankingList", "left": 30, "elasticEnabled": true, "bottom": 30 }, "compId": 3, "child": [{ "type": "Box", "props": { "y": 0, "x": 3, "renderType": "render", "cacheAs": "bitmap" }, "compId": 13, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "texture": "images/rank/cell_bg.png", "name": "cellBar" }, "compId": 14 }, { "type": "Image", "props": { "y": 13, "x": 105, "width": 90, "skin": "images/rank/headIcon.png", "sizeGrid": "20,23,23,21", "name": "headIcon", "height": 90 }, "compId": 15 }, { "type": "Label", "props": { "y": 28, "x": 231, "text": "火星", "name": "txtPosition", "fontSize": 30, "color": "#8b2811" }, "compId": 16 }, { "type": "Label", "props": { "y": 43, "x": 38, "text": "1", "name": "txtNo", "fontSize": 30, "color": "#8b2811" }, "compId": 17 }, { "type": "Sprite", "props": { "y": 30, "x": 207, "texture": "images/rank/cell_gps.png" }, "compId": 18 }, { "type": "Label", "props": { "y": 64, "x": 209, "text": "名字", "name": "txtName", "fontSize": 30, "color": "#8b2811" }, "compId": 19 }, { "type": "Sprite", "props": { "y": 20, "x": 360, "texture": "images/rank/cell_coin_bg.png" }, "compId": 20 }, { "type": "Sprite", "props": { "y": 30, "x": 375, "texture": "images/rank/coin.png" }, "compId": 21 }, { "type": "Label", "props": { "y": 43, "x": 433, "text": "0", "name": "txtScore", "fontSize": 30, "color": "#8b2811" }, "compId": 22 }, { "type": "Sprite", "props": { "y": 8, "x": 5, "visible": false, "texture": "images/rank/cell_top1.png", "name": "imgNo" }, "compId": 23 }] }] }, { "type": "Label", "props": { "y": 342, "x": 62, "width": 450, "visible": true, "var": "txtHint", "text": "暂无排名", "name": "txtHint", "fontSize": 50, "color": "#ffffff", "align": "center" }, "compId": 7 }, { "type": "Box", "props": { "y": 0, "x": 0, "width": 80, "var": "surpassFriendView", "name": "surpassFriendView", "height": 150 }, "compId": 35, "child": [{ "type": "Image", "props": { "y": 33, "x": 6, "width": 74, "skin": "images/rank/surpass_bg.png", "height": 86 }, "compId": 36 }, { "type": "Image", "props": { "y": 45, "x": 17, "width": 60, "var": "headIcon", "skin": "images/rank/headIcon.png", "name": "headIcon", "height": 60 }, "compId": 37 }, { "type": "Label", "props": { "y": 10, "x": -27, "width": 100, "var": "txtNo", "text": "第1名", "strokeColor": "#3b1816", "stroke": 2, "name": "txtNo", "fontSize": 20, "color": "#ffffff", "align": "right" }, "compId": 38 }, { "type": "Label", "props": { "y": 120, "x": -6, "width": 100, "var": "txtSurpass", "text": "即将超越", "strokeColor": "#3b1816", "stroke": 2, "name": "txtSurpass", "fontSize": 18, "color": "#ffffff", "align": "center" }, "compId": 39 }] }] }], "loadList": ["images/rank/cell_bg.png", "images/rank/headIcon.png", "images/rank/cell_gps.png", "images/rank/cell_coin_bg.png", "images/rank/coin.png", "images/rank/cell_top1.png", "images/rank/surpass_bg.png"], "loadList3D": [] };
            return RankingViewUI;
        }(Laya.View));
        rank.RankingViewUI = RankingViewUI;
        REG("ui.rank.RankingViewUI", RankingViewUI);
    })(rank = ui.rank || (ui.rank = {}));
})(ui = exports.ui || (exports.ui = {}));
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("../ui/layaMaxUI");
var RankingView = /** @class */ (function (_super) {
    __extends(RankingView, _super);
    function RankingView() {
        var _this = _super.call(this) || this;
        _this.userKVDataList = {};
        _this.isShowSurpass = false; //是否显示好友超越
        _this.init();
        return _this;
    }
    //新建并添加到节点
    RankingView.Create = function (_parentNode) {
        var resList = [
            { url: "images/rank/cell_bg.png", type: Laya.Loader.IMAGE },
            { url: "images/rank/cell_coin_bg.png", type: Laya.Loader.IMAGE },
            { url: "images/rank/cell_gps.png", type: Laya.Loader.IMAGE },
            { url: "images/rank/cell_top1.png", type: Laya.Loader.IMAGE },
            { url: "images/rank/cell_top2.png", type: Laya.Loader.IMAGE },
            { url: "images/rank/cell_top3.png", type: Laya.Loader.IMAGE },
            { url: "images/rank/coin.png", type: Laya.Loader.IMAGE },
            { url: "images/rank/headIcon.png", type: Laya.Loader.IMAGE },
            { url: "images/rank/surpass_bg.png", type: Laya.Loader.IMAGE },
        ];
        var finishCount = 0;
        for (var index = 0; index < resList.length; index++) {
            Laya.loader.load(resList[index].url, Laya.Handler.create(null, function () {
                finishCount++;
                if (_parentNode && finishCount >= resList.length) {
                    _parentNode.addChild(new RankingView());
                }
            }));
        }
    };
    RankingView.prototype.init = function () {
        var _this = this;
        var that = this;
        that.showFriendRanking(false);
        wx.onMessage(function (data) {
            console.log(data);
            if (data.message == "showFriendRanking") { //好友排行
                console.log("@David 显示好友排行榜界面");
                that.showFriendRanking();
                wx.getFriendCloudStorage({
                    keyList: RankingView.keyList,
                    success: function (res) {
                        var data = res.data;
                        _this.openRankingList(data);
                    }
                });
            }
            else if (data.message == "showSurpassFriend") { //好友超越
                console.log("@David 显示超越好友界面");
                that.showFriendRanking(false);
                window["wx"].getUserCloudStorage({
                    keyList: RankingView.keyList,
                    success: function (res) {
                        _this.userKVDataList = res.KVDataList;
                        wx.getFriendCloudStorage({
                            keyList: RankingView.keyList,
                            success: function (res) {
                                var data = res.data;
                                _this.showSurpassFriendView(data);
                            }
                        });
                    }
                });
            }
        });
    };
    //显示超越好友
    RankingView.prototype.showSurpassFriendView = function (data) {
        var that = this;
        that.surpassFriendView.visible = false; //不显示
        var listDatas = that.sortRankingData(data);
        if (that.userKVDataList) {
            var userScore = this.parseInt(that.getKeyVaule(that.userKVDataList, "score")) || 0;
            var userId = that.getKeyVaule(that.userKVDataList, "userId");
            var userNextItem = null;
            for (var index = 0; index < listDatas.length; index++) {
                var element = listDatas[index];
                if (element) {
                    var score = this.parseInt(that.getKeyVaule(element.KVDataList, "score")) || 0;
                    var friendUserId = that.getKeyVaule(element.KVDataList, "userId");
                    if (userScore >= score || userId == friendUserId) {
                        that.surpassFriendView.visible = that.isShowSurpass; //显示
                        if (userNextItem) {
                            this.txtNo.text = "第" + (index) + "名";
                            this.headIcon.skin = userNextItem.avatarUrl;
                            this.txtSurpass.text = "即将超越";
                        }
                        else {
                            this.txtNo.text = "第1名";
                            this.headIcon.skin = element.avatarUrl;
                            this.txtSurpass.text = "巅峰王者";
                        }
                        return;
                    }
                    userNextItem = element;
                }
            }
            ;
        }
    };
    /** 好友排行榜 */
    RankingView.prototype.openRankingList = function (_data) {
        var that = this;
        var listDatas = that.sortRankingData(_data);
        if (listDatas && listDatas.length > 0) {
            that.rankingList.vScrollBarSkin = '';
            that.rankingList.repeatY = 7;
            that.rankingList.array = listDatas;
            that.rankingList.renderHandler = new Laya.Handler(that, function (cell, index) {
                if (index > that.rankingList.array.length) {
                    return;
                }
                var item = that.rankingList.array[index];
                if (item) {
                    var headIcon = cell.getChildByName('headIcon');
                    if (headIcon) {
                        headIcon.skin = item.avatarUrl;
                    }
                    var txtNo = cell.getChildByName('txtNo');
                    if (txtNo) {
                        txtNo.changeText(index + 1);
                    }
                    var txtName = cell.getChildByName('txtName');
                    if (txtName) {
                        txtName.changeText(item.nickname);
                    }
                    var txtPosition = cell.getChildByName('txtPosition');
                    if (txtPosition) {
                        var strPosition = that.getKeyVaule(item.KVDataList, "city") || '火星';
                        txtPosition.changeText(strPosition);
                    }
                    var txtScore = cell.getChildByName('txtScore');
                    if (txtScore) {
                        var score = this.parseInt(that.getKeyVaule(item.KVDataList, "score"));
                        txtScore.changeText(this.bytesToSize(score));
                    }
                }
            });
        }
        that.txtHint.visible = that.rankingList.array.length < 1;
        that.rankingList.visible = !that.txtHint.visible;
    };
    //排行与超越切换
    RankingView.prototype.showFriendRanking = function (_isFriendRanking) {
        if (_isFriendRanking === void 0) { _isFriendRanking = true; }
        var that = this;
        if (that.surpassFriendView) {
            that.surpassFriendView.visible = !_isFriendRanking;
        }
        if (that.rankingList) {
            that.rankingList.visible = _isFriendRanking;
        }
        that.isShowSurpass = !_isFriendRanking;
    };
    //排序
    RankingView.prototype.sortRankingData = function (_data) {
        var that = this;
        var listDatas = _data;
        for (var i = 0; i < listDatas.length - 1; i++) {
            var item = listDatas[i];
            if (item) {
                var score = this.parseInt(that.getKeyVaule(item.KVDataList, "score")) || 0;
                for (var j = i + 1; j < listDatas.length; j++) {
                    var item2 = listDatas[j];
                    if (item2 && item2 != item) {
                        var score2 = this.parseInt(that.getKeyVaule(item2.KVDataList, "score")) || 0;
                        if (score2 > score) {
                            score = score2;
                            listDatas[j] = listDatas[i];
                            listDatas[i] = item2;
                        }
                    }
                }
            }
        }
        return listDatas;
    };
    //获取键值
    RankingView.prototype.getKeyVaule = function (_array, _key) {
        var value = null;
        _array.forEach(function (element) {
            if (element.key == _key) {
                value = element.value;
                return value;
            }
        });
        return value;
    };
    //字符串转整形
    RankingView.prototype.parseInt = function (_strNum) {
        var intNum = parseFloat(_strNum);
        if (intNum) {
            return Math.floor(intNum);
        }
        return 0;
    };
    //单位转换
    RankingView.prototype.bytesToSize = function (bytes) {
        if (bytes < 1000000) {
            return Math.floor(bytes).toString();
        }
        if (bytes === 0)
            return '0';
        var k = 1000, // or 1024
        sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'], i = Math.floor(Math.log(bytes) / Math.log(k));
        var unit = '';
        if (i < sizes.length) {
            unit = sizes[i];
        }
        else {
            var numLenght = i - sizes.length;
            unit = String.fromCharCode(97 + numLenght % 26);
            for (var index = 0; index < 1 + Math.floor(numLenght / 65); index++) {
                unit = unit + unit;
            }
        }
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + unit;
    };
    RankingView.keyList = ["score", "city", "userId"];
    return RankingView;
}(layaMaxUI_1.ui.rank.RankingViewUI));
exports.default = RankingView;
},{"../ui/layaMaxUI":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi50cyIsInNyYy91aS9sYXlhTWF4VUkudHMiLCJzcmMvdmlldy9SYW5raW5nVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNUQSxrREFBNkM7QUFDN0M7SUFDQztRQUNDLE1BQU07UUFDTixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLGdCQUFnQjtRQUNoQix5REFBeUQ7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1FBQ25ELElBQUk7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztRQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUNsRCxxQkFBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNGLFdBQUM7QUFBRCxDQWZBLEFBZUMsSUFBQTtBQUNELE9BQU87QUFDUCxJQUFJLElBQUksRUFBRSxDQUFDOzs7O0FDZlgsSUFBSSxHQUFHLEdBQWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7QUFDN0MsSUFBYyxFQUFFLENBaUJmO0FBakJELFdBQWMsRUFBRTtJQUFDLElBQUEsSUFBSSxDQWlCcEI7SUFqQmdCLFdBQUEsSUFBSTtRQUNqQjtZQUFtQyxpQ0FBUztZQVN4Qzt1QkFBZSxpQkFBTztZQUFBLENBQUM7WUFDdkIsc0NBQWMsR0FBZDtnQkFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUxjLG9CQUFNLEdBQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxnQkFBZ0IsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsZ0JBQWdCLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLFNBQVMsRUFBQyx5QkFBeUIsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsMEJBQTBCLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQywwQkFBMEIsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsOEJBQThCLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsc0JBQXNCLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsU0FBUyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxFQUFDLG1CQUFtQixFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsNEJBQTRCLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFD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T0MsQ0FqT3dDLGNBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQWlPN0Q7a0JBak9vQixXQUFXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuL0dhbWVDb25maWdcIjtcclxuaW1wb3J0IFJhbmtpbmdWaWV3IGZyb20gXCIuL3ZpZXcvUmFua2luZ1ZpZXdcIjtcclxuY2xhc3MgTWFpbiB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHQvL+iuvue9ruWtkOWfn1xyXG5cdFx0TGF5YS5pc1dYT3BlbkRhdGFDb250ZXh0ID0gdHJ1ZTtcclxuXHRcdExheWEuaXNXWFBvc01zZyA9IHRydWU7XHJcblx0XHQvL+agueaNrklEReiuvue9ruWIneWni+WMluW8leaTjlx0XHRcclxuXHRcdC8vIExheWEuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCwgZmFsc2UpO1xyXG5cdFx0TGF5YS5pbml0KDc1MCwgMTMzNCwgTGF5YS5XZWJHTCk7XHJcblx0XHRMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IExheWEuU3RhZ2UuU0NBTEVfRklYRURfQVVUTztcclxuXHRcdC8v56uW5bGPXHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gTGF5YS5TdGFnZS5TQ1JFRU5fVkVSVElDQUw7XHJcblx0XHRMYXlhLnN0YWdlLmFsaWduSCA9IExheWEuU3RhZ2UuQUxJR05fQ0VOVEVSO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWxpZ25WID0gTGF5YS5TdGFnZS5BTElHTl9NSURETEU7XHJcblx0XHRSYW5raW5nVmlldy5DcmVhdGUoTGF5YS5zdGFnZSk7XHJcblx0fVxyXG59XHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBNYWluKCk7XHJcbiIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xyXG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xyXG5pbXBvcnQgU2NlbmU9TGF5YS5TY2VuZTtcbnZhciBSRUc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xuZXhwb3J0IG1vZHVsZSB1aS5yYW5rIHtcclxuICAgIGV4cG9ydCBjbGFzcyBSYW5raW5nVmlld1VJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBtYWluVmlldzpMYXlhLlZpZXc7XG5cdFx0cHVibGljIHJhbmtpbmdMaXN0OkxheWEuTGlzdDtcblx0XHRwdWJsaWMgdHh0SGludDpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBzdXJwYXNzRnJpZW5kVmlldzpMYXlhLkJveDtcblx0XHRwdWJsaWMgaGVhZEljb246TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgdHh0Tm86TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgdHh0U3VycGFzczpMYXlhLkxhYmVsO1xuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJWaWV3XCIsXCJwcm9wc1wiOntcInRvcFwiOjAsXCJyaWdodFwiOjAsXCJsZWZ0XCI6MCxcImJvdHRvbVwiOjB9LFwiY29tcElkXCI6MixcImNoaWxkXCI6W3tcInR5cGVcIjpcIlZpZXdcIixcInByb3BzXCI6e1wid2lkdGhcIjo2ODAsXCJ2YXJcIjpcIm1haW5WaWV3XCIsXCJoZWlnaHRcIjo5NjB9LFwiY29tcElkXCI6MjQsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJMaXN0XCIsXCJwcm9wc1wiOntcInZpc2libGVcIjpmYWxzZSxcInZhclwiOlwicmFua2luZ0xpc3RcIixcInZTY3JvbGxCYXJTa2luXCI6XCIgXCIsXCJ0b3BcIjoxNTMsXCJzcGFjZVlcIjo4LFwicmlnaHRcIjozMCxcInJlcGVhdFhcIjoxLFwibmFtZVwiOlwicmFua2luZ0xpc3RcIixcImxlZnRcIjozMCxcImVsYXN0aWNFbmFibGVkXCI6dHJ1ZSxcImJvdHRvbVwiOjMwfSxcImNvbXBJZFwiOjMsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJCb3hcIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MyxcInJlbmRlclR5cGVcIjpcInJlbmRlclwiLFwiY2FjaGVBc1wiOlwiYml0bWFwXCJ9LFwiY29tcElkXCI6MTMsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJTcHJpdGVcIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MCxcInRleHR1cmVcIjpcImltYWdlcy9yYW5rL2NlbGxfYmcucG5nXCIsXCJuYW1lXCI6XCJjZWxsQmFyXCJ9LFwiY29tcElkXCI6MTR9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjoxMyxcInhcIjoxMDUsXCJ3aWR0aFwiOjkwLFwic2tpblwiOlwiaW1hZ2VzL3JhbmsvaGVhZEljb24ucG5nXCIsXCJzaXplR3JpZFwiOlwiMjAsMjMsMjMsMjFcIixcIm5hbWVcIjpcImhlYWRJY29uXCIsXCJoZWlnaHRcIjo5MH0sXCJjb21wSWRcIjoxNX0se1widHlwZVwiOlwiTGFiZWxcIixcInByb3BzXCI6e1wieVwiOjI4LFwieFwiOjIzMSxcInRleHRcIjpcIueBq+aYn1wiLFwibmFtZVwiOlwidHh0UG9zaXRpb25cIixcImZvbnRTaXplXCI6MzAsXCJjb2xvclwiOlwiIzhiMjgxMVwifSxcImNvbXBJZFwiOjE2fSx7XCJ0eXBlXCI6XCJMYWJlbFwiLFwicHJvcHNcIjp7XCJ5XCI6NDMsXCJ4XCI6MzgsXCJ0ZXh0XCI6XCIxXCIsXCJuYW1lXCI6XCJ0eHROb1wiLFwiZm9udFNpemVcIjozMCxcImNvbG9yXCI6XCIjOGIyODExXCJ9LFwiY29tcElkXCI6MTd9LHtcInR5cGVcIjpcIlNwcml0ZVwiLFwicHJvcHNcIjp7XCJ5XCI6MzAsXCJ4XCI6MjA3LFwidGV4dHVyZVwiOlwiaW1hZ2VzL3JhbmsvY2VsbF9ncHMucG5nXCJ9LFwiY29tcElkXCI6MTh9LHtcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjo2NCxcInhcIjoyMDksXCJ0ZXh0XCI6XCLlkI3lrZdcIixcIm5hbWVcIjpcInR4dE5hbWVcIixcImZvbnRTaXplXCI6MzAsXCJjb2xvclwiOlwiIzhiMjgxMVwifSxcImNvbXBJZFwiOjE5fSx7XCJ0eXBlXCI6XCJTcHJpdGVcIixcInByb3BzXCI6e1wieVwiOjIwLFwieFwiOjM2MCxcInRleHR1cmVcIjpcImltYWdlcy9yYW5rL2NlbGxfY29pbl9iZy5wbmdcIn0sXCJjb21wSWRcIjoyMH0se1widHlwZVwiOlwiU3ByaXRlXCIsXCJwcm9wc1wiOntcInlcIjozMCxcInhcIjozNzUsXCJ0ZXh0dXJlXCI6XCJpbWFnZXMvcmFuay9jb2luLnBuZ1wifSxcImNvbXBJZFwiOjIxfSx7XCJ0eXBlXCI6XCJMYWJlbFwiLFwicHJvcHNcIjp7XCJ5XCI6NDMsXCJ4XCI6NDMzLFwidGV4dFwiOlwiMFwiLFwibmFtZVwiOlwidHh0U2NvcmVcIixcImZvbnRTaXplXCI6MzAsXCJjb2xvclwiOlwiIzhiMjgxMVwifSxcImNvbXBJZFwiOjIyfSx7XCJ0eXBlXCI6XCJTcHJpdGVcIixcInByb3BzXCI6e1wieVwiOjgsXCJ4XCI6NSxcInZpc2libGVcIjpmYWxzZSxcInRleHR1cmVcIjpcImltYWdlcy9yYW5rL2NlbGxfdG9wMS5wbmdcIixcIm5hbWVcIjpcImltZ05vXCJ9LFwiY29tcElkXCI6MjN9XX1dfSx7XCJ0eXBlXCI6XCJMYWJlbFwiLFwicHJvcHNcIjp7XCJ5XCI6MzQyLFwieFwiOjYyLFwid2lkdGhcIjo0NTAsXCJ2aXNpYmxlXCI6dHJ1ZSxcInZhclwiOlwidHh0SGludFwiLFwidGV4dFwiOlwi5pqC5peg5o6S5ZCNXCIsXCJuYW1lXCI6XCJ0eHRIaW50XCIsXCJmb250U2l6ZVwiOjUwLFwiY29sb3JcIjpcIiNmZmZmZmZcIixcImFsaWduXCI6XCJjZW50ZXJcIn0sXCJjb21wSWRcIjo3fSx7XCJ0eXBlXCI6XCJCb3hcIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MCxcIndpZHRoXCI6ODAsXCJ2YXJcIjpcInN1cnBhc3NGcmllbmRWaWV3XCIsXCJuYW1lXCI6XCJzdXJwYXNzRnJpZW5kVmlld1wiLFwiaGVpZ2h0XCI6MTUwfSxcImNvbXBJZFwiOjM1LFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjMzLFwieFwiOjYsXCJ3aWR0aFwiOjc0LFwic2tpblwiOlwiaW1hZ2VzL3Jhbmsvc3VycGFzc19iZy5wbmdcIixcImhlaWdodFwiOjg2fSxcImNvbXBJZFwiOjM2fSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NDUsXCJ4XCI6MTcsXCJ3aWR0aFwiOjYwLFwidmFyXCI6XCJoZWFkSWNvblwiLFwic2tpblwiOlwiaW1hZ2VzL3JhbmsvaGVhZEljb24ucG5nXCIsXCJuYW1lXCI6XCJoZWFkSWNvblwiLFwiaGVpZ2h0XCI6NjB9LFwiY29tcElkXCI6Mzd9LHtcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoxMCxcInhcIjotMjcsXCJ3aWR0aFwiOjEwMCxcInZhclwiOlwidHh0Tm9cIixcInRleHRcIjpcIuesrDHlkI1cIixcInN0cm9rZUNvbG9yXCI6XCIjM2IxODE2XCIsXCJzdHJva2VcIjoyLFwibmFtZVwiOlwidHh0Tm9cIixcImZvbnRTaXplXCI6MjAsXCJjb2xvclwiOlwiI2ZmZmZmZlwiLFwiYWxpZ25cIjpcInJpZ2h0XCJ9LFwiY29tcElkXCI6Mzh9LHtcInR5cGVcIjpcIkxhYmVsXCIsXCJwcm9wc1wiOntcInlcIjoxMjAsXCJ4XCI6LTYsXCJ3aWR0aFwiOjEwMCxcInZhclwiOlwidHh0U3VycGFzc1wiLFwidGV4dFwiOlwi5Y2z5bCG6LaF6LaKXCIsXCJzdHJva2VDb2xvclwiOlwiIzNiMTgxNlwiLFwic3Ryb2tlXCI6MixcIm5hbWVcIjpcInR4dFN1cnBhc3NcIixcImZvbnRTaXplXCI6MTgsXCJjb2xvclwiOlwiI2ZmZmZmZlwiLFwiYWxpZ25cIjpcImNlbnRlclwifSxcImNvbXBJZFwiOjM5fV19XX1dLFwibG9hZExpc3RcIjpbXCJpbWFnZXMvcmFuay9jZWxsX2JnLnBuZ1wiLFwiaW1hZ2VzL3JhbmsvaGVhZEljb24ucG5nXCIsXCJpbWFnZXMvcmFuay9jZWxsX2dwcy5wbmdcIixcImltYWdlcy9yYW5rL2NlbGxfY29pbl9iZy5wbmdcIixcImltYWdlcy9yYW5rL2NvaW4ucG5nXCIsXCJpbWFnZXMvcmFuay9jZWxsX3RvcDEucG5nXCIsXCJpbWFnZXMvcmFuay9zdXJwYXNzX2JnLnBuZ1wiXSxcImxvYWRMaXN0M0RcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoUmFua2luZ1ZpZXdVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnJhbmsuUmFua2luZ1ZpZXdVSVwiLFJhbmtpbmdWaWV3VUkpO1xyXG59XHIiLCJpbXBvcnQgeyB1aSB9IGZyb20gXCIuLi91aS9sYXlhTWF4VUlcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5raW5nVmlldyBleHRlbmRzIHVpLnJhbmsuUmFua2luZ1ZpZXdVSSB7XHJcblxyXG4gICAgcHJpdmF0ZSB1c2VyS1ZEYXRhTGlzdDogYW55ID0ge307XHJcbiAgICBwcml2YXRlIGlzU2hvd1N1cnBhc3M6IGJvb2xlYW4gPSBmYWxzZTsgLy/mmK/lkKbmmL7npLrlpb3lj4votoXotopcclxuICAgIHN0YXRpYyBrZXlMaXN0OiBhbnkgPSBbXCJzY29yZVwiLCBcImNpdHlcIiwgXCJ1c2VySWRcIl07XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mlrDlu7rlubbmt7vliqDliLDoioLngrlcclxuICAgIHN0YXRpYyBDcmVhdGUoX3BhcmVudE5vZGU6IExheWEuTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIGxldCByZXNMaXN0ID0gW1xyXG4gICAgICAgICAgICB7IHVybDogXCJpbWFnZXMvcmFuay9jZWxsX2JnLnBuZ1wiLCB0eXBlOiBMYXlhLkxvYWRlci5JTUFHRSB9LFxyXG4gICAgICAgICAgICB7IHVybDogXCJpbWFnZXMvcmFuay9jZWxsX2NvaW5fYmcucG5nXCIsIHR5cGU6IExheWEuTG9hZGVyLklNQUdFIH0sXHJcbiAgICAgICAgICAgIHsgdXJsOiBcImltYWdlcy9yYW5rL2NlbGxfZ3BzLnBuZ1wiLCB0eXBlOiBMYXlhLkxvYWRlci5JTUFHRSB9LFxyXG4gICAgICAgICAgICB7IHVybDogXCJpbWFnZXMvcmFuay9jZWxsX3RvcDEucG5nXCIsIHR5cGU6IExheWEuTG9hZGVyLklNQUdFIH0sXHJcbiAgICAgICAgICAgIHsgdXJsOiBcImltYWdlcy9yYW5rL2NlbGxfdG9wMi5wbmdcIiwgdHlwZTogTGF5YS5Mb2FkZXIuSU1BR0UgfSxcclxuICAgICAgICAgICAgeyB1cmw6IFwiaW1hZ2VzL3JhbmsvY2VsbF90b3AzLnBuZ1wiLCB0eXBlOiBMYXlhLkxvYWRlci5JTUFHRSB9LFxyXG4gICAgICAgICAgICB7IHVybDogXCJpbWFnZXMvcmFuay9jb2luLnBuZ1wiLCB0eXBlOiBMYXlhLkxvYWRlci5JTUFHRSB9LFxyXG4gICAgICAgICAgICB7IHVybDogXCJpbWFnZXMvcmFuay9oZWFkSWNvbi5wbmdcIiwgdHlwZTogTGF5YS5Mb2FkZXIuSU1BR0UgfSxcclxuICAgICAgICAgICAgeyB1cmw6IFwiaW1hZ2VzL3Jhbmsvc3VycGFzc19iZy5wbmdcIiwgdHlwZTogTGF5YS5Mb2FkZXIuSU1BR0UgfSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHZhciBmaW5pc2hDb3VudCA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHJlc0xpc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLmxvYWQocmVzTGlzdFtpbmRleF0udXJsLCBMYXlhLkhhbmRsZXIuY3JlYXRlKG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZpbmlzaENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3BhcmVudE5vZGUgJiYgZmluaXNoQ291bnQgPj0gcmVzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfcGFyZW50Tm9kZS5hZGRDaGlsZChuZXcgUmFua2luZ1ZpZXcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoYXQuc2hvd0ZyaWVuZFJhbmtpbmcoZmFsc2UpO1xyXG4gICAgICAgIHd4Lm9uTWVzc2FnZShkYXRhID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgaWYgKGRhdGEubWVzc2FnZSA9PSBcInNob3dGcmllbmRSYW5raW5nXCIpIHtcdC8v5aW95Y+L5o6S6KGMXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkBEYXZpZCDmmL7npLrlpb3lj4vmjpLooYzmppznlYzpnaJcIik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNob3dGcmllbmRSYW5raW5nKCk7XHJcbiAgICAgICAgICAgICAgICB3eC5nZXRGcmllbmRDbG91ZFN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleUxpc3Q6IFJhbmtpbmdWaWV3LmtleUxpc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuUmFua2luZ0xpc3QoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLm1lc3NhZ2UgPT0gXCJzaG93U3VycGFzc0ZyaWVuZFwiKSB7XHQvL+WlveWPi+i2hei2ilxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJARGF2aWQg5pi+56S66LaF6LaK5aW95Y+L55WM6Z2iXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zaG93RnJpZW5kUmFua2luZyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3dbXCJ3eFwiXS5nZXRVc2VyQ2xvdWRTdG9yYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICBrZXlMaXN0OiBSYW5raW5nVmlldy5rZXlMaXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlcktWRGF0YUxpc3QgPSByZXMuS1ZEYXRhTGlzdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3guZ2V0RnJpZW5kQ2xvdWRTdG9yYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleUxpc3Q6IFJhbmtpbmdWaWV3LmtleUxpc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U3VycGFzc0ZyaWVuZFZpZXcoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/mmL7npLrotoXotorlpb3lj4tcclxuICAgIHByaXZhdGUgc2hvd1N1cnBhc3NGcmllbmRWaWV3KGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICB0aGF0LnN1cnBhc3NGcmllbmRWaWV3LnZpc2libGUgPSBmYWxzZTsgLy/kuI3mmL7npLpcclxuICAgICAgICBsZXQgbGlzdERhdGFzID0gdGhhdC5zb3J0UmFua2luZ0RhdGEoZGF0YSk7XHJcbiAgICAgICAgaWYgKHRoYXQudXNlcktWRGF0YUxpc3QpIHtcclxuICAgICAgICAgICAgbGV0IHVzZXJTY29yZTogbnVtYmVyID0gdGhpcy5wYXJzZUludCh0aGF0LmdldEtleVZhdWxlKHRoYXQudXNlcktWRGF0YUxpc3QsIFwic2NvcmVcIikpIHx8IDA7XHJcbiAgICAgICAgICAgIGxldCB1c2VySWQ6IHN0cmluZyA9IHRoYXQuZ2V0S2V5VmF1bGUodGhhdC51c2VyS1ZEYXRhTGlzdCwgXCJ1c2VySWRcIik7XHJcbiAgICAgICAgICAgIGxldCB1c2VyTmV4dEl0ZW06IGFueSA9IG51bGw7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsaXN0RGF0YXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGxpc3REYXRhc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY29yZTogbnVtYmVyID0gdGhpcy5wYXJzZUludCh0aGF0LmdldEtleVZhdWxlKGVsZW1lbnQuS1ZEYXRhTGlzdCwgXCJzY29yZVwiKSkgfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZnJpZW5kVXNlcklkOiBzdHJpbmcgPSB0aGF0LmdldEtleVZhdWxlKGVsZW1lbnQuS1ZEYXRhTGlzdCwgXCJ1c2VySWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJTY29yZSA+PSBzY29yZSB8fCB1c2VySWQgPT0gZnJpZW5kVXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3VycGFzc0ZyaWVuZFZpZXcudmlzaWJsZSA9IHRoYXQuaXNTaG93U3VycGFzczsgLy/mmL7npLpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJOZXh0SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50eHROby50ZXh0ID0gXCLnrKxcIiArIChpbmRleCkgKyBcIuWQjVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkSWNvbi5za2luID0gdXNlck5leHRJdGVtLmF2YXRhclVybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHh0U3VycGFzcy50ZXh0ID0gXCLljbPlsIbotoXotopcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHh0Tm8udGV4dCA9IFwi56ysMeWQjVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkSWNvbi5za2luID0gZWxlbWVudC5hdmF0YXJVcmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnR4dFN1cnBhc3MudGV4dCA9IFwi5beF5bOw546L6ICFXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB1c2VyTmV4dEl0ZW0gPSBlbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog5aW95Y+L5o6S6KGM5qacICovXHJcbiAgICBwcml2YXRlIG9wZW5SYW5raW5nTGlzdChfZGF0YTogYW55KSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHZhciBsaXN0RGF0YXMgPSB0aGF0LnNvcnRSYW5raW5nRGF0YShfZGF0YSk7XHJcbiAgICAgICAgaWYgKGxpc3REYXRhcyAmJiBsaXN0RGF0YXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGF0LnJhbmtpbmdMaXN0LnZTY3JvbGxCYXJTa2luID0gJyc7XHJcbiAgICAgICAgICAgIHRoYXQucmFua2luZ0xpc3QucmVwZWF0WSA9IDc7XHJcbiAgICAgICAgICAgIHRoYXQucmFua2luZ0xpc3QuYXJyYXkgPSBsaXN0RGF0YXM7XHJcbiAgICAgICAgICAgIHRoYXQucmFua2luZ0xpc3QucmVuZGVySGFuZGxlciA9IG5ldyBMYXlhLkhhbmRsZXIodGhhdCwgZnVuY3Rpb24gKGNlbGwsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiB0aGF0LnJhbmtpbmdMaXN0LmFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhhdC5yYW5raW5nTGlzdC5hcnJheVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBoZWFkSWNvbiA9IGNlbGwuZ2V0Q2hpbGRCeU5hbWUoJ2hlYWRJY29uJykgYXMgTGF5YS5JbWFnZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGVhZEljb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZEljb24uc2tpbiA9IGl0ZW0uYXZhdGFyVXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHh0Tm8gPSBjZWxsLmdldENoaWxkQnlOYW1lKCd0eHRObycpIGFzIExheWEuTGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR4dE5vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dE5vLmNoYW5nZVRleHQoaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR4dE5hbWUgPSBjZWxsLmdldENoaWxkQnlOYW1lKCd0eHROYW1lJykgYXMgTGF5YS5MYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHh0TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eHROYW1lLmNoYW5nZVRleHQoaXRlbS5uaWNrbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0eHRQb3NpdGlvbiA9IGNlbGwuZ2V0Q2hpbGRCeU5hbWUoJ3R4dFBvc2l0aW9uJykgYXMgTGF5YS5MYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHh0UG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0clBvc2l0aW9uID0gdGhhdC5nZXRLZXlWYXVsZShpdGVtLktWRGF0YUxpc3QsIFwiY2l0eVwiKSB8fCAn54Gr5pifJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHh0UG9zaXRpb24uY2hhbmdlVGV4dChzdHJQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0eHRTY29yZSA9IGNlbGwuZ2V0Q2hpbGRCeU5hbWUoJ3R4dFNjb3JlJykgYXMgTGF5YS5MYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHh0U2NvcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gdGhpcy5wYXJzZUludCh0aGF0LmdldEtleVZhdWxlKGl0ZW0uS1ZEYXRhTGlzdCwgXCJzY29yZVwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR4dFNjb3JlLmNoYW5nZVRleHQodGhpcy5ieXRlc1RvU2l6ZShzY29yZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQudHh0SGludC52aXNpYmxlID0gdGhhdC5yYW5raW5nTGlzdC5hcnJheS5sZW5ndGggPCAxO1xyXG4gICAgICAgIHRoYXQucmFua2luZ0xpc3QudmlzaWJsZSA9ICF0aGF0LnR4dEhpbnQudmlzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aOkuihjOS4jui2hei2iuWIh+aNolxyXG4gICAgcHJpdmF0ZSBzaG93RnJpZW5kUmFua2luZyhfaXNGcmllbmRSYW5raW5nOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICBpZiAodGhhdC5zdXJwYXNzRnJpZW5kVmlldykge1xyXG4gICAgICAgICAgICB0aGF0LnN1cnBhc3NGcmllbmRWaWV3LnZpc2libGUgPSAhX2lzRnJpZW5kUmFua2luZztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoYXQucmFua2luZ0xpc3QpIHtcclxuICAgICAgICAgICAgdGhhdC5yYW5raW5nTGlzdC52aXNpYmxlID0gX2lzRnJpZW5kUmFua2luZztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC5pc1Nob3dTdXJwYXNzID0gIV9pc0ZyaWVuZFJhbmtpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mjpLluo9cclxuICAgIHByaXZhdGUgc29ydFJhbmtpbmdEYXRhKF9kYXRhOiBhbnkpOiBBcnJheTxhbnk+IHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGxpc3REYXRhcyA9IF9kYXRhO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdERhdGFzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3REYXRhc1tpXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBzY29yZSA9IHRoaXMucGFyc2VJbnQodGhhdC5nZXRLZXlWYXVsZShpdGVtLktWRGF0YUxpc3QsIFwic2NvcmVcIikpIHx8IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gaSArIDE7IGogPCBsaXN0RGF0YXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbTIgPSBsaXN0RGF0YXNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0yICYmIGl0ZW0yICE9IGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjb3JlMiA9IHRoaXMucGFyc2VJbnQodGhhdC5nZXRLZXlWYXVsZShpdGVtMi5LVkRhdGFMaXN0LCBcInNjb3JlXCIpKSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NvcmUyID4gc2NvcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID0gc2NvcmUyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdERhdGFzW2pdID0gbGlzdERhdGFzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdERhdGFzW2ldID0gaXRlbTI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpc3REYXRhcztcclxuICAgIH1cclxuICAgIC8v6I635Y+W6ZSu5YC8XHJcbiAgICBwcml2YXRlIGdldEtleVZhdWxlKF9hcnJheTogYW55LCBfa2V5OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgX2FycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmtleSA9PSBfa2V5KSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lrZfnrKbkuLLovazmlbTlvaJcclxuICAgIHByaXZhdGUgcGFyc2VJbnQoX3N0ck51bTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgaW50TnVtID0gcGFyc2VGbG9hdChfc3RyTnVtKTtcclxuICAgICAgICBpZiAoaW50TnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGludE51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgLy/ljZXkvY3ovazmjaJcclxuICAgIHByaXZhdGUgYnl0ZXNUb1NpemUoYnl0ZXM6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKGJ5dGVzIDwgMTAwMDAwMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihieXRlcykudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJ5dGVzID09PSAwKSByZXR1cm4gJzAnO1xyXG4gICAgICAgIHZhciBrID0gMTAwMCwgLy8gb3IgMTAyNFxyXG4gICAgICAgICAgICBzaXplcyA9IFsnJywgJ0snLCAnTScsICdHJywgJ1QnLCAnUCcsICdFJywgJ1onLCAnWSddLFxyXG4gICAgICAgICAgICBpID0gTWF0aC5mbG9vcihNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZyhrKSk7XHJcbiAgICAgICAgdmFyIHVuaXQgPSAnJztcclxuICAgICAgICBpZiAoaSA8IHNpemVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB1bml0ID0gc2l6ZXNbaV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIG51bUxlbmdodCA9IGkgLSBzaXplcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHVuaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDk3ICsgbnVtTGVuZ2h0ICUgMjYpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgMSArIE1hdGguZmxvb3IobnVtTGVuZ2h0IC8gNjUpOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICB1bml0ID0gdW5pdCArIHVuaXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChieXRlcyAvIE1hdGgucG93KGssIGkpKS50b1ByZWNpc2lvbigzKSArICcgJyArIHVuaXQ7XHJcbiAgICB9XHJcbn1cclxuIl19
