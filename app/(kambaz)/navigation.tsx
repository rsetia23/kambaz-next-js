import { AiOutlineDashboard } from "react-icons/ai";
import {
  LiaBookSolid,
  LiaCalendar,
  LiaCogSolid,
  LiaInboxSolid,
} from "react-icons/lia";
import { FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";

export default function KambazNavigation() {
  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 120 }}
      id="wd-kambaz-navigation"
    >
      {/* Logo */}
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
      >
        <img src="/images/NEU.png" width="75" alt="Northeastern University" />
      </ListGroupItem>

      <br />

      {/* Account (white icon + text) */}
      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/account"
          id="wd-account-link"
          className="text-white text-decoration-none"
        >
          <FaRegCircleUser className="fs-1 text-white" />
          <br />
          Account
        </Link>
      </ListGroupItem>

      <br />

      {/* Dashboard (ACTIVE) */}
      <ListGroupItem className="border-0 bg-white text-center">
        <Link
          href="/dashboard"
          id="wd-dashboard-link"
          className="text-danger text-decoration-none"
        >
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>

      <br />

      {/* Courses */}
      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/dashboard"
          id="wd-courses-link"
          className="text-white text-decoration-none"
        >
          <LiaBookSolid className="fs-1 text-danger" />
          <br />
          Courses
        </Link>
      </ListGroupItem>

      <br />

      {/* Calendar */}
      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/calendar"
          id="wd-calendar-link"
          className="text-white text-decoration-none"
        >
          <LiaCalendar className="fs-1 text-danger" />
          <br />
          Calendar
        </Link>
      </ListGroupItem>

      <br />

      {/* Inbox */}
      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/inbox"
          id="wd-inbox-link"
          className="text-white text-decoration-none"
        >
          <LiaInboxSolid className="fs-1 text-danger" />
          <br />
          Inbox
        </Link>
      </ListGroupItem>

      <br />

      {/* Labs */}
      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/labs"
          id="wd-labs-link"
          className="text-white text-decoration-none"
        >
          <LiaCogSolid className="fs-1 text-danger" />
          <br />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
