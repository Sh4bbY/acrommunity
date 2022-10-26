"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const constraints = {
    title: { minLength: 3, maxLength: 30 },
};
exports.tagValidation = {
    constraints,
    schema: joi_1.default.object({
        name: joi_1.default.string().min(constraints.title.minLength).max(constraints.title.maxLength).required(),
    }),
};
