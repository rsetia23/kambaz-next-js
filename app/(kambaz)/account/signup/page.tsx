"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import axios from "axios";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      setError("");
      const newUser = await client.signup(user);
      dispatch(setCurrentUser(newUser));
      router.push("/account/profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Unable to sign up");
        return;
      }
      setError("Unable to sign up");
    }
  };

  return (
    <div id="wd-signup-screen" className="wd-signup-screen" style={{ maxWidth: 400 }}>
      <h1>Sign up</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={user.username || ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={user.password || ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <FormSelect
        className="mb-2"
        value={user.role || "STUDENT"}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
      >
        <option value="STUDENT">Student</option>
        <option value="TA">TA</option>
        <option value="FACULTY">Faculty</option>
      </FormSelect>
      <Button onClick={() => void signup()} className="wd-signup-btn w-100 mb-2">
        Sign up
      </Button>
      {error && <div className="text-danger mb-2">{error}</div>}
      <Link href="/account/signin" className="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
