import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateRangePiker, DateTimeConstants} from '../../_core/common/datetime.constants';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() public columns: Array<any> = [];

  public optionModel: any;
  public filterObject: Array<any> = [];
  public dataModel;

  // Call event when chosen date
  public selectedDateRangePicker(value: any, dateInput: any, column: any) {
    dateInput.start = value.start.format();
    dateInput.end = value.end;
    this.isCheckColumnFromTo(column);
    this.valueOption.push({filterFiled: column + 'From', value: moment(value.start).format(DateTimeConstants.FORMAT_DATE_YYYYMMDD)});
    this.valueOption.push({filterFiled: column + 'To', value: moment(value.end).format(DateTimeConstants.FORMAT_DATE_YYYYMMDD)});
    this.changedValueSelectOption.emit(this.valueOption);
  }

  public picker = {
    opens: 'left',
    startDate: moment('01/1/2018', 'DD/MM/YYYY'),
    endDate: moment(),
    locale: DateRangePiker.Locale,
    alwaysShowCalendars: false,
    ranges: DateRangePiker.Range
  };

  constructor() {
  }

  ngOnInit() {
  }

  public valueOption = [];
  @Output() public changedValueSelectOption: EventEmitter<any> = new EventEmitter();

  setFilterObject() {
    for (let column of this.columns) {
      if (column.filter && column.filter.isFilter && column.filter.isMultilSelect && column.filter.optionModel.length > 0) {
        this.filterObject.push({filterFiled: column.name.split('.')[0], value: column.filter.optionModel[0]});
      }
      if (column.filter && column.filter.isFilter && column.filter.isDate) {
        this.filterObject.push({
          filterFiled: column.name.split('.')[0] + 'From',
          value: moment(column.filter.chosenDate.start).format(DateTimeConstants.FORMAT_DATE_YYYYMMDD)
        });
        this.filterObject.push({
          filterFiled: column.name.split('.')[0] + 'To',
          value: moment(column.filter.chosenDate.end).format(DateTimeConstants.FORMAT_DATE_YYYYMMDD)
        });
      }
      if (column.filter && column.filter.isFilter && column.filter.isOther) {
        this.filterObject.push({
          filterFiled: column.name.split('.')[0] + 'From',
          value: column.filter.inputMinimum
        });
        this.filterObject.push({
          filterFiled: column.name.split('.')[0] + 'To',
          value: column.filter.inputMaximum
        });
      }
    }
    return this.filterObject;
  }

  checkNumber(e, value: number, columnName: string) {
    if (value.toString().length > 5 && ((e.keyCode > 47 && e.keyCode < 58))) {
      return false;
    }
    if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
      return false;
    }
  }

  onChangeInput(value: any, columnName: any) {
    this.isCheckColumnFromTo(columnName);
    for (let column of this.columns) {
      if (column.filter && column.filter.isOther && column.filter.inputMinimum != '' && column.filter.inputMaximum != '') {
        this.valueOption.push({filterFiled: columnName + 'From', value: column.filter.inputMinimum});
        this.valueOption.push({filterFiled: columnName + 'To', value: column.filter.inputMaximum});
      }
    }
    this.changedValueSelectOption.emit(this.valueOption);
  }

  onChange(value, column) {
    if (value[0] != undefined && value[0] != '') {
      this.isCheckColumnName(column);
      this.valueOption.push({filterFiled: column, value: value[0]});
    }
    if (value[0] == '') {
      this.isCheckColumnName(column);
    }
    this.changedValueSelectOption.emit(this.valueOption);
  }

  isCheckColumnName(column: any) {
    for (let i in this.valueOption) {
      if (this.valueOption[i].filterFiled == column) {
        this.valueOption.splice(parseInt(i), 1);
      }
    }
  }

  isCheckColumnFromTo(column: any) {
    for (let i in this.valueOption) {
      if (this.valueOption[i].filterFiled == column + 'From') {
        this.valueOption.splice(parseInt(i), 1);
      }
      if (this.valueOption[i].filterFiled == column + 'To') {
        this.valueOption.splice(parseInt(i), 1);
      }
    }
  }
}
