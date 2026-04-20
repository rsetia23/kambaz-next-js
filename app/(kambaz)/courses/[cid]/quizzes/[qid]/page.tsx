"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../client";
import { formatDate, QUIZ_TYPES, ASSIGNMENT_GROUPS } from "../utils";

const formatSubmittedAt = (value?: string) => {
  if (!value) return "Unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const day = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const time = date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase()
    .replace(" ", "");

  return `${day} at ${time}`;
};

export default function QuizDetailsPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const user = currentUser as any;
  const isFaculty = user?.role === "FACULTY" || user?.role === "ADMIN";
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      const loadedQuiz = await client.findQuizById(qid as string);
      setQuiz(loadedQuiz);
    };

    void loadQuiz();
  }, [qid]);

  if (!quiz) {
    return <div className="p-3">Loading quiz...</div>;
  }

  const attemptsUsed = Number(quiz.attemptsUsed) || 0;
  const attemptLimit = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
  const attemptsRemaining = Math.max(0, attemptLimit - attemptsUsed);

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <div className="text-muted mb-1">
            {quiz.published ? "Published" : "Unpublished"}
          </div>
          <h2 className="mb-1">{quiz.title}</h2>
          <div className="text-muted">
            {QUIZ_TYPES.find((type) => type.value === quiz.quizType)?.label}
          </div>
        </div>
        <div className="d-flex gap-2">
          {isFaculty ? (
            <>
              <Button
                variant="outline-secondary"
                onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}
              >
                Preview
              </Button>
              <Button
                variant="danger"
                onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
              >
                Edit
              </Button>
            </>
          ) : (
            <Button
              variant="danger"
              disabled={!quiz.published || (!quiz.latestAttempt && attemptsRemaining <= 0)}
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}
            >
              {attemptsRemaining <= 0 && quiz.latestAttempt
                ? "View Last Attempt"
                : attemptsUsed > 0
                  ? "Retake Quiz"
                  : "Start Quiz"}
            </Button>
          )}
        </div>
      </div>

      <div className="border rounded p-3 mb-4">
        <div dangerouslySetInnerHTML={{ __html: quiz.description || "No description yet." }} />
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="border rounded p-3 h-100">
            <div>Assignment Group</div>
            <div className="fw-semibold">
              {ASSIGNMENT_GROUPS.find((group) => group.value === quiz.assignmentGroup)?.label}
            </div>
            <hr />
            <div>Points</div>
            <div className="fw-semibold">{quiz.points}</div>
            <hr />
            <div>Questions</div>
            <div className="fw-semibold">{quiz.questions?.length || 0}</div>
            <hr />
            <div>Time Limit</div>
            <div className="fw-semibold">{quiz.timeLimit} minutes</div>
            <hr />
            <div>Attempts</div>
            <div className="fw-semibold">
              {quiz.multipleAttempts ? `${quiz.howManyAttempts} allowed` : "1 attempt"}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="border rounded p-3 h-100">
            <div>Shuffle Answers: {quiz.shuffleAnswers ? "Yes" : "No"}</div>
            <div>One Question at a Time: {quiz.oneQuestionAtATime ? "Yes" : "No"}</div>
            <div>Webcam Required: {quiz.webcamRequired ? "Yes" : "No"}</div>
            <div>
              Lock Questions After Answering:{" "}
              {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
            </div>
            <div>Access Code: {quiz.accessCode ? "Required" : "None"}</div>
            <hr />
            <div>Available: {formatDate(quiz.availableDate)}</div>
            <div>Due: {formatDate(quiz.dueDate)}</div>
            <div>Until: {formatDate(quiz.untilDate)}</div>
            {!isFaculty && (
              <>
                <hr />
                <div>Attempts Used: {attemptsUsed}</div>
                <div>Attempts Remaining: {attemptsRemaining}</div>
                {quiz.latestAttempt && (
                  <>
                    <div>
                      Latest Score: {quiz.latestAttempt.score} /{" "}
                      {quiz.latestAttempt.possiblePoints}
                    </div>
                    <div>Submitted {formatSubmittedAt(quiz.latestAttempt.submittedAt)}</div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
