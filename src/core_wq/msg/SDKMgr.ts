import HttpMgr from "../net/HttpMgr";
import ShareMgr from "./ShareMgr";
import PlayerMgr from "../player/PlayerMgr";
import SoundMgr from "../sound/SoundMgr";
import SoundType from "../sound/SoundType";
import MsgMgr from "./MsgMgr";
import StorageUtil from "../utils/StorageUtil";
import HallControl from "../../module/hall/HallControl";
import LayerMgr from "../layer/LayerMgr";

export default class SDKMgr extends Laya.Script {

    public bannerAd: any; //bannerAd
    public isForbidBannerAd: boolean; //是否禁止播放bannerAd
    public videoAd: any; //videoAd
    private _authenticLoginBtn: any = null; //授权/登录专用

    constructor() { super(); }

    /** 初始化微信 */
    public initWX(): void {
        if (!Laya.Browser.onWeiXin) return;
        this.wxOnShow();
        this.wxOnHide();
        this.wxMemoryWarning();
        this.wxSetKeepScreenOn();
    }

    /**
     * 跳转小程序
     * 
     * @param {string} _miniCode 
     * @param {string} _miniPagePath 
     * @returns {void} 
     * @memberof SDKMgr
     */
    public onMiniProgram(_miniCode: string, _miniPagePath: string): void {
        if (_miniCode == null || _miniCode.length < 1) {
            return;
        }
        platform.navigateToMiniProgram({
            // appId: 'wx10e1554b604d7568',
            appId: _miniCode,
            path: _miniPagePath,
            // extraData: {
            //     box: '1'
            // },
            // envVersion: 'develop',
            success(res) {
                console.log("mini跳转成功", res);
            }
        });
        //小程序跳转次数统计
        HttpMgr.Ins.requestShareAdFinish("minipro_" + _miniCode);
    }

    /** 显示banner广告 */
    public showBannerAd(_force: boolean = false, _offsetY: number = 0): void {
        console.log("showBannerAd");
        if (this.isForbidBannerAd && _force == false) {
            return;
        }
        this.closeBannerAd();
        let bannerAd = platform.createBannerAd({
            adUnitId: 'adunit-ac9d79e1b7532c21',
            top: (1334 + _offsetY)
        });
        if (bannerAd) {
            bannerAd.show();
        }
        this.bannerAd = bannerAd;
        return bannerAd;
    }

    public closeBannerAd(_forbid: boolean = false): void {
        if (_forbid) {
            this.isForbidBannerAd = true;
        }
        if (this.bannerAd) {
            this.bannerAd.hide();
            this.bannerAd.destroy();
            this.bannerAd = null;
        }
    }

