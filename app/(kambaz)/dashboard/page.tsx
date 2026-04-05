"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";
import {
  setCourses,
} from "../courses/reducer";
import { enroll, setEnrollments, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";
import * as client from "../courses/client";
import * as enrollmentsClient from "../enrollments/client";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );
  const user = currentUser as any;
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });
  const isFaculty = user?.role === "FACULTY";
  const isEnrolled = (courseId: string) =>
    user
      ? enrollments.some(
          (enrollment: any) =>
            enrollment.user === user._id && enrollment.course === courseId
        )
      : false;
  const visibleCourses = courses.filter((course: any) =>
    showAllCourses ? true : isEnrolled(course._id)
  );

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
    if (user) {
      const enrollment = await enrollmentsClient.enrollInCourse(newCourse._id);
      dispatch(enroll(enrollment));
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course: any) => course._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    const updatedCourse = await client.updateCourse(course);
    if (!updatedCourse) return;
    const refreshedCourses = courses.map((c: any) =>
      c._id === course._id ? course : c
    );
    dispatch(setCourses(refreshedCourses));
  };

  const onEnroll = async (courseId: string) => {
    const enrollment = await client.enrollIntoCourse("current", courseId);
    dispatch(enroll(enrollment));
  };

  const onUnenroll = async (courseId: string) => {
    await client.unenrollFromCourse("current", courseId);
    dispatch(unenroll({ user: user._id, course: courseId }));
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      const allCourses = await client.findAllCourses();
      dispatch(setCourses(allCourses));
      if (user) {
        const currentEnrollments =
          await enrollmentsClient.findEnrollmentsForCurrentUser();
        dispatch(setEnrollments(currentEnrollments));
      } else {
        dispatch(setEnrollments([]));
      }
    };

    void loadDashboardData();
  }, [dispatch, user]);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>
        New Course
        {user && (
          <button
            className="btn btn-primary float-end"
            onClick={() => setShowAllCourses(!showAllCourses)}
          >
            Enrollments
          </button>
        )}
        {isFaculty && (
          <button
            className="btn btn-primary float-end me-2"
            id="wd-add-new-course-click"
            onClick={() => void onAddNewCourse()}
          >
            {" "}
            Add{" "}
          </button>
        )}
        {isFaculty && (
          <button
            className="btn btn-warning float-end me-2"
            onClick={() => void onUpdateCourse()}
            id="wd-update-course-click"
          >
            Update
          </button>
        )}
      </h5>
      <br />
      {isFaculty && (
        <FormControl
          value={course.name}
          className="mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
      )}
      {isFaculty && (
        <FormControl
          as="textarea"
          value={course.description}
          rows={3}
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
        />
      )}
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((course) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/courses/${course._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src="/images/reactjs.jpg"
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}{" "}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}{" "}
                    </CardText>
                    <Button variant="primary"> Go </Button>
                    {isFaculty && (
                      <button
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end"
                      >
                        Edit
                      </button>
                    )}
                    {isFaculty && (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          void onDeleteCourse(course._id);
                        }}
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>
                    )}
                    {user && isEnrolled(course._id) && (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          void onUnenroll(course._id);
                        }}
                        className="btn btn-danger float-end"
                      >
                        Unenroll
                      </button>
                    )}
                    {user && !isEnrolled(course._id) && (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          void onEnroll(course._id);
                        }}
                        className="btn btn-success float-end"
                      >
                        Enroll
                      </button>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
