import {IUser} from '@acrommunity/common';

declare global {
  namespace Express {
    interface User extends IUser {
      id: number,
    }
  }
}
