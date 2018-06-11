import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiConstant, UrlConstant} from '../../_core/common/url.constants';
import {CommonContstants} from '../../_core/common/common.constants';
import {ClassNameTable, NameColumns, TitleTable} from '../../_core/common/configTable.constant';
import {UserData} from '../../_core/Fake-data/user.data';
import {DateRangePiker, DateTimeConstants} from '../../_core/common/datetime.constants';
import {NotificationService} from '../../_core/service/notification.service';
import {DataService} from '../../_core/service/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ExamLocalStorage} from '../../_core/model/ExamLocalStorage';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from '../../_share/dropdown/types';
import {FilterComponent} from '../../_share/filter/filter.component';
import {TableDirectivesComponent} from '../../_share/table-directives/table-directives.component';
import {MessageContstants} from '../../_core/common/message.constants';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  /**khai báo viewChild**/
  @ViewChild('keywordSearch') public keywordSearch: any;
  @ViewChild(FilterComponent) public filterComponent: FilterComponent;
  @ViewChild(TableDirectivesComponent) public tableDirectivesComponent: TableDirectivesComponent;
  @ViewChild('modalDeleteExam') public modalDeleteExam: ModalDirective;
  @ViewChild('collapse') public classname: any;
  /**kết thúc khai báo viewChild**/

  /**khai báo filter**/
    //dữ liệu cho select option chọn điều kiện filter
  optionsConditionFilter: IMultiSelectOption[] = [];
  //setting cho type,level,creator
  settings: IMultiSelectSettings = {
    enableSearch: false,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn  btn-default btn-block',
    dynamicTitleMaxItems: 1,
    displayAllSelectedText: true,
    closeOnClickOutside: true,
    selectionLimit: 1,
    minSelectionLimit: 1,
    closeOnSelect: true,
    autoUnselect: true
  };

  settingCategory: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn  btn-default btn-block',
    dynamicTitleMaxItems: 1,
    displayAllSelectedText: true,
    closeOnClickOutside: true,
    selectionLimit: 1,
    minSelectionLimit: 1,
    closeOnSelect: true,
    autoUnselect: true
  };

  //text hiển thị cho select option chọn điều kiện filter
  textsCoditionFilter: IMultiSelectTexts = {
    checkAll: CommonContstants.CHECK_ALL,
    uncheckAll: CommonContstants.UN_CHECK_ALL,
    checked: CommonContstants.CHECKED,
    checkedPlural: CommonContstants.CHECKED_PLURAL,
    searchPlaceholder: CommonContstants.SEARCH_PLACEHOLDER,
    searchEmptyResult: CommonContstants.SEARCH_EMPTY_RESULT,
    searchNoRenderText: CommonContstants.SEARCH_NO_RENDER_TEXT,
    defaultTitle: CommonContstants.DEFAULT_TITLE,
    allSelected: CommonContstants.ALL_SELECTED
  };
  //dữ liệ được select của type, creator, status
  modelTypeExam: any = [''];
  modelCreatorExam: any = [''];
  modelStatusExam: any = [''];

  //#region  date picker
  public picker = {
    locale: DateRangePiker.Locale,
    alwaysShowCalendars: false,
    ranges: DateRangePiker.Range
  };
  public chosenDate: any = {
    start: moment('01/01/2018', 'DD/MM/YYYY'),
    end: moment(),
  };
  /**ket thuc khai báo filter*/

  /**khai báo biến dùng trong class**/
  public listExamChecked: String = '';
  public user = this._currentUser.getUser();
  //sort object
  public sortObject: any = {title: NameColumns.DATE_CREATE, sortType: CommonContstants.SORT_TYPE_DESC};

  //data row for table
  public ExamRows: any;
  //filter object
  public filterObject: any = '';
  public classNameFilter = 'collapse';
  /**khai báo biến dung cho table directive**/
    // config class for the table component
  public ConfigTable: any = {
    className: [ClassNameTable.TABLE_STRIPED, ClassNameTable.TABLE_BORDERED, ClassNameTable.TABLE_JAMBO, ClassNameTable.BULK_ACTION],
    currentPage: CommonContstants.ONE,
    isDetail: true
  };

  public ExamColumns: Array<any> = [
    {
      title: TitleTable.EXAM_TITLE,
      name: NameColumns.EXAM_TITLE,
      sizeColumnTable: ClassNameTable.COL_MD_3,
      maxWidth: 100,
      sort: {isSort: true}
    },
    {
      title: TitleTable.EXAM_TYPE,
      name: NameColumns.EXAM_TYPE,
      sizeColumnTable: ClassNameTable.COL_MD_2,
      maxWidth: 100,
      sort: {isSort: true},
      filter: {
        isFilter: true,
        isMultilSelect: true,
        mySettings: this.settingCategory,
        myTexts: this.textsCoditionFilter,
        optionModel: this.modelTypeExam
      }
    },
    {
      title: TitleTable.EXAM_DURATION,
      name: NameColumns.EXAM_DURATION,
      sizeColumnTable: ClassNameTable.COL_MD_1,
      maxWidth: 100,
      sort: {isSort: true},
      filter: {isFilter: true, isOther: true, inputMinimum: '', inputMaximum: ''}
    },
    {
      title: TitleTable.EXAM_QUESTIONS,
      name: NameColumns.EXAM_QUESTIONS,
      sizeColumnTable: ClassNameTable.COL_MD_1,
      maxWidth: 100,
      sort: {isSort: true},
      filter: {isFilter: true, isOther: true, inputMinimum: '', inputMaximum: ''}
    },
    {
      title: TitleTable.EXAM_CREATED_USER,
      name: NameColumns.EXAM_CREATED_USER,
      sizeColumnTable: ClassNameTable.COL_MD_2,
      maxWidth: 100,
      sort: {isSort: true},
      filter: {
        isFilter: true,
        isMultilSelect: true,
        mySettings: this.settingCategory,
        myTexts: this.textsCoditionFilter,
        optionModel: this.modelCreatorExam
      }
    },
    {
      title: TitleTable.EXAM_STATUS,
      name: NameColumns.EXAM_STATUS,
      sizeColumnTable: ClassNameTable.COL_MD_1,
      maxWidth: 100,
      sort: {isSort: true},
      filter: {
        isFilter: true,
        isMultilSelect: true,
        mySettings: this.settings,
        myTexts: this.textsCoditionFilter,
        optionModel: this.modelStatusExam
      }
    },
    {
      title: TitleTable.EXAM_CREATED_DATE,
      name: NameColumns.EXAM_CREATED_DATE,
      sizeColumnTable: ClassNameTable.COL_MD_2,
      maxWidth: 100,
      sort: {isSort: true, sortType: CommonContstants.SORT_TYPE_DESC},
      filter: {
        isFilter: true, isDate: true, mySettings: this.picker, chosenDate: this.chosenDate
      }
    }
  ];

  /**
   * description: this function do filter.
   *
   * @Creator:nvdong
   */
  onChangedValue(value) {
    this.filterObject = '';
    for (let filter of value) {
      if (filter.value != '') {
        if (filter.value == null) {
          filter.value = 0;
        }
        this.filterObject = this.filterObject + '&' + filter.filterFiled + '=' + filter.value;
      }
    }
    this.getAll();
  }

  /**
   * description: this function clear inputs filter.
   *
   * @Creator:nvdong
   */
  clear() {
    for (let column of this.ExamColumns) {
      if (column.filter) {
        if (column.filter.isFilter && column.filter.isMultilSelect) {
          column.filter.optionModel = [];
        }
        if (column.filter.isFilter && column.filter.isDate) {
          column.filter.chosenDate = {
            start: moment('01/01/2018', 'DD/MM/YYYY'),
            end: moment(),
          };
        }
        if (column.filter.isFilter && column.filter.isOther) {
          column.filter.inputMinimum = '';
          column.filter.inputMaximum = '';
        }
      }
    }
  }

  // declare variable localStorage
  public examLocalStorage: ExamLocalStorage;

  constructor(private _dataService: DataService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _notificationService: NotificationService,
              private _currentUser: UserData) {
  }

  /**
   * nvDong
   * run when first load page
   * set default value for the search form
   */
  ngOnInit() {
    window.scrollTo(0, 0);
    if (localStorage.getItem(CommonContstants.EXAM) != null) {
      this.examLocalStorage = JSON.parse(localStorage.getItem(CommonContstants.EXAM));
      this.sortObject = this.examLocalStorage.sortObjectTable;
      this.ExamColumns = this.examLocalStorage.columns;
      this.ConfigTable.currentPage = this.examLocalStorage.currentPage;
      this.keywordSearch.nativeElement.value = this.examLocalStorage.keywordSearch;
      this.filterObject = this.examLocalStorage.filter;
      this.classNameFilter = this.examLocalStorage.classNameFilter;
    }
    this.getAll();
    for (let column of this.ExamColumns) {
      if (column.filter) {
        this.optionsConditionFilter.push({id: column.name, name: column.title});
      }
    }
    this.getCreatorExam();
    this.getTypeExam();
    this.getStatusExam();
  }

  /**
   * nvDong
   * This method will return list exams
   * @param {number} currentPage
   */
  getAll() {
    let keywordSearch = this.keywordSearch.nativeElement.value.trim();
    if (keywordSearch !== CommonContstants.EMPTY) {
      keywordSearch = CommonContstants.ADD_PARAM + CommonContstants.KEYWORD_SEARCH + CommonContstants.EQUAL + this.encodeSpecialCharacter(keywordSearch);
    }
    this._dataService.get(ApiConstant.URL_EXAM_GET_LIST_EXAM + CommonContstants.PAGE_NUMBER + this.ConfigTable.currentPage +
      CommonContstants.ADD_PARAM + CommonContstants.SORT_FIELD + CommonContstants.EQUAL +
      this.sortObject.title + CommonContstants.ADD_PARAM + CommonContstants.SORT_TYPE +
      CommonContstants.EQUAL + this.sortObject.sortType + keywordSearch + this.filterObject)
      .subscribe((res: any) => {
        this.ExamRows = res.data;
        this.ConfigTable.totalPage = res.totalPage;
        this.ConfigTable.numberRecordOnPage = res.numberRecordPerPage;
        this.ConfigTable.currentPage = res.pageCurrent;
        this.tableDirectivesComponent.dataCheckBox = [];
        this.tableDirectivesComponent.checked = false;
        this.examLocalStorage = new ExamLocalStorage(this.ConfigTable.currentPage,
          this.sortObject, this.ExamColumns, this.keywordSearch.nativeElement.value, this.filterObject, this.classname.nativeElement.className);
        localStorage.setItem(CommonContstants.EXAM, JSON.stringify(this.examLocalStorage));
        for (let row of this.ExamRows) {
          row.createDate = moment(row.createDate).format(DateTimeConstants.FORMAT_DATE_DDMMYYYY);
        }
      }, error => this._dataService.handleError(error));
  }

  /**
   * NVDong
   * get type exam
   */
  getTypeExam() {
    this._dataService.get(ApiConstant.URL_CATEGORY_QUESTION_GET_ALL).subscribe((res: any) => {
      this.ExamColumns[1].filter.myOptions = [];
      this.ExamColumns[1].filter.myOptions.push({id: '', name: CommonContstants.DEFAULT_TITLE});
      for (let category of res.data) {
        this.ExamColumns[1].filter.myOptions.push({id: category.categoryId, name: category.categoryName});
      }
    }, error => this._dataService.handleError(error));
  }

  /**
   * NVDong
   * get Creator exam
   */
  getCreatorExam() {
    this._dataService.get(ApiConstant.GET_LIST_ACCOUNT).subscribe((res: any) => {
      this.ExamColumns[4].filter.myOptions = [];
      this.ExamColumns[4].filter.myOptions.push({id: '', name: CommonContstants.DEFAULT_TITLE});
      for (let account of res.data) {
        this.ExamColumns[4].filter.myOptions.push({id: account.accountId, name: account.fullname});
      }
    }, error => this._dataService.handleError(error));
  }

  /**
   * NVDong
   * get Status exam
   */
  getStatusExam() {
    this._dataService.get(ApiConstant.URL_EXAM_GET_ALL_STATUS_EXAM).subscribe((res: any) => {
      this.ExamColumns[5].filter.myOptions = [];
      this.ExamColumns[5].filter.myOptions.push({id: '', name: CommonContstants.DEFAULT_TITLE});
      for (let status of res) {
        this.ExamColumns[5].filter.myOptions.push({id: status.statusId, name: status.statusName});
      }
    }, error => this._dataService.handleError(error));
  }

  /**
   * NVDong
   * reload page
   * @param currentPage
   */
  getCurrentPage(currentPage: any) {
    this.ConfigTable.currentPage = currentPage;
    this.getAll();
  }

  /**
   * @creator: nvdong
   * submit form search
   *
   */
  submitSearch() {
    this.ConfigTable.currentPage = CommonContstants.ONE;
    this.getAll();
  }

  /**
   * NVDong
   * this method to sort by column name
   * @param valueSortTableGroup
   */
  onSortTableExam(valueSortTableExam: any) {
    for (let column of this.ExamColumns) {
      if (column.sort.sortType != null) {
        column.sort.sortType = '';
      }
      if (column.name == valueSortTableExam.title) {
        column.sort.sortType = valueSortTableExam.sortType;
      }
    }
    this.sortObject = valueSortTableExam;
    this.ConfigTable.currentPage = CommonContstants.ONE;
    this.getAll();
  }

  /**
   * nvDong
   * This function
   */
  goHome() {
    localStorage.clear();
    this.router.navigate([UrlConstant.URL_HOME_INDEX]);
  }

  /**
   * nvDong
   * This method to encode special character in form
   * @param {string} keyword
   * @returns {string}
   */
  encodeSpecialCharacter(keyword: string) {
    keyword = keyword.trim();
    return (encodeURI(keyword) !== keyword) ? encodeURI(keyword) : encodeURIComponent(keyword);
  }

  /**
   * vdhao
   * This method handle event when checkbox is selected
   * @param values
   */
  onCheckBoxSelected(values: any) {
    this.listExamChecked = '';
    for (let value of values) {
      this.listExamChecked += value.examId + ', ';
    }
    this.listExamChecked = this.listExamChecked.substr(0, this.listExamChecked.length - 2);
  }

  /**
   * vdhao
   * This method handle event when checkbox is selected all
   * @param values
   */
  onCheckBoxSelectedAll(values: any) {
    this.listExamChecked = '';
    for (let value of values) {
      this.listExamChecked += value.examId + ', ';
    }
    this.listExamChecked = this.listExamChecked.substr(0, this.listExamChecked.length - 2);
  }

  /**
   * vdhao
   * This method handle event when icon delete is clicked
   */
  showDeleteExamModal() {
    if (this.tableDirectivesComponent.dataCheckBox.length > 0) {
      this.modalDeleteExam.show();
    }
    else {
      this._notificationService.printErrorMessage(MessageContstants.DELETE_EXAM_ERROR);
    }
  }

  /**
   * this method is used to confirm delete exam
   * vdhao
   */
  onDeleteExam() {
    let numberExamIsDeleted = this.listExamChecked.split(',').length;
    this._dataService.delete(ApiConstant.URL_EXAM_DELETE + this.listExamChecked).subscribe((res) => {
      this._notificationService
        .printSuccessMessage(numberExamIsDeleted > 1 ? numberExamIsDeleted + MessageContstants.DELETE_EXAMS_MESSAGE
          : numberExamIsDeleted + MessageContstants.DELETE_EXAM_MESSAGE);
      this.ConfigTable.currentPage = CommonContstants.ONE;
      this.getAll();
    }, (error) => {
      if (error.status == 422) {
        this._notificationService.printErrorMessage(MessageContstants.DELETE_EXAM_PUBLIC);
      }
      else {
        this._notificationService.printErrorMessage(MessageContstants.DELETE_EXAM_ERROR);
      }
      this.getAll();
    });
    this.modalDeleteExam.hide();
    this.listExamChecked = '';
  }

  /**
   * @creator: vdhao
   *
   * function for event click button cancel Modal delete exam
   * @param func_param
   */
  onCancelModal(func_param) {
    this.modalDeleteExam.hide();
  }

  /**
   * nvDong
   * reset init state
   */
  resetExamTable() {
    this.keywordSearch.nativeElement.value = '';
    for (let columns of this.ExamColumns) {
      if (columns.title !== TitleTable.DATE_CREATE && columns.sort.sortType != null || columns.sort.sortType != '') {
        columns.sort.sortType = '';
      }
      if (columns.title === TitleTable.DATE_CREATE) {
        columns.sort.sortType = CommonContstants.SORT_TYPE_DESC;
      }
    }
    this.filterObject = '';
    this.clear();
    this.sortObject = {title: NameColumns.DATE_CREATE, sortType: CommonContstants.SORT_TYPE_DESC};
    this.ConfigTable.currentPage = CommonContstants.ONE;
    this.getAll();
  }

  /**
   * @author: ntvanh1
   * call this function when click save button
   */
  clickCreate(values: any) {
    this.router.navigate([UrlConstant.URL_CREATE_EXAM]);
  }
}
