import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NotificationService} from '../../../_core/service/notification.service';
import {DataService} from '../../../_core/service/data.service';
import {ApiConstant, UrlConstant} from '../../../_core/common/url.constants';
import {ClassNameTable, NameColumns, TitleTable} from '../../../_core/common/configTable.constant';
import {CommonContstants} from '../../../_core/common/common.constants';
import {UserData} from '../../../_core/Fake-data/user.data';
import {MessageContstants} from '../../../_core/common/message.constants';
import {GroupDetailLocalStorage} from '../../../_core/model/GroupDetailLocalStorage';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from '../../../_share/dropdown/types';
import {FilterComponent} from '../../../_share/filter/filter.component';
import {TableDirectivesComponent} from '../../../_share/table-directives/table-directives.component';
import {GroupLocalStorage} from '../../../_core/model/GroupLocalStorage';
import {DateRangePiker, DateTimeConstants} from '../../../_core/common/datetime.constants';
import {AccountLocalStorage} from '../../../_core/model/AccountLocalStorage';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  //Khai báo modal
  @ViewChild('modalUpdateAccount') public modalUpdateAccount: ModalDirective;
  @ViewChild('keywordSearch') public keywordSearch: any;
  @ViewChild('tableAccKeywordInputSearch') public tableAccKeywordInputSearch: any;
  @ViewChild(TableDirectivesComponent) public tableDirectivesComponent: TableDirectivesComponent;
  @ViewChild(FilterComponent) public filterComponent: FilterComponent;

  /**khai báo filter**/
    //settings condition filter
  settingsConditionFilter: IMultiSelectSettings = {
    enableSearch: false,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-circle btn-primary btn-sm',
    dynamicTitleMaxItems: 0,
    displayAllSelectedText: true,
    showCheckAll: true,
    showUncheckAll: true,
    closeOnClickOutside: true,
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
  settingDepartment: IMultiSelectSettings = {
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
  settingPosition: IMultiSelectSettings = {
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
  /**
   * creator: ntgiang1
   * declare view child modal update group name and update group name form
   */
  @ViewChild('modalUpdateGroupName') public modalUpdateGroupName: ModalDirective;
  @ViewChild('formUpdateGroupName') public formUpdateGroupName: any;
  @ViewChild('inputGroupName') public inputGroupName: any;

  public config: any = {
    className: [ClassNameTable.TABLE_STRIPED, ClassNameTable.TABLE_BORDERED, ClassNameTable.TABLE_JAMBO, ClassNameTable.BULK_ACTION],
    currentPage: CommonContstants.ONE,
    isHiddenCheckBox: true
  };
  public columnTableAccOnGroup: Array<any> = [
    {
      title: TitleTable.ACCOUNT_USERNAME,
      name: NameColumns.ACCOUNT_USERNAME,
      sizeColumnTable: ClassNameTable.COL_MD_2,
      maxWidth: 150,
      sort: {isSort: true}
    },
    {
      title: TitleTable.ACCOUNT_FULLNAME,
      name: NameColumns.ACCOUNT_FULLNAME,
      sizeColumnTable: ClassNameTable.COL_MD_2,
      maxWidth: 200,
      sort: {isSort: true}
    },
    {
      title: TitleTable.ACCOUNT_EMAIL,
      name: NameColumns.ACCOUNT_EMAIL,
      sizeColumnTable: ClassNameTable.COL_MD_2,
      maxWidth: 150,
      sort: {isSort: true}
    },
    {
      title: TitleTable.ACCOUNT_DEPARTMENT,
      name: NameColumns.ACCOUNT_OF_GROUP_DEPARTMENT,
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
      name: NameColumns.ACCOUNT_OF_GROUP_POSITION,
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
    },
    {
      title: TitleTable.DATE_JOINED,
      name: NameColumns.DATE_JOINED,
      sizeColumnTable: ClassNameTable.COL_MD_2,
      maxWidth: 150,
      sort: {isSort: true, sortType: CommonContstants.SORT_TYPE_DESC},
      filter: {isFilter: true, isDate: true, mySettings: this.picker, chosenDate: this.chosenDate}
    }
  ];
  public dataTableAccOnGroup: any;

  public sortObject: any = {};
  public groupDetailLocalStorage: GroupDetailLocalStorage;
  public groupDetailData: any = {};
  public res_error_group_exits: string = '';
  public listAccountData: any = {};

  public groupId: any;
  public user = this._currentUser.getUser();
  public groupUpdate: any = {};
  public isChecked: any;
  /**
   * nvangoc
   */
    // this variable will show no record on search account in update group
  public isNoRecord: boolean;
  // this variable will receive data from db by search
  public resultsSearch: any = [];
  public listAccountsOfGroup: any = {};
  public originalListAccountsOfGroup: any = {};
  public totalMemberOfGroup: number = 0;
  public listAccountWantToInsertOrRemove: any = [];
  /**
   * creator: ntgiang1
   * message error when check form update group name
   */
  public res_error: String;
  public groupName_require: String;
  public groupName_maxlength: String;
  public groupName_regex: String;
  // declare variable localStorage
  public accountLocalStorage: GroupLocalStorage;
  public modelConditionFilter: any = [NameColumns.ACCOUNT_OF_GROUP_DEPARTMENT, NameColumns.ACCOUNT_OF_GROUP_POSITION, NameColumns.DATE_JOINED];
  public filterObject: any = '';

  /**
   * description: this function change condition of filter.
   *
   * @Creator:lhdoan
   */
  onChangeConditionFilter() {
    for (let column of this.columnTableAccOnGroup) {
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
    /*this.filterObject = '';
    console.log("Filter component ================");
    console.log(this.filterComponent);
    console.log(this.filterComponent.setFilterObject());
    for (let filter of this.filterComponent.setFilterObject()) {
      this.filterObject = this.filterObject + '&' + filter.filterFiled + '=' + filter.value;
    }
    this.getListAccountFromID();
    this.filterComponent.filterObject = [];*/

    this.filterObject = '';
    for (let filter of this.filterComponent.setFilterObject()) {
      this.filterObject = this.filterObject + '&' + filter.filterFiled + '=' + filter.value;
    }
    this.getListAccountFromID();
    this.filterComponent.filterObject = [];
  }

  /**
   * description: this function clear inputs filter.
   *
   * @Creator:lhdoan
   */
  Clear() {
    for (let column of this.columnTableAccOnGroup) {
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


  constructor(private _dataService: DataService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _notificationService: NotificationService,
              private _currentUser: UserData) {

  }

  /**
   * this function init screen
   * @author nvdong
   * @date 06/02/2018
   */
  ngOnInit() {
    window.scrollTo(0, 0);
    this.sortObject = {
      title: CommonContstants.SORT_FIELD_DEFAULT_GROUP_DETAIL,
      sortType: CommonContstants.SORT_TYPE_DESC
    };
    if (localStorage.getItem(CommonContstants.GROUP_DETAIL) != null) {
      this.groupDetailLocalStorage = JSON.parse(localStorage.getItem(CommonContstants.GROUP_DETAIL));
      this.sortObject = this.groupDetailLocalStorage.sortObjectTable;
      this.columnTableAccOnGroup = this.groupDetailLocalStorage.columns;
      this.config.currentPage = this.groupDetailLocalStorage.currentPage;
      this.tableAccKeywordInputSearch.nativeElement.value = this.groupDetailLocalStorage.keywordSearch;
      this.filterObject = this.groupDetailLocalStorage.filter;
    }
    this.activatedRoute.params.subscribe((params: Params) => {
      this.groupId = params[CommonContstants.GROUP_ID];
    });
    this.getDetailFromID();
    this.getListAccountFromID();
    for (let column of this.columnTableAccOnGroup) {
      if (column.filter) {
        this.optionsConditionFilter.push({id: column.name, name: column.title});
      }
    }
    this.getDepartment();
    this.getPosition();
  }

  /**
   * nhanh3
   * description: it will return list department
   */
  getDepartment() {
    this._dataService.get('/api/department/getAll').subscribe((res: any) => {
      this.columnTableAccOnGroup[3].filter.myOptions = [];
      this.columnTableAccOnGroup[3].filter.myOptions.push({id: '', name: 'Select All'});
      for (let department of res) {
        this.columnTableAccOnGroup[3].filter.myOptions.push({
          id: department.departmentId,
          name: department.departmentName
        });
      }
    }, error => this._dataService.handleError(error));
  }

  /**
   * nhanh3
   * description: it will return list position
   */
  getPosition() {
    this._dataService.get('/api/position/getAll').subscribe((res: any) => {
      this.columnTableAccOnGroup[4].filter.myOptions = [];
      this.columnTableAccOnGroup[4].filter.myOptions.push({id: '', name: 'Select All'});
      for (let position of res) {
        // this.optionCategory.push({id: category.categoryId, name: category.categoryName});
        this.columnTableAccOnGroup[4].filter.myOptions.push({id: position.positionId, name: position.positionName});
      }
    }, error => this._dataService.handleError(error));
  }

  /**
   * this function get current page, reset data on page
   * @author nvdong
   * @date 06/02/2018
   */
  getCurrentPageTableAccountOnGroup(currentPageAccountOfGroup: any) {
    this.config.currentPage = currentPageAccountOfGroup;
    this.getListAccountFromID();
  }

  /**
   * this function sort data of table by sort field
   * @author nvdong
   * @date 06/02/2018
   */
  onSortTableAccountOnGroup(valueSortTableAccount: any) {
    for (let column of this.columnTableAccOnGroup) {
      if (column.sort.sortType != null) {
        column.sort.sortType = '';
      }
      if (column.name == valueSortTableAccount.title) {
        column.sort.sortType = valueSortTableAccount.sortType;
      }
    }
    this.sortObject = valueSortTableAccount;
    this.config.currentPage = CommonContstants.ONE;
    this.getListAccountFromID();
  }

  /**
   * this function get detail of group from id
   * @author nvdong
   * @date 06/02/2018
   */
  getDetailFromID() {
    this._dataService.get(ApiConstant.URL_GROUP_GET_DETAIL_GROUP_BY_ID + this.groupId)
      .subscribe((res: any) => {
        this.groupDetailData = res;
        this.groupDetailData.createDate = moment(this.groupDetailData.createDate).format(DateTimeConstants.FORMAT_DATE_DDMMYYYY);
      }, error => {
        this._dataService.handleError(error);
        switch (error.status) {
          case 422:
            this.res_error_group_exits = MessageContstants.GROUP_NOT_EXITS;
            break;
          default:
            this.res_error_group_exits = MessageContstants.ERROR_DEFAULT;
            break;
        }
      });
  }

  /**
   * this function get list account of group from id
   * @author nvdong
   * @date 06/02/2018
   */
  getListAccountFromID() {
    let searchText: string;
    searchText = '';
    if (this.tableAccKeywordInputSearch.nativeElement.value.trim() !== CommonContstants.EMPTY) {
      searchText = CommonContstants.ADD_PARAM
        + CommonContstants.KEYWORD_SEARCH + CommonContstants.EQUAL
        + this.encodeSpecialCharacter(this.tableAccKeywordInputSearch.nativeElement.value.trim());
    }
    this._dataService.get(
      ApiConstant.URL_ACCOUNT_GET_LIST_ACCOUNT_BY_ID + this.groupId
      + CommonContstants.PAGE_NUMBER_GROUP_DETAIL + this.config.currentPage
      + CommonContstants.SORT_FIELD_GROUP_DETAIL + this.sortObject.title
      + CommonContstants.SORT_TYPE_GROUP_DETAIL + this.sortObject.sortType
      + searchText + this.filterObject
    ).subscribe((res: any) => {
      this.listAccountData = res;
      this.config.totalPage = res.totalPage;
      this.config.numberRecordOnPage = res.numberRecordPerPage;
      this.config.currentPage = res.pageCurrent;
      this.dataTableAccOnGroup = res.data;
      this.groupDetailLocalStorage = new GroupDetailLocalStorage(this.config.currentPage,
        this.sortObject, this.columnTableAccOnGroup, this.tableAccKeywordInputSearch.nativeElement.value, this.filterObject);
      localStorage.setItem(CommonContstants.GROUP_DETAIL, JSON.stringify(this.groupDetailLocalStorage));
      for (let row of this.dataTableAccOnGroup) {
        row.joinDate = moment(row.joinDate).format(DateTimeConstants.FORMAT_DATE_DDMMYYYY);
      }
    }, error => this._dataService.handleError(error));
  }

  /**
   * get account of group
   * @author nvangoc
   * @date 05/03/2018
   */
  getAccountOfGroup() {
    this._dataService.get(ApiConstant.GET_LIST_ACC_OF_GROUP + this.groupId).subscribe((res: any) => {
      this.listAccountsOfGroup = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < this.listAccountsOfGroup.length; i++) {
        this.listAccountsOfGroup[i].joinedDate =
          moment(this.listAccountsOfGroup[i].joinedDate).format(DateTimeConstants.FORMAT_DATE_DDMMYYYY);
        this.listAccountsOfGroup[i].existInGroup = true;
      }
      this.originalListAccountsOfGroup = JSON.parse(JSON.stringify(res));
      this.totalMemberOfGroup = res.length;
    }, error => this._dataService.handleError(error));
  }

  /**
   * get account by search
   * @author nvangoc
   * @param {string} keyword
   * @date 03/02/2018
   */
  getAccountBySearch(keyword: string) {
    this._dataService.get(ApiConstant.URL_ACCOUNT_GET_BY_SEARCH + keyword).subscribe((res: any) => {
      this.resultsSearch = JSON.parse(JSON.stringify(res));
      for (let account of this.listAccountsOfGroup) {
        for (let resultSearch of this.resultsSearch) {
          if ((resultSearch.accountId == account.accountId) && account.existInGroup) {
            resultSearch.existInGroup = true;
            break;
          }
        }
      }
      this.isNoRecord = !(this.resultsSearch.length != 0);
    }, error => this._dataService.handleError(error));
  }

  /**
   * this function will add or remove account of group from result search
   * @author nvangoc
   * @param accountClickFromResultSearch
   */
  addRemoveAccountToGroup(accountClickFromResultSearch) {
    if (accountClickFromResultSearch.existInGroup) {
      for (let account of this.listAccountsOfGroup) {
        if (account.accountId == accountClickFromResultSearch.accountId) {
          account.existInGroup = false;
          break;
        }
      }
      accountClickFromResultSearch.existInGroup = false;
      this.totalMemberOfGroup -= 1;
    } else {
      if (this.checkObjectWasExistedInList(accountClickFromResultSearch, this.listAccountsOfGroup)) {
        for (let account of this.listAccountsOfGroup) {
          if (account.accountId == accountClickFromResultSearch.accountId) {
            account.existInGroup = true;
            break;
          }
        }
        accountClickFromResultSearch.existInGroup = true;
        this.totalMemberOfGroup += 1;
      } else {
        accountClickFromResultSearch.existInGroup = true;
        accountClickFromResultSearch.joinedDate = moment(new Date()).format(DateTimeConstants.FORMAT_DATE_DDMMYYYY);
        this.listAccountsOfGroup.unshift(accountClickFromResultSearch);
        this.totalMemberOfGroup += 1;
      }
    }
  }

  /**
   * this function will remove account of list account group
   * @author nvangoc
   * @param accountClickFromListAccountGroup
   */
  removeAccountFromListGroup(accountClickFromListAccountGroup) {
    for (let account of this.listAccountsOfGroup) {
      if (account.accountId == accountClickFromListAccountGroup.accountId) {
        account.existInGroup = false;
      }
    }
    accountClickFromListAccountGroup.existInGroup = false;
    for (let resultSearch of this.resultsSearch) {
      if (resultSearch.accountId == accountClickFromListAccountGroup.accountId) {
        resultSearch.existInGroup = false;
      }
    }
    this.totalMemberOfGroup -= 1;
  }

  /**
   * this function will insert or remove account of group
   * @author nvangoc
   */
  submitInsertOrRemove() {
    for (let account of this.listAccountsOfGroup) {
      if (!this.checkObjectWasExistedInList(account, this.originalListAccountsOfGroup) && account.existInGroup) {
        let accountWantToInsert = {
          accountId: account.accountId,
          groupId: this.groupId,
          existInGroup: account.existInGroup
        };
        this.listAccountWantToInsertOrRemove.push(accountWantToInsert);
      }
      if (this.checkObjectWasExistedInList(account, this.originalListAccountsOfGroup) && !account.existInGroup) {
        let accountWantToRemove = {
          accountId: account.accountId,
          groupId: this.groupId,
          existInGroup: account.existInGroup
        };
        this.listAccountWantToInsertOrRemove.push(accountWantToRemove);
      }
    }
    this._dataService.post(ApiConstant.URL_INSERT_ACCOUNT_GROUP, this.listAccountWantToInsertOrRemove).subscribe((res: any) => {
      this.totalMemberOfGroup = 0;
      this.listAccountWantToInsertOrRemove = [];
      this.modalUpdateAccount.hide();
      this.keywordSearch.nativeElement.value = '';
      this.resultsSearch = [];
      this.resetTableAccOfGroup();
      this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
    }, error => this._dataService.handleError(error));
  }

  /**
   * this function will disabale submit button when there is no thing change on view list account of group
   * @author nvangoc
   * @returns {boolean}
   */
  checkChangesToDisableSubmit(): boolean {
    if (this.totalMemberOfGroup != this.originalListAccountsOfGroup.length) {
      return false;
    } else {
      for (let account of this.listAccountsOfGroup) {
        if (!this.checkObjectWasExistedInList(account, this.originalListAccountsOfGroup) && account.existInGroup) {
          return false;
        }
      }
      return true;
    }
  }

  /**
   * this function will return an object is in a list?
   * @author nvangoc
   * @param objectWantToCheck
   * @param availableList
   * @returns {boolean}
   */
  checkObjectWasExistedInList(objectWantToCheck: any, availableList: any): boolean {
    if (availableList.length != 0) {
      for (let objectOfAvailableList of availableList) {
        if (objectWantToCheck.accountId == objectOfAvailableList.accountId) {
          return true;
        }
      }
      return false;
    }
    return false;
  }


  /**
   * submit search to get result from DB
   * @author nvangoc
   * @date 03/02/2018
   */
  submitSearch() {
    if (this.keywordSearch.nativeElement.value !== '') {
      this.getAccountBySearch(this.keywordSearch.nativeElement.value.trim());
    } else {
      this.resultsSearch = [];
      this.isNoRecord = false;
    }
  }

  /**
   * this function show modal and clear data search
   * @author nvangoc
   * @date 03/02/2018
   */
  showUpdateAccoutModal() {
    this.modalUpdateAccount.show();
    this.keywordSearch.nativeElement.value = '';
    this.resultsSearch = [];
    this.totalMemberOfGroup = 0;
    this.listAccountWantToInsertOrRemove = [];
    this.getAccountOfGroup();
    this.focusOnInputSearch();
  }

  /**
   * this function return home page
   * @author nvangoc
   * @date 07/03/2018
   */
  goHome() {
    this.router.navigate([UrlConstant.URL_HOME_INDEX]);
  }

  /**
   * this function focus to input
   * @author nvangoc
   * @date 07/03/2018
   */
  focusOnInputSearch() {
    setTimeout(() => {
      this.keywordSearch.nativeElement.focus();
    }, 500);
  }

  /**
   * this function check all check box
   * @author nvangoc
   * @date 07/03/2018
   */
  cheackAll(value) {
    if (value.target.checked == true) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }

  /**
   * this function close modal
   * @author nvangoc
   * @date 03/02/2018
   */
  onCancel() {
    this.modalUpdateAccount.hide();
    this.modalUpdateGroupName.hide();
    this.formUpdateGroupName.reset();
    this.totalMemberOfGroup = 0;
    this.listAccountWantToInsertOrRemove = [];
  }

  /**
   * creator: ntgiang1
   *
   * function show form modal update group name and set value for variable
   */
  showUpdateGroupNameModal() {
    //this.formUpdateGroupName.reset();
    this.groupUpdate.groupName = this.groupDetailData.groupName;
    this.formUpdateGroupName.reset({groupName: this.groupDetailData.groupName});
    this.modalUpdateGroupName.show();
    //set message error
    this.setMessageErrorCreateGroup();
    setTimeout(() => {
      this.inputGroupName.nativeElement.focus();
    }, 500);
  }

  /**
   * @creator: ntgiang1
   *
   * function for event submit form update group name
   * @param group
   */
  onSubmitFormUpdateGroupName(values) {
    this.groupUpdate.createDate = this.groupDetailData.createDate;
    this.groupUpdate.creatorId = this.groupDetailData.creatorId.accountId;
    this.groupUpdate.groupId = this.groupId;
    this.groupUpdate.groupName = values;
    this.res_error = null;
    if (this.groupUpdate.groupId != null && this.groupUpdate.groupId == this.groupId) {
      this._dataService.put(ApiConstant.API_UPDATE_GROUP, this.groupUpdate).subscribe((res: any) => {
        this.formUpdateGroupName.reset();
        this.modalUpdateGroupName.hide();
        this.formUpdateGroupName.reset();
        this.groupDetailData.groupName = this.groupUpdate.groupName;
        this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
      }, error => {
        this._dataService.handleError(error);
        switch (error.status) {
          case 422:
            this.res_error = MessageContstants.ERROR_GROUP_REGEX;
            break;
          case 409:
            this.res_error = MessageContstants.ERROR_GROUP_EXISTS;
            break;
          default:
            this.res_error = MessageContstants.ERROR_DEFAULT;
            break;
        }
        this._dataService.handleError(error);
      });
    } else {
      this.res_error = MessageContstants.ERROR_GROUP_EXISTS;
    }
  }

  /**
   * @creator: ntgiang1
   *
   * function for event forcus input groupName at update group name form
   */
  eventForcusInputGroupName() {
    this.res_error = null;
  }

  /**
   * @creator: ntgiang1
   *
   * function set messages = null;
   */
  setMessageErrorCreateGroup() {
    this.res_error = null;
    this.groupName_require = MessageContstants.CREATE_ERROR_GROUP_REQUIRE;
    this.groupName_maxlength = MessageContstants.CREATE_ERROR_GROUP_LENGTH;
    this.groupName_regex = MessageContstants.ERROR_GROUP_REGEX;
  }

  /**
   * @creator: nvdong
   * function search account of group detail screen
   */
  submitSearchAccount() {
    this.config.currentPage = CommonContstants.ONE;
    this.getListAccountFromID();
  }

  onChangedValue(value) {
    console.log(value);
    this.filterObject = '';
    for (let filter of value) {
      if (filter.value != '') {
        this.filterObject = this.filterObject + '&' + filter.filterFiled + '=' + filter.value;
      }
    }
    this.getListAccountFromID();
  }

  /**
   * This will encode % to
   * @param {string} keyword
   * @returns {string}
   */
  encodeSpecialCharacter(keyword: string) {
    // let result = '';
    keyword = keyword.trim();
    return (encodeURI(keyword) !== keyword) ? encodeURI(keyword) : encodeURIComponent(keyword);
  }

  checkValueFormUpdateGroupName(inputValue) {
    if (inputValue != null) {
      if (inputValue.toLowerCase() == this.groupUpdate.groupName.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  resetTableAccOfGroup() {
    this.tableAccKeywordInputSearch.nativeElement.value = '';
    for (let columns of this.columnTableAccOnGroup) {
      if (columns.title !== TitleTable.DATE_JOINED && columns.sort.sortType != null || columns.sort.sortType != '') {
        columns.sort.sortType = '';
      }
      if (columns.title === TitleTable.DATE_JOINED) {
        columns.sort.sortType = CommonContstants.SORT_TYPE_DESC;
      }
    }
    this.filterObject = '';
    this.Clear();
    this.modelConditionFilter = [NameColumns.ACCOUNT_OF_GROUP_DEPARTMENT, NameColumns.ACCOUNT_OF_GROUP_POSITION, NameColumns.DATE_JOINED];
    this.onChangeConditionFilter();
    this.sortObject = {title: NameColumns.DATE_JOINED, sortType: CommonContstants.SORT_TYPE_DESC};
    this.getListAccountFromID();
  }
}
