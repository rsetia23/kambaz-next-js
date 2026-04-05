/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../client";
import QuestionEditor from "../../QuestionEditor";
import {
  ASSIGNMENT_GROUPS,
  computeQuizPoints,
  defaultQuestion,
  defaultQuiz,
  QUIZ_TYPES,
  SHOW_CORRECT_ANSWER_OPTIONS,
} from "../../utils";

export default function QuizEditorPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"DETAILS" | "QUESTIONS">("DETAILS");
  const [quiz, setQuiz] = useState<any>(defaultQuiz(cid as string));
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [draftQuestion, setDraftQuestion] = useState<any | null>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      if (qid === "new") {
        setQuiz(defaultQuiz(cid as string));
        return;
      }
      const loadedQuiz = await client.findQuizById(qid as string);
      setQuiz(loadedQuiz);
    };

    void loadQuiz();
  }, [cid, qid]);

  const questions = quiz.questions || [];
  const totalPoints = useMemo(() => computeQuizPoints(questions), [questions]);

  useEffect(() => {
    if (quiz.points !== totalPoints) {
      setQuiz((currentQuiz: any) => ({ ...currentQuiz, points: totalPoints }));
    }
  }, [quiz.points, totalPoints]);

  const saveQuiz = async (publish = false, goToList = false) => {
    const payload = { ...quiz, points: totalPoints, published: publish || quiz.published };
    let savedQuiz = null;
    if (qid === "new") {
      savedQuiz = await client.createQuizForCourse(cid as string, payload);
    } else {
      savedQuiz = await client.updateQuiz({ ...payload, _id: qid });
    }

    router.push(
      goToList
        ? `/courses/${cid}/quizzes`
        : `/courses/${cid}/quizzes/${savedQuiz._id}`
    );
  };

  const startNewQuestion = () => {
    const question = defaultQuestion();
    setEditingQuestionId(question._id);
    setDraftQuestion(question);
  };

  const startEditingQuestion = (question: any) => {
    setEditingQuestionId(question._id);
    setDraftQuestion(JSON.parse(JSON.stringify(question)));
  };

  const cancelQuestionEdit = () => {
    setEditingQuestionId(null);
    setDraftQuestion(null);
  };

  const saveQuestion = () => {
    if (!draftQuestion) return;
    const existingQuestion = questions.find(
      (question: any) => question._id === draftQuestion._id
    );
    const updatedQuestions = existingQuestion
      ? questions.map((question: any) =>
          question._id === draftQuestion._id ? draftQuestion : question
        )
      : [...questions, draftQuestion];
    setQuiz({ ...quiz, questions: updatedQuestions, points: computeQuizPoints(updatedQuestions) });
    cancelQuestionEdit();
  };

  const deleteQuestion = (questionId: string) => {
    const updatedQuestions = questions.filter((question: any) => question._id !== questionId);
    setQuiz({ ...quiz, questions: updatedQuestions, points: computeQuizPoints(updatedQuestions) });
    if (editingQuestionId === questionId) {
      cancelQuestionEdit();
    }
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">{qid === "new" ? "New Quiz" : "Edit Quiz"}</h2>
        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes`)}>
            Cancel
          </Button>
          <Button variant="outline-danger" onClick={() => void saveQuiz(false, false)}>
            Save
          </Button>
          <Button variant="danger" onClick={() => void saveQuiz(true, true)}>
            Save & Publish
          </Button>
        </div>
      </div>

      <div className="d-flex gap-2 mb-4">
        <Button
          variant={activeTab === "DETAILS" ? "danger" : "outline-secondary"}
          onClick={() => setActiveTab("DETAILS")}
        >
          Details
        </Button>
        <Button
          variant={activeTab === "QUESTIONS" ? "danger" : "outline-secondary"}
          onClick={() => setActiveTab("QUESTIONS")}
        >
          Questions
        </Button>
      </div>

      {activeTab === "DETAILS" && (
        <Form className="d-flex flex-column gap-3">
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={quiz.description}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            />
          </Form.Group>

          <div className="row g-3">
            <div className="col-md-6">
              <Form.Label>Quiz Type</Form.Label>
              <Form.Select
                value={quiz.quizType}
                onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
              >
                {QUIZ_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col-md-6">
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select
                value={quiz.assignmentGroup}
                onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
              >
                {ASSIGNMENT_GROUPS.map((group) => (
                  <option key={group.value} value={group.value}>
                    {group.label}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col-md-4">
              <Form.Label>Points</Form.Label>
              <Form.Control value={totalPoints} readOnly />
            </div>
            <div className="col-md-4">
              <Form.Label>Time Limit (minutes)</Form.Label>
              <Form.Control
                type="number"
                value={quiz.timeLimit}
                onChange={(e) =>
                  setQuiz({ ...quiz, timeLimit: Number(e.target.value) || 0 })
                }
              />
            </div>
            <div className="col-md-4">
              <Form.Label>How Many Attempts</Form.Label>
              <Form.Control
                type="number"
                value={quiz.howManyAttempts}
                disabled={!quiz.multipleAttempts}
                onChange={(e) =>
                  setQuiz({ ...quiz, howManyAttempts: Number(e.target.value) || 1 })
                }
              />
            </div>
            <div className="col-md-6">
              <Form.Label>Show Correct Answers</Form.Label>
              <Form.Select
                value={quiz.showCorrectAnswers}
                onChange={(e) =>
                  setQuiz({ ...quiz, showCorrectAnswers: e.target.value })
                }
              >
                {SHOW_CORRECT_ANSWER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col-md-6">
              <Form.Label>Access Code</Form.Label>
              <Form.Control
                value={quiz.accessCode}
                onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <Form.Label>Available Date</Form.Label>
              <Form.Control
                type="datetime-local"
                value={quiz.availableDate}
                onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="datetime-local"
                value={quiz.dueDate}
                onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <Form.Label>Until Date</Form.Label>
              <Form.Control
                type="datetime-local"
                value={quiz.untilDate}
                onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
              />
            </div>
          </div>

          <div className="d-flex flex-wrap gap-4">
            <Form.Check
              type="switch"
              label="Shuffle Answers"
              checked={quiz.shuffleAnswers}
              onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
            />
            <Form.Check
              type="switch"
              label="Multiple Attempts"
              checked={quiz.multipleAttempts}
              onChange={(e) =>
                setQuiz({ ...quiz, multipleAttempts: e.target.checked })
              }
            />
            <Form.Check
              type="switch"
              label="One Question at a Time"
              checked={quiz.oneQuestionAtATime}
              onChange={(e) =>
                setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
              }
            />
            <Form.Check
              type="switch"
              label="Webcam Required"
              checked={quiz.webcamRequired}
              onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
            />
            <Form.Check
              type="switch"
              label="Lock Questions After Answering"
              checked={quiz.lockQuestionsAfterAnswering}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  lockQuestionsAfterAnswering: e.target.checked,
                })
              }
            />
            <Form.Check
              type="switch"
              label="Published"
              checked={quiz.published}
              onChange={(e) => setQuiz({ ...quiz, published: e.target.checked })}
            />
          </div>
        </Form>
      )}

      {activeTab === "QUESTIONS" && (
        <div className="d-flex flex-column gap-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">
              {questions.length} question(s) | {totalPoints} total points
            </div>
            <Button variant="danger" onClick={startNewQuestion}>
              New Question
            </Button>
          </div>

          {questions.map((question: any) => (
            <div key={question._id} className="border rounded p-3">
              {editingQuestionId === question._id && draftQuestion ? (
                <QuestionEditor
                  question={draftQuestion}
                  onChange={setDraftQuestion}
                  onCancel={cancelQuestionEdit}
                  onSave={saveQuestion}
                />
              ) : (
                <>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h5 className="mb-1">{question.title}</h5>
                      <div className="text-muted small">
                        {question.type.replaceAll("_", " ")} | {question.points} pts
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => startEditingQuestion(question)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => deleteQuestion(question._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div>{question.questionText || "No prompt yet."}</div>
                </>
              )}
            </div>
          ))}

          {editingQuestionId &&
            draftQuestion &&
            !questions.some((question: any) => question._id === editingQuestionId) && (
              <QuestionEditor
                question={draftQuestion}
                onChange={setDraftQuestion}
                onCancel={cancelQuestionEdit}
                onSave={saveQuestion}
              />
            )}
        </div>
      )}
    </div>
  );
}
