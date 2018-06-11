export class ClassNameTable {
  public static TABLE_STRIPED = 'table-striped';
  public static TABLE_BORDERED = 'table-bordered';
  public static TABLE_JAMBO = 'jambo_table';
  public static BULK_ACTION = 'bulk_action';
  public static COL_MD_4 = 'col-md-4';
  public static COL_MD_2 = 'col-md-2';
  public static COL_MD_3 = 'col-md-3';
  public static COL_MD_1 = 'col-md-1';
  public static COL_MD_5 = 'col-md-5';
}

export class TitleTable {
  public static GROUP_NAME = 'Group Name';
    public static NUMBER_OF_MEMBERS = 'Members';
  public static CREATOR = 'Creator';
  public static DATE_CREATE = 'Created Date';

  public static ACCOUNT_EMAIL = 'Email';
  public static ACCOUNT_USERNAME = 'Username';
  public static ACCOUNT_FULLNAME = 'Full Name';
  public static ACCOUNT_DEPARTMENT = 'Department';
  public static ACCOUNT_POSITION = 'Position';
  public static DATE_JOINED = 'Joined Date';

  // Category question
  public static CATEGORY_QUESTION_NAME = 'Category Name';
  public static CATEGORY_QUESTION_CODE = 'Code';
  public static CATEGORY_QUESTION_CREATOR = 'Creator';
  public static CATEGORY_QUESTION_CREATED_AT = 'Created Date';

  //Question
  public static QUESTION_CONTENT = 'Content';
  public static CATEGORY_QUESTION = 'Category';
  public static LEVEL_QUESTION = 'Level';
  public static TYPE_QUESTION = 'Type';
  public static TAG_QUESTION = 'Category';
  // Exam
  public static EXAM_TITLE = 'Title';
  public static EXAM_TYPE = 'Type';
  public static EXAM_DURATION = 'Duration';
  public static EXAM_QUESTIONS = 'Questions';
  public static EXAM_CREATED_DATE = 'Created Date';
  public static EXAM_CREATED_USER = 'Creator';
  public static EXAM_STATUS = 'Status';
}

export class NameColumns {
  // Group
  public static GROUP_ID = 'groupId';
  public static GROUP_NAME = 'groupName';
  public static NUMBER_OF_MEMBERS = 'numberOfMembers';
  public static CREATOR = 'fullname';
  public static DATE_CREATE = 'createDate';
  public static ACCOUNT_EMAIL = 'email';
  public static ACCOUNT_USERNAME = 'username';
  public static ACCOUNT_FULLNAME = 'fullname';
  public static ACCOUNT_DEPARTMENT = 'departmentId.departmentName';
  public static ACCOUNT_POSITION = 'positionId.positionName';
  public static ACCOUNT_OF_GROUP_DEPARTMENT = 'departmentName';
  public static ACCOUNT_OF_GROUP_POSITION = 'positionName';
  public static DATE_JOINED = 'joinDate';

  // Category question
  public static CATEGORY_QUESTION_NAME = 'categoryName';
  public static CATEGORY_QUESTION_CODE = 'categoryCode';
  public static CATEGORY_QUESTION_CREATOR = 'creatorId.fullname';
  public static CATEGORY_QUESTION_CREATED_AT = 'createDate';
  //Question
  public static QUESTION_CONTENT = 'content';
  public static CATEGORY_QUESTION = 'categoryId.categoryName';
  public static LEVEL_QUESTION = 'levelId.levelName';
  public static TYPE_QUESTION = 'typeId.typeName';
  public static TAG_QUESTION = 'Category';
  // Exam
  public static EXAM_TITLE = 'title';
  public static EXAM_TYPE = 'categoryName';
  public static EXAM_DURATION = 'durationValue';
  public static EXAM_QUESTIONS = 'numberOfQuestion';
  public static EXAM_CREATED_DATE = 'createDate';
  public static EXAM_CREATED_USER = 'fullname';
  public static EXAM_STATUS = 'statusName';
}
