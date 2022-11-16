import {BasePosition} from '@acrommunity/common';

export interface IAcroletteSettings {
  difficulty: number[];
  playSound: boolean;
  switch: {
    autoLoad: boolean,
    duration: number,
  };
  poses: {
    basePositions: BasePosition[],
    startPoseId: number,
  };
}
