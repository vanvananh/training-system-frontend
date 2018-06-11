import {Routes} from '@angular/router';
import {AdminComponent} from './admin.component';

export const adminRoutes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', loadChildren: './home-admin/home-admin.module#HomeAdminModule'},
      {path: 'account', loadChildren: './account/account.module#AccountModule'},
      {path: 'group', loadChildren: './group/group.module#GroupModule'},
      {path: 'categoryquestion', loadChildren: './categoryquestion/categoryquestion.module#CategoryQuestionModule'},
      {path: 'exam', loadChildren: './exam/exam.module#ExamModule'},
      {path: 'question-answer', loadChildren: './question/question.module#QuestionModule'},
    ]
  }
];
