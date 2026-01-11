import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/webdev.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS 4550 Web Development </h5>
              <p className="wd-dashboard-course-title">
                Web Developer!
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/engw.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> ENGW 1101 Intro To Writing </h5>
              <p className="wd-dashboard-course-title">
                Get introduced to writing!
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/toc.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS3800 Theory Of Computation </h5>
              <p className="wd-dashboard-course-title">
                Prove the theory!
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/cyber.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CY2550 Foundations of Cybersecurity </h5>
              <p className="wd-dashboard-course-title">
                Learn the foundations of Cybersecurity!
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/datamodel.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS2810 Mathematics of Data Models </h5>
              <p className="wd-dashboard-course-title">
                Learn eigenvectors, ML modeling, and more!
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/earth.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> ENVR1200 Dynamic Earth </h5>
              <p className="wd-dashboard-course-title">
                Learn about the science of the earth
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
