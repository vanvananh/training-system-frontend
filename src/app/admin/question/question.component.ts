import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassNameTable, NameColumns, TitleTable} from '../../_core/common/configTable.constant';
import {DataService} from '../../_core/service/data.service';
import {NotificationService} from '../../_core/service/notification.service';
import {CommonContstants} from '../../_core/common/common.constants';
import {ApiConstant, UrlConstant} from '../../_core/common/url.constants';
import {DateRangePiker, DateTimeConstants} from '../../_core/common/datetime.constants';
import {QuestionLocalStorage} from '../../_core/model/QuestionLocalStorage';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {TableDirectivesComponent} from '../../_share/table-directives/table-directives.component';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from '../../_share/dropdown/types';
import {FilterComponent} from '../../_share/filter/filter.component';
import {MessageContstants} from '../../_core/common/message.constants';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  /**khai báo viewChild**/
    // assign component view child for input in the html
  @ViewChild('keywordSearch') public keywordSearch: any;
  @ViewChild('modalDeleteQuestion') public modalDeleteQuestion: ModalDirective;
  @ViewChild(TableDirectivesComponent) public tableDirectivesComponent: TableDirectivesComponent;
  @ViewChild(FilterComponent) public filterComponent: FilterComponent;
  @ViewChild('collapse') public classname: any;
  /**kết thúc khai báo viewChild**/

  /**khai báo filter**/
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
  //text hiển thị cho select option category
  texts: IMultiSelectTexts = {
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
  //dữ liệ được select của category,level,type,creator
  modelCategoryQuestion: any = [''];
  modelTypeQuestion: any = [''];
  modelLevelQuestion: any = [''];
  modelCreatorQuestion: any = [''];

  public chosenDate: any = {
    start: moment('01/01/2018', 'DD/MM/YYYY'),
    end: moment(),
  };
  /**ket thuc khai báo filter*/


  /**khai báo biến dung cho table directive**/
    // config class for the table component
  public configTable: any = {
    className: [ClassNameTable.TABLE_STRIPED, ClassNameTable.TABLE_BORDERED, ClassNameTable.TABLE_JAMBO, ClassNameTable.BULK_ACTION],
    currentPage: CommonContstants.ONE,
    isDetail: true
  };
  // config columns for the table component
  public questionColumn: Array<any> = [
    {
      title: TitleTable.QUESTION_CONTENT,
      name: NameColumns.QUESTION_CONTENT,
      sizeColumnTable: ClassNameTable.COL_MD_4,
      maxWidth: 150
    },
    {
      title: TitleTable.CATEGORY_QUESTION,
      name: NameColumns.CATEGORY_QUESTION,
      sizeColumnTable: ClassNameTable.COL_MD_2,
      maxWidth: 200,
      sort: {isSort: true},
      filter: {
        isFilter: true,
        isMultilSelect: true,
        mySettings: this.settingCategory,
        myTexts: this.texts,
        optionModel: this.modelCategoryQuestion
      }
    }
    ,
    {
      title: TitleTable.LEVEL_QUESTION,
      name: NameColumns.LEVEL_QUESTION,
      sizeColumnTable: ClassNameTable.COL_MD_1,
      maxWidth: 150,
      filter: {
        isFilter: true,
        isMultilSelect: true,
        mySettings: this.settings,
        myTexts: this.texts,
        optionModel: this.modelLevelQuestion
      }
    }
    ,
    {

      title: TitleTable.TYPE_QUESTION,
      name: NameColumns.TYPE_QUESTION,
      sizeColumnTable: ClassNameTable.COL_MD_1,
      maxWidth: 150,
      sort: {isSort: true},
      filter: {
        isFilter: true,
        isMultilSelect: true,
        mySettings: this.settings,
        myTexts: this.texts,
        optionModel: this.modelTypeQuestion
      }
    },
    {
      title: TitleTable.CREATOR,
      name: NameColumns.CATEGORY_QUESTION_CREATOR,
      sizeColumnTable: ClassNameTable.COL_MD_2,
      maxWidth: 150,
      sort: {isSort: true},
      filter: {
        isFilter: true,
        isMultilSelect: true,
        mySettings: this.settings,
        myTexts: this.texts,
        optionModel: this.modelCreatorQuestion
      }
    },
    {
      title: TitleTable.DATE_CREATE,
      name: NameColumns.DATE_CREATE,
      sizeColumnTable: ClassNameTable.COL_MD_2,
      maxWidth: 150,
      sort: {isSort: true, sortType: CommonContstants.SORT_TYPE_DESC},
      filter: {isFilter: true, isDate: true, chosenDate: this.chosenDate}
    }
  ];

  /**kết thúc khai báo biến dung cho table directive**/

  /**khai báo biến dùng trong class**/
    // default soft object to store the sort field and sort type
  public sortObject: any = {title: NameColumns.DATE_CREATE, sortType: CommonContstants.SORT_TYPE_DESC};
  // declare variable localStorage
  public questionLocalStorage: QuestionLocalStorage;
  // list group for delete
  public listQuestionChecked: String = '';
  public filterObject: any = '';
  public classNameFilter = 'collapse';


  /**kết thúc khai báo biến dùng trong class**/

  constructor(private _dataService: DataService, private router: Router,
              private activatedRoute: ActivatedRoute, private _notificationService: NotificationService) {
  }

  // run when first load page
  // set default value for the search form
  ngOnInit() {
    window.scrollTo(0, 0);
    if (localStorage.getItem(CommonContstants.QUESTION) != null) {
      this.questionLocalStorage = JSON.parse(localStorage.getItem(CommonContstants.QUESTION));
      this.sortObject = this.questionLocalStorage.sortObjectTable;
      this.questionColumn = this.questionLocalStorage.columns;
      this.configTable.currentPage = this.questionLocalStorage.currentPage;
      this.keywordSearch.nativeElement.value = this.questionLocalStorage.keywordSearch;
      this.filterObject = this.questionLocalStorage.filter;
      this.classNameFilter = this.questionLocalStorage.classNameFilter;
    }

    this.getAll();
    this.getCategoryQuestion();
    this.getLevelQuestion();
    this.getTypeQuestion();
    this.getCreatorQuestion();
  }

  // data column for table
  public dataQuestion: any;

  /**
   * description: it will return list question (user get() from dataservice take keyword, sortObject)
   *
   * @Creator:lhdoan
   */
  getAll() {
    const searchText = (this.keywordSearch.nativeElement.value.trim() !== CommonContstants.EMPTY) ?
      CommonContstants.ADD_PARAM + CommonContstants.KEYWORD_SEARCH + CommonContstants.EQUAL +
      this.encodeSpecialCharacter(this.keywordSearch.nativeElement.value) : CommonContstants.EMPTY;
    this._dataService.get(ApiConstant.API_QUESTION_GET_ALL + CommonContstants.PAGE_NUMBER + this.configTable.currentPage +
      CommonContstants.ADD_PARAM + CommonContstants.SORT_FIELD + CommonContstants.EQUAL + this.sortObject.title +
      CommonContstants.ADD_PARAM + CommonContstants.SORT_TYPE + CommonContstants.EQUAL + this.sortObject.sortType +
      searchText + this.filterObject
    ).subscribe((res: any) => {
      this.dataQuestion = res.data;
      this.configTable.totalPage = res.totalPage;
      this.configTable.numberRecordOnPage = res.numberRecordPerPage;
      this.configTable.currentPage = res.pageCurrent;
      for (let row of this.dataQuestion) {
        row.createDate = moment(row.createDate).format(DateTimeConstants.FORMAT_DATE_DDMMYYYY);
      }
      this.tableDirectivesComponent.dataCheckBox = [];
      this.tableDirectivesComponent.checked = false;
      this.questionLocalStorage = new QuestionLocalStorage(this.configTable.currentPage,
        this.sortObject, this.questionColumn, this.keywordSearch.nativeElement.value, this.filterObject,
        this.classname.nativeElement.className);
      localStorage.setItem(CommonContstants.QUESTION, JSON.stringify(this.questionLocalStorage));
    }, error => this._dataService.handleError(error));

  }

  /**
   * description: it will return list category question.
   *
   * @Creator:lhdoan
   */
  getCategoryQuestion() {
    this._dataService.get('/api/categoryQuestion/getAll').subscribe((res: any) => {
      this.questionColumn[1].filter.myOptions = [];
      this.questionColumn[1].filter.myOptions.push({id: '', name: 'Select All'});
      for (let category of res.data) {
        this.questionColumn[1].filter.myOptions.push({id: category.categoryId, name: category.categoryName});
      }
    }, error => this._dataService.handleError(error));
  }

  /**
   * description: it will return list type question.
   *
   * @Creator:lhdoan
   */
  getTypeQuestion() {
    this._dataService.get('/api/questionAnswer/getAllTypeQuestion').subscribe((res: any) => {
      this.questionColumn[3].filter.myOptions = [];
      this.questionColumn[3].filter.myOptions.push({id: '', name: 'Select All'});
      for (let type of res) {
        this.questionColumn[3].filter.myOptions.push({id: type.typeId, name: type.typeName});
      }
    }, error => this._dataService.handleError(error));
  }

  /**
   * description: it will return list level question.
   *
   * @Creator:lhdoan
   */
  getLevelQuestion() {
    this._dataService.get('/api/levelquestion/getAll').subscribe((res: any) => {
      this.questionColumn[2].filter.myOptions = [];
      this.questionColumn[2].filter.myOptions.push({id: '', name: 'Select All'});
      for (let level of res) {
        this.questionColumn[2].filter.myOptions.push({id: level.levelId, name: level.levelName});
      }
    }, error => this._dataService.handleError(error));
  }

  /**
   * description: it will return list creator question.
   *
   * @Creator:lhdoan
   */
  getCreatorQuestion() {
    this._dataService.get('/api/account/getAll').subscribe((res: any) => {
      this.questionColumn[4].filter.myOptions = [];
      this.questionColumn[4].filter.myOptions.push({id: '', name: 'Select All'});
      for (let cretor of res.data) {
        this.questionColumn[4].filter.myOptions.push({id: cretor.accountId, name: cretor.fullname});
      }
    }, error => this._dataService.handleError(error));
  }

  /**
   * description: this function clear inputs filter.
   *
   * @Creator:lhdoan
   */
  Clear() {
    for (let column of this.questionColumn) {
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
          column.filter.inputMinimun = '';
          column.filter.inputMaximun = '';
        }
      }
    }
  }

  onChangedValue(value) {
    console.log(value);
    this.filterObject = '';
    for (let filter of value) {
      if (filter.value != '') {
        this.filterObject = this.filterObject + '&' + filter.filterFiled + '=' + filter.value;
      }
    }
    this.getAll();
  }

  /**
   * This method get keywordSearch.
   *
   * @creator: lhdoan
   */
  submitSearch() {
    this.configTable.currentPage = CommonContstants.ONE;
    this.getAll();
  }

  /**
   * @creator: lhdoan
   */
  resetQuestionTable() {
    this.keywordSearch.nativeElement.value = '';

    for (let column of this.questionColumn) {
      if (column.sort != undefined) {
        if (column.title !== TitleTable.DATE_CREATE && column.sort.sortType != null || column.sort.sortType != '') {
          column.sort.sortType = '';
        }
        if (column.title === TitleTable.DATE_CREATE) {
          column.sort.sortType = CommonContstants.SORT_TYPE_DESC;
        }
      }
    }
    this.filterObject = '';
    this.Clear();
    this.sortObject = {title: NameColumns.DATE_CREATE, sortType: CommonContstants.SORT_TYPE_DESC};
    this.configTable.currentPage = CommonContstants.ONE;
    this.getAll();
  }

  /**
   * This method go back to homepage.
   * @create: lhdoan
   */
  goHome() {
    localStorage.clear();
    this.router.navigate([UrlConstant.URL_HOME_INDEX]);
  }

  /**
   * This method encode special character.
   *
   * @cretor: lhdoan
   * @param {string} keyword
   * @returns {string}
   */
  encodeSpecialCharacter(keyword: string) {
    keyword = keyword.trim();
    return (encodeURI(keyword) !== keyword) ? encodeURI(keyword) : encodeURIComponent(keyword);
  }

  /**Method table derictive**/

  /**
   * This method get current page.
   *
   * @creator:lhdoan
   * @param currentPage
   */
  getCurrentPage(currentPage: any) {
    this.configTable.currentPage = currentPage;
    this.getAll();
  }

  /**
   * This method get sortField and sortType
   *
   * @creator: lhdoan
   * @param valueSortTableQuestion
   */

  onSortTableAccount(valueSortTableQuestion: any) {
    for (let column of this.questionColumn) {
      if (column.sort != undefined) {
        if (column.sort.sortType != null) {
          column.sort.sortType = '';
        }
        if (column.name == valueSortTableQuestion.title) {
          column.sort.sortType = valueSortTableQuestion.sortType;
        }
      }
    }
    this.sortObject = valueSortTableQuestion;
    this.configTable.currentPage = CommonContstants.ONE;
    this.getAll();
  }

  /**
   * This method get column was clicked.
   *
   * @Creator: lhdoan
   * @param values
   */
  onCellClick(values: any) {
    // this.router.navigate([ApiConstant.URL_ACCOUNT_DETAIL, values.column.accountId]);
  }

  formatListId(values) {
    this.listQuestionChecked = CommonContstants.EMPTY;
    for (let value of values) {
      this.listQuestionChecked += value.questionId + CommonContstants.COMMA;
    }
    this.listQuestionChecked = this.listQuestionChecked.substr(CommonContstants.ZERO, this.listQuestionChecked.length - 1);
  }

  showDeleteQuestionModal() {
    this.modalDeleteQuestion.show();
  }

  onCancelModal(func_param) {
    this.modalDeleteQuestion.hide();
  }


  /**
   * author: nhanh3
   * This reassign listGroupChecked get list id after check
   */
  onCheckBoxChanged(values: any) {
    this.formatListId(values);
  }

  /**
   * author: nhanh3
   * check all records in current page to delete all records in current page
   */
  onCheckBoxChangedAll(values: any) {
    this.formatListId(values);
  }

  /**End Method table derictive**/
  /**
   * @creator: nhanh3
   *
   * function delete list questions by list question_id
   */
  onDeleteQuestion() {
    let temp = this.listQuestionChecked.split(',').length;
    this._dataService.delete(ApiConstant.API_DELETE_QUESTION + '?id=' + this.listQuestionChecked).subscribe((res) => {
      this._notificationService.printSuccessMessage(temp > 1 ? temp + MessageContstants.DELETE_QUESTIONS
        : temp + MessageContstants.DELETE_QUESTION);
      this.configTable.currentPage = CommonContstants.ONE;
      this.getAll();
      this.tableDirectivesComponent.dataCheckBox = [];
      this.tableDirectivesComponent.checked = false;
    }, (error) => {
      this._notificationService.printErrorMessage(error.error.message);
    });
    this.modalDeleteQuestion.hide();
    this.listQuestionChecked = CommonContstants.EMPTY;
  }

  onClickCreateQuestion() {
    this.router.navigate([UrlConstant.URL_GROUP_CREATE]);
  }
}
