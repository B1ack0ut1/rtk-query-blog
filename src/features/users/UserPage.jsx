import { useSelector } from "react-redux";
import { selectUserById, useGetUsersQuery } from "./usersSlice";
import { Link, useParams } from "react-router-dom";

import { useGetPostsByUserIdQuery } from "../posts/postsSlice";

const UserPage = () => {
  const { userId } = useParams();

  const {
    data: postsForUser,
    isLoading: isLoadingPostsForUser,
    isSuccess,
    isError,
    error,
  } = useGetPostsByUserIdQuery(userId);

  const { isLoading: isLoadingUsers } = useGetUsersQuery();

  const user = useSelector((state) => selectUserById(state, Number(userId)));
  console.log(user);
  let content;
  if (isLoadingPostsForUser || isLoadingUsers) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const { ids, entities } = postsForUser;
    content = ids.map((id) => (
      <li key={id}>
        <Link to={`/post/${id}`}>{entities[id].title}</Link>
      </li>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{content}</ol>
    </section>
  );
};

export default UserPage;
