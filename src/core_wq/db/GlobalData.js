"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HeroVO_1 = require("./vo/HeroVO");
const TSDictionary_1 = require("../utils/TSDictionary");
const CSVParser_1 = require("./base/CSVParser");
const HeroConfigVO_1 = require("./vo/HeroConfigVO");
const LevelVO_1 = require("./vo/LevelVO");
const SoundVO_1 = require("./vo/SoundVO");
const GuideVO_1 = require("./vo/GuideVO");
const MapVO_1 = require("./vo/MapVO");
const SystemVO_1 = require("./vo/SystemVO");
class GlobalData extends Laya.Script {
    constructor() {
        super();
        /** json数据是否全部解析完毕 */
        this._hasParasComplete = false;
        this._needParseCount = 0;
        this._currParseCount = 0;
        this._jsonCount = 0;
    }
    setup(callback) {
        this._callBack = callback;
        this._totalStepCsvList = new TSDictionary_1.default();
        GlobalData.AllCacheData = new TSDictionary_1.default();
        this.initModel();
        this.initStep();
    }
    initModel() {
        this._totalStepCsvList.Add(GlobalData.HeroVO, HeroVO_1.default);
        this._totalStepCsvList.Add(GlobalData.HeroConfigVO, HeroConfigVO_1.default);
        this._totalStepCsvList.Add(GlobalData.LevelVO, LevelVO_1.default);
        this._totalStepCsvList.Add(GlobalData.SoundVO, SoundVO_1.default);
        this._totalStepCsvList.Add(GlobalData.GuideVO, GuideVO_1.default);
        this._totalStepCsvList.Add(GlobalData.MapVO, MapVO_1.default);
        this._totalStepCsvList.Add(GlobalData.SystemVO, SystemVO_1.default);
    }
    // 解析初始数据表
    initStep() {
        this._needParseCount = this._totalStepCsvList.GetLenght();
        this.onEnterFrameLoader();
    }
    onEnterFrameLoader() {
        if (this._currParseCount >= this._needParseCount) {
            this._hasParasComplete = true;
            this._callBack && this._callBack();
        }
        else {
            //一次解析两个文件
            this.getCsvFile();
            // this.getCsvFile();
        }
    }
    /** 开始逐个逐个解析JSON文件 */
    getCsvFile() {
        if (this._jsonCount < this._needParseCount) {
            let key = this._totalStepCsvList.getKeyByIndex(this._jsonCount);
            key = "config/csvJson/" + key;
            key = key.replace('_', '.');
            Laya.loader.load(key, Laya.Handler.create(this, this.onLoaded, [key]), null, Laya.Loader.TEXT, 0, true);
            this._jsonCount++;
        }
    }
    onLoaded(key) {
        let data = Laya.loader.getRes(key);
        try {
            if (data) {
                let data_json = JSON.parse(data);
                let csvStr = JSON.stringify(data_json);
                this.starSingleParse(csvStr);
            }
        }
        catch (error) {
            this._jsonCount--;
        }
        finally {
            this.onEnterFrameLoader();
        }
    }
    starSingleParse(csvStr) {
        let key = this._totalStepCsvList.getKeyByIndex(this._currParseCount);
        let DataClass = this._totalStepCsvList.getValueByIndex(this._currParseCount);
        let dic = CSVParser_1.default.ParseJsonData(DataClass, csvStr);
        GlobalData.AllCacheData.Add(key, dic);
        // console.log("@David 表数据：key:", key, " --- data:", dic);
        this._currParseCount++;
    }
    /** 获取对应表的指定某条数据 */
    static getData(type, key) {
        let dic = GlobalData.AllCacheData.TryGetValue(type);
        return dic.TryGetValue(key);
    }
    /**
     * 获取对应表的某条数据中指定名字下的数据
     * @param type 那张表
     * @param filterType 某一项名字
     * @param filterValue 值
     * 例如：parseInt(GlobleVOData.getDataByFilter(GlobleVOData.ServerConfigVO, "id", "MAX_MAP_COUNT")[0].value)
     */
    static getDataByFilter(type, filterType, filterValue) {
        let dic = GlobalData.AllCacheData.TryGetValue(type);
        if (dic == null)
            return [];
        let filterd = dic.TryGetListByCondition((bean) => bean[filterType] == filterValue);
        return filterd;
    }
    /** 获取对应表的所有数据 */
    static getAllValue(type) {
        let dic = GlobalData.AllCacheData.TryGetValue(type);
        return dic == null ? [] : dic.getValues();
    }
    /**
     * 查找对应条件的数据
     */
    static getDataByCondition(type, value) {
        let dic = GlobalData.AllCacheData.TryGetValue(type);
        if (dic == null)
            return [];
        let arr = dic.TryGetListByCondition(value);
        return arr;
    }
    static get Ins() {
        if (!GlobalData._instance) {
            GlobalData._instance = new GlobalData();
        }
        return GlobalData._instance;
    }
}
/** 英雄基础表 */
GlobalData.HeroVO = "Hero_json";
/** 英雄配置表 */
GlobalData.HeroConfigVO = "HeroConfig_json";
/** 等级配置表 */
GlobalData.LevelVO = "Level_json";
/** 声音表 */
GlobalData.SoundVO = "Sound_json";
/** 新手引导表 */
GlobalData.GuideVO = "Guide_json";
/** 地图表 */
GlobalData.MapVO = "Map_json";
/** 功能开放表 */
GlobalData.SystemVO = "System_json";
exports.default = GlobalData;
