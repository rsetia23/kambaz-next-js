"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as client from "../../client";

export default function CoursePeoplePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    if (!cid) return;
    const courseUsers = await client.findUsersForCourse(cid as string);
    setUsers(courseUsers);
  };

  useEffect(() => {
    void fetchUsers();
  }, [cid]);

  return (
    <div>
      <h3>People</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} allowManage={false} />
    </div>
  );
}
