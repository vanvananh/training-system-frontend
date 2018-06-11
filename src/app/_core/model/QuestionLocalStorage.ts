export class QuestionLocalStorage {
  currentPage: number;
  sortObjectTable: Array<any>;
  columns: Array<any>;
  keywordSearch: string;
  filter: any;
  classNameFilter: string;

  constructor(currentPage: number,
              sortObjectTable: Array<any>,
              columns: Array<any>,
              keywordSearch: string,
              filterObject: any,
              classNameFilter: string) {
    this.currentPage = currentPage;
    this.sortObjectTable = sortObjectTable;
    this.columns = columns;
    this.keywordSearch = keywordSearch;
    this.filter = filterObject;
    this.classNameFilter = classNameFilter;
  }
}