    public showVideoAd(_callback: any, _noAdCallback: any = null, _shareEnabled: boolean = true): void {
        if (this.videoAd) {
            return;
        }
        let videoAd = platform.createRewardedVideoAd({
            adUnitId: 'adunit-1847f3675e9f5699'
        });
        if (videoAd) {
            this.videoAd = videoAd;
            videoAd.load().then(() => videoAd.show());
            let closeCallback = (res) => {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                }
                this.isForbidBannerAd = false;
                _callback && _callback(res);

                videoAd.offClose(closeCallback);
                this.videoAd = null;
            }
            videoAd.onClose(closeCallback);
            let errCallback = (err) => {
                _noAdCallback && _noAdCallback();
            };
            videoAd.onError(errCallback);
            this.isForbidBannerAd = true;
        }
    }

    /** 开发域的好友排行榜 */
    public wxFriendRank(friendView: any, width: number, height: number): void {
        let openDataContext: any = platform.getOpenDataContext();
        if (openDataContext) {
            let sharedCanvas = openDataContext.canvas
            sharedCanvas.width = width;
            sharedCanvas.height = height;

            let rankSprite = new Laya.Sprite();
            friendView.removeChildren();
            friendView.addChild(rankSprite);
            rankSprite.zOrder = 1;
            Laya.timer.once(40, this, function () {
                let rankTexture = new Laya.Texture(sharedCanvas);
                rankTexture.bitmap.alwaysChange = true;//小游戏使用，非常费，每帧刷新
                rankSprite.graphics.drawTexture(rankTexture, 0, 0, sharedCanvas.width, sharedCanvas.height);
            });

            platform.postMessage({
                message: "showFriendRanking"
            });
        }
    }

    /** 获取微信token */
    public wxHttpToken(baseUrl: any, callBack: Function = null, forceNew: boolean = false): any {
        let token = window["wx"] ? wx.getStorageSync("token") : "";
        if (token && forceNew == false) {
            callBack && callBack(token);
        } else {
            this.wxCreateToken(baseUrl, (token) => {
                callBack && callBack(token);
            })
        }
        return token;
    }

    /** 微信登陆 */
    public wxLogin(statusCallback: Function): void {
        wx.getSetting({
            success: (result: _getSettingSuccessObject) => {
                if (result.authSetting['scope.userInfo']) { //授权成功
                    statusCallback && statusCallback(1);
                    wx.getUserInfo({
                        /** 是否带上登录态信息 */
                        withCredentials: true,
                        lang: "zh_CN",
                        success: (result: _getUserInfoSuccessObject) => {
                            // 获取用户信息
                            if (this._authenticLoginBtn) {
                                this._authenticLoginBtn.destroy();
                                this._authenticLoginBtn = null;
                            }
                            console.log("@David userInfo:", result.userInfo);
                            PlayerMgr.Ins.Info.wxUserInfo = result.userInfo;
                            statusCallback && statusCallback(2);
                        },
                        fail: () => { },
                        complete: () => { }
                    })
                } else { //没有授权
                    statusCallback && statusCallback(3);
                    if (this._authenticLoginBtn) {
                        this._authenticLoginBtn.show();
                        return;
                    }
                    if (this._authenticLoginBtn == null) {
                        let button = wx.createUserInfoButton({
                            type: 'text',
                            text: '', //'获取用户信息',
                            style: {
                                left: 0,
                                top: 0,
                                width: Laya.stage.width,
                                height: Laya.stage.height,
                                lineHeight: 40,
                                textAlign: 'center',
                                fontSize: 16,
                                borderRadius: 4
                            }
                        });
                        button.onTap((res1) => {
                            button.hide();
                            //重新验证
                            this.wxLogin(statusCallback);
                        })
                        this._authenticLoginBtn = button;
                    }
                }
            },
            fail: () => {

            },
            complete: () => {

            }
        });
    }

    /** 设置游戏常亮 */
    public wxSetKeepScreenOn(): void {
        wx.setKeepScreenOn({
            /**
             * 是否保持屏幕常亮
             */
            keepScreenOn: true,
            success: (result: _setKeepScreenOnSuccessObject) => { },
            fail: () => { },
            complete: () => { }
        })
    }

    private wxCreateToken(url: string, callback: Function = null): void {
        let launchOptions = window["wx"] ? wx.getLaunchOptionsSync() : "";
        // 获取⼴告id
        let aid = 0;
        let channel = "0_" + launchOptions.scene;
        if (launchOptions && launchOptions.query && launchOptions.query.channel) {
            let gdt_vid = launchOptions.query.gdt_vid;
            let weixinadinfo = launchOptions.query.weixinadinfo;
            if (weixinadinfo) {
                let weixinadinfoArr = weixinadinfo.split(".");
                aid = weixinadinfoArr[0];
            }
            channel = "" + launchOptions.query.channel + "_" + launchOptions.scene;
        } else if (launchOptions && launchOptions.referrerInfo) {
            if (launchOptions.referrerInfo.extraData && launchOptions.referrerInfo.extraData.channel) {
                channel = "" + launchOptions.referrerInfo.extraData.channel + "_" + launchOptions.scene;
            } else {
                if (launchOptions.referrerInfo.appId) {
                    channel = launchOptions.referrerInfo.appId + "_" + launchOptions.scene;
                }
            }
        }
        if (window["wx"]) {
            wx.login({
                success: (result: _loginSuccessObject) => {
                    wx.request({
                        url: url + "v1/token/user",
                        data: {
                            code: result.code,
                            channel: channel,
                            aid: aid
                        },
                        header: {
                            'content-type': 'application/json' // 默认值
                        },
                        method: 'POST',
                        dataType: "json",
                        responseType: "text",
                        success: (result: _requestSuccessObject) => {
                            console.log("@David TOKEN:", result);
                            wx.setStorage({
                                key: "token",
                                data: result.data.token,
                                success: () => { },
                                fail: () => { },
                                complete: () => { }
                            });
                            callback && callback(result.data.token);
                        },
                        fail: () => { },
                        complete: () => { }
                    })
                },
                fail: () => { },
                complete: () => { }
            })
        }
    }

    /** 游戏新版本提示 */
    public wxShowUpdateVersionTips(): void {
        if (!Laya.Browser.onWeiXin) return;
        const updateManager = wx.getUpdateManager();
        if (updateManager) {
            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                console.log(res.hasUpdate)
            })
            updateManager.onUpdateReady(function () {
                wx.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，是否重启应用？",
                    /**
                     * 是否显示取消按钮，默认为 true
                     */
                    showCancel: true,
                    /**
                     * 取消按钮的文字，默认为"取消"，最多 4 个字符
                     */
                    cancelText: "取消",
                    /**
                     * 取消按钮的文字颜色，默认为"#000000"
                     */
                    cancelColor: "#000000",
                    /**
                     * 确定按钮的文字，默认为"确定"，最多 4 个字符
                     */
                    confirmText: "确定",
                    /**
                     * 确定按钮的文字颜色，默认为"#3CC51F"
                     */
                    confirmColor: "#3CC51F",
                    success: (result: _showModalSuccessObject) => { },
                    fail: () => { },
                    complete: () => { }
                })
            })
            updateManager.onUpdateFailed(function () {
                MsgMgr.Ins.showMsg("游戏新版本更新失败！");
            })
        }
    }

    public wxOnShow(): void {
        wx.onShow((options: any) => {
            console.log("@David onLaunch:", options);
            PlayerMgr.Ins.Info.wxLaunch = options;
            if (!SoundMgr.Ins.bgOn) {
                SoundMgr.Ins.setBgOn(true);
                SoundMgr.Ins.setEffectOn(true);
                SoundMgr.Ins.playBg(SoundType.BG_MUSIC);
            }
            //查询是否有离线奖励
            StorageUtil.requestOfflinePrizeData();
        })
    }

    public wxOnHide(): void {
        wx.onHide(() => {
            SoundMgr.Ins.setBgOn(false);
            SoundMgr.Ins.setEffectOn(false);
            StorageUtil.saveStorageToLocal(true);
            this.wxSetUserCloudStorage();
        })
    }

    /** 上传数据到开放域 */
    private wxSetUserCloudStorage(): void {
        //上传微信云
        let money = Math.floor(PlayerMgr.Ins.Info.userGold + HallControl.Ins.Model.heroAllAsset()).toString();
        let kvDataList = [{
            key: "score",
            value: money
        }, {
            key: "city",
            value: (PlayerMgr.Ins.Info.wxUserInfo ? PlayerMgr.Ins.Info.wxUserInfo.city : '火星')
        }, {
            key: "userId",
            value: PlayerMgr.Ins.Info.userId
        }];
        wx.setUserCloudStorage({
            KVDataList: kvDataList,
            success: function (src) {
                console.log("setUserCloudStorage success", src)
            },
            fail: function (src) {
                console.log("setUserCloudStorage fail", src)
            }
        })
    }

    /** 内存警告 */
    public wxMemoryWarning(): void {
        wx.onMemoryWarning(() => {
            console.log("@David 内存过高警告！！！");
            wx.triggerGC();
        });
    }

    private static _instance: SDKMgr;
    public static get Ins(): SDKMgr {
        if (SDKMgr._instance == null) {
            SDKMgr._instance = new SDKMgr();
        }
        return SDKMgr._instance;
    }
}