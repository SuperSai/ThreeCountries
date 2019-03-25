"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PoolMgr {
    constructor() {
        this._instances = {};
    }
    get(classDefinition, name) {
        if (!name) {
            name = classDefinition.__className;
        }
        let instances = this._instances[name];
        if (!instances) {
            instances = [];
            this._instances[name] = instances;
        }
        if (instances.length > 0) {
            return instances.pop();
        }
        return new classDefinition();
    }
    return(instance, name) {
        if (!name) {
            name = instance.__proto__.__className;
        }
        let instances = this._instances[name];
        if (!instances) {
            instances = [];
            this._instances[name] = instances;
        }
        instances.push(instance);
        return instance;
    }
    static get Ins() {
        if (PoolMgr._instance == null) {
            PoolMgr._instance = new PoolMgr();
        }
        return PoolMgr._instance;
    }
}
exports.default = PoolMgr;
