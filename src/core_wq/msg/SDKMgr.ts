import HttpMgr from "../net/HttpMgr";
import ShareMgr from "./ShareMgr";
import PlayerMgr from "../player/PlayerMgr";
import SoundMgr from "../sound/SoundMgr";
import SoundType from "../sound/SoundType";

export default class SDKMgr extends Laya.Script {

    public bannerAd: any; //bannerAd
    public isForbidBannerAd: boolean; //是否禁止播放bannerAd
    public videoAd: any; //videoAd

    constructor() { super(); }

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
        let token = wx.getStorageSync("token");
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
    public wxLogin(success: Function): void {
        wx.getSetting({
            success: (result: _getSettingSuccessObject) => {
                if (result.authSetting['scope.userInfo']) { //授权成功
                    wx.getUserInfo({
                        /**
                         * 是否带上登录态信息
                         */
                        withCredentials: false,
                        /**
                         * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。默认为en。
                         */
                        lang: "zh_CN",
                        success: (result: _getUserInfoSuccessObject) => {
                            PlayerMgr.Ins.Info.wxUserInfo = result.userInfo;
                            success && success();
                        },
                        fail: () => { },
                        complete: () => { }
                    })
                } else { //没有授权
                    wx.authorize({
                        scope: "scope.userInfo",
                        success: (result: _authorizeSuccessObject) => {
                            this.wxLogin(success);
                        },
                        fail: () => { console.log("@David 用户授权失败！"); },
                        complete: () => { },
                    });
                }
            },
            fail: () => {

            },
            complete: () => {

            }
        });
    }

    public wxApp(): void {
        if (!Laya.Browser.onWeiXin) return;
        App({
            /** 当小程序初始化完成时，会触发 onLaunch（全局只触发一次） */
            onLaunch: (options: _AppShowOptions) => {
                PlayerMgr.Ins.Info.wxLaunch = options;
            },
            /** 当小程序启动，或从后台进入前台显示，会触发 onShow */
            onShow: (options: _AppShowOptions) => {
                SoundMgr.Ins.setBgOn(true);
                SoundMgr.Ins.setEffectOn(true);
                SoundMgr.Ins.playBg(SoundType.BG_MUSIC);
            },
            /** 当小程序从前台进入后台，会触发 onHide */
            onHide: () => {
                SoundMgr.Ins.setBgOn(false);
                SoundMgr.Ins.setEffectOn(false);
            },
            /** 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息 */
            onError: (msg: string) => {

            }
        })
    }

    private wxCreateToken(url: string, callback: Function = null): void {
        let channel: string = "";
        if (PlayerMgr.Ins.Info.wxLaunch) {
            channel = "0_" + PlayerMgr.Ins.Info.wxLaunch.scene;
            if (PlayerMgr.Ins.Info.wxLaunch.query && PlayerMgr.Ins.Info.wxLaunch.query.channel) {
                channel = "" + PlayerMgr.Ins.Info.wxLaunch.query.channel + "_" + PlayerMgr.Ins.Info.wxLaunch.scene;
            } else if (PlayerMgr.Ins.Info.wxLaunch.referrerInfo) {
                if (PlayerMgr.Ins.Info.wxLaunch.referrerInfo.extraData && PlayerMgr.Ins.Info.wxLaunch.referrerInfo.extraData.channel) {
                    channel = "" + PlayerMgr.Ins.Info.wxLaunch.referrerInfo.extraData.channel + "_" + PlayerMgr.Ins.Info.wxLaunch.scene;
                } else {
                    if (PlayerMgr.Ins.Info.wxLaunch.referrerInfo.appId) {
                        channel = PlayerMgr.Ins.Info.wxLaunch.referrerInfo.appId + "_" + PlayerMgr.Ins.Info.wxLaunch.scene;
                    }
                }
            }
        }
        wx.login({
            success: (result: _loginSuccessObject) => {
                wx.request({
                    url: url + "v1/token/user",
                    data: {
                        code: result.code,
                        channel
                    },
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    method: 'POST',
                    dataType: "json",
                    responseType: "text",
                    success: (result: _requestSuccessObject) => {
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

    private static _instance: SDKMgr;
    public static get Ins(): SDKMgr {
        if (SDKMgr._instance == null) {
            SDKMgr._instance = new SDKMgr();
        }
        return SDKMgr._instance;
    }
}