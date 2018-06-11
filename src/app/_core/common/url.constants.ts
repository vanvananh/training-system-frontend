export class UrlConstant {
  public static URL_EMPLOYEE: string = '/api/employee';
  public static URL_DETAIL_EMPLOYEE: string = '/admin/employee/employee-detail';
  public static URL_HOME_INDEX: string = '/tranning-system/home/index';
  public static URL_CREATE_EXAM: string = '/tranning-system/exam/new';
  public static URL_GET_ALL_EXAM: string = '/tranning-system/exam/view';
  //view list group
  public static URL_GROUP_DETAIL: string = '/tranning-system/group/group-detail';
  //question
  public static URL_GROUP_CREATE: string = '/tranning-system/question-answer/new';
}

export class ApiConstant {
  public static BASE_API: string = 'http://localhost:8080';
  public static URL_EMPLOYEE: string = '/api/employee';

  //URL API GROUP
  public static API_CREATE_GROUP = '/api/group/create';
  public static API_UPDATE_GROUP = '/api/group/update';
  public static API_DELETE_GROUP = '/api/group/delete';
  public static URL_GROUP_GETALL: string = '/api/group/getAll';
  public static URL_GROUP_GET_DETAIL_GROUP_BY_ID = '/api/group/getById?id=';

  // URL Category Question
  public static URL_CATEGORY_QUESTION_GET_ALL: string = '/api/categoryQuestion/getAll';
  public static URL_CATEGORY_QUESTION_CREATE: string = '/api/categoryQuestion/create';
  public static URL_CATEGORY_QUESTION_UPDATE: string = '/api/categoryQuestion/update';
  public static URL_CATEGORY_QUESTION_DELETE: string = '/api/categoryQuestion/delete?id=';
  public static URL_CATEGORY_QUESTION_GET_DETAIL_BY_ID = '/api/categoryQuestion/getById?id=';
  public static API_UPDATE_CATEGORY_QUESTION = '/api/categoryQuestion/update';

  //URL UPLOAD FILE
  public static URL_UPLOAD_IMAGE = '/api/file/uploadImage';
  public static URL_DELETE_IMAGE = '/api/file/delete';

  // URL API ACCOUNT
  public static URL_ACCOUNT_GET_LIST_ACCOUNT_BY_ID = '/api/account/getListAccByGroupID?id=';
  public static URL_ACCOUNT_GET_BY_SEARCH: string = '/api/account/getBySearch?keywordSearch=';
  public static GET_LIST_ACCOUNT: string = '/api/account/getAll';
  public static GET_LIST_ACC_OF_GROUP = '/api/account/getListAccountOfGroupID?id=';
  public static URL_ACCOUNT_GET_DETAIL_ACCOUNT_BY_ID = '/api/account/getById?id=';
  public static URL_GET_ALL_TYPEQUESTION = '/api/typequestion/getAll';
  public static URL_ACCOUNT_DETAIL = '/tranning-system/account/account-detail';
  //URL API QUESTION
  public static API_QUESTION_GET_ALL: string = '/api/questionAnswer/getAll';
  public static API_QUESTION_GET_TYPE: string = '/api/questionAnswer/getAllTypeQuestion';
  public static API_QUESTION_GET_LEVEL: string = '/api/questionAnswer/getAllLevelQuestion';
  public static API_DELETE_QUESTION = '/api/questionAnswer/delete';
  public static API_QUESTION_CREATE = '/api/questionAnswer/create';

  // URL API EXAM
  public static URL_EXAM_GET_LIST_EXAM: string = '/api/exam/getAll';
  public static URL_EXAM_GET_ALL_STATUS_EXAM: string = '/api/exam/getAll/status';

  public static URL_EXAM_DELETE: string = '/api/exam/delete?id=';
  public static URL_CATEGORY_QUESTION_GET_ALL_CATEGORY_NO_PAGING = '/api/categoryQuestion/getAllCategoryQuestion';
  public static URL_EXAM_CREATE = '/api/exam/create';

  //  URL API GROUP ACCOUNT
  public static URL_INSERT_ACCOUNT_GROUP = '/api/groupAccount/updateAccountToGroup';

  //URL API DURATION
  public static URL_DURATION_GET_ALL = '/api/exam/getAll/duration';
}
