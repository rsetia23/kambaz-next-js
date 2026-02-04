import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
export default function ModulesControls() {
  return (
    <div
      id="wd-modules-controls"
      className="d-flex justify-content-end align-items-center gap-2 text-nowrap"
    >
      {/* Collapse */}
      <Button variant="secondary" size="lg" id="wd-collapse-all">
        Collapse All
      </Button>

      {/* View Progress */}
      <Button variant="secondary" size="lg" id="wd-view-progress">
        View Progress
      </Button>

      {/* Publish All */}
      <Dropdown>
        <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </DropdownToggle>

        <DropdownMenu>
          <DropdownItem id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </DropdownItem>
          <DropdownItem id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            Unpublish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only">
            Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* + Module */}
      <Button variant="danger" size="lg" id="wd-add-module-btn">
        <FaPlus className="me-2" />
        Module
      </Button>
    </div>
  );
}
