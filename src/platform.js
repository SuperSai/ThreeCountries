class DebugPlatform {
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return { nickName: "username" };
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    startLoading(_callback) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    authenticLogin(_callback, _btnVect, _statusCallback) {
        _callback && _callback(true);
    }
    hideAuthenticLoginBtn() { }
    createFeedbackButton(_btnVect) { }
    onShow(_callback) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onHide(_callback) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    httpToken(_url, _callback, _forceNew = false) {
        // var token = "ebb90e41c7af14ce03ac4c19ff797f08"
        // _callback && _callback(token)
        // return token
    }
    httpRequest(_url, _params, _noToken = false) {
    }
    onShare(_data) { }
    isSharing() { }
    navigateToMiniProgram(_data) { }
    createBannerAd(_param) { }
    createRewardedVideoAd(_param) { }
    openCustomerService(_param) { }
    setUserCloudStorage(_kvDataList) { }
    getOpenDataContext() { }
    postMessage(_data) { }
    //编码（名字表情）
    encode(_txt) {
        return _txt;
    }
    //解码（名字表情）
    decode(_txt) {
        return _txt;
    }
}
if (!window.platform) {
    window.platform = new DebugPlatform();
}
