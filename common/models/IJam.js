"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jamValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const constraints = {
    title: { minLength: 3, maxLength: 30 },
    description: { maxLength: 500 },
};
exports.jamValidation = {
    constraints,
    schema: {
        create: joi_1.default.compile(joi_1.default.object({
            title: joi_1.default.string().min(constraints.title.minLength).max(constraints.title.maxLength).required(),
            description: joi_1.default.string().max(constraints.description.maxLength).required(),
        })),
    },
};
