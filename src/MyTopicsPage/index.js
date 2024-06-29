import { useSelector } from "react-redux";
import MyTopics from "../pages/Profile/MyTopics";

function MyTopicsPage() {
  const selector = useSelector((state) => state.authReducers);
  const username = selector.user.username;
  return <MyTopics username={username} />;
}

export default MyTopicsPage;
