"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "./client";
import { availabilityLabel, defaultQuiz, formatDate } from "./utils";

export default function QuizzesPage() {
  const { cid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const user = currentUser as any;
  const isFaculty = user?.role === "FACULTY" || user?.role === "ADMIN";
  const [quizzes, setQuizzes] = useState<any[]>([]);

  const fetchQuizzes = async () => {
    const loadedQuizzes = await client.findQuizzesForCourse(cid as string);
    setQuizzes(loadedQuizzes);
  };

  useEffect(() => {
    void fetchQuizzes();
  }, [cid]);

  const addQuiz = async () => {
    const quiz = await client.createQuizForCourse(
      cid as string,
      defaultQuiz(cid as string)
    );
    router.push(`/courses/${cid}/quizzes/${quiz._id}/edit`);
  };

  const removeQuiz = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    await fetchQuizzes();
  };

  const togglePublish = async (quiz: any) => {
    await client.updateQuiz({ ...quiz, published: !quiz.published });
    await fetchQuizzes();
  };

  return (
    <div id="wd-quizzes" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Quizzes</h2>
        {isFaculty && (
          <Button id="wd-add-quiz" variant="danger" onClick={() => void addQuiz()}>
            + Quiz
          </Button>
        )}
      </div>

      {quizzes.length === 0 && (
        <div className="border rounded p-4 text-muted">
          No quizzes yet. {isFaculty ? "Click + Quiz to create the first quiz." : ""}
        </div>
      )}

      <div className="d-flex flex-column gap-3">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="border rounded p-3">
            <div className="d-flex justify-content-between align-items-start gap-3">
              <div>
                <div className="d-flex align-items-center gap-2">
                  {isFaculty ? (
                    <button
                      className="btn btn-link p-0 text-success text-decoration-none"
                      onClick={() => void togglePublish(quiz)}
                    >
                      {quiz.published ? "Published" : "Unpublished"}
                    </button>
                  ) : (
                    <span>{quiz.published ? "Published" : "Unpublished"}</span>
                  )}
                  <Link
                    href={`/courses/${cid}/quizzes/${quiz._id}`}
                    className="fw-bold text-decoration-none"
                  >
                    {quiz.title}
                  </Link>
                </div>
                <div className="text-muted small mt-2">
                  <div>{availabilityLabel(quiz)}</div>
                  <div>Due {formatDate(quiz.dueDate)}</div>
                  <div>
                    {quiz.points || 0} pts | {quiz.questionCount || quiz.questions?.length || 0}{" "}
                    questions
                  </div>
                  {!isFaculty && quiz.latestAttempt && (
                    <div>
                      Score: {quiz.latestAttempt.score} / {quiz.latestAttempt.possiblePoints}
                    </div>
                  )}
                </div>
              </div>

              {isFaculty && (
                <div className="d-flex gap-2 flex-wrap justify-content-end">
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => router.push(`/courses/${cid}/quizzes/${quiz._id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => void togglePublish(quiz)}
                  >
                    {quiz.published ? "Unpublish" : "Publish"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => void removeQuiz(quiz._id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
