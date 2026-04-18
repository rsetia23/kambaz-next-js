"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import * as quizClient from "./quizzes/client";

const formatPathSegment = (segment = "") =>
  segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname();
  const { qid } = useParams();
  const [quizTitle, setQuizTitle] = useState("");

  useEffect(() => {
    const quizId = Array.isArray(qid) ? qid[0] : qid;
    if (!quizId || quizId === "new" || !pathname.includes("/quizzes/")) {
      setQuizTitle("");
      return;
    }

    let active = true;
    const loadQuizTitle = async () => {
      try {
        const quiz = await quizClient.findQuizById(quizId);
        if (active) {
          setQuizTitle(quiz?.title || quizId);
        }
      } catch {
        if (active) {
          setQuizTitle(quizId);
        }
      }
    };

    void loadQuizTitle();

    return () => {
      active = false;
    };
  }, [pathname, qid]);

  const currentPage = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "";
    const quizId = Array.isArray(qid) ? qid[0] : qid;

    if (pathname.includes("/quizzes")) {
      if (lastSegment === "edit") {
        return quizId === "new" ? "New Quiz" : `${quizTitle || quizId} > Edit`;
      }
      if (lastSegment === "preview") {
        return `${quizTitle || quizId} > Preview`;
      }
      if (quizId && lastSegment === quizId) {
        return quizTitle || quizId;
      }
      return "Quizzes";
    }

    return formatPathSegment(lastSegment);
  }, [pathname, qid, quizTitle]);

  return (
    <span>
      Course {course?.name} &gt; {currentPage}
    </span>
  );
}
