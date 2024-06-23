
import { Provider } from "react-redux";
import AllRoutes from "./components/AllRoutes";
import { createStore } from "redux";
import { rootReducer } from "./redux/reducers";

function App() {
  const store = createStore(rootReducer);
  return (
    <>
  
      <Provider store={store}>
        <AllRoutes />
      </Provider>
    </>
  );
}

export default App;
