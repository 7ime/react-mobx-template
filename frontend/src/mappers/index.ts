import {Injectable} from '../common/dependency-container'

import IExample from "../models/example";

export interface IExampleMapper extends Injectable, IExample.Records {}
