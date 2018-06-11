import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-table-directives',
  templateUrl: './table-directives.component.html',
  styleUrls: ['./table-directives.component.css']
})
export class TableDirectivesComponent implements OnInit {
  @Input('rows') public rows: Array<any> = [];

  @Input()
  public set config(conf: any) {
    if (!conf.className) {
      conf.className = 'table-striped table-bordered';
    }
    if (conf.className instanceof Array) {
      conf.className = conf.className.join(' ');
    }
    this._config = conf;
  }

  public get config(): any {
    return this._config;
  }

  @Input()
  public set columns(values: Array<any>) {
    values.forEach((value: any) => {
      if (value.className && value.className instanceof Array) {
        value.className = value.className.join(' ');
      }
      let column = this._columns.find((col: any) => col.name === value.name);
      if (column) {
        Object.assign(column, value);
      }
      if (!column) {
        this._columns.push(value);
      }
    });
  }

  public get columns(): Array<any> {
    return this._columns;
  }

  private _columns: Array<any> = [];
  private _config: any = {};

  public checked: boolean = false;
  public dataCheckBox: any = [];


  @Output() public tableChanged: EventEmitter<any> = new EventEmitter();
  @Output() public cellClicked: EventEmitter<any> = new EventEmitter();
  @Output() public checkBoxChanged: EventEmitter<any> = new EventEmitter();
  @Output() public checkBoxChangedAll: EventEmitter<any> = new EventEmitter();
  @Output() public currentPage: EventEmitter<any> = new EventEmitter();
  @Output() public sort: EventEmitter<any> = new EventEmitter();


  public constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (this.rows instanceof Array) {
      for (let row of this.rows) {
        row.isCheck = false;
      }
    }
  }

  public sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  public getData(row: any, propertyName: string): string {
    return propertyName.split('.').reduce((prev: any, curr: string) => prev[curr], row);
  }

  public cellClick(row: any, column: any): void {
    this.cellClicked.emit({row});
  }

  checkBoxChange(value, row) {
    if (value.target.checked) {
      this.dataCheckBox.push(row);
      row.isCheck = true;

      if (this.checkArrays(this.dataCheckBox, this.rows)) {
        this.checked = true;
      }

    } else {
      this.checked = false;
      row.isCheck = false;

      for (let i = 0; i < this.dataCheckBox.length; i++) {
        if (row == this.dataCheckBox[i]) {
          this.dataCheckBox.splice(i, 1);
        }
      }
    }
    this.checkBoxChanged.emit(this.dataCheckBox);
    console.log(this.dataCheckBox);
    console.log(this.rows);
  }

  checkBoxChangeAll(value, rows) {
    this.dataCheckBox = [];
    if (value.target.checked == true) {
      this.checked = true;
      for (let row of rows) {
        // for exam table
        if (row.statusId) {
          if (row.statusId == 1) {
            row.isCheck = false;
          }
          if (row.statusId == 2) {
            row.isCheck = true;
            this.dataCheckBox.push(row);
          }
        }
        //for the rest
        if (!row.statusId) {
          row.isCheck = true;
          this.dataCheckBox.push(row);
        }
      }
    } else {
      for (let row of rows) {
        if (row.statusId) {
          row.isCheck = false;
        }
        if (!row.statusId) {
          row.isCheck = false;
        }
      }
      this.dataCheckBox.splice(0, rows.length);
      this.checked = false;
    }
    this.checkBoxChangedAll.emit(this.dataCheckBox);

  }

  checkArrays(arrA, arrB) {
    let i = 0;
    for (let r in arrB) {
      if (this.rows[r].statusId == 1) {
        i++;
      }
    }

    let count = arrA.length + i;
    //check if lengths are different
    if (count !== arrB.length) {
      return false;
    }
    else {
      return true;
    }
  }

  preOrNextPageClick(value: string, isCheck: boolean) {
    if (isCheck) {
      window.scrollTo(0, 0);
      if (value == 'first') {
        this._config.currentPage = 1;
      }
      if (value == 'pre') {
        this._config.currentPage--;
      }
      if (value == 'next') {
        this._config.currentPage++;
      }
      if (value == 'last') {
        this._config.currentPage = this._config.totalPage;
      }
    }
    this.currentPage.emit(this._config.currentPage);
  }

  sortClick(title: any, sortType: any) {
    console.log('doan');
    if (sortType == 'desc') {
      this.sort.emit({title: title, sortType: 'asc'});
    } else if (sortType == 'asc') {
      this.sort.emit({title: title, sortType: 'desc'});
    } else {
      this.sort.emit({title: title, sortType: 'desc'});
    }

  }

  htmlEscape(str: string): string {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  }
}
