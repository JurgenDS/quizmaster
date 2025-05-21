import { QuizQuestion } from "model/quiz-question"

export interface QuestionListData {
    readonly title: string
    readonly questions: QuizQuestion[]
}

export const emptyQuestionListData = (): QuestionListData => ({
    title: 'Michaeluv list',
    questions: []
})

export const questionListAData = (): QuestionListData => ({
    title: 'Michaeluv list',
    questions: []
})


export const questionListBData = (): QuestionListData => ({
    title: 'Michaeluv list',
    questions: [
    {
      id: 1,
      question: 'What is the capital of France?',
      answers: ['Paris', 'London', 'Berlin', 'Madrid'],
      explanations: ['Correct', '', '', ''],
      questionExplanation: 'Paris is the capital city of France.',
      correctAnswers: [0],
      userInput: []
    },
    {
      id: 2,
      question: 'What is the standard colour of sky?',
      answers: ['3', '4', '5', '22'],
      explanations: ['', 'Correct', '', ''],
      questionExplanation: '2 + 2 equals 4.',
      correctAnswers: [1],
      userInput: []
    }
  ]
})

export const questionListCData = (): QuestionListData => ({
    title: 'Michaeluv list',
    questions: [
    {
      id: 1,
      question: '"What is 2 + 2?"',
      answers: ['Paris', 'London', 'Berlin', 'Madrid'],
      explanations: ['Correct', '', '', ''],
      questionExplanation: 'Paris is the capital city of France.',
      correctAnswers: [0],
      userInput: []
    }
  ]
})
