import { RegisterAccount, RegisterAccumulation, RegisterInfo } from 'jetti-middle';

export interface PostResult {
  Account: RegisterAccount[];
  Accumulation: RegisterAccumulation[];
  Info: RegisterInfo[];
}
