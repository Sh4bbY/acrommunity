"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Randomizer = void 0;
class Randomizer {
    static randomSort(_a, _b) {
        return Math.random() > 0.5 ? 1 : -1;
    }
    static getRandomInt(min, max) {
        return min + Math.round(Math.random() * (max - min));
    }
    static getRandomArrayValue(arr) {
        return arr[Randomizer.getRandomInt(0, arr.length - 1)];
    }
    static getRandomArrayValues(arr, amount) {
        return arr.sort(() => Math.random() < 0.5 ? -1 : 1).slice(0, amount);
    }
}
exports.Randomizer = Randomizer;
