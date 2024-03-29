import {Fetcher} from '../index'
import {checkJson, instantiateJson} from '../../common/annotations/model'
import {configuration} from '../../configs'
import {injectable} from '../../common/annotations/dependency-injection'
import {Injectable} from '../../common/dependency-container'

interface HeadersContainer {
  [key: string]: string;
}

@injectable('Fetcher')
export default class DefaultFetcher implements Fetcher, Injectable {

  private headersRaw: HeadersContainer = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }

  private get headers() {
    return new Headers(this.headersRaw)
  }

  addHeader(name: string, value: string) {
    this.headersRaw[name] = value
  }

  get(url: string, body: any = {}, schema?: Function) {

    const params = Object.keys(body)
      .map(prop => [prop, body[prop]].join('='))
      .join('&')

    return this.fetch(`${url}?${params}`, this.defaultRequestInit('get'), schema)
  }

  post(url: string, body: any = {}, schema?: Function, errorHandler?: Function) {
    return this.fetch(`${url}`, {
      ...this.defaultRequestInit('post'),
      body: JSON.stringify(body)
    }, schema, errorHandler)
  }

  put(url: string, body: any = {}, schema?: Function, errorHandler?: Function) {
    return this.fetch(`${url}`, {
      ...this.defaultRequestInit('put'),
      body: JSON.stringify(body)
    }, schema, errorHandler)
  }

  'delete'(url: string, body: any = {}, schema?: Function) {
    return this.fetch(`${url}`, {
      ...this.defaultRequestInit('delete'),
      body: JSON.stringify(body)
    }, schema)
  }

  mock(url: string, body: any = {}, schema?: Function) {
    return Promise.resolve(JSON.parse(body))
      .then((it: any) => {
        schema && checkJson(it, schema)
        return it
      })
      .then((it: any) => schema ? instantiateJson(it, schema) : it)
  }

  postConstructor() {
  }

  awakeAfterInjection() {
  }

  private defaultRequestInit(method: string): RequestInit {
    return {
      method,
      headers: this.headers,
      credentials: 'include'
    }
  }

  private fetch(input: RequestInfo, init?: RequestInit, schema?: Function, errorHandler?: Function): Promise<any> {
    return fetch(input, init)
      .then(this.handleResponse(input, init, schema, errorHandler))
      .then(it => {
        schema && checkJson(it, schema)
        return it
      })
      .then(it => schema ? instantiateJson(it, schema) : it)
  }

  private handleResponse = (input: RequestInfo, init?: RequestInit, schema?: Function, errorHandler?: Function) =>
    async (res: Response) => {
      if (res.status >= 200 && res.status < 300) {
        return parseJSON(res)
      }
      if (errorHandler) {
        errorHandler(res)
      } else if (res.status === 401 && window.location.pathname !== '/not-found' && window.location.pathname !== '/not-access') {
        window.location.replace('/login?isRedirect=true')
      }
      throw res
    }
}

const parseJSON = (response: any) => {
  return response.text().then((text: any) => {
    try {
      return text ? JSON.parse(text) : response
    } catch (e) {
      return text
    }
  })
}
