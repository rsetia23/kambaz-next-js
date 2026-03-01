"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountPage() {
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  useEffect(() => {
    if (!currentUser) {
      router.replace("/account/signin");
      return;
    }
    router.replace("/account/profile");
  }, [currentUser, router]);

  return null;
}
