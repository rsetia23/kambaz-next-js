/* eslint-disable @typescript-eslint/no-explicit-any */
export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER_A6 ||
  process.env.NEXT_PUBLIC_HTTP_SERVER;

export const QUIZ_TYPES = [
  { value: "GRADED_QUIZ", label: "Graded Quiz" },
  { value: "PRACTICE_QUIZ", label: "Practice Quiz" },
  { value: "GRADED_SURVEY", label: "Graded Survey" },
  { value: "UNGRADED_SURVEY", label: "Ungraded Survey" },
];

export const ASSIGNMENT_GROUPS = [
  { value: "QUIZZES", label: "Quizzes" },
  { value: "EXAMS", label: "Exams" },
  { value: "ASSIGNMENTS", label: "Assignments" },
  { value: "PROJECT", label: "Project" },
];

export const SHOW_CORRECT_ANSWER_OPTIONS = [
  { value: "NEVER", label: "Never" },
  { value: "AFTER_SUBMISSION", label: "After Submission" },
  { value: "AFTER_DUE_DATE", label: "After Due Date" },
];

export const QUESTION_TYPES = [
  { value: "MULTIPLE_CHOICE", label: "Multiple Choice" },
  { value: "TRUE_FALSE", label: "True / False" },
  { value: "FILL_IN_THE_BLANK", label: "Fill in the Blank" },
];

export const defaultChoice = (index: number) => ({
  _id: `choice-${Date.now()}-${index}`,
  text: "",
  correct: index === 0,
});

export const defaultQuestion = () => ({
  _id: `question-${Date.now()}`,
  title: "New Question",
  type: "MULTIPLE_CHOICE",
  points: 10,
  questionText: "",
  choices: [defaultChoice(0), defaultChoice(1)],
  trueFalseAnswer: true,
  blankAnswers: [""],
});

export const defaultQuiz = (courseId: string) => ({
  title: "New Quiz",
  description: "",
  course: courseId,
  quizType: "GRADED_QUIZ",
  points: 0,
  assignmentGroup: "QUIZZES",
  shuffleAnswers: true,
  timeLimit: 20,
  multipleAttempts: false,
  howManyAttempts: 1,
  showCorrectAnswers: "AFTER_SUBMISSION",
  accessCode: "",
  oneQuestionAtATime: true,
  webcamRequired: false,
  lockQuestionsAfterAnswering: false,
  dueDate: "",
  availableDate: "",
  untilDate: "",
  published: false,
  questions: [],
});

export const computeQuizPoints = (questions: any[] = []) =>
  questions.reduce((total, question) => total + (Number(question.points) || 0), 0);

export const formatDate = (value?: string) => {
  if (!value) return "No date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

export const availabilityLabel = (quiz: any) => {
  const now = new Date();
  const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
  const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

  if (availableDate && now < availableDate) {
    return `Not available until ${formatDate(quiz.availableDate)}`;
  }
  if (untilDate && now > untilDate) {
    return "Closed";
  }
  if (availableDate || untilDate) {
    return "Available";
  }
  return quiz.published ? "Available" : "Unpublished";
};
