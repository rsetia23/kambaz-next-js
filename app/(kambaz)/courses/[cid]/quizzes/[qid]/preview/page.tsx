"use client";

import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../client";

const normalize = (value: any) => `${value ?? ""}`.trim().toLowerCase();

export default function QuizPreviewPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const user = currentUser as any;
  const isFaculty = user?.role === "FACULTY" || user?.role === "ADMIN";
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    const loadQuiz = async () => {
      const loadedQuiz = await client.findQuizById(qid as string);
      setQuiz(loadedQuiz);
      if (loadedQuiz.latestAttempt && !isFaculty) {
        const latestAnswers = Object.fromEntries(
          (loadedQuiz.latestAttempt.answers || []).map((answer: any) => [
            answer.questionId,
            answer.value,
          ])
        );
        setAnswers(latestAnswers);
        const maxAttempts = loadedQuiz.multipleAttempts
          ? loadedQuiz.howManyAttempts
          : 1;
        if ((loadedQuiz.attemptsUsed || 0) >= maxAttempts) {
          setResult(loadedQuiz.latestAttempt);
        }
      }
    };

    void loadQuiz();
  }, [isFaculty, qid]);

  const questions = quiz?.questions || [];
  const activeQuestions =
    quiz?.oneQuestionAtATime && !result ? [questions[questionIndex]].filter(Boolean) : questions;

  const previewResult = useMemo(() => {
    if (!isFaculty || !quiz || result) return null;
    let score = 0;
    const questionResults = questions.map((question: any) => {
      const submittedAnswer = answers[question._id];
      let correct = false;
      if (question.type === "TRUE_FALSE") {
        correct = Boolean(submittedAnswer) === Boolean(question.trueFalseAnswer);
      } else if (question.type === "FILL_IN_THE_BLANK") {
        correct = (question.blankAnswers || []).some(
          (answer: string) => normalize(answer) === normalize(submittedAnswer)
        );
      } else {
        const correctChoice = (question.choices || []).find((choice: any) => choice.correct)?._id;
        correct = normalize(submittedAnswer) === normalize(correctChoice);
      }
      if (correct) score += Number(question.points) || 0;
      return { questionId: question._id, correct, submittedAnswer };
    });
    return { score, possiblePoints: quiz.points, questionResults };
  }, [answers, isFaculty, quiz, questions, result]);

  if (!quiz) return <div className="p-3">Loading quiz...</div>;

  const currentAttemptCount = Number(quiz.attemptsUsed) || 0;
  const maxAttempts = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
  const attemptsRemaining = Math.max(0, maxAttempts - currentAttemptCount);

  const setAnswer = (questionId: string, value: any) => {
    setAnswers((currentAnswers) => ({ ...currentAnswers, [questionId]: value }));
  };

  const submit = async () => {
    setError("");
    if (isFaculty) {
      setResult(previewResult);
      return;
    }
    try {
      const payload = {
        accessCode,
        answers: questions.map((question: any) => ({
          questionId: question._id,
          value: answers[question._id],
        })),
      };
      const savedAttempt = await client.submitQuizAttempt(qid as string, payload);
      setResult(savedAttempt);
    } catch (submissionError: any) {
      setError(submissionError?.response?.data?.message || "Unable to submit quiz.");
    }
  };

  const resultsToShow = result?.questionResults || previewResult?.questionResults || [];
  const canShowCorrectAnswers =
    isFaculty ||
    quiz.showCorrectAnswers === "AFTER_SUBMISSION" ||
    (quiz.showCorrectAnswers === "AFTER_DUE_DATE" &&
      quiz.dueDate &&
      new Date() > new Date(quiz.dueDate));

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-1">{quiz.title}</h2>
          <div className="text-muted">
            {isFaculty ? "Faculty Preview" : "Student Attempt"}
          </div>
        </div>
        {isFaculty && (
          <Button
            variant="outline-secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
          >
            Edit Quiz
          </Button>
        )}
      </div>

      {!isFaculty && result && (
        <Alert variant="info">
          Score: {result.score} / {result.possiblePoints} on attempt #{result.attemptNumber}
        </Alert>
      )}

      {isFaculty && result && (
        <Alert variant="info">
          Preview score: {previewResult?.score || 0} / {previewResult?.possiblePoints || quiz.points}
        </Alert>
      )}

      {!isFaculty && !result && (
        <div className="border rounded p-3 mb-3">
          <div>Attempts Remaining: {attemptsRemaining}</div>
          {quiz.accessCode && (
            <Form.Group className="mt-3">
              <Form.Label>Access Code</Form.Label>
              <Form.Control
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
              />
            </Form.Group>
          )}
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex flex-column gap-3">
        {activeQuestions.map((question: any, index: number) => {
          const resultForQuestion = resultsToShow.find(
            (entry: any) => entry.questionId === question._id
          );
          const questionNumber =
            quiz.oneQuestionAtATime && !result ? questionIndex + 1 : index + 1;
          return (
            <div
              key={question._id}
              className={`border rounded p-3 ${
                resultForQuestion
                  ? resultForQuestion.correct
                    ? "border-success"
                    : "border-danger"
                  : ""
              }`}
            >
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h5 className="mb-1">
                    {questionNumber}. {question.title}
                  </h5>
                  <div className="text-muted small">{question.points} pts</div>
                </div>
                {resultForQuestion && (
                  <span className={resultForQuestion.correct ? "text-success" : "text-danger"}>
                    {resultForQuestion.correct ? "Correct" : "Incorrect"}
                  </span>
                )}
              </div>

              <div className="mb-3">{question.questionText}</div>

              {question.type === "MULTIPLE_CHOICE" && (
                <div className="d-flex flex-column gap-2">
                  {(question.choices || []).map((choice: any) => (
                    <Form.Check
                      key={choice._id}
                      type="radio"
                      name={question._id}
                      label={choice.text}
                      checked={answers[question._id] === choice._id}
                      disabled={Boolean(result)}
                      onChange={() => setAnswer(question._id, choice._id)}
                    />
                  ))}
                </div>
              )}

              {question.type === "TRUE_FALSE" && (
                <div className="d-flex gap-3">
                  <Form.Check
                    type="radio"
                    label="True"
                    name={question._id}
                    checked={answers[question._id] === true}
                    disabled={Boolean(result)}
                    onChange={() => setAnswer(question._id, true)}
                  />
                  <Form.Check
                    type="radio"
                    label="False"
                    name={question._id}
                    checked={answers[question._id] === false}
                    disabled={Boolean(result)}
                    onChange={() => setAnswer(question._id, false)}
                  />
                </div>
              )}

              {question.type === "FILL_IN_THE_BLANK" && (
                <Form.Control
                  value={answers[question._id] || ""}
                  readOnly={Boolean(result)}
                  onChange={(e) => setAnswer(question._id, e.target.value)}
                />
              )}

              {resultForQuestion && canShowCorrectAnswers && (
                <div className="mt-3 small">
                  Correct answer:{" "}
                  {Array.isArray(resultForQuestion.correctAnswer)
                    ? resultForQuestion.correctAnswer.join(", ")
                    : `${resultForQuestion.correctAnswer}`}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!result && quiz.oneQuestionAtATime && questions.length > 1 && (
        <div className="d-flex justify-content-between mt-3">
          <Button
            variant="outline-secondary"
            disabled={questionIndex === 0}
            onClick={() => setQuestionIndex((current) => current - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline-secondary"
            disabled={questionIndex >= questions.length - 1}
            onClick={() => setQuestionIndex((current) => current + 1)}
          >
            Next
          </Button>
        </div>
      )}

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}>
          Back
        </Button>
        {!result && (
          <Button
            variant="danger"
            disabled={!isFaculty && attemptsRemaining <= 0}
            onClick={() => void submit()}
          >
            {isFaculty ? "Finish Preview" : "Submit Quiz"}
          </Button>
        )}
      </div>
    </div>
  );
}
