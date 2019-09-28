import {IExampleMapper} from '../index'
import {computed} from 'mobx'
import {IExampleRecordStorage} from '../../storages'
import {injectConstructor, mapper} from '../../common/annotations/dependency-injection'
import BaseMapper from '../../common/mappers/base/base'
import IExample from "../../models/example";

import {Maybe as MaybeType} from "../../common/custom-types";
type Maybe<T> = MaybeType<T>;

@mapper('Example')
export default class DefaultExampleMapper extends BaseMapper implements IExampleMapper {

  constructor(@injectConstructor('ExampleRecordStorage') protected store: IExampleRecordStorage) {
    super()
  }

  @computed
  get test(): Maybe<IExample.Test> {
    return this.store.get('test')._;
  }
}
