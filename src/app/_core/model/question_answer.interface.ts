export interface Question {
    questionId: number;
    content: string;
    linkImage: string|any;
    createDate: Date;
    creatorId: any|number;
    typeId: number;
    categoryId: number;
    levelId: number;
    answers: Answer[];
}

export interface Answer {
    answerId: number;
    content: string;
    isCorrect: boolean;
    questionId: number;
}
