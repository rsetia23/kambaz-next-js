"use client";
import { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import KambazNavigation from "./navigation";
import "./styles.css";
import store from "./store";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./account/reducer";
import { setEnrollments } from "./enrollments/reducer";
import * as accountClient from "./account/client";
import * as enrollmentsClient from "./enrollments/client";

function SessionBootstrap({ children }: Readonly<{ children: ReactNode }>) {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const currentUser = await accountClient.profile();
        dispatch(setCurrentUser(currentUser));
        const enrollments = await enrollmentsClient.findEnrollmentsForCurrentUser();
        dispatch(setEnrollments(enrollments));
      } catch {
        dispatch(setCurrentUser(null));
        dispatch(setEnrollments([]));
      } finally {
        setLoaded(true);
      }
    };

    void loadSession();
  }, [dispatch]);

  if (!loaded) return null;
  return <>{children}</>;
}

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <SessionBootstrap>
        <div className="d-flex" id="wd-kambaz">
          <div>
            <KambazNavigation />
          </div>
          <div className="flex-fill ps-3 wd-main-content-offset">{children}</div>
        </div>
      </SessionBootstrap>
    </Provider>
  );
}
