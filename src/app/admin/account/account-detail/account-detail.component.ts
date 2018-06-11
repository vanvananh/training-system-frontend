import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DataService} from '../../../_core/service/data.service';
import {SystemConstants} from '../../../_core/common/system.constants';
import moment = require('moment');
import {ApiConstant, UrlConstant} from '../../../_core/common/url.constants';
import {CommonContstants} from '../../../_core/common/common.constants';
import {MessageContstants} from '../../../_core/common/message.constants';
import { Location } from '@angular/common';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  public account: any = {};
  public accountId: any;
  public res_error: any;

  constructor(private _dataService: DataService, private router: Router, private activateRoute: ActivatedRoute,private location: Location) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.activateRoute.params.subscribe((params: Params) => {
      this.accountId = params[CommonContstants.ACCOUNT_ID];
    });
    this.getDetailAccount();
  }
  /**
   * creator: ntvanh1
   *
   * function view user profile
   */
  getDetailAccount() {
    this._dataService.get(ApiConstant.URL_ACCOUNT_GET_DETAIL_ACCOUNT_BY_ID + this.accountId)
      .subscribe((res: any) => {
        this.account = res;
      }, error =>{
        switch (error.status) {
          case 422:
            this.res_error = MessageContstants.ACCOUNT_NOT_FOUND;
            break;
        }
        this._dataService.handleError(error);
      });
  }
  goBack(): void {
    this.location.back();
  }

    /**
   * author: ntvanh1
   * This will back to home
   */
  goHome() {
    localStorage.clear();
    this.router.navigate([UrlConstant.URL_HOME_INDEX]);
  }
}
