import * as React from 'react';
import './index.scss';
import {observer} from 'mobx-react';

import {injectAware, injectProperty} from "../../../common/annotations/dependency-injection";
import {IExampleService} from "../../../services";
import {IExampleMapper} from "../../../mappers";

interface IProps {
}

@observer
@injectAware()
class ExampleComponent extends React.Component<IProps, {}> {
  @injectProperty('ExampleService') exampleService: IExampleService;
  @injectProperty('ExampleMapper') exampleMapper: IExampleMapper;

  componentDidMount() {
    this.exampleService.setTestValue({
      test: '111111111111111111111111111'
    });

    setTimeout(() => {
      this.exampleService.setTestValue({
        test: '1234'
      });
    }, 1000)
  }

  render() {
    const test = this.exampleMapper.test;

    if (!test) return null;

    return (
      <div className={'example-component'}>{test.test}</div>
    );
  }
}

export default ExampleComponent;
