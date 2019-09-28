import * as React from 'react';
import {observer} from "mobx-react";

import ExampleComponent from "../../kit/components/example-component";

interface IProps {}

@observer
export class HomeScene extends React.Component<IProps, {}> {
  render() {
    return (
      <div>
        <ExampleComponent/>
      </div>
    )
  }
}
