import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiConstant, UrlConstant} from '../../_core/common/url.constants';
import {NotificationService} from '../../_core/service/notification.service';
import {DataService} from '../../_core/service/data.service';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageContstants} from '../../_core/common/message.constants';
import {UserData} from '../../_core/Fake-data/user.data';
import {ClassNameTable, NameColumns, TitleTable} from '../../_core/common/configTable.constant';
import {DateTimeConstants} from '../../_core/common/datetime.constants';
import {CommonContstants} from '../../_core/common/common.constants';
import moment = require('moment');
import {TableDirectivesComponent} from '../../_share/table-directives/table-directives.component';

@Component({
  selector: 'app-categoryquestion',
  templateUrl: './categoryquestion.component.html',
  styleUrls: ['./categoryquestion.component.css']
})
export class CategoryQuestionComponent implements OnInit {
  //Khai báo modal
  @ViewChild('modalDeleteCategoryQuestion') public modalDeleteCategoryQuestion: ModalDirective;
  //Khai báo biến
  public titleModal: string = '';
  public user = this._currentUser.getUser();

  // view list
  public categoryQuestion: any = {};
  //Config css cho tableL
  public configTable: any = {
    className: [ClassNameTable.TABLE_STRIPED, ClassNameTable.TABLE_BORDERED, ClassNameTable.TABLE_JAMBO, ClassNameTable.BULK_ACTION],
    currentPage: CommonContstants.ONE,
    isDetail: true
  };
  // config column in table
  public columnsTableCategory: Array<any> = [
    {
      title: TitleTable.CATEGORY_QUESTION_NAME,
      name: NameColumns.CATEGORY_QUESTION_NAME,
      sizeColumnTable: ClassNameTable.COL_MD_4,
      maxWidth: 100,
      sort: {isSort: true}
    },
    {
      title: TitleTable.CATEGORY_QUESTION_CODE,
      name: NameColumns.CATEGORY_QUESTION_CODE,
      sizeColumnTable: ClassNameTable.COL_MD_2,
      maxWidth: 100,
      sort: {isSort: true}
    },
    {
      title: TitleTable.CATEGORY_QUESTION_CREATOR,
      name: NameColumns.CATEGORY_QUESTION_CREATOR,
      sizeColumnTable: ClassNameTable.COL_MD_4,
      maxWidth: 100,
      sort: {isSort: true}
    },
    {
      title: TitleTable.CATEGORY_QUESTION_CREATED_AT,
      name: NameColumns.CATEGORY_QUESTION_CREATED_AT,
      sizeColumnTable: ClassNameTable.COL_MD_2,
      maxWidth: 100,
      sort: {isSort: true, sortType: CommonContstants.SORT_TYPE_DESC}
    }
  ];
  //data for table
  public dataTableCategory: any = [];

  //paging
  private currentPage: number = CommonContstants.ONE;

  // sort
  public sortObject: any = {title: NameColumns.DATE_CREATE, sortType: CommonContstants.SORT_TYPE_DESC};
  @ViewChild(TableDirectivesComponent) public tableDirectivesComponent: TableDirectivesComponent;
  // search
  @ViewChild('keywordSearch') public keywordSearch: any;

  // create
  @ViewChild('modalAddEditCategory') public modalAddEditCategory: ModalDirective;
  // form input
  @ViewChild('formAddEditCategory') public formAddEditCategory: any;
  @ViewChild('inputCategoryName') public inputCategoryName: any;
  // message error when check form create
  public res_error: String;
  public categoryQuestionName_require: String;
  public categoryName_maxlength: String;
  public categoryQuestionName_regex: String;

  // delete
  public listCategoryQuestionChecked: String = '';

  /**
   * function is Contructor
   *
   * @param {DataService} _dataService
   * @param {Router} router
   * @param {ActivatedRoute} activatedRoute
   * @param {NotificationService} _notificationService
   * @param {UserData} _currentUser
   */
  constructor(private _dataService: DataService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _notificationService: NotificationService,
              private _currentUser: UserData) {
  }

  ngOnInit() {
    this.getAllCategory();
  }

  /**
   * @creator: NNDuy
   *
   * This function is back to Home Page
   */
  goHome() {
    localStorage.clear();
    this.router.navigate([UrlConstant.URL_HOME_INDEX]);
  }

  /**
   * @creator: NNDuy
   *
   * This will encode % to
   * @param {string} keyword
   * @returns {string}
   */
  encodeSpecialCharacter(keyword: string) {
    // let result = '';
    keyword = keyword.trim();
    return (encodeURI(keyword) !== keyword) ? encodeURI(keyword) : encodeURIComponent(keyword);
  }

