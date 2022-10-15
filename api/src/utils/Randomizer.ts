export class Randomizer {
  static randomSort(_a: any, _b: any): number {
    return Math.random() > 0.5 ? 1 : -1;
  }

  static getRandomInt(min: number, max: number): number {
    return min + Math.round(Math.random() * (max - min));
  }

  static getRandomArrayValue<T>(arr: T[]): T {
    return arr[Randomizer.getRandomInt(0, arr.length - 1)];
  }

  static getRandomArrayValues<T>(arr: T[], amount: number): T[] {
    return arr.sort(() => Math.random() < 0.5 ? -1 : 1).slice(0, amount);
  }
}
