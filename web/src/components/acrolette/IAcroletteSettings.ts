import {BasePosition} from '@acrommunity/common';

export interface IAcroletteSettings {
  switch: {
    type: 'timer' | 'button-click',
    duration: number,
  };
  poses: {
    basePositions: BasePosition[],
    flyerPositions: BasePosition[],
    exclude: [],
  };
  sound: {
    onSwitch: boolean,
  };
  difficulty: number;
  transitions: {
    onlyValid: boolean;
  };
}
