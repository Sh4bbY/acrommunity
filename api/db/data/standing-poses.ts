import {BasePosition} from '@acrommunity/common/enums/BasePosition';
import {ContactPoint} from '@acrommunity/common/enums/ContactPoint';
import {Difficulty} from '@acrommunity/common/enums/Difficulty';
import {FlyerPosition} from '@acrommunity/common/enums/FlyerPosition';


/** @See
 * https://www.acromuseum.com/poses.php?id=2-1-S
 */
export const standingPoses = [
  {name: 'Arched handstand on thighs', basePosition: BasePosition.STANDING},
  {name: 'Backbend on shoulders', basePosition: BasePosition.STANDING},
  {name: 'Bed on shoulders', basePosition: BasePosition.STANDING},
  {name: 'Cupie', basePosition: BasePosition.STANDING},
  {name: 'Handstand on elbow', basePosition: BasePosition.STANDING},
  {name: 'Handstand on shoulders', basePosition: BasePosition.STANDING},
  {name: 'High backbird', basePosition: BasePosition.STANDING},
  {
    name: 'High Bird',
    difficulty: Difficulty.INTERMEDIATE,
    persons: 2,
    basePosition: BasePosition.STANDING,
    flyerPosition: FlyerPosition.LYING_ON_BELLY,
    contactPoint: ContactPoint.HANDS,
    attachments: ['https://www.acromuseum.com/in/ph/2/full/117151544_299459451138617_138878927291525251_n.jpg'],
  },
  {name: 'High cross', basePosition: BasePosition.STANDING},
  {name: 'High shoulderstand', basePosition: BasePosition.STANDING},
  {name: 'High side star', basePosition: BasePosition.STANDING},
  {name: 'High throne', basePosition: BasePosition.STANDING},
  {name: 'Shoulder to shoulder', basePosition: BasePosition.STANDING},
  {
    name: 'Upside Down',
    difficulty: Difficulty.EASY,
    persons: 2,
    basePosition: BasePosition.STANDING,
    flyerPosition: FlyerPosition.ON_THIGHS_HEADOVER,
    contactPoint: ContactPoint.ARMS,
    attachments: ['https://www.acromuseum.com/in/ph/2/full/122829748_837296060421449_1554464418503814763_n.jpg'],
  },
];
