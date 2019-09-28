import {IExampleRecordStorage} from '../index'
import DefaultRecordStorage from '../../common/storages/base/default'
import {storage} from '../../common/annotations/dependency-injection'
import IExample from "../../models/example";

@storage('Example')
export default class DefaultExampleRecordStorage extends DefaultRecordStorage<IExample.Records> implements IExampleRecordStorage {

}
