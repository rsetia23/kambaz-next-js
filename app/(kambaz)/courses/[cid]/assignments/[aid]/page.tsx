"use client";

import { Form, Row, Col, Button } from "react-bootstrap";
import { useParams } from "next/navigation";
import * as db from "../../../../database";
import Link from "next/link";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();

  const assignment = db.assignments.find((a: any) => a._id === aid);

  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3">
          <Form.Label>
            <b>Assignment Name</b>
          </Form.Label>
          <Form.Control defaultValue={assignment?.title} />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-4">
          <Form.Control
            as="textarea"
            rows={5}
            defaultValue={assignment?.description || ""}
          />
        </Form.Group>

        {/* Points */}
        <Row className="mb-3 align-items-center">
          <Col md={3}>
            <Form.Label>Points</Form.Label>
          </Col>
          <Col md={3}>
            <Form.Control
              type="number"
              defaultValue={assignment?.points || 100}
            />
          </Col>
        </Row>

        {/* Dates */}
        <Row className="mb-4">
          <Col md={3}></Col>

          <Col md={3}>
            <Form.Label>Due</Form.Label>
            <Form.Control
              type="date"
              defaultValue={assignment?.dueDate || ""}
            />
          </Col>

          <Col md={3}>
            <Form.Label>Available From</Form.Label>
            <Form.Control
              type="date"
              defaultValue={assignment?.availableDate || ""}
            />
          </Col>

          <Col md={3}>
            <Form.Label>Until</Form.Label>
            <Form.Control
              type="date"
              defaultValue={assignment?.untilDate || ""}
            />
          </Col>
        </Row>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Link href={`/courses/${cid}/assignments`}>
            <Button variant="secondary">Cancel</Button>
          </Link>

          <Link href={`/courses/${cid}/assignments`}>
            <Button variant="danger">Save</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
