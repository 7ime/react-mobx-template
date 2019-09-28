import {configuration} from '../configs'

const base = (rest: string) => `${configuration.remoteApi}/${rest}`;

export default class Paths {
  static Example = class {
    static Test = (id: number) => base(`example/${id}`);
  };
}
