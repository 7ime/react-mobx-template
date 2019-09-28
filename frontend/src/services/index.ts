import BaseService from '../common/services/base/base'

import IExample from "../models/example";

export interface IExampleService extends BaseService {
  setTestValue(newTest: IExample.Test): void;
}
