"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, FormControl } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    setError("");
    const user = await client.signin(credentials);
    if (!user) {
      setError("Invalid username or password");
      return;
    }
    dispatch(setCurrentUser(user));
    router.push("/dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl
        value={credentials.username || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="mb-2"
        placeholder="username"
        id="wd-username"
      />
      <FormControl
        value={credentials.password || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <Button
        onClick={() => void signin()}
        id="wd-signin-btn"
        className="w-100 mb-2"
      >
        Sign in
      </Button>
      {error && <div className="text-danger mb-2">{error}</div>}
      <Link id="wd-signup-link" href="/account/signup">
        Sign up
      </Link>
    </div>
  );
}
