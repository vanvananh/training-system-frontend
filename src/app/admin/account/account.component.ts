import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../_core/service/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../_core/service/notification.service';
import {ApiConstant, UrlConstant} from '../../_core/common/url.constants';
import {CommonContstants} from '../../_core/common/common.constants';
import {ClassNameTable, NameColumns, TitleTable} from '../../_core/common/configTable.constant';
import {AccountLocalStorage} from '../../_core/model/AccountLocalStorage';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from '../../_share/dropdown/types';
import {FilterComponent} from '../../_share/filter/filter.component';
import {TableDirectivesComponent} from '../../_share/table-directives/table-directives.component';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  /**khai báo viewChild**/
    // assign component view child for input in the html
  @ViewChild('keywordSearch') public keywordSearch: any;
  @ViewChild(TableDirectivesComponent) public tableDirectivesComponent: TableDirectivesComponent;
  @ViewChild(FilterComponent) public filterComponent: FilterComponent;
  /**kết thúc khai báo viewChild**/
  /**khai báo filter**/
    //dữ liệu cho select option chọn điều kiện filter
    //setting cho department, position
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
  settingDepartment: IMultiSelectSettings = {
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
  settingPosition: IMultiSelectSettings = {
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
  textsDepartment: IMultiSelectTexts = {
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
  textsPosition: IMultiSelectTexts = {
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
  modelDepartment: any = [''];
  modelPosition: any = [''];
  /**khai báo biến dung cho table directive**/
    // config class for the table component
  public configTable: any = {
    className: [ClassNameTable.TABLE_STRIPED, ClassNameTable.TABLE_BORDERED, ClassNameTable.TABLE_JAMBO, ClassNameTable.BULK_ACTION],
    currentPage: CommonContstants.ONE,
    isHiddenCheckBox: true,
    isDetail: true
  };
  // config columns for the table component
  public accountColumn: Array<any> = [
    {
      title: TitleTable.ACCOUNT_USERNAME,
      name: NameColumns.ACCOUNT_USERNAME,
      sizeColumnTable: ClassNameTable.COL_MD_2,
      maxWidth: 150,
      sort: {isSort: true, sortType: CommonContstants.SORT_TYPE_ASC}
    },
    {
      title: TitleTable.ACCOUNT_FULLNAME,
      name: NameColumns.ACCOUNT_FULLNAME,
      sizeColumnTable: ClassNameTable.COL_MD_3,
      maxWidth: 200,
      sort: {isSort: true}
    }
    ,
    {
      title: TitleTable.ACCOUNT_EMAIL,
      name: NameColumns.ACCOUNT_EMAIL,
      sizeColumnTable: ClassNameTable.COL_MD_3,
      maxWidth: 150,
      sort: {isSort: true}
    }
    ,
    {

      title: TitleTable.ACCOUNT_DEPARTMENT,
      name: NameColumns.ACCOUNT_DEPARTMENT,
      sizeColumnTable: ClassNameTable.COL_MD_2,
      maxWidth: 150,
      sort: {isSort: true},
      filter: {
        isFilter: true,
        isMultilSelect: true,
        mySettings: this.settingDepartment,
        myTexts: this.textsDepartment,
        optionModel: this.modelDepartment
      }
    },
    {
      title: TitleTable.ACCOUNT_POSITION,
      name: NameColumns.ACCOUNT_POSITION,
      sizeColumnTable: ClassNameTable.COL_MD_2,
      maxWidth: 150,
      sort: {isSort: true},
      filter: {
        isFilter: true,
        isMultilSelect: true,
        mySettings: this.settingPosition,
        myTexts: this.textsPosition,
        optionModel: this.modelPosition
      }
    }
  ];
  //data column for table
  public dataAccount: any;
  /**kết thúc khai báo biến dung cho table directive**/
  /**khai báo biến dùng trong class**/
    // default soft object to store the sort field and sort type
  public sortObject: any = {title: NameColumns.ACCOUNT_USERNAME, sortType: CommonContstants.SORT_TYPE_ASC};

  // declare variable localStorage
  public accountLocalStorage: AccountLocalStorage;
  public modelConditionFilter: any = [NameColumns.ACCOUNT_DEPARTMENT, NameColumns.ACCOUNT_POSITION];
  public filterObject: any = '';

  /**
   * description: this function change condition of filter.
   *
   * @Creator:lhdoan
   */
  onChangeConditionFilter() {
    for (let column of this.accountColumn) {
      if (column.filter) {
        column.filter.isFilter = false;
      }
      for (let value of this.modelConditionFilter) {
        if (column.name == value) {
          column.filter.isFilter = true;
        }
      }
    }
  }

  filter() {
    this.filterObject = '';
    for (let filter of this.filterComponent.setFilterObject()) {
      this.filterObject = this.filterObject + '&' + filter.filterFiled + '=' + filter.value;
    }
    this.getAll();
    this.filterComponent.filterObject = [];
  }

  /**
   * description: this function clear inputs filter.
   *
   * @Creator:lhdoan
   */
  Clear() {
    for (let column of this.accountColumn) {
      if (column.filter) {
        if (column.filter.isFilter && column.filter.isMultilSelect) {
          column.filter.optionModel = [];
        }
        if (column.filter.isFilter && column.filter.isDate) {
          column.filter.chosenDate = {
            start: moment().subtract(3, 'day'),
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

  /**kết thúc khai báo biến dùng trong class**/
  constructor(private _dataService: DataService, private router: Router,
              private activatedRoute: ActivatedRoute, private _notificationService: NotificationService) {
  }

  // run when first load page
  // set default value for the search form
  ngOnInit() {
    window.scrollTo(0, 0);
    if (localStorage.getItem(CommonContstants.ACCOUNT) != null) {
      this.accountLocalStorage = JSON.parse(localStorage.getItem(CommonContstants.ACCOUNT));
      this.sortObject = this.accountLocalStorage.sortObjectTable;
      this.accountColumn = this.accountLocalStorage.columns;
      this.configTable.currentPage = this.accountLocalStorage.currentPage;
      this.keywordSearch.nativeElement.value = this.accountLocalStorage.keywordSearch;
      this.filterObject = this.accountLocalStorage.filter;
    }
    this.getAll();
    this.getDepartment();
    this.getPosition();
  }

  /**
   * nhanh3
   * description: it will return list account (user get() from dataservice take keyword, sortObject)
   */
  getAll() {
    const searchText = (this.keywordSearch.nativeElement.value.trim() !== CommonContstants.EMPTY) ?
      CommonContstants.ADD_PARAM + CommonContstants.KEYWORD_SEARCH + CommonContstants.EQUAL +
      this.encodeSpecialCharacter(this.keywordSearch.nativeElement.value) : CommonContstants.EMPTY;
    this._dataService.get(ApiConstant.GET_LIST_ACCOUNT + CommonContstants.PAGE_NUMBER + this.configTable.currentPage +
      CommonContstants.ADD_PARAM + CommonContstants.SORT_FIELD + CommonContstants.EQUAL + this.sortObject.title +
      CommonContstants.ADD_PARAM + CommonContstants.SORT_TYPE + CommonContstants.EQUAL + this.sortObject.sortType +
      searchText + this.filterObject
    ).subscribe((res: any) => {
      this.dataAccount = res.data;
      this.configTable.totalPage = res.totalPage;
      this.configTable.numberRecordOnPage = res.numberRecordPerPage;
      this.configTable.currentPage = res.pageCurrent;
      this.accountLocalStorage = new AccountLocalStorage(this.configTable.currentPage,
        this.sortObject, this.accountColumn, this.keywordSearch.nativeElement.value, this.filterObject);
      localStorage.setItem(CommonContstants.ACCOUNT, JSON.stringify(this.accountLocalStorage));
    }, error => this._dataService.handleError(error));

  }

  /**
   * nhanh3
   * description: it will return list department
   */
  getDepartment() {
    this._dataService.get('/api/department/getAll').subscribe((res: any) => {
      this.accountColumn[3].filter.myOptions = [];
      this.accountColumn[3].filter.myOptions.push({id: '', name: 'Select All'});
      for (let department of res) {
        this.accountColumn[3].filter.myOptions.push({id: department.departmentId, name: department.departmentName});
      }
    }, error => this._dataService.handleError(error));
  }

  /**
   * nhanh3
   * description: it will return list position
   */
  getPosition() {
    this._dataService.get('/api/position/getAll').subscribe((res: any) => {
      this.accountColumn[4].filter.myOptions = [];
      this.accountColumn[4].filter.myOptions.push({id: '', name: 'Select All'});
      for (let position of res) {
        // this.optionCategory.push({id: category.categoryId, name: category.categoryName});
        this.accountColumn[4].filter.myOptions.push({id: position.positionId, name: position.positionName});
      }
    }, error => this._dataService.handleError(error));
  }

  // lấy trang hiện tại
  getCurrentPage(currentPage: any) {
    this.configTable.currentPage = currentPage;
    this.getAll();
  }

  /**
   * author: lhdoan
   * @param valueSortTableAccount
   */

  onSortTableAccount(valueSortTableAccount: any) {
    for (let column of this.accountColumn) {
      if (column.sort.sortType != null) {
        column.sort.sortType = '';
      }
      if (column.name == valueSortTableAccount.title) {
        column.sort.sortType = valueSortTableAccount.sortType;
      }
    }
    this.sortObject = valueSortTableAccount;
    this.configTable.currentPage = CommonContstants.ONE;
    this.getAll();
  }

  onCellClick(values: any) {
    this.router.navigate([ApiConstant.URL_ACCOUNT_DETAIL, values.row.accountId]);
  }

  /**
   * author: nhanh3
   * get all account after submit search form
   */
  submitSearch() {
    this.configTable.currentPage = CommonContstants.ONE;
    this.getAll();
  }

  /**
   * author: nhanh3
   * This will encode all special character to serve can understand
   * @param {string} keyword
   * @returns {string} keyword already encode
   */
  encodeSpecialCharacter(keyword: string) {
    keyword = keyword.trim();
    return (encodeURI(keyword) !== keyword) ? encodeURI(keyword) : encodeURIComponent(keyword);
  }

  resetAccountTable() {
    this.keywordSearch.nativeElement.value = '';
    for (let columns of this.accountColumn) {
      if (columns.title !== TitleTable.ACCOUNT_USERNAME && columns.sort.sortType != null || columns.sort.sortType !== '') {
        columns.sort.sortType = '';
      }
      if (columns.title === TitleTable.ACCOUNT_USERNAME) {
        columns.sort.sortType = CommonContstants.SORT_TYPE_ASC;
      }
    }
    this.filterObject = '';
    this.Clear();
    this.modelConditionFilter = [NameColumns.ACCOUNT_DEPARTMENT, NameColumns.ACCOUNT_POSITION];
    this.onChangeConditionFilter();
    this.sortObject = {title: NameColumns.ACCOUNT_USERNAME, sortType: CommonContstants.SORT_TYPE_ASC};
    this.configTable.currentPage = CommonContstants.ONE;
    this.getAll();
  }

  /**
   * get change from filter
   * @author nvangoc
   * @param value
   */
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
   * author: nhanh3
   * This will back to home
   */
  goHome() {
    localStorage.clear();
    this.router.navigate([UrlConstant.URL_HOME_INDEX]);
  }

}
