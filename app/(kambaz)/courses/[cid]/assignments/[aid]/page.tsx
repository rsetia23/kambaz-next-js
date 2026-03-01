"use client";

import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addAssignment, setAssignments, updateAssignment } from "../reducer";
import { RootState } from "../../../../store";
import * as client from "../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const user = currentUser as any;
  const isFaculty = user?.role === "FACULTY";
  const existingAssignment = assignments.find((a: any) => a._id === aid);
  const [assignment, setAssignment] = useState<any>({
    _id: "",
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableDate: "",
    untilDate: "",
    course: cid,
  });

  useEffect(() => {
    const loadAssignment = async () => {
      if (aid !== "new" && existingAssignment) {
        setAssignment(existingAssignment);
        return;
      }
      if (aid !== "new") {
        const loadedAssignment = await client.findAssignmentById(aid as string);
        setAssignment(loadedAssignment);
      }
    };

    if (aid === "new") {
      setAssignment({
        _id: "",
        title: "",
        description: "",
        points: 100,
        dueDate: "",
        availableDate: "",
        untilDate: "",
        course: cid,
      });
      return;
    }

    void loadAssignment();
  }, [aid, cid, existingAssignment]);

  const save = async () => {
    if (!isFaculty) {
      router.push(`/courses/${cid}/assignments`);
      return;
    }
    if (aid === "new") {
      const newAssignment = await client.createAssignmentForCourse(
        cid as string,
        { ...assignment, course: cid }
      );
      dispatch(addAssignment(newAssignment));
    } else {
      const updatedAssignment = await client.updateAssignment({
        ...assignment,
        course: cid,
      });
      dispatch(updateAssignment(updatedAssignment));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>
            <b>Assignment Name</b>
          </Form.Label>
          <Form.Control
            value={assignment.title}
            readOnly={!isFaculty}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            as="textarea"
            rows={5}
            value={assignment.description}
            readOnly={!isFaculty}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        </Form.Group>

        <Row className="mb-3 align-items-center">
          <Col md={3}>
            <Form.Label>Points</Form.Label>
          </Col>
          <Col md={3}>
            <Form.Control
              type="number"
              value={assignment.points}
              readOnly={!isFaculty}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: Number(e.target.value),
                })
              }
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={3}></Col>

          <Col md={3}>
            <Form.Label>Due</Form.Label>
            <Form.Control
              type="date"
              value={assignment.dueDate}
              readOnly={!isFaculty}
              onChange={(e) =>
                setAssignment({ ...assignment, dueDate: e.target.value })
              }
            />
          </Col>

          <Col md={3}>
            <Form.Label>Available From</Form.Label>
            <Form.Control
              type="date"
              value={assignment.availableDate}
              readOnly={!isFaculty}
              onChange={(e) =>
                setAssignment({ ...assignment, availableDate: e.target.value })
              }
            />
          </Col>

          <Col md={3}>
            <Form.Label>Until</Form.Label>
            <Form.Control
              type="date"
              value={assignment.untilDate}
              readOnly={!isFaculty}
              onChange={(e) =>
                setAssignment({ ...assignment, untilDate: e.target.value })
              }
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => router.push(`/courses/${cid}/assignments`)}
          >
            Cancel
          </Button>

          {isFaculty && (
            <Button variant="danger" type="button" onClick={save}>
              Save
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
