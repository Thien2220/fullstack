import "./App.css";
import Home from "./component/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { homeLoader } from "./component/Home";
import Authentication from "./component/Authentication";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Authentication />,
      loader: homeLoader,
    },
    { path: "/home", element: <Home /> },
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
