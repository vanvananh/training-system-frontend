import {Component, OnInit, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {element} from 'protractor';
import {DataService} from '../../../_core/service/data.service';
import {Router, ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../../_core/service/notification.service';
import {UserData} from '../../../_core/Fake-data/user.data';
import { UrlConstant, ApiConstant } from '../../../_core/common/url.constants';
import {error, isNull} from 'util';
import {FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import { Question, Answer } from '../../../_core/model/question_answer.interface';
import {MessageContstants} from '../../../_core/common/message.constants';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from '../../../_share/dropdown/types';
import {CommonContstants} from '../../../_core/common/common.constants';
import {UploadService} from '../../../_core/service/upload.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-question-new',
  templateUrl: './question-new.component.html',
  styleUrls: ['./question-new.component.css']
})
export class QuestionNewComponent implements OnInit {
  @ViewChild('listAnswer', {read: ViewContainerRef}) listAnswer: ViewContainerRef;
  @ViewChild('questionType') questionType: any = 1;
  @ViewChild('fileContent') fileContent;

  /**khai báo filter**/
  settingsCategory: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default',
    dynamicTitleMaxItems: 1,
    displayAllSelectedText: true,
    closeOnClickOutside: true,
    selectionLimit: 1,
    minSelectionLimit: 1,
    closeOnSelect: true,
    autoUnselect: true
  };

  settingsTypeLevel: IMultiSelectSettings = {
    enableSearch: false,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default',
    dynamicTitleMaxItems: 1,
    displayAllSelectedText: true,
    closeOnClickOutside: true,
    selectionLimit: 1,
    minSelectionLimit: 1,
    closeOnSelect: true,
    autoUnselect: true
  };


  texts: IMultiSelectTexts = {
    checkAll: CommonContstants.CHECK_ALL,
    uncheckAll: CommonContstants.UN_CHECK_ALL,
    checked: CommonContstants.CHECKED,
    checkedPlural: CommonContstants.CHECKED_PLURAL,
    searchPlaceholder: CommonContstants.SEARCH_PLACEHOLDER,
    searchEmptyResult: CommonContstants.SEARCH_EMPTY_RESULT,
    searchNoRenderText: CommonContstants.SEARCH_NO_RENDER_TEXT,
    defaultTitle: CommonContstants.DEFAULT_TITLE_QUESTION_NEW,
    allSelected: CommonContstants.ALL_SELECTED
  };
  //optionsCategory: IMultiSelectOption[];
  /**ket thuc filter**/

  public formCreateQuestion: FormGroup;
  public types: IMultiSelectOption[];
  public categories: IMultiSelectOption[];
  public levels: IMultiSelectOption[];
  public question: Question;
  public url_image: any;
  public displaySuggestion: boolean = true;
  public file: any = {};
  public disableSave: boolean = true;
  //question.categoryId=[]

  public answers: Answer[];
  public suggestion: Answer;
  public typeId: any;
  public categoryId: any;
  public levelId: any;

  //variable message error
  public answer_error: string;
  public question_error: string;
  public error_isImage: string = MessageContstants.MESSAGE_FILE_IMAGE;
  public error_sizeImage: string;
  public image_note: string = MessageContstants.IMAGE_NOTE;

  constructor(private sanitizer: DomSanitizer,
              private _cfr: ComponentFactoryResolver,
              private _dataService: DataService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private _notificationService: NotificationService,
              private _currentUser: UserData,
              private _fb: FormBuilder,
              private _upload: UploadService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getAllCategory();
    this.getAllLevel();
    this.getAllQuestionType();
    this.initQuestion();
  }

  /**
   * @author ntgiang1
   * initialize question
   */
  initQuestion() {
    this.formCreateQuestion = this._fb.group({
      content: ['', [Validators.required]],
      linkImage: [''],
      typeId: this._fb.array([1]),
      categoryId: [[], [Validators.required]],
      levelId: [[], [Validators.required]],
      answers: this._fb.array([
        this.initAnswer(),
      ])
    });
    //this.setQuestionParam();
    this.question = this.formCreateQuestion.value;
  }

  /**
   * @author ntgiang1
   * initialize answer
   */
  initAnswer() {
    return this._fb.group({
      content: [''],
      isCorrect: [false]
    });
  }

  /**
   * @author ntgiang1
   * get all question category
   */
  getAllCategory() {
    this._dataService.get(ApiConstant.URL_CATEGORY_QUESTION_GET_ALL).subscribe((res: any) => {
      this.categories = [];
      for (let category of res.data) {
        this.categories.push({id: category.categoryId, name: category.categoryName});
      }
    }, error => this._dataService.handleError(error));
  }

  /**
   * @author ntgiang1
   * get all question type
   */
  getAllQuestionType() {
    this._dataService.get(ApiConstant.API_QUESTION_GET_TYPE).subscribe((res: any) => {
      this.types = [];
      for (let type of res) {
        this.types.push({id: type.typeId, name: type.typeName});
      }
    }, error => this._dataService.handleError(error));
  }

  /**
   * @author ntgiang1
   * get all question level
   */
  getAllLevel() {
    this._dataService.get(ApiConstant.API_QUESTION_GET_LEVEL).subscribe((res: any) => {
      this.levels = [];
      for (let level of res) {
        this.levels.push({id: level.levelId, name: level.levelName});
      }
    }, error => this._dataService.handleError(error));
  }

  /**
   * @author ntgiang1
   * call this function when change question type
   */
  onChangeQuestionType(event: any) {
    this.typeId = event;
    this.question.typeId = event;
    this.formCreateQuestion.controls['answers'].reset();
    const control = <FormArray>this.formCreateQuestion.controls['answers'];
    this.displaySuggestion = true;
    while (control.length > 1) {
      control.removeAt(control.length - 1);
    }

    if (event == 2) {
      control.push(this.initAnswer());
    }
    this.resetError();
  }

  /**
   * @author ntgiang1
   * call this function when change question category
   * @param event
   */
  onChangeQuestionCategory(event: any) {
    this.categoryId = event;
    this.question.categoryId = event;
  }

  /**
   * @author ntgiang1
   * call this function when change question level
   * @param event
   */
  onChangeQuestionLevel(event: any) {
    this.levelId = event;
    this.question.levelId = event;
  }

  /**
   * @author ntgiang1
   * add one answer for multiple choise question
   */
  addComponentAnswer() {
    const control = <FormArray>this.formCreateQuestion.controls['answers'];
    control.push(this.initAnswer());
  }

  /**
   * @author ntgiang1
   * remove one answer for multiple choise question
   */
  removeAnswer(i: number) {
    const control = <FormArray>this.formCreateQuestion.controls['answers'];
    control.removeAt(i);
  }

  /**
   * @author ntgiang1
   * submit form create question
   * @param formCreateQuestion
   */
  onSubmitFormCreateQuestion(formCreateQuestion) {
    //reset error
    this.resetError();
    this.question.creatorId = this._currentUser.getUser().id;
    this.question.answers = this.formCreateQuestion.value.answers;
    if (this.validateCreateQuestion(this.question) && this.error_sizeImage == null) {
      this.convertFormValueToString(this.question);
      let file = this.fileContent.nativeElement;
      if (file.files.length > 0) {
        this._upload.postWithFile(ApiConstant.URL_UPLOAD_IMAGE, null, file.files).then((imageUrl: string) => {
          this.question.linkImage = imageUrl;
        }, (error) => {
        }).then(()=>{
          this.saveFormDataCreateQuestion(this.question);
        });
      } else {
        this.saveFormDataCreateQuestion(this.question);
      }
    }
  }

  saveFormDataCreateQuestion(question:Question) {
    // type essay
    if(this.isTypeEssay(question.typeId)){
      if (this.isNullAndTrim(question.answers[0].content)) {
        question.answers = null;
      }
    }else{
      // type multiple - choice
      question.answers = this.convertIsCorrectAnswers(question.answers);
      question.answers = this.removeContentAnswersNull(question.answers);
    }
    let temp = this.question;
    this._dataService.post(ApiConstant.API_QUESTION_CREATE, this.question).subscribe((res: any) => {
      this.resetFormAfterSubmit(temp);
      this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
    }, error => {
      this._dataService.handleError(error);
      switch (error.status) {
        case 422:
          break;
        case 409:
          break;
        default:
          break;
      }
      this._dataService.handleError(error);
    });
  }

  /**
   * @author: ntgiang1
   * call this function after create question successfully
   */
  resetFormAfterSubmit(question:Question) {
    this.formCreateQuestion.reset({typeId: [1]});
    this.setValueQuestion(question);
    this.displaySuggestion = true;
    this.resetError();
    this.url_image = null;
  }

  /**
   * @author ntgiang1
   * set value of question after submit
   * @param question 
   */
  setValueQuestion(question:Question) {
    switch(question.typeId) {
      case 1:
        this.formCreateQuestion = this._fb.group({
          content: ['', [Validators.required]],
          linkImage: [''],
          typeId: this._fb.array([question.typeId]),
          categoryId: this._fb.array([question.categoryId]),
          levelId: this._fb.array([question.levelId]),
          answers: this._fb.array([
            this.initAnswer(),
          ])
        });
      break;
      case 2:
        this.formCreateQuestion = this._fb.group({
          content: ['', [Validators.required]],
          linkImage: [''],
          typeId: this._fb.array([question.typeId]),
          categoryId: this._fb.array([question.categoryId]),
          levelId: this._fb.array([question.levelId]),
          answers: this._fb.array([
            this.initAnswer(),
            this.initAnswer(),
          ])
        });
      break;
    }
    
    this.question = this.formCreateQuestion.value;
  }

  /**
   * @author ntgiang1
   * convert object value form before submit
   */
  convertFormValueToString(formCreateQuestion) {
    formCreateQuestion.typeId = formCreateQuestion.typeId[0];
    formCreateQuestion.levelId = formCreateQuestion.levelId[0];
    formCreateQuestion.categoryId = formCreateQuestion.categoryId[0];
  }

  /**
   * @author ntgiang1
   * call this function when change image for upload
   * @param event
   */
  onFileImageChange(event: any) {
    this.url_image = null;
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      console.log(event.target.files);
      const formData = new FormData();
      formData.append('image', file);

      if (file.size <= 3145728) {
        this.error_sizeImage = null;
        reader.readAsDataURL(file);
        reader.onload = (event: any) => {
          this.url_image = event.target.result;
        };
      } else {
        this.error_sizeImage = MessageContstants.ERROR_SIZE_IMAGE;
      }
    }
  }

  isDisplaySuggestion() {
    this.displaySuggestion = !this.displaySuggestion;
  }

  /**
   * @author ntgiang1
   * validate value form
   * @param value
   */
  validateCreateQuestion(value: Question) {
    let count = 0;
    for (let val of value.answers) {
      if (val.isCorrect == null || val.isCorrect == false) {
        count = count + 1;
      }
    }

    if (count == value.answers.length && value.typeId[0] == 2) {
      this.answer_error = MessageContstants.PARAMETER_IS_CORRECT_HAVE_LEAST_ONE;
      return false;
    }
    return true;
  }

  /**
   * @author: ntgiang1
   * call this function when click reset button
   */
  resetFormCreateGroup() {
    this.formCreateQuestion.reset({typeId: [1]});
    this.initQuestion();
    this.displaySuggestion = true;
    this.resetError();
    this.url_image = null;
    this.file = null;
  }

  /**
   * @author ntgiang1
   * clear file choosed
   */
  clearFile() {
    this.formCreateQuestion.get('fileImage').setValue(null);
    this.fileContent.nativeElement.value = '';
  }

  /**
   * @author ntgiang1
   * reset error message to null
   */
  resetError() {
    this.error_sizeImage = null;
    this.error_isImage = null;
    this.answer_error = null;
    this.question_error = null;
  }

  /** 
   * @author ntgiang1
   * check disable submit button
  */
  isDisableForm() {
    let disable = true;
    let count = 0;
    //check with is essay question
    if (this.question.levelId[0] != null) {
      if (this.question.levelId[0] != '') {
        count += 1;
      }
    }
    if (this.question.categoryId[0] != null) {
      if (this.question.categoryId[0] != '') {
        count += 1;
      }
    }

    if (this.question.content != null) {
      if (this.question.content.trim() != '') {
        count += 1;
      }
    }
    switch (this.question.typeId[0]) {
      case 1:
        if (count == 3) {
          this.disableSave = false;
        } else {
          this.disableSave = true;
        }
        break;
      case 2:
        let countInCorrect = 0;
        let countContentCorrect = 0;
        for (let val of this.formCreateQuestion.value.answers) {
          if (val.isCorrect == true) {
            countInCorrect = countInCorrect + 1;
          } else {
            val.isCorrect = false;
          }

          if (val.content != null) {
            if (val.content.trim().length != '') {
              countContentCorrect = countContentCorrect + 1;
              if (val.isCorrect == true) {
                countContentCorrect = countContentCorrect + 1;
              }
            }   
          }
        }

        if (count == 3 && countInCorrect > 0 && countContentCorrect >= 3) {
          this.disableSave = false;
        } else {
          this.disableSave = true;
        }
        break;
    }
    return this.disableSave;
  }

  /**
   * @author ntgiang1
   * remove answer null or empty
   */
  removeContentAnswersNull(answes){
    if(this.isListNull(answes)){
      return;
    }
    answes = answes.filter(item => !this.isNullAndTrim(item.content));
    return answes;
  }

  /**
   * set isCorrect to false if it is null
   * @param answes 
   */
  convertIsCorrectAnswers(answes){
    if(this.isListNull(answes)){
      return;
    }

    for(let item of answes){
      if(this.isNull(item.isCorrect)){
        item.isCorrect = false;
      }
    }

    return answes;
  }

  /**
   * check null or empty
   * @param input 
   */
  isNull(input){
    if (input == null || input == '') {
      return true;
    }
    return false;
  }

  
  isNullAndTrim(content){
    if(this.isNull(content) || this.isNull(content.trim())){
      return true;
    }
    return false;
  }

  isTypeEssay(type){
    if(type == 1){
      return true;
    }
    return false;
  }

  isListNull(input){
    if (input == null || input.length == 0) {
      return true;
    }
    return false;
  }

  isLess2Element(input){
    if(this.isListNull(input) || input.length < 2){
      return false;
    }
    
    let i =0;
    for(let item of input){
      if(!this.isNullAndTrim(item.content)){
        i++;
      }
    }
    if(i >= 2){
      return true;
    }

    return false;
  }

  isLess1ElementCorrect(input){
    if(this.isListNull(input)){
      return false;
    }
  
    for(let item of input){
      if(!this.isNull(item.isCorrect) && item.isCorrect && !this.isNullAndTrim(item.content)){
        return true;
      }
    }
    return false;
  }

  formatAnswers(input){
    if(this.isListNull(input)){
      return;
    }
  
    for(let item of input){
      if(this.isNullAndTrim(item.content) && !this.isNull(item.isCorrect.trim())){

      }
    }
  }

  isEnableForm() {
    // check category 
    if(this.isNull(this.question.categoryId[0])){
      console.log(2);
      return false;
    }
    

    // check type 
    if(this.isNull(this.question.typeId[0])){
      console.log(3);
      return false;
    }

    // check level 
    if(this.isNull(this.question.levelId[0])){
      console.log(4);
      return false;
    }

    // check content of question 
    if(this.isNull(this.question.content)){
      console.log(5);
      return false;
    }

    //check with is multi-choice question
    if(!this.isTypeEssay(this.question.typeId[0])){
      // check answers has Less 2 Element
      if(!this.isLess2Element(this.formCreateQuestion.value.answers)){
        console.log(6);
        return false;
      }

       // check answers has Less 1 Element Correct
       if(!this.isLess1ElementCorrect(this.formCreateQuestion.value.answers)){
        console.log(7);
        return false;
      } 
    }
    return true;
  }
}
