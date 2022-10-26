"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const tlds_1 = __importDefault(require("@sideway/address/lib/tlds"));
const joi_1 = __importDefault(require("joi"));
const constraints = {
    username: { minLength: 3, maxLength: 30 },
    email: { maxLength: 100 },
    password: { minLength: 6 },
};
exports.userValidation = {
    constraints,
    schema: {
        update: joi_1.default.compile(joi_1.default.object({
            username: joi_1.default.string().min(constraints.username.minLength).max(constraints.username.maxLength).required(),
        })),
        email: joi_1.default.compile(joi_1.default.object({
            email: joi_1.default.string().email({ tlds: { allow: tlds_1.default } }).max(constraints.email.maxLength).required(),
        })),
        password: joi_1.default.compile(joi_1.default.object({
            password: joi_1.default.string().min(constraints.password.minLength).required(),
        })),
    },
};