  /**
   * @creator: NNDuy
   *
   * function is get all list category question from api
   * @param {number} pageNumber
   */
  getAllCategory() {
    let keywordSearch = this.keywordSearch.nativeElement.value.trim();
    if (keywordSearch !== CommonContstants.EMPTY) {
      keywordSearch = CommonContstants.ADD_PARAM + CommonContstants.KEYWORD_SEARCH + CommonContstants.EQUAL + this.encodeSpecialCharacter(keywordSearch);
    }
    this._dataService.get(ApiConstant.URL_CATEGORY_QUESTION_GET_ALL +
      CommonContstants.PAGE_NUMBER + this.configTable.currentPage + CommonContstants.ADD_PARAM +
      CommonContstants.SORT_FIELD + CommonContstants.EQUAL + this.sortObject.title + CommonContstants.ADD_PARAM +
      CommonContstants.SORT_TYPE + CommonContstants.EQUAL + this.sortObject.sortType +
      keywordSearch).subscribe((res: any) => {
      this.dataTableCategory = res.data;
      this.configTable.totalPage = res.totalPage;
      this.configTable.numberRecordOnPage = res.numberRecordPerPage;
      this.configTable.currentPage = res.pageCurrent;
      this.tableDirectivesComponent.dataCheckBox = [];
      this.tableDirectivesComponent.checked = false;
      for (let row of this.dataTableCategory) {
        row.createDate = moment(row.createDate).format(DateTimeConstants.FORMAT_DATE_DDMMYYYY);
      }
    }, error => this._dataService.handleError(error));
  }

  /**
   * @creator: NNDuy
   *
   * function for get current page
   * @param currentPage
   */
  getCurrentPage(currentPage: any) {
    this.configTable.currentPage = currentPage;
    this.getAllCategory();
  }

  /**
   * @creator: NNDuy
   * submit form search
   *
   */
  submitSearch() {
    this.configTable.currentPage = CommonContstants.ONE;
    this.getAllCategory();
  }

  /**
   * @creator: NNDuy
   * this method to sort by column name
   * @param valueSortTableCategory
   */
  onSortTableCategory(valueSortTableCategory: any) {
    for (let column of this.columnsTableCategory) {
      if (column.sort.sortType != null) {
        column.sort.sortType = '';
      }
      if (column.name == valueSortTableCategory.title) {
        column.sort.sortType = valueSortTableCategory.sortType;
      }
    }
    this.sortObject = valueSortTableCategory;
    this.configTable.currentPage = CommonContstants.ONE;
    this.getAllCategory();
  }

  /**
   * @creator: NNDuy
   *
   * function for event forcus input categoryQuestionName at create category question form api
   */
  eventForcusInputCategoryName() {
    this.res_error = null;
  }

  /**
   * @creator: NNDuy
   *
   * function show form modal create and update category question set value for variable
   * @param {string} flag
   */
  showAddModalCategoryName(flag: string) {
    if (flag == CommonContstants.FLAG_CREATE) {
      this.formAddEditCategory.reset();
      this.categoryQuestion = {};
      this.titleModal = CommonContstants.TITLE_MODAL_CREATE_CATEGORY_QUESTION;
      this.modalAddEditCategory.show();
      setTimeout(() => {
        this.inputCategoryName.nativeElement.focus();
      }, 500);
      //set message error
      this.setMessageErrorCategoryQuestion();
    }
    else {
      this.titleModal = CommonContstants.TITLE_MODAL_UPDATE_CATEGORY_QUESTION;
      this.modalAddEditCategory.show();
    }
  }

  /**
   * @creator: NNDuy
   *
   * function set messages = null;
   */
  setMessageErrorCategoryQuestion() {
    this.res_error = null;
    this.categoryQuestionName_require = MessageContstants.CREATE_ERROR_CATEGORY_QUESTION_REQUIRE;
    this.categoryName_maxlength = MessageContstants.CREATE_ERROR_CATEGORY_QUESTION_LENGTH;
    this.categoryQuestionName_regex = MessageContstants.CREATE_ERROR_CATEGORY_QUESTION_NOTE_VALID;
  }

