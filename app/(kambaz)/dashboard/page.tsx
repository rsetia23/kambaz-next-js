import Link from "next/link";
import Image from "next/image";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "react-bootstrap";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/1234/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/reactjs.jpg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS1234 React JS
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Full Stack software developer
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/1234/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/webdev.jpg" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS4550 Web Development
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description"
                    style={{ height: "100px" }}
                  >
                    Web Developer!
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/1234/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/engw.jpg" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    ENGW 1101 Intro To Writing
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description"
                    style={{ height: "100px" }}
                  >
                    Get introduced to writing!
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/1234/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/toc.jpg" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS3800 Theory Of Computation
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description"
                    style={{ height: "100px" }}
                  >
                    Prove the theory!
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/1234/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/cyber.jpg" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CY2550 Foundations of Cybersecurity
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description"
                    style={{ height: "100px" }}
                  >
                    Learn the foundations of Cybersecurity!
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/1234/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/datamodel.jpg"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    CS2810 Mathematics of Data Models
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description"
                    style={{ height: "100px" }}
                  >
                    Learn eigenvectors, ML modeling, and more!
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/1234/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/earth.jpg" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title">
                    ENVR1200 Dynamic Earth
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description"
                    style={{ height: "100px" }}
                  >
                    Learn about the science of the earth
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
