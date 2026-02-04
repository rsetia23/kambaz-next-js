import { FormControl } from "react-bootstrap";
import Link from "next/link";

export default function Profile() {
  return (
    <div id="wd-profile-screen" style={{ maxWidth: 400 }}>
      <h1>Profile</h1>

      <FormControl defaultValue="alice" className="mb-2" />
      <FormControl defaultValue="123" className="mb-2" />
      <FormControl defaultValue="Alice" className="mb-2" />
      <FormControl defaultValue="Wonderland" className="mb-2" />
      <FormControl type="date" className="mb-2" />
      <FormControl defaultValue="alice@wonderland.com" className="mb-2" />
      <FormControl defaultValue="User" className="mb-3" />

      <Link href="/account/signin" className="btn btn-danger w-100">
        Signout
      </Link>
    </div>
  );
}
