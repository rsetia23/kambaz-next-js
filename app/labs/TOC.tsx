import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
export default function TOC() {
  return (
    <Nav variant="pills">
      <NavItem>
        <NavLink href="/labs">
          Labs
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/labs/lab1">
          Lab 1
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/labs/lab2">
          Lab 2
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/labs/lab3">
          Lab 3
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/">
          Kambaz
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="https://github.com/rsetia23/kambaz-next-js/tree/main">My GitHub</NavLink>
      </NavItem>
    </Nav>
  );
}
