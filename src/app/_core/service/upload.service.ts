import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {ApiConstant} from '../common/url.constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions} from '@angular/http';

@Injectable()
export class UploadService {
  public responseData: any;

  constructor(private dataService: DataService, private _http: HttpClient) {
  }

  postWithFile(url: string, postData: any, files: File[]) {
    const formData: FormData = new FormData();
    formData.append('image', files[0], files[0].name);
    console.log(formData);
    if (postData !== '' && postData !== undefined && postData !== null) {
      for (var property in postData) {
        if (postData.hasOwnProperty(property)) {
          formData.append(property, postData[property]);
        }
      }
    }
    var returnReponse = new Promise((resolve, reject) => {
      this.dataService.postFile(url, formData).subscribe(
        res => {
          this.responseData = res;
          resolve(this.responseData);
        },
        error => {
          this.dataService.handleError(error);
          console.log(error);
        }
      );
    });
    return returnReponse;
  }
}
