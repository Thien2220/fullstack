import "./App.css";
import Home from "./component/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { homeLoader } from "./component/Home";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      loader: homeLoader,
    },
  ]);
  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
  );
}

export default App;
