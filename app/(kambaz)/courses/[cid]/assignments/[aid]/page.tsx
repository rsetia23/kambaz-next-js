"use client";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-4">

      <Form>

        {/* Assignment Name */}
        <Form.Group className="mb-3">
          <Form.Label><b>Assignment Name</b></Form.Label>
          <Form.Control defaultValue="A1 - ENV + HTML" />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-4">
          <Form.Control
            as="textarea"
            rows={5}
            defaultValue="The assignment is available online Submit a link to the landing page of your Web application running on Netlify."
          />
        </Form.Group>

        {/* Points */}
        <Row className="mb-3 align-items-center">
          <Col md={3}>
            <Form.Label>Points</Form.Label>
          </Col>
          <Col md={3}>
            <Form.Control type="number" defaultValue={100} />
          </Col>
        </Row>

        {/* Assignment Group */}
        <Row className="mb-3 align-items-center">
          <Col md={3}>
            <Form.Label>Assignment Group</Form.Label>
          </Col>
          <Col md={6}>
            <Form.Select defaultValue="ASSIGNMENTS">
              <option>Assignments</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Display Grade As */}
        <Row className="mb-3 align-items-center">
          <Col md={3}>
            <Form.Label>Display Grade as</Form.Label>
          </Col>
          <Col md={6}>
            <Form.Select defaultValue="Percentage">
              <option>Percentage</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Submission Type */}
        <Row className="mb-3 align-items-center">
          <Col md={3}>
            <Form.Label>Submission Type</Form.Label>
          </Col>
          <Col md={6}>
            <Form.Select defaultValue="Online">
              <option>Online</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Online Entry Options */}
        <Row className="mb-4">
          <Col md={3}></Col>
          <Col md={9}>
            <Form.Label>Online Entry Options</Form.Label>

            <Form.Check label="Text Entry" />
            <Form.Check label="Website URL" defaultChecked />
            <Form.Check label="Media Recordings" />
            <Form.Check label="Student Annotation" />
            <Form.Check label="File Uploads" />
          </Col>
        </Row>

        {/* Assign To */}
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label>Assign</Form.Label>
          </Col>
          <Col md={9}>
            <Form.Group>
              <Form.Label>Assign to</Form.Label>
              <Form.Control defaultValue="Everyone" />
            </Form.Group>
          </Col>
        </Row>

        {/* Dates */}
        <Row className="mb-4">
          <Col md={3}></Col>
          <Col md={3}>
            <Form.Label>Due</Form.Label>
            <Form.Control type="date" defaultValue="2024-05-13" />
          </Col>
          <Col md={3}>
            <Form.Label>Available From</Form.Label>
            <Form.Control type="date" defaultValue="2024-05-06" />
          </Col>
          <Col md={3}>
            <Form.Label>Until</Form.Label>
            <Form.Control type="date" defaultValue="2024-05-20" />
          </Col>
        </Row>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger">Save</Button>
        </div>

      </Form>
    </div>
  );
}
