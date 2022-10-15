import {UserData} from '~/models';

declare global {
  namespace Express {
    interface User extends UserData {
      id: number,
    }
  }
}
