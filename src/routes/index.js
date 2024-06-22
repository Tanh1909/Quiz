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
const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/topics",
            element: <Topic />,
          },
          {
            path: "/more-topics/:id",
            element: <MoreTopics />,
          },
          {
            path: "/detail-topics/:id",
            element: <TopicDetail />,
          },
          { path: "/answers", element: <Answers /> },
          { path: "/questions/:id", element: <Question /> },
          { path: "/result/:id", element: <Result /> },
          { path: "/create-quetion", element: <Create /> },
        ],
      },
    ],
  },
  {
    path: "/play-mode/:id",
    element: <PlayMode />,
  },
  {
    path: "/2",
    element: <Question />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
];
export default routes;
