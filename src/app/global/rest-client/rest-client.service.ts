// angular core imports
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

// rxjs imports observable methods
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const AUTH_API = '/api/a';


@Injectable()
export class RestClientService {

  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http) {}

  /**
   * [parseUrlParams parses URL parameters]
   * e.g. URL: /isource/items/get/:id, params: { id: 123456 }
   * will return /isource/items/get/132154
   * @param {[type]} url    [string]
   * @param {[type]} params [object containing params with key that matches params]
   */
  private parseUrlParams(url, params) {
    let urlStr = url;
    for (const i in params) {
      if (params.hasOwnKeyProperty(i)) {
        urlStr = urlStr.replace(`:${i}`, params[i]);
      }
    }
    return urlStr;
  }

  /**
   * [handleError throws global error when request fails]
   */
  private handleError(error: any) {
    // console.log(error);
  }

  /**
   * [request calls HTTP method]
   * @param {[type]} options [object of type <RESTOptions>]
   * @param {[type]} method  [string for method in small case]
   */
  public request(options) {
     // console.log('rest service data working', options);
      const parsedURL = options.params ? this.parseUrlParams(options.url, options.params) : options.url;
      const url = options.mock ? options.url : `${AUTH_API}/${parsedURL}`;
      const data = options.data || null;
      const method = options.method;

      return this.http[method](url, data)
                .map(response => response.json())
                .catch(error => console.log(error));
  }
}
