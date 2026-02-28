"use client";
import { ReactNode } from "react";
import { useEffect, useState } from "react";
import CourseNavigation from "./navigation";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import Breadcrumb from "./Breadcrumb";

export default function CoursesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [showNavigation, setShowNavigation] = useState(true);
  const router = useRouter();
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );
  const course = courses.find((course) => course._id === cid);
  const hasAccess = enrollments.some(
    (enrollment: any) =>
      enrollment.user === currentUser?._id && enrollment.course === cid
  );

  useEffect(() => {
    if (!currentUser || !hasAccess) {
      router.replace("/dashboard");
    }
  }, [currentUser, hasAccess, router]);

  if (!currentUser || !hasAccess) {
    return null;
  }

  return (
    <div id="wd-courses">
      <Breadcrumb course={course} />
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setShowNavigation(!showNavigation)}
        />
        {course?.name}
      </h2>{" "}
      <hr />
      <div className="d-flex">
        <div className={showNavigation ? "d-block" : "d-none"}>
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
