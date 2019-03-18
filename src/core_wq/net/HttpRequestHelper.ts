import SDKMgr from "../msg/SDKMgr";

//数据缓存
var requestCache = {}

export default class HttpRequestHelper {
	baseUrl = null;
	constructor(_url) {
		this.baseUrl = _url;
	}

	/** http请求 */
	request(_params: any, _noToken: boolean = false) {
		console.log("@David http request==>>", _params.url)
		var that = this;
		if (!_params.method) {
			_params.method = 'Get'
		};
		//仅缓存Get数据
		if (_params.cache && _params.method == 'Get') {
			var res = requestCache[_params.url];
			if (res && _params.success) {
				console.log("cache:" + _params.url);
				_params.success(res)
				return;
			};
		};

		var hr = new Laya.HttpRequest();
		hr.http.timeout = 10000;
		hr.on(Laya.Event.PROGRESS, that, (e: any) => {
			console.log(e);
		});
		hr.once(Laya.Event.ERROR, that, (e: any) => {
			console.log("@David Laya.Event.ERROR:", e)
			if (e.indexOf('401') > 0) {
				if (!_noToken) {
					SDKMgr.Ins.wxHttpToken(that.baseUrl, (token) => {
						that.request(_params, true)
					}, true);
				};
			} else {
				var res = hr.data;
				if (_params && _params.fail) {
					_params.fail(res)
				}
			}
		});
		hr.once(Laya.Event.COMPLETE, that, (e: any) => {
			var res = hr.data;
			if (res == '401') {
				if (!_noToken) {
					SDKMgr.Ins.wxHttpToken(that.baseUrl, (token) => {
						that.request(_params)
					}, true);
				};
			} else if (res == '500') {
				console.log("@David request-err: ", _params.url);
			} else if (_params.success) {
				var dataJson = res;
				var jsonObj = dataJson;
				if (dataJson) {
					jsonObj = JSON.parse(dataJson);
				}
				requestCache[_params.url] = jsonObj;
				_params.success(jsonObj)
			};
		});
		var token = SDKMgr.Ins.wxHttpToken(that.baseUrl);
		var header = ["Content-Type", "application/x-www-form-urlencoded;charset=utf-8", "token", token];
		if (_params.method == 'Post') {
			hr.send(that.baseUrl + _params.url, _params.data, 'POST', 'jsonp', header);
		} else {
			hr.send(that.baseUrl + _params.url, null, 'GET', 'jsonp', header);
		}
	}
}
