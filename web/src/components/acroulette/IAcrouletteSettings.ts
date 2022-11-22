import {BasePosition} from '@acrommunity/common';

export interface IAcrouletteSettings {
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
