import { Provider } from "react-redux";
import AllRoutes from "./components/AllRoutes";
import store from "./redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <AllRoutes />
      </Provider>
    </>
  );
}

export default App;
