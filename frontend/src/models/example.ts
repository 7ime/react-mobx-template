import {observable} from 'mobx'
import {attr} from '../common/annotations/model'
import {Maybe} from "../common/custom-types";

namespace IExample {
  export class Test {
    @attr()
    @observable
    test: string;
  }

  export interface Records {
    test: Maybe<Test>
  }
}

export default IExample;
