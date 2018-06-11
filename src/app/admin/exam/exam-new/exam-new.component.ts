import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../../../_core/service/data.service';
import { ApiConstant, UrlConstant } from '../../../_core/common/url.constants';
import { CommonContstants } from '../../../_core/common/common.constants';
import { MessageContstants } from '../../../_core/common/message.constants';
import { Location } from '@angular/common';
import { UserData } from '../../../_core/Fake-data/user.data';
import { NotificationService } from '../../../_core/service/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from '../../../_share/dropdown/types';

@Component({
  selector: 'app-exam-new',
  templateUrl: './exam-new.component.html',
  styleUrls: ['./exam-new.component.css']
})
export class ExamNewComponent implements OnInit {
  @ViewChild('formCreateExam') public formCreateExam: any;
  /**khai báo filter**/
  settingsCategory: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default',
    dynamicTitleMaxItems: 1,
    displayAllSelectedText: true,
    closeOnClickOutside: true,
    selectionLimit: 1,
    minSelectionLimit: 1,
    closeOnSelect: true,
    autoUnselect: true
  };

  settingsDuration: IMultiSelectSettings = {
    enableSearch: false,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default',
    dynamicTitleMaxItems: 1,
    displayAllSelectedText: true,
    closeOnClickOutside: true,
    selectionLimit: 1,
    minSelectionLimit: 1,
    closeOnSelect: true,
    autoUnselect: true
  };


  texts: IMultiSelectTexts = {
    checkAll: CommonContstants.CHECK_ALL,
    uncheckAll: CommonContstants.UN_CHECK_ALL,
    checked: CommonContstants.CHECKED,
    checkedPlural: CommonContstants.CHECKED_PLURAL,
    searchPlaceholder: CommonContstants.SEARCH_PLACEHOLDER,
    searchEmptyResult: CommonContstants.SEARCH_EMPTY_RESULT,
    searchNoRenderText: CommonContstants.SEARCH_NO_RENDER_TEXT,
    defaultTitle: CommonContstants.DEFAULT_TITLE_QUESTION_NEW,
    allSelected: CommonContstants.ALL_SELECTED
  };
  //optionsCategory: IMultiSelectOption[];
  /**ket thuc filter**/
  public categoryQuestion: any = {};
  public exam: any = {};
  public res_error: any;
  public categories: IMultiSelectOption[];
  public durations: IMultiSelectOption[];
  public categoryId: any;
  public durationId: any;
  public time: any;
  public user = this._currentUser.getUser();
  constructor(private _dataService: DataService, private router: Router, private activateRoute: ActivatedRoute, private location: Location, private _currentUser: UserData,
     private _notificationService: NotificationService, private _fb: FormBuilder) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getAllCategory();
    this.getAllDuration();
    this.initCreateExam();
  }
    /**
   * @author ntvanh1
   * initialize question
   */
  initCreateExam() {
    this.formCreateExam = this._fb.group({
      title: ['', [Validators.required]],
      categoryId: [[], [Validators.required]],
      durationId: [[], [Validators.required]],
      note: ['']
    });
    this.exam.categoryId
    this.exam = this.formCreateExam.value;
  }

  onChangeCategory(events:any){
    this.exam.categoryId = events[0];
  }

  onChangeDuration(events:any){
    this.exam.durationId = events[0];
  }
  /**
* @author: ntvanh1
* this function to get all category question
*/
getAllCategory() {
  this._dataService.get(ApiConstant.URL_CATEGORY_QUESTION_GET_ALL).subscribe((res: any) => {
    this.categories = [];
    for (let category of res.data) {
      this.categories.push({id: category.categoryId, name: category.categoryName});
    }
  }, error => this._dataService.handleError(error));
}
  /**
* @author: ntvanh1
* this function to get all category question
*/
getAllDuration() {
  this._dataService.get(ApiConstant.URL_DURATION_GET_ALL).subscribe((res: any) => {
    this.durations = [];
    for (let duration of res) {
      this.durations.push({id: duration.durationId, name: duration.durationValue});
    }
  }, error => this._dataService.handleError(error));
}

  /**
* @author: ntvanh1
* call this function when click save button
*/
  onSubmitFormCreateExam(values) {
    this.exam.creatorId = this.user.id;
    this.res_error = null;
    this.exam.examId = "";
    this._dataService.post(ApiConstant.URL_EXAM_CREATE, this.exam).subscribe((res: any) => {
      this.exam = {};
      this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
      this.formCreateExam.reset();
    }, error => {
      this._dataService.handleError(error);
      switch (error.status) {
        case 422:
          this.res_error = MessageContstants.ERROR_EXAM_REGEX;
          break;
        default:
          this.res_error = MessageContstants.ERROR_DEFAULT;
          break;
      }
      this._dataService.handleError(error);
    });
    this.router.navigate([UrlConstant.URL_GET_ALL_EXAM]);
  }
  /**
 * @author: ntvanh1
 * call this function when click reset button
 */
  resetFormCreateExam() {
    this.formCreateExam.reset();
    this.initCreateExam();
  }
    /**
 * @author: ntvanh1
 * call this function when click Back button
 */
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
        /**
   * author: ntvanh1
   * call this function to disable submit
   */
  checkDisableSubmit():boolean{
    //check for in it form
    if(typeof(this.exam.title.trim()==''||this.exam.categoryId)=="undefined"||typeof(this.exam.durationId)=="undefined"){
      return true;
    }
    //check after resetting form
    if(this.exam.title.trim()==''||this.exam.categoryId==''||this.exam.durationId==''){
      return true;
    }
    return false;
  }

}
