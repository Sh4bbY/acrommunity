"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListables = void 0;
const enums_1 = require("../enums");
function getListables(list, type) {
    switch (type) {
        case enums_1.ListableType.Pose:
            return list.poses;
        case enums_1.ListableType.Flow:
            return list.flows;
        case enums_1.ListableType.Skill:
            return list.skills;
        default:
            return [];
    }
}
exports.getListables = getListables;
