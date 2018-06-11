export class AccountLocalStorage {
  currentPage: number;
  sortObjectTable: Array<any>;
  columns: Array<any>;
  keywordSearch: string;
  filter: any;
  constructor(currentPage: number,
              sortObjectTable: Array<any>,
              columns: Array<any>,
              keywordSearch: string,
              filterObject: any) {
    this.currentPage = currentPage;
    this.sortObjectTable = sortObjectTable;
    this.columns = columns;
    this.keywordSearch = keywordSearch;
    this.filter = filterObject;
  }
}
