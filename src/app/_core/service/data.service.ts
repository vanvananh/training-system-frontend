import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from './notification.service';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MessageContstants} from './../common/message.constants';
import 'rxjs/add/operator/map';
import {ApiConstant} from '../common/url.constants';
import {tap} from 'rxjs/operators';

@Injectable()
export class DataService {

  constructor(private _http: HttpClient, private _router: Router,
              private _notificationService: NotificationService) {
  }

  get(uri: string) {
    console.log(uri)
    return this._http.get(ApiConstant.BASE_API + uri).map(this.extractData);
  }

  post(uri: string, data?: any) {
    return this._http.post(ApiConstant.BASE_API + uri, JSON.stringify(data)).map(this.extractData);
  }

  postFile(uri: string, data?: any) {
    return this._http.post(ApiConstant.BASE_API + uri, data, {responseType: 'text'}).pipe(tap(
      data => data,
      error => error
    ));
  }

  put(uri: string, data?: any) {
    return this._http.put(ApiConstant.BASE_API + uri, JSON.stringify(data)).map(this.extractData);
  }

  delete(uri: string) {
    return this._http.delete(ApiConstant.BASE_API + uri)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    return res || {};
  }


  public handleError(error: any) {
    if (error.status == 401) {
      this._notificationService.printErrorMessage(MessageContstants.LOGIN_AGAIN_MSG);
    } else if (error.status == 403) {
      this._notificationService.printErrorMessage(MessageContstants.FORBIDDEN);
    } else if (error.status == 404) {
      this._notificationService.printErrorMessage(MessageContstants.SYSTEM_ERROR_MSG);
    } else if (error.status == 0) {
      this._notificationService.printErrorMessage(MessageContstants.BAD_REQUEST);
    }
    if (error.status == 400) {
      let servermsg: any = JSON.parse(error._body)['ModelState'];
      if (servermsg != null) {
        for (var key in servermsg) {
          for (var i = 0; i < servermsg[key].length; i++) {
            this._notificationService.printErrorMessage(servermsg[key][i]);
          }
        }
        if (servermsg == null) {
          let errMsg = JSON.parse(error._body).Message;
          this._notificationService.printErrorMessage(errMsg);
        }
      } else {
        let errMsg = JSON.parse(error._body).Message;
        this._notificationService.printErrorMessage(errMsg);
        return Observable.throw(errMsg);
      }
    }
  }
}

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.body instanceof FormData) {
      request = request.clone({
        headers: request.headers.set('enctype', 'multipart/form-data')
      });
    } else {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
    }

    return next.handle(request);
  }
}
