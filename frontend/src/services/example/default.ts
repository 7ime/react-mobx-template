import {IExampleService} from '../index'
import BaseService from '../../common/services/base/base'
import {IExampleRecordStorage} from '../../storages'
import {injectConstructor, service} from '../../common/annotations/dependency-injection'
import IExample from "../../models/example";

@service('Example')
export default class DefaultExampleService extends BaseService implements IExampleService {
  constructor(@injectConstructor('ExampleRecordStorage') private store: IExampleRecordStorage) {
    super()
  }

  setTestValue(newTest: IExample.Test) {
    this.store.set('test', newTest)
  }
}
