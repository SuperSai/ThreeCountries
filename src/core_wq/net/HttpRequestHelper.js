"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDKMgr_1 = require("../msg/SDKMgr");
//数据缓存
var requestCache = {};
class HttpRequestHelper {
    constructor(_url) {
        this.baseUrl = null;
        this.baseUrl = _url;
    }
    /** http请求 */
    request(params, noToken = false) {
        console.log("@David http request==>>", params.url);
        let self = this;
        if (!params.method) {
            params.method = 'Get';
        }
        ;
        //仅缓存Get数据
        if (params.cache && params.method == 'Get') {
            var res = requestCache[params.url];
            if (res && params.success) {
                console.log("cache:" + params.url);
                params.success(res);
                return;
            }
            ;
        }
        ;
        var hr = new Laya.HttpRequest();
        hr.http.timeout = 10000;
        hr.on(Laya.Event.PROGRESS, self, (e) => {
            console.log(e);
        });
        hr.once(Laya.Event.ERROR, self, (e) => {
            console.log("@David Laya.Event.ERROR:", e);
            if (e.indexOf('401') > 0) {
                if (!noToken) {
                    SDKMgr_1.default.Ins.wxHttpToken(self.baseUrl, (token) => {
                        self.request(params, true);
                    }, true);
                }
                ;
            }
            else {
                var res = hr.data;
                if (params && params.fail) {
                    params.fail(res);
                }
            }
        });
        hr.once(Laya.Event.COMPLETE, self, (e) => {
            var res = hr.data;
            if (res == '401') {
                if (!noToken) {
                    SDKMgr_1.default.Ins.wxHttpToken(self.baseUrl, (token) => {
                        self.request(params);
                    }, true);
                }
                ;
            }
            else if (res == '500') {
                console.log("@David request-err: ", params.url);
            }
            else if (params.success) {
                var dataJson = res;
                var jsonObj = dataJson;
                if (dataJson) {
                    jsonObj = JSON.parse(dataJson);
                }
                requestCache[params.url] = jsonObj;
                params.success(jsonObj);
            }
            ;
        });
        var token = SDKMgr_1.default.Ins.wxHttpToken(self.baseUrl);
        var header = ["Content-Type", "application/x-www-form-urlencoded;charset=utf-8", "token", token];
        if (params.method == 'Post') {
            hr.send(self.baseUrl + params.url, params.data, 'POST', 'jsonp', header);
        }
        else {
            hr.send(self.baseUrl + params.url, null, 'GET', 'jsonp', header);
        }
    }
}
exports.default = HttpRequestHelper;
