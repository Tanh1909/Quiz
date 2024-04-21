import DefaultLayout from "../layouts/DefaultLayout";
import Answers from "../pages/Answers";
import CreateQuestion from "../pages/CreateQuestion";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import PlayMode from "../pages/PlayMode";
import Question from "../pages/Quetions";
import Result from "../pages/Result";
import Topic from "../pages/Topic";
const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/topics",
        element: <Topic />,
      },
      { path: "/answers", element: <Answers /> },
      { path: "/questions/:id", element: <Question /> },
      { path: "/result/:id", element: <Result /> },
      { path: "/create-quetion", element: <CreateQuestion /> },
      { path: "/login", element: <Login /> },
    ],
  },
  {
    path: "/play-mode/:id",
    element: <PlayMode />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
];
export default routes;
