import {BasePosition} from '@acrommunity/common';

export interface IAcroletteSettings {
  difficulty: number[];
  playSound: boolean;
  switch: {
    type: 'timer' | 'button-click',
    duration: number,
  };
  poses: {
    basePositions: BasePosition[],
    startPoseId: number,
  };
}
