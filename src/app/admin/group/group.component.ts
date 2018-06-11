import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../_core/service/data.service';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../_core/service/notification.service';
import {UserData} from '../../_core/Fake-data/user.data';
import {MessageContstants} from '../../_core/common/message.constants';
import {CommonContstants} from '../../_core/common/common.constants';
import {ApiConstant, UrlConstant} from '../../_core/common/url.constants';
import {ClassNameTable, NameColumns, TitleTable} from '../../_core/common/configTable.constant';
import {DateRangePiker, DateTimeConstants} from '../../_core/common/datetime.constants';
import {GroupLocalStorage} from '../../_core/model/GroupLocalStorage';
import {TableDirectivesComponent} from '../../_share/table-directives/table-directives.component';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from '../../_share/dropdown/types';
import {FilterComponent} from '../../_share/filter/filter.component';
import moment = require('moment');


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  /**khai báo viewChild**/
    // assign component view child for input in the html
  @ViewChild('modalCreateGroup') public modalCreateGroup: ModalDirective;
  @ViewChild('modalDeleteGroup') public modalDeleteGroup: ModalDirective;
  @ViewChild('formCreateGroup') public formCreateGroup: any;
  @ViewChild('keywordInput') public keywordInput: any;
  @ViewChild('inputGroupName') public inputGroupName: any;
  @ViewChild('keywordSearch') public keywordSearch: any;
  @ViewChild(FilterComponent) public filterComponent: FilterComponent;
  @ViewChild(TableDirectivesComponent) public tableDirectivesComponent: TableDirectivesComponent;
  @ViewChild('collapse') public classname: any;
  /**kết thúc khai báo viewChild**/

  /**khai báo filter**/
  //dữ liệu cho select option chọn điều kiện filter
  optionsConditionFilter: IMultiSelectOption[] = [];

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


  /**khai báo biến dung cho table directive**/
    // config class for the table component
  public configTable: any = {
    className: [ClassNameTable.TABLE_STRIPED, ClassNameTable.TABLE_BORDERED, ClassNameTable.TABLE_JAMBO, ClassNameTable.BULK_ACTION],
    currentPage: CommonContstants.ONE,
    isDetail: true,

  };
  // config columns for the table component
  public groupColumns: Array<any> = [
    {
      title: TitleTable.GROUP_NAME,
      name: NameColumns.GROUP_NAME,
      sizeColumnTable: ClassNameTable.COL_MD_4,
      maxWidth: 100, sort: {isSort: true}
    },
    {
      title: TitleTable.NUMBER_OF_MEMBERS,
      name: NameColumns.NUMBER_OF_MEMBERS,
      sizeColumnTable: ClassNameTable.COL_MD_2,
      maxWidth: 100,
      sort: {isSort: true},
      filter: {isFilter: true, isOther: true, inputMinimum: 0, inputMaximum: 0}
    },
    {
      title: TitleTable.CREATOR,
      name: NameColumns.CREATOR,
      sizeColumnTable: ClassNameTable.COL_MD_4,
      maxWidth: 100,
      sort: {isSort: true}
    },
    {
      title: TitleTable.DATE_CREATE,
      name: NameColumns.DATE_CREATE,
      sizeColumnTable: ClassNameTable.COL_MD_2,
      maxWidth: 100,
      sort: {isSort: true, sortType: CommonContstants.SORT_TYPE_DESC},
      filter: {
        isFilter: true, isDate: true, mySettings: this.picker, chosenDate: this.chosenDate
      }
    }
  ];
  // data column for table
  public rows: any;
  public groupRows: any;


  /**kết thúc khai báo biến dung cho table directive**/

  /**khai báo biến dùng trong class**/
    // default soft object to store the sort field and sort type
  public sortObject: any = {title: NameColumns.DATE_CREATE, sortType: CommonContstants.SORT_TYPE_DESC};
  public classNameFilter = 'collapse';
  // declare variable localStorage
  public groupLocalStorage: GroupLocalStorage;

  // message error when check form create
  public res_error: String;
  public groupName_require: String;
  public groupName_maxlength: String;
  public groupName_regex: String;

  // list group for delete
  public listGroupChecked: String = '';
  public group: any = {};
  public titleModal: string = CommonContstants.EMPTY;
  public user = this._currentUser.getUser();
  //filter object
  public filterObject: any = '';


  /**kết thúc khai báo biến dùng trong class**/

  constructor(private _dataService: DataService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _notificationService: NotificationService,
              private _currentUser: UserData) {
  }

  /**
   * VDhao
   * This method will be called when call component
   */
  ngOnInit() {
    window.scrollTo(0, 0);
    if (localStorage.getItem(CommonContstants.GROUP) != null) {
      this.groupLocalStorage = JSON.parse(localStorage.getItem(CommonContstants.GROUP));
      this.sortObject = this.groupLocalStorage.sortObjectTable;
      this.groupColumns = this.groupLocalStorage.columns;
      this.configTable.currentPage = this.groupLocalStorage.currentPage;
      this.keywordSearch.nativeElement.value = this.groupLocalStorage.keywordSearch;
      this.filterObject = this.groupLocalStorage.filter;
      this.classNameFilter = this.groupLocalStorage.classNameFilter;
    }
    this.getAll();
    for (let column of this.groupColumns) {
      if (column.filter) {
        this.optionsConditionFilter.push({id: column.name, name: column.title});
      }
    }
  }

  /**
   * description: this function do filter.
   *
   * @Creator:vdhao
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
    // this.filterComponent.filterObject = [];
  }

  /**
   * description: this function clear inputs filter.
   *
   * @Creator:vdhao
   */
  clear() {
    for (let column of this.groupColumns) {
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
          column.filter.inputMinimum = 0;
          column.filter.inputMaximum = 0;
        }
      }
    }
  }


  /**
   * VDhao
   * This method to get group from api
   * @param {number} currentPage
   */
  getAll() {
    const keywordSearch = (this.keywordSearch.nativeElement.value.trim() !== CommonContstants.EMPTY) ?
      CommonContstants.ADD_PARAM + CommonContstants.KEYWORD_SEARCH + CommonContstants.EQUAL +
      this.encodeSpecialCharacter(this.keywordSearch.nativeElement.value) : CommonContstants.EMPTY;

    this._dataService.get(ApiConstant.URL_GROUP_GETALL + CommonContstants.PAGE_NUMBER + this.configTable.currentPage +
      CommonContstants.ADD_PARAM + CommonContstants.SORT_FIELD + CommonContstants.EQUAL +
      this.sortObject.title + CommonContstants.ADD_PARAM + CommonContstants.SORT_TYPE +
      CommonContstants.EQUAL + this.sortObject.sortType + keywordSearch + this.filterObject).subscribe((res: any) => {
      this.groupRows = res.data;
      this.configTable.totalPage = res.totalPage;
      this.configTable.numberRecordOnPage = res.numberRecordPerPage;
      this.configTable.currentPage = res.pageCurrent;
      this.tableDirectivesComponent.dataCheckBox = [];
      this.tableDirectivesComponent.checked = false;
      this.groupLocalStorage = new GroupLocalStorage(this.configTable.currentPage, this.sortObject, this.groupColumns, this.keywordSearch.nativeElement.value, this.filterObject, this.classname.nativeElement.className);
      localStorage.setItem(CommonContstants.GROUP, JSON.stringify(this.groupLocalStorage));
      for (let row of this.groupRows) {
        row.createDate = moment(row.createDate).format(DateTimeConstants.FORMAT_DATE_DDMMYYYY);
      }
    }, error => this._dataService.handleError(error));
  }




  /**
   * creator: ntgiang1
   *
   * function show form modal create group ang set value for variable
   */
  showCreateGroupModal() {
    this.formCreateGroup.reset();
    this.group = {};
    this.titleModal = CommonContstants.TITLE_MODAL_CREATE_GROUP;
    this.modalCreateGroup.show();
    setTimeout(() => {
      this.inputGroupName.nativeElement.focus();
    }, 500);
    // set message error
    this.setMessageErrorCreateGroup();
  }

  /**
   * @creator: ntgiang1
   *
   * function show modal confirm delete group
   */
  showDeleteGroupModal() {
    this.modalDeleteGroup.show();
  }

  /**
   * @creator: ntgiang1
   *
   * function for event submit form create group
   * @param values
   */
  onSubmitFormCreateGroup(values) {
    values.creatorId = this.user.id;
    // values.createDate = moment(new Date()).format(SystemConstants.FORMAT_DATE_DDMMYYYY_DOWN);
    this.res_error = null;
    this._dataService.post(ApiConstant.API_CREATE_GROUP, values).subscribe((res: any) => {
      this.formCreateGroup.reset();
      this.modalCreateGroup.hide();
      this.group = {};
      this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
      // this.getAll();
      this.resetGroupTable();
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
    this.resetGroupTable();
  }

  /**
   * @creator: vdhao
   * submit form search
   *
   */
  submitSearch() {
    this.configTable.currentPage = CommonContstants.ONE;
    this.getAll();
  }

  /**
   * @creator: ntgiang1
   *
   * function for event forcus input groupName at create group form
   */
  eventForcusInputGroupName() {
    this.res_error = null;
  }

  /**
   * @creator: ntgiang1
   *
   * function for event click button delete group
   * @param func_param
   */
  onCancelModal(func_param) {
    this.formCreateGroup.reset();
    this.modalCreateGroup.hide();
    this.modalDeleteGroup.hide();
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
   * vdhao
   * this method to sort by column name
   * @param valueSortTableGroup
   */

  onSortTableGroup(valueSortTableGroup: any) {
    for (let column of this.groupColumns) {
      if (column.sort.sortType != null) {
        column.sort.sortType = '';
      }
      if (column.name == valueSortTableGroup.title) {
        column.sort.sortType = valueSortTableGroup.sortType;
      }
    }
    this.sortObject = valueSortTableGroup;
    this.configTable.currentPage = CommonContstants.ONE;
    this.getAll();
  }

  /**
   * vdhao
   * This function
   */
  goHome() {
    localStorage.clear();
    this.router.navigate([UrlConstant.URL_HOME_INDEX]);
  }

  /**
   * This method to encode special character in form
   * @param {string} keyword
   * @returns {string}
   */
  encodeSpecialCharacter(keyword: string) {
    keyword = keyword.trim();
    return (encodeURI(keyword) !== keyword) ? encodeURI(keyword) : encodeURIComponent(keyword);
  }

  /**
   *
   */
  resetGroupTable() {
    this.keywordSearch.nativeElement.value = '';
    for (let columns of this.groupColumns) {
      if (columns.title !== TitleTable.DATE_CREATE && columns.sort.sortType != null || columns.sort.sortType !== '') {
        columns.sort.sortType = '';
      }
      if (columns.title === TitleTable.DATE_CREATE) {
        columns.sort.sortType = CommonContstants.SORT_TYPE_DESC;
      }
    }
    this.filterObject = '';
    this.clear();
    this.sortObject = {title: NameColumns.DATE_CREATE, sortType: CommonContstants.SORT_TYPE_DESC};
    this.configTable.currentPage = CommonContstants.ONE;
    this.getAll();
  }

  /**
   * @creator: nhanh3
   *
   * function delete list group by list group_id
   */
  onDeleteGroup() {
    let temp = this.listGroupChecked.split(',').length;
    this._dataService.delete(ApiConstant.API_DELETE_GROUP + '?id=' + this.listGroupChecked).subscribe((res) => {
      this._notificationService.printSuccessMessage(temp > 1 ? temp + MessageContstants.DELETE_GROUPS
        : temp + MessageContstants.DELETE_GROUP);
      this.configTable.currentPage = CommonContstants.ONE;
      this.getAll();
      this.tableDirectivesComponent.dataCheckBox = [];
      this.tableDirectivesComponent.checked = false;
    }, (error) => {
      this._notificationService.printErrorMessage(error.error.message);
    });
    this.modalDeleteGroup.hide();
    this.listGroupChecked = CommonContstants.EMPTY;
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

  /**
   * author: nhanh3
   * it will return string have list id of group like this '1,2,3'
   */
  formatListId(values) {
    this.listGroupChecked = CommonContstants.EMPTY;
    for (let value of values) {
      this.listGroupChecked += value.groupId + CommonContstants.COMMA;
    }
    this.listGroupChecked = this.listGroupChecked.substr(CommonContstants.ZERO, this.listGroupChecked.length - 1);
  }
  onCellClick(values: any) {
    this.router.navigate(['/tranning-system/group/group-detail', values.row.groupId]);
  }
  getCurrentPage(currentPage: any) {
    this.tableDirectivesComponent.dataCheckBox = [];
    this.configTable.currentPage = currentPage;
    this.tableDirectivesComponent.checked = false;
    this.getAll();
  }
}
