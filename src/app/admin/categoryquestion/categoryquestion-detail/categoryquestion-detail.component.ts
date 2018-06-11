import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiConstant} from '../../../_core/common/url.constants';
import {MessageContstants} from '../../../_core/common/message.constants';
import {DateTimeConstants} from '../../../_core/common/datetime.constants';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserData} from '../../../_core/Fake-data/user.data';
import {NotificationService} from '../../../_core/service/notification.service';
import {DataService} from '../../../_core/service/data.service';
import {CommonContstants} from '../../../_core/common/common.constants';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-categoryquestion-detail',
  templateUrl: './categoryquestion-detail.component.html',
  styleUrls: ['./categoryquestion-detail.component.css']
})
export class CategoryquestionDetailComponent implements OnInit {

  @ViewChild('modalUpdateCategoryQuestionName') public modalUpdateCategoryQuestionName: ModalDirective;
  @ViewChild('formUpdateCategoryQuestionName') public formUpdateCategoryQuestionName: any;
  @ViewChild('inputCategoryQuestionName') public inputCategoryQuestionName: any;

  public categoryQuestionDetailData: any = {};
  public res_error_categoryQuestion_exist: string = '';
  public categoryId: any;
  public createDate: any;
  public categoryQuestionUpdate: any = {};
  public res_error: String;

  public categoryQuestionName_require: String;
  public categoryQuestionName_maxlength: String;
  public categoryQuestionName_regex: String;

  constructor(private _dataService: DataService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _notificationService: NotificationService,
              private _currentUser: UserData) {

  }

  getDetailFromID() {
    this._dataService.get(ApiConstant.URL_CATEGORY_QUESTION_GET_DETAIL_BY_ID + this.categoryId)
      .subscribe((res: any) => {
        this.categoryQuestionDetailData = res;
      }, error => {
        this._dataService.handleError(error);
        switch (error.status) {
          case 422:
            this.res_error_categoryQuestion_exist = MessageContstants.CATEGORY_QUESTION_NOT_EXIST;
            break;
          default:
            this.res_error_categoryQuestion_exist = MessageContstants.ERROR_DEFAULT;
            break;
        }
      });
  }



  setMessageErrorCreateCategoryQuestion() {
    this.res_error = null;
    this.categoryQuestionName_require = MessageContstants.CREATE_ERROR_CATEGORY_QUESTION_REQUIRE;
    this.categoryQuestionName_maxlength = MessageContstants.CREATE_ERROR_CATEGORY_QUESTION_LENGTH;
    this.categoryQuestionName_regex = MessageContstants.CREATE_ERROR_CATEGORY_QUESTION_NOTE_VALID;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.categoryId = params[CommonContstants.CATEGORY_ID];
    });
    this.getDetailFromID();
  }


  /**
   *
   */

  showUpdateCategoryQuestionNameModal() {
    this.categoryQuestionUpdate.categoryName = this.categoryQuestionDetailData.categoryName;
    console.log(this.categoryQuestionUpdate);
    this.formUpdateCategoryQuestionName.reset({categoryName: this.categoryQuestionDetailData.categoryName});
    this.modalUpdateCategoryQuestionName.show();
    //set message error
    this.setMessageErrorCreateCategoryQuestion()
    {
      setTimeout(() => {
        this.inputCategoryQuestionName.nativeElement.focus();
      }, 500);
    }
  }

  onSubmitFormUpdateCategoryQuestionName(values) {
    this.categoryQuestionUpdate.createDate = this.categoryQuestionDetailData.createDate;
    this.categoryQuestionUpdate.creatorId = this.categoryQuestionDetailData.creatorId.accountId;
    this.categoryQuestionUpdate.categoryId = this.categoryId;
    this.categoryQuestionUpdate.categoryName = values;
    console.log(this.categoryQuestionUpdate);
    this.res_error = null;
    if (this.categoryQuestionUpdate.categoryId != null && this.categoryQuestionUpdate.categoryId == this.categoryId) {
      this._dataService.put(ApiConstant.API_UPDATE_CATEGORY_QUESTION, this.categoryQuestionUpdate).subscribe((res: any) => {
        this.formUpdateCategoryQuestionName.reset();
        this.modalUpdateCategoryQuestionName.hide();
        this.formUpdateCategoryQuestionName.reset();
        this.categoryQuestionDetailData.categoryName = this.categoryQuestionUpdate.categoryName;
        this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
      }, error => {
        this._dataService.handleError(error);
        switch (error.status) {
          case 422:
            this.res_error = MessageContstants.CREATE_ERROR_CATEGORY_QUESTION_NOTE_VALID;
            break;
          case 409:
            this.res_error = MessageContstants.CREATE_ERROR_CATEGORY_QUESTION_NAME_EXIST;
            break;
          default:
            this.res_error = MessageContstants.ERROR_DEFAULT;
            break;
        }
        console.log(error.status);
        this._dataService.handleError(error);
      });
    } else {
      this.res_error = MessageContstants.CREATE_ERROR_CATEGORY_QUESTION_NAME_EXIST;
    }
  }

  checkValueFormUpdateCategoryQuestionName(inputValue) {
    if (inputValue.toLowerCase() == this.categoryQuestionUpdate.categoryName.toLowerCase()) {
      return true;
    }
    return false;
  }

  onCancel() {
    this.modalUpdateCategoryQuestionName.hide();
    this.modalUpdateCategoryQuestionName.hide();
    this.formUpdateCategoryQuestionName.reset();
  }

  eventForcusInputCategoryQuestionName() {
    this.res_error = null;
  }

}
