import CustomCarousel from "../components/CustomCarousel";
import DefaultLayout from "../layouts/DefaultLayout";
import Answers from "../pages/Answers";
import Create from "../pages/Create";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MoreTopics from "../pages/MoreTopics";
import NotFound from "../pages/NotFound";
import PlayMode from "../pages/PlayMode";
import Question from "../pages/Quetions";
import Result from "../pages/Result";
import Topic from "../pages/Topic";
import TopicDetail from "../pages/TopicDetail";
import PrivateRoute from "../components/AllRoutes/PrivateRoutes/index";
import AuthRoute from "../components/AllRoutes/AuthRoutes";
import Profile from "../pages/Profile";
import MyResults from "../pages/MyResults";
const routes = [
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/",
        element: <DefaultLayout />,
        children: [
          { index: true, element: <Home /> },
          {
            path: "/detail-topics/:id",
            element: <TopicDetail />,
          },
          {
            path: "/more-topics",
            element: <MoreTopics />,
          },
          {
            element: <PrivateRoute />,
            children: [
              {
                path: "/topics",
                element: <Topic />,
              },
              { path: "/answers", element: <Answers /> },
              { path: "/questions/:id", element: <Question /> },
              { path: "/result/:id", element: <Result /> },
              { path: "/create-topic", element: <Create /> },
              { path: "/edit-topic/:id", element: <Create /> },
              { path: "/profile", element: <Profile /> },
              { path: "/results", element: <MyResults /> },
            ],
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/play-mode/:id",
            element: <PlayMode />,
          },
        ],
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
];
export default routes;
