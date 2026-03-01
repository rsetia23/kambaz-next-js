"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { deleteAssignment, setAssignments } from "./reducer";
import { RootState } from "../../../store";
import * as client from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const user = currentUser as any;
  const isFaculty = user?.role === "FACULTY";

  useEffect(() => {
    const fetchAssignments = async () => {
      const assignments = await client.findAssignmentsForCourse(cid as string);
      dispatch(setAssignments(assignments));
    };

    void fetchAssignments();
  }, [cid, dispatch]);

  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      {isFaculty && <button id="wd-add-assignment-group">+ Group</button>}
      {isFaculty && (
        <Button
          id="wd-add-assignment"
          className="ms-2"
          onClick={() => router.push(`/courses/${cid}/assignments/new`)}
        >
          + Assignment
        </Button>
      )}

      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total {isFaculty && <button>+</button>}
      </h3>

      <ul id="wd-assignment-list">
        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <li key={assignment._id} className="wd-assignment-list-item">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <Link
                    href={`/courses/${cid}/assignments/${assignment._id}`}
                    className="wd-assignment-link"
                  >
                    {assignment.title}
                  </Link>
                  <br />
                  {assignment.description}
                  <br />
                  <b>Due</b> {assignment.dueDate} | {assignment.points} pts
                </div>
                {isFaculty && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={async () => {
                      if (window.confirm("Delete this assignment?")) {
                        await client.deleteAssignment(assignment._id);
                        dispatch(deleteAssignment(assignment._id));
                      }
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
