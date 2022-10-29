import {BasePosition, FlyerPosition} from '../enums';

export interface IFlowGeneratorSettings {
  numberPoses: number,
  isWashingMachine: boolean,
  startPoseId: number,
  endPoseId: number,
  difficulty: number[],
  basePositions: BasePosition[],
  flyerPositions: FlyerPosition[],
}
