import { Quiz } from "../../quiz";

export type StartGameCommand = {
    email: string;
    quizId: string;
}

export type StartGameResponse = {
    code: string;
}

export type ExistingGameResponse = {
    quizId: string;
    code: string;
};