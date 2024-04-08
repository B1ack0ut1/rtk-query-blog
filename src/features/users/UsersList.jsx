import { useSelector } from "react-redux";
import { selectAllUsers, useGetUsersQuery } from "./usersSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const { isLoading, isSuccess, isError, error } = useGetUsersQuery();

  const users = useSelector(selectAllUsers);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = users.map((user) => (
      <li key={user.id}>
        <Link to={`/user/${user.id}`}>{user.name}</Link>
      </li>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Users</h2>

      <ul>{content}</ul>
    </section>
  );
};

export default UsersList;