  /**
   * @creator: NNDuy
   *
   * function for event submit form create or update category question
   * @param values
   */
  onSubmitModal(values) {
    values.creatorId = this.user.id;
    if (values.id != null) {
      this.res_error = null;
      this._dataService.put(ApiConstant.URL_CATEGORY_QUESTION_UPDATE + values.id, values).subscribe((res: any) => {
        this.modalAddEditCategory.hide();
        this.categoryQuestion = {};
        this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        this.getAllCategory();
      });
    } else {
      this.res_error = null;
      this._dataService.post(ApiConstant.URL_CATEGORY_QUESTION_CREATE, values).subscribe((res: any) => {
        this.formAddEditCategory.reset();
        this.modalAddEditCategory.hide();
        this.categoryQuestion = {};
        this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        this.getAllCategory();
      }, response => {
        this._dataService.handleError(response);
        switch (response.status) {
          case CommonContstants.HTTP_STATUS_CONFLICT:
            this.res_error = MessageContstants.CREATE_ERROR_CATEGORY_QUESTION_NAME_EXIST;
            break;
          case CommonContstants.HTTP_STATUS_UNPROCESSABLE_ENTITY:
            this.res_error = MessageContstants.CREATE_ERROR_CATEGORY_QUESTION_NOTE_VALID;
            break;
          default:
            this.res_error = MessageContstants.ERROR_DEFAULT;
            break;
        }
        this._dataService.handleError(response);
      });
    }
    this.resetTableCategory();
  }

  /**
   * @creator: vdhao
   *
   * function for event click button delete category question
   * @param func_param
   */
  onCancelModal(func_param) {
    this.formAddEditCategory.reset();
    this.modalAddEditCategory.hide();
    this.modalDeleteCategoryQuestion.hide();
  }

  /**
   * vdhao
   * This method handle event when checkbox is selected
   * @param values
   */
  onCheckBoxSelected(values: any) {
    console.log(values);
    this.listCategoryQuestionChecked = '';
    for (let value of values) {
      this.listCategoryQuestionChecked += value.categoryId + ', ';
    }
    this.listCategoryQuestionChecked = this.listCategoryQuestionChecked.substr(0, this.listCategoryQuestionChecked.length - 2);
    //console.log(this.listCategoryQuestionChecked);
  }

  /**
   * vdhao
   * This method handle event when checkbox is selected all
   * @param values
   */
  onCheckBoxSelectedAll(values: any) {
    this.listCategoryQuestionChecked = '';
    for (let value of values) {
      this.listCategoryQuestionChecked += value.categoryId + ', ';
    }
    this.listCategoryQuestionChecked = this.listCategoryQuestionChecked.substr(0, this.listCategoryQuestionChecked.length - 2);
  }

  /**
   * vdhao
   * This method handle event when icon delete is clicked
   */
  showDeleteCategoryQuestionModal() {
    if (this.tableDirectivesComponent.dataCheckBox.length > 0) {
      this.modalDeleteCategoryQuestion.show();
    }
    else {
      this._notificationService.printErrorMessage(MessageContstants.DELETE_CATEGORY_QUESTION_ERROR);
    }
  }

  /**
   * this method is used to confirm delete Category Question
   * vdhao
   */
  onDeleteCategoryQuestion() {
    let numberCategoryIsDeleted = this.listCategoryQuestionChecked.split(',').length;
    this._dataService.delete(ApiConstant.URL_CATEGORY_QUESTION_DELETE + this.listCategoryQuestionChecked).subscribe((res) => {
      this._notificationService
        .printSuccessMessage(numberCategoryIsDeleted > 1 ? numberCategoryIsDeleted + MessageContstants.DELETE_CATEGORIES_QUESTION
          : numberCategoryIsDeleted + MessageContstants.DELETE_CATEGORY_QUESTION);
      this.configTable.currentPage = CommonContstants.ONE;
      this.getAllCategory();
    }, (error) => {
      console.log(error);
      this._notificationService.printErrorMessage(MessageContstants.DELETE_CATEGORY_QUESTION_ERROR);
      this.getAllCategory();
    });
    this.modalDeleteCategoryQuestion.hide();
    this.listCategoryQuestionChecked = '';
  }

  resetTableCategory() {
    this.keywordSearch.nativeElement.value = '';
    for (let columns of this.columnsTableCategory) {
      if (columns.title !== TitleTable.DATE_CREATE && columns.sort.sortType != null || columns.sort.sortType != '') {
        columns.sort.sortType = '';
      }
      if (columns.title === TitleTable.DATE_CREATE) {
        columns.sort.sortType = CommonContstants.SORT_TYPE_DESC;
      }
    }
    this.sortObject = {title: NameColumns.DATE_CREATE, sortType: CommonContstants.SORT_TYPE_DESC};
    this.configTable.currentPage = CommonContstants.ONE;
    this.getAllCategory();
  }

  onCellClick(values: any) {
    let test = values.row.categoryId;
    console.log(test);
    this.router.navigate(['/tranning-system/categoryquestion/categoryquestion-detail/', values.row.categoryId]);
  }

}
