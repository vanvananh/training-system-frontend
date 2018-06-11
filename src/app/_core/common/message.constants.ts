export class MessageContstants {
  public static SYSTEM_ERROR_MSG = 'There was an error from the server!';
  public static CONFIRM_DELETE_MSG = 'Do you want to delete this record?';
  public static LOGIN_AGAIN_MSG = 'Your session had expired. Please login again.';
  public static CREATED_OK_MSG = 'Create Successfully';
  public static UPDATED_OK_MSG = 'Update Successfully';
  public static DELETED_OK_MSG = 'Delete Successfully';
  public static FORBIDDEN = 'You do not have permission!';
  public static BAD_REQUEST = 'Cannot connect to server!';
  public static ERROR_DEFAULT = "Something were wrong";


  // Notification create group
  public static CREATE_ERROR_GROUP_REQUIRE = 'Group name cannot be blank';
  public static CREATE_ERROR_GROUP_LENGTH = 'Length of category name must be lest than 50';
  public static ERROR_GROUP_REGEX = 'Group name is not valid';
  public static ERROR_GROUP_EXISTS = "Group name is existed";

  //Notification for vewing user profile
  public static ACCOUNT_NOT_FOUND = 'This account is not existed';

  //Notification for group not exits
  public static GROUP_NOT_EXITS = 'This group is not exist';

  // category question
  public static CREATE_ERROR_CATEGORY_QUESTION_REQUIRE = 'Category name cannot be blank';
  public static CREATE_ERROR_CATEGORY_QUESTION_LENGTH = 'Length of category name must be lest than 50';
  public static CREATE_ERROR_CATEGORY_QUESTION_NOTE_VALID = 'Category name is not valid';
  public static CREATE_ERROR_CATEGORY_QUESTION_NAME_EXIST = 'Category name is existed';
  public static DELETE_CATEGORIES_QUESTION = ' Categories Question was deleted';
  public static DELETE_CATEGORY_QUESTION = ' Category Question was deleted';
  public static DELETE_CATEGORY_QUESTION_ERROR = 'No Category Question is selected';
  public static CATEGORY_QUESTION_NOT_EXIST = 'This category question is not exist';

  // GROUP
  public static DELETE_GROUPS = ' Groups was deleted';
  public static DELETE_GROUP = ' Group was deleted';

  // exam
  public static DELETE_EXAM_ERROR = 'No Exam is selected';
  public static DELETE_EXAMS_MESSAGE = ' Exams was deleted';
  public static DELETE_EXAM_MESSAGE = ' Exam was deleted';
  public static DELETE_EXAM_PUBLIC = "Cannot delete exam with public status"

  //question
  public static PARAMETER_IS_CORRECT_HAVE_LEAST_ONE = "Question is must be at least one answer is correct";
  public static MESSAGE_FILE_IMAGE = "File upload must be image"
  public static ERROR_EXAM_REGEX = 'Title is not valid';
  public static ERROR_SIZE_IMAGE = "Image's size is too large. Please choose another image size is less than 3Mb."
  public static DELETE_QUESTIONS = ' Questions was deleted';
  public static DELETE_QUESTION = ' Question was deleted';
  public static IMAGE_NOTE = "Image size must not exceed 3Mb";
}
