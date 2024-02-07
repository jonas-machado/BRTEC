import Users from "@/components/settings/user/Users";
import getUsers from "@/lib/actions/getUsers";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <>
      <Users users={users} />
    </>
  );
}
