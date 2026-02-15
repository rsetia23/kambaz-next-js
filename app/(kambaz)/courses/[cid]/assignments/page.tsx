"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../database";

export default function Assignments() {
  const { cid } = useParams();

  const assignments = db.assignments;

  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />

      <button id="wd-add-assignment-group">+ Group</button>

      <button id="wd-add-assignment">+ Assignment</button>

      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>

      <ul id="wd-assignment-list">

        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (

            <li
              key={assignment._id}
              className="wd-assignment-list-item"
            >

              <Link
                href={`/courses/${cid}/assignments/${assignment._id}`}
                className="wd-assignment-link"
              >
                {assignment.title}
              </Link>

              <br />

              Multiple Modules | <b>Not available until</b> May 6 at 12:00am

              <br />

              <b>Due</b> May 13 at 11:59pm | 100 pts

            </li>

          ))}

      </ul>
    </div>
  );
}
